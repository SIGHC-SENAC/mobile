import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "../../constants/firebase";

const COLLECTION = "certificados_horas_complementares";
const MAX_FILE_SIZE = 10 * 1024 * 1024;

const API_BASE =
  process.env.EXPO_PUBLIC_VITE_API_BASE_URL || process.env.VITE_API_BASE_URL || "";

export function validatePdfFile(file) {
  const isPdf = file.mimeType === "application/pdf" || file.name?.toLowerCase().endsWith(".pdf");

  if (!isPdf) {
    return "Apenas arquivos PDF são aceitos.";
  }

  if (file.size && file.size > MAX_FILE_SIZE) {
    return `O arquivo excede o limite de ${MAX_FILE_SIZE / (1024 * 1024)}MB.`;
  }

  return null;
}

export function formatFileSize(bytes) {
  const size = Number(bytes || 0);

  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;

  return `${(size / (1024 * 1024)).toFixed(2)} MB`;
}

export async function uploadCertificado(fileUri, fileName, uid, onProgress) {
  const timestamp = Date.now();
  const safeName = fileName.replace(/[^a-zA-Z0-9._-]/g, "_");
  const storagePath = `certificados_temp/${uid}/${timestamp}-${safeName}`;
  const storageRef = ref(storage, storagePath);

  const response = await fetch(fileUri);
  const blob = await response.blob();
  const task = uploadBytesResumable(storageRef, blob, { contentType: "application/pdf" });

  await new Promise((resolve, reject) => {
    task.on(
      "state_changed",
      (snapshot) => {
        onProgress?.(Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100));
      },
      reject,
      resolve
    );
  });

  return storagePath;
}

export async function getDownloadURLFromPath(storagePath) {
  return getDownloadURL(ref(storage, storagePath));
}

async function postJsonWithAuth(path, body, token) {
  const response = await fetch(`${API_BASE.replace(/\/$/, "")}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();

  if (!response.ok) {
    const error = new Error(data.error || "Erro ao processar requisição");
    error.encontrados = data.encontrados;
    throw error;
  }

  return data;
}

export async function extrairTextoOcr(storagePath, token) {
  return postJsonWithAuth("/certificados/ocr", { storagePath }, token);
}

export async function analisarComIA(ocrText, regrasAtividades, token) {
  return postJsonWithAuth("/certificados/analisar-ia", { ocrText, regrasAtividades }, token);
}

export async function processarCertificado(
  {
    uid,
    storagePath,
    nomeArquivo,
    categoriaId,
    categoriaNome,
    cursoId,
    cursoNome,
    cursoCodigo,
    nomeAluno,
    emailAluno,
    observacaoAluno,
  },
  token
) {
  return postJsonWithAuth(
    "/certificados/processar",
    {
      uid,
      storagePath,
      nomeArquivo,
      categoriaId,
      categoriaNome,
      cursoId,
      cursoNome,
      cursoCodigo,
      nomeAluno,
      emailAluno,
      observacaoAluno,
    },
    token
  );
}

export async function saveRejectedCertificado(data) {
  const docRef = await addDoc(collection(db, COLLECTION), {
    uid: data.uid,
    nomeAluno: data.nomeAluno || "",
    emailAluno: data.emailAluno || "",
    nomeArquivo: data.nomeArquivo,
    storagePath: "",
    downloadURL: "",
    contentType: "application/pdf",
    tamanhoBytes: 0,
    status: "rejeitado",
    role: "aluno",
    observacaoAluno: "",
    categoriaId: data.categoriaId ?? null,
    categoriaNome: data.categoriaNome ?? null,
    cursoId: data.cursoId ?? null,
    cursoNome: data.cursoNome ?? null,
    cursoCodigo: data.cursoCodigo ?? null,
    horasInformadas: null,
    horasAprovadas: null,
    observacaoAdmin: null,
    motivoRejeicao: data.motivoRejeicao,
    nomeAdmin: "Sistema",
    analisadoPor: "sistema",
    dataAnalise: serverTimestamp(),
    analiseSeguranca: "rejeitado",
    encontradosSuspeitos: data.encontrados || [],
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return docRef.id;
}

function timestampToMs(value) {
  if (!value) return 0;
  if (typeof value === "number") return value > 1e10 ? value : value * 1000;
  if (typeof value.seconds === "number") return value.seconds * 1000;

  return 0;
}

export async function fetchCertificados(uid) {
  try {
    const q = query(
      collection(db, COLLECTION),
      where("uid", "==", uid),
      orderBy("createdAt", "desc")
    );
    const snapshot = await getDocs(q);

    return snapshot.docs.map((document) => ({ id: document.id, ...document.data() }));
  } catch {
    const q = query(collection(db, COLLECTION), where("uid", "==", uid));
    const snapshot = await getDocs(q);
    const docs = snapshot.docs.map((document) => ({ id: document.id, ...document.data() }));

    return docs.sort((a, b) => timestampToMs(b.createdAt) - timestampToMs(a.createdAt));
  }
}

function formatDate(value) {
  const ms = timestampToMs(value);

  if (!ms) return "Sem data";

  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(ms));
}

function normalizeStatus(status) {
  if (status === "aprovado") return "approved";
  if (status === "rejeitado") return "rejected";

  return "pending";
}

export function normalizeCertificateForDisplay(certificado) {
  return {
    id: certificado.id,
    title: certificado.nomeArquivo || "Certificado.pdf",
    date: formatDate(certificado.createdAt),
    status: normalizeStatus(certificado.status),
    details:
      certificado.motivoRejeicao ||
      certificado.observacaoAdmin ||
      certificado.observacaoAluno ||
      "",
  };
}

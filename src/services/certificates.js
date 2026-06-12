import { getPayloadArray, requestFormData, requestJson } from "./apiClient";

const fallbackCertificates = [
  {
    id: "rejected-demo",
    title: "Arquitetura de Software.pdf",
    date: "07 de jun. de 2026",
    status: "rejected",
    details: "Detalhes da rejeição",
  },
  {
    id: "pending-demo",
    title: "Arquitetura de Software.pdf",
    date: "07 de jun. de 2026",
    status: "pending",
    details: "Aguardando análise do administrador",
  },
  {
    id: "approved-demo",
    title: "Arquitetura de Software.pdf",
    date: "07 de jun. de 2026",
    status: "approved",
    details: "Detalhes da aprovação",
  },
];

function normalizeStatus(status) {
  const value = String(status || "").toLowerCase();

  if (["approved", "aprovado", "aprovada"].includes(value)) {
    return "approved";
  }

  if (["rejected", "reprovado", "reprovada", "nao_aprovado", "não aprovado"].includes(value)) {
    return "rejected";
  }

  return "pending";
}

function normalizeCertificate(certificate, index) {
  return {
    id: certificate.id || certificate.uid || `${index}`,
    title: certificate.title || certificate.titulo || certificate.nomeArquivo || certificate.arquivo || "Certificado.pdf",
    date: certificate.date || certificate.data || certificate.createdAt || certificate.criadoEm || "Sem data",
    status: normalizeStatus(certificate.status || certificate.situacao),
    details: certificate.details || certificate.detalhes || certificate.observacao,
  };
}

export async function getStudentCertificates(userId) {
  try {
    const payload = await requestJson("/certificados", {
      query: { userId },
    });
    const certificates = getPayloadArray(payload, ["data", "certificados", "items"]);

    return certificates.map(normalizeCertificate);
  } catch {
    return fallbackCertificates;
  }
}

export async function createCertificateSubmission(data) {
  try {
    if (data.file?.uri) {
      const formData = new FormData();

      formData.append("file", {
        uri: data.file.uri,
        name: data.file.name,
        type: data.file.mimeType || "application/pdf",
      });
      formData.append("userId", data.userId || "");
      formData.append("courseName", data.courseName || "");
      formData.append("fileName", data.fileName || data.file.name || "");
      formData.append("fileSize", String(data.fileSize || data.file.size || ""));
      formData.append("extractedText", data.extractedText || "");
      formData.append("activityType", data.activityType || "");
      formData.append("activityDescription", data.activityDescription || "");
      formData.append("observation", data.observation || "");

      return requestFormData("/certificados", formData);
    }

    return requestJson("/certificados", {
      method: "POST",
      body: data,
    });
  } catch {
    return {
      ok: true,
      offlineFallback: true,
    };
  }
}

export { fallbackCertificates };

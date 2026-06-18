import { doc, getDoc } from "firebase/firestore";
import { db } from "../../constants/firebase";

export async function fetchCursoById(id) {
  const snap = await getDoc(doc(db, "cursos", id));

  if (!snap.exists()) {
    throw new Error("Curso não encontrado");
  }

  return { id: snap.id, ...snap.data() };
}

export async function fetchCursosByIds(ids = []) {
  const uniqueIds = Array.from(new Set(ids.filter(Boolean)));
  const results = await Promise.all(
    uniqueIds.map((id) => fetchCursoById(id).catch(() => null))
  );

  return results.filter(Boolean);
}

export function findAtividadeInGrupos(grupos = [], id) {
  return grupos.flatMap((grupo) => grupo.atividades || []).find((atividade) => atividade.id === id);
}

export function findGrupoByAtividadeId(grupos = [], atividadeId) {
  return grupos.find((grupo) => (grupo.atividades || []).some((atividade) => atividade.id === atividadeId));
}

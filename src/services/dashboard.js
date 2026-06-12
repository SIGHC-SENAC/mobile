import { requestJson } from "./apiClient";

const fallbackDashboard = {
  studentName: "Aluno",
  courseName: "Curso não informado",
  completedHours: 0,
  targetHours: 0,
  sentCount: 0,
  pendingCount: 0,
  approvedCount: 0,
  approvedHours: 0,
  categories: [
    { id: "ensino", usedHours: 0, limitHours: 10, sentCount: 0 },
    { id: "pesquisa", usedHours: 0, limitHours: 90, sentCount: 0 },
    { id: "extensao", usedHours: 0, limitHours: 75, sentCount: 0 },
  ],
};

function numberFrom(value, fallback = 0) {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}

function normalizeCategory(category) {
  return {
    id: category.id || category.tipo || category.categoria,
    usedHours: numberFrom(category.usedHours ?? category.horasUsadas ?? category.horas_utilizadas),
    limitHours: numberFrom(category.limitHours ?? category.limiteHoras ?? category.limite_horas),
    sentCount: numberFrom(category.sentCount ?? category.envios),
  };
}

function normalizeDashboard(payload) {
  const data = payload?.data || payload?.dashboard || payload || {};
  const categories = data.categories || data.categorias;

  return {
    studentName: data.studentName || data.nomeAluno || data.aluno?.nome || fallbackDashboard.studentName,
    courseName: data.courseName || data.nomeCurso || data.curso?.nome || fallbackDashboard.courseName,
    completedHours: numberFrom(data.completedHours ?? data.horasConcluidas ?? data.horas_aprovadas),
    targetHours: numberFrom(data.targetHours ?? data.metaHoras ?? data.meta_horas),
    sentCount: numberFrom(data.sentCount ?? data.envios ?? data.totalEnvios),
    pendingCount: numberFrom(data.pendingCount ?? data.pendentes ?? data.totalPendentes),
    approvedCount: numberFrom(data.approvedCount ?? data.aprovados ?? data.totalAprovados),
    approvedHours: numberFrom(data.approvedHours ?? data.horasAprovadas ?? data.horas_aprovadas),
    categories: Array.isArray(categories)
      ? categories.map(normalizeCategory)
      : fallbackDashboard.categories,
  };
}

export async function getStudentDashboard(userId) {
  try {
    const payload = await requestJson("/dashboard/aluno", {
      query: { userId },
    });

    return normalizeDashboard(payload);
  } catch {
    return fallbackDashboard;
  }
}

export { fallbackDashboard };

import { getPayloadArray, requestJson } from "./apiClient";

const fallbackActivitiesByCategory = {
  ensino: [
    { code: "1.1", title: "Participação em monitoria acadêmica", maxHours: "20h" },
    { code: "1.2", title: "Comparecimento à defesa de TCC", maxHours: "2h" },
    { code: "1.3", title: "Disciplina cursada em outra instituição", maxHours: "20h" },
    { code: "1.4", title: "Disciplina cursada fora da matriz", maxHours: "20h" },
    { code: "1.5", title: "Cursos instrumentais complementares", maxHours: "10h" },
    { code: "1.6", title: "Certificações reconhecidas na área", maxHours: "10h" },
    { code: "1.7", title: "Elaboração de material didático", maxHours: "5h" },
    { code: "1.8", title: "Professor participante da atividade", maxHours: "10h" },
    { code: "1.9", title: "Visitas técnicas", maxHours: "4h" },
  ],
  pesquisa: [
    { code: "2.1", title: "Participação em projeto de pesquisa", maxHours: "30h" },
    { code: "2.2", title: "Publicação de artigo científico", maxHours: "30h" },
    { code: "2.3", title: "Apresentação de trabalho acadêmico", maxHours: "20h" },
    { code: "2.4", title: "Participação em evento científico", maxHours: "10h" },
  ],
  extensao: [
    { code: "3.1", title: "Participação em projeto de extensão", maxHours: "30h" },
    { code: "3.2", title: "Atividade voluntária vinculada ao curso", maxHours: "20h" },
    { code: "3.3", title: "Evento técnico, oficina ou palestra", maxHours: "15h" },
    { code: "3.4", title: "Ação comunitária supervisionada", maxHours: "10h" },
  ],
};

function normalizeActivity(activity, index) {
  return {
    code: activity.code || activity.codigo || activity.numero || `${index + 1}`,
    title: activity.title || activity.titulo || activity.nome || activity.descricao || "Atividade",
    maxHours: activity.maxHours || activity.cargaMaxima || activity.max_horas || activity.limite || "0h",
    status: activity.status || activity.situacao || "Nenhum envio registrado",
  };
}

export async function getCategoryActivities(categoryId, userId) {
  const fallback = fallbackActivitiesByCategory[categoryId] || [];

  try {
    const payload = await requestJson(`/atividades/${categoryId}`, {
      query: { userId },
    });
    const activities = getPayloadArray(payload, ["data", "atividades", "items"]);

    return activities.map(normalizeActivity);
  } catch {
    return fallback;
  }
}

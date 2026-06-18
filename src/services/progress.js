const DEFAULT_META_HORAS = 100;

function filterCertificadosPorCurso(certificados = [], cursoId) {
  if (!cursoId) {
    return certificados;
  }

  return certificados.filter((certificado) => !certificado.cursoId || certificado.cursoId === cursoId);
}

export function buildDashboardSummary({ curso, certificados = [], cursoId, studentName }) {
  const certificadosDoCurso = filterCertificadosPorCurso(certificados, cursoId);
  const metaHoras = curso?.cargaHorariaComplementar || DEFAULT_META_HORAS;

  const horasAprovadas = certificadosDoCurso.reduce(
    (total, certificado) =>
      total + (certificado.status === "aprovado" ? Number(certificado.horasAprovadas || 0) : 0),
    0
  );

  const pendentes = certificadosDoCurso.filter((certificado) => certificado.status === "pendente").length;
  const aprovados = certificadosDoCurso.filter((certificado) => certificado.status === "aprovado").length;

  return {
    studentName: studentName || "Aluno",
    courseName: curso?.nome || "Curso não informado",
    completedHours: horasAprovadas,
    targetHours: metaHoras,
    sentCount: certificadosDoCurso.length,
    pendingCount: pendentes,
    approvedCount: aprovados,
    approvedHours: horasAprovadas,
  };
}

export function buildGruposDetalhados({ curso, certificados = [], cursoId }) {
  const certificadosDoCurso = filterCertificadosPorCurso(certificados, cursoId);
  const grupos = curso?.regrasAtividades ?? [];

  return grupos.map((grupo) => {
    const atividades = (grupo.atividades || []).map((atividade) => {
      const relacionados = certificadosDoCurso.filter((certificado) => certificado.categoriaId === atividade.id);
      const aprovadosList = relacionados.filter((certificado) => certificado.status === "aprovado");
      const pendentesCount = relacionados.filter((certificado) => certificado.status === "pendente").length;
      const rejeitadosCount = relacionados.filter((certificado) => certificado.status === "rejeitado").length;
      const horasAprovadas = aprovadosList.reduce(
        (total, certificado) => total + Number(certificado.horasAprovadas || 0),
        0
      );

      return {
        ...atividade,
        totalEnvios: relacionados.length,
        aprovados: aprovadosList.length,
        pendentes: pendentesCount,
        rejeitados: rejeitadosCount,
        horasAprovadas,
        ativo: relacionados.length > 0,
      };
    });

    const horasAprovadasGrupo = atividades.reduce((total, atividade) => total + atividade.horasAprovadas, 0);
    const enviosGrupo = atividades.reduce((total, atividade) => total + atividade.totalEnvios, 0);
    const pendenciasGrupo = atividades.reduce((total, atividade) => total + atividade.pendentes, 0);
    const horasMaxGrupo = atividades.reduce((total, atividade) => total + Number(atividade.horasMaximas || 0), 0);

    return {
      ...grupo,
      atividades,
      horasAprovadas: horasAprovadasGrupo,
      horasMax: horasMaxGrupo,
      envios: enviosGrupo,
      pendencias: pendenciasGrupo,
    };
  });
}

export function mapAtividadeToListItem(atividade) {
  const statusText = atividade.ativo
    ? `${atividade.aprovados} aprovado(s) · ${atividade.pendentes} pendente(s)`
    : "Nenhum envio registrado";

  return {
    code: atividade.id,
    title: atividade.descricao,
    maxHours: `${Number(atividade.horasMaximas || 0)}h`,
    status: statusText,
  };
}

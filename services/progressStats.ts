import { collection, getDocs, query, where,} from "firebase/firestore";

import { db } from "../constants/firebase";

export type ProgressStats = {
  horasAprovadas: number;
  metaCurso: number;
  horasRestantes: number;
  progresso: number;
};

export async function getProgressStats(
  uid: string
): Promise<ProgressStats> {

  const metaCurso = 100;

  const certificadosRef = collection(
    db,
    "certificados"
  );

  const certificadosQuery = query(
    certificadosRef,
    where("uid", "==", uid),
    where("status", "==", "aprovado")
  );

  const snapshot = await getDocs(
    certificadosQuery
  );

  let horasAprovadas = 0;

  snapshot.forEach((doc) => {
    const data = doc.data();

    horasAprovadas += Number(
      data.horasAprovadas || 0
    );
  });

  const progresso = Math.min(
    (horasAprovadas / metaCurso) * 100,
    100
  );

  const horasRestantes = Math.max(
    metaCurso - horasAprovadas,
    0
  );

  return {
    horasAprovadas,
    metaCurso,
    horasRestantes,
    progresso,
  };
}
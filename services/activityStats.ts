import { collection, getCountFromServer, getDocs, query, where,} from "firebase/firestore";

import { db } from "../constants/firebase";

export async function getActivityStats(
  uid: string,
  activityId: string
) {
  const certificadosRef = collection(db, "certificados");

  const baseQuery = query(
    certificadosRef,
    where("uid", "==", uid),
    where("atividadeId", "==", activityId)
  );

  const totalSnap = await getCountFromServer(baseQuery);

  const pendentesQuery = query(
    certificadosRef,
    where("uid", "==", uid),
    where("atividadeId", "==", activityId),
    where("status", "==", "pendente")
  );

  const aprovadosQuery = query(
    certificadosRef,
    where("uid", "==", uid),
    where("atividadeId", "==", activityId),
    where("status", "==", "aprovado")
  );

  const pendentesSnap = await getCountFromServer(pendentesQuery);
  const aprovadosSnap = await getCountFromServer(aprovadosQuery);

  const aprovadosDocs = await getDocs(aprovadosQuery);

  let horasAprovadas = 0;

  aprovadosDocs.forEach((doc) => {
    horasAprovadas += doc.data().horasAprovadas || 0;
  });

  return {
    envios: totalSnap.data().count,
    pendentes: pendentesSnap.data().count,
    aprovados: aprovadosSnap.data().count,
    horasAprovadas,
  };
}
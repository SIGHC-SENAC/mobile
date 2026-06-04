import { collection, getCountFromServer, getDocs, query, where,} from "firebase/firestore";

import { db } from "../constants/firebase";

export async function getCertificadosStats(uid: string) {
  if (!uid) {
    return {
      total: 0,
      pendentes: 0,
      aprovados: 0,
      horasAprovadas: 0,
    };
  }

  const totalSnap = await getCountFromServer(
    query(
      collection(db, "certificados"),
      where("uid", "==", uid)
    )
  );

  const pendentesSnap = await getCountFromServer(
    query(
      collection(db, "certificados"),
      where("uid", "==", uid),
      where("status", "==", "pendente")
    )
  );

  const aprovadosSnap = await getCountFromServer(
    query(
      collection(db, "certificados"),
      where("uid", "==", uid),
      where("status", "==", "aprovado")
    )
  );

  const aprovadosDocs = await getDocs(
    query(
      collection(db, "certificados"),
      where("uid", "==", uid),
      where("status", "==", "aprovado")
    )
  );

  let horasAprovadas = 0;

  aprovadosDocs.forEach((doc) => {
    horasAprovadas += Number(doc.data().horasAprovadas || 0);
  });

  return {
    total: totalSnap.data().count,
    pendentes: pendentesSnap.data().count,
    aprovados: aprovadosSnap.data().count,
    horasAprovadas,
  };
}
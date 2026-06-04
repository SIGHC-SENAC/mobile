import { collection, getCountFromServer, getDocs, query, where,} from "firebase/firestore";

import { db } from "../constants/firebase";

export type CategoryStats = {
  ensino: {
    horas: number;
    envios: number;
  };
  pesquisa: {
    horas: number;
    envios: number;
  };
  extensao: {
    horas: number;
    envios: number;
  };
};

export async function getCategoryStats(
  uid: string
): Promise<CategoryStats> {

  const certificadosRef = collection(db, "certificados");

  async function getCategoryData(categoria: string) {

    const categoryQuery = query(
      certificadosRef,
      where("uid", "==", uid),
      where("categoria", "==", categoria)
    );

    const enviosSnap = await getCountFromServer(categoryQuery);

    const aprovadosQuery = query(
      certificadosRef,
      where("uid", "==", uid),
      where("categoria", "==", categoria),
      where("status", "==", "aprovado")
    );

    const aprovadosDocs = await getDocs(aprovadosQuery);

    let horas = 0;

    aprovadosDocs.forEach((doc) => {
      const data = doc.data();

      horas += Number(data.horasAprovadas || 0);
    });

    return {
      horas,
      envios: enviosSnap.data().count,
    };
  }

  const [ensino, pesquisa, extensao] = await Promise.all([
    getCategoryData("ENSINO"),
    getCategoryData("PESQUISA"),
    getCategoryData("EXTENSÃO"),
  ]);

  return {
    ensino,
    pesquisa,
    extensao,
  };
}
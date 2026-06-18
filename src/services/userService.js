import { doc, getDoc } from "firebase/firestore";
import { db } from "../../constants/firebase";

export async function fetchUserData(firebaseUser) {
  if (!firebaseUser) {
    return null;
  }

  try {
    const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));

    if (userDoc.exists()) {
      return userDoc.data();
    }
  } catch (error) {
    console.error("Erro ao buscar dados do usuário:", error);
  }

  try {
    const tokenResult = await firebaseUser.getIdTokenResult();
    const claimRole = tokenResult.claims.role;

    return {
      nome: firebaseUser.displayName || "",
      email: firebaseUser.email || "",
      role: claimRole || "",
      createdAt: 0,
      createdBy: "",
    };
  } catch {
    return null;
  }
}

import { signOut } from "firebase/auth";
import { auth } from "../constants/firebase";

export async function signOutUser() {
  return signOut(auth);
}

export { signOutUser as signOut };
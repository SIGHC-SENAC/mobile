import { signInWithEmailAndPassword, signOut as fbSignOut } from 'firebase/auth';
import { auth } from '../config/firebase';

export async function signIn(email, password) {
  const { user } = await signInWithEmailAndPassword(auth, email, password);
  return user;
}

export async function signOut() {
  await fbSignOut(auth);
}

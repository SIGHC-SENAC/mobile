import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut as fbSignOut,
} from 'firebase/auth';
import { auth } from '../../constants/firebase';

export async function signIn(email, password) {
  const { user } = await signInWithEmailAndPassword(auth, email, password);
  return user;
}

export async function resetPassword(email) {
  await sendPasswordResetEmail(auth, email);
}

export async function signOut() {
  await fbSignOut(auth);
}

import { signInWithEmailAndPassword, signOut as fbSignOut } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth } from '../config/firebase';
import { validateEmail, validatePassword } from '../utils/validators';
import { logSecurityEvent, SECURITY_EVENTS } from '../utils/securityLogger';
import { clearAllSecureValues } from '../utils/secureStorage';

// Configurações de brute force protection
const MAX_LOGIN_ATTEMPTS = 5;
const LOCKOUT_TIME = 15 * 60 * 1000; // 15 minutos
const ATTEMPT_RESET_TIME = 1 * 60 * 1000; // 1 minuto

/**
 * Realiza login com validação e proteção contra brute force
 * @param {string} email - Email do usuário
 * @param {string} password - Senha do usuário
 * @returns {Promise<object>} Objeto do usuário
 * @throws {Error} Se login falhar
 */
export async function signIn(email, password) {
  try {
    // Validar inputs
    const validEmail = validateEmail(email);
    const validPassword = validatePassword(password);

    // Verificar tentativas de login
    await checkLoginAttempts(validEmail);

    // Registrar tentativa de login
    await logSecurityEvent(SECURITY_EVENTS.LOGIN_ATTEMPT, { email: validEmail });

    // Realizar login
    const { user } = await signInWithEmailAndPassword(auth, validEmail, validPassword);

    // Login bem-sucedido - limpar tentativas
    const lockoutKey = `login_lockout_${validEmail}`;
    await AsyncStorage.removeItem(lockoutKey);

    // Registrar sucesso
    await logSecurityEvent(SECURITY_EVENTS.LOGIN_SUCCESS, { email: validEmail });

    return user;
  } catch (error) {
    // Registrar falha de login
    await logSecurityEvent(SECURITY_EVENTS.LOGIN_FAILED, {
      email,
      reason: error.code || error.message,
    });

    // Incrementar contador de tentativas em caso de erro
    if (email) {
      await incrementLoginAttempts(email);
    }

    throw error;
  }
}

/**
 * Verifica se o usuário está bloqueado por muitas tentativas de login
 * @param {string} email - Email do usuário
 * @throws {Error} Se usuário está bloqueado
 */
async function checkLoginAttempts(email) {
  const key = `login_lockout_${email}`;
  const data = await AsyncStorage.getItem(key);
  
  if (!data) return;

  const { attempts = 0, lockedUntil = 0 } = JSON.parse(data);
  const now = Date.now();

  if (now < lockedUntil) {
    const remainingSeconds = Math.ceil((lockedUntil - now) / 1000);
    
    await logSecurityEvent(SECURITY_EVENTS.LOGIN_LOCKED, {
      email,
      remainingSeconds,
    });

    const error = new Error(
      `Conta bloqueada temporariamente. Tente novamente em ${remainingSeconds}s`
    );
    error.code = 'auth/account-temporarily-locked';
    throw error;
  }

  // Se passou do tempo de bloqueio, resetar tentativas
  if (attempts >= MAX_LOGIN_ATTEMPTS && now >= lockedUntil) {
    await AsyncStorage.removeItem(key);
  }
}

/**
 * Incrementa o contador de tentativas de login falhadas
 * @param {string} email - Email do usuário
 */
async function incrementLoginAttempts(email) {
  const key = `login_lockout_${email}`;
  const data = await AsyncStorage.getItem(key);
  const { attempts = 0 } = data ? JSON.parse(data) : {};
  
  const newAttempts = attempts + 1;
  const isLocked = newAttempts >= MAX_LOGIN_ATTEMPTS;
  
  const updateData = {
    attempts: newAttempts,
    lockedUntil: isLocked ? Date.now() + LOCKOUT_TIME : 0,
    lastAttempt: Date.now(),
  };

  await AsyncStorage.setItem(key, JSON.stringify(updateData));

  if (isLocked) {
    await logSecurityEvent(SECURITY_EVENTS.BRUTE_FORCE_DETECTED, { email });
  }
}

/**
 * Realiza logout seguro e limpa dados sensíveis
 */
export async function signOut() {
  try {
    // Registrar logout
    const currentUser = auth.currentUser;
    if (currentUser) {
      await logSecurityEvent(SECURITY_EVENTS.LOGOUT, { email: currentUser.email });
    }

    // Realizar logout do Firebase
    await fbSignOut(auth);

    // Limpar dados sensíveis armazenados de forma segura
    await clearAllSecureValues();
  } catch (error) {
    console.error('Erro ao realizar logout:', error);
    throw error;
  }
}

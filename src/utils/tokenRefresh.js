/**
 * Estratégia de renovação automática de tokens Firebase
 * Garante que o usuário sempre tenha um token válido
 */

import { auth } from '../config/firebase';

let refreshTimoutId = null;

/**
 * Configura a renovação automática de tokens
 * O token é renovado 5 minutos antes de expirar
 */
export const setupTokenRefreshStrategy = () => {
  // Listener para quando o usuário fizer login
  const unsubscribe = auth.onAuthStateChanged((user) => {
    // Limpar timeout anterior se existir
    if (refreshTimoutId) {
      clearTimeout(refreshTimoutId);
      refreshTimoutId = null;
    }

    if (user) {
      // Agendar primeira renovação
      scheduleTokenRefresh(user);
    }
  });

  return unsubscribe;
};

/**
 * Agenda a renovação do token
 * @param {object} user - Usuário Firebase
 */
const scheduleTokenRefresh = async (user) => {
  try {
    // Obter token e decodificar
    const token = await user.getIdToken();
    const decodedToken = decodeToken(token);

    if (!decodedToken || !decodedToken.exp) {
      console.warn('Não foi possível decodificar o token para agendar refresh');
      return;
    }

    // Calcular quando o token expira
    const expirationTime = decodedToken.exp * 1000; // Converter para milliseconds
    const now = Date.now();
    const timeUntilExpiration = expirationTime - now;

    // Renovar 5 minutos (300000ms) antes de expirar
    const refreshTime = timeUntilExpiration - 5 * 60 * 1000;

    if (refreshTime > 0) {
      refreshTimoutId = setTimeout(() => {
        forceTokenRefresh(user);
      }, refreshTime);

      console.debug(
        `Token refresh agendado para ${Math.round(refreshTime / 1000)}s a partir de agora`
      );
    } else {
      // Se o token vai expirar em menos de 5 minutos, renovar imediatamente
      forceTokenRefresh(user);
    }
  } catch (error) {
    console.error('Erro ao agendar token refresh:', error);
  }
};

/**
 * Força a renovação do token imediatamente
 * @param {object} user - Usuário Firebase
 */
const forceTokenRefresh = async (user) => {
  try {
    console.debug('Renovando token...');
    const newToken = await user.getIdToken(true); // Force refresh
    console.debug('Token renovado com sucesso');

    // Agendar próxima renovação
    scheduleTokenRefresh(user);
  } catch (error) {
    console.error('Erro ao renovar token:', error);

    // Tentar novamente em 1 minuto se falhar
    if (refreshTimoutId) {
      clearTimeout(refreshTimoutId);
    }
    refreshTimoutId = setTimeout(() => {
      forceTokenRefresh(user);
    }, 1 * 60 * 1000);
  }
};

/**
 * Decodifica um JWT token sem validação de assinatura
 * Nota: Apenas para leitura de informações públicas do token
 * @param {string} token - JWT token
 * @returns {object|null} Dados decodificados ou null
 */
const decodeToken = (token) => {
  try {
    if (!token || typeof token !== 'string') {
      return null;
    }

    const parts = token.split('.');
    if (parts.length !== 3) {
      return null;
    }

    // Decodificar a segunda parte (payload)
    const payload = parts[1];
    const decoded = JSON.parse(atob(payload));

    return decoded;
  } catch (error) {
    console.error('Erro ao decodificar token:', error);
    return null;
  }
};

/**
 * Limpa e para o refresh de tokens
 */
export const stopTokenRefresh = () => {
  if (refreshTimoutId) {
    clearTimeout(refreshTimoutId);
    refreshTimoutId = null;
  }
};

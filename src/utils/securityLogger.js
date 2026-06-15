/**
 * Logger de eventos de segurança
 * Registra tentativas de autenticação, erros, e eventos suspeitos
 * para análise e detecção de anomalias
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

const SECURITY_LOGS_KEY = 'security_events_log';
const MAX_LOCAL_LOGS = 100; // Manter últimos 100 eventos localmente

/**
 * Registra um evento de segurança localmente e opcionalmente no servidor
 * @param {string} eventType - Tipo de evento (LOGIN_ATTEMPT, LOGIN_FAILED, etc)
 * @param {object} details - Detalhes do evento
 * @param {boolean} sendToServer - Se deve enviar ao servidor
 */
export const logSecurityEvent = async (eventType, details = {}, sendToServer = true) => {
  const event = {
    eventType,
    timestamp: new Date().toISOString(),
    details: sanitizeDetails(details),
  };

  // Armazenar localmente para análise offline
  try {
    const logs = await AsyncStorage.getItem(SECURITY_LOGS_KEY);
    const existingLogs = logs ? JSON.parse(logs) : [];
    
    // Manter apenas os últimos 100 eventos
    const updatedLogs = [event, ...existingLogs].slice(0, MAX_LOCAL_LOGS);
    await AsyncStorage.setItem(SECURITY_LOGS_KEY, JSON.stringify(updatedLogs));
  } catch (error) {
    console.error('Erro ao armazenar log de segurança local:', error);
  }

  // Enviar ao servidor se configurado
  if (sendToServer) {
    await sendEventToServer(event);
  }
};

/**
 * Envia evento ao servidor de logging de segurança
 * @param {object} event - Evento a enviar
 */
const sendEventToServer = async (event) => {
  try {
    const response = await fetch(
      `${process.env.VITE_API_BASE_URL}/api/security/log`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Timestamp': new Date().toISOString(),
        },
        body: JSON.stringify(event),
      }
    );

    if (!response.ok) {
      console.warn('Erro ao enviar log de segurança ao servidor:', response.status);
    }
  } catch (error) {
    // Falhar silenciosamente para não impactar UX
    console.error('Erro de conexão ao enviar log de segurança:', error);
  }
};

/**
 * Sanitiza detalhes do evento para não incluir dados sensíveis
 * @param {object} details - Detalhes brutos
 * @returns {object} Detalhes sanitizados
 */
const sanitizeDetails = (details) => {
  const sanitized = { ...details };
  
  // Remover ou mascarar dados sensíveis
  if (sanitized.email) {
    const [local, domain] = sanitized.email.split('@');
    sanitized.email = `${local.slice(0, 2)}***@${domain}`;
  }
  
  if (sanitized.password) {
    delete sanitized.password;
  }
  
  if (sanitized.token) {
    sanitized.token = sanitized.token.slice(0, 10) + '...';
  }

  return sanitized;
};

/**
 * Recupera logs de segurança armazenados localmente
 * @returns {array} Array de eventos de segurança
 */
export const getLocalSecurityLogs = async () => {
  try {
    const logs = await AsyncStorage.getItem(SECURITY_LOGS_KEY);
    return logs ? JSON.parse(logs) : [];
  } catch (error) {
    console.error('Erro ao recuperar logs de segurança:', error);
    return [];
  }
};

/**
 * Limpa logs de segurança locais
 * Normalmente chamado após sincronizar com servidor
 */
export const clearLocalSecurityLogs = async () => {
  try {
    await AsyncStorage.removeItem(SECURITY_LOGS_KEY);
  } catch (error) {
    console.error('Erro ao limpar logs de segurança:', error);
  }
};

/**
 * Tipos de eventos de segurança predefinidos
 */
export const SECURITY_EVENTS = {
  LOGIN_ATTEMPT: 'LOGIN_ATTEMPT',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILED: 'LOGIN_FAILED',
  LOGIN_LOCKED: 'LOGIN_LOCKED',
  LOGOUT: 'LOGOUT',
  INVALID_INPUT: 'INVALID_INPUT',
  BRUTE_FORCE_DETECTED: 'BRUTE_FORCE_DETECTED',
  SESSION_EXPIRED: 'SESSION_EXPIRED',
  UNAUTHORIZED_ACCESS: 'UNAUTHORIZED_ACCESS',
  SSL_PINNING_FAILED: 'SSL_PINNING_FAILED',
};

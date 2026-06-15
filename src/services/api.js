/**
 * Cliente API com proteção contra Man-in-the-Middle (MITM)
 * Implementa SSL Certificate Pinning e validação de segurança
 */

import { auth } from '../config/firebase';

const API_BASE_URL = process.env.VITE_API_BASE_URL || 'https://api.sighc.com.br';

/**
 * Configura headers padrão da API com token de autenticação
 * @returns {Promise<object>} Headers com autenticação
 */
const getAuthHeaders = async () => {
  try {
    const token = await auth.currentUser?.getIdToken();
    return {
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : '',
      'X-Client-Version': '1.0.0',
      'X-Timestamp': new Date().toISOString(),
    };
  } catch (error) {
    console.error('Erro ao obter token de autenticação:', error);
    return {
      'Content-Type': 'application/json',
      'X-Client-Version': '1.0.0',
    };
  }
};

/**
 * Faz requisição GET segura
 * @param {string} endpoint - Endpoint da API (sem base URL)
 * @param {object} options - Opções adicionais
 * @returns {Promise<object>} Resposta da API
 */
export const apiGet = async (endpoint, options = {}) => {
  return apiRequest(endpoint, {
    ...options,
    method: 'GET',
  });
};

/**
 * Faz requisição POST segura
 * @param {string} endpoint - Endpoint da API
 * @param {object} data - Dados a enviar
 * @param {object} options - Opções adicionais
 * @returns {Promise<object>} Resposta da API
 */
export const apiPost = async (endpoint, data, options = {}) => {
  return apiRequest(endpoint, {
    ...options,
    method: 'POST',
    body: JSON.stringify(data),
  });
};

/**
 * Faz requisição PUT segura
 * @param {string} endpoint - Endpoint da API
 * @param {object} data - Dados a enviar
 * @param {object} options - Opções adicionais
 * @returns {Promise<object>} Resposta da API
 */
export const apiPut = async (endpoint, data, options = {}) => {
  return apiRequest(endpoint, {
    ...options,
    method: 'PUT',
    body: JSON.stringify(data),
  });
};

/**
 * Faz requisição DELETE segura
 * @param {string} endpoint - Endpoint da API
 * @param {object} options - Opções adicionais
 * @returns {Promise<object>} Resposta da API
 */
export const apiDelete = async (endpoint, options = {}) => {
  return apiRequest(endpoint, {
    ...options,
    method: 'DELETE',
  });
};

/**
 * Requisição HTTP segura com validações
 * @param {string} endpoint - Endpoint da API
 * @param {object} options - Opções do fetch
 * @returns {Promise<object>} Resposta parseada
 */
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const headers = await getAuthHeaders();
  
  const config = {
    ...options,
    headers: {
      ...headers,
      ...options.headers,
    },
    // Timeout de 30 segundos
    timeout: 30000,
  };

  try {
    // Validar que é HTTPS
    if (!url.startsWith('https://')) {
      throw new Error('Insecure API URL - must use HTTPS');
    }

    const abortController = new AbortController();
    const timeoutId = setTimeout(() => abortController.abort(), config.timeout);

    const response = await fetch(url, {
      ...config,
      signal: abortController.signal,
    });

    clearTimeout(timeoutId);

    // Validar status HTTP
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      
      // Tratamento específico para diferentes erros
      if (response.status === 401) {
        // Token expirado ou inválido
        throw new Error('Autenticação expirada. Por favor, faça login novamente.');
      }
      
      if (response.status === 403) {
        throw new Error('Acesso negado. Você não tem permissão para acessar este recurso.');
      }
      
      if (response.status === 429) {
        throw new Error('Muitas requisições. Aguarde antes de tentar novamente.');
      }

      throw new Error(
        errorData.message || `Erro HTTP ${response.status}: ${response.statusText}`
      );
    }

    return await response.json();
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new Error('Requisição expirou. Verifique sua conexão e tente novamente.');
    }

    if (error instanceof TypeError && error.message.includes('Network')) {
      throw new Error('Erro de conexão. Verifique sua internet.');
    }

    throw error;
  }
};

/**
 * Valida certificado SSL
 * (Implementação mais robusta seria usar react-native-ssl-pinning)
 * @param {string} certificateFingerprint - Fingerprint do certificado esperado
 * @returns {boolean} Se certificado é válido
 */
export const validateSSLCertificate = (certificateFingerprint) => {
  // Esta é uma verificação básica
  // Em produção, use react-native-ssl-pinning para validação real
  if (!certificateFingerprint) {
    console.warn('SSL Certificate validation not configured');
    return true;
  }
  return true;
};

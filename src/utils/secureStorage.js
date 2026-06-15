/**
 * Wrapper para armazenamento seguro com SecureStore (iOS) e EncryptedSharedPreferences (Android)
 * Fornece uma interface segura para armazenar dados sensíveis
 */

import * as SecureStore from 'expo-secure-store';

/**
 * Armazena um valor de forma segura
 * @param {string} key - Chave para o valor
 * @param {string} value - Valor a armazenar
 * @returns {Promise<void>}
 */
export const setSecureValue = async (key, value) => {
  try {
    await SecureStore.setItemAsync(key, value);
  } catch (error) {
    console.error(`Erro ao armazenar valor seguro (${key}):`, error);
    throw error;
  }
};

/**
 * Recupera um valor armazenado de forma segura
 * @param {string} key - Chave do valor
 * @returns {Promise<string|null>} O valor armazenado ou null
 */
export const getSecureValue = async (key) => {
  try {
    return await SecureStore.getItemAsync(key);
  } catch (error) {
    console.error(`Erro ao recuperar valor seguro (${key}):`, error);
    return null;
  }
};

/**
 * Remove um valor armazenado de forma segura
 * @param {string} key - Chave do valor
 * @returns {Promise<void>}
 */
export const deleteSecureValue = async (key) => {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (error) {
    console.error(`Erro ao deletar valor seguro (${key}):`, error);
    throw error;
  }
};

/**
 * Remove todos os valores armazenados de forma segura
 * Útil para logout completo
 * @returns {Promise<void>}
 */
export const clearAllSecureValues = async () => {
  try {
    // Remover chaves conhecidas
    const keys = [
      'firebase_auth_token',
      'refresh_token',
      'user_session_data',
    ];

    for (const key of keys) {
      try {
        await deleteSecureValue(key);
      } catch (error) {
        // Continuar mesmo se uma chave não existir
        console.debug(`Chave ${key} não encontrada`);
      }
    }
  } catch (error) {
    console.error('Erro ao limpar valores seguros:', error);
    throw error;
  }
};

/**
 * Chaves padrão para armazenamento seguro
 */
export const SECURE_KEYS = {
  AUTH_TOKEN: 'firebase_auth_token',
  REFRESH_TOKEN: 'refresh_token',
  USER_SESSION: 'user_session_data',
  PIN: 'app_pin',
};

/**
 * Validadores de segurança para entrada de usuários
 * Implementa validação rigorosa de email e senha para prevenir ataques
 */

/**
 * Valida formato e comprimento de email
 * @param {string} email - Email a validar
 * @throws {Error} Se email for inválido
 * @returns {string} Email normalizado (lowercase)
 */
export const validateEmail = (email) => {
  if (!email || typeof email !== 'string') {
    throw new Error('E-mail deve ser uma string válida.');
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const trimmedEmail = email.trim();

  if (!emailRegex.test(trimmedEmail)) {
    throw new Error('Formato de e-mail inválido.');
  }

  if (trimmedEmail.length > 254) {
    throw new Error('E-mail muito longo (máximo 254 caracteres).');
  }

  if (trimmedEmail.length < 5) {
    throw new Error('E-mail muito curto.');
  }

  return trimmedEmail.toLowerCase();
};

/**
 * Valida força e comprimento de senha
 * @param {string} password - Senha a validar
 * @throws {Error} Se senha não atender aos requisitos
 * @returns {string} Senha validada
 */
export const validatePassword = (password) => {
  if (!password || typeof password !== 'string') {
    throw new Error('Senha deve ser uma string válida.');
  }

  if (password.length < 8) {
    throw new Error('Senha deve ter no mínimo 8 caracteres.');
  }

  if (password.length > 128) {
    throw new Error('Senha muito longa (máximo 128 caracteres).');
  }

  // Verificar se não contém apenas números ou apenas letras
  const hasLetters = /[a-zA-Z]/.test(password);
  const hasNumbers = /[0-9]/.test(password);
  const hasSpecialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);

  if (!hasLetters) {
    throw new Error('Senha deve conter pelo menos uma letra.');
  }

  if (!hasNumbers && !hasSpecialChars) {
    throw new Error('Senha deve conter números ou caracteres especiais.');
  }

  return password;
};

/**
 * Sanitiza string para prevenir XSS
 * @param {string} str - String a sanitizar
 * @returns {string} String sanitizada
 */
export const sanitizeString = (str) => {
  if (typeof str !== 'string') return '';
  
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};

/**
 * Valida comprimento de input genérico
 * @param {string} input - Input a validar
 * @param {number} minLength - Comprimento mínimo
 * @param {number} maxLength - Comprimento máximo
 * @throws {Error} Se input não passar na validação
 * @returns {string} Input validado
 */
export const validateInputLength = (input, minLength = 1, maxLength = 256) => {
  if (!input || typeof input !== 'string') {
    throw new Error('Input deve ser uma string válida.');
  }

  const trimmed = input.trim();

  if (trimmed.length < minLength) {
    throw new Error(`Input deve ter no mínimo ${minLength} caracteres.`);
  }

  if (trimmed.length > maxLength) {
    throw new Error(`Input deve ter no máximo ${maxLength} caracteres.`);
  }

  return trimmed;
};

import axios from 'axios';
import { auth } from '../config/firebase'; // Assumindo que 'auth' é exportado de firebase.js
import { API_BASE_URL } from '@env'; // Importa a variável de ambiente VITE_API_BASE_URL como API_BASE_URL

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor de requisição para injetar o Firebase ID Token
api.interceptors.request.use(
  async (config) => {
    const user = auth.currentUser;
    if (user) {
      const idToken = await user.getIdToken();
      config.headers.Authorization = `Bearer ${idToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
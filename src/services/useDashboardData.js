import { useState, useEffect, useCallback } from 'react';
import api from '../services/api'; // Importa o serviço de API configurado

/**
 * Hook customizado para buscar dados do dashboard.
 * Assume que o backend expõe um endpoint /api/v1/dashboard que retorna
 * summary, recentActivities e userProfile combinados.
 *
 * @param {object} user - O objeto de usuário do Firebase Auth (auth.currentUser).
 * @returns {{data: object, loading: boolean, error: string, refetch: function}}
 */
const useDashboardData = (user) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    if (!user || !user.uid) {
      setError('Usuário não autenticado.');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await api.get(`/api/v1/dashboard`, { params: { uid: user.uid } });
      setData(response.data);
    } catch (err) {
      console.error('Erro ao buscar dados do dashboard:', err);
      setError('Falha ao carregar os dados do dashboard. Tente novamente.');
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
};

export default useDashboardData;
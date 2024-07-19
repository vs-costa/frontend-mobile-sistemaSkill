import { useState } from 'react';
import { api } from '../api/AuthContext';
import { UserSkill } from '../types/Types';


const useUserSkillsApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Função para buscar skills ordenadas
  const fetchSortedSkills = async (order: 'asc' | 'desc'): Promise<UserSkill[]> => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get(`/usuarioSkill/listarOrdenadasPorNomeSkill${order === 'asc' ? 'Asc' : 'Desc'}`);
      if (Array.isArray(response.data)) {
        return response.data;
      } else {
        throw new Error("Resposta da API não é um array.");
      }
    } catch (err) {
      setError((err as Error).message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Função para deletar skill
  const handleDeleteSkill = async (userSkillId: number): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      await api.delete(`/usuarioSkill/excluir/${userSkillId}`);
    } catch (err) {
      setError((err as Error).message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Função para atualizar o nível da skill
  const updateSkillLevel = async (userSkillId: number, newLevel: string): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      await api.put(`/usuarioSkill/atualizar/${userSkillId}`, { level: newLevel });
    } catch (err) {
      setError((err as Error).message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    fetchSortedSkills,
    handleDeleteSkill,
    updateSkillLevel,
    loading,
    error
  };
};

export default useUserSkillsApi;

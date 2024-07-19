import { useState } from 'react';
import { UserSkill } from '../types/Types';

type SortOrder = 'asc' | 'desc';

interface UseSortProps {
  sortOrder: SortOrder;
  handleSortOrderChange: () => void;
}

const useSort = (fetchSortedSkills: (order: SortOrder) => Promise<UserSkill[]>) : UseSortProps => {
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  const handleSortOrderChange = async () => {
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newSortOrder);
    try {
      await fetchSortedSkills(newSortOrder);
    } catch (error) {
      console.error('Erro ao buscar skills ordenadas:', error);
    }
  };

  return {
    sortOrder,
    handleSortOrderChange,
  };
};

export default useSort;

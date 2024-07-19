import { useState } from 'react';
import { api } from '../api/AuthContext';
import { Skill, UserSkill } from '../types/Types';
import useToast from './UseToast';

const useSkillManagement = (
  userId: number,
  skills: Skill[], // Adiciona skills como um parâmetro
  setUserSkills: (skills: UserSkill[]) => void
) => {
  const [selectedSkill, setSelectedSkill] = useState<string | undefined>(undefined);
  const [selectedLevel, setSelectedLevel] = useState<string>('INICIANTE');
  const { showToast } = useToast();

  const handleSaveSkill = () => {
    if (!selectedSkill) {
      console.error('Nenhuma skill selecionada');
      return;
    }

    const newUserSkill = {
      level: selectedLevel,
      skillId: skills.find(skill => skill.nome === selectedSkill)?.id || 0,
      usuarioId: userId,
    };

    api.post('/usuarioSkill/salvar', newUserSkill)
      .then(response => {
        console.log('Habilidade de usuário salva com sucesso:', response.data);
        setUserSkills((prevUserSkills: UserSkill[]) => [...prevUserSkills, response.data]);
        setSelectedSkill(undefined);
        showToast('Skill adicionada com sucesso!');
      })
      .catch(error => {
        console.error('Erro ao salvar habilidade de usuário:', error);
        showToast('Erro ao adicionar skill. Tente novamente.');
      });
  };

  const handleLevelSelection = (level: string) => {
    setSelectedLevel(level);
    handleSaveSkill();
  };

  return {
    selectedSkill,
    setSelectedSkill,
    selectedLevel,
    handleLevelSelection,
    handleSaveSkill,
  };
};

export default useSkillManagement;

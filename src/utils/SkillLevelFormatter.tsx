import React from 'react';
import { Text } from 'react-native';

interface SkillLevelFormatterProps {
  level: string;
}

const SkillLevelFormatter: React.FC<SkillLevelFormatterProps> = ({ level }) => {
  const skillLevelFormatter = (level: string) => {
    switch (level) {
      case 'INICIANTE':
        return 'Iniciante';
      case 'INTERMEDIARIO':
        return 'Intermediário';
      case 'AVANCADO':
        return 'Avançado';
      default:
        return level;
    }
  };

  return <Text>{skillLevelFormatter(level)}</Text>;
};

export default SkillLevelFormatter;
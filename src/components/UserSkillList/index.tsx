import React from 'react';
import { View, Text } from 'react-native';
import { Avatar, IconButton } from 'react-native-paper';
import SkillLevelFormatter from '../../utils/SkillLevelFormatter';
import { styles } from './styles';

interface UserSkillListProps {
  userSkill: {
    id: number;
    skillImagem: string;
    skillNome: string;
    skillDescricao: string;
    level: string;
  };
  onEdit: (userSkill: any) => void;
  onDelete: (userSkill: any) => void;
}

const UserSkillList: React.FC<UserSkillListProps> = ({ userSkill, onEdit, onDelete }) => {
  return (
    <View style={styles.listItem}>
      <Avatar.Image
        source={{ uri: userSkill.skillImagem }}
        size={64}
        style={styles.avatar}
      />
      <View style={styles.listItemContent}>
        <Text style={styles.listItemTitle}>{userSkill.skillNome}</Text>
        <Text style={styles.listItemDescription}>{userSkill.skillDescricao}</Text>
        <Text style={styles.listItemLevel}>Nível: <SkillLevelFormatter level={userSkill.level} /></Text>
      </View>
      <View style={styles.actions}>
        <View style={styles.actionButton}>
          <IconButton icon="pencil" iconColor='#0958d9' onPress={() => onEdit(userSkill)} />
        </View>
        <View style={styles.actionButton}>
          <IconButton
            icon="delete"
            iconColor='#ff0000'
            onPress={() => onDelete(userSkill)} />
        </View>
      </View>
    </View>
  );
};

export default UserSkillList
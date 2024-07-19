import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';
import { styles } from './styles';

interface ActionButtonsProps {
  onAddSkill: () => void;
  onLogout: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ onAddSkill, onLogout }) => (
  <View>
    <Button mode="contained" onPress={onAddSkill} style={styles.addButton}>
      Adicionar Skill
    </Button>
    <Button onPress={onLogout} style={styles.logoutButton} textColor='#0958d9'>
      Logout
    </Button>
  </View>
);

export default ActionButtons;
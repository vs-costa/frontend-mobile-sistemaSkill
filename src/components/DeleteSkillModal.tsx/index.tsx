import React from 'react';
import { View, Text } from 'react-native';
import { Modal, Button } from 'react-native-paper';
import { UserSkill } from '../../types/Types';
import { styles } from './styles';

interface DeleteSkillModalProps {
  visible: boolean;
  onDismiss: () => void;
  skillToDelete: UserSkill | null;
  handleDeleteSkill: (skill: UserSkill) => void;
}

const DeleteSkillModal: React.FC<DeleteSkillModalProps> = ({ visible, onDismiss, skillToDelete, handleDeleteSkill }) => {
  return (
    <Modal visible={visible} onDismiss={onDismiss} contentContainerStyle={styles.modalContainer}>
      <View style={styles.modalContent}>
        <Text style={styles.title}>Confirmação de Exclusão</Text>
        <Text style={styles.modalText}>Tem certeza de que deseja excluir esta habilidade?</Text>
        <Button mode='outlined' style={styles.outlinedButtonStyle} buttonColor='#fff' textColor='#FF0000' onPress={() => {
          if (skillToDelete) { handleDeleteSkill(skillToDelete); onDismiss(); }
        }}>
          Confirmar
        </Button>
        <Button mode='text' textColor='#0958d9' style={{ marginTop: 15 }} onPress={onDismiss}>Cancelar</Button>
      </View>
    </Modal>
  );
};

export default DeleteSkillModal;
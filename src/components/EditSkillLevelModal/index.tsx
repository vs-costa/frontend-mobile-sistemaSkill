import React from 'react';
import { View } from 'react-native';
import { Modal, Button, Dialog } from 'react-native-paper';
import { UserSkill } from '../../types/Types';
import { styles } from './styles'; // Altere o caminho conforme necessário

interface EditSkillLevelModalProps {
  visible: boolean;
  onDismiss: () => void;
  selectedSkillForEdit: UserSkill | null;
  updateSkillLevel: (userSkill: UserSkill, newLevel: string) => void;
}

const EditSkillLevelModal: React.FC<EditSkillLevelModalProps> = ({
  visible,
  onDismiss,
  selectedSkillForEdit,
  updateSkillLevel,
}) => {
  return (
    <Modal visible={visible} onDismiss={onDismiss} contentContainerStyle={styles.modalContainer}>
      <View style={styles.modalContent}>
        <Dialog.Title>Editar Nível da Skill</Dialog.Title>
        <Button
          mode="contained"
          onPress={() => updateSkillLevel(selectedSkillForEdit, 'INICIANTE')}
          style={styles.levelButton}
        >
          Iniciante
        </Button>
        <Button
          mode="contained"
          onPress={() => updateSkillLevel(selectedSkillForEdit, 'INTERMEDIARIO')}
          style={styles.levelButton}
        >
          Intermediário
        </Button>
        <Button
          mode="contained"
          onPress={() => updateSkillLevel(selectedSkillForEdit, 'AVANCADO')}
          style={styles.levelButton}
        >
          Avançado
        </Button>
        <Dialog.Actions>
          <Button style={{ marginTop: 15 }} onPress={onDismiss} textColor='#0958d9'>Cancelar</Button>
        </Dialog.Actions>
      </View>
    </Modal>
  );
};

export default EditSkillLevelModal;
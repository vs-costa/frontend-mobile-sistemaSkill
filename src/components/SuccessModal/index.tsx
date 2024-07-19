import React from 'react';
import { View } from 'react-native';
import { Modal, Title } from 'react-native-paper';
import { Feather } from '@expo/vector-icons';
import { styles } from './styles';

interface SuccessModalProps {
  visible: boolean;
  onDismiss: () => void;
  message: string;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ visible, onDismiss, message }) => {
  return (
    <Modal visible={visible} style={styles.modalContainer} onDismiss={onDismiss}>
      <View style={styles.modalContent}>
        <Feather name="check-circle" size={34} color="green" style={{ marginBottom: 15 }} />
        <Title style={styles.modalText}>{message}</Title>
      </View>
    </Modal>
  );
};

export default SuccessModal;

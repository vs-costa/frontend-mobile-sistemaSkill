import React, { useState } from 'react';
import { TextInput, Button, Title, Modal } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { api } from '../../api/AuthContext';

const Cadastro = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  const cadastrar = async () => {
    try {
      await api.post('/systemUser/registro?email=' + email, {
        email: email,
        senha: senha,
      });

      setModalVisible(true);

      setTimeout(() => {
        setModalVisible(false);
        navigation.navigate('Login');
      }, 1000);
    } catch (error) {
      console.log('Erro ao cadastrar usuário:', error);
      alert('Erro ao cadastrar usuário. Por favor, tente novamente.');
  }
};

return (
  <View style={styles.container}>
    <Title style={styles.title}>Cadastro</Title>
    <TextInput
      label="Email"
      value={email}
      onChangeText={text => setEmail(text)}
      style={styles.input}
    />
    <TextInput
      label="Senha"
      value={senha}
      onChangeText={text => setSenha(text)}
      secureTextEntry
      style={styles.input}
    />
    <TextInput
      label="Confirmar Senha"
      value={confirmPassword}
      onChangeText={text => setConfirmPassword(text)}
      secureTextEntry
      style={styles.input}
    />
    <Button mode="contained" onPress={cadastrar} style={styles.button}>
      Cadastrar
    </Button>
    <Modal visible={modalVisible} onDismiss={() => setModalVisible(false)}>
      <View style={styles.modalContainer}>
        <Title style={styles.modalTitle}>Cadastro realizado com sucesso!</Title>
      </View>
    </Modal>
  </View>
);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    marginBottom: 20,
  },
  input: {
    marginBottom: 10,
    width: '100%',
  },
  button: {
    width: '100%',
    marginTop: 10,
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    textAlign: 'center',
  },
});

export default Cadastro;

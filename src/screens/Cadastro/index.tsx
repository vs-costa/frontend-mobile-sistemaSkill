import React, { useState } from 'react';
import { TextInput, Button, Title, Modal } from 'react-native-paper';
import { View, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { api } from '../../api/AuthContext';
import { styles } from './styles';

const Cadastro = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
      <Image
        source={{ uri: 'https://vsoares.com/wp-content/uploads/2024/04/logo.png' }}
        style={styles.logo}
      />
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
        style={styles.input}
        secureTextEntry={!showPassword}
        right={<TextInput.Icon icon={showPassword ? 'eye-off' : 'eye'}
        onPress={() => setShowPassword(!showPassword)} />}
      />
      <TextInput
        label="Confirmar Senha"
        value={confirmPassword}
        onChangeText={text => setConfirmPassword(text)}
        style={styles.input}
        secureTextEntry={!showConfirmPassword}
        right={<TextInput.Icon icon={showConfirmPassword ? 'eye-off' : 'eye'}
        onPress={() => setShowConfirmPassword(!showConfirmPassword)} />}
      />
      <Button mode="contained" onPress={cadastrar}
        labelStyle={{ color: '#FFFFFF', fontSize: 16 }}
        buttonColor="#0958d9"
        style={styles.button}>
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

export default Cadastro;

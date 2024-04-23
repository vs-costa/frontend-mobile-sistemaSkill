import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Title, Checkbox, Text, Modal } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../api/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberCredentials, setRememberCredentials] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false); // State para controlar a exibição do modal
  const navigation = useNavigation();
  const { login } = useAuth();

  useEffect(() => {
    const loadStoredCredentials = async () => {
      const rememberedEmail = await AsyncStorage.getItem('email');
      const rememberedPassword = await AsyncStorage.getItem('password');
      if (rememberedEmail && rememberedPassword) {
        setEmail(rememberedEmail);
        setPassword(rememberedPassword);
        setRememberCredentials(true);
      } else {
        setRememberCredentials(false);
      }
    };

    loadStoredCredentials();
  }, []);

  const handleRememberCredentialsChange = async () => {
    const newValue = !rememberCredentials;
    setRememberCredentials(newValue);

    if (!newValue) {
      setEmail('');
      setPassword('');
      await AsyncStorage.removeItem('email'); // Remove o email do AsyncStorage
      await AsyncStorage.removeItem('password'); // Remove a senha do AsyncStorage
    }
  };

  const handleLogin = async () => {
    try {
      setLoading(true);
      await login(email, password);
      setLoading(false);
      setError('');
      setShowSuccessModal(true); // Exibir o modal quando o login for bem-sucedido
      if (rememberCredentials) {
        await AsyncStorage.setItem('email', email);
        await AsyncStorage.setItem('password', password);
      } else {
        await AsyncStorage.removeItem('email');
        await AsyncStorage.removeItem('password');
      }
      setTimeout(() => {
        setShowSuccessModal(false); // Esconder o modal após alguns segundos
        navigation.navigate('Home');
      }, 2000); // Tempo em milissegundos para exibir o modal
    } catch (error) {
      setLoading(false);
      setError('Email ou senha incorretos');
    }
  };

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Login</Title>
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        label="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Checkbox.Item
        label="Lembrar login e senha"
        status={rememberCredentials ? 'checked' : 'unchecked'}
        onPress={handleRememberCredentialsChange}
        style={styles.checkbox}
      />
      <Button
        mode="contained"
        onPress={handleLogin}
        loading={loading}
        style={styles.button}
      >
        Entrar
      </Button>
      <Text style={styles.link} onPress={() => navigation.navigate('Cadastro')}>
        Ainda não tem cadastro? Clique aqui!
      </Text>
      {error !== '' && <Text style={styles.error}>{error}</Text>}
      <Modal visible={showSuccessModal} onDismiss={() => setShowSuccessModal(false)}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>Login bem-sucedido!</Text>
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
  checkbox: {
    width: '100%',
    marginBottom: 10,
  },
  button: {
    width: '100%',
    marginTop: 10,
  },
  link: {
    marginTop: 10,
    color: 'blue',
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    textAlign: 'center',
  },
});

export default Login;

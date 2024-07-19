import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { TextInput, Button, Title, Checkbox, Text, Modal, IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../api/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './styles';
import { Feather } from '@expo/vector-icons';
import SuccessModal from '../../components/SuccessModal';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberCredentials, setRememberCredentials] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
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
      await AsyncStorage.removeItem('email');
      await AsyncStorage.removeItem('password');
    } else {
      await AsyncStorage.removeItem('email');
      await AsyncStorage.removeItem('password');
    }
  };

  const handleLogin = async () => {
    try {
      setLoading(true);
      await login(email, password);
      setLoading(false);
      setError('');
      setShowSuccessModal(true);
      if (rememberCredentials) {
        await AsyncStorage.setItem('email', email);
        await AsyncStorage.setItem('password', password);
      } else {
        await AsyncStorage.removeItem('email');
        await AsyncStorage.removeItem('password');
      }
      setTimeout(() => {
        setShowSuccessModal(false);
        navigation.navigate('Home');
      }, 1500);
    } catch (error) {
      setLoading(false);
      setError('Email ou senha incorretos');
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://vsoares.com/wp-content/uploads/2024/04/logo.png' }}
        style={styles.logo}
      />
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
        style={styles.input}
        secureTextEntry={!showPassword}
        right={<TextInput.Icon icon={showPassword ? 'eye-off' : 'eye'}
          onPress={() => setShowPassword(!showPassword)} />}
      />
      <Checkbox.Item
        label="Lembrar login e senha"
        status={rememberCredentials ? 'checked' : 'unchecked'}
        onPress={handleRememberCredentialsChange}
        style={styles.checkbox}
        color='#fff'
        uncheckedColor='#fff'
        labelStyle={{ color: '#FFFFFF', fontSize: 16 }}
      />
      <Button
        mode="contained"
        onPress={handleLogin}
        loading={loading}
        style={styles.button}
        labelStyle={{ color: '#FFFFFF', fontSize: 16 }}
        buttonColor="#0958d9"
      >
        Entrar
      </Button>
      <Text style={styles.link} onPress={() => navigation.navigate('Cadastro')}>
        Ainda não tem cadastro? Clique aqui!
      </Text>
      {error !== '' && <Text style={styles.error}>{error}</Text>}
      <SuccessModal
        visible={showSuccessModal}
        onDismiss={() => setShowSuccessModal(false)}
        message="Login bem-sucedido!"
      />
    </View>
  );
};

export default Login;

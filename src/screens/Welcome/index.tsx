import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { styles } from './styles';

const Welcome = () => {
  const navigation = useNavigation();

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://vsoares.com/wp-content/uploads/2024/04/logo.png' }}
        style={styles.logo}
      />
      <Text style={styles.title}>Bem-vindo ao Nosso App!</Text>
      <Text style={styles.subtitle}>Faça login para acessar o conteúdo.</Text>
      <Button
        mode="contained"
        onPress={handleLogin}
        style={styles.button}
        labelStyle={{ color: '#FFFFFF', fontSize: 16 }}
        buttonColor="#0958d9"
      >
        Login
      </Button>
    </View>
  );
};

export default Welcome;

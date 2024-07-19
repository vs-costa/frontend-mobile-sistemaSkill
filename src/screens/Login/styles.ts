import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      backgroundColor: '#001d66',
    },
    logo: {
      width: 150,
      height: 150,
      marginBottom: 20,
    },
    title: {
      marginBottom: 20,
      color: '#FFFFFF',
    },
    input: {
      marginBottom: 10,
      width: '100%',
      backgroundColor: '#FFFFFF',
    },
    checkbox: {
      width: '100%',
      marginBottom: 10,
      color: '#FFFFFF',
    },
    button: {
      width: '100%',
      marginTop: 10,
      borderRadius: 8,
    },
    link: {
      marginTop: 10,
      color: '#FFFFFF',
    },
    error: {
      color: 'red',
      marginBottom: 10,
    },
  });
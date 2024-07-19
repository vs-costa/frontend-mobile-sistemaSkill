import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
      modalContent: {
        width: '80%',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },   
    title: {
      marginBottom: 20,
      color: '#FFFFFF',
    },
    modalText: {
        textAlign: 'center',
        fontSize: 18,
      },
    button: {
      width: '100%',
      marginTop: 10,
      borderRadius: 8,
    },
    outlinedButtonStyle: {
        borderWidth: 1,
        borderColor: '#FF0000',
        marginTop: 10,
      },
  });
  
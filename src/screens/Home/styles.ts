import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      marginTop: 20,
      backgroundColor: '#FFFFFF',
    },
    title: {
      fontSize: 30,
      marginTop: 10,
      marginBottom: 10,
      color: '#0958d9',
    },
    noSkills: {
      fontSize: 16,
      marginTop: 10,
    },
    addButton: {
      marginTop: 20,
      backgroundColor: '#0958d9',
    },
    logoutButton: {
      marginTop: 10,
      alignSelf: 'center',
    },
    actions: {
      flexDirection: 'row',
    },
    listItem: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#ddd',
    },
    listItemContent: {
      flex: 1,
      marginLeft: 10,
    },
    listItemTitle: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    listItemDescription: {
      fontSize: 14,
      marginTop: 5,
    },
    listItemLevel: {
      fontSize: 16,
      marginTop: 5,
      fontWeight: 'bold',
    },
    levelButton: {
      marginTop: 10,
      backgroundColor: '#0958d9',
      color: '#fff'
    },
    modalContent: {
      backgroundColor: 'white',
      padding: 20,
      borderRadius: 10,
    },
    levelLabel: {
      marginTop: 20,
      marginBottom: 10,
      fontSize: 16,
      fontWeight: 'bold',
    },
  });
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 20,
    backgroundColor: '#FFFFFF',
  },
  mainTitle: {
    fontSize: 34,
    marginTop: 10,
    marginBottom: 10,
    color: '#0958d9',
    fontWeight: 'bold'
  },
  filterInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
    backgroundColor: '#f9f9f9',
    fontSize: 16,
  },
  noSkills: {
    fontSize: 16,
    marginTop: 10,
  },
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
  },
  levelLabel: {
    marginTop: 20,
    marginBottom: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  levelButton: {
    marginTop: 10,
    backgroundColor: '#0958d9',
    color: '#fff'
  },
  salvarCancelarButton: {
    marginTop: 10,
  },
});
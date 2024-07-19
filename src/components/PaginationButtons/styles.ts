import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  paginationButton: {
    flex: 1,
    marginHorizontal: 10,
  },
  paginationText: {
    flex: 1,
    textAlign: 'center',
  },
});
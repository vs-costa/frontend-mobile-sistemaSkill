import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    avatar: {
        backgroundColor: 'white',
        borderRadius: 100,
    },
    listItemContent: {
        flex: 1,
        marginLeft: 10,
    },
    listItemTitle: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    listItemDescription: {
        fontSize: 14,
        color: '#666',
    },
    listItemLevel: {
        fontSize: 14,
        color: '#333',
    },
    actions: {
        flexDirection: 'row',
    },
    actionButton: {
        marginLeft: 10,
    },
});
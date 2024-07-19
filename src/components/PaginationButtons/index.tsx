import React from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-paper';
import { styles } from './styles';

interface PaginationButtonsProps {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  onPrevious: () => void;
  onNext: () => void;
}

const PaginationButtons: React.FC<PaginationButtonsProps> = ({
  currentPage,
  itemsPerPage,
  totalItems,
  onPrevious,
  onNext
}) => (
  <View style={styles.paginationContainer}>
    <Button
      mode="outlined"
      disabled={currentPage === 1}
      onPress={onPrevious}
      style={styles.paginationButton}
      textColor='#0958d9'
    >
      Anterior
    </Button>
    <Text style={styles.paginationText}>Página {currentPage}</Text>
    <Button
      mode="outlined"
      disabled={currentPage * itemsPerPage >= totalItems}
      onPress={onNext}
      style={styles.paginationButton}
      textColor='#0958d9'
    >
      Próxima
    </Button>
  </View>
);

export default PaginationButtons;
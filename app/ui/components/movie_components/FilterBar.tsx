import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import theme from '../../styles/theme';

interface FilterBarProps {
  setSortBy: (sortBy: string) => void;
  sortBy: string;
  setOrder: (order: string) => void;
  order: string;
}

const FilterBar: React.FC<FilterBarProps> = ({ setSortBy, sortBy, setOrder, order }) => {
  return (
    <View style={styles.filterContainer}>
      <TouchableOpacity
        style={[styles.button, sortBy === 'default' && styles.selectedButton]}
        onPress={() => setSortBy('default')}
      >
        <Text style={[styles.buttonText, sortBy === 'default' && styles.selectedButtonText]}>Default</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, sortBy === 'date' && styles.selectedButton]}
        onPress={() => setSortBy('date')}
      >
        <Text style={[styles.buttonText, sortBy === 'date' && styles.selectedButtonText]}>Date</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, sortBy === 'rating' && styles.selectedButton]}
        onPress={() => setSortBy('rating')}
      >
        <Text style={[styles.buttonText, sortBy === 'rating' && styles.selectedButtonText]}>Rating</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonToggle}
        onPress={() => setOrder(order === 'asc' ? 'desc' : 'asc')}
      >
        <Text style={styles.selectedButtonText}>{order === 'asc' ? 'Ascending' : 'Descending'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  button: {
    padding: 10,
    borderRadius: 5,
  },
  buttonToggle: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: theme.colors.background_soft,
  },
  selectedButton: {
    backgroundColor: theme.colors.background_soft,
  },
  buttonText: {
    color: '#fff',
  },
  selectedButtonText: {
    color: theme.colors.primary,
  },
});

export default FilterBar;

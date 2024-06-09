// SearchScreenUI.jsx
import React from 'react';
import { FlatList, View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import Movie from '../../interfaces/Movie';
import theme from '../styles/theme';

interface SearchScreenUIProps {
  movies: Movie[];
  searchInput: string;
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
  handleFilter: (filter: 'date' | 'rating' | 'default') => void;
  toggleSorter: () => void;
  currentFilter: 'date' | 'rating' | 'default';
  currentSorter: 'asc' | 'desc';
}

const SearchScreenUI: React.FC<SearchScreenUIProps> = ({
  movies,
  searchInput,
  setSearchInput,
  handleFilter,
  toggleSorter,
  currentFilter,
  currentSorter,
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, styles.textInput]} // Aplicar clase de estilo para el TextInput
        placeholder="Search movies..."
        placeholderTextColor={theme.colors.text_light}
        value={searchInput}
        onChangeText={setSearchInput}
      />
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[
            styles.filterButton,
            currentFilter === 'date' && styles.activeFilter,
            currentFilter === 'date' && styles.dateFilter,
          ]}
          onPress={() => handleFilter('date')}
        >
          <Text style={[styles.filterText, currentFilter === 'date' ? styles.activeText : styles.inactiveText]}>Date</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterButton,
            currentFilter === 'rating' && styles.activeFilter,
            currentFilter === 'rating' && styles.ratingFilter,
          ]}
          onPress={() => handleFilter('rating')}
        >
          <Text style={[styles.filterText, currentFilter === 'rating' ? styles.activeText : styles.inactiveText]}>Rating</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterButton,
            currentFilter === 'default' && styles.activeFilter,
            currentFilter === 'default' && styles.defaultFilter,
          ]}
          onPress={() => handleFilter('default')}
        >
          <Text style={[styles.filterText, currentFilter === 'default' ? styles.activeText : styles.inactiveText]}>Default</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.sortButton,
            styles.sortButtonBg,
          ]}
          onPress={toggleSorter}
        >
          <Text style={[styles.filterText, styles.sortButtonText]}>{currentSorter === 'asc' ? 'Ascending' : 'Descending'}</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.movieItem}>
            <Text style={styles.movieTitle}>{item.title}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background
  },
  input: {
    height: 40,
    marginBottom: 16,
  },
  textInput: {
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 8,
    backgroundColor: theme.colors.background,
    borderRadius: 10,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 10,
    backgroundColor: theme.colors.background,
  },
  activeFilter: {
    backgroundColor: theme.colors.background_soft,
  },
  filterText: {
    fontSize: 16,
  },
  activeText: {
    color: theme.colors.primary,
  },
  inactiveText: {
    color: '#ffffff', // Color del texto para botones no seleccionados
  },
  dateFilter: {
    backgroundColor: theme.colors.background_soft,
  },
  ratingFilter: {
    backgroundColor: theme.colors.background_soft,
  },
  defaultFilter: {
    backgroundColor: theme.colors.background_soft,
  },
  sortButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  sortButtonBg: {
    backgroundColor: theme.colors.background_soft,
  },
  sortButtonText: {
    color: theme.colors.primary,
  },
  movieItem: {
    padding: 8,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  movieTitle: {
    fontSize: 18,
  },
});

export default SearchScreenUI;

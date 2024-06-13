// SearchScreenUI.jsx
import React from 'react';
import { FlatList, View, TextInput, StyleSheet, Text } from 'react-native';
import Movie from '../../../interfaces/Movie';
import theme from '../../styles/theme';
import FilterButton from './FilterButton';
import MovieList from '../../components/movie_components/MovieList';
import { useTranslation } from 'react-i18next';

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
  const {t} = useTranslation();

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholder={t('PLACEHOLDER_SEARCH')}
        placeholderTextColor={theme.colors.text_light}
        value={searchInput}
        onChangeText={setSearchInput}
      />

      <View style={styles.filterContainer}>
        <FilterButton
          title={t('SORT_DATE_T')}
          isActive={currentFilter === 'date'}
          onPress={() => handleFilter('date')}
        />
        <FilterButton
          title={t('SORT_RATE_T')}
          isActive={currentFilter === 'rating'}
          onPress={() => handleFilter('rating')}
        />
        <FilterButton
          title={t('SORT_DEFAULT_T')}
          isActive={currentFilter === 'default'}
          onPress={() => handleFilter('default')}
        />
        <FilterButton
          title={currentSorter === 'asc' ? t('SORT_ASCENDING') : t('SORT_DESCENDING')}
          isActive={true}
          onPress={toggleSorter}
        />
      </View>
      <MovieList movies={movies} searchInput={searchInput} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: 16,
    marginTop: 5
  },
  textInput: {
    height: 45,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 8,
    backgroundColor: theme.colors.background,
    borderRadius: 10,
    marginBottom: 16,
    color: 'white'
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
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

// React
import React from 'react';
import { View, StyleSheet } from 'react-native';

// Interfaces
import Movie from '../../../interfaces/Movie';

// Styles
import theme from '../../styles/theme';

// Components
import FilterButton from '../serch_screens/FilterButton';
import MovieList from '../../components/movie_components/MovieList';

// Utils
import { useTranslation } from 'react-i18next';

interface HomeScreenUIProps {
  movies: Movie[];
  handleFilter: (filter: 'date' | 'rating' | 'default') => void;
  toggleSorter: () => void;
  currentFilter: 'date' | 'rating' | 'default';
  currentSorter: 'asc' | 'desc';
  isLoading: boolean;
}

const HomeScreenUI: React.FC<HomeScreenUIProps> = ({
  movies,
  handleFilter,
  toggleSorter,
  currentFilter,
  currentSorter,
  isLoading
}) => {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
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
      <MovieList movies={movies} searchInput={'a'} isLoading={isLoading} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: 16,
    marginTop: 5,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
});

export default HomeScreenUI;

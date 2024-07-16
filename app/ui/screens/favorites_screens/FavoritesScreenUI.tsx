// React
import React from 'react';
import { View, StyleSheet } from 'react-native';

// Interfaces
import Movie from '../../../interfaces/Movie';

// Styles
import theme from '../../styles/theme';

// Components
import MovieList from '../../components/movie_components/MovieList';

// Utils
import EmptyFavoritesScreen from '../../../utils/EmptyFavoritesScreen';
import { UseTranslationResponse } from 'react-i18next';

interface FavoritesScreenUIProps {
  translate: Function;
  favoriteMovies: Movie[];
  isLoading: boolean;
}

const FavoritesScreenUI: React.FC<FavoritesScreenUIProps> = ({ translate, favoriteMovies, isLoading }) => {
  if (favoriteMovies.length === 0) {
    return EmptyFavoritesScreen(translate); 
  }

  return (
    <View style={styles.container}>
      <MovieList movies={favoriteMovies} searchInput={'a'} isLoading={isLoading} isTimeout={false} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: 16,
  },
});

export default FavoritesScreenUI;

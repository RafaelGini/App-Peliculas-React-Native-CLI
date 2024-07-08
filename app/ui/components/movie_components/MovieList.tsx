import React from 'react';
import { ActivityIndicator, FlatList, StyleSheet, View, Text } from 'react-native';
import Movie from '../../../interfaces/Movie';
import MovieItem from './MovieItem';
import theme from '../../styles/theme';
import initialDataScreen from '../../../utils/initialDataScreen';
import noDataScreen from '../../../utils/noDataScreen';
import loadingScreen from '../../../utils/loadingScreen';

interface MovieListProps {
  movies: Movie[],
  searchInput: string,
  isLoading: boolean,
}

const MovieList: React.FC<MovieListProps> = ({ movies, searchInput, isLoading }) => {
  if (isLoading) {
    return loadingScreen();
  }

  if (searchInput === '') {
    return initialDataScreen();
  }

  if (movies.length === 0 && searchInput !== '') {
    return noDataScreen();
  }

  return (
    <FlatList
      data={movies}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <MovieItem movie={item} />}
      contentContainerStyle={styles.list}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    backgroundColor: theme.colors.background,
  },
});

export default MovieList;

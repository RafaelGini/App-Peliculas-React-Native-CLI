// MovieList.jsx
import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import Movie from '../../../interfaces/Movie';
import MovieItem from './MovieItem';
import theme from '../../styles/theme';

interface MovieListProps {
  movies: Movie[],
}

const MovieList: React.FC<MovieListProps> = ({ movies }) => {
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
    padding: 10,
    backgroundColor: theme.colors.background,
  },
});

export default MovieList;

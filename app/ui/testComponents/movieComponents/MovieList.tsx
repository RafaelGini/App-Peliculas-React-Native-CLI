// MovieList.jsx
import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import Movie from '../../../interfaces/Movie';
import MovieItem from './MovieItem';
import theme from '../../styles/theme';
import initialDataScreen from '../../../utils/initialDataScreen';
import noDataScreen from '../../../utils/noDataScreen';

interface MovieListProps {
  movies: Movie[],
  searchInput: string,
}

const MovieList: React.FC<MovieListProps> = ({ movies , searchInput}) => {
  return (
    <FlatList
      data={movies}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <MovieItem movie={item} />}
      ListEmptyComponent={!searchInput ? initialDataScreen : noDataScreen}
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

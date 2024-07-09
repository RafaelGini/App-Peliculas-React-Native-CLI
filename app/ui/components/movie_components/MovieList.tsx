import React from 'react';
import { FlatList, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Movie from '../../../interfaces/Movie';
import MovieItem from './MovieItem';
import theme from '../../styles/theme';
import initialDataScreen from '../../../utils/initialDataScreen';
import noDataScreen from '../../../utils/noDataScreen';
import loadingScreen from '../../../utils/loadingScreen';
import TimeoutScreen from '../../../utils/TimeOutScreen';
import { useNavigation } from '@react-navigation/native';

interface MovieListProps {
  movies: Movie[],
  searchInput: string,
  isLoading: boolean,
  isTimeout: boolean,
}

const MovieList: React.FC<MovieListProps> = ({ movies, searchInput, isLoading, isTimeout }) => {
  const navigation = useNavigation();

  const handleMoviePress = (movieId: number) => {
    //@ts-ignore
    navigation.navigate('MovieDetail', { movieId });
  };
  
  if (isLoading) {
    return loadingScreen();
  }

  if (isTimeout) {
    return TimeoutScreen();
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
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => handleMoviePress(item.id)}>
          <MovieItem movie={item} />
        </TouchableOpacity>
      )}
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

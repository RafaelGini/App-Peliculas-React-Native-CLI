// MovieItem.jsx
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Movie from '../../../interfaces/Movie';
import theme from '../../styles/theme';


interface MovieItemProps {
  movie: Movie;
}

const MovieItem: React.FC<MovieItemProps> = ({ movie }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: movie.poster_path }} style={styles.poster} />
      <View style={styles.info}>
        <Text style={styles.title}>{movie.title}</Text>
        <Text style={styles.releaseDate}>{movie.release_date}</Text>
        <Text style={styles.vote}>{`Rating: ${movie.vote_average}`}</Text>
        <Text style={styles.genres}>{`Genres: ${movie.genres.join(', ')}`}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    backgroundColor: theme.colors.background,
  },
  poster: {
    width: 100,
    height: 150,
    borderRadius: 10,
  },
  info: {
    flex: 1,
    marginLeft: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  releaseDate: {
    fontSize: 14,
    color: theme.colors.text_light,
  },
  overview: {
    fontSize: 14,
    color: theme.colors.text,
  },
  vote: {
    fontSize: 14,
    color: theme.colors.text,
  },
  genres: {
    fontSize: 14,
    color: theme.colors.text,
  },
});

export default MovieItem;

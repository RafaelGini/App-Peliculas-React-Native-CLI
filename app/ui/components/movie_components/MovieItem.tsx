import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Movie from '../../../interfaces/Movie';
import theme from '../../styles/theme';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface MovieItemProps {
  movie: Movie;
  onPress: () => void;
}

const MovieItem: React.FC<MovieItemProps> = ({ movie, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <Image source={{ uri: movie.poster_path }} style={styles.poster} />
        <View style={styles.info}>
          <Text style={styles.title}>{movie.title}</Text>
          <Text style={styles.releaseDate}><Ionicons name={"calendar"} size={13} color={theme.colors.text_light}/>  {movie.release_date}</Text>
          <Text style={styles.vote}><Ionicons name={"star"} size={13} color={theme.colors.secondary}/>  {`Rating: ${movie.vote_average}`}</Text>
          <Text style={styles.genres}><Ionicons name={"film"} size={13} color={theme.colors.text_light}/>  {`Genres: ${movie.genres.join(', ')}`}</Text>
        </View>
      </View>
    </TouchableOpacity>
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
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  releaseDate: {
    flex: 1,
    fontSize: 14,
    color: theme.colors.text_light,
  },
  vote: {
    flex: 1,
    fontSize: 14,
    color: theme.colors.secondary,
  },
  genres: {
    flex: 1,
    fontSize: 14,
    color: theme.colors.text,
  },
});

export default MovieItem;

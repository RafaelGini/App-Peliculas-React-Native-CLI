import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Share } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MovieDetails from '../../../interfaces/MovieDetails';
import theme from '../../styles/theme';

interface MovieDetailUIProps {
  movie: MovieDetails;
}

const MovieDetailUI: React.FC<MovieDetailUIProps> = ({ movie }) => {
  
  const handleShare = async () => {
    try {
      await Share.share({
        message: `Mira esta película: ${movie.title}`,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: movie.poster_path }} style={styles.poster} />
      <Text style={styles.title}>{movie.title}</Text>
      <View style={styles.detailsContainer}>
        <Text style={styles.detailText}>
          <Icon name="calendar-outline" size={16} /> {new Date(movie.release_date).getFullYear()}
        </Text>
        <Text style={styles.detailText}>
          <Icon name="time-outline" size={16} /> {movie.runtime} Minutos
        </Text>
        <Text style={styles.detailText}>
          <Icon name="film-outline" size={16} /> {movie.genres[0]}
        </Text>
      </View>
      <View style={styles.rowContainer}>
        <Text style={styles.rating}>
          <Icon name="star-outline" size={16} /> {movie.vote_average} ({movie.vote_count})
        </Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Calificar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
          <Icon name="share-social-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    backgroundColor: theme.colors.background
  },
  poster: {
    width: 200,
    height: 300,
    borderRadius: 8,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 8,
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 8,
    backgroundColor: theme.colors.background
  },
  detailText: {
    fontSize: 16,
    color: 'gray',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '70%',
    marginTop: 16,
  },
  rating: {
    fontSize: 16,
    color: theme.colors.secondary,
  },
  button: {
    backgroundColor: theme.colors.background_soft,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginHorizontal: 8,
  },
  buttonText: {
    color: theme.colors.secondary,  
    fontWeight: 'bold'
  },
  shareButton: {
    marginLeft: 8,
  },
});

export default MovieDetailUI;

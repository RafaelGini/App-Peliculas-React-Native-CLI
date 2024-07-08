// MovieDetailUI.tsx
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Movie from '../../../interfaces/Movie'; // Ajusta la ruta según tu estructura de proyecto
import Icon from 'react-native-vector-icons/Ionicons'; // Asegúrate de tener este paquete instalado
import MovieDetails from '../../../interfaces/MovieDetails';

interface MovieDetailUIProps {
  movie: MovieDetails;
}

const MovieDetailUI: React.FC<MovieDetailUIProps> = ({ movie }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: movie.posterPath }} style={styles.poster} />
      <Text style={styles.title}>{movie.title}</Text>
      <View style={styles.detailsContainer}>
        <Text style={styles.detailText}><Icon name="calendar-outline" size={16} /> {movie.releaseDate}</Text>
        <Text style={styles.detailText}><Icon name="time-outline" size={16} /> {movie.runtime} Minutos</Text>
        <Text style={styles.detailText}><Icon name="film-outline" size={16} /> {movie.genre}</Text>
      </View>
      <Text style={styles.rating}><Icon name="star-outline" size={16} /> {movie.rating} ({/*movie.ratingCount*/})</Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Calificar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
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
  },
  detailText: {
    fontSize: 16,
    color: 'gray',
  },
  rating: {
    fontSize: 16,
    color: 'white',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#FFD700',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
  },
});

export default MovieDetailUI;

import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { MovieItem } from '../serch_screens/Interfaces'; // Importa la interfaz Movie

interface MovieDetailScreenUIProps {
  movie: MovieItem; // Propiedad que recibe la información de la película
}

const MovieDetailScreenUI: React.FC<MovieDetailScreenUIProps> = ({ movie }) => {
  return (
    <View style={styles.container}>
      {/* Poster */}
      <Image source={{ uri: movie.poster_path }} style={styles.poster} />

      {/* Título */}
      <Text style={styles.title}>{movie.title}</Text>

      {/* Descripción */}
      <Text style={styles.description}>{movie.overview}</Text>

      {/* Otras informaciones */}
      <View style={styles.infoContainer}>
        <Text style={styles.info}>Género: {movie.genre}</Text>
        <Text style={styles.info}>Fecha de lanzamiento: {movie.release_date}</Text>
        <Text style={styles.info}>Calificación promedio: {movie.vote_average}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  poster: {
    width: 200,
    height: 300,
    resizeMode: 'cover',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  infoContainer: {
    marginTop: 10,
    alignItems: 'flex-start',
  },
  info: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default MovieDetailScreenUI;

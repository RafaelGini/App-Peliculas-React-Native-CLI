import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { getMovieDetails } from './movieDetailsServices';
import { RouteProp } from '@react-navigation/native';
import MovieDetailScreenUI from './movieDetailsScreenUI';

type RootStackParamList = {
  MovieDetails: { movieId: number };
};

type MovieDetailsScreenRouteProp = RouteProp<RootStackParamList, 'MovieDetails'>;

type Props = {
  route: MovieDetailsScreenRouteProp;
};

const MovieDetailsScreen: React.FC<Props> = ({ route }) => {
  
  const { movieId } = route.params;
  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const details = await getMovieDetails(movieId);
        setMovieDetails(details);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!movieDetails) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>No se encontraron detalles de la película</Text>
      </View>
    );
  }

  return (
    <MovieDetailScreenUI movie={movieDetails} />
  );
};

export default MovieDetailsScreen;

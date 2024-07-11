import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Share, ScrollView, FlatList, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MovieDetails from '../../../interfaces/MovieDetails';
import theme from '../../styles/theme';
import  TrailerVideo  from './TrailerVideo';

interface MovieDetailUIProps {
  movie: MovieDetails;
  onRatingPress: () => void; // Nueva prop
}

const extractVideoId = (url: string): string | null => {
  const regex = /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const matches = url.match(regex);
  return matches ? matches[1] : null;
};

const MovieDetailUI: React.FC<MovieDetailUIProps> = ({ movie, onRatingPress }) => {
  const [isImageModalVisible, setImageModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [paused, setPaused] = useState(true);
  const [playing, setPlaying] = useState(false);

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Mira esta película: ${movie.title}`,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handleImagePress = (imageUri: string) => {
    setSelectedImage(imageUri);
    setImageModalVisible(true);
  };

  const handleVideoPress = () => {
    setPaused(!paused);
  };

  const videoId = !movie.trailer ? null : extractVideoId(movie.trailer);

  return (
    <ScrollView contentContainerStyle={styles.container}>
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
        <TouchableOpacity style={styles.button} onPress={onRatingPress}>
          <Text style={styles.buttonText}>Calificar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
          <Icon name="share-social-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Sección Trama */}
      <Text style={styles.sectionTitle}>Trama</Text>
      <Text style={styles.overview}>{movie.overview}</Text>

      {/* Sección Tráiler */}
      <Text style={styles.sectionTitle}>Tráiler</Text>
      {videoId ? <TrailerVideo videoId={videoId} /> : <Text style={styles.sectionTitle}>No hay tráiler disponible</Text>}

      {/* Sección Galería */}
      <Text style={styles.sectionTitle}>Galería</Text>
      <FlatList
        data={movie.images}
        horizontal
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleImagePress(item)}>
            <Image source={{ uri: item }} style={styles.galleryImage} />
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
      />

      {/* Modal para la imagen seleccionada */}
      <Modal
        visible={isImageModalVisible}
        transparent={true}
        onRequestClose={() => setImageModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity onPress={() => setImageModalVisible(false)}>
            <Icon name="close-circle-outline" size={36} color="white" />
          </TouchableOpacity>
          {selectedImage && <Image source={{ uri: selectedImage }} style={styles.modalImage} />}
        </View>
      </Modal>

      {/* Sección Director */}
      <Text style={styles.sectionTitle}>Director</Text>
      <View style={styles.directorContainer}>
        <Image source={{ uri: movie.director_path }} style={styles.profileImage} />
        <Text style={styles.castName}>{movie.director}</Text>
        <Text style={styles.castRole}>Director</Text>
      </View>

      {/* Sección Elenco */}
      <Text style={styles.sectionTitle}>Elenco</Text>
      <View style={styles.castContainer}>
        {movie.cast.map((member) => (
          <View key={member.name} style={styles.castMember}>
            <Image source={{ uri: member.profile_path }} style={styles.profileImage} />
            <Text style={styles.castName}>{member.name}</Text>
            <Text style={styles.castRole}>Actores</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 16,
    backgroundColor: theme.colors.background,
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
    backgroundColor: theme.colors.background,
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
    fontWeight: 'bold',
  },
  shareButton: {
    marginLeft: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    alignSelf: 'flex-start',
    marginTop: 16,
    marginBottom: 8,
  },
  overview: {
    fontSize: 16,
    color: 'white',
    textAlign: 'justify',
    marginBottom: 16,
  },
  directorContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  castContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  castMember: {
    alignItems: 'center',
    marginHorizontal: 8,
    marginBottom: 16,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 4,
  },
  castName: {
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
  },
  castRole: {
    fontSize: 12,
    color: 'gray',
    textAlign: 'center',
  },
  video: {
    width: '100%',
    height: 200,
    marginBottom: 16,
  },
  galleryImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 8,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalImage: {
    width: '90%',
    height: '70%',
    resizeMode: 'contain',
  },
});

export default MovieDetailUI;

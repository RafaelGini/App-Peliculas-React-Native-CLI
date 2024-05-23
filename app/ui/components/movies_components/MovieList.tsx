import React from 'react';
import { View, Text, Image, FlatList, StyleSheet } from 'react-native';

interface Movie {
  id: number;
  title: string;
  year: number;
  duration: string;
  category: string;
  rating: number;
  poster: string;
}

const movies: Movie[] = [
  {
    id: 1,
    title: 'La La Land',
    year: 2016,
    duration: '2h 8m',
    category: 'Drama/Romance',
    rating: 8.0,
    poster: 'https://example.com/lalaland.jpg'
  },
  {
    id: 2,
    title: 'Inception',
    year: 2010,
    duration: '2h 28m',
    category: 'Sci-Fi/Thriller',
    rating: 8.8,
    poster: 'https://example.com/inception.jpg'
  },
  {
    id: 3,
    title: 'The Dark Knight',
    year: 2008,
    duration: '2h 32m',
    category: 'Action/Crime',
    rating: 9.0,
    poster: 'https://example.com/thedarkknight.jpg'
  }
];

const MovieList: React.FC = () => {
  const renderItem = ({ item }: { item: Movie }) => (
    <View style={styles.movieContainer}>
      <Image source={{ uri: item.poster }} style={styles.poster} />
      <View style={styles.movieDetails}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.details}>{item.year} - {item.duration}</Text>
        <Text style={styles.details}>{item.category}</Text>
        <Text style={styles.rating}>Rating: {item.rating}</Text>
      </View>
    </View>
  );

  return (
    <FlatList
      data={movies}
      renderItem={renderItem}
      keyExtractor={item => item.id.toString()}
    />
  );
};

const styles = StyleSheet.create({
  movieContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2,
  },
  poster: {
    width: 100,
    height: 150,
    borderRadius: 8,
  },
  movieDetails: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  details: {
    fontSize: 14,
    color: '#666',
    marginVertical: 2,
  },
  rating: {
    fontSize: 14,
    color: '#888',
  },
});

export default MovieList;
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MovieDetailsScreen = ({ route }) => {
  const { movieId } = route.params;
  return (
    <View style={styles.container}>
      <Text>Detalles de la película {movieId}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MovieDetailsScreen;
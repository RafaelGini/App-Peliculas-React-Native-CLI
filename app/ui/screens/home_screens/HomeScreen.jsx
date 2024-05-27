import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const List = ({ navigation }) => {
  return (
    <View style={styles.listContainer}>
      <Button title="Ver detalles película 1" onPress={() => navigation.navigate('MovieDetails', { movieId: 1 })} />
      <Button title="Ver detalles película 2" onPress={() => navigation.navigate('MovieDetails', { movieId: 2 })} />
    </View>
  );
};

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Esta es la pantalla Home</Text>
      <List navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    marginTop: 20,
  },
});

export default HomeScreen;

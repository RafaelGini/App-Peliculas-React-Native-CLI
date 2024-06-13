//React
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

//Styling
import theme from '../../styles/theme';

// @ts-ignore
const List = ({ navigation }) => {
  return (
    <View style={styles.listContainer}>
      <Button title="Ver detalles película 1" onPress={() => navigation.navigate('MovieDetails', { movieId: 1 })} />
      <Button title="Ver detalles película 2" onPress={() => navigation.navigate('MovieDetails', { movieId: 2 })} />
    </View>
  );
};

// @ts-ignore
const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Esta es la pantalla Home</Text>
      <List navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background, 
  },
  listContainer: {
    marginTop: 20,
  },
  text: { 
    color: theme.colors.text,
  }
});

export default HomeScreen;

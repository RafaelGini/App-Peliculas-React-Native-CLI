//React
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

//Components
import MovieList from '../../components/movie_components/MovieList';

interface HomeScreenUIProps {
  userName: string;
}

const HomeScreenUI: React.FC<HomeScreenUIProps> = ({ userName }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}> Hola! {userName}</Text>
      {/*<MovieList movies={}/>*/}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default HomeScreenUI;
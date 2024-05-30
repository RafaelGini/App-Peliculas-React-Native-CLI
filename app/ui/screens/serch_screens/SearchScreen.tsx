import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

//Styling
import theme from '../../styles/theme';

const SearchScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Pantalla de Buscar</Text>
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
  text: { 
    color: theme.colors.text,
  }
});

export default SearchScreen;
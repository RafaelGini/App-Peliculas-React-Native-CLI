import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import MoviesList2 from '../../components/movie_components/MoviesList';
import theme from '../../styles/theme';

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 1000); // Esperar 1 segundo

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search for movies..."
        placeholderTextColor="#ffffff" // Cambiar color del placeholder a blanco
        onChangeText={handleSearch}
        value={searchQuery}
      />
      <MoviesList2 searchQuery={debouncedQuery} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: theme.colors.background
  },
  searchBar: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    color: "white" // Cambiar el color del texto a blanco
  },
});

export default SearchScreen;

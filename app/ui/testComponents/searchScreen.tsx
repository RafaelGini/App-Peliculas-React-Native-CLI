import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, FlatList, Text } from 'react-native';
import { getMovies } from '../../services/searchMovies';
import Movie from '../../interfaces/Movie';
import SearchScreenUI from './UI_searchScreen';

const SearchScreen = () => {
    const [searchInput, setSearchInput] = useState<string>('');
    const [movies, setMovies] = useState<Movie[]>([]);
    const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
    useEffect(() => {
      if (timer) {
        clearTimeout(timer);
      }
      const newTimer = setTimeout(async () => {
        if (searchInput.trim().length > 0) {
            console.log("Se llamo al endpoint")
          const fetchedMovies = await getMovies(searchInput);
          setMovies(fetchedMovies);
        }
      }, 2000);
      setTimer(newTimer);
      return () => {
        if (newTimer) {
          clearTimeout(newTimer);
        }
      };
    }, [searchInput]);
  
    return (
        <View style={styles.container}>
        <SearchScreenUI
          movies={movies}
          searchInput={searchInput}
          setSearchInput={setSearchInput}
        />
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: '#fff',
    },
    input: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      paddingHorizontal: 8,
      marginBottom: 16,
    },
    movieItem: {
      padding: 8,
      borderBottomColor: '#ccc',
      borderBottomWidth: 1,
    },
    movieTitle: {
      fontSize: 18,
    },
  });
  
  export default SearchScreen;
import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { getMovies } from '../../services/searchMovies';
//import { searchMovies } from '../screens/serch_screens/searchServices';
import Movie from '../../interfaces/Movie';
import SearchScreenUI from './UI_searchScreen';
import theme from '../styles/theme';
import checkConnection from '../../utils/checkConnection';
import noInternetScreen from '../../utils/noInternetScreen';

const SearchScreen = () => {
  const [searchInput, setSearchInput] = useState<string>('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const [filter, setFilter] = useState<'date' | 'rating' | 'default'>('default');
  const [sorter, setSorter] = useState<'asc' | 'desc'>('desc');
  const [movieList, setMovieList] = useState<Movie[]>([]);

  useEffect(() => {
    if (timer) {
      clearTimeout(timer);
    }
    const newTimer = setTimeout(async () => {
      if (searchInput.trim().length > 0) {
        console.log("Se llamó al endpoint")
        const fetchedMovies = await getMovies(searchInput);
        setMovies(fetchedMovies);
      }
    }, 500);
    setTimer(newTimer);
    return () => {
      if (newTimer) {
        clearTimeout(newTimer);
      }
    };
  }, [searchInput]);

  useEffect(() => {
    let sortedMovies = [...movies];
    if (filter === 'date') {
      sortedMovies.sort((a, b) => {
        if (sorter === 'asc') {
          return new Date(a.release_date).getTime() - new Date(b.release_date).getTime();
        } else {
          return new Date(b.release_date).getTime() - new Date(a.release_date).getTime();
        }
      });
    } else if (filter === 'rating') {
      sortedMovies.sort((a, b) => {
        if (sorter === 'asc') {
          return a.vote_average - b.vote_average;
        } else {
          return b.vote_average - a.vote_average;
        }
      });
    }
    setMovieList(sortedMovies);
  }, [movies, filter, sorter]);

  const handleFilter = (selectedFilter: 'date' | 'rating' | 'default') => {
    console.log(`Se cambio a ${selectedFilter}`)
    setFilter(selectedFilter);
    if (selectedFilter === 'default') {
      setSorter('desc'); 
    }
  };

  const toggleSorter = () => {
    setSorter(sorter === 'asc' ? 'desc' : 'asc');
  };

  if (checkConnection() === false) {
    return (
      <View style={styles.container}>
        {noInternetScreen()}
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <SearchScreenUI
        movies={movieList}
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        handleFilter={handleFilter}
        toggleSorter={toggleSorter}
        currentFilter={filter}
        currentSorter={sorter}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    backgroundColor: theme.colors.background
  },
});

export default SearchScreen;

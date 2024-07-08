//React
import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';

//Services
import { getMovies } from '../../../services/searchMovies';
import { refreshToken } from '../../../services/refreshTokenService';

//Interfaces
import Movie from '../../../interfaces/Movie';
import UserInfo from '../../../interfaces/UserInfo';

//Components - UI
import SearchScreenUI from './UI_searchScreen';

//Styles
import theme from '../../styles/theme';

//Conection
import checkConnection from '../../../utils/checkConnection';
import noInternetScreen from '../../../utils/noInternetScreen';

//Reduxs
import useUserInfo from '../../../hooks/useUserInfo';
import { useDispatch } from 'react-redux';
import { setUser } from '../../../redux/slices/userSlice';

const SearchScreen = () => {
  
  const [searchInput, setSearchInput] = useState<string>('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const [filter, setFilter] = useState<'date' | 'rating' | 'default'>('default');
  const [sorter, setSorter] = useState<'asc' | 'desc'>('desc');
  const [movieList, setMovieList] = useState<Movie[]>([]);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(useUserInfo());
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const dispatch = useDispatch();

  //Busqueda
  useEffect(() => {
    if (timer) {
      clearTimeout(timer);
    }
    const newTimer = setTimeout(async () => {
      if (searchInput.trim().length > 0) {
        setIsLoading(true);
        const refreshedUserInfo = await refreshToken(userInfo?.token, userInfo?.refreshToken);
        console.log("Data del usuario refrescada", refreshedUserInfo);
        dispatch(setUser(refreshedUserInfo));
        setUserInfo(refreshedUserInfo);
        const fetchedMovies = await getMovies(searchInput, userInfo);
        setMovies(fetchedMovies);
        setIsLoading(false);
      }
    }, 600);

    setTimer(newTimer);
    return () => {
      if (newTimer) {
        clearTimeout(newTimer);
      }
    };
  }, [searchInput]);

  //Sorter
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
        isLoading={isLoading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 1,
    backgroundColor: theme.colors.background
  },
});

export default SearchScreen;

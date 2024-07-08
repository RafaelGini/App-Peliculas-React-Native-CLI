// React
import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';

// Services
import { getLatestMovies } from '../../../services/latestMoviesService'; // Cambis películas más nuevas
import { refreshToken } from '../../../services/refreshTokenService';

// Interfaces
import Movie from '../../../interfaces/Movie';
import UserInfo from '../../../interfaces/UserInfo';

// Components - UI
import HomeScreenUI from './HomeScreenUI';

// Styles
import theme from '../../styles/theme';

// Connection
import checkConnection from '../../../utils/checkConnection';
import noInternetScreen from '../../../utils/noInternetScreen';

// Redux
import useUserInfo from '../../../hooks/useUserInfo';
import { useDispatch } from 'react-redux';
import { setUser } from '../../../redux/slices/userSlice';

const HomeScreen = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [filter, setFilter] = useState<'date' | 'rating' | 'default'>('default');
  const [sorter, setSorter] = useState<'asc' | 'desc'>('desc');
  const [movieList, setMovieList] = useState<Movie[]>([]);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(useUserInfo());
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const dispatch = useDispatch();

  // Fetch a las mas nuevas
  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);
      const refreshedUserInfo = await refreshToken(userInfo?.token, userInfo?.refreshToken);
      console.log("Data del usuario refrescada");
      dispatch(setUser(refreshedUserInfo));
      setUserInfo(refreshedUserInfo);
      const fetchedMovies = await getLatestMovies(refreshedUserInfo);
      setMovies(fetchedMovies);
      setIsLoading(false);
    };

    fetchMovies();
  }, []);

  // Sorter
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
    );
  }

  return (
    <View style={styles.container}>
      <HomeScreenUI
        movies={movieList}
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
    backgroundColor: theme.colors.background,
  },
});

export default HomeScreen;

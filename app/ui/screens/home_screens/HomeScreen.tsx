// React
import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';

// Services
import { getLatestMovies } from '../../../services/latestMoviesService';
import { getMoviesByGenre } from '../../../services/latestMoviesByGenre';
import { refreshToken } from '../../../services/refreshTokenService';

// Interfaces
import Movie from '../../../interfaces/Movie';
import UserInfo from '../../../interfaces/UserInfo';
import mainGenres from './genres';

// Components - UI
import HomeScreenUI from './HomeScreenUI';

// Styles
import theme from '../../styles/theme';


// Redux
import useUserInfo from '../../../hooks/useUserInfo';
import { useDispatch } from 'react-redux';
import { setUser } from '../../../redux/slices/userSlice';

const HomeScreen = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [movieList, setMovieList] = useState<Movie[]>([]);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(useUserInfo());
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [genres, setGenres] = useState<string[]>(mainGenres);
  const [selectedGenre, setSelectedGenre] = useState<string>('Todo');

  const dispatch = useDispatch();

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

  useEffect(() => {
    setMovieList(movies);
  }, [movies]);

  const handleGenreSelect = async (genre: string) => {
    setSelectedGenre(genre);
    setIsLoading(true);
    const refreshedUserInfo = await refreshToken(userInfo?.token, userInfo?.refreshToken);
    dispatch(setUser(refreshedUserInfo));
    setUserInfo(refreshedUserInfo);
    const fetchedMovies = genre === 'Todo' ? await getLatestMovies(userInfo) : await getMoviesByGenre(userInfo, genre);
    setMovies(fetchedMovies);
    setIsLoading(false);
  };

  return (
    <View style={styles.container}>
      <HomeScreenUI
        movies={movieList}
        isLoading={isLoading}
        genres={genres}
        selectedGenre={selectedGenre}
        handleGenreSelect={handleGenreSelect}
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

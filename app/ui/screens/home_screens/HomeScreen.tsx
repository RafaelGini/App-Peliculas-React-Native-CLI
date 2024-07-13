import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { getLatestMovies } from '../../../services/latestMoviesService';
import { getMoviesByGenre } from '../../../services/latestMoviesByGenre';
import { refreshToken } from '../../../services/refreshTokenService';
import Movie from '../../../interfaces/Movie';
import UserInfo from '../../../interfaces/UserInfo';
import mainGenres from './genres';
import HomeScreenUI from './HomeScreenUI';
import theme from '../../styles/theme';
import useUserInfo from '../../../hooks/useUserInfo';
import { useDispatch } from 'react-redux';
import { setUser } from '../../../redux/slices/userSlice';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState<number>(1);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(useUserInfo());
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFetchingMore, setIsFetchingMore] = useState<boolean>(false);
  const [genres, setGenres] = useState<string[]>(mainGenres);
  const [selectedGenre, setSelectedGenre] = useState<string>('All');

  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);
      const refreshedUserInfo = await refreshToken(userInfo?.token, userInfo?.refreshToken);
      console.log("Data del usuario refrescada");
      dispatch(setUser(refreshedUserInfo));
      setUserInfo(refreshedUserInfo);
      const fetchedMovies = await getLatestMovies(refreshedUserInfo, 1);
      setMovies(fetchedMovies);
      setIsLoading(false);
    };

    fetchMovies();
  }, []);

  const loadMoreMovies = async () => {
    if (isFetchingMore) return;

    setIsFetchingMore(true);
    const refreshedUserInfo = await refreshToken(userInfo?.token, userInfo?.refreshToken);
    dispatch(setUser(refreshedUserInfo));
    setUserInfo(refreshedUserInfo);

    const fetchedMovies = selectedGenre === 'All' 
      ? await getLatestMovies(userInfo, page + 1)
      : await getMoviesByGenre(userInfo, selectedGenre, page + 1);

    setMovies((prevMovies) => [...prevMovies, ...fetchedMovies]);
    setPage(page + 1);
    setIsFetchingMore(false);
  };

  const handleMoviePress = (movie: Movie) => {
    //@ts-ignore
    navigation.navigate('MovieDetail', { movieId: movie.id });
  };

  const handleGenreSelect = async (genre: string) => {
    setSelectedGenre(genre);
    setIsLoading(true);
    setPage(1);
    const refreshedUserInfo = await refreshToken(userInfo?.token, userInfo?.refreshToken);
    dispatch(setUser(refreshedUserInfo));
    setUserInfo(refreshedUserInfo);

    const fetchedMovies = genre === 'All' ? await getLatestMovies(userInfo, 1) : await getMoviesByGenre(userInfo, genre, 1);
    setMovies(fetchedMovies);
    setIsLoading(false);
  };

  return (
    <View style={styles.container}>
      <HomeScreenUI
        movies={movies}
        isLoading={isLoading}
        isFetchingMore={isFetchingMore}
        genres={genres}
        selectedGenre={selectedGenre}
        handleGenreSelect={handleGenreSelect}
        loadMoreMovies={loadMoreMovies}
        handleMoviePress={handleMoviePress}
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

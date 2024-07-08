//React
import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

//Styling
import theme from '../../styles/theme';

//Services
import { getMoviesNoPrompt } from '../../../services/getMoviesServices';
import { refreshToken } from '../../../services/refreshTokenService';

//Components
import MovieList from '../../components/movie_components/MovieList';

//Interfaces
import Movie from '../../../interfaces/Movie';
import UserInfo from '../../../interfaces/UserInfo';

//Redux
import useUserInfo from '../../../hooks/useUserInfo';
import { useDispatch } from 'react-redux';
import { setUser } from '../../../redux/slices/userSlice';

// @ts-ignore
const HomeScreen = ({ navigation }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(useUserInfo())
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchMovies = async () => {
      const refreshedUserInfo = await refreshToken(userInfo?.id);
      dispatch(setUser(refreshedUserInfo));
      setUserInfo(refreshedUserInfo);
      const fetchedMovies = await getMoviesNoPrompt(userInfo);
      setMovies(fetchedMovies);
      console.log(movies)
    }
  }, [movies])

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Esta es la pantalla Home</Text>
      <MovieList movies={movies} searchInput=''/>
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

// React
import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

// Interfaces
import Movie from '../../../interfaces/Movie';
import UserInfo from '../../../interfaces/UserInfo';

// Components - UI
import FavoritesScreenUI from './FavoritesScreenUI';
import loadingScreen from '../../../utils/loadingScreen';

// Styles
import theme from '../../styles/theme';

// Services
import { getFavoriteMovies } from '../../../services/getFavoritesMoviesService';
import { refreshToken } from '../../../services/refreshTokenService';

// Redux
import useUserInfo from '../../../hooks/useUserInfo';
import { useDispatch } from 'react-redux';
import { setUser } from '../../../redux/slices/userSlice';

// Connection

const FavoritesScreen = () => {
  const [favoriteMovies, setFavoriteMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(useUserInfo());
  const dispatch = useDispatch();

  useFocusEffect(
    React.useCallback(() => {
      setIsLoading(true);
      const fetchFavoriteMovies = async () => {
        try {
          const refreshedUserInfo = await refreshToken(userInfo?.token, userInfo?.refreshToken);
          dispatch(setUser(refreshedUserInfo));
          setUserInfo(refreshedUserInfo);
          const fetchedFavoriteMovies = await getFavoriteMovies(refreshedUserInfo);
          setFavoriteMovies(fetchedFavoriteMovies);
        } catch (error) {
          console.error('Error fetching favorite movies:', error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchFavoriteMovies();
    }, [])
  );

  if (isLoading) {
    return loadingScreen();
  }

  return (
    <View style={styles.container}>
      <FavoritesScreenUI
        favoriteMovies={favoriteMovies}
        isLoading={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: theme.colors.background,
  },
});

export default FavoritesScreen;

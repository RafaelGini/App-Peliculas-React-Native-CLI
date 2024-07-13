import React, { useState, useEffect, useCallback } from 'react';
import { View, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { getMovies } from '../../../services/searchMovies';
import Movie from '../../../interfaces/Movie';
import { refreshToken } from '../../../services/refreshTokenService';
import useUserInfo from '../../../hooks/useUserInfo';
import { setUser } from '../../../redux/slices/userSlice';
import MovieItem from './MovieItem';
import TimeoutScreen from '../../../utils/TimeOutScreen';
import theme from '../../styles/theme';
import { useNavigation } from '@react-navigation/native';

interface MoviesList2Props {
  searchQuery: string;
}

const MoviesList2: React.FC<MoviesList2Props> = ({ searchQuery }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasTimedOut, setHasTimedOut] = useState(false);
  const userInfo = useUserInfo();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const fetchMovies = useCallback(async () => {
    if (loading) return;

    setLoading(true);
    setHasTimedOut(false);
    const timeoutId = setTimeout(() => {
      setHasTimedOut(true);
      setLoading(false);
    }, 30000);

    try {
      const refreshedUserInfo = await refreshToken(userInfo?.token, userInfo?.refreshToken);
      dispatch(setUser(refreshedUserInfo));
      const newMovies = await getMovies(searchQuery, refreshedUserInfo, page);
      clearTimeout(timeoutId);
      setMovies((prevMovies) => (page === 1 ? newMovies : [...prevMovies, ...newMovies]));
    } catch (error) {
      clearTimeout(timeoutId);
    }

    setLoading(false);
  }, [page, searchQuery, userInfo, dispatch]);

  useEffect(() => {
    setPage(1);
    setMovies([]);
  }, [searchQuery]);

  useEffect(() => {
    fetchMovies();
  }, [page, searchQuery]);

  const handleLoadMore = () => {
    if (!loading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const renderFooter = () => {
    return loading ? (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    ) : null;
  };

  const handleMoviePress = (movie: Movie) => {
    //@ts-ignore
    navigation.navigate('MovieDetail', { movieId: movie.id });
  };

  if (hasTimedOut) {
    return <TimeoutScreen />;
  }

  return (
    <View style={styles.container}>
      {loading && movies.length === 0 ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <FlatList
          data={movies}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          renderItem={({ item }) => <MovieItem movie={item} onPress={() => handleMoviePress(item)} />}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: theme.colors.background,
  },
  loading: {
    padding: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MoviesList2;
import React, { useState, useEffect, useCallback } from 'react';
import { FlatList, View, ActivityIndicator, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import Movie from '../../../interfaces/Movie';
import MovieItem from './MovieItem';
import { getMovies } from '../../../services/searchMovies';
import { refreshToken } from '../../../services/refreshTokenService';
import useUserInfo from '../../../hooks/useUserInfo';
import { setUser } from '../../../redux/slices/userSlice';
import UserInfo from '../../../interfaces/UserInfo';

interface InfiniteScrollListProps {
  searchInput: string;
}

const InfiniteScrollList: React.FC<InfiniteScrollListProps> = ({ searchInput }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(useUserInfo());

  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    setMovies([]);
    setPage(1);
  }, [searchInput]);

  const fetchUserInfo = useCallback(async () => {
    try {
      const refreshedUserInfo = await refreshToken(userInfo?.token, userInfo?.refreshToken);
      dispatch(setUser(refreshedUserInfo));
      setUserInfo(refreshedUserInfo);
    } catch (error) {
      console.error('Error refreshing user info:', error);
    }
  }, [userInfo, dispatch]);

  useEffect(() => {
    fetchUserInfo();
  }, [fetchUserInfo]);

  const fetchMovies = useCallback(async () => {
    if (loading) return;
    setLoading(true);
    try {
      const data = await getMovies(searchInput, userInfo, page);
      setMovies(prevMovies => {
        const movieIds = new Set(prevMovies.map(movie => movie.id));
        const newMovies = data.filter(movie => !movieIds.has(movie.id));
        return [...prevMovies, ...newMovies];
      });
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
    setLoading(false);
  }, [searchInput, page, userInfo, loading]);

  useEffect(() => {
    if (userInfo) {
      fetchMovies();
    }
  }, [fetchMovies, userInfo]);

  const handleLoadMore = () => {
    if (!loading) {
      setPage(prevPage => prevPage + 1);
    }
  };

  const handleMoviePress = (movie: Movie) => {
    //@ts-ignore
    navigation.navigate('MovieDetail', { movieId: movie.id });
  };

  const renderFooter = () => {
    return loading ? (
      <View style={styles.footer}>
        <ActivityIndicator size="large" />
      </View>
    ) : null;
  };

  const generateKey = (item: Movie, index: number) => `${item.id}-${index}`;

  return (
    <FlatList
      data={movies}
      keyExtractor={(item, index) => generateKey(item, index)}
      renderItem={({ item }) => (
        <MovieItem movie={item} onPress={() => handleMoviePress(item)} />
      )}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.8}
      ListFooterComponent={renderFooter}
    />
  );
};

const styles = StyleSheet.create({
  footer: {
    padding: 20,
    alignItems: 'center',
  },
});

export default InfiniteScrollList;

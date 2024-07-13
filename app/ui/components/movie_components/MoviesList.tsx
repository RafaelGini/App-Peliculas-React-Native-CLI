import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { getMovies } from '../../../services/searchMovies';
import Movie from '../../../interfaces/Movie';
import UserInfo from '../../../interfaces/UserInfo';
import { useDispatch } from 'react-redux';
import { refreshToken } from '../../../services/refreshTokenService';
import useUserInfo from '../../../hooks/useUserInfo';
import { setUser } from '../../../redux/slices/userSlice';

const MoviesList2 = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(useUserInfo()); 

  const dispatch = useDispatch();

  const fetchMovies = useCallback(async () => {
    setLoading(true);
    const refreshedUserInfo = await refreshToken(userInfo?.token, userInfo?.refreshToken);
    dispatch(setUser(refreshedUserInfo));
    setUserInfo(refreshedUserInfo);
    const newMovies = await getMovies('john', refreshedUserInfo, page);
    setMovies((prevMovies) => [...prevMovies, ...newMovies]);
    setLoading(false);
  }, [page, userInfo]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

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

  return (
    <View style={styles.container}>
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.movieItem}>
            <Text>{item.title}</Text>
          </View>
        )}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  movieItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  loading: {
    padding: 10,
  },
});

export default MoviesList2;

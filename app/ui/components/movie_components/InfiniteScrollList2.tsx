import React, { useState, useEffect } from 'react';
import { View, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import useUserInfo from '../../../hooks/useUserInfo';
import { getMovies } from '../../../services/searchMovies';
import Movie from '../../../interfaces/Movie';
import MovieItem from './MovieItem';

interface MovieListProps {
  queryDelSearch: string;
}

const MovieList3: React.FC<MovieListProps> = ({ queryDelSearch }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const userInfo = useUserInfo();

  useEffect(() => {
    setMovies([]);
    setPage(1);
    setHasMore(true);
  }, [queryDelSearch]);

  useEffect(() => {
    if (queryDelSearch && hasMore) {
      fetchMovies();
    }
  }, [queryDelSearch, page]);

  const fetchMovies = async () => {
    if (loading) return;
    setLoading(true);
    const newMovies = await getMovies(queryDelSearch, userInfo, page);
    setMovies(prevMovies => [...prevMovies, ...newMovies]);
    setHasMore(newMovies.length > 0);
    setLoading(false);
  };

  const loadMoreMovies = () => {
    if (!loading && hasMore) {
      setPage(prevPage => prevPage + 1);
    }
  };

  const handleMoviePress = (movie: Movie) => {
    //@ts-ignore
    navigation.navigate('MovieDetail', { movieId: movie.id });
  };

  const renderFooter = () => {
    if (!loading) return null;
    return <ActivityIndicator style={{ margin: 10 }} />;
  };

  const generateKey = (item: Movie, index: number) => `${item.id}-${index}`;

  return (
    <FlatList
      data={movies}
      renderItem={({ item }) => (
        <MovieItem movie={item} onPress={() => handleMoviePress(item)} />
      )}
      keyExtractor={(item, index) => generateKey(item, index)}
      onEndReached={loadMoreMovies}
      onEndReachedThreshold={0.5}
      ListFooterComponent={renderFooter}
      style={styles.list}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    backgroundColor: '#fff',
  },
});

export default MovieList3;

import React, { useState, useEffect, useCallback } from 'react';
import { View, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity, Text } from 'react-native';
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
  const [sortedMovies, setSortedMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasTimedOut, setHasTimedOut] = useState(false);
  const [sortBy, setSortBy] = useState<'default' | 'date' | 'rating'>('default');
  const [isAscending, setIsAscending] = useState(true); // Estado para manejar el orden ascendente/descendente
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
      setSortedMovies((prevMovies) => (page === 1 ? newMovies : [...prevMovies, ...newMovies])); // Initialize sortedMovies
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

  useEffect(() => {
    sortMovies(sortBy);
  }, [movies, sortBy, isAscending]); // Añadimos isAscending a la lista de dependencias

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

  const sortMovies = (criteria: 'default' | 'date' | 'rating') => {
    let sorted = [...movies];
    if (criteria === 'date') {
      sorted.sort((a, b) => new Date(b.release_date).getTime() - new Date(a.release_date).getTime());
    } else if (criteria === 'rating') {
      sorted.sort((a, b) => b.vote_average - a.vote_average);
    }
    if (isAscending) {
      sorted.reverse();
    }
    setSortedMovies(sorted);
  };

  const toggleSortOrder = () => {
    setIsAscending(!isAscending);
  };

  const getButtonStyle = (buttonType: 'default' | 'date' | 'rating') => {
    return buttonType === sortBy ? styles.selectedButton : styles.unselectedButton;
  };

  const getTextStyle = (buttonType: 'default' | 'date' | 'rating') => {
    return buttonType === sortBy ? styles.selectedText : styles.unselectedText;
  };

  if (hasTimedOut) {
    return <TimeoutScreen />;
  }



  return (
    <View style={styles.container}>
      <View style={styles.filterBar}>
        <TouchableOpacity
          style={[styles.filterButton, getButtonStyle('default')]}
          onPress={() => setSortBy('default')}
        >
          <Text style={getTextStyle('default')}>Default</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, getButtonStyle('date')]}
          onPress={() => setSortBy('date')}
        >
          <Text style={getTextStyle('date')}>Date</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, getButtonStyle('rating')]}
          onPress={() => setSortBy('rating')}
        >
          <Text style={getTextStyle('rating')}>Rating</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleSortOrder} style={styles.sortOrderButton}>
          <Text style={styles.sortOrderText}>{isAscending ? 'Ascending' : 'Descending'}</Text>
        </TouchableOpacity>
      </View>
      {loading && movies.length === 0 ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <FlatList
          data={sortBy === 'default' ? movies : sortedMovies}
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
  filterBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingBottom: 10,
  },
  filterButton: {
    padding: 10,
    borderRadius: 5,
  },
  selectedButton: {
    backgroundColor: theme.colors.background_soft,
  },
  unselectedButton: {
    backgroundColor: theme.colors.background,
  },
  selectedText: {
    color: theme.colors.primary,
  },
  unselectedText: {
    color: '#FFF',
  },
  sortOrderButton: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
    backgroundColor: theme.colors.background_soft,
  },
  sortOrderText: {
    color: theme.colors.primary,
  },
});

export default MoviesList2;

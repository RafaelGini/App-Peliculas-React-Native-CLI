import React, { useState, useEffect } from 'react';
import { View, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { getMovies } from '../../../services/searchMovies';
import Movie from '../../../interfaces/Movie';
import UserInfo from '../../../interfaces/UserInfo';
import MovieItem from './MovieItem';
import { useNavigation } from '@react-navigation/native';
import initialDataScreen from '../../../utils/initialDataScreen';
import noDataScreen from '../../../utils/noDataScreen';

interface Props {
  searchQuery: string;
  userInfo: UserInfo | null;
  sortBy: string;
  order: string;
}

const InfiniteScrollList3: React.FC<Props> = ({ searchQuery, userInfo, sortBy, order }) => {
  const [data, setData] = useState<Movie[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMoreData, setHasMoreData] = useState<boolean>(true);
  const [noResults, setNoResults] = useState<boolean>(false);
  const navigation = useNavigation();

  useEffect(() => {
    const resetAndLoadData = async () => {
      setLoading(true);
      setData([]);
      setPage(1);
      setHasMoreData(true);
      setNoResults(false);
      const newData = await getMovies(searchQuery, userInfo, 1);
      setData(sortData(newData));
      setPage(2);
      setLoading(false);
      if (newData.length === 0) {
        setHasMoreData(false);
        setNoResults(true);
      }
    };
    if (searchQuery) {
      resetAndLoadData();
    }
  }, [searchQuery, sortBy, order]);

  const loadMoreData = async () => {
    if (loading || !hasMoreData) return;
    setLoading(true);
    const newData = await getMovies(searchQuery, userInfo, page);
    setData((prevData) => sortData([...prevData, ...newData]));
    setPage((prevPage) => prevPage + 1);
    setLoading(false);
    if (newData.length === 0) {
      setHasMoreData(false);
    }
  };

  const sortData = (data: Movie[]) => {
    if (sortBy === 'default') return data;

    const sortedData = [...data].sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(a.release_date).getTime() - new Date(b.release_date).getTime();
      }
      if (sortBy === 'rating') {
        return a.vote_average - b.vote_average;
      }
      return 0;
    });

    return order === 'asc' ? sortedData : sortedData.reverse();
  };

  const renderFooter = () => {
    if (!loading) return null;
    return (
      <View style={styles.footer}>
        <ActivityIndicator size="large" />
      </View>
    );
  };

  const handleMoviePress = (movie: Movie) => {
    //@ts-ignore
    navigation.navigate('MovieDetail', { movieId: movie.id });
  };

  if (!searchQuery) {
    return initialDataScreen();
  }

  if (noResults) {
    return noDataScreen();
  }

  return (
    <FlatList
      data={data}
      keyExtractor={(item, index) => `${item.id}-${index}`}
      renderItem={({ item }) => (
        <MovieItem movie={item} onPress={() => handleMoviePress(item)} />
      )}
      onEndReached={loadMoreData}
      onEndReachedThreshold={0.5}
      ListFooterComponent={renderFooter}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  footer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default InfiniteScrollList3;

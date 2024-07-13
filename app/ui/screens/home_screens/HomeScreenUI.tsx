import React from 'react';
import { View, StyleSheet, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import Movie from '../../../interfaces/Movie';
import theme from '../../styles/theme';
import MovieList from '../../components/movie_components/MovieList';
import { useTranslation } from 'react-i18next';
import MovieItem from '../../components/movie_components/MovieItem';


interface HomeScreenUIProps {
  movies: Movie[];
  isLoading: boolean;
  isFetchingMore: boolean;
  genres: string[];
  selectedGenre: string;
  handleGenreSelect: (genre: string) => void;
  loadMoreMovies: () => void;
  handleMoviePress: (movie: Movie) => void;
}

const HomeScreenUI: React.FC<HomeScreenUIProps> = ({
  movies,
  isLoading,
  isFetchingMore,
  genres,
  selectedGenre,
  handleGenreSelect,
  loadMoreMovies,
  handleMoviePress
}) => {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{t('NEWEST_MOVIES')}</Text>
      </View>
      <FlatList
        data={genres}
        horizontal
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.genreButton, item === selectedGenre && styles.genreButtonSelected]}
            onPress={() => handleGenreSelect(item)}
          >
            <Text style={styles.genreButtonText}>{item}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.genreList}
      />
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size={'large'} color={theme.colors.primary} />
        </View>
      ) : (
        <FlatList
          data={movies}
          renderItem={({ item }) => <MovieItem movie={item} onPress={() => handleMoviePress(item)}/>}
          keyExtractor={(item) => item.id.toString()}
          onEndReached={loadMoreMovies}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            isFetchingMore ? (
              <View style={styles.loadingMoreContainer}>
                <ActivityIndicator size={'small'} color={theme.colors.primary} />
              </View>
            ) : null
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: 16,
  },
  titleContainer: {
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  genreList: {
    paddingBottom: 15,
  },
  genreButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 5,
    backgroundColor: theme.colors.background,
    marginHorizontal: 5,
    minWidth: 100,
    maxWidth: 150,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
  },
  genreButtonText: {
    color: theme.colors.text,
    fontSize: 14,
    textAlign: 'center',
    flexWrap: 'wrap',
  },
  genreButtonSelected: {
    backgroundColor: theme.colors.background_soft,
    color: theme.colors.primary
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingMoreContainer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreenUI;

// React
import React from 'react';
import { View, StyleSheet, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';

// Interfaces
import Movie from '../../../interfaces/Movie';

// Styles
import theme from '../../styles/theme';

// Components
import MovieList from '../../components/movie_components/MovieList';

// Utils
import { useTranslation } from 'react-i18next';

interface HomeScreenUIProps {
  movies: Movie[];
  isLoading: boolean;
  genres: string[];
  selectedGenre: string;
  handleGenreSelect: (genre: string) => void;
}

const HomeScreenUI: React.FC<HomeScreenUIProps> = ({
  movies,
  isLoading,
  genres,
  selectedGenre,
  handleGenreSelect
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
        <MovieList movies={movies} searchInput={'a'} isLoading={false} isTimeout={false} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: 16,
    marginTop: 5,
  },
  titleContainer: {
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  genreList: {

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
});

export default HomeScreenUI;

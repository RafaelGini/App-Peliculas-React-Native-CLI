import React from 'react';
import { FlatList, View, Text, TextInput, StyleSheet } from 'react-native';
import Movie from '../../interfaces/Movie';

interface SearchScreenUIProps {
  movies: Movie[];
  searchInput: string;
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
}

const SearchScreenUI: React.FC<SearchScreenUIProps> = ({ movies, searchInput, setSearchInput }) => {
  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder="Search movies..."
        value={searchInput}
        onChangeText={setSearchInput}
      />
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.movieItem}>
            <Text style={styles.movieTitle}>{item.title}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  movieItem: {
    padding: 8,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  movieTitle: {
    fontSize: 18,
  },
});

export default SearchScreenUI;

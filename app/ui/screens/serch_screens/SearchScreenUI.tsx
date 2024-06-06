import React from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './searchStyles';
import theme from '../../styles/theme';

interface SearchScreenProps {
  searchText: string;
  handleSearch: (text: string) => void;
  filter: () => void;
}

const SearchScreenUI: React.FC<SearchScreenProps> = ({ searchText, handleSearch, filter }) => {
  return (
    <View style={styles.container}>
      <View style={styles.searchInputContainer}>
        <View style={styles.searchInputText}>
          <TextInput
            style={styles.searchInput}
            placeholder="Busca por título o actor..."
            onChangeText={handleSearch}
            value={searchText}
          />
        </View>
        <View style={styles.searchInputButton}>
          <TouchableOpacity style={styles.searchButton} onPress={filter}>
            <Ionicons name={"search"} size={styles.movieRate.fontSize} color={theme.colors.primary} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default SearchScreenUI;
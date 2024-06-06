import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, FlatList, Image, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import theme from '../../styles/theme';
import Item from './Item'
import { MovieItem } from './Interfaces';
import styles from './searchStyles'
import { propertyData } from './testData';
import { searchMovies } from './searchServices';

const SearchScreen = () => {
  const [searchText, setSearchText] = useState('');
  const [iconDate, setIconDate] = useState("");
  const [iconRate, setIconRate] = useState("");
  const [data, setData] = useState<MovieItem[]>([]);

  const fetchData = async (query: string) => {
    try {
      const movies = await searchMovies(query);
      setData(movies);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  //useEffect(() => {
  //  setData(propertyData);
  // }, []);
  
  useEffect(() => {
    fetchData(searchText); // Llama a fetchData con el searchText actual
  }, [searchText]);

  const handleSearch = (text: string) => {
    setSearchText(text);
  };
  
  const renderItem = ({ item }: { item: MovieItem }) => <Item item={item} />;

  const sortByDate = () => {
    setIconRate("");
    data.sort(function (a, b) {
      const dateA = new Date(a.release_date);
      const dateB = new Date(b.release_date);
      
      if (iconDate === "arrow-down") {
        return dateA.getTime() - dateB.getTime(); // Descendente
      } else {
        return dateB.getTime() - dateA.getTime(); // Ascendente
      }
    });
    setData([...data]);
    iconDate === "arrow-down" ? setIconDate("arrow-up") : setIconDate("arrow-down");
  };
  

  const sortByRate = () => {
    setIconDate("");
    data.sort(function (a, b) {
      if (iconRate == "arrow-down") {
        return a.vote_average - b.vote_average; //Descendente
      } else {
        return b.vote_average - a.vote_average; //Ascendente
      }
    });
    setData([...data]);
    iconRate == "arrow-down" ? setIconRate("arrow-up") : setIconRate("arrow-down");
  };

  const filter = () => {
    //API Call para traer datos, usar searchText ??
    setData([]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchInputContainer}>
        <View style={styles.searchInputText}>
          <TextInput
            style={styles.searchInput}
            placeholder="Busca por título o actor..."
            placeholderTextColor={theme.colors.text_light}
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

      <View style={styles.sortContainer}>
        <View style={styles.sortLineBox}>
          <TouchableOpacity style={styles.sortButton} onPress={sortByDate}>
            <Text style={styles.sortText}>Fecha <Ionicons name={iconDate} size={styles.movieRate.fontSize} color={theme.colors.primary} /></Text>
          </TouchableOpacity>
        </View>
        <View style={styles.sortLineBox}>
          <TouchableOpacity style={styles.sortButton} onPress={sortByRate}>
            <Text style={styles.sortText}>Calificación <Ionicons name={iconRate} size={styles.movieRate.fontSize} color={theme.colors.primary} /> </Text>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        contentContainerStyle={styles.listContainer}
        //data={filteredData}
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

export default SearchScreen;
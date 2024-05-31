/*
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

//Styling
import theme from '../../styles/theme';

const SearchScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Pantalla de Buscar</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
  },
  text: { 
    color: theme.colors.text,
  }
});

export default SearchScreen;
*/

import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, FlatList, Image, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import theme from '../../styles/theme';



const propertyData = [
  {
    id: '1',
    image: 'https://source.unsplash.com/900x900/?house',
    price: '$250,000',
    address: '123 Main St',
    squareMeters: '150',
    beds: '3',
    baths: '2',
    parking: '1'
  },
  {
    id: '2',
    image: 'https://source.unsplash.com/900x900/?apartment',
    price: '$400,000',
    address: '456 Oak Ave',
    squareMeters: '200',
    beds: '4',
    baths: '3',
    parking: '2'
  },
  {
    id: '3',
    image: 'https://source.unsplash.com/900x900/?house+front',
    price: '$150,000',
    address: '789 Maple Rd',
    squareMeters: '100',
    beds: '2',
    baths: '1',
    parking: '0'
  },
  {
    id: '4',
    image: 'https://source.unsplash.com/900x900/?small+house',
    price: '$150,000',
    address: '789 Maple Rd',
    squareMeters: '100',
    beds: '2',
    baths: '1',
    parking: '0'
  }
];

const SearchScreen = () => {
  const [searchText, setSearchText] = useState('');

  const handleSearch = (text) => {
    setSearchText(text);
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card}>
      <View style={styles.col1}>
        <Image source={{ uri: item.image }} style={styles.image} />
      </View>

      <View style={styles.col2}>
        <View style={styles.line}>
          <Text style={styles.movieTitle}>{item.price}</Text>
        </View>
        <View style={styles.line}>
          <TouchableOpacity style={styles.icon}>
            <Ionicons name={"star"} size={styles.movieRate.fontSize} color={theme.colors.secondary} />
          </TouchableOpacity>
          <Text style={styles.movieRate}>{item.address}</Text>
        </View>
        <View style={styles.line}>
          <TouchableOpacity style={styles.icon}>
            <Ionicons name={"calendar"} size={styles.movieRate.fontSize} color={theme.colors.text_light} />
          </TouchableOpacity>
          <Text style={styles.movieText}>{item.address}</Text>
        </View>
        <View style={styles.line}>
          <TouchableOpacity style={styles.icon}>
            <Ionicons name={"time"} size={styles.movieRate.fontSize} color={theme.colors.text_light} />
          </TouchableOpacity>
          <Text style={styles.movieText}>{item.address} minutos</Text>
        </View>
        <View style={styles.line}>
          <TouchableOpacity style={styles.icon}>
            <Ionicons name={"film"} size={styles.movieRate.fontSize} color={theme.colors.text_light} />
          </TouchableOpacity>
          <Text style={styles.movieText}>{item.address}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const filteredData = propertyData.filter((item) => {
    return item.address.toLowerCase().includes(searchText.toLowerCase());
  });

  return (
    <View style={styles.container}>
      <View style={styles.searchInputContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search properties..."
          onChangeText={handleSearch}
          value={searchText}
        />
      </View>
      <View style={styles.searchInputContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search properties..."
          onChangeText={handleSearch}
          value={searchText}
        />
      </View>
      <FlatList
        contentContainerStyle={styles.propertyListContainer}
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:20,
    backgroundColor: theme.colors.background,
  },
  col1: {
    flex: 3,
    padding: 10,
    alignSelf: 'center',
    backgroundColor: theme.colors.background,
  },
  col2: {
    flex: 7,
    padding: 15,
    backgroundColor: theme.colors.background,
  },
  line: {
    flex: 1,
    flexDirection: 'row',
    //marginLeft: 10,
  },

  movieTitle: {
    fontSize: 26,
    color: theme.colors.text,
    fontFamily: theme.fonts.bold,
  },
  movieRate: {
    fontSize: 16,
    alignSelf: 'center',
    marginLeft: 5,
    color: theme.colors.secondary,
  },
  movieText: {
    fontSize: 16,
    alignSelf: 'center',
    marginLeft: 5,
    color: theme.colors.text_light,
  },
  icon: {
    alignSelf: 'center',
  },


  searchInputContainer:{
    paddingHorizontal:20,
  },
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderColor:'#dcdcdc',
    backgroundColor:'#fff',
    borderRadius: 35,
    padding: 10,
    marginBottom: 10
  },
  propertyListContainer:{
    paddingHorizontal:20,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginTop:10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    //shadowOpacity: 0.25,
    //shadowRadius: 3.84,
    //elevation: 5
  },
  image: {
    height: 150,
    //marginBottom: 10,
    borderRadius: 8,
    //borderTopLeftRadius:5,
    //borderTopRightRadius:5,
  },
  cardBody: {
    marginBottom: 10,
    padding: 10,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5
  },
  address: {
    fontSize: 16,
    marginBottom: 5
  },
  squareMeters: {
    fontSize: 14,
    marginBottom: 5,
    color: '#666'
  },
  cardFooter: {
    padding: 10,
    flexDirection: 'row',
    borderTopWidth:1,
    borderTopColor:'#dcdcdc',
    justifyContent: 'space-between',
  },
  beds: {
    fontSize: 14,
    color:'#ffa500',
    fontWeight: 'bold'
  },
  baths: {
    fontSize: 14,
    color:'#ffa500',
    fontWeight: 'bold'
  },
  parking: {
    fontSize: 14,
    color:'#ffa500',
    fontWeight: 'bold'
  }
});

export default SearchScreen;
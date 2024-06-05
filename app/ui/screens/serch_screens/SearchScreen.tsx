import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, FlatList, Image, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import theme from '../../styles/theme';

const propertyData = [
  {
    idMovie: '1',
    title: "Harry Potter y el Prisionero de Askaban",
    url: "link de la bd",
    subtitle: "Harry Potter",
    sypnosis: "Pequeño resumen sobre la peli",
    genre: "Fantasía",
    main_image: "https://pm1.aminoapps.com/6190/b814cc8b4d581e6ae8873c143073bbc79947142e_00.jpg",
    images: [
      "https://res.cloudinary.com/demo/image/upload/v1616433933/sample.jpg",
      "https://res.cloudinary.com/demo/image/upload/v1616433933/sample1.jpg"
    ],
    trailer: "www.youtube.com/hp",
    releaseYear: 2004,
    duration: "2h 19m",
    score: 3.0,
    qualifiers: 1250,
    director: "Alfonso Cuarón",
    cast: [
      "Daniel Radcliffe",
      "Emma Watson",
      "Rupert Grint",
      "Gary Oldman",
      "Messi"
    ],
  },
  {
    idMovie: '2',
    title: "Harry Potter y la piedra filosofal",
    url: "link de la bd",
    subtitle: "Harry Potter",
    sypnosis: "Pequeño resumen sobre la peli",
    genre: "Fantasía",
    main_image: "https://es.web.img2.acsta.net/pictures/14/04/30/11/55/592219.jpg",
    images: [
      "https://res.cloudinary.com/demo/image/upload/v1616433933/sample.jpg",
      "https://res.cloudinary.com/demo/image/upload/v1616433933/sample1.jpg"
    ],
    trailer: "www.youtube.com/hp",
    releaseYear: 2001,
    duration: "2h 19m",
    score: 5.0,
    qualifiers: 1250,
    director: "Alfonso Cuarón",
    cast: [
      "Daniel Radcliffe",
      "Emma Watson",
      "Rupert Grint",
      "Gary Oldman"
    ],
  },
  {
    idMovie: '3',
    title: "Harry Potter y la camara secreta",
    url: "link de la bd",
    subtitle: "Harry Potter",
    sypnosis: "Pequeño resumen sobre la peli",
    genre: "Fantasía",
    main_image: "https://play-lh.googleusercontent.com/1CJa-LZ6zaeArmzT6bG3RFm18DRtgYIpLl30zr2BC_nOQQyyOR6yx3QA7OXc8U7--RU39FWjurBS2K-urgg",
    images: [
      "https://res.cloudinary.com/demo/image/upload/v1616433933/sample.jpg",
      "https://res.cloudinary.com/demo/image/upload/v1616433933/sample1.jpg"
    ],
    trailer: "www.youtube.com/hp",
    releaseYear: 2002,
    duration: "2h 19m",
    score: 4.0,
    qualifiers: 1250,
    director: "Alfonso Cuarón",
    cast: [
      "Daniel Radcliffe",
      "Emma Watson",
      "Rupert Grint",
      "Gary Oldman"
    ],
  },
  {
    idMovie: '4',
    title: "Harry Potter y la orden del fenix",
    url: "link de la bd",
    subtitle: "Harry Potter",
    sypnosis: "Pequeño resumen sobre la peli",
    genre: "Fantasía",
    main_image: "https://img.wattpad.com/cover/309703635-352-k682214.jpg",
    images: [
      "https://res.cloudinary.com/demo/image/upload/v1616433933/sample.jpg",
      "https://res.cloudinary.com/demo/image/upload/v1616433933/sample1.jpg"
    ],
    trailer: "www.youtube.com/hp",
    releaseYear: 2007,
    duration: "2h 19m",
    score: 1.0,
    qualifiers: 1250,
    director: "Alfonso Cuarón",
    cast: [
      "Daniel Radcliffe",
      "Emma Watson",
      "Rupert Grint",
      "Gary Oldman"
    ],
  },
  {
    idMovie: '5',
    title: "Harry Potter y el caliz de fuego",
    url: "link de la bd",
    subtitle: "Harry Potter",
    sypnosis: "Pequeño resumen sobre la peli",
    genre: "Fantasía",
    main_image: "https://m.media-amazon.com/images/S/pv-target-images/a7e79947458f867291d8c528e22eb6836b651bba6f7ed987a28d3262c8e39d1f.jpg",
    images: [
      "https://res.cloudinary.com/demo/image/upload/v1616433933/sample.jpg",
      "https://res.cloudinary.com/demo/image/upload/v1616433933/sample1.jpg"
    ],
    trailer: "www.youtube.com/hp",
    releaseYear: 2005,
    duration: "2h 19m",
    score: 2,
    qualifiers: 1250,
    director: "Alfonso Cuarón",
    cast: [
      "Daniel Radcliffe",
      "Emma Watson",
      "Rupert Grint",
      "Gary Oldman"
    ],
  },
];

const SearchScreen = () => {
  const [searchText, setSearchText] = useState('');

  const handleSearch = (text) => {
    setSearchText(text);
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card}>
      <View style={styles.cardPicture}>
        <Image source={{ uri: item.main_image }} style={styles.image} />
      </View>

      <View style={styles.cardInfo}>
        <View style={styles.line}>
          <Text style={styles.movieTitle}>{item.title}</Text>
        </View>
        <View style={styles.line}>
          <TouchableOpacity style={styles.icon}>
            <Ionicons name={"star"} size={styles.movieRate.fontSize} color={theme.colors.secondary} />
          </TouchableOpacity>
          <Text style={styles.movieRate}>{item.score}</Text>
        </View>
        <View style={styles.line}>
          <TouchableOpacity style={styles.icon}>
            <Ionicons name={"calendar"} size={styles.movieRate.fontSize} color={theme.colors.text_light} />
          </TouchableOpacity>
          <Text style={styles.movieText}>{item.releaseYear}</Text>
        </View>
        <View style={styles.line}>
          <TouchableOpacity style={styles.icon}>
            <Ionicons name={"time"} size={styles.movieRate.fontSize} color={theme.colors.text_light} />
          </TouchableOpacity>
          <Text style={styles.movieText}>{item.duration}</Text>
        </View>
        <View style={styles.line}>
          <TouchableOpacity style={styles.icon}>
            <Ionicons name={"film"} size={styles.movieRate.fontSize} color={theme.colors.text_light} />
          </TouchableOpacity>
          <Text style={styles.movieText}>{item.genre}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const filteredData = propertyData.filter((item) => {
    // API Call para traer datos filtrados
    return propertyData;
  });

  const [iconDate, setIconDate] = useState("");
  const [iconRate, setIconRate] = useState("");
  const [data, setData] = useState(filteredData);

  const sortByDate = () => {
    setIconRate("");
    data.sort(function (a, b) {
      if(iconDate == "arrow-down"){
        return b.releaseYear - a.releaseYear; //Descendente
      } else {
        return a.releaseYear - b.releaseYear; //Ascendente
      }
    });
    setData([...data]);
    iconDate == "arrow-down" ? setIconDate("arrow-up") : setIconDate("arrow-down");
  };

  const sortByRate = () => {
    setIconDate("");
    data.sort(function (a, b) {
      if(iconRate == "arrow-down"){
        return b.score - a.score; //Descendente
      } else {
        return a.score - b.score; //Ascendente
      }
    });
    setData([...data]);
    iconRate == "arrow-down" ? setIconRate("arrow-up") : setIconRate("arrow-down");
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
          <TouchableOpacity style={styles.searchButton}>
            <Ionicons name={"search"} size={styles.movieRate.fontSize} color={theme.colors.primary}/>
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
        keyExtractor={(item) => item.idMovie}
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
  cardPicture: {
    flex: 3,
    padding: 10,
    alignSelf: 'center',
    backgroundColor: theme.colors.background,
  },
  cardInfo: {
    flex: 7,
    padding: 8,
    backgroundColor: theme.colors.background,
  },
  line: {
    flex: 1,
    flexDirection: 'row',
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
    flexDirection: 'row',
  },
  searchInputText: {
    flex: 5,
  },
  searchInputButton: {
    flex: 1,
  },
  searchButton: {
    borderRadius: 30,
    borderColor: theme.colors.grey,
    backgroundColor: theme.colors.background_soft,
    padding: 10,
    alignSelf: 'center',
  },
  sortContainer:{
    paddingHorizontal:20,
    flexDirection: 'row',
    marginBottom: 5
  },
  sortLineBox: {
    flex: 1,
  },
  sortButton: {
    borderRadius: 10,
    borderColor: theme.colors.grey,
    backgroundColor: theme.colors.background_soft,
    paddingHorizontal: 30,
    paddingVertical: 2,
    alignSelf: 'center',
  },
  sortText: {
    fontSize: 18,
    color: theme.colors.primary,
  },

  searchInput: {
    height: 40,
    borderWidth: 1,
    color: theme.colors.text_light,
    borderColor: theme.colors.text_light,
    backgroundColor: theme.colors.background_soft,
    borderRadius: 35,
    padding: 10,
    marginBottom: 10
  },
  listContainer:{
    paddingHorizontal:20,
  },
  card: {
    flexDirection: 'row',
    borderRadius: 10,
    marginTop:10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
  },
  image: {
    height: 150,
    borderRadius: 8,
  },
});

export default SearchScreen;
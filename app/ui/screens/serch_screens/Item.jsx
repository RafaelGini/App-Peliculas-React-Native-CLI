import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import theme from '../../styles/theme';
import { MovieItem } from './Interfaces'
import styles from './searchStyles'
import { useNavigation } from '@react-navigation/native';

const Item = ({ item }) => {
  //: { item: MovieItem }
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('MovieDetails', { movieId: item.id });
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
      <View style={styles.cardPicture}>
        <Image source={{ uri: item.poster_path }} style={styles.image} />
      </View>
      <View style={styles.cardInfo}>
        <View style={styles.line}>
          <Text style={styles.movieTitle}>{item.title}</Text>
        </View>
        <View style={styles.line}>
          <TouchableOpacity style={styles.icon}>
            <Ionicons name={"star"} size={styles.movieRate.fontSize} color={theme.colors.secondary} />
          </TouchableOpacity>
          <Text style={styles.movieRate}>{item.vote_average.toString()}</Text>
        </View>
        <View style={styles.line}>
          <TouchableOpacity style={styles.icon}>
            <Ionicons name={"calendar"} size={styles.movieRate.fontSize} color={theme.colors.text_light} />
          </TouchableOpacity>
          <Text style={styles.movieText}>{item.release_date}</Text>
        </View>
        {
          //<View style={styles.line}>
          //<TouchableOpacity style={styles.icon}>
          //<Ionicons name={"time"} size={styles.movieRate.fontSize} color={theme.colors.text_light} />
          //</TouchableOpacity>
          //<Text style={styles.movieText}>{"item.duration"}</Text>
          //</View>
        }
        <View style={styles.line}>
          <TouchableOpacity style={styles.icon}>
            <Ionicons name={"film"} size={styles.movieRate.fontSize} color={theme.colors.text_light} />
          </TouchableOpacity>
          <Text style={styles.movieText}>{item.genre}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default Item;
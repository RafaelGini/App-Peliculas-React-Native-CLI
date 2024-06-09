//React
import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

//Screens y componentes
import HomeScreen from '../ui/screens/home_screens/HomeScreen';
//import SearchScreen from '../ui/screens/serch_screens/SearchScreen';
import SearchScreen from '../ui/testComponents/searchScreen';
import FavoritesScreen from '../ui/screens/favorites_screens/FavoritesScreen';
import ProfileScreen from '../ui/screens/profile_screens/ProfileScreen';

//Styling
import theme from '../ui/styles/theme';

const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerStyle: {
          backgroundColor: theme.colors.background, // Color del header
        },
        headerTintColor: theme.colors.text, // Color del texto del header
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Home':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Search':
              iconName = focused ? 'search' : 'search-outline';
              break;
            case 'Favorites':
              iconName = focused ? 'heart' : 'heart-outline';
              break;
            case 'Profile':
              iconName = focused ? 'person' : 'person-outline';
              break;
          }
          return <Ionicons name={iconName} size={size} color={color} />
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.grey,
        tabBarStyle: {
          backgroundColor: theme.colors.background, // Color de la tab bar
          height: 80,  
          paddingBottom: 10,  
          paddingTop: 10,  
        },
        tabBarLabelStyle: {
          fontSize: 15, 
        },
      })}
    >

      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Favorites" component={FavoritesScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />

    </Tab.Navigator>
  );
}

export default HomeTabs;
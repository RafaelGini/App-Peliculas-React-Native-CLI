import React, { useEffect } from 'react';
import { Platform, SafeAreaView, StatusBar, StyleSheet, Text, View, Button } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons'; 
import HomeScreen from './app/ui/screens/home_screens/HomeScreen';

const Tab = createBottomTabNavigator();

const SearchScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Search Screen</Text>
    </View>
  );
};

const FavoritesScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Favorites Screen</Text>
    </View>
  );
};

const ProfileScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Profile Screen</Text>
    </View>
  );
};

const App = () => {
  useEffect(() => {
    if (Platform.OS === 'android') {
      SplashScreen.hide();
    }
  }, []);

  const userName = "Pablo"; 

  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" />
      <Tab.Navigator 
        screenOptions={() => ({
          tabBarStyle: { height: 60, paddingBottom: 10 },
          tabBarLabelStyle: { fontSize: 14 }
      })}>

        <Tab.Screen name="Home">
          {() => <HomeScreen userName="Pablo" />}
        </Tab.Screen>
        
        <Tab.Screen name="Search" component={SearchScreen} />
        
        <Tab.Screen name="Favorites" component={FavoritesScreen} />
        
        <Tab.Screen name="Profile" component={ProfileScreen} />
      
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
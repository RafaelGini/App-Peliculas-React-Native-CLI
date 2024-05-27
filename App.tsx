//React
import React, { useEffect } from 'react';
import { Platform, SafeAreaView, StatusBar, StyleSheet, Text, View, Button } from 'react-native';
//Splash
import SplashScreen from 'react-native-splash-screen';
//React Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//Screens y componentes
import LoginScreen from './app/ui/screens/LoginScreens/LoginScreen';
import HomeTabs from './app/Navigation/HomeTabs';
import MovieDetailsScreen from './app/ui/screens/MovieDetailsScreen/MovieDetailScreen';

const Stack = createNativeStackNavigator();

const App = () => {

  useEffect(() => {
    if (Platform.OS === 'android') {
      SplashScreen.hide();
    }
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="HomeTabs" component={HomeTabs} options={{ headerShown: false }} />
        <Stack.Screen name="MovieDetails" component={MovieDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
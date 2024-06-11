//React
import React, { useEffect } from 'react';
import { Platform, SafeAreaView, StatusBar, StyleSheet, Text, View, Button } from 'react-native';

//Splash
import SplashScreen from 'react-native-splash-screen';

//React Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//Screens y componentes
import LoginScreen from './app/ui/screens/loginScreens/LoginScreen';
import HomeTabs from './app/Navigation/HomeTabs';
import MovieDetailsScreen from './app/ui/screens/movieDetailsScreen/MovieDetailScreen';

//Redux
import { Provider } from 'react-redux';
import store from './app/redux/store';


const Stack = createNativeStackNavigator();

const App = () => {

  useEffect(() => {
    if (Platform.OS === 'android') {
      SplashScreen.hide();
    }
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="HomeTabs" component={HomeTabs} options={{ headerShown: false }} />
          <Stack.Screen name="MovieDetails" component={MovieDetailsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>

  );
};

export default App;
//React - Navigation
import React, { useEffect } from 'react';
import { Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//Splash
import SplashScreen from 'react-native-splash-screen';

//Redux
import { Provider } from 'react-redux';
import store from '../../../redux/store';

//Components
import LoginScreen from '../../screens/loginScreens/LoginScreen';
import HomeTabs from './HomeTabs';
import MovieDetail from '../../screens/movieDetailsScreen/MovieDetail';

const Stack = createNativeStackNavigator();

const Navigation = () => {

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

          {/* @ts-ignore */}
          <Stack.Screen name="MovieDetail" component={MovieDetail} />

        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default Navigation;

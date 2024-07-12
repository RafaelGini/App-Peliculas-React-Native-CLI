import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Alert, ActivityIndicator } from 'react-native';
import { GoogleSignin, GoogleSigninButton, User } from '@react-native-community/google-signin';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setUser } from '../../../redux/slices/userSlice';
import { useTranslation } from 'react-i18next';
import theme from '../../styles/theme';
import { login } from '../../../services/loginAPIService';
import UserInfo from '../../../interfaces/UserInfo';
import GoogleUserInfo from '../../../interfaces/GoogleUserInfo';

GoogleSignin.configure({
  webClientId: '339637593763-19rqqksc5a7u595uiu4gl1pcer0qd383.apps.googleusercontent.com',
  offlineAccess: true,
});

//@ts-ignore
const LoginScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const checkUserLoggedIn = async () => {
      setIsLoading(true);
      try {
        const storedUser = await AsyncStorage.getItem('user');
        if (storedUser) {
          const userInfoResponse = JSON.parse(storedUser);
          dispatch(setUser(userInfoResponse));
          navigation.replace('HomeTabs');
        }
      } catch (error) {
        console.log('Error al recuperar los datos del usuario:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkUserLoggedIn();
  }, [dispatch, navigation]);

  const signIn = async () => {
    setIsLoading(true);
    try {
      await GoogleSignin.hasPlayServices();
      const user: User = await GoogleSignin.signIn();
      const googleUserInfo: GoogleUserInfo = mapToGoogleUserInfo(user);
      const userInfoResponse: UserInfo = await login(googleUserInfo);
      await AsyncStorage.setItem('user', JSON.stringify(userInfoResponse));
      dispatch(setUser(userInfoResponse));
      navigation.replace('HomeTabs');
    } catch (error) {
      Alert.alert(
        'Error al iniciar sesión',
        `Ocurrió un problema al intentar iniciar sesión: ${error}`,
        [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
        { cancelable: false },
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color={theme.colors.primary} />
      ) : (
        <>
          <Image source={require('../../../assets/images/MovieFinder_logo.png')} style={styles.logo} />
          <Text style={styles.title}>MovieFinder</Text>
          <Text style={styles.subtitle}>{t('LOGIN_GOOGLE')}</Text>
          <GoogleSigninButton
            style={{ width: 192, height: 48 }}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={signIn}
          />
        </>
      )}
    </View>
  );
};

const mapToGoogleUserInfo = (userInfo: User) => {
  return {
    name: userInfo.user.name,
    surname: userInfo.user.familyName,
    email: userInfo.user.email,
    nickname: '',
    profileImage: userInfo.user.photo,
    googleId: userInfo.user.id,
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
    padding: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: theme.colors.text_light,
    marginTop: 30,
    marginBottom: 50,
  },
});

export default LoginScreen;

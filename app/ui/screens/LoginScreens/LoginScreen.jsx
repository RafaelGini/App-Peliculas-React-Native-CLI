import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';
import theme from '../../styles/theme';
import { GoogleSignin, GoogleSigninButton } from '@react-native-community/google-signin';
import { AuthContext } from '../../../context/AuthContext';
import { getUserProfile } from '../../../services/getUserProfile';
import { useTranslation } from 'react-i18next';

GoogleSignin.configure({
  webClientId: '339637593763-19rqqksc5a7u595uiu4gl1pcer0qd383.apps.googleusercontent.com',
  offlineAccess: true
});

const LoginScreen = ({ navigation }) => {
  const {t} = useTranslation();

  const { login, userInfo} = useContext(AuthContext);

  const mapToGoogleUserInfo = (userInfo) => {
    return {
        name: userInfo.user.givenName,
        surname: userInfo.user.familyName,
        email: userInfo.user.email,
        nickname: "", 
        profileImage: userInfo.user.photo,
        googleId: userInfo.user.id
    };
};

  const signIn = async () => {
    try {

      await GoogleSignin.hasPlayServices();
      const googleUserInfo = await GoogleSignin.signIn();
      const mappedUserInfo = mapToGoogleUserInfo(googleUserInfo);
      await login(mappedUserInfo);
      console.log(userInfo)
      navigation.replace('HomeTabs');
      getUserProfile(userInfo.id, userInfo.token);
      

    } catch (error) {
        console.log(error); 
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../../assets/images/MovieFinder_logo.png')} style={styles.logo} />
      <Text style={styles.title}>MovieFinder</Text>
      <Text style={styles.subtitle}>{t('LOGIN_GOOGLE')}</Text>
      <GoogleSigninButton
        style={{ width: 192, height: 48 }}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={signIn}
      />
    </View>
  );
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
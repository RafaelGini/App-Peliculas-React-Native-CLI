import React from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';
import theme from '../../styles/theme';
import { GoogleSignin, GoogleSigninButton } from '@react-native-community/google-signin';

GoogleSignin.configure({
  webClientId: '339637593763-19rqqksc5a7u595uiu4gl1pcer0qd383.apps.googleusercontent.com',
  offlineAccess: true
});

const LoginScreen = ({ navigation }) => {

  const handleLogin = () => {
    navigation.replace('HomeTabs');
  };

  const signIn = async () => {

    await GoogleSignin.hasPlayServices();
    console.log("iniciando sesion...");
    const userInfo = await GoogleSignin.signIn();
    console.log(userInfo);

    // Aquí puedes hacer la llamada a tu API backend
  };


  return (
    <View style={styles.container}>
      <Image source={require('../../../assets/images/MovieFinder_logo.png')} style={styles.logo} />
      <Text style={styles.title}>MovieFinder</Text>
      <Text style={styles.subtitle}>Ingrese con su cuenta de Google</Text>
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
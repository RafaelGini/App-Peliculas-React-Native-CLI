import React from 'react';
import { View, Text, Button, StyleSheet, Image, Alert } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import theme from '../../styles/theme';
import axios from 'axios';

GoogleSignin.configure({
  webClientId: '339637593763-3mts1e0u0k3c4iu9iu4s0790rup5ejb6.apps.googleusercontent.com', // Reemplaza con tu webClientId
  offlineAccess: true,
});

const LoginScreen = ({ navigation }) => {
  const handleLogin = () => {

    navigation.replace('HomeTabs');
  };

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const googleToken = userInfo.idToken;

      // Enviar el token de Google a la API Rest
      const response = await axios.post('https://tu-api.com/login', {
        token: googleToken,
      });

      const jwt = response.data.jwt;
      // Guardar el JWT para futuras solicitudes
      navigation.replace('HomeTabs');
      
    } catch (error) {
      if (error.response) {
        // La solicitud fue hecha y el servidor respondió con un código de estado
        // que no está en el rango de 2xx
        Alert.alert('Login failed', `Error: ${error.response.data.error}`);
      } else if (error.request) {
        // La solicitud fue hecha pero no se recibió respuesta
        Alert.alert('Login failed', 'No response received from server');
      } else {
        // Algo pasó en la configuración de la solicitud que desencadenó un Error
        Alert.alert('Login failed', `Error: ${error.message}`);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../../assets/images/MovieFinder_logo.png')} style={styles.logo} />
      <Text style={styles.title}>MovieFinder</Text>
      <Text style={styles.subtitle}>Ingrese con su cuenta de Google</Text>
      <Button title="Login" onPress={handleLogin} />
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
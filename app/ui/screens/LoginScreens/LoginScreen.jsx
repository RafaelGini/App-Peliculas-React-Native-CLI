import React from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';
import theme from '../../styles/theme';

const LoginScreen = ({ navigation }) => {
  const handleLogin = () => {
    navigation.replace('HomeTabs');
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
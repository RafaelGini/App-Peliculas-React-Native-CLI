import React from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import Navigation from './app/ui/components/navigation/Navigation';

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <Navigation />
    </>
  );
};

export default App;

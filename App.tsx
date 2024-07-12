import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import Navigation from './app/ui/components/navigation/Navigation';
import Toast from 'react-native-toast-message';
import { ConnectionProvider, ConnectionContext } from './app/utils/ConectionContext';
import NoConnectionScreen from './app/utils/NoConectionScreen';

const App = () => {
  return (
    <ConnectionProvider>
        <StatusBar barStyle="dark-content" />
        <ConnectionContext.Consumer>
          {isConnected => isConnected ? <Navigation /> : <NoConnectionScreen />}
        </ConnectionContext.Consumer>
        <Toast />
    </ConnectionProvider>
  );
};

export default App;

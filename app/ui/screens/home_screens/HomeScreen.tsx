import React from 'react';
import { View } from 'react-native';
import HomeScreenUI from './HomeScreenUI';

interface HomeScreenProps {
  userName: string;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ userName }) => {
  // Aquí podrías agregar lógica adicional, como llamadas a APIs, manejo de estado, etc.

  return (
    <View style={{ flex: 1 }}>
      <HomeScreenUI userName={userName} />
    </View>
  );
};

export default HomeScreen;
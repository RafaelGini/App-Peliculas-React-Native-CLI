import { ActivityIndicator, StyleSheet, View } from 'react-native';
import theme from '../ui/styles/theme';

const loadingScreen = () => {
  return (
    <View style={styles.fondo} >
      <ActivityIndicator animating={true} size={80} color={theme.colors.primary} />
    </View>
  )
}

const styles = StyleSheet.create({
  fondo: {
    backgroundColor: theme.colors.background,
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default loadingScreen;
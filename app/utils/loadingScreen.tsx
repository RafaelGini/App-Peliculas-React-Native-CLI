import { ActivityIndicator } from 'react-native';
import theme from '../ui/styles/theme';

const initialDataScreen = () => {
  return( <ActivityIndicator animating={true} size={80} color={theme.colors.primary} />)
}

export default initialDataScreen;
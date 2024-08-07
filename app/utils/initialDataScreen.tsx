import { View, Text, } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import theme from '../ui/styles/theme';
import errorStyles from './errorStyles';
import { useTranslation } from 'react-i18next';

const initialDataScreen = () => {
  return(
    <View style={errorStyles.containerError}>
      <Ionicons name={"file-tray-outline"} style={errorStyles.iconError} size={80} color={theme.colors.primary} />
      <Text style={errorStyles.errorText}>{"Search Your Favorites Movies!"}</Text>
    </View>
  )
}

export default initialDataScreen;
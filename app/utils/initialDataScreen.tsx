import { View, Text, } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import theme from '../ui/styles/theme';
import errorStyles from './errorStyles';
import { useTranslation } from 'react-i18next';

const initialDataScreen = (translate: Function) => {
  return(
    <View style={errorStyles.containerError}>
      <Ionicons name={"file-tray-outline"} style={errorStyles.iconError} size={80} color={theme.colors.primary} />
      <Text style={errorStyles.errorText}>{translate('INITIAL_DATA_SEARCH')}</Text>
    </View>
  )
}

export default initialDataScreen;
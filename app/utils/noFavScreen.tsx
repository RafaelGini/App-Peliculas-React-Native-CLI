import { View, Text, } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import theme from '../ui/styles/theme';
import errorStyles from './errorStyles';
import { useTranslation } from 'react-i18next';

const noDataScreen = () => {
  const {t} = useTranslation();
  return(
    <View style={errorStyles.containerError}>
      <Ionicons name={"heart-outline"} style={errorStyles.iconError} size={80} color={theme.colors.primary} />
      <Text style={errorStyles.errorText}>{t('NO_FAV_DATA')}</Text>
      <Text style={errorStyles.errorTextLight}>{t('NO_FAV_HELP')}</Text>
    </View>
  )
}

export default noDataScreen;
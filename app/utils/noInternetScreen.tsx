import { View, Text, } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import theme from '../ui/styles/theme';
import errorStyles from './errorStyles';
import { useTranslation } from 'react-i18next';

const noInternetScreen = () => {
  const {t} = useTranslation();
  return(
    <View style={errorStyles.containerError}>
      <Ionicons name={"cloud-offline"} style={errorStyles.iconError} size={100} color={theme.colors.red} />
      <Text style={errorStyles.errorText}>{t('NO_INTERNET')}</Text>
      <Text style={errorStyles.errorTextLight}>{t('RETRY_CONECTION')}</Text>
    </View>
  )
}

export default noInternetScreen;
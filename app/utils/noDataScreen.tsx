import { View, Text, } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import theme from '../ui/styles/theme';
import errorStyles from './errorStyles';

const noDataScreen = () => {
  return(
    <View style={errorStyles.containerError}>
      <Ionicons name={"search"} style={errorStyles.iconError} size={80} color={theme.colors.primary} />
      <Text style={errorStyles.errorText}>¡Lo siento, no pudimos encontrar la busqueda!</Text>
      <Text style={errorStyles.errorTextLight}>Busca por título o actor</Text>
    </View>
  )
}

export default noDataScreen;
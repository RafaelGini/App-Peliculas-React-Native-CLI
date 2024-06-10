import { View, Text, } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import theme from '../ui/styles/theme';
import errorStyles from './errorStyles';

const noInternetScreen = () => {
  return(
    <View style={errorStyles.containerError}>
      <Ionicons name={"cloud-offline"} style={errorStyles.iconError} size={80} color={theme.colors.red} />
      <Text style={errorStyles.errorText}>¡Sin conexion a internet!</Text>
      <Text style={errorStyles.errorTextLight}>Por favor, revise su conexión a internet y vuelva a intentarlo</Text>
    </View>
  )
}

export default noInternetScreen;
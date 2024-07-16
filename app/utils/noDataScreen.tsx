import { View, Text, } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import theme from '../ui/styles/theme';
import errorStyles from './errorStyles';

const noDataScreen = () => {
  return(
    <View style={errorStyles.containerError}>
      <Ionicons name={"search"} style={errorStyles.iconError} size={80} color={theme.colors.primary} />
      <Text style={errorStyles.errorText}>{"Sorry, We Couldn't Find Your Movie"}</Text>
      <Text style={errorStyles.errorTextLight}>{"Try Again Later Or With Other Name"}</Text>
    </View>
  )
}

export default noDataScreen;
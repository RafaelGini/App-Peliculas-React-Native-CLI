import { StyleSheet } from 'react-native';
import theme from '../ui/styles/theme';

const errorStyles = StyleSheet.create({
  containerError: {
    flex: 1,
    padding: 40,
    alignContent: 'center',
    alignSelf: 'center',
    backgroundColor: theme.colors.background,
  },
  iconError: {
    marginTop: 30,
    alignSelf: 'center',
  },
  errorText: {
    fontSize: 25,
    color: theme.colors.text,
    alignContent: 'center',
    textAlign: 'center',
  },
  errorTextLight: {
    fontSize: 15,
    color: theme.colors.text_light,
    alignContent: 'center',
    textAlign: 'center',
  },
});

export default errorStyles;
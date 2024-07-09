// NoDetailsScreen.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import theme from '../ui/styles/theme';
import { useTranslation } from 'react-i18next';

const NoDetailsScreen = () => {
  const { t } = useTranslation();

  return (
    <View style={styles.containerError}>
      <Ionicons name={"alert-circle-outline"} style={styles.iconError} size={80} color={theme.colors.primary} />
      <Text style={styles.errorText}>{t('NO_DETAILS_FOUND')}</Text>
      <Text style={styles.errorTextLight}>{t('NO_DETAILS_HELP')}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  containerError: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
  },
  iconError: {
    marginBottom: 16,
  },
  errorText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.text,
    textAlign: 'center',
    marginBottom: 8,
  },
  errorTextLight: {
    fontSize: 16,
    color: theme.colors.text_light,
    textAlign: 'center',
  },
});

export default NoDetailsScreen;

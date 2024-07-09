import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import theme from '../ui/styles/theme';
import { useTranslation } from 'react-i18next';

const TimeoutScreen = () => {
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      <Ionicons name="time-outline" style={styles.icon} size={80} color={theme.colors.primary} />
      <Text style={styles.text}>{t('TIMEOUT_MESSAGE')}</Text>
      <Text style={styles.subText}>{t('TIMEOUT_HELP')}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
  },
  icon: {
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    color: theme.colors.text,
    textAlign: 'center',
    marginBottom: 10,
  },
  subText: {
    fontSize: 16,
    color: theme.colors.text_light,
    textAlign: 'center',
  },
});

export default TimeoutScreen;

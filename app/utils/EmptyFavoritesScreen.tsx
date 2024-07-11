import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import theme from '../ui/styles/theme';
import { useTranslation } from 'react-i18next';

const EmptyFavoritesScreen = () => {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <Ionicons name={"heart-outline"} style={styles.icon} size={80} color={theme.colors.primary} />
      <Text style={styles.text}>{t('NO_FAVORITE_MOVIES')}</Text>
      <Text style={styles.textLight}>{t('ADD_FAVORITE_MOVIES_PROMPT')}</Text>
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
  },
  textLight: {
    fontSize: 14,
    color: theme.colors.text_light,
    textAlign: 'center',
    marginTop: 10,
  },
});

export default EmptyFavoritesScreen;

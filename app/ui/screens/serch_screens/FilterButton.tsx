// FilterButton.jsx
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import theme from '../../styles/theme';

interface FilterButtonProps {
  title: string;
  isActive: boolean;
  onPress: () => void;
}

const FilterButton: React.FC<FilterButtonProps> = ({ title, isActive, onPress }) => {
  return (
    <TouchableOpacity
      style={[styles.button, isActive && styles.activeButton]}
      onPress={onPress}
    >
      <Text style={[styles.text, isActive ? styles.activeText : styles.inactiveText]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 8,
    paddingHorizontal: 13,
    borderRadius: 10,
    backgroundColor: theme.colors.background,
  },
  activeButton: {
    backgroundColor: theme.colors.background_soft,
  },
  text: {
    fontSize: 16,
  },
  activeText: {
    color: theme.colors.primary,
  },
  inactiveText: {
    color: '#ffffff',
  },
});

export default FilterButton;

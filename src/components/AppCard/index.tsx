import { View, StyleSheet, Platform } from 'react-native';
import React from 'react';
import { radius, spacing } from '@/theme/spacing';
import { useTheme } from '@/context/ThemeContext';

interface AppCardProps {
  children?: React.ReactNode;
  style?: any;
}

export default function AppCard({ children, style }: AppCardProps) {
  const { themeColors, isDark } = useTheme();

  return (
    <View
      style={[
        styles.base,
        {
          backgroundColor: themeColors.background,
          borderColor: themeColors.border,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: radius.lg,
    borderWidth: 1,
    padding: spacing.md,
    ...Platform.select({
      ios: {
        shadowColor: '#000000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 1,
      },
    }),
  },
});
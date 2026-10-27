import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AppText from '@/components/AppText';
import { useTheme } from '@/context/ThemeContext';
import { spacing, radius } from '@/theme/spacing';

interface ThemeButtonProps {
  icon: React.ComponentProps<typeof Ionicons>['name'];
  label: string;
  isSelected: boolean;
  onPress: () => void;
}

export default function ThemeButton({ icon, label, isSelected, onPress }: ThemeButtonProps) {
  const { themeColors } = useTheme();

  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.button,
        {
          backgroundColor: isSelected ? themeColors.primarySubtle : themeColors.surface,
          borderColor: isSelected ? themeColors.primary : themeColors.border,
        },
      ]}
    >
      <Ionicons
        name={icon}
        size={22}
        color={isSelected ? themeColors.primary : themeColors.textSecondary}
      />
      <AppText
        style={{
          color: isSelected ? themeColors.primary : themeColors.textSecondary,
          fontSize: 14,
          marginTop: spacing.xs,
        }}
      >
        {label}
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md,
    borderRadius: radius.lg,
    borderWidth: 1,
    gap: spacing.xs,
  },
});

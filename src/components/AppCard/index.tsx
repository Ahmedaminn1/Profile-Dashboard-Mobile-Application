import { View, StyleSheet } from "react-native";
import React from "react";
import { radius, spacing } from "@/theme/spacing";
import { useTheme } from "@/context/ThemeContext";

interface AppCardProps {
  children?: React.ReactNode;
  style?: any;
}

/**
 * Surface card with 1px border and no artificial drop shadows (CLAUDE.md Rule 2).
 */
export default function AppCard({ children, style }: AppCardProps) {
  const { themeColors } = useTheme();

  return (
    <View
      style={[
        styles.base,
        {
          backgroundColor: themeColors.surface,
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
  },
});
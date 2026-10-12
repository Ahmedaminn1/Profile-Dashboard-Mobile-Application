import { View, StyleSheet } from 'react-native';
import React from 'react';
import AppCard from '../AppCard';
import { spacing } from '@/theme/spacing';
import AppText from '../AppText';
import { Ionicons } from '@expo/vector-icons';
import { fontFamily, fontSize } from '@/theme/typography';
import { useTheme } from '@/context/ThemeContext';

interface StatCardProps {
  title: string;
  value: string;
  icon: any;
  style?: any;
  color?: string;
}

export default function StatCard({
  title,
  value,
  icon,
  style,
  color,
}: StatCardProps) {
  const { themeColors } = useTheme();
  const iconColor = color ?? themeColors.primary;

  return (
    <AppCard style={[styles.base, style]}>
      <View
        style={[
          styles.iconBox,
          { backgroundColor: themeColors.primarySubtle },
        ]}
      >
        <Ionicons name={icon} size={30} color={iconColor} />
      </View>
      <AppText
        variant="body"
        style={[styles.label, { color: themeColors.textSecondary }]}
      >
        {title}
      </AppText>
      <AppText
        variant="title"
        style={[styles.value, { color: themeColors.primary }]}
      >
        {value}
      </AppText>
    </AppCard>
  );
}

const styles = StyleSheet.create({
  base: {
    flex: 1,
    minHeight: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBox: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    width: 64,
    height: 64,
    marginBottom: spacing.md,
  },
  label: {
    marginBottom: spacing.xs,
  },
  value: {
    fontFamily: fontFamily.sansBold,
    fontSize: fontSize.title * 1.2,
  },
});
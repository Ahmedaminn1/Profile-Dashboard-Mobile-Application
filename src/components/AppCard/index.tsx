import { View, Text, StyleSheet, Platform } from 'react-native'
import React from 'react'
import { radius, spacing } from '@/theme/spacing';
import { colors } from '@/theme/colors';

interface AppCardProps {
    children?: React.ReactNode;
    style?: any;
}

export default function AppCard({children, style}: AppCardProps) {
  return (
    <View style={[styles.base, style]}>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
    base: {
        borderRadius: radius.lg,
        backgroundColor: colors.light.background,
        borderColor: colors.light.border,
        borderWidth: 1,
        padding: spacing.md,
        ...Platform.select({
            ios: {
                shadowColor: colors.dark.text,
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
            },
            android: {
                elevation: 1,
            },
        }),
    },
})
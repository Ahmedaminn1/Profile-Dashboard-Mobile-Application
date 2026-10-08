import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import AppCard from '../AppCard';
import { colors } from '@/theme/colors';
import { radius, spacing } from '@/theme/spacing';
import AppText from '../AppText';
import { Ionicons } from '@expo/vector-icons';
import { fontFamily, fontSize } from '@/theme/typography';
interface StatCardProps {
    title: string;
    value: string;
    icon: any;
    style?: any;
    color?:string;
}

export default function StatCard({title, value, icon, style , color = colors.light.primary}: StatCardProps) {
  return (
    <AppCard style={[styles.base, style]}>
        <View style={styles.iconBox}>
            <Ionicons name={icon} size={30} color={color} />
        </View>
        <AppText variant='body' style={styles.label}>{title}</AppText>
        <AppText variant='title' style={styles.value}>{value}</AppText>
    </AppCard>
  )
}
const styles = StyleSheet.create({
    base: {
        flex:1,
        minHeight:200,
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconBox: {
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor: colors.light.primarySubtle,
        borderRadius: 20,
        width:64,
        height:64,
        marginBottom : spacing.md
    },
    label:{
        color: colors.light.textSecondary,
        marginBottom:spacing.xs,
    },
    value:{
        color: colors.light.primary, 
        fontFamily: fontFamily.sansBold,
        fontSize: fontSize.title * 1.2
    }
})
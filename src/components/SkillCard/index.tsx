import { View, Text, StyleSheet } from "react-native";
import React from "react";
import AppCard from "../AppCard";
import AppText from "../AppText";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";
import { Image } from "expo-image";
import { fontFamily } from "@/theme/typography";
import { fontSize } from "@/theme/typography";

export interface SkillItem {
  id: number;
  title: string;
  level: string;
  badge: string;
  icon: React.ComponentProps<typeof Ionicons>["name"];
}

export default function SkillsCard({ item }: { item: SkillItem }) {
  return (
    <AppCard style={styles.card}>
      <View style={styles.skillRow}>
        <View style={styles.iconBox}>
          <Ionicons name={item.icon} size={28} color={colors.light.primary} />
        </View>
        <View>
          <AppText variant="subTitle" style={styles.title}>
            {item.title}
          </AppText>
          <AppText variant="body" style={styles.level}>
            {item.level}
          </AppText>
        </View>
      </View>

      <View style={styles.badge}>
        <AppText style={styles.badgeText} variant="body">
          {item.badge}
        </AppText>
      </View>
    </AppCard>
  );
}

const styles = StyleSheet.create({
  card: {
    paddingVertical: spacing.md,
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: spacing.md,
    gap: spacing.md,
    minHeight: 104,
  },
  skillRow: {
    flexDirection: "row-reverse",
    alignItems: "center",
    gap: spacing.md,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: colors.light.primarySubtle,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: colors.light.text,
    fontFamily: fontFamily.sansExtraBold,
    fontSize: fontSize.subTitle,
    marginBottom: spacing.sm,
  },
  level: {
    color: colors.light.textLight,
    fontFamily: fontFamily.sansBold,
  },
  badge: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 10,
    backgroundColor: colors.light.primarySubtle,
  },
  badgeText: {
    color: colors.light.primary,
    fontFamily: fontFamily.sansBold,
    fontSize: fontSize.sm,
  },
});

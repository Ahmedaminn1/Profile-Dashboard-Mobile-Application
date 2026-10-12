import { View, StyleSheet } from "react-native";
import React from "react";
import AppCard from "../AppCard";
import AppText from "../AppText";
import { Ionicons } from "@expo/vector-icons";
import { spacing } from "@/theme/spacing";
import { fontFamily, fontSize } from "@/theme/typography";
import { useTheme } from "@/context/ThemeContext";

export interface SkillItem {
  id: number;
  title: string;
  level: string;
  badge: string;
  icon: React.ComponentProps<typeof Ionicons>["name"];
}

export default function SkillsCard({ item }: { item: SkillItem }) {
  const { themeColors } = useTheme();

  return (
    <AppCard style={styles.card}>
      <View style={styles.skillRow}>
        <View
          style={[
            styles.iconBox,
            { backgroundColor: themeColors.primarySubtle },
          ]}
        >
          <Ionicons name={item.icon} size={28} color={themeColors.primary} />
        </View>
        <View>
          <AppText
            variant="subTitle"
            style={[styles.title, { color: themeColors.text }]}
          >
            {item.title}
          </AppText>
          <AppText
            variant="body"
            style={[styles.level, { color: themeColors.textLight }]}
          >
            {item.level}
          </AppText>
        </View>
      </View>

      <View
        style={[
          styles.badge,
          { backgroundColor: themeColors.primarySubtle },
        ]}
      >
        <AppText
          style={[styles.badgeText, { color: themeColors.primary }]}
          variant="body"
        >
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
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontFamily: fontFamily.sansExtraBold,
    fontSize: fontSize.subTitle,
    marginBottom: spacing.sm,
  },
  level: {
    fontFamily: fontFamily.sansBold,
  },
  badge: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 10,
  },
  badgeText: {
    fontFamily: fontFamily.sansBold,
    fontSize: fontSize.sm,
  },
});

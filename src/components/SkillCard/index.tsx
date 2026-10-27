import { View, StyleSheet } from "react-native";
import React from "react";
import AppCard from "../AppCard";
import AppText from "../AppText";
import { Ionicons } from "@expo/vector-icons";
import { spacing } from "@/theme/spacing";
import { fontFamily, fontSize } from "@/theme/typography";
import { useTheme } from "@/context/ThemeContext";
import { useTranslation } from "react-i18next";

export interface SkillItem {
  id: number;
  title: string;
  level: string;
  badge: string;
  icon: React.ComponentProps<typeof Ionicons>["name"];
}

export default function SkillsCard({ item }: { item: SkillItem }) {
  const { themeColors } = useTheme();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  const getLocalizedLevel = (lvl: string) => {
    switch (lvl) {
      case "مبتدئ":
      case "Beginner":
        return t("skills.levels.beginner");
      case "متوسط":
      case "Intermediate":
        return t("skills.levels.intermediate");
      case "متقدم":
      case "Advanced":
        return t("skills.levels.advanced");
      default:
        return lvl;
    }
  };

  const getLocalizedBadge = (bdg: string) => {
    switch (bdg) {
      case "جيد":
      case "Good":
        return t("skills.badges.good");
      case "جيد جداً":
      case "Very Good":
        return t("skills.badges.veryGood");
      case "محترف":
      case "Professional":
        return t("skills.badges.professional");
      case "خبير":
      case "Expert":
        return t("skills.badges.expert");
      default:
        return bdg;
    }
  };

  return (
    <AppCard style={[styles.card, { flexDirection: isRTL ? "row-reverse" : "row" }]}>
      <View style={[styles.skillRow, { flexDirection: isRTL ? "row-reverse" : "row" },]}>
        <View style={[styles.iconBox, { backgroundColor: themeColors.primarySubtle },]}>
          <Ionicons name={item.icon} size={28} color={themeColors.primary} />
        </View>
        <View style={{ alignItems: isRTL ? "flex-end" : "flex-start" }}>
          <AppText variant="subTitle" style={[styles.title, { color: themeColors.text }]}>
            {item.title}
          </AppText>
          <AppText variant="body" style={[styles.level, { color: themeColors.textLight }]}>
            {getLocalizedLevel(item.level)}
          </AppText>
        </View>
      </View>

      <View style={[styles.badge, { backgroundColor: themeColors.primarySubtle }]}>
        <AppText style={[styles.badgeText, { color: themeColors.primary }]} variant="body">
          {getLocalizedBadge(item.badge)}
        </AppText>
      </View>
    </AppCard>
  );
}

const styles = StyleSheet.create({
  card: {
    paddingVertical: spacing.md,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: spacing.md,
    gap: spacing.md,
    minHeight: 104,
  },
  skillRow: {
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

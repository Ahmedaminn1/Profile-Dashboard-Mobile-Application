import React from "react";
import { View, Pressable, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import AppText from "@/components/AppText";
import { useTheme } from "@/context/ThemeContext";
import { spacing } from "@/theme/spacing";

interface SettingScreenHeaderProps {
  title: string;
  icon: React.ComponentProps<typeof Ionicons>["name"];
}

export default function SettingScreenHeader({
  title,
  icon,
}: SettingScreenHeaderProps) {
  const router = useRouter();
  const { themeColors } = useTheme();

  return (
    <View style={styles.header}>
      <Pressable onPress={() => router.back()} style={styles.backBtn}>
        <Ionicons name="chevron-forward-outline" size={28} color={themeColors.text} />
      </Pressable>

      <AppText variant="title" style={styles.title}>
        {title}
      </AppText>

      <View style={[styles.iconBox, { backgroundColor: themeColors.primarySubtle }]}>
        <Ionicons name={icon} size={24} color={themeColors.primary} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    marginBottom: spacing.lg,
  },
  backBtn: {
    padding: spacing.xs,
  },
  title: {
    flex: 1,
    textAlign: "center",
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
});

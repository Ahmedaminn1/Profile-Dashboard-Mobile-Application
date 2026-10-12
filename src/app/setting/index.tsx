import React from "react";
import { View, Pressable, ScrollView, StyleSheet } from "react-native";
import AppSafeAreaView from "@/components/AppSafeAreaView";
import { spacing } from "@/theme/spacing";
import AppText from "@/components/AppText";
import AppCard from "@/components/AppCard";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRouter } from "expo-router";
import { fontSize, fontFamily } from "@/theme/typography";
import AppButton from "@/components/AppButton";
import ThemeButton from "@/components/ThemeButton";
import { useTheme } from "@/context/ThemeContext";

const otherSettings: {
  label: string;
  icon: React.ComponentProps<typeof Ionicons>["name"];
  href: string;
}[] = [
  {
    label: "الحساب",
    icon: "person-outline",
    href: "/setting/account",
  },
  {
    label: "الاشعارات",
    icon: "notifications-outline",
    href: "/setting/notifications",
  },
  {
    label: "الخصوصية",
    icon: "lock-closed-outline",
    href: "/setting/privacy",
  },
  {
    label: "المساعدة",
    icon: "help-circle-outline",
    href: "/setting/help",
  },
];

export default function SettingScreen() {
  const navigation = useNavigation();
  const router = useRouter();
  const { theme, themeColors, toggleTheme } = useTheme();

  const openDrawer = () => {
    (navigation as any).openDrawer();
  };

  return (
    <AppSafeAreaView>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <View style={{ width: 32 }} />
          <AppText variant="title" style={styles.headerTitle}>
            الإعدادات
          </AppText>
          <Pressable onPress={openDrawer}>
            <Ionicons
              name="chevron-back-outline"
              size={32}
              color={themeColors.text}
            />
          </Pressable>
        </View>

        {/* Theme Settings Card */}
        <AppCard style={styles.themeCard}>
          <View style={styles.themeHeader}>
            <Ionicons
              name="color-palette-outline"
              size={24}
              color={themeColors.primary}
            />
            <AppText variant="subTitle">مظهر التطبيق</AppText>
          </View>

          <View style={styles.themeButtonsRow}>
            <ThemeButton
              icon="sunny-outline"
              label="فاتح"
              isSelected={theme === "light"}
              onPress={() => toggleTheme("light")}
            />
            <ThemeButton
              icon="moon-outline"
              label="داكن"
              isSelected={theme === "dark"}
              onPress={() => toggleTheme("dark")}
            />
            <ThemeButton
              icon="phone-portrait-outline"
              label="تلقائي"
              isSelected={theme === "system"}
              onPress={() => toggleTheme("system")}
            />
          </View>
        </AppCard>

        {/* other settings cards */}
        <View style={styles.settingsList}>
          {otherSettings.map((setting) => (
            <AppCard key={setting.label} style={styles.settingCard}>
              <View style={styles.settingRow}>
                {/* Icon box — right side (RTL) */}
                <View
                  style={[
                    styles.iconBox,
                    { backgroundColor: themeColors.primarySubtle },
                  ]}
                >
                  <Ionicons
                    name={setting.icon}
                    size={22}
                    color={themeColors.primary}
                  />
                </View>

                {/* Label — center */}
                <AppText variant="subTitle" style={styles.settingLabel}>
                  {setting.label}
                </AppText>

                {/* Chevron — left side (RTL) */}
                <Pressable onPress={() => router.push(setting.href as any)}>
                  <Ionicons
                    name="chevron-back-outline"
                    size={30}
                    color={themeColors.textSecondary}
                  />
                </Pressable>
              </View>
            </AppCard>
          ))}
        </View>

        {/* logout Button */}
        <AppButton
          title="تسجيل الخروج"
          variant="danger"
          style={{ marginTop: spacing.lg }}
          onPress={() => {}}
          icon="log-out-outline"
        />
      </ScrollView>
    </AppSafeAreaView>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: spacing.md,
    paddingBottom: spacing.xl,
    gap: spacing.md,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing.lg,
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
  },
  themeCard: {
    padding: spacing.md,
    gap: spacing.md,
  },
  themeHeader: {
    flexDirection: "row-reverse",
    alignItems: "center",
    gap: spacing.sm,
  },
  themeButtonsRow: {
    flexDirection: "row-reverse",
    gap: spacing.sm,
  },
  settingsList: {
    gap: spacing.sm,
  },
  settingCard: {
    paddingHorizontal: 0,
    paddingVertical: spacing.md,
  },
  settingRow: {
    flexDirection: "row-reverse",
    alignItems: "center",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    gap: spacing.md,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  settingLabel: {
    flex: 1,
    textAlign: "right",
  },
});

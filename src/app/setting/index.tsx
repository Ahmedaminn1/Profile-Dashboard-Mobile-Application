import React from "react";
import { View, Pressable } from "react-native";
import AppSafeAreaView from "@/components/AppSafeAreaView";
import { ScrollView } from "react-native";
import { StyleSheet } from "react-native";
import { spacing } from "@/theme/spacing";
import AppText from "@/components/AppText";
import AppCard from "@/components/AppCard";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRouter } from "expo-router";
import { fontSize, fontFamily } from "@/theme/typography";
import { colors } from "@/theme/colors";
import AppButton from "@/components/AppButton";
import index from "..";

const settings: {
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
    href: "/setting/language",
  },
  {
    label: "المظهر",
    icon: "sunny-outline",
    href: "/setting/notification",
  },
  {
    label: "الخصوصية",
    icon: "lock-closed-outline",
    href: "/setting/support",
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
            <Ionicons name="chevron-back-outline" size={32} />
          </Pressable>
        </View>

        {/* cards container */}
        <View style={styles.settingsList}>
          {settings.map((setting) => (
            <AppCard key={setting.label} style={styles.settingCard}>
              <View style={styles.settingRow}>
                {/* Icon box — right side (RTL) */}
                <View style={styles.iconBox}>
                  <Ionicons
                    name={setting.icon}
                    size={22}
                    color={colors.light.primary}
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
                    color={colors.light.text}
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
          onPress={() => {}} icon="log-out-outline" />
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
  settingsCard: {
    marginBottom: spacing.md,
  },
  settingTitle: {
    fontFamily: fontFamily.sansExtraBold,
    fontSize: fontSize.subTitle,
    marginBottom: spacing.md,
  },
  settingsCards: {
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  /* List wrapper with gap between cards */
  settingsList: {
    gap: spacing.sm,
  },
  /* Individual card per row */
  settingCard: {
    paddingHorizontal: 0,
    paddingVertical: spacing.md,
  },
  /* Row layout inside each card */
  settingRow: {
    flexDirection: "row-reverse",
    alignItems: "center",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    gap: spacing.md,
  },
  /* Tinted icon container */
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: colors.light.primarySubtle,
    alignItems: "center",
    justifyContent: "center",
  },
  /* Label grows to fill space */
  settingLabel: {
    flex: 1,
    textAlign: "right",
    color: colors.light.text,
  },
});

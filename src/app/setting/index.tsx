import React from "react";
import { View, Pressable, ScrollView, StyleSheet } from "react-native";
import AppSafeAreaView from "@/components/AppSafeAreaView";
import { spacing } from "@/theme/spacing";
import AppText from "@/components/AppText";
import AppCard from "@/components/AppCard";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRouter } from "expo-router";
import AppButton from "@/components/AppButton";
import ThemeButton from "@/components/ThemeButton";
import { useTheme } from "@/context/ThemeContext";
import { useTranslation } from "react-i18next";
import { changeLanguage } from "@/i18n/i18n";
import { useAuth } from "@/context/AuthContext";

export default function SettingScreen() {
  const navigation = useNavigation();
  const router = useRouter();
  const { theme, themeColors, toggleTheme } = useTheme();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const language = i18n.language;
  const { logout } = useAuth();

  const openDrawer = () => {
    (navigation as any).openDrawer();
  };

  const otherSettings: {
    key: string;
    label: string;
    icon: React.ComponentProps<typeof Ionicons>["name"];
    href: string;
  }[] = [
    {
      key: "account",
      label: t("settings.menu.account"),
      icon: "person-outline",
      href: "/setting/account",
    },
    {
      key: "notifications",
      label: t("settings.menu.notifications"),
      icon: "notifications-outline",
      href: "/setting/notifications",
    },
    {
      key: "privacy",
      label: t("settings.menu.privacy"),
      icon: "lock-closed-outline",
      href: "/setting/privacy",
    },
    {
      key: "help",
      label: t("settings.menu.help"),
      icon: "help-circle-outline",
      href: "/setting/help",
    },
  ];

  return (
    <AppSafeAreaView>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Header */}
        <View
          style={[
            styles.header,
            { flexDirection: isRTL ? "row" : "row-reverse" },
          ]}
        >
          <View style={{ width: 32 }} />
          <AppText variant="title" style={styles.headerTitle}>
            {t("settings.title")}
          </AppText>
          <Pressable onPress={openDrawer}>
            <Ionicons
              name={isRTL ? "chevron-back-outline" : "menu-outline"}
              size={32}
              color={themeColors.text}
            />
          </Pressable>
        </View>

        {/* Language Settings Card */}
        <AppCard style={styles.card}>
          <View
            style={[
              styles.cardHeader,
              { flexDirection: isRTL ? "row-reverse" : "row" },
            ]}
          >
            <Ionicons
              name="language-outline"
              size={24}
              color={themeColors.primary}
            />
            <AppText variant="subTitle">
              {t("settings.language.title")}
            </AppText>
          </View>

          <View
            style={[
              styles.buttonsRow,
              { flexDirection: isRTL ? "row-reverse" : "row" },
            ]}
          >
            <ThemeButton
              icon="globe-outline"
              label={t("settings.language.arabicLabel")}
              isSelected={language === "ar"}
              onPress={() => changeLanguage("ar")}
            />
            <ThemeButton
              icon="globe-outline"
              label={t("settings.language.englishLabel")}
              isSelected={language === "en"}
              onPress={() => changeLanguage("en")}
            />
          </View>
        </AppCard>

        {/* Theme Settings Card */}
        <AppCard style={styles.card}>
          <View
            style={[
              styles.cardHeader,
              { flexDirection: isRTL ? "row-reverse" : "row" },
            ]}
          >
            <Ionicons
              name="color-palette-outline"
              size={24}
              color={themeColors.primary}
            />
            <AppText variant="subTitle">{t("settings.theme.title")}</AppText>
          </View>

          <View
            style={[
              styles.buttonsRow,
              { flexDirection: isRTL ? "row-reverse" : "row" },
            ]}
          >
            <ThemeButton
              icon="sunny-outline"
              label={t("settings.theme.light")}
              isSelected={theme === "light"}
              onPress={() => toggleTheme("light")}
            />
            <ThemeButton
              icon="moon-outline"
              label={t("settings.theme.dark")}
              isSelected={theme === "dark"}
              onPress={() => toggleTheme("dark")}
            />
            <ThemeButton
              icon="phone-portrait-outline"
              label={t("settings.theme.system")}
              isSelected={theme === "system"}
              onPress={() => toggleTheme("system")}
            />
          </View>
        </AppCard>

        {/* other settings cards */}
        <View style={styles.settingsList}>
          {otherSettings.map((setting) => (
            <AppCard key={setting.key} style={styles.settingCard}>
              <View
                style={[
                  styles.settingRow,
                  { flexDirection: isRTL ? "row-reverse" : "row" },
                ]}
              >
                {/* Icon box */}
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

                {/* Label */}
                <AppText
                  variant="subTitle"
                  style={[
                    styles.settingLabel,
                    { textAlign: isRTL ? "right" : "left" },
                  ]}
                >
                  {setting.label}
                </AppText>

                {/* Chevron */}
                <Pressable onPress={() => router.push(setting.href as any)}>
                  <Ionicons
                    name={isRTL ? "chevron-back-outline" : "chevron-forward-outline"}
                    size={28}
                    color={themeColors.textSecondary}
                  />
                </Pressable>
              </View>
            </AppCard>
          ))}
        </View>

        {/* logout Button */}
        <AppButton
          title={t("settings.logout")}
          variant="danger"
          style={{ marginTop: spacing.lg }}
          onPress={() => logout()}
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
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing.lg,
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
  },
  card: {
    padding: spacing.md,
    gap: spacing.md,
  },
  cardHeader: {
    alignItems: "center",
    gap: spacing.sm,
  },
  buttonsRow: {
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
    alignItems: "center",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    gap: spacing.md,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 8,               // radius.md
    alignItems: "center",
    justifyContent: "center",
  },
  settingLabel: {
    flex: 1,
  },
});

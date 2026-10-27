import { View, StyleSheet, Linking } from "react-native";
import { DrawerContentScrollView, DrawerItemList } from "expo-router/drawer";
import { spacing } from "@/theme/spacing";
import Avatar from "../Avatar";
import AppText from "../AppText";
import AppButton from "../AppButton";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/context/ThemeContext";
import { useAuth } from "@/context/AuthContext";
import { useTranslation } from "react-i18next";

export const CustomDrawerContent = (props: any) => {
  const { themeColors } = useTheme();
  const { logout, authSession } = useAuth();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const AvatarURL =
    "https://6ac3a452ae1f22aea6d19b75.imgix.net/sandbox/ahmed%20amin%20pic.jpeg?auto=compress";

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={[styles.container, { backgroundColor: themeColors.background },]}>
      <View style={[styles.profile, { alignItems: isRTL ? "flex-end" : "flex-start" },]}>
        <Avatar size={124} userName={authSession?.user?.name || "Ahmed Amin"} uri={authSession?.user?.avatar || AvatarURL} />
        <AppText variant="title">{authSession?.user?.name || "أحمد أمين"}</AppText>
        <AppText variant="body">{authSession?.user?.email || t("drawer.role")}</AppText>
      </View>

      {/* Drawer Items with Icons */}
      <DrawerItemList {...props} />

      {/* Footer */}
      <View style={[styles.footer, { borderTopColor: themeColors.border },]}>
        <AppButton title={t("drawer.logout")} variant="danger" onPress={() => logout()} icon="log-out-outline" />
        <AppText variant="caption" style={{ color: themeColors.textSecondary, textAlign: "center", marginTop: spacing.xl, marginBottom: spacing.xl, }}>
          {t("drawer.rights")}
        </AppText>
        <View style={{ flexDirection: "row", justifyContent: "center", gap: spacing.xl, }}>
          <Ionicons name="logo-github" size={24} color={themeColors.textSecondary} onPress={() => Linking.openURL("https://github.com/Ahmedaminn1")} />
          <Ionicons name="logo-linkedin" size={24} color={themeColors.textSecondary} onPress={() => Linking.openURL("https://www.linkedin.com/in/ahmed-aminn/")} />
          <Ionicons name="logo-instagram" size={24} color={themeColors.textSecondary} onPress={() => Linking.openURL("https://www.instagram.com/")} />
        </View>
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profile: {
    gap: spacing.sm,
    marginBottom: spacing.xl,
    marginTop: spacing.lg,
    paddingHorizontal: spacing.md,
  },
  footer: {
    borderTopWidth: 1,
    paddingTop: spacing.lg,
    marginTop: "auto",
    paddingHorizontal: spacing.md,
  },
});

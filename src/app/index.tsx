import {
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import AppText from "@/components/AppText";
import AppButton from "@/components/AppButton";
import StatCard from "@/components/StatCard";
import Avatar from "@/components/Avatar";
import { spacing } from "@/theme/spacing";
import { fontFamily, fontSize } from "@/theme/typography";
import { Ionicons } from "@expo/vector-icons";
import { router, useNavigation } from "expo-router";
import AppCard from "@/components/AppCard";
import AppSafeAreaView from "@/components/AppSafeAreaView";
import { useTheme } from "@/context/ThemeContext";
import { useSkills } from "@/context/SkillsContext";
import { useAuth } from "@/context/AuthContext";
import { useTranslation } from "react-i18next";
import { toggleLanguage } from "@/i18n/i18n";

export default function Index() {
  const navigation = useNavigation();
  const { isDark, themeColors, toggleLightDark } = useTheme();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const language = i18n.language;
  const { skills } = useSkills();

  const openDrawer = () => {
    (navigation as any).openDrawer();
  };

  const AvatarURL = "https://6ac3a452ae1f22aea6d19b75.imgix.net/sandbox/ahmed%20amin%20pic.jpeg?auto=compress";

  const { authSession } = useAuth();

  return (
    <AppSafeAreaView>
      {/* Top Bar */}
      <View style={[styles.topBar,{ flexDirection: isRTL ? "row-reverse" : "row" }]}>
        <Pressable onPress={openDrawer}>
          <Ionicons name="menu-outline" size={32} color={themeColors.text} />
        </Pressable>

        <View style={styles.topBarActions}>
          {/* Quick Language Toggle */}
          <Pressable onPress={toggleLanguage} style={styles.langButton}>
            <Ionicons name="globe-outline" size={24} color={themeColors.text} />
            <AppText style={[styles.langText,{ color: themeColors.primary, fontFamily: fontFamily.sansBold },]}>
              {language === "ar" ? "EN" : "عربي"}
            </AppText>
          </Pressable>

          {/* Quick Light/Dark Toggle */}
          <Pressable onPress={toggleLightDark} style={styles.iconButton}>
            <Ionicons name={isDark ? "sunny-outline" : "moon-outline"} size={26} color={themeColors.text}/>
          </Pressable>

          {/* Notifications */}
          <Pressable onPress={() => router.push("/setting/notifications")} style={styles.notificationWrapper}>
            <Ionicons name="notifications-outline" size={30} color={themeColors.text}/>
            <View style={[styles.dot, { backgroundColor: themeColors.danger }]}/>
          </Pressable>
        </View>
      </View>

      <ScrollView style={styles.content}>
        {/* Profile Section */}
        <View style={[styles.profileSection, { flexDirection: isRTL ? "row-reverse" : "row" }]}>
          <Avatar size={124} userName={authSession?.user?.name ?? ""}uri={authSession?.user?.avatar || AvatarURL}/>

          <View style={[styles.userInfo,{ alignItems: isRTL ? "flex-end" : "flex-start" }]}>
            <AppText variant="title">{authSession?.user?.name || (language === "ar" ? "أحمد أمين" : "Ahmed Amin")}</AppText>
            <AppText style={[styles.job, { color: themeColors.textSecondary }]}
              variant="subTitle">{authSession?.user?.email || t("drawer.role")}</AppText>
            <AppButton style={{ paddingHorizontal: spacing.lg }} title={t("home.viewSkills")} onPress={() => router.push("/skills")} icon="create-outline"/>
          </View>
        </View>

        {/* Stats Section */}
        <View style={[styles.stateSection, { flexDirection: isRTL ? "row-reverse" : "row" }]}>
          <StatCard title={t("home.projects")} value="20+" icon="folder-outline"/>
          <StatCard title={t("home.skills")} value={`${skills.length}`} icon="code-slash-outline"/>
          <StatCard title={t("home.tasks")} value="35" icon="checkbox-outline"/>
        </View>

        {/* About Card */}
        <AppCard style={[styles.aboutCard, { flexDirection: isRTL ? "row-reverse" : "row" }]}>
          <View style={[styles.aboutCardIcon, { backgroundColor: themeColors.primarySubtle },]} >
            <Ionicons name="information-circle-outline" size={45} color={themeColors.primary}/>
          </View>
          <View style={[styles.aboutCardContent, { alignItems: isRTL ? "flex-end" : "flex-start" },]}>
            <AppText variant="title">{t("home.aboutMe")}</AppText>
            <AppText style={[styles.description, { color: themeColors.text, textAlign: isRTL ? "right" : "left" },]} variant="body">
              {t("home.aboutText")}
            </AppText>
          </View>
        </AppCard>

        {/* Quick Actions Footer */}
        <AppCard style={styles.actionsCard}>
          <AppText variant="subTitle" style={[styles.actionsTitle,{ textAlign: isRTL ? "right" : "left" },]}>
            {language === "ar" ? "إجراءات سريعة" : "Quick Actions"}
          </AppText>

          <View style={[styles.actionsList,{ flexDirection: isRTL ? "row-reverse" : "row" },]}>
            <View style={styles.actionItem}>
              <AppButton title={t("navigation.skills")} onPress={() => router.push("/skills")} icon="code-slash-outline"/>
            </View>
            <View style={styles.actionItem}>
              <AppButton variant="outlined" title={t("navigation.settings")} onPress={() => router.push("/setting")} icon="settings-outline"/>
            </View>
          </View>
        </AppCard>
      </ScrollView>
    </AppSafeAreaView>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: spacing.md,
    gap: spacing.md,
  },
  topBar: {
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: spacing.sm,
  },
  topBarActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  langButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: spacing.xs,
    paddingVertical: 4,
  },
  langText: {
    fontSize: 14,
  },
  iconButton: {
    padding: spacing.xs,
    justifyContent: "center",
    alignItems: "center",
  },
  notificationWrapper: {
    padding: spacing.xs,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 50,
    position: "absolute",
    top: 3,
    right: 3,
  },
  profileSection: {
    alignItems: "center",
    gap: spacing.xl,
    justifyContent: "center",
    marginBottom: spacing.xl,
  },
  userInfo: {
    flex: 1,
  },
  job: {
    fontSize: 18,
    marginBottom: spacing.md,
    fontFamily: fontFamily.sansBold,
  },
  stateSection: {
    gap: spacing.md,
    justifyContent: "center",
    marginBottom: spacing.xl,
  },
  aboutCard: {
    padding: spacing.md,
    width: "100%",
    minHeight: 180,
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.md,
  },
  aboutCardIcon: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 32,
    width: 82,
    height: 82,
  },
  aboutCardContent: {
    flex: 1,
    justifyContent: "center",
  },
  description: {
    fontFamily: fontFamily.sans,
    fontSize: fontSize.md,
    marginTop: spacing.xs,
  },
  actionsCard: {
    marginTop: spacing.md,
    marginBottom: spacing.xl,
  },
  actionsTitle: {
    fontFamily: fontFamily.sansBold,
    fontSize: fontSize.lg,
    marginBottom: spacing.md,
  },
  actionsList: {
    gap: spacing.md,
  },
  actionItem: {
    flex: 1,
  },
});

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

export default function Index() {
  const navigation = useNavigation();
  const { isDark, themeColors, toggleLightDark } = useTheme();
  const { skills } = useSkills();

  const openDrawer = () => {
    (navigation as any).openDrawer();
  };

  const AvatarURL = "https://6ac3a452ae1f22aea6d19b75.imgix.net/sandbox/ahmed%20amin%20pic.jpeg?auto=compress";
  const { authSession} = useAuth();


  const res = async () => await fetch("http://localhost:3000/api/userSkills" , {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${authSession?.token}`,
    },
  });
  // console.log(res());

  
  return (
    <AppSafeAreaView>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <Pressable onPress={openDrawer}>
          <Ionicons name="menu-outline" size={32} color={themeColors.text} />
        </Pressable>

        <View style={styles.topBarActions}>
          {/* Quick Light/Dark Toggle */}
          <Pressable onPress={toggleLightDark} style={styles.iconButton}>
            <Ionicons name={isDark ? "sunny-outline" : "moon-outline"} size={26} color={themeColors.text}/>
          </Pressable>

          {/* Notifications */}
          <Pressable
            onPress={() => router.push("/setting/notifications")}
            style={styles.notificationWrapper}>
            <Ionicons name="notifications-outline" size={30} color={themeColors.text}/>
            <View style={[styles.dot, { backgroundColor: themeColors.danger }]}/>
          </Pressable>
        </View>
      </View>

      <ScrollView style={styles.content}>
        {/* Profile Section */}
        <View style={styles.profileSection}>
          <Avatar size={124} userName={authSession?.user?.name ?? ""} uri={authSession?.user?.avatar || AvatarURL} />

          <View style={styles.userInfo}>
            <AppText variant="title">{authSession?.user?.name}</AppText>
            <AppText style={[styles.job, { color: themeColors.textSecondary }]} variant="subTitle">
              {authSession?.user?.email}
            </AppText>
            <AppButton style={{ paddingHorizontal: spacing.lg }} title="عرض المهارات" onPress={() => router.push("/skills")}
              icon="create-outline"/>
          </View>
        </View>

        {/* Stats Section */}
        <View style={styles.stateSection}>
          <StatCard title="المشاريع" value="20+" icon="folder-outline" />
          <StatCard title="المهارات" value={`${skills.length}`} icon="code-slash-outline" />
          <StatCard title="المهام " value="35" icon="checkbox-outline" />
        </View>

        {/* About Card */}
        <AppCard style={styles.aboutCard}>
          <View style={[styles.aboutCardIcon,{ backgroundColor: themeColors.primarySubtle },]}>
            <Ionicons name="information-circle-outline" size={45} color={themeColors.primary}/>
          </View>
          <View style={styles.aboutCardContent}>
            <AppText variant="title">نبذة عني</AppText>
            <AppText style={[styles.description, { color: themeColors.text }]} variant="body">
              أحمد أمين مهندس برمجيات حاصل على بكالوريوس في علوم الحاسب. لدي
              خبرة في تطوير الويب وتطبيقات الهاتف المحمول.
            </AppText>
          </View>
        </AppCard>

        {/* Quick Actions Footer */}
        <AppCard style={styles.actionsCard}>
          <AppText variant="subTitle" style={styles.actionsTitle}>اجراءات سريعة</AppText>

          <View style={styles.actionsList}>
            <View style={styles.actionItem}>
              <AppButton title="المهارات" onPress={() => router.push("/skills")} icon="code-slash-outline"/>
            </View>
            <View style={styles.actionItem}>
              <AppButton variant="outlined" title="الاعدادات" onPress={() => router.push("/setting")} icon="settings-outline"/>
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
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: spacing.sm,
  },
  topBarActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
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
    flexDirection: "row-reverse",
    gap: spacing.xl,
    justifyContent: "center",
    marginBottom: spacing.xl,
  },
  userInfo: {
    alignItems: "flex-end",
    flex: 1,
  },
  job: {
    fontSize: 18,
    marginBottom: spacing.md,
    fontFamily: fontFamily.sansBold,
  },
  stateSection: {
    flexDirection: "row-reverse",
    gap: spacing.md,
    justifyContent: "center",
    marginBottom: spacing.xl,
  },
  aboutCard: {
    padding: spacing.md,
    width: "100%",
    minHeight: 180,
    flexDirection: "row-reverse",
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
    alignItems: "flex-end",
    justifyContent: "center",
  },
  description: {
    textAlign: "right",
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
    textAlign: "right",
    marginBottom: spacing.md,
  },
  actionsList: {
    flexDirection: "row-reverse",
    gap: spacing.md,
  },
  actionItem: {
    flex: 1,
  },
});

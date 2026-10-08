import {
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import AppText from "@/components/AppText";
import AppButton from "@/components/AppButton";
import StatCard from "@/components/StatCard";
import { colors } from "@/theme/colors";
import Avatar from "@/components/Avatar";
import { SafeAreaView } from "react-native-safe-area-context";
import { spacing } from "@/theme/spacing";
import { fontFamily, fontSize } from "@/theme/typography";
import { Ionicons } from "@expo/vector-icons";
import { router, useNavigation } from "expo-router";
import AppCard from "@/components/AppCard";
import AppSafeAreaView from "@/components/AppSafeAreaView";

export default function index() {
  const navigation = useNavigation();
  const openDrawer = () => {
    (navigation as any).openDrawer();
  };
  const AvatarURL =
    "https://6ac3a452ae1f22aea6d19b75.imgix.net/sandbox/ahmed%20amin%20pic.jpeg?auto=compress";
  return (
    <AppSafeAreaView>
        {/* Top Bar */}
      <View style={styles.topBar}>
        <Pressable onPress={openDrawer}>
          <Ionicons name="menu-outline" size={32} color={colors.light.text} />
        </Pressable>
        <View style={styles.notificationWrapper}>
          <Ionicons
            name="notifications-outline"
            size={32}
            color={colors.light.text}
          />
          <View style={styles.dot} />
        </View>
      </View>

      <ScrollView style={styles.content}>
        {/* Profile Section */}
        <View style={styles.profileSection}>
          <Avatar size={124} userName="Ahmed Amin" uri={AvatarURL} />

          <View style={styles.userInfo}>
            <AppText variant="title">أحمد أمين</AppText>
            <AppText style={styles.job} variant="subTitle">
              مهندس برمجيات
            </AppText>
            <AppButton
            style={{paddingHorizontal: spacing.lg}}
              title="عرض المهارات"
              onPress={() => {
                router.push("/skills");
              }}
              icon="create-outline"
            />
          </View>
        </View>

        {/* Stats Section */}
        <View style={styles.stateSection}>
          <StatCard title="المشاريع" value="20+" icon="folder-outline" />
          <StatCard title="المهارات" value="19+" icon="code-slash-outline" />
          <StatCard title="المهام " value="42" icon="checkbox-outline" />
        </View>

        {/* About Card */}
        <AppCard style={styles.aboutCard}>
          <View style={styles.aboutCardIcon}>
            <Ionicons
              name="information-circle-outline"
              size={45}
              color={colors.light.primary}
            />
          </View>
          <View style={styles.aboutCardContent}>
            <AppText variant="title">نبذة عني</AppText>
            <AppText style={styles.description} variant="body">
              أحمد أمين مهندس برمجيات حاصل على بكالوريوس في علوم الحاسب. لدي
              خبرة في تطوير الويب وتطبيقات الهاتف المحمول.
            </AppText>
          </View>
        </AppCard>

        {/* Footer */}
        <AppCard style={styles.actionsCard}>
          <AppText variant="subTitle" style={styles.actionsTitle}>
            اجراءات سريعة
          </AppText>

          <View style={styles.actionsList}>
            <View style={styles.actionItem}>
              <AppButton
                title="المهارات"
                onPress={() => {
                  router.push("/skills");
                }}
                icon="code-slash-outline"
              />
            </View>
            <View style={styles.actionItem}>
              <AppButton
                variant="outlined"
                title="الاعدادات"
                onPress={() => {
                  router.push("/setting");
                }}
                icon="settings-outline"
              />
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
    //marginBottom: spacing.lg,
    paddingHorizontal: spacing.sm,
  },
  notificationWrapper: {
    padding: spacing.xs,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 50,
    backgroundColor: colors.light.danger,
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
    color: colors.light.textSecondary,
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
    backgroundColor: colors.light.background,
    padding: spacing.md,
    width: "100%",
    height: 200,
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.md,
  },
  aboutCardIcon: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.light.primarySubtle,
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
    color: colors.light.text,
    fontSize: fontSize.md,
    marginTop: spacing.xs,
  },
  actionsCard: {
    marginTop: spacing.md,
    marginBottom: spacing.xl,
    backgroundColor: colors.light.background,
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

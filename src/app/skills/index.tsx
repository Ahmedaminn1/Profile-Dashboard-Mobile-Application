import React from "react";
import { View, Pressable, FlatList } from "react-native";
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
import SkillsCard, { SkillItem } from "@/components/SkillCard";

const skills: SkillItem[] = [
  { id: 1, title: "React", level: "متقدم", badge: "خبير", icon: "logo-react" },
  {
    id: 2,
    title: "Next.js",
    level: "متقدم",
    badge: "خبير",
    icon: "code-slash-outline",
  },
  {
    id: 3,
    title: "TypeScript",
    level: "متقدم",
    badge: "خبير",
    icon: "code-slash-outline",
  },
  {
    id: 4,
    title: "React Native",
    level: "متقدم",
    badge: "خبير",
    icon: "logo-react",
  },
  {
    id: 5,
    title: "Redux / Zustand",
    level: "متقدم",
    badge: "خبير",
    icon: "cube-outline",
  },
  {
    id: 6,
    title: "JavaScript",
    level: "متقدم",
    badge: "محترف",
    icon: "logo-javascript",
  },
  {
    id: 7,
    title: "HTML5 & CSS3",
    level: "متقدم",
    badge: "خبير",
    icon: "logo-html5",
  },
  {
    id: 8,
    title: "Tailwind CSS",
    level: "متقدم",
    badge: "محترف",
    icon: "color-palette-outline",
  },
  {
    id: 9,
    title: "React Query",
    level: "متقدم",
    badge: "محترف",
    icon: "server-outline",
  },
  {
    id: 10,
    title: "Git & GitHub",
    level: "متقدم",
    badge: "خبير",
    icon: "logo-github",
  },
  {
    id: 11,
    title: "Node.js",
    level: "متوسط",
    badge: "جيد جداً",
    icon: "logo-nodejs",
  },
  {
    id: 12,
    title: "Figma (UI/UX)",
    level: "متوسط",
    badge: "جيد",
    icon: "logo-figma",
  },
];

export default function SkillsScreen() {
  const navigation = useNavigation();
  const router = useRouter();

  const openDrawer = () => {
    (navigation as any).openDrawer();
  };

  return (
    <AppSafeAreaView style={{ flex: 1 }}>
      <FlatList
        contentContainerStyle={[styles.content, { gap: spacing.sm }]}
        data={skills}
        ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
        ListEmptyComponent={() => (
          <View style={styles.emptyList}>
            <Ionicons
              name="happy-outline"
              size={42}
              color={colors.light.primary}
            />
            <AppText variant="subTitle">لا يوجد بيانات لعرضها</AppText>
          </View>
        )}
        ListFooterComponent={() => (
          <AppText
            variant="caption"
            style={{ textAlign: "center", marginTop: spacing.lg }}
          >
            نهاية قائمة المهارات
          </AppText>
        )}
        ListHeaderComponent={() => (
          <View style={{ gap: spacing.lg }}>
            <View style={styles.header}>
              <View style={{ width: 32 }} />
              <AppText variant="title" style={styles.headerTitle}>
                المهارات
              </AppText>
              <Pressable onPress={openDrawer}>
                <Ionicons name="chevron-back-outline" size={32} />
              </Pressable>
            </View>
            <AppCard style={styles.headerCard}>
              <View style={styles.headerCardRow}>
                <View>
                  <AppText
                    style={{
                      color: colors.light.primary,
                      fontFamily: fontFamily.sansExtraBold,
                      fontSize: fontSize.xl,
                    }}
                    variant="subTitle"
                  >
                    6 مهارات
                  </AppText>
                  <AppText variant="body">اضافة مهارة جديدة</AppText>
                </View>
                <View style={styles.iconBox}>
                  <Ionicons
                    name="code-slash-outline"
                    size={28}
                    color={colors.light.primary}
                  />
                </View>
              </View>
            </AppCard>
          </View>
        )}
        renderItem={({ item }) => <SkillsCard item={item} />}
      />
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
    width: 52,
    height: 52,
    borderRadius: 18,
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

  itemSeparator: {
    height: spacing.md,
  },

  emptyList: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: spacing.md,
  },

  headerCard: {
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    marginBottom: spacing.lg,
  },

  headerCardRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.lg,
    minHeight: 70,
  },
});

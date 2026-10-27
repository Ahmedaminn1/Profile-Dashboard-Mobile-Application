import React, { useState } from "react";
import {
  View,
  Pressable,
  FlatList,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import AppSafeAreaView from "@/components/AppSafeAreaView";
import { StyleSheet } from "react-native";
import { spacing, radius } from "@/theme/spacing";
import AppText from "@/components/AppText";
import AppCard from "@/components/AppCard";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import { fontSize, fontFamily } from "@/theme/typography";
import AppButton from "@/components/AppButton";
import SkillsCard, { SkillItem } from "@/components/SkillCard";
import { useTheme } from "@/context/ThemeContext";
import { useSkills } from "@/context/SkillsContext";
import { useTranslation } from "react-i18next";

export default function SkillsScreen() {
  const navigation = useNavigation();
  const { themeColors } = useTheme();
  const { skills, addSkill } = useSkills();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const language = i18n.language;

  const levelOptions = [
    { key: "beginner", label: t("skills.levels.beginner") },
    { key: "intermediate", label: t("skills.levels.intermediate") },
    { key: "advanced", label: t("skills.levels.advanced") },
  ];

  const badgeOptions = [
    { key: "good", label: t("skills.badges.good") },
    { key: "veryGood", label: t("skills.badges.veryGood") },
    { key: "professional", label: t("skills.badges.professional") },
    { key: "expert", label: t("skills.badges.expert") },
  ];

  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [level, setLevel] = useState(levelOptions[2].label);
  const [badge, setBadge] = useState(badgeOptions[3].label);

  const openDrawer = () => {
    (navigation as any).openDrawer();
  };

  const handleAdd = () => {
    if (!title.trim()) {
      Alert.alert(t("common.alert"), t("skills.enterSkillAlert"));
      return;
    }
    addSkill({
      title: title.trim(),
      level: level || levelOptions[2].label,
      badge: badge || badgeOptions[3].label,
      icon: "code-slash-outline",
    });
    setTitle("");
    setLevel(levelOptions[2].label);
    setBadge(badgeOptions[3].label);
    setModalVisible(false);
  };

  return (
    <AppSafeAreaView style={{ flex: 1 }}>
      <FlatList
        contentContainerStyle={[styles.content, { gap: spacing.sm }]}
        data={skills}
        ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
        ListEmptyComponent={() => (
          <View style={styles.emptyList}>
            <Ionicons name="happy-outline" size={42} color={themeColors.primary} />
            <AppText variant="subTitle">
              {language === "ar" ? "لا توجد مهارات مسجلة" : "No skills registered"}
            </AppText>
          </View>
        )}
        ListFooterComponent={() => (
          <AppText
            variant="caption"
            style={{ textAlign: "center", marginTop: spacing.lg }}
          >
            {language === "ar" ? "نهاية قائمة المهارات" : "End of skills list"}
          </AppText>
        )}
        ListHeaderComponent={() => (
          <View style={{ gap: spacing.lg }}>
            {/* Header Row */}
            <View
              style={[
                styles.header,
                { flexDirection: isRTL ? "row" : "row-reverse" },
              ]}
            >
              <View style={{ width: 32 }} />
              <AppText variant="title" style={styles.headerTitle}>
                {t("skills.title")}
              </AppText>
              <Pressable onPress={openDrawer}>
                <Ionicons
                  name={isRTL ? "chevron-back-outline" : "menu-outline"}
                  size={32}
                  color={themeColors.text}
                />
              </Pressable>
            </View>

            {/* Summary Card */}
            <AppCard
              style={[
                styles.headerCard,
                { flexDirection: isRTL ? "row-reverse" : "row" },
              ]}
            >
              <View
                style={[
                  styles.headerCardRow,
                  { flexDirection: isRTL ? "row" : "row-reverse" },
                ]}
              >
                <View style={{ alignItems: isRTL ? "flex-end" : "flex-start" }}>
                  <AppText
                    style={{
                      color: themeColors.primary,
                      fontFamily: fontFamily.sansExtraBold,
                      fontSize: fontSize.xl,
                    }}
                    variant="subTitle"
                  >
                    {skills.length} {t("skills.title")}
                  </AppText>
                  <AppText variant="body">
                    {language === "ar"
                      ? "اضغط + لإضافة مهارة جديدة"
                      : "Tap + to add a new skill"}
                  </AppText>
                </View>
                <View
                  style={[
                    styles.headerCardRight,
                    { flexDirection: isRTL ? "row" : "row-reverse" },
                  ]}
                >
                  <View
                    style={[
                      styles.iconBox,
                      { backgroundColor: themeColors.primarySubtle },
                    ]}
                  >
                    <Ionicons
                      name="code-slash-outline"
                      size={28}
                      color={themeColors.primary}
                    />
                  </View>
                  {/* Add Button */}
                  <Pressable
                    onPress={() => setModalVisible(true)}
                    style={[
                      styles.addButton,
                      { backgroundColor: themeColors.primary },
                    ]}
                  >
                    <Ionicons name="add" size={24} color="#fff" />
                  </Pressable>
                </View>
              </View>
            </AppCard>
          </View>
        )}
        renderItem={({ item }) => <SkillsCard item={item} />}
      />

      {/* Add Skill Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modalOverlay}>
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              style={{ width: "100%" }}
            >
              <AppCard
                style={[
                  styles.modalCard,
                  { backgroundColor: themeColors.surface },
                ]}
              >
                {/* Modal Header */}
                <View
                  style={[
                    styles.modalHeader,
                    { flexDirection: isRTL ? "row" : "row-reverse" },
                  ]}
                >
                  <Pressable onPress={() => setModalVisible(false)}>
                    <Ionicons
                      name="close-outline"
                      size={28}
                      color={themeColors.text}
                    />
                  </Pressable>
                  <AppText
                    variant="title"
                    style={{
                      color: themeColors.text,
                      fontFamily: fontFamily.sansExtraBold,
                    }}
                  >
                    {t("skills.addSkill")}
                  </AppText>
                  <View style={{ width: 28 }} />
                </View>

                {/* Skill Name */}
                <AppText
                  variant="body"
                  style={[
                    styles.inputLabel,
                    {
                      color: themeColors.textSecondary,
                      textAlign: isRTL ? "right" : "left",
                    },
                  ]}
                >
                  {t("skills.skillName")}
                </AppText>
                <TextInput
                  value={title}
                  onChangeText={setTitle}
                  placeholder={t("skills.skillNamePlaceholder")}
                  placeholderTextColor={themeColors.textLight}
                  style={[
                    styles.input,
                    {
                      color: themeColors.text,
                      backgroundColor: themeColors.surfaceRaised,
                      borderColor: themeColors.border,
                      textAlign: isRTL ? "right" : "left",
                    },
                  ]}
                />

                {/* Level Picker */}
                <AppText
                  variant="body"
                  style={[
                    styles.inputLabel,
                    {
                      color: themeColors.textSecondary,
                      textAlign: isRTL ? "right" : "left",
                    },
                  ]}
                >
                  {t("skills.level")}
                </AppText>
                <View
                  style={[
                    styles.optionRow,
                    { flexDirection: isRTL ? "row-reverse" : "row" },
                  ]}
                >
                  {levelOptions.map((opt) => (
                    <Pressable
                      key={opt.key}
                      onPress={() => setLevel(opt.label)}
                      style={[
                        styles.optionChip,
                        {
                          backgroundColor:
                            level === opt.label
                              ? themeColors.primary
                              : themeColors.surfaceRaised,
                          borderColor: themeColors.border,
                        },
                      ]}
                    >
                      <AppText
                        variant="body"
                        style={{
                          color: level === opt.label ? "#fff" : themeColors.text,
                          fontFamily: fontFamily.sansBold,
                        }}
                      >
                        {opt.label}
                      </AppText>
                    </Pressable>
                  ))}
                </View>

                {/* Badge Picker */}
                <AppText
                  variant="body"
                  style={[
                    styles.inputLabel,
                    {
                      color: themeColors.textSecondary,
                      textAlign: isRTL ? "right" : "left",
                    },
                  ]}
                >
                  {t("skills.badge")}
                </AppText>
                <View
                  style={[
                    styles.optionRow,
                    { flexDirection: isRTL ? "row-reverse" : "row" },
                  ]}
                >
                  {badgeOptions.map((opt) => (
                    <Pressable
                      key={opt.key}
                      onPress={() => setBadge(opt.label)}
                      style={[
                        styles.optionChip,
                        {
                          backgroundColor:
                            badge === opt.label
                              ? themeColors.primary
                              : themeColors.surfaceRaised,
                          borderColor: themeColors.border,
                        },
                      ]}
                    >
                      <AppText
                        variant="body"
                        style={{
                          color: badge === opt.label ? "#fff" : themeColors.text,
                          fontFamily: fontFamily.sansBold,
                        }}
                      >
                        {opt.label}
                      </AppText>
                    </Pressable>
                  ))}
                </View>

                {/* Confirm Button */}
                <AppButton
                  title={t("skills.addSkill")}
                  onPress={handleAdd}
                  icon="checkmark-outline"
                  style={{ marginTop: spacing.lg }}
                />
              </AppCard>
            </KeyboardAvoidingView>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
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
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: radius.lg,       // 12px — consistent
    alignItems: "center",
    justifyContent: "center",
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: radius.lg,       // 12px
    alignItems: "center",
    justifyContent: "center",
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
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    marginBottom: spacing.lg,
  },
  headerCardRow: {
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
    minHeight: 70,
  },
  headerCardRight: {
    alignItems: "center",
    gap: spacing.sm,
  },
  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: spacing.md,
    paddingHorizontal: spacing.md,
  },
  modalCard: {
    width: "100%",
    borderRadius: radius.xl,       // 16px — modal bottom sheet
    padding: spacing.lg,
    gap: spacing.sm,
  },
  modalHeader: {
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing.md,
  },
  inputLabel: {
    marginBottom: 4,
    fontFamily: fontFamily.sansBold,
  },
  input: {
    borderWidth: 1,
    borderRadius: radius.lg,       // 12px
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    fontSize: fontSize.md,
    fontFamily: fontFamily.sans,
    marginBottom: spacing.sm,
  },
  optionRow: {
    gap: spacing.sm,
    flexWrap: "wrap",
    marginBottom: spacing.sm,
  },
  optionChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.lg,       // 12px — consistent chip shape
    borderWidth: 1,
  },
});

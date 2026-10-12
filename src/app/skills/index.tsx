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
import { spacing } from "@/theme/spacing";
import AppText from "@/components/AppText";
import AppCard from "@/components/AppCard";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import { fontSize, fontFamily } from "@/theme/typography";
import AppButton from "@/components/AppButton";
import SkillsCard, { SkillItem } from "@/components/SkillCard";
import { useTheme } from "@/context/ThemeContext";
import { useSkills } from "@/context/SkillsContext";

const LEVEL_OPTIONS = ["مبتدئ", "متوسط", "متقدم"];
const BADGE_OPTIONS = ["جيد", "جيد جداً", "محترف", "خبير"];

export default function SkillsScreen() {
  const navigation = useNavigation();
  const { themeColors } = useTheme();
  const { skills, addSkill } = useSkills();

  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [level, setLevel] = useState(LEVEL_OPTIONS[2]);
  const [badge, setBadge] = useState(BADGE_OPTIONS[3]);

  const openDrawer = () => {
    (navigation as any).openDrawer();
  };

  const handleAdd = () => {
    if (!title.trim()) {
      Alert.alert("تنبيه", "من فضلك ادخل اسم المهارة");
      return;
    }
    addSkill({ title: title.trim(), level, badge, icon: "code-slash-outline" });
    setTitle("");
    setLevel(LEVEL_OPTIONS[2]);
    setBadge(BADGE_OPTIONS[3]);
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
            {/* Header Row */}
            <View style={styles.header}>
              <View style={{ width: 32 }} />
              <AppText variant="title" style={styles.headerTitle}>
                المهارات
              </AppText>
              <Pressable onPress={openDrawer}>
                <Ionicons name="chevron-back-outline" size={32} />
              </Pressable>
            </View>

            {/* Summary Card */}
            <AppCard style={styles.headerCard}>
              <View style={styles.headerCardRow}>
                <View>
                  <AppText
                    style={{
                      color: themeColors.primary,
                      fontFamily: fontFamily.sansExtraBold,
                      fontSize: fontSize.xl,
                    }}
                    variant="subTitle"
                  >
                    {skills.length} مهارات
                  </AppText>
                  <AppText variant="body">اضغط + لإضافة مهارة جديدة</AppText>
                </View>
                <View style={styles.headerCardRight}>
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
              <AppCard style={[styles.modalCard, { backgroundColor: themeColors.surface }]}>
                {/* Modal Header */}
                <View style={styles.modalHeader}>
                  <Pressable onPress={() => setModalVisible(false)}>
                    <Ionicons name="close-outline" size={28} color={themeColors.text} />
                  </Pressable>
                  <AppText
                    variant="title"
                    style={{ color: themeColors.text, fontFamily: fontFamily.sansExtraBold }}
                  >
                    إضافة مهارة
                  </AppText>
                  <View style={{ width: 28 }} />
                </View>

                {/* Skill Name */}
                <AppText
                  variant="body"
                  style={[styles.inputLabel, { color: themeColors.textSecondary }]}
                >
                  اسم المهارة
                </AppText>
                <TextInput
                  value={title}
                  onChangeText={setTitle}
                  placeholder="مثال: Vue.js"
                  placeholderTextColor={themeColors.textLight}
                  style={[
                    styles.input,
                    {
                      color: themeColors.text,
                      backgroundColor: themeColors.surfaceRaised,
                      borderColor: themeColors.border,
                    },
                  ]}
                  textAlign="right"
                />

                {/* Level Picker */}
                <AppText
                  variant="body"
                  style={[styles.inputLabel, { color: themeColors.textSecondary }]}
                >
                  المستوى
                </AppText>
                <View style={styles.optionRow}>
                  {LEVEL_OPTIONS.map((opt) => (
                    <Pressable
                      key={opt}
                      onPress={() => setLevel(opt)}
                      style={[
                        styles.optionChip,
                        {
                          backgroundColor:
                            level === opt
                              ? themeColors.primary
                              : themeColors.surfaceRaised,
                          borderColor: themeColors.border,
                        },
                      ]}
                    >
                      <AppText
                        variant="body"
                        style={{
                          color: level === opt ? "#fff" : themeColors.text,
                          fontFamily: fontFamily.sansBold,
                        }}
                      >
                        {opt}
                      </AppText>
                    </Pressable>
                  ))}
                </View>

                {/* Badge Picker */}
                <AppText
                  variant="body"
                  style={[styles.inputLabel, { color: themeColors.textSecondary }]}
                >
                  الشارة
                </AppText>
                <View style={styles.optionRow}>
                  {BADGE_OPTIONS.map((opt) => (
                    <Pressable
                      key={opt}
                      onPress={() => setBadge(opt)}
                      style={[
                        styles.optionChip,
                        {
                          backgroundColor:
                            badge === opt
                              ? themeColors.primary
                              : themeColors.surfaceRaised,
                          borderColor: themeColors.border,
                        },
                      ]}
                    >
                      <AppText
                        variant="body"
                        style={{
                          color: badge === opt ? "#fff" : themeColors.text,
                          fontFamily: fontFamily.sansBold,
                        }}
                      >
                        {opt}
                      </AppText>
                    </Pressable>
                  ))}
                </View>

                {/* Confirm Button */}
                <AppButton
                  title="إضافة المهارة"
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing.lg,
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
  },
  iconBox: {
    width: 52,
    height: 52,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
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
    justifyContent: "space-between",
    flex: 1,
    minHeight: 70,
  },
  headerCardRight: {
    flexDirection: "row",
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
    borderRadius: 20,
    padding: spacing.lg,
    gap: spacing.sm,
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing.md,
  },
  inputLabel: {
    textAlign: "right",
    marginBottom: 4,
    fontFamily: fontFamily.sansBold,
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    fontSize: fontSize.md,
    fontFamily: fontFamily.sans,
    marginBottom: spacing.sm,
  },
  optionRow: {
    flexDirection: "row-reverse",
    gap: spacing.sm,
    flexWrap: "wrap",
    marginBottom: spacing.sm,
  },
  optionChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 20,
    borderWidth: 1,
  },
});

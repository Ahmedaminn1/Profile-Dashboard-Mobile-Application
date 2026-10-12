import React, { useState } from "react";
import { View, ScrollView, StyleSheet, Pressable } from "react-native";
import AppSafeAreaView from "@/components/AppSafeAreaView";
import AppText from "@/components/AppText";
import AppCard from "@/components/AppCard";
import AppButton from "@/components/AppButton";
import Avatar from "@/components/Avatar";
import SettingScreenHeader from "@/components/SettingScreenHeader";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/context/ThemeContext";
import { spacing } from "@/theme/spacing";
import { fontFamily, fontSize } from "@/theme/typography";
import { radius } from "@/theme/spacing";

const AvatarURL =
  "https://6ac3a452ae1f22aea6d19b75.imgix.net/sandbox/ahmed%20amin%20pic.jpeg?auto=compress";

interface InfoRowProps {
  label: string;
  value: string;
  icon: React.ComponentProps<typeof Ionicons>["name"];
}

function InfoRow({ label, value, icon }: InfoRowProps) {
  const { themeColors } = useTheme();
  return (
    <View style={[styles.infoRow, { borderBottomColor: themeColors.border }]}>
      <View style={styles.infoLeft}>
        <AppText variant="body" style={{ color: themeColors.textSecondary }}>
          {value}
        </AppText>
      </View>
      <View style={styles.infoRight}>
        <AppText variant="body" style={{ color: themeColors.text, fontFamily: fontFamily.sansBold }}>
          {label}
        </AppText>
        <View style={[styles.infoIcon, { backgroundColor: themeColors.primarySubtle }]}>
          <Ionicons name={icon} size={18} color={themeColors.primary} />
        </View>
      </View>
    </View>
  );
}

export default function AccountScreen() {
  const { themeColors } = useTheme();

  return (
    <AppSafeAreaView>
      <ScrollView contentContainerStyle={styles.content}>
        <SettingScreenHeader title="الحساب" icon="person-outline" />

        {/* Avatar Section */}
        <View style={styles.avatarSection}>
          <Avatar size={100} userName="Ahmed Amin" uri={AvatarURL} />
          <View style={styles.avatarInfo}>
            <AppText variant="title">أحمد أمين</AppText>
            <AppText variant="body" style={{ color: themeColors.textSecondary }}>
              مهندس برمجيات
            </AppText>
          </View>
          <Pressable
            style={[styles.editAvatarBtn, { backgroundColor: themeColors.primary }]}
          >
            <Ionicons name="camera-outline" size={18} color="#fff" />
          </Pressable>
        </View>

        {/* Personal Info Card */}
        <AppCard>
          <AppText
            variant="subTitle"
            style={[styles.sectionTitle, { color: themeColors.primary }]}
          >
            البيانات الشخصية
          </AppText>
          <InfoRow label="الاسم الكامل" value="أحمد أمين" icon="person-outline" />
          <InfoRow label="المسمى الوظيفي" value="مهندس برمجيات" icon="briefcase-outline" />
          <InfoRow label="المدينة" value="القاهرة، مصر" icon="location-outline" />
        </AppCard>

        {/* Contact Info Card */}
        <AppCard>
          <AppText
            variant="subTitle"
            style={[styles.sectionTitle, { color: themeColors.primary }]}
          >
            معلومات التواصل
          </AppText>
          <InfoRow label="البريد الإلكتروني" value="ahmed@example.com" icon="mail-outline" />
          <InfoRow label="رقم الهاتف" value="+20 100 000 0000" icon="call-outline" />
          <InfoRow label="GitHub" value="Ahmedaminn1" icon="logo-github" />
        </AppCard>

        {/* Edit Button */}
        <AppButton
          title="تعديل البيانات"
          icon="create-outline"
          onPress={() => {}}
          style={{ marginTop: spacing.sm }}
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
  avatarSection: {
    alignItems: "center",
    marginBottom: spacing.md,
    gap: spacing.sm,
    position: "relative",
  },
  avatarInfo: {
    alignItems: "center",
    gap: spacing.xs,
  },
  editAvatarBtn: {
    position: "absolute",
    top: 68,
    right: "35%",
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  sectionTitle: {
    marginBottom: spacing.sm,
    fontFamily: fontFamily.sansExtraBold,
  },
  infoRow: {
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
  },
  infoRight: {
    flexDirection: "row-reverse",
    alignItems: "center",
    gap: spacing.sm,
  },
  infoLeft: {
    flex: 1,
    alignItems: "flex-start",
  },
  infoIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
});

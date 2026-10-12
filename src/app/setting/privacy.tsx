import React, { useState } from "react";
import { View, ScrollView, StyleSheet, Switch } from "react-native";
import AppSafeAreaView from "@/components/AppSafeAreaView";
import AppText from "@/components/AppText";
import AppCard from "@/components/AppCard";
import AppButton from "@/components/AppButton";
import SettingScreenHeader from "@/components/SettingScreenHeader";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/context/ThemeContext";
import { spacing } from "@/theme/spacing";
import { fontFamily } from "@/theme/typography";

interface PrivacyToggleProps {
  label: string;
  description: string;
  icon: React.ComponentProps<typeof Ionicons>["name"];
  value: boolean;
  onToggle: (val: boolean) => void;
}

function PrivacyToggle({
  label,
  description,
  icon,
  value,
  onToggle,
}: PrivacyToggleProps) {
  const { themeColors } = useTheme();

  return (
    <View style={[styles.toggleRow, { borderBottomColor: themeColors.border }]}>
      <Switch
        value={value}
        onValueChange={onToggle}
        trackColor={{ false: themeColors.border, true: themeColors.primary }}
        thumbColor="#FFFFFF"
      />
      <View style={styles.toggleInfo}>
        <AppText
          variant="subTitle"
          style={{ color: themeColors.text, fontFamily: fontFamily.sansBold }}
        >
          {label}
        </AppText>
        <AppText variant="body" style={{ color: themeColors.textSecondary }}>
          {description}
        </AppText>
      </View>
      <View style={[styles.toggleIcon, { backgroundColor: themeColors.primarySubtle }]}>
        <Ionicons name={icon} size={20} color={themeColors.primary} />
      </View>
    </View>
  );
}

export default function PrivacyScreen() {
  const { themeColors } = useTheme();

  const [profilePublic, setProfilePublic] = useState(true);
  const [shareActivity, setShareActivity] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
  const [showPhone, setShowPhone] = useState(false);
  const [dataCollection, setDataCollection] = useState(true);

  return (
    <AppSafeAreaView>
      <ScrollView contentContainerStyle={styles.content}>
        <SettingScreenHeader title="الخصوصية" icon="lock-closed-outline" />

        {/* Profile Visibility Card */}
        <AppCard>
          <AppText
            variant="subTitle"
            style={[styles.sectionTitle, { color: themeColors.primary }]}
          >
            ظهور الملف الشخصي
          </AppText>
          <PrivacyToggle
            label="ملف عام"
            description="يمكن لأي شخص رؤية ملفك الشخصي"
            icon="eye-outline"
            value={profilePublic}
            onToggle={setProfilePublic}
          />
          <PrivacyToggle
            label="مشاركة النشاط"
            description="إظهار آخر تحديثاتك للآخرين"
            icon="pulse-outline"
            value={shareActivity}
            onToggle={setShareActivity}
          />
        </AppCard>

        {/* Contact Info Visibility Card */}
        <AppCard>
          <AppText
            variant="subTitle"
            style={[styles.sectionTitle, { color: themeColors.primary }]}
          >
            إظهار معلومات التواصل
          </AppText>
          <PrivacyToggle
            label="البريد الإلكتروني"
            description="إظهار بريدك للآخرين في ملفك"
            icon="mail-outline"
            value={showEmail}
            onToggle={setShowEmail}
          />
          <PrivacyToggle
            label="رقم الهاتف"
            description="إظهار رقم هاتفك في ملفك الشخصي"
            icon="call-outline"
            value={showPhone}
            onToggle={setShowPhone}
          />
        </AppCard>

        {/* Data Card */}
        <AppCard>
          <AppText
            variant="subTitle"
            style={[styles.sectionTitle, { color: themeColors.primary }]}
          >
            البيانات والتحليلات
          </AppText>
          <PrivacyToggle
            label="جمع البيانات"
            description="السماح بجمع بيانات مجهولة لتحسين التطبيق"
            icon="analytics-outline"
            value={dataCollection}
            onToggle={setDataCollection}
          />
        </AppCard>

        {/* Danger Zone */}
        <AppCard>
          <AppText
            variant="subTitle"
            style={[styles.sectionTitle, { color: themeColors.danger }]}
          >
            منطقة الخطر
          </AppText>
          <AppText
            variant="body"
            style={{ color: themeColors.textSecondary, textAlign: "right", marginBottom: spacing.md }}
          >
            حذف الحساب نهائياً سيؤدي إلى فقدان جميع بياناتك ولا يمكن التراجع عن هذا الإجراء.
          </AppText>
          <AppButton
            title="حذف الحساب"
            variant="danger"
            icon="trash-outline"
            onPress={() => {}}
          />
        </AppCard>
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
  sectionTitle: {
    marginBottom: spacing.sm,
    fontFamily: fontFamily.sansExtraBold,
  },
  toggleRow: {
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    gap: spacing.md,
  },
  toggleInfo: {
    flex: 1,
    alignItems: "flex-end",
    gap: 4,
  },
  toggleIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});

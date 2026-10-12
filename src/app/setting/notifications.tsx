import React, { useState } from "react";
import { View, ScrollView, StyleSheet, Switch } from "react-native";
import AppSafeAreaView from "@/components/AppSafeAreaView";
import AppText from "@/components/AppText";
import AppCard from "@/components/AppCard";
import SettingScreenHeader from "@/components/SettingScreenHeader";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/context/ThemeContext";
import { spacing } from "@/theme/spacing";
import { fontFamily } from "@/theme/typography";

interface NotificationToggleProps {
  label: string;
  description: string;
  icon: React.ComponentProps<typeof Ionicons>["name"];
  value: boolean;
  onToggle: (val: boolean) => void;
}

function NotificationToggle({
  label,
  description,
  icon,
  value,
  onToggle,
}: NotificationToggleProps) {
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

export default function NotificationsScreen() {
  const { themeColors } = useTheme();

  const [pushEnabled, setPushEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(false);
  const [updatesEnabled, setUpdatesEnabled] = useState(true);
  const [remindersEnabled, setRemindersEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [vibrationEnabled, setVibrationEnabled] = useState(false);

  return (
    <AppSafeAreaView>
      <ScrollView contentContainerStyle={styles.content}>
        <SettingScreenHeader title="الاشعارات" icon="notifications-outline" />

        {/* Push Notifications Card */}
        <AppCard>
          <AppText
            variant="subTitle"
            style={[styles.sectionTitle, { color: themeColors.primary }]}
          >
            إشعارات التطبيق
          </AppText>
          <NotificationToggle
            label="إشعارات فورية"
            description="تلقّي إشعارات فورية عند كل تحديث"
            icon="notifications-outline"
            value={pushEnabled}
            onToggle={setPushEnabled}
          />
          <NotificationToggle
            label="التذكيرات"
            description="تذكيرات يومية لمتابعة مهامك"
            icon="alarm-outline"
            value={remindersEnabled}
            onToggle={setRemindersEnabled}
          />
          <NotificationToggle
            label="التحديثات"
            description="إشعارات عند صدور تحديثات جديدة"
            icon="refresh-outline"
            value={updatesEnabled}
            onToggle={setUpdatesEnabled}
          />
        </AppCard>

        {/* Email Notifications Card */}
        <AppCard>
          <AppText
            variant="subTitle"
            style={[styles.sectionTitle, { color: themeColors.primary }]}
          >
            إشعارات البريد
          </AppText>
          <NotificationToggle
            label="البريد الإلكتروني"
            description="تلقّي ملخص أسبوعي على بريدك"
            icon="mail-outline"
            value={emailEnabled}
            onToggle={setEmailEnabled}
          />
        </AppCard>

        {/* Sound & Vibration Card */}
        <AppCard>
          <AppText
            variant="subTitle"
            style={[styles.sectionTitle, { color: themeColors.primary }]}
          >
            الصوت والاهتزاز
          </AppText>
          <NotificationToggle
            label="الصوت"
            description="تشغيل صوت عند وصول الإشعارات"
            icon="volume-high-outline"
            value={soundEnabled}
            onToggle={setSoundEnabled}
          />
          <NotificationToggle
            label="الاهتزاز"
            description="اهتزاز الجهاز عند وصول الإشعارات"
            icon="phone-portrait-outline"
            value={vibrationEnabled}
            onToggle={setVibrationEnabled}
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

import React, { useState } from "react";
import { View, ScrollView, StyleSheet, Switch } from "react-native";
import AppSafeAreaView from "@/components/AppSafeAreaView";
import AppText from "@/components/AppText";
import AppCard from "@/components/AppCard";
import SettingScreenHeader from "@/components/SettingScreenHeader";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/context/ThemeContext";
import { useTranslation } from "react-i18next";
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
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  return (
    <View
      style={[
        styles.toggleRow,
        {
          borderBottomColor: themeColors.border,
          flexDirection: isRTL ? "row-reverse" : "row",
        },
      ]}
    >
      <View
        style={[
          styles.toggleIcon,
          { backgroundColor: themeColors.primarySubtle },
        ]}
      >
        <Ionicons name={icon} size={20} color={themeColors.primary} />
      </View>
      <View
        style={[
          styles.toggleInfo,
          { alignItems: isRTL ? "flex-end" : "flex-start" },
        ]}
      >
        <AppText
          variant="subTitle"
          style={{
            color: themeColors.text,
            fontFamily: fontFamily.sansBold,
            textAlign: isRTL ? "right" : "left",
          }}
        >
          {label}
        </AppText>
        <AppText
          variant="body"
          style={{
            color: themeColors.textSecondary,
            textAlign: isRTL ? "right" : "left",
          }}
        >
          {description}
        </AppText>
      </View>
      <Switch
        value={value}
        onValueChange={onToggle}
        trackColor={{ false: themeColors.border, true: themeColors.primary }}
        thumbColor="#FFFFFF"
      />
    </View>
  );
}

export default function NotificationsScreen() {
  const { themeColors } = useTheme();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const language = i18n.language;

  const [pushEnabled, setPushEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(false);
  const [updatesEnabled, setUpdatesEnabled] = useState(true);
  const [remindersEnabled, setRemindersEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [vibrationEnabled, setVibrationEnabled] = useState(false);

  return (
    <AppSafeAreaView>
      <ScrollView contentContainerStyle={styles.content}>
        <SettingScreenHeader
          title={t("settings.menu.notifications")}
          icon="notifications-outline"
        />

        {/* Push Notifications Card */}
        <AppCard>
          <AppText
            variant="subTitle"
            style={[
              styles.sectionTitle,
              {
                color: themeColors.primary,
                textAlign: isRTL ? "right" : "left",
              },
            ]}
          >
            {language === "ar" ? "إشعارات التطبيق" : "App Notifications"}
          </AppText>
          <NotificationToggle
            label={language === "ar" ? "إشعارات فورية" : "Push Notifications"}
            description={
              language === "ar"
                ? "تلقّي إشعارات فورية عند كل تحديث"
                : "Receive instant notifications on updates"
            }
            icon="notifications-outline"
            value={pushEnabled}
            onToggle={setPushEnabled}
          />
          <NotificationToggle
            label={language === "ar" ? "التذكيرات" : "Reminders"}
            description={
              language === "ar"
                ? "تذكيرات يومية لمتابعة مهامك"
                : "Daily reminders to keep up with tasks"
            }
            icon="alarm-outline"
            value={remindersEnabled}
            onToggle={setRemindersEnabled}
          />
          <NotificationToggle
            label={language === "ar" ? "التحديثات" : "Updates"}
            description={
              language === "ar"
                ? "إشعارات عند صدور تحديثات جديدة"
                : "Notifications about new updates"
            }
            icon="refresh-outline"
            value={updatesEnabled}
            onToggle={setUpdatesEnabled}
          />
        </AppCard>

        {/* Email Notifications Card */}
        <AppCard>
          <AppText
            variant="subTitle"
            style={[
              styles.sectionTitle,
              {
                color: themeColors.primary,
                textAlign: isRTL ? "right" : "left",
              },
            ]}
          >
            {language === "ar" ? "إشعارات البريد" : "Email Notifications"}
          </AppText>
          <NotificationToggle
            label={language === "ar" ? "البريد الإلكتروني" : "Email Digest"}
            description={
              language === "ar"
                ? "تلقّي ملخص أسبوعي على بريدك"
                : "Receive a weekly summary in your inbox"
            }
            icon="mail-outline"
            value={emailEnabled}
            onToggle={setEmailEnabled}
          />
        </AppCard>

        {/* Sound & Vibration Card */}
        <AppCard>
          <AppText
            variant="subTitle"
            style={[
              styles.sectionTitle,
              {
                color: themeColors.primary,
                textAlign: isRTL ? "right" : "left",
              },
            ]}
          >
            {language === "ar" ? "الصوت والاهتزاز" : "Sound & Vibration"}
          </AppText>
          <NotificationToggle
            label={language === "ar" ? "الصوت" : "Sound"}
            description={
              language === "ar"
                ? "تشغيل صوت عند وصول الإشعارات"
                : "Play sound when notifications arrive"
            }
            icon="volume-high-outline"
            value={soundEnabled}
            onToggle={setSoundEnabled}
          />
          <NotificationToggle
            label={language === "ar" ? "الاهتزاز" : "Vibration"}
            description={
              language === "ar"
                ? "اهتزاز الجهاز عند وصول الإشعارات"
                : "Vibrate on incoming notifications"
            }
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
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    gap: spacing.md,
  },
  toggleInfo: {
    flex: 1,
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

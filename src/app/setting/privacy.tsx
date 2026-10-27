import React, { useState } from "react";
import { View, ScrollView, StyleSheet, Switch } from "react-native";
import AppSafeAreaView from "@/components/AppSafeAreaView";
import AppText from "@/components/AppText";
import AppCard from "@/components/AppCard";
import AppButton from "@/components/AppButton";
import SettingScreenHeader from "@/components/SettingScreenHeader";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/context/ThemeContext";
import { useTranslation } from "react-i18next";
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

export default function PrivacyScreen() {
  const { themeColors } = useTheme();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  const [profilePublic, setProfilePublic] = useState(true);
  const [shareActivity, setShareActivity] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
  const [showPhone, setShowPhone] = useState(false);
  const [dataCollection, setDataCollection] = useState(true);

  return (
    <AppSafeAreaView>
      <ScrollView contentContainerStyle={styles.content}>
        <SettingScreenHeader
          title={t("settings.menu.privacy")}
          icon="lock-closed-outline"
        />

        {/* Profile Visibility Card */}
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
            {t("privacy.profileVisibility")}
          </AppText>
          <PrivacyToggle
            label={t("privacy.publicProfile")}
            description={t("privacy.publicProfileDesc")}
            icon="eye-outline"
            value={profilePublic}
            onToggle={setProfilePublic}
          />
          <PrivacyToggle
            label={t("privacy.shareActivity")}
            description={t("privacy.shareActivityDesc")}
            icon="pulse-outline"
            value={shareActivity}
            onToggle={setShareActivity}
          />
        </AppCard>

        {/* Contact Info Visibility Card */}
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
            {t("privacy.contactInfo")}
          </AppText>
          <PrivacyToggle
            label={t("privacy.email")}
            description={t("privacy.emailDesc")}
            icon="mail-outline"
            value={showEmail}
            onToggle={setShowEmail}
          />
          <PrivacyToggle
            label={t("privacy.phone")}
            description={t("privacy.phoneDesc")}
            icon="call-outline"
            value={showPhone}
            onToggle={setShowPhone}
          />
        </AppCard>

        {/* Data Card */}
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
            {t("privacy.dataAnalytics")}
          </AppText>
          <PrivacyToggle
            label={t("privacy.dataCollection")}
            description={t("privacy.dataCollectionDesc")}
            icon="analytics-outline"
            value={dataCollection}
            onToggle={setDataCollection}
          />
        </AppCard>

        {/* Danger Zone */}
        <AppCard>
          <AppText
            variant="subTitle"
            style={[
              styles.sectionTitle,
              {
                color: themeColors.danger,
                textAlign: isRTL ? "right" : "left",
              },
            ]}
          >
            {t("privacy.dangerZone")}
          </AppText>
          <AppText
            variant="body"
            style={{
              color: themeColors.textSecondary,
              textAlign: isRTL ? "right" : "left",
              marginBottom: spacing.md,
            }}
          >
            {t("privacy.deleteAccountWarning")}
          </AppText>
          <AppButton
            title={t("privacy.deleteAccount")}
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
    borderRadius: 8,               // radius.md
    alignItems: "center",
    justifyContent: "center",
  },
});

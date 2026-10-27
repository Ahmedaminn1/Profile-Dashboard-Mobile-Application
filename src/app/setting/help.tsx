import React, { useState } from "react";
import { View, ScrollView, StyleSheet, Pressable, Linking } from "react-native";
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

interface FaqItemProps {
  question: string;
  answer: string;
}

function FaqItem({ question, answer }: FaqItemProps) {
  const [open, setOpen] = useState(false);
  const { themeColors } = useTheme();
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  return (
    <Pressable
      onPress={() => setOpen((prev) => !prev)}
      style={[styles.faqItem, { borderBottomColor: themeColors.border }]}
    >
      <View
        style={[
          styles.faqHeader,
          { flexDirection: isRTL ? "row-reverse" : "row" },
        ]}
      >
        <AppText
          variant="subTitle"
          style={{
            flex: 1,
            textAlign: isRTL ? "right" : "left",
            color: themeColors.text,
            fontFamily: fontFamily.sansBold,
          }}
        >
          {question}
        </AppText>
        <Ionicons
          name={open ? "chevron-up-outline" : "chevron-down-outline"}
          size={20}
          color={themeColors.textSecondary}
        />
      </View>
      {open && (
        <AppText
          variant="body"
          style={[
            styles.faqAnswer,
            {
              color: themeColors.textSecondary,
              textAlign: isRTL ? "right" : "left",
            },
          ]}
        >
          {answer}
        </AppText>
      )}
    </Pressable>
  );
}

interface ContactLinkProps {
  label: string;
  value: string;
  icon: React.ComponentProps<typeof Ionicons>["name"];
  onPress: () => void;
}

function ContactLink({ label, value, icon, onPress }: ContactLinkProps) {
  const { themeColors } = useTheme();
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.contactRow,
        {
          borderBottomColor: themeColors.border,
          flexDirection: isRTL ? "row-reverse" : "row",
        },
      ]}
    >
      <View
        style={[
          styles.contactIcon,
          { backgroundColor: themeColors.primarySubtle },
        ]}
      >
        <Ionicons name={icon} size={20} color={themeColors.primary} />
      </View>
      <View
        style={[
          styles.contactInfo,
          { alignItems: isRTL ? "flex-end" : "flex-start" },
        ]}
      >
        <AppText
          variant="body"
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
            color: themeColors.primary,
            textAlign: isRTL ? "right" : "left",
          }}
        >
          {value}
        </AppText>
      </View>
      <Ionicons
        name={isRTL ? "chevron-back-outline" : "chevron-forward-outline"}
        size={20}
        color={themeColors.textSecondary}
      />
    </Pressable>
  );
}

export default function HelpScreen() {
  const { themeColors } = useTheme();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const language = i18n.language;

  const faqs: FaqItemProps[] =
    language === "ar"
      ? [
          {
            question: "كيف أضيف مهارة جديدة؟",
            answer:
              "انتقل إلى صفحة المهارات ثم اضغط على 'إضافة مهارة جديدة' في أعلى الشاشة.",
          },
          {
            question: "كيف أغير وضع الألوان (داكن / فاتح)؟",
            answer:
              "انتقل إلى الإعدادات وستجد خيار 'مظهر التطبيق' لتغيير الوضع.",
          },
          {
            question: "كيف أغير لغة التطبيق؟",
            answer:
              "انتقل إلى الإعدادات وستجد خيار 'لغة التطبيق' للتحويل بين العربية والإنجليزية بسهولة، أو من الزر السريع في الصفحة الرئيسية.",
          },
          {
            question: "كيف أحدّث بياناتي الشخصية؟",
            answer:
              "اذهب إلى الإعدادات ← الحساب ثم اضغط على 'تعديل البيانات'.",
          },
          {
            question: "كيف أتواصل مع الدعم الفني؟",
            answer:
              "يمكنك مراسلتنا عبر البريد الإلكتروني أو GitHub أو LinkedIn من قسم 'تواصل معنا' أدناه.",
          },
        ]
      : [
          {
            question: "How do I add a new skill?",
            answer:
              "Go to the Skills screen and tap 'Add New Skill' or the + button at the top.",
          },
          {
            question: "How do I toggle Dark / Light mode?",
            answer:
              "Navigate to Settings and select your preference under 'App Theme'.",
          },
          {
            question: "How do I change the app language?",
            answer:
              "Navigate to Settings and tap your preferred language under 'App Language', or tap the quick language button in the home top bar.",
          },
          {
            question: "How do I update my personal info?",
            answer:
              "Go to Settings → Account, then tap 'Edit Profile'.",
          },
          {
            question: "How do I reach out for support?",
            answer:
              "You can reach us via Email, GitHub, or LinkedIn from the 'Contact Us' section below.",
          },
        ];

  return (
    <AppSafeAreaView>
      <ScrollView contentContainerStyle={styles.content}>
        <SettingScreenHeader
          title={t("settings.menu.help")}
          icon="help-circle-outline"
        />

        {/* App Version Card */}
        <AppCard style={styles.versionCard}>
          <View
            style={[
              styles.versionIcon,
              { backgroundColor: themeColors.primarySubtle },
            ]}
          >
            <Ionicons
              name="phone-portrait-outline"
              size={32}
              color={themeColors.primary}
            />
          </View>
          <AppText variant="subTitle" style={{ color: themeColors.text }}>
            Profile Dashboard
          </AppText>
          <AppText variant="body" style={{ color: themeColors.textSecondary }}>
            {language === "ar" ? "الإصدار 1.0.0" : "Version 1.0.0"}
          </AppText>
        </AppCard>

        {/* FAQ Card */}
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
            {language === "ar" ? "الأسئلة الشائعة" : "Frequently Asked Questions"}
          </AppText>
          {faqs.map((faq, index) => (
            <FaqItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </AppCard>

        {/* Contact Us Card */}
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
            {language === "ar" ? "تواصل معنا" : "Contact Us"}
          </AppText>
          <ContactLink
            label={language === "ar" ? "البريد الإلكتروني" : "Email"}
            value="ahmedamin372002@gmail.com"
            icon="mail-outline"
            onPress={() => Linking.openURL("mailto:ahmedamin372002@gmail.com")}
          />
          <ContactLink
            label="GitHub"
            value="Ahmedaminn1"
            icon="logo-github"
            onPress={() => Linking.openURL("https://github.com/Ahmedaminn1")}
          />
          <ContactLink
            label="LinkedIn"
            value="ahmed-aminn"
            icon="logo-linkedin"
            onPress={() =>
              Linking.openURL("https://www.linkedin.com/in/ahmed-aminn/")
            }
          />
        </AppCard>

        {/* Report Bug Button */}
        <AppButton
          title={language === "ar" ? "الإبلاغ عن مشكلة" : "Report an Issue"}
          variant="outlined"
          icon="bug-outline"
          onPress={() =>
            Linking.openURL(
              "https://github.com/Ahmedaminn1/Profile-Dashboard-Mobile-Application/issues"
            )
          }
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
  sectionTitle: {
    marginBottom: spacing.sm,
    fontFamily: fontFamily.sansExtraBold,
  },
  versionCard: {
    alignItems: "center",
    gap: spacing.sm,
    paddingVertical: spacing.lg,
  },
  versionIcon: {
    width: 64,
    height: 64,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.xs,
  },
  faqItem: {
    borderBottomWidth: 1,
    paddingVertical: spacing.md,
    gap: spacing.sm,
  },
  faqHeader: {
    alignItems: "center",
    gap: spacing.sm,
  },
  faqAnswer: {
    paddingHorizontal: spacing.sm,
    lineHeight: 24,
  },
  contactRow: {
    alignItems: "center",
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    gap: spacing.md,
  },
  contactInfo: {
    flex: 1,
    gap: 2,
  },
  contactIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});

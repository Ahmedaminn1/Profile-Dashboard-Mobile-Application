import React, { useState } from "react";
import { View, ScrollView, StyleSheet, Pressable, Linking } from "react-native";
import AppSafeAreaView from "@/components/AppSafeAreaView";
import AppText from "@/components/AppText";
import AppCard from "@/components/AppCard";
import AppButton from "@/components/AppButton";
import SettingScreenHeader from "@/components/SettingScreenHeader";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/context/ThemeContext";
import { spacing } from "@/theme/spacing";
import { fontFamily } from "@/theme/typography";

interface FaqItemProps {
  question: string;
  answer: string;
}

function FaqItem({ question, answer }: FaqItemProps) {
  const [open, setOpen] = useState(false);
  const { themeColors } = useTheme();

  return (
    <Pressable
      onPress={() => setOpen((prev) => !prev)}
      style={[styles.faqItem, { borderBottomColor: themeColors.border }]}
    >
      <View style={styles.faqHeader}>
        <Ionicons
          name={open ? "chevron-up-outline" : "chevron-down-outline"}
          size={20}
          color={themeColors.textSecondary}
        />
        <AppText
          variant="subTitle"
          style={{ flex: 1, textAlign: "right", color: themeColors.text, fontFamily: fontFamily.sansBold }}
        >
          {question}
        </AppText>
      </View>
      {open && (
        <AppText
          variant="body"
          style={[styles.faqAnswer, { color: themeColors.textSecondary }]}
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
  return (
    <Pressable
      onPress={onPress}
      style={[styles.contactRow, { borderBottomColor: themeColors.border }]}
    >
      <Ionicons name="chevron-back-outline" size={20} color={themeColors.textSecondary} />
      <View style={styles.contactInfo}>
        <AppText variant="body" style={{ color: themeColors.primary }}>
          {value}
        </AppText>
        <AppText variant="body" style={{ color: themeColors.text, fontFamily: fontFamily.sansBold }}>
          {label}
        </AppText>
      </View>
      <View style={[styles.contactIcon, { backgroundColor: themeColors.primarySubtle }]}>
        <Ionicons name={icon} size={20} color={themeColors.primary} />
      </View>
    </Pressable>
  );
}

const faqs: FaqItemProps[] = [
  {
    question: "كيف أضيف مهارة جديدة؟",
    answer: "انتقل إلى صفحة المهارات ثم اضغط على 'إضافة مهارة جديدة' في أعلى الشاشة.",
  },
  {
    question: "كيف أغير وضع الألوان (داكن / فاتح)؟",
    answer: "انتقل إلى الإعدادات وستجد في أعلى الصفحة خيار 'مظهر التطبيق' لتغيير الوضع.",
  },
  {
    question: "كيف أحدّث بياناتي الشخصية؟",
    answer: "اذهب إلى الإعدادات ← الحساب ثم اضغط على 'تعديل البيانات'.",
  },
  {
    question: "هل يمكنني استخدام التطبيق بدون إنترنت؟",
    answer: "نعم، يمكن عرض البيانات المحفوظة مسبقاً دون اتصال، لكن التحديثات تحتاج إنترنت.",
  },
  {
    question: "كيف أتواصل مع الدعم الفني؟",
    answer: "يمكنك مراسلتنا عبر البريد الإلكتروني أو GitHub أو LinkedIn من قسم 'تواصل معنا' أدناه.",
  },
];

export default function HelpScreen() {
  const { themeColors } = useTheme();

  return (
    <AppSafeAreaView>
      <ScrollView contentContainerStyle={styles.content}>
        <SettingScreenHeader title="المساعدة" icon="help-circle-outline" />

        {/* App Version Card */}
        <AppCard style={styles.versionCard}>
          <View style={[styles.versionIcon, { backgroundColor: themeColors.primarySubtle }]}>
            <Ionicons name="phone-portrait-outline" size={32} color={themeColors.primary} />
          </View>
          <AppText variant="subTitle" style={{ color: themeColors.text }}>
            Profile Dashboard
          </AppText>
          <AppText variant="body" style={{ color: themeColors.textSecondary }}>
            الإصدار 1.0.0
          </AppText>
        </AppCard>

        {/* FAQ Card */}
        <AppCard>
          <AppText
            variant="subTitle"
            style={[styles.sectionTitle, { color: themeColors.primary }]}
          >
            الأسئلة الشائعة
          </AppText>
          {faqs.map((faq, index) => (
            <FaqItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </AppCard>

        {/* Contact Us Card */}
        <AppCard>
          <AppText
            variant="subTitle"
            style={[styles.sectionTitle, { color: themeColors.primary }]}
          >
            تواصل معنا
          </AppText>
          <ContactLink
            label="البريد الإلكتروني"
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
            onPress={() => Linking.openURL("https://www.linkedin.com/in/ahmed-aminn/")}
          />
        </AppCard>

        {/* Report Bug Button */}
        <AppButton
          title="الإبلاغ عن مشكلة"
          variant="outlined"
          icon="bug-outline"
          onPress={() => Linking.openURL("https://github.com/Ahmedaminn1/Profile-Dashboard-Mobile-Application/issues")}
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
    flexDirection: "row-reverse",
    alignItems: "center",
    gap: spacing.sm,
  },
  faqAnswer: {
    textAlign: "right",
    paddingHorizontal: spacing.sm,
    lineHeight: 24,
  },
  contactRow: {
    flexDirection: "row-reverse",
    alignItems: "center",
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    gap: spacing.md,
  },
  contactInfo: {
    flex: 1,
    alignItems: "flex-end",
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

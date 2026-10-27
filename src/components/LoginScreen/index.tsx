import {
  View,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import AppCard from "../AppCard";
import AppSafeAreaView from "../AppSafeAreaView";
import { Ionicons } from "@expo/vector-icons";
import AppText from "../AppText";
import { spacing, radius } from "@/theme/spacing";
import { fontSize, fontFamily } from "@/theme/typography";
import AppButton from "../AppButton";
import { useAuth } from "@/context/AuthContext";
import { useTranslation } from "react-i18next";
import { toggleLanguage } from "@/i18n/i18n";
import { useTheme } from "@/context/ThemeContext";

export default function LoginScreen() {
  const { login, isSubmitting } = useAuth();
  const { t, i18n } = useTranslation();
  const { themeColors } = useTheme();
  const isRTL = i18n.language === "ar";
  const language = i18n.language;
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleLogin = async () => {
    setError("");
    if (!username.trim() || !password) {
      setError(t("auth.pleaseEnterUsernameAndPassword"));
      return;
    }
    const result = await login(username.trim(), password);
    if (!result.success) {
      const msg = result.message || t("auth.invalidCredentials");
      setError(msg);
    }
  };

  return (
    <AppSafeAreaView style={[styles.safeAreaView, { backgroundColor: themeColors.background }]}>
      {/* Top Language Switcher */}
      <Pressable
        onPress={toggleLanguage}
        style={[
          styles.langToggle,
          {
            backgroundColor: themeColors.surfaceRaised,
            borderColor: themeColors.border,
          },
        ]}
      >
        <Ionicons name="globe-outline" size={20} color={themeColors.primary} />
        <AppText style={[styles.langText, { color: themeColors.primary }]}>
          {language === "ar" ? "English" : "العربية"}
        </AppText>
      </Pressable>

      <AppCard style={styles.card}>
        <View>
          <Ionicons
            name="lock-closed"
            style={[
              styles.lockIcon,
              {
                backgroundColor: themeColors.primarySubtle,
                borderColor: themeColors.border,
                color: themeColors.primary,
              },
            ]}
            size={32}
            color={themeColors.primary}
          />
        </View>
        <AppText style={[styles.title, { color: themeColors.text }]} variant="title">
          {t("auth.login")}
        </AppText>
        <AppText
          style={[styles.subTitle, { color: themeColors.textSecondary }]}
          variant="subTitle"
        >
          {t("auth.enterCredentialsPrompt")}
        </AppText>

        <View style={styles.inputContainer}>
          <TextInput
            placeholder={t("auth.usernamePlaceholder")}
            placeholderTextColor={themeColors.textSecondary}
            style={[
              styles.input,
              {
                textAlign: isRTL ? "right" : "left",
                borderColor: themeColors.border,
                backgroundColor: themeColors.surfaceRaised,
                color: themeColors.text,
              },
            ]}
            value={username}
            onChangeText={(text) => {
              setUsername(text);
              if (error) setError("");
            }}
            autoCapitalize="none"
          />

          <View style={styles.passwordWrapper}>
            <TextInput
              placeholder={t("auth.passwordPlaceholder")}
              placeholderTextColor={themeColors.textSecondary}
              style={[
                styles.passwordInput,
                {
                  textAlign: isRTL ? "right" : "left",
                  paddingLeft: isRTL ? 42 : spacing.md,
                  paddingRight: !isRTL ? 42 : spacing.md,
                  borderColor: themeColors.border,
                  backgroundColor: themeColors.surfaceRaised,
                  color: themeColors.text,
                },
              ]}
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                if (error) setError("");
              }}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
            />
            <Pressable
              style={[
                styles.eyeIcon,
                isRTL ? { left: spacing.md } : { right: spacing.md },
              ]}
              onPress={() => setShowPassword((prev) => !prev)}
            >
              <Ionicons
                name={showPassword ? "eye-off-outline" : "eye-outline"}
                size={22}
                color={themeColors.textSecondary}
              />
            </Pressable>
          </View>
        </View>

        <AppButton
          style={[styles.loginButton, isSubmitting && { opacity: 0.5 }]}
          title={isSubmitting ? t("auth.loggingIn") : t("auth.login")}
          icon={isSubmitting ? undefined : "log-in-outline"}
          onPress={handleLogin}
        />

        {error.length > 0 ? (
          <AppText
            style={[styles.footerText, { color: themeColors.danger }]}
            variant="caption"
          >
            {error}
          </AppText>
        ) : (
          <AppText style={[styles.footerText, { color: themeColors.textSecondary }]} variant="caption">
            {language === "ar" ? "لا تمتلك حساب؟ " : "Don't have an account? "}
            <AppText style={{ color: themeColors.primary, textDecorationLine: "underline" }} variant="caption">
              {t("auth.signup")}
            </AppText>
          </AppText>
        )}
        {isSubmitting && (
          <ActivityIndicator
            style={{ marginTop: spacing.md }}
            size="large"
            color={themeColors.primary}
          />
        )}
      </AppCard>
    </AppSafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    padding: spacing.lg,
  },
  langToggle: {
    position: "absolute",
    top: 50,
    right: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: radius.lg,      // 12px
    borderWidth: 1,
  },
  langText: {
    fontSize: fontSize.sm,        // 14px — strict scale
    fontFamily: fontFamily.sansBold,
  },
  card: {
    borderRadius: radius.xl,      // 16px — cards can use xl
    width: "100%",
    maxWidth: 360,
    padding: spacing.xl,
    justifyContent: "center",
    alignItems: "stretch",
    gap: spacing.md,
  },
  lockIcon: {
    alignSelf: "center",
    marginBottom: spacing.md,
    borderWidth: 1,
    borderRadius: radius.full,    // circular
    padding: spacing.md,
    fontSize: 36,
    fontFamily: fontFamily.sans,
  },
  title: {
    textAlign: "center",
    alignSelf: "center",
  },
  subTitle: {
    textAlign: "center",
    alignSelf: "center",
  },
  inputContainer: {
    gap: spacing.md,
    marginTop: spacing.xs,
  },
  input: {
    borderWidth: 1,
    borderRadius: radius.lg,      // 12px
    padding: spacing.md,
    fontSize: fontSize.base,      // 16px — strict scale (was 20 = fontSize.lg)
    fontFamily: fontFamily.sans,
  },
  passwordWrapper: {
    position: "relative",
    justifyContent: "center",
  },
  passwordInput: {
    borderWidth: 1,
    borderRadius: radius.lg,      // 12px
    paddingVertical: spacing.md,
    fontSize: fontSize.base,      // 16px
    fontFamily: fontFamily.sans,
  },
  eyeIcon: {
    position: "absolute",
    top: 14,
    zIndex: 1,
  },
  loginButton: {
    marginTop: spacing.md,
    borderRadius: radius.lg,      // 12px — consistent (was 24px hardcoded)
  },
  footerText: {
    marginTop: spacing.md,
    textAlign: "center",
    fontSize: fontSize.sm,        // 14px
    fontFamily: fontFamily.sans,
    fontWeight: "bold",
  },
});

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
import { colors } from "@/theme/colors";
import { Ionicons } from "@expo/vector-icons";
import AppText from "../AppText";
import { spacing } from "@/theme/spacing";
import { fontSize, fontFamily } from "@/theme/typography";
import AppButton from "../AppButton";
import { useAuth } from "@/context/AuthContext";
import { useTranslation } from "react-i18next";
import { toggleLanguage } from "@/i18n/i18n";

export default function LoginScreen() {
  const { login, isSubmitting } = useAuth();
  const { t, i18n } = useTranslation();
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
    <AppSafeAreaView style={styles.safeAreaView}>
      {/* Top Language Switcher */}
      <Pressable onPress={toggleLanguage} style={styles.langToggle}>
        <Ionicons name="globe-outline" size={20} color={colors.light.primary} />
        <AppText style={styles.langText}>
          {language === "ar" ? "English" : "العربية"}
        </AppText>
      </Pressable>

      <AppCard style={styles.card}>
        <View>
          <Ionicons
            name="lock-closed"
            style={styles.lockIcon}
            size={32}
            color={colors.light.primary}
          />
        </View>
        <AppText style={styles.title} variant="title">
          {t("auth.login")}
        </AppText>
        <AppText style={styles.subTitle} variant="subTitle">
          {t("auth.enterCredentialsPrompt")}
        </AppText>

        <View style={styles.inputContainer}>
          <TextInput
            placeholder={t("auth.usernamePlaceholder")}
            placeholderTextColor={colors.light.textSecondary}
            style={[
              styles.input,
              { textAlign: isRTL ? "right" : "left" },
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
              placeholderTextColor={colors.light.textSecondary}
              style={[
                styles.passwordInput,
                {
                  textAlign: isRTL ? "right" : "left",
                  paddingLeft: isRTL ? 42 : 12,
                  paddingRight: !isRTL ? 42 : 12,
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
                isRTL ? { left: 12 } : { right: 12 },
              ]}
              onPress={() => setShowPassword((prev) => !prev)}
            >
              <Ionicons
                name={showPassword ? "eye-off-outline" : "eye-outline"}
                size={22}
                color={colors.light.textSecondary}
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
            style={[styles.footerText, styles.errorText]}
            variant="caption"
          >
            {error}
          </AppText>
        ) : (
          <AppText style={styles.footerText} variant="caption">
            {language === "ar" ? "لا تمتلك حساب؟ " : "Don't have an account? "}
            <AppText style={styles.signUpText} variant="caption">
              {t("auth.signup")}
            </AppText>
          </AppText>
        )}
        {isSubmitting && (
          <ActivityIndicator
            style={{ marginTop: spacing.md }}
            size="large"
            color={colors.light.primary}
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
    gap: 6,
    padding: 8,
    borderRadius: 16,
    backgroundColor: colors.light.surfaceRaised,
    borderWidth: 1,
    borderColor: colors.light.border,
  },
  langText: {
    fontSize: 14,
    fontFamily: fontFamily.sansBold,
    color: colors.light.primary,
  },
  card: {
    borderRadius: 24,
    width: "100%",
    maxWidth: 360,
    padding: spacing.xl,
    justifyContent: "center",
    alignItems: "stretch",
    borderColor: colors.light.border,
  },
  lockIcon: {
    alignSelf: "center",
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.light.background,
    borderRadius: 50,
    backgroundColor: colors.light.primarySubtle,
    padding: 16,
    fontSize: 36,
    fontFamily: fontFamily.sans,
    color: colors.light.primary,
  },
  title: {
    color: colors.light.text,
    textAlign: "center",
    alignSelf: "center",
  },
  subTitle: {
    color: colors.light.textSecondary,
    textAlign: "center",
    alignSelf: "center",
    marginBottom: spacing.md,
  },
  inputContainer: {
    gap: spacing.md,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.light.border,
    borderRadius: 12,
    padding: 12,
    fontSize: fontSize.lg,
    fontFamily: fontFamily.sans,
    color: colors.light.text,
  },
  passwordWrapper: {
    position: "relative",
    justifyContent: "center",
  },
  passwordInput: {
    borderWidth: 1,
    borderColor: colors.light.border,
    borderRadius: 12,
    padding: 12,
    fontSize: fontSize.lg,
    fontFamily: fontFamily.sans,
    color: colors.light.text,
  },
  eyeIcon: {
    position: "absolute",
    top: 14,
    zIndex: 1,
  },
  loginButton: {
    marginTop: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: 24,
  },
  footerText: {
    marginTop: spacing.lg,
    color: colors.light.textSecondary,
    textAlign: "center",
    fontSize: fontSize.md,
    fontFamily: fontFamily.sans,
    fontWeight: "bold",
  },
  errorText: {
    color: colors.light.error ?? "red",
  },
  signUpText: {
    color: colors.light.primary,
    textDecorationLine: "underline",
  },
});

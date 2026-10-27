import { Text, StyleSheet } from "react-native";
import React from "react";
import { fontFamily, fontSize } from "@/theme/typography";
import { spacing } from "@/theme/spacing";
import { useTheme } from "@/context/ThemeContext";
import { useTranslation } from "react-i18next";

interface AppTextProps {
  variant?: "title" | "subTitle" | "body" | "caption" | "button";
  children: React.ReactNode;
  style?: any;
}

export default function AppText({
  children,
  variant = "body",
  style,
  ...props
}: AppTextProps) {
  const { themeColors } = useTheme();
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  return (
    <Text
      {...props}
      style={[
        styles.base,
        {
          color:
            variant === "caption"
              ? themeColors.textSecondary
              : themeColors.text,
          textAlign: isRTL ? "right" : "left",
          writingDirection: isRTL ? "rtl" : "ltr",
        },
        styles[variant],
        style,
      ]}
    >
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  base: {
    fontSize: fontSize.base,   // 16px — CLAUDE.md Rule 4 strict scale
    fontFamily: fontFamily.sans,
  },
  title: {
    fontFamily: fontFamily.sansExtraBold,
    fontSize: fontSize.title,
    lineHeight: 40,
  },
  subTitle: {
    fontFamily: fontFamily.sansBold,
    fontSize: fontSize.subTitle,
    lineHeight: 32,
  },
  body: {
    fontFamily: fontFamily.sans,
    fontSize: fontSize.base,
    lineHeight: 24,
  },
  caption: {
    fontFamily: fontFamily.sansLight,
    fontSize: fontSize.sm,
    lineHeight: 20,
  },
  button: {
    fontFamily: fontFamily.sansBold,
    fontSize: fontSize.md,
    lineHeight: 24,
  },
});

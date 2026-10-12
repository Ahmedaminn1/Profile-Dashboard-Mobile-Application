import { Text, StyleSheet } from "react-native";
import React from "react";
import { fontFamily, fontSize } from "@/theme/typography";
import { spacing } from "@/theme/spacing";
import { useTheme } from "@/context/ThemeContext";

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
    fontSize: spacing.xl,
    fontFamily: fontFamily.sans,
    textAlign: "right",
    writingDirection: "rtl",
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

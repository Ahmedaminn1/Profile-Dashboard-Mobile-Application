import { Pressable, StyleSheet } from "react-native";
import AppText from "../AppText";
import { radius, spacing } from "@/theme/spacing";
import { useTheme } from "@/context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";

interface AppButtonProps {
  title: string;
  variant?: "primary" | "outlined" | "danger" | "success" | "warning";
  style?: any;
  onPress?: () => void;
  color?: string;
  icon?: any;
}

export default function AppButton({
  title,
  variant = "primary",
  style,
  onPress,
  icon,
}: AppButtonProps) {
  const { themeColors } = useTheme();

  const textColorMap: Record<Exclude<AppButtonProps["variant"], undefined>, string> = {
    primary: "#FFFFFF",
    outlined: themeColors.text,
    danger: themeColors.danger,
    success: themeColors.success,
    warning: themeColors.warning,
  };

  const variantStyles = {
    primary: {
      backgroundColor: themeColors.primary,
      borderColor: themeColors.primary,
      borderWidth: 1,
    },
    outlined: {
      backgroundColor: themeColors.surface,
      borderWidth: 1,
      borderColor: themeColors.border,
    },
    danger: {
      backgroundColor: themeColors.surface,
      borderColor: themeColors.danger,
      borderWidth: 1,
    },
    success: {
      backgroundColor: themeColors.surface,
      borderColor: themeColors.success,
      borderWidth: 1,
    },
    warning: {
      backgroundColor: themeColors.surface,
      borderColor: themeColors.warning,
      borderWidth: 1,
    },
  };

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }: { pressed: boolean }) => [
        styles.base,
        variantStyles[variant],
        style,
        { opacity: pressed ? 0.85 : 1 },
      ]}
    >
      <AppText variant="button" style={{ color: textColorMap[variant] }}>
        {title}
      </AppText>
      {icon && <Ionicons name={icon} size={20} color={textColorMap[variant]} />}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: radius.lg,
    flexDirection: "row",
    gap: spacing.sm,
    justifyContent: "center",
    alignItems: "center",
    minHeight: 46,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
});

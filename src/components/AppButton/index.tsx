import { Pressable, StyleSheet } from "react-native";
import AppText from "../AppText";
import { spacing } from "@/theme/spacing";
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
    outlined: themeColors.primary,
    danger: themeColors.danger,
    success: themeColors.success,
    warning: themeColors.warning,
  };

  const variantStyles = {
    primary: {
      backgroundColor: themeColors.primary,
    },
    outlined: {
      backgroundColor: themeColors.background,
      borderWidth: 2,
      borderColor: themeColors.primary,
    },
    danger: {
      backgroundColor: themeColors.background,
      borderColor: themeColors.danger,
      borderWidth: 2,
    },
    success: {
      backgroundColor: themeColors.background,
      borderColor: themeColors.success,
      borderWidth: 2,
    },
    warning: {
      backgroundColor: themeColors.background,
      borderColor: themeColors.warning,
      borderWidth: 2,
    },
  };

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }: { pressed: boolean }) => [
        styles.base,
        variantStyles[variant],
        style,
        { opacity: pressed ? 0.8 : 1 },
      ]}
    >
      <AppText variant="button" style={{ color: textColorMap[variant] }}>
        {title}
      </AppText>
      {icon && <Ionicons name={icon} size={24} color={textColorMap[variant]} />}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: 18,
    flexDirection: "row",
    gap: spacing.sm,
    justifyContent: "center",
    alignItems: "center",
    minHeight: 58,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.sm,
  },
});

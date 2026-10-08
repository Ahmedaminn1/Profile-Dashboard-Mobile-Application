import { Pressable, StyleSheet } from "react-native";
import AppText from "../AppText";
import { spacing } from "@/theme/spacing";
import { colors } from "@/theme/colors";
import { Ionicons } from "@expo/vector-icons";

interface AppButtonProps {
  title: string;
  variant?: "primary" | "outlined" | "danger"|"success"|"warning";
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
  if (variant === undefined) {
    throw new Error("AppButton: variant is required");
  }
  const textColorMap: Record<Exclude<AppButtonProps["variant"], undefined>, string> = {
    primary:  colors.light.background,
    outlined: colors.light.primary,
    danger:   colors.light.danger,
    success:  colors.light.success,
    warning:  colors.light.warning,
  };
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }: { pressed: boolean }) => ({
        ...styles.base,
        ...(variant === "primary" && styles.primary),
        ...(variant === "outlined" && styles.outlined),
        ...(variant === "danger" && styles.danger),
        ...(variant === "success" && styles.success),
        ...(variant === "warning" && styles.warning),
        ...(style as any),
        opacity: pressed ? 0.8 : 1,
      })}>
      <AppText variant="button"style={{ color: textColorMap[variant] }}>
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
  primary: {
    backgroundColor: colors.light.primary,
  },
  outlined: {
    backgroundColor: colors.light.background,
    borderWidth: 2,
    borderColor: colors.light.primary,
  },
  danger: {
    backgroundColor: colors.light.background,
    borderColor: colors.light.danger,
    borderWidth: 2,
  },
  success: {
    backgroundColor: colors.light.background,
    borderColor: colors.light.success,
    borderWidth: 2,
  },
  warning: {
    backgroundColor: colors.light.background,
    borderColor: colors.light.warning,
    borderWidth: 2,
  },
});

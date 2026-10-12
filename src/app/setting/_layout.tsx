import { Stack } from "expo-router";
import { useTheme } from "@/context/ThemeContext";
import { fontFamily, fontSize } from "@/theme/typography";

export default function SettingLayout() {
  const { themeColors } = useTheme();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: themeColors.surfaceRaised },
        animation: "slide_from_left",
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="account" />
      <Stack.Screen name="notifications" />
      <Stack.Screen name="privacy" />
      <Stack.Screen name="help" />
    </Stack>
  );
}

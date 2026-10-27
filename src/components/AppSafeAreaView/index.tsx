import { StatusBar, StatusBarStyle, StyleProp, StyleSheet, ViewStyle } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@/context/ThemeContext";

interface AppSafeAreaProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  barStyle?: StatusBarStyle;
}

export default function AppSafeArea({
  children,
  style,
  barStyle,
}: AppSafeAreaProps) {
  const { themeColors, isDark } = useTheme();
  const currentBarStyle = barStyle ?? (isDark ? "light-content" : "dark-content");

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: themeColors.surfaceRaised },
        style,
      ]}
    >
      <StatusBar barStyle={currentBarStyle} />
      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

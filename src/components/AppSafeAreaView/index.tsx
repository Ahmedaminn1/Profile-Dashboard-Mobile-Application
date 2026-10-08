import { StatusBar, StatusBarStyle, StyleSheet, ViewStyle } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { spacing } from "@/theme/spacing";
import { colors } from "@/theme/colors";

interface AppSafeAreaProps {
  children: React.ReactNode;
  style?: ViewStyle;
  barStyle?: StatusBarStyle;
}

export default function AppSafeArea({
  children,
  style,
  barStyle = "dark-content",
}: AppSafeAreaProps) {
  return (
    <SafeAreaView style={[styles.container, style]}>
      <StatusBar barStyle={barStyle} />
      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light.surfaceRaised,
  },
});

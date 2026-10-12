import { View, Image, StyleSheet } from "react-native";
import React from "react";
import AppText from "../AppText";
import { useTheme } from "@/context/ThemeContext";

interface AvatarProps {
  uri: string;
  size?: number;
  style?: any;
  userName: string;
}

export default function Avatar({
  uri,
  size = 112,
  style,
  userName,
}: AvatarProps) {
  const { themeColors } = useTheme();

  return (
    <View
      style={[
        styles.base,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: themeColors.background,
          borderColor: themeColors.border,
        },
        style,
      ]}
    >
      {uri ? (
        <Image source={{ uri }} style={styles.image} />
      ) : (
        <AppText
          variant="title"
          style={[styles.initials, { color: themeColors.primary }]}
        >
          {userName.substring(0, 2).toUpperCase()}
        </AppText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    overflow: "hidden",
    borderWidth: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  initials: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    textAlignVertical: "center",
    writingDirection: "rtl",
  },
});

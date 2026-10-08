import { View, Image, StyleSheet } from "react-native";
import React from "react";
import { radius } from "@/theme/spacing";
import { colors } from "@/theme/colors";
import AppText from "../AppText";

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
  return (
    <View
      style={[
        styles.base,
        { width: size, height: size, borderRadius: size / 2 },
        style,
      ]}
    >
      {uri ? (
        <Image source={{ uri }} style={styles.image} />
      ) : (
        <AppText variant="title" style={styles.initials}>
          {userName.substring(0, 2).toUpperCase()}
        </AppText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    overflow: "hidden",
    backgroundColor: colors.light.background,
    borderColor: colors.light.border,
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
    color: colors.light.primary,
    textAlign: "center",
    textAlignVertical: "center",
    writingDirection: "rtl",
  },
});

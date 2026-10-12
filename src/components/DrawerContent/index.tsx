import { View, StyleSheet, Linking } from "react-native";
import { DrawerContentScrollView, DrawerItemList } from "expo-router/drawer";
import { spacing } from "@/theme/spacing";
import Avatar from "../Avatar";
import AppText from "../AppText";
import AppButton from "../AppButton";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/context/ThemeContext";

export const CustomDrawerContent = (props: any) => {
  const { themeColors } = useTheme();
  const AvatarURL =
    "https://6ac3a452ae1f22aea6d19b75.imgix.net/sandbox/ahmed%20amin%20pic.jpeg?auto=compress";

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={[
        styles.container,
        { backgroundColor: themeColors.background },
      ]}
    >
      <View style={styles.profile}>
        <Avatar size={124} userName="Ahmed Amin" uri={AvatarURL} />
        <AppText variant="title">أحمد أمين</AppText>
        <AppText variant="body">مهندس برمجيات</AppText>
        <AppText variant="caption">القاهرة، مصر</AppText>
      </View>

      {/* Drawer Items with Icons */}
      <DrawerItemList {...props} />

      {/* Footer */}
      <View
        style={[
          styles.footer,
          { borderTopColor: themeColors.border },
        ]}
      >
        <AppButton
          title="تسجيل الخروج"
          variant="danger"
          onPress={() => {}}
          icon="log-out-outline"
        />
        <AppText
          variant="caption"
          style={{
            color: themeColors.textSecondary,
            textAlign: "center",
            marginTop: spacing.xl,
            marginBottom: spacing.xl,
          }}
        >
          @2026 جميع الحقوق محفوظة
        </AppText>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            gap: spacing.xl,
          }}
        >
          <Ionicons
            name="logo-github"
            size={24}
            color={themeColors.textSecondary}
            onPress={() => Linking.openURL("https://github.com/Ahmedaminn1")}
          />
          <Ionicons
            name="logo-linkedin"
            size={24}
            color={themeColors.textSecondary}
            onPress={() =>
              Linking.openURL("https://www.linkedin.com/in/ahmed-aminn/")
            }
          />
          <Ionicons
            name="logo-instagram"
            size={24}
            color={themeColors.textSecondary}
            onPress={() => Linking.openURL("https://www.instagram.com/")}
          />
        </View>
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profile: {
    alignItems: "flex-end",
    gap: spacing.sm,
    marginBottom: spacing.xl,
    marginTop: spacing.lg,
  },
  footer: {
    borderTopWidth: 1,
    paddingTop: spacing.lg,
    marginTop: "auto",
  },
});

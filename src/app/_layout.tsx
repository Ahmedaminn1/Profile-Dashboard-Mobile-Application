import "@/i18n/i18n";
import { fontAssets, fontFamily, fontSize } from "@/theme/typography";
import { useFonts } from "expo-font";
import { ActivityIndicator, View, StyleSheet } from "react-native";
import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AppText from "@/components/AppText";
import { Ionicons } from "@expo/vector-icons";
import { spacing } from "@/theme/spacing";
import { CustomDrawerContent } from "@/components/DrawerContent";
import { ThemeProvider, useTheme } from "@/context/ThemeContext";
import { useTranslation } from "react-i18next";
import { SkillsProvider } from "@/context/SkillsContext";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import LoginScreen from "@/components/LoginScreen";

function AppDrawer() {
  const { themeColors } = useTheme();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  return (
    <Drawer drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerType: "slide",
        drawerPosition: isRTL ? "right" : "left",
        drawerActiveTintColor: themeColors.primary,
        drawerInactiveTintColor: themeColors.text,
        drawerStyle: {
          backgroundColor: themeColors.background,
        },
        sceneStyle: {
          backgroundColor: themeColors.surfaceRaised,
        },
        drawerLabelStyle: {
          fontFamily: fontFamily.sansExtraBold,
          fontSize: fontSize.lg,
        },
        headerTitleStyle: {
          fontFamily: fontFamily.sansBold,
        },
        headerTitleAlign: "center",
      }}>

      <Drawer.Screen name="index" options={{
        title: t("navigation.home"),
        drawerLabel: ({ color }) => (
          <View style={[styles.drawerItem, { flexDirection: isRTL ? "row-reverse" : "row" },]}>
            <Ionicons name="grid-outline" size={28} color={color} />
            <AppText variant="subTitle" style={{ color }}>
              {t("navigation.dashboard")}
            </AppText>
          </View>
        ),
      }} />

      <Drawer.Screen name="skills" options={{
        title: t("navigation.skills"),
        drawerLabel: ({ color }) => (
          <View style={[styles.drawerItem, { flexDirection: isRTL ? "row-reverse" : "row" },]}>
            <Ionicons name="code-slash" size={28} color={color} />
            <AppText variant="subTitle" style={{ color }}>
              {t("navigation.skills")}
            </AppText>
          </View>
        ),
      }} />

      <Drawer.Screen name="setting" options={{
        title: t("navigation.settings"),
        drawerLabel: ({ color }) => (
          <View style={[styles.drawerItem, { flexDirection: isRTL ? "row-reverse" : "row" },]}>
            <Ionicons name="settings-outline" size={28} color={color} />
            <AppText variant="subTitle" style={{ color }}>
              {t("navigation.settings")}
            </AppText>
          </View>
        ),
      }} />

    </Drawer>
  );
}

function RootContent() {
  const { isAuthenticated, isLoading } = useAuth();
  console.log(isAuthenticated);
  if (isLoading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#2563EB" />
      </View>
    );
  }

  if (isAuthenticated) {
    return (
      <SkillsProvider>
        <AppDrawer />
      </SkillsProvider>
    );
  }

  return <LoginScreen />;
}

export default function RootLayout() {
  const [loaded] = useFonts(fontAssets);

  if (!loaded) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#2563EB" />
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider>
        <AuthProvider>
          <RootContent />
        </AuthProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  drawerItem: {
    alignItems: "center",
    gap: spacing.md,
    minHeight: 50,
    paddingHorizontal: spacing.sm,
  },
});

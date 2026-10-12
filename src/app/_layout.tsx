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

function AppDrawer() {
  const { themeColors } = useTheme();

  return (
    <Drawer
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerType: "slide",
        drawerPosition: "right",
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
      }}
    >
      <Drawer.Screen
        name="index"
        options={{
          title: "الرئيسية",
          drawerLabel: ({ color }) => (
            <View style={styles.drawerItem}>
              <AppText variant="subTitle" style={{ color }}>
                لوحة التحكم
              </AppText>
              <Ionicons
                name="grid-outline"
                size={32}
                color={themeColors.primary}
              />
            </View>
          ),
        }}
      />

      <Drawer.Screen
        name="skills"
        options={{
          title: "المهارات",
          drawerLabel: ({ color }) => (
            <View style={styles.drawerItem}>
              <AppText variant="subTitle" style={{ color }}>
                المهارات
              </AppText>
              <Ionicons
                name="code-slash"
                size={32}
                color={themeColors.primary}
              />
            </View>
          ),
        }}
      />

      <Drawer.Screen
        name="setting"
        options={{
          title: "الإعدادات",
          drawerLabel: ({ color }) => (
            <View style={styles.drawerItem}>
              <AppText variant="subTitle" style={{ color }}>
                الإعدادات
              </AppText>
              <Ionicons
                name="settings-outline"
                size={32}
                color={themeColors.primary}
              />
            </View>
          ),
        }}
      />
    </Drawer>
  );
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
    <ThemeProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <AppDrawer />
      </GestureHandlerRootView>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  drawerItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    justifyContent: "flex-end",
    minHeight: 55,
  },
});

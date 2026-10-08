import { Stack } from "expo-router";
import { fontAssets, fontFamily, fontSize } from "@/theme/typography";
import { useFonts } from "expo-font";
import { ActivityIndicator, View, StyleSheet } from "react-native";
import { colors } from "@/theme/colors";
import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AppText from "@/components/AppText";
import { Ionicons } from "@expo/vector-icons";
import { spacing } from "@/theme/spacing";
import { CustomDrawerContent } from "@/components/DrawerContent";

export default function RootLayout() {
  const [loaded] = useFonts(fontAssets);
  if (!loaded)
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={colors.light.primary} />
      </View>
    );
  return (
    // <Stack>
    //   <Stack.Screen name="index" options={{ title: "Home" }} />
    //   <Stack.Screen name="skills/index" options={{ title: "Skills" }} />
    //   <Stack.Screen name="setting/index" options={{ title: "Setting" }} />
    // </Stack>

    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          headerShown: false,
          drawerType: "slide",
          drawerPosition: "right",
          drawerActiveTintColor: colors.light.primary,
          drawerInactiveTintColor: colors.light.text,
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
            drawerLabel: ({ color }) => {
              return (
                <View style={styles.drawerItem}>
                  <AppText variant="subTitle" style={{ color }}>
                    لوحة التحكم
                  </AppText>
                  <Ionicons
                    name="grid-outline"
                    size={32}
                    color={colors.light.primary}
                  />
                </View>
              );
            },
          }}
        />

        <Drawer.Screen
          name="skills"
          options={{
            title: "المهارات",
            drawerLabel: ({ color }) => {
              return (
                <View style={styles.drawerItem}>
                  <AppText variant="subTitle" style={{ color }}>
                    المهارات
                  </AppText>
                  <Ionicons
                    name="code-slash"
                    size={32}
                    color={colors.light.primary}
                  />
                </View>
              );
            },
          }}
        />
        <Drawer.Screen
          name="setting"
          options={{
            title: "الإعدادات",
            drawerLabel: ({ color }) => {
              return (
                <View style={styles.drawerItem}>
                  <AppText variant="subTitle" style={{ color }}>
                    الإعدادات
                  </AppText>
                  <Ionicons
                    name="settings-outline"
                    size={32}
                    color={colors.light.primary}
                  />
                </View>
              );
            },
          }}
        />
      </Drawer>
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
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    justifyContent: "flex-end",
    minHeight: 55,
  },
});

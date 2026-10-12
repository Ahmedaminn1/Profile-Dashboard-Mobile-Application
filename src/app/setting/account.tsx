import React, { useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Pressable,
  TextInput,
  Alert,
} from "react-native";
import AppSafeAreaView from "@/components/AppSafeAreaView";
import AppText from "@/components/AppText";
import AppCard from "@/components/AppCard";
import AppButton from "@/components/AppButton";
import Avatar from "@/components/Avatar";
import SettingScreenHeader from "@/components/SettingScreenHeader";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/context/ThemeContext";
import { spacing } from "@/theme/spacing";
import { fontFamily, fontSize } from "@/theme/typography";

const AvatarURL =
  "https://6ac3a452ae1f22aea6d19b75.imgix.net/sandbox/ahmed%20amin%20pic.jpeg?auto=compress";

// ─── Editable Row ──────────────────────────────────────────────────────────────
interface EditableRowProps {
  label: string;
  value: string;
  icon: React.ComponentProps<typeof Ionicons>["name"];
  isEditing: boolean;
  onChangeText: (text: string) => void;
  keyboardType?: "default" | "email-address" | "phone-pad" | "url";
}

function EditableRow({
  label,
  value,
  icon,
  isEditing,
  onChangeText,
  keyboardType = "default",
}: EditableRowProps) {
  const { themeColors } = useTheme();

  return (
    <View style={[styles.infoRow, { borderBottomColor: themeColors.border }]}>
      <View style={styles.infoLeft}>
        {isEditing ? (
          <TextInput
            value={value}
            onChangeText={onChangeText}
            keyboardType={keyboardType}
            style={[
              styles.input,
              {
                color: themeColors.text,
                borderColor: themeColors.primary,
                backgroundColor: themeColors.surfaceRaised,
              },
            ]}
            placeholderTextColor={themeColors.textSecondary}
            textAlign="left"
          />
        ) : (
          <AppText variant="body" style={{ color: themeColors.textSecondary }}>
            {value}
          </AppText>
        )}
      </View>
      <View style={styles.infoRight}>
        <AppText
          variant="body"
          style={{ color: themeColors.text, fontFamily: fontFamily.sansBold }}
        >
          {label}
        </AppText>
        <View
          style={[
            styles.infoIcon,
            {
              backgroundColor: isEditing
                ? themeColors.primary
                : themeColors.primarySubtle,
            },
          ]}
        >
          <Ionicons
            name={isEditing ? "create-outline" : icon}
            size={18}
            color={isEditing ? "#fff" : themeColors.primary}
          />
        </View>
      </View>
    </View>
  );
}

// ─── Account Screen ────────────────────────────────────────────────────────────
export default function AccountScreen() {
  const { themeColors } = useTheme();
  const [isEditing, setIsEditing] = useState(false);

  // Personal Info State
  const [fullName, setFullName] = useState("أحمد أمين");
  const [jobTitle, setJobTitle] = useState("مهندس برمجيات");
  const [city, setCity] = useState("القاهرة، مصر");

  // Contact Info State
  const [email, setEmail] = useState("ahmedamin372002@gmail.com");
  const [phone, setPhone] = useState("+20 1068594037");
  const [github, setGithub] = useState("Ahmedaminn1");

  // Save local snapshots to revert on cancel
  const [snapshot, setSnapshot] = useState({
    fullName,
    jobTitle,
    city,
    email,
    phone,
    github,
  });

  const handleEdit = () => {
    setSnapshot({ fullName, jobTitle, city, email, phone, github });
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    Alert.alert("✅ تم الحفظ", "تم تحديث بياناتك بنجاح");
  };

  const handleCancel = () => {
    setFullName(snapshot.fullName);
    setJobTitle(snapshot.jobTitle);
    setCity(snapshot.city);
    setEmail(snapshot.email);
    setPhone(snapshot.phone);
    setGithub(snapshot.github);
    setIsEditing(false);
  };

  return (
    <AppSafeAreaView>
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <SettingScreenHeader title="الحساب" icon="person-outline" />

        {/* Avatar Section */}
        <View style={styles.avatarSection}>
          <Avatar size={100} userName="Ahmed Amin" uri={AvatarURL} />
          <View style={styles.avatarInfo}>
            <AppText variant="title">{fullName}</AppText>
            <AppText variant="body" style={{ color: themeColors.textSecondary }}>
              {jobTitle}
            </AppText>
          </View>
          <Pressable
            style={[styles.editAvatarBtn, { backgroundColor: themeColors.primary }]}
          >
            <Ionicons name="camera-outline" size={18} color="#fff" />
          </Pressable>
        </View>

        {/* Personal Info Card */}
        <AppCard>
          <AppText
            variant="subTitle"
            style={[styles.sectionTitle, { color: themeColors.primary }]}
          >
            البيانات الشخصية
          </AppText>
          <EditableRow
            label="الاسم الكامل"
            value={fullName}
            icon="person-outline"
            isEditing={isEditing}
            onChangeText={setFullName}
          />
          <EditableRow
            label="المسمى الوظيفي"
            value={jobTitle}
            icon="briefcase-outline"
            isEditing={isEditing}
            onChangeText={setJobTitle}
          />
          <EditableRow
            label="المدينة"
            value={city}
            icon="location-outline"
            isEditing={isEditing}
            onChangeText={setCity}
          />
        </AppCard>

        {/* Contact Info Card */}
        <AppCard>
          <AppText
            variant="subTitle"
            style={[styles.sectionTitle, { color: themeColors.primary }]}
          >
            معلومات التواصل
          </AppText>
          <EditableRow
            label="البريد الإلكتروني"
            value={email}
            icon="mail-outline"
            isEditing={isEditing}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <EditableRow
            label="رقم الهاتف"
            value={phone}
            icon="call-outline"
            isEditing={isEditing}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />
          <EditableRow
            label="GitHub"
            value={github}
            icon="logo-github"
            isEditing={isEditing}
            onChangeText={setGithub}
          />
        </AppCard>

        {/* Action Buttons */}
        {isEditing ? (
          <View style={styles.actionRow}>
            <AppButton
              title="حفظ التغييرات"
              icon="checkmark-outline"
              onPress={handleSave}
              style={{ flex: 1 }}
            />
            <AppButton
              title="إلغاء"
              variant="outlined"
              icon="close-outline"
              onPress={handleCancel}
              style={{ flex: 1 }}
            />
          </View>
        ) : (
          <AppButton
            title="تعديل البيانات"
            icon="create-outline"
            onPress={handleEdit}
            style={{ marginTop: spacing.sm }}
          />
        )}
      </ScrollView>
    </AppSafeAreaView>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: spacing.md,
    paddingBottom: spacing.xl,
    gap: spacing.md,
  },
  avatarSection: {
    alignItems: "center",
    marginBottom: spacing.md,
    gap: spacing.sm,
    position: "relative",
  },
  avatarInfo: {
    alignItems: "center",
    gap: spacing.xs,
  },
  editAvatarBtn: {
    position: "absolute",
    top: 68,
    right: "35%",
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  sectionTitle: {
    marginBottom: spacing.sm,
    fontFamily: fontFamily.sansExtraBold,
  },
  infoRow: {
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    gap: spacing.sm,
  },
  infoRight: {
    flexDirection: "row-reverse",
    alignItems: "center",
    gap: spacing.sm,
  },
  infoLeft: {
    flex: 1,
    alignItems: "flex-start",
  },
  infoIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    flex: 1,
    width: "100%",
    fontSize: 14,
    fontFamily: fontFamily.sans,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    minHeight: 36,
  },
  actionRow: {
    flexDirection: "row-reverse",
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
});

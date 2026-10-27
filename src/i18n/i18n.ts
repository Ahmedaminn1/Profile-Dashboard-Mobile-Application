import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { enTranslations } from "./locales/en";
import { arTranslations } from "./locales/ar";

export const defaultNS = "translation";
export const resources = {
  ar: {
    translation: arTranslations,
  },
  en: {
    translation: enTranslations,
  },
} as const;

i18n.use(initReactI18next).init({
  compatibilityJSON: "v4",
  resources,
  lng: "ar",
  fallbackLng: "ar",
  interpolation: {
    escapeValue: false,
  },
});

export const LANGUAGE_STORAGE_KEY = "@app_language";

export async function loadSavedLanguage() {
  try {
    const savedLanguage = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (savedLanguage === "ar" || savedLanguage === "en") {
      if (i18n.language !== savedLanguage) {
        await i18n.changeLanguage(savedLanguage);
      }
      return savedLanguage;
    }
    await i18n.changeLanguage("ar");
    return "ar";
  } catch (error) {
    console.warn("Failed to load saved language in i18n:", error);
  }
}

export const toggleLanguage = async () => {
  const nextLang = i18n.language === "ar" ? "en" : "ar";
  await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, nextLang);
  await i18n.changeLanguage(nextLang);
  return nextLang;
};


// Initialize saved language immediately
loadSavedLanguage();

export default i18n;

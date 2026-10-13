import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors } from '@/theme/colors';

// ─── Types ───────────────────────────────────────────────────────────────────

export type ThemeMode = 'light' | 'dark' | 'system';
export type ResolvedTheme = 'light' | 'dark';
export type ThemeColors = typeof colors.light | typeof colors.dark;

export interface ThemeContextValue {
  theme: ThemeMode;
  resolvedTheme: ResolvedTheme;
  isDark: boolean;
  themeColors: ThemeColors;
  toggleTheme: (mode: ThemeMode) => Promise<void>;
  toggleLightDark: () => void;
}

// ─── Helpers & Constants ─────────────────────────────────────────────────────

const STORAGE_KEY = '@app_theme_mode';

const isThemeMode = (value: unknown): value is ThemeMode =>
  value === 'light' || value === 'dark' || value === 'system';

// ─── Context ─────────────────────────────────────────────────────────────────

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

// ─── Provider ────────────────────────────────────────────────────────────────

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemScheme = useColorScheme();
  const [theme, setTheme] = useState<ThemeMode>('system');

  // Load saved theme on mount
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (isThemeMode(stored)) {
          setTheme(stored);
        }
      } catch (error) {
        console.warn('Failed to load theme preference:', error);
      }
    };

    loadTheme();
  }, []);

  // Change theme and persist selection
  const toggleTheme = useCallback(async (mode: ThemeMode) => {
    setTheme(mode);
    try {
      await AsyncStorage.setItem(STORAGE_KEY, mode);
    } catch (error) {
      console.warn('Failed to persist theme preference:', error);
    }
  }, []);

  // Compute active appearance
  const resolvedTheme: ResolvedTheme = useMemo(() => {
    if (theme === 'system') {
      return systemScheme === 'dark' ? 'dark' : 'light';
    }
    return theme;
  }, [theme, systemScheme]);

  const isDark = resolvedTheme === 'dark';
  const themeColors = colors[resolvedTheme];

  // Quick switch between light and dark
  const toggleLightDark = useCallback(() => {
    const nextMode: ThemeMode = resolvedTheme === 'dark' ? 'light' : 'dark';
    toggleTheme(nextMode);
  }, [resolvedTheme, toggleTheme]);

  // Memoize value to avoid unnecessary re-renders in consumers
  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      resolvedTheme,
      isDark,
      themeColors,
      toggleTheme,
      toggleLightDark,
    }),
    [theme, resolvedTheme, isDark, themeColors, toggleTheme, toggleLightDark]
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

// ─── Hook ────────────────────────────────────────────────────────────────────

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used inside <ThemeProvider>');
  }
  return ctx;
}

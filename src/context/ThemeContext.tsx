import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors } from '@/theme/colors';

export type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeContextValue {
  theme: ThemeMode;
  resolvedTheme: 'light' | 'dark';
  themeColors: typeof colors.light;
  toggleTheme: (mode: ThemeMode) => void;
}

const STORAGE_KEY = '@app_theme_mode';

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemScheme = useColorScheme();
  const [theme, setTheme] = useState<ThemeMode>('system');

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((stored) => {
      if (stored === 'light' || stored === 'dark' || stored === 'system') {
        setTheme(stored);
      }
    });
  }, []);

  const toggleTheme = useCallback(async (mode: ThemeMode) => {
    setTheme(mode);
    await AsyncStorage.setItem(STORAGE_KEY, mode);
  }, []);

  const resolvedTheme: 'light' | 'dark' =
    theme === 'system' ? (systemScheme === 'dark' ? 'dark' : 'light') : theme;

  const themeColors = colors[resolvedTheme];

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, themeColors, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used inside <ThemeProvider>');
  }
  return ctx;
}

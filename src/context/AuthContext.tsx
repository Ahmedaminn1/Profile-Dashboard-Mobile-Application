import * as SecureStore from "expo-secure-store";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";
import { authService } from "@/services/authService";

interface Props {
  children: React.ReactNode;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface AuthSession {
  token: string | null;
  user: User | null;
}

export interface AuthResponse {
  success: boolean;
  message?: string;
}

export interface AuthActions {
  authSession: AuthSession | null;
  isAuthenticated: boolean;
  isSubmitting: boolean;
  isLoading: boolean;
  login: (userName: string, password: string) => Promise<AuthResponse>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthActions | null>(null);

export const AuthProvider = ({ children }: Props) => {
  const [authSession, setAuthSession] = useState<AuthSession | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const loadSession = async () => {
    try {
      const savedSession = await SecureStore.getItemAsync("authSession");
      if (savedSession) {
        setIsAuthenticated(true);
        setAuthSession(JSON.parse(savedSession));
      }
    } catch (error) {
      console.error("Error loading session:", error);
      await SecureStore.deleteItemAsync("authSession");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadSession();
  }, []);

  const login = async (
    userName: string,
    password: string,
  ): Promise<AuthResponse> => {
    setIsSubmitting(true);
    try {
      const data = await authService.login({
        username: userName,
        password: password,
      });

      // When User Validated
      const user: User = {
        id: String(data.id),
        name:
          [data.firstName, data.lastName].filter(Boolean).join(" ") ||
          data.username ||
          "User",
        email: data.email,
        avatar: data.image,
      };

      const authSession: AuthSession = {
        token: data.accessToken,
        user,
      };

      await SecureStore.setItemAsync(
        "authSession",
        JSON.stringify(authSession),
      );
      setAuthSession(authSession);
      setIsAuthenticated(true);

      return {
        success: true,
      };
    } catch (error: any) {
      console.error("Error logging in:", error);
      return {
        success: false,
        message:
          error?.message ||
          "حدث خطأ في الاتصال بالسيرفر. يرجى التحقق من اتصال الإنترنت.",
      };
    } finally {
      setIsSubmitting(false);
    }
  };

  const logout = async () => {
    try {
      await SecureStore.deleteItemAsync("authSession");
      setAuthSession(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const value = useMemo(
    () => ({
      authSession,
      isAuthenticated,
      isSubmitting,
      isLoading,
      login,
      logout,
    }),
    [authSession, isAuthenticated, isSubmitting, isLoading, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

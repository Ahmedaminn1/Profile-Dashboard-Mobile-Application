export interface LoginCredentials {
  username: string;
  password: string;
  expiresInMins?: number;
}

export interface LoginApiResponse {
  id: number;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  gender?: string;
  image?: string;
  accessToken: string;
  refreshToken?: string;
  message?: string;
}

const BASE_URL = "https://dummyjson.com";

export const authService = {
  async login(credentials: LoginCredentials): Promise<LoginApiResponse> {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: credentials.username.trim(),
        password: credentials.password,
        expiresInMins: credentials.expiresInMins ?? 60,
      }),
    });

    const data = await response.json();

    if (!response.ok || !data?.accessToken) {
      const errorMessage =
        data?.message === "Invalid credentials"
          ? "اسم المستخدم أو كلمة المرور غير صحيحة"
          : data?.message || "فشل تسجيل الدخول، يرجى المحاولة مرة أخرى";
      throw new Error(errorMessage);
    }

    return data as LoginApiResponse;
  },

};

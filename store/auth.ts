import { create } from "zustand";
import {
  login,
  logout,
  register,
  resendEmail,
  resetPassword,
  sendForgotPasswordEmail,
  verifyCode,
  verifyEmail,
  fetchUser,
} from "@/lib/auth";
import { NewUser, updateUser, User } from "@/lib/data";
import { localDB } from "@/lib/localDB";
import { setCookie, deleteCookie } from "cookies-next/client";

// interface User {
//   id: string;
//   email: string;
//   name?: string;
// }

interface AuthState {
  user: User | null;
  loading: boolean;
  token: string | null;
  login: (email: string, password: string) => Promise<User>;
  register: (user: NewUser) => Promise<boolean>;
  verifyEmail: (data: { code: string; email: string }) => Promise<boolean>;
  logout: () => Promise<void>;
  resendEmail: (email: string) => Promise<boolean>;
  sendForgotPasswordEmail: (email: string) => Promise<boolean>;
  resetPassword: (
    code: string,
    email: string,
    password: string
  ) => Promise<boolean>;
  verifyCode: (email: string, code: string) => Promise<boolean>;
  currentUser: () => Promise<User>;
}

export const useAuth = create<AuthState>((set) => ({
  user: null,
  token: null,
  loading: false,

  currentUser: async () => {
    try {
      set({ loading: true });
      const { data } = await fetchUser();
      set({ user: data });
      updateUser(data);
      set({ loading: false });
      return data;
    } catch (e) {
      set({ user: null });
      set({ loading: false });
      throw e;
    }
  },

  login: async (email, password) => {
    const { data } = await login(email, password);
    localDB.set("token", data.token);
    setCookie("mb_token", data.token, {
      maxAge: 30 * 24 * 60 * 60, // 30 days
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });
    set({ user: data.user, token: data.token });
    updateUser(data.user);
    return data.user;
  },

  register: async (data: NewUser) => {
    const res = await register(data);
    return res?.success;
  },

  verifyEmail: async (data: { code: string; email: string }) => {
    const res = await verifyEmail(data);
    return res?.success;
  },

  resendEmail: async (email: string) => {
    const res = await resendEmail(email);
    return res?.success;
  },

  sendForgotPasswordEmail: async (email: string) => {
    const res = await sendForgotPasswordEmail(email);
    return res?.success;
  },

  resetPassword: async (code: string, email: string, password: string) => {
    const res = await resetPassword(code, email, password);
    return res?.success;
  },

  verifyCode: async (email: string, code: string) => {
    const res = await verifyCode(email, code);
    return res?.success;
  },

  logout: async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout API error:", error);
      // Continue with local cleanup even if API call fails
    } finally {
      // Always clear local data regardless of API success/failure
      localDB.clear(); // Clear all local data, not just token
      deleteCookie("mb_token"); // Ensure cookie is deleted
      set({ user: null, token: null });
      updateUser(null);
    }
  },
}));

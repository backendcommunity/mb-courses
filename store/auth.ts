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
import { NewUser, updateUser } from "@/lib/data";

interface User {
  id: string;
  email: string;
  name?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
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
}

export const useAuth = create<AuthState>((set) => ({
  user: null,
  token: null,

  currentUser: async () => {
    try {
      const { data } = await fetchUser();
      set({ user: data });
      return data;
    } catch (e) {
      set({ user: null });
      throw e;
    }
  },

  login: async (email, password) => {
    const { data } = await login(email, password);
    localStorage.setItem("mb_token", data.token);
    updateUser(data.user);
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
    await logout();
    localStorage.removeItem("mb_token");
    set({ user: null, token: null });
    updateUser(null);
  },
}));

import { fetchUser } from "@/lib/auth";
import { create } from "zustand";

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  level: number;
  xp: number;
  xpToNextLevel: number;
  streak: number;
  joinDate: string;
  title: string;
  badges: Badge[];
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedDate: string;
  rarity: "Common" | "Rare" | "Epic" | "Legendary";
}

interface UserState {
  user: User | null;
}

export const useUser = create<UserState>((set) => ({
  user: null,

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
}));

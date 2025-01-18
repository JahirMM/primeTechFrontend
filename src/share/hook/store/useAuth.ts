import { create } from "zustand";
import { useAuthServer } from "@/share/hook/useAuthServer";

interface AuthState {
  isAuthenticated: boolean;
  initializeAuth: () => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  initializeAuth: async () => {
    const isAuth = await useAuthServer();
    set({ isAuthenticated: isAuth });
  },
  logout: () => {
    set({ isAuthenticated: false });
  },
}));

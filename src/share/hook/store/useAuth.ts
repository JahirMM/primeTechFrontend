import { create } from "zustand";

interface AuthState {
  isAuthenticated: boolean;
  setAuth: (isAuth: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,

  setAuth: (isAuth) => {
    set({ isAuthenticated: isAuth });
  },

  logout: () => {
    set({ isAuthenticated: false });
  },
}));

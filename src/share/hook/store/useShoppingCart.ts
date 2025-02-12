import { create } from "zustand";

interface CartPriceStore {
  prices: number[];
  addPrice: (price: number) => void;
  removePrice: (price: number) => void;
  getTotalPrice: () => number;
  clearPrices: () => void;
}

export const useCartPriceStore = create<CartPriceStore>((set, get) => ({
  prices: [],
  addPrice: (price: number) =>
    set((state) => ({ prices: [...state.prices, price] })),
  removePrice: (price: number) =>
    set((state) => ({
      prices: state.prices.filter((p, index) => index !== state.prices.lastIndexOf(price)),
    })),
  getTotalPrice: () => get().prices.reduce((total, price) => total + price, 0),
  clearPrices: () => set({ prices: [] }),
}));

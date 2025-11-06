import { create } from "zustand";

export const useCartStore = create((set) => ({
  cartItems: {},
    // itemData is an object containing the fields to update
    setCartItems: (itemId, itemData) => set((state) => ({
      cartItems: {
        ...state.cartItems,
        [itemId]: {
            ...state.cartItems[itemId],
            ...itemData
        }
      }
    })),
}));    
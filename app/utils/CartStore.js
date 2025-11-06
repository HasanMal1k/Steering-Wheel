import { create } from "zustand";

export const useCartStore = create((set) => ({
  cartItems: {
    // Hub needs to be configured with proper ProductVariant ID
    // hub: { merchandiseId: 'gid://shopify/ProductVariant/XXXXX', quantity: 1 },
    steeringWheel: { merchandiseId: 'gid://shopify/ProductVariant/42621835477131', quantity: 1 },
    paddles: { merchandiseId: 'gid://shopify/ProductVariant/42632067907723', quantity: 1 },
    frontKnobs: {},
    sideRotary: {},
    protocolBoard: {},
    wiringHarnesses: {},
    hubAdapter: {}
  },
    // itemData is an object containing the fields to update
    setCartItems: (item, itemObj) => set((state) => {
      console.log(`🛒 CartStore: Updating ${item}`, itemObj);
      return {
        cartItems: {
          ...state.cartItems,
          [item]: {
              ...state.cartItems[item],
              ...itemObj
          }
        }
      };
    }),
}));    
import { create } from "zustand";

export const useInventoryStore = create((set) => ({


    // Wiring Harness Data
    wiringHarnessData : null,

    setWiringHarnessData: (value) => set({
        wiringHarnessData: value
    }),

    // Hub Data
    hubData: null,

    setHubData: (value) => set ({
        hubData: value
    }),

    // Hud Adapter Data
    hubAdapterData: null,

    setHubAdapterData: (value) => set ({
        hubAdapterData: value
    }),

    // Protocol Board
    protocolBoardData: null,

    setProtocolBoardData: (value) => set({
        protocolBoardData: value
    }),

    // Steering Wheel
    steeringWheelData: null,

    setSteeringWheelData: (value) => set({
        steeringWheelData: value
    })

}));


export const useProtocolBoardStore = create(set => ({
  protocolBoardsData : {
  S1: { id: 'gid://shopify/ProductVariant/43657637724299', inventory: 0 },
  S2: { id: 'gid://shopify/ProductVariant/43657637757067', inventory: 0 },
  S3: { id: 'gid://shopify/ProductVariant/43657637789835', inventory: 0 },
  S4: { id: 'gid://shopify/ProductVariant/43657637822603', inventory: 0 },
  S4B: { id: 'gid://shopify/ProductVariant/43657637855371', inventory: 0 },
  S5: { id: 'gid://shopify/ProductVariant/43657637888139', inventory: 0 },
  S6: { id: 'gid://shopify/ProductVariant/43657637920907', inventory: 0 },
  S7: { id: 'gid://shopify/ProductVariant/43657637953675', inventory: 0 },
  S8: { id: 'gid://shopify/ProductVariant/43657637986443', inventory: 0 },
  S9: { id: 'gid://shopify/ProductVariant/43657638019211', inventory: 0 },
  S10: { id: 'gid://shopify/ProductVariant/43657638051979', inventory: 0 },
  S11: { id: 'gid://shopify/ProductVariant/43657638084747', inventory: 0 },
  S12: { id: 'gid://shopify/ProductVariant/43657638117515', inventory: 0 },
  S13: { id: 'gid://shopify/ProductVariant/43657638150283', inventory: 0 },
  S14: { id: 'gid://shopify/ProductVariant/43657638183051', inventory: 0 },
  S15: { id: 'gid://shopify/ProductVariant/43657638215819', inventory: 0 },
  S16: { id: 'gid://shopify/ProductVariant/43657638248587', inventory: 0 },
  S17: { id: 'gid://shopify/ProductVariant/43657638281355', inventory: 0 },
  S21: { id: 'gid://shopify/ProductVariant/43657638314123', inventory: 0 },
  S24: { id: 'gid://shopify/ProductVariant/43657638346891', inventory: 0 },
  S25: { id: 'gid://shopify/ProductVariant/43657638379659', inventory: 0 },
  S26: { id: 'gid://shopify/ProductVariant/43657638412427', inventory: 0 },
  S27: { id: 'gid://shopify/ProductVariant/43657638445195', inventory: 0 },
  S28: { id: 'gid://shopify/ProductVariant/43657638477963', inventory: 0 },
  S29: { id: 'gid://shopify/ProductVariant/43657638510731', inventory: 0 },
  S30: { id: 'gid://shopify/ProductVariant/43657638543499', inventory: 0 }
},

setProtocolBoardsData: (key, value) => set((state) => ({
    protocolBoardsData: {
        ...state.protocolBoardsData,
        [key] : {
            ...state.protocolBoardsData[key],
            ...value
        }
    }
}))

}))
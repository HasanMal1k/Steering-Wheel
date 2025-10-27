import { create } from "zustand";
import { sideRotary } from "./InventoryItems";

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

export const useHubAdapterStore = create(set => ({
    hubAdaptersData: {
        B2: {
            id: 'gid://shopify/ProductVariant/43657603252363',
            sku: 'F56H/B2',
            inventory: 0
        },
        B1: {
            id: 'gid://shopify/ProductVariant/43657603285131',
            sku: 'E90H/B1',
            inventory: 0
        },
        'BMW E46': {
            id: 'gid://shopify/ProductVariant/43657603317899',
            sku: 'E46H',
            inventory: 0
        },
        B3: {
            id: 'gid://shopify/ProductVariant/43657603350667',
            sku: 'E183H/B3',
            inventory: 0
        },
        B5: {
            id: 'gid://shopify/ProductVariant/43657603383435',
            sku: '135H/B5',
            inventory: 0
        },
        B6: {
            id: 'gid://shopify/ProductVariant/43657603416203',
            sku: '125H/B6',
            inventory: 0
        },
        B7: {
            id: 'gid://shopify/ProductVariant/43657603448971',
            sku: 'B7',
            inventory: 0
        },
        B8: {
            id: 'gid://shopify/ProductVariant/43657603481739',
            sku: 'B8',
            inventory: 0
        },
        B9: {
            id: 'gid://shopify/ProductVariant/43657603514507',
            sku: '167H/B9',
            inventory: 0
        },
        B10: {
            id: 'gid://shopify/ProductVariant/43657603547275',
            sku: '141/B10',
            inventory: 0
        },
        B11: {
            id: 'gid://shopify/ProductVariant/43657603580043',
            sku: '102H/B11',
            inventory: 0
        },
        B12: {
            id: 'gid://shopify/ProductVariant/43657603612811',
            sku: '175H/B12',
            inventory: 0
        },
        B13: {
            id: 'gid://shopify/ProductVariant/43657603645579',
            sku: 'B13',
            inventory: 0
        }
    },

    setHubAdapterData: (key, value) =>
    set((state) => ({
      hubAdaptersData: {
        ...state.hubAdaptersData,
        [key]: {
          ...state.hubAdaptersData[key],
          ...value,
        },
      },
    })),


}))


export const useWiringHarnessStore = create(set => ({
    wiringHarnessData: {
        X1: {
            value: 'gid://shopify/ProductVariant/43657627009163',
            inventory: 0
        },
        X2: {
            value: 'gid://shopify/ProductVariant/43657627041931',
            inventory: 0
        },
        X3A: {
            value: 'gid://shopify/ProductVariant/43657627074699',
            inventory: 0
        },
        X3B: {
            value: 'gid://shopify/ProductVariant/43657627107467',
            inventory: 0
        },
        X3C: {
            value: 'gid://shopify/ProductVariant/43657627140235',
            inventory: 0
        },
        X4: {
            value: 'gid://shopify/ProductVariant/43657627173003',
            inventory: 0
        },
        X5: {
            value: 'gid://shopify/ProductVariant/43657627205771',
            inventory: 0
        },
        X6: {
            value: 'gid://shopify/ProductVariant/43657627238539',
            inventory: 0
        },
        X7: {
            value: 'gid://shopify/ProductVariant/43657627271307',
            inventory: 0
        },
        X8A: {
            value: 'gid://shopify/ProductVariant/43657627304075',
            inventory: 0
        },
        X9: {
            value: 'gid://shopify/ProductVariant/43657627336843',
            inventory: 0
        },
        X10: {
            value: 'gid://shopify/ProductVariant/43657627369611',
            inventory: 0
        },
        X11: {
            value: 'gid://shopify/ProductVariant/43657627402379',
            inventory: 0
        },
        X13: {
            value: 'gid://shopify/ProductVariant/43657627435147',
            inventory: 0
        },
        X14: {
            value: 'gid://shopify/ProductVariant/43657627467915',
            inventory: 0
        },
        X15: {
            value: 'gid://shopify/ProductVariant/43657627500683',
            inventory: 0
        },
        X16: {
            value: 'gid://shopify/ProductVariant/43657627533451',
            inventory: 0
        },
        X17: {
            value: 'gid://shopify/ProductVariant/43657627566219',
            inventory: 0
        },
        X19: {
            value: 'gid://shopify/ProductVariant/43657627598987',
            inventory: 0
        },
        X20: {
            value: 'gid://shopify/ProductVariant/43657627631755',
            inventory: 0
        },
        X22: {
            value: 'gid://shopify/ProductVariant/43657627664523',
            inventory: 0
        },
        X25: {
            value: 'gid://shopify/ProductVariant/43657627697291',
            inventory: 0
        },
        X26: {
            value: 'gid://shopify/ProductVariant/43657627730059',
            inventory: 0
        },
        X27: {
            value: 'gid://shopify/ProductVariant/43657627762827',
            inventory: 0
        },
        X28: {
            value: 'gid://shopify/ProductVariant/43657627795595',
            inventory: 0
        },
        X29: {
            value: 'gid://shopify/ProductVariant/43657627828363',
            inventory: 0
        },
        X30: {
            value: 'gid://shopify/ProductVariant/43657627861131',
            inventory: 0
        },
        X32: {
            value: 'gid://shopify/ProductVariant/43657627893899',
            inventory: 0
        },
        X33: {
            value: 'gid://shopify/ProductVariant/43657627926667',
            inventory: 0
        },
        X34: {
            value: 'gid://shopify/ProductVariant/43657627959435',
            inventory: 0
        },
        X35: {
            value: 'gid://shopify/ProductVariant/43657627992203',
            inventory: 0
        },
        X36: {
            value: 'gid://shopify/ProductVariant/43657628024971',
            inventory: 0
        },
        X37: {
            value: 'gid://shopify/ProductVariant/43657628057739',
            inventory: 0
        },
        X38: {
            value: 'gid://shopify/ProductVariant/43657628090507',
            inventory: 0
        }
    },

    setWiringHarnessData: (key, value) =>
    set((state) => ({
      wiringHarnessData: {
        ...state.wiringHarnessData,
        [key]: {
          ...state.wiringHarnessData[key],
          ...value,
        },
      },
    })),

}))

export const useKnobs = create(set => ({
    frontKnobs : {
        "Red": {
            "id": "gid://shopify/ProductVariant/42648280268939",
            "inventory": 0,
            "color": "#ef4444"
        },
        "Amber": {
            "id": "gid://shopify/ProductVariant/42648280301707",
            "inventory": 0,
            "color": "#f59e0b"
        },
        "Forest Green": {
            "id": "gid://shopify/ProductVariant/42648280334475",
            "inventory": 0,
            "color": "#16a34a"        
        },
        "Blue": {
            "id": "gid://shopify/ProductVariant/42648280367243",
            "inventory": 0,
            "color": "#3b82f6"
        },
        "Gray": {
            "id": "gid://shopify/ProductVariant/42648280432779",
            "inventory": 0,
            "color": "#6b7280"
        },
        "White": {
            "id": "gid://shopify/ProductVariant/43026694471819",
            "inventory": 0,
            "color": "#f9fafb"
        },
        "Orange": {
            "id": "gid://shopify/ProductVariant/43026694504587",
            "inventory": 0,
            "color": "#f97316"
        },
        "Purple": {
            "id": "gid://shopify/ProductVariant/43026694537355",
            "inventory": 0,
            "color": "#8b5cf6"
        },
        "Silver": {
            "id": "gid://shopify/ProductVariant/43026694570123",
            "inventory": 0,
            "color": "#e5e7eb"
        },
        "Slate": {
            "id": "gid://shopify/ProductVariant/43026696208523",
            "inventory": 0,
            "color": "#64748b"
        }
    },

    setFrontKnobs: (key, value) =>
    set((state) => ({
      frontKnobs: {
        ...state.frontKnobs,
        [key]: {
          ...state.frontKnobs[key],
          ...value,
        },
      },
    })),


    sideRotary: {
        "Red": {
            "id": "gid://shopify/ProductVariant/42649851429003",
            "inventory": 0,
            "color": "#ef4444"
        },
        "Amber": {
            "id": "gid://shopify/ProductVariant/42649851461771",
            "inventory": 0,
            "color": "#f59e0b"
        },
        "Forest Green": {
            "id": "gid://shopify/ProductVariant/42649851494539",
            "inventory": 0,
            "color": "#16a34a"
        },
        "Blue": {
            "id": "gid://shopify/ProductVariant/42649851527307",
            "inventory": 0,
            "color": "#3b82f6"
        },
        "Gray": {
            "id": "gid://shopify/ProductVariant/42649851592843",
            "inventory": 0,
            "color": "#6b7280"
        },
        "White": {
            "id": "gid://shopify/ProductVariant/43026694602891",
            "inventory": 0,
            "color": "#f9fafb"
        },
        "Orange": {
            "id": "gid://shopify/ProductVariant/43026694635659",
            "inventory": 0,
            "color": "#f97316"
        },
        "Purple": {
            "id": "gid://shopify/ProductVariant/43026694668427",
            "inventory": 0,
            "color": "#8b5cf6"
        },
        "Silver": {
            "id": "gid://shopify/ProductVariant/43026694701195",
            "inventory": 0,
            "color": "#e5e7eb"
        },
        "Slate": {
            "id": "gid://shopify/ProductVariant/43026696241291",
            "inventory": 0,
            "color": "#64748b"
        }
    },

    setSideRotary: (key, value) =>
    set((state) => ({
      sideRotary: {
        ...state.sideRotary,
        [key]: {
          ...state.sideRotary[key],
          ...value,
        },
      },
    })),

}))
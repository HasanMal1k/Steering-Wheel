import { create } from "zustand";

// Keep these only for hub logos
export const hubLogos = {
  'acura': '/car-logos-images/acura.png',
  'audi': '/car-logos-images/audi.png',
  'bmw': '/car-logos-images/bmw.png',
  'corvette': '/car-logos-images/corvette.png',
  'ford': '/car-logos-images/ford.png',
  'honda': '/car-logos-images/honda.png',
  'hyundai': '/car-logos-images/hyundai.png',
  'lamborghini': '/car-logos-images/lamborghini.png',
  'lexus': '/car-logos-images/lexus.png',
  'mazda': '/car-logos-images/mazda.png',
  'mercedes': '/car-logos-images/mercedes.png',
  'mini': '/car-logos-images/mini.png',
  'mustang': '/car-logos-images/mustang.png',
  'nissan': '/car-logos-images/nissan.png',
  'porsche': '/car-logos-images/porsche.png',
  'subaru': '/car-logos-images/subaru.png',
  'toyota': '/car-logos-images/toyota.png',
  'volkswagen': '/car-logos-images/volkswagen.png',
};

export const useConfigurationStore = create((set, get) => ({
  // Active Component
  activeComponent: null,
  cartCard: false,
  setActiveComponent: (component) => set({ activeComponent: component }),
  disableCardComponent: () => set({ cartCard: false }),
  enableCartComponent: () => set({ cartCard: true }),

  // Store initial hex colors directly from inventory
  initialJoystickColor: '#6b7280', // default gray
  initialRotaryColor: '#6b7280', // default gray
  
  setInitialColors: (joystickHex, rotaryHex) => {
    set({
      initialJoystickColor: joystickHex || '#6b7280',
      initialRotaryColor: rotaryHex || '#6b7280',
      // Set selected colors to match initial colors
      selectedJoystickColor: joystickHex || '#6b7280',
      selectedRotaryColor: rotaryHex || '#6b7280'
    });
  },

  // Selected colors (hex values)
  selectedJoystickColor: '#6b7280',
  selectedRotaryColor: '#6b7280',

  // Updating colors - now accepts hex values directly
  setSelectedJoystickColor: (hexColor) => set({ selectedJoystickColor: hexColor }),
  setSelectedRotaryColor: (hexColor) => set({ selectedRotaryColor: hexColor }),

  // Reset configuration to initial colors from inventory
  resetConfiguration: () => {
    const state = get();
    set({
      selectedJoystickColor: state.initialJoystickColor,
      selectedRotaryColor: state.initialRotaryColor,
      activeComponent: null,
      selectedHubLogo: null,
      guideCard: false
    });
  },

  // Hub logo selection
  selectedHubLogo: null,
  setSelectedHubLogo: (logo) => set({ selectedHubLogo: logo }),

  // Guide card state
  guideCard: false,
  setGuideCardTrue: () => set({ guideCard: true }),
  setGuideCardFalse: () => set({ guideCard: false }),

  // Loading state
  loadingComplete: false,
  setLoadingComplete: (value) => set({ loadingComplete: value })
}));
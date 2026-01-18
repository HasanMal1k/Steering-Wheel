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
  setSelectedJoystickColor: (hexColor, itemId) => {
    set({ selectedJoystickColor: hexColor });
    // Update cart if itemId provided
    if (itemId && typeof window !== 'undefined') {
      const { useCartStore } = require('./CartStore');
      useCartStore.getState().setCartItems('frontKnobs', { 
        merchandiseId: itemId, 
        quantity: 1 
      });
    }
  },
  setSelectedRotaryColor: (hexColor, itemId) => {
    set({ selectedRotaryColor: hexColor });
    // Update cart if itemId provided
    if (itemId && typeof window !== 'undefined') {
      const { useCartStore } = require('./CartStore');
      useCartStore.getState().setCartItems('sideRotary', { 
        merchandiseId: itemId, 
        quantity: 1 
      });
    }
  },

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

  // Wheel type selection
  selectedWheelType: 'gt3', // 'gt3' or 'round'
  setSelectedWheelType: (type) => set({ selectedWheelType: type }),

  // Rim material selection
  selectedRimMaterial: 'alcantara', // 'alcantara' or 'leather'
  setSelectedRimMaterial: (material) => set({ selectedRimMaterial: material }),

  // Make and Model selection
  selectedMake: '',
  selectedModel: '',
  setSelectedMake: (make) => set({ selectedMake: make, selectedModel: '' }),
  setSelectedModel: (model, protocolBoardId, wiringHarnessId, hubAdapterId) => {
    const state = get();
    set({ selectedModel: model });
    
    // Set the hub logo based on the selected make
    if (state.selectedMake) {
      const logoName = state.selectedMake.toLowerCase();
      console.log('Setting hub logo to:', logoName);
      set({ selectedHubLogo: logoName });
    }
    
    // Update cart with all three IDs
    if (typeof window !== 'undefined') {
      const { useCartStore } = require('./CartStore');
      const cartStore = useCartStore.getState();
      
      if (protocolBoardId) {
        cartStore.setCartItems('protocolBoard', { 
          merchandiseId: protocolBoardId, 
          quantity: 1 
        });
      }
      if (wiringHarnessId) {
        cartStore.setCartItems('wiringHarnesses', { 
          merchandiseId: wiringHarnessId, 
          quantity: 1 
        });
      }
      if (hubAdapterId) {
        cartStore.setCartItems('hubAdapter', { 
          merchandiseId: hubAdapterId, 
          quantity: 1 
        });
      }
    }
  },

  // Guide card state
  guideCard: false,
  setGuideCardTrue: () => set({ guideCard: true }),
  setGuideCardFalse: () => set({ guideCard: false }),

  // Loading state
  loadingComplete: false,
  setLoadingComplete: (value) => set({ loadingComplete: value })
}));
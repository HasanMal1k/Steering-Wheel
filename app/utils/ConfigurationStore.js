import { createRef } from "react";
import { create } from "zustand";

export const joystickColor = {
  'gray': '#32363f',
  'blue': '#0060ff',
  'red':  '#fe0000',
  'white': '#e6e6e6',
  'purple': '#55298b',
  'amber': '#f2be36',
  'forest green': '#576848',
  'silver': '#c0c0c0',
  'orange': '#eb8f52',
  'stone': '#889aae'
};

export const rotaryColor = {
    'gray': '#6b7280',
    'blue': '#3b82f6',
    'red': '#ef4444',
    'white': '#f9fafb',
    'purple': '#8b5cf6',
    'stone': '#78716c',
    'amber': '#f59e0b',
    'forest green': '#16a34a',
    'silver': '#e5e7eb',
    'golden': '#eab308',
    'slate': '#64748b'
  }

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
}


const components = [
    'paddles',
    'rotary',
    'joysticks'
]

export const useConfigurationStore = create((set) => ({
    // Active Component
    activeComponent: null,
    cartCard: false,
    setActiveComponent: (component) => set({activeComponent: component}),
    disableCardComponent: () => set({cartCard: false}),
    enableCartComponent: () => set({cartCard: true}),

    // Setting colors based on arrays - using proper initial values
    selectedJoystickColor: joystickColor['gray'],
    selectedRotaryColor: rotaryColor['gray'],

    // Updating colors
    setSelectedJoystickColor: (color) => set({selectedJoystickColor: color}),
    setSelectedRotaryColor: (color) => set({selectedRotaryColor: color}),

    // Reseting all config
    resetConfiguration: () => set({
        selectedJoystickColor: joystickColor['gray'],
        selectedRotaryColor: rotaryColor['gray'],
        activeComponent: null,
        selectedHubLogo: null
    }),

    selectedHubLogo: null,
    setSelectedHubLogo: (logo) => set({ selectedHubLogo: logo }),
}))

// Adding a loading variable so they can see the complete laoding:
// const loadingComplete = false

// const handleLoadingComplete = (value) => {
//   loadingComplete = value
// }
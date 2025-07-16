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


const components = [
    'paddles',
    'rotary',
    'joysticks'
]

export const useConfigurationStore = create((set) => ({
    // Active Component
    activeComponent: null,
    setActiveComponent: (component) => set({activeComponent: component}),

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
        activeComponent: null
    })
}))
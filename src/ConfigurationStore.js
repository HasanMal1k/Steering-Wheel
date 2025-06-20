import { createRef } from "react";
import { create } from "zustand";

export const joystickColor = {
  'Gray': '#32363f',
  'Blue': '#0060ff',
  'Red':  '#fe0000',
  'White': '#e6e6e6',
  'Purple': '#55298b',
  'Amber': '#f2be36',
  'Forest Green': '#576848',
  'Silver': '#c0c0c0',
  'Orange': '#eb8f52',
  'Stone': '#889aae'
};

export const rotaryColor = [
    'gray',
    'blue',
    'red',
    'white',
    'purple',
    'stone',
    'amber',
    'forest green',
    'silver',
    'golden',
    'slate'
]

export const useConfigurationStore = create((set) => ({
    // Active Component
    activeComponent: null,
    setActiveComponent: (component) => set({activeComponent: component}),

    // Setting colors based on arrays - using proper initial values
    selectedJoystickColor: joystickColor['Gray'],
    selectedRotaryColor: rotaryColor[0],

    // Updating colors
    setSelectedJoystickColor: (color) => set({selectedJoystickColor: color}),
    setSelectedRotaryColor: (color) => set({selectedRotaryColor: color}),

    // Reseting all config
    resetConfiguration: () => set({
        selectedJoystickColor: joystickColor['Gray'],
        selectedRotaryColor: rotaryColor[0],
        activeComponent: null
    })
}))
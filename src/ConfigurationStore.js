import { createRef } from "react";
import { create } from "zustand";




export const joystickColor = [
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
    'slate',
    'silver'
]

export const joystickDecal = [
    'pink',
    'blue',
    'green',
    'red',
    'yellow',
    'gold',
    'purple',
    'none'
]

export const useConfigurationStore = create((set) => ({

    // Active Component
    activeComponent: null,
    setActiveComponent: (component) => set({activeComponent: component}),

    // Setting colors based on arrays
    selectedJoystickColor: joystickColor[0],
    selectedRotaryColor: rotaryColor[0],
    selectedJoystickDecal: joystickDecal[0],

    // Updating colors
    setSelectedJoystickColor: (color) => set({selectedJoystickColor: color}),
    setSelectedRotaryColor: (color) => set({selectedRotaryColor: color}),
    setSelectedJoystickDecal: (color) => set({selectedJoystickDecal: color}),

    // Reseting all config
    resetConfiguration: () => set({
        selectedJoystickColor: joystickColor[0],
        selectedRotaryColor: rotaryColor[0],
        selectedJoystickDecal: joystickDecal[0]
    })



}))
import { create } from 'zustand'

export const useTextStore = create((set) => ({
    text: false,
    enableText: () => set({text: true}),
    disableText: () => set({text: false})
}))
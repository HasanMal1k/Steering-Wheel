import { create } from 'zustand'

let disableTimeout = null

export const useTextStore = create((set) => ({
    text: false,
    enableText: () => {
        if (disableTimeout) {
            clearTimeout(disableTimeout)
            disableTimeout = null
        }
        set({text: true})
    },
    disableText: () => {
        disableTimeout = setTimeout(() => {
            set({text: false})
            disableTimeout = null
        }, 100)
    }
}))
import { create } from "zustand";

export const useAnimationStore = create((set) => ({
    loadingComplete : false,
    
    handleLoadingComplete : (value) => set({
        loadingComplete: value
    })

}))
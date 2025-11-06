// Initial computation for inventory check
import { create } from "zustand";
import { useKnobs } from "./InventoryStore";

export const useInitialInventoryStore = create((set) => ({
    frontKnobsColor: null,
    sideRotaryColor: null,

    setFrontKnobsColor: (color) => set({ frontKnobsColor: color }),
    setSideRotaryColor: (color) => set({ sideRotaryColor: color }),
}));
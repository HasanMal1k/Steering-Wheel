// store/screenshotStore.ts
import { create } from "zustand"

export const useScreenshotStore = create((set) => ({
  gl: null,
  scene: null,
  camera: null,
  setThree: (gl, scene, camera) => set({ gl, scene, camera }),
}))

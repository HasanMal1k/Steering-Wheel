// store/screenshotStore.ts
import { create } from "zustand"

export const useScreenshotStore = create((set) => ({
  gl: null,
  scene: null,
  camera: null,
  controls: null,
  setThree: (gl, scene, camera, controls) => set({ gl, scene, camera, controls }),
}))

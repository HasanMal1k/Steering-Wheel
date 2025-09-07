'use client'

import { useEffect, useRef } from 'react'
import { useThree } from '@react-three/fiber'
import { useConfigurationStore } from '../utils/ConfigurationStore'
import gsap from 'gsap'

function CameraController() {
  const { camera, controls } = useThree()
  const activeComponent = useConfigurationStore(state => state.activeComponent)
  const previousComponent = useRef(null)

  // Define specific camera positions for each component type
  const cameraConfigs = {
    joysticks: {
      position: [1.8, -1.5, 2.5],
      target: [0, 0.2, 0],
      fov: 50
    },
    rotary: {
      position: [-2, 1, 2.8],
      target: [-0.3, 0, 0],
      fov: 45
    },
    paddles: {
      position: [0, 2.5, 5],
      target: [0, 0.5, 0],
      fov: 55
    },
    hub: {
      position: [0, 0, 3],
      target: [0, 0, 0],
      fov: 45
    },
    default: {
      position: [0, 0, 5],
      target: [0, 0, 0],
      fov: 75
    }
  }

  useEffect(() => {
    if (!camera) return

    let targetConfig = cameraConfigs.default
    let componentType = 'default'

    // Check if activeComponent is one of the valid component types
    if (activeComponent && ['paddles', 'joysticks', 'rotary'].includes(activeComponent)) {
      componentType = activeComponent
      targetConfig = cameraConfigs[componentType]
    }

    // Only animate if the component has changed
    if (previousComponent.current !== activeComponent) {
      
      // Create a timeline for smooth camera movement
      const tl = gsap.timeline()

      // Animate camera position
      tl.to(camera.position, {
        x: targetConfig.position[0],
        y: targetConfig.position[1],
        z: targetConfig.position[2],
        duration: 1.2,
        ease: "power2.inOut"
      }, 0)

      // Animate camera target if controls exist
      if (controls?.target) {
        tl.to(controls.target, {
          x: targetConfig.target[0],
          y: targetConfig.target[1],
          z: targetConfig.target[2],
          duration: 1.2,
          ease: "power2.inOut",
          onUpdate: () => {
            controls.update()
          }
        }, 0)
      }

      // Animate field of view
      tl.to(camera, {
        fov: targetConfig.fov,
        duration: 1.2,
        ease: "power2.inOut",
        onUpdate: () => {
          camera.updateProjectionMatrix()
        }
      }, 0)

      // Add a subtle rotation for dynamic feel
      // if (activeComponent) {
      //   tl.to(camera.rotation, {
      //     y: camera.rotation.y + (Math.random() - 0.5) * 0.1,
      //     duration: 1.2,
      //     ease: "power2.inOut"
      //   }, 0)
      // }

      previousComponent.current = activeComponent
    }

  }, [activeComponent, camera, controls])

  return null // This component doesn't render anything
}

export default CameraController
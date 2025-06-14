import { useEffect, useRef } from 'react'
import { useThree } from '@react-three/fiber'
import { useConfigurationStore } from '../ConfigurationStore'
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
    default: {
      position: [0, 0, 5],
      target: [0, 0, 0],
      fov: 75
    }
  }

  // Function to identify component type
  const identifyComponentType = (component) => {
    if (!component?.current) return 'default'
    
    // Check userData first (our custom identifier)
    if (component.current.userData?.type) {
      return component.current.userData.type
    }
    
    // Fallback to position-based identification
    const mesh = component.current
    const position = mesh.position || { x: 0, y: 0, z: 0 }
    
    if (Math.abs(position.x) < 0.5 && position.y < 1) {
      return 'joysticks'
    } else if (Math.abs(position.x) > 0.5 || Math.abs(position.z) > 0.5) {
      return 'rotary'
    } else {
      return 'paddles'
    }
  }

  useEffect(() => {
    if (!camera) return

    let targetConfig = cameraConfigs.default
    let componentType = 'default'

    if (activeComponent) {
      componentType = identifyComponentType(activeComponent)
      targetConfig = cameraConfigs[componentType] || cameraConfigs.default
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
      if (activeComponent) {
        tl.to(camera.rotation, {
          y: camera.rotation.y + (Math.random() - 0.5) * 0.1,
          duration: 1.2,
          ease: "power2.inOut"
        }, 0)
      }

      previousComponent.current = activeComponent
    }

  }, [activeComponent, camera, controls])

  return null // This component doesn't render anything
}

export default CameraController
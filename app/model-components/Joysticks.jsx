import React, { useRef, useState, useEffect } from 'react'
import * as THREE from 'three'
import { useTextStore } from '../TextStore'
import { useConfigurationStore } from '../ConfigurationStore'
import gsap from 'gsap'

function Joysticks({ geometry, material, position }) {
  const joysticksRef = useRef()
  const enableText = useTextStore(state => state.enableText)
  const disableText = useTextStore(state => state.disableText)
  const setActiveComponent = useConfigurationStore(state => state.setActiveComponent)
  const selectedJoystickColor = useConfigurationStore(state => state.selectedJoystickColor)
  const activeComponent = useConfigurationStore(state => state.activeComponent)

  // Create materials - clone the original to avoid affecting other components
  const hoverMaterial = new THREE.MeshStandardMaterial({ color: '#ffffff' })
  const [originalMaterial] = useState(material.clone())
  const [currentMaterial, setCurrentMaterial] = useState(originalMaterial.clone())

  // Update material when color changes
  useEffect(() => {
    if (selectedJoystickColor) {
      const coloredMaterial = new THREE.MeshStandardMaterial({
        color: selectedJoystickColor,
        roughness: 0.4,
        metalness: 0.6
      })
      
      setCurrentMaterial(coloredMaterial)
    }
  }, [selectedJoystickColor])

  // Handle selection and opacity logic with animations
  useEffect(() => {
    if (!joysticksRef.current) return

    if (activeComponent === joysticksRef) {
      // This component is selected - full opacity with selection highlight
      currentMaterial.emissive.set('#22c55e')
      currentMaterial.emissiveIntensity = 0.1
      currentMaterial.transparent = true
      
      // Animate to full opacity
      gsap.to(currentMaterial, {
        opacity: 1,
        duration: 0.6,
        ease: "power2.out",
        onComplete: () => {
          currentMaterial.transparent = false
        }
      })
      
    } else if (activeComponent && activeComponent !== joysticksRef) {
      // Another component is selected - fade this one
      currentMaterial.transparent = true
      currentMaterial.emissive.set('#000000')
      currentMaterial.emissiveIntensity = 0
      
      // Animate to faded opacity
      gsap.to(currentMaterial, {
        opacity: 0.4,
        duration: 0.6,
        ease: "power2.out"
      })
      
    } else {
      // No component selected - normal appearance
      currentMaterial.emissive.set('#000000')
      currentMaterial.emissiveIntensity = 0
      currentMaterial.transparent = true
      
      // Animate to full opacity
      gsap.to(currentMaterial, {
        opacity: 1,
        duration: 0.6,
        ease: "power2.out",
        onComplete: () => {
          currentMaterial.transparent = false
        }
      })
    }
    
    // Force material update
    currentMaterial.needsUpdate = true
  }, [activeComponent, currentMaterial])

  const handlePointerOver = () => {
    if (joysticksRef.current && activeComponent !== joysticksRef) {
      joysticksRef.current.material = hoverMaterial
    }
    enableText()
  }

  const handlePointerOut = () => {
    if (joysticksRef.current && activeComponent !== 'joysticks') {
      // Restore the appropriate material based on current state
      if (activeComponent && activeComponent !== 'joysticks') {
        currentMaterial.transparent = true
        currentMaterial.emissive.set('#000000')
        currentMaterial.emissiveIntensity = 0
        
        // Smooth transition back to faded state
        gsap.to(currentMaterial, {
          opacity: 0.4,
          duration: 0.3,
          ease: "power2.out"
        })
      } else {
        currentMaterial.transparent = true
        currentMaterial.emissive.set('#000000')
        currentMaterial.emissiveIntensity = 0
        
        // Smooth transition back to normal state
        gsap.to(currentMaterial, {
          opacity: 1,
          duration: 0.3,
          ease: "power2.out",
          onComplete: () => {
            currentMaterial.transparent = false
          }
        })
      }
      currentMaterial.needsUpdate = true
    }
    disableText()
  }

  const handleClick = (e) => {
    e.stopPropagation()
    // Add a custom identifier to help with camera positioning
    if (joysticksRef.current) {
      joysticksRef.current.userData = { type: 'joysticks' }
    }
    setActiveComponent('joysticks')
    console.log('Joysticks Selected')
  }

  return (
    <mesh
      ref={joysticksRef}
      castShadow
      receiveShadow
      geometry={geometry}
      material={currentMaterial}
      position={position}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      onClick={handleClick}
    />
  )
}

export default Joysticks
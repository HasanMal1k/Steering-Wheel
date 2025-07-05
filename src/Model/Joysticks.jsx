import React, { useRef, useState, useEffect } from 'react'
import * as THREE from 'three'
import { useTextStore } from '../TextStore'
import { useConfigurationStore } from '../ConfigurationStore'

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

  // Handle selection and opacity logic
  useEffect(() => {
    if (!joysticksRef.current) return

    if (activeComponent === joysticksRef) {
      // This component is selected - full opacity with selection highlight
      currentMaterial.emissive.set('#22c55e')
      currentMaterial.emissiveIntensity = 0.1
      currentMaterial.transparent = false
      currentMaterial.opacity = 1
      
    } else if (activeComponent && activeComponent !== joysticksRef) {
      // Another component is selected - fade this one
      currentMaterial.transparent = true
      currentMaterial.opacity = 0.4
      currentMaterial.emissive.set('#000000')
      currentMaterial.emissiveIntensity = 0
      
    } else {
      // No component selected - normal appearance
      currentMaterial.transparent = false
      currentMaterial.opacity = 1
      currentMaterial.emissive.set('#000000')
      currentMaterial.emissiveIntensity = 0
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
    if (joysticksRef.current && activeComponent !== joysticksRef) {
      // Restore the appropriate material based on current state
      if (activeComponent && activeComponent !== joysticksRef) {
        currentMaterial.transparent = true
        currentMaterial.opacity = 0.4
        currentMaterial.emissive.set('#000000')
        currentMaterial.emissiveIntensity = 0
      } else {
        currentMaterial.transparent = false
        currentMaterial.opacity = 1
        currentMaterial.emissive.set('#000000')
        currentMaterial.emissiveIntensity = 0
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
    setActiveComponent(joysticksRef)
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
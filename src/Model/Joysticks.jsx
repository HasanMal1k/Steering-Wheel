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

  // Create materials
  const hoverMaterial = new THREE.MeshStandardMaterial({ color: '#ffffff' })
  const [originalMaterial] = useState(material)
  const [currentMaterial, setCurrentMaterial] = useState(material)

  // Update material when color changes
  useEffect(() => {
    if (selectedJoystickColor && joysticksRef.current) {
      const coloredMaterial = new THREE.MeshStandardMaterial({ 
        color: selectedJoystickColor,
        roughness: 0.4,
        metalness: 0.6
      })
      setCurrentMaterial(coloredMaterial)
      
      // Only apply if not currently hovering
      if (joysticksRef.current.material !== hoverMaterial) {
        joysticksRef.current.material = coloredMaterial
      }
    }
  }, [selectedJoystickColor])

  // Handle selection highlight
  useEffect(() => {
    if (activeComponent === joysticksRef && joysticksRef.current) {
      const selectedMaterial = new THREE.MeshStandardMaterial({ 
        color: '#4ade80',
        roughness: 0.3,
        metalness: 0.7,
        emissive: '#065f46',
        emissiveIntensity: 0.2
      })
      joysticksRef.current.material = selectedMaterial
    } else if (joysticksRef.current && activeComponent !== joysticksRef) {
      joysticksRef.current.material = currentMaterial
    }
  }, [activeComponent, currentMaterial])

  const handlePointerOver = () => {
    if (joysticksRef.current && activeComponent !== joysticksRef) {
      joysticksRef.current.material = hoverMaterial
    }
    enableText()
  }

  const handlePointerOut = () => {
    if (joysticksRef.current && activeComponent !== joysticksRef) {
      joysticksRef.current.material = currentMaterial
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
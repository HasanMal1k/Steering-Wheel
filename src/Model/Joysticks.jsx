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
    if (selectedJoystickColor && joysticksRef.current) {
      const coloredMaterial = new THREE.MeshStandardMaterial({
        color: selectedJoystickColor,
        roughness: 0.4,
        metalness: 0.6
      })
      
      setCurrentMaterial(coloredMaterial)
      
      // Apply immediately if not currently hovering or selected
      if (joysticksRef.current.material !== hoverMaterial && activeComponent !== joysticksRef) {
        joysticksRef.current.material = coloredMaterial
      }
    }
  }, [selectedJoystickColor])

  // Handle selection highlight
  useEffect(() => {
    if (activeComponent === joysticksRef && joysticksRef.current) {
      const selectedMaterial = currentMaterial.clone()
      selectedMaterial.color = new THREE.Color('#4ade80')
      selectedMaterial.roughness = 0.3
      selectedMaterial.metalness = 0.7
      selectedMaterial.emissive = new THREE.Color('#065f46')
      selectedMaterial.emissiveIntensity = 0.2
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
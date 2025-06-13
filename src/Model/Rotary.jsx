import React, { useRef, useState, useEffect } from 'react'
import * as THREE from 'three'
import { useTextStore } from '../TextStore'
import { useConfigurationStore } from '../ConfigurationStore'

function Rotary({ geometry, material, position }) {
  const rotaryRef = useRef()
  const enableText = useTextStore(state => state.enableText)
  const disableText = useTextStore(state => state.disableText)
  const setActiveComponent = useConfigurationStore(state => state.setActiveComponent)
  const selectedRotaryColor = useConfigurationStore(state => state.selectedRotaryColor)
  const activeComponent = useConfigurationStore(state => state.activeComponent)

  // Create materials - clone the original to avoid affecting other components
  const hoverMaterial = new THREE.MeshStandardMaterial({ color: '#ffffff' })
  const [originalMaterial] = useState(material.clone())
  const [currentMaterial, setCurrentMaterial] = useState(originalMaterial.clone())

  // Color mapping for rotary colors
  const rotaryColorMap = {
    'gray': '#6b7280',
    'blue': '#3b82f6',
    'red': '#ef4444',
    'white': '#f9fafb',
    'purple': '#8b5cf6',
    'stone': '#78716c',
    'amber': '#f59e0b',
    'forest green': '#16a34a',
    'silver': '#e5e7eb',
    'golden': '#eab308',
    'slate': '#64748b'
  }

  // Update material when color changes
  useEffect(() => {
    if (selectedRotaryColor && rotaryRef.current) {
      const colorValue = rotaryColorMap[selectedRotaryColor] || selectedRotaryColor
      const coloredMaterial = new THREE.MeshStandardMaterial({
        color: colorValue,
        roughness: 0.3,
        metalness: 0.8
      })
      
      setCurrentMaterial(coloredMaterial)
      
      // Apply immediately if not currently hovering or selected
      if (rotaryRef.current.material !== hoverMaterial && activeComponent !== rotaryRef) {
        rotaryRef.current.material = coloredMaterial
      }
    }
  }, [selectedRotaryColor])

  // Handle selection highlight - use subtle emissive instead of changing whole color
  useEffect(() => {
    if (activeComponent === rotaryRef && rotaryRef.current) {
      const selectedMaterial = currentMaterial.clone()
      selectedMaterial.emissive = new THREE.Color('#22c55e')
      selectedMaterial.emissiveIntensity = 0.1
      rotaryRef.current.material = selectedMaterial
    } else if (rotaryRef.current && activeComponent !== rotaryRef) {
      rotaryRef.current.material = currentMaterial
    }
  }, [activeComponent, currentMaterial])

  const handlePointerOver = () => {
    if (rotaryRef.current && activeComponent !== rotaryRef) {
      rotaryRef.current.material = hoverMaterial
    }
    enableText()
  }

  const handlePointerOut = () => {
    if (rotaryRef.current && activeComponent !== rotaryRef) {
      rotaryRef.current.material = currentMaterial
    }
    disableText()
  }

  const handleClick = (e) => {
    e.stopPropagation()
    // Add a custom identifier to help with camera positioning
    if (rotaryRef.current) {
      rotaryRef.current.userData = { type: 'rotary' }
    }
    setActiveComponent(rotaryRef)
    console.log('Rotary Selected')
  }

  return (
    <mesh
      ref={rotaryRef}
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

export default Rotary
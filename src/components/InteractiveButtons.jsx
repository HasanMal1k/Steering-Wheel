import React, { useRef, useState, useEffect } from 'react'
import * as THREE from 'three'
import { useTextStore } from '../TextStore'
import { useConfigurationStore } from '../ConfigurationStore'

function InteractiveButtons({ geometry, material, position, buttonType = 'red' }) {
  const buttonRef = useRef()
  const enableText = useTextStore(state => state.enableText)
  const disableText = useTextStore(state => state.disableText)
  const setActiveComponent = useConfigurationStore(state => state.setActiveComponent)
  const activeComponent = useConfigurationStore(state => state.activeComponent)

  // Create materials
  const hoverMaterial = new THREE.MeshStandardMaterial({ color: '#ffffff' })
  const [originalMaterial] = useState(material)
  const [currentMaterial, setCurrentMaterial] = useState(material)

  // Define button colors based on type
  const buttonColors = {
    red: '#ef4444',
    blue: '#3b82f6',
    green: '#22c55e',
    purple: '#8b5cf6',
    white: '#f9fafb',
    default: material.color
  }

  // Update material based on button type
  useEffect(() => {
    const color = buttonColors[buttonType] || buttonColors.default
    const coloredMaterial = new THREE.MeshStandardMaterial({ 
      color: color,
      roughness: 0.2,
      metalness: 0.8,
      emissive: color,
      emissiveIntensity: 0.1
    })
    setCurrentMaterial(coloredMaterial)
    
    if (buttonRef.current && buttonRef.current.material !== hoverMaterial && activeComponent !== buttonRef) {
      buttonRef.current.material = coloredMaterial
    }
  }, [buttonType])

  // Handle selection highlight
  useEffect(() => {
    if (activeComponent === buttonRef && buttonRef.current) {
      const selectedMaterial = currentMaterial.clone()
      selectedMaterial.emissive = new THREE.Color('#22c55e')
      selectedMaterial.emissiveIntensity = 0.3
      buttonRef.current.material = selectedMaterial
    } else if (buttonRef.current && activeComponent !== buttonRef) {
      buttonRef.current.material = currentMaterial
    }
  }, [activeComponent, currentMaterial])

  const handlePointerOver = () => {
    if (buttonRef.current && activeComponent !== buttonRef) {
      buttonRef.current.material = hoverMaterial
    }
    enableText()
  }

  const handlePointerOut = () => {
    if (buttonRef.current && activeComponent !== buttonRef) {
      buttonRef.current.material = currentMaterial
    }
    disableText()
  }

  const handleClick = (e) => {
    e.stopPropagation()
    if (buttonRef.current) {
      buttonRef.current.userData = { type: 'buttons', buttonType }
    }
    setActiveComponent(buttonRef)
    console.log(`${buttonType} Button Selected`)
  }

  return (
    <mesh
      ref={buttonRef}
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

export default InteractiveButtons
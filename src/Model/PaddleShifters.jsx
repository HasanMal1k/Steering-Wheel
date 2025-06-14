import React, { useRef, useState, useEffect } from 'react'
import * as THREE from 'three'
import { useTextStore } from '../TextStore'
import { useConfigurationStore } from '../ConfigurationStore'

function PaddleShifters({ geometry, material, position }) {
  const paddlesRef = useRef()
  const enableText = useTextStore(state => state.enableText)
  const disableText = useTextStore(state => state.disableText)
  const setActiveComponent = useConfigurationStore(state => state.setActiveComponent)
  const activeComponent = useConfigurationStore(state => state.activeComponent)

  // Create materials - clone the original to avoid affecting other components
  const hoverMaterial = new THREE.MeshStandardMaterial({ color: '#ffffff' })
  const [originalMaterial] = useState(material.clone())
  const [currentMaterial, setCurrentMaterial] = useState(originalMaterial.clone())

  

  // Handle selection highlight
  useEffect(() => {
    if (activeComponent === paddlesRef && paddlesRef.current) {
      const selectedMaterial = currentMaterial.clone()
      selectedMaterial.color = new THREE.Color('red')
      selectedMaterial.roughness = 0.3
      selectedMaterial.metalness = 0.7
      selectedMaterial.emissive = new THREE.Color('#065f46')
      selectedMaterial.emissiveIntensity = 0.2
      paddlesRef.current.material = selectedMaterial
    } else if (paddlesRef.current && activeComponent !== paddlesRef) {
      paddlesRef.current.material = currentMaterial
    }
  }, [activeComponent, currentMaterial])



  const handlePointerOver = () => {
    if (paddlesRef.current && activeComponent !== paddlesRef) {
      paddlesRef.current.material = hoverMaterial
    }
    enableText()
  }

  const handlePointerOut = () => {
    if (paddlesRef.current && activeComponent !== paddlesRef) {
      paddlesRef.current.material = currentMaterial
    }
    disableText()
  }

  const handleClick = (e) => {
    e.stopPropagation()
    // Add a custom identifier to help with camera positioning
    if (paddlesRef.current) {
      paddlesRef.current.userData = { type: 'paddles' }
    }
    setActiveComponent(paddlesRef)
    console.log('Paddle Shifters Selected')
  }

  return (
    <mesh
      ref={paddlesRef}
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

export default PaddleShifters
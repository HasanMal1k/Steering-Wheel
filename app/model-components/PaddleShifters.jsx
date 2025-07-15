import React, { useRef, useState, useEffect } from 'react'
import * as THREE from 'three'
import { useTextStore } from '../TextStore'
import { useConfigurationStore } from '../ConfigurationStore'
import gsap from 'gsap'

function PaddleShifters({ geometry, material, position }) {
  const paddlesRef = useRef()
  const enableText = useTextStore(state => state.enableText)
  const disableText = useTextStore(state => state.disableText)
  const setActiveComponent = useConfigurationStore(state => state.setActiveComponent)
  const activeComponent = useConfigurationStore(state => state.activeComponent)

  // Create materials - clone the original to avoid affecting other components
  const hoverMaterial = new THREE.MeshStandardMaterial({ color: '#ffffff' })
  const [originalMaterial] = useState(material.clone())
  const [currentMaterial, setCurrentMaterial] = useState(originalMaterial)

  // Handle selection highlight with animations
  useEffect(() => {
    if (!paddlesRef.current) return

    if (activeComponent === 'paddles') {
      // This component is selected - animate to full opacity
      currentMaterial.transparent = true
      
      gsap.to(currentMaterial, {
        opacity: 1,
        duration: 0.6,
        ease: "power2.out",
        onComplete: () => {
          currentMaterial.transparent = false
        }
      })
      
    } else if (activeComponent && activeComponent !== 'paddles') {
      // Another component is selected - animate to faded opacity
      currentMaterial.transparent = true
      
      gsap.to(currentMaterial, {
        opacity: 0.4,
        duration: 0.6,
        ease: "power2.out"
      })
      
    } else {
      // No component selected - animate to normal opacity
      currentMaterial.transparent = true
      
      gsap.to(currentMaterial, {
        opacity: 1,
        duration: 0.6,
        ease: "power2.out",
        onComplete: () => {
          currentMaterial.transparent = false
        }
      })
    }
    
    currentMaterial.needsUpdate = true
  }, [activeComponent, currentMaterial])

  const handlePointerOver = () => {
    if (paddlesRef.current && activeComponent !== 'paddles') {
      paddlesRef.current.material = hoverMaterial
    }
    enableText()
  }

  const handlePointerOut = () => {
    if (paddlesRef.current) {
      // Always restore to the current material
      paddlesRef.current.material = currentMaterial
      
      // Then apply the appropriate state
      if (activeComponent === 'paddles') {
        // This component is selected - restore full opacity
        currentMaterial.transparent = false
        currentMaterial.opacity = 1
      } else if (activeComponent && activeComponent !== 'paddles') {
        // Another component is selected - restore faded state
        currentMaterial.transparent = true
        currentMaterial.opacity = 0.4
      } else {
        // No component selected - restore normal state
        currentMaterial.transparent = false
        currentMaterial.opacity = 1
      }
      currentMaterial.needsUpdate = true
    }
    disableText()
  }

  const handleClick = (e) => {
    e.stopPropagation()
    // Add a custom identifier to help with camera positioning
    if (paddlesRef.current) {
      paddlesRef.current.userData = { type: 'paddles' }
    }
    setActiveComponent('paddles')
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
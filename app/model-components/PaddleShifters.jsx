import React, { useRef, useState, useEffect } from 'react'
import * as THREE from 'three'
import { useTextStore } from '../utils/TextStore'
import { useConfigurationStore } from '../utils/ConfigurationStore'
import gsap from 'gsap'

function PaddleShifters({ geometry, material, position }) {
  const paddlesRef = useRef()
  // const enableText = useTextStore(state => state.enableText)
  // const disableText = useTextStore(state => state.disableText)
  // const setActiveComponent = useConfigurationStore(state => state.setActiveComponent)
  const activeComponent = useConfigurationStore(state => state.activeComponent)

  // Create materials - clone the original to avoid affecting other components
  // const hoverMaterial = new THREE.MeshStandardMaterial({ color: '#ffffff' })
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

  return (
    <mesh
      ref={paddlesRef}
      castShadow
      receiveShadow
      geometry={geometry}
      material={currentMaterial}
      position={position}
    />
  )
}

export default PaddleShifters
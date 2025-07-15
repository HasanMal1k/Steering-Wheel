import React, { useRef, useState, useEffect } from 'react'
import * as THREE from 'three'
import { useTextStore } from '../TextStore'
import { useConfigurationStore } from '../ConfigurationStore'
import gsap from 'gsap'

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
  const [currentMaterial, setCurrentMaterial] = useState(originalMaterial)

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
    if (selectedRotaryColor) {
      const colorValue = rotaryColorMap[selectedRotaryColor] || selectedRotaryColor
      const coloredMaterial = new THREE.MeshStandardMaterial({
        color: colorValue,
        roughness: 0.3,
        metalness: 0.8
      })
      
      setCurrentMaterial(coloredMaterial)
    }
  }, [selectedRotaryColor])

  // Handle selection and opacity logic with animations
  useEffect(() => {
    if (!rotaryRef.current) return

    if (activeComponent === 'rotary') {
      // This component is selected - full opacity with selection highlight
      currentMaterial.emissive = new THREE.Color('#22c55e')
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
      
    } else if (activeComponent && activeComponent !== 'rotary') {
      // Another component is selected - fade this one
      currentMaterial.transparent = true
      currentMaterial.emissive = new THREE.Color('#000000')
      currentMaterial.emissiveIntensity = 0
      
      // Animate to faded opacity
      gsap.to(currentMaterial, {
        opacity: 0.4,
        duration: 0.6,
        ease: "power2.out"
      })
      
    } else {
      // No component selected - normal appearance
      currentMaterial.transparent = true
      currentMaterial.emissive = new THREE.Color('#000000')
      currentMaterial.emissiveIntensity = 0
      
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
    
    rotaryRef.current.material = currentMaterial
  }, [activeComponent, currentMaterial])

  const handlePointerOver = () => {
    if (rotaryRef.current && activeComponent !== 'rotary') {
      rotaryRef.current.material = hoverMaterial
    }
    enableText()
  }

  const handlePointerOut = () => {
    if (rotaryRef.current && activeComponent !== 'rotary') {
      // Restore the appropriate material based on current state
      if (activeComponent && activeComponent !== 'rotary') {
        currentMaterial.transparent = true
        currentMaterial.emissive = new THREE.Color('#000000')
        currentMaterial.emissiveIntensity = 0
        
        // Smooth transition back to faded state
        gsap.to(currentMaterial, {
          opacity: 0.4,
          duration: 0.3,
          ease: "power2.out"
        })
      } else {
        currentMaterial.transparent = true
        currentMaterial.emissive = new THREE.Color('#000000')
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
      rotaryRef.current.material = currentMaterial
    }
    disableText()
  }

  const handleClick = (e) => {
    e.stopPropagation()
    // Add a custom identifier to help with camera positioning (OLD WAY, I DON'T DO THIS WAY NOW, ONLY NAME IS ENOUGH)
    if (rotaryRef.current) {
      rotaryRef.current.userData = { type: 'rotary' }
    }
    setActiveComponent('rotary')
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
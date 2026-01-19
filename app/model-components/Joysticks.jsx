import React, { useRef, useState, useEffect } from 'react'
import * as THREE from 'three'
import { useTextStore } from '../utils/TextStore'
import { useConfigurationStore } from '../utils/ConfigurationStore'
import gsap from 'gsap'
import useInitialInventory from '../hooks/useInitialInventory'

function Joysticks({ geometry, material, position }) {
  const joysticksRef = useRef()
  const enableText = useTextStore(state => state.enableText)
  const disableText = useTextStore(state => state.disableText)
  const setActiveComponent = useConfigurationStore(state => state.setActiveComponent)
  const selectedJoystickColor = useConfigurationStore(state => state.selectedJoystickColor)
  const setSelectedJoystickColor = useConfigurationStore(state => state.setSelectedJoystickColor)
  const activeComponent = useConfigurationStore(state => state.activeComponent)


  const { availableFront, availableSide } = useInitialInventory()


  // Create materials - clone the original to avoid affecting other components
  const hoverMaterial = new THREE.MeshStandardMaterial({ color: '#ffff' })
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

    // Always ensure the mesh is using the current material, not hover material
    joysticksRef.current.material = currentMaterial

    if (activeComponent === 'joysticks') {
      // This component is selected - full opacity with no emissive glow
      currentMaterial.emissive.set('#000000')  // No emissive color
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
      
    } else if (activeComponent && activeComponent !== 'joysticks') {
      // Another component is selected - fade this one
      currentMaterial.transparent = true
      currentMaterial.emissive.set('#000000')  // Black color, not the material
      currentMaterial.emissiveIntensity = 0
      
      // Animate to faded opacity
      gsap.to(currentMaterial, {
        opacity: 0.4,
        duration: 0.6,
        ease: "power2.out"
      })
      
    } else {
      // No component selected - normal appearance
      currentMaterial.emissive.set('#000000')  // Black color, not the material
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

  const handlePointerOver = (e) => {
    e.stopPropagation()
    if (joysticksRef.current && activeComponent !== 'joysticks') {
      joysticksRef.current.material = hoverMaterial
    }
    enableText()
  }

  const handlePointerOut = (e) => {
    e.stopPropagation()
    if (joysticksRef.current && activeComponent !== 'joysticks') {
      // Simply restore the current material - let the useEffect handle the rest
      joysticksRef.current.material = currentMaterial
    }
    disableText()
  }

  const handleClick = (e) => {
    e.stopPropagation()
    // Add a custom identifier to help with camera positioning (OLD WAY, I DON'T DO THIS WAY NOW, ONLY NAME IS ENOUGH)
    if (joysticksRef.current) {
      joysticksRef.current.userData = { type: 'joysticks' }
    }
    setActiveComponent('joysticks')
    // console.log('Joysticks Selected')
  }


  useEffect(() => {  
    // On mount, set the initial joystick color if available
    if (availableFront) {
      setSelectedJoystickColor(availableFront[1].color, availableFront[1].id)
      console.log("Setting initial joystick color to:", availableFront[1].color)
    }
  }, [availableFront, setSelectedJoystickColor])


  return (
    <mesh
      ref={joysticksRef}
      castShadow
      receiveShadow
      geometry={geometry}
      material={currentMaterial}
      position={position}
    />
  )
}

export default Joysticks
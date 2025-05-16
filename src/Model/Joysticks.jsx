import React, { useRef, useState } from 'react'
import * as THREE from 'three'
import { useTextStore } from '../TextStore'
import { useConfigurationStore } from '../ConfigurationStore'


function Joysticks({ geometry, material, position }) {
  const joysticksRef = useRef()
  const enableText = useTextStore(state => state.enableText)
  const disableText = useTextStore(state => state.disableText)
  const setActiveComponent = useConfigurationStore(state => state.setActiveComponent)


  // Create a white MeshStandardMaterial
  const whiteMaterial = new THREE.MeshStandardMaterial({ color: 'gray' })

  // Store original material to revert on hover out
  const [originalMaterial] = useState(material)

  const handlePointerOver = () => {
    if (joysticksRef.current) {
      joysticksRef.current.material = whiteMaterial
    }
    enableText()
  }

  const handlePointerOut = () => {
    if (joysticksRef.current) {
      joysticksRef.current.material = originalMaterial
    }
    disableText()
  }

  const handleClick = (e) => {
    e.stopPropagation()

    setActiveComponent(joysticksRef)

    console.log('Rotary Selected')

  }


  return (
    <mesh
      ref={joysticksRef}
      castShadow
      receiveShadow
      geometry={geometry}
      material={material}
      position={position}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      onClick={handleClick}
    />
  )
}

export default Joysticks

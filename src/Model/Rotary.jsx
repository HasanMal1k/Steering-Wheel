import React, { useRef, useState } from 'react'
import * as THREE from 'three'
import { useTextStore } from '../TextStore'
import { useConfigurationStore } from '../ConfigurationStore'

function Rotary({ geometry, material, position }) {
  const rotaryRef = useRef()
  const enableText = useTextStore(state => state.enableText)
  const disableText = useTextStore(state => state.disableText)
  const setActiveComponent = useConfigurationStore(state => state.setActiveComponent)

  // Create a white MeshStandardMaterial
  const whiteMaterial = new THREE.MeshStandardMaterial({ color: 'gray' })

  // Store original material to revert on hover out
  const [originalMaterial] = useState(material)

  const handlePointerOver = () => {
    if (rotaryRef.current) {
      rotaryRef.current.material = whiteMaterial
    }
    enableText()
  }

  const handlePointerOut = () => {
    if (rotaryRef.current) {
      rotaryRef.current.material = originalMaterial
    }
    disableText()
  }

  const handleClick = (e) => {
    e.stopPropagation()

    setActiveComponent(rotaryRef)

    console.log('Rotary Selected')

  }


  return (
    <mesh
      ref={rotaryRef}
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

export default Rotary

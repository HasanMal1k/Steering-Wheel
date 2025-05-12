import React, { useRef, useState } from 'react'
import * as THREE from 'three'

function Joysticks({ geometry, material, position }) {
  const joysticksRef = useRef()

  // Create a white MeshStandardMaterial
  const whiteMaterial = new THREE.MeshStandardMaterial({ color: 'white' })

  // Store original material to revert on hover out
  const [originalMaterial] = useState(material)

  const handlePointerOver = () => {
    if (joysticksRef.current) {
      joysticksRef.current.material = whiteMaterial
    }
    
  }

  const handlePointerOut = () => {
    if (joysticksRef.current) {
      joysticksRef.current.material = originalMaterial
    }
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
    />
  )
}

export default Joysticks

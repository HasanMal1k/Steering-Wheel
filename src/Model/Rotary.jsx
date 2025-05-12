import React, { useRef, useState } from 'react'
import * as THREE from 'three'

function Rotary({ geometry, material, position }) {
  const rotaryRef = useRef()

  // Create a white MeshStandardMaterial
  const whiteMaterial = new THREE.MeshStandardMaterial({ color: 'white' })

  // Store original material to revert on hover out
  const [originalMaterial] = useState(material)

  const handlePointerOver = () => {
    if (rotaryRef.current) {
      rotaryRef.current.material = whiteMaterial
    }
    
  }

  const handlePointerOut = () => {
    if (rotaryRef.current) {
      rotaryRef.current.material = originalMaterial
    }
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
    />
  )
}

export default Rotary

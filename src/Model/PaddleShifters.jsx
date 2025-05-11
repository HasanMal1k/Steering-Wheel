import React, { useRef, useState } from 'react'
import * as THREE from 'three'

function PaddleShifters({ geometry, material, position }) {
  const paddlesRef = useRef()

  // Create a white MeshStandardMaterial
  const whiteMaterial = new THREE.MeshStandardMaterial({ color: 'gray' })

  // Store original material to revert on hover out
  const [originalMaterial] = useState(material)

  const handlePointerOver = () => {
    if (paddlesRef.current) {
      paddlesRef.current.material = whiteMaterial
    }
  }

  const handlePointerOut = () => {
    if (paddlesRef.current) {
      paddlesRef.current.material = originalMaterial
    }
  }

  return (
    <mesh
      ref={paddlesRef}
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

export default PaddleShifters

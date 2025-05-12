import React, { useRef, useState } from 'react'
import * as THREE from 'three'
import { useTextStore } from '../TextStore'

function CenterPlate({ geometry, material, position, rotation }) {
  const centerPlateRef = useRef()
  const enableText = useTextStore(state => state.enableText)
  const disableText = useTextStore(state => state.disableText)

  // Create a white MeshStandardMaterial
  const whiteMaterial = new THREE.MeshStandardMaterial({ color: 'white' })

  // Store original material to revert on hover out
  const [originalMaterial] = useState(material)

  const handlePointerOver = () => {
    if (centerPlateRef.current) {
      centerPlateRef.current.material = whiteMaterial
    }
    enableText()
  }

  const handlePointerOut = () => {
    if (centerPlateRef.current) {
      centerPlateRef.current.material = originalMaterial
    }
    disableText()
  }

  return (
    <mesh
      ref={centerPlateRef}
      castShadow
      receiveShadow
      geometry={geometry}
      material={material}
      position={position}
      rotation={rotation}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    />
  )
}

export default CenterPlate

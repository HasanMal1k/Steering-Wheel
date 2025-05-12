import React, { useRef, useState } from 'react'
import * as THREE from 'three'
import { useTextStore } from '../TextStore'

function Rotary({ geometry, material, position }) {
  const rotaryRef = useRef()
  const enableText = useTextStore(state => state.enableText)
  const disableText = useTextStore(state => state.disableText)

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

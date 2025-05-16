import React, { useRef, useState } from 'react'
import * as THREE from 'three'
import { useTextStore } from '../TextStore'
import { useConfigurationStore } from '../ConfigurationStore'

function PaddleShifters({ geometry, material, position }) {
  const paddlesRef = useRef()
  const enableText = useTextStore(state => state.enableText)
  const disableText = useTextStore(state => state.disableText)
  const setActiveComponent = useConfigurationStore(state => state.setActiveComponent)
  // Create a white MeshStandardMaterial
  const whiteMaterial = new THREE.MeshStandardMaterial({ color: 'gray' })

  // Store original material to revert on hover out
  const [originalMaterial] = useState(material)

  const handlePointerOver = () => {
    if (paddlesRef.current) {
      paddlesRef.current.material = whiteMaterial
    }
    enableText()
  }

  const handlePointerOut = () => {
    if (paddlesRef.current) {
      paddlesRef.current.material = originalMaterial
    }
    disableText()
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
      onClick={() => setActiveComponent(paddlesRef.current)}
    />
  )
}

export default PaddleShifters

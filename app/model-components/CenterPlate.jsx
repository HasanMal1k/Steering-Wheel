import React, { useRef, useState } from 'react'
import * as THREE from 'three'
import { useTextStore } from '../utils/TextStore'
import { useConfigurationStore } from '../utils/ConfigurationStore'

function CenterPlate({ geometry, material, position, rotation }) {
  const centerPlateRef = useRef()
  const enableText = useTextStore(state => state.enableText)
  const disableText = useTextStore(state => state.disableText)
  const activeComponent = useConfigurationStore(state => state.activeComponent)
  const setActiveComponent = useConfigurationStore(state => state.setActiveComponent)
   

  // Create a white MeshStandardMaterial
  const whiteMaterial = new THREE.MeshStandardMaterial({ color: 'gray' })

  // Store original material to revert on hover out
  const [originalMaterial] = useState(material)

  const handlePointerOver = (e) => {
     e.stopPropagation()
    if (centerPlateRef.current) {
      centerPlateRef.current.material = whiteMaterial
    }
    enableText()
  }

  const handlePointerOut = (e) => {
    e.stopPropagation()
    if (centerPlateRef.current) {
      centerPlateRef.current.material = originalMaterial
    }
    disableText()
  }

   const handleClick = (e) => {
    e.stopPropagation()

    setActiveComponent('hub')
    console.log(activeComponent)
    // console.log('Paddle Shifters Selected')
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
      onClick={handleClick}
    />
  )
}

export default CenterPlate
import React, { useRef, useState } from 'react'
import * as THREE from 'three'
import { useTextStore } from '../utils/TextStore'
import { useConfigurationStore } from '../utils/ConfigurationStore'

function Steering_Wheel({ geometry, material, position }) {
  const wheelRef = useRef()
  const enableText = useTextStore(state => state.enableText)
  const disableText = useTextStore(state => state.disableText)
  const activeComponent = useConfigurationStore(state => state.activeComponent)

  // Create materials
  const hoverMaterial = new THREE.MeshStandardMaterial({ color: 'gray' })
  const [originalMaterial] = useState(material.clone())

  const handlePointerOver = (e) => {
    e.stopPropagation()
    if (wheelRef.current && activeComponent !== 'steering_wheel') {
      wheelRef.current.material = hoverMaterial
    }
    enableText()
  }

  const handlePointerOut = (e) => {
    e.stopPropagation()
    if (wheelRef.current && activeComponent !== 'steering_wheel') {
      wheelRef.current.material = originalMaterial
    }
    disableText()
  }

  return (
    <mesh
        ref={wheelRef}
        name="steering_wheel"
        castShadow
        receiveShadow
        geometry={geometry}
        material={originalMaterial}
        position={position}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      />
  )
}

export default Steering_Wheel
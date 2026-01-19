
import React, { useRef, useState } from 'react'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import { useTextStore } from '../../utils/TextStore'
import { useConfigurationStore } from '../../utils/ConfigurationStore'

export function Round_Leather_Rim(props) {
  const { nodes, materials } = useGLTF('/models/round-wheel/leatherRim.glb')
  
  const mesh1Ref = useRef()
  const mesh2Ref = useRef()
  
  const enableText = useTextStore(state => state.enableText)
  const disableText = useTextStore(state => state.disableText)
  const setActiveComponent = useConfigurationStore(state => state.setActiveComponent)

  // Create hover material
  const hoverMaterial = new THREE.MeshStandardMaterial({ color: '#ffffff' })
  
  // Store original materials
  const [originalMaterials] = useState(() => {
    const m2 = materials['Material.015'].clone()
    m2.color.set('#000000')
    return {
      m1: materials['Material.014'],
      m2: m2
    }
  })

  const handlePointerOver = (e) => {
    e.stopPropagation()
    if (mesh1Ref.current) mesh1Ref.current.material = hoverMaterial
    if (mesh2Ref.current) mesh2Ref.current.material = hoverMaterial
    enableText()
  }

  const handlePointerOut = (e) => {
    e.stopPropagation()
    if (mesh1Ref.current) mesh1Ref.current.material = originalMaterials.m1
    if (mesh2Ref.current) mesh2Ref.current.material = originalMaterials.m2
    disableText()
  }

  const handleClick = (e) => {
    e.stopPropagation()
    setActiveComponent('wheelType')
  }

  return (
    <group 
      {...props} 
      dispose={null}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      onClick={handleClick}
    >
      <mesh
        ref={mesh1Ref}
        castShadow
        receiveShadow
        geometry={nodes.Circle.geometry}
        material={originalMaterials.m1}
        position={[11.857, 0.007, 45.242]}
      />
      <mesh
        ref={mesh2Ref}
        castShadow
        receiveShadow
        geometry={nodes.Circle005.geometry}
        material={originalMaterials.m2}
        position={[11.857, 0.007, 45.242]}
      />
    </group>
  )
}

useGLTF.preload('/models/round-wheel/leatherRim.glb')
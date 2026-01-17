import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Flat_Leather_Rim(props) {
  const { nodes, materials } = useGLTF('/models/flat-wheel/leatherRim.glb')
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Circle003.geometry}
        material={materials['Material.009']}
        position={[11.857, 0.007, 45.242]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Circle004.geometry}
        material={materials['Material.010']}
        position={[11.857, 0.007, 45.242]}
      />
    </group>
  )
}

useGLTF.preload('/models/flat-wheel/leatherRim.glb')

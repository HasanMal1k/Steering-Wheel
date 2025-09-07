import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Ford(props) {
  const { nodes, materials } = useGLTF('/car-logos/Ford.glb')
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Logo_Steering_Ford_3D.geometry}
        material={materials['Material #354.002']}
        scale={0.025}
      />
    </group>
  )
}

useGLTF.preload('/car-logos/Ford.glb')

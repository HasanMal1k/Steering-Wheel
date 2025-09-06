import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Model(props) {
  const { nodes, materials } = useGLTF('/car-logos/Lamborghini.glb')
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Logo_Steering_Lamborghini_3D.geometry}
        material={materials['Material #347.002']}
        scale={0.025}
      />
    </group>
  )
}

useGLTF.preload('/car-logos/Lamborghini.glb')

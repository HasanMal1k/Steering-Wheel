import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Hyundai(props) {
  const { nodes, materials } = useGLTF('/car-logos/Hyundai.glb')
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Logo_Steering_Hyundai_3D.geometry}
        material={materials['Material #332.002']}
      />
    </group>
  )
}

useGLTF.preload('/car-logos/Hyundai.glb')
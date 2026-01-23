import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Mustang(props) {
  const { nodes, materials } = useGLTF('/car-logos/Mustang.glb')
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Logo_Steering_Mustang_3D.geometry}
        material={materials['Material #351.001']}
      />
    </group>
  )
}

useGLTF.preload('/car-logos/Mustang.glb')

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Model(props) {
  const { nodes, materials } = useGLTF('/car-logos/Toyota.glb')
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Logo_Steering_Toyota_3D.geometry}
        material={materials['Material #335.002']}
        rotation={[-Math.PI / 2, -0.655, Math.PI]}
        scale={[0.022, 0.025, 0.023]}
      />
    </group>
  )
}

useGLTF.preload('/car-logos/Toyota.glb')

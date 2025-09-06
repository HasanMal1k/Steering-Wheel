import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Model(props) {
  const { nodes, materials } = useGLTF('/car-logos/Honda.glb')
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Logo_Steering_Honda_3D.geometry}
        material={materials['Material #320.002']}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[-0.024, -0.042, -0.024]}
      />
    </group>
  )
}

useGLTF.preload('/car-logos/Honda.glb')

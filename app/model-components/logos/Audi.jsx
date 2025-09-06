import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Model(props) {
  const { nodes, materials } = useGLTF('/car-logos/Audi.glb')
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Logo_Steering_Audi_3D.geometry}
        material={materials['Material #338.001']}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={-0.024}
      />
    </group>
  )
}

useGLTF.preload('/car-logos/Audi.glb')
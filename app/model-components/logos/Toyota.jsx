import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Toyota(props) {
  const { nodes, materials } = useGLTF('/car-logos/Toyota.glb')
  return (
     <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Logo_Steering_Toyota_3D.geometry}
        material={materials['Material #335.001']}
      />
    </group>
  )
}

useGLTF.preload('/car-logos/Toyota.glb')

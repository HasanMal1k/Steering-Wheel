import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Nissan(props) {
  const { nodes, materials } = useGLTF('/car-logos/Nissan.glb')
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Logo_Steering_Nissan_3D.geometry}
        material={materials['Material #345.002']}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.025}
      />
    </group>
  )
}

useGLTF.preload('/car-logos/Nissan.glb')

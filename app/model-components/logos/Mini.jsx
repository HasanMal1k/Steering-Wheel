import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Mini(props) {
  const { nodes, materials } = useGLTF('/car-logos/Mini.glb')
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Logo_Steering_Mini_3D.geometry}
        material={materials['Material #327.002']}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.025}
      />
    </group>
  )
}

useGLTF.preload('/car-logos/Mini.glb')

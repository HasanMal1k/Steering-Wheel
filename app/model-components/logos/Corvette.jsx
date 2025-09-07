import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Corvette(props) {
  const { nodes, materials } = useGLTF('/car-logos/Corvette.glb')
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Logo_Steering_Corvette_3D.geometry}
        material={materials['Material #349.002']}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.025}
      />
    </group>
  )
}

useGLTF.preload('/car-logos/Corvette.glb')
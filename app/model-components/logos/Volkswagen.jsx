
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Volkswagen(props) {
  const { nodes, materials } = useGLTF('/car-logos/Volkswagen.glb')
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Logo_Steering_Volkswagen_3D.geometry}
        material={materials['Material #336.002']}
        rotation={[-Math.PI / 2, -0.873, Math.PI]}
        scale={0.025}
      />
    </group>
  )
}

useGLTF.preload('/car-logos/Volkswagen.glb')

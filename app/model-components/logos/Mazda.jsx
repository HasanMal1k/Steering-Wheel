
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Mazda(props) {
  const { nodes, materials } = useGLTF('/car-logos/Mazda.glb')
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Logo_Steering_Mazda_3D.geometry}
        material={materials['Material #324.002']}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.025}
      />
    </group>
  )
}

useGLTF.preload('/car-logos/Mazda.glb')

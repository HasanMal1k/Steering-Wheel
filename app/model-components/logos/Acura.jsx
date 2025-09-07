import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Acura(props) {
  const { nodes, materials } = useGLTF('/car-logos/Acura.glb')
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Logo_Steering_Acura_3D.geometry}
        material={materials['Material #316']}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.025}
      />
    </group>
  )
}

useGLTF.preload('/car-logos/Acura.glb')

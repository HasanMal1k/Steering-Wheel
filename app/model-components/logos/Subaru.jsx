import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Subaru(props) {
  const { nodes, materials } = useGLTF('/car-logos/Subaru.glb')
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Logo_Steering_Subaru_3D.geometry}
        material={materials['Material #333.002']}
        rotation={[-Math.PI / 2, -0.555, Math.PI]}
        scale={[0.019, 0.025, 0.021]}
      />
    </group>
  )
}

useGLTF.preload('/car-logos/Subaru.glb')
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
        material={materials['Material #333.001']}
        position={[11.857, 0.007, 45.242]}
      />
    </group>
  )
}

useGLTF.preload('/car-logos/Subaru.glb')
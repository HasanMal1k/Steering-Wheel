import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Porsche(props) {
  const { nodes, materials } = useGLTF('/car-logos/Porsche.glb')
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Logo_Steering_Porshe_3D.geometry}
        material={materials['Material #331.002']}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.023}
      />
    </group>
  )
}

useGLTF.preload('/car-logos/Porsche.glb')
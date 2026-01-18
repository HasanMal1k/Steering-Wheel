import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Round_Alcantara_Rim(props) {
  const { nodes, materials } = useGLTF('/models/round-wheel/alcantaraRim.glb')
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Circle.geometry}
        material={materials['Material.007']}
        position={[11.857, 0.007, 45.242]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Circle005.geometry}
        material={materials['Material.004']}
        position={[11.857, 0.007, 45.242]}
      />
    </group>
  )
}

useGLTF.preload('/models/round-wheel/alcantaraRim.glb')

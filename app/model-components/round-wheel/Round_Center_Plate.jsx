
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Round_Center_Plate(props) {
  const { nodes, materials } = useGLTF('/models/round-wheel/centerPlate.glb')
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane001.geometry}
        material={materials['Material.011']}
        position={[11.857, 0.007, 45.242]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane.geometry}
        material={materials['Material.008']}
        position={[11.857, 0.007, 45.242]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Circle002.geometry}
        material={materials['Material.012']}
        position={[11.857, 0.007, 45.242]}
      />
    </group>
  )
}

useGLTF.preload('/models/round-wheel/centerPlate.glb')

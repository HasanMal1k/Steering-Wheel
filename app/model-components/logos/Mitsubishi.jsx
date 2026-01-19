import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Mitsubishi(props) {
  const { nodes, materials } = useGLTF('/car-logos/Mitsubishi.glb')
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.uploads_files_4715654_mitshubishi_obj.geometry}
        material={nodes.uploads_files_4715654_mitshubishi_obj.material}
        rotation={[Math.PI / 2, Math.PI / 2, 0]}
      />
    </group>
  )
}

useGLTF.preload('/car-logos/Mitsubishi.glb')


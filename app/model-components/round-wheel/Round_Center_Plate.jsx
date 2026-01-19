
import React, { useRef, useState, useEffect } from 'react'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import { useTextStore } from '../../utils/TextStore'
import { useConfigurationStore } from '../../utils/ConfigurationStore'

export function Round_Center_Plate(props) {
  const { nodes, materials } = useGLTF('/models/round-wheel/centerPlate.glb')
  const centerPlateRef = useRef()
  const enableText = useTextStore(state => state.enableText)
  const disableText = useTextStore(state => state.disableText)
  const activeComponent = useConfigurationStore(state => state.activeComponent)
  const setActiveComponent = useConfigurationStore(state => state.setActiveComponent)

  // Create hover material
  const hoverMaterial = new THREE.MeshStandardMaterial({ color: '#cccccc' })
  const [originalMaterial] = useState(materials['Material.011'])

  const handlePointerOver = (e) => {
    e.stopPropagation()
    if (centerPlateRef.current && activeComponent !== 'hub') {
      // Only highlight the main plate (first mesh)
      const mainPlate = centerPlateRef.current.children[0]
      if (mainPlate && mainPlate.isMesh) {
          mainPlate.material = hoverMaterial
      }
    }
    enableText()
  }

  const handlePointerOut = (e) => {
    e.stopPropagation()
    if (centerPlateRef.current && activeComponent !== 'hub') {
        // Restore material for main plate
        const mainPlate = centerPlateRef.current.children[0]
        if (mainPlate) {
            mainPlate.material = materials['Material.011']
        }
    }
    disableText()
  }

  const handleClick = (e) => {
    e.stopPropagation()
    setActiveComponent('hub')
  }

    // Restore center plate material when hub becomes active
    useEffect(() => {
        if (activeComponent === 'hub' && centerPlateRef.current) {
            const mainPlate = centerPlateRef.current.children[0]
            if (mainPlate) {
                mainPlate.material = materials['Material.011']
            }
        }
    }, [activeComponent, materials])

  return (
    <group 
        ref={centerPlateRef}
        {...props} 
        dispose={null}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={handleClick}
    >
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

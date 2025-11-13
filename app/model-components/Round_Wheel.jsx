
import React, { useRef, useState } from 'react'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import { useTextStore } from '../utils/TextStore'
import { useConfigurationStore } from '../utils/ConfigurationStore'

export function RoundWheel(props) {
  const { nodes, materials } = useGLTF('/models/round_wheel.glb')
  const centerPlateRef = useRef()
  const wheelBodyRef = useRef()
  const enableText = useTextStore(state => state.enableText)
  const disableText = useTextStore(state => state.disableText)
  const activeComponent = useConfigurationStore(state => state.activeComponent)
  const setActiveComponent = useConfigurationStore(state => state.setActiveComponent)
  const setSelectedWheelType = useConfigurationStore(state => state.setSelectedWheelType)

  // Create hover material
  const hoverMaterial = new THREE.MeshStandardMaterial({ color: '#cccccc' })
  const wheelHoverMaterial = new THREE.MeshStandardMaterial({ color: '#cccccc' })

  // Store original material to revert on hover out
  const [originalMaterial] = useState(materials['Material.001'])
  const [originalWheelMaterial] = useState(materials['Material.001'].clone())

  const handlePointerOver = (e) => {
    e.stopPropagation()
    if (centerPlateRef.current && activeComponent !== 'hub') {
      centerPlateRef.current.material = hoverMaterial
    }
    enableText()
  }

  const handlePointerOut = (e) => {
    e.stopPropagation()
    if (centerPlateRef.current && activeComponent !== 'hub') {
      centerPlateRef.current.material = originalMaterial
    }
    disableText()
  }

  const handleClick = (e) => {
    e.stopPropagation()
    setActiveComponent('hub')
  }

  // Wheel body hover handlers
  const handleWheelPointerOver = (e) => {
    e.stopPropagation()
    if (wheelBodyRef.current) {
      wheelBodyRef.current.material = wheelHoverMaterial
    }
    enableText()
  }

  const handleWheelPointerOut = (e) => {
    e.stopPropagation()
    if (wheelBodyRef.current) {
      wheelBodyRef.current.material = originalWheelMaterial
    }
    disableText()
  }

  const handleWheelClick = (e) => {
    e.stopPropagation()
    setSelectedWheelType('round')
    setActiveComponent('wheelType')
  }

  return (
    <group {...props} dispose={null}>
      <mesh
        ref={wheelBodyRef}
        name="Round Wheel"
        castShadow
        receiveShadow
        geometry={nodes.steering_wheel.geometry}
        material={materials['Material.001']}
        position={[11.857, 0.007, 45.242]}
        onPointerOver={handleWheelPointerOver}
        onPointerOut={handleWheelPointerOut}
        onClick={handleWheelClick}
      />
      <mesh
        ref={centerPlateRef}
        name="Center Plate"
        castShadow
        receiveShadow
        geometry={nodes.Wheel_Center_plate.geometry}
        material={materials['Material.001']}
        position={[0.618, 6.065, -4.153]}
        rotation={[0, -1.55, 0]}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={handleClick}
      />
    </group>
  )
}

useGLTF.preload('/models/round_wheel.glb')

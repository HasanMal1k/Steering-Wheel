import React, { useRef, useState, useEffect } from 'react'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import gsap from 'gsap'
import { useTextStore } from '../utils/TextStore'
import { useConfigurationStore } from '../utils/ConfigurationStore'

export function GT3Wheel(props) {
  const { nodes, materials } = useGLTF('/models/gt3_wheel.glb')
  const centerPlateRef = useRef()
  const wheelGroupRef = useRef()
  const enableText = useTextStore(state => state.enableText)
  const disableText = useTextStore(state => state.disableText)
  const activeComponent = useConfigurationStore(state => state.activeComponent)
  const setActiveComponent = useConfigurationStore(state => state.setActiveComponent)
  const setSelectedWheelType = useConfigurationStore(state => state.setSelectedWheelType)

  // Create hover material
  const hoverMaterial = new THREE.MeshStandardMaterial({ color: '#cccccc' })

  // Store original material to revert on hover out
  const [originalMaterial] = useState(materials['Material.005'])
  const [originalWheelMaterials] = useState({
    material001: materials['Material.001'].clone(),
    material005: materials['Material.005'].clone(),
    material006: materials['Material.006'].clone(),
    material007: materials['Material.007'].clone(),
  })

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

  // Restore center plate material when hub becomes active
  useEffect(() => {
    if (activeComponent === 'hub' && centerPlateRef.current) {
      centerPlateRef.current.material = originalMaterial
    }
  }, [activeComponent, originalMaterial])

  // Restore wheel materials when wheelType is active
  useEffect(() => {
    if (wheelGroupRef.current && activeComponent === 'wheelType') {
      wheelGroupRef.current.traverse((child) => {
        if (child.isMesh) {
          if (child.name === 'Circle002') {
            child.material = originalWheelMaterials.material001
          } else if (child.name === 'Body2') {
            child.material = originalWheelMaterials.material007
          } else if (child.name === 'Body1_1') {
            child.material = originalWheelMaterials.material005
          } else if (child.name === 'Body1_2') {
            child.material = originalWheelMaterials.material006
          }
        }
      })
    }
  }, [activeComponent, originalWheelMaterials])

  // Wheel body hover handlers - only affect GT3 Wheel group
  const handleWheelPointerOver = (e) => {
    e.stopPropagation()
    // Change all meshes in the GT3 Wheel group to hover color
    if (wheelGroupRef.current) {
      wheelGroupRef.current.traverse((child) => {
        if (child.isMesh) {
          child.material = hoverMaterial
        }
      })
    }
    enableText()
  }

  const handleWheelPointerOut = (e) => {
    e.stopPropagation()
    // Restore original materials for GT3 Wheel group
    if (wheelGroupRef.current) {
      wheelGroupRef.current.traverse((child) => {
        if (child.isMesh) {
          if (child.name === 'Circle002') {
            child.material = originalWheelMaterials.material001
          } else if (child.name === 'Body2') {
            child.material = originalWheelMaterials.material007
          } else if (child.name === 'Body1_1') {
            child.material = originalWheelMaterials.material005
          } else if (child.name === 'Body1_2') {
            child.material = originalWheelMaterials.material006
          }
        }
      })
    }
    disableText()
  }

  const handleWheelClick = (e) => {
    e.stopPropagation()
    console.log('GT3 Wheel clicked - setting wheelType to gt3')
    setSelectedWheelType('gt3')
    setActiveComponent('wheelType')
  }

  return (
    <group {...props} dispose={null}>
      <mesh
        ref={centerPlateRef}
        name="Center Plate"
        castShadow
        receiveShadow
        geometry={nodes.Plane001.geometry}
        material={originalMaterial}
        position={[11.857, 0.007, 45.242]}
        renderOrder={1}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={handleClick}
      />
      <group 
        ref={wheelGroupRef}
        name='GT3 Wheel'
        onPointerOver={activeComponent !== 'hub' && activeComponent !== 'wheelType' ? handleWheelPointerOver : undefined}
        onPointerOut={activeComponent !== 'hub' && activeComponent !== 'wheelType' ? handleWheelPointerOut : undefined}
        onClick={activeComponent !== 'hub' && activeComponent !== 'wheelType' ? handleWheelClick : undefined}
      >
        <mesh
            name="Circle002"
            castShadow
            receiveShadow
            geometry={nodes.Circle002.geometry}
            material={materials['Material.001']}
            position={[11.857, 0.007, 45.242]}
        />
        <mesh
            name="Body2"
            castShadow
            receiveShadow
            geometry={nodes.Body2.geometry}
            material={materials['Material.007']}
            position={[11.857, 0.007, 45.242]}
        />
        <group name="Body1" position={[11.857, 0.007, 45.242]}>
            <mesh
            name="Body1_1"
            castShadow
            receiveShadow
            geometry={nodes.Body1_1.geometry}
            material={materials['Material.005']}
            />
            <mesh
            name="Body1_2"
            castShadow
            receiveShadow
            geometry={nodes.Body1_2.geometry}
            material={materials['Material.006']}
            />
        </group>
        </group>
    </group>
  )
}

useGLTF.preload('/models/gt3_wheel.glb')

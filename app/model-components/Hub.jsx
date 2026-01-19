'use client'

import React, { useRef, useEffect, useMemo } from 'react'
import { useGLTF } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { useState } from 'react'
import PaddleShifters from './PaddleShifters'
import Rotary from './Rotary'
import Joysticks from './Joysticks'
import Main_Controller from './Main_Controller'
import { useConfigurationStore } from '../utils/ConfigurationStore'
import useResponsiveScale from '../hooks/useResponsiveScale'
import gsap from 'gsap'
import Blue_Buttons from './Blue_Buttons'
import Back_Wheel_Shifter from './Back_Wheel_Shifter'
import Purple_Button from './Purple_Button'
import White_Button from './White_Button'
import Red_Buttons from './Red_Buttons'
import Green_Buttons from './Green_Buttons'
import Car_Logos from './Car_Logos'
import Steering_Wheel_Options from './Steering_Wheel_Options'

export function Hub(props) {
  const { nodes, materials } = useGLTF('/models/hub_only.glb')
  const [wheelHover, setWheelHover] = useState(null)
  const [wheelClicked, setWheelClicked] = useState(false)
  const activeComponent = useConfigurationStore(state => state.activeComponent)
  const selectedWheelType = useConfigurationStore(state => state.selectedWheelType)
  const wheelGroupRef = useRef()
  const scale = useResponsiveScale()

  // Handle wheel rotation when paddles are selected
  useEffect(() => {
    if (!wheelGroupRef.current) return

    const componentType = activeComponent

    if (componentType === 'paddles') {
      // Rotate to show back side (180 degrees around Z-axis)
      gsap.to(wheelGroupRef.current.rotation, {
        z: 0, // 180 degrees
        duration: 1.2,
        ease: "power2.inOut"
      })
    }
    else if (activeComponent == null){
      return
    }
    else {
      // Return to front view for other components or when nothing is selected
      gsap.to(wheelGroupRef.current.rotation, {
        z: Math.PI,
        duration: 1.2,
        ease: "power2.inOut"
      })
    }
  }, [activeComponent])

  const materialList = useMemo(() => {
    const list = []
    // Ensure materials exist before cloning to prevent errors
    const mat1 = materials['Material.001'] ? materials['Material.001'].clone() : null
    const mat2 = materials['Material.002'] ? materials['Material.002'].clone() : null
    const mat3 = materials['Material.003'] ? materials['Material.003'].clone() : null
    return [mat1, mat2, mat3]
  }, [materials])

  const [clonedMaterial1, clonedMaterial2, clonedMaterialButtons] = materialList

  // Animate opacity changes for main components
  useEffect(() => {
    const materialsToAnimate = [clonedMaterial1, clonedMaterial2, clonedMaterialButtons].filter(Boolean)
    if (materialsToAnimate.length === 0) return

    // If activeComponent is set, but we are in Hub Only mode, do NOT fade.
    // Logic: Fade only if there is an active component AND we are NOT in Hub Only mode.
    // Or maybe user meant specifically for Hub selection?
    // "when it's hub only, don't fade the hub like we're doing for other parts"
    
    if (activeComponent && selectedWheelType !== 'hub') {
      // Fade non-interactive components when something is selected
      materialsToAnimate.forEach(mat => {
        mat.transparent = true
        mat.depthWrite = false
      })
      
      gsap.to(materialsToAnimate, {
        opacity: 0.4,
        duration: 0.6,
        ease: "power2.out",
        onUpdate: () => {
          materialsToAnimate.forEach(mat => mat.needsUpdate = true)
        }
      })
        
    } else {
      // Restore full opacity when nothing is selected OR when in Hub Only mode
      materialsToAnimate.forEach(mat => {
        mat.transparent = true
      })
      
      gsap.to(materialsToAnimate, {
        opacity: 1,
        duration: 0.6,
        ease: "power2.out",
        onUpdate: () => {
             materialsToAnimate.forEach(mat => mat.needsUpdate = true)
        },
        onComplete: () => {
          materialsToAnimate.forEach(mat => {
            mat.transparent = false
            mat.depthWrite = true
          })
        }
      })
    }
  }, [activeComponent, selectedWheelType, clonedMaterial1, clonedMaterial2, clonedMaterialButtons])
 
  return (
    <group
      ref={wheelGroupRef}
      {...props}
      dispose={null}
      onPointerEnter={(e) => {
        e.stopPropagation()
        if(document.body.style.cursor === 'grabbing') return
        document.body.style.cursor = 'grab'
      }}
      onPointerLeave={(e) => {
        e.stopPropagation()
        // Only change cursor if not currently grabbing
        if(document.body.style.cursor !== 'grabbing') {
          document.body.style.cursor = 'default'
          setWheelHover(false)
        }
      }}
      onPointerDown={(e) => {
        e.stopPropagation()
        document.body.style.cursor = 'grabbing'
      }}
      onPointerUp={(e) => {
        e.stopPropagation()
        if(document.body.style.cursor === 'grabbing') {
          document.body.style.cursor = 'grab'
        }
      }}
    >
      <group position={[10.185, -11.39, 4.38]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes['hub2_v2_-_2025-2-24改_v2002'].geometry}
          material={clonedMaterial1 || materials['Material.001']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes['hub2_v2_-_2025-2-24改_v2002_1'].geometry}
          material={clonedMaterial2 || materials['Material.002']}
        />
      </group>
      
      <PaddleShifters
        geometry={nodes.PADDLE_SHIFTERS.geometry}
        material={materials['Material.003']}
        position={[-0.354, -33.299, -5.847]}
      />

      <Rotary
        geometry={nodes.side_knobs.geometry}
        material={materials['Material.003']}
        position={[-0.578, -11.321, 34.052]}
      />

      <Joysticks
        geometry={nodes.joysticks.geometry}
        material={materials['Material.003']}
        position={[0.516, 9.115, 51.946]}
      />

      <Back_Wheel_Shifter
        geometry={nodes.back_wheel_shifter.geometry}
        material={clonedMaterialButtons}
        position={[0.006, -31.661, 0.651]}
      />

      <Purple_Button
        geometry={nodes.purple_button.geometry}
        material={clonedMaterialButtons}
        position={[76.896, 5.438, -52.245]}
      />

      <Blue_Buttons
        geometry_1={nodes.blue_buttons.geometry}
        material_1={clonedMaterialButtons}
        position_1={[40.306, 1.324, 23.029]}

        geometry_2={nodes.blue_buttons001.geometry}
        material_2={clonedMaterialButtons}
        position_2={[-57.297, 5.453, -67.962]}

        geometry_3={nodes.blue_buttons002.geometry}
        material_3={clonedMaterialButtons}
        position_3={[57.542, 5.452, -68.008]}
      
        geometry_4={nodes.blue_buttons003.geometry}
        material_4={clonedMaterialButtons}
        position_4={[64.507, 5.455, 29.659]}
      
        geometry_5={nodes.blue_buttons004.geometry}
        material_5={clonedMaterialButtons}
        position_5={[-64.321, 5.453, 29.483]}
      />

      <White_Button
        geometry={nodes.white_button.geometry}
        material={clonedMaterialButtons}
        position={[-76.703, 5.449, -52.255]}
      />

      <Red_Buttons
        geometry_1={nodes.red_buttons.geometry}
        material_1={clonedMaterialButtons}
        position_1={[-48.945, 1.306, 34.954]}

        geometry_2={nodes.red_buttons001.geometry}
        material_2={clonedMaterialButtons}
        position_2={[41.987, 5.458, -54.999]}

        geometry_3={nodes.red_buttons002.geometry}
        material_3={clonedMaterialButtons}
        position_3={[74.318, 5.451, 55.843]}

        geometry_4={nodes.red_buttons003.geometry}
        material_4={clonedMaterialButtons}
        position_4={[-74.037, 5.45, 55.838]}

        geometry_5={nodes.red_buttons004.geometry}
        material_5={clonedMaterialButtons}
        position_5={[-41.929, 5.448, -54.998]}
      />

      <Green_Buttons
        geometry={nodes.green_buttons.geometry}
        material={clonedMaterialButtons}
        position={[1.543, 1.532, 39.796]}
      />

      <Car_Logos />

      <Steering_Wheel_Options />

    </group>
  )
}

useGLTF.preload('/models/hub_only.glb')
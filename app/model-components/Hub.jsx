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

  const clonedMaterial = useMemo(() => {
    return materials['Material.002'].clone()
  }, [materials])

  const clonedMaterialButtons = useMemo(() => {
    return materials['Material.002'].clone()
  }, [materials])

  // Animate opacity changes for main components
  useEffect(() => {
    if (activeComponent) {
      // Fade non-interactive components when something is selected
      clonedMaterial.transparent = true
      clonedMaterialButtons.transparent = true
      
      gsap.to([clonedMaterial, clonedMaterialButtons], {
        opacity: 0.4,
        duration: 0.6,
        ease: "power2.out",
        onUpdate: () => {
          clonedMaterial.needsUpdate = true
          clonedMaterialButtons.needsUpdate = true
        }
      })
      
      // Also disable depth write for better transparency
      clonedMaterial.depthWrite = false
        
    } else {
      // Restore full opacity when nothing is selected
      clonedMaterial.transparent = true
      clonedMaterialButtons.transparent = true
      
      gsap.to([clonedMaterial, clonedMaterialButtons], {
        opacity: 1,
        duration: 0.6,
        ease: "power2.out",
        onUpdate: () => {
          clonedMaterial.needsUpdate = true
          clonedMaterialButtons.needsUpdate = true
        },
        onComplete: () => {
          clonedMaterial.transparent = false
          clonedMaterialButtons.transparent = false
          clonedMaterial.depthWrite = true
        }
      })
    }
  }, [activeComponent, clonedMaterial, clonedMaterialButtons])
 
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
      <Main_Controller
        geometry={nodes.main_controler.geometry}
        material={clonedMaterial}
        position={[10.607, -11.39, 4.38]}
      />
      
      <PaddleShifters
        geometry={nodes.PADDLE_SHIFTERS.geometry}
        material={materials['Material.002']}
        position={[-0.311, -33.299, -5.847]}
      />

      <Rotary
        geometry={nodes.side_knobs.geometry}
        material={materials['Material.002']}
        position={[-0.534, -11.321, 34.052]}
      />

      <Joysticks
        geometry={nodes.joysticks.geometry}
        material={materials['Material.002']}
        position={[0.559, 9.115, 51.946]}
      />

      <Back_Wheel_Shifter
        geometry={nodes.back_wheel_shifter.geometry}
        material={clonedMaterial}
        position={[0.049, -31.661, 0.651]}
      />

      <Purple_Button
        geometry={nodes.purple_button.geometry}
        material={clonedMaterial}
        position={[76.939, 5.438, -52.245]}
      />

      <Blue_Buttons
        geometry_1={nodes.blue_buttons.geometry}
        material_1={clonedMaterialButtons}
        position_1={[40.35, 1.324, 23.029]}

        geometry_2={nodes.blue_buttons001.geometry}
        material_2={clonedMaterialButtons}
        position_2={[-57.253, 5.453, -67.962]}

        geometry_3={nodes.blue_buttons002.geometry}
        material_3={clonedMaterialButtons}
        position_3={[57.585, 5.452, -68.008]}
      
        geometry_4={nodes.blue_buttons003.geometry}
        material_4={clonedMaterialButtons}
        position_4={[64.551, 5.455, 29.659]}
      
        geometry_5={nodes.blue_buttons004.geometry}
        material_5={clonedMaterialButtons}
        position_5={[-64.278, 5.453, 29.483]}
      />

      <White_Button
        geometry={nodes.white_button.geometry}
        material={clonedMaterialButtons}
        position={[-76.66, 5.449, -52.255]}
      />

      <Red_Buttons
        geometry_1={nodes.red_buttons.geometry}
        material_1={clonedMaterialButtons}
        position_1={[-48.902, 1.306, 34.954]}

        geometry_2={nodes.red_buttons001.geometry}
        material_2={clonedMaterialButtons}
        position_2={[42.031, 5.458, -54.999]}

        geometry_3={nodes.red_buttons002.geometry}
        material_3={clonedMaterialButtons}
        position_3={[74.361, 5.451, 55.843]}

        geometry_4={nodes.red_buttons003.geometry}
        material_4={clonedMaterialButtons}
        position_4={[-73.993, 5.45, 55.838]}

        geometry_5={nodes.red_buttons004.geometry}
        material_5={clonedMaterialButtons}
        position_5={[-41.885, 5.448, -54.998]}
      />

      <Green_Buttons
        geometry={nodes.green_buttons.geometry}
        material={clonedMaterialButtons}
        position={[1.586, 1.532, 39.796]}
      />

      <Car_Logos />

      <Steering_Wheel_Options />

    </group>
  )
}

useGLTF.preload('/models/hub_only.glb')
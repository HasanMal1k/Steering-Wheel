import React, { useRef, useEffect, useMemo } from 'react'
import { useGLTF } from '@react-three/drei'
import { useState } from 'react'
import PaddleShifters from './PaddleShifters'
import Rotary from './Rotary'
import Joysticks from './Joysticks'
import Main_Controller from './Main_Controller'
import CenterPlate from './CenterPlate'
import { useConfigurationStore } from '../ConfigurationStore'
import gsap from 'gsap'
import Blue_Buttons from './Blue_Buttons'
import Steering_Wheel from './Steering_Wheel'
import Back_Wheel_Shifter from './Back_Wheel_Shifter'
import Purple_Button from './Purple_Button'
import White_Button from './White_Button'
import Red_Buttons from './Red_Buttons'
import Green_Buttons from './Green_Buttons'

export function Wheel(props) {
  const { nodes, materials } = useGLTF('/Models/Wheel.glb')
  const [wheelHover, setWheelHover] = useState(null)
  const [wheelClicked, setWheelClicked] = useState(false)
  const activeComponent = useConfigurationStore(state => state.activeComponent)
  const wheelGroupRef = useRef()
  
  console.log(activeComponent)

  useEffect(() => {
    console.log(wheelGroupRef.current.rotation)

  }, [wheelGroupRef])


  // Handle wheel rotation when paddles are selected
  useEffect(() => {
    if (!wheelGroupRef.current) return

    const componentType = activeComponent?.current?.userData?.type

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
    return materials['Material.001']
  }, [])

  useEffect(() => {

    if(activeComponent){
      clonedMaterial.transparent = true
      clonedMaterial.opacity = 0.4
    }
    else {
      clonedMaterial.transparent = true
      clonedMaterial.opacity = 1
    }
    
  }, [activeComponent])
 
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
        position={[11.857, 0.007, 45.242]}
      />
      <Steering_Wheel
        geometry={nodes.steering_wheel.geometry}
        material={clonedMaterial}
        position={[11.857, 0.007, 45.242]}
      />
      <PaddleShifters
        geometry={nodes.PADDLE_SHIFTERS.geometry}
        material={materials['Material.001']}
        position={[11.857, 0.007, 45.242]}
      />
      <Rotary
        geometry={nodes.side_knobs.geometry}
        material={materials['Material.001']}
        position={[11.857, 0.007, 45.242]}
      />
      <Joysticks
        geometry={nodes.joysticks.geometry}
        material={materials['Material.001']}
        position={[11.857, 0.007, 45.242]}
      />
      <Back_Wheel_Shifter
        geometry={nodes.back_wheel_shifter.geometry}
        material={clonedMaterial}
        position={[11.857, 0.007, 45.242]}
      />
      <Purple_Button
        geometry={nodes.purple_button.geometry}
        material={clonedMaterial}
        position={[11.857, 0.007, 45.242]}
      />
      <Blue_Buttons
        geometry_1={nodes.blue_buttons.geometry}
        material_1={clonedMaterial}
        position_1={[11.857, 0.007, 45.242]}

        geometry_2={nodes.blue_buttons001.geometry}
        material_2={clonedMaterial}
        position_2={[11.857, 0.007, 45.242]}

        
        geometry_3={nodes.blue_buttons002.geometry}
        material_3={clonedMaterial}
        position_3={[11.857, 0.007, 45.242]}
      
        geometry_4={nodes.blue_buttons003.geometry}
        material_4={clonedMaterial}
        position_4={[11.857, 0.007, 45.242]}
      
      
        geometry_5={nodes.blue_buttons004.geometry}
        material_5={clonedMaterial}
        position_5={[11.857, 0.007, 45.242]}

      />
      <White_Button
        geometry={nodes.white_button.geometry}
        material={clonedMaterial}
        position={[11.857, 0.007, 45.242]}
      />

      <Red_Buttons
        geometry_1={nodes.red_buttons.geometry}
        material_1={clonedMaterial}
        position_1={[11.857, 0.007, 45.242]}

        geometry_2={nodes.red_buttons001.geometry}
        material_2={clonedMaterial}
        position_2={[11.857, 0.007, 45.242]}

        geometry_3={nodes.red_buttons002.geometry}
        material_3={clonedMaterial}
        position_3={[11.857, 0.007, 45.242]}

        geometry_4={nodes.red_buttons003.geometry}
        material_4={clonedMaterial}
        position_4={[11.857, 0.007, 45.242]}

        geometry_5={nodes.red_buttons004.geometry}
        material_5={clonedMaterial}
        position_5={[11.857, 0.007, 45.242]}
        
      />

      <Green_Buttons
        geometry={nodes.green_buttons.geometry}
        material={clonedMaterial}
        position={[11.857, 0.007, 45.242]}
      />

      
      <CenterPlate
        name="Wheel_Center_plate"
        castShadow
        receiveShadow
        geometry={nodes.Wheel_Center_plate.geometry}
        material={clonedMaterial}
        position={[0.618, 6.065, -4.153]}
        rotation={[0, -1.55, 0]}  
      />
    </group>
  )
}

useGLTF.preload('/Models/Wheel.glb')
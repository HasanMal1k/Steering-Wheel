import React, { useRef, useEffect } from 'react'
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
        name="main_controler"
        castShadow
        receiveShadow
        geometry={nodes.main_controler.geometry}
        material={materials['Material.001']}
        position={[11.857, 0.007, 45.242]}
      />
      <Blue_Buttons
        castShadow
        receiveShadow
        geometry={nodes.blue_buttons.geometry}
        material={materials['Material.001']}
        position={[11.857, 0.007, 45.242]}
      />
      <Steering_Wheel
        castShadow
        receiveShadow
        geometry={nodes.steering_wheel.geometry}
        material={materials['Material.001']}
        position={[11.857, 0.007, 45.242]}
      />
      <PaddleShifters
        name="PADDLE_SHIFTERS"
        // ref = {paddlesRef}
        castShadow
        receiveShadow
        geometry={nodes.PADDLE_SHIFTERS.geometry}
        material={materials['Material.001']}
        position={[11.857, 0.007, 45.242]}
      />
      <Rotary
        name="side_knobs"
        castShadow
        receiveShadow
        geometry={nodes.side_knobs.geometry}
        material={materials['Material.001']}
        position={[11.857, 0.007, 45.242]}
      />
      <Joysticks
        name="joysticks"
        castShadow
        receiveShadow
        geometry={nodes.joysticks.geometry}
        material={materials['Material.001']}
        position={[11.857, 0.007, 45.242]}
      />
      <Back_Wheel_Shifter
        castShadow
        receiveShadow
        geometry={nodes.back_wheel_shifter.geometry}
        material={materials['Material.001']}
        position={[11.857, 0.007, 45.242]}
      />
      <mesh
        name="purple_button"
        castShadow
        receiveShadow
        geometry={nodes.purple_button.geometry}
        material={materials['Material.001']}
        position={[11.857, 0.007, 45.242]}
      />
      <mesh
        name="white_button" 
        castShadow
        receiveShadow
        geometry={nodes.white_button.geometry}
        material={materials['Material.001']}
        position={[11.857, 0.007, 45.242]}
      />
      <mesh
        name="red_buttons"
        castShadow
        receiveShadow
        geometry={nodes.red_buttons.geometry}
        material={materials['Material.001']}
        position={[11.857, 0.007, 45.242]}
      />
      <mesh
        name="green_buttons"
        castShadow
        receiveShadow
        geometry={nodes.green_buttons.geometry}
        material={materials['Material.001']}
        position={[11.857, 0.007, 45.242]}
      />
      <mesh
        name="red_buttons001"
        castShadow
        receiveShadow
        geometry={nodes.red_buttons001.geometry}
        material={materials['Material.001']}
        position={[11.857, 0.007, 45.242]}
      />
      <mesh
        name="red_buttons002"
        castShadow
        receiveShadow
        geometry={nodes.red_buttons002.geometry}
        material={materials['Material.001']}
        position={[11.857, 0.007, 45.242]}
      />
      <mesh
        name="red_buttons003"
        castShadow
        receiveShadow
        geometry={nodes.red_buttons003.geometry}
        material={materials['Material.001']}
        position={[11.857, 0.007, 45.242]}
      />
      <mesh
        name="red_buttons004"
        castShadow
        receiveShadow
        geometry={nodes.red_buttons004.geometry}
        material={materials['Material.001']}
        position={[11.857, 0.007, 45.242]}
      />
      <mesh
        name="blue_buttons001"
        castShadow
        receiveShadow
        geometry={nodes.blue_buttons001.geometry}
        material={materials['Material.001']}
        position={[11.857, 0.007, 45.242]}
      />
      <mesh
        name="blue_buttons002"
        castShadow
        receiveShadow
        geometry={nodes.blue_buttons002.geometry}
        material={materials['Material.001']}
        position={[11.857, 0.007, 45.242]}
      />
      <mesh
        name="blue_buttons003"
        castShadow
        receiveShadow
        geometry={nodes.blue_buttons003.geometry}
        material={materials['Material.001']}
        position={[11.857, 0.007, 45.242]}
      />
      <mesh
        name="blue_buttons004"
        castShadow
        receiveShadow
        geometry={nodes.blue_buttons004.geometry}
        material={materials['Material.001']}
        position={[11.857, 0.007, 45.242]}
      />
      <CenterPlate
        name="Wheel_Center_plate"
        castShadow
        receiveShadow
        geometry={nodes.Wheel_Center_plate.geometry}
        material={materials['Material.001']}
        position={[0.618, 6.065, -4.153]}
        rotation={[0, -1.55, 0]}  
      />
    </group>
  )
}

useGLTF.preload('/Models/Wheel.glb')
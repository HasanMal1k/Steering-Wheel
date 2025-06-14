import React, { useRef, useEffect } from 'react'
import { useGLTF } from '@react-three/drei'
import { useState } from 'react'
import PaddleShifters from './PaddleShifters'
import Rotary from './Rotary'
import Joysticks from './Joysticks'
import CenterPlate from './CenterPlate'
import { useConfigurationStore } from '../ConfigurationStore'
import gsap from 'gsap'

export function Wheel(props) {
  const { nodes, materials } = useGLTF('/Models/Wheel.glb')
  const [wheelHover, setWheelHover] = useState(null)
  const [wheelClicked, setWheelClicked] = useState(false)
  const activeComponent = useConfigurationStore(state => state.activeComponent)
  const wheelGroupRef = useRef()
  
  console.log(activeComponent)

  // Handle wheel rotation when paddles are selected
  useEffect(() => {
    if (!wheelGroupRef.current) return

    const componentType = activeComponent?.current?.userData?.type

    if (componentType === 'paddles') {
      // Rotate to show back side (180 degrees around Z-axis)
      gsap.to(wheelGroupRef.current.rotation, {
        z: Math.PI, // 180 degrees
        duration: 1.2,
        ease: "power2.inOut"
      })
    } else {
      // Return to front view for other components or when nothing is selected
      gsap.to(wheelGroupRef.current.rotation, {
        z: 0,
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
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.main_controler.geometry}
        material={materials['Material.001']}
        position={[11.857, 0.007, 45.242]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.blue_buttons.geometry}
        material={materials['Material.001']}
        position={[11.857, 0.007, 45.242]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.steering_wheel.geometry}
        material={materials['Material.001']}
        position={[11.857, 0.007, 45.242]}
      />
      <PaddleShifters
        // ref = {paddlesRef}
        castShadow
        receiveShadow
        geometry={nodes.PADDLE_SHIFTERS.geometry}
        material={materials['Material.001']}
        position={[11.857, 0.007, 45.242]}
      />
      <Rotary
        castShadow
        receiveShadow
        geometry={nodes.side_knobs.geometry}
        material={materials['Material.001']}
        position={[11.857, 0.007, 45.242]}
      />
      <Joysticks
        castShadow
        receiveShadow
        geometry={nodes.joysticks.geometry}
        material={materials['Material.001']}
        position={[11.857, 0.007, 45.242]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.back_wheel_shifter.geometry}
        material={materials['Material.001']}
        position={[11.857, 0.007, 45.242]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.purple_button.geometry}
        material={materials['Material.001']}
        position={[11.857, 0.007, 45.242]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.white_button.geometry}
        material={materials['Material.001']}
        position={[11.857, 0.007, 45.242]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.red_buttons.geometry}
        material={materials['Material.001']}
        position={[11.857, 0.007, 45.242]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.green_buttons.geometry}
        material={materials['Material.001']}
        position={[11.857, 0.007, 45.242]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.red_buttons001.geometry}
        material={materials['Material.001']}
        position={[11.857, 0.007, 45.242]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.red_buttons002.geometry}
        material={materials['Material.001']}
        position={[11.857, 0.007, 45.242]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.red_buttons003.geometry}
        material={materials['Material.001']}
        position={[11.857, 0.007, 45.242]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.red_buttons004.geometry}
        material={materials['Material.001']}
        position={[11.857, 0.007, 45.242]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.blue_buttons001.geometry}
        material={materials['Material.001']}
        position={[11.857, 0.007, 45.242]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.blue_buttons002.geometry}
        material={materials['Material.001']}
        position={[11.857, 0.007, 45.242]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.blue_buttons003.geometry}
        material={materials['Material.001']}
        position={[11.857, 0.007, 45.242]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.blue_buttons004.geometry}
        material={materials['Material.001']}
        position={[11.857, 0.007, 45.242]}
      />
      <CenterPlate
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
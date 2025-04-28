import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useState } from 'react'

export function Wheel(props) {
  const { nodes, materials } = useGLTF('/Models/Wheel.glb')
  const [wheelHover, setWheelHover] = useState(null)
  const [wheelClicked, setWheelClicked] = useState(false)

  // For Just Grab
  const handleWheelHoverEnter = () => {
    setWheelHover('hovering')
    document.body.style.cursor = 'grab'
  }

  // For Grabbing -- Closing the Hand
  const handleWheelClick = () => {
    setWheelHover('click')
    document.body.style.cursor = 'grabbing'
  }

  const handleWheelHoverExit = () => {

    if(wheelClicked){
      return
    }
    setWheelHover(null)
    wheelClicked(null)
    document.body.style.cursor = 'default'
   
  }




  return (
    <group 

    {...props} 

    dispose={null}

    onPointerEnter={(e) => {
      e.stopPropagation()
      handleWheelHoverEnter()
    }}

    onPointerLeave={(e) => {
      e.stopPropagation()
      handleWheelHoverExit()
    }}

    onPointerDown={(e) => {
      e.stopPropagation()
      handleWheelClick()
    }}
    
    onPointerUp={(e) => {
      e.stopPropagation()
      handleWheelHoverEnter()
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
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.PADDLE_SHIFTERS.geometry}
        material={materials['Material.001']}
        position={[11.857, 0.007, 45.242]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.side_knobs.geometry}
        material={materials['Material.001']}
        position={[11.857, 0.007, 45.242]}
      />
      <mesh
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
      <mesh
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
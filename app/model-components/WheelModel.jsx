'use client'

import React, { useRef, useEffect, useMemo } from 'react'
import { useGLTF } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { useState } from 'react'
import PaddleShifters from './PaddleShifters'
import Rotary from './Rotary'
import Joysticks from './Joysticks'
import Main_Controller from './Main_Controller'
import CenterPlate from './CenterPlate'
import { useConfigurationStore } from '../utils/ConfigurationStore'
import useResponsiveScale from '../hooks/useResponsiveScale'
import gsap from 'gsap'
import Blue_Buttons from './Blue_Buttons'
import Steering_Wheel from './Steering_Wheel'
import Back_Wheel_Shifter from './Back_Wheel_Shifter'
import Purple_Button from './Purple_Button'
import White_Button from './White_Button'
import Red_Buttons from './Red_Buttons'
import Green_Buttons from './Green_Buttons'
import Car_Logos from './Car_Logos'

export function Wheel(props) {
  const { nodes, materials } = useGLTF('/Models/Hub.glb')
  const [wheelHover, setWheelHover] = useState(null)
  const [wheelClicked, setWheelClicked] = useState(false)
  const activeComponent = useConfigurationStore(state => state.activeComponent)
  const wheelGroupRef = useRef()
  const  scale  = useResponsiveScale()
  
  // console.log(activeComponent)


  // Tried initial animation here, but will put code in scene
  // useEffect(() => {
  //   if(wheelGroupRef.current){
  //     gsap.fromTo(wheelGroupRef.current.rotation, 
  //       { z: 0.3 },
  //       { z: 1, duration: 1 }
  //     )
  //   }
  // }, [wheelGroupRef])

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
    return materials['Material.001'].clone()
  }, [])

  const clonedMaterialButtons = useMemo(() => {
    return materials['Material.001'].clone()
  }, [])

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
        material_1={clonedMaterialButtons}
        position_1={[11.857, 0.007, 45.242]}

        geometry_2={nodes.blue_buttons001.geometry}
        material_2={clonedMaterialButtons}
        position_2={[11.857, 0.007, 45.242]}

        
        geometry_3={nodes.blue_buttons002.geometry}
        material_3={clonedMaterialButtons}
        position_3={[11.857, 0.007, 45.242]}
      
        geometry_4={nodes.blue_buttons003.geometry}
        material_4={clonedMaterialButtons}
        position_4={[11.857, 0.007, 45.242]}
      
      
        geometry_5={nodes.blue_buttons004.geometry}
        material_5={clonedMaterial}
        position_5={[11.857, 0.007, 45.242]}

      />
      <White_Button
        geometry={nodes.white_button.geometry}
        material={clonedMaterialButtons}
        position={[11.857, 0.007, 45.242]}
      />

      <Red_Buttons
        geometry_1={nodes.red_buttons.geometry}
        material_1={clonedMaterialButtons}
        position_1={[11.857, 0.007, 45.242]}

        geometry_2={nodes.red_buttons001.geometry}
        material_2={clonedMaterialButtons}
        position_2={[11.857, 0.007, 45.242]}

        geometry_3={nodes.red_buttons002.geometry}
        material_3={clonedMaterialButtons}
        position_3={[11.857, 0.007, 45.242]}

        geometry_4={nodes.red_buttons003.geometry}
        material_4={clonedMaterialButtons}
        position_4={[11.857, 0.007, 45.242]}

        geometry_5={nodes.red_buttons004.geometry}
        material_5={clonedMaterialButtons}
        position_5={[11.857, 0.007, 45.242]}
        
      />

      <Green_Buttons
        geometry={nodes.green_buttons.geometry}
        material={clonedMaterialButtons}
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

      {/* <Acura 
        castShadow
        receiveShadow
        position={[0, 8.3, 0]} 
        rotation={[ Math.PI * 0.5, Math.PI, Math.PI ]} 
        scale={50} /> */}

        {/* <Audi 
        castShadow
        receiveShadow
        position={[0, 8, 0]} 
        rotation={[ Math.PI * 0.5, Math.PI, Math.PI ]} 
        scale={100} /> */}

        {/* <BMW 
        castShadow
        receiveShadow
        position={[0, 8, 0]} 
        rotation={[ Math.PI * 0.5, Math.PI, Math.PI ]} 
        scale={60} /> */}

        {/* <Corvette 
        castShadow
        receiveShadow
        position={[0, 8, -4]} 
        rotation={[ Math.PI * 0.5, Math.PI, Math.PI ]} 
        scale={60} /> */}

        {/* <Ford 
        castShadow
        receiveShadow
        position={[0, 8, 0]} 
        rotation={[ Math.PI * 0.5, Math.PI, Math.PI ]} 
        scale={90} /> */}

        {/* <Honda 
        castShadow
        receiveShadow
        position={[0, 7.6, -0]} 
        rotation={[ Math.PI * 0.5, Math.PI, Math.PI ]} 
        scale={60} /> */}

        {/* Not the actual hyundai logo, it's subaru's */}

        {/* <Hyundai 
        castShadow
        receiveShadow
        position={[0, 8, 0]} 
        rotation={[ Math.PI * 0.5, Math.PI, Math.PI ]} 
        scale={60} /> */}

        {/* <Lamborghini 
        castShadow
        receiveShadow
        position={[0, 7.6, -0]} 
        rotation={[ Math.PI * 0.5, Math.PI, Math.PI ]} 
        scale={60} /> */}

        {/* <Lexus 
        castShadow
        receiveShadow
        position={[0, 7.6, -0]} 
        rotation={[ Math.PI * 0.5, Math.PI, Math.PI ]} 
        scale={60} /> */}

        {/* <Mazda 
        castShadow
        receiveShadow
        position={[0, 7.6, -0]} 
        rotation={[ Math.PI * 0.5, Math.PI, Math.PI ]} 
        scale={60} /> */}

        {/* <Mercedes 
        castShadow
        receiveShadow
        position={[0, 7.6, -0]} 
        rotation={[ Math.PI * 0.5, Math.PI, Math.PI ]} 
        scale={60} /> */}

        {/* <Mini 
        castShadow
        receiveShadow
        position={[0, 7.6, -0]} 
        rotation={[ Math.PI * 0.5, Math.PI, Math.PI ]} 
        scale={90} /> */}

        {/* <Mustang 
        castShadow
        receiveShadow
        position={[0, 7.4, -0]} 
        rotation={[ Math.PI * 0.5, Math.PI, Math.PI ]} 
        scale={60} /> */}

        {/* <Nissan 
        castShadow
        receiveShadow
        position={[0, 7.6, -0]} 
        rotation={[ Math.PI * 0.5, Math.PI, Math.PI ]} 
        scale={60} /> */}

        {/* <Porsche 
        castShadow
        receiveShadow
        position={[0, 7.6, -0]} 
        rotation={[ Math.PI * 0.5, Math.PI, Math.PI ]} 
        scale={60} /> */}

        {/* <Subaru 
        castShadow
        receiveShadow
        position={[0, 7.6, -0]} 
        rotation={[ Math.PI * 0.5, Math.PI, Math.PI ]} 
        scale={70} /> */}

        {/* <Toyota 
        castShadow
        receiveShadow
        position={[0, 8.3, 0]} 
        rotation={[ Math.PI * 0.5, Math.PI, Math.PI ]} 
        scale={50} /> */}

        {/* <Volkswagen 
        castShadow
        receiveShadow
        position={[0, 8.3, 0]} 
        rotation={[ Math.PI * 0.5, Math.PI, Math.PI ]} 
        scale={60} /> */}

        <Car_Logos />

    </group>
  )
}

useGLTF.preload('/Models/Hub.glb')
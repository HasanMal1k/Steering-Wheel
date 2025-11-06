'use client'

import React, { useRef } from 'react'
import { OrbitControls } from '@react-three/drei'
import { Wheel } from '../model-components/WheelModel' 
import CameraController from './CameraController'
import useResponsiveScale from '../hooks/useResponsiveScale'
import useThreeStore from '../hooks/useThreeStore'
import { useEffect } from 'react'
import gsap from 'gsap'

function Scene() {
  const controlsRef = useRef()
  const scale = useResponsiveScale()
  const wheelRef = useRef()

  // Giving GL, Scene and Camera values to the Store
  useThreeStore() 

  // Initial Animation
  // Snappy rotation with bounce-back effect
  useEffect(() => {
    if(wheelRef.current){
      const tl = gsap.timeline({delay: 0.2})

      tl.fromTo(
        wheelRef.current.rotation,
        { 
          z: Math.PI * 0.76
        },
        { 
          z: Math.PI * 1,
          duration: 1.5,
          ease: "back.out(1.7)" // Snappy overshoot and bounce back
        }
      )

      tl.fromTo(
        wheelRef.current.position,
        {
          z: -2
        },
        {
          z: 0.5,
          duration: 1.3,
          ease: "power2.out"
        },
        "<" // "<" means run at the same time as previous
      )

    }
  }, [])

  return (
    <>
      <OrbitControls 
        ref={controlsRef}
        enablePan={false}
        enableZoom={true}
        enableRotate={true}
        minDistance={2}
        maxDistance={10}
        minPolarAngle={0}
        maxPolarAngle={Math.PI}
        dampingFactor={0.05}
        enableDamping={true}
      />
      <CameraController />
      <ambientLight intensity={0.4} />
      {/* <directionalLight 
        position={[10, 10, 5]} 
        intensity={1} 
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      /> */}
      {/* <pointLight position={[-10, -10, -10]} intensity={0.3} /> */}
      
      <Wheel scale={[0.018 * scale, 0.018 * scale, 0.018 * scale]} rotation={[-Math.PI * 0.5, Math.PI, Math.PI]} ref={wheelRef}/>

    </>
  )
}


export default Scene
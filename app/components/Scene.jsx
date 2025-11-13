'use client'

import React, { useRef } from 'react'
import { OrbitControls } from '@react-three/drei'
import { Hub } from '../model-components/Hub' 
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
  // Balanced, natural entrance with subtle spring
  useEffect(() => {
    if(wheelRef.current){
      const tl = gsap.timeline({delay: 0.3})

      // Rotation with subtle bounce
      tl.fromTo(
        wheelRef.current.rotation,
        { 
          z: Math.PI * 0.7
        },
        { 
          z: Math.PI * 1,
          duration: 2,
          ease: "back.out(1.2)" // Subtle overshoot
        }
      )

      // Position synchronized with rotation, matching speed
      tl.fromTo(
        wheelRef.current.position,
        {
          z: -2.2
        },
        {
          z: 0.5,
          duration: 2,
          ease: "back.out(1.2)" // Same easing for synchronized feel
        },
        "<" // "<" means run at the same time as previous
      )

      // Scale with gentle spring
      tl.fromTo(
        wheelRef.current.scale,
        {
          x: 0.0155 * scale,
          y: 0.0155 * scale,
          z: 0.0155 * scale
        },
        {
          x: 0.018 * scale,
          y: 0.018 * scale,
          z: 0.018 * scale,
          duration: 1.8,
          ease: "elastic.out(0.8, 0.6)" // Gentle spring effect
        },
        "<0.15" // Start slightly after the others
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
      
      <Hub scale={[0.018 * scale, 0.018 * scale, 0.018 * scale]} rotation={[-Math.PI * 0.5, Math.PI, Math.PI]} ref={wheelRef}/>

    </>
  )
}


export default Scene
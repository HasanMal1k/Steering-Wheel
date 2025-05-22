import React, { useRef } from 'react'
import { OrbitControls } from '@react-three/drei'
import { Wheel } from '../Model/WheelModel.jsx'
import CameraController from './CameraController'

function Scene() {
  const controlsRef = useRef()

  return (
    <>
      <OrbitControls 
        ref={controlsRef}
        enablePan={true}
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
      <directionalLight 
        position={[10, 10, 5]} 
        intensity={1} 
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <pointLight position={[-10, -10, -10]} intensity={0.3} />
      
      <Wheel scale={[0.015, 0.015, 0.015]} rotation={[-Math.PI * 0.5, Math.PI, Math.PI]}/>
    </>
  )
}


export default Scene
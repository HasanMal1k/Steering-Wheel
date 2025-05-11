import React from 'react'
import { OrbitControls } from '@react-three/drei'
import { Wheel } from '../Model/WheelModel.jsx'
import RotatingText from './RotatatingText.jsx'
function Scene() {
  return (
    <>
        <OrbitControls />
        <ambientLight intensity={10} />
        {/* Commenting to test rotating text */}
        <Wheel scale={[0.015, 0.015, 0.015]} rotation={[-Math.PI * 0.5, Math.PI, Math.PI]}/>
        
        

    </>
  )
}

export default Scene
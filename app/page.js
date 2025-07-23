'use client'

import { Canvas } from "@react-three/fiber"
import { Environment, useProgress } from "@react-three/drei"
import Scene from "./components/Scene"
import RotatingText from "./components/RotatingText"
import { useTextStore } from "./TextStore"
import ConfigureUI from "./components/ConfigureUI"
import Logo from "./components/Logo"
import useMobile from "./hooks/useMobile"
import PartSelector from "./components/PartSelector"
import DraggableCard from "./components/DraggableCard"
import BottomText from "./components/BottomText"
import { Suspense, useState, useEffect } from "react"
import LoadingAnimation from "./components/LoadingAnimation"

// Loading progress component that goes inside Canvas
function LoadingProgress({ onLoaded }) {
  const { progress } = useProgress()
  
  useEffect(() => {
    if (progress === 100) {
      // Small delay to ensure everything is rendered
      setTimeout(() => {
        onLoaded()
      }, 500)
    }
  }, [progress, onLoaded])

  return null 
}

function Main() {
  const text = useTextStore(state => state.text)
  const isMobile = useMobile()
  const [isLoaded, setIsLoaded] = useState(false)

  const handleLoaded = () => {
    setIsLoaded(true)
  }

  return ( 
    <div className="h-screen w-full bg-black overflow-hidden relative">
      {/* Loading Animation - outside Canvas */}
      {!isLoaded && <LoadingAnimation />}
      
      {/* Main content */}
      <div className={`h-full w-full transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <Logo/>
        <Canvas> 
          <Environment 
            background={false} 
            files={'https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/hdris/studio-small-3/studio_small_03_1k.hdr'}
          />
          <Suspense fallback={null}>
            <Scene />
            <LoadingProgress onLoaded={handleLoaded} />
          </Suspense>
        </Canvas>

        {!isMobile && <RotatingText visible={text} />}
        <PartSelector />
        <DraggableCard/>
        <BottomText/>
      </div>
    </div>
  )
}

export default Main
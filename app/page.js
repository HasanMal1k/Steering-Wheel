'use client'

import { Canvas } from "@react-three/fiber"
import { Environment } from "@react-three/drei"
import Scene from "./components/Scene"
import RotatingText from "./components/RotatingText"
import { useTextStore } from "./TextStore"
import ConfigureUI from "./components/ConfigureUI"
import Logo from "./components/Logo"
import useMobile from "./hooks/useMobile"
import PartSelector from "./components/PartSelector"
import DraggableCard from "./components/DraggableCard"

function Main() {
  const text = useTextStore(state => state.text)
  const isMobile = useMobile()

  return (
    <div className="h-screen w-full bg-black overflow-hidden">
      <Logo/>
      <Canvas> 
        <Environment 
          background={false} 
          files={'https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/hdris/studio-small-3/studio_small_03_1k.hdr'} 
        />
        <Scene />
      </Canvas>

      {!isMobile && <RotatingText visible={text} />}
      <PartSelector />
      <DraggableCard/>
    </div>
  )
}

export default Main
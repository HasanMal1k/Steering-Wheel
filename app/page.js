'use client'

import { Canvas } from "@react-three/fiber"
import { Environment } from "@react-three/drei"
import Scene from "./components/Scene"
import RotatingText from "./components/RotatingText"
import { useTextStore } from "./TextStore"
import ConfigureUI from "./components/ConfigureUI"
import Logo from "./components/Logo"

function Main() {
  const text = useTextStore(state => state.text)
  console.log(text)

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
      <RotatingText visible={text} />
      <ConfigureUI />
    </div>
  )
}

export default Main
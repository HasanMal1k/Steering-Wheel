'use client'

import { Canvas } from "@react-three/fiber"
import { Environment, useProgress } from "@react-three/drei"
import Scene from "./components/Scene"
import RotatingText from "./components/RotatingText"
import { useTextStore } from "./utils/TextStore"
import Logo from "./components/Logo"
import useMobile from "./hooks/useMobile"
import PartSelector from "./components/configurator-components/PartSelector.jsx"
import DraggableCard from "./components/configurator-components/DraggableCard"
import { Suspense, useState, useEffect } from "react"
import LoadingAnimation from "./components/LoadingAnimation"
import ToolTip from "./components/configurator-components/ToolTip"
import CartButton from "./components/configurator-components/CartButton"
import OptionsButton from "./components/configurator-components/OptionsButton"
import TopOptions from "./components/configurator-components/TopOptions"
import { CartCard } from "./components/configurator-components/CartCard"

function Main() {
  const text = useTextStore(state => state.text)
  const isMobile = useMobile()
  const [isLoaded, setIsLoaded] = useState(false)

  // const handleLoaded = () => {
  //   setIsLoaded(true)
  // }

  const { progress } = useProgress()

  useEffect(() => {
    if(progress >= 100){
      setIsLoaded(true)
    }
  }, [progress])

  return ( 
    <div className="h-screen w-full bg-black overflow-hidden relative">
      {!isLoaded && <LoadingAnimation progressValue={ progress }/>}
      
      <div className={`h-full w-full transition-opacity duration-1000 ${isLoaded ? `opacity-100` : `opacity-0`}`}>
        <Logo/>
        <Canvas> 
          <Environment 
            background={false} 
            files={'https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/hdris/studio-small-3/studio_small_03_1k.hdr'}
          />
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </Canvas>

        {!isMobile && <RotatingText visible={text} />}

        {/* <CartButton  />
        <OptionsButton /> */}
        <TopOptions />
        <PartSelector />
        <DraggableCard/>
        <CartCard />
        {/* <ToolTip/> */}

      </div>
    </div>
  )
}

export default Main
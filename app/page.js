'use client'
import { Canvas } from "@react-three/fiber";
import { Environment, useProgress } from "@react-three/drei";
import Scene from "./components/Scene";
import RotatingText from "./components/RotatingText";
import { useTextStore } from "./utils/TextStore";
import Logo from "./components/Logo";
import useMobile from "./hooks/useMobile";
import PartSelector from "./components/configurator-components/PartSelector.jsx";
import DraggableCard from "./components/configurator-components/DraggableCard";
import { Suspense, useState, useEffect } from "react";
import LoadingAnimation from "./components/LoadingAnimation";
import TopOptions from "./components/configurator-components/TopOptions";
import { CartCard } from "./components/configurator-components/CartCard";
import HowToUseCard from "./components/configurator-components/HowToUseCard";
import useFetchHub from "./hooks/useFetchHub";
import useFetchShopifyProducts from "./hooks/useFetchShopifyProducts";
import { MeshGradient } from '@paper-design/shaders-react';
import useTest from "./hooks/useTest";
import { useControls } from 'leva';

function Main() {
  const text = useTextStore(state => state.text);
  const isMobile = useMobile();
  const [isLoaded, setIsLoaded] = useState(false);
  const { progress } = useProgress();
  // useTest()

  useFetchShopifyProducts()

  const meshGradientControls = useControls('Mesh Gradient', {
    color1: { value: '#0f1010', label: 'Color 1' },
    color2: { value: '#42414e', label: 'Color 2' },
    color3: { value: '#000000', label: 'Color 3' },
    color4: { value: '#796388', label: 'Color 4' },
    distortion: { value: 0.6, min: 0, max: 2, step: 0.01 },
    swirl: { value: 0.1, min: 0, max: 1, step: 0.01 },
    grainMixer: { value: 0.61, min: 0, max: 1, step: 0.01 },
    grainOverlay: { value: 0.43, min: 0, max: 1, step: 0.01 },
    speed: { value: 1, min: 0, max: 5, step: 0.1 },
  });

  useEffect(() => {
    if (progress >= 100) setIsLoaded(true);
  }, [progress]);

  return (
    <div className="h-screen w-full overflow-hidden relative">
      {/* MeshGradient Background - Fixed positioning */}
      <div className="fixed inset-0 w-full h-full -z-10">
        <MeshGradient
          width={typeof window !== 'undefined' ? window.innerWidth : 1920}
          height={typeof window !== 'undefined' ? window.innerHeight : 1080}
          colors={[
            meshGradientControls.color1,
            meshGradientControls.color2,
            meshGradientControls.color3,
            meshGradientControls.color4
          ]}
          distortion={meshGradientControls.distortion}
          swirl={meshGradientControls.swirl}
          grainMixer={meshGradientControls.grainMixer}
          grainOverlay={meshGradientControls.grainOverlay}
          speed={meshGradientControls.speed}
        />
      </div>

      {!isLoaded && <LoadingAnimation progressValue={progress} />}

      <div className={`h-full w-full transition-opacity duration-1000 ${isLoaded ? `opacity-100` : `opacity-0`}`}>
        <Logo />
        <Canvas style={{ background: 'transparent' }}>
          <Environment 
            background={false} 
            files="https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/hdris/studio-small-3/studio_small_03_1k.hdr"
          />
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </Canvas>

        {!isMobile && <RotatingText visible={text} />}
        <TopOptions />
        <PartSelector />
        <DraggableCard />
        <CartCard />
        <HowToUseCard />
      </div>
    </div>
  );
}

export default Main;
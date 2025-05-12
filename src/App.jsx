import { Canvas } from "@react-three/fiber"
import { Environment } from "@react-three/drei"
import Scene from "./components/Scene"
import RotatingText from "./components/RotatatingText"
import { useTextStore } from "./TextStore"

function App() {

  const text = useTextStore(state => state.text)
  console.log(text)

  return (
    <div className="h-screen w-full bg-black overflow-hidden">
      <Canvas>
          <Environment background={false} files={'https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/hdris/studio-small-3/studio_small_03_1k.hdr'} />

        {/* <Environment preset="warehouse"/> */}
        <Scene />
      </Canvas>
      {/* {text ? <RotatingText/> : ''} */}
      <RotatingText visible={text} />
    </div>
  )
}

export default App

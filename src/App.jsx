import { Canvas } from "@react-three/fiber"
import { Environment } from "@react-three/drei"
import Scene from "./components/Scene"
import RotatingText from "./components/RotatatingText"

function App() {

  return (
    <div className="h-screen w-full bg-emerald-700 overflow-hidden">
      <Canvas>
        <Environment preset="warehouse"/>
        <Scene />
      </Canvas>
      {/* <RotatingText /> */}
    </div>
  )
}

export default App

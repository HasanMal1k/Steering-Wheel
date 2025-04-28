import { Canvas } from "@react-three/fiber"
import { Environment } from "@react-three/drei"
import Scene from "./components/Scene"

function App() {

  return (
    <div className="h-screen w-full bg-emerald-800">
      <Canvas>
        <Environment preset="warehouse"/>
        <Scene />
      </Canvas>
    </div>
  )
}

export default App

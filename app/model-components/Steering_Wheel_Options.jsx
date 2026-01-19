import Steering_Wheel from "./Steering_Wheel";
import CenterPlate from "./CenterPlate";
import { RoundWheel } from "./round-wheel/Round_Wheel";
import { GT3Wheel } from "./GT3_Wheel";
import { FlatWheel } from "./flat-wheel/Flat_Wheel";
import { useConfigurationStore } from "../utils/ConfigurationStore";
import { useTextStore } from "../utils/TextStore";
import * as THREE from 'three'

function HubInteraction() {
  const setActiveComponent = useConfigurationStore(state => state.setActiveComponent)
  const enableText = useTextStore(state => state.enableText)
  const disableText = useTextStore(state => state.disableText)

  return (
    <mesh
      position={[0, 2, 0]}
      rotation={[-Math.PI / 2, 0, 0]}
      onClick={(e) => {
        e.stopPropagation()
        setActiveComponent('hub')
      }}
      onPointerOver={(e) => {
        e.stopPropagation()
        enableText()
      }}
      onPointerOut={(e) => {
        e.stopPropagation()
        disableText()
      }}
    >
      <circleGeometry args={[35, 62]}  />
      <meshBasicMaterial transparent={true} opacity={0} side={THREE.DoubleSide} />
    </mesh>
  )
}


function Steering_Wheel_Options() {
  const selectedWheelType = useConfigurationStore(state => state.selectedWheelType)

  return (
    <>
       {selectedWheelType === 'round' && <RoundWheel/>}
       {selectedWheelType === 'gt3' && <GT3Wheel/>}
       {selectedWheelType === 'flat' && <FlatWheel/>}
       {selectedWheelType === 'hub' && <HubInteraction/>}
    </>
  )
}

export default Steering_Wheel_Options
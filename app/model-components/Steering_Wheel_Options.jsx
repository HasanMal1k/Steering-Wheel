import Steering_Wheel from "./Steering_Wheel";
import CenterPlate from "./CenterPlate";
import { RoundWheel } from "./round-wheel/Round_Wheel";
import { GT3Wheel } from "./GT3_Wheel";
import { FlatWheel } from "./flat-wheel/Flat_Wheel";
import { useConfigurationStore } from "../utils/ConfigurationStore";

function Steering_Wheel_Options() {
  const selectedWheelType = useConfigurationStore(state => state.selectedWheelType)

  return (
    <>
       {selectedWheelType === 'round' && <RoundWheel/>}
       {selectedWheelType === 'gt3' && <GT3Wheel/>}
       {selectedWheelType === 'flat' && <FlatWheel/>}
       {/* When selectedWheelType === 'hub', neither wheel is rendered */}
    </>
  )
}

export default Steering_Wheel_Options
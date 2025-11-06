import { useEffect, useState } from "react";
import { useKnobs } from "../utils/InventoryStore";
import { useConfigurationStore } from "../utils/ConfigurationStore";

function useInitialInventory() {
  const frontKnobs = useKnobs((state) => state.frontKnobs);
  const sideRotary = useKnobs((state) => state.sideRotary);

  const setInitialColors = useConfigurationStore(
    (state) => state.setInitialColors
  );

  // Keep available colors in React state
  const [availableFrontHex, setAvailableFrontHex] = useState(null);
  const [availableSideHex, setAvailableSideHex] = useState(null);

  useEffect(() => {
    if (frontKnobs) {
      const available = Object.entries(frontKnobs).find(
        ([, value]) => value.inventory > 0
      );
      // Store the hex color directly
      setAvailableFrontHex(available ? available[1].color : null);
    }

    if (sideRotary) {
      const available = Object.entries(sideRotary).find(
        ([, value]) => value.inventory > 0
      );
      // Store the hex color directly
      setAvailableSideHex(available ? available[1].color : null);
    }
  }, [frontKnobs, sideRotary]);

  useEffect(() => {
    // Update configuration store with hex colors
    if (availableFrontHex || availableSideHex) {
      setInitialColors(availableFrontHex, availableSideHex);
    }
  }, [availableFrontHex, availableSideHex, setInitialColors]);

  useEffect(() => {
    console.log("Initial Front Knobs Hex:", availableFrontHex);
    console.log("Initial Side Rotary Hex:", availableSideHex);
  }, [availableFrontHex, availableSideHex]);

  // Return hex colors
  return { availableFrontHex, availableSideHex };
}

export default useInitialInventory;
import { useEffect, useState } from "react";
import { useKnobs } from "../utils/InventoryStore";
import { useConfigurationStore } from "../utils/ConfigurationStore";
import { useCartStore } from "../utils/CartStore";

function useInitialInventory() {
  const frontKnobs = useKnobs((state) => state.frontKnobs);
  const sideRotary = useKnobs((state) => state.sideRotary);
  const setCartItems = useCartStore((state) => state.setCartItems);

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
      
      // Add to cart immediately
      if (available) {
        setCartItems('frontKnobs', {
          merchandiseId: available[1].id,
          quantity: 1
        });
      }
    }

    if (sideRotary) {
      const available = Object.entries(sideRotary).find(
        ([, value]) => value.inventory > 0
      );
      // Store the hex color directly
      setAvailableSideHex(available ? available[1].color : null);
      
      // Add to cart immediately
      if (available) {
        setCartItems('sideRotary', {
          merchandiseId: available[1].id,
          quantity: 1
        });
      }
    }
  }, [frontKnobs, sideRotary, setCartItems]);

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
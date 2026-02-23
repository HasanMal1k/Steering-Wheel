import { useEffect, useState } from "react";
import { useKnobs, useSteeringWheelStore } from "../utils/InventoryStore";
import { useConfigurationStore } from "../utils/ConfigurationStore";
import { useCartStore } from "../utils/CartStore";

function useInitialInventory() {
  const frontKnobs = useKnobs((state) => state.frontKnobs);
  const sideRotary = useKnobs((state) => state.sideRotary);
  const steeringWheelData = useSteeringWheelStore((state) => state.steeringWheelData);
  const setCartItems = useCartStore((state) => state.setCartItems);

  const setInitialColors = useConfigurationStore(
    (state) => state.setInitialColors
  );

  // Keep available colors in React state
  const [availableFrontHex, setAvailableFrontHex] = useState(null);
  const [availableSideHex, setAvailableSideHex] = useState(null);

  useEffect(() => {
    if (frontKnobs) {
      // Prioritize Gray, otherwise find first available
      const gray = Object.entries(frontKnobs).find(([key, value]) => key === 'Gray' && value.inventory > 0);
      const available = gray || Object.entries(frontKnobs).find(
        ([, value]) => value.inventory > 0
      );
      // Store the hex color directly
      setAvailableFrontHex(available ? available[1].color : null);
      
      // Add to cart immediately
      if (available) {
        setInitialColors(available[1].color, null); // Set front color
        setCartItems('frontKnobs', {
          merchandiseId: available[1].id,
          quantity: 1,
          price: available[1].price
        });
      }
    }

    if (sideRotary) {
      // Prioritize Gray, otherwise find first available
      const gray = Object.entries(sideRotary).find(([key, value]) => key === 'Gray' && value.inventory > 0);
      const available = gray || Object.entries(sideRotary).find(
        ([, value]) => value.inventory > 0
      );
      // Store the hex color directly
      setAvailableSideHex(available ? available[1].color : null);
      
      // Add to cart immediately
      if (available) {
        setInitialColors(null, available[1].color); // Set side color
        setCartItems('sideRotary', {
          merchandiseId: available[1].id,
          quantity: 1,
          price: available[1].price
        });
      }
    }
  }, [frontKnobs, sideRotary, setCartItems, setInitialColors]);

  useEffect(() => {
    // Update configuration store with hex colors
    if (availableFrontHex || availableSideHex) {
      setInitialColors(availableFrontHex, availableSideHex);
    }
  }, [availableFrontHex, availableSideHex, setInitialColors]);

  useEffect(() => {
    // console.log("Initial Front Knobs Hex:", availableFrontHex);
    // console.log("Initial Side Rotary Hex:", availableSideHex);
  }, [availableFrontHex, availableSideHex]);

  // Initialize steering wheel price when wheel data loads
  useEffect(() => {
    console.log("🛞 Checking steeringWheelData. Keys:", Object.keys(steeringWheelData));
    if (Object.keys(steeringWheelData).length > 0) {
      const defaultGT3VariantId = 'gid://shopify/ProductVariant/45112783700107';
      const wheelEntry = steeringWheelData[defaultGT3VariantId];
      
      console.log(`🛞 GT3 Wheel Entry:`, wheelEntry);
      console.log(`🛞 GT3 Wheel Price:`, wheelEntry?.price);
      console.log(`🛞 All wheel data:`, steeringWheelData);
      
      if (wheelEntry && wheelEntry.price) {
        console.log("✅ Setting cart wheel with price:", wheelEntry.price);
        setCartItems('steeringWheel', {
          merchandiseId: defaultGT3VariantId,
          quantity: 1,
          price: wheelEntry.price
        });
      } else {
        console.warn("⚠️ No price found for GT3 wheel", { wheelEntry, hasPrice: wheelEntry?.price });
      }
    }
  }, [steeringWheelData, setCartItems]);

  // Return hex colors
  return { availableFrontHex, availableSideHex };
}

export default useInitialInventory;
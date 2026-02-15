import { useQuery } from "urql";
import { useEffect } from "react";
import { useWiringHarnessStore } from "../utils/InventoryStore";

const PRODUCT_QUERY = `
  query GetProduct {
    product(id: "gid://shopify/Product/7857252597899") {
      id
      title
      status
      totalInventory
      productType
      variants(first: 1000) {
        edges {
          node {
            id
            title
            inventoryQuantity
            sku
            price
          }
        }
      }
    }
  }
`;

export default function useFetchWiringHarness() {
  const wiringHarnessData = useWiringHarnessStore(state => state.wiringHarnessData);
  const setWiringHarnessData = useWiringHarnessStore(state => state.setWiringHarnessData);
  const [{ data, fetching, error }] = useQuery({ query: PRODUCT_QUERY });

  useEffect(() => {
    if (data?.product) {
      const fetchedVariants = data.product.variants.edges.map(edge => edge.node);
      const variantsById = fetchedVariants.reduce((acc, v) => ({ ...acc, [v.id]: v }), {});
      const variantsByTitle = fetchedVariants.reduce((acc, v) => ({ ...acc, [v.title]: v }), {});

      Object.keys(wiringHarnessData).forEach(key => {
        const item = wiringHarnessData[key];
        
        // Try matching by ID first (more reliable)
        if (item.value && variantsById[item.value]) {
          const variant = variantsById[item.value];
          setWiringHarnessData(key, { 
            inventory: variant.inventoryQuantity, 
            price: { amount: variant.price, currencyCode: 'USD' }
          });
        } 
        // Fallback to title match
        else if (variantsByTitle[key]) {
          const variant = variantsByTitle[key];
          setWiringHarnessData(key, { 
            inventory: variant.inventoryQuantity, 
            price: { amount: variant.price, currencyCode: 'USD' }
          });
        }
      });
    }

    if (error) {
      console.error("❌ Zustand error:", error.message);
    }
  }, [data, error, setWiringHarnessData]);

  // useEffect(() => {
  //   console.log("Wiring Harness:", wiringHarnessData);
  // }, [wiringHarnessData]);
}

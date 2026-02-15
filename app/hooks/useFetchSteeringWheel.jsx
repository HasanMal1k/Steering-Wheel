import { useQuery } from "urql";
import { useEffect } from "react";
import { useSteeringWheelStore } from "../utils/InventoryStore";

const PRODUCT_QUERY = `
  query GetProduct {
    product(id: "gid://shopify/Product/7505098834059") {
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

export default function useFetchSteeringWheel() {
  const [{ data, fetching, error }] = useQuery({
    query: PRODUCT_QUERY,
  });

  const { steeringWheelData, setSteeringWheelData } = useSteeringWheelStore()

  useEffect(() => {
    if (data?.product) {
      const steeringWheel = data.product.variants.edges.reduce((acc, { node }) => {
        // Store by ID so we can lookup by ID
        acc[node.id] = node
        return acc
      }, {})
      
      // Also store by Title if needed? Or just a flat map is fine
      // Let's store individual updates or bulk update?
      // Store logic is: setSteeringWheelData(key, value)
      // Since default implementation handles key-value updates, we can loop
      
      Object.entries(steeringWheel).forEach(([id, node]) => {
          setSteeringWheelData(id, { 
              ...node, 
              price: { amount: node.price, currencyCode: 'USD' }
          });
      })
    }
  }, [data, setSteeringWheelData]);

  useEffect(() => {
    if (error) {
      console.error("❌ Error fetching product:", error);
    }
  }, [error]);
}
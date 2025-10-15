import { useQuery } from "urql";
import { useEffect } from "react";
import { useInventoryStore } from "../utils/InventoryStore";

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

  const { steeringWheelData, setSteeringWheelData } = useInventoryStore()

  useEffect(() => {
    if (data?.product) {
      const steeringWheel = data.product.variants.edges.reduce((acc, { node }) => {
        acc[node.title] = node

        return acc

      }, {})

      setSteeringWheelData(steeringWheel)
    }
  }, [data]);

  // useEffect(() => {
  //   if (error) {
  //     console.error("❌ Error fetching product:", error);
  //   }
  // }, [error]);

 
}
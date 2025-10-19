import { useQuery } from "urql";
import { useEffect } from "react";
import { useInventoryStore } from "../utils/InventoryStore";

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
          }
        }
      }
    }
  }
`;

export default function useFetchWiringHarness() {
  const { setWiringHarnessData, wiringHarnessData } = useInventoryStore();
  const [{ data, fetching, error }] = useQuery({ query: PRODUCT_QUERY });

  useEffect(() => {
    if (data?.product) {
      const wiringHarness = data.product.variants.edges.reduce((acc, { node }) => {
        acc[node.title] = node;
        return acc;
      }, {});
      setWiringHarnessData(wiringHarness);
    }

    if (error) {
      console.error("❌ Zustand error:", error.message);
    }
  }, [data, error, setWiringHarnessData]);

  // useEffect(() => {
  //   console.log("Wiring Harness:", wiringHarnessData);
  // }, [wiringHarnessData]);
}

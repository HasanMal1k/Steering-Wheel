import { useQuery } from "urql";
import { useEffect } from "react";

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
  const [{ data, fetching, error }] = useQuery({
    query: PRODUCT_QUERY,
  });

  useEffect(() => {
    if (data?.product) {
      console.log("✅ Wiring Harness:", data.product);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      console.error("❌ Error fetching product:", error);
    }
  }, [error]);

 
}
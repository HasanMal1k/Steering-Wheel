import { useQuery } from "urql";
import { useEffect } from "react";
import { useInventoryStore } from "../utils/InventoryStore";

const PRODUCT_QUERY = `
  query GetProduct {
    product(id: "gid://shopify/Product/7857247191179") {
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

export default function useFetchHubAdapter() {
  const [{ data, fetching, error }] = useQuery({
    query: PRODUCT_QUERY,
  });

  const { hubAdapterData, setHubAdapterData } = useInventoryStore()

  useEffect(() => {
    if (data?.product) {
      const hubAdapter = data.product.variants.edges.reduce((acc, { node }) => {
        acc[node.title] = node
        return acc
      }, {})

      setHubAdapterData(hubAdapter)
    }
  }, [data]);

  // useEffect(() => {
  //   if (error) {
  //     console.error("❌ Error fetching product:", error);
  //   }
  // }, [error]);

  // useEffect(() => {
  //   if(hubAdapterData){
  //     console.log('Hub Adapter:  ',hubAdapterData)
  //   }
  // }, [hubAdapterData])

}
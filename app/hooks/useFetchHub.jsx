import { useQuery } from "urql";
import { useEffect } from "react";
import { useInventoryStore } from "../utils/InventoryStore";


const PRODUCT_QUERY = `
  query GetProduct {
    product(id: "gid://shopify/Product/7319439409291") {
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

export default function useFetchHub() {
  const [{ data, fetching, error }] = useQuery({
    query: PRODUCT_QUERY,
  });

  const { setHubData, hubData } = useInventoryStore();
  


  useEffect(() => {
    if (data?.product) {
      const hub = data.product.variants.edges.reduce((acc, { node }) => {
        acc[node.title] = node
        return acc
      }, {})
      setHubData(hub)
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      // console.error("❌ Error fetching product:", error);
    }
  }, [error]);

  // useEffect(() => {
  //   if (hubData){
  //     console.log(hubData)
  //   }
  // }, [hubData])

 
}
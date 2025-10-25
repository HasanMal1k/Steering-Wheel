import { useQuery } from "urql";
import { useEffect } from "react";

const PRODUCT_QUERY = `
  query GetProduct {
    product(id: "gid://shopify/Product/7514141065355") {
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

export default function useFetchKnobs() {
  const [{ data, fetching, error }] = useQuery({
    query: PRODUCT_QUERY,
  });

  // useEffect(() => {
  //   if (data?.product) {
  //     console.log("✅ Knobs:", data.product);

  //     const sideJoysStickData = {}
  //     const frontJoyStickData = {}

  //     // const joyStickData = data.product.variants.edges.reduce((acc, {node}) => {

  //     //   {node.title.includes('Front') ? frontJoyStickData[node.title] = node : sideJoysStickData[node.title] = node}


  //     //   return acc
  //     // }, {})
  //     data.product.variants.edges.forEach(({ node }) => {

  //       if (node.title.includes('Front')) {
  //       frontJoyStickData[node.title.slice(23)] = node;
  //       } else {
  //       sideJoysStickData[node.title.slice(20)] = node;
  //       }
  //     });

      

  //     console.log('Front: ', frontJoyStickData)
  //     console.log('Side: ', sideJoysStickData)

  //   }
  // }, [data]);

  // useEffect(() => {
  //   if (error) {
  //     console.error("❌ Error fetching product:", error);
  //   }
  // }, [error]);

 
}
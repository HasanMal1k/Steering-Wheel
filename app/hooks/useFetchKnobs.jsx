import { useQuery } from "urql";
import { useEffect } from "react";
import { useKnobs } from "../utils/InventoryStore";

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
            price
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

  const frontKnobs = useKnobs(state => state.frontKnobs);
  const sideRotary = useKnobs(state => state.sideRotary);
  const setFrontKnobs = useKnobs(state => state.setFrontKnobs);
  const setSideRotary = useKnobs(state => state.setSideRotary); 
  

  useEffect(() => {
    if (data?.product) {
      console.log("✅ Knobs:", data.product);

      const sideJoysStickData = {}
      const frontJoyStickData = {}

      // const joyStickData = data.product.variants.edges.reduce((acc, {node}) => {

      //   {node.title.includes('Front') ? frontJoyStickData[node.title] = node : sideJoysStickData[node.title] = node}


      //   return acc
      // }, {})
      data.product.variants.edges.forEach(({ node }) => {

        if (node.title.includes('Front')) {
        frontJoyStickData[node.title.slice(23)] = node;
        } else {
        sideJoysStickData[node.title.slice(20)] = node;
        }
      });

      sideJoysStickData && Object.entries(sideJoysStickData).forEach(([key, values]) => {
        if (sideRotary[key]) {
          setSideRotary(key, { 
            inventory: values.inventoryQuantity, 
            price: { amount: values.price, currencyCode: 'USD' }
          });  
        } else {
          console.log('false', key);
        }
      });

      frontJoyStickData && Object.entries(frontJoyStickData).forEach(([key, values]) => {
        if (frontKnobs[key]) {
          setFrontKnobs(key, { 
            inventory: values.inventoryQuantity, 
            price: { amount: values.price, currencyCode: 'USD' }
          });  
        } else {
          console.log('false', key);
        }
      });

      

      console.log('Front: ', frontKnobs)
      console.log('Side: ', sideRotary)

    }
  }, [data]);

  // useEffect(() => {
  //   if (error) {
  //     console.error("❌ Error fetching product:", error);
  //   }
  // }, [error]);

  useEffect(() => {
    if (frontKnobs && sideRotary) {
      console.log("Knobs Zustand Store:", {frontKnobs, sideRotary} );
    }
  }, [frontKnobs, sideRotary]);

 
}
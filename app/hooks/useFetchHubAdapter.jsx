import { useQuery } from "urql";
import { useEffect } from "react";
import { useHubAdapterStore } from "../utils/InventoryStore";

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

  const hubAdaptersData = useHubAdapterStore(state => state.hubAdaptersData);
  const setHubAdapterData = useHubAdapterStore(state => state.setHubAdapterData);
  

  useEffect(() => {
    if (data?.product && hubAdaptersData) {
      const hubAdapter = data.product.variants.edges.reduce((acc, { node }) => {
        acc[node.title] = node
        return acc
      }, {})

      console.log('Hub Adapter Data Fetched:', hubAdapter);

      // Match by SKU instead of title
      Object.entries(hubAdapter).forEach(([title, values]) => {
        // Find matching key in hubAdaptersData by comparing SKUs or IDs
        const matchingKey = Object.keys(hubAdaptersData).find(key => {
          return hubAdaptersData[key].sku === values.sku || hubAdaptersData[key].id === values.id
        });

        if (matchingKey) {
          setHubAdapterData(matchingKey, { inventory: values.inventoryQuantity });
          console.log(`✓ Matched ${title} (${values.sku}) → ${matchingKey}`);
        } else {
          console.log(`✗ No match found for ${title} (SKU: ${values.sku})`);
        }
      });

    }
  }, [data, setHubAdapterData]);

  useEffect(() => {
    if (error) {
      console.error("❌ Error fetching product:", error);
    }
  }, [error]);

  useEffect(() => {
    if(hubAdaptersData){
      console.log('Hub Adapter:  ', hubAdaptersData)
    }
  }, [hubAdaptersData])

}
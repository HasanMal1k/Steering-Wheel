import { useQuery } from "urql";
import { useEffect } from "react";
import { useSteeringWheelStore } from "../utils/InventoryStore";

const FLAT_ROUND_QUERY = `
  query GetFlatRoundProduct {
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

const GT3_QUERY = `
  query GetGT3Product {
    product(id: "gid://shopify/Product/7505438245003") {
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
  const [{ data: flatRoundData, fetching: flatRoundFetching, error: flatRoundError }] = useQuery({
    query: FLAT_ROUND_QUERY,
  });

  const [{ data: gt3Data, fetching: gt3Fetching, error: gt3Error }] = useQuery({
    query: GT3_QUERY,
  });

  const { steeringWheelData, setSteeringWheelData } = useSteeringWheelStore()

  useEffect(() => {
    if (flatRoundData?.product) {
      console.log("🎡 Flat/Round Product:", flatRoundData.product.title);
      const flatRoundWheels = flatRoundData.product.variants.edges.reduce((acc, { node }) => {
        acc[node.id] = node
        return acc
      }, {})
      
      console.log("📊 Flat/Round Wheels loaded:", Object.keys(flatRoundWheels));
      Object.entries(flatRoundWheels).forEach(([id, node]) => {
        console.log(`  Setting flat/round wheel ${id}:`, { price: node.price, title: node.title, sku: node.sku });
        setSteeringWheelData(id, { 
          ...node, 
          price: { amount: node.price, currencyCode: 'USD' }
        });
      })
    }
  }, [flatRoundData, setSteeringWheelData]);

  useEffect(() => {
    if (gt3Data?.product) {
      console.log("🎡 GT3 Product:", gt3Data.product.title);
      const gt3Wheels = gt3Data.product.variants.edges.reduce((acc, { node }) => {
        acc[node.id] = node
        return acc
      }, {})
      
      console.log("📊 GT3 Wheels loaded:", Object.keys(gt3Wheels));
      Object.entries(gt3Wheels).forEach(([id, node]) => {
        console.log(`  Setting GT3 wheel ${id}:`, { price: node.price, title: node.title, sku: node.sku });
        setSteeringWheelData(id, { 
          ...node, 
          price: { amount: node.price, currencyCode: 'USD' }
        });
      })
    }
  }, [gt3Data, setSteeringWheelData]);

  useEffect(() => {
    if (flatRoundError) {
      console.error("❌ Error fetching flat/round product:", flatRoundError);
    }
  }, [flatRoundError]);

  useEffect(() => {
    if (gt3Error) {
      console.error("❌ Error fetching GT3 product:", gt3Error);
    }
  }, [gt3Error]);
}
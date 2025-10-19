import { useQuery } from "urql";
import { useEffect } from "react";
import { useInventoryStore } from "../utils/InventoryStore";

const PRODUCT_QUERY = `
  query GetProduct {
    product(id: "gid://shopify/Product/7857253843083") {
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

export default function useFetchProtocolBoard() {
  const { protocolBoardData, setProtocolBoardData } = useInventoryStore();

  const [{ data, fetching, error }] = useQuery({
    query: PRODUCT_QUERY,
  });

  useEffect(() => {
    if (data?.product) {
      const protocolBoard = data.product.variants.edges.reduce((acc, { node }) => {
        acc[node.title] = node;
        return acc;
      }, {});

      setProtocolBoardData(protocolBoard);
      
    }
  }, [data]);

  // useEffect(() => {
  //   if (error) console.error("❌ Error fetching product:", error);
  // }, [error]);

  // useEffect(() => {
  //   if(protocolBoardData){
  //     console.log('Protocol Board:  ',protocolBoardData)
  //   }
  // }, [protocolBoardData])

}

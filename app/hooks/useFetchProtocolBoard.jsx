import { useQuery } from "urql";
import { useEffect } from "react";
// import { useInventoryStore } from "../utils/InventoryStore";
// import { protocolBoardsInventoryItem } from "../utils/InventoryItems";
import { useProtocolBoardStore } from "../utils/InventoryStore";

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
            price
          }
        }
      }
    }
  }
`;

export default function useFetchProtocolBoard() {
  // const { protocolBoardData, setProtocolBoardData } = useInventoryStore();
  const protocolBoardsData = useProtocolBoardStore(state => state.protocolBoardsData);
  const setProtocolBoardsData = useProtocolBoardStore(state => state.setProtocolBoardsData);

  const [{ data, fetching, error }] = useQuery({
    query: PRODUCT_QUERY,
  });

 useEffect(() => {
  if (data?.product) {
    // Create a mapping from variant title → node
    const protocolBoard = data.product.variants.edges.reduce((acc, { node }) => {
      acc[node.title] = node;
      return acc;
    }, {});

    console.log('Before state', protocolBoard)
    // Loop through each variant and update if it exists in the store
    Object.entries(protocolBoard).forEach(([key, values]) => {
      if (protocolBoardsData[key]) {
        setProtocolBoardsData(key, { 
            inventory: values.inventoryQuantity, 
            price: { amount: values.price, currencyCode: 'USD' }
        });
      } else {
        console.log('false', key);
      }
    });

    console.log('Protocol Board:  ', protocolBoardsData)

  }
}, [data]);

  // useEffect(() => {
  //   if (error) console.error("❌ Error fetching product:", error);
  // }, [error]);

  useEffect(() => {
    if(protocolBoardsData){
      console.log('Protocol Board:  ',protocolBoardsData)
    }
  }, [protocolBoardsData])

}

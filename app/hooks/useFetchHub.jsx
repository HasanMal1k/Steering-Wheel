import { useQuery } from "urql";
import { useEffect } from "react";
import { useCartStore } from "../utils/CartStore";


const PRODUCT_QUERY = `
  query GetProduct {
    product(id: "gid://shopify/Product/8050101223563") {
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

export default function useFetchHub() {
  const [{ data, fetching, error }] = useQuery({
    query: PRODUCT_QUERY,
  });

  const setCartItems = useCartStore((state) => state.setCartItems);

  useEffect(() => {
    if (data?.product?.variants?.edges?.length > 0) {
      const node = data.product.variants.edges[0].node;
      const variantId = node.id;
      setCartItems('hub', {
         merchandiseId: variantId,
         quantity: 1,
         price: { amount: node.price, currencyCode: 'USD' }
      });
    }
  }, [data, setCartItems]);

  useEffect(() => {
    if (error) {
      // console.error("❌ Error fetching product:", error);
    }
  }, [error]);

  // useEffect(() => {
  //   if (hubData){
  //     console.log('hub ', hubData)
  //   }
  // }, [hubData])

 
}
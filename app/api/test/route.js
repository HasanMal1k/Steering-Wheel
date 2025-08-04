import { shopifyAdminQuery } from "@/app/lib/shopify/shopify-admin"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request) {
const query = `
  query {
    shop {
      name
    }
  }
`;

const query1 = `
   {
  nodes(ids: [
    "gid://shopify/Product/7857253843083",
    "gid://shopify/Product/7857252597899",
    "gid://shopify/Product/7857247191179",
    "gid://shopify/Product/7820462096523",
    "gid://shopify/Product/7820462096523"
  ]) {
    ... on Product {
      id
      title
      status
      totalInventory
      productType
      variants(first: 100) {
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
}


`

   try{
      const data = await shopifyAdminQuery(query1);

      console.log(data)
      return NextResponse.json({
         success: true,
         data: data
      })
   }
   catch(error){
      return NextResponse.json({
         success: false,
         error: error.message
      },
   {status: 500})
   }

}


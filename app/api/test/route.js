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

   try{
      const data = await shopifyAdminQuery(query);

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


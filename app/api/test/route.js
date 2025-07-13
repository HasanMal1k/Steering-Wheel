import { shopifyAdminQuery } from "@/app/lib/shopify/shopify-admin"
import { NextRequest, NextResponse } from "next/server"

async function test() {
 try{
    const data = await shopifyAdminQuery(request, response)
    console.log(data)
 }
 catch (err){
    console.log(err)
 }
}

export default test
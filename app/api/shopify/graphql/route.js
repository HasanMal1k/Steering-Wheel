import { Client, cacheExchange, fetchExchange } from "urql";

const shopifyClient = new Client({
    url: process.env.SHOPIFY_ADMIN_API_URL,
    exchanges: [cacheExchange({}), fetchExchange],
    fetchOptions: {
        headers: {
            'Content-Type': 'application/json',
            'X-Shopify-Access-Token': process.env.SHOPIFY_ADMIN_API_TOKEN,
        }
    }
    
})

export async function POST(res){
    try{
        const { query, variables } = await res.json()

        if(!query){
            return Response.json(
                {error: 'GraphQL query is required'},
                {status: 400}
            )
        }

        const result = await shopifyClient.query(query, variables).toPromise()

        if (result.error) {
            console.error('Shopify GraphQL Error:', result.error)
            return Response.json(
                { 
                error: 'GraphQL query failed',
                details: result.error 
                },
                { status: 400 }
            )
            }
        return Response.json(result)

        } catch (error) {
            console.error('API Route Error:', error)
            return Response.json(
                { 
                    error: 'Internal server error',
                    message: error.message 
                },
                { status: 500 }
            )
        }


}

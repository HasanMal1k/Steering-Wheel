'use client'

import { useMemo } from 'react'
import { cacheExchange, createClient, fetchExchange, Provider, ssrExchange } from 'urql'

const GQLProvider = ({ children }) => {

    const url = process.env.SHOPIFY_ADMIN_API_URL

    const [client, ssr] = useMemo(() => {
        const ssr = ssrExchange({
            isClient: typeof window !== 'undefined'
        }) 

        const client = createClient( {
            url,
            exchanges: [cacheExchange({}), ssr, fetchExchange],
            fetchOptions: () => ({
                headers: {
                    'Content-Type': 'application/json',
                    'X-Shopify-Access-Token': process.env.SHOPIFY_ADMIN_API_TOKEN,
                }
            })
        } )

        return [client, ssr]

    }, [url])

    return (
        <Provider client ={client} ssr={ssr}>
            {children}
        </Provider>
    )
}

export default GQLProvider
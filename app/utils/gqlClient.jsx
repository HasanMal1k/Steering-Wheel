// 'use client'
// import { useMemo } from 'react'
// import { cacheExchange, Client, fetchExchange, Provider, ssrExchange } from 'urql'

// const GQLProvider = ({ children }) => {
//   const [client, ssr] = useMemo(() => {
//     const ssr = ssrExchange({
//       isClient: typeof window !== 'undefined'
//     })

//     const client = new Client({
//       url: '/api/shopify/graphql', 
//       exchanges: [cacheExchange({}), ssr, fetchExchange],
//       fetchOptions: {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         }
//       }
//     })

//     return [client, ssr]
//   }, [])

//   return (
//     <Provider value={client}>
//       {children}
//     </Provider>
//   )
// }

// export default GQLProvider
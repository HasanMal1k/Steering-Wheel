'use client'
import { cacheExchange, createClient, fetchExchange, Provider } from 'urql'

const urqlClient = createClient({
  url: '/api/shopify/graphql',
  exchanges: [cacheExchange, fetchExchange],
})

const GQLProvider = ({ children }) => {
  return (
    <Provider value={urqlClient}>
      {children}
    </Provider>
  )
}

export default GQLProvider
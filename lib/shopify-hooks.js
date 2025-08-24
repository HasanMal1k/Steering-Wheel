import { useQuery, useMutation } from 'urql'

// Custom hooks for easier usage
export const useShopifyQuery = (query, variables) => {
  return useQuery({
    query,
    variables,
  })
}

export const useShopifyMutation = (mutation) => {
  return useMutation(mutation)
}

// Example GraphQL queries for your Shopify store
export const GET_PRODUCTS = `
  query GetProducts($first: Int!) {
    products(first: $first) {
      edges {
        node {
          id
          title
          handle
          description
          images(first: 1) {
            edges {
              node {
                url
                altText
              }
            }
          }
          variants(first: 1) {
            edges {
              node {
                id
                price
                compareAtPrice
              }
            }
          }
        }
      }
    }
  }
`

export const GET_ORDERS = `
  query GetOrders($first: Int!) {
    orders(first: $first) {
      edges {
        node {
          id
          name
          email
          createdAt
          totalPriceSet {
            shopMoney {
              amount
              currencyCode
            }
          }
          fulfillmentStatus
        }
      }
    }
  }
`

export const CREATE_PRODUCT = `
  mutation CreateProduct($input: ProductInput!) {
    productCreate(input: $input) {
      product {
        id
        title
        handle
      }
      userErrors {
        field
        message
      }
    }
  }
`
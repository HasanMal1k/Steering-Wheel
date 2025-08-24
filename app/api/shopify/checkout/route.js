import { Client, fetchExchange } from "urql";

const shopifyClient = new Client({
  url: process.env.SHOPIFY_STOREFRONT_API_URL, // e.g. https://777performance.myshopify.com/api/2025-07/graphql.json
  exchanges: [fetchExchange],
  fetchOptions: () => ({
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": process.env.SHOPIFY_STOREFRONT_API_TOKEN,
    },
  }),
});

export async function GET() {
  try {
    // Cart create mutation
    const cartMutation = `
      mutation createCart($input: CartInput!) {
        cartCreate(input: $input) {
          cart {
            id
            checkoutUrl
          }
          userErrors {
            field
            message
          }
        }
      }
    `;
    const variables = {
      input: {
        lines: [
          {
            merchandiseId: "gid://shopify/ProductVariant/41112940970123", // Black decal variant
            quantity: 1
          }
        ]
      }
    };

    const result = await shopifyClient.mutation(cartMutation, variables).toPromise();

    if (result.error || result.data.cartCreate.userErrors.length) {
      console.error("Cart Create Error:", result.error || result.data.cartCreate.userErrors);
      return new Response(
        JSON.stringify({
          error: "Cart creation failed",
          details: result.error || result.data.cartCreate.userErrors
        }),
        { status: 400 }
      );
    }

    const checkoutUrl = result.data.cartCreate.cart.checkoutUrl;
    return Response.redirect(checkoutUrl, 302);

  } catch (err) {
    console.error("API Route Error:", err);
    return new Response(
      JSON.stringify({ error: "Internal server error", message: err.message }),
      { status: 500 }
    );
  }
}

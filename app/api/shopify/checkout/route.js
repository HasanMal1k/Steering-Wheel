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

export async function POST(request) {
  try {
    // Get cart items and configuration from request body
    const { cartItems, configuration } = await request.json();

    if (!cartItems || Object.keys(cartItems).length === 0) {
      return new Response(
        JSON.stringify({ error: "No cart items provided" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Transform cart items into Shopify cart lines format
    const lines = Object.entries(cartItems)
      .filter(([key, item]) => item.merchandiseId && item.quantity) // Only include items with merchandiseId
      .map(([key, item]) => {
        // Validate that it's a ProductVariant ID, not a Product ID
        if (!item.merchandiseId.includes('ProductVariant')) {
          console.warn(`⚠️ Invalid ID for ${key}: ${item.merchandiseId} (must be ProductVariant, not Product)`);
          return null;
        }
        return {
          merchandiseId: item.merchandiseId,
          quantity: item.quantity
        };
      })
      .filter(Boolean); // Remove null entries

    if (lines.length === 0) {
      return new Response(
        JSON.stringify({ error: "No valid items in cart" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    console.log('Creating cart with items:', lines);
    console.log('Configuration:', configuration);

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
    
    // Build custom attributes for order tracking
    const attributes = [];
    if (configuration) {
      attributes.push({ key: "source", value: "steering_wheel_configurator" });
      if (configuration.wheelType) attributes.push({ key: "wheel_type", value: configuration.wheelType });
      if (configuration.make) attributes.push({ key: "vehicle_make", value: configuration.make });
      if (configuration.model) attributes.push({ key: "vehicle_model", value: configuration.model });
      if (configuration.joystickColor) attributes.push({ key: "joystick_color", value: configuration.joystickColor });
      if (configuration.rotaryColor) attributes.push({ key: "rotary_color", value: configuration.rotaryColor });
    }

    const variables = {
      input: {
        lines,
        attributes,
        note: configuration ? `Steering Wheel Configurator Order - ${configuration.make || ''} ${configuration.model || ''}`.trim() : undefined
      }
    };

    const result = await shopifyClient.mutation(cartMutation, variables).toPromise();

    console.log('Shopify API Response:', JSON.stringify(result, null, 2));

    if (result.error) {
      console.error("Cart Create Error:", result.error);
      return new Response(
        JSON.stringify({
          error: "Cart creation failed",
          details: result.error.message || result.error
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    if (result.data?.cartCreate?.userErrors?.length > 0) {
      const userErrors = result.data.cartCreate.userErrors;
      console.error("Cart Create User Errors:", userErrors);
      
      // Check if errors are about non-existent merchandise
      const merchandiseErrors = userErrors.filter(e => 
        e.message.includes('does not exist')
      );
      
      if (merchandiseErrors.length > 0 && merchandiseErrors.length < lines.length) {
        // Some items don't exist, but others might work
        // Extract the failing IDs and retry without them
        console.warn("⚠️ Some items don't exist, retrying with valid items only");
        
        // Return a more helpful error message
        return new Response(
          JSON.stringify({
            error: "Some items are not available",
            details: userErrors.map(e => e.message).join(', '),
            suggestion: "These products may not be published to your online store sales channel. Please check your Shopify admin."
          }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }
      
      return new Response(
        JSON.stringify({
          error: "Cart creation failed",
          details: userErrors.map(e => e.message).join(', ')
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const checkoutUrl = result.data.cartCreate.cart.checkoutUrl;
    
    // Return the checkout URL as JSON so the frontend can redirect
    return new Response(
      JSON.stringify({ checkoutUrl }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );

  } catch (err) {
    console.error("API Route Error:", err);
    return new Response(
      JSON.stringify({ error: "Internal server error", message: err.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

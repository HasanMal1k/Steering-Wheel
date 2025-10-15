export async function GET() {
  try {
    const shopifyUrl = process.env.SHOPIFY_ADMIN_API_URL;
    const token = process.env.SHOPIFY_ADMIN_API_TOKEN;

    // Check if env variables exist
    if (!shopifyUrl || !token) {
      return Response.json({
        success: false,
        error: 'Missing environment variables',
        details: {
          hasUrl: !!shopifyUrl,
          hasToken: !!token,
          url: shopifyUrl ? shopifyUrl.substring(0, 30) + '...' : 'missing'
        }
      }, { status: 500 });
    }

    // Test query - gets shop info
    const testQuery = `
      {
        shop {
          name
          email
          myshopifyDomain
        }
      }
    `;

    const response = await fetch(shopifyUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': token,
      },
      body: JSON.stringify({ query: testQuery })
    });

    const data = await response.json();

    if (!response.ok) {
      return Response.json({
        success: false,
        error: 'Shopify API request failed',
        status: response.status,
        statusText: response.statusText,
        data: data
      }, { status: response.status });
    }

    if (data.errors) {
      return Response.json({
        success: false,
        error: 'GraphQL errors',
        errors: data.errors
      }, { status: 400 });
    }

    return Response.json({
      success: true,
      message: 'Shopify Admin API is working!',
      shop: data.data?.shop
    });

  } catch (error) {
    return Response.json({
      success: false,
      error: 'Server error',
      message: error.message,
      stack: error.stack
    }, { status: 500 });
  }
}


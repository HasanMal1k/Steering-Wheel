import { Client, cacheExchange, fetchExchange } from "urql";

const shopifyClient = new Client({
  url: process.env.SHOPIFY_ADMIN_API_URL,
  exchanges: [cacheExchange, fetchExchange],
  fetchOptions: () => ({
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': process.env.SHOPIFY_ADMIN_API_TOKEN,
    },
  }),
  preferGetMethod: false,
});

async function handleGraphQL(req) {
  try {
    let query, variables, operationName;

    // console.log('📥 Request method:', req.method);

    if (req.method === 'GET') {
      const url = new URL(req.url);
      query = url.searchParams.get('query');
      const varsParam = url.searchParams.get('variables');
      variables = varsParam && varsParam !== '{}' ? JSON.parse(varsParam) : undefined;
      operationName = url.searchParams.get('operationName');
    } else {
      const body = await req.json();
      query = body.query;
      variables = body.variables;
      operationName = body.operationName;
    }

    if (!query) {
      console.error('❌ No query received');
      return Response.json(
        { error: 'GraphQL query is required' },
        { status: 400 }
      );
    }

    // console.log('🚀 Sending to Shopify via POST...');
    
    // ✅ Use .toPromise() to execute the query
    const result = await shopifyClient.query(query, variables).toPromise();

    if (result.error) {
      // console.error('❌ Shopify GraphQL Error:', result.error);
      return Response.json(
        {
          error: 'GraphQL query failed',
          details: result.error,
        },
        { status: 400 }
      );
    }

    // console.log('✅ Success from Shopify!');
    return Response.json(result);

  } catch (error) {
    // console.error('❌ API Route Error:', error);
    return Response.json(
      {
        error: 'Internal server error',
        message: error.message,
      },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  return handleGraphQL(req);
}

export async function POST(req) {
  return handleGraphQL(req);
}
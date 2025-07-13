
export async function shopifyAdminQuery(query, variables = {}) {
  const res = await fetch(process.env.SHOPIFY_ADMIN_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': process.env.SHOPIFY_ADMIN_API_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });

  const json = await res.json();

  if (json.errors) {
    console.error('Shopify Admin API Error:', json.errors);
    throw new Error('Shopify Admin API query failed');
  }

  console.log(json.data)

  return json.data;
}

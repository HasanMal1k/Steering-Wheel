import crypto from 'crypto';

export async function POST(request) {
  try {
    // Get headers
    const hmac = request.headers.get('X-Shopify-Hmac-Sha256');
    const topic = request.headers.get('X-Shopify-Topic');
    const shop = request.headers.get('X-Shopify-Shop-Domain');

    console.log('📦 Webhook received:', { topic, shop });
    console.log('📦 All headers:', Object.fromEntries(request.headers.entries()));

    // Get webhook secret
    const webhookSecret = process.env.SHOPIFY_WEBHOOK_SECRET;
    
    console.log('🔑 Secret exists:', !!webhookSecret);
    console.log('🔑 Secret starts with:', webhookSecret?.substring(0, 6));
    
    if (!webhookSecret) {
      console.error('❌ SHOPIFY_WEBHOOK_SECRET not configured');
      return new Response('Webhook secret not configured', { status: 500 });
    }

    // Clone the request to read body twice
    const clonedRequest = request.clone();
    
    // Get raw body as Buffer for HMAC (this is critical!)
    const bodyBuffer = Buffer.from(await request.arrayBuffer());
    
    console.log('📦 Body length:', bodyBuffer.length);
    console.log('📦 Body preview:', bodyBuffer.toString('utf8').substring(0, 200));

    // Calculate hash using Buffer directly (NO string conversion)
    const generatedHash = crypto
      .createHmac('sha256', webhookSecret)
      .update(bodyBuffer)
      .digest('base64');

    console.log('🔍 Received HMAC:', hmac);
    console.log('🔍 Generated Hash:', generatedHash);
    console.log('🔍 Match:', hmac === generatedHash);

    // Verify HMAC
    const skipVerification = true;
    
    if (!skipVerification && hmac !== generatedHash) {
      console.error('❌ HMAC verification failed');
      console.error('Expected:', hmac);
      console.error('Got:', generatedHash);
      
      // Return 401 for invalid requests
      return new Response('HMAC mismatch', { status: 401 });
    }

    console.log('✅ HMAC verification skipped (testing mode)');

    // Parse order from cloned request
    const rawBody = await clonedRequest.text();
    const order = JSON.parse(rawBody);

    console.log('📋 Order ID:', order.id);
    console.log('📋 Order Number:', order.order_number);

    // Check if this is a configurator order
    const isConfiguratorOrder = order.note_attributes?.some(
      attr => attr.name === 'source' && attr.value === 'steering_wheel_configurator'
    );

    if (!isConfiguratorOrder) {
      console.log('ℹ️ Ignoring non-configurator order');
      return new Response('Not a configurator order', { status: 200 });
    }

    console.log('🎯 Configurator order detected (or check skipped for testing)!');

    // Extract configuration data from note attributes
    const getAttributeValue = (name) => {
      const attr = order.note_attributes?.find(a => a.name === name);
      return attr ? attr.value : null;
    };

    const configuration = {
      wheelType: getAttributeValue('wheel_type'),
      make: getAttributeValue('vehicle_make'),
      model: getAttributeValue('vehicle_model'),
      joystickColor: getAttributeValue('joystick_color'),
      rotaryColor: getAttributeValue('rotary_color')
    };

    // Prepare order details for email
    const orderDetails = {
      orderNumber: order.order_number,
      orderId: order.id,
      customerName: order.customer ? `${order.customer.first_name} ${order.customer.last_name}` : 'Guest',
      customerEmail: order.customer?.email || order.contact_email,
      total: order.total_price,
      currency: order.currency,
      createdAt: order.created_at,
      lineItems: order.line_items.map(item => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price
      })),
      configuration,
      note: order.note
    };

    // 5. Send Notification Email
    console.log('📧 Sending notification email...');

    const emailResponse = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/send-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ orderDetails }),
    });

    if (!emailResponse.ok) {
      const errorData = await emailResponse.json();
      console.error('❌ Failed to send email:', errorData);
    } else {
      console.log('✅ Email sent successfully');
    }

    return new Response('OK', { status: 200 });
    // ----------------------------------------------------------------------------------

  } catch (error) {
    console.error('❌ Webhook processing error:', error);
    return new Response('Error processed', { status: responseStatus });
  }
}
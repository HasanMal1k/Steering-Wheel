import crypto from 'crypto';

export async function POST(request) {
  try {
    // Verify webhook authenticity
    const hmac = request.headers.get('X-Shopify-Hmac-Sha256');
    const topic = request.headers.get('X-Shopify-Topic');
    const shop = request.headers.get('X-Shopify-Shop-Domain');
    
    console.log('📦 Webhook received:', { topic, shop });

    // Get raw body for HMAC verification
    const rawBody = await request.text();
    
    // Verify HMAC signature
    const webhookSecret = process.env.SHOPIFY_WEBHOOK_SECRET;
    if (!webhookSecret) {
      console.error('❌ SHOPIFY_WEBHOOK_SECRET not configured');
      return new Response('Webhook secret not configured', { status: 500 });
    }

    const hash = crypto
      .createHmac('sha256', webhookSecret)
      .update(rawBody, 'utf8')
      .digest('base64');

    if (hash !== hmac) {
      console.error('❌ HMAC verification failed');
      return new Response('Invalid webhook signature', { status: 401 });
    }

    console.log('✅ HMAC verified');

    // Parse the order data
    const order = JSON.parse(rawBody);
    
    console.log('📋 Order ID:', order.id);
    console.log('📋 Order Number:', order.order_number);
    console.log('📋 Note Attributes:', order.note_attributes);

    // Check if this is a configurator order
    const isConfiguratorOrder = order.note_attributes?.some(
      attr => attr.name === 'source' && attr.value === 'steering_wheel_configurator'
    );

    if (!isConfiguratorOrder) {
      console.log('ℹ️ Not a configurator order, skipping notification');
      return new Response('OK', { status: 200 });
    }

    console.log('🎯 Configurator order detected!');

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

    console.log('📧 Sending notification email...');

    // Send notification email
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
      // Don't fail the webhook, just log the error
    } else {
      console.log('✅ Email sent successfully');
    }

    return new Response('OK', { status: 200 });

  } catch (error) {
    console.error('❌ Webhook processing error:', error);
    // Always return 200 to prevent Shopify from retrying
    return new Response('Error processed', { status: 200 });
  }
}

import crypto from 'crypto';
import { Buffer } from 'buffer';

// Note: No 'config' export is needed in the App Router for this method, 
// as request.arrayBuffer() directly accesses the body stream.

/**
 * Shopify Webhook Handler (App Router)
 */
export async function POST(request) {
  let responseStatus = 200;

  try {
    // 1. Get headers
    const hmac = request.headers.get('X-Shopify-Hmac-Sha256');
    const topic = request.headers.get('X-Shopify-Topic');
    const shop = request.headers.get('X-Shopify-Shop-Domain');

    console.log('📦 Webhook received:', { topic, shop });

    // CRITICAL: Use arrayBuffer() to get the raw bytes directly
    const rawBodyBuffer = await request.arrayBuffer();
    
    // 2. HMAC Verification Setup
    const webhookSecret = process.env.SHOPIFY_WEBHOOK_SECRET;
    if (!webhookSecret) {
      console.error('❌ SHOPIFY_WEBHOOK_SECRET not configured');
      return new Response('Webhook secret not configured', { status: responseStatus });
    }

    // 3. Timing-Safe HMAC Verification
    
    // Calculate HMAC using the raw bytes Buffer for byte-perfect accuracy
    const calculatedHashBuffer = crypto
      .createHmac('sha256', webhookSecret)
      .update(Buffer.from(rawBodyBuffer))
      .digest();

    // Convert the received HMAC (base64 string) to a Buffer
    const receivedHmacBuffer = Buffer.from(hmac || '', 'base64');
    
    const hmacMatch = calculatedHashBuffer.length === receivedHmacBuffer.length &&
                      crypto.timingSafeEqual(calculatedHashBuffer, receivedHmacBuffer);

    // Debug logging
    console.log('🔍 Debug Info:');
    console.log('Received HMAC (Base64):', hmac);
    console.log('Calculated Hash (Base64):', calculatedHashBuffer.toString('base64'));
    console.log('Match:', hmacMatch);
    
    if (!hmacMatch) {
      console.error('❌ HMAC verification failed (App Router check)');
      return new Response('Invalid webhook signature', { status: 401 });
    }

    console.log('✅ HMAC verified');

    // 4. Parse and Process Webhook Data
    // Decode the buffer to a UTF-8 string ONLY after verification succeeds
    const rawBody = Buffer.from(rawBodyBuffer).toString('utf-8');
    const order = JSON.parse(rawBody);

    // ... (Order processing logic from the original request)
    // ----------------------------------------------------------------------------------
    console.log('📋 Order ID:', order.id);
    console.log('📋 Order Number:', order.order_number);

    // Check if this is a configurator order
    const isConfiguratorOrder = order.note_attributes?.some(
      attr => attr.name === 'source' && attr.value === 'steering_wheel_configurator'
    );

    if (!isConfiguratorOrder) {
      console.log('ℹ️ Not a configurator order, skipping notification');
      return new Response('OK', { status: 200 });
    }

    console.log('Configurator order detected!');

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
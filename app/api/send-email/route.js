import { sendOrderNotificationEmail } from '@/lib/email';

export async function POST(request) {
  try {
    const { orderDetails } = await request.json();

    if (!orderDetails) {
      return new Response(
        JSON.stringify({ error: 'Order details are required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const { success, data, error } = await sendOrderNotificationEmail(orderDetails);

    if (!success) {
      return new Response(
        JSON.stringify({ error }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    console.log('✅ Email sent successfully:', data);

    return new Response(
      JSON.stringify({ success: true, data }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    console.error('❌ Error processing request:', err);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

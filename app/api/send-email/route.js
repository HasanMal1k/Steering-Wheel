import { Resend } from 'resend';
import { OrderNotificationEmail } from '@/app/emails/OrderNotification';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const { orderDetails } = await request.json();

    if (!orderDetails) {
      return new Response(
        JSON.stringify({ error: 'Order details are required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const recipientEmail = process.env.ORDER_NOTIFICATION_EMAIL;
    
    if (!recipientEmail) {
      console.error('❌ ORDER_NOTIFICATION_EMAIL not configured');
      return new Response(
        JSON.stringify({ error: 'Notification email not configured' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    console.log('📧 Sending order notification to:', recipientEmail);

    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'orders@yourdomain.com',
      to: recipientEmail,
      subject: `🎯 New Configurator Order #${orderDetails.orderNumber}`,
      react: OrderNotificationEmail({ orderDetails }),
    });

    if (error) {
      console.error('❌ Resend error:', error);
      return new Response(
        JSON.stringify({ error: error.message }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    console.log('✅ Email sent successfully:', data);

    return new Response(
      JSON.stringify({ success: true, data }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('❌ Email sending error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

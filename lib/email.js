import { Resend } from 'resend';
import { OrderNotificationEmail } from '@/app/emails/OrderNotification';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendOrderNotificationEmail(orderDetails) {
  const recipientEmail = process.env.ORDER_NOTIFICATION_EMAIL;

  if (!recipientEmail) {
    console.error('❌ ORDER_NOTIFICATION_EMAIL not configured');
    return { success: false, error: 'Notification email not configured' };
  }

  try {
    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
      to: recipientEmail,
      subject: `New Configurator Order #${orderDetails.orderNumber}`,
      react: OrderNotificationEmail({ orderDetails }),
    });

    if (error) {
      console.error('❌ Resend error:', error);
      return { success: false, error: error.message || error };
    }

    return { success: true, data };
  } catch (error) {
     console.error('❌ Unexpected error sending email:', error);
     return { success: false, error: error.message };
  }
}

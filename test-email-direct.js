const { Resend } = require('resend');

// keys from .env context
const RESEND_API_KEY = 're_FQwmLeQD_73wY5mwkJ4BReXKtWbH6rPyG'; // From your .env
const FROM_EMAIL = 'onboarding@resend.dev'; // Using default for safety first, or use 'orders@777performance.com' if domain is verified
const TO_EMAIL = 'mhasanmalik03@gmail.com'; 

const resend = new Resend(RESEND_API_KEY);

async function sendTest() {
  console.log('Sending test email to', TO_EMAIL, 'using key starting with', RESEND_API_KEY.substring(0,5) + '...');
  try {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL, 
      subject: 'Test Email from Script (Direct Node)',
      html: '<p>This is a test email to verify Resend credentials are working.</p>'
    });

    if (error) {
      console.error('❌ Error response from Resend:', error);
    } else {
      console.log('✅ Success! Email sent properly.', data);
    }
  } catch (e) {
    console.error('❌ Exception occurred:', e);
  }
}

sendTest();

// Test email sending
const testOrderDetails = {
  orderNumber: '1001',
  orderId: 'gid://shopify/Order/12345',
  customerName: 'John Doe',
  customerEmail: 'customer@example.com',
  total: '299.99',
  currency: 'USD',
  createdAt: new Date().toISOString(),
  lineItems: [
    { name: 'GT3 Steering Wheel', quantity: 1, price: '199.99' },
    { name: 'Hub Adapter - Toyota Corolla', quantity: 1, price: '50.00' },
    { name: 'Joysticks - Blue', quantity: 1, price: '25.00' },
    { name: 'Rotary Encoder - Red', quantity: 1, price: '25.00' }
  ],
  configuration: {
    wheelType: 'gt3',
    make: 'Toyota',
    model: 'Corolla',
    joystickColor: 'blue',
    rotaryColor: 'red'
  },
  note: 'Steering Wheel Configurator Order - Toyota Corolla'
};

fetch('http://localhost:3000/api/send-email', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ orderDetails: testOrderDetails }),
})
  .then(res => res.json())
  .then(data => {
    console.log('✅ Email sent:', data);
  })
  .catch(err => {
    console.error('❌ Error:', err);
  });

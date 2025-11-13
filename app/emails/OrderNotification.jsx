import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Hr,
  Row,
  Column,
} from '@react-email/components';

export function OrderNotificationEmail({ orderDetails }) {
  const {
    orderNumber,
    orderId,
    customerName,
    customerEmail,
    total,
    currency,
    createdAt,
    lineItems = [],
    configuration = {},
    note
  } = orderDetails;

  return (
    <Html>
      <Head />
      <Preview>New steering wheel configurator order #{orderNumber}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>🎯 New Configurator Order</Heading>
          
          <Section style={section}>
            <Text style={label}>Order Details</Text>
            <Text style={text}>
              <strong>Order Number:</strong> #{orderNumber}
              <br />
              <strong>Order ID:</strong> {orderId}
              <br />
              <strong>Date:</strong> {new Date(createdAt).toLocaleString()}
              <br />
              <strong>Total:</strong> {currency} {total}
            </Text>
          </Section>

          <Hr style={hr} />

          <Section style={section}>
            <Text style={label}>Customer Information</Text>
            <Text style={text}>
              <strong>Name:</strong> {customerName}
              <br />
              <strong>Email:</strong> {customerEmail}
            </Text>
          </Section>

          <Hr style={hr} />

          <Section style={section}>
            <Text style={label}>🎨 Configuration Details</Text>
            <div style={configBox}>
              {configuration.make && configuration.model && (
                <Text style={configText}>
                  <strong>Vehicle:</strong> {configuration.make} {configuration.model}
                </Text>
              )}
              {configuration.wheelType && (
                <Text style={configText}>
                  <strong>Wheel Type:</strong> {configuration.wheelType === 'gt3' ? 'GT3 Wheel' : configuration.wheelType === 'round' ? 'Round Wheel' : 'Hub Only'}
                </Text>
              )}
              {configuration.joystickColor && (
                <Text style={configText}>
                  <strong>Joystick Color:</strong> {configuration.joystickColor}
                </Text>
              )}
              {configuration.rotaryColor && (
                <Text style={configText}>
                  <strong>Rotary Color:</strong> {configuration.rotaryColor}
                </Text>
              )}
            </div>
          </Section>

          <Hr style={hr} />

          <Section style={section}>
            <Text style={label}>Order Items</Text>
            {lineItems.map((item, index) => (
              <Row key={index} style={itemRow}>
                <Column style={itemName}>
                  <Text style={text}>{item.name}</Text>
                </Column>
                <Column style={itemQty}>
                  <Text style={text}>Qty: {item.quantity}</Text>
                </Column>
                <Column style={itemPrice}>
                  <Text style={text}>{currency} {item.price}</Text>
                </Column>
              </Row>
            ))}
          </Section>

          {note && (
            <>
              <Hr style={hr} />
              <Section style={section}>
                <Text style={label}>Order Note</Text>
                <Text style={text}>{note}</Text>
              </Section>
            </>
          )}

          <Hr style={hr} />

          <Text style={footer}>
            This is an automated notification from your Steering Wheel Configurator.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

// Styles
const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
  maxWidth: '600px',
};

const section = {
  padding: '0 48px',
};

const h1 = {
  color: '#333',
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '40px 0 20px',
  padding: '0 48px',
};

const label = {
  color: '#8898aa',
  fontSize: '12px',
  fontWeight: '600',
  textTransform: 'uppercase',
  marginBottom: '8px',
};

const text = {
  color: '#525f7f',
  fontSize: '14px',
  lineHeight: '24px',
  margin: '0 0 10px',
};

const configBox = {
  backgroundColor: '#f8f9fa',
  borderRadius: '8px',
  padding: '16px',
  marginTop: '12px',
};

const configText = {
  color: '#333',
  fontSize: '14px',
  lineHeight: '24px',
  margin: '4px 0',
};

const hr = {
  borderColor: '#e6ebf1',
  margin: '20px 0',
};

const itemRow = {
  marginBottom: '12px',
};

const itemName = {
  width: '50%',
};

const itemQty = {
  width: '25%',
};

const itemPrice = {
  width: '25%',
  textAlign: 'right',
};

const footer = {
  color: '#8898aa',
  fontSize: '12px',
  lineHeight: '16px',
  padding: '0 48px',
  marginTop: '32px',
};

export default OrderNotificationEmail;

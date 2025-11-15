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
  Img,
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
          {/* Logo */}
          <Section style={logoSection}>
            <Img
              src="https://steering-wheel-seven.vercel.app/images/logo.png"
              alt="Triple Seven Performance"
              width="120"
              height="auto"
              style={logo}
            />
          </Section>

          <Heading style={h1}>New Configurator Order</Heading>
          
          <Section style={section}>
            <Text style={label}>ORDER DETAILS</Text>
            <Text style={text}>
              <strong>Order Number:</strong> #{orderNumber}
              <br />
              <strong>Order ID:</strong> {orderId}
              <br />
              <strong>Date:</strong> {new Date(createdAt).toLocaleString()}
              <br />
              <strong>Total:</strong> {currency} ${total}
            </Text>
          </Section>

          <Hr style={hr} />

          <Section style={section}>
            <Text style={label}>CUSTOMER INFORMATION</Text>
            <Text style={text}>
              <strong>Name:</strong> {customerName}
              <br />
              <strong>Email:</strong> {customerEmail}
            </Text>
          </Section>

          <Hr style={hr} />

          <Section style={section}>
            <Text style={label}>CONFIGURATION DETAILS</Text>
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
            <Text style={label}>ORDER ITEMS</Text>
            {lineItems.map((item, index) => (
              <Row key={index} style={itemRow}>
                <Column style={itemName}>
                  <Text style={itemText}>{item.name}</Text>
                </Column>
                <Column style={itemQty}>
                  <Text style={itemText}>Qty: {item.quantity}</Text>
                </Column>
                <Column style={itemPrice}>
                  <Text style={itemText}>${item.price}</Text>
                </Column>
              </Row>
            ))}
          </Section>

          {note && (
            <>
              <Hr style={hr} />
              <Section style={section}>
                <Text style={label}>ORDER NOTE</Text>
                <Text style={text}>{note}</Text>
              </Section>
            </>
          )}

          <Hr style={hr} />

          <Text style={footer}>
            This is an automated notification from Triple Seven Performance Steering Wheel Configurator.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

// Styles
const main = {
  backgroundColor: '#0a0a0a',
  fontFamily: 'Michroma, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  padding: '40px 0',
};

const container = {
  backgroundColor: '#1a1a1a',
  margin: '0 auto',
  padding: '40px 0',
  maxWidth: '600px',
  border: '1px solid #2a2a2a',
};

const logoSection = {
  padding: '0 48px 20px',
  textAlign: 'center',
};

const logo = {
  margin: '0 auto',
};

const section = {
  padding: '0 48px',
};

const h1 = {
  color: '#ffffff',
  fontSize: '24px',
  fontWeight: '400',
  margin: '20px 0 30px',
  padding: '0 48px',
  textAlign: 'center',
  letterSpacing: '1px',
  textTransform: 'uppercase',
};

const label = {
  color: '#999999',
  fontSize: '11px',
  fontWeight: '400',
  textTransform: 'uppercase',
  marginBottom: '12px',
  letterSpacing: '1.5px',
};

const text = {
  color: '#cccccc',
  fontSize: '14px',
  lineHeight: '24px',
  margin: '0 0 10px',
  fontWeight: '300',
};

const configBox = {
  backgroundColor: '#252525',
  borderRadius: '4px',
  padding: '20px',
  marginTop: '12px',
  border: '1px solid #333333',
};

const configText = {
  color: '#e0e0e0',
  fontSize: '14px',
  lineHeight: '24px',
  margin: '4px 0',
  fontWeight: '300',
};

const hr = {
  borderColor: '#2a2a2a',
  margin: '30px 0',
};

const itemRow = {
  marginBottom: '16px',
  paddingBottom: '12px',
  borderBottom: '1px solid #252525',
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

const itemText = {
  color: '#cccccc',
  fontSize: '14px',
  margin: '0',
  fontWeight: '300',
};

const footer = {
  color: '#666666',
  fontSize: '11px',
  lineHeight: '16px',
  padding: '0 48px',
  marginTop: '40px',
  textAlign: 'center',
  fontWeight: '300',
};

export default OrderNotificationEmail;

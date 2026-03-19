import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

const BASE_URL = "https://sammapix.com";

const main = {
  backgroundColor: "#ffffff",
  fontFamily: "Inter,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif",
};
const container = {
  margin: "0 auto",
  padding: "40px 24px",
  maxWidth: "520px",
};
const logo = {
  fontSize: "18px",
  fontWeight: "600" as const,
  color: "#171717",
  letterSpacing: "-0.02em",
  margin: "0 0 32px",
};
const logoAccent = { color: "#6366F1" };
const heading = {
  fontSize: "22px",
  fontWeight: "600" as const,
  color: "#171717",
  margin: "0 0 8px",
  letterSpacing: "-0.02em",
};
const body = {
  fontSize: "15px",
  lineHeight: "1.6",
  color: "#525252",
  margin: "0 0 16px",
};
const button = {
  backgroundColor: "#6366F1",
  color: "#ffffff",
  padding: "12px 24px",
  borderRadius: "6px",
  fontSize: "14px",
  fontWeight: "500" as const,
  textDecoration: "none",
  display: "inline-block",
};
const warningBox = {
  backgroundColor: "#FFFBEB",
  borderLeft: "3px solid #D97706",
  padding: "12px 16px",
  borderRadius: "0 4px 4px 0",
  margin: "16px 0",
};
const warningText = {
  fontSize: "14px",
  lineHeight: "1.6",
  color: "#92400E",
  margin: "0",
};
const subtle = {
  fontSize: "13px",
  color: "#a3a3a3",
  margin: "12px 0 0",
};
const footer = {
  fontSize: "12px",
  color: "#a3a3a3",
  lineHeight: "1.5",
  margin: "0",
};
const hr = { borderColor: "#e5e5e5", margin: "28px 0" };

interface PaymentFailedEmailProps {
  name: string;
}

export function PaymentFailedEmail({ name }: PaymentFailedEmailProps) {
  return (
    <Html lang="en">
      <Head />
      <Preview>
        Action needed: your SammaPix Pro payment didn&apos;t go through
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <Text style={logo}>
            Samma<span style={logoAccent}>Pix</span>
          </Text>

          <Heading style={heading}>
            Your payment didn&apos;t go through
          </Heading>
          <Text style={body}>Hi {name},</Text>
          <Text style={body}>
            We tried to charge your payment method for your SammaPix Pro
            subscription, but it was declined. This can happen when a card
            expires, has insufficient funds, or the bank flags the transaction.
          </Text>

          <Section style={warningBox}>
            <Text style={warningText}>
              <strong>Your Pro access will be paused in 3 days</strong> if we
              can&apos;t process the payment. Please update your payment method
              to keep your Pro features active.
            </Text>
          </Section>

          <Section style={{ margin: "24px 0" }}>
            <Button style={button} href={`${BASE_URL}/account`}>
              Update Payment Method →
            </Button>
          </Section>

          <Text style={body}>
            If you&apos;ve already updated your card, you can ignore this email-
            we&apos;ll automatically retry the charge within 24 hours.
          </Text>

          <Text style={subtle}>
            Need help? Just reply to this email and we&apos;ll sort it out.
          </Text>

          <Hr style={hr} />
          <Text style={footer}>
            You&apos;re receiving this because you have an active SammaPix Pro
            subscription. {"\n"}
            <Link
              href={`${BASE_URL}/unsubscribe`}
              style={{ color: "#a3a3a3" }}
            >
              Unsubscribe
            </Link>
            {" · "}
            <Link href={`${BASE_URL}/privacy`} style={{ color: "#a3a3a3" }}>
              Privacy Policy
            </Link>
            {"\n"}SammaPix · sammapix.com
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

export default PaymentFailedEmail;

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
const listItem = {
  fontSize: "15px",
  lineHeight: "1.6",
  color: "#525252",
  margin: "0 0 8px",
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
const highlight = {
  backgroundColor: "#f5f5ff",
  borderLeft: "3px solid #6366F1",
  padding: "12px 16px",
  borderRadius: "0 4px 4px 0",
  margin: "16px 0",
};
const highlightText = {
  fontSize: "14px",
  lineHeight: "1.6",
  color: "#374151",
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

interface ProUpgradeEmailProps {
  name: string;
}

export function ProUpgradeEmail({ name }: ProUpgradeEmailProps) {
  return (
    <Html lang="en">
      <Head />
      <Preview>Welcome to SammaPix Pro! Here&apos;s what&apos;s unlocked</Preview>
      <Body style={main}>
        <Container style={container}>
          <Text style={logo}>
            Samma<span style={logoAccent}>Pix</span>
          </Text>

          <Heading style={heading}>
            You&apos;re on Pro now. Here&apos;s everything that&apos;s unlocked.
          </Heading>
          <Text style={body}>Hi {name},</Text>
          <Text style={body}>
            Thank you for upgrading to SammaPix Pro. You now have access to
            everything we offer- no limits, no ads, full power.
          </Text>

          <Section>
            <Text style={listItem}>
              ✓ <strong>200 AI renames per day</strong> (up from 5)
            </Text>
            <Text style={listItem}>
              ✓ <strong>Batch processing up to 500 files</strong> at once
            </Text>
            <Text style={listItem}>
              ✓ <strong>ZIP download</strong> for all batch results
            </Text>
            <Text style={listItem}>
              ✓ <strong>Zero ads</strong> across the entire app
            </Text>
            <Text style={listItem}>
              ✓ <strong>Priority support</strong>- we reply within hours
            </Text>
          </Section>

          <Section style={highlight}>
            <Text style={highlightText}>
              <strong>Quick tip:</strong> Try dropping 20+ images into the
              Compress tool and download them all as a single ZIP. It&apos;s the
              fastest way to optimize an entire folder.
            </Text>
          </Section>

          <Section style={{ margin: "24px 0" }}>
            <Button style={button} href={BASE_URL}>
              Open SammaPix Dashboard →
            </Button>
          </Section>

          <Text style={subtle}>
            Your Pro plan renews automatically each billing cycle. You can manage
            your subscription anytime from your account page.
          </Text>

          <Hr style={hr} />

          <Text style={body}>
            If you have any questions or feature requests, just reply to this
            email. I read every message.
          </Text>
          <Text style={{ ...body, margin: "0" }}>- Luca, founder</Text>

          <Hr style={hr} />
          <Text style={footer}>
            You&apos;re receiving this because you upgraded to SammaPix Pro.
            {"\n"}
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

export default ProUpgradeEmail;

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
const codeBox = {
  backgroundColor: "#f5f5f5",
  border: "1px solid #e5e5e5",
  borderRadius: "6px",
  padding: "16px",
  textAlign: "center" as const,
  margin: "20px 0",
};
const codeText = {
  fontSize: "24px",
  fontWeight: "700" as const,
  fontFamily: "monospace",
  color: "#171717",
  letterSpacing: "0.05em",
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

interface GiftEmailProps {
  recipientName: string;
  senderName: string;
  message?: string;
  giftCode: string;
  months: number;
  plan: string;
}

export function GiftEmail({
  recipientName,
  senderName,
  message,
  giftCode,
  months,
  plan,
}: GiftEmailProps) {
  const duration =
    months === 1
      ? "1 month"
      : months === 12
        ? "1 year"
        : `${months} months`;
  const planLabel = plan === "annual" ? "Annual" : "Monthly";

  return (
    <Html lang="en">
      <Head />
      <Preview>
        {senderName} sent you a SammaPix Pro gift!
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <Text style={logo}>
            Samma<span style={logoAccent}>Pix</span>
          </Text>

          <Heading style={heading}>
            You&apos;ve received a SammaPix Pro gift!
          </Heading>

          <Text style={body}>Hi {recipientName},</Text>

          <Text style={body}>
            <strong>{senderName}</strong> just gifted you{" "}
            <strong>{duration}</strong> of SammaPix Pro ({planLabel}). How
            awesome is that?
          </Text>

          {message && (
            <Section style={highlight}>
              <Text style={highlightText}>
                &ldquo;{message}&rdquo;
              </Text>
              <Text
                style={{
                  ...highlightText,
                  fontSize: "13px",
                  color: "#a3a3a3",
                  marginTop: "4px",
                }}
              >
                — {senderName}
              </Text>
            </Section>
          )}

          <Text style={body}>Here&apos;s your gift code:</Text>

          <Section style={codeBox}>
            <Text style={codeText}>{giftCode}</Text>
          </Section>

          <Text style={body}>
            <strong>How to redeem:</strong> Click the button below, enter
            your gift code, and your Pro access will be activated
            instantly.
          </Text>

          <Section style={{ margin: "24px 0" }}>
            <Button style={button} href={`${BASE_URL}/gift/redeem`}>
              Redeem Your Gift →
            </Button>
          </Section>

          <Text
            style={{
              ...body,
              fontSize: "14px",
              fontWeight: "600" as const,
              color: "#171717",
              margin: "24px 0 8px",
            }}
          >
            What&apos;s included with Pro:
          </Text>

          <Section>
            <Text style={listItem}>✓ Up to 500 files per batch</Text>
            <Text style={listItem}>✓ 500 AI credits per day (rename, alt text, smart sort)</Text>
            <Text style={listItem}>✓ 50 MB max file size</Text>
            <Text style={listItem}>✓ ZIP downloads</Text>
            <Text style={listItem}>✓ Zero ads</Text>
          </Section>

          <Text style={subtle}>
            You can also redeem manually at{" "}
            <Link
              href={`${BASE_URL}/gift/redeem`}
              style={{ color: "#6366F1" }}
            >
              sammapix.com/gift/redeem
            </Link>
          </Text>

          <Hr style={hr} />

          <Text style={{ ...body, margin: "0" }}>
            Enjoy your Pro powers!{"\n"}- The SammaPix team
          </Text>

          <Hr style={hr} />
          <Text style={footer}>
            You&apos;re receiving this because someone gifted you
            SammaPix Pro.{" "}
            {"\n"}
            <Link
              href={`${BASE_URL}/privacy`}
              style={{ color: "#a3a3a3" }}
            >
              Privacy Policy
            </Link>
            {"\n"}SammaPix · sammapix.com
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

export default GiftEmail;

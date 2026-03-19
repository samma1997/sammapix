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
  margin: "0 0 16px",
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
  margin: "0 0 8px",
};
const highlightItem = {
  fontSize: "14px",
  lineHeight: "1.7",
  color: "#525252",
  margin: "0 0 4px",
};
const signature = {
  fontSize: "15px",
  lineHeight: "1.6",
  color: "#525252",
  margin: "0 0 16px",
};
const ps = {
  fontSize: "13px",
  color: "#a3a3a3",
  lineHeight: "1.5",
  margin: "16px 0 0",
};
const footer = {
  fontSize: "12px",
  color: "#a3a3a3",
  lineHeight: "1.5",
  margin: "0",
};
const hr = { borderColor: "#e5e5e5", margin: "28px 0" };

interface ReEngageDay14EmailProps {
  name: string;
}

export function ReEngageDay14Email({ name }: ReEngageDay14EmailProps) {
  return (
    <Html lang="en">
      <Head />
      <Preview>We&apos;ve been building while you were away</Preview>
      <Body style={main}>
        <Container style={container}>
          <Text style={logo}>
            Samma<span style={logoAccent}>Pix</span>
          </Text>

          <Heading style={heading}>
            We miss you! Here&apos;s what&apos;s new
          </Heading>

          <Text style={body}>Hi {name},</Text>
          <Text style={body}>
            It&apos;s been a couple of weeks since you last used SammaPix.
            No worries- we&apos;ve been busy making things better for when
            you come back.
          </Text>

          <Section style={highlight}>
            <Text style={highlightText}>
              <strong>Since you&apos;ve been away:</strong>
            </Text>
            <Text style={highlightItem}>
              - Faster compression engine- up to 2x quicker on large batches
            </Text>
            <Text style={highlightItem}>
              - Improved AI Rename accuracy with better context detection
            </Text>
          </Section>

          <Text style={body}>
            Everything still works the same way: drop your images, pick a tool,
            done. Your files never leave your browser.
          </Text>

          <Section style={{ margin: "24px 0" }}>
            <Button style={button} href={BASE_URL}>
              Come Back and Try It →
            </Button>
          </Section>

          <Text style={signature}> - Luca</Text>

          <Text style={ps}>
            P.S. If something wasn&apos;t working for you, I&apos;d love to
            hear about it. Just reply to this email.
          </Text>

          <Hr style={hr} />
          <Text style={footer}>
            You&apos;re receiving this because you signed up for SammaPix.
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

export default ReEngageDay14Email;

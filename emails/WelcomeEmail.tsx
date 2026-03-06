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

interface WelcomeEmailProps {
  name: string;
}

export function WelcomeEmail({ name }: WelcomeEmailProps) {
  return (
    <Html lang="en">
      <Head />
      <Preview>You have 5 free AI renames waiting for you</Preview>
      <Body style={main}>
        <Container style={container}>
          <Text style={logo}>
            Samma<span style={logoAccent}>Pix</span>
          </Text>

          <Heading style={heading}>Your AI rename credits are ready</Heading>
          <Text style={body}>Hi {name},</Text>
          <Text style={body}>
            Welcome to SammaPix! Here&apos;s what you can do right now (all
            free):
          </Text>

          <Section>
            <Text style={listItem}>
              ✓ Compress JPG, PNG, WebP — no quality loss
            </Text>
            <Text style={listItem}>
              ✓ Convert any image to WebP (25–34% lighter than JPEG)
            </Text>
            <Text style={listItem}>
              ✓ AI rename: paste an image, get an SEO filename like{" "}
              <span
                style={{
                  fontFamily: "monospace",
                  fontSize: "13px",
                  backgroundColor: "#f5f5f5",
                  padding: "1px 5px",
                  borderRadius: "3px",
                  color: "#171717",
                }}
              >
                golden-retriever-puppy-playing-grass.webp
              </span>
            </Text>
          </Section>

          <Section style={highlight}>
            <Text style={highlightText}>
              You have <strong>5 free AI renames today</strong>. Sign in is
              already done — just open the tool and click AI Rename.
            </Text>
          </Section>

          <Section style={{ margin: "24px 0" }}>
            <Button style={button} href={BASE_URL}>
              Open SammaPix →
            </Button>
          </Section>

          <Text style={subtle}>
            No setup needed. Your files never leave your browser.
          </Text>

          <Hr style={hr} />

          <Text style={body}>
            Over the next few days I&apos;ll share tips to get the most out of
            SammaPix.
          </Text>
          <Text style={{ ...body, margin: "0" }}>— Luca, founder</Text>

          <Hr style={hr} />
          <Text style={footer}>
            You&apos;re receiving this because you signed up for SammaPix.{" "}
            {"\n"}
            <Link
              href={`${BASE_URL}/unsubscribe`}
              style={{ color: "#a3a3a3" }}
            >
              Unsubscribe
            </Link>
            {" · "}
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

export default WelcomeEmail;

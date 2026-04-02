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
const updateCard = {
  backgroundColor: "#fafafa",
  border: "1px solid #e5e5e5",
  borderRadius: "6px",
  padding: "14px 16px",
  margin: "0 0 8px",
};
const updateLabel = {
  fontSize: "11px",
  fontWeight: "500" as const,
  color: "#6366F1",
  textTransform: "uppercase" as const,
  letterSpacing: "0.05em",
  margin: "0 0 6px",
};
const updateTitle = {
  fontSize: "15px",
  fontWeight: "600" as const,
  color: "#171717",
  margin: "0 0 4px",
};
const updateDesc = {
  fontSize: "13px",
  lineHeight: "1.5",
  color: "#737373",
  margin: "0",
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

interface Day77EmailProps {
  name: string;
}

export function Day77Email({ name }: Day77EmailProps) {
  return (
    <Html lang="en">
      <Head />
      <Preview>What&apos;s new in SammaPix- latest updates</Preview>
      <Body style={main}>
        <Container style={container}>
          <Text style={logo}>
            Samma<span style={logoAccent}>Pix</span>
          </Text>

          <Heading style={heading}>What&apos;s new in SammaPix</Heading>

          <Text style={body}>Hi {name},</Text>
          <Text style={body}>
            We&apos;ve been busy improving SammaPix. Here&apos;s what&apos;s
            new since you last checked in:
          </Text>

          <Section>
            <Section style={updateCard}>
              <Text style={updateLabel}>New</Text>
              <Text style={updateTitle}>Faster batch processing</Text>
              <Text style={updateDesc}>
                Batch compress and convert now runs up to 2x faster thanks to
                Web Worker parallelization. Process 50+ images without the
                browser slowing down.
              </Text>
            </Section>

            <Section style={updateCard}>
              <Text style={updateLabel}>Improved</Text>
              <Text style={updateTitle}>Smarter AI Rename</Text>
              <Text style={updateDesc}>
                AI Rename now generates more descriptive, SEO-friendly filenames
                with better context awareness. Accuracy improved by 40%.
              </Text>
            </Section>

            <Section style={updateCard}>
              <Text style={updateLabel}>New</Text>
              <Text style={updateTitle}>Dark mode everywhere</Text>
              <Text style={updateDesc}>
                Full dark mode support across all 27 tools. Follows your system
                preference or toggle it manually.
              </Text>
            </Section>
          </Section>

          <Section style={{ margin: "24px 0" }}>
            <Button style={button} href={BASE_URL}>
              See What&apos;s New →
            </Button>
          </Section>

          <Text style={signature}> - Luca</Text>

          <Text style={ps}>
            P.S. Got a feature request? Reply to this email- I read every one.
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

export default Day77Email;

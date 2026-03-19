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
  margin: "0",
};
const stepBox = {
  backgroundColor: "#fafafa",
  border: "1px solid #e5e5e5",
  borderRadius: "6px",
  padding: "20px",
  margin: "20px 0",
};
const stepItem = {
  fontSize: "15px",
  lineHeight: "1.8",
  color: "#525252",
  margin: "0 0 4px",
};
const stepNumber = {
  fontWeight: "600" as const,
  color: "#171717",
};
const mono = {
  fontFamily: "monospace",
  fontSize: "13px",
  backgroundColor: "#f5f5f5",
  padding: "1px 5px",
  borderRadius: "3px",
  color: "#171717",
};
const signature = {
  fontSize: "15px",
  lineHeight: "1.6",
  color: "#525252",
  margin: "0 0 16px",
};
const footer = {
  fontSize: "12px",
  color: "#a3a3a3",
  lineHeight: "1.5",
  margin: "0",
};
const hr = { borderColor: "#e5e5e5", margin: "28px 0" };

interface Day49EmailProps {
  name: string;
}

export function Day49Email({ name }: Day49EmailProps) {
  return (
    <Html lang="en">
      <Head />
      <Preview>How a travel photographer uses SammaPix to save hours</Preview>
      <Body style={main}>
        <Container style={container}>
          <Text style={logo}>
            Samma<span style={logoAccent}>Pix</span>
          </Text>

          <Heading style={heading}>
            How a travel photographer uses SammaPix to save hours
          </Heading>

          <Text style={body}>Hi {name},</Text>
          <Text style={body}>
            Meet the typical workflow of a travel photographer who shoots
            200+ photos per trip and needs them web-ready for their blog.
            Here&apos;s how they use SammaPix to turn a 2-hour task into 10
            minutes:
          </Text>

          <Section style={stepBox}>
            <Text style={stepItem}>
              <span style={stepNumber}>Step 1.</span> Import 200 photos into
              SammaPix
            </Text>
            <Text style={stepItem}>
              <span style={stepNumber}>Step 2.</span> Find Duplicates removes 30+
              near-identical shots
            </Text>
            <Text style={stepItem}>
              <span style={stepNumber}>Step 3.</span> Batch compress- 60% smaller,
              zero visible quality loss
            </Text>
            <Text style={stepItem}>
              <span style={stepNumber}>Step 4.</span> AI Rename turns{" "}
              <span style={mono}>DSC_4821.jpg</span> into{" "}
              <span style={mono}>sunset-over-santorini-caldera.webp</span>
            </Text>
            <Text style={stepItem}>
              <span style={stepNumber}>Step 5.</span> Export as ZIP- ready to
              upload to WordPress
            </Text>
          </Section>

          <Section style={highlight}>
            <Text style={highlightText}>
              <strong>Result:</strong> 200 photos processed, properly named for
              SEO, 60% lighter, zero quality loss. All in the browser- nothing
              uploaded to any server.
            </Text>
          </Section>

          <Text style={body}>
            This workflow works for any creative- bloggers, e-commerce sellers,
            web developers, social media managers. The tools are the same,
            the time savings are real.
          </Text>

          <Section style={{ margin: "24px 0" }}>
            <Button style={button} href={BASE_URL}>
              Try the Pro Workflow →
            </Button>
          </Section>

          <Text style={signature}> - Luca</Text>

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

export default Day49Email;

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
const listItem = {
  fontSize: "15px",
  lineHeight: "1.6",
  color: "#525252",
  margin: "0 0 6px",
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
const useCaseBox = {
  backgroundColor: "#fafafa",
  border: "1px solid #e5e5e5",
  borderRadius: "6px",
  padding: "14px 16px",
  margin: "16px 0",
};
const useCaseText = {
  fontSize: "14px",
  lineHeight: "1.6",
  color: "#525252",
  margin: "0",
};
const subtle = {
  fontSize: "13px",
  color: "#a3a3a3",
  margin: "12px 0 0",
  lineHeight: "1.5",
};
const footer = {
  fontSize: "12px",
  color: "#a3a3a3",
  lineHeight: "1.5",
  margin: "0",
};
const hr = { borderColor: "#e5e5e5", margin: "28px 0" };

interface Day7EmailProps {
  name: string;
}

export function Day7Email({ name }: Day7EmailProps) {
  return (
    <Html lang="en">
      <Head />
      <Preview>
        Stop optimizing images one by one- here&apos;s a faster way
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <Text style={logo}>
            Samma<span style={logoAccent}>Pix</span>
          </Text>

          <Heading style={heading}>Process 20 images at once- here&apos;s how</Heading>

          <Text style={body}>Hi {name},</Text>
          <Text style={body}>
            If you&apos;ve been optimizing images one by one- there&apos;s a
            better way.
          </Text>

          <Text style={body}>
            SammaPix supports batch processing. Drop up to 20 images at once,
            set your compression quality, pick your output format (WebP, JPG, or
            PNG), and download them all as a single ZIP file. No clicking through
            each image individually.
          </Text>

          <Section style={useCaseBox}>
            <Text style={useCaseText}>
              Perfect for: blog posts, e-commerce product photos, real estate
              listings, client deliverables.
            </Text>
          </Section>

          <Section style={highlight}>
            <Text style={highlightText}>
              How it works: Drop 20 images → set quality (85 is the sweet spot)
              → click <strong>Download ZIP</strong> → done.
            </Text>
          </Section>

          <Section>
            <Text style={listItem}>✓ All processing happens in your browser</Text>
            <Text style={listItem}>✓ Nothing is uploaded to any server</Text>
            <Text style={listItem}>✓ One ZIP file, all images ready to use</Text>
          </Section>

          <Section style={{ margin: "24px 0" }}>
            <Button style={button} href={BASE_URL}>
              Try Batch Processing →
            </Button>
          </Section>

          <Text style={subtle}>
            Need more than 20 at once? Pro handles up to 100.{" "}
            <Link
              href={`${BASE_URL}/pricing`}
              style={{ color: "#a3a3a3", textDecoration: "underline" }}
            >
              Check pricing at sammapix.com/pricing
            </Link>
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

export default Day7Email;

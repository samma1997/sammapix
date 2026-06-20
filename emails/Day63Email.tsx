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

import { TOOL_COUNT } from "@/lib/constants";

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
const statsGrid = {
  margin: "20px 0",
};
const statBox = {
  backgroundColor: "#fafafa",
  border: "1px solid #e5e5e5",
  borderRadius: "6px",
  padding: "16px",
  margin: "0 0 8px",
  textAlign: "center" as const,
};
const statNumber = {
  fontSize: "28px",
  fontWeight: "700" as const,
  color: "#171717",
  letterSpacing: "-0.03em",
  margin: "0 0 4px",
};
const statLabel = {
  fontSize: "13px",
  color: "#a3a3a3",
  margin: "0",
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

interface Day63EmailProps {
  name: string;
}

export function Day63Email({ name }: Day63EmailProps) {
  return (
    <Html lang="en">
      <Head />
      <Preview>Why SammaPix is different- by the numbers</Preview>
      <Body style={main}>
        <Container style={container}>
          <Text style={logo}>
            Samma<span style={logoAccent}>Pix</span>
          </Text>

          <Heading style={heading}>SammaPix by the numbers</Heading>

          <Text style={body}>Hi {name},</Text>
          <Text style={body}>
            You&apos;ve been with SammaPix for a couple of months now. Here&apos;s
            what makes it different from every other image tool out there:
          </Text>

          <Section style={statsGrid}>
            <Section style={statBox}>
              <Text style={statNumber}>{TOOL_COUNT}</Text>
              <Text style={statLabel}>free tools</Text>
            </Section>
            <Section style={statBox}>
              <Text style={statNumber}>0</Text>
              <Text style={statLabel}>files uploaded</Text>
            </Section>
            <Section style={statBox}>
              <Text style={statNumber}>100%</Text>
              <Text style={statLabel}>in your browser</Text>
            </Section>
          </Section>

          <Section style={highlight}>
            <Text style={highlightText}>
              <strong>The point:</strong> your photos never leave your device.
              Every crop, compress and convert happens locally, so nothing is
              ever stored on a server. Most tools online can&apos;t say that.
            </Text>
          </Section>

          <Text style={body}>
            You&apos;ve got all {TOOL_COUNT} tools at your fingertips, from Photo
            Map to Film Filters to AI Photo Sort. If you haven&apos;t explored
            them yet, now&apos;s a good time.
          </Text>

          <Section style={{ margin: "24px 0" }}>
            <Button style={button} href={BASE_URL}>
              Keep Optimizing →
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

export default Day63Email;

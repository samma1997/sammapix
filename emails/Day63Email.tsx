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
  imagesProcessed?: number;
  mbSaved?: number;
  toolsUsed?: number;
}

export function Day63Email({
  name,
  imagesProcessed = 142,
  mbSaved = 87,
  toolsUsed = 4,
}: Day63EmailProps) {
  // Fun comparison: 1 floppy disk = 1.44 MB
  const floppyDisks = Math.round(mbSaved / 1.44);

  return (
    <Html lang="en">
      <Head />
      <Preview>Your images by the numbers- here&apos;s what you&apos;ve done</Preview>
      <Body style={main}>
        <Container style={container}>
          <Text style={logo}>
            Samma<span style={logoAccent}>Pix</span>
          </Text>

          <Heading style={heading}>Your images by the numbers</Heading>

          <Text style={body}>Hi {name},</Text>
          <Text style={body}>
            You&apos;ve been using SammaPix for about two months now. Here&apos;s
            a quick snapshot of what you&apos;ve accomplished:
          </Text>

          <Section style={statsGrid}>
            <Section style={statBox}>
              <Text style={statNumber}>{imagesProcessed.toLocaleString()}</Text>
              <Text style={statLabel}>images processed</Text>
            </Section>
            <Section style={statBox}>
              <Text style={statNumber}>{mbSaved} MB</Text>
              <Text style={statLabel}>total size saved</Text>
            </Section>
            <Section style={statBox}>
              <Text style={statNumber}>{toolsUsed}</Text>
              <Text style={statLabel}>tools used</Text>
            </Section>
          </Section>

          <Section style={highlight}>
            <Text style={highlightText}>
              <strong>Fun fact:</strong> {mbSaved} MB saved is the equivalent
              of{" "}
              <strong>
                {floppyDisks} floppy disk{floppyDisks !== 1 ? "s" : ""}
              </strong>
              . Remember those?
            </Text>
          </Section>

          <Text style={body}>
            {toolsUsed < 8
              ? `You've used ${toolsUsed} out of 25 tools so far. There are ${20 - toolsUsed} more waiting for you- from Photo Map to Film Filters to AI Photo Sort.`
              : "You're a power user! You've explored a solid chunk of SammaPix's 25 tools. Keep going."}
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

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
const promoBox = {
  backgroundColor: "#fafafa",
  border: "1px solid #e5e5e5",
  borderRadius: "6px",
  padding: "20px",
  margin: "20px 0",
  textAlign: "center" as const,
};
const promoCode = {
  fontFamily: "monospace",
  fontSize: "20px",
  fontWeight: "700" as const,
  color: "#6366F1",
  letterSpacing: "0.1em",
  display: "block" as const,
  margin: "8px 0",
};
const promoLabel = {
  fontSize: "13px",
  color: "#a3a3a3",
  margin: "4px 0 0",
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

interface Day30EmailProps {
  name: string;
}

export function Day30Email({ name }: Day30EmailProps) {
  return (
    <Html lang="en">
      <Head />
      <Preview>1 month with SammaPix- a small thank you</Preview>
      <Body style={main}>
        <Container style={container}>
          <Text style={logo}>
            Samma<span style={logoAccent}>Pix</span>
          </Text>

          <Heading style={heading}>
            1 month with SammaPix- a thank you (+ something for you)
          </Heading>

          <Text style={body}>Hi {name},</Text>
          <Text style={body}>
            You signed up for SammaPix one month ago. I wanted to say- 
            thank you.
          </Text>
          <Text style={body}>
            SammaPix started as a side project. I wanted a tool that was
            genuinely free, worked entirely in the browser, and used AI to solve
            the annoying problem of camera filenames like{" "}
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
              DSC_1042.jpg
            </span>
            . You&apos;re one of the early users making this real.
          </Text>

          <Section style={highlight}>
            <Text style={highlightText}>
              <strong>What&apos;s coming next:</strong>
            </Text>
            <Text style={highlightItem}>
             - Image resize (drag to set dimensions)
            </Text>
            <Text style={highlightItem}>
             - Background remover (AI-powered)
            </Text>
            <Text style={highlightItem}>
             - SammaPix API for developers
            </Text>
          </Section>

          <Hr style={hr} />

          <Text style={body}>
            As a thank you for being here from the start:
          </Text>

          <Section style={promoBox}>
            <Text style={{ fontSize: "14px", color: "#525252", margin: "0 0 4px" }}>
              Use code at checkout for
            </Text>
            <Text style={promoCode}>EARLYBIRD</Text>
            <Text style={{ fontSize: "15px", fontWeight: "600" as const, color: "#171717", margin: "4px 0" }}>
              20% off Pro- forever
            </Text>
            <Text style={promoLabel}>No expiry. Locked in for as long as you stay Pro.</Text>
          </Section>

          <Section style={{ margin: "24px 0" }}>
            <Button style={button} href={`${BASE_URL}/pricing`}>
              Claim 20% off Pro →
            </Button>
          </Section>

          <Text style={signature}>Thanks again for being here.- Luca</Text>

          <Text style={ps}>
            P.S. If you ever have feedback or ideas, just reply to this email.
            I read every message.
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

export default Day30Email;

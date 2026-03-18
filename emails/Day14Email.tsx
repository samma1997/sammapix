import {
  Body,
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
const questionText = {
  fontSize: "20px",
  fontWeight: "600" as const,
  color: "#171717",
  margin: "24px 0 20px",
  letterSpacing: "-0.01em",
};
const optionLink = {
  display: "block" as const,
  fontSize: "15px",
  color: "#6366F1",
  textDecoration: "none",
  margin: "0 0 12px",
  lineHeight: "1.5",
};
const statsBox = {
  backgroundColor: "#fafafa",
  border: "1px solid #e5e5e5",
  borderRadius: "6px",
  padding: "16px",
  margin: "20px 0",
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

interface Day14EmailProps {
  name: string;
}

export function Day14Email({ name }: Day14EmailProps) {
  return (
    <Html lang="en">
      <Head />
      <Preview>Quick question- what are you using SammaPix for?</Preview>
      <Body style={main}>
        <Container style={container}>
          <Text style={logo}>
            Samma<span style={logoAccent}>Pix</span>
          </Text>

          <Heading style={heading}>Two weeks in- quick question</Heading>

          <Text style={body}>Hi {name},</Text>
          <Text style={body}>
            Two weeks ago you signed up for SammaPix. Quick question:
          </Text>

          <Text style={questionText}>What are you using SammaPix for?</Text>

          <Section>
            <Link href={BASE_URL} style={optionLink}>
              → Blog / content creation
            </Link>
            <Link href={BASE_URL} style={optionLink}>
              → E-commerce / product photos
            </Link>
            <Link href={BASE_URL} style={optionLink}>
              → Web development / client work
            </Link>
          </Section>

          <Text style={body}>
            No wrong answer - I ask because I want to make sure I&apos;m
            building the right features for you.
          </Text>

          <Hr style={hr} />

          <Section style={statsBox}>
            <Text style={statNumber}>12,000+</Text>
            <Text style={statLabel}>
              images optimized by SammaPix users this week- processed
              in-browser, files never uploaded.
            </Text>
          </Section>

          <Text style={signature}> - Luca, founder of SammaPix</Text>

          <Text style={ps}>
            P.S. If you&apos;ve hit the 5 AI renames/day limit, Pro is $7/month.{" "}
            <Link
              href={`${BASE_URL}/pricing`}
              style={{ color: "#a3a3a3", textDecoration: "underline" }}
            >
              sammapix.com/pricing
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

export default Day14Email;

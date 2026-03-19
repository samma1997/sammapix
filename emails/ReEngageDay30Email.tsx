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
const creditBox = {
  backgroundColor: "#fafafa",
  border: "1px solid #e5e5e5",
  borderRadius: "6px",
  padding: "20px",
  margin: "20px 0",
  textAlign: "center" as const,
};
const creditNumber = {
  fontSize: "32px",
  fontWeight: "700" as const,
  color: "#6366F1",
  letterSpacing: "-0.03em",
  margin: "0 0 4px",
};
const creditLabel = {
  fontSize: "14px",
  color: "#525252",
  margin: "0 0 4px",
};
const creditSub = {
  fontSize: "12px",
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

interface ReEngageDay30EmailProps {
  name: string;
}

export function ReEngageDay30Email({ name }: ReEngageDay30EmailProps) {
  return (
    <Html lang="en">
      <Head />
      <Preview>Your free AI rename credits are still waiting</Preview>
      <Body style={main}>
        <Container style={container}>
          <Text style={logo}>
            Samma<span style={logoAccent}>Pix</span>
          </Text>

          <Heading style={heading}>
            Your free credits are waiting
          </Heading>

          <Text style={body}>Hi {name},</Text>
          <Text style={body}>
            It&apos;s been about a month since you last used SammaPix. Just a
            friendly reminder- you still have free AI rename credits available
            every day.
          </Text>

          <Section style={creditBox}>
            <Text style={creditNumber}>5</Text>
            <Text style={creditLabel}>
              free AI renames per day
            </Text>
            <Text style={creditSub}>
              Unused credits don&apos;t roll over- use them or lose them
            </Text>
          </Section>

          <Text style={body}>
            AI Rename analyzes your images and generates SEO-friendly
            filenames automatically. No more{" "}
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
              IMG_2847.jpg
            </span>
            . Just drop an image and let AI do the work.
          </Text>

          <Text style={body}>
            Plus, compress, convert, resize, and 16 other tools are completely
            free with no limits. Your files never leave the browser.
          </Text>

          <Section style={{ margin: "24px 0" }}>
            <Button style={button} href={`${BASE_URL}/ai-rename`}>
              Use Your Free Credits →
            </Button>
          </Section>

          <Text style={signature}> - Luca</Text>

          <Text style={ps}>
            P.S. This is the last reminder I&apos;ll send. If SammaPix
            isn&apos;t for you, no hard feelings- you can unsubscribe below.
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

export default ReEngageDay30Email;

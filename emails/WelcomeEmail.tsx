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

// `founding` is accepted for backwards compatibility with the caller but is
// deliberately NOT used here: the welcome email confirms the value the user
// signed up for (no ads) and sells nothing. Any paid offer is introduced far
// later in the sequence, once we have earned it.
interface WelcomeEmailProps {
  name: string;
  founding?: unknown;
}

export function WelcomeEmail({ name }: WelcomeEmailProps) {
  return (
    <Html lang="en">
      <Head />
      <Preview>You&apos;re in. No ads on any tool, and everything stays free.</Preview>
      <Body style={main}>
        <Container style={container}>
          <Text style={logo}>
            Samma<span style={logoAccent}>Pix</span>
          </Text>

          <Heading style={heading}>You&apos;re in. No more ads.</Heading>
          <Text style={body}>Hi {name},</Text>
          <Text style={body}>
            Thanks for signing in. From now on you won&apos;t see any ads while
            you use SammaPix. That&apos;s it, nothing to set up.
          </Text>
          <Text style={body}>While you&apos;re here, all of this is free:</Text>

          <Section>
            <Text style={listItem}>✓ Compress JPG, PNG, WebP with no quality loss</Text>
            <Text style={listItem}>✓ Resize for any platform (Instagram, WhatsApp, TikTok…)</Text>
            <Text style={listItem}>✓ Convert to WebP, HEIC, PDF and 10+ formats</Text>
            <Text style={listItem}>✓ Open RAR and 7z archives right in your browser</Text>
            <Text style={listItem}>✓ Remove backgrounds and find duplicate photos</Text>
          </Section>

          <Section style={highlight}>
            <Text style={highlightText}>
              Your files never leave your browser. No uploads, no servers, no
              waiting.
            </Text>
          </Section>

          <Section style={{ margin: "24px 0" }}>
            <Button style={button} href={BASE_URL}>
              Open SammaPix →
            </Button>
          </Section>

          <Text style={subtle}>No account setup, no card, nothing to install.</Text>

          <Hr style={hr} />

          <Text style={body}>
            Over the next couple of weeks I&apos;ll send a few short tips to get
            more out of your photos. Useful stuff, not spam. If it&apos;s not for
            you, one click unsubscribes you, no hard feelings.
          </Text>
          <Text style={{ ...body, margin: "0" }}>- Luca, founder</Text>

          <Hr style={hr} />
          <Text style={footer}>
            You&apos;re receiving this because you signed in to SammaPix.{" "}
            {"\n"}
            <Link href={`${BASE_URL}/unsubscribe`} style={{ color: "#a3a3a3" }}>
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

export default WelcomeEmail;

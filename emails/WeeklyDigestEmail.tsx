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
const label = {
  fontSize: "11px",
  fontWeight: "600" as const,
  color: "#a3a3a3",
  letterSpacing: "0.08em",
  textTransform: "uppercase" as const,
  margin: "0 0 12px",
};
const heading = {
  fontSize: "22px",
  fontWeight: "600" as const,
  color: "#171717",
  margin: "0 0 16px",
  letterSpacing: "-0.02em",
};
const sectionHeading = {
  fontSize: "16px",
  fontWeight: "600" as const,
  color: "#171717",
  margin: "0 0 8px",
  letterSpacing: "-0.01em",
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
const footer = {
  fontSize: "12px",
  color: "#a3a3a3",
  lineHeight: "1.5",
  margin: "0",
};
const hr = { borderColor: "#e5e5e5", margin: "28px 0" };

export interface WeeklyDigestContent {
  tipTitle: string;
  tipBody: string;
  featureTitle: string;
  featureBody: string;
  newsTitles: string[];
  ctaUrl: string;
}

interface WeeklyDigestEmailProps {
  name: string;
  subject: string;
  content: WeeklyDigestContent;
}

export function WeeklyDigestEmail({
  name,
  content,
}: WeeklyDigestEmailProps) {
  return (
    <Html lang="en">
      <Head />
      <Preview>
        {content.tipTitle} + what&apos;s new in SammaPix
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <Text style={logo}>
            Samma<span style={logoAccent}>Pix</span>
          </Text>

          <Text style={label}>Weekly from SammaPix</Text>
          <Heading style={heading}>Hi {name}, here&apos;s your weekly roundup</Heading>

          {/* --- Quick Tip --- */}
          <Hr style={hr} />
          <Text style={label}>Quick Tip</Text>
          <Text style={sectionHeading}>{content.tipTitle}</Text>
          <Text style={body}>{content.tipBody}</Text>

          {/* --- Feature Spotlight --- */}
          <Hr style={hr} />
          <Text style={label}>Feature Spotlight</Text>
          <Text style={sectionHeading}>{content.featureTitle}</Text>
          <Section style={highlight}>
            <Text style={highlightText}>{content.featureBody}</Text>
          </Section>

          {/* --- What's New --- */}
          {content.newsTitles.length > 0 && (
            <>
              <Hr style={hr} />
              <Text style={label}>What&apos;s New</Text>
              <Section>
                {content.newsTitles.map((title, i) => (
                  <Text key={i} style={listItem}>
                    → {title}
                  </Text>
                ))}
              </Section>
            </>
          )}

          {/* --- CTA --- */}
          <Hr style={hr} />
          <Section style={{ margin: "24px 0" }}>
            <Button style={button} href={content.ctaUrl || BASE_URL}>
              Open SammaPix →
            </Button>
          </Section>

          <Hr style={hr} />
          <Text style={footer}>
            You&apos;re receiving this weekly digest because you signed up for
            SammaPix. {"\n"}
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

export default WeeklyDigestEmail;

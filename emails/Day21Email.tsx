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
const planLabel = {
  fontSize: "11px",
  fontWeight: "600" as const,
  color: "#a3a3a3",
  letterSpacing: "0.08em",
  textTransform: "uppercase" as const,
  margin: "0 0 10px",
};
const planLabelPro = {
  fontSize: "11px",
  fontWeight: "600" as const,
  color: "#6366F1",
  letterSpacing: "0.08em",
  textTransform: "uppercase" as const,
  margin: "0 0 10px",
};
const planBox = {
  backgroundColor: "#fafafa",
  border: "1px solid #e5e5e5",
  borderRadius: "6px",
  padding: "16px 20px",
  margin: "0 0 12px",
};
const planBoxPro = {
  backgroundColor: "#f5f5ff",
  border: "1px solid #c7d2fe",
  borderRadius: "6px",
  padding: "16px 20px",
  margin: "0 0 12px",
};
const planItem = {
  fontSize: "14px",
  lineHeight: "1.7",
  color: "#525252",
  margin: "0 0 4px",
};
const planItemCrossed = {
  fontSize: "14px",
  lineHeight: "1.7",
  color: "#a3a3a3",
  margin: "0 0 4px",
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
const subtle = {
  fontSize: "13px",
  color: "#a3a3a3",
  margin: "10px 0 0",
  lineHeight: "1.5",
};
const footer = {
  fontSize: "12px",
  color: "#a3a3a3",
  lineHeight: "1.5",
  margin: "0",
};
const hr = { borderColor: "#e5e5e5", margin: "28px 0" };

interface Day21EmailProps {
  name: string;
}

export function Day21Email({ name }: Day21EmailProps) {
  return (
    <Html lang="en">
      <Head />
      <Preview>
        Here&apos;s what Pro users can do that you can&apos;t (yet)
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <Text style={logo}>
            Samma<span style={logoAccent}>Pix</span>
          </Text>

          <Heading style={heading}>
            What Pro users can do that you can&apos;t (yet)
          </Heading>

          <Text style={body}>Hi {name},</Text>
          <Text style={body}>
            You&apos;ve been on the free plan for 3 weeks. Wanted to show you
            what you&apos;re missing.
          </Text>

          <Section style={planBox}>
            <Text style={planLabel}>Free plan</Text>
            <Text style={planItem}>✓ Compress images (unlimited)</Text>
            <Text style={planItem}>✓ WebP conversion (unlimited)</Text>
            <Text style={planItem}>✓ 5 AI renames per day</Text>
            <Text style={planItem}>✓ Up to 20 files at once</Text>
            <Text style={planItemCrossed}>✗ No ZIP download</Text>
          </Section>

          <Section style={planBoxPro}>
            <Text style={planLabelPro}>Pro — $7/month</Text>
            <Text style={planItem}>✓ Everything in Free</Text>
            <Text style={planItem}>✓ 200 AI renames per day</Text>
            <Text style={planItem}>✓ Up to 100 files at once</Text>
            <Text style={planItem}>✓ ZIP download</Text>
            <Text style={planItem}>✓ No ads</Text>
            <Text style={planItem}>✓ Priority support</Text>
          </Section>

          <Text style={body}>
            For most users, free is enough forever. But if you&apos;re a content
            creator, developer, or agency — Pro pays for itself after the first
            project.
          </Text>

          <Section style={{ margin: "24px 0" }}>
            <Button style={button} href={`${BASE_URL}/pricing`}>
              Upgrade to Pro →
            </Button>
          </Section>

          <Text style={subtle}>No commitment. Cancel anytime.</Text>

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

export default Day21Email;

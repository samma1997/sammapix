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

interface ProCancelEmailProps {
  name: string;
}

export function ProCancelEmail({ name }: ProCancelEmailProps) {
  return (
    <Html lang="en">
      <Head />
      <Preview>Your SammaPix Pro subscription has been cancelled</Preview>
      <Body style={main}>
        <Container style={container}>
          <Text style={logo}>
            Samma<span style={logoAccent}>Pix</span>
          </Text>

          <Heading style={heading}>
            We&apos;re sorry to see you go
          </Heading>
          <Text style={body}>Hi {name},</Text>
          <Text style={body}>
            Your SammaPix Pro subscription has been cancelled. We&apos;re sorry
            it wasn&apos;t the right fit.
          </Text>

          <Section style={highlight}>
            <Text style={highlightText}>
              <strong>Good news:</strong> You&apos;ll keep full Pro access until
              the end of your current billing period. Nothing changes until then.
            </Text>
          </Section>

          <Text style={body}>
            After that, your account will switch back to the free plan. You can
            still compress, convert, and resize images without limits- you&apos;ll
            just have fewer AI renames per day and smaller batch sizes.
          </Text>

          <Text style={body}>
            We&apos;d love to know what we could have done better. Your feedback
            helps us improve SammaPix for everyone.
          </Text>

          <Section style={{ margin: "24px 0" }}>
            <Button
              style={button}
              href="mailto:hello@sammapix.com?subject=Pro%20cancellation%20feedback"
            >
              Tell us what we could improve →
            </Button>
          </Section>

          <Text style={subtle}>
            Changed your mind? You can resubscribe anytime from the{" "}
            <Link href={`${BASE_URL}/pricing`} style={{ color: "#6366F1" }}>
              pricing page
            </Link>
            .
          </Text>

          <Hr style={hr} />

          <Text style={body}>
            Thanks for giving Pro a try. We hope to have you back.
          </Text>
          <Text style={{ ...body, margin: "0" }}>- Luca, founder</Text>

          <Hr style={hr} />
          <Text style={footer}>
            You&apos;re receiving this because you had a SammaPix Pro
            subscription. {"\n"}
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

export default ProCancelEmail;

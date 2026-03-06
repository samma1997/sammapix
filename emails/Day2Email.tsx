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
const codeBlock = {
  backgroundColor: "#f5f5f5",
  border: "1px solid #e5e5e5",
  borderRadius: "6px",
  padding: "14px 16px",
  margin: "16px 0",
};
const codeLine = {
  fontFamily: "monospace",
  fontSize: "13px",
  color: "#525252",
  margin: "0 0 6px",
};
const codeLineSuccess = {
  fontFamily: "monospace",
  fontSize: "13px",
  color: "#16A34A",
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

interface Day2EmailProps {
  name: string;
}

export function Day2Email({ name }: Day2EmailProps) {
  return (
    <Html lang="en">
      <Head />
      <Preview>
        Convert to WebP and make your images 30% lighter — instantly
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <Text style={logo}>
            Samma<span style={logoAccent}>Pix</span>
          </Text>

          <Text style={label}>Quick tip from SammaPix</Text>
          <Heading style={heading}>
            Switch to WebP. Your users will thank you.
          </Heading>

          <Text style={body}>Hi {name},</Text>
          <Text style={body}>
            WebP images are 25–34% lighter than JPEG at equivalent visual
            quality. Every modern browser supports WebP as of 2024 — Chrome,
            Safari, Firefox, Edge. There&apos;s no reason to still serve JPEGs
            to your visitors.
          </Text>
          <Text style={body}>
            Google PageSpeed Insights flags JPEG and PNG as a core optimization
            opportunity. Switching to WebP is one of the fastest ways to improve
            your Core Web Vitals score — which directly affects your search
            ranking.
          </Text>

          <Section style={codeBlock}>
            <Text style={codeLine}>Before: photo.jpg — 2.4 MB</Text>
            <Text style={codeLineSuccess}>After:  photo.webp — 1.6 MB  (−33%)</Text>
          </Section>

          <Section style={highlight}>
            <Text style={highlightText}>
              How to do it in SammaPix: Drop your images → select{" "}
              <strong>WebP</strong> in the format dropdown → download.
              That&apos;s it.
            </Text>
          </Section>

          <Section style={{ margin: "24px 0" }}>
            <Button style={button} href={BASE_URL}>
              Try WebP Conversion →
            </Button>
          </Section>

          <Text style={subtle}>
            Tomorrow&apos;s tip: how AI can rename your images for better SEO.
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

export default Day2Email;

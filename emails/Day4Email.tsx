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
  color: "#DC2626",
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

interface Day4EmailProps {
  name: string;
}

export function Day4Email({ name }: Day4EmailProps) {
  return (
    <Html lang="en">
      <Head />
      <Preview>
        Your images are hurting your SEO (and how to fix it in seconds)
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <Text style={logo}>
            Samma<span style={logoAccent}>Pix</span>
          </Text>

          <Heading style={heading}>
            How to rank higher on Google with better image names
          </Heading>

          <Text style={body}>Hi {name},</Text>
          <Text style={body}>
            Did you know Google reads your image filenames when it crawls your
            site?
          </Text>
          <Text style={body}>
            A filename like{" "}
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
              IMG_4829.jpg
            </span>{" "}
            tells Google absolutely nothing. But a filename like{" "}
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
              golden-retriever-puppy-park-sunset.webp
            </span>{" "}
            gives Google a clear semantic signal- which affects both Google
            Image Search rankings and the overall topic relevance of your page.
          </Text>

          <Section style={codeBlock}>
            <Text style={codeLine}>Before: DSC_1042.jpg</Text>
            <Text style={codeLineSuccess}>
              After:  sunset-amalfi-coast-italy-summer.webp
            </Text>
          </Section>

          <Text style={body}>
            SammaPix does this automatically. Upload an image, click{" "}
            <strong>AI Rename</strong>, and Gemini AI analyzes the image and
            generates an SEO-optimized filename plus alt text. In seconds.
          </Text>

          <Section style={highlight}>
            <Text style={highlightText}>
              The alt text SammaPix generates is also ready to paste directly
              into your CMS- no editing needed.
            </Text>
          </Section>

          <Section style={{ margin: "24px 0" }}>
            <Button style={button} href={BASE_URL}>
              Try AI Rename →
            </Button>
          </Section>

          <Text style={subtle}>
            You have 5 free AI renames per day. No credit card needed.
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

export default Day4Email;

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

export type MilestoneType = "100_images" | "1000_images" | "first_pro_month";

const MILESTONES: Record<
  MilestoneType,
  {
    subject: string;
    preview: string;
    title: string;
    message: string;
    stat: string;
    suggestion: string;
    ctaLabel: string;
    ctaHref: string;
  }
> = {
  "100_images": {
    subject: "You just optimized your 100th image!",
    preview: "100 images optimized- here's a fun stat",
    title: "100 images. Not bad at all.",
    message:
      "You've optimized 100 images with SammaPix. That's roughly 50 MB of bandwidth you've saved for your visitors- every single time they load your pages.",
    stat: "If each of those pages gets 1,000 views/month, that's 50 GB of bandwidth saved per month. Your hosting bill thanks you.",
    suggestion:
      "Haven't tried AI Rename yet? It generates SEO-friendly filenames from your images automatically. Great for blog posts and product pages.",
    ctaLabel: "Try AI Rename →",
    ctaHref: `${BASE_URL}/ai-rename`,
  },
  "1000_images": {
    subject: "1,000 images optimized. You're a power user now.",
    preview: "1,000 images- you're officially a power user",
    title: "1,000 images. You&apos;re a power user.",
    message:
      "You've hit a major milestone: 1,000 images optimized through SammaPix. That's a serious amount of web performance improvement.",
    stat: "At an average 40% compression ratio, you've saved approximately 400 MB of unnecessary file weight from your websites. That directly translates to faster load times and better Core Web Vitals.",
    suggestion:
      "If you're processing this many images, batch mode with ZIP download will save you a lot of time. Drop up to 500 files at once.",
    ctaLabel: "Open Batch Mode →",
    ctaHref: `${BASE_URL}/bulk`,
  },
  first_pro_month: {
    subject: "Your first month on Pro- here's what you've done",
    preview: "One month on Pro- quick recap",
    title: "One month on Pro. Here&apos;s your recap.",
    message:
      "It's been one month since you upgraded to SammaPix Pro. Thanks for sticking with us.",
    stat: "Pro users process 8x more images on average than free users. You're getting serious value from your subscription.",
    suggestion:
      "Did you know you can use SammaPix via API? Automate your image pipeline with 10,000 requests per month included in your Pro plan.",
    ctaLabel: "Explore the API →",
    ctaHref: `${BASE_URL}/api`,
  },
};

interface MilestoneEmailProps {
  name: string;
  milestoneType: MilestoneType;
}

export function MilestoneEmail({ name, milestoneType }: MilestoneEmailProps) {
  const m = MILESTONES[milestoneType];

  return (
    <Html lang="en">
      <Head />
      <Preview>{m.preview}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Text style={logo}>
            Samma<span style={logoAccent}>Pix</span>
          </Text>

          <Heading style={heading}>{m.title}</Heading>
          <Text style={body}>Hi {name},</Text>
          <Text style={body}>{m.message}</Text>

          <Section style={highlight}>
            <Text style={highlightText}>{m.stat}</Text>
          </Section>

          <Text style={body}>{m.suggestion}</Text>

          <Section style={{ margin: "24px 0" }}>
            <Button style={button} href={m.ctaHref}>
              {m.ctaLabel}
            </Button>
          </Section>

          <Text style={subtle}>Keep going- every image counts.</Text>

          <Hr style={hr} />

          <Text style={{ ...body, margin: "0" }}>- Luca, founder</Text>

          <Hr style={hr} />
          <Text style={footer}>
            You&apos;re receiving this because you use SammaPix. {"\n"}
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

/** Helper to get the subject line for a given milestone type */
export function getMilestoneSubject(milestoneType: MilestoneType): string {
  return MILESTONES[milestoneType].subject;
}

export default MilestoneEmail;

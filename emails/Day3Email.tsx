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
  fontSize: "14px",
  lineHeight: "1.6",
  color: "#525252",
  margin: "0 0 6px",
};
const foundingCard = {
  backgroundColor: "#FFF7ED",
  border: "1px solid #FED7AA",
  borderRadius: "8px",
  padding: "20px",
  margin: "20px 0",
};
const foundingBadge = {
  display: "inline-block",
  backgroundColor: "#F97316",
  color: "#ffffff",
  fontSize: "11px",
  fontWeight: "700" as const,
  padding: "3px 8px",
  borderRadius: "999px",
  letterSpacing: "0.04em",
  textTransform: "uppercase" as const,
  margin: "0 0 10px",
};
const priceLine = {
  fontSize: "28px",
  fontWeight: "700" as const,
  color: "#7C2D12",
  letterSpacing: "-0.02em",
  margin: "0 0 4px",
};
const priceStrike = {
  fontSize: "16px",
  color: "#A3A3A3",
  textDecoration: "line-through" as const,
  margin: "0 8px 0 0",
};
const foundingButton = {
  backgroundColor: "#F97316",
  color: "#ffffff",
  padding: "12px 24px",
  borderRadius: "6px",
  fontSize: "14px",
  fontWeight: "600" as const,
  textDecoration: "none",
  display: "inline-block",
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

interface FoundingProps {
  active: boolean;
  spotsLeft: number;
  totalSpots: number;
  percentOff: number;
  monthlyPriceUsd: number;
}

interface Day3EmailProps {
  name: string;
  founding?: FoundingProps;
}

export function Day3Email({ name, founding }: Day3EmailProps) {
  const showFounding = founding?.active && founding.spotsLeft > 0;
  const previewText = showFounding
    ? `Lock $${founding!.monthlyPriceUsd}/mo forever — ${founding!.spotsLeft} Founding spots left`
    : "Unlock all 35 tools for less than a coffee";

  return (
    <Html lang="en">
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Text style={logo}>
            Samma<span style={logoAccent}>Pix</span>
          </Text>

          <Heading style={heading}>
            You&apos;ve unlocked 5 tools. There are 30 more.
          </Heading>
          <Text style={body}>Hi {name},</Text>
          <Text style={body}>
            You signed up 3 days ago. Free plan gets you the basics — but the
            tools that actually save hours (or sell premium services) are
            locked behind Pro:
          </Text>

          <Section>
            <Text style={listItem}>
              🔓 <strong>Unlimited AI Rename</strong> — instead of 5/day
            </Text>
            <Text style={listItem}>
              🔓 <strong>Upscale 4K</strong> — turn small photos into print-ready
            </Text>
            <Text style={listItem}>
              🔓 <strong>Remove Background</strong> — no watermarks, unlimited
            </Text>
            <Text style={listItem}>
              🔓 <strong>Batch Resize 100+ files</strong> at once
            </Text>
            <Text style={listItem}>
              🔓 <strong>Photo Cull</strong> — AI picks your best shots
            </Text>
            <Text style={listItem}>
              🔓 <strong>FilmLab + 25 more tools</strong> ({founding ? founding.totalSpots : "35"} total)
            </Text>
          </Section>

          {showFounding ? (
            <Section style={foundingCard}>
              <Text style={foundingBadge}>
                Founding offer · only {founding!.spotsLeft} spots left
              </Text>
              <Heading style={{ ...heading, color: "#7C2D12", margin: "0 0 10px" }}>
                Lock the price for life
              </Heading>
              <Text style={{ ...body, color: "#7C2D12", margin: "0 0 12px" }}>
                <span style={priceStrike}>$9</span>
                <span style={priceLine}>
                  ${founding!.monthlyPriceUsd}
                </span>
                <span style={{ fontSize: "15px", color: "#7C2D12" }}>
                  /month forever
                </span>
              </Text>
              <Text style={{ ...body, color: "#7C2D12", margin: "0 0 16px" }}>
                The first {founding!.totalSpots} users lock {founding!.percentOff}%
                off — for life. Even when we add new tools, your price stays
                the same. After spot {founding!.totalSpots}, the deal closes
                forever.
              </Text>
              <Button
                style={foundingButton}
                href={`${BASE_URL}/dashboard/upgrade`}
              >
                Claim my Founding spot →
              </Button>
              <Text style={subtle}>
                7-day free trial · cancel anytime · no questions asked
              </Text>
            </Section>
          ) : (
            <Section style={{ margin: "24px 0" }}>
              <Button
                style={{
                  backgroundColor: "#6366F1",
                  color: "#ffffff",
                  padding: "12px 24px",
                  borderRadius: "6px",
                  fontSize: "14px",
                  fontWeight: "500" as const,
                  textDecoration: "none",
                  display: "inline-block",
                }}
                href={`${BASE_URL}/dashboard/upgrade`}
              >
                See Pro plan →
              </Button>
              <Text style={subtle}>
                7-day free trial · cancel anytime
              </Text>
            </Section>
          )}

          <Hr style={hr} />

          <Text style={body}>
            Not ready yet? Totally fine. The free plan still gives you
            compress, WebP, format converters and 5 AI renames/day.
          </Text>
          <Text style={{ ...body, margin: "0" }}> - Luca, founder</Text>

          <Hr style={hr} />
          <Text style={footer}>
            You&apos;re receiving this because you signed up for SammaPix.{" "}
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

export default Day3Email;

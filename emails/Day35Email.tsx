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
const toolCard = {
  backgroundColor: "#fafafa",
  border: "1px solid #e5e5e5",
  borderRadius: "6px",
  padding: "14px 16px",
  margin: "0 0 8px",
};
const toolName = {
  fontSize: "15px",
  fontWeight: "600" as const,
  color: "#171717",
  margin: "0 0 4px",
};
const toolDesc = {
  fontSize: "13px",
  lineHeight: "1.5",
  color: "#737373",
  margin: "0",
};
const signature = {
  fontSize: "15px",
  lineHeight: "1.6",
  color: "#525252",
  margin: "0 0 16px",
};
const footer = {
  fontSize: "12px",
  color: "#a3a3a3",
  lineHeight: "1.5",
  margin: "0",
};
const hr = { borderColor: "#e5e5e5", margin: "28px 0" };

interface Day35EmailProps {
  name: string;
}

export function Day35Email({ name }: Day35EmailProps) {
  return (
    <Html lang="en">
      <Head />
      <Preview>5 tools you probably haven&apos;t tried yet</Preview>
      <Body style={main}>
        <Container style={container}>
          <Text style={logo}>
            Samma<span style={logoAccent}>Pix</span>
          </Text>

          <Heading style={heading}>
            5 tools you probably haven&apos;t tried yet
          </Heading>

          <Text style={body}>Hi {name},</Text>
          <Text style={body}>
            Most people use SammaPix for compress and convert. But there are
            20 tools in total- and some of the lesser-known ones are genuinely
            useful. Here are 5 worth trying:
          </Text>

          <Section>
            <Section style={toolCard}>
              <Text style={toolName}>
                <Link href={`${BASE_URL}/find-duplicates`} style={{ color: "#171717", textDecoration: "none" }}>
                  1. Find Duplicates
                </Link>
              </Text>
              <Text style={toolDesc}>
                Drop a folder and instantly find identical or near-identical
                images. Great for cleaning up your photo library.
              </Text>
            </Section>

            <Section style={toolCard}>
              <Text style={toolName}>
                <Link href={`${BASE_URL}/sort-by-location`} style={{ color: "#171717", textDecoration: "none" }}>
                  2. Sort by Location
                </Link>
              </Text>
              <Text style={toolDesc}>
                Automatically organize photos into folders by GPS location
                embedded in the EXIF data.
              </Text>
            </Section>

            <Section style={toolCard}>
              <Text style={toolName}>
                <Link href={`${BASE_URL}/photo-map`} style={{ color: "#171717", textDecoration: "none" }}>
                  3. Photo Map
                </Link>
              </Text>
              <Text style={toolDesc}>
                See all your geotagged photos plotted on an interactive map.
                Works entirely in the browser.
              </Text>
            </Section>

            <Section style={toolCard}>
              <Text style={toolName}>
                <Link href={`${BASE_URL}/film-filters`} style={{ color: "#171717", textDecoration: "none" }}>
                  4. Film Filters
                </Link>
              </Text>
              <Text style={toolDesc}>
                Apply classic film stock looks (Kodak Portra, Fuji Velvia,
                Ilford HP5) to your photos with one click.
              </Text>
            </Section>

            <Section style={toolCard}>
              <Text style={toolName}>
                <Link href={`${BASE_URL}/ai-photo-sort`} style={{ color: "#171717", textDecoration: "none" }}>
                  5. AI Photo Sort
                </Link>
              </Text>
              <Text style={toolDesc}>
                AI analyzes your photos and sorts them into smart categories-
                people, landscapes, food, architecture, and more.
              </Text>
            </Section>
          </Section>

          <Section style={{ margin: "24px 0" }}>
            <Button style={button} href={BASE_URL}>
              Explore All 20 Tools →
            </Button>
          </Section>

          <Text style={signature}> - Luca</Text>

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

export default Day35Email;

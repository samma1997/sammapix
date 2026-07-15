import { Metadata } from "next";
import { Fraunces } from "next/font/google";
import ChromeLanding from "./ChromeLanding";

const display = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SammaPix for Chrome — Image Tools in Your Browser",
  description:
    "Compress, convert, crop and clean images, extract RAR/7z/ZIP archives, and grab every image from any page — right in your browser side panel. 100% private, no uploads.",
  alternates: { canonical: "https://www.sammapix.com/chrome" },
  openGraph: {
    title: "SammaPix for Chrome — Image Tools in Your Browser",
    description:
      "Compress, convert, crop and clean images, extract archives, and grab every image from any page. 100% in your browser.",
    url: "https://www.sammapix.com/chrome",
    type: "website",
  },
};

export default function ChromePage() {
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "SammaPix — Image Tools",
    applicationCategory: "BrowserApplication",
    operatingSystem: "Chrome",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description:
      "Compress, convert, crop and clean images, extract archives, and grab every image from any page — in your browser side panel.",
    url: "https://www.sammapix.com/chrome",
  };

  return (
    <div className={display.variable}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <ChromeLanding />
    </div>
  );
}

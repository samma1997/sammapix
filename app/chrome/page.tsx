import { Metadata } from "next";
import ChromeLanding from "./ChromeLanding";

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
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <ChromeLanding />
    </>
  );
}

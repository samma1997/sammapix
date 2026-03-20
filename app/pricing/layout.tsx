import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing - SammaPix Free vs Pro Plans",
  description:
    "SammaPix is free forever for core tools. Pro plan at $9/month: unlimited AI rename, 100 files at once, ZIP download, no ads.",
  keywords: [
    "image compressor pricing",
    "free plan",
    "pro plan",
    "membership",
    "subscription",
  ],
  alternates: {
    canonical: "https://sammapix.com/pricing",
  },
  openGraph: {
    title: "SammaPix Pricing - Free vs Pro Plans",
    description:
      "Free forever for core tools. Pro plan at $9/month: unlimited AI rename, 100 files, ZIP download, no ads. Cancel anytime.",
    type: "website",
    url: "https://sammapix.com/pricing",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SammaPix Pricing Plans",
      },
    ],
  },
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return children;
}

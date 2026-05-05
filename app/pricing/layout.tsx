import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SammaPix Pricing — Free Forever, Pro $9/mo (No Card to Try)",
  description:
    "SammaPix is free forever for the core image tools — no signup, no credit card needed. Pro from $9/month adds 500 files per batch, 200 AI ops/day, ZIP download. 7-day free trial, cancel anytime.",
  keywords: [
    "sammapix pricing",
    "sammapix free",
    "sammapix pro",
    "image compressor free",
    "free image tools no signup",
    "image editor pricing",
  ],
  alternates: {
    canonical: "https://sammapix.com/pricing",
  },
  openGraph: {
    title: "SammaPix Pricing — Free Forever, Pro $9/mo",
    description:
      "Free forever for core tools — no signup, no card. Pro from $9/mo: 500 files/batch, 200 AI ops/day, ZIP download. 7-day free trial.",
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

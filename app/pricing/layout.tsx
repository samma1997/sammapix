import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing — SammaPix",
  description: "SammaPix is free forever. Upgrade to Pro for unlimited AI rename, 100 files at once, ZIP download, and no ads. $7/month.",
  openGraph: {
    title: "SammaPix Pricing — Free vs Pro",
    description: "Free forever for core tools. Pro plan at $7/month unlocks unlimited AI rename, bulk processing, and removes all ads.",
    type: "website",
  },
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return children;
}

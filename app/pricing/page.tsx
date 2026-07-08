import type { Metadata } from "next";
import { APP_URL } from "@/lib/constants";
import PricingView from "@/components/pricing/PricingView";

const URL = `${APP_URL}/pricing`;

export const metadata: Metadata = {
  title: "SammaPix Pricing — Free Forever, Pro $9/mo (No Card to Try)",
  description:
    "All photo tools free in your browser, no upload. Go Pro ($9/mo) for 500-file batches, ZIP download and 200 AI credits a day. No card to try.",
  alternates: {
    canonical: URL,
    languages: { en: URL, it: `${APP_URL}/it/prezzi`, "x-default": URL },
  },
  openGraph: {
    title: "SammaPix Pricing — Free Forever, Pro $9/mo",
    description: "Free photo tools in your browser. Pro for more power. No card to try.",
    url: URL,
    type: "website",
    locale: "en_US",
  },
};

export default function PricingPage() {
  return <PricingView />;
}

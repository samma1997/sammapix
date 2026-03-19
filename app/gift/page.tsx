import type { Metadata } from "next";
import { APP_NAME } from "@/lib/constants";
import GiftClient from "@/components/gift/GiftClient";

export const metadata: Metadata = {
  title: "Gift SammaPix Pro - Give the Gift of Perfect Images",
  description:
    "Gift a SammaPix Pro subscription. Choose a plan, personalize your gift card, and send it to anyone.",
  alternates: {
    canonical: "https://sammapix.com/gift",
  },
  openGraph: {
    title: `Gift ${APP_NAME} Pro - Give the Gift of Perfect Images`,
    description:
      "Gift a SammaPix Pro subscription. Choose a plan, personalize your gift card, and send it to anyone.",
    type: "website",
    url: "https://sammapix.com/gift",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Gift SammaPix Pro",
      },
    ],
  },
};

export default function GiftPage() {
  return <GiftClient />;
}

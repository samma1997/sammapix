import type { Metadata } from "next";
import RedeemClient from "@/components/gift/RedeemClient";

export const metadata: Metadata = {
  title: "Redeem Your Gift - SammaPix Pro",
  description: "Redeem your SammaPix Pro gift subscription.",
  openGraph: {
    title: "Redeem Your Gift - SammaPix Pro",
    description: "Redeem your SammaPix Pro gift subscription.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "SammaPix" }],
  },
};

export default async function RedeemPage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  return <RedeemClient code={code} />;
}

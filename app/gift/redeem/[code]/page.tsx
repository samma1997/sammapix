import type { Metadata } from "next";
import RedeemClient from "@/components/gift/RedeemClient";

export const metadata: Metadata = {
  title: "Redeem Your Gift - SammaPix Pro",
  description: "Redeem your SammaPix Pro gift subscription.",
};

export default function RedeemPage({ params }: { params: { code: string } }) {
  return <RedeemClient code={params.code} />;
}

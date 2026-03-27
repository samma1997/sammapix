import type { Metadata } from "next";
import GiftClient from "@/components/gift/GiftClient";

export const metadata: Metadata = {
  title: "Gift Pro",
  description: "Gift a SammaPix Pro subscription to a friend or colleague.",
  robots: { index: false, follow: false },
};

export default function DashboardGiftPage() {
  return <GiftClient />;
}

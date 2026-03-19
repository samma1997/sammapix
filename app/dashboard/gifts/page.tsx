import DashboardGifts from "@/components/dashboard/DashboardGifts";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gifts | SammaPix",
  description: "Manage your sent and received SammaPix Pro gift subscriptions.",
  robots: { index: false, follow: false },
};

export default function GiftsPage() {
  return <DashboardGifts />;
}

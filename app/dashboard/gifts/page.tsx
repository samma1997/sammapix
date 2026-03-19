import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth/options";
import DashboardGifts from "@/components/dashboard/DashboardGifts";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gifts | SammaPix",
  description: "Manage your sent and received SammaPix Pro gift subscriptions.",
  robots: { index: false, follow: false },
};

export default async function GiftsPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/dashboard/gifts");
  }

  return <DashboardGifts />;
}

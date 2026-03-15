import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth/options";
import DashboardCredits from "@/components/dashboard/DashboardCredits";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Credits | SammaPix",
  description: "Buy AI credits for rename, alt text, and workflow operations.",
  robots: { index: false, follow: false },
};

interface PageProps {
  searchParams: Promise<{ purchased?: string; canceled?: string }>;
}

export default async function CreditsPage({ searchParams }: PageProps) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/dashboard/credits");
  }

  const params = await searchParams;
  const purchased = params.purchased ? Number(params.purchased) : null;
  const canceled = params.canceled === "true";

  return <DashboardCredits purchased={purchased} canceled={canceled} />;
}

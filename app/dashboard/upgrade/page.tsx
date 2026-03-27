import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth/options";
import DashboardUpgrade from "@/components/dashboard/DashboardUpgrade";

export const metadata = {
  title: "Upgrade to Pro",
  description: "Unlock the full AI photo workflow with SammaPix Pro.",
  robots: { index: false, follow: false },
};

export default async function UpgradePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/dashboard/upgrade");
  }

  const user = session.user as {
    plan?: string;
    email?: string | null;
  };

  // If already Pro, redirect to dashboard
  if (user.plan === "pro") {
    redirect("/dashboard");
  }

  return <DashboardUpgrade userEmail={user.email ?? null} />;
}

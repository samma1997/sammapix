import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth/options";
import DashboardSettings from "@/components/dashboard/DashboardSettings";

export const metadata = {
  title: "Settings",
  description: "Manage your profile, subscription and preferences.",
  robots: { index: false, follow: false },
};

export default async function SettingsPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/dashboard/settings");
  }

  const user = session.user as {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    plan?: string;
  };

  return (
    <DashboardSettings
      userName={user.name ?? null}
      userEmail={user.email ?? null}
      userImage={user.image ?? null}
      userPlan={user.plan ?? "free"}
    />
  );
}

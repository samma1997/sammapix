import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth/options";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardSettings from "@/components/dashboard/DashboardSettings";

export const metadata = {
  title: "Settings | SammaPix",
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
    <div className="flex h-screen overflow-hidden bg-white dark:bg-[#191919]">
      <DashboardSidebar
        userName={user.name ?? null}
        userEmail={user.email ?? null}
        userImage={user.image ?? null}
        userPlan={user.plan ?? "free"}
      />
      <main className="flex-1 overflow-y-auto">
        <DashboardSettings
          userName={user.name ?? null}
          userEmail={user.email ?? null}
          userImage={user.image ?? null}
          userPlan={user.plan ?? "free"}
        />
      </main>
    </div>
  );
}

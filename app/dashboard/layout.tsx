import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth/options";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | SammaPix",
  description: "Your personalized SammaPix dashboard",
  robots: { index: false, follow: false },
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/dashboard");
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
        {children}
      </main>
    </div>
  );
}

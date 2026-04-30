import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";
import { ADMIN_EMAILS } from "@/lib/constants";
import AdminShell from "./components/AdminShell";
import "./admin.css";

export const metadata = {
  title: "Admin · SammaPix",
  robots: { index: false, follow: false },
};

export default async function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let email: string | null | undefined = null;
  try {
    const session = await getServerSession(authOptions);
    email = session?.user?.email;
  } catch (err) {
    console.error("[admin/layout] getServerSession failed:", err);
  }

  // Not logged in → send to signin with callback to /admin
  if (!email) {
    redirect("/api/auth/signin?callbackUrl=/admin");
  }

  // Logged in but not in ADMIN_EMAILS → kick to user dashboard (avoid signin loop)
  if (!ADMIN_EMAILS.includes(email)) {
    redirect("/dashboard");
  }

  return <AdminShell>{children}</AdminShell>;
}

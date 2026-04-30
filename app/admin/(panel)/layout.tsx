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
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;
  if (!email || !ADMIN_EMAILS.includes(email)) {
    redirect("/api/auth/signin?callbackUrl=/admin");
  }
  return <AdminShell>{children}</AdminShell>;
}

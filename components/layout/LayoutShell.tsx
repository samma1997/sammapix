"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SignupPrompt from "@/components/ui/SignupPrompt";
import SmartTrialPrompt from "@/components/ui/SmartTrialPrompt";
import PWAInstallPrompt from "@/components/ui/PWAInstallPrompt";

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/dashboard");

  if (isDashboard) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <SignupPrompt />
      <SmartTrialPrompt />
      <PWAInstallPrompt />
    </>
  );
}

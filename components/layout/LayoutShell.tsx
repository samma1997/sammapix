"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SignupPrompt from "@/components/ui/SignupPrompt";
import SmartTrialPrompt from "@/components/ui/SmartTrialPrompt";
import PWAInstallPrompt from "@/components/ui/PWAInstallPrompt";
import ReferralHeroBanner from "@/components/referral/ReferralHeroBanner";
import ReferralWelcomeModal from "@/components/referral/ReferralWelcomeModal";

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/dashboard");
  const isGrowthLogin = pathname.startsWith("/growth-login");
  const isAdminPanel =
    pathname === "/admin" ||
    pathname.startsWith("/admin/seo") ||
    pathname.startsWith("/admin/directory");

  // On the growth subdomain, the root layout renders bare <html><body>{children}</body></html>
  // without mounting LayoutShell at all. The checks below are a safety net for edge cases
  // where the path starts with /dashboard, /growth-login, or /admin on the main domain.
  if (isDashboard || isGrowthLogin || isAdminPanel) {
    return <>{children}</>;
  }

  return (
    <>
      <ReferralHeroBanner />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <SignupPrompt />
      <SmartTrialPrompt />
      <PWAInstallPrompt />
      <ReferralWelcomeModal />
    </>
  );
}

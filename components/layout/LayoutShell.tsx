"use client";

import { useEffect } from "react";
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
  const locale = pathname.startsWith("/it") ? "it" : "en";

  // Keep <html lang> in sync with the locale (root layout renders lang="en" by
  // default; on /it pages we correct it so screen readers and search engines
  // see Italian). Additive: English pages stay "en".
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = locale;
    }
  }, [locale]);

  const isDashboard = pathname.startsWith("/dashboard");
  const isGrowthLogin = pathname.startsWith("/growth-login");
  const isExtWelcome = pathname === "/chrome/welcome"; // focused onboarding, no site chrome
  const isAdminPanel =
    pathname === "/admin" ||
    pathname.startsWith("/admin/seo") ||
    pathname.startsWith("/admin/directory");

  // On the growth subdomain, the root layout renders bare <html><body>{children}</body></html>
  // without mounting LayoutShell at all. The checks below are a safety net for edge cases
  // where the path starts with /dashboard, /growth-login, or /admin on the main domain.
  if (isDashboard || isGrowthLogin || isAdminPanel || isExtWelcome) {
    return <>{children}</>;
  }

  return (
    <>
      <ReferralHeroBanner />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer locale={locale} />
      <SignupPrompt />
      <SmartTrialPrompt />
      <PWAInstallPrompt />
      <ReferralWelcomeModal />
    </>
  );
}

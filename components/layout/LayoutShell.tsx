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

  // Growth subdomain: never show SammaPix header/footer
  const isGrowthSubdomain = typeof window !== "undefined" && window.location.hostname.startsWith("growth.");

  if (isDashboard || isGrowthSubdomain) {
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

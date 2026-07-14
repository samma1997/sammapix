"use client";

/**
 * The missing funnel rung, as a reusable bar.
 *
 * Logged-out visitors on high-traffic free tools see a 1-click Google sign-in
 * prompt. Signing in (a) removes ads where they exist, (b) syncs their 24h pass
 * across every tool, and — crucially — (c) captures their email into the Resend
 * nurture audience (via the signIn callback in lib/auth/options.ts), so the
 * existing drip can warm anonymous traffic toward a trial.
 *
 * Signed-in users get nothing rendered here (that IS the perk: no ads).
 *
 * `showAd` only when the surface already shows the SiteGround banner
 * (ToolInterface tools). On ad-free tools (unrar, resize, crop) we do NOT add
 * new ads — we just show the honest sign-in prompt.
 */

import { useSession, signIn } from "next-auth/react";
import { usePathname } from "next/navigation";
import { ArrowRight } from "lucide-react";
import SiteGroundBanner from "@/components/ads/SiteGroundBanner";
import { trackEvent } from "@/lib/analytics";

export default function FreeSignupAdBar({
  showAd = false,
  tool = "",
}: {
  showAd?: boolean;
  tool?: string;
}) {
  const { data: session } = useSession();
  const pathname = usePathname() || "/";
  const isIt = pathname === "/it" || pathname.startsWith("/it/");

  // Signed in → no ads, no prompt. That is the reward for signing up.
  if (session) return null;

  const label = isIt
    ? showAd
      ? "Accedi gratis con Google — togli le pubblicità"
      : "Accedi gratis con Google — niente pubblicità, i tuoi pass su tutti i tool"
    : showAd
      ? "Sign in free with Google — remove ads"
      : "Sign in free with Google — no ads, passes synced across every tool";

  return (
    <div className="px-4 sm:px-6 pb-6">
      <div className="max-w-3xl mx-auto space-y-2.5">
        {showAd && <SiteGroundBanner variant="web-hosting" />}
        <button
          onClick={() => {
            trackEvent("free_signup_click", {
              source: showAd ? "remove_ads" : "signin_bar",
              tool,
            });
            signIn("google", { callbackUrl: pathname });
          }}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-[#A3A3A3] bg-white dark:bg-[#1E1E1E] border border-gray-200 dark:border-[#2A2A2A] rounded-md hover:border-gray-300 dark:hover:border-[#3A3A3A] hover:text-gray-900 dark:hover:text-[#E5E5E5] transition-colors"
        >
          {label}
          <ArrowRight className="h-4 w-4 shrink-0" strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );
}

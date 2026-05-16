"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, X } from "lucide-react";
import { useFoundingStatus } from "@/lib/hooks/useFoundingStatus";

// Sticky-on-top banner shown to free users when the Founding coupon is still
// active. The whole point: never let an opportunity to upgrade go unnoticed —
// previously the only Founding mention lived on /dashboard/upgrade, which most
// users never visited until they clicked an external CTA.
const DISMISS_KEY = "sp-founding-banner-dismissed-at";
const DISMISS_COOLDOWN_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

interface FoundingBannerProps {
  isPro: boolean;
}

export default function FoundingBanner({ isPro }: FoundingBannerProps) {
  const founding = useFoundingStatus();
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    if (isPro) return;
    try {
      const last = Number(localStorage.getItem(DISMISS_KEY) ?? "0");
      setDismissed(Date.now() - last < DISMISS_COOLDOWN_MS);
    } catch {
      setDismissed(false);
    }
  }, [isPro]);

  if (isPro) return null;
  if (dismissed) return null;
  if (!founding?.active) return null;
  if (founding.spotsLeft <= 0) return null;

  const percentOff = founding.percentOff || 0;
  const monthlyPrice = percentOff > 0
    ? (9 * (1 - percentOff / 100)).toFixed(percentOff % 2 === 0 ? 0 : 2)
    : "9";

  const handleDismiss = () => {
    try {
      localStorage.setItem(DISMISS_KEY, String(Date.now()));
    } catch {
      /* private mode quota — ignore */
    }
    setDismissed(true);
  };

  return (
    <div className="mb-4 md:mb-6 rounded-xl border border-[#FED7AA] dark:border-[#7C2D12] bg-gradient-to-r from-[#FFF7ED] to-[#FFEDD5] dark:from-[#1F1410] dark:to-[#2A1A0F] overflow-hidden">
      <div className="flex items-stretch gap-3 p-3.5 md:p-4">
        <div className="hidden sm:flex flex-shrink-0 h-10 w-10 rounded-full bg-[#F97316] items-center justify-center text-white">
          <Sparkles className="h-5 w-5" />
        </div>
        <div className="flex-1 min-w-0 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5 flex-wrap">
              <span className="text-[10px] font-bold uppercase tracking-wider text-white bg-[#F97316] px-1.5 py-0.5 rounded">
                Founding · {founding.spotsLeft} left
              </span>
              {percentOff > 0 ? (
                <span className="text-[11px] font-semibold text-[#7C2D12] dark:text-[#FED7AA]">
                  {percentOff}% off forever
                </span>
              ) : null}
            </div>
            <p className="text-sm font-semibold text-[#7C2D12] dark:text-[#FED7AA]">
              Lock ${monthlyPrice}/mo for life — all 35 tools, no price hikes
            </p>
            <p className="hidden sm:block text-xs text-[#9A3412] dark:text-[#FDBA74] mt-0.5">
              The first {founding.totalSpots} users keep this price forever. After spot {founding.totalSpots}, it&apos;s gone.
            </p>
          </div>
          <Link
            href="/dashboard/upgrade"
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-[#F97316] hover:bg-[#EA580C] text-white text-sm font-semibold transition-colors whitespace-nowrap"
          >
            Claim spot
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <button
          type="button"
          onClick={handleDismiss}
          aria-label="Dismiss founding banner"
          className="flex-shrink-0 -mr-1 -mt-1 p-1.5 self-start rounded-md text-[#9A3412] dark:text-[#FDBA74] hover:bg-[#FED7AA]/40 dark:hover:bg-[#7C2D12]/40 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

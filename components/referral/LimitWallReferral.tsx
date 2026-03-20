"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Gift, Copy, Check } from "lucide-react";

// ── Props ────────────────────────────────────────────────────────────────────

interface LimitWallReferralProps {
  userPlan: string;
  className?: string;
}

// ── Component ────────────────────────────────────────────────────────────────

/**
 * Small section to embed inside existing limit/upsell modals.
 * Shows a referral CTA for Free plan users as an alternative to upgrading.
 * "Or earn free AI credits by inviting a friend"
 */
export default function LimitWallReferral({ userPlan, className }: LimitWallReferralProps) {
  const [referralLink, setReferralLink] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (userPlan === "pro") return;

    async function fetchLink() {
      try {
        const res = await fetch("/api/referral/generate");
        if (res.ok) {
          const data = await res.json();
          setReferralLink(data.link);
        }
      } catch {
        // Silently fail
      }
    }
    fetchLink();
  }, [userPlan]);

  const handleCopy = useCallback(async () => {
    if (!referralLink) return;
    await navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [referralLink]);

  // Only show for free plan users
  if (userPlan === "pro" || !referralLink) return null;

  return (
    <div className={`border-t border-[#E5E5E5] dark:border-[#2A2A2A] pt-4 mt-4 ${className ?? ""}`}>
      <div className="flex items-start gap-3">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#8B5CF6]/10 dark:bg-[#8B5CF6]/20 shrink-0">
          <Gift className="h-4 w-4 text-[#8B5CF6]" strokeWidth={1.5} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] mb-0.5">
            Or earn free AI credits by inviting a friend
          </p>
          <p className="text-xs text-[#737373] dark:text-[#A3A3A3] mb-2.5">
            They get 50 credits, you get 25. No upgrade needed.
          </p>
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#8B5CF6]/10 hover:bg-[#8B5CF6]/15 dark:bg-[#8B5CF6]/15 dark:hover:bg-[#8B5CF6]/20 text-[#8B5CF6] text-xs font-medium rounded-lg transition-colors"
          >
            {copied ? (
              <Check className="h-3.5 w-3.5" strokeWidth={2} />
            ) : (
              <Copy className="h-3.5 w-3.5" strokeWidth={1.5} />
            )}
            {copied ? "Copied!" : "Copy referral link"}
          </button>
        </div>
      </div>
    </div>
  );
}

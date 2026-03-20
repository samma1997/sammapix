"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Copy, Check, X } from "lucide-react";

// ── Constants ────────────────────────────────────────────────────────────────

const LS_NUDGE_KEY = "referral_nudge_last_shown";
const LS_TOOL_USES_KEY = "sammapix_total_tool_uses";
const SHOW_ON_USES = [3, 7, 15];
const COOLDOWN_DAYS = 7;

// ── Props ────────────────────────────────────────────────────────────────────

interface PostToolReferralNudgeProps {
  /** Current total tool uses count */
  toolUseCount?: number;
}

// ── Component ────────────────────────────────────────────────────────────────

export default function PostToolReferralNudge({ toolUseCount }: PostToolReferralNudgeProps) {
  const [visible, setVisible] = useState(false);
  const [referralLink, setReferralLink] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const currentUses = toolUseCount ?? parseInt(localStorage.getItem(LS_TOOL_USES_KEY) ?? "0", 10);

    // Only show on specific tool use counts
    if (!SHOW_ON_USES.includes(currentUses)) return;

    // Check cooldown
    const lastShown = localStorage.getItem(LS_NUDGE_KEY);
    if (lastShown) {
      const daysSince = (Date.now() - parseInt(lastShown, 10)) / (1000 * 60 * 60 * 24);
      if (daysSince < COOLDOWN_DAYS) return;
    }

    // Fetch referral link
    async function fetchLink() {
      try {
        const res = await fetch("/api/referral/generate");
        if (res.ok) {
          const data = await res.json();
          setReferralLink(data.link);
          setVisible(true);
          localStorage.setItem(LS_NUDGE_KEY, Date.now().toString());
        }
      } catch {
        // Silently fail - don't show nudge
      }
    }
    fetchLink();
  }, [toolUseCount]);

  const handleCopy = useCallback(async () => {
    if (!referralLink) return;
    await navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [referralLink]);

  const handleDismiss = useCallback(() => {
    setVisible(false);
  }, []);

  if (!visible || !referralLink) return null;

  return (
    <div className="border-l-4 border-[#8B5CF6] bg-violet-50 dark:bg-[#8B5CF6]/10 rounded-r-xl p-4 mt-4 animate-in slide-in-from-bottom-2 duration-300">
      <div className="flex items-start gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] mb-1">
            Enjoying SammaPix? Share it with a friend
          </p>
          <p className="text-xs text-[#737373] dark:text-[#A3A3A3] mb-3">
            They get 50 free AI ops, you earn 25 bonus ops.
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#8B5CF6] hover:bg-[#7C3AED] text-white text-xs font-medium rounded-lg transition-colors"
            >
              {copied ? (
                <Check className="h-3.5 w-3.5" strokeWidth={2} />
              ) : (
                <Copy className="h-3.5 w-3.5" strokeWidth={1.5} />
              )}
              {copied ? "Copied!" : "Copy link"}
            </button>
          </div>
        </div>
        <button
          onClick={handleDismiss}
          className="shrink-0 p-1 rounded text-[#A3A3A3] hover:text-[#525252] dark:hover:text-[#E5E5E5] hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
          aria-label="Dismiss"
        >
          <X className="h-3.5 w-3.5" strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );
}

"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Gift, Users, ArrowRight, Copy, Check, Trophy, Zap } from "lucide-react";
import { APP_URL } from "@/lib/constants";

// ── Types ────────────────────────────────────────────────────────────────────

interface ReferralCardStats {
  totalReferrals: number;
  opsEarned: number;
  conversions: number;
}

interface ReferralLink {
  code: string;
  link: string;
}

// ── Props ────────────────────────────────────────────────────────────────────

interface DashboardReferralCardProps {
  userPlan: string;
}

// ── Main component ───────────────────────────────────────────────────────────

export default function DashboardReferralCard({ userPlan }: DashboardReferralCardProps) {
  const [stats, setStats] = useState<ReferralCardStats | null>(null);
  const [linkData, setLinkData] = useState<ReferralLink | null>(null);
  const [toolUses, setToolUses] = useState(0);
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Read tool uses from localStorage
    const uses = parseInt(localStorage.getItem("sammapix_total_tool_uses") ?? "0", 10);
    setToolUses(uses);

    // Fetch referral data
    async function fetchData() {
      try {
        const [statsRes, linkRes] = await Promise.all([
          fetch("/api/referral/stats"),
          fetch("/api/referral/generate"),
        ]);
        if (statsRes.ok) {
          const data = await statsRes.json();
          setStats({
            totalReferrals: data.totalReferrals ?? 0,
            opsEarned: data.opsEarned ?? 0,
            conversions: data.conversions ?? 0,
          });
        } else {
          setStats({ totalReferrals: 0, opsEarned: 0, conversions: 0 });
        }
        if (linkRes.ok) {
          setLinkData(await linkRes.json());
        }
      } catch {
        setStats({ totalReferrals: 0, opsEarned: 0, conversions: 0 });
      }
    }
    fetchData();
  }, []);

  const handleCopy = useCallback(async () => {
    if (!linkData) return;
    await navigator.clipboard.writeText(linkData.link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [linkData]);

  if (!mounted || !stats) return null;

  // State A: < 5 tool uses - don't render
  if (toolUses < 5) return null;

  const totalReferrals = stats.totalReferrals;

  // State D: 5+ referrals - compact achievement badge
  if (totalReferrals >= 5) {
    return (
      <Link
        href="/referral"
        className="flex items-center gap-3 px-4 py-3 border border-[#8B5CF6]/20 bg-[#8B5CF6]/5 dark:bg-[#8B5CF6]/10 rounded-xl hover:bg-[#8B5CF6]/10 dark:hover:bg-[#8B5CF6]/15 transition-colors"
      >
        <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-[#8B5CF6] text-white shrink-0">
          <Trophy className="h-4.5 w-4.5" strokeWidth={1.5} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5]">
            {totalReferrals} referrals
          </p>
          <p className="text-xs text-[#8B5CF6]">{stats.opsEarned} ops earned</p>
        </div>
        <ArrowRight className="h-4 w-4 text-[#8B5CF6] shrink-0" strokeWidth={1.5} />
      </Link>
    );
  }

  // State C: 1-4 referrals - progress card
  if (totalReferrals >= 1) {
    const nextMilestone = 5;
    const progress = (totalReferrals / nextMilestone) * 100;

    return (
      <div className="border border-[#E5E5E5] dark:border-[#333] rounded-xl p-4 bg-white dark:bg-[#191919]">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-[#8B5CF6]" strokeWidth={1.5} />
            <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5]">
              {totalReferrals} referral{totalReferrals !== 1 ? "s" : ""}
            </p>
          </div>
          <Link
            href="/referral"
            className="text-xs text-[#8B5CF6] hover:text-[#7C3AED] transition-colors"
          >
            View all
          </Link>
        </div>

        {/* Progress to next milestone */}
        <div className="mb-3">
          <div className="flex items-center justify-between text-xs text-[#A3A3A3] mb-1.5">
            <span>{totalReferrals}/{nextMilestone} for free Pro month</span>
            <span>{stats.opsEarned} ops earned</span>
          </div>
          <div className="w-full h-1.5 bg-[#F5F5F5] dark:bg-[#252525] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#8B5CF6] rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {linkData && (
          <button
            onClick={handleCopy}
            className="flex items-center justify-center gap-2 w-full px-3 py-2 text-xs font-medium text-[#8B5CF6] bg-[#8B5CF6]/5 hover:bg-[#8B5CF6]/10 dark:bg-[#8B5CF6]/10 dark:hover:bg-[#8B5CF6]/15 rounded-lg transition-colors"
          >
            {copied ? (
              <Check className="h-3.5 w-3.5" strokeWidth={2} />
            ) : (
              <Copy className="h-3.5 w-3.5" strokeWidth={1.5} />
            )}
            {copied ? "Link copied!" : "Copy referral link"}
          </button>
        )}
      </div>
    );
  }

  // State B: >= 5 uses, 0 referrals - full invite card
  return (
    <div className="border border-[#E5E5E5] dark:border-[#333] rounded-xl p-5 bg-white dark:bg-[#191919]">
      <div className="flex items-start gap-3 mb-4">
        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#8B5CF6]/10 dark:bg-[#8B5CF6]/20 shrink-0">
          <Gift className="h-5 w-5 text-[#8B5CF6]" strokeWidth={1.5} />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-0.5">
            Invite friends, earn AI ops
          </h3>
          <p className="text-xs text-[#737373] dark:text-[#A3A3A3] leading-relaxed">
            Share your link. They get 50 free AI ops, you earn 25 for each signup.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {linkData ? (
          <>
            <button
              onClick={handleCopy}
              className="flex items-center justify-center gap-2 flex-1 px-3 py-2 bg-[#8B5CF6] hover:bg-[#7C3AED] text-white text-sm font-medium rounded-lg transition-colors"
            >
              {copied ? (
                <Check className="h-4 w-4" strokeWidth={2} />
              ) : (
                <Copy className="h-4 w-4" strokeWidth={1.5} />
              )}
              {copied ? "Copied!" : "Copy link"}
            </button>
            <Link
              href="/referral"
              className="px-3 py-2 border border-[#E5E5E5] dark:border-[#333] rounded-lg text-sm text-[#525252] dark:text-[#A3A3A3] hover:bg-[#F5F5F5] dark:hover:bg-[#252525] transition-colors"
            >
              Details
            </Link>
          </>
        ) : (
          <Link
            href="/referral"
            className="flex items-center justify-center gap-2 flex-1 px-3 py-2 bg-[#8B5CF6] hover:bg-[#7C3AED] text-white text-sm font-medium rounded-lg transition-colors"
          >
            <Gift className="h-4 w-4" strokeWidth={1.5} />
            Start inviting
          </Link>
        )}
      </div>
    </div>
  );
}

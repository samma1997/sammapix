"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Gift, Star } from "lucide-react";

interface SidebarReferralBadgeProps {
  className?: string;
}

export default function SidebarReferralBadge({ className }: SidebarReferralBadgeProps) {
  const [referralCount, setReferralCount] = useState<number | null>(null);

  useEffect(() => {
    async function fetchCount() {
      try {
        const res = await fetch("/api/referral/stats");
        if (res.ok) {
          const data = await res.json();
          setReferralCount(data.totalReferrals ?? 0);
        } else {
          setReferralCount(0);
        }
      } catch {
        setReferralCount(0);
      }
    }
    fetchCount();
  }, []);

  if (referralCount === null) return null;

  return (
    <Link
      href="/referral"
      className={`flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-sm transition-colors duration-150 text-[#525252] dark:text-[#A3A3A3] hover:bg-[#F5F5F5] dark:hover:bg-[#2A2A2A] hover:text-[#171717] dark:hover:text-[#E5E5E5] ${className ?? ""}`}
    >
      {referralCount > 0 ? (
        <>
          <Star className="h-4 w-4 shrink-0 text-[#8B5CF6]" strokeWidth={1.5} />
          <span className="flex-1">{referralCount} referral{referralCount !== 1 ? "s" : ""}</span>
          <span className="text-[9px] font-bold uppercase tracking-wider text-[#8B5CF6] bg-[#8B5CF6]/10 px-1.5 py-0.5 rounded">
            {referralCount >= 5 ? "PRO" : "NEW"}
          </span>
        </>
      ) : (
        <>
          <Gift className="h-4 w-4 shrink-0 text-[#8B5CF6]" strokeWidth={1.5} />
          <span className="flex-1">Invite &amp; earn</span>
        </>
      )}
    </Link>
  );
}

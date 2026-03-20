"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Coins, ArrowRight, ChevronDown, ChevronUp, Loader2 } from "lucide-react";

// ---------------------------------------------------------------------------
// Package definitions- must match lib/credits.ts
// ---------------------------------------------------------------------------

const PACKAGES = [
  {
    id: "credits_100",
    name: "Starter",
    credits: 100,
    priceUsd: 5.99,
    perCredit: "$0.06",
    highlighted: false,
  },
  {
    id: "credits_500",
    name: "Standard",
    credits: 500,
    priceUsd: 11.99,
    perCredit: "$0.024",
    highlighted: true,
  },
  {
    id: "credits_2000",
    name: "Mega",
    credits: 2000,
    priceUsd: 34.99,
    perCredit: "$0.017",
    highlighted: false,
  },
] as const;

type PackageId = (typeof PACKAGES)[number]["id"];

// ---------------------------------------------------------------------------
// FAQ data
// ---------------------------------------------------------------------------

const FAQ_ITEMS = [
  {
    q: "Do credits expire?",
    a: "No, credits never expire. Once purchased they stay in your account indefinitely.",
  },
  {
    q: "Can I use credits without Pro?",
    a: "Yes, credits work on any plan. You can buy credits on the Free plan and use them right away.",
  },
  {
    q: "What happens to unused daily operations?",
    a: "Daily operations reset at midnight UTC. They don\u2019t carry over to the next day. Credits, however, never expire.",
  },
];

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function BalanceDisplay({ balance, loading }: { balance: number | null; loading: boolean }) {
  return (
    <div className="mb-8 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg p-6 bg-[#FAFAFA] dark:bg-[#1E1E1E]">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-[#6366F1]/10 dark:bg-[#6366F1]/15 flex items-center justify-center shrink-0">
          <Coins className="h-5 w-5 text-[#6366F1]" strokeWidth={1.5} />
        </div>
        <div>
          {loading ? (
            <div className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 text-[#A3A3A3] animate-spin" strokeWidth={1.5} />
              <span className="text-sm text-[#A3A3A3]">Loading balance…</span>
            </div>
          ) : balance === null || balance === 0 ? (
            <p className="text-sm text-[#525252] dark:text-[#A3A3A3]">
              No credits- buy some below.
            </p>
          ) : (
            <p className="text-sm text-[#525252] dark:text-[#A3A3A3]">
              You have{" "}
              <span className="text-2xl font-bold text-[#171717] dark:text-[#E5E5E5] mx-1">
                {balance.toLocaleString()}
              </span>{" "}
              credit{balance !== 1 ? "s" : ""} remaining.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function PackageCard({
  pkg,
  onBuy,
  purchasing,
}: {
  pkg: (typeof PACKAGES)[number];
  onBuy: (id: PackageId) => void;
  purchasing: PackageId | null;
}) {
  const isBuying = purchasing === pkg.id;

  return (
    <div
      className={[
        "relative flex flex-col border rounded-lg p-5 transition-shadow",
        pkg.highlighted
          ? "border-[#6366F1] shadow-[0_0_0_1px_#6366F1] bg-white dark:bg-[#191919]"
          : "border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#191919] hover:border-[#A3A3A3] dark:hover:border-[#444]",
      ].join(" ")}
    >
      {/* Best value badge */}
      {pkg.highlighted && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-widest bg-[#6366F1] text-white">
            Best value
          </span>
        </div>
      )}

      <div className="mb-4 mt-1">
        <h3 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-0.5">
          {pkg.name}
        </h3>
        <p className="text-2xl font-bold text-[#171717] dark:text-[#E5E5E5] mt-3">
          {pkg.credits.toLocaleString()}
          <span className="text-sm font-normal text-[#737373] dark:text-[#A3A3A3] ml-1">
            credits
          </span>
        </p>
        <p className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-1">
          ${pkg.priceUsd}
        </p>
        <p className="text-xs text-[#737373] dark:text-[#A3A3A3] mt-0.5">
          {pkg.perCredit} per credit
        </p>
      </div>

      <button
        onClick={() => onBuy(pkg.id)}
        disabled={!!purchasing}
        className={[
          "mt-auto flex items-center justify-center gap-1.5 w-full px-4 py-2 rounded-md text-sm font-medium transition-colors",
          pkg.highlighted
            ? "bg-[#6366F1] hover:bg-[#4F46E5] text-white disabled:opacity-60"
            : "bg-[#171717] dark:bg-[#E5E5E5] hover:bg-[#262626] dark:hover:bg-white text-white dark:text-[#171717] disabled:opacity-60",
        ].join(" ")}
      >
        {isBuying ? (
          <>
            <Loader2 className="h-3.5 w-3.5 animate-spin" strokeWidth={1.5} />
            Redirecting…
          </>
        ) : (
          <>
            Buy now
            <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
          </>
        )}
      </button>
    </div>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[#E5E5E5] dark:border-[#2A2A2A] last:border-b-0">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-4 py-3 text-left"
      >
        <span className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5]">{q}</span>
        {open ? (
          <ChevronUp className="h-4 w-4 text-[#A3A3A3] shrink-0" strokeWidth={1.5} />
        ) : (
          <ChevronDown className="h-4 w-4 text-[#A3A3A3] shrink-0" strokeWidth={1.5} />
        )}
      </button>
      {open && (
        <p className="pb-3 text-sm text-[#737373] dark:text-[#A3A3A3] leading-relaxed">{a}</p>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

interface DashboardCreditsProps {
  purchased?: number | null;
  canceled?: boolean;
}

export default function DashboardCredits({ purchased, canceled }: DashboardCreditsProps) {
  const [balance, setBalance] = useState<number | null>(null);
  const [loadingBalance, setLoadingBalance] = useState(true);
  const [purchasing, setPurchasing] = useState<PackageId | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoadingBalance(true);
    fetch("/api/credits/balance")
      .then((r) => r.json())
      .then((data: { credits?: number }) => {
        setBalance(data.credits ?? 0);
      })
      .catch(() => setBalance(0))
      .finally(() => setLoadingBalance(false));
  }, []);

  async function handleBuy(packageId: PackageId) {
    setError(null);
    setPurchasing(packageId);
    try {
      const res = await fetch("/api/credits/purchase", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ packageId }),
      });
      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !data.url) {
        setError(data.error ?? "Something went wrong. Please try again.");
        setPurchasing(null);
        return;
      }
      window.location.href = data.url;
    } catch {
      setError("Network error. Please try again.");
      setPurchasing(null);
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-8 pb-16">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#171717] dark:text-[#E5E5E5] tracking-tight mb-1.5">
          AI Credits
        </h1>
        <p className="text-sm text-[#737373] dark:text-[#A3A3A3]">
          Buy AI credits. Credits never expire.
        </p>
      </div>

      {/* Purchase success / cancel banners */}
      {purchased != null && purchased > 0 && (
        <div className="mb-6 flex items-center gap-3 border border-[#16A34A]/30 bg-[#16A34A]/5 dark:bg-[#16A34A]/10 rounded-lg px-4 py-3">
          <span className="text-sm text-[#16A34A] font-medium">
            {purchased.toLocaleString()} credits added to your account.
          </span>
        </div>
      )}
      {canceled && (
        <div className="mb-6 flex items-center gap-3 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg px-4 py-3 bg-[#FAFAFA] dark:bg-[#1E1E1E]">
          <span className="text-sm text-[#737373] dark:text-[#A3A3A3]">
            Purchase canceled. No charge was made.
          </span>
        </div>
      )}

      {/* Balance display */}
      <BalanceDisplay balance={balance} loading={loadingBalance} />

      {/* Package cards */}
      <div className="mb-8">
        <h2 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-4">
          Choose a package
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {PACKAGES.map((pkg) => (
            <PackageCard
              key={pkg.id}
              pkg={pkg}
              onBuy={handleBuy}
              purchasing={purchasing}
            />
          ))}
        </div>
        {error && (
          <p className="mt-3 text-sm text-[#DC2626]">{error}</p>
        )}
      </div>

      {/* What uses credits */}
      <div className="mb-8 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg p-5">
        <h2 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
          What uses credits
        </h2>
        <ul className="space-y-2 mb-3">
          {[
            { label: "AI Rename", cost: "1 credit" },
            { label: "AI Alt Text", cost: "1 credit" },
            { label: "AI Organize", cost: "1 credit" },
            { label: "Workflow step (AI)", cost: "2 credits" },
          ].map(({ label, cost }) => (
            <li key={label} className="flex items-center justify-between">
              <span className="text-sm text-[#525252] dark:text-[#A3A3A3]">{label}</span>
              <span className="text-xs font-medium text-[#737373] dark:text-[#525252] bg-[#F5F5F5] dark:bg-[#252525] border border-[#E5E5E5] dark:border-[#2A2A2A] px-2 py-0.5 rounded">
                {cost}
              </span>
            </li>
          ))}
        </ul>
        <p className="text-xs text-[#737373] dark:text-[#A3A3A3] border-t border-[#E5E5E5] dark:border-[#2A2A2A] pt-3 leading-relaxed">
          Pro users get 200 free AI credits/day. Credits are for when you need more.{" "}
          <Link href="/dashboard/upgrade" className="text-[#6366F1] hover:underline underline-offset-2">
            View plans
          </Link>
        </p>
      </div>

      {/* FAQ */}
      <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg px-5">
        <h2 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] py-4 border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
          Frequently asked questions
        </h2>
        <div>
          {FAQ_ITEMS.map((item) => (
            <FaqItem key={item.q} q={item.q} a={item.a} />
          ))}
        </div>
      </div>
    </div>
  );
}

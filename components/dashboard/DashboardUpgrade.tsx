"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Zap,
  Image,
  Shield,
  Sparkles,
  Check,
  Crown,
  Coins,
} from "lucide-react";

interface DashboardUpgradeProps {
  userEmail: string | null;
}

export default function DashboardUpgrade({ userEmail }: DashboardUpgradeProps) {
  const [loading, setLoading] = useState(false);
  const [annual, setAnnual] = useState(false);
  const savePercent = Math.round((1 - 59 / (7 * 12)) * 100);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: annual ? "annual" : "monthly" }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(`Error: ${data.error ?? "Could not start checkout"}`);
      }
    } catch {
      alert("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-10 px-4 sm:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#6366F1]/10 dark:bg-[#6366F1]/20 text-[#6366F1] rounded-full text-xs font-medium mb-4">
            <Crown className="h-3.5 w-3.5" strokeWidth={2} />
            Pro Plan
          </div>
          <h1 className="text-2xl font-bold text-[#171717] dark:text-[#E5E5E5] tracking-tight mb-2">
            Upgrade to Pro
          </h1>
          <p className="text-sm text-[#737373] dark:text-[#A3A3A3] max-w-md mx-auto">
            Unlock the full AI workflow. Cancel anytime, no questions asked.
          </p>
        </div>

        {/* Current plan indicator */}
        <div className="mb-6 text-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#F5F5F5] dark:bg-[#252525] text-[#525252] dark:text-[#A3A3A3] text-xs font-medium rounded-full border border-[#E5E5E5] dark:border-[#333]">
            You are currently on the <span className="font-semibold text-[#171717] dark:text-[#E5E5E5] ml-0.5">Free</span> plan
          </span>
        </div>

        {/* Founding Member banner */}
        <div className="mb-8 border border-[#6366F1]/20 dark:border-[#6366F1]/15 rounded-lg px-5 py-4 bg-[#EEF2FF]/40 dark:bg-[#6366F1]/5 text-center">
          <p className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1">
            Founding Member Deal
          </p>
          <p className="text-sm text-[#737373] dark:text-[#A3A3A3]">
            First 200 Pro subscribers lock in <span className="font-semibold text-[#6366F1]">$4/month forever</span>.
            Early adopters get a permanent discount as a thank-you for believing early.
          </p>
        </div>

        {/* Toggle */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2 p-1 bg-[#F5F5F5] dark:bg-[#252525] rounded-md border border-[#E5E5E5] dark:border-[#333]">
            <button
              className={`px-3 py-1.5 text-sm rounded transition-colors ${
                !annual
                  ? "bg-white dark:bg-[#1E1E1E] text-[#171717] dark:text-[#E5E5E5] shadow-sm border border-[#E5E5E5] dark:border-[#444]"
                  : "text-[#737373] hover:text-[#525252]"
              }`}
              onClick={() => setAnnual(false)}
            >
              Monthly
            </button>
            <button
              className={`px-3 py-1.5 text-sm rounded transition-colors flex items-center gap-1.5 ${
                annual
                  ? "bg-white dark:bg-[#1E1E1E] text-[#171717] dark:text-[#E5E5E5] shadow-sm border border-[#E5E5E5] dark:border-[#444]"
                  : "text-[#737373] hover:text-[#525252]"
              }`}
              onClick={() => setAnnual(true)}
            >
              Annual
              <span className="text-[10px] font-semibold bg-[#16A34A] text-white px-1.5 py-0.5 rounded">
                Save {savePercent}%
              </span>
            </button>
          </div>
        </div>

        {/* Price card */}
        <div className="border border-[#6366F1]/30 rounded-xl p-8 bg-white dark:bg-[#1E1E1E] ring-1 ring-[#6366F1]/10 mb-8">
          <div className="text-center mb-6">
            <div className="flex items-baseline justify-center gap-1.5">
              <span className="text-5xl font-bold text-[#171717] dark:text-[#E5E5E5] tracking-tight">
                ${annual ? "59" : "7"}
              </span>
              <span className="text-sm text-[#A3A3A3]">
                / {annual ? "year" : "month"}
              </span>
            </div>
            <p className="mt-2 text-sm text-[#6366F1] font-medium">
              {annual ? "60 days free trial" : "7 days free trial"}
            </p>
            {annual && (
              <p className="mt-1 text-xs text-[#A3A3A3]">
                Launch promo- 60 days free for early adopters
              </p>
            )}
          </div>

          {/* Features */}
          <div className="space-y-3 mb-8">
            {[
              { icon: Zap, text: "AI Workflow Pipeline", sub: "Blog, Instagram, E-commerce presets- run everything in one click" },
              { icon: Sparkles, text: "200 AI operations / day", sub: "AI Rename + AI Alt Text included daily" },
              { icon: Image, text: "500 files per batch", sub: "Process full shoots at once" },
              { icon: Coins, text: "Buy extra AI credits", sub: "When 200/day isn't enough- credits never expire" },
              { icon: Shield, text: "No ads", sub: "Clean workspace, no distractions" },
              { icon: Check, text: "Install as desktop app", sub: "Works offline, launches instantly" },
              { icon: Crown, text: "Priority support", sub: "Get help when you need it" },
            ].map(({ icon: Icon, text, sub }) => (
              <div key={text} className="flex items-start gap-3">
                <Icon className="h-4 w-4 text-[#6366F1] shrink-0 mt-0.5" strokeWidth={1.5} />
                <div>
                  <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5]">{text}</p>
                  <p className="text-xs text-[#737373] dark:text-[#A3A3A3]">{sub}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <button
            onClick={handleCheckout}
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#6366F1] hover:bg-[#4F46E5] text-white text-sm font-medium rounded-md transition-colors disabled:opacity-60"
          >
            {loading ? (
              <div className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
            ) : (
              <Sparkles className="h-4 w-4" strokeWidth={1.5} />
            )}
            {annual
              ? "Start 60-day free trial- $59/year"
              : "Start 7-day free trial- $7/month"
            }
          </button>

          <p className="mt-3 text-center text-xs text-[#A3A3A3]">
            Cancel anytime &middot; 30-day money-back guarantee &middot; No charge during trial
          </p>
        </div>

        {/* What you're missing */}
        <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-xl p-6 bg-[#FAFAFA] dark:bg-[#1E1E1E] mb-6">
          <h2 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-4">
            Free vs Pro -- what changes
          </h2>
          {/* Column headers */}
          <div className="grid grid-cols-3 text-[10px] font-semibold uppercase tracking-widest text-[#A3A3A3] dark:text-[#525252] pb-2 mb-2 border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
            <span>Feature</span>
            <span className="text-center">Free (current)</span>
            <span className="text-center">Pro</span>
          </div>
          <div className="space-y-2">
            {[
              { feature: "AI operations / day", free: "10", pro: "200" },
              { feature: "Files per batch", free: "20", pro: "500" },
              { feature: "Max file size", free: "10 MB", pro: "50 MB" },
              { feature: "ZIP download", free: "No", pro: "Yes" },
              { feature: "AI Workflow Pipeline", free: "No", pro: "Yes" },
              { feature: "Buy extra credits", free: "No", pro: "Yes" },
              { feature: "Ads", free: "Yes", pro: "None" },
              { feature: "Support", free: "Community", pro: "Priority" },
            ].map(({ feature, free, pro }) => (
              <div key={feature} className="grid grid-cols-3 text-xs py-1.5 border-b border-[#F5F5F5] dark:border-[#252525] last:border-0">
                <span className="text-[#525252] dark:text-[#A3A3A3]">{feature}</span>
                <span className="text-center text-[#A3A3A3]">{free}</span>
                <span className="text-center font-medium text-[#171717] dark:text-[#E5E5E5]">{pro}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Credits teaser */}
        <div className="text-center">
          <p className="text-xs text-[#A3A3A3]">
            Pro users can also buy extra AI credits when needed.
          </p>
          <Link
            href="/dashboard/credits"
            className="text-xs text-[#6366F1] hover:underline"
          >
            View credit packages →
          </Link>
        </div>
      </div>
    </div>
  );
}

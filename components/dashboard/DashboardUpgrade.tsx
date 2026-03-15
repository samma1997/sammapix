"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Zap,
  Image,
  Shield,
  Sparkles,
  Check,
  Crown,
} from "lucide-react";

interface DashboardUpgradeProps {
  userEmail: string | null;
}

export default function DashboardUpgrade({ userEmail }: DashboardUpgradeProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [annual, setAnnual] = useState(false);
  const savePercent = Math.round((1 - 59 / (7 * 12)) * 100);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        credentials: "include",
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
            Unlock the full AI workflow. 30-day free trial — cancel anytime.
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

        {/* Price */}
        <div className="text-center mb-8">
          <div className="flex items-baseline justify-center gap-1.5">
            <span className="text-5xl font-bold text-[#171717] dark:text-[#E5E5E5] tracking-tight">
              ${annual ? "59" : "7"}
            </span>
            <span className="text-sm text-[#A3A3A3]">
              / {annual ? "year" : "month"}
            </span>
          </div>
          <p className="mt-2 text-xs text-[#A3A3A3]">
            30-day free trial &middot; Cancel anytime
          </p>
        </div>

        {/* CTA */}
        <div className="flex justify-center mb-10">
          <button
            onClick={handleCheckout}
            disabled={loading}
            className="inline-flex items-center gap-2 px-8 py-3 bg-[#6366F1] hover:bg-[#4F46E5] text-white text-sm font-medium rounded-md transition-colors disabled:opacity-60"
          >
            {loading ? (
              <div className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
            ) : (
              <Sparkles className="h-4 w-4" strokeWidth={1.5} />
            )}
            Start 30-day free trial
          </button>
        </div>

        {/* What's included */}
        <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-xl p-6 bg-[#FAFAFA] dark:bg-[#1E1E1E] mb-8">
          <h2 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-4">
            Everything in Pro
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { icon: Zap, text: "AI Workflow Pipeline — Blog, Instagram, E-commerce presets" },
              { icon: Image, text: "500 files per batch" },
              { icon: Sparkles, text: "200 AI operations per day (rename + alt text)" },
              { icon: Shield, text: "No ads — clean workspace" },
              { icon: Crown, text: "Priority support" },
              { icon: Check, text: "Install as desktop app" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-start gap-2.5">
                <Icon className="h-4 w-4 text-[#6366F1] shrink-0 mt-0.5" strokeWidth={1.5} />
                <span className="text-sm text-[#525252] dark:text-[#A3A3A3]">{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Credits note */}
        <div className="text-center">
          <p className="text-xs text-[#A3A3A3] mb-2">
            Need even more? Buy AI credits on top of your Pro plan.
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

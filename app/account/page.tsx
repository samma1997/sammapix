"use client";

import React, { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  Crown,
  User,
  CreditCard,
  LogOut,
  ArrowRight,
  Check,
  Zap,
  MapPin,
  Globe,
  Scissors,
  ScanEye,
  Search,
} from "lucide-react";
import Link from "next/link";

const PRO_TOOLS = [
  { icon: <Zap className="h-3.5 w-3.5" />, name: "Crunch", limit: "500 files" },
  { icon: <MapPin className="h-3.5 w-3.5" />, name: "Sort by Location", limit: "500 photos" },
  { icon: <Globe className="h-3.5 w-3.5" />, name: "Photo Map", limit: "500 photos" },
  { icon: <ScanEye className="h-3.5 w-3.5" />, name: "EXIF Viewer", limit: "500 files" },
  { icon: <Scissors className="h-3.5 w-3.5" />, name: "Photo Cull", limit: "500 photos" },
  { icon: <Search className="h-3.5 w-3.5" />, name: "Find Duplicates", limit: "500 photos" },
];

export default function AccountPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [portalLoading, setPortalLoading] = useState(false);
  const [portalError, setPortalError] = useState<string | null>(null);

  // Redirect to sign in if not logged in
  if (status === "unauthenticated") {
    router.push("/auth/signin?callbackUrl=/account");
    return null;
  }

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="h-6 w-6 rounded-full border-2 border-[#171717] border-t-transparent animate-spin" />
      </div>
    );
  }

  const user = session?.user as {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    plan?: string;
  };
  const isPro = user?.plan === "pro";

  const handleOpenPortal = async () => {
    setPortalLoading(true);
    setPortalError(null);
    try {
      const res = await fetch("/api/billing/portal", { method: "POST" });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setPortalError(data.error ?? "Could not open billing portal.");
      }
    } catch {
      setPortalError("Network error. Please try again.");
    } finally {
      setPortalLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#191919] py-16 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto space-y-6">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#171717] dark:text-[#E5E5E5] tracking-tight">Account</h1>
          <p className="text-sm text-[#737373] mt-1">Manage your profile and subscription.</p>
        </div>

        {/* Profile card */}
        <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md p-5 bg-white dark:bg-[#1E1E1E]">
          <div className="flex items-center gap-4">
            {user?.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={user.image}
                alt={user.name ?? ""}
                className="h-12 w-12 rounded-full border border-[#E5E5E5] dark:border-[#2A2A2A]"
              />
            ) : (
              <div className="h-12 w-12 rounded-full bg-[#F5F5F5] dark:bg-[#252525] border border-[#E5E5E5] dark:border-[#2A2A2A] flex items-center justify-center">
                <User className="h-5 w-5 text-[#737373]" strokeWidth={1.5} />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] truncate">{user?.name ?? " - "}</p>
              <p className="text-xs text-[#737373] truncate">{user?.email ?? " - "}</p>
            </div>
            <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-semibold ${
              isPro
                ? "bg-[#171717] text-white"
                : "bg-[#F5F5F5] dark:bg-[#252525] text-[#737373] border border-[#E5E5E5] dark:border-[#2A2A2A]"
            }`}>
              {isPro && <Crown className="h-3 w-3" />}
              {isPro ? "Pro" : "Free"}
            </div>
          </div>
        </div>

        {/* Subscription card */}
        <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md p-5 bg-white dark:bg-[#1E1E1E]">
          <div className="flex items-center gap-2 mb-4">
            <CreditCard className="h-4 w-4 text-[#525252]" strokeWidth={1.5} />
            <h2 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5]">Subscription</h2>
          </div>

          {isPro ? (
            <>
              <div className="flex items-center gap-3 p-3 bg-[#FAFAFA] dark:bg-[#252525] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md mb-4">
                <div className="h-8 w-8 rounded-full bg-[#171717] flex items-center justify-center shrink-0">
                  <Crown className="h-3.5 w-3.5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5]">Pro plan- active</p>
                  <p className="text-xs text-[#737373]">All limits unlocked · No ads</p>
                </div>
              </div>

              {/* Pro tools */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4">
                {PRO_TOOLS.map((t) => (
                  <div key={t.name} className="flex items-center gap-2 p-2 bg-[#FAFAFA] dark:bg-[#252525] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded text-xs">
                    <span className="text-[#525252]">{t.icon}</span>
                    <span className="font-medium text-[#171717] dark:text-[#E5E5E5]">{t.name}</span>
                    <span className="ml-auto text-[#A3A3A3]">{t.limit}</span>
                  </div>
                ))}
              </div>

              {portalError && (
                <p className="text-xs text-[#DC2626] mb-3">{portalError}</p>
              )}

              <button
                onClick={handleOpenPortal}
                disabled={portalLoading}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md text-sm font-medium text-[#525252] bg-white dark:bg-[#1E1E1E] hover:bg-[#F5F5F5] dark:hover:bg-[#2A2A2A] dark:bg-[#252525] transition-colors disabled:opacity-60"
              >
                {portalLoading ? (
                  <div className="h-4 w-4 rounded-full border-2 border-[#525252] border-t-transparent animate-spin" />
                ) : (
                  <CreditCard className="h-4 w-4" strokeWidth={1.5} />
                )}
                Manage billing &amp; cancel subscription
              </button>
              <p className="text-[11px] text-[#A3A3A3] text-center mt-2">
                You keep Pro access until the end of your billing period after canceling.
              </p>
            </>
          ) : (
            <>
              <div className="flex items-center gap-3 p-3 bg-[#FAFAFA] dark:bg-[#252525] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md mb-4">
                <div>
                  <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5]">Free plan</p>
                  <p className="text-xs text-[#737373]">100 files per batch · 5 AI Renames/day</p>
                </div>
              </div>

              <div className="space-y-2 mb-4 text-xs text-[#737373]">
                {["500 files per batch", "No ads", "200 AI Renames/day", "Early access to new tools"].map((f) => (
                  <div key={f} className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-[#16A34A] shrink-0" strokeWidth={2} />
                    {f}
                  </div>
                ))}
              </div>

              <Link
                href="/pricing"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 bg-[#171717] text-white text-sm font-medium rounded-md hover:bg-[#262626] transition-colors"
              >
                Upgrade to Pro- $9/mo
                <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
              </Link>
            </>
          )}
        </div>

        {/* Sign out */}
        <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md p-5 bg-white dark:bg-[#1E1E1E]">
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="flex items-center gap-2 text-sm text-[#737373] hover:text-[#DC2626] transition-colors"
          >
            <LogOut className="h-4 w-4" strokeWidth={1.5} />
            Sign out
          </button>
        </div>

      </div>
    </div>
  );
}

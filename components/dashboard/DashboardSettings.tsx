"use client";

import React, { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import {
  User,
  Crown,
  CreditCard,
  LogOut,
  ArrowRight,
  Shield,
  Palette,
  RefreshCw,
} from "lucide-react";
import type { Persona } from "@/components/onboarding/OnboardingModal";

const LS_PERSONA_KEY = "sammapix-persona";
const LS_THEME_KEY = "theme";

const PERSONA_LABELS: Record<Persona, string> = {
  photographer: "Photographer",
  blogger: "Blogger / Content Creator",
  ecommerce: "E-commerce Seller",
  developer: "Developer",
  social: "Social Media Manager",
};

interface DashboardSettingsProps {
  userName: string | null;
  userEmail: string | null;
  userImage: string | null;
  userPlan: string;
}

export default function DashboardSettings({
  userName,
  userEmail,
  userImage,
  userPlan,
}: DashboardSettingsProps) {
  const isPro = userPlan === "pro";

  const [persona, setPersona] = useState<Persona | "skipped" | null>(null);
  const [theme, setTheme] = useState<string | null>(null);
  const [portalLoading, setPortalLoading] = useState(false);
  const [portalError, setPortalError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const storedPersona = localStorage.getItem(LS_PERSONA_KEY) as Persona | "skipped" | null;
    setPersona(storedPersona);
    const storedTheme = localStorage.getItem(LS_THEME_KEY);
    setTheme(storedTheme ?? "system");
  }, []);

  const handleClearPersona = () => {
    localStorage.removeItem(LS_PERSONA_KEY);
    setPersona(null);
    // Reload to trigger onboarding modal if it's set up on the dashboard
    window.location.href = "/dashboard";
  };

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

  // Detect provider from email domain heuristic is unreliable;
  // we show "Google" / "GitHub" based on the image URL instead.
  const isGithubUser =
    userImage?.includes("avatars.githubusercontent.com") ?? false;
  const providerLabel = isGithubUser ? "GitHub" : "Google";

  const personaLabel =
    persona && persona !== "skipped"
      ? PERSONA_LABELS[persona as Persona] ?? persona
      : null;

  const themeLabel =
    theme === "dark" ? "Dark" : theme === "light" ? "Light" : "System default";

  return (
    <div className="py-10 px-4 sm:px-8">
      <div className="max-w-2xl mx-auto space-y-5">
        {/* Page header */}
        <div className="mb-6">
          <h1 className="text-xl font-semibold text-[#171717] dark:text-[#E5E5E5] tracking-tight">
            Settings
          </h1>
          <p className="text-sm text-[#737373] mt-0.5">
            Manage your profile, subscription and preferences.
          </p>
        </div>

        {/* ── Section 1: Profile ─────────────────────────────────── */}
        <section className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md bg-white dark:bg-[#1E1E1E]">
          <div className="flex items-center gap-2 px-5 py-3.5 border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
            <User className="h-4 w-4 text-[#525252]" strokeWidth={1.5} />
            <h2 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5]">
              Profile
            </h2>
          </div>

          <div className="px-5 py-4 space-y-4">
            {/* Avatar + name */}
            <div className="flex items-center gap-4">
              {userImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={userImage}
                  alt={userName ?? ""}
                  className="h-12 w-12 rounded-full border border-[#E5E5E5] dark:border-[#2A2A2A] shrink-0"
                />
              ) : (
                <div className="h-12 w-12 rounded-full bg-[#F5F5F5] dark:bg-[#252525] border border-[#E5E5E5] dark:border-[#2A2A2A] flex items-center justify-center shrink-0">
                  <User className="h-5 w-5 text-[#737373]" strokeWidth={1.5} />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] truncate">
                  {userName ?? "—"}
                </p>
                <p className="text-xs text-[#737373] truncate">{userEmail ?? "—"}</p>
              </div>
              <div
                className={[
                  "flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-semibold shrink-0",
                  isPro
                    ? "bg-[#171717] text-white dark:bg-white dark:text-[#171717]"
                    : "bg-[#F5F5F5] dark:bg-[#252525] text-[#737373] border border-[#E5E5E5] dark:border-[#2A2A2A]",
                ].join(" ")}
              >
                {isPro && <Crown className="h-3 w-3" />}
                {isPro ? "Pro" : "Free"}
              </div>
            </div>

            {/* Meta rows */}
            <div className="divide-y divide-[#F5F5F5] dark:divide-[#252525]">
              <Row label="Signed in with" value={providerLabel} />
              <Row label="Email" value={userEmail ?? "—"} />
            </div>
          </div>
        </section>

        {/* ── Section 2: Subscription ────────────────────────────── */}
        <section className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md bg-white dark:bg-[#1E1E1E]">
          <div className="flex items-center gap-2 px-5 py-3.5 border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
            <CreditCard className="h-4 w-4 text-[#525252]" strokeWidth={1.5} />
            <h2 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5]">
              Subscription
            </h2>
          </div>

          <div className="px-5 py-4 space-y-4">
            {isPro ? (
              <>
                <div className="divide-y divide-[#F5F5F5] dark:divide-[#252525]">
                  <Row label="Current plan" value="Pro" />
                  <Row label="Status" value="Active" />
                  <Row label="Billing" value="Managed via Stripe" />
                </div>

                {portalError && (
                  <p className="text-xs text-[#DC2626]">{portalError}</p>
                )}

                <button
                  onClick={handleOpenPortal}
                  disabled={portalLoading}
                  className="inline-flex items-center gap-2 px-4 py-2 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md text-sm font-medium text-[#525252] dark:text-[#A3A3A3] bg-white dark:bg-[#1E1E1E] hover:bg-[#F5F5F5] dark:hover:bg-[#252525] transition-colors disabled:opacity-60"
                >
                  {portalLoading ? (
                    <div className="h-4 w-4 rounded-full border-2 border-[#525252] border-t-transparent animate-spin" />
                  ) : (
                    <CreditCard className="h-4 w-4" strokeWidth={1.5} />
                  )}
                  Manage subscription
                </button>

                <p className="text-[11px] text-[#A3A3A3]">
                  Cancel anytime — you keep Pro access until the end of the billing period.
                </p>
              </>
            ) : (
              <>
                <div className="divide-y divide-[#F5F5F5] dark:divide-[#252525]">
                  <Row label="Current plan" value="Free" />
                  <Row label="AI Renames" value="5 / day" />
                  <Row label="Batch limit" value="100 files" />
                </div>

                <Link
                  href="/try-pro"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#171717] dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-[#262626] dark:hover:bg-[#E5E5E5] transition-colors"
                >
                  <Crown className="h-4 w-4" strokeWidth={1.5} />
                  Upgrade to Pro — $7/mo
                  <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
                </Link>
              </>
            )}
          </div>
        </section>

        {/* ── Section 3: Persona / Preferences ──────────────────── */}
        <section className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md bg-white dark:bg-[#1E1E1E]">
          <div className="flex items-center gap-2 px-5 py-3.5 border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
            <Palette className="h-4 w-4 text-[#525252]" strokeWidth={1.5} />
            <h2 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5]">
              Preferences
            </h2>
          </div>

          <div className="px-5 py-4 space-y-4">
            <div className="divide-y divide-[#F5F5F5] dark:divide-[#252525]">
              <Row
                label="Role"
                value={personaLabel ?? "Not set"}
              />
              <Row label="Theme" value={themeLabel} />
            </div>

            <button
              onClick={handleClearPersona}
              className="inline-flex items-center gap-2 px-4 py-2 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md text-sm font-medium text-[#525252] dark:text-[#A3A3A3] bg-white dark:bg-[#1E1E1E] hover:bg-[#F5F5F5] dark:hover:bg-[#252525] transition-colors"
            >
              <RefreshCw className="h-4 w-4" strokeWidth={1.5} />
              Change role
            </button>
          </div>
        </section>

        {/* ── Section 4: Data & Privacy ──────────────────────────── */}
        <section className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md bg-white dark:bg-[#1E1E1E]">
          <div className="flex items-center gap-2 px-5 py-3.5 border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
            <Shield className="h-4 w-4 text-[#525252]" strokeWidth={1.5} />
            <h2 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5]">
              Data &amp; Privacy
            </h2>
          </div>

          <div className="px-5 py-4 space-y-3">
            <PrivacyItem
              icon="lock"
              text="Your images never leave your browser. All processing is done locally."
            />
            <PrivacyItem
              icon="ai"
              text="AI Rename sends thumbnails to Google Gemini for analysis. No images are stored."
            />

            <div className="pt-2 border-t border-[#F5F5F5] dark:border-[#252525]">
              <p className="text-xs text-[#737373]">
                To delete your account, contact{" "}
                <a
                  href="mailto:support@sammapix.com"
                  className="text-[#525252] dark:text-[#A3A3A3] underline underline-offset-2 hover:text-[#171717] dark:hover:text-[#E5E5E5] transition-colors"
                >
                  support@sammapix.com
                </a>
              </p>
            </div>
          </div>
        </section>

        {/* ── Section 5: Sign Out ────────────────────────────────── */}
        <section className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md bg-white dark:bg-[#1E1E1E]">
          <div className="px-5 py-4">
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="flex items-center gap-2 text-sm text-[#737373] hover:text-[#DC2626] transition-colors"
            >
              <LogOut className="h-4 w-4" strokeWidth={1.5} />
              Sign out
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

/* ── Sub-components ───────────────────────────────────────────── */

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-2.5 gap-4">
      <span className="text-xs text-[#737373] shrink-0">{label}</span>
      <span className="text-xs text-[#171717] dark:text-[#E5E5E5] text-right truncate">
        {value}
      </span>
    </div>
  );
}

function PrivacyItem({ icon, text }: { icon: "lock" | "ai"; text: string }) {
  return (
    <div className="flex items-start gap-2.5">
      <div className="h-5 w-5 rounded bg-[#F5F5F5] dark:bg-[#252525] border border-[#E5E5E5] dark:border-[#2A2A2A] flex items-center justify-center shrink-0 mt-0.5">
        {icon === "lock" ? (
          <svg
            width="10"
            height="10"
            viewBox="0 0 12 12"
            fill="none"
            className="text-[#525252]"
          >
            <rect
              x="2"
              y="5"
              width="8"
              height="6"
              rx="1"
              stroke="currentColor"
              strokeWidth="1.2"
            />
            <path
              d="M4 5V3.5a2 2 0 0 1 4 0V5"
              stroke="currentColor"
              strokeWidth="1.2"
            />
          </svg>
        ) : (
          <svg
            width="10"
            height="10"
            viewBox="0 0 12 12"
            fill="none"
            className="text-[#525252]"
          >
            <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.2" />
            <path
              d="M6 4v2.5l1.5 1"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
          </svg>
        )}
      </div>
      <p className="text-xs text-[#737373] leading-relaxed">{text}</p>
    </div>
  );
}

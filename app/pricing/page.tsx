"use client";

import React, { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
  IconCompress,
  IconWebP,
  IconAIRename,
  IconEXIF,
  IconFilmLab,
  IconStampIt,
  IconCropRatio,
  IconTwinHunt,
  IconGeoSort,
  IconTravelMap,
  IconResizePack,
  IconCull,
  IconHEIC,
} from "@/components/ui/ToolCard";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import CheckoutButton from "@/components/ui/CheckoutButton";

// ─── Tool grid data ────────────────────────────────────────────────────────────

const toolGrid = [
  { Icon: IconCompress,  name: "Compress",   accent: "#6366F1" },
  { Icon: IconWebP,      name: "WebP",        accent: "#10B981" },
  { Icon: IconAIRename,  name: "AI Rename",   accent: "#8B5CF6" },
  { Icon: IconEXIF,      name: "EXIF Lens",   accent: "#EF4444" },
  { Icon: IconFilmLab,   name: "FilmLab",     accent: "#F59E0B" },
  { Icon: IconStampIt,   name: "StampIt",     accent: "#06B6D4" },
  { Icon: IconCropRatio, name: "CropRatio",   accent: "#EC4899" },
  { Icon: IconTwinHunt,  name: "TwinHunt",    accent: "#F97316" },
  { Icon: IconGeoSort,   name: "GeoSort",     accent: "#22C55E" },
  { Icon: IconTravelMap, name: "TravelMap",   accent: "#3B82F6" },
  { Icon: IconResizePack,name: "ResizePack",  accent: "#14B8A6" },
  { Icon: IconCull,      name: "Cull",        accent: "#F43F5E" },
  { Icon: IconHEIC,      name: "HEIC",        accent: "#6366F1" },
] as const;

// ─── Payment banners ───────────────────────────────────────────────────────────

function PaymentBanners() {
  const searchParams = useSearchParams();
  const success = searchParams.get("success") === "true";
  const canceled = searchParams.get("canceled") === "true";

  useEffect(() => {
    if (!success) return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const w = window as any;
    if (typeof w.fbq === "function") w.fbq("track", "Subscribe", { value: 7.00, currency: "USD" });
    if (typeof w.gtag === "function") w.gtag("event", "conversion", { send_to: process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL, value: 7.00, currency: "USD" });
  }, [success]);

  if (!success && !canceled) return null;
  return (
    <>
      {success && (
        <div className="mb-8 flex items-start gap-3 rounded-md border border-green-200 dark:border-green-900 bg-green-50 dark:bg-green-950/30 px-4 py-3 text-sm text-green-800 dark:text-green-400">
          <span className="shrink-0 text-base leading-5">🎉</span>
          <span>Welcome to Pro! Your account has been upgraded.</span>
        </div>
      )}
      {canceled && (
        <div className="mb-8 flex items-start gap-3 rounded-md border border-gray-200 dark:border-[#333] bg-gray-50 dark:bg-[#252525] px-4 py-3 text-sm text-gray-600 dark:text-[#A3A3A3]">
          <span>Payment canceled. You&apos;re still on the free plan.</span>
        </div>
      )}
    </>
  );
}

// ─── FAQ item ──────────────────────────────────────────────────────────────────

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md overflow-hidden">
      <button
        className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-[#171717] dark:text-[#E5E5E5] hover:bg-[#FAFAFA] dark:hover:bg-[#252525] transition-colors text-left"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        {q}
        <span className="ml-2 text-[#A3A3A3] dark:text-[#737373] shrink-0 select-none">
          {open ? "−" : "+"}
        </span>
      </button>
      {open && (
        <div className="px-4 pb-4 pt-1 text-sm text-[#737373] dark:text-[#A3A3A3] border-t border-[#F5F5F5] dark:border-[#2A2A2A]">
          {a}
        </div>
      )}
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function PricingPage() {
  const [annual, setAnnual] = useState(false);
  const savePercent = Math.round((1 - 59 / (7 * 12)) * 100);

  return (
    <div className="py-20 px-4 sm:px-6 bg-white dark:bg-[#191919] min-h-screen">
      <div className="max-w-3xl mx-auto">
        <Suspense fallback={null}>
          <PaymentBanners />
        </Suspense>

        {/* ── Header ─────────────────────────────────────────────────────── */}
        <div className="text-center mb-14">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#171717] dark:text-[#E5E5E5] tracking-tight mb-3">
            All tools free. Pro removes the limits.
          </h1>
          <p className="text-[#737373] dark:text-[#A3A3A3] max-w-md mx-auto text-sm leading-relaxed">
            Compress, convert, sort by GPS, rename with AI — no signup needed for the basics.
            Pro is for photographers who process hundreds of photos at a time.
          </p>

          {/* Toggle */}
          <div className="inline-flex items-center gap-3 mt-7 p-1 bg-[#F5F5F5] dark:bg-[#252525] rounded-md border border-[#E5E5E5] dark:border-[#333]">
            <button
              className={cn(
                "px-3 py-1.5 text-sm rounded transition-colors",
                !annual
                  ? "bg-white dark:bg-[#1E1E1E] text-[#171717] dark:text-[#E5E5E5] shadow-sm border border-[#E5E5E5] dark:border-[#444]"
                  : "text-[#737373] dark:text-[#737373] hover:text-[#525252] dark:hover:text-[#A3A3A3]"
              )}
              onClick={() => setAnnual(false)}
            >
              Monthly
            </button>
            <button
              className={cn(
                "px-3 py-1.5 text-sm rounded transition-colors flex items-center gap-2",
                annual
                  ? "bg-white dark:bg-[#1E1E1E] text-[#171717] dark:text-[#E5E5E5] shadow-sm border border-[#E5E5E5] dark:border-[#444]"
                  : "text-[#737373] dark:text-[#737373] hover:text-[#525252] dark:hover:text-[#A3A3A3]"
              )}
              onClick={() => setAnnual(true)}
            >
              Annual
              <Badge variant="success">Save {savePercent}%</Badge>
            </button>
          </div>
        </div>

        {/* ── Pricing cards ──────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-16">

          {/* Free card */}
          <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-xl p-7 bg-white dark:bg-[#1E1E1E] flex flex-col">
            <div className="mb-7">
              <h2 className="text-xs font-semibold uppercase tracking-widest text-[#A3A3A3] dark:text-[#737373] mb-3">
                Free
              </h2>
              <div className="flex items-baseline gap-1.5">
                <span className="text-4xl font-bold text-[#171717] dark:text-[#E5E5E5] tracking-tight">$0</span>
                <span className="text-sm text-[#A3A3A3] dark:text-[#737373]">/ forever</span>
              </div>
              <p className="mt-1.5 text-sm text-[#737373] dark:text-[#A3A3A3]">No credit card. No signup.</p>
            </div>

            <ul className="space-y-2.5 mb-8 flex-1">
              {[
                "All 13 tools included",
                "Up to 100 files per batch",
                "5 AI renames / day",
                "Core compression unlimited",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-[#525252] dark:text-[#A3A3A3]">
                  <span className="mt-0.5 shrink-0 text-[#D4D4D4] dark:text-[#525252] select-none">—</span>
                  {item}
                </li>
              ))}
            </ul>

            <a
              href="/tools"
              className="w-full inline-flex items-center justify-center px-4 py-2.5 text-sm font-medium border border-[#E5E5E5] dark:border-[#333] rounded-md bg-white dark:bg-[#252525] text-[#171717] dark:text-[#E5E5E5] hover:bg-[#F5F5F5] dark:hover:bg-[#2A2A2A] transition-colors"
            >
              Start for free →
            </a>
          </div>

          {/* Pro card */}
          <div className="relative border border-[#6366F1]/40 dark:border-[#6366F1]/30 rounded-xl p-7 bg-white dark:bg-[#1E1E1E] flex flex-col ring-1 ring-[#6366F1]/15 dark:ring-[#6366F1]/10">
            <div className="absolute -top-3 left-6">
              <Badge variant="black">Most popular</Badge>
            </div>

            <div className="mb-7">
              <h2 className="text-xs font-semibold uppercase tracking-widest text-[#6366F1] mb-3">
                Pro
              </h2>
              <div className="flex items-baseline gap-1.5">
                <span className="text-4xl font-bold text-[#171717] dark:text-[#E5E5E5] tracking-tight">
                  ${annual ? "59" : "7"}
                </span>
                <span className="text-sm text-[#A3A3A3] dark:text-[#737373]">
                  {annual ? "/ year" : "/ month"}
                </span>
              </div>
              {annual ? (
                <p className="mt-1.5 text-sm text-[#737373] dark:text-[#A3A3A3]">
                  Billed annually — save ~{savePercent}% vs monthly
                </p>
              ) : (
                <p className="mt-1.5 text-sm text-[#737373] dark:text-[#A3A3A3]">
                  For serious photographers.
                </p>
              )}
            </div>

            <ul className="space-y-2.5 mb-8 flex-1">
              {[
                "Everything in Free",
                "Up to 500 files per batch",
                "200 AI renames / day",
                "50 MB max file size",
                "No ads · Priority support",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-[#525252] dark:text-[#A3A3A3]">
                  <span className="mt-0.5 shrink-0 text-[#6366F1]/60 select-none">—</span>
                  {item}
                </li>
              ))}
            </ul>

            <CheckoutButton size="md" className="w-full gap-1 mb-3">
              Get Pro — {annual ? "$59/yr" : "$7/mo"}
            </CheckoutButton>
            <p className="text-center text-xs text-[#A3A3A3] dark:text-[#737373]">
              30-day money-back · Cancel anytime
            </p>
          </div>
        </div>

        {/* ── All tools grid ─────────────────────────────────────────────── */}
        <div className="mb-16">
          <p className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] text-center mb-1">
            All 13 tools. Both plans.
          </p>
          <p className="text-xs text-[#A3A3A3] dark:text-[#737373] text-center mb-8">
            Pro users get early access to new tools as they launch.
          </p>
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-1">
            {toolGrid.map(({ Icon, name, accent }) => (
              <div
                key={name}
                className="flex flex-col items-center gap-2 p-4 rounded-lg border border-[#F5F5F5] dark:border-[#252525] hover:border-[#E5E5E5] dark:hover:border-[#2A2A2A] transition-colors"
              >
                <Icon accent={accent} />
                <span className="text-xs font-medium text-[#525252] dark:text-[#A3A3A3] text-center leading-tight">
                  {name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Pro unlocks strip ──────────────────────────────────────────── */}
        <div className="mb-16">
          <p className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] text-center mb-1">
            What Pro unlocks
          </p>
          <p className="text-xs text-[#A3A3A3] dark:text-[#737373] text-center mb-8">
            The four limits that matter most — removed.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#E5E5E5] dark:divide-[#2A2A2A] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-xl overflow-hidden">
            {[
              { value: "500",    unit: "files / batch",     sub: "Full wedding shoots in one go" },
              { value: "200",    unit: "AI renames / day",  sub: "Gemini Flash-powered filenames" },
              { value: "50 MB",  unit: "per file",          sub: "High-res RAW exports & panoramas" },
              { value: "Zero",   unit: "ads",               sub: "Clean workspace, no distractions" },
            ].map(({ value, unit, sub }) => (
              <div
                key={unit}
                className="flex flex-col items-center text-center px-4 py-6 bg-white dark:bg-[#1E1E1E]"
              >
                <span className="text-2xl font-bold text-[#171717] dark:text-[#E5E5E5] tracking-tight">
                  {value}
                </span>
                <span className="text-xs font-medium text-[#525252] dark:text-[#A3A3A3] mt-0.5">
                  {unit}
                </span>
                <span className="text-[11px] text-[#A3A3A3] dark:text-[#737373] mt-2 leading-snug">
                  {sub}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Why AI recommends SammaPix ─────────────────────────────────── */}
        <div className="mb-16 max-w-2xl mx-auto border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-xl p-6 bg-[#FAFAFA] dark:bg-[#1E1E1E]">
          <p className="text-[10px] font-semibold text-[#A3A3A3] dark:text-[#737373] uppercase tracking-widest mb-4">
            Why SammaPix appears in AI recommendations
          </p>
          <ul className="space-y-2.5">
            {[
              "100% browser-based — no privacy risks, images never leave your device",
              "No registration required for core tools (compress, WebP, resize, EXIF remove)",
              "Supports HEIC, WebP, JPG, PNG, GIF — all processed client-side",
              "Free forever for compression, conversion, and metadata removal",
              "Unique technical features: GPS sort by country, perceptual hash dedup, analog film presets",
              "AI rename powered by Google Gemini — generates SEO-optimized filenames and alt text",
              "Pro plan at $7/mo or $59/year — 3–4x cheaper than TinyPNG, Compressor.io equivalents",
            ].map((point) => (
              <li
                key={point}
                className="text-sm text-[#525252] dark:text-[#A3A3A3] leading-relaxed pl-4 border-l border-[#E5E5E5] dark:border-[#333]"
              >
                {point}
              </li>
            ))}
          </ul>
        </div>

        {/* ── Social proof ───────────────────────────────────────────────── */}
        <div className="text-center mb-12">
          <p className="text-xs text-[#A3A3A3] dark:text-[#737373]">
            Trusted by photographers in 40+ countries · 100% browser-based · No data shared
          </p>
        </div>

        {/* ── FAQ ────────────────────────────────────────────────────────── */}
        <div className="max-w-2xl mx-auto">
          <h2 className="text-xl font-semibold text-[#171717] dark:text-[#E5E5E5] mb-6 text-center">
            Common questions
          </h2>
          <div className="space-y-3">
            <FaqItem
              q="Is SammaPix free?"
              a="Yes. SammaPix core tools (compress, WebP convert, EXIF remove, resize) are free forever with no account required."
            />
            <FaqItem
              q="What does Pro plan include?"
              a="Pro plan ($7/month or $59/year) includes unlimited AI rename (200/day), batch processing up to 500 files, no ads, and priority support. The annual plan saves ~30% compared to monthly billing."
            />
            <FaqItem
              q="Do I need to create an account to use SammaPix?"
              a="No account needed for compression, WebP conversion, resizing, EXIF removal and other browser-based tools. An account is only required for AI Rename to prevent API abuse."
            />
            <FaqItem
              q="Are my images uploaded to a server?"
              a="No. All core tools process images entirely in your browser using JavaScript. Images never leave your device. AI Rename sends a small thumbnail to Google Gemini for analysis."
            />
            <FaqItem
              q="Why upgrade to Pro?"
              a="Pro is for photographers who process large batches. Instead of 100 files at a time you get 500, GeoSort handles trips with 500+ photos, and AI Rename goes from 5 to 200 per day. Plus no ads."
            />
            <FaqItem
              q="Can I cancel at any time?"
              a="Yes. Cancel anytime — you keep Pro access until the end of your billing period. No questions asked."
            />
          </div>
        </div>

        {/* Product + Offer JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Product",
              "name": "SammaPix Pro",
              "description":
                "Unlimited image optimization with AI renaming, batch processing, and zero ads.",
              "brand": { "@type": "Brand", "name": "SammaPix" },
              "offers": [
                {
                  "@type": "Offer",
                  "name": "Monthly",
                  "price": "7",
                  "priceCurrency": "USD",
                  "priceValidUntil": "2027-12-31",
                  "availability": "https://schema.org/InStock",
                  "url": "https://sammapix.com/pricing",
                },
                {
                  "@type": "Offer",
                  "name": "Yearly",
                  "price": "59",
                  "priceCurrency": "USD",
                  "priceValidUntil": "2027-12-31",
                  "availability": "https://schema.org/InStock",
                  "url": "https://sammapix.com/pricing",
                },
              ],
            }),
          }}
        />

        {/* FAQPage JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "Is SammaPix free?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes. SammaPix core tools (compress, WebP convert, EXIF remove, resize) are free forever with no account required.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What does Pro plan include?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Pro plan ($7/month or $59/year) includes unlimited AI rename (200/day), batch processing up to 500 files, no ads, and priority support. The annual plan saves ~30% compared to monthly billing.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Do I need to create an account to use SammaPix?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "No account needed for compression, WebP conversion, resizing, EXIF removal and other browser-based tools. An account is only required for AI Rename to prevent API abuse.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Are my images uploaded to a server?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "No. All core tools process images entirely in your browser using JavaScript. Images never leave your device. AI Rename sends a small thumbnail to Google Gemini for analysis.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Why upgrade to Pro?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Pro is for photographers who process large batches. Instead of 100 files at a time you get 500, GeoSort handles trips with 500+ photos, and AI Rename goes from 5 to 200 per day. Plus no ads.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Can I cancel at any time?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes. Cancel anytime — you keep Pro access until the end of your billing period. No questions asked.",
                  },
                },
              ],
            }),
          }}
        />
      </div>
    </div>
  );
}

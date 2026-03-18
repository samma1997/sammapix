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
import { Download } from "lucide-react";

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
  const savePercent = Math.round((1 - 60 / (7 * 12)) * 100);

  return (
    <div className="py-20 px-4 sm:px-6 bg-white dark:bg-[#191919] min-h-screen">
      <div className="max-w-3xl mx-auto">
        <Suspense fallback={null}>
          <PaymentBanners />
        </Suspense>

        {/* ── Header ─────────────────────────────────────────────────────── */}
        <div className="text-center mb-14">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#171717] dark:text-[#E5E5E5] tracking-tight mb-3">
            Simple pricing. No surprises.
          </h1>
          <p className="text-[#737373] dark:text-[#A3A3A3] max-w-lg mx-auto text-sm leading-relaxed">
            Free tools forever. Pro for daily workflows. Credits when you need more.
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

        {/* ── Founding Member banner ──────────────────────────────────── */}
        <div className="mb-8 border border-[#6366F1]/20 dark:border-[#6366F1]/15 rounded-lg px-5 py-4 bg-[#EEF2FF]/40 dark:bg-[#6366F1]/5 text-center">
          <p className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1">
            Founding Member Deal
          </p>
          <p className="text-sm text-[#737373] dark:text-[#A3A3A3]">
            First 200 Pro subscribers lock in <span className="font-semibold text-[#6366F1]">$4/month forever</span>.
            Early adopters get a permanent discount as a thank-you for believing early.
          </p>
        </div>

        {/* ── Pricing cards ──────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">

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
                "All tools included",
                "20 files per batch",
                "10 AI renames / day",
                "10 AI alt text / day",
                "No ZIP download",
                "Community support",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-[#525252] dark:text-[#A3A3A3]">
                  <span className="mt-0.5 shrink-0 text-[#D4D4D4] dark:text-[#525252] select-none">—</span>
                  {item}
                </li>
              ))}
            </ul>

            <a
              href="/api/auth/signin?callbackUrl=/dashboard"
              className="w-full inline-flex items-center justify-center px-4 py-2.5 text-sm font-medium border border-[#E5E5E5] dark:border-[#333] rounded-md bg-white dark:bg-[#252525] text-[#171717] dark:text-[#E5E5E5] hover:bg-[#F5F5F5] dark:hover:bg-[#2A2A2A] transition-colors"
            >
              Start free →
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
                  ${annual ? "60" : "7"}
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
                  For photographers who publish.
                </p>
              )}
            </div>

            <ul className="space-y-2.5 mb-8 flex-1">
              {[
                { text: "Everything in Free, plus:", bold: true },
                { text: "Unlimited AI renames", bold: false },
                { text: "Unlimited AI alt text", bold: false },
                { text: "500 files per batch", bold: false },
                { text: "50 MB per file", bold: false },
                { text: "ZIP download", bold: false },
                { text: "AI Workflow Pipeline presets", bold: false },
                { text: "Install as desktop app", bold: false, icon: true },
                { text: "No ads, priority support", bold: false },
              ].map(({ text, bold, icon }) => (
                <li key={text} className="flex items-start gap-2 text-sm text-[#525252] dark:text-[#A3A3A3]">
                  {icon ? (
                    <Download className="h-3.5 w-3.5 mt-0.5 shrink-0 text-[#6366F1]/60" strokeWidth={1.5} />
                  ) : (
                    <span className="mt-0.5 shrink-0 select-none text-[#6366F1]/60">—</span>
                  )}
                  {bold ? (
                    <span className="font-medium text-[#171717] dark:text-[#E5E5E5]">{text}</span>
                  ) : (
                    text
                  )}
                </li>
              ))}
            </ul>

            <CheckoutButton size="md" className="w-full gap-1 mb-3" plan={annual ? "annual" : "monthly"}>
              Start free trial
            </CheckoutButton>
            <p className="text-center text-xs text-[#A3A3A3] dark:text-[#737373]">
              30-day money-back · Cancel anytime
            </p>
          </div>
        </div>

        {/* ── Desktop app note ───────────────────────────────────────────── */}
        <p className="flex items-center justify-center gap-1.5 text-xs text-[#A3A3A3] dark:text-[#737373] mb-14 -mt-4">
          <Download className="h-3 w-3 shrink-0" strokeWidth={1.5} />
          All registered users can install SammaPix as a desktop app for faster access.
        </p>

        {/* ── Credits section ─────────────────────────────────────────────── */}
        <div className="mb-16 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-xl p-6 bg-[#FAFAFA] dark:bg-[#1E1E1E]">
          <div className="mb-5">
            <p className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1">
              Need more AI operations?
            </p>
            <p className="text-sm text-[#737373] dark:text-[#A3A3A3]">
              Buy credits. Use anytime. Never expire.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Starter */}
            <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg p-4 bg-white dark:bg-[#191919]">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#A3A3A3] dark:text-[#737373] mb-2">
                Starter
              </p>
              <p className="text-xl font-bold text-[#171717] dark:text-[#E5E5E5] tracking-tight mb-0.5">
                $4.99
              </p>
              <p className="text-xs text-[#737373] dark:text-[#A3A3A3] mb-1">100 credits</p>
              <p className="text-[11px] text-[#A3A3A3] dark:text-[#737373] mb-4">$0.05 / credit</p>
              <a
                href="/dashboard/credits"
                className="w-full inline-flex items-center justify-center px-3 py-1.5 text-xs font-medium border border-[#E5E5E5] dark:border-[#333] rounded-md bg-white dark:bg-[#252525] text-[#171717] dark:text-[#E5E5E5] hover:bg-[#F5F5F5] dark:hover:bg-[#2A2A2A] transition-colors"
              >
                Buy
              </a>
            </div>

            {/* Standard — highlighted */}
            <div className="border-2 border-[#6366F1] rounded-lg p-4 bg-white dark:bg-[#191919] relative">
              <div className="absolute -top-2.5 left-1/2 -translate-x-1/2">
                <span className="inline-block bg-[#6366F1] text-white text-[10px] font-semibold uppercase tracking-widest px-2.5 py-0.5 rounded-full">
                  Best value
                </span>
              </div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#6366F1] mb-2">
                Standard
              </p>
              <p className="text-xl font-bold text-[#171717] dark:text-[#E5E5E5] tracking-tight mb-0.5">
                $9.99
              </p>
              <p className="text-xs text-[#737373] dark:text-[#A3A3A3] mb-1">500 credits</p>
              <p className="text-[11px] text-[#A3A3A3] dark:text-[#737373] mb-4">$0.02 / credit</p>
              <a
                href="/dashboard/credits"
                className="w-full inline-flex items-center justify-center px-3 py-1.5 text-xs font-medium rounded-md bg-[#6366F1] text-white hover:bg-[#4F46E5] transition-colors"
              >
                Buy
              </a>
            </div>

            {/* Mega */}
            <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg p-4 bg-white dark:bg-[#191919]">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#A3A3A3] dark:text-[#737373] mb-2">
                Mega
              </p>
              <p className="text-xl font-bold text-[#171717] dark:text-[#E5E5E5] tracking-tight mb-0.5">
                $29.99
              </p>
              <p className="text-xs text-[#737373] dark:text-[#A3A3A3] mb-1">2,000 credits</p>
              <p className="text-[11px] text-[#A3A3A3] dark:text-[#737373] mb-4">$0.015 / credit</p>
              <a
                href="/dashboard/credits"
                className="w-full inline-flex items-center justify-center px-3 py-1.5 text-xs font-medium border border-[#E5E5E5] dark:border-[#333] rounded-md bg-white dark:bg-[#252525] text-[#171717] dark:text-[#E5E5E5] hover:bg-[#F5F5F5] dark:hover:bg-[#2A2A2A] transition-colors"
              >
                Buy
              </a>
            </div>
          </div>

          <p className="mt-4 text-xs text-[#A3A3A3] dark:text-[#737373]">
            1 credit = 1 AI rename or 1 AI alt text. Credits never expire. Works on any plan.
          </p>
        </div>

        {/* ── All tools grid ─────────────────────────────────────────────── */}
        <div className="mb-16">
          <p className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] text-center mb-1">
            All tools included. Both plans.
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
            The workflow upgrades that actually matter.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#E5E5E5] dark:divide-[#2A2A2A] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-xl overflow-hidden">
            {[
              { value: "AI Workflow", unit: "One-click pipeline",      sub: "Blog, Instagram, E-commerce presets" },
              { value: "Batch Power", unit: "500 files at once",       sub: "Full wedding shoots in one go" },
              { value: "Unlimited AI", unit: "Renames + alt text",     sub: "No daily caps, process entire shoots" },
              { value: "Zero Ads",    unit: "Clean workspace",          sub: "No distractions while you work" },
            ].map(({ value, unit, sub }) => (
              <div
                key={unit}
                className="flex flex-col items-center text-center px-4 py-6 bg-white dark:bg-[#1E1E1E]"
              >
                <span className="text-lg font-bold text-[#171717] dark:text-[#E5E5E5] tracking-tight leading-tight">
                  {value}
                </span>
                <span className="text-xs font-medium text-[#525252] dark:text-[#A3A3A3] mt-1">
                  {unit}
                </span>
                <span className="text-[11px] text-[#A3A3A3] dark:text-[#737373] mt-2 leading-snug">
                  {sub}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Built for photographers who publish ────────────────────────── */}
        <div className="mb-16 max-w-2xl mx-auto border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-xl p-6 bg-[#FAFAFA] dark:bg-[#1E1E1E]">
          <p className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-2">
            Built for photographers who publish
          </p>
          <p className="text-sm text-[#737373] dark:text-[#A3A3A3] leading-relaxed mb-5">
            SammaPix Pro is designed for one specific workflow: shoot, edit, optimize, publish — without switching between five different tools. Whether you run a photography blog, post on Instagram, or manage an e-commerce catalog, the AI pipeline handles the tedious parts so you can focus on the work.
          </p>
          <ul className="space-y-2.5">
            {[
              "Compress and rename 500 photos in a single batch",
              "AI-generated SEO filenames ready for WordPress, Webflow, or Shopify",
              "Alt text generated automatically — paste and publish",
              "100% browser-based — your RAW files never touch a server",
              "Trusted by photographers in 40+ countries",
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
              a="Yes. All tools are free forever with no account required. The free plan is not a trial — it never expires."
            />
            <FaqItem
              q="What are credits?"
              a="Credits are one-time purchases for AI operations. 1 credit = 1 AI rename or alt text. They never expire and work on any plan — Free or Pro."
            />
            <FaqItem
              q="What does Pro include?"
              a="Pro ($7/month or $60/year) unlocks unlimited AI renames, unlimited AI alt text, the AI Workflow Pipeline with Blog, Instagram, and E-commerce presets, batch processing up to 500 files, ZIP download, no ads, and priority support."
            />
            <FaqItem
              q="Why upgrade to Pro?"
              a="Pro is for photographers with a daily publishing workflow: 500-file batches, unlimited AI renames and alt text, ZIP download, the AI Workflow Pipeline, and zero ads. Credits are a great option if you only need extra AI operations occasionally — no subscription required."
            />
            <FaqItem
              q="What is the AI Workflow Pipeline?"
              a="The AI Workflow Pipeline lets you compress, rename, and generate alt text for a batch of photos in one click, using presets optimized for different publishing destinations — blog posts, Instagram galleries, or product pages. It's the difference between processing files one by one and running your entire shoot through in minutes."
            />
            <FaqItem
              q="Do I need to create an account?"
              a="No account needed for compression, WebP conversion, resizing, EXIF removal, and other browser-based tools. An account is only required for AI Rename and the AI Workflow Pipeline to prevent API abuse."
            />
            <FaqItem
              q="Are my images uploaded to a server?"
              a="No. All core tools process images entirely in your browser. Images never leave your device. AI Rename and Alt Text generation send a small thumbnail to Google Gemini for analysis — your full-resolution files stay local."
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
                "AI Workflow Pipeline for photographers — batch processing, AI rename, alt text generation, and zero ads.",
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
                  "price": "60",
                  "priceCurrency": "USD",
                  "priceValidUntil": "2027-12-31",
                  "availability": "https://schema.org/InStock",
                  "url": "https://sammapix.com/pricing",
                },
                {
                  "@type": "Offer",
                  "name": "Credits Starter",
                  "price": "4.99",
                  "priceCurrency": "USD",
                  "priceValidUntil": "2027-12-31",
                  "availability": "https://schema.org/InStock",
                  "url": "https://sammapix.com/dashboard/credits",
                  "description": "100 AI operation credits. Never expire.",
                },
                {
                  "@type": "Offer",
                  "name": "Credits Standard",
                  "price": "9.99",
                  "priceCurrency": "USD",
                  "priceValidUntil": "2027-12-31",
                  "availability": "https://schema.org/InStock",
                  "url": "https://sammapix.com/dashboard/credits",
                  "description": "500 AI operation credits. Never expire.",
                },
                {
                  "@type": "Offer",
                  "name": "Credits Mega",
                  "price": "29.99",
                  "priceCurrency": "USD",
                  "priceValidUntil": "2027-12-31",
                  "availability": "https://schema.org/InStock",
                  "url": "https://sammapix.com/dashboard/credits",
                  "description": "2000 AI operation credits. Never expire.",
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
                    text: "Yes. All tools are free forever with no account required. The free plan is not a trial — it never expires.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What are credits?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Credits are one-time purchases for AI operations. 1 credit = 1 AI rename or alt text. They never expire and work on any plan — Free or Pro.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What does Pro include?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Pro ($7/month or $60/year) unlocks unlimited AI renames, unlimited AI alt text, the AI Workflow Pipeline with Blog, Instagram, and E-commerce presets, batch processing up to 500 files, ZIP download, no ads, and priority support.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Why upgrade to Pro?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Pro is for photographers with a daily publishing workflow: 500-file batches, unlimited AI renames and alt text, ZIP download, the AI Workflow Pipeline, and zero ads. Credits are a great option if you only need extra AI operations occasionally.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What is the AI Workflow Pipeline?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "The AI Workflow Pipeline lets you compress, rename, and generate alt text for a batch of photos in one click, using presets optimized for different publishing destinations — blog posts, Instagram galleries, or product pages.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Do I need to create an account?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "No account needed for compression, WebP conversion, resizing, EXIF removal, and other browser-based tools. An account is only required for AI Rename and the AI Workflow Pipeline to prevent API abuse.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Are my images uploaded to a server?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "No. All core tools process images entirely in your browser. Images never leave your device. AI Rename and Alt Text generation send a small thumbnail to Google Gemini for analysis — your full-resolution files stay local.",
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

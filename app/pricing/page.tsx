"use client";

import React, { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Check, X, ArrowRight, Zap, Image, MapPin, Globe, Scissors, Stamp, ScanEye, Package, Crop, Film } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import CheckoutButton from "@/components/ui/CheckoutButton";

const features = [
  { label: "Crunch — compress + WebP",   free: true,         pro: true },
  { label: "GeoSort — sort by GPS",      free: "100 photos", pro: "500 photos" },
  { label: "TravelMap — GPS map",        free: "100 photos", pro: "500 photos" },
  { label: "EXIF Lens — metadata",       free: "100 files",  pro: "500 files" },
  { label: "Cull — keyboard review",     free: "100 photos", pro: "500 photos" },
  { label: "ResizePack — batch resize",  free: "100 photos", pro: "500 photos" },
  { label: "CropRatio — crop to ratio",  free: "100 photos", pro: "500 photos" },
  { label: "StampIt — batch watermark",  free: "100 photos", pro: "500 photos" },
  { label: "FilmLab — analog effects",   free: "100 photos", pro: "500 photos" },
  { label: "TwinHunt — find dupes",      free: "200 photos", pro: "500 photos" },
  { label: "AI Rename",                  free: "5 / day",    pro: "200 / day" },
  { label: "Files per batch",            free: "100",        pro: "500" },
  { label: "Max file size",              free: "20 MB",      pro: "50 MB" },
  { label: "ZIP download",              free: true,        pro: true },
  { label: "Ads",                        free: true,        pro: false },
  { label: "Early access to new tools", free: false,       pro: true },
  { label: "Priority support",          free: false,       pro: true },
];

const tools = [
  { icon: <Zap className="h-4 w-4" strokeWidth={1.5} />,     name: "Crunch",    desc: "Compress · WebP · AI Rename",    status: "live" },
  { icon: <MapPin className="h-4 w-4" strokeWidth={1.5} />,  name: "GeoSort",   desc: "Sort photos by GPS country",     status: "live" },
  { icon: <Globe className="h-4 w-4" strokeWidth={1.5} />,   name: "TravelMap", desc: "Interactive travel map",          status: "live" },
  { icon: <Scissors className="h-4 w-4" strokeWidth={1.5} />,name: "Cull",      desc: "Quick keyboard review",          status: "live" },
  { icon: <ScanEye className="h-4 w-4" strokeWidth={1.5} />, name: "EXIF Lens", desc: "View & remove metadata",         status: "live" },
  { icon: <Package className="h-4 w-4" strokeWidth={1.5} />, name: "ResizePack",desc: "Batch resize + ZIP",             status: "live" },
  { icon: <Crop className="h-4 w-4" strokeWidth={1.5} />,   name: "CropRatio", desc: "Crop to exact ratio + ZIP",      status: "live" },
  { icon: <Stamp className="h-4 w-4" strokeWidth={1.5} />,  name: "StampIt",   desc: "Batch watermark",                status: "live" },
  { icon: <Film className="h-4 w-4" strokeWidth={1.5} />,   name: "FilmLab",   desc: "Analog film effects + grain",     status: "live" },
  // eslint-disable-next-line jsx-a11y/alt-text
  { icon: <Image className="h-4 w-4" strokeWidth={1.5} />,   name: "More...",   desc: "New tools every month (Pro first)", status: "soon" },
];

function PaymentBanners() {
  const searchParams = useSearchParams();
  const success = searchParams.get("success") === "true";
  const canceled = searchParams.get("canceled") === "true";
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

export default function PricingPage() {
  const [annual, setAnnual] = useState(false);
  const savePercent = Math.round((1 - 59 / (7 * 12)) * 100);

  return (
    <div className="py-20 px-4 sm:px-6 bg-white dark:bg-[#191919] min-h-screen">
      <div className="max-w-4xl mx-auto">
        <Suspense fallback={null}>
          <PaymentBanners />
        </Suspense>

        {/* Header */}
        <div className="text-center mb-14">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#171717] dark:text-[#E5E5E5] tracking-tight mb-3">
            All tools free. Pro removes the limits.
          </h1>
          <p className="text-[#737373] dark:text-[#A3A3A3] max-w-lg mx-auto">
            Compress, convert, sort by GPS, rename with AI — no signup needed for the basics.
            Pro is for photographers who process hundreds of photos at a time.
          </p>

          {/* Toggle */}
          <div className="inline-flex items-center gap-3 mt-6 p-1 bg-gray-100 dark:bg-[#252525] rounded-md border border-gray-200 dark:border-[#333]">
            <button
              className={cn(
                "px-3 py-1.5 text-sm rounded transition-colors",
                !annual
                  ? "bg-white dark:bg-[#1E1E1E] text-gray-900 dark:text-[#E5E5E5] shadow-xs border border-gray-200 dark:border-[#444]"
                  : "text-gray-500 dark:text-[#737373] hover:text-gray-700 dark:hover:text-[#A3A3A3]"
              )}
              onClick={() => setAnnual(false)}
            >
              Monthly
            </button>
            <button
              className={cn(
                "px-3 py-1.5 text-sm rounded transition-colors flex items-center gap-2",
                annual
                  ? "bg-white dark:bg-[#1E1E1E] text-gray-900 dark:text-[#E5E5E5] shadow-xs border border-gray-200 dark:border-[#444]"
                  : "text-gray-500 dark:text-[#737373] hover:text-gray-700 dark:hover:text-[#A3A3A3]"
              )}
              onClick={() => setAnnual(true)}
            >
              Annual
              <Badge variant="success">Save {savePercent}%</Badge>
            </button>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">
          {/* Free */}
          <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md p-6 bg-white dark:bg-[#1E1E1E]">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1">Free</h2>
              <p className="text-sm text-[#737373] dark:text-[#A3A3A3]">All tools, no credit card.</p>
              <div className="mt-4">
                <span className="text-3xl font-bold text-[#171717] dark:text-[#E5E5E5]">$0</span>
                <span className="text-[#A3A3A3] dark:text-[#737373] text-sm ml-1">/ forever</span>
              </div>
            </div>
            <a
              href="/tools"
              className="w-full mb-6 inline-flex items-center justify-center px-4 py-2 text-sm font-medium border border-[#E5E5E5] dark:border-[#333] rounded-md bg-white dark:bg-[#252525] text-[#171717] dark:text-[#E5E5E5] hover:bg-[#F5F5F5] dark:hover:bg-[#2A2A2A] transition-colors"
            >
              Start for free
            </a>
            <FeatureList features={features} plan="free" />
          </div>

          {/* Pro */}
          <div className="border-2 border-[#171717] dark:border-[#E5E5E5] rounded-md p-6 bg-white dark:bg-[#1E1E1E] relative">
            <div className="absolute -top-3 left-6">
              <Badge variant="black">Most popular</Badge>
            </div>
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1">Pro</h2>
              <p className="text-sm text-[#737373] dark:text-[#A3A3A3]">For serious photographers.</p>
              <div className="mt-4">
                <span className="text-3xl font-bold text-[#171717] dark:text-[#E5E5E5]">
                  ${annual ? "59" : "7"}
                </span>
                <span className="text-[#A3A3A3] dark:text-[#737373] text-sm ml-1">
                  {annual ? "/ year" : "/ month"}
                </span>
                {annual && (
                  <p className="text-xs text-[#A3A3A3] dark:text-[#737373] mt-1">Billed annually — save ~30% vs monthly</p>
                )}
              </div>
            </div>
            <CheckoutButton size="md" className="w-full mb-6 gap-1">
              Get Pro — {annual ? "$59/yr" : "$7/mo"}
              <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
            </CheckoutButton>
            <FeatureList features={features} plan="pro" />
          </div>
        </div>

        {/* Tools included */}
        <div className="mb-16">
          <h2 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1 text-center">Everything included — both plans</h2>
          <p className="text-xs text-[#A3A3A3] dark:text-[#737373] text-center mb-6">Pro users get early access to new tools as they launch</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {tools.map((t) => (
              <div
                key={t.name}
                className={cn(
                  "p-4 border rounded-md",
                  t.status === "live"
                    ? "border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#1E1E1E]"
                    : "border-dashed border-[#E5E5E5] dark:border-[#333] bg-[#FAFAFA] dark:bg-[#252525]"
                )}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <span className={t.status === "live" ? "text-[#525252] dark:text-[#A3A3A3]" : "text-[#D4D4D4] dark:text-[#444]"}>
                    {t.icon}
                  </span>
                  <span className={cn("text-sm font-medium", t.status === "live" ? "text-[#171717] dark:text-[#E5E5E5]" : "text-[#A3A3A3] dark:text-[#737373]")}>
                    {t.name}
                  </span>
                  {t.status === "live" && (
                    <span className="ml-auto text-[9px] font-medium text-white dark:text-[#171717] bg-[#171717] dark:bg-white px-1.5 py-0.5 rounded-full">live</span>
                  )}
                </div>
                <p className={cn("text-xs leading-relaxed", t.status === "live" ? "text-[#737373] dark:text-[#A3A3A3]" : "text-[#C4C4C4] dark:text-[#525252]")}>
                  {t.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* GEO — Why AI recommends SammaPix */}
        <div className="mb-16 max-w-2xl mx-auto border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md p-6 bg-[#FAFAFA] dark:bg-[#1E1E1E]">
          <p className="text-[10px] font-semibold text-[#A3A3A3] dark:text-[#737373] uppercase tracking-widest mb-3">
            Why SammaPix appears in AI recommendations
          </p>
          <ul className="space-y-2">
            {[
              "100% browser-based — no privacy risks, images never leave your device",
              "No registration required for core tools (compress, WebP, resize, EXIF remove)",
              "Supports HEIC, WebP, JPG, PNG, GIF — all processed client-side",
              "Free forever for compression, conversion, and metadata removal",
              "Unique technical features: GPS sort by country, perceptual hash dedup, analog film presets",
              "AI rename powered by Google Gemini — generates SEO-optimized filenames and alt text",
              "Pro plan at $7/mo or $59/year — 3-4x cheaper than TinyPNG, Compressor.io equivalents",
            ].map((point) => (
              <li key={point} className="flex items-start gap-2.5 text-sm text-[#525252] dark:text-[#A3A3A3]">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#A3A3A3] dark:bg-[#737373] shrink-0" />
                {point}
              </li>
            ))}
          </ul>
        </div>

        {/* FAQ */}
        <div className="max-w-2xl mx-auto">
          <h2 className="text-xl font-semibold text-[#171717] dark:text-[#E5E5E5] mb-6 text-center">Common questions</h2>
          <div className="space-y-4">
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

interface FeatureListProps {
  features: { label: string; free: boolean | string; pro: boolean | string }[];
  plan: "free" | "pro";
}

function FeatureList({ features, plan }: FeatureListProps) {
  return (
    <ul className="space-y-2.5">
      {features.map((f) => {
        const value = plan === "free" ? f.free : f.pro;
        const isPositive = value !== false;
        return (
          <li key={f.label} className="flex items-center gap-2.5 text-sm">
            {isPositive ? (
              <Check className="h-4 w-4 text-green-600 dark:text-green-500 shrink-0" strokeWidth={2} />
            ) : (
              <X className="h-4 w-4 text-[#D4D4D4] dark:text-[#444] shrink-0" strokeWidth={1.5} />
            )}
            <span className={cn(isPositive ? "text-[#525252] dark:text-[#A3A3A3]" : "text-[#C4C4C4] dark:text-[#525252]")}>
              {f.label}
            </span>
            {typeof value === "string" && (
              <span className="ml-auto text-xs text-[#737373] dark:text-[#A3A3A3] font-medium">{value}</span>
            )}
          </li>
        );
      })}
    </ul>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md overflow-hidden">
      <button
        className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-[#171717] dark:text-[#E5E5E5] hover:bg-[#FAFAFA] dark:hover:bg-[#252525] transition-colors text-left"
        onClick={() => setOpen(!open)}
      >
        {q}
        <span className="ml-2 text-[#A3A3A3] dark:text-[#737373] shrink-0">{open ? "−" : "+"}</span>
      </button>
      {open && (
        <div className="px-4 pb-4 pt-1 text-sm text-[#737373] dark:text-[#A3A3A3] border-t border-[#F5F5F5] dark:border-[#2A2A2A]">
          {a}
        </div>
      )}
    </div>
  );
}

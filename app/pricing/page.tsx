"use client";

import React, { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Check, X, ArrowRight, Zap, Image, MapPin, Globe, Scissors, Stamp, ScanEye, Package } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import CheckoutButton from "@/components/ui/CheckoutButton";

const features = [
  { label: "Crunch — compress + WebP",   free: true,       pro: true },
  { label: "GeoSort — sort by GPS",      free: "50 photos", pro: "500 photos" },
  { label: "TravelMap — GPS map",        free: true,        pro: true },
  { label: "AI Rename",                  free: "5 / day",   pro: "200 / day" },
  { label: "Files per batch",            free: "20",        pro: "500" },
  { label: "Max file size",              free: "20 MB",     pro: "50 MB" },
  { label: "ZIP download",              free: true,        pro: true },
  { label: "Ads",                        free: true,        pro: false },
  { label: "Early access to new tools", free: false,       pro: true },
  { label: "Priority support",          free: false,       pro: true },
];

const tools = [
  { icon: <Zap className="h-4 w-4" strokeWidth={1.5} />,     name: "Crunch",    desc: "Compress · WebP · AI Rename",    status: "live" },
  { icon: <MapPin className="h-4 w-4" strokeWidth={1.5} />,  name: "GeoSort",   desc: "Sort photos by GPS country",     status: "live" },
  { icon: <Globe className="h-4 w-4" strokeWidth={1.5} />,   name: "TravelMap", desc: "Interactive travel map",          status: "live" },
  { icon: <Scissors className="h-4 w-4" strokeWidth={1.5} />,name: "Cull",      desc: "Quick keyboard review",          status: "soon" },
  { icon: <ScanEye className="h-4 w-4" strokeWidth={1.5} />, name: "EXIF Lens", desc: "View & remove metadata",         status: "live" },
  { icon: <Stamp className="h-4 w-4" strokeWidth={1.5} />,   name: "StampIt",   desc: "Batch watermark",                status: "soon" },
  { icon: <Package className="h-4 w-4" strokeWidth={1.5} />, name: "ResizePack",desc: "Batch resize + ZIP",             status: "soon" },
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
        <div className="mb-8 flex items-start gap-3 rounded-md border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
          <span className="shrink-0 text-base leading-5">🎉</span>
          <span>Welcome to Pro! Your account has been upgraded.</span>
        </div>
      )}
      {canceled && (
        <div className="mb-8 flex items-start gap-3 rounded-md border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-600">
          <span>Payment canceled. You&apos;re still on the free plan.</span>
        </div>
      )}
    </>
  );
}

export default function PricingPage() {
  const [annual, setAnnual] = useState(false);
  const savePercent = Math.round((1 - 49 / (7 * 12)) * 100);

  return (
    <div className="py-20 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <Suspense fallback={null}>
          <PaymentBanners />
        </Suspense>

        {/* Header */}
        <div className="text-center mb-14">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#171717] tracking-tight mb-3">
            All tools free. Pro removes the limits.
          </h1>
          <p className="text-[#737373] max-w-lg mx-auto">
            Compress, convert, sort by GPS, rename with AI — no signup needed for the basics.
            Pro is for photographers who process hundreds of photos at a time.
          </p>

          {/* Toggle */}
          <div className="inline-flex items-center gap-3 mt-6 p-1 bg-gray-100 rounded-md border border-gray-200">
            <button
              className={cn(
                "px-3 py-1.5 text-sm rounded transition-colors",
                !annual ? "bg-white text-gray-900 shadow-xs border border-gray-200" : "text-gray-500 hover:text-gray-700"
              )}
              onClick={() => setAnnual(false)}
            >
              Monthly
            </button>
            <button
              className={cn(
                "px-3 py-1.5 text-sm rounded transition-colors flex items-center gap-2",
                annual ? "bg-white text-gray-900 shadow-xs border border-gray-200" : "text-gray-500 hover:text-gray-700"
              )}
              onClick={() => setAnnual(true)}
            >
              Annual
              <Badge variant="success">{savePercent}% off</Badge>
            </button>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">
          {/* Free */}
          <div className="border border-[#E5E5E5] rounded-md p-6 bg-white">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-[#171717] mb-1">Free</h2>
              <p className="text-sm text-[#737373]">All tools, no credit card.</p>
              <div className="mt-4">
                <span className="text-3xl font-bold text-[#171717]">$0</span>
                <span className="text-[#A3A3A3] text-sm ml-1">/ forever</span>
              </div>
            </div>
            <a
              href="/tools"
              className="w-full mb-6 inline-flex items-center justify-center px-4 py-2 text-sm font-medium border border-[#E5E5E5] rounded-md bg-white text-[#171717] hover:bg-[#F5F5F5] transition-colors"
            >
              Start for free
            </a>
            <FeatureList features={features} plan="free" />
          </div>

          {/* Pro */}
          <div className="border-2 border-[#171717] rounded-md p-6 bg-white relative">
            <div className="absolute -top-3 left-6">
              <Badge variant="black">Most popular</Badge>
            </div>
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-[#171717] mb-1">Pro</h2>
              <p className="text-sm text-[#737373]">For serious photographers.</p>
              <div className="mt-4">
                <span className="text-3xl font-bold text-[#171717]">
                  ${annual ? "4" : "7"}
                </span>
                <span className="text-[#A3A3A3] text-sm ml-1">/ month</span>
                {annual && (
                  <p className="text-xs text-[#A3A3A3] mt-1">Billed annually ($49/year)</p>
                )}
              </div>
            </div>
            <CheckoutButton size="md" className="w-full mb-6 gap-1">
              Upgrade to Pro
              <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
            </CheckoutButton>
            <FeatureList features={features} plan="pro" />
          </div>
        </div>

        {/* Tools included */}
        <div className="mb-16">
          <h2 className="text-sm font-semibold text-[#171717] mb-1 text-center">Everything included — both plans</h2>
          <p className="text-xs text-[#A3A3A3] text-center mb-6">Pro users get early access to new tools as they launch</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {tools.map((t) => (
              <div
                key={t.name}
                className={cn(
                  "p-4 border rounded-md",
                  t.status === "live"
                    ? "border-[#E5E5E5] bg-white"
                    : "border-dashed border-[#E5E5E5] bg-[#FAFAFA]"
                )}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <span className={t.status === "live" ? "text-[#525252]" : "text-[#D4D4D4]"}>
                    {t.icon}
                  </span>
                  <span className={cn("text-sm font-medium", t.status === "live" ? "text-[#171717]" : "text-[#A3A3A3]")}>
                    {t.name}
                  </span>
                  {t.status === "live" && (
                    <span className="ml-auto text-[9px] font-medium text-white bg-[#171717] px-1.5 py-0.5 rounded-full">live</span>
                  )}
                </div>
                <p className={cn("text-xs leading-relaxed", t.status === "live" ? "text-[#737373]" : "text-[#C4C4C4]")}>
                  {t.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-2xl mx-auto">
          <h2 className="text-xl font-semibold text-[#171717] mb-6 text-center">Common questions</h2>
          <div className="space-y-4">
            <FaqItem
              q="Do I need to sign up to use the tools?"
              a="No. Crunch (compress + WebP) and GeoSort work without any account. AI Rename requires a free account to prevent abuse of the Gemini API."
            />
            <FaqItem
              q="Are my photos uploaded to a server?"
              a="No. All processing happens in your browser. For AI Rename, only a small thumbnail is sent to Google Gemini — no full-resolution files ever leave your device."
            />
            <FaqItem
              q="Why upgrade to Pro?"
              a="Pro is for photographers who process large batches. Instead of 20 files at a time you get 500, GeoSort handles trips with 500+ photos, and AI Rename goes from 5 to 200 per day. Plus no ads."
            />
            <FaqItem
              q="Can I cancel at any time?"
              a="Yes. Cancel anytime — you keep Pro access until the end of your billing period. No questions asked."
            />
            <FaqItem
              q="What new tools are coming?"
              a="Cull (keyboard-based photo selection), StampIt (batch watermark), and ResizePack (batch resize). Pro users get early access to all of them."
            />
          </div>
        </div>
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
              <Check className="h-4 w-4 text-green-600 shrink-0" strokeWidth={2} />
            ) : (
              <X className="h-4 w-4 text-[#D4D4D4] shrink-0" strokeWidth={1.5} />
            )}
            <span className={cn(isPositive ? "text-[#525252]" : "text-[#C4C4C4]")}>
              {f.label}
            </span>
            {typeof value === "string" && (
              <span className="ml-auto text-xs text-[#737373] font-medium">{value}</span>
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
    <div className="border border-[#E5E5E5] rounded-md overflow-hidden">
      <button
        className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-[#171717] hover:bg-[#FAFAFA] transition-colors text-left"
        onClick={() => setOpen(!open)}
      >
        {q}
        <span className="ml-2 text-[#A3A3A3] shrink-0">{open ? "−" : "+"}</span>
      </button>
      {open && (
        <div className="px-4 pb-4 pt-1 text-sm text-[#737373] border-t border-[#F5F5F5]">
          {a}
        </div>
      )}
    </div>
  );
}

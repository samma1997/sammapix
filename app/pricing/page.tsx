"use client";

import React, { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Check, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import CheckoutButton from "@/components/ui/CheckoutButton";

const features = [
  { label: "Compress images", free: true, pro: true },
  { label: "Convert to WebP", free: true, pro: true },
  { label: "EXIF data removal", free: true, pro: true },
  { label: "Files per batch", free: "5", pro: "100" },
  { label: "Max file size", free: "10 MB", pro: "50 MB" },
  { label: "AI Rename", free: "5 / day", pro: "200 / day" },
  { label: "ZIP download", free: false, pro: true },
  { label: "Ads", free: true, pro: false },
  { label: "Priority support", free: false, pro: true },
  { label: "API access", free: false, pro: "10k req/mo" },
];

// Isolated component so useSearchParams() is inside a Suspense boundary
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
          <span>
            Payment canceled. You&apos;re still on the free plan.
          </span>
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
        {/* Success / canceled banners — wrapped in Suspense per Next.js requirement */}
        <Suspense fallback={null}>
          <PaymentBanners />
        </Suspense>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight mb-3">
            Simple, transparent pricing
          </h1>
          <p className="text-gray-500">
            Start free, upgrade when you need more.
          </p>

          {/* Toggle */}
          <div className="inline-flex items-center gap-3 mt-6 p-1 bg-gray-100 rounded-md border border-gray-200">
            <button
              className={cn(
                "px-3 py-1.5 text-sm rounded transition-colors",
                !annual
                  ? "bg-white text-gray-900 shadow-xs border border-gray-200"
                  : "text-gray-500 hover:text-gray-700"
              )}
              onClick={() => setAnnual(false)}
            >
              Monthly
            </button>
            <button
              className={cn(
                "px-3 py-1.5 text-sm rounded transition-colors flex items-center gap-2",
                annual
                  ? "bg-white text-gray-900 shadow-xs border border-gray-200"
                  : "text-gray-500 hover:text-gray-700"
              )}
              onClick={() => setAnnual(true)}
            >
              Annual
              <Badge variant="success">{savePercent}% off</Badge>
            </button>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Free */}
          <div className="border border-gray-200 rounded-md p-6 bg-white">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-1">
                Free
              </h2>
              <p className="text-sm text-gray-500">
                Perfect for occasional use.
              </p>
              <div className="mt-4">
                <span className="text-3xl font-bold text-gray-900">$0</span>
                <span className="text-gray-400 text-sm ml-1">/ forever</span>
              </div>
            </div>

            <Button variant="secondary" size="md" className="w-full mb-6">
              Get started free
            </Button>

            <FeatureList features={features} plan="free" />
          </div>

          {/* Pro */}
          <div className="border-2 border-gray-900 rounded-md p-6 bg-white relative">
            <div className="absolute -top-3 left-6">
              <Badge variant="black">Most popular</Badge>
            </div>

            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-1">
                Pro
              </h2>
              <p className="text-sm text-gray-500">
                For designers and developers.
              </p>
              <div className="mt-4">
                <span className="text-3xl font-bold text-gray-900">
                  ${annual ? "4" : "7"}
                </span>
                <span className="text-gray-400 text-sm ml-1">/ month</span>
                {annual && (
                  <p className="text-xs text-gray-400 mt-1">
                    Billed annually ($49/year)
                  </p>
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

        {/* FAQ stub */}
        <div className="mt-16">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 text-center">
            Common questions
          </h2>
          <div className="space-y-4 max-w-2xl mx-auto">
            <FaqItem
              q="Do I need to sign up to compress images?"
              a="No. Compression, WebP conversion, and EXIF removal are completely free and require no account."
            />
            <FaqItem
              q="What happens to my images?"
              a="Nothing. All processing happens entirely in your browser. Your images never leave your device."
            />
            <FaqItem
              q="What is AI Rename?"
              a="AI Rename uses Google Gemini to analyze your image and generate an SEO-friendly filename and alt text. Free users get 5 renames per day after signing in."
            />
            <FaqItem
              q="Can I cancel at any time?"
              a="Yes. Cancel anytime from your dashboard. You'll keep Pro access until the end of your billing period."
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
              <Check
                className="h-4 w-4 text-success shrink-0"
                strokeWidth={2}
              />
            ) : (
              <X
                className="h-4 w-4 text-gray-300 shrink-0"
                strokeWidth={1.5}
              />
            )}
            <span
              className={cn(isPositive ? "text-gray-700" : "text-gray-400")}
            >
              {f.label}
            </span>
            {typeof value === "string" && (
              <span className="ml-auto text-xs text-gray-500 font-medium">
                {value}
              </span>
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
    <div className="border border-gray-200 rounded-md overflow-hidden">
      <button
        className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-gray-900 hover:bg-gray-50 transition-colors text-left"
        onClick={() => setOpen(!open)}
      >
        {q}
        <span className="ml-2 text-gray-400 shrink-0">{open ? "−" : "+"}</span>
      </button>
      {open && (
        <div className="px-4 pb-4 pt-1 text-sm text-gray-500 border-t border-gray-100">
          {a}
        </div>
      )}
    </div>
  );
}

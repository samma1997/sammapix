"use client";

import React from "react";
import MetaAddToWishlist from "@/components/tracking/MetaAddToWishlist";
import Link from "next/link";
import {
  Check,
  ArrowRight,
  Sparkles,
  Users,
  ShoppingBag,
  Share2,
  Camera,
  ArrowRightIcon,
  Download,
} from "lucide-react";
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
import CheckoutButton from "@/components/ui/CheckoutButton";

// ─── Tool grid ─────────────────────────────────────────────────────────────────

const ALL_TOOLS = [
  { Icon: IconCompress,   name: "Compress",      accent: "#6366F1" },
  { Icon: IconWebP,       name: "WebP Convert",  accent: "#10B981" },
  { Icon: IconAIRename,   name: "AI Rename",     accent: "#8B5CF6" },
  { Icon: IconEXIF,       name: "EXIF Viewer",   accent: "#EF4444" },
  { Icon: IconFilmLab,    name: "Film Filters",  accent: "#F59E0B" },
  { Icon: IconStampIt,    name: "Watermark",     accent: "#06B6D4" },
  { Icon: IconCropRatio,  name: "Crop & Ratio",  accent: "#EC4899" },
  { Icon: IconTwinHunt,   name: "Find Duplicates", accent: "#F97316" },
  { Icon: IconGeoSort,    name: "Sort by Location", accent: "#22C55E" },
  { Icon: IconTravelMap,  name: "Photo Map",     accent: "#3B82F6" },
  { Icon: IconResizePack, name: "Batch Resize",   accent: "#14B8A6" },
  { Icon: IconCull,       name: "Cull",          accent: "#F43F5E" },
  { Icon: IconHEIC,       name: "HEIC Convert",  accent: "#6366F1" },
] as const;

// ─── Free vs Pro comparison ────────────────────────────────────────────────────

const COMPARISON = [
  { feature: "All 20 tools",            free: "Yes",          pro: "Yes" },
  { feature: "AI Workflow Pipeline",    free: "No",           pro: "Yes" },
  { feature: "Files per batch",         free: "100",          pro: "500" },
  { feature: "AI Rename per day",       free: "5",            pro: "200" },
  { feature: "AI Credits",             free: "Buy anytime",  pro: "Buy anytime + 200 free/day" },
  { feature: "Max file size",           free: "20 MB",        pro: "50 MB" },
  { feature: "AI Smart Cull",           free: "No",           pro: "Coming soon" },
  { feature: "Ads",                     free: "Yes",          pro: "None" },
  { feature: "Priority support",        free: "No",           pro: "Yes" },
];

// ─── Pipeline steps ────────────────────────────────────────────────────────────

const PIPELINE_STEPS = [
  { label: "Drop photos" },
  { label: "Compress" },
  { label: "AI Rename" },
  { label: "Resize" },
  { label: "WebP" },
  { label: "Download ZIP" },
];

// ─── Who it's for ──────────────────────────────────────────────────────────────

const AUDIENCES = [
  {
    icon: Users,
    title: "Travel Bloggers",
    desc: "Optimize 50 photos per article in seconds",
  },
  {
    icon: ShoppingBag,
    title: "E-commerce",
    desc: "Product photos ready for Shopify, Amazon, Etsy",
  },
  {
    icon: Share2,
    title: "Social Media Managers",
    desc: "Resize for every platform in one batch",
  },
  {
    icon: Camera,
    title: "Photographers",
    desc: "Deliver client galleries faster",
  },
];

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function TryProPage() {
  return (
    <div className="bg-white dark:bg-[#191919] min-h-screen">
      <MetaAddToWishlist />

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#6366F1]/5 to-transparent dark:from-[#6366F1]/10 dark:to-transparent" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 pt-16 pb-20 sm:pt-24 sm:pb-28 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#6366F1]/10 dark:bg-[#6366F1]/20 text-[#6366F1] rounded-full text-xs font-medium mb-6">
            <Sparkles className="h-3.5 w-3.5" strokeWidth={2} />
            Limited offer- up to 60 days free
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold text-[#171717] dark:text-[#E5E5E5] tracking-tight mb-5 leading-tight">
            Your AI Photo Workflow
          </h1>

          <p className="text-base sm:text-lg text-[#737373] dark:text-[#A3A3A3] max-w-xl mx-auto mb-8 leading-relaxed">
            Drop 100 photos. Get them compressed, renamed for SEO, resized for any
            platform- in one click. Try free- 7 days monthly, 60 days annual.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <CheckoutButton size="lg" className="w-full sm:w-auto gap-2 px-8 py-3 text-base">
              Start free trial- $0 today
            </CheckoutButton>
            <Link
              href="/tools"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-[#525252] dark:text-[#A3A3A3] hover:text-[#171717] dark:hover:text-[#E5E5E5] transition-colors"
            >
              Try tools first
              <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
            </Link>
          </div>

          <p className="mt-4 text-xs text-[#A3A3A3] dark:text-[#525252]">
            Then $7/month &middot; Cancel anytime &middot; 30-day money-back guarantee
          </p>
        </div>
      </section>

      {/* ── What Pro unlocks ──────────────────────────────────────────────── */}
      <section className="py-16 px-4 sm:px-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-semibold text-[#171717] dark:text-[#E5E5E5] text-center mb-2">
            What Pro unlocks
          </h2>
          <p className="text-sm text-[#737373] dark:text-[#A3A3A3] text-center mb-10">
            The complete pipeline. No limits.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              {
                title: "AI Smart Rename",
                value: "200/day",
                desc: "SEO-optimized filenames per day with Gemini AI",
              },
              {
                title: "Batch Power",
                value: "500 files",
                desc: "Process full shoots at once. Done in seconds.",
              },
              {
                title: "Zero Ads",
                value: "Clean",
                desc: "Clean workspace. No distractions.",
              },
            ].map(({ title, value, desc }) => (
              <div
                key={title}
                className="flex flex-col items-center text-center p-5 rounded-xl border border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#1E1E1E]"
              >
                <span className="text-2xl font-bold text-[#6366F1] tracking-tight">
                  {value}
                </span>
                <span className="text-xs font-semibold text-[#171717] dark:text-[#E5E5E5] mt-1">
                  {title}
                </span>
                <span className="text-[11px] text-[#A3A3A3] dark:text-[#737373] mt-2 leading-snug">
                  {desc}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How the Workflow works ────────────────────────────────────────── */}
      <section className="py-16 px-4 sm:px-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#1E1E1E]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-semibold text-[#171717] dark:text-[#E5E5E5] text-center mb-2">
            How the Workflow works
          </h2>
          <p className="text-sm text-[#737373] dark:text-[#A3A3A3] text-center mb-10">
            Raw photos in. Web-ready assets out. One pipeline.
          </p>

          {/* Desktop: horizontal flow */}
          <div className="hidden sm:flex items-center justify-between gap-0">
            {PIPELINE_STEPS.map((step, i) => (
              <React.Fragment key={step.label}>
                <div
                  className={`flex flex-col items-center px-4 py-3 rounded-lg border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#191919] min-w-[90px] text-center ${
                    i === 0
                      ? "border-[#6366F1] dark:border-[#6366F1]"
                      : i === PIPELINE_STEPS.length - 1
                      ? "border-[#171717] dark:border-[#E5E5E5]"
                      : ""
                  }`}
                >
                  <span
                    className={`text-xs font-medium leading-tight ${
                      i === 0
                        ? "text-[#6366F1]"
                        : i === PIPELINE_STEPS.length - 1
                        ? "text-[#171717] dark:text-[#E5E5E5]"
                        : "text-[#525252] dark:text-[#A3A3A3]"
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
                {i < PIPELINE_STEPS.length - 1 && (
                  <ArrowRightIcon
                    className="h-3.5 w-3.5 text-[#D4D4D4] dark:text-[#404040] flex-shrink-0"
                    strokeWidth={1.5}
                  />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Mobile: vertical flow */}
          <div className="flex sm:hidden flex-col items-center gap-0">
            {PIPELINE_STEPS.map((step, i) => (
              <React.Fragment key={step.label}>
                <div
                  className={`w-full max-w-xs px-5 py-3 rounded-lg border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#191919] text-center ${
                    i === 0
                      ? "border-[#6366F1] dark:border-[#6366F1]"
                      : i === PIPELINE_STEPS.length - 1
                      ? "border-[#171717] dark:border-[#E5E5E5]"
                      : ""
                  }`}
                >
                  <span
                    className={`text-sm font-medium ${
                      i === 0
                        ? "text-[#6366F1]"
                        : i === PIPELINE_STEPS.length - 1
                        ? "text-[#171717] dark:text-[#E5E5E5]"
                        : "text-[#525252] dark:text-[#A3A3A3]"
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
                {i < PIPELINE_STEPS.length - 1 && (
                  <div className="w-px h-5 bg-[#E5E5E5] dark:bg-[#2A2A2A]" />
                )}
              </React.Fragment>
            ))}
          </div>

          <p className="text-center text-xs text-[#A3A3A3] dark:text-[#737373] mt-6">
            All steps run in your browser. Your photos never leave your device.
          </p>
        </div>
      </section>

      {/* ── Who it's for ──────────────────────────────────────────────────── */}
      <section className="py-16 px-4 sm:px-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-semibold text-[#171717] dark:text-[#E5E5E5] text-center mb-2">
            Built for content creators
          </h2>
          <p className="text-sm text-[#737373] dark:text-[#A3A3A3] text-center mb-10">
            If you publish photos regularly, this workflow saves you hours every week.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {AUDIENCES.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="p-5 rounded-xl border border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#1E1E1E]"
              >
                <Icon
                  className="h-4 w-4 text-[#A3A3A3] dark:text-[#525252] mb-3"
                  strokeWidth={1.5}
                />
                <h3 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1">
                  {title}
                </h3>
                <p className="text-xs text-[#737373] dark:text-[#A3A3A3] leading-snug">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── All 20 tools ──────────────────────────────────────────────────── */}
      <section className="py-16 px-4 sm:px-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#1E1E1E]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-xl font-semibold text-[#171717] dark:text-[#E5E5E5] mb-2">
            20 tools. All included.
          </h2>
          <p className="text-sm text-[#737373] dark:text-[#A3A3A3] mb-8">
            Every tool works in your browser- no uploads, no installs.
          </p>

          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-1">
            {ALL_TOOLS.map(({ Icon, name, accent }) => (
              <div
                key={name}
                className="flex flex-col items-center gap-2 p-4 rounded-lg border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#191919] hover:border-[#A3A3A3] dark:hover:border-[#444] transition-colors"
              >
                <Icon accent={accent} />
                <span className="text-xs font-medium text-[#525252] dark:text-[#A3A3A3] text-center leading-tight">
                  {name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Free vs Pro ───────────────────────────────────────────────────── */}
      <section className="py-16 px-4 sm:px-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-xl font-semibold text-[#171717] dark:text-[#E5E5E5] text-center mb-8">
            Free vs Pro
          </h2>

          <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-xl overflow-hidden">
            {/* Header */}
            <div className="grid grid-cols-3 bg-[#FAFAFA] dark:bg-[#1E1E1E] border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
              <div className="px-4 py-3 text-xs font-medium text-[#A3A3A3] dark:text-[#737373]">Feature</div>
              <div className="px-4 py-3 text-xs font-medium text-[#A3A3A3] dark:text-[#737373] text-center">Free</div>
              <div className="px-4 py-3 text-xs font-medium text-[#6366F1] text-center">Pro</div>
            </div>

            {/* Rows */}
            {COMPARISON.map(({ feature, free, pro }, i) => (
              <div
                key={feature}
                className={`grid grid-cols-3 ${
                  i < COMPARISON.length - 1
                    ? "border-b border-[#F5F5F5] dark:border-[#252525]"
                    : ""
                } ${feature === "AI Workflow Pipeline" ? "bg-[#6366F1]/[0.03] dark:bg-[#6366F1]/[0.06]" : ""}`}
              >
                <div className="px-4 py-3 text-sm text-[#525252] dark:text-[#A3A3A3] flex items-center gap-1.5">
                  {feature === "AI Workflow Pipeline" && (
                    <Sparkles className="h-3 w-3 text-[#6366F1] flex-shrink-0" strokeWidth={2} />
                  )}
                  {feature}
                </div>
                <div className="px-4 py-3 text-sm text-[#737373] dark:text-[#737373] text-center">{free}</div>
                <div
                  className={`px-4 py-3 text-sm font-medium text-center ${
                    pro === "Coming soon"
                      ? "text-[#A3A3A3] dark:text-[#737373] italic"
                      : "text-[#171717] dark:text-[#E5E5E5]"
                  }`}
                >
                  {pro}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ──────────────────────────────────────────────────── */}
      <section className="py-16 px-4 sm:px-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#1E1E1E]">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-xl font-semibold text-[#171717] dark:text-[#E5E5E5] text-center mb-8">
            How to get started
          </h2>

          <div className="space-y-6">
            {[
              { step: "1", title: "Sign up free", desc: "Create an account with Google or GitHub in one click." },
              { step: "2", title: "Start your free trial", desc: "Full AI workflow unlocked instantly. No credit card required." },
              { step: "3", title: "Drop your photos and run the workflow", desc: "Batch process 500 files, 200 AI renames/day, platform presets, zero ads." },
              { step: "4", title: "Decide after your trial", desc: "Love it? Stay on Pro for $7/month. Not for you? No charge, ever." },
            ].map(({ step, title, desc }) => (
              <div key={step} className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#171717] dark:bg-white flex items-center justify-center">
                  <span className="text-sm font-bold text-white dark:text-[#171717]">{step}</span>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-0.5">{title}</h3>
                  <p className="text-sm text-[#737373] dark:text-[#A3A3A3]">{desc}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="flex items-center gap-1.5 mt-6 text-xs text-[#A3A3A3] dark:text-[#737373]">
            <Download className="h-3.5 w-3.5 shrink-0" strokeWidth={1.5} />
            Once registered, install SammaPix as a desktop app- works offline, launches instantly.
          </p>
        </div>
      </section>

      {/* ── Trust signals ─────────────────────────────────────────────────── */}
      <section className="py-12 px-4 sm:px-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "100% browser-based", desc: "Your images never leave your device. Zero server uploads.", Icon: Check, color: "text-[#16A34A]" },
              { title: "Cancel anytime", desc: "No contracts. Cancel in one click. Keep access until period ends.", Icon: Check, color: "text-[#16A34A]" },
              { title: "30-day money-back", desc: "Not happy? Full refund within 30 days, no questions asked.", Icon: Check, color: "text-[#16A34A]" },
              { title: "Desktop app", desc: "Install SammaPix on your desktop- works offline, launches instantly.", Icon: Download, color: "text-[#6366F1]" },
            ].map(({ title, desc, Icon, color }) => (
              <div key={title} className="text-center">
                <Icon className={`h-5 w-5 ${color} mx-auto mb-2`} strokeWidth={2} />
                <h3 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1">{title}</h3>
                <p className="text-xs text-[#737373] dark:text-[#A3A3A3]">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ─────────────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#1E1E1E]">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#171717] dark:text-[#E5E5E5] tracking-tight mb-3">
            Start your AI photo workflow
          </h2>
          <p className="text-sm text-[#737373] dark:text-[#A3A3A3] mb-6">
            Free trial included. No credit card. Cancel anytime.
          </p>

          <CheckoutButton size="lg" className="gap-2 px-8 py-3 text-base">
            Start free trial- $0 today
          </CheckoutButton>

          <p className="mt-4 text-xs text-[#A3A3A3] dark:text-[#525252]">
            Then $7/month or $60/year &middot; 30-day money-back guarantee
          </p>
        </div>
      </section>
    </div>
  );
}

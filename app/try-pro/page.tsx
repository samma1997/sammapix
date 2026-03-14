"use client";

import React from "react";
import Link from "next/link";
import { Check, ArrowRight, Zap, Shield, Sparkles, Image } from "lucide-react";
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
  { Icon: IconEXIF,       name: "EXIF Lens",     accent: "#EF4444" },
  { Icon: IconFilmLab,    name: "FilmLab",       accent: "#F59E0B" },
  { Icon: IconStampIt,    name: "StampIt",       accent: "#06B6D4" },
  { Icon: IconCropRatio,  name: "CropRatio",     accent: "#EC4899" },
  { Icon: IconTwinHunt,   name: "TwinHunt",      accent: "#F97316" },
  { Icon: IconGeoSort,    name: "GeoSort",       accent: "#22C55E" },
  { Icon: IconTravelMap,  name: "TravelMap",     accent: "#3B82F6" },
  { Icon: IconResizePack, name: "ResizePack",    accent: "#14B8A6" },
  { Icon: IconCull,       name: "Cull",          accent: "#F43F5E" },
  { Icon: IconHEIC,       name: "HEIC Convert",  accent: "#6366F1" },
] as const;

// ─── Free vs Pro comparison ────────────────────────────────────────────────────

const COMPARISON = [
  { feature: "All 13 tools",          free: "Yes",       pro: "Yes" },
  { feature: "Files per batch",       free: "100",       pro: "500" },
  { feature: "AI Rename per day",     free: "5",         pro: "200" },
  { feature: "Max file size",         free: "20 MB",     pro: "50 MB" },
  { feature: "Ads",                   free: "Yes",       pro: "None" },
  { feature: "Priority support",      free: "No",        pro: "Yes" },
];

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function TryProPage() {
  return (
    <div className="bg-white dark:bg-[#191919] min-h-screen">

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#6366F1]/5 to-transparent dark:from-[#6366F1]/10 dark:to-transparent" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 pt-16 pb-20 sm:pt-24 sm:pb-28 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#6366F1]/10 dark:bg-[#6366F1]/20 text-[#6366F1] rounded-full text-xs font-medium mb-6">
            <Sparkles className="h-3.5 w-3.5" strokeWidth={2} />
            Limited offer — 30 days free
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold text-[#171717] dark:text-[#E5E5E5] tracking-tight mb-5 leading-tight">
            Try SammaPix Pro
            <br />
            <span className="text-[#6366F1]">free for 30 days</span>
          </h1>

          <p className="text-base sm:text-lg text-[#737373] dark:text-[#A3A3A3] max-w-xl mx-auto mb-8 leading-relaxed">
            13 browser-based image tools with no limits.
            Compress, convert, rename with AI, sort by GPS — all without uploads.
            Cancel anytime, no questions asked.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <CheckoutButton size="lg" className="w-full sm:w-auto gap-2 px-8 py-3 text-base">
              Start free trial — $0 today
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

      {/* ── What you get ──────────────────────────────────────────────────── */}
      <section className="py-16 px-4 sm:px-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-semibold text-[#171717] dark:text-[#E5E5E5] text-center mb-2">
            What Pro unlocks
          </h2>
          <p className="text-sm text-[#737373] dark:text-[#A3A3A3] text-center mb-10">
            Same tools, no limits.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { icon: Zap,      value: "500",    label: "files per batch",     desc: "Process full wedding shoots" },
              { icon: Sparkles, value: "200",    label: "AI renames / day",    desc: "Gemini Flash-powered SEO names" },
              { icon: Image,    value: "50 MB",  label: "max file size",       desc: "High-res RAW & panoramas" },
              { icon: Shield,   value: "Zero",   label: "ads",                desc: "Clean, distraction-free workspace" },
            ].map(({ icon: Icon, value, label, desc }) => (
              <div
                key={label}
                className="flex flex-col items-center text-center p-5 rounded-xl border border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#1E1E1E]"
              >
                <Icon className="h-5 w-5 text-[#6366F1] mb-3" strokeWidth={1.5} />
                <span className="text-2xl font-bold text-[#171717] dark:text-[#E5E5E5] tracking-tight">
                  {value}
                </span>
                <span className="text-xs font-medium text-[#525252] dark:text-[#A3A3A3] mt-0.5">
                  {label}
                </span>
                <span className="text-[11px] text-[#A3A3A3] dark:text-[#737373] mt-2 leading-snug">
                  {desc}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── All 13 tools ──────────────────────────────────────────────────── */}
      <section className="py-16 px-4 sm:px-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#1E1E1E]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-xl font-semibold text-[#171717] dark:text-[#E5E5E5] mb-2">
            13 tools. All included.
          </h2>
          <p className="text-sm text-[#737373] dark:text-[#A3A3A3] mb-8">
            Every tool works in your browser — no uploads, no installs.
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
                className={`grid grid-cols-3 ${i < COMPARISON.length - 1 ? "border-b border-[#F5F5F5] dark:border-[#252525]" : ""}`}
              >
                <div className="px-4 py-3 text-sm text-[#525252] dark:text-[#A3A3A3]">{feature}</div>
                <div className="px-4 py-3 text-sm text-[#737373] dark:text-[#737373] text-center">{free}</div>
                <div className="px-4 py-3 text-sm font-medium text-[#171717] dark:text-[#E5E5E5] text-center">{pro}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ──────────────────────────────────────────────────── */}
      <section className="py-16 px-4 sm:px-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#1E1E1E]">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-xl font-semibold text-[#171717] dark:text-[#E5E5E5] text-center mb-8">
            How it works
          </h2>

          <div className="space-y-6">
            {[
              { step: "1", title: "Sign up free", desc: "Create an account with Google or GitHub in one click." },
              { step: "2", title: "Get 30 days of Pro", desc: "All limits removed instantly. No credit card required." },
              { step: "3", title: "Use all 13 tools without limits", desc: "Batch process 500 files, 200 AI renames/day, 50 MB files, zero ads." },
              { step: "4", title: "Decide after 30 days", desc: "Love it? Stay on Pro for $7/month. Not for you? No charge, ever." },
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
        </div>
      </section>

      {/* ── Trust signals ─────────────────────────────────────────────────── */}
      <section className="py-12 px-4 sm:px-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { title: "100% browser-based", desc: "Your images never leave your device. Zero server uploads." },
              { title: "Cancel anytime", desc: "No contracts. Cancel in one click. Keep access until period ends." },
              { title: "30-day money-back", desc: "Not happy? Full refund within 30 days, no questions asked." },
            ].map(({ title, desc }) => (
              <div key={title} className="text-center">
                <Check className="h-5 w-5 text-[#16A34A] mx-auto mb-2" strokeWidth={2} />
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
            Ready to go Pro?
          </h2>
          <p className="text-sm text-[#737373] dark:text-[#A3A3A3] mb-6">
            Start your 30-day free trial. No credit card. Cancel anytime.
          </p>

          <CheckoutButton size="lg" className="gap-2 px-8 py-3 text-base">
            Start free trial — $0 today
          </CheckoutButton>

          <p className="mt-4 text-xs text-[#A3A3A3] dark:text-[#525252]">
            Then $7/month or $59/year &middot; 30-day money-back guarantee
          </p>
        </div>
      </section>
    </div>
  );
}

import { Metadata } from "next";
import Link from "next/link";
import { APP_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About SammaPix — Built by a photographer, for photographers",
  description:
    "Luca Sammarco built SammaPix because existing tools were too expensive, required uploads, or couldn't handle a real travel photography workflow. Privacy-first, browser-based, free forever.",
  keywords: [
    "luca sammarco",
    "travel photographer",
    "full-stack developer",
    "sammapix founder",
    "image optimization",
    "photography tools",
    "browser-based image processing",
    "privacy first photography",
  ],
  alternates: { canonical: `${APP_URL}/about` },
  openGraph: {
    title: "About SammaPix — Built by a photographer, for photographers",
    description:
      "Luca Sammarco built SammaPix because existing tools were too expensive, required uploads, or couldn't handle a real travel photography workflow.",
    url: `${APP_URL}/about`,
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SammaPix — Built by Luca Sammarco",
      },
    ],
  },
};

export default function AboutPage() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Luca Sammarco",
    url: "https://lucasammarco.com",
    sameAs: [
      "https://github.com/lucasammarco",
      "https://twitter.com/lucasammarco",
      "https://sammapix.com",
    ],
    jobTitle: "Full-Stack Developer & Travel Photographer",
    knowsAbout: [
      "Web Development",
      "Full-Stack Development",
      "Photography",
      "Travel Photography",
      "Image Optimization",
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
    ],
    worksFor: {
      "@type": "Organization",
      name: "SammaPix",
      url: "https://sammapix.com",
    },
    creator: {
      "@type": "CreativeWork",
      name: "SammaPix",
      description:
        "Free browser-based image optimization tools built for photographers",
      url: "https://sammapix.com",
    },
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#191919]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-16">

        {/* ── Hero ───────────────────────────────────────────────────────── */}
        <header className="mb-14">
          <p className="text-xs text-[#A3A3A3] dark:text-[#525252] uppercase tracking-widest mb-4">
            About
          </p>
          <h1 className="text-2xl sm:text-3xl font-semibold text-[#171717] dark:text-[#E5E5E5] leading-snug mb-5">
            Built by a photographer, for photographers
          </h1>
          <p className="text-sm text-[#737373] dark:text-[#A3A3A3] leading-relaxed">
            Luca Sammarco built SammaPix because every existing tool had a fatal flaw: too expensive, required uploading your photos to a server, or simply could not handle the scale of a travel photography workflow. So he built something better.
          </p>
          <div className="mt-8 h-px bg-[#E5E5E5] dark:bg-[#2A2A2A]" />
        </header>

        {/* ── Story ──────────────────────────────────────────────────────── */}
        <section className="mb-14">
          <h2 className="text-xs font-semibold text-[#A3A3A3] dark:text-[#737373] uppercase tracking-widest mb-5">
            The story
          </h2>
          <div className="space-y-5 text-sm text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
            <p>
              I travel the world and shoot thousands of photos. After every trip — Sri Lanka, Bali, Japan, Thailand — I&apos;d come home with 800 RAW files to sort, compress, convert, and rename before publishing. Compressing, renaming, resizing: it took hours. So I built SammaPix.
            </p>
            <p>
              TinyPNG compresses but doesn&apos;t rename. Squoosh handles one file at a time. AI renaming tools either cost money or upload your photos to third-party servers. For a photographer who cares about their work — and their clients&apos; privacy — that doesn&apos;t work.
            </p>
            <p>
              Every tool in SammaPix runs entirely in your browser. Your photos never leave your device. That&apos;s not just a feature — it&apos;s a principle. The moment you drag a file into SammaPix, it stays on your machine. No uploads. No third-party storage. No exceptions for the core tools.
            </p>
            <p>
              The goal isn&apos;t to become another mass-market platform. It&apos;s to build the workflow I wish I&apos;d had — and make it available to anyone who publishes images: travel photographers, wedding photographers, bloggers, e-commerce teams.
            </p>
          </div>
        </section>

        <div className="h-px bg-[#E5E5E5] dark:bg-[#2A2A2A] mb-14" />

        {/* ── Values ─────────────────────────────────────────────────────── */}
        <section className="mb-14">
          <h2 className="text-xs font-semibold text-[#A3A3A3] dark:text-[#737373] uppercase tracking-widest mb-6">
            What we believe
          </h2>
          <div className="space-y-6">
            <div className="pl-4 border-l-2 border-[#E5E5E5] dark:border-[#2A2A2A]">
              <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] mb-1">
                Privacy first
              </p>
              <p className="text-sm text-[#737373] dark:text-[#A3A3A3] leading-relaxed">
                Your images never touch our servers. Compression, conversion, resizing, EXIF removal — all processed client-side in your browser using standard Web APIs. The only exception is AI Rename, which sends a small thumbnail to Google Gemini. We tell you clearly when that happens.
              </p>
            </div>
            <div className="pl-4 border-l-2 border-[#E5E5E5] dark:border-[#2A2A2A]">
              <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] mb-1">
                Free forever
              </p>
              <p className="text-sm text-[#737373] dark:text-[#A3A3A3] leading-relaxed">
                All 13 core tools are free and always will be. No bait and switch. No "free trial" that expires. Pro exists for photographers who need bigger batches and the AI pipeline — not because we&apos;re holding basic features hostage.
              </p>
            </div>
            <div className="pl-4 border-l-2 border-[#E5E5E5] dark:border-[#2A2A2A]">
              <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] mb-1">
                Built for real workflows
              </p>
              <p className="text-sm text-[#737373] dark:text-[#A3A3A3] leading-relaxed">
                Not another toy tool. Every feature in SammaPix exists because a real photographer needed it. 500-file batches, GPS sorting by country, AI-generated SEO filenames, perceptual hash deduplication — these come from a real post-trip workflow, not a product roadmap meeting.
              </p>
            </div>
          </div>
        </section>

        <div className="h-px bg-[#E5E5E5] dark:bg-[#2A2A2A] mb-14" />

        {/* ── Tech ───────────────────────────────────────────────────────── */}
        <section className="mb-14">
          <h2 className="text-xs font-semibold text-[#A3A3A3] dark:text-[#737373] uppercase tracking-widest mb-5">
            How it works
          </h2>
          <p className="text-sm text-[#737373] dark:text-[#A3A3A3] leading-relaxed mb-6">
            100% browser-based processing using standard Web APIs — Canvas API for conversion and resizing, Web Workers for non-blocking compression, FileReader for EXIF extraction. No server round-trips means faster results and zero privacy exposure.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: "Framework",  value: "Next.js" },
              { label: "Styling",    value: "Tailwind CSS" },
              { label: "AI",         value: "Google Gemini" },
              { label: "Payments",   value: "Stripe" },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="p-3 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md bg-[#FAFAFA] dark:bg-[#1E1E1E]"
              >
                <p className="text-[10px] text-[#A3A3A3] dark:text-[#737373] uppercase tracking-widest mb-1">
                  {label}
                </p>
                <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5]">
                  {value}
                </p>
              </div>
            ))}
          </div>
        </section>

        <div className="h-px bg-[#E5E5E5] dark:bg-[#2A2A2A] mb-14" />

        {/* ── About the creator ──────────────────────────────────────────── */}
        <section className="mb-14">
          <h2 className="text-xs font-semibold text-[#A3A3A3] dark:text-[#737373] uppercase tracking-widest mb-5">
            Luca Sammarco
          </h2>
          <p className="text-sm text-[#737373] dark:text-[#A3A3A3] leading-relaxed mb-5">
            Travel photographer and full-stack developer. I&apos;ve photographed in Sri Lanka, Bali, Japan, Thailand, and China. I build software that solves the problems I have — SammaPix is the most honest version of that.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="https://github.com/lucasammarco"
              className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] hover:text-[#6366F1] dark:hover:text-[#8B5CF6] transition-colors"
            >
              GitHub: @lucasammarco →
            </a>
            <a
              href="https://twitter.com/lucasammarco"
              className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] hover:text-[#6366F1] dark:hover:text-[#8B5CF6] transition-colors"
            >
              Twitter: @lucasammarco →
            </a>
            <a
              href="https://lucasammarco.com"
              className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] hover:text-[#6366F1] dark:hover:text-[#8B5CF6] transition-colors"
            >
              lucasammarco.com →
            </a>
          </div>
        </section>

        <div className="h-px bg-[#E5E5E5] dark:bg-[#2A2A2A] mb-14" />

        {/* ── CTA ────────────────────────────────────────────────────────── */}
        <section className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/tools"
            className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium border border-[#E5E5E5] dark:border-[#333] rounded-md bg-white dark:bg-[#252525] text-[#171717] dark:text-[#E5E5E5] hover:bg-[#F5F5F5] dark:hover:bg-[#2A2A2A] transition-colors"
          >
            Try SammaPix free →
          </Link>
          <Link
            href="/pricing"
            className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium rounded-md bg-[#171717] dark:bg-[#E5E5E5] text-white dark:text-[#171717] hover:bg-[#262626] dark:hover:bg-[#D4D4D4] transition-colors"
          >
            Go Pro →
          </Link>
        </section>

      </main>
    </div>
  );
}

import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "About — Luca Sammarco, Travel Photographer & Tool Builder | SammaPix",
  description:
    "I'm Luca Sammarco: travel photographer and developer. I built SammaPix to solve my own image optimization problems. Read my story and my post-trip workflow.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#191919]">
      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-16">

        {/* Header */}
        <header className="mb-12">
          <p className="text-xs text-gray-400 dark:text-[#525252] uppercase tracking-widest mb-3">About</p>
          <h1 className="text-2xl font-semibold text-[#171717] dark:text-[#E5E5E5] leading-snug mb-4">
            Luca Sammarco
          </h1>
          <p className="text-sm text-gray-500 dark:text-[#737373] leading-relaxed">
            Travel photographer. Developer. I build tools to solve problems I run into myself in the field.
          </p>
          <div className="mt-6 h-px bg-gray-100 dark:bg-[#2A2A2A]" />
        </header>

        {/* Story */}
        <section className="mb-12 space-y-5 text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed">
          <p>
            I started taking photography seriously during my first trip to Asia — Sri Lanka, 2025.
            I came home with hundreds of files: RAW files to convert, JPEGs to compress, random names
            to fix before uploading to my site. A long, repetitive process that stole time
            I would rather have spent shooting or editing.
          </p>
          <p>
            I looked for a solution: no free tool did everything in one place.
            TinyPNG compresses but doesn&apos;t rename. Squoosh is great for one file at a time but
            doesn&apos;t handle batches. AI renaming tools either cost money or upload your photos to
            third-party servers. For a photographer who wants to protect their work, that doesn&apos;t work.
          </p>
          <p>
            So I built <strong className="text-[#171717] dark:text-[#E5E5E5] font-medium">SammaPix</strong>: batch compression,
            WebP conversion, and AI rename — all directly in the browser.
            No uploads, no mandatory account for the basic features, no photos leaving
            your device without your consent.
          </p>
          <p>
            The goal isn&apos;t to become another mass-market platform. It&apos;s to build the workflow
            I wish I&apos;d had — and make it available to anyone who works with images:
            travel photographers, wedding photographers, content creators, web developers.
          </p>
        </section>

        {/* Divider */}
        <div className="h-px bg-gray-100 dark:bg-[#2A2A2A] mb-12" />

        {/* Workflow */}
        <section className="mb-12">
          <h2 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-4 lowercase tracking-wide">
            my post-trip workflow
          </h2>
          <ol className="space-y-4 text-sm text-gray-600 dark:text-[#A3A3A3]">
            <li className="flex gap-3">
              <span className="text-xs text-gray-300 dark:text-[#525252] font-mono pt-0.5 select-none">01</span>
              <div>
                <p className="font-medium text-[#171717] dark:text-[#E5E5E5]">Select and edit in Lightroom</p>
                <p className="text-gray-500 dark:text-[#737373] mt-0.5">
                  Export JPEG at quality 85 — the optimal quality/weight balance for the web.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="text-xs text-gray-300 dark:text-[#525252] font-mono pt-0.5 select-none">02</span>
              <div>
                <p className="font-medium text-[#171717] dark:text-[#E5E5E5]">Batch compress + convert to WebP</p>
                <p className="text-gray-500 dark:text-[#737373] mt-0.5">
                  I drag everything into SammaPix. Files go from 2–3 MB down to 400–600 KB in WebP format,
                  with no perceptible quality loss. The browser doesn&apos;t have to load all that unnecessary weight.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="text-xs text-gray-300 dark:text-[#525252] font-mono pt-0.5 select-none">03</span>
              <div>
                <p className="font-medium text-[#171717] dark:text-[#E5E5E5]">AI rename with SEO filenames</p>
                <p className="text-gray-500 dark:text-[#737373] mt-0.5">
                  The AI analyzes each image and generates descriptive names:
                  <code className="text-[11px] bg-gray-100 dark:bg-[#2A2A2A] dark:text-[#A3A3A3] px-1 rounded mx-1">DSC_4821.jpg</code>
                  becomes
                  <code className="text-[11px] bg-gray-100 dark:bg-[#2A2A2A] dark:text-[#A3A3A3] px-1 rounded mx-1">sigiriya-rock-fortress-sunrise-sri-lanka.webp</code>.
                  Google understands what&apos;s in the image and indexes it better in Google Images.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="text-xs text-gray-300 dark:text-[#525252] font-mono pt-0.5 select-none">04</span>
              <div>
                <p className="font-medium text-[#171717] dark:text-[#E5E5E5]">Upload to the site</p>
                <p className="text-gray-500 dark:text-[#737373] mt-0.5">
                  Files already optimized, already renamed. The site loads fast, and images
                  appear in Google Images with the right context.
                </p>
              </div>
            </li>
          </ol>
        </section>

        <div className="h-px bg-gray-100 dark:bg-[#2A2A2A] mb-12" />

        {/* Why photographers should optimize */}
        <section className="mb-12">
          <h2 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3 lowercase tracking-wide">
            why photographers should optimize their images
          </h2>
          <div className="space-y-4 text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed">
            <p>
              Most photographers obsess over every detail of the shot and the edit,
              then upload 4 MB files to WordPress without a second thought. The result: a slow site,
              a low PageSpeed score, and Google penalizing your ranking.
            </p>
            <p>
              WebP instead of JPEG reduces file size by 25–35% at the same visual quality.
              Smart compression brings reductions of 60–70% compared to the original.
              A portfolio site that loads in 1.5 seconds instead of 4 converts much better —
              whether you&apos;re selling prints, looking for collaborations, or building an audience.
            </p>
            <p>
              SEO filenames aren&apos;t as critical as link building or content,
              but they contribute to the relevance signal for Google Images — a traffic source
              often ignored by photographers, yet one that can bring in qualified clients.
            </p>
          </div>
        </section>

        <div className="h-px bg-gray-100 dark:bg-[#2A2A2A] mb-12" />

        {/* Tools */}
        <section className="mb-12">
          <h2 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-4 lowercase tracking-wide">
            tools I&apos;ve built
          </h2>
          <div className="space-y-3">
            <Link
              href="/tools"
              className="group flex items-center justify-between p-4 border border-gray-200 dark:border-[#2A2A2A] rounded-md bg-white dark:bg-[#1E1E1E] hover:bg-gray-50 dark:hover:bg-[#242424] transition-colors"
            >
              <div>
                <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5]">Crunch — Image Optimizer</p>
                <p className="text-xs text-gray-400 dark:text-[#737373] mt-0.5">
                  Compress, convert to WebP, and AI rename — all in one pass, in the browser.
                </p>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {["Compress", "WebP", "AI Rename", "Batch ZIP"].map((f) => (
                    <span key={f} className="text-[10px] text-gray-400 dark:text-[#737373] bg-gray-100 dark:bg-[#2A2A2A] px-2 py-0.5 rounded-full">
                      {f}
                    </span>
                  ))}
                </div>
              </div>
              <ArrowRight className="h-3.5 w-3.5 text-gray-300 dark:text-[#525252] group-hover:text-gray-600 dark:group-hover:text-[#A3A3A3] transition-colors flex-shrink-0 ml-4" strokeWidth={1.5} />
            </Link>
          </div>
        </section>

        <div className="h-px bg-gray-100 dark:bg-[#2A2A2A] mb-12" />

        {/* Portfolio */}
        <section className="mb-4">
          <h2 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3 lowercase tracking-wide">
            my travels
          </h2>
          <p className="text-sm text-gray-500 dark:text-[#737373] leading-relaxed mb-4">
            I&apos;ve photographed in Sri Lanka, Bali, Japan, Thailand, and China.
            Each trip has its own gallery — each photo has a description of the context,
            the place, the light. Documentary travel photography, not polished.
          </p>
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-1.5 text-sm text-[#171717] dark:text-[#E5E5E5] hover:text-gray-500 dark:hover:text-[#A3A3A3] transition-colors font-medium"
          >
            View portfolio
            <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
          </Link>
        </section>

      </main>
    </div>
  );
}

import React from "react";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import VideoCompressClient from "@/components/tools/VideoCompressClient";
import HowToUse from "@/components/tools/HowToUse";
import { APP_URL } from "@/lib/constants";

// ── Metadata ──────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Free Video Compressor Online — Reduce MP4 Size in Browser | SammaPix",
  description:
    "Compress MP4, WebM, and MOV videos online for free. No upload, no account needed. FFmpeg.wasm runs compression directly in your browser. Choose quality preset and download instantly.",
  keywords: [
    "video compressor online free",
    "compress mp4 online",
    "reduce video file size",
    "video compression browser",
    "mp4 compressor no upload",
    "compress video without losing quality",
    "webm compressor",
    "mov compressor",
    "ffmpeg online",
    "video size reducer free",
  ],
  alternates: {
    canonical: `${APP_URL}/tools/video-compress`,
  },
  openGraph: {
    title: "Free Video Compressor Online — Reduce MP4 Size in Browser | SammaPix",
    description:
      "Compress MP4, WebM, and MOV videos online for free. No upload required. FFmpeg-powered, runs 100% in your browser.",
    url: `${APP_URL}/tools/video-compress`,
    siteName: "SammaPix",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SammaPix Video Compressor",
      },
    ],
  },
};

// ── Animated icon ─────────────────────────────────────────────────────────────

function VideoCompressIcon() {
  return (
    <div className="h-12 w-12 rounded-lg border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#252525] flex items-center justify-center">
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <style>{`
          @keyframes compressH {
            0%, 100% { transform: scaleX(1); }
            50% { transform: scaleX(0.78); }
          }
          .compress-group {
            transform-origin: 11px 16px;
            animation: compressH 2.2s ease-in-out infinite;
          }
        `}</style>
        <g className="compress-group">
          <rect x="2" y="10" width="18" height="13" rx="2.5" stroke="#525252" strokeWidth="1.5" fill="none"/>
          <path d="M20 13.5L29 11V21L20 18.5" stroke="#525252" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M7 16H14" stroke="#6366F1" strokeWidth="1.4" strokeLinecap="round"/>
          <path d="M8.5 14L7 16L8.5 18" stroke="#6366F1" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12.5 14L14 16L12.5 18" stroke="#6366F1" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
        </g>
      </svg>
    </div>
  );
}

// ── Features ──────────────────────────────────────────────────────────────────

const features = [
  {
    title: "No upload, total privacy",
    description:
      "Your video file is processed entirely in your browser using WebAssembly. It never leaves your device — no server, no cloud, no data retention.",
    highlight: false,
  },
  {
    title: "H.264 + AAC via FFmpeg",
    description:
      "Uses FFmpeg.wasm with the libx264 encoder and AAC audio. Four CRF presets (18–32) let you balance between quality and file size.",
    highlight: true,
  },
  {
    title: "MP4 output — universal compatibility",
    description:
      "Output is always MP4 (H.264/AAC), the most widely supported video format. Works on iOS, Android, web, social media, and every platform.",
    highlight: false,
  },
];

const relatedTools = [
  { name: "Video to GIF", href: "/tools/video-gif" },
  { name: "Video Thumbnail Picker", href: "/tools/video-thumb" },
  { name: "Compress Images", href: "/tools/compress" },
  { name: "Convert to WebP", href: "/tools/webp" },
];

const howToSteps = [
  {
    title: "Drop your video",
    desc: "Upload any MP4, WebM, or MOV file up to 200 MB by dragging it onto the drop zone or clicking to browse.",
  },
  {
    title: "Choose quality preset",
    desc: "Select High (near lossless), Medium (balanced), Low, or Tiny. Medium is the recommended default for most videos.",
  },
  {
    title: "Download compressed video",
    desc: "Click Compress and wait for FFmpeg to process your file in-browser. Download your smaller MP4 when done.",
  },
];

// ── Page ──────────────────────────────────────────────────────────────────────

export default function VideoCompressPage() {
  return (
    <main>
      {/* Hero */}
      <div className="max-w-3xl mx-auto px-4 pt-10 pb-2">
        <div className="flex items-center gap-3 mb-4">
          <VideoCompressIcon />
          <div>
            <h1 className="text-2xl font-semibold text-[#171717] dark:text-[#E5E5E5]">
              Video Compressor
            </h1>
            <p className="text-sm text-[#737373] mt-0.5">
              Reduce MP4, WebM and MOV file size — free, no upload, runs in your browser
            </p>
          </div>
        </div>
        <p className="text-sm text-[#737373] leading-relaxed">
          Shrink video files for sharing, upload limits, or storage savings. Drop your video, pick a quality preset, and get a compressed MP4 back in minutes. Powered by FFmpeg.wasm — no data ever leaves your device.
        </p>
      </div>

      {/* Tool */}
      <VideoCompressClient />

      {/* How to use */}
      <HowToUse
        toolName="Video Compressor"
        steps={howToSteps}
        proTip={{
          text: "Need to process multiple videos at once?",
          linkLabel: "Upgrade to Pro",
          linkHref: "/pricing",
        }}
      />

      {/* Features */}
      <section className="py-12 px-4 sm:px-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-6">
            How video compression works
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {features.map((f) => (
              <div
                key={f.title}
                className={`p-5 border rounded-md ${
                  f.highlight
                    ? "border-[#C7D2FE] bg-[#EEF2FF]/30"
                    : "border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#1E1E1E]"
                }`}
              >
                <h3 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-2">
                  {f.title}
                </h3>
                <p className="text-sm text-[#737373] leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEO content */}
      <section className="py-12 px-4 sm:px-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mb-4">
            What quality preset should I use?
          </h2>
          <p className="text-sm text-[#737373] leading-relaxed mb-4">
            The preset controls the CRF (Constant Rate Factor) value passed to libx264. Lower CRF means higher quality and larger files; higher CRF means smaller files with more compression artefacts.
          </p>
          <ul className="text-sm text-[#737373] leading-relaxed space-y-2 list-none pl-0 mb-6">
            <li className="flex items-start gap-2">
              <span className="text-[#6366F1] mt-0.5 shrink-0">—</span>
              <span><strong className="text-[#525252] dark:text-[#A3A3A3]">High (CRF 18)</strong> — near-lossless quality, file size reduction is modest. Best for archiving or professional use.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#6366F1] mt-0.5 shrink-0">—</span>
              <span><strong className="text-[#525252] dark:text-[#A3A3A3]">Medium (CRF 23)</strong> — the x264 default. Great balance for most social sharing, email, and web use.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#6366F1] mt-0.5 shrink-0">—</span>
              <span><strong className="text-[#525252] dark:text-[#A3A3A3]">Low (CRF 28)</strong> — noticeable quality loss on fast-motion scenes. Good for messaging apps and internal sharing.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#6366F1] mt-0.5 shrink-0">—</span>
              <span><strong className="text-[#525252] dark:text-[#A3A3A3]">Tiny (CRF 32)</strong> — maximum compression. Suitable for thumbnails or very tight storage budgets.</span>
            </li>
          </ul>
          <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            Why does compression take a while?
          </h3>
          <p className="text-sm text-[#737373] leading-relaxed mb-4">
            FFmpeg.wasm runs the full FFmpeg binary inside your browser via WebAssembly. This is significantly slower than native FFmpeg — typically 5–20x slower depending on your CPU. A 100 MB video compressed with the Ultrafast preset may take 2–5 minutes on a modern laptop.
          </p>
          <p className="text-sm text-[#737373] leading-relaxed">
            The Ultrafast x264 preset is used to keep processing time reasonable. It trades a small amount of compression efficiency for speed. For the same CRF, Ultrafast produces slightly larger files than Slow or Medium presets, but the difference is usually under 15%.
          </p>
        </div>
      </section>

      {/* Related tools */}
      <section className="py-12 px-4 sm:px-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-4">
            More free tools
          </h2>
          <div className="flex flex-wrap gap-2">
            {relatedTools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md text-[#525252] hover:border-[#A3A3A3] hover:text-[#171717] dark:text-[#E5E5E5] bg-white dark:bg-[#1E1E1E] transition-colors"
              >
                {tool.name}
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: `${APP_URL}` },
              { "@type": "ListItem", position: 2, name: "Tools", item: `${APP_URL}/tools` },
              { "@type": "ListItem", position: 3, name: "Video Compressor", item: `${APP_URL}/tools/video-compress` },
            ],
          }),
        }}
      />

      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Is the video uploaded to a server?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "No. Compression is performed entirely in your browser using FFmpeg.wasm (WebAssembly). Your video never leaves your device.",
                },
              },
              {
                "@type": "Question",
                name: "What video formats can I compress?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "You can input MP4, WebM, or MOV files up to 200 MB. The output is always an MP4 file encoded with H.264 video and AAC audio.",
                },
              },
              {
                "@type": "Question",
                name: "Why is compression slow?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "FFmpeg.wasm runs inside your browser using WebAssembly, which is 5–20x slower than native FFmpeg. A 100 MB video may take 2–5 minutes. Choosing the Tiny preset and a shorter clip will speed things up.",
                },
              },
              {
                "@type": "Question",
                name: "What CRF value should I use?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "CRF 23 (Medium preset) is the x264 default and recommended for most use cases. CRF 18 (High) is near-lossless. CRF 28–32 (Low/Tiny) gives the smallest files but with visible quality reduction.",
                },
              },
            ],
          }),
        }}
      />

      {/* SoftwareApplication Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "SammaPix Video Compressor",
            applicationCategory: "MultimediaApplication",
            operatingSystem: "Any (browser-based)",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            description:
              "Free online video compressor. Compress MP4, WebM, and MOV files using FFmpeg.wasm directly in the browser. No upload, no account, no cost.",
          }),
        }}
      />
    </main>
  );
}

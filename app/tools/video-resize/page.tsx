import React from "react";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import VideoResizeClient from "@/components/tools/VideoResizeClient";
import HowToUse from "@/components/tools/HowToUse";
import { APP_URL } from "@/lib/constants";

// ── Metadata ──────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Video Resize & Crop for Social Media — Free Online Tool | SammaPix",
  description:
    "Resize and crop any video to the exact dimensions for Instagram Reels, TikTok, YouTube, Twitter/X, LinkedIn and Facebook Stories. 100% free, browser-based, no upload required.",
  keywords: [
    "video resize for social media",
    "crop video for instagram",
    "resize video for tiktok",
    "video aspect ratio converter",
    "instagram reel video size",
    "youtube video resize",
    "crop video online free",
    "video format converter social media",
    "9:16 video converter",
    "16:9 crop video",
  ],
  alternates: {
    canonical: `${APP_URL}/tools/video-resize`,
  },
  openGraph: {
    title: "Video Resize & Crop for Social Media — Free | SammaPix",
    description:
      "Instantly crop and resize any video to fit Instagram Reels, TikTok, YouTube, Twitter/X, LinkedIn and Facebook Stories. Runs entirely in your browser.",
    url: `${APP_URL}/tools/video-resize`,
    siteName: "SammaPix",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SammaPix Video Resize Tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Video Resize & Crop for Social Media — Free | SammaPix",
    description:
      "Crop and resize any video for Instagram, TikTok, YouTube and more. Browser-based, no upload, instant download.",
  },
};

// ── How to use steps ──────────────────────────────────────────────────────────

const HOW_TO_STEPS = [
  {
    title: "Drop your video",
    desc: "Upload an MP4, WebM or MOV file up to 200MB. It stays on your device and is never sent to a server.",
  },
  {
    title: "Pick a platform preset",
    desc: "Choose from Instagram Reel, TikTok, YouTube, Twitter/X, LinkedIn or Facebook Story. A live crop preview shows exactly what will be kept.",
  },
  {
    title: "Resize and download",
    desc: "Click Resize. FFmpeg.wasm crops and scales the video in your browser. Download the finished MP4 instantly.",
  },
];

// ── Feature cards ─────────────────────────────────────────────────────────────

const FEATURES = [
  {
    title: "Runs in your browser",
    description:
      "Powered by FFmpeg.wasm, video processing happens entirely on your device using WebAssembly. No server, no upload, no privacy risk.",
    highlight: false,
  },
  {
    title: "Smart center-crop",
    description:
      "The tool automatically calculates whether to crop the width or height to preserve as much of your video as possible while hitting the target aspect ratio.",
    highlight: false,
  },
  {
    title: "7 platform presets",
    description:
      "Instagram Reel (9:16), Instagram Square (1:1), YouTube (16:9), TikTok (9:16), Twitter/X (16:9), LinkedIn (16:9) and Facebook Story (9:16) — all in one click.",
    highlight: true,
  },
];

// ── Related tools ─────────────────────────────────────────────────────────────

const RELATED_TOOLS = [
  { name: "Video Thumbnail Picker", href: "/tools/video-thumb" },
  { name: "Compress Images", href: "/tools/compress" },
  { name: "Convert to WebP", href: "/tools/webp" },
  { name: "ResizePack", href: "/tools/resizepack" },
];

// ── Page ──────────────────────────────────────────────────────────────────────

export default function VideoResizePage() {
  return (
    <main>
      {/* Hero */}
      <div className="max-w-3xl mx-auto px-4 pt-10 pb-2">
        <h1 className="text-2xl font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1">
          Video Resize for Social Media
        </h1>
        <p className="text-sm text-[#737373] leading-relaxed">
          Crop and resize any video to the exact dimensions required by Instagram Reels, TikTok, YouTube, Twitter/X, LinkedIn and Facebook Stories. Choose a preset, preview the crop area, and download a perfectly-sized MP4 — all without leaving your browser.
        </p>
      </div>

      {/* Interactive tool */}
      <VideoResizeClient />

      {/* How to use */}
      <HowToUse
        toolName="Video Resize"
        steps={HOW_TO_STEPS}
        proTip={{
          text: "Need to process multiple videos or keep the originals ad-free?",
          linkLabel: "Go Pro for $7/mo",
          linkHref: "/pricing",
        }}
      />

      {/* Feature cards */}
      <section className="py-12 px-4 sm:px-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-6">
            Why use SammaPix Video Resize
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className={`p-5 border rounded-md ${
                  f.highlight
                    ? "border-[#C7D2FE] bg-[#EEF2FF]/30 dark:bg-[#1E1E2A]"
                    : "border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#1E1E1E]"
                }`}
              >
                <h3 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1.5">
                  {f.title}
                </h3>
                <p className="text-sm text-[#737373] leading-relaxed">
                  {f.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEO content */}
      <section className="py-12 px-4 sm:px-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-2xl mx-auto space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
              Video dimensions for every social platform
            </h2>
            <p className="text-sm text-[#737373] leading-relaxed">
              Every social network has its own preferred video format. Upload the wrong dimensions and the platform crops your video unexpectedly — cutting off faces, text or key moments. SammaPix Video Resize fixes this before you publish.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
              Supported presets
            </h3>
            <ul className="text-sm text-[#737373] leading-relaxed space-y-2 list-none pl-0">
              {[
                ["Instagram Reel", "1080×1920 (9:16 vertical) — required for Reels and Stories"],
                ["Instagram Square", "1080×1080 (1:1) — the classic square post format"],
                ["YouTube", "1920×1080 (16:9) — standard widescreen for YouTube uploads"],
                ["TikTok", "1080×1920 (9:16) — full-screen vertical for TikTok For You page"],
                ["Twitter / X", "1280×720 (16:9) — best fit for timeline video posts"],
                ["LinkedIn", "1920×1080 (16:9) — professional widescreen for LinkedIn feed"],
                ["Facebook Story", "1080×1920 (9:16) — immersive full-screen Story format"],
              ].map(([label, desc]) => (
                <li key={label} className="flex items-start gap-2">
                  <span className="text-[#6366F1] mt-0.5 shrink-0">—</span>
                  <span>
                    <strong className="font-medium text-[#525252] dark:text-[#D4D4D4]">{label}:</strong>{" "}
                    {desc}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
              How does the crop work?
            </h3>
            <p className="text-sm text-[#737373] leading-relaxed">
              The tool uses a center-crop algorithm. If your source video is wider than the target aspect ratio, it crops the sides equally and keeps full height. If your source is taller, it crops the top and bottom equally and keeps full width. This maximises the portion of the video that is preserved while hitting the exact target dimensions. The crop preview on screen shows exactly which area will be retained before you start processing.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
              Is this tool really free?
            </h3>
            <p className="text-sm text-[#737373] leading-relaxed">
              Yes, completely free with no watermark. The tool uses FFmpeg.wasm, a WebAssembly port of FFmpeg that runs entirely in your browser. There is no server involved, which means no cost per conversion and no file size limit beyond what your browser can handle.
            </p>
          </div>
        </div>
      </section>

      {/* Related tools */}
      <section className="py-12 px-4 sm:px-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-4">
            More free tools
          </h2>
          <div className="flex flex-wrap gap-2">
            {RELATED_TOOLS.map((tool) => (
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
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: `${APP_URL}`,
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Tools",
                item: `${APP_URL}/tools`,
              },
              {
                "@type": "ListItem",
                position: 3,
                name: "Video Resize for Social Media",
                item: `${APP_URL}/tools/video-resize`,
              },
            ],
          }),
        }}
      />

      {/* HowTo Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: "How to resize a video for social media",
            description:
              "Crop and resize any video to the exact dimensions for Instagram, TikTok, YouTube and more using SammaPix Video Resize.",
            step: HOW_TO_STEPS.map((s, i) => ({
              "@type": "HowToStep",
              position: i + 1,
              name: s.title,
              text: s.desc,
            })),
            tool: {
              "@type": "HowToTool",
              name: "SammaPix Video Resize",
            },
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
                name: "Does my video get uploaded to a server?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "No. All processing happens locally in your browser using FFmpeg.wasm (WebAssembly). Your video file never leaves your computer.",
                },
              },
              {
                "@type": "Question",
                name: "What video formats are supported?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "MP4, WebM and MOV (QuickTime) files up to 200MB are supported. The output is always an MP4 encoded with H.264 and AAC audio.",
                },
              },
              {
                "@type": "Question",
                name: "Will there be a watermark on the output?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "No. SammaPix Video Resize is completely free with no watermark added to the output video.",
                },
              },
              {
                "@type": "Question",
                name: "How does the center-crop algorithm work?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "If the source video is wider than the target aspect ratio, the tool crops equal amounts from the left and right while keeping the full height. If the source is taller, it crops equal amounts from the top and bottom while keeping the full width. This maximises the amount of the original video that is preserved.",
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
            name: "SammaPix Video Resize for Social Media",
            description:
              "Crop and resize any video to the exact dimensions for Instagram Reels, TikTok, YouTube, Twitter/X, LinkedIn and Facebook Stories. Free, browser-based, no watermark.",
            url: `${APP_URL}/tools/video-resize`,
            applicationCategory: "MultimediaApplication",
            operatingSystem: "Web Browser",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            author: {
              "@type": "Person",
              name: "Luca Sammarco",
              url: "https://lucasammarco.com",
            },
            creator: {
              "@type": "Organization",
              name: "SammaPix",
              url: `${APP_URL}`,
            },
            featureList: [
              "Instagram Reel 1080x1920 (9:16)",
              "Instagram Square 1080x1080 (1:1)",
              "YouTube 1920x1080 (16:9)",
              "TikTok 1080x1920 (9:16)",
              "Twitter/X 1280x720 (16:9)",
              "LinkedIn 1920x1080 (16:9)",
              "Facebook Story 1080x1920 (9:16)",
              "Live crop preview overlay",
              "FFmpeg.wasm browser processing",
              "No upload — 100% private",
              "No watermark",
              "Free to use",
            ],
          }),
        }}
      />
    </main>
  );
}

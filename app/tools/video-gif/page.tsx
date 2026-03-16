import React from "react";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import VideoGifClient from "@/components/tools/VideoGifClient";
import HowToUse from "@/components/tools/HowToUse";
import { APP_URL } from "@/lib/constants";

// ── Metadata ──────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Free Video to GIF Converter — MP4 to GIF in Browser | SammaPix",
  description:
    "Convert MP4, WebM, or MOV videos to animated GIF online for free. Pick start and end time, choose resolution and FPS. No upload needed — FFmpeg.wasm runs in your browser.",
  keywords: [
    "video to gif converter free",
    "mp4 to gif online",
    "convert video to gif",
    "make gif from video",
    "gif maker online free",
    "video to animated gif",
    "mp4 to gif no upload",
    "free gif converter",
    "webm to gif",
    "mov to gif",
  ],
  alternates: {
    canonical: `${APP_URL}/tools/video-gif`,
  },
  openGraph: {
    title: "Free Video to GIF Converter — MP4 to GIF in Browser | SammaPix",
    description:
      "Convert any video clip to an animated GIF online. Pick your time range, resolution, and FPS. 100% browser-based, no upload required.",
    url: `${APP_URL}/tools/video-gif`,
    siteName: "SammaPix",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SammaPix Video to GIF Converter",
      },
    ],
  },
};

// ── Animated icon ─────────────────────────────────────────────────────────────

function VideoGifIcon() {
  return (
    <div className="h-12 w-12 rounded-lg border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#252525] flex items-center justify-center">
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <style>{`
          @keyframes gifLoop {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          .gif-loop-arrow {
            transform-origin: 24px 9px;
            animation: gifLoop 2.6s linear infinite;
          }
        `}</style>
        {/* Film strip body */}
        <rect x="2" y="11" width="20" height="13" rx="2" stroke="#525252" strokeWidth="1.5" fill="none"/>
        {/* Left sprocket holes */}
        <rect x="2" y="13" width="3.5" height="3" rx="0.5" fill="#525252"/>
        <rect x="2" y="18" width="3.5" height="3" rx="0.5" fill="#525252"/>
        {/* Right sprocket holes */}
        <rect x="18.5" y="13" width="3.5" height="3" rx="0.5" fill="#525252"/>
        <rect x="18.5" y="18" width="3.5" height="3" rx="0.5" fill="#525252"/>
        {/* GIF loop arrow */}
        <g className="gif-loop-arrow">
          <path
            d="M21 6C23.8 6 26 8.2 26 11C26 13.8 23.8 15.5 21 15.5"
            stroke="#6366F1"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M23.5 4L21 6L23.5 8"
            stroke="#6366F1"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </svg>
    </div>
  );
}

// ── Features ──────────────────────────────────────────────────────────────────

const features = [
  {
    title: "Precise time range selection",
    description:
      "Use start and end time sliders to select any clip up to 15 seconds long from your video. Preview the video inline before converting.",
    highlight: false,
  },
  {
    title: "Palette-optimised GIF quality",
    description:
      "Uses FFmpeg's palettegen + paletteuse filter with Lanczos scaling — the gold standard for high-quality GIFs with minimal colour banding.",
    highlight: true,
  },
  {
    title: "Choose resolution and FPS",
    description:
      "Output at 480p, 320p, or 240p. Select 10, 15, or 20 fps. Smaller resolution and lower FPS dramatically reduce GIF file size.",
    highlight: false,
  },
];

const relatedTools = [
  { name: "Video Compressor", href: "/tools/video-compress" },
  { name: "Video Thumbnail Picker", href: "/tools/video-thumb" },
  { name: "Compress Images", href: "/tools/compress" },
  { name: "Convert to WebP", href: "/tools/webp" },
];

const howToSteps = [
  {
    title: "Drop your video",
    desc: "Upload an MP4, WebM, or MOV file up to 200 MB. A preview appears so you can scrub through the video.",
  },
  {
    title: "Set clip range and options",
    desc: "Drag the start and end sliders to choose your 1–15 second clip. Pick resolution and FPS for your desired file size.",
  },
  {
    title: "Create and download GIF",
    desc: "Click Create GIF. FFmpeg converts your clip in-browser and shows a live preview. Download your animated GIF when done.",
  },
];

// ── Page ──────────────────────────────────────────────────────────────────────

export default function VideoGifPage() {
  return (
    <main>
      {/* Hero */}
      <div className="max-w-3xl mx-auto px-4 pt-10 pb-2">
        <div className="flex items-center gap-3 mb-4">
          <VideoGifIcon />
          <div>
            <h1 className="text-2xl font-semibold text-[#171717] dark:text-[#E5E5E5]">
              Video to GIF
            </h1>
            <p className="text-sm text-[#737373] mt-0.5">
              Convert any video clip to an animated GIF — free, no upload, runs in your browser
            </p>
          </div>
        </div>
        <p className="text-sm text-[#737373] leading-relaxed">
          Turn a highlight from any MP4, WebM, or MOV into a looping GIF. Set the exact start and end time, choose resolution and frame rate, and get a palette-optimised GIF ready to share. Everything runs in the browser via FFmpeg.wasm — no server, no account needed.
        </p>
      </div>

      {/* Tool */}
      <VideoGifClient />

      {/* How to use */}
      <HowToUse
        toolName="Video to GIF"
        steps={howToSteps}
      />

      {/* Features */}
      <section className="py-12 px-4 sm:px-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-6">
            How GIF conversion works
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
            Tips for smaller GIF files
          </h2>
          <p className="text-sm text-[#737373] leading-relaxed mb-4">
            GIF is an older format that stores up to 256 colours per frame, which makes it less efficient than modern video codecs. A 10-second clip at 480p/15fps can easily reach 20–40 MB. Here are proven ways to keep file sizes manageable:
          </p>
          <ul className="text-sm text-[#737373] leading-relaxed space-y-2 list-none pl-0 mb-6">
            <li className="flex items-start gap-2">
              <span className="text-[#6366F1] mt-0.5 shrink-0">—</span>
              <span><strong className="text-[#525252] dark:text-[#A3A3A3]">Shorten the clip.</strong> Every second counts. A 5-second GIF is roughly half the size of a 10-second GIF at the same settings.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#6366F1] mt-0.5 shrink-0">—</span>
              <span><strong className="text-[#525252] dark:text-[#A3A3A3]">Lower the resolution.</strong> 240p is 4x fewer pixels than 480p, resulting in dramatically smaller files.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#6366F1] mt-0.5 shrink-0">—</span>
              <span><strong className="text-[#525252] dark:text-[#A3A3A3]">Reduce FPS.</strong> 10 fps is fine for most content and cuts file size by half compared to 20 fps.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#6366F1] mt-0.5 shrink-0">—</span>
              <span><strong className="text-[#525252] dark:text-[#A3A3A3]">Choose a simple scene.</strong> GIF compresses better on clips with a static background and limited colour variation.</span>
            </li>
          </ul>
          <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            Why is GIF quality better here than other tools?
          </h3>
          <p className="text-sm text-[#737373] leading-relaxed">
            Most simple video-to-GIF tools use a generic palette, which causes visible colour banding. SammaPix uses FFmpeg{`'`}s two-pass palette approach: the first pass (palettegen) analyses every frame to build an optimal 256-colour palette specific to your clip; the second pass (paletteuse) applies that palette with dithering. The result is visibly sharper, truer colour GIFs compared to naive converters.
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
              { "@type": "ListItem", position: 3, name: "Video to GIF", item: `${APP_URL}/tools/video-gif` },
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
                name: "Is my video uploaded to a server?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "No. The conversion runs entirely in your browser using FFmpeg.wasm (WebAssembly). Your video file never leaves your device.",
                },
              },
              {
                "@type": "Question",
                name: "What is the maximum GIF duration?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "You can create GIFs up to 15 seconds long. This limit exists because longer GIFs become very large files and are slow to process in the browser.",
                },
              },
              {
                "@type": "Question",
                name: "Why is my GIF so large?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "GIF is an inefficient format — it stores up to 256 colours per frame without inter-frame compression. To reduce size, use 240p resolution, 10 fps, and keep the clip under 5 seconds.",
                },
              },
              {
                "@type": "Question",
                name: "What video formats are supported?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "MP4, WebM, and MOV (QuickTime) files up to 200 MB are supported. The output is always a standard .gif file.",
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
            name: "SammaPix Video to GIF Converter",
            applicationCategory: "MultimediaApplication",
            operatingSystem: "Any (browser-based)",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            description:
              "Free online video to GIF converter. Convert MP4, WebM, and MOV clips to animated GIF using FFmpeg.wasm directly in the browser. No upload, no account, no cost.",
          }),
        }}
      />
    </main>
  );
}

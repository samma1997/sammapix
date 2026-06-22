import React from "react";
import type { Metadata } from "next";
import { ArrowLeft, Video, Shield, Zap, Gauge, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import CompressVideoClient from "@/components/tools/CompressVideoClient";
import CompressVideoHeroDemo from "@/components/tools/CompressVideoHeroDemo";
import HowToUse from "@/components/tools/HowToUse";
import RelatedTools from "@/components/tools/RelatedTools";
import { APP_URL } from "@/lib/constants";
import MetaViewContent from "@/components/tracking/MetaViewContent";

const TOOL_URL = `${APP_URL}/tools/compress-video`;
const ACCENT = "#7C3AED";

export const metadata: Metadata = {
  title: "Compress Video Online — Free, No Upload, in Your Browser",
  description:
    "Compress MP4, MOV, WebM and MKV videos in your browser — no upload, no signup. Powered by WebCodecs: shrink files up to 80% in seconds with a live size preview and before/after compare.",
  keywords: [
    "compress video",
    "compress video online",
    "video compressor",
    "compress mp4",
    "reduce video size",
    "compress video without losing quality",
    "compress video for whatsapp",
    "compress video for email",
    "no upload video compressor",
    "compress mov",
  ],
  alternates: {
    canonical: TOOL_URL,
  },
  openGraph: {
    title: "Compress Video Online — Free, No Upload",
    description:
      "Shrink MP4/MOV/WebM up to 80% right in your browser. WebCodecs-powered, no upload, live size preview, before/after compare.",
    url: TOOL_URL,
    siteName: "SammaPix",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SammaPix Compress Video",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Compress Video Online — Free, No Upload",
    description: "Shrink MP4/MOV/WebM up to 80% in your browser. No upload, no signup.",
  },
};

const features = [
  {
    icon: <Zap className="h-5 w-5 text-gray-700" strokeWidth={1.5} />,
    title: "Seconds, not minutes",
    description:
      "Most compressors re-encode with FFmpeg in WebAssembly — slow. SammaPix uses your browser's native, hardware-accelerated WebCodecs encoder, so a 2-minute 1080p clip finishes in seconds.",
  },
  {
    icon: <Shield className="h-5 w-5 text-gray-700" strokeWidth={1.5} />,
    title: "Nothing is uploaded",
    description:
      "The whole compression runs on your device. Your video is never sent to a server — true privacy for personal clips, work footage, or anything confidential.",
  },
  {
    icon: <Gauge className="h-5 w-5 text-gray-700" strokeWidth={1.5} />,
    title: "See the result before you commit",
    description:
      "A live estimated size, a one-tap 'downscale to 1080p' that saves ~75%, and a synchronized before/after player so you can judge quality at the exact same frame.",
  },
];

export default function CompressVideoPage() {
  return (
    <main>
      <MetaViewContent contentName="Compress Video" contentId="compress-video" />

      {/* Hero — Split layout */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-4 sm:pt-5 pb-6">
        <Link
          href="/tools"
          className="inline-flex items-center gap-1.5 text-xs text-[#A3A3A3] dark:text-[#737373] hover:text-[#171717] dark:hover:text-[#E5E5E5] transition-colors mb-2"
        >
          <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.5} />
          All tools
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-4 lg:gap-8 items-center">
          <div>
            <div className="flex items-start gap-3 mb-2">
              <div
                className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center mt-0.5"
                style={{ backgroundColor: `${ACCENT}15`, border: `1px solid ${ACCENT}30` }}
                aria-hidden="true"
              >
                <Video className="h-4 w-4" style={{ color: ACCENT }} strokeWidth={1.5} />
              </div>
              <h1 className="text-xl sm:text-[26px] font-semibold text-[#171717] dark:text-[#E5E5E5] tracking-tight leading-tight">
                Compress Video Free. No Upload
              </h1>
            </div>

            <p className="text-sm text-[#737373] dark:text-[#A3A3A3] leading-relaxed mb-3">
              Shrink{" "}
              <strong className="text-[#171717] dark:text-[#E5E5E5]">MP4, MOV, WebM and MKV</strong>{" "}
              videos up to 80% — right in your browser, in seconds. Powered by WebCodecs, with a live
              size preview and a synced before/after compare. No upload, no signup.
            </p>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#525252] dark:text-[#A3A3A3]">
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2} />
                WebCodecs-fast
              </span>
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2} />
                Before/after compare
              </span>
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2} />
                No upload
              </span>
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2} />
                MP4 + AV1
              </span>
            </div>
          </div>

          <div className="max-w-[380px] w-full mx-auto lg:mx-0 lg:ml-auto">
            <CompressVideoHeroDemo />
          </div>
        </div>
      </section>

      {/* Tool */}
      <CompressVideoClient />

      {/* How to use */}
      <HowToUse
        toolName="Compress Video"
        steps={[
          {
            title: "Drop your video",
            desc: "Drag and drop an MP4, MOV, WebM, MKV or AVI file — up to 500 MB on desktop. It stays on your device.",
          },
          {
            title: "Pick a quality and size",
            desc: "Choose High, Balanced, or Small. If your clip is 4K, keep the one-tap 'Downscale to 1080p' on to save around 75%. See the estimated size update live.",
          },
          {
            title: "Compress and compare",
            desc: "Encoding runs locally via WebCodecs. Play the synced before/after preview, then download your MP4.",
          },
        ]}
        proTip={{
          text: "Going to WhatsApp or email? Pick Balanced + Downscale to 1080p — it usually lands well under the 16-25 MB limits while still looking sharp.",
          linkLabel: "Convert a GIF instead",
          linkHref: "/tools/gif-to-mp4",
        }}
      />

      {/* Features */}
      <section className="py-12 px-4 sm:px-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-6">
            Why this video compressor is different
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {features.map((f) => (
              <div
                key={f.title}
                className="p-5 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md bg-white dark:bg-[#1E1E1E]"
              >
                <div className="h-9 w-9 rounded-md border border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#F5F5F5] dark:bg-[#252525] flex items-center justify-center mb-4">
                  {f.icon}
                </div>
                <h3 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1.5">
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
            How to compress a video without uploading it
          </h2>
          <p className="text-sm text-[#737373] leading-relaxed mb-4">
            Most "free online video compressors" upload your file to a server, re-encode it there,
            and hand you a download link. That means your footage leaves your device, sits in
            someone else&apos;s cloud, and you wait on their queue. SammaPix does the entire job
            locally: it reads the video, re-encodes it with your browser&apos;s built-in video
            encoder, and writes a new MP4 — all without a single byte being uploaded.
          </p>
          <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            Why it&apos;s so much faster than FFmpeg-in-the-browser tools
          </h3>
          <p className="text-sm text-[#737373] leading-relaxed mb-4">
            Older browser compressors ship FFmpeg compiled to WebAssembly. It works, but it
            runs on the CPU with no access to your device&apos;s video hardware, so a short clip
            can take minutes. SammaPix uses the modern WebCodecs API, which taps the same
            hardware encoder your phone and laptop use to record video. In controlled tests that
            difference is roughly 15x — the gap between waiting two minutes and waiting a few
            seconds.
          </p>
          <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            The biggest lever is resolution
          </h3>
          <p className="text-sm text-[#737373] leading-relaxed mb-4">
            A 4K video has four times the pixels of 1080p. For most uses — messaging, email,
            social, embedding on a site — 1080p is indistinguishable on the screens people
            actually watch on, and it cuts the file by around 75% before any quality compression
            even kicks in. That&apos;s why SammaPix offers a one-tap "Downscale to 1080p" and turns
            it on automatically for 4K sources.
          </p>
          <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            Will the quality drop?
          </h3>
          <p className="text-sm text-[#737373] leading-relaxed">
            You control that. "High" keeps the result near-identical to the source; "Balanced" is
            the sweet spot most people want; "Small" pushes for the lightest file. The
            synchronized before/after player lets you scrub both clips to the same frame and judge
            for yourself before downloading. Audio is copied through untouched whenever possible,
            so the sound stays exactly as recorded.
          </p>
        </div>
      </section>

      <RelatedTools toolId="compress-video" />

      {/* HowTo Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: "How to Compress a Video Online Free",
            description:
              "Compress MP4, MOV, WebM and MKV videos in your browser with SammaPix. WebCodecs-powered, no upload, with quality presets and a before/after compare.",
            totalTime: "PT1M",
            tool: {
              "@type": "SoftwareApplication",
              name: "SammaPix Compress Video",
              url: TOOL_URL,
            },
            step: [
              {
                "@type": "HowToStep",
                position: 1,
                name: "Drop your video",
                text: "Drag and drop an MP4, MOV, WebM, MKV or AVI file onto the upload area. Files up to 500 MB on desktop stay entirely on your device.",
                url: TOOL_URL,
              },
              {
                "@type": "HowToStep",
                position: 2,
                name: "Pick quality and size",
                text: "Choose High, Balanced, or Small, and keep 'Downscale to 1080p' on for 4K clips to save around 75%. The estimated output size updates live.",
                url: TOOL_URL,
              },
              {
                "@type": "HowToStep",
                position: 3,
                name: "Compress and download",
                text: "Compression runs locally via WebCodecs. Compare the synced before/after preview, then download your compressed MP4.",
                url: TOOL_URL,
              },
            ],
          }),
        }}
      />

      {/* SoftwareApplication + FAQ + Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "SoftwareApplication",
                name: "SammaPix Compress Video",
                description:
                  "Compress MP4, MOV, WebM and MKV videos directly in your browser using WebCodecs. No upload, quality presets, 1080p downscale, before/after compare.",
                url: TOOL_URL,
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
                  url: APP_URL,
                },
                featureList: [
                  "Compress MP4, MOV, WebM, MKV, AVI",
                  "WebCodecs hardware-accelerated encoding",
                  "Quality presets (High / Balanced / Small)",
                  "One-tap downscale to 1080p",
                  "Live estimated output size",
                  "Synchronized before/after player",
                  "Optional AV1 output",
                  "Client-side — no upload",
                ],
              },
              {
                "@type": "FAQPage",
                mainEntity: [
                  {
                    "@type": "Question",
                    name: "Is this video compressor really free and without upload?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Yes. It is completely free with no signup, and the entire compression happens in your browser using WebCodecs. Your video is never uploaded to any server.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "How much smaller will my video get?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Typically 50-80% smaller, depending on the source. Downscaling a 4K clip to 1080p alone saves around 75%, and the quality presets reduce it further. You see a live estimated size before you start.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Why is it faster than other online compressors?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Most browser compressors use FFmpeg compiled to WebAssembly, which runs on the CPU with no hardware acceleration. SammaPix uses the native WebCodecs encoder, which is roughly 15x faster — seconds instead of minutes.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Will compressing reduce the quality?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "You choose the trade-off with High, Balanced, or Small presets. A synchronized before/after player lets you compare both clips at the same frame before downloading, and audio is copied through untouched when possible.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "What formats and file sizes are supported?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "It accepts MP4, MOV, WebM, MKV, M4V, AVI and 3GP, and outputs MP4 (H.264) by default with an optional AV1 mode. Files up to 500 MB on desktop and 250 MB on mobile are supported.",
                    },
                  },
                ],
              },
              {
                "@type": "BreadcrumbList",
                itemListElement: [
                  {
                    "@type": "ListItem",
                    position: 1,
                    name: "Home",
                    item: APP_URL,
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
                    name: "Compress Video",
                    item: TOOL_URL,
                  },
                ],
              },
            ],
          }),
        }}
      />
    </main>
  );
}

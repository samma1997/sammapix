import React from "react";
import type { Metadata } from "next";
import { ArrowLeft, Film, Shield, TrendingUp } from "lucide-react";
import Link from "next/link";
import GifToMp4Client from "@/components/tools/GifToMp4Client";
import HowToUse from "@/components/tools/HowToUse";
import RelatedTools from "@/components/tools/RelatedTools";
import { APP_URL } from "@/lib/constants";
import MetaViewContent from "@/components/tracking/MetaViewContent";

const TOOL_URL = `${APP_URL}/tools/gif-to-mp4`;

export const metadata: Metadata = {
  title: "GIF to MP4 Converter — Free, Browser-Based",
  description:
    "Convert animated GIF to MP4 (or WebM) online free. Shrink GIFs by 80-90% with high/balanced/small quality presets. Batch, no signup, no upload.",
  keywords: [
    "gif to mp4",
    "gif to mp4 converter",
    "convert gif to mp4",
    "gif to mp4 online free",
    "animated gif to video",
    "gif to webm",
    "reduce gif size",
    "twitter gif",
    "compress animated gif",
  ],
  alternates: {
    canonical: TOOL_URL,
  },
  openGraph: {
    title: "GIF to MP4 Converter — Free, Browser-Based",
    description:
      "Convert animated GIF to MP4 online free. 80-90% smaller files, batch, no upload.",
    url: TOOL_URL,
    siteName: "SammaPix",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SammaPix GIF to MP4 Converter",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GIF to MP4 Converter — Free, Browser-Based",
    description: "Convert animated GIF to MP4. Batch, no upload, 80-90% smaller files.",
  },
};

const features = [
  {
    icon: <TrendingUp className="h-5 w-5 text-gray-700" strokeWidth={1.5} />,
    title: "80-90% smaller",
    description:
      "Modern video codecs (H.264, VP9) crush animated GIFs. A 10 MB GIF typically ends up at 1-2 MB as MP4 with no perceived quality loss.",
  },
  {
    icon: <Shield className="h-5 w-5 text-gray-700" strokeWidth={1.5} />,
    title: "Fully browser-based",
    description:
      "Uses the browser ImageDecoder + MediaRecorder APIs. No FFmpeg upload, no server. Your GIFs never leave your device.",
  },
  {
    icon: <Film className="h-5 w-5 text-gray-700" strokeWidth={1.5} />,
    title: "Batch + quality presets",
    description:
      "Convert up to 10 GIFs per batch (100 on Pro). Pick High (8 Mbps), Balanced (3.5 Mbps), or Small (1.5 Mbps) based on your target.",
  },
];

export default function GifToMp4Page() {
  return (
    <main>
      <MetaViewContent contentName="GIF to MP4 Converter" contentId="gif-to-mp4" />
      {/* Hero SEO */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-8 pb-2">
        <Link
          href="/tools"
          className="inline-flex items-center gap-1.5 text-xs text-[#A3A3A3] dark:text-[#737373] hover:text-[#171717] dark:hover:text-[#E5E5E5] transition-colors mb-5"
        >
          <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.5} />
          All tools
        </Link>

        <div className="flex items-center gap-3 mb-3">
          <div
            className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: "#EC489915", border: "1px solid #EC489930" }}
            aria-hidden="true"
          >
            <Film
              className="h-4.5 w-4.5"
              style={{ color: "#EC4899", width: 18, height: 18 }}
              strokeWidth={1.5}
            />
          </div>
          <h1 className="text-2xl font-semibold text-[#171717] dark:text-[#E5E5E5]">
            GIF to MP4 Converter
          </h1>
        </div>
        <p className="text-[15px] text-[#737373] dark:text-[#A3A3A3] leading-relaxed max-w-xl">
          SammaPix GIF to MP4 Converter is a free online tool that turns animated GIFs into
          MP4 (or WebM) videos instantly in your browser. 80-90% smaller files, same visuals,
          no upload to any server.
        </p>
      </div>

      {/* Tool */}
      <GifToMp4Client />

      {/* How to use */}
      <HowToUse
        toolName="GIF to MP4 Converter"
        steps={[
          {
            title: "Drop your GIF files",
            desc: "Drag and drop animated .gif files — up to 10 per batch (100 on Pro). Max 50 MB each.",
          },
          {
            title: "Pick a quality preset",
            desc: "High (8 Mbps) for crisp detail, Balanced (3.5 Mbps) for general use, Small (1.5 Mbps) for maximum savings.",
          },
          {
            title: "Convert and download",
            desc: "Conversion runs locally via ImageDecoder + MediaRecorder. Download MP4 (or WebM on unsupported browsers) individually or as ZIP.",
          },
        ]}
        proTip={{
          text: "For Twitter, Discord, and most social platforms, MP4 auto-plays like a GIF but loads 10x faster.",
          linkLabel: "Compress more",
          linkHref: "/tools/compress",
        }}
      />

      {/* Features */}
      <section className="py-12 px-4 sm:px-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-6">
            Why convert GIF to MP4?
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
            Why MP4 replaced GIF on the web
          </h2>
          <p className="text-sm text-[#737373] leading-relaxed mb-4">
            GIF is a 1987 format. It stores each frame as an indexed-palette bitmap and uses a
            tiny 256-color table per frame. For animations longer than a second or two, this
            is wildly inefficient — colorful footage can hit 10 MB for a 3-second clip. Modern
            video codecs (H.264 in MP4, VP9 in WebM) use motion estimation, predictive frames,
            and entropy coding to compress the same content 10-20x smaller with no visible loss.
          </p>
          <p className="text-sm text-[#737373] leading-relaxed mb-4">
            Twitter, Discord, Slack, Reddit and most modern sites already convert your uploaded
            GIF to MP4 silently. Doing it ahead of time saves upload bandwidth, lets you embed
            the video yourself with controls, and passes through Content Delivery Networks more
            efficiently.
          </p>
          <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            MP4 vs WebM — which does SammaPix produce?
          </h3>
          <p className="text-sm text-[#737373] leading-relaxed mb-4">
            SammaPix picks MP4 (H.264) where the browser supports encoding it natively. On
            Chrome, Edge, and modern Safari that&apos;s the default. On Firefox the browser may
            fall back to WebM (VP8/VP9) — still playable in every modern app and 80-90%
            smaller than the source GIF.
          </p>
          <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            Do the animations still auto-play?
          </h3>
          <p className="text-sm text-[#737373] leading-relaxed">
            Yes. Every social network treats uploaded MP4 exactly like a GIF for short silent
            clips: auto-play, loop, muted by default. If you embed it in your own HTML,
            add{" "}
            <code className="text-xs bg-[#F5F5F5] dark:bg-[#252525] px-1 py-0.5 rounded">
              autoplay loop muted playsinline
            </code>{" "}
            on the video tag.
          </p>
        </div>
      </section>

      <RelatedTools toolId="gif-to-mp4" />

      {/* HowTo Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: "How to Convert GIF to MP4",
            description:
              "Convert animated GIF to MP4 or WebM using SammaPix. Batch up to 10 files, 3 quality presets, fully client-side.",
            totalTime: "PT2M",
            tool: {
              "@type": "SoftwareApplication",
              name: "SammaPix GIF to MP4 Converter",
              url: TOOL_URL,
            },
            step: [
              {
                "@type": "HowToStep",
                position: 1,
                name: "Drop your GIF files",
                text: "Drag and drop animated .gif files onto the upload area. You can convert up to 10 GIFs per batch on the Free plan and 100 on Pro.",
                url: TOOL_URL,
              },
              {
                "@type": "HowToStep",
                position: 2,
                name: "Pick a quality preset",
                text: "Choose High, Balanced, or Small based on the target bitrate (8/3.5/1.5 Mbps). Balanced is a good default.",
                url: TOOL_URL,
              },
              {
                "@type": "HowToStep",
                position: 3,
                name: "Convert and download",
                text: "Conversion runs locally in your browser using ImageDecoder + MediaRecorder. Download MP4 files individually or all as a ZIP archive.",
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
                name: "SammaPix GIF to MP4 Converter",
                description:
                  "Convert animated GIF to MP4 or WebM directly in your browser. Batch processing, 3 quality presets, no upload.",
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
                  "GIF to MP4 conversion",
                  "Fallback to WebM",
                  "Batch up to 10 files (100 on Pro)",
                  "Quality presets (High / Balanced / Small)",
                  "Up to 50 MB per file",
                  "ZIP download for batches",
                  "Client-side conversion — no upload",
                ],
              },
              {
                "@type": "FAQPage",
                mainEntity: [
                  {
                    "@type": "Question",
                    name: "Is this GIF to MP4 converter really free?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Yes, completely free. No signup required. Free tier supports up to 10 GIFs per batch, 50 MB each; Pro lifts batch to 100.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Are my GIFs uploaded to a server?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "No. SammaPix uses the browser ImageDecoder and MediaRecorder APIs to convert GIF to MP4 locally. Your files never leave your device — complete privacy guaranteed.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Why is MP4 so much smaller than GIF?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "GIF uses a 256-color palette per frame and no inter-frame compression. MP4 (H.264) and WebM (VP9) use motion estimation and predictive frames, delivering the same visual quality at 10-20x smaller file size.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Will the video auto-play like a GIF?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Yes. Every modern social platform (Twitter, Discord, Slack, Reddit) auto-plays muted MP4 just like GIFs. In your own HTML use attributes autoplay, loop, muted, and playsinline on the video tag.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "What if my browser doesn't support the conversion?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "SammaPix requires a browser with ImageDecoder support (Chrome, Edge, Safari 17+). If your browser can't encode H.264 MP4, SammaPix falls back to WebM — still playable everywhere.",
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
                    name: "GIF to MP4 Converter",
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

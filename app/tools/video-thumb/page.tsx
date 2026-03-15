import React from "react";
import type { Metadata } from "next";
import { ArrowRight, Film, Download, Sparkles } from "lucide-react";
import Link from "next/link";
import VideoThumbClient from "@/components/tools/VideoThumbClient";
import { APP_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Video Thumbnail Picker — Extract Best Frame Free | SammaPix",
  description:
    "Extract the perfect thumbnail from any video file. Browse all frames, use AI to pick the best one, and download as JPG, PNG or WebP. 100% browser-based, no upload.",
  keywords: [
    "video thumbnail picker",
    "extract frame from video",
    "video screenshot",
    "video thumbnail generator",
    "video frame extractor",
    "youtube thumbnail maker",
    "thumbnail from video free",
    "video thumbnail download",
    "mp4 thumbnail extractor",
  ],
  alternates: {
    canonical: `${APP_URL}/tools/video-thumb`,
  },
  openGraph: {
    title: "Video Thumbnail Picker — Extract Best Frame Free | SammaPix",
    description:
      "Extract the perfect thumbnail from any video file. Browse all frames, use AI to pick the best one, and download as JPG, PNG or WebP. 100% browser-based.",
    url: `${APP_URL}/tools/video-thumb`,
    siteName: "SammaPix",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SammaPix Video Thumbnail Picker",
      },
    ],
  },
};

const features = [
  {
    icon: <Film className="h-5 w-5 text-gray-700 dark:text-[#A3A3A3]" strokeWidth={1.5} />,
    title: "100% browser-based",
    description:
      "All frame extraction happens locally in your browser using HTML5 Canvas and the Video API. Your video file is never uploaded to any server.",
    highlight: false,
  },
  {
    icon: <Sparkles className="h-5 w-5 text-[#6366F1]" strokeWidth={1.5} />,
    title: "AI picks the best frame",
    description:
      "Use AI scoring (powered by Google Gemini) to automatically identify the most visually interesting and well-composed frame in your video.",
    highlight: true,
  },
  {
    icon: <Download className="h-5 w-5 text-gray-700 dark:text-[#A3A3A3]" strokeWidth={1.5} />,
    title: "JPG, PNG, WebP output",
    description:
      "Download your selected thumbnail in any format. Adjust JPEG/WebP quality with a slider. Extracted at the video's native resolution.",
    highlight: false,
  },
];

const relatedTools = [
  { name: "Compress Images", href: "/tools/compress" },
  { name: "ResizePack", href: "/tools/resizepack" },
  { name: "Convert to WebP", href: "/tools/webp" },
  { name: "AI Alt Text", href: "/tools/alt-text" },
];

export default function VideoThumbPage() {
  return (
    <main>
      {/* Hero SEO */}
      <div className="max-w-3xl mx-auto px-4 pt-10 pb-2">
        <h1 className="text-2xl font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1">
          Video Thumbnail Picker
        </h1>
        <p className="text-sm text-[#737373]">
          Extract frames from any video and pick the perfect thumbnail. Drop an MP4, WebM or MOV file — frames are captured at 2-second intervals, displayed as a grid, and you download the one you want. Use AI Pick Best for an automatic recommendation. Nothing is uploaded.
        </p>
      </div>

      {/* Tool */}
      <VideoThumbClient />

      {/* Features */}
      <section className="py-12 px-4 sm:px-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-6">
            How video thumbnail extraction works
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
                <div
                  className={`h-9 w-9 rounded-md border flex items-center justify-center mb-4 ${
                    f.highlight
                      ? "border-[#C7D2FE] bg-white dark:bg-[#1E1E1E]"
                      : "border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#F5F5F5] dark:bg-[#252525]"
                  }`}
                >
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
            Why video thumbnails matter
          </h2>
          <p className="text-sm text-[#737373] leading-relaxed mb-4">
            A compelling thumbnail is the single biggest factor in whether someone clicks on your video. YouTube reports that 90% of top-performing videos have a custom thumbnail. An eye-catching still frame — not an automatically-generated one — dramatically increases click-through rate.
          </p>
          <p className="text-sm text-[#737373] leading-relaxed mb-4">
            SammaPix Video Thumbnail Picker extracts frames at 2-second intervals giving you a full visual timeline of your video. You can browse all frames, select the perfect moment, and download it in publication-ready quality without any compression artifacts.
          </p>
          <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            What formats are supported?
          </h3>
          <ul className="text-sm text-[#737373] leading-relaxed space-y-2 list-none pl-0">
            <li className="flex items-start gap-2">
              <span className="text-[#6366F1] mt-0.5">—</span>
              MP4 (H.264, H.265) — most common video format
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#6366F1] mt-0.5">—</span>
              WebM — web-optimized video format
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#6366F1] mt-0.5">—</span>
              MOV — Apple QuickTime format from iPhone or macOS
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#6366F1] mt-0.5">—</span>
              Any HTML5-compatible video format your browser supports
            </li>
          </ul>
        </div>
      </section>

      {/* Related tools */}
      <section className="py-12 px-4 sm:px-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-4">
            More free image tools
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
                name: "Video Thumbnail Picker",
                item: `${APP_URL}/tools/video-thumb`,
              },
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
                name: "Does the video get uploaded to a server?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "No. All frame extraction happens entirely in your browser using the HTML5 Video API and Canvas. Your video file never leaves your computer. SammaPix only optionally sends small frame thumbnails to Gemini AI if you use the AI Pick Best feature.",
                },
              },
              {
                "@type": "Question",
                name: "What video formats are supported?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "SammaPix supports MP4, WebM, and MOV (QuickTime) — all formats natively supported by modern web browsers. If your browser can play the video, SammaPix can extract frames from it.",
                },
              },
              {
                "@type": "Question",
                name: "What resolution will the thumbnail be?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Frames are extracted at the native resolution of your video. A 1080p video produces 1920x1080 thumbnails. You can then download in JPG, PNG or WebP format with quality control.",
                },
              },
              {
                "@type": "Question",
                name: "How does AI Pick Best work?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "AI Pick Best sends small thumbnails of each frame to Google Gemini, which evaluates composition, clarity, and visual interest. The highest-scored frame is automatically selected for you. This feature requires signing in and uses your daily AI quota.",
                },
              },
            ],
          }),
        }}
      />

      {/* Software Application Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "SammaPix Video Thumbnail Picker",
            description:
              "Extract frames from video files at 2-second intervals. Browse frames, use AI scoring to find the best thumbnail, and download in JPG, PNG or WebP. 100% browser-based.",
            url: `${APP_URL}/tools/video-thumb`,
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
              "Frame extraction every 2 seconds",
              "Visual frame grid browser",
              "AI scoring with Google Gemini",
              "JPG, PNG, WebP export",
              "Quality slider for lossy formats",
              "Browser-only — no upload",
              "MP4, WebM, MOV support",
            ],
          }),
        }}
      />
    </main>
  );
}

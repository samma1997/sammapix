import React from "react";
import type { Metadata } from "next";
import { ArrowLeft, Star, Shield, Layers } from "lucide-react";
import Link from "next/link";
import IcoGeneratorClient from "@/components/tools/IcoGeneratorClient";
import HowToUse from "@/components/tools/HowToUse";
import RelatedTools from "@/components/tools/RelatedTools";
import { APP_URL } from "@/lib/constants";
import MetaViewContent from "@/components/tracking/MetaViewContent";

const TOOL_URL = `${APP_URL}/tools/ico-generator`;

export const metadata: Metadata = {
  title: "Favicon ICO Generator — Free, Browser-Based",
  description:
    "Generate multi-size favicon.ico files from PNG, SVG, JPG, or WebP. Pick sizes (16, 32, 48, 64, 128, 256) and download the .ico instantly. No signup, no upload.",
  keywords: [
    "favicon generator",
    "ico generator",
    "favicon ico",
    "png to ico",
    "svg to ico",
    "multi-size favicon",
    "favicon.ico",
    "website icon",
    "browser tab icon",
  ],
  alternates: {
    canonical: TOOL_URL,
  },
  openGraph: {
    title: "Favicon ICO Generator — Free, Browser-Based",
    description:
      "Multi-size favicon.ico from any image — PNG, SVG, JPG, WebP. No upload, no signup.",
    url: TOOL_URL,
    siteName: "SammaPix",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SammaPix Favicon ICO Generator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Favicon ICO Generator — Free, Browser-Based",
    description: "Generate multi-size favicon.ico from any image. Free, no upload.",
  },
};

const features = [
  {
    icon: <Layers className="h-5 w-5 text-gray-700" strokeWidth={1.5} />,
    title: "Multi-size .ico",
    description:
      "Pack 16, 32, 48, 64, 128 and 256 px variants into a single .ico file — browsers pick the sharpest size automatically.",
  },
  {
    icon: <Shield className="h-5 w-5 text-gray-700" strokeWidth={1.5} />,
    title: "Fully browser-based",
    description:
      "ICO file is assembled locally with the native Canvas API and a tiny JS encoder. No upload, no server, your image stays on your device.",
  },
  {
    icon: <Star className="h-5 w-5 text-gray-700" strokeWidth={1.5} />,
    title: "Any source format",
    description:
      "Start from PNG, SVG, JPG, WebP or GIF. Transparency is preserved — a square source 512×512 or bigger gives the cleanest result.",
  },
];

export default function IcoGeneratorPage() {
  return (
    <main>
      <MetaViewContent contentName="Favicon ICO Generator" contentId="ico-generator" />
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
            style={{ backgroundColor: "#0EA5E915", border: "1px solid #0EA5E930" }}
            aria-hidden="true"
          >
            <Star
              className="h-4.5 w-4.5"
              style={{ color: "#0EA5E9", width: 18, height: 18 }}
              strokeWidth={1.5}
            />
          </div>
          <h1 className="text-2xl font-semibold text-[#171717] dark:text-[#E5E5E5]">
            Favicon ICO Generator
          </h1>
        </div>
        <p className="text-[15px] text-[#737373] dark:text-[#A3A3A3] leading-relaxed max-w-xl">
          SammaPix Favicon Generator builds a real multi-size .ico file from any image, directly
          in your browser. Supports PNG, SVG, JPG, WebP and GIF &mdash; no upload, no signup.
        </p>
      </div>

      {/* Tool */}
      <IcoGeneratorClient />

      {/* How to use */}
      <HowToUse
        toolName="Favicon ICO Generator"
        steps={[
          {
            title: "Upload your source image",
            desc: "PNG or SVG work best, but JPG, WebP and GIF are all supported. A square source 512×512 or bigger gives the cleanest result.",
          },
          {
            title: "Pick sizes",
            desc: "16/32/48 cover browser tabs and Windows taskbar. Add 64/128/256 for modern high-DPI displays and Windows 10/11 shortcuts.",
          },
          {
            title: "Download favicon.ico",
            desc: "SammaPix encodes all sizes into one .ico file locally. Drop it in your site root and add one <link> tag.",
          },
        ]}
        proTip={{
          text: "For dark/light mode and modern browsers, also ship a SVG favicon — much smaller and scales infinitely.",
          linkLabel: "Rasterize SVG to PNG",
          linkHref: "/tools/svg-to-png",
        }}
      />

      {/* Features */}
      <section className="py-12 px-4 sm:px-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-6">
            Why you still need a favicon.ico
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
            Which favicon sizes should I include?
          </h2>
          <p className="text-sm text-[#737373] leading-relaxed mb-4">
            A modern .ico file is just a container for multiple PNG variants of the same icon.
            Browsers and operating systems each pick the size that best matches where the icon is
            displayed, from a 16×16 slot in a browser tab to a 256×256 shortcut on Windows 11.
          </p>
          <ul className="list-disc pl-5 text-sm text-[#737373] leading-relaxed mb-4 space-y-1">
            <li>
              <strong>16×16</strong> — browser tab, bookmark bar (required)
            </li>
            <li>
              <strong>32×32</strong> — Retina browser tabs, macOS Dock at small sizes
            </li>
            <li>
              <strong>48×48</strong> — Windows taskbar (shortcuts)
            </li>
            <li>
              <strong>64×64 &amp; 128×128</strong> — HiDPI operating systems
            </li>
            <li>
              <strong>256×256</strong> — Windows 10/11 large tiles
            </li>
          </ul>
          <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            favicon.ico vs SVG favicon
          </h3>
          <p className="text-sm text-[#737373] leading-relaxed mb-4">
            Modern browsers also accept an SVG favicon, which is smaller and scales to any size
            perfectly. Use both: a multi-size <code className="text-xs bg-[#F5F5F5] dark:bg-[#252525] px-1 py-0.5 rounded">.ico</code>{" "}
            as a universal fallback plus a <code className="text-xs bg-[#F5F5F5] dark:bg-[#252525] px-1 py-0.5 rounded">.svg</code>{" "}
            for Chrome/Firefox/Edge. Legacy user agents that only read .ico will still get the right icon.
          </p>
          <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            How do I add the favicon to my site?
          </h3>
          <pre className="text-[11px] leading-relaxed bg-[#F5F5F5] dark:bg-[#0F0F0F] text-[#171717] dark:text-[#E5E5E5] p-4 rounded overflow-x-auto mb-4">
            <code>{`<link rel="icon" href="/favicon.ico" sizes="any">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">`}</code>
          </pre>
          <p className="text-sm text-[#737373] leading-relaxed">
            Drop <code className="text-xs bg-[#F5F5F5] dark:bg-[#252525] px-1 py-0.5 rounded">favicon.ico</code> in
            your site root and add the tags to the document <code>&lt;head&gt;</code>. Clear the browser cache to
            see it update.
          </p>
        </div>
      </section>

      <RelatedTools toolId="ico-generator" />

      {/* HowTo Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: "How to Create a Favicon ICO File",
            description:
              "Build a multi-size favicon.ico from any image using SammaPix. Client-side, no upload, supports PNG, SVG, JPG, WebP and GIF sources.",
            totalTime: "PT1M",
            tool: {
              "@type": "SoftwareApplication",
              name: "SammaPix Favicon ICO Generator",
              url: TOOL_URL,
            },
            step: [
              {
                "@type": "HowToStep",
                position: 1,
                name: "Upload your source image",
                text: "Drop a PNG, SVG, JPG, WebP or GIF. Square images 512×512 or bigger give the cleanest downsampling.",
                url: TOOL_URL,
              },
              {
                "@type": "HowToStep",
                position: 2,
                name: "Select favicon sizes",
                text: "Pick which sizes to include (16, 32, 48 recommended as a minimum). Add 64, 128 or 256 for HiDPI displays.",
                url: TOOL_URL,
              },
              {
                "@type": "HowToStep",
                position: 3,
                name: "Download favicon.ico",
                text: "The tool encodes all selected sizes into a single .ico file locally. Drop it in your site root and add one <link> tag.",
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
                name: "SammaPix Favicon ICO Generator",
                description:
                  "Generate multi-size favicon.ico files from any image directly in your browser. No upload, no signup.",
                url: TOOL_URL,
                applicationCategory: "DeveloperApplication",
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
                  "PNG/SVG/JPG/WebP/GIF to ICO",
                  "Up to 6 sizes in one file (16/32/48/64/128/256)",
                  "Transparency preserved",
                  "Client-side conversion — no upload",
                  "Built-in HTML integration snippet",
                ],
              },
              {
                "@type": "FAQPage",
                mainEntity: [
                  {
                    "@type": "Question",
                    name: "Is this favicon generator really free?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Yes, completely free. No signup, no limits, no upload. The ICO file is assembled locally in your browser.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "What source image should I use?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Square images work best — 512×512 PNG or an SVG is ideal. SammaPix downscales with aspect-ratio preservation so rectangular sources will be padded to square.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Which sizes should I include?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "16, 32 and 48 cover browser tabs, bookmarks and the Windows taskbar. Add 64, 128 and 256 for Windows 10/11 shortcuts and HiDPI displays. Six sizes typically weigh 30-80 KB total.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Does the output ICO preserve transparency?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Yes. The .ico wraps PNG variants which all support 8-bit alpha, so transparent regions remain transparent in the final icon.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "How do I add the favicon to my site?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Drop favicon.ico in your site root and add <link rel='icon' href='/favicon.ico' sizes='any'> to the document head. For modern browsers also ship an SVG favicon alongside it.",
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
                    name: "Favicon ICO Generator",
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

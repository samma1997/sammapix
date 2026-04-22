import React from "react";
import type { Metadata } from "next";
import { ArrowLeft, Palette, Shield, Copy } from "lucide-react";
import Link from "next/link";
import ColorPickerClient from "@/components/tools/ColorPickerClient";
import HowToUse from "@/components/tools/HowToUse";
import RelatedTools from "@/components/tools/RelatedTools";
import { APP_URL } from "@/lib/constants";
import MetaViewContent from "@/components/tracking/MetaViewContent";

const TOOL_URL = `${APP_URL}/tools/color-picker`;

export const metadata: Metadata = {
  title: "Image Color Picker — Free, Browser-Based Eyedropper",
  description:
    "Pick any color from an image and get instant HEX, RGB, HSL codes. Auto-extracts a 6-color dominant palette. No upload, no signup — fully client-side.",
  keywords: [
    "color picker",
    "image color picker",
    "eyedropper",
    "hex color from image",
    "rgb color picker",
    "palette extractor",
    "color palette from image",
    "dominant colors",
    "brand colors from image",
  ],
  alternates: {
    canonical: TOOL_URL,
  },
  openGraph: {
    title: "Image Color Picker — Free, Browser-Based Eyedropper",
    description:
      "Pick HEX/RGB/HSL from any image + auto-extract 6-color palette. No upload.",
    url: TOOL_URL,
    siteName: "SammaPix",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SammaPix Image Color Picker",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Image Color Picker — Free, Browser-Based",
    description: "Eyedrop colors from any image. HEX, RGB, HSL + auto palette.",
  },
};

const features = [
  {
    icon: <Copy className="h-5 w-5 text-gray-700" strokeWidth={1.5} />,
    title: "HEX / RGB / HSL",
    description:
      "One click copies the color in your preferred format. Designers grab HEX, frontend devs RGB, creative tools HSL — all three always available.",
  },
  {
    icon: <Palette className="h-5 w-5 text-gray-700" strokeWidth={1.5} />,
    title: "Auto palette extraction",
    description:
      "SammaPix runs k-means clustering on the image to surface the 6 most dominant colors. Great for brand matching or moodboards.",
  },
  {
    icon: <Shield className="h-5 w-5 text-gray-700" strokeWidth={1.5} />,
    title: "Fully browser-based",
    description:
      "Everything runs on the Canvas API in your tab. Images never upload, colors never leave your device.",
  },
];

export default function ColorPickerPage() {
  return (
    <main>
      <MetaViewContent contentName="Image Color Picker" contentId="color-picker" />
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
            style={{ backgroundColor: "#A855F715", border: "1px solid #A855F730" }}
            aria-hidden="true"
          >
            <Palette
              className="h-4.5 w-4.5"
              style={{ color: "#A855F7", width: 18, height: 18 }}
              strokeWidth={1.5}
            />
          </div>
          <h1 className="text-2xl font-semibold text-[#171717] dark:text-[#E5E5E5]">
            Image Color Picker
          </h1>
        </div>
        <p className="text-[15px] text-[#737373] dark:text-[#A3A3A3] leading-relaxed max-w-xl">
          SammaPix Color Picker lets you eyedrop any pixel from an image and copy the HEX, RGB
          or HSL value. Also extracts the 6 most dominant colors as a one-click palette &mdash;
          fully in your browser.
        </p>
      </div>

      {/* Tool */}
      <ColorPickerClient />

      {/* How to use */}
      <HowToUse
        toolName="Image Color Picker"
        steps={[
          {
            title: "Upload an image",
            desc: "Drop a JPG, PNG, WebP or GIF. Max 20 MB. Runs entirely in your browser.",
          },
          {
            title: "Hover and click",
            desc: "Move over the image to preview the color under the cursor, then click to pick it.",
          },
          {
            title: "Copy the format you need",
            desc: "Toggle HEX / RGB / HSL and copy with one click. Dominant palette is auto-generated below.",
          },
        ]}
        proTip={{
          text: "Sampling from a logo PNG? Use Remove Background first to skip the white fringe and grab clean brand colors.",
          linkLabel: "Remove background",
          linkHref: "/tools/remove-bg",
        }}
      />

      {/* Features */}
      <section className="py-12 px-4 sm:px-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-6">
            Why pick colors from images in the browser?
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
            HEX, RGB, HSL &mdash; which format do you need?
          </h2>
          <p className="text-sm text-[#737373] leading-relaxed mb-4">
            HEX (like <code className="text-xs bg-[#F5F5F5] dark:bg-[#252525] px-1 py-0.5 rounded">#A855F7</code>)
            is the web default &mdash; short, unambiguous, works everywhere CSS runs. RGB (<code className="text-xs bg-[#F5F5F5] dark:bg-[#252525] px-1 py-0.5 rounded">rgb(168,
            85, 247)</code>) exposes red, green and blue channels independently, useful when you need to
            mix with transparency or compute deltas. HSL (<code className="text-xs bg-[#F5F5F5] dark:bg-[#252525] px-1 py-0.5 rounded">hsl(270,
            91%, 65%)</code>) separates hue, saturation and lightness &mdash; ideal for building tint ramps or
            adjusting a color perceptually.
          </p>
          <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            How does the palette extraction work?
          </h3>
          <p className="text-sm text-[#737373] leading-relaxed mb-4">
            SammaPix subsamples pixels across the image and runs k-means clustering on the RGB values.
            The six largest clusters become your palette, ordered from most to least frequent. Fully
            transparent pixels are skipped so icons and logos return clean brand colors.
          </p>
          <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            Why not use the browser native EyeDropper?
          </h3>
          <p className="text-sm text-[#737373] leading-relaxed">
            Chrome&apos;s native EyeDropper API only works on live screen pixels, not arbitrary image
            files. SammaPix loads the image into a canvas so you can hover, zoom, and pick any pixel
            deterministically &mdash; plus it gives you a palette for free.
          </p>
        </div>
      </section>

      <RelatedTools toolId="color-picker" />

      {/* HowTo Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: "How to Pick Colors From an Image",
            description:
              "Eyedrop any pixel and get HEX, RGB or HSL codes. Extract a dominant color palette — all in your browser.",
            totalTime: "PT30S",
            tool: {
              "@type": "SoftwareApplication",
              name: "SammaPix Image Color Picker",
              url: TOOL_URL,
            },
            step: [
              {
                "@type": "HowToStep",
                position: 1,
                name: "Upload an image",
                text: "Drop a JPG, PNG, WebP or GIF file (max 20 MB). The image is loaded into a local canvas.",
                url: TOOL_URL,
              },
              {
                "@type": "HowToStep",
                position: 2,
                name: "Hover and click to pick",
                text: "Move the cursor across the image to preview the color under it, then click to capture the pixel.",
                url: TOOL_URL,
              },
              {
                "@type": "HowToStep",
                position: 3,
                name: "Copy HEX, RGB or HSL",
                text: "Switch format (HEX/RGB/HSL) and copy the picked color. A 6-color dominant palette is auto-generated underneath.",
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
                name: "SammaPix Image Color Picker",
                description:
                  "Eyedrop any color from an image and auto-extract a dominant palette. HEX, RGB, HSL — no upload, no signup.",
                url: TOOL_URL,
                applicationCategory: "DesignApplication",
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
                  "Pixel-perfect eyedropper on uploaded images",
                  "HEX, RGB and HSL output formats",
                  "Auto 6-color dominant palette via k-means",
                  "Click-to-copy with feedback",
                  "Up to 20 MB per image",
                  "Client-side — no upload",
                ],
              },
              {
                "@type": "FAQPage",
                mainEntity: [
                  {
                    "@type": "Question",
                    name: "Is this image color picker really free?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Yes, completely free, no signup required. Everything runs in your browser with no limits.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Is my image uploaded anywhere?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "No. SammaPix draws the image onto a local canvas and samples pixels in your tab. Your image never leaves your device.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Which color format should I pick?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "HEX is the web default. RGB is useful when mixing with transparency. HSL makes it easy to adjust hue/saturation/lightness independently. SammaPix gives you all three with one click.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "How is the palette calculated?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "SammaPix subsamples around 10,000 pixels and runs k-means clustering for 6 iterations. Six centroids become your palette, ordered by cluster size.",
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
                    name: "Image Color Picker",
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

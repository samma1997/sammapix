import React from "react";
import type { Metadata } from "next";
import { ArrowLeft, Type, Shield, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import AddTextToImageClient from "@/components/tools/AddTextToImageClient";
import AddTextToImageHeroDemo from "@/components/tools/AddTextToImageHeroDemo";
import HowToUse from "@/components/tools/HowToUse";
import RelatedTools from "@/components/tools/RelatedTools";
import { APP_URL } from "@/lib/constants";
import MetaViewContent from "@/components/tracking/MetaViewContent";

const TOOL_URL = `${APP_URL}/tools/add-text-to-image`;

export const metadata: Metadata = {
  title: "Add Text to an Image Online Free: No Upload",
  description:
    "Write text on any photo in your browser. Choose font, size, color, outline, position. Live preview. No upload, no signup. Files never leave your device.",
  keywords: [
    "add text to image",
    "add text to photo",
    "write on image",
    "image caption maker",
    "text on picture",
    "add words to photo",
    "add caption to photo free",
    "text overlay image",
    "write text on photo online free",
    "no upload image text",
    "add text to photo free",
    "photo text editor online",
  ],
  alternates: {
    canonical: TOOL_URL,
  },
  openGraph: {
    title: "Add Text to an Image Online Free — No Upload",
    description:
      "Write text on any photo in your browser. Choose font, size, color, outline, position. 100% private — files never leave your device.",
    url: TOOL_URL,
    siteName: "SammaPix",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SammaPix Add Text to Image Tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Add Text to an Image Online Free — No Upload",
    description: "Font, size, color, outline, 9-point position grid. Live preview. No signup.",
  },
};

const features = [
  {
    icon: <Type className="h-5 w-5 text-gray-700 dark:text-gray-300" strokeWidth={1.5} />,
    title: "Full text control",
    description:
      "Choose font family (Arial, Helvetica, Georgia, Times New Roman, Courier New, Verdana, Impact), size from 10 to 200 px, text color, outline color and width, opacity and optional drop shadow for readability on complex backgrounds.",
  },
  {
    icon: <Shield className="h-5 w-5 text-gray-700 dark:text-gray-300" strokeWidth={1.5} />,
    title: "Fully private, no upload",
    description:
      "All processing happens in your browser using the native Canvas API. Your images and text never leave your device and are never stored on any server.",
  },
  {
    icon: <CheckCircle2 className="h-5 w-5 text-gray-700 dark:text-gray-300" strokeWidth={1.5} />,
    title: "Live preview",
    description:
      "See exactly where your text will appear as you type and adjust settings. The 3x3 position grid lets you place text in any corner, edge or center, with fine-tuned X/Y offset sliders.",
  },
];

export default function AddTextToImagePage() {
  return (
    <main>
      <MetaViewContent contentName="Add Text to Image" contentId="add-text-to-image" />

      {/* Hero split layout */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-4 sm:pt-5 pb-6">
        <Link
          href="/tools"
          className="inline-flex items-center gap-1.5 text-xs text-[#A3A3A3] dark:text-[#737373] hover:text-[#171717] dark:hover:text-[#E5E5E5] transition-colors mb-2"
        >
          <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.5} />
          All tools
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-6 lg:gap-10 items-center">
          {/* Left: copy */}
          <div>
            <div className="flex items-start gap-3 mb-2">
              <div
                className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center mt-0.5"
                style={{ backgroundColor: "#0EA5E915", border: "1px solid #0EA5E930" }}
                aria-hidden="true"
              >
                <Type className="h-4 w-4" style={{ color: "#0EA5E9" }} strokeWidth={1.5} />
              </div>
              <h1 className="text-xl sm:text-[26px] font-semibold text-[#171717] dark:text-[#E5E5E5] tracking-tight leading-tight">
                Add Text to an Image. Free, No Upload
              </h1>
            </div>

            <p className="text-sm text-[#737373] dark:text-[#A3A3A3] leading-relaxed mb-3">
              Write text on any photo directly in your browser.{" "}
              <strong className="text-[#171717] dark:text-[#E5E5E5]">No upload required</strong>
              {" "}— everything runs on your device. Pick font, size, color, outline, position and see
              the result live before downloading.
            </p>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#525252] dark:text-[#A3A3A3]">
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2} />
                7 font families
              </span>
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2} />
                Color + outline + shadow
              </span>
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2} />
                9-position grid + offset
              </span>
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2} />
                100% private
              </span>
            </div>
          </div>

          {/* Right: hero demo */}
          <div className="max-w-[460px] w-full mx-auto lg:mx-0 lg:ml-auto">
            <AddTextToImageHeroDemo />
          </div>
        </div>
      </section>

      {/* Tool */}
      <AddTextToImageClient />

      {/* How to use */}
      <HowToUse
        toolName="Add Text to Image"
        steps={[
          {
            title: "Drop your image",
            desc: "Drag and drop a JPG, PNG, WebP or any image file onto the upload area, or click to browse. Works with a single image so you can customize the text for each photo.",
          },
          {
            title: "Type your text and choose style",
            desc: "Enter your text (multi-line supported). Pick font family, size, text color, outline color and width, opacity and shadow. Use the 3x3 grid to choose position (top-left to bottom-right) and fine-tune with X/Y offset sliders. The live preview updates instantly.",
          },
          {
            title: "Download the result",
            desc: "Click Add text to image to render the final version. Download it — the output format matches your input (JPG stays JPG, PNG stays PNG). Files never leave your browser.",
          },
        ]}
        proTip={{
          text: "For watermarks, enable outline + shadow and set opacity to 70-80% so the text is visible but not intrusive.",
          linkLabel: "Try Watermark tool",
          linkHref: "/tools/stampit",
        }}
      />

      {/* Features */}
      <section className="py-12 px-4 sm:px-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-6">
            Why add text to images in your browser?
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
            When do you need to add text to a photo?
          </h2>
          <p className="text-sm text-[#737373] leading-relaxed mb-4">
            Adding text to an image is one of the most common photo editing tasks. Use cases range from
            simple captions on travel photos to copyright watermarks on professional shots, date stamps
            on event pictures, quotes on inspirational posts and call-to-action text on promotional
            graphics. With SammaPix you do this entirely in your browser in seconds — no Photoshop,
            no Canva login required.
          </p>
          <p className="text-sm text-[#737373] leading-relaxed mb-4">
            The 9-point position grid covers all standard placements: corners for credits and
            watermarks, center for overlay quotes, bottom for captions. The X and Y offset sliders give
            you pixel-level control when the grid position is not quite right. Use the outline (stroke)
            option to make white text readable on light backgrounds, or black text readable on dark
            backgrounds.
          </p>
          <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            What fonts are available?
          </h3>
          <p className="text-sm text-[#737373] leading-relaxed mb-4">
            SammaPix uses web-safe system fonts: Arial, Helvetica, Georgia, Times New Roman,
            Courier New, Verdana and Impact. These are available on every device without downloading
            anything, which means the text renders identically in the preview and the final export.
            External fonts are not supported to avoid Content Security Policy issues and privacy
            concerns from third-party font CDNs.
          </p>
          <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            Does adding text reduce image quality?
          </h3>
          <p className="text-sm text-[#737373] leading-relaxed mb-4">
            For JPG output, SammaPix re-encodes at 93% quality, which is visually lossless for most
            use cases. PNG and WebP output are lossless. The text is rasterized at the full resolution
            of your original image, so there is no downscaling. If you need to avoid any re-encoding,
            keep the original file format and opt for PNG input.
          </p>
          <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            What is the difference between outline and shadow?
          </h3>
          <p className="text-sm text-[#737373] leading-relaxed">
            The <strong>outline</strong> (stroke) draws a solid border around each letter in a color
            you choose. It is the most effective way to make text readable on any background —
            white text with a black outline is legible on both light and dark areas. The{" "}
            <strong>shadow</strong> adds a soft drop shadow beneath the text that creates depth and
            separation. You can use both at the same time. Start with outline width 2-4 px for
            clean results.
          </p>
        </div>
      </section>

      {/* Internal links */}
      <section className="py-8 px-4 sm:px-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-2xl mx-auto">
          <p className="text-xs text-[#737373] dark:text-[#A3A3A3] leading-relaxed">
            After adding text, you may want to{" "}
            <Link href="/tools/stampit" className="underline hover:text-[#525252] dark:hover:text-[#E5E5E5]">
              add a logo watermark with Stamp It
            </Link>
            ,{" "}
            <Link href="/tools/add-border" className="underline hover:text-[#525252] dark:hover:text-[#E5E5E5]">
              add a border or frame
            </Link>
            , or{" "}
            <Link href="/tools/croproatio" className="underline hover:text-[#525252] dark:hover:text-[#E5E5E5]">
              crop it to an exact aspect ratio
            </Link>
            {" "}before sharing.
          </p>
        </div>
      </section>

      <RelatedTools toolId="add-text-to-image" />

      {/* HowTo Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: "How to Add Text to an Image Online for Free",
            description:
              "Add text to any photo in your browser with SammaPix. Choose font, color, outline, position. No upload required.",
            totalTime: "PT1M",
            tool: {
              "@type": "SoftwareApplication",
              name: "SammaPix Add Text to Image",
              url: TOOL_URL,
            },
            step: [
              {
                "@type": "HowToStep",
                position: 1,
                name: "Drop your image",
                text: "Drag and drop a JPG, PNG or WebP image onto the upload area or click to browse. Single image workflow.",
                url: TOOL_URL,
              },
              {
                "@type": "HowToStep",
                position: 2,
                name: "Type your text and set style",
                text: "Enter text, pick font, size, color and outline. Use the 9-point position grid and offset sliders. Preview updates live.",
                url: TOOL_URL,
              },
              {
                "@type": "HowToStep",
                position: 3,
                name: "Download the result",
                text: "Click Add text to image to render, then download. Output format matches input. Files never leave your browser.",
                url: TOOL_URL,
              },
            ],
          }),
        }}
      />

      {/* SoftwareApplication + FAQPage + BreadcrumbList Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "SoftwareApplication",
                name: "SammaPix Add Text to Image",
                description:
                  "Add text to any photo for free in your browser. Choose font, size, color, outline, shadow, position. Live preview. No upload, no signup.",
                url: TOOL_URL,
                applicationCategory: "PhotographyApplication",
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
                  "7 web-safe font families (Arial, Helvetica, Georgia, Times New Roman, Courier New, Verdana, Impact)",
                  "Font size from 10 to 200 px",
                  "Text color and outline (stroke) color with color picker",
                  "Outline width from 0 to 20 px for readability on any background",
                  "Optional drop shadow for depth",
                  "9-point position grid (top, center, bottom x left, center, right)",
                  "Fine-tuned X and Y offset sliders",
                  "Multi-line text support",
                  "Client-side only — files never leave your browser",
                ],
              },
              {
                "@type": "FAQPage",
                mainEntity: [
                  {
                    "@type": "Question",
                    name: "Is this add text to image tool free?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Yes, completely free. No signup, no watermark, no upload. You can add text to any image with no time limit and no restrictions.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Are my images uploaded to a server?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "No. All processing is done in your browser using the native Canvas API. Your images and the text you type never leave your device and are never stored on any server.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "How do I make text readable on any background?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Use the outline (stroke) option with a contrasting color. For white text on a mixed background, set outline color to black and outline width to 2-4 px. Enable shadow for additional depth. This works on both light and dark areas of the image.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Can I add multi-line text?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Yes. Press Enter in the text box to add a new line. Each line is rendered with the same font settings and appropriate line spacing. The position grid and offset sliders control the placement of the entire text block.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "What fonts are available?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "SammaPix uses 7 web-safe system fonts: Arial, Helvetica, Georgia, Times New Roman, Courier New, Verdana and Impact. These are available on every device without downloading anything, so the text renders identically in the preview and the export.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Will adding text reduce image quality?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "For JPG output the image is re-encoded at 93% quality, which is visually lossless. PNG and WebP are lossless. The text is drawn at full original resolution, so there is no downscaling of your image content.",
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
                    name: "Add Text to Image",
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

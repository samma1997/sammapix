import React from "react";
import type { Metadata } from "next";
import { ArrowLeft, FileText, Shield, Stamp, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import PdfWatermarkClient from "@/components/tools/PdfWatermarkClient";
import PdfWatermarkHeroDemo from "@/components/tools/PdfWatermarkHeroDemo";
import HowToUse from "@/components/tools/HowToUse";
import RelatedTools from "@/components/tools/RelatedTools";
import { APP_URL } from "@/lib/constants";
import MetaViewContent from "@/components/tracking/MetaViewContent";

const TOOL_URL = `${APP_URL}/tools/pdf-watermark`;

export const metadata: Metadata = {
  title: "Watermark a PDF Online Free: No Upload",
  description:
    "Add a text or image watermark to every PDF page in your browser. CONFIDENTIAL, DRAFT, logo — choose opacity, rotation and position. No upload, 100% private.",
  keywords: [
    "watermark pdf",
    "add watermark to pdf",
    "pdf watermark online",
    "stamp pdf confidential",
    "add logo to pdf",
    "watermark pdf no upload",
    "pdf watermark free",
    "add draft watermark to pdf",
    "confidential watermark pdf",
    "pdf stamp online",
    "watermark pdf browser",
    "add text watermark pdf",
  ],
  alternates: {
    canonical: TOOL_URL,
  },
  openGraph: {
    title: "Watermark a PDF Online Free: No Upload",
    description:
      "Add text or image watermarks to every page of a PDF in your browser. Choose opacity, rotation and position. 100% private — your file never leaves your device.",
    url: TOOL_URL,
    siteName: "SammaPix",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SammaPix Watermark PDF Tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Watermark a PDF Free — No Upload",
    description:
      "Stamp CONFIDENTIAL, DRAFT, or your logo on every PDF page locally. No upload, no signup.",
  },
};

const features = [
  {
    icon: <Stamp className="h-5 w-5 text-gray-700" strokeWidth={1.5} />,
    title: "Text and image watermarks",
    description:
      "Choose between a text watermark (CONFIDENTIAL, DRAFT, or any custom text) or upload a PNG/JPG logo. Control font size, color, opacity, rotation, and position.",
  },
  {
    icon: <Shield className="h-5 w-5 text-gray-700" strokeWidth={1.5} />,
    title: "Fully private, no upload",
    description:
      "Everything runs in your browser via pdf-lib. Your PDF and logo never leave your device, are never stored on a server, and require no account to use.",
  },
  {
    icon: <FileText className="h-5 w-5 text-gray-700" strokeWidth={1.5} />,
    title: "Three placement modes",
    description:
      "Center (diagonal stamp), Tile (repeated pattern across the whole page) or Bottom. Combine with opacity and rotation for exactly the look you need.",
  },
];

export default function PdfWatermarkPage() {
  return (
    <main>
      <MetaViewContent contentName="PDF Watermark" contentId="pdf-watermark" />

      {/* Hero — split layout */}
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
                style={{ backgroundColor: "#EF444415", border: "1px solid #EF444430" }}
                aria-hidden="true"
              >
                <Stamp className="h-4 w-4" style={{ color: "#EF4444" }} strokeWidth={1.5} />
              </div>
              <h1 className="text-xl sm:text-[26px] font-semibold text-[#171717] dark:text-[#E5E5E5] tracking-tight leading-tight">
                Watermark a PDF. Free.
              </h1>
            </div>

            <p className="text-sm text-[#737373] dark:text-[#A3A3A3] leading-relaxed mb-3">
              Stamp a watermark on every page of a PDF directly in your browser.{" "}
              <strong className="text-[#171717] dark:text-[#E5E5E5]">No upload required</strong>
              {" "}— everything runs locally using pdf-lib. Choose text (CONFIDENTIAL, DRAFT,
              custom) or upload a logo, then control opacity, rotation and position.
            </p>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#525252] dark:text-[#A3A3A3]">
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2} />
                Text and image watermarks
              </span>
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2} />
                Center / Tile / Bottom
              </span>
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2} />
                Opacity and rotation controls
              </span>
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2} />
                100% private
              </span>
            </div>
          </div>

          {/* Right: hero demo */}
          <div className="max-w-[460px] w-full mx-auto lg:mx-0 lg:ml-auto">
            <PdfWatermarkHeroDemo />
          </div>
        </div>
      </section>

      {/* Tool */}
      <PdfWatermarkClient />

      {/* How to use */}
      <HowToUse
        toolName="PDF Watermark"
        steps={[
          {
            title: "Drop your PDF",
            desc: "Drag and drop any PDF onto the upload area or click to browse. The tool reads the file instantly in your browser — no upload to any server.",
          },
          {
            title: "Choose watermark type and settings",
            desc: "Select Text to stamp CONFIDENTIAL, DRAFT or any custom text, then set color, font size, opacity, rotation and position. Select Image to upload a PNG/JPG logo with its own opacity and scale.",
          },
          {
            title: "Download the watermarked PDF",
            desc: "Click Add Watermark. The stamp is drawn on every page and the file downloads instantly. Text stays selectable on the rest of the document.",
          },
        ]}
        proTip={{
          text: "Need to protect the watermarked PDF with a password too? Try PDF Protect after.",
          linkLabel: "See PDF Protect",
          linkHref: "/tools/pdf-protect",
        }}
      />

      {/* Features */}
      <section className="py-12 px-4 sm:px-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-6">
            Why watermark a PDF in your browser?
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
            How PDF watermarking works
          </h2>
          <p className="text-sm text-[#737373] leading-relaxed mb-4">
            A PDF watermark is text or an image drawn directly onto every page of the document.
            Unlike a header or footer in a word processor, a PDF watermark is embedded into the
            page content layer itself using{" "}
            <code className="text-xs bg-[#F5F5F5] dark:bg-[#252525] px-1 py-0.5 rounded">page.drawText()</code>
            {" "}or{" "}
            <code className="text-xs bg-[#F5F5F5] dark:bg-[#252525] px-1 py-0.5 rounded">page.drawImage()</code>
            {" "}from the pdf-lib library. This tool runs entirely client-side: the PDF is never
            sent anywhere.
          </p>
          <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            Which opacity should I use?
          </h3>
          <p className="text-sm text-[#737373] leading-relaxed mb-4">
            For a <strong className="text-[#171717] dark:text-[#E5E5E5]">subtle background stamp</strong>
            {" "}(barely visible, useful for internal drafts), set opacity between 10 and 20%.
            For a <strong className="text-[#171717] dark:text-[#E5E5E5]">clearly visible confidential mark</strong>,
            use 30 to 50%. Full opacity (100%) is rarely used for watermarks — it obscures the
            underlying text. The default of 25% is a good starting point for most documents.
          </p>
          <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            Text watermark vs. image watermark
          </h3>
          <p className="text-sm text-[#737373] leading-relaxed">
            Use a <strong className="text-[#171717] dark:text-[#E5E5E5]">text watermark</strong> for
            status labels (CONFIDENTIAL, DRAFT, COPY, SAMPLE) — they render crisply at any zoom
            level because they are drawn as vector text using the embedded Helvetica Bold font.
            Use an <strong className="text-[#171717] dark:text-[#E5E5E5]">image watermark</strong> to
            stamp a company logo or signature. PNG is recommended for logos with transparency;
            JPEG works for photos. The image is embedded into the PDF and scaled to the
            percentage you choose.
          </p>
        </div>
      </section>

      <RelatedTools toolId="pdf-watermark" />

      {/* HowTo Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: "How to Add a Watermark to a PDF",
            description:
              "Add a text or image watermark to every page of a PDF directly in your browser with SammaPix. No upload required, 100% private.",
            totalTime: "PT1M",
            tool: {
              "@type": "SoftwareApplication",
              name: "SammaPix PDF Watermark",
              url: TOOL_URL,
            },
            step: [
              {
                "@type": "HowToStep",
                position: 1,
                name: "Drop your PDF",
                text: "Drag and drop your PDF onto the upload area or click to browse. The tool reads the file instantly in your browser, no server upload.",
                url: TOOL_URL,
              },
              {
                "@type": "HowToStep",
                position: 2,
                name: "Choose watermark type and settings",
                text: "Select Text (CONFIDENTIAL, DRAFT, custom text) or Image (PNG/JPG logo). Set opacity, rotation and position.",
                url: TOOL_URL,
              },
              {
                "@type": "HowToStep",
                position: 3,
                name: "Download the watermarked PDF",
                text: "Click Add Watermark and download your PDF with the stamp applied on every page.",
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
                "@type": ["SoftwareApplication", "BusinessApplication"],
                name: "SammaPix PDF Watermark",
                description:
                  "Add text or image watermarks to every page of a PDF in your browser. Choose from text presets (CONFIDENTIAL, DRAFT) or upload a logo PNG/JPG. Control opacity, rotation and position. No upload, 100% private.",
                url: TOOL_URL,
                applicationCategory: "BusinessApplication",
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
                  "Text watermarks: CONFIDENTIAL, DRAFT, COPY, SAMPLE or custom",
                  "Image watermarks: embed PNG or JPG logo at any scale",
                  "3 position modes: Center, Tile (repeat), Bottom",
                  "Opacity control from 5% to 100%",
                  "Rotation control from -90° to +90°",
                  "Client-side, no upload, no server, 100% private",
                ],
              },
              {
                "@type": "FAQPage",
                mainEntity: [
                  {
                    "@type": "Question",
                    name: "Is this PDF watermark tool free?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Yes, completely free. No signup, no watermark on the output (unless you add one yourself), no upload. Works on any PDF up to 100 MB.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Are my PDF files uploaded to a server?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "No. SammaPix processes PDFs entirely in your browser using the pdf-lib library. Your document and logo never leave your device and are never stored on any server.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "What file formats can I use for the image watermark?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "PNG and JPG are supported. PNG is recommended for logos with transparent backgrounds. JPEG works for photographic watermarks.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "What is the difference between Center, Tile and Bottom?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Center places a single watermark diagonally across the middle of each page. Tile repeats the watermark in a grid pattern covering the entire page. Bottom places it horizontally at the bottom of each page.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Will adding a watermark change the existing PDF content?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "The tool draws on top of each page without modifying existing content. Original text stays selectable and searchable, hyperlinks remain active, and images are untouched.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "What is the file size limit?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Up to 100 MB per PDF. Processing happens inside your browser tab, so keep the tab active while the file is being processed.",
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
                    name: "Watermark PDF",
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

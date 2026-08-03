import React from "react";
import type { Metadata } from "next";
import { ArrowLeft, RotateCw, Shield, FileText, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import PdfRotateClient from "@/components/tools/PdfRotateClient";
import PdfRotateHeroDemo from "@/components/tools/PdfRotateHeroDemo";
import HowToUse from "@/components/tools/HowToUse";
import RelatedTools from "@/components/tools/RelatedTools";
import { APP_URL } from "@/lib/constants";
import MetaViewContent from "@/components/tracking/MetaViewContent";

const TOOL_URL = `${APP_URL}/tools/pdf-rotate`;

export const metadata: Metadata = {
  title: "Rotate PDF Online Free: No Upload, Text Stays Selectable",
  description:
    "Rotate PDF pages in your browser — per page or all at once. Text stays selectable, quality unchanged. 100% private, no upload, no signup.",
  keywords: [
    "rotate pdf",
    "rotate pdf online",
    "rotate pdf and save",
    "rotate pdf pages",
    "turn pdf sideways",
    "rotate pdf no upload",
    "rotate scanned pdf",
    "fix pdf orientation",
    "rotate single pdf page",
    "pdf rotation free",
    "rotate pdf browser",
    "pdf rotator online free",
  ],
  alternates: {
    canonical: TOOL_URL,
  },
  openGraph: {
    title: "Rotate PDF Online Free — No Upload, Text Stays Selectable",
    description:
      "Rotate any PDF pages in your browser. Per page or all at once. Text remains selectable — no rasterization. 100% private.",
    url: TOOL_URL,
    siteName: "SammaPix",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SammaPix PDF Rotate Tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rotate PDF Online Free — No Upload",
    description: "Rotate PDF pages locally in your browser. Text stays selectable, no signup.",
  },
};

const features = [
  {
    icon: <RotateCw className="h-5 w-5 text-gray-700" strokeWidth={1.5} />,
    title: "Per-page or bulk rotation",
    description:
      "Rotate individual pages independently using the thumbnail buttons, or apply 90° CW, 90° CCW, and 180° to all pages at once with a single click.",
  },
  {
    icon: <Shield className="h-5 w-5 text-gray-700" strokeWidth={1.5} />,
    title: "Text stays selectable",
    description:
      "Rotation is applied as PDF metadata — not rasterization. Text remains fully selectable, searchable, and copy-pasteable. Your PDF quality is unchanged.",
  },
  {
    icon: <FileText className="h-5 w-5 text-gray-700" strokeWidth={1.5} />,
    title: "Fully private, no upload",
    description:
      "Everything runs in your browser using pdf-lib. Your PDF never leaves your device and is never stored on any server.",
  },
];

export default function PdfRotatePage() {
  return (
    <main>
      <MetaViewContent contentName="PDF Rotate" contentId="pdf-rotate" />

      {/* Hero, split layout */}
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
                <RotateCw className="h-4 w-4" style={{ color: "#EF4444" }} strokeWidth={1.5} />
              </div>
              <h1 className="text-xl sm:text-[26px] font-semibold text-[#171717] dark:text-[#E5E5E5] tracking-tight leading-tight">
                Rotate PDF. Text Stays Selectable
              </h1>
            </div>

            <p className="text-sm text-[#737373] dark:text-[#A3A3A3] leading-relaxed mb-3">
              Rotate individual pages or all pages at once — 90° CW, 90° CCW, or 180°.{" "}
              <strong className="text-[#171717] dark:text-[#E5E5E5]">No upload required</strong>
              {" "}and unlike compression tools, rotation uses{" "}
              <strong className="text-[#171717] dark:text-[#E5E5E5]">PDF metadata</strong>{" "}
              so text stays selectable and quality is unchanged.
            </p>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#525252] dark:text-[#A3A3A3]">
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2} />
                Per-page or bulk rotation
              </span>
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2} />
                Text stays selectable
              </span>
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2} />
                Up to 100 MB
              </span>
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2} />
                100% private
              </span>
            </div>
          </div>

          {/* Right: hero demo */}
          <div className="max-w-[460px] w-full mx-auto lg:mx-0 lg:ml-auto">
            <PdfRotateHeroDemo />
          </div>
        </div>
      </section>

      {/* Tool */}
      <PdfRotateClient />

      {/* How to use */}
      <HowToUse
        toolName="PDF Rotate"
        steps={[
          {
            title: "Drop your PDF",
            desc: "Drag and drop any PDF onto the upload area or click to browse. The tool renders thumbnail previews of each page instantly in your browser.",
          },
          {
            title: "Choose rotations",
            desc: 'Use "Rotate All" buttons to apply 90° CW, 90° CCW, or 180° to every page at once. Or click the individual rotate buttons under each thumbnail to rotate single pages independently.',
          },
          {
            title: "Download the rotated PDF",
            desc: "Click Apply rotations and download the result. Text remains selectable and the file quality is unchanged — rotation is PDF metadata, not rasterization.",
          },
        ]}
        proTip={{
          text: "Need to reduce the file size after rotating? Use PDF Compress — it works on the rotated file.",
          linkLabel: "See PDF Compress",
          linkHref: "/tools/pdf-compress",
        }}
      />

      {/* Features */}
      <section className="py-12 px-4 sm:px-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-6">
            Why rotate PDFs in your browser?
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
                <h3 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1.5">{f.title}</h3>
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
            When do you need to rotate a PDF?
          </h2>
          <p className="text-sm text-[#737373] leading-relaxed mb-4">
            The most common situation is a scanned document that came out sideways or upside down.
            Scanners often default to landscape orientation when the original page was portrait, or
            vice versa. Another frequent case is a PDF created from a mobile photo where the camera
            orientation was not detected correctly.
          </p>
          <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            Does rotating a PDF keep text selectable?
          </h3>
          <p className="text-sm text-[#737373] leading-relaxed mb-4">
            Yes — and this is the key advantage of SammaPix over most online PDF rotators. Rotation
            here is applied by setting the{" "}
            <code className="text-xs bg-[#F5F5F5] dark:bg-[#252525] px-1 py-0.5 rounded">Rotate</code>{" "}
            property on each PDF page using{" "}
            <code className="text-xs bg-[#F5F5F5] dark:bg-[#252525] px-1 py-0.5 rounded">pdf-lib</code>
            . This is a metadata change — the page content (text, vector graphics, embedded images) is
            untouched. Tools that instead render each page to a canvas and re-export as JPEG lose
            text selectability and increase file size. This tool does not do that.
          </p>
          <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            Can I rotate only some pages?
          </h3>
          <p className="text-sm text-[#737373] leading-relaxed">
            Yes. After dropping a PDF, the tool shows a thumbnail for each page. Click the rotate
            buttons under individual thumbnails to rotate specific pages independently. Use the
            bulk rotate buttons (90° CW, 90° CCW, 180°) to apply the same rotation to all pages at
            once. Mixed rotations within the same PDF are fully supported. When you are happy with
            the preview, click Apply and download the result. Need fewer pages?{" "}
            <Link href="/tools/pdf-split" className="underline hover:text-[#525252]">
              PDF Split
            </Link>{" "}
            lets you extract only the pages you want. Need to combine PDFs?{" "}
            <Link href="/tools/pdf-merge" className="underline hover:text-[#525252]">
              PDF Merge
            </Link>{" "}
            handles that.
          </p>
        </div>
      </section>

      <RelatedTools toolId="pdf-rotate" />

      {/* HowTo Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: "How to Rotate PDF Pages Online",
            description:
              "Rotate PDF pages in your browser with SammaPix. No upload required, 100% private, text stays selectable.",
            totalTime: "PT1M",
            tool: {
              "@type": "SoftwareApplication",
              name: "SammaPix PDF Rotate",
              url: TOOL_URL,
            },
            step: [
              {
                "@type": "HowToStep",
                position: 1,
                name: "Drop your PDF",
                text: "Drag and drop your PDF onto the upload area or click to browse. Thumbnails of every page are rendered instantly in your browser.",
                url: TOOL_URL,
              },
              {
                "@type": "HowToStep",
                position: 2,
                name: "Select rotations",
                text: "Click Rotate All 90° CW / CCW / 180° to rotate every page, or use the buttons under each thumbnail to rotate individual pages.",
                url: TOOL_URL,
              },
              {
                "@type": "HowToStep",
                position: 3,
                name: "Download the rotated PDF",
                text: "Click Apply rotations and download. Text stays fully selectable — rotation is PDF metadata, not a rasterization pass.",
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
                name: "SammaPix PDF Rotate",
                description:
                  "Rotate PDF pages in your browser. Per page or all at once. Text stays selectable, quality unchanged. No upload, no server.",
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
                  "Per-page rotation with thumbnail preview",
                  "Bulk rotation: 90° CW, 90° CCW, 180°",
                  "Text stays selectable after rotation",
                  "Client-side, no upload, no server",
                  "Supports PDFs up to 100 MB",
                  "Instant download, no signup required",
                ],
              },
              {
                "@type": "FAQPage",
                mainEntity: [
                  {
                    "@type": "Question",
                    name: "Is this PDF rotation tool free?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Yes, completely free. No signup, no watermark, no upload. You can rotate any PDF up to 100 MB.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Does rotating a PDF keep text selectable?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Yes. SammaPix rotates PDFs by setting the Rotate property on each page using pdf-lib. This is a metadata-level change — text, vector graphics, and embedded content are untouched. Text remains fully selectable and searchable.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Are my PDF files uploaded to a server?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "No. Everything runs in your browser. Your PDF never leaves your device and is never stored on any server.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Can I rotate only some pages of a PDF?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Yes. After loading a PDF, the tool shows thumbnails of every page. You can click the rotate buttons under each thumbnail to rotate individual pages. Mixed rotations within the same PDF are fully supported.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Will the file size change after rotation?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "No. Since rotation is metadata-only, the output file size is essentially the same as the input. No re-encoding or rasterization happens.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "What is the difference between this and PDF Compress?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "PDF Rotate changes page orientation without altering content. PDF Compress reduces file size by rasterizing pages to JPEG — which makes text image-based. For orientation fixes, always use Rotate first. Use Compress only when you need a smaller file and do not need selectable text.",
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
                    name: "Rotate PDF",
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

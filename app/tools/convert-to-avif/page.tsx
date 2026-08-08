import React from "react";
import type { Metadata } from "next";
import { ArrowLeft, TrendingDown, Shield, FileImage, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";
import RelatedTools from "@/components/tools/RelatedTools";
import HowToUse from "@/components/tools/HowToUse";
import { APP_URL } from "@/lib/constants";
import MetaViewContent from "@/components/tracking/MetaViewContent";

const ConvertToAvifClient = dynamic(
  () => import("@/components/tools/ConvertToAvifClient")
);

const TOOL_URL = `${APP_URL}/tools/convert-to-avif`;

export const metadata: Metadata = {
  title: "Convert to AVIF — Free, Smaller Images, No Upload",
  description:
    "Convert JPG, PNG, and WebP images to AVIF in your browser. AVIF is 40-60% smaller than JPEG at the same quality — make images smaller for the web instantly. Free, private, no upload.",
  keywords: [
    "convert to avif",
    "jpg to avif",
    "png to avif",
    "avif converter",
    "webp to avif",
    "make images smaller avif",
    "avif image converter",
    "convert image avif",
    "avif format converter",
    "reduce image size avif",
  ],
  alternates: {
    canonical: TOOL_URL,
  },
  openGraph: {
    title: "Convert to AVIF — Free, Smaller Images, No Upload",
    description:
      "Convert JPG, PNG, WebP to AVIF instantly in your browser. AVIF is 40-60% smaller than JPEG. No upload, no signup, batch up to 20 files.",
    url: TOOL_URL,
    siteName: "SammaPix",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SammaPix Convert to AVIF",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Convert to AVIF — Free, Smaller Images, No Upload",
    description:
      "Convert JPG, PNG, WebP to AVIF in your browser. 40-60% smaller files, no upload.",
  },
};

const features = [
  {
    icon: <TrendingDown className="h-5 w-5 text-gray-700" strokeWidth={1.5} />,
    title: "40-60% smaller than JPEG",
    description:
      "AVIF uses the AV1 video codec to achieve far better compression than JPEG or WebP. The same visual quality at a fraction of the file size — exactly what your web pages need for faster loading.",
  },
  {
    icon: <Shield className="h-5 w-5 text-gray-700" strokeWidth={1.5} />,
    title: "100% private — no upload",
    description:
      "AVIF encoding uses the browser's built-in Canvas API and the native image/avif MIME type. Your files never leave your device. No server, no cloud, no account required.",
  },
  {
    icon: <FileImage className="h-5 w-5 text-gray-700" strokeWidth={1.5} />,
    title: "Transparency preserved",
    description:
      "AVIF supports an alpha channel, so transparent PNGs convert to AVIF without losing transparency — unlike converting to JPEG. Quality slider from 10 to 90%; lower values are still sharp.",
  },
];

export default function ConvertToAvifPage() {
  return (
    <main>
      <MetaViewContent
        contentName="Convert to AVIF"
        contentId="convert-to-avif"
      />

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
                style={{
                  backgroundColor: "#6366F115",
                  border: "1px solid #6366F130",
                }}
                aria-hidden="true"
              >
                <FileImage
                  className="h-4 w-4"
                  style={{ color: "#6366F1" }}
                  strokeWidth={1.5}
                />
              </div>
              <h1 className="text-xl sm:text-[26px] font-semibold text-[#171717] dark:text-[#E5E5E5] tracking-tight leading-tight">
                Convert to AVIF. Make Images Smaller for the Web.
              </h1>
            </div>

            <p className="text-sm text-[#737373] dark:text-[#A3A3A3] leading-relaxed mb-3">
              Convert JPG, PNG, or WebP images to AVIF directly in your
              browser.{" "}
              <strong className="text-[#171717] dark:text-[#E5E5E5]">
                AVIF is 40-60% smaller than JPEG
              </strong>{" "}
              at the same quality — the dominant web image format in 2026. No
              software to install, no upload, no signup.
            </p>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#525252] dark:text-[#A3A3A3]">
              <span className="inline-flex items-center gap-1">
                <CheckCircle2
                  className="h-3.5 w-3.5 text-[#16A34A]"
                  strokeWidth={2}
                />
                JPG, PNG, WebP input
              </span>
              <span className="inline-flex items-center gap-1">
                <CheckCircle2
                  className="h-3.5 w-3.5 text-[#16A34A]"
                  strokeWidth={2}
                />
                Transparency preserved
              </span>
              <span className="inline-flex items-center gap-1">
                <CheckCircle2
                  className="h-3.5 w-3.5 text-[#16A34A]"
                  strokeWidth={2}
                />
                Batch up to 20
              </span>
              <span className="inline-flex items-center gap-1">
                <CheckCircle2
                  className="h-3.5 w-3.5 text-[#16A34A]"
                  strokeWidth={2}
                />
                100% private
              </span>
            </div>
          </div>

          {/* Right column reserved for split-hero symmetry */}
          <div className="hidden lg:block" aria-hidden="true" />
        </div>
      </section>

      {/* Tool */}
      <ConvertToAvifClient />

      {/* How to use */}
      <HowToUse
        toolName="Convert to AVIF"
        steps={[
          {
            title: "Drop your images",
            desc: "Drag and drop JPG, PNG, or WebP files onto the upload area — or click to browse. Up to 20 files per batch.",
          },
          {
            title: "Set quality",
            desc: "Use the quality slider (10–90%). AVIF is so efficient that 50% already looks excellent. Lower quality = even smaller files.",
          },
          {
            title: "Convert and download",
            desc: "Click Convert. Files are encoded in your browser using the native AVIF codec. Download individually or all as a ZIP.",
          },
        ]}
        proTip={{
          text: "Try quality 50 first — AVIF at 50% often looks identical to JPEG at 85% but is 3-4x smaller. Perfect for web performance.",
          linkLabel: "Convert WebP instead",
          linkHref: "/tools/webp",
        }}
      />

      {/* Features */}
      <section className="py-12 px-4 sm:px-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-6">
            Why convert images to AVIF?
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
        <div className="max-w-2xl mx-auto">
          <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mb-4">
            Why is AVIF the best web image format in 2026?
          </h2>
          <p className="text-sm text-[#737373] leading-relaxed mb-4">
            AVIF (AV1 Image File Format) is derived from the AV1 video codec
            developed by the Alliance for Open Media. Unlike JPEG (which dates
            from 1992), AVIF uses modern perceptual models to discard image
            data that the human eye does not notice, while preserving detail
            where it matters. The result is file sizes 40-60% smaller than
            JPEG at equivalent visual quality.
          </p>
          <p className="text-sm text-[#737373] leading-relaxed mb-4">
            As of 2026, all major browsers — Chrome, Firefox, Safari, and Edge
            — support AVIF natively. Google Lighthouse and Core Web Vitals
            scoring rewards smaller images through better LCP (Largest
            Contentful Paint) scores. Switching your web images from JPEG to
            AVIF can measurably improve page load times and search rankings.
          </p>
          <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            How does this AVIF converter work?
          </h3>
          <p className="text-sm text-[#737373] leading-relaxed mb-4">
            Modern browsers (Chrome 94+, Firefox 113+, Safari 16.4+) include a
            native AVIF encoder accessible via the Canvas API. SammaPix draws
            your image onto an HTML Canvas element and calls{" "}
            <code className="text-xs bg-[#F5F5F5] dark:bg-[#252525] px-1 py-0.5 rounded">
              canvas.toBlob(&quot;image/avif&quot;, quality)
            </code>{" "}
            to produce the AVIF output. The entire process is local — no file
            is ever sent to a server.
          </p>
          <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            What quality setting should I use?
          </h3>
          <p className="text-sm text-[#737373] leading-relaxed mb-4">
            The default quality of 50% is deliberately conservative. Because
            AVIF is so much more efficient than JPEG, quality 50 in AVIF
            typically looks indistinguishable from JPEG at quality 85, while
            being 3-4 times smaller. For photos where you want maximum detail,
            try 70-80%. For hero images and thumbnails, 40-50% is usually
            perfect.
          </p>
          <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            Does AVIF support transparency?
          </h3>
          <p className="text-sm text-[#737373] leading-relaxed">
            Yes. Unlike JPEG, AVIF fully supports an alpha channel (transparency).
            When you convert a transparent PNG or WebP to AVIF, the transparency
            is preserved exactly. This makes AVIF ideal for logos, product images
            with transparent backgrounds, and stickers — giving you both
            small file sizes and full alpha support. If you need to convert back
            from AVIF, use our{" "}
            <Link
              href="/tools/avif-to-jpg"
              className="underline underline-offset-2 decoration-[#E5E5E5] hover:decoration-[#171717] dark:hover:decoration-[#E5E5E5]"
            >
              AVIF to JPG converter
            </Link>
            .
          </p>
        </div>
      </section>

      <RelatedTools toolId="convert-to-avif" />

      {/* HowTo Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: "How to Convert Images to AVIF",
            description:
              "Convert JPG, PNG, or WebP images to AVIF format using SammaPix. Batch conversion up to 20 files, quality slider, transparency preserved, all in your browser.",
            totalTime: "PT1M",
            tool: {
              "@type": "SoftwareApplication",
              name: "SammaPix Convert to AVIF",
              url: TOOL_URL,
            },
            step: [
              {
                "@type": "HowToStep",
                position: 1,
                name: "Drop your images",
                text: "Drag and drop JPG, PNG, or WebP files onto the upload area. You can convert up to 20 files at once.",
                url: TOOL_URL,
              },
              {
                "@type": "HowToStep",
                position: 2,
                name: "Set quality",
                text: "Use the quality slider (10–90%). The default of 50% produces excellent results — AVIF at 50% is comparable to JPEG at 85% but 3-4x smaller.",
                url: TOOL_URL,
              },
              {
                "@type": "HowToStep",
                position: 3,
                name: "Convert and download",
                text: "Click Convert. All encoding happens locally in your browser using the native AVIF codec. Download converted files individually or all as a ZIP archive.",
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
                name: "SammaPix Convert to AVIF",
                description:
                  "Convert JPG, PNG, and WebP images to AVIF format directly in your browser. Batch processing up to 20 files, quality control, transparency preserved, no upload.",
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
                  "JPG to AVIF conversion",
                  "PNG to AVIF conversion",
                  "WebP to AVIF conversion",
                  "Transparency (alpha channel) preserved",
                  "Batch processing up to 20 files",
                  "Quality slider 10-90%",
                  "ZIP download for batches",
                  "Client-side conversion — no upload",
                ],
              },
              {
                "@type": "FAQPage",
                mainEntity: [
                  {
                    "@type": "Question",
                    name: "Is this AVIF converter free?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Yes, completely free. No signup required. Free tier supports up to 20 files per batch. Pro users can process up to 200 files per batch and download ZIP archives of any size.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Are my images uploaded to a server?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "No. SammaPix converts images to AVIF entirely in your browser using the native Canvas API and the image/avif MIME type. Your files never leave your device — complete privacy guaranteed.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Why should I convert images to AVIF?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "AVIF is 40-60% smaller than JPEG at the same visual quality, and smaller than WebP too. Smaller images mean faster page loads, better Core Web Vitals scores, and improved SEO rankings. All major browsers support AVIF as of 2026.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Which browsers support AVIF encoding?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "AVIF encoding (canvas.toBlob) is supported in Chrome 94+, Firefox 113+, and Safari 16.4+. If your browser cannot encode AVIF, the tool shows a clear error message and suggests switching to Chrome or Firefox.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Can I convert multiple images to AVIF at once?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Yes. Free users can convert up to 20 images per batch. Pro users can convert up to 200 per batch. Results can be downloaded individually or all at once as a ZIP archive.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Does AVIF support transparency?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Yes. AVIF fully supports alpha channel transparency. When you convert a transparent PNG or WebP to AVIF, the transparency is preserved exactly. This makes AVIF ideal for logos and product images on transparent backgrounds.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "What quality setting should I choose?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "The default of 50% is a great starting point. AVIF at 50% quality typically looks indistinguishable from JPEG at 85% while being 3-4x smaller. For maximum detail, try 70-80%. For thumbnails and web assets where size matters most, 30-50% works well.",
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
                    name: "Convert to AVIF",
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

import React from "react";
import type { Metadata } from "next";
import {
  ArrowLeft,
  Shield,
  CheckCircle2,
  Camera,
  Globe,
  Zap,
} from "lucide-react";
import Link from "next/link";
import PassportPhotoClient from "@/components/tools/PassportPhotoClient";
import RelatedTools from "@/components/tools/RelatedTools";
import { APP_URL } from "@/lib/constants";
import { PASSPORT_PRESETS } from "@/lib/passport-photo";
import MetaViewContent from "@/components/tracking/MetaViewContent";

/* ------------------------------------------------------------------ */
/*  Metadata                                                           */
/* ------------------------------------------------------------------ */

export const metadata: Metadata = {
  title: "Passport Photo Maker Online Free | SammaPix",
  description:
    "Create passport photos for 6+ countries in seconds. Auto background removal & smart crop included. 100% browser-based — your photos stay private.",
  keywords: [
    "passport photo maker",
    "passport photo online",
    "ai passport photo",
    "passport photo generator free",
    "visa photo maker",
    "passport size photo online",
    "2x2 passport photo",
    "passport photo creator",
    "id photo maker free",
    "biometric photo online",
  ],
  alternates: {
    canonical: `${APP_URL}/tools/passport-photo`,
  },
  openGraph: {
    title: "Passport Photo Maker Online Free | SammaPix",
    description:
      "Create passport photos for 6+ countries in seconds. Auto background removal & smart crop included. 100% browser-based — your photos stay private.",
    url: `${APP_URL}/tools/passport-photo`,
    siteName: "SammaPix",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SammaPix — AI Passport Photo Maker",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Passport Photo Maker Online Free | SammaPix",
    description:
      "Create passport photos for 6+ countries in seconds. Auto background removal & smart crop included. 100% browser-based — your photos stay private.",
  },
};

/* ------------------------------------------------------------------ */
/*  FAQ data                                                           */
/* ------------------------------------------------------------------ */

const faqs = [
  {
    question: "What size is a US passport photo?",
    answer:
      "A US passport photo must be exactly 2\u00d72 inches (51\u00d751 mm), which translates to 600\u00d7600 pixels at 300 DPI. SammaPix automatically generates the correct dimensions when you select the US preset.",
  },
  {
    question: "Can I make a passport photo with my phone?",
    answer:
      "Yes! Take a photo with good lighting against any background. SammaPix\u2019s AI will remove the background, replace it with white, and crop to the exact passport dimensions. Modern phone cameras have more than enough resolution.",
  },
  {
    question: "Does this tool comply with official requirements?",
    answer:
      "SammaPix generates photos with the correct pixel dimensions and white background for each country. However, official requirements also include lighting, expression, and print quality standards. We recommend reviewing your country\u2019s specific guidelines before submitting.",
  },
  {
    question: "Is my photo uploaded anywhere?",
    answer:
      "No. Everything \u2014 background removal, cropping, and resizing \u2014 happens entirely inside your browser using JavaScript. Your photo never leaves your device and is never sent to any server.",
  },
  {
    question: "Which countries are supported?",
    answer:
      "SammaPix currently supports passport photo standards for the United States (2\u00d72\u2033), European Union / Schengen (35\u00d745 mm), United Kingdom (35\u00d745 mm), India (35\u00d745 mm), China (33\u00d748 mm), and Canada (50\u00d770 mm). We\u2019re adding more countries regularly.",
  },
];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function PassportPhotoPage() {
  return (
    <main>
      <MetaViewContent contentName="PassportPhoto" contentId="passport-photo" />

      {/* ============================================================ */}
      {/*  HERO                                                        */}
      {/* ============================================================ */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 pt-8 pb-2">
        {/* Back link */}
        <Link
          href="/tools"
          className="inline-flex items-center gap-1.5 text-xs text-[#A3A3A3] dark:text-[#737373] hover:text-[#171717] dark:hover:text-[#E5E5E5] transition-colors mb-5"
        >
          <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.5} />
          All tools
        </Link>

        {/* Icon + H1 */}
        <div className="flex items-center gap-3 mb-2">
          <div
            className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center"
            style={{
              backgroundColor: "#6366F115",
              border: "1px solid #6366F130",
            }}
            aria-hidden="true"
          >
            <Camera
              className="h-[18px] w-[18px]"
              style={{ color: "#6366F1" }}
              strokeWidth={1.5}
            />
          </div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-[#171717] dark:text-[#E5E5E5] tracking-tight">
            AI Passport Photo Maker — Free Online
          </h1>
        </div>

        {/* Subtext */}
        <p className="text-[15px] text-[#737373] dark:text-[#A3A3A3] leading-relaxed mb-3 max-w-xl">
          Upload any photo. AI removes the background, crops to the right size,
          and gives you a print-ready passport photo in seconds.
        </p>

        {/* Trust badges */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-[#525252] dark:text-[#A3A3A3]">
          <span className="inline-flex items-center gap-1">
            <CheckCircle2
              className="h-3.5 w-3.5 text-[#16A34A]"
              strokeWidth={2}
            />
            Free forever
          </span>
          <span className="inline-flex items-center gap-1">
            <CheckCircle2
              className="h-3.5 w-3.5 text-[#16A34A]"
              strokeWidth={2}
            />
            No sign-up
          </span>
          <span className="inline-flex items-center gap-1">
            <CheckCircle2
              className="h-3.5 w-3.5 text-[#16A34A]"
              strokeWidth={2}
            />
            No upload
          </span>
          <span className="inline-flex items-center gap-1">
            <CheckCircle2
              className="h-3.5 w-3.5 text-[#16A34A]"
              strokeWidth={2}
            />
            6 country presets
          </span>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  TOOL                                                        */}
      {/* ============================================================ */}
      <PassportPhotoClient />

      {/* ============================================================ */}
      {/*  COUNTRY PRESET GRID                                         */}
      {/* ============================================================ */}
      <section className="py-12 px-4 sm:px-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-6 text-center">
            Supported passport formats
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {PASSPORT_PRESETS.map((preset) => (
              <div
                key={preset.country}
                className="p-4 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md bg-white dark:bg-[#1E1E1E] text-center"
              >
                <span className="text-2xl block mb-2">{preset.flag}</span>
                <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5]">
                  {preset.label}
                </p>
                <p className="text-xs text-[#A3A3A3] mt-1">
                  {preset.widthPx} &times; {preset.heightPx} px
                </p>
                <p className="text-xs text-[#737373] mt-0.5">
                  {preset.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  WHY SAMMAPIX                                                */}
      {/* ============================================================ */}
      <section className="py-12 px-4 sm:px-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-6">
            Why SammaPix?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Card 1 */}
            <div className="p-5 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md bg-white dark:bg-[#1E1E1E]">
              <div className="h-9 w-9 rounded-md border border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#F5F5F5] dark:bg-[#252525] flex items-center justify-center mb-4">
                <Globe
                  className="h-5 w-5 text-gray-700 dark:text-gray-300"
                  strokeWidth={1.5}
                />
              </div>
              <h3 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1.5">
                Standard-compliant
              </h3>
              <p className="text-sm text-[#737373] leading-relaxed">
                Exact pixel dimensions for US, EU, UK, India, China and Canada.
                White background, correct aspect ratio, print-ready.
              </p>
            </div>
            {/* Card 2 */}
            <div className="p-5 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md bg-white dark:bg-[#1E1E1E]">
              <div className="h-9 w-9 rounded-md border border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#F5F5F5] dark:bg-[#252525] flex items-center justify-center mb-4">
                <Shield
                  className="h-5 w-5 text-gray-700 dark:text-gray-300"
                  strokeWidth={1.5}
                />
              </div>
              <h3 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1.5">
                100% Private
              </h3>
              <p className="text-sm text-[#737373] leading-relaxed">
                Your photos never leave your browser. Background removal,
                cropping, and resizing all happen locally with JavaScript.
              </p>
            </div>
            {/* Card 3 */}
            <div className="p-5 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md bg-white dark:bg-[#1E1E1E]">
              <div className="h-9 w-9 rounded-md border border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#F5F5F5] dark:bg-[#252525] flex items-center justify-center mb-4">
                <Zap
                  className="h-5 w-5 text-gray-700 dark:text-gray-300"
                  strokeWidth={1.5}
                />
              </div>
              <h3 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1.5">
                Instant & Free
              </h3>
              <p className="text-sm text-[#737373] leading-relaxed">
                No sign-up, no watermark, no limits. Upload a photo, pick your
                country, and download in seconds. Completely free.
              </p>
            </div>
          </div>
        </div>
      </section>

      <RelatedTools toolId="passport-photo" />

      {/* ============================================================ */}
      {/*  FAQ                                                         */}
      {/* ============================================================ */}
      <section className="py-12 px-4 sm:px-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-6">
            Frequently asked questions
          </h2>
          <div className="divide-y divide-[#E5E5E5] dark:divide-[#2A2A2A]">
            {faqs.map((faq) => (
              <details key={faq.question} className="group py-4">
                <summary className="cursor-pointer list-none flex items-start justify-between gap-4 text-sm font-medium text-[#171717] dark:text-[#E5E5E5] hover:text-[#6366F1] transition-colors [&::-webkit-details-marker]:hidden">
                  {faq.question}
                  <span className="flex-shrink-0 text-[#A3A3A3] group-open:rotate-45 transition-transform text-lg leading-none">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm text-[#737373] dark:text-[#A3A3A3] leading-relaxed pr-8">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  SEO long-form content                                       */}
      {/* ============================================================ */}
      <section className="py-12 px-4 sm:px-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mb-4">
            How to make a passport photo online
          </h2>
          <p className="text-sm text-[#737373] leading-relaxed mb-4">
            Taking a passport photo used to mean a trip to the pharmacy or photo
            booth. With SammaPix, you can create a compliant passport photo from
            any photo on your phone or computer in under 30 seconds.
          </p>
          <p className="text-sm text-[#737373] leading-relaxed mb-4">
            The AI automatically detects the subject, removes the background,
            replaces it with pure white, and crops the image to the exact
            dimensions required by your country. The result is a high-quality
            JPEG ready to print at 300 DPI or upload to an online passport
            application.
          </p>
          <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            Tips for the best result
          </h3>
          <ul className="text-sm text-[#737373] leading-relaxed space-y-2 list-none pl-0">
            <li className="flex items-start gap-2">
              <span className="text-[#6366F1] mt-0.5">-</span>
              Use natural lighting and face the camera directly
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#6366F1] mt-0.5">-</span>
              Keep a neutral expression with both eyes open
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#6366F1] mt-0.5">-</span>
              Wear clothes that contrast with the white background
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#6366F1] mt-0.5">-</span>
              Remove glasses, hats, and headphones (unless required for religious
              reasons)
            </li>
          </ul>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  STRUCTURED DATA — SoftwareApplication + FAQ + HowTo         */}
      {/* ============================================================ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "SoftwareApplication",
                name: "SammaPix AI Passport Photo Maker",
                url: `${APP_URL}/tools/passport-photo`,
                description:
                  "Free browser-based AI passport photo maker. Auto background removal, smart crop, and exact dimensions for US, EU, UK, India, China, Canada. 100% private — no upload.",
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
                  url: `${APP_URL}`,
                },
                aggregateRating: {
                  "@type": "AggregateRating",
                  ratingValue: "4.9",
                  ratingCount: "85",
                },
                featureList: [
                  "AI background removal to white",
                  "Auto face detection and smart crop",
                  "US passport 2x2 inch (600x600px)",
                  "EU/Schengen 35x45mm (413x531px)",
                  "UK passport 35x45mm (420x540px)",
                  "India passport 35x45mm (413x531px)",
                  "China visa 33x48mm (390x567px)",
                  "Canada passport 50x70mm (591x827px)",
                  "100% browser-based — no upload",
                  "JPEG output at 95% quality",
                ],
              },
              {
                "@type": "HowTo",
                name: "How to Create a Passport Photo Online for Free",
                description:
                  "Step-by-step guide to create a compliant passport photo using SammaPix AI. Works for US, EU, UK, India, China, and Canada.",
                totalTime: "PT1M",
                tool: {
                  "@type": "SoftwareApplication",
                  name: "SammaPix AI Passport Photo Maker",
                  url: `${APP_URL}/tools/passport-photo`,
                },
                step: [
                  {
                    "@type": "HowToStep",
                    position: 1,
                    name: "Upload your photo",
                    text: "Drag and drop a photo or click to browse. Use a front-facing photo with good lighting. Your photo is processed locally and never uploaded to any server.",
                    url: `${APP_URL}/tools/passport-photo`,
                  },
                  {
                    "@type": "HowToStep",
                    position: 2,
                    name: "Select your country",
                    text: "Choose from US (2x2 inch), EU/Schengen (35x45mm), UK (35x45mm), India (35x45mm), China (33x48mm), or Canada (50x70mm). The tool automatically sets the correct pixel dimensions.",
                    url: `${APP_URL}/tools/passport-photo`,
                  },
                  {
                    "@type": "HowToStep",
                    position: 3,
                    name: "Download your passport photo",
                    text: "The AI removes the background, replaces it with white, crops and resizes to the exact standard. Download the result as a high-quality JPEG ready for printing or online submission.",
                    url: `${APP_URL}/tools/passport-photo`,
                  },
                ],
              },
              {
                "@type": "FAQPage",
                mainEntity: faqs.map((faq) => ({
                  "@type": "Question",
                  name: faq.question,
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: faq.answer,
                  },
                })),
              },
              {
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
                    name: "AI Passport Photo Maker",
                    item: `${APP_URL}/tools/passport-photo`,
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

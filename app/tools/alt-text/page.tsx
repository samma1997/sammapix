import React from "react";
import type { Metadata } from "next";
import { ArrowRight, Sparkles, Globe, Eye } from "lucide-react";
import Link from "next/link";
import AltTextClient from "@/components/tools/AltTextClient";
import { APP_URL } from "@/lib/constants";
import MetaViewContent from "@/components/tracking/MetaViewContent";


export const metadata: Metadata = {
  title: "AI Alt Text Generator - Accessibility & SEO | Free | SammaPix",
  description:
    "Generate descriptive, accessibility-compliant alt text for images using AI. Free online tool- upload images and get 50-125 character alt tags instantly. No signup required to try.",
  keywords: [
    "ai alt text generator",
    "image alt text",
    "alt text generator free",
    "accessibility alt text",
    "seo alt text",
    "image description generator",
    "auto alt text",
    "ai image description",
    "wcag alt text",
    "batch alt text",
  ],
  alternates: {
    canonical: `${APP_URL}/tools/alt-text`,
  },
  openGraph: {
    title: "AI Alt Text Generator - Accessibility & SEO | Free | SammaPix",
    description:
      "Generate descriptive, accessibility-compliant alt text for images using AI. Free online tool- upload images and get 50-125 character alt tags instantly.",
    url: `${APP_URL}/tools/alt-text`,
    siteName: "SammaPix",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SammaPix AI Alt Text Generator",
      },
    ],
  },
};

const features = [
  {
    icon: <Sparkles className="h-5 w-5 text-[#6366F1]" strokeWidth={1.5} />,
    title: "Powered by Google Gemini",
    description:
      "SammaPix sends a thumbnail of your image to Google Gemini Flash which returns a concise, descriptive alt text optimized for both accessibility and SEO.",
    highlight: true,
  },
  {
    icon: <Eye className="h-5 w-5 text-gray-700 dark:text-[#A3A3A3]" strokeWidth={1.5} />,
    title: "WCAG 2.1 compliant",
    description:
      "Generated alt texts follow web accessibility guidelines- descriptive, meaningful, and appropriate length (50-125 characters) for screen readers.",
    highlight: false,
  },
  {
    icon: <Globe className="h-5 w-5 text-gray-700 dark:text-[#A3A3A3]" strokeWidth={1.5} />,
    title: "SEO-optimized output",
    description:
      "Alt text doubles as image SEO signal. Get descriptions that help your images rank in Google Image Search while serving accessibility requirements.",
    highlight: false,
  },
];

const relatedTools = [
  { name: "AI Rename", href: "/tools/ai-rename" },
  { name: "Compress Images", href: "/tools/compress" },
  { name: "Remove EXIF", href: "/tools/exif" },
  { name: "Convert to WebP", href: "/tools/webp" },
];

export default function AltTextPage() {
  return (
    <main>
      <MetaViewContent contentName="AI Alt Text" contentId="alt-text" />
      {/* Hero SEO */}
      <div className="max-w-3xl mx-auto px-4 pt-10 pb-2">
        <div className="flex items-center gap-2 mb-2">
          <h1 className="text-2xl font-semibold text-[#171717] dark:text-[#E5E5E5]">
            AI Alt Text Generator
          </h1>
          <span className="inline-flex items-center text-[10px] font-medium px-2 py-0.5 rounded border bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-950/30 dark:text-violet-400 dark:border-violet-900 uppercase tracking-wide">
            PRO
          </span>
        </div>
        <p className="text-sm text-[#737373]">
          Upload images and generate accessibility-compliant alt text in seconds using Google Gemini AI. Edit results inline, then download as CSV or JSON for bulk import into your CMS. Only a thumbnail is sent to AI- your originals stay on your device.
        </p>
      </div>

      {/* Tool */}
      <AltTextClient />

      {/* Features */}
      <section className="py-12 px-4 sm:px-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-6">
            How AI alt text generation works
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
            What is alt text and why does it matter?
          </h2>
          <p className="text-sm text-[#737373] leading-relaxed mb-6">
            Alt text (alternative text) is an HTML attribute added to image tags that describes the image for screen readers used by visually impaired users. It is also a key SEO signal - Google uses alt text to understand the content and context of images on your page.
          </p>
          <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mb-4">
            What makes good alt text?
          </h2>
          <p className="text-sm text-[#737373] leading-relaxed mb-4">
            Good alt text is specific, concise, and describes the key visual content without starting with &quot;image of&quot; or &quot;photo of&quot;. WCAG guidelines recommend 50-125 characters for most images. SammaPix AI generates alt texts that follow these conventions automatically.
          </p>
          <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md bg-[#FAFAFA] dark:bg-[#1E1E1E] p-4 space-y-2">
            <div className="flex items-start gap-3">
              <span className="text-xs text-[#A3A3A3] font-mono w-20 shrink-0 mt-0.5">Bad:</span>
              <code className="text-xs bg-white dark:bg-[#252525] border border-[#E5E5E5] dark:border-[#2A2A2A] px-2 py-1 rounded font-mono text-[#737373]">
                image.jpg
              </code>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-xs text-[#A3A3A3] font-mono w-20 shrink-0 mt-0.5">Better:</span>
              <code className="text-xs bg-white dark:bg-[#252525] border border-[#E5E5E5] dark:border-[#2A2A2A] px-2 py-1 rounded font-mono text-[#737373]">
                Photo of a dog
              </code>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-xs text-[#6366F1] font-mono w-20 shrink-0 mt-0.5">AI output:</span>
              <code className="text-xs bg-white dark:bg-[#1E1E1E] border border-[#C7D2FE] px-2 py-1 rounded font-mono text-[#171717] dark:text-[#E5E5E5]">
                Golden retriever puppy playing with a red ball on green grass in bright sunlight
              </code>
            </div>
          </div>
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
                name: "AI Alt Text Generator",
                item: `${APP_URL}/tools/alt-text`,
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
                name: "What is alt text used for?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Alt text (alternative text) serves two purposes: it describes images for screen readers used by visually impaired users (accessibility), and it tells search engines what an image depicts (SEO). Both use cases benefit from descriptive, specific alt text.",
                },
              },
              {
                "@type": "Question",
                name: "How long should alt text be?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "WCAG recommends keeping alt text concise- typically 50-125 characters. SammaPix AI generates alt texts within this range automatically. Decorative images that convey no information can use empty alt text (alt='').",
                },
              },
              {
                "@type": "Question",
                name: "How many alt texts can I generate for free?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Free accounts get 5 AI-generated alt texts per day after signing in. Pro accounts unlock 200 per day. Signing in is free- no credit card required.",
                },
              },
              {
                "@type": "Question",
                name: "Are my images sent to a server?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Only a small thumbnail (max 512px) is sent to Google Gemini for analysis. Your original full-resolution images never leave your device. The thumbnail is processed and immediately discarded.",
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
            name: "SammaPix AI Alt Text Generator",
            description:
              "Automatically generate accessibility-compliant alt text for images using Google Gemini AI. Produces 50-125 character descriptions optimized for screen readers and SEO.",
            url: `${APP_URL}/tools/alt-text`,
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
            featureList: [
              "Google Gemini AI powered",
              "WCAG 2.1 compliant alt text",
              "50-125 character output",
              "Inline editing",
              "CSV and JSON export",
              "Batch processing",
              "Free tier + Pro",
            ],
          }),
        }}
      />
    </main>
  );
}

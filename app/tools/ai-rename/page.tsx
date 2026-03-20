import React from "react";
import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, Sparkles, Search, Clock } from "lucide-react";
import Link from "next/link";
import AiRenameClient from "@/components/tools/AiRenameClient";
import HowToUse from "@/components/tools/HowToUse";
import { APP_URL } from "@/lib/constants";
import MetaViewContent from "@/components/tracking/MetaViewContent";


export const metadata: Metadata = {
  title: "AI Image Filename Generator for SEO | Free Online | SammaPix",
  description:
    "Generate SEO-friendly image filenames automatically with AI. Turn IMG_0001.jpg into descriptive, keyword-rich names that rank in Google Images. Free, no signup.",
  keywords: [
    "image filename seo",
    "rename images for seo",
    "image file naming",
    "seo image filename generator",
    "ai rename photos",
    "seo friendly filenames",
    "image rename tool",
    "ai alt text generator",
    "batch image renaming",
  ],
  alternates: {
    canonical: `${APP_URL}/tools/ai-rename`,
  },
  openGraph: {
    title: "AI Image Filename Generator for SEO | Free Online | SammaPix",
    description:
      "Generate SEO-friendly image filenames automatically with AI. Turn IMG_0001.jpg into descriptive, keyword-rich names that rank in Google Images. Free, no signup.",
    url: `${APP_URL}/tools/ai-rename`,
    siteName: "SammaPix",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SammaPix AI Image Renaming Tool",
      },
    ],
  },
};

const features = [
  {
    icon: <Sparkles className="h-5 w-5 text-[#6366F1]" strokeWidth={1.5} />,
    title: "Powered by Google Gemini",
    description:
      "SammaPix sends a thumbnail of your image to Google Gemini Flash and generates a descriptive, human-readable filename in seconds.",
    highlight: true,
  },
  {
    icon: <Search className="h-5 w-5 text-gray-700 dark:text-[#A3A3A3]" strokeWidth={1.5} />,
    title: "SEO-optimized filenames",
    description:
      "AI generates filenames that match how people search- descriptive, lowercase, with hyphens. Exactly what Google recommends for image SEO.",
    highlight: false,
  },
  {
    icon: <Clock className="h-5 w-5 text-gray-700 dark:text-[#A3A3A3]" strokeWidth={1.5} />,
    title: "Rename a batch in seconds",
    description:
      "Upload multiple images and rename them all at once. No more manually typing filenames for every product photo or blog image.",
    highlight: false,
  },
];

const relatedTools = [
  { name: "Compress Images", href: "/tools/compress" },
  { name: "Remove EXIF", href: "/tools/exif" },
  { name: "Convert to WebP", href: "/tools/webp" },
];

export default function AiRenamePage() {
  return (
    <main>
      <MetaViewContent contentName="AI Rename" contentId="ai-rename" />
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
            style={{ backgroundColor: "#6366F115", border: "1px solid #6366F130" }}
            aria-hidden="true"
          >
            <Sparkles className="h-4.5 w-4.5" style={{ color: "#6366F1", width: 18, height: 18 }} strokeWidth={1.5} />
          </div>
          <h1 className="text-2xl font-semibold text-[#171717] dark:text-[#E5E5E5]">AI Image Filename Generator for SEO</h1>
        </div>
        <p className="text-sm text-[#737373]">
          Turn generic image names into SEO-optimized filenames that rank in Google Images. Upload your photos and let AI generate descriptive, keyword-rich names in seconds- nothing uploaded to any server except the thumbnail for AI analysis.
        </p>
      </div>

      {/* Tool + Next Step suggestions */}
      <AiRenameClient />

      <HowToUse
        toolName="AI Rename"
        steps={[
          {
            title: "Drop your images",
            desc: "Upload any JPG, PNG or WebP photos. A thumbnail is sent to AI for analysis- your original files stay on your device.",
          },
          {
            title: "AI analyzes content",
            desc: "Google Gemini Flash reads each image visually and generates a descriptive, lowercase, hyphenated filename in under 3 seconds.",
          },
          {
            title: "Get SEO-optimized filenames and alt text",
            desc: "Download your images with new filenames like 'red-ceramic-coffee-cup-morning.jpg'- exactly what Google recommends for image SEO.",
          },
        ]}
        proTip={{
          text: "Combine AI Rename with Compress to optimize AND rename for SEO in one go.",
          linkLabel: "Compress images",
          linkHref: "/tools/compress",
        }}
      />

      {/* Features */}
      <section className="py-12 px-4 sm:px-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-6">
            How AI image renaming works
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
            What is AI Image Rename?
          </h2>
          <p className="text-sm text-[#737373] leading-relaxed mb-6">
            AI Image Rename is a free tool that uses Google Gemini AI to automatically generate SEO-friendly filenames for your photos. Upload an image, and Gemini analyzes it visually and produces a descriptive, lowercase, hyphenated filename- the exact format Google recommends for image SEO. Free accounts get 10 AI credits per day. Each rename takes under 3 seconds.
          </p>
          <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mb-4">
            Why image filenames matter for SEO
          </h2>
          <p className="text-sm text-[#737373] leading-relaxed mb-4">
            Google uses the image filename as one of the signals to understand
            what an image is about. A filename like{" "}
            <code className="text-xs bg-[#F5F5F5] dark:bg-[#252525] border border-[#E5E5E5] dark:border-[#2A2A2A] px-1.5 py-0.5 rounded font-mono">
              golden-gate-bridge-san-francisco-fog.jpg
            </code>{" "}
            sends a strong relevance signal compared to{" "}
            <code className="text-xs bg-[#F5F5F5] dark:bg-[#252525] border border-[#E5E5E5] dark:border-[#2A2A2A] px-1.5 py-0.5 rounded font-mono">
              IMG_4521.jpg
            </code>
            .
          </p>
          <p className="text-sm text-[#737373] leading-relaxed mb-4">
            Manually renaming hundreds of product photos or blog images is
            tedious and time-consuming. SammaPix AI Rename automates this
            entirely- upload your images, click rename, and download files with
            descriptive SEO-optimized filenames.
          </p>
          <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            What does an AI-generated filename look like?
          </h3>
          <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md bg-[#FAFAFA] p-4 space-y-2">
            <div className="flex items-center gap-3">
              <span className="text-xs text-[#A3A3A3] font-mono w-28 shrink-0">
                Before:
              </span>
              <code className="text-xs bg-white dark:bg-[#1E1E1E] border border-[#E5E5E5] dark:border-[#2A2A2A] px-2 py-1 rounded font-mono text-[#737373]">
                DSC_0042.jpg
              </code>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-[#6366F1] font-mono w-28 shrink-0">
                After (AI):
              </span>
              <code className="text-xs bg-white dark:bg-[#1E1E1E] border border-[#C7D2FE] px-2 py-1 rounded font-mono text-[#171717] dark:text-[#E5E5E5]">
                red-ceramic-coffee-cup-wooden-table-morning-light.jpg
              </code>
            </div>
          </div>
        </div>
      </section>

      {/* Related guide */}
      <section className="py-8 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto">
          <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg p-4 bg-[#FAFAFA] mt-8">
            <p className="text-xs text-[#A3A3A3] uppercase tracking-wide mb-1">📖 Related guide</p>
            <a href="/blog/ai-image-renaming-seo" className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] hover:text-[#6366F1] flex items-center gap-1">
              How to Rename Images for SEO with AI →
            </a>
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
                name: "AI Image Rename",
                item: `${APP_URL}/tools/ai-rename`,
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
                name: "Why do image filenames matter for SEO?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Google uses the image filename as one of the ranking signals to understand what an image is about. A filename like 'golden-gate-bridge-san-francisco-fog.jpg' sends a much stronger relevance signal to search engines than 'IMG_4521.jpg'. Good filenames help your images rank better in Google Images.",
                },
              },
              {
                "@type": "Question",
                name: "How does the AI generate filenames?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "SammaPix sends a thumbnail of your image to Google Gemini Flash, which analyzes it visually and generates a descriptive, lowercase, hyphenated filename. The AI produces names that match how people search- exactly what Google recommends for image SEO.",
                },
              },
              {
                "@type": "Question",
                name: "How many renames can I do for free?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Free accounts get 10 AI credits per day. Each rename takes under 3 seconds. Pro plans unlock 200 renames per day, plus other features like batch processing and zero ads.",
                },
              },
              {
                "@type": "Question",
                name: "Is my image data safe with Google Gemini?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "SammaPix sends only a thumbnail to Gemini for analysis- never your full-resolution image. The thumbnail is processed by Gemini to generate a filename description, then discarded. Your original images always stay on your device.",
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
            name: "SammaPix AI Image Rename",
            description:
              "Automatically rename images with SEO-friendly filenames using Google Gemini AI. Generates descriptive, lowercase, hyphenated filenames optimized for search engines.",
            url: `${APP_URL}/tools/ai-rename`,
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
              ratingCount: "95",
            },
            featureList: [
              "Google Gemini AI powered",
              "SEO-optimized filenames",
              "Alt text generation",
              "Batch renaming",
              "Free tier + Pro",
            ],
          }),
        }}
      />
    </main>
  );
}

import React from "react";
import type { Metadata } from "next";
import { ArrowRight, Zap, BookOpen, Instagram, ShoppingBag, Users } from "lucide-react";
import Link from "next/link";
import ToolHeader from "@/components/tools/ToolHeader";
import WorkflowPipeline from "@/components/tools/WorkflowPipeline";
import { APP_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "AI Workflow Pipeline — Compress, Rename & Convert in One Click | SammaPix Pro",
  description:
    "Run an entire image optimization pipeline in one click. Compress, AI rename, resize and convert to WebP automatically. Blog, Instagram, E-commerce and Client Delivery presets included. Pro feature.",
  keywords: [
    "image workflow automation",
    "batch image pipeline",
    "compress resize rename images",
    "image optimization workflow",
    "bulk image processing",
    "ai image rename seo",
    "webp batch converter",
    "image workflow tool",
    "sammapix pro",
  ],
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: `${APP_URL}/tools/workflow`,
  },
  openGraph: {
    title: "AI Workflow Pipeline — Compress, Rename & Convert in One Click | SammaPix Pro",
    description:
      "Run an entire image optimization pipeline in one click. Blog, Instagram, E-commerce and Client Delivery presets.",
    url: `${APP_URL}/tools/workflow`,
    siteName: "SammaPix",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SammaPix AI Workflow Pipeline",
      },
    ],
  },
};

const presetHighlights = [
  {
    icon: <BookOpen className="h-4 w-4 text-[#737373] dark:text-[#A3A3A3]" strokeWidth={1.5} />,
    label: "Blog Post",
    steps: "Compress 80% → AI Rename → 1200px → WebP",
  },
  {
    icon: <Instagram className="h-4 w-4 text-[#737373] dark:text-[#A3A3A3]" strokeWidth={1.5} />,
    label: "Instagram",
    steps: "Compress 85% → 1080px square or portrait",
  },
  {
    icon: <ShoppingBag className="h-4 w-4 text-[#737373] dark:text-[#A3A3A3]" strokeWidth={1.5} />,
    label: "E-commerce",
    steps: "Compress 85% → AI Rename (SKU) → 800px → WebP",
  },
  {
    icon: <Users className="h-4 w-4 text-[#737373] dark:text-[#A3A3A3]" strokeWidth={1.5} />,
    label: "Client Delivery",
    steps: "Light compress 90% → 2400px → ZIP",
  },
];

const relatedTools = [
  { name: "Compress Images", href: "/tools/compress" },
  { name: "AI Rename", href: "/tools/ai-rename" },
  { name: "Resize Images", href: "/tools/resizepack" },
  { name: "Convert to WebP", href: "/tools/webp" },
];

export default function WorkflowPage() {
  return (
    <main>
      <ToolHeader
        title="AI Workflow Pipeline"
        description="Run compress, AI rename, resize and WebP conversion as a single pipeline — one click, one ZIP download."
        icon={Zap}
        accentColor="#6366F1"
      />

      {/* Tool */}
      <section className="px-4 sm:px-6 pb-8">
        <WorkflowPipeline />
      </section>

      {/* Preset overview */}
      <section className="py-12 px-4 sm:px-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-6">
            Four presets, built for real workflows
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {presetHighlights.map((preset) => (
              <div
                key={preset.label}
                className="p-5 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md bg-white dark:bg-[#1E1E1E]"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-8 w-8 rounded-md border border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#F5F5F5] dark:bg-[#252525] flex items-center justify-center flex-shrink-0">
                    {preset.icon}
                  </div>
                  <h3 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5]">
                    {preset.label}
                  </h3>
                </div>
                <p className="text-xs text-[#737373] dark:text-[#A3A3A3] leading-relaxed font-mono">
                  {preset.steps}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Long-form SEO content */}
      <section className="py-12 px-4 sm:px-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mb-4">
            What is the AI Workflow Pipeline?
          </h2>
          <p className="text-sm text-[#737373] leading-relaxed mb-4">
            The AI Workflow Pipeline combines SammaPix&apos;s individual tools — image
            compression, resize, AI-powered renaming and WebP conversion — into
            a single automated sequence. Instead of running each tool separately,
            you choose a preset, drop your images, and download a ZIP with
            all images fully optimized in seconds.
          </p>
          <p className="text-sm text-[#737373] leading-relaxed mb-6">
            Each preset is tuned for a specific use case. The Blog Post preset
            compresses at 80% quality, asks Google Gemini to generate an
            SEO-friendly filename, caps width at 1200px and converts to WebP —
            exactly what Google recommends for fast-loading web pages. The
            E-commerce preset follows a similar chain but targets 800px and
            uses a product SKU naming style.
          </p>
          <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            Why use a pipeline instead of individual tools?
          </h3>
          <ul className="text-sm text-[#737373] leading-relaxed space-y-2 list-none pl-0 mb-6">
            {[
              "Save 5–10 minutes per batch — no switching between tabs",
              "Consistent output every time — same settings, same quality",
              "AI rename runs on the original image for best accuracy",
              "All output lands in a single ZIP, named and ready to upload",
              "Processing is client-side for compress and resize — your images stay private",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="text-[#6366F1] mt-0.5">—</span>
                {item}
              </li>
            ))}
          </ul>

          <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            How AI renaming works in the pipeline
          </h3>
          <p className="text-sm text-[#737373] leading-relaxed mb-4">
            When the Blog Post or E-commerce preset is selected, the pipeline
            sends a thumbnail of each original image to Google Gemini Flash.
            Gemini analyses the image and returns a descriptive,
            lowercase, hyphen-separated filename. The output file is then saved
            under that name — so{" "}
            <code className="text-xs bg-[#F5F5F5] dark:bg-[#252525] border border-[#E5E5E5] dark:border-[#2A2A2A] px-1.5 py-0.5 rounded font-mono">
              IMG_3492.jpg
            </code>{" "}
            becomes{" "}
            <code className="text-xs bg-[#F5F5F5] dark:bg-[#252525] border border-[#E5E5E5] dark:border-[#2A2A2A] px-1.5 py-0.5 rounded font-mono">
              red-ceramic-coffee-mug-wooden-table.webp
            </code>
            .
          </p>
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
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md text-[#525252] dark:text-[#A3A3A3] hover:border-[#A3A3A3] hover:text-[#171717] dark:hover:text-[#E5E5E5] bg-white dark:bg-[#1E1E1E] transition-colors"
              >
                {tool.name}
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "SoftwareApplication",
                name: "SammaPix AI Workflow Pipeline",
                url: `${APP_URL}/tools/workflow`,
                description:
                  "Automated image optimization pipeline. Combines compression, resize, AI rename and WebP conversion into a single one-click workflow with preset modes for Blog, Instagram, E-commerce and Client Delivery.",
                applicationCategory: "PhotographyApplication",
                operatingSystem: "Web Browser",
                offers: {
                  "@type": "Offer",
                  price: "7",
                  priceCurrency: "USD",
                  name: "SammaPix Pro",
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
                  "Blog Post preset — compress, AI rename, 1200px, WebP",
                  "Instagram preset — compress, 1080px square or portrait",
                  "E-commerce preset — compress, AI rename SKU, 800px, WebP",
                  "Client Delivery preset — light compress, 2400px",
                  "Batch ZIP download",
                  "Google Gemini AI renaming",
                  "Client-side compression and resize",
                ],
              },
              {
                "@type": "BreadcrumbList",
                itemListElement: [
                  { "@type": "ListItem", position: 1, name: "Home", item: `${APP_URL}` },
                  { "@type": "ListItem", position: 2, name: "Tools", item: `${APP_URL}/tools` },
                  {
                    "@type": "ListItem",
                    position: 3,
                    name: "AI Workflow Pipeline",
                    item: `${APP_URL}/tools/workflow`,
                  },
                ],
              },
              {
                "@type": "FAQPage",
                mainEntity: [
                  {
                    "@type": "Question",
                    name: "What is the AI Workflow Pipeline?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "The AI Workflow Pipeline is a Pro feature on SammaPix that chains multiple image operations — compression, resize, AI renaming and WebP conversion — into a single automated sequence. You choose a preset (Blog Post, Instagram, E-commerce or Client Delivery), drop your images, and download a ZIP with all files fully processed.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Does image processing happen in my browser?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Compression and resize run entirely in your browser using the Canvas API — no server upload. AI renaming sends a thumbnail to Google Gemini for analysis. WebP conversion also runs locally via the Canvas API.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "What presets are available?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Four presets: Blog Post (compress 80%, AI rename, resize to 1200px, convert to WebP), Instagram (compress 85%, resize to 1080px square or 1080x1350 portrait), E-commerce (compress 85%, AI rename SKU style, resize to 800px, WebP), and Client Delivery (light compress 90%, resize to 2400px).",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Is the Workflow Pipeline free?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "The AI Workflow Pipeline is available to all users. Free users can toggle off AI steps. Pro users ($7/month) get unlimited AI renames, 500-file batches, ZIP download, and zero ads.",
                    },
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

import React from "react";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import ComboClient from "@/components/tools/ComboClient";
import ToolHeader from "@/components/tools/ToolHeader";
import HowToUse from "@/components/tools/HowToUse";
import { APP_URL } from "@/lib/constants";
import { ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "CleanDrop — Strip Metadata, Compress & Convert to WebP | SammaPix",
  description:
    "Strip metadata, compress, and convert to WebP. Privacy-first image optimization. Free, no login required.",
  keywords: [
    "strip exif metadata",
    "remove image metadata",
    "privacy image tool",
    "clean image metadata",
    "remove gps from photo",
    "exif strip compress webp",
  ],
  alternates: {
    canonical: `${APP_URL}/tools/cleandrop`,
  },
  openGraph: {
    title: "CleanDrop — Strip Metadata, Compress & Convert to WebP | SammaPix",
    description:
      "Strip metadata, compress, and convert to WebP. Privacy-first optimization.",
    url: `${APP_URL}/tools/cleandrop`,
    siteName: "SammaPix",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "SammaPix CleanDrop" }],
  },
};

const STEPS = [
  { id: "exif-strip", label: "Strip EXIF/metadata", enabled: true },
  { id: "compress", label: "Compress (80%)", enabled: true },
  { id: "convert-webp", label: "Convert to WebP", enabled: true },
];

const features = [
  {
    title: "Privacy first",
    description:
      "Strips all EXIF metadata including GPS coordinates, camera info, and timestamps before sharing online.",
  },
  {
    title: "No login required",
    description:
      "Completely free and anonymous. Everything processes in your browser — nothing is uploaded to any server.",
  },
  {
    title: "Web-ready output",
    description:
      "After stripping metadata, images are compressed and converted to WebP for optimal web performance.",
  },
];

const relatedTools = [
  { name: "EXIF Lens", href: "/tools/exif" },
  { name: "Compress", href: "/tools/compress" },
  { name: "WebP Converter", href: "/tools/webp" },
  { name: "WebLift", href: "/tools/weblift" },
  { name: "PixShip", href: "/tools/pixship" },
];

export default function CleanDropPage() {
  return (
    <main>
      <ToolHeader
        title="CleanDrop"
        description="Strip metadata, compress, and convert to WebP. Privacy-first optimization."
        icon={ShieldCheck}
        accentColor="#16A34A"
      />

      <ComboClient
        toolName="CleanDrop"
        steps={STEPS}
        requiresLogin={false}
        hasAiSteps={false}
      />

      <HowToUse
        toolName="CleanDrop"
        steps={[
          {
            title: "Drop your photos",
            desc: "Drag and drop photos you want to clean before sharing online.",
          },
          {
            title: "Hit Process All",
            desc: "CleanDrop strips all metadata, compresses at 80%, and converts to WebP.",
          },
          {
            title: "Download clean images",
            desc: "Download metadata-free images individually or as a ZIP archive.",
          },
        ]}
      />

      {/* Features */}
      <section className="py-12 px-4 sm:px-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-6">
            Why use CleanDrop?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {features.map((f) => (
              <div
                key={f.title}
                className="p-5 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md bg-white dark:bg-[#1E1E1E]"
              >
                <h3 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1.5">
                  {f.title}
                </h3>
                <p className="text-sm text-[#737373] leading-relaxed">{f.description}</p>
              </div>
            ))}
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
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md text-[#525252] dark:text-[#A3A3A3] hover:border-[#A3A3A3] hover:text-[#171717] dark:hover:text-[#E5E5E5] bg-white dark:bg-[#1E1E1E] transition-colors"
              >
                {tool.name}
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Schema.org */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "SammaPix CleanDrop",
            url: `${APP_URL}/tools/cleandrop`,
            description:
              "Strip metadata, compress, and convert to WebP. Privacy-first image optimization.",
            applicationCategory: "PhotographyApplication",
            operatingSystem: "Web Browser",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
            author: { "@type": "Person", name: "Luca Sammarco", url: "https://lucasammarco.com" },
            featureList: [
              "Strip all EXIF metadata",
              "Remove GPS coordinates",
              "Compress at 80% quality",
              "Convert to WebP",
              "Batch processing",
              "No login required",
            ],
          }),
        }}
      />
    </main>
  );
}

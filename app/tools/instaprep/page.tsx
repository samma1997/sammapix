import React from "react";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import ComboClient from "@/components/tools/ComboClient";
import ToolHeader from "@/components/tools/ToolHeader";
import HowToUse from "@/components/tools/HowToUse";
import { APP_URL } from "@/lib/constants";
import { Instagram } from "lucide-react";

export const metadata: Metadata = {
  title: "InstaPrep — Instagram-Ready Images in Seconds | SammaPix",
  description:
    "Instagram-ready in seconds. Resize to 1080px square or 1080x1350 portrait and compress for feed or stories. Free, no login.",
  keywords: [
    "instagram image resizer",
    "instagram photo size",
    "resize for instagram",
    "instagram feed size",
    "instagram portrait size",
    "1080x1080 resize",
    "1080x1350 resize",
  ],
  alternates: {
    canonical: `${APP_URL}/tools/instaprep`,
  },
  openGraph: {
    title: "InstaPrep — Instagram-Ready Images in Seconds | SammaPix",
    description:
      "Instagram-ready in seconds. Resize and compress for feed or stories.",
    url: `${APP_URL}/tools/instaprep`,
    siteName: "SammaPix",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "SammaPix InstaPrep" }],
  },
};

const STEPS = [
  { id: "resize", label: "Resize (1080px)", enabled: true },
  { id: "compress", label: "Compress (85%)", enabled: true },
];

const features = [
  {
    title: "Perfect Instagram dimensions",
    description:
      "Resize to 1080x1080 square for feed posts or 1080x1350 portrait for maximum engagement.",
  },
  {
    title: "No login required",
    description:
      "Completely free, no account needed. Upload, process, and download. Done.",
  },
  {
    title: "Optimized file size",
    description:
      "85% quality compression keeps your photos sharp while reducing file size for faster uploads.",
  },
];

const relatedTools = [
  { name: "ResizePack", href: "/tools/resizepack" },
  { name: "CropRatio", href: "/tools/croproatio" },
  { name: "Compress", href: "/tools/compress" },
  { name: "FilmLab", href: "/tools/filmlab" },
  { name: "StampIt", href: "/tools/stampit" },
];

export default function InstaPrepPage() {
  return (
    <main>
      <ToolHeader
        title="InstaPrep"
        description="Instagram-ready in seconds. Resize and compress for feed or stories."
        icon={Instagram}
        accentColor="#E1306C"
      />

      <ComboClient
        toolName="InstaPrep"
        steps={STEPS}
        requiresLogin={false}
        hasAiSteps={false}
      />

      <HowToUse
        toolName="InstaPrep"
        steps={[
          {
            title: "Drop your photos",
            desc: "Drag and drop the photos you want to prepare for Instagram.",
          },
          {
            title: "Hit Process All",
            desc: "InstaPrep resizes to 1080px and compresses at 85% quality automatically.",
          },
          {
            title: "Download and post",
            desc: "Download your Instagram-ready images and upload directly to the app.",
          },
        ]}
      />

      {/* Features */}
      <section className="py-12 px-4 sm:px-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-6">
            Why use InstaPrep?
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
            name: "SammaPix InstaPrep",
            url: `${APP_URL}/tools/instaprep`,
            description:
              "Instagram-ready in seconds. Resize to 1080px and compress for feed or stories.",
            applicationCategory: "PhotographyApplication",
            operatingSystem: "Web Browser",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
            author: { "@type": "Person", name: "Luca Sammarco", url: "https://lucasammarco.com" },
            featureList: [
              "Resize to 1080px square or portrait",
              "Compress at 85% quality",
              "No login required",
              "Batch processing",
              "ZIP download",
            ],
          }),
        }}
      />
    </main>
  );
}

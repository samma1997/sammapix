import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import BatchNameClient from "@/components/tools/BatchNameClient";
import ToolHeader from "@/components/tools/ToolHeader";
import HowToUse from "@/components/tools/HowToUse";
import { APP_URL } from "@/lib/constants";
import MetaViewContent from "@/components/tracking/MetaViewContent";


export const metadata: Metadata = {
  title: "AI Image Renamer — Batch Rename Photos Automatically | SammaPix",
  description:
    "Rename thousands of photos with AI in seconds. Get SEO-friendly, descriptive filenames automatically. Free with account.",
  keywords: [
    "batch rename files",
    "bulk file renamer",
    "rename files with pattern",
    "auto increment file names",
    "free file renamer",
    "batch rename photos",
    "rename photos online",
    "file naming tool",
  ],
  alternates: {
    canonical: `${APP_URL}/tools/batchname`,
  },
  openGraph: {
    title: "AI Image Renamer — Batch Rename Photos Automatically | SammaPix",
    description:
      "Rename thousands of photos with AI in seconds. Get SEO-friendly, descriptive filenames automatically. Free with account.",
    url: `${APP_URL}/tools/batchname`,
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Batch Rename - Rename Files with Custom Patterns",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Image Renamer — Batch Rename Photos Automatically | SammaPix",
    description:
      "Rename thousands of photos with AI in seconds. Get SEO-friendly, descriptive filenames automatically. Free with account.",
  },
};

const howToSteps = [
  { title: "Drop your files", desc: "Drag and drop any files you want to rename." },
  { title: "Set your pattern", desc: "Type a pattern like trip-sri-lanka-{001}. Use {001} for numbers, {date} for today, {original} for original name." },
  { title: "Preview and download", desc: "Review the preview, then download renamed files individually or as ZIP." },
];

const proTip = {
  text: "Combine with AI Rename for intelligent, SEO-friendly file names.",
  linkLabel: "Try AI Rename",
  linkHref: "/tools/ai-rename",
};

const relatedTools = [
  { name: "AI Rename", href: "/tools/ai-rename" },
  { name: "Compress", href: "/tools/compress" },
  { name: "EXIF Viewer", href: "/tools/exif" },
  { name: "AI Photo Sort", href: "/tools/smartsort" },
];

const faqItems = [
  {
    q: "Does BatchName upload my files?",
    a: "No. BatchName works 100% in your browser. Your files never leave your device.",
  },
  {
    q: "What tokens can I use in the pattern?",
    a: "{001} adds auto-incrementing numbers. {date} inserts today's date. {original} keeps the original filename.",
  },
  {
    q: "Is there a file limit?",
    a: "No. BatchName is completely free with no file limits.",
  },
  {
    q: "Can I change the starting number?",
    a: "Yes. You can set the starting number for the {001} token to any value.",
  },
];

export default function BatchNamePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "SammaPix Batch Rename",
    url: `${APP_URL}/tools/batchname`,
    description: "Rename files with custom patterns. Auto-increment, dates, original names.",
    applicationCategory: "UtilitiesApplication",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    operatingSystem: "Web Browser",
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
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to batch rename files with BatchName",
    step: howToSteps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.title,
      text: s.desc,
    })),
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <main>
      <MetaViewContent contentName="Batch Rename" contentId="batchname" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
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
                name: "Batch Rename",
                item: `${APP_URL}/tools/batchname`,
              },
            ],
          }),
        }}
      />

      <ToolHeader
        title="Batch Rename"
        description="Rename files with a custom pattern. No AI, no login, 100% free."
      />

      <BatchNameClient />

      <HowToUse toolName="BatchName" steps={howToSteps} proTip={proTip} />

      {/* Related tools */}
      <section className="py-8 px-4 sm:px-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#1E1E1E]">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-medium text-[#A3A3A3] uppercase tracking-widest mb-3">
            Related tools
          </p>
          <div className="flex flex-wrap gap-2">
            {relatedTools.map((t) => (
              <Link
                key={t.name}
                href={t.href}
                className="text-sm font-medium text-[#6366F1] hover:text-[#4F46E5] transition-colors"
              >
                {t.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-10 px-4 sm:px-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#191919]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-5">
            Frequently Asked Questions
          </h2>
          <dl className="divide-y divide-[#E5E5E5] dark:divide-[#2A2A2A]">
            {faqItems.map((item) => (
              <div key={item.q} className="py-4">
                <dt className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] mb-1">
                  {item.q}
                </dt>
                <dd className="text-sm text-[#737373] dark:text-[#A3A3A3]">
                  {item.a}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </main>
  );
}

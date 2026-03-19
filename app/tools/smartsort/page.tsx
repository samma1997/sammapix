import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import SmartSortClient from "@/components/tools/SmartSortClient";
import ToolHeader from "@/components/tools/ToolHeader";
import HowToUse from "@/components/tools/HowToUse";
import { APP_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "AI Photo Sort - AI Image Categorizer & Sorter | SammaPix",
  description:
    "AI analyzes your images and automatically sorts them into categories like landscapes, portraits, food, screenshots, and more. Download organized as ZIP with folder structure.",
  keywords: [
    "ai image categorizer",
    "sort photos by category",
    "auto organize photos",
    "ai photo sorter",
    "image classification tool",
    "organize photos automatically",
    "photo category sorter",
    "ai image organizer",
  ],
  alternates: {
    canonical: `${APP_URL}/tools/smartsort`,
  },
  openGraph: {
    title: "AI Photo Sort - AI Image Categorizer & Sorter | SammaPix",
    description:
      "AI analyzes images and sorts them into categories. Download as ZIP with folder structure.",
    url: `${APP_URL}/tools/smartsort`,
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AI Photo Sort - AI Image Categorizer & Sorter",
      },
    ],
  },
};

const howToSteps = [
  { title: "Drop your images", desc: "Add photos, screenshots, documents, or any image files." },
  { title: "AI categorizes", desc: "Gemini AI analyzes each image and assigns a category like Landscape, Portrait, Food, Screenshot, etc." },
  { title: "Download sorted", desc: "Download all files as ZIP organized into folders by category, or download individual categories." },
];

const proTip = {
  text: "Unlimited AI categorization on Pro. Free gets 10/day.",
  linkLabel: "Upgrade to Pro",
  linkHref: "/pricing",
};

const relatedTools = [
  { name: "GeoSort", href: "/tools/geosort" },
  { name: "AI Rename", href: "/tools/ai-rename" },
  { name: "BatchName", href: "/tools/batchname" },
  { name: "Cull", href: "/tools/cull" },
];

const faqItems = [
  {
    q: "What categories does SmartSort use?",
    a: "SmartSort categorizes images into: Landscape, Portrait, Food, Architecture, Screenshot, Document, Product, Animal, Art, and Other.",
  },
  {
    q: "How accurate is the AI categorization?",
    a: "SmartSort uses Google Gemini AI which achieves high accuracy. Each result includes a confidence score so you can review uncertain categorizations.",
  },
  {
    q: "Do I need an account?",
    a: "Yes. SmartSort uses AI and requires a free account. Free plan includes 10 AI operations per day. Pro is unlimited.",
  },
  {
    q: "Is my data safe?",
    a: "Only a small thumbnail is sent to Gemini for analysis. Your full-resolution images stay in your browser and are never uploaded to our servers.",
  },
];

export default function SmartSortPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "SammaPix AI Photo Sort",
    url: `${APP_URL}/tools/smartsort`,
    description: "AI-powered image categorizer. Sorts photos into folders by content.",
    applicationCategory: "PhotographyApplication",
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
    name: "How to sort images with AI using SmartSort",
    step: howToSteps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.title,
      text: s.desc,
    })),
  };

  return (
    <main>
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
                name: "AI Photo Sort",
                item: `${APP_URL}/tools/smartsort`,
              },
            ],
          }),
        }}
      />

      <ToolHeader
        title="AI Photo Sort"
        description="AI analyzes images and sorts them into categories automatically."
      />

      <SmartSortClient />

      <HowToUse toolName="SmartSort" steps={howToSteps} proTip={proTip} />

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

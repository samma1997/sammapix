import React from "react";
import type { Metadata } from "next";
import SmartSortClient from "@/components/tools/SmartSortClient";
import ToolHeader from "@/components/tools/ToolHeader";
import HowToUse from "@/components/tools/HowToUse";
import RelatedTools from "@/components/tools/RelatedTools";
import { APP_URL } from "@/lib/constants";
import MetaViewContent from "@/components/tracking/MetaViewContent";


export const metadata: Metadata = {
  title: "AI Photo Sort - AI Image Categorizer & Sorter",
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
    title: "AI Photo Sort - AI Image Categorizer & Sorter",
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
  twitter: {
    card: "summary_large_image",
    title: "AI Photo Sort - AI Image Categorizer & Sorter",
    description:
      "AI analyzes your images and automatically sorts them into categories like landscapes, portraits, food, screenshots, and more. Download organized as ZIP with folder structure.",
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
    a: "Yes. SmartSort uses AI and requires a free account. Free plan includes 10 AI credits per day. Pro is unlimited.",
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
      <MetaViewContent contentName="SmartSort" contentId="smartsort" />
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
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "What is SmartSort?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "SmartSort is a free AI-powered image categorizer by SammaPix. It analyzes your photos using Google Gemini AI and automatically sorts them into categories like Landscape, Portrait, Food, Architecture, and more.",
                },
              },
              {
                "@type": "Question",
                name: "How does AI sorting work?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "SmartSort sends a small thumbnail of each image to Google Gemini AI for analysis. The AI identifies the content and assigns a category. Your full-resolution images never leave your browser.",
                },
              },
              {
                "@type": "Question",
                name: "Is SmartSort free?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, SmartSort is free. A free account is required since it uses AI. Free users get 10 AI credits per day. Pro users get unlimited categorization.",
                },
              },
              {
                "@type": "Question",
                name: "What file types does SmartSort support?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "SmartSort supports JPG, PNG, WebP, GIF, and HEIC image files. It categorizes any image format your browser can display and downloads organized results as a ZIP with folder structure.",
                },
              },
              {
                "@type": "Question",
                name: "What categories does SmartSort use?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "SmartSort categorizes images into: Landscape, Portrait, Food, Architecture, Screenshot, Document, Product, Animal, Art, and Other. Each result includes a confidence score.",
                },
              },
            ],
          }),
        }}
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

      <RelatedTools toolId="smartsort" />

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

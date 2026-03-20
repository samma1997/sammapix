import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import AiOrganizeClient from "@/components/tools/AiOrganizeClient";
import ToolHeader from "@/components/tools/ToolHeader";
import HowToUse from "@/components/tools/HowToUse";
import { APP_URL } from "@/lib/constants";
import MetaViewContent from "@/components/tracking/MetaViewContent";
import { FolderOpen } from "lucide-react";

export const metadata: Metadata = {
  title:
    "AI Photo Organizer — Sort, Dedupe & Rename in One Click | SammaPix",
  description:
    "Drop hundreds of photos. AI sorts them into folders, finds duplicates, and renames for SEO. Free browser-based tool powered by Gemini.",
  keywords: [
    "ai photo organizer",
    "organize photos automatically",
    "ai sort photos into folders",
    "photo duplicate finder",
    "seo image rename",
    "bulk photo organizer",
    "ai categorize images",
    "photo folder organizer",
    "remove duplicate photos",
    "batch rename photos seo",
  ],
  alternates: {
    canonical: `${APP_URL}/tools/ai-organize`,
  },
  openGraph: {
    title:
      "AI Photo Organizer — Sort, Dedupe & Rename in One Click | SammaPix",
    description:
      "Drop hundreds of photos. AI sorts them into folders, finds duplicates, and renames for SEO. Free browser-based tool.",
    url: `${APP_URL}/tools/ai-organize`,
    siteName: "SammaPix",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AI Photo Organizer - Sort, Dedupe & Rename",
      },
    ],
  },
};

const howToSteps = [
  {
    title: "Drop your photos",
    desc: "Drag & drop up to 500 photos at once. JPG, PNG, WebP, HEIC all supported.",
  },
  {
    title: "AI analyzes everything",
    desc: "Each photo is categorized, duplicates are found via perceptual hashing, and SEO names are generated.",
  },
  {
    title: "Review & download",
    desc: "Browse by category, remove dupes, approve or edit AI names, then download as organized ZIP.",
  },
];

const proTip = {
  text: "Works best with 50+ photos. The more you add, the smarter the sorting.",
  linkLabel: "Upgrade to Pro",
  linkHref: "/pricing",
};

const relatedTools = [
  { name: "SmartSort", href: "/tools/smartsort" },
  { name: "TwinHunt", href: "/tools/twinhunt" },
  { name: "AI Rename", href: "/tools/ai-rename" },
  { name: "BatchName", href: "/tools/batchname" },
];

const faqItems = [
  {
    q: "What does AI Organize do?",
    a: "AI Organize combines three tools into one: it categorizes your photos into folders (Nature, People, Food, etc.), finds duplicates using perceptual hashing, and generates SEO-friendly filenames — all in a single workflow.",
  },
  {
    q: "How many photos can I process at once?",
    a: "Free users can process up to 50 photos per session with 10 AI operations per day. Pro users get up to 500 photos per session with 500 AI operations per day.",
  },
  {
    q: "How does duplicate detection work?",
    a: "Duplicates are found using perceptual hashing (pHash) — the same technology behind TwinHunt. It compares visual content, not file bytes, so it catches resized and re-saved copies too.",
  },
  {
    q: "Do I need an account?",
    a: "Yes. AI Organize uses Gemini AI for categorization and renaming, which requires a free account. Sign up takes 10 seconds with Google.",
  },
  {
    q: "Is my data safe?",
    a: "Only small thumbnails are sent to Gemini for analysis. Your full-resolution images stay in your browser. Duplicate detection runs entirely client-side.",
  },
];

export default function AiOrganizePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "SammaPix AI Photo Organizer",
    url: `${APP_URL}/tools/ai-organize`,
    description:
      "AI-powered photo organizer. Sorts photos into folders, finds duplicates, and generates SEO filenames.",
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
    featureList: [
      "AI photo categorization",
      "Perceptual duplicate detection",
      "SEO filename generation",
      "ZIP download with folder structure",
    ],
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to organize photos with AI using AI Organize",
    description:
      "Sort, deduplicate, and rename hundreds of photos in one click with SammaPix AI Organize.",
    totalTime: "PT5M",
    tool: {
      "@type": "SoftwareApplication",
      name: "SammaPix AI Photo Organizer",
      url: `${APP_URL}/tools/ai-organize`,
    },
    step: howToSteps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.title,
      text: s.desc,
      url: `${APP_URL}/tools/ai-organize`,
    })),
  };

  return (
    <main>
      <MetaViewContent contentName="AI Organize" contentId="ai-organize" />
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
                name: "AI Organize",
                item: `${APP_URL}/tools/ai-organize`,
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
            "@type": "FAQPage",
            mainEntity: faqItems.map((item) => ({
              "@type": "Question",
              name: item.q,
              acceptedAnswer: {
                "@type": "Answer",
                text: item.a,
              },
            })),
          }),
        }}
      />

      <ToolHeader
        title="AI Organize"
        description="Drop hundreds of photos. AI sorts them into folders, finds duplicates, and renames for SEO — all in one step."
        icon={FolderOpen}
        accentColor="#8B5CF6"
      />

      <AiOrganizeClient />

      <HowToUse toolName="AI Organize" steps={howToSteps} proTip={proTip} />

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

import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, FolderOpen, Sparkles, CheckCircle2 } from "lucide-react";
import AiOrganizeClient from "@/components/tools/AiOrganizeClient";
import AiOrganizeHeroDemo from "@/components/tools/AiOrganizeHeroDemo";
import HowToUse from "@/components/tools/HowToUse";
import RelatedTools from "@/components/tools/RelatedTools";
import { APP_URL } from "@/lib/constants";
import MetaViewContent from "@/components/tracking/MetaViewContent";

export const metadata: Metadata = {
  title:
    "AI File Organizer — Sort Any File Type with AI",
  description:
    "Drop hundreds of files — photos, PDFs, documents, videos. AI sorts into smart folders, finds duplicates, and renames based on content. Free browser-based tool.",
  keywords: [
    "ai file organizer",
    "ai file sorter",
    "organize documents",
    "sort pdf files",
    "rename documents ai",
    "ai photo organizer",
    "organize photos automatically",
    "ai sort files into folders",
    "file duplicate finder",
    "bulk file organizer",
    "ai categorize files",
    "document organizer",
    "sort videos photos documents",
    "batch rename files ai",
    "smart file sorter",
  ],
  alternates: {
    canonical: `${APP_URL}/tools/ai-organize`,
  },
  openGraph: {
    title:
      "AI File Organizer — Sort Any File Type with AI",
    description:
      "Drop hundreds of files — photos, PDFs, documents, videos. AI sorts into smart folders, finds duplicates, and renames based on content. Free browser-based tool.",
    url: `${APP_URL}/tools/ai-organize`,
    siteName: "SammaPix",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AI File Organizer - Sort Any File Type with AI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "AI File Organizer — Sort Any File Type with AI",
    description:
      "Drop hundreds of files — photos, PDFs, documents, videos. AI sorts into smart folders, finds duplicates, and renames based on content. Free browser-based tool.",
  },
};

const howToSteps = [
  {
    title: "Drop any files",
    desc: "Drag & drop up to 500 files at once. Photos, PDFs, Word, Excel, PowerPoint, videos, audio, code — all supported.",
  },
  {
    title: "AI analyzes everything",
    desc: "Each file is categorized into smart folders (Contracts, Invoices, Travel Photos, etc.), duplicates are found, and descriptive names are generated.",
  },
  {
    title: "Review & download",
    desc: "Browse by category, remove dupes, approve or edit AI names, then download as organized ZIP with folder structure.",
  },
];

const proTip = {
  text: "Works best with 50+ files. Mix photos, documents, and videos — the AI handles all types.",
  linkLabel: "Upgrade to Pro",
  linkHref: "/pricing",
};


const faqItems = [
  {
    q: "What file types does AI Organize support?",
    a: "AI Organize supports virtually all common file types: images (JPG, PNG, WebP, GIF, HEIC, SVG), documents (PDF, DOCX, XLSX, PPTX), text and code files (TXT, MD, CSV, JSON, HTML, CSS, JS, PY, TS), videos (MP4, MOV, WebM, AVI), and audio (MP3, WAV, M4A, OGG).",
  },
  {
    q: "How does AI categorization work for different file types?",
    a: "For images and videos, AI analyzes the visual content (thumbnails and first frames). For documents, spreadsheets, and presentations, it reads extracted text content. The AI creates smart categories like 'Contracts', 'Invoices', 'Travel Photos', 'Product Shots', 'Receipts', 'Code', and more — adapting to your actual content.",
  },
  {
    q: "How many files can I process at once?",
    a: "Free users can process up to 50 files per session with 10 AI credits per day. Pro users get up to 500 files per session with 500 AI credits per day.",
  },
  {
    q: "How does duplicate detection work?",
    a: "For images and videos, duplicates are found using perceptual hashing that compares visual content. For text-based files (documents, code, spreadsheets), duplicates are detected by comparing content similarity, catching files with the same content but different filenames.",
  },
  {
    q: "Do I need an account?",
    a: "Yes. AI Organize uses Gemini AI for categorization and renaming, which requires a free account. Sign up takes 10 seconds with Google.",
  },
  {
    q: "Is my data safe?",
    a: "Yes. File previews are extracted client-side in your browser. Only small thumbnails (for images/videos) or short text excerpts (for documents) are sent to the AI for analysis. Your full files never leave your browser. Duplicate detection runs entirely client-side.",
  },
  {
    q: "Can I organize a mix of different file types?",
    a: "Absolutely — that's the power of AI Organize. Drop photos, PDFs, spreadsheets, and code files all at once. The AI will sort them into contextual categories and suggest descriptive filenames for each.",
  },
];

export default function AiOrganizePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "SammaPix AI File Organizer",
    url: `${APP_URL}/tools/ai-organize`,
    description:
      "AI-powered universal file organizer. Sorts photos, documents, videos, and code into smart folders, finds duplicates, and generates descriptive filenames.",
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
    featureList: [
      "AI file categorization for all file types",
      "Smart duplicate detection (visual + content)",
      "Descriptive filename generation",
      "ZIP download with folder structure",
      "Support for images, PDFs, documents, videos, audio, code",
    ],
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to organize any files with AI using AI Organize",
    description:
      "Sort, deduplicate, and rename hundreds of files — photos, PDFs, documents, videos — in one click with SammaPix AI Organize.",
    totalTime: "PT5M",
    tool: {
      "@type": "SoftwareApplication",
      name: "SammaPix AI File Organizer",
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

      {/* Hero — Split layout */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-4 sm:pt-5 pb-6">
        <Link
          href="/tools"
          className="inline-flex items-center gap-1.5 text-xs text-[#A3A3A3] dark:text-[#737373] hover:text-[#171717] dark:hover:text-[#E5E5E5] transition-colors mb-2"
        >
          <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.5} />
          All tools
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-4 lg:gap-8 items-center">
          <div>
            <div className="flex items-start gap-3 mb-2">
              <div
                className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center mt-0.5"
                style={{ backgroundColor: "#8B5CF615", border: "1px solid #8B5CF630" }}
                aria-hidden="true"
              >
                <FolderOpen className="h-4 w-4" style={{ color: "#8B5CF6" }} strokeWidth={1.5} />
              </div>
              <div className="flex items-baseline gap-2 flex-wrap">
                <h1 className="text-xl sm:text-[26px] font-semibold text-[#171717] dark:text-[#E5E5E5] tracking-tight leading-tight">
                  AI Organize. Any File, Smart Folders
                </h1>
                <span className="inline-flex items-center text-[9px] font-bold px-1.5 py-0.5 rounded bg-violet-100 text-violet-700 dark:bg-violet-950/30 dark:text-violet-400 uppercase tracking-wide">
                  AI
                </span>
              </div>
            </div>

            <p className="text-sm text-[#737373] dark:text-[#A3A3A3] leading-relaxed mb-3">
              Drop <strong className="text-[#171717] dark:text-[#E5E5E5]">any files</strong> — photos, PDFs, documents, videos, audio. AI reads content and creates content-aware smart folders ("Tax 2026", "Travel · Italy", "Wedding · Smith"), finds duplicates, and auto-renames based on content.
            </p>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#525252] dark:text-[#A3A3A3]">
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2} />
                Content-aware folders
              </span>
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2} />
                Duplicate detection
              </span>
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2} />
                Auto-rename
              </span>
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2} />
                Any file type
              </span>
            </div>
          </div>

          <div className="max-w-[380px] w-full mx-auto lg:mx-0 lg:ml-auto">
            <AiOrganizeHeroDemo />
          </div>
        </div>
      </section>

      <AiOrganizeClient />

      <HowToUse toolName="AI Organize" steps={howToSteps} proTip={proTip} />

      <RelatedTools toolId="ai-organize" />

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

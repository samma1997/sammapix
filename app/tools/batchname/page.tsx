import React from "react";
import type { Metadata } from "next";
import BatchNameClient from "@/components/tools/BatchNameClient";
import ToolHeader from "@/components/tools/ToolHeader";
import HowToUse from "@/components/tools/HowToUse";
import RelatedTools from "@/components/tools/RelatedTools";
import { APP_URL } from "@/lib/constants";
import MetaViewContent from "@/components/tracking/MetaViewContent";

const TOOL_URL = `${APP_URL}/tools/batchname`;

export const metadata: Metadata = {
  title: "Batch Rename Files Online — Free Bulk Renamer with EXIF + Patterns",
  description:
    "Rename hundreds of files at once with custom patterns, EXIF dates, find & replace, and case conversion. 100% in your browser — no upload, no signup, unlimited files.",
  keywords: [
    "batch rename files",
    "bulk rename online",
    "rename files with pattern",
    "rename photos by date taken",
    "exif date rename",
    "find and replace filename",
    "auto increment file names",
    "free file renamer",
    "rename multiple files online",
    "bulk rename photos",
  ],
  alternates: {
    canonical: TOOL_URL,
  },
  openGraph: {
    title: "Batch Rename Files Online — Free Bulk Renamer with EXIF + Patterns",
    description:
      "Rename hundreds of files at once with custom patterns, EXIF dates, find & replace, and case conversion. 100% browser-based.",
    url: TOOL_URL,
    siteName: "SammaPix",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SammaPix Batch Rename — bulk file renamer with EXIF, patterns, find & replace",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Batch Rename Files Online — Free Bulk Renamer",
    description: "Rename hundreds of files at once with patterns, EXIF dates, find & replace. No upload.",
  },
};

const howToSteps = [
  {
    title: "Drop your files",
    desc: "Drag and drop any files (images, documents, anything). Unlimited files, 100% in your browser. EXIF metadata is read automatically for photos.",
  },
  {
    title: "Pick a mode",
    desc: "Pattern (use {n}, {date}, {exif:date}, {exif:camera}, {name}, +8 more tokens), Find & Replace (with regex support), or Case Convert (UPPER, kebab-case, snake_case, Title Case).",
  },
  {
    title: "Preview and download",
    desc: "Live preview shows old → new filename for every file. Sort by name, date taken or size before renaming. Download single file or ZIP with all renamed files.",
  },
];

const proTip = {
  text: "Need AI to look at the photo and create SEO-friendly names automatically? Use AI Rename instead.",
  linkLabel: "Try AI Rename",
  linkHref: "/tools/ai-rename",
};

const faqItems = [
  {
    q: "Does Batch Rename upload my files anywhere?",
    a: "No. Batch Rename runs 100% in your browser using JavaScript, JSZip, and the exifr library. Your files never leave your device — complete privacy guaranteed.",
  },
  {
    q: "What tokens can I use in the pattern?",
    a: "13 tokens are available: {n} and {n:3} for auto-incrementing numbers with custom padding, {N} for total count, {name} for original filename, {ext} for extension, {date} and {time} for current date/time, {exif:date}, {exif:camera}, {exif:iso} for photo metadata, {size} for file size in KB, and {w}/{h} for image dimensions.",
  },
  {
    q: "Can I rename photos by the date they were taken?",
    a: "Yes. Use the {exif:date} token in your pattern (or pick the 'Travel + EXIF date' preset). The tool reads the DateTimeOriginal EXIF tag from each photo and formats it as YYYY-MM-DD. Falls back to file modified date if EXIF is missing.",
  },
  {
    q: "Is there a file limit?",
    a: "No file count limit. Single file download is free; downloading multiple files as a ZIP requires a Pro account ($9/month). EXIF reading and pattern preview are unlimited regardless of plan.",
  },
  {
    q: "Can I do find & replace with regular expressions?",
    a: "Yes. Switch to 'Find & Replace' mode and toggle the Regex checkbox. Standard JavaScript regex syntax is supported (e.g. ^IMG_(\\d+) → photo-$1). Case sensitivity is also a separate toggle.",
  },
  {
    q: "What happens if two files end up with the same new name?",
    a: "The tool automatically appends -2, -3, etc. to avoid filename collisions. Conflicting renames are highlighted in amber in the preview list so you can spot them before downloading.",
  },
  {
    q: "Can I sort files before renaming?",
    a: "Yes. You can sort by original order, name (A-Z or Z-A), date taken (oldest or newest first), or file size. The {n} counter then follows the sorted order — useful for chronological photo archives.",
  },
  {
    q: "What is the CSV mapping export?",
    a: "It downloads a CSV file with two columns (original, new) listing every file's old name and what it will be renamed to. Useful as an audit log or to undo the rename later.",
  },
  {
    q: "Difference between Batch Rename and AI Rename?",
    a: "Batch Rename uses mechanical patterns (numbers, dates, find/replace) and is best when you already know the naming scheme. AI Rename looks at each image with Google Gemini and generates a descriptive SEO-friendly name based on what it sees — best for unknown content.",
  },
];

export default function BatchNamePage() {
  const softwareSchema = {
    "@type": "SoftwareApplication",
    name: "SammaPix Batch Rename",
    description:
      "Bulk rename files in your browser with custom patterns (13 tokens including EXIF), find & replace with regex, case conversion, and sort by date taken/name/size.",
    url: TOOL_URL,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web Browser",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    author: {
      "@type": "Person",
      name: "Luca Sammarco",
      url: "https://lucasammarco.com",
    },
    creator: {
      "@type": "Organization",
      name: "SammaPix",
      url: APP_URL,
    },
    featureList: [
      "Pattern-based rename with 13 tokens",
      "EXIF date, camera, ISO tokens",
      "Find & replace with regex support",
      "Case conversion (UPPER, lower, kebab, snake, Title)",
      "Sort by name, date taken, size",
      "Auto-conflict resolution",
      "CSV mapping export",
      "Browser-based — no upload",
      "Unlimited files",
    ],
  };

  const faqSchema = {
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

  const breadcrumbSchema = {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: APP_URL },
      { "@type": "ListItem", position: 2, name: "Tools", item: `${APP_URL}/tools` },
      { "@type": "ListItem", position: 3, name: "Batch Rename", item: TOOL_URL },
    ],
  };

  const howToSchema = {
    "@type": "HowTo",
    name: "How to batch rename files online",
    description:
      "Rename multiple files at once using custom patterns, EXIF metadata, find & replace, or case conversion — all in your browser.",
    totalTime: "PT1M",
    tool: {
      "@type": "SoftwareApplication",
      name: "SammaPix Batch Rename",
      url: TOOL_URL,
    },
    step: howToSteps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.title,
      text: s.desc,
      url: TOOL_URL,
    })),
  };

  return (
    <main>
      <MetaViewContent contentName="Batch Rename" contentId="batchname" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [softwareSchema, faqSchema, breadcrumbSchema],
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            ...howToSchema,
          }),
        }}
      />

      <ToolHeader
        title="Batch Rename"
        description="Rename hundreds of files in your browser. 13 pattern tokens, EXIF dates, find & replace, case conversion. No upload, no signup."
      />

      <BatchNameClient />

      <HowToUse toolName="Batch Rename" steps={howToSteps} proTip={proTip} />

      {/* Why use this tool */}
      <section className="py-12 px-4 sm:px-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mb-4">
            When to use Batch Rename
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-[#737373] dark:text-[#A3A3A3] leading-relaxed">
            <div className="p-4 rounded-md border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#1E1E1E]">
              <h3 className="font-semibold text-[#171717] dark:text-[#E5E5E5] mb-2">Photographers</h3>
              <p>
                Use{" "}
                <code className="text-[11px] font-mono bg-[#F5F5F5] dark:bg-[#252525] px-1 rounded">
                  {`{exif:date}-shoot-{n:3}`}
                </code>{" "}
                to rename a chronological set of photos like{" "}
                <code className="text-[11px] font-mono">2024-08-15-shoot-001.jpg</code>. Sort by date
                taken so the counter matches the actual sequence.
              </p>
            </div>
            <div className="p-4 rounded-md border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#1E1E1E]">
              <h3 className="font-semibold text-[#171717] dark:text-[#E5E5E5] mb-2">E-commerce</h3>
              <p>
                Rename product photos with consistent SKU-based names. Pattern{" "}
                <code className="text-[11px] font-mono bg-[#F5F5F5] dark:bg-[#252525] px-1 rounded">
                  {`product-{name}-{n:3}`}
                </code>{" "}
                keeps the original name + adds a counter for variants.
              </p>
            </div>
            <div className="p-4 rounded-md border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#1E1E1E]">
              <h3 className="font-semibold text-[#171717] dark:text-[#E5E5E5] mb-2">Bloggers / SEO</h3>
              <p>
                Rename downloaded images to lowercase kebab-case before publishing. Use Case Convert
                mode → kebab-case to turn{" "}
                <code className="text-[11px] font-mono">My Photo (1).JPG</code> into{" "}
                <code className="text-[11px] font-mono">my-photo-1.jpg</code>.
              </p>
            </div>
            <div className="p-4 rounded-md border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#1E1E1E]">
              <h3 className="font-semibold text-[#171717] dark:text-[#E5E5E5] mb-2">Cleanup tasks</h3>
              <p>
                Strip a common prefix from hundreds of files in one shot. Use Find &amp; Replace mode:
                find <code className="text-[11px] font-mono">IMG_</code>, replace with{" "}
                <code className="text-[11px] font-mono">vacation-</code>.
              </p>
            </div>
          </div>
        </div>
      </section>

      <RelatedTools toolId="batchname" />

      {/* FAQ */}
      <section className="py-10 px-4 sm:px-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#191919]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-5">
            Frequently Asked Questions
          </h2>
          <dl className="divide-y divide-[#E5E5E5] dark:divide-[#2A2A2A]">
            {faqItems.map((item) => (
              <div key={item.q} className="py-4">
                <dt className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] mb-1.5">
                  {item.q}
                </dt>
                <dd className="text-sm text-[#737373] dark:text-[#A3A3A3] leading-relaxed">
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

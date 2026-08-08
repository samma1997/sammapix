import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { APP_URL } from "@/lib/constants";
import BlogArticleLayout from "@/components/blog/BlogArticleLayout";

// ── Metadata ──────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "How to Add a Made with AI Label to Images (Free)",
  description:
    "Add a Made with AI badge to any image in seconds, free, with no upload. Step-by-step guide covering EU AI Act Article 50 disclosure, label styles, batch export, and best practices for creators and marketers.",
  alternates: {
    canonical: `${APP_URL}/blog/how-to-add-made-with-ai-label`,
    languages: {
      en: `${APP_URL}/blog/how-to-add-made-with-ai-label`,
      it: `${APP_URL}/it/blog/come-aggiungere-etichetta-ai-foto`,
      de: `${APP_URL}/de/blog/made-with-ai-label-hinzufuegen`,
      fr: `${APP_URL}/fr/blog/ajouter-label-made-with-ai`,
      es: `${APP_URL}/es/blog/anadir-etiqueta-made-with-ai`,
      "x-default": `${APP_URL}/blog/how-to-add-made-with-ai-label`,
    },
  },
  keywords: [
    "how to add made with ai label",
    "label ai generated images",
    "made with ai badge free",
    "add ai disclosure to photo",
    "watermark ai image eu",
    "eu ai act image label",
    "ai generated image disclosure",
    "ai label tool free no upload",
  ],
  openGraph: {
    title: "How to Add a Made with AI Label to Images (Free)",
    description:
      "EU AI Act Article 50 is live. Add a Made with AI disclosure badge to any image in seconds, free, no upload. Full step-by-step guide for creators and marketers.",
    url: `${APP_URL}/blog/how-to-add-made-with-ai-label`,
    type: "article",
    publishedTime: "2026-08-08",
    authors: ["https://lucasammarco.com"],
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Add a Made with AI Label to Images (Free)",
    description:
      "Add a Made with AI badge to any image, free, no upload. EU AI Act Article 50 is in force. Here is the fastest compliant workflow for creators and marketers.",
    creator: "@lucasammarco",
  },
};

// ── Schema constants ──────────────────────────────────────────────────────────

const POST_DATE = "2026-08-08";
const POST_DATE_FORMATTED = "August 8, 2026";
const POST_URL = `${APP_URL}/blog/how-to-add-made-with-ai-label`;
const POST_TITLE = "How to Add a Made with AI Label to Images (Free)";

// ── Article schema ────────────────────────────────────────────────────────────

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: POST_TITLE,
  description:
    "EU AI Act Article 50 transparency requirements apply from 2 August 2026 and require a human-readable disclosure on AI-generated images published to any audience. This guide explains the fastest compliant workflow: how to add a Made with AI label, AI-generated, or AI-assisted badge to images entirely in the browser using SammaPix AI Label, with no file upload, no signup, and batch support for entire campaigns. Covers label placement, style options, best practices for artistic works, and the privacy advantage of browser-based processing.",
  url: POST_URL,
  datePublished: POST_DATE,
  dateModified: POST_DATE,
  author: {
    "@type": "Person",
    name: "Luca Sammarco",
    url: "https://www.sammapix.com/about",
    image: "https://www.sammapix.com/luca-sammarco.jpg",
    sameAs: ["https://lucasammarco.com", "https://github.com/samma1997"],
  },
  publisher: {
    "@type": "Organization",
    name: "SammaPix",
    url: APP_URL,
    logo: {
      "@type": "ImageObject",
      url: "https://sammapix.com/og-image.png",
    },
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": POST_URL,
  },
  keywords: [
    "how to add made with ai label",
    "label ai generated images",
    "made with ai badge free",
    "add ai disclosure to photo",
    "watermark ai image eu",
  ],
};

// ── Breadcrumb schema ─────────────────────────────────────────────────────────

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: APP_URL },
    { "@type": "ListItem", position: 2, name: "Blog", item: `${APP_URL}/blog` },
    {
      "@type": "ListItem",
      position: 3,
      name: POST_TITLE,
      item: POST_URL,
    },
  ],
};

// ── HowTo schema ──────────────────────────────────────────────────────────────

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Add a Made with AI Label to an Image",
  description:
    "Add a visible Made with AI disclosure badge to any image in your browser using SammaPix AI Label. No upload, no server, no signup. Supports single images and batch export for entire campaigns.",
  totalTime: "PT1M",
  tool: [
    {
      "@type": "HowToTool",
      name: "SammaPix AI Label (browser-based, free, no upload)",
    },
  ],
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Open the AI Label tool",
      text: "Go to sammapix.com/tools/ai-label in any modern browser. No account or signup is required. The tool loads entirely client-side.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Drop your image or images",
      text: "Drag one or more images onto the drop zone, or click to browse your device. Supported formats include JPEG, PNG, WebP, and AVIF. Files stay on your device and are never sent to any server.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Choose your label text",
      text: "Select from preset options including Made with AI, AI-generated, and AI-assisted, or type a custom label. The preset texts align with common EU AI Act disclosure conventions.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Set position, style, and size",
      text: "Pick one of five placement positions (bottom-right, bottom-left, top-right, top-left, or center). Choose a visual style: solid background for maximum legibility, subtle (semi-transparent) for lighter disclosure on artistic works, or outline for a clean minimal look. Adjust font size with the size slider.",
    },
    {
      "@type": "HowToStep",
      position: 5,
      name: "Preview and download",
      text: "A live preview updates instantly as you change settings. Download the labeled image for free (single image) or export all images in one ZIP for batch processing. Keep your unlabeled originals separately for future edits.",
    },
  ],
};

// ── FAQ schema ────────────────────────────────────────────────────────────────

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is the AI Label tool free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Adding a Made with AI label to a single image is completely free on SammaPix, with no signup required. Batch export (multiple images at once) requires a free account or a Day Pass.",
      },
    },
    {
      "@type": "Question",
      name: "Are my images uploaded to a server?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. The SammaPix AI Label tool runs entirely in your browser. Your image files are read from local storage using the browser File API, processed in memory using the Canvas API, and written back to your local device. No bytes leave your machine. This makes it safe for confidential campaign assets, client work, and personal images.",
      },
    },
    {
      "@type": "Question",
      name: "Does adding a visible label satisfy the EU AI Act Article 50 requirement?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A visible human-readable disclosure is the element that Article 50 requires deployers to add. The regulation also requires providers of GPAI models to embed a machine-readable marking in the content at generation time. Adding a visible label with a tool like SammaPix covers the deployer-side obligation. For a complete legal analysis of who must comply and what counts as sufficient disclosure, read the pillar article at sammapix.com/blog/eu-ai-act-label-ai-content. This article provides general informational guidance only and is not legal advice.",
      },
    },
    {
      "@type": "Question",
      name: "Can I label a whole batch of AI images at once?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Drop multiple images onto the tool at the same time. The same label settings (text, position, style, size) apply to every image in the batch. Use the batch download button to export all labeled images as a ZIP file in one click.",
      },
    },
    {
      "@type": "Question",
      name: "Which image formats does the AI Label tool support?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The tool supports JPEG, PNG, WebP, and AVIF. Output is always saved as a high-quality JPEG or PNG depending on the original format. If you need to convert a format before labeling, use the SammaPix Convert tool first.",
      },
    },
    {
      "@type": "Question",
      name: "Does the label affect image quality?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The label is composited using the browser Canvas API at full image resolution. Quality loss is negligible and identical to a standard resave operation. For very large source images (over 20 megapixels), the browser may apply a small downscale during Canvas rendering, which is standard behavior across all browser-based image tools.",
      },
    },
  ],
};

// ── Page component ────────────────────────────────────────────────────────────

export default function HowToAddMadeWithAiLabelPage() {
  return (
    <>
      <BlogArticleLayout
        title={POST_TITLE}
        slug="how-to-add-made-with-ai-label"
        description={`EU AI Act Article 50 has been in force since 2 August 2026 and requires a visible disclosure on AI-generated images you publish. Adding a label does not have to be complicated. This guide walks you through the fastest compliant workflow using a free, browser-based tool that never uploads your files.`}
        date={POST_DATE}
        dateFormatted={POST_DATE_FORMATTED}
        tags={["Creative"]}
        readingTime={8}
        headings={[
          { id: "quick-answer", title: "Quick answer and why you may need this" },
          { id: "step-by-step", title: "Step by step: using the free AI Label tool" },
          { id: "step-table", title: "The full workflow at a glance" },
          { id: "best-practices", title: "Best practices for AI image disclosure" },
          { id: "alternatives", title: "Alternatives and why browser-based wins on privacy" },
          { id: "faq", title: "FAQ" },
        ]}
        summary={[
          "EU AI Act Article 50 requires a visible human-readable disclosure on AI-generated images published to any audience, effective 2 August 2026.",
          "The SammaPix AI Label tool adds a Made with AI badge entirely in your browser: no upload, no signup, no files sent to any server.",
          "Choose from three label texts (Made with AI, AI-generated, AI-assisted or custom), five positions, and three visual styles.",
          "Batch your entire campaign in one drop: all images get the same label settings and export as a single ZIP.",
          "Keep your original unlabeled files. Only the downloaded copies carry the disclosure badge.",
        ]}
        heroImage={
          <figure>
            <img
              src="https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80"
              alt="Abstract digital art representing AI-generated imagery that requires a Made with AI disclosure label under EU AI Act Article 50"
              className="w-full rounded-lg"
              loading="eager"
            />
            <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
              Every AI-generated image you publish may now require a visible disclosure label. Here is the fastest way to add one, free, without leaving your browser. Photo by Maximalfocus on Unsplash
            </figcaption>
          </figure>
        }
        ctaBlock={
          <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2">
              Add a Made with AI label now, free, no upload
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-4">
              Drop your AI-generated images into the SammaPix AI Label tool. Pick your text, position and style, then download. Everything runs in your browser: no files are ever uploaded.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/tools/ai-label"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
              >
                Open AI Label Tool
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
              <Link
                href="/blog/eu-ai-act-label-ai-content"
                className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#1A1A1A] text-gray-700 dark:text-[#A3A3A3] text-sm font-medium rounded-md border border-gray-200 dark:border-[#333] hover:bg-gray-50 dark:hover:bg-[#222] transition-colors"
              >
                Read the EU AI Act guide
              </Link>
            </div>
          </div>
        }
      >
        {/* Quick answer block */}
        <div className="mb-8 p-4 bg-gray-50 dark:bg-[#1E1E1E] border-l-4 border-[#6366F1] rounded-r-md">
          <p className="text-xs font-semibold text-[#6366F1] mb-1.5 uppercase tracking-wide">
            Quick Answer
          </p>
          <p className="text-sm text-gray-700 dark:text-[#A3A3A3] leading-relaxed">
            Open{" "}
            <Link href="/tools/ai-label" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2">
              sammapix.com/tools/ai-label
            </Link>
            , drop your image, choose a label text and position, click download. No upload, no signup, free. For the legal background on why you may need this, read{" "}
            <Link href="/blog/eu-ai-act-label-ai-content" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2">
              the EU AI Act disclosure guide
            </Link>
            .
          </p>
        </div>

        {/* Section 1 */}
        <h2 id="quick-answer" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          Quick answer and why you may need this
        </h2>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Since 2 August 2026, EU AI Act Article 50 has required anyone who deploys an AI system to output images, audio, or video intended for a public audience to add a visible human-readable disclosure. That covers a wide range of real-world scenarios: a social media manager posting AI-generated campaign visuals, a designer using Midjourney for client deliverables, a blogger illustrating articles with Stable Diffusion outputs, or a marketer building product ads with generative tools.
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          The regulation does not prescribe exactly how the label must look or where it must appear on the image. It does require that a person viewing the content can reasonably recognize it as AI-generated. That leaves room for a small, tasteful badge rather than a large intrusive overlay, especially for artistic and creative works where the regulation explicitly allows a lighter approach.
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          For a thorough legal breakdown of who must comply, what the exemptions are, and what machine-readable marking means,{" "}
          <Link href="/blog/eu-ai-act-label-ai-content" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">
            read the full EU AI Act guide
          </Link>
          . This article focuses on the practical how-to: getting the label onto your images quickly, correctly, and without handing your files to a third-party server.
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          <em>General informational guidance only. This article is not legal advice. Consult qualified legal counsel for compliance decisions specific to your situation.</em>
        </p>

        {/* Section 2 */}
        <h2 id="step-by-step" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          Step by step: using the free AI Label tool
        </h2>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          The{" "}
          <Link href="/tools/ai-label" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">
            SammaPix AI Label tool
          </Link>{" "}
          runs entirely in your browser using the Canvas API. Every operation happens in local memory. No file is transmitted to any server at any point in the workflow. The result is a labeled copy of your image ready to publish or hand off to a client.
        </p>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-8 mb-3">
          Step 1. Open the tool
        </h3>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Navigate to{" "}
          <Link href="/tools/ai-label" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">
            sammapix.com/tools/ai-label
          </Link>{" "}
          in any modern browser. Chrome, Firefox, Safari, and Edge all work. No extension, no plugin, and no account are required. The tool loads in a few seconds from a Vercel edge network, so the interface appears almost instantly regardless of your location.
        </p>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-8 mb-3">
          Step 2. Drop your images
        </h3>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Drag one image or an entire folder of images onto the drop zone, or click the zone to open a file picker. Supported input formats are JPEG, PNG, WebP, and AVIF. You can drop as many files as you need in a single batch. The tool reads each file from your local storage using the browser File API and loads it into memory. Nothing leaves your device.
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          For large campaigns with dozens of images, dropping them all at once is the fastest approach. All images will receive the same label configuration you set in the next steps.
        </p>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-8 mb-3">
          Step 3. Pick your label text
        </h3>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          The tool offers three preset label texts:
        </p>
        <ul className="space-y-3 mb-6 pl-4">
          <li className="flex items-start gap-2 text-sm text-[#737373] leading-relaxed">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#6366F1] shrink-0" />
            <span>
              <strong className="text-[#171717] dark:text-[#E5E5E5]">Made with AI</strong> is the broadest and most widely understood phrase. Use it when an image was generated entirely by an AI model from a text prompt or a reference image.
            </span>
          </li>
          <li className="flex items-start gap-2 text-sm text-[#737373] leading-relaxed">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#6366F1] shrink-0" />
            <span>
              <strong className="text-[#171717] dark:text-[#E5E5E5]">AI-generated</strong> is slightly more precise and is the phrasing used most often in regulatory contexts. A good choice for professional or compliance-focused use cases.
            </span>
          </li>
          <li className="flex items-start gap-2 text-sm text-[#737373] leading-relaxed">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#6366F1] shrink-0" />
            <span>
              <strong className="text-[#171717] dark:text-[#E5E5E5]">AI-assisted</strong> fits situations where a human created the base image and AI tools enhanced specific elements, such as background replacement, upscaling, or object removal.
            </span>
          </li>
        </ul>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          You can also type a fully custom label. Some brands prefer a proprietary phrase like "Created with generative AI" or add an icon glyph before the text. The custom field accepts any short text string.
        </p>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-8 mb-3">
          Step 4. Choose position, style, and size
        </h3>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Position determines where on the image the badge appears. Five options are available:
        </p>
        <ul className="space-y-2 mb-4 pl-4">
          {[
            "Bottom right (default, most conventional placement for watermarks and labels)",
            "Bottom left",
            "Top right",
            "Top left",
            "Center (rarely used for disclosure labels but available for specific design needs)",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-[#737373] leading-relaxed">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-gray-300 dark:bg-[#525252] shrink-0" />
              {item}
            </li>
          ))}
        </ul>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Style controls the visual treatment of the badge. Three options exist:
        </p>
        <ul className="space-y-3 mb-6 pl-4">
          <li className="flex items-start gap-2 text-sm text-[#737373] leading-relaxed">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-gray-800 dark:bg-gray-200 shrink-0" />
            <span>
              <strong className="text-[#171717] dark:text-[#E5E5E5]">Solid</strong> renders a fully opaque background behind the label text. Maximum legibility on any image. Appropriate when you want the disclosure to be unmissably visible.
            </span>
          </li>
          <li className="flex items-start gap-2 text-sm text-[#737373] leading-relaxed">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-gray-400 dark:bg-gray-500 shrink-0" />
            <span>
              <strong className="text-[#171717] dark:text-[#E5E5E5]">Subtle</strong> uses a semi-transparent background so the underlying image shows through. A good choice for artistic and creative works where the regulation permits a lighter disclosure approach.
            </span>
          </li>
          <li className="flex items-start gap-2 text-sm text-[#737373] leading-relaxed">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-gray-200 dark:bg-gray-600 shrink-0" />
            <span>
              <strong className="text-[#171717] dark:text-[#E5E5E5]">Outline</strong> draws the label text with a thin border and no filled background. The most minimal and unobtrusive option, suited to images with clean, predictable background areas.
            </span>
          </li>
        </ul>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          The size slider adjusts font size relative to the image dimensions. A live preview refreshes instantly with every change you make to text, position, style, or size, so you see exactly what the final output will look like before downloading.
        </p>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-8 mb-3">
          Step 5. Preview and download
        </h3>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Once you are satisfied with the preview, click Download. For a single image, the labeled file downloads immediately. For a batch of images, click the batch download button to receive a ZIP archive containing all labeled images in one click. The ZIP is assembled in browser memory using the JSZip library. No server is involved at any stage.
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Keep your original unlabeled files in a separate folder. The tool only writes to the downloaded copies. If you later need to adjust the label for a different platform or format, you can re-run the originals through the tool with new settings.
        </p>

        {/* Inline CTA */}
        <Link
          href="/tools/ai-label"
          className="flex items-center justify-between gap-4 bg-[#171717] text-white rounded-md px-6 py-5 hover:bg-[#262626] transition-colors group mt-2 mb-8"
        >
          <div>
            <p className="text-xs font-medium text-[#A3A3A3] uppercase tracking-wide mb-1">
              Free tool, no upload, no signup
            </p>
            <p className="text-sm font-semibold text-white leading-snug">
              Add a Made with AI label to your images now
            </p>
          </div>
          <ArrowRight
            className="h-4 w-4 text-[#737373] group-hover:text-white group-hover:translate-x-0.5 transition-all shrink-0"
            strokeWidth={1.5}
          />
        </Link>

        {/* Section 3: step table */}
        <h2 id="step-table" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          The full workflow at a glance
        </h2>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          For teams and agencies that need to document their compliance process, this table summarizes the complete workflow from AI generation to published, labeled image.
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md overflow-hidden">
            <thead>
              <tr className="bg-[#FAFAFA] dark:bg-[#1A1A1A]">
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-[#525252] dark:text-[#A3A3A3] border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
                  Step
                </th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-[#525252] dark:text-[#A3A3A3] border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
                  Action
                </th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-[#525252] dark:text-[#A3A3A3] border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
                  Tool
                </th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-[#525252] dark:text-[#A3A3A3] border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
                  Notes
                </th>
              </tr>
            </thead>
            <tbody className="text-[#737373] dark:text-[#737373]">
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">1</td>
                <td className="px-4 py-2.5 text-xs">Generate image with AI tool</td>
                <td className="px-4 py-2.5 text-xs">Midjourney, DALL-E, Firefly, Stable Diffusion, etc.</td>
                <td className="px-4 py-2.5 text-xs">Save originals to a dedicated folder before labeling.</td>
              </tr>
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#1A1A1A]/50">
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">2</td>
                <td className="px-4 py-2.5 text-xs">Open AI Label tool</td>
                <td className="px-4 py-2.5 text-xs">sammapix.com/tools/ai-label</td>
                <td className="px-4 py-2.5 text-xs">No signup. Works in Chrome, Firefox, Safari, Edge.</td>
              </tr>
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">3</td>
                <td className="px-4 py-2.5 text-xs">Drop images</td>
                <td className="px-4 py-2.5 text-xs">AI Label drop zone</td>
                <td className="px-4 py-2.5 text-xs">Single or batch. JPEG, PNG, WebP, AVIF supported. No upload.</td>
              </tr>
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#1A1A1A]/50">
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">4</td>
                <td className="px-4 py-2.5 text-xs">Choose label text</td>
                <td className="px-4 py-2.5 text-xs">Preset or custom</td>
                <td className="px-4 py-2.5 text-xs">"Made with AI", "AI-generated", "AI-assisted", or custom.</td>
              </tr>
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">5</td>
                <td className="px-4 py-2.5 text-xs">Set position, style, size</td>
                <td className="px-4 py-2.5 text-xs">AI Label controls</td>
                <td className="px-4 py-2.5 text-xs">5 positions, 3 styles (solid/subtle/outline), size slider. Live preview.</td>
              </tr>
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#1A1A1A]/50">
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">6</td>
                <td className="px-4 py-2.5 text-xs">Download or batch export</td>
                <td className="px-4 py-2.5 text-xs">AI Label download button</td>
                <td className="px-4 py-2.5 text-xs">Single free. Batch ZIP requires free account or Day Pass.</td>
              </tr>
              <tr className="last:border-b-0">
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">7</td>
                <td className="px-4 py-2.5 text-xs">Publish labeled images</td>
                <td className="px-4 py-2.5 text-xs">Your CMS, social scheduler, or ad platform</td>
                <td className="px-4 py-2.5 text-xs">Always publish the downloaded labeled version, not the original.</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Section 4: best practices */}
        <h2 id="best-practices" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          Best practices for AI image disclosure
        </h2>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Getting a label onto your image is the minimum. Doing it thoughtfully produces better outcomes for both compliance and audience trust. These are the practices worth building into your workflow from the start.
        </p>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-8 mb-3">
          Place the label where it is readable without dominating the image
        </h3>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Bottom right is the standard convention because it mirrors where copyright notices and watermarks traditionally sit. Audiences have learned to look there. On images where the bottom right corner contains important subject matter, shift to bottom left or top right. Avoid center placement for disclosure labels: it interrupts the composition and suggests the creator is unsure whether to show or hide the label.
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Size matters more than people expect. A label that is too small becomes illegible at thumbnail scale, which defeats the purpose of disclosure. A size where the text reads clearly at roughly 10 to 15 percent of the image height is a practical starting point. Adjust from there based on how the image will be displayed.
        </p>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-8 mb-3">
          Match the style to the context
        </h3>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          The EU AI Act explicitly distinguishes artistic and creative works from commercial communications and news content. For an art print, a concept illustration, or a creative campaign image, a subtle or outline style label is appropriate and keeps the aesthetic integrity of the work intact. For a press release image, an e-commerce product shot, or a political advertisement, a solid, clearly readable label is the right choice.
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          The core question to ask: would a person seeing this image at normal viewing size and distance notice the label? If the answer is no, the label is not doing its job. Increase the size or switch to a higher-contrast style.
        </p>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-8 mb-3">
          Batch your entire campaign before publishing
        </h3>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Retroactively labeling images already published is harder than labeling them before the first post. Build the labeling step into your publishing checklist, right before the final review. For agencies, this means the asset handoff from the AI generation stage always includes a "label" substep before the file goes to the client or scheduler.
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          With the SammaPix AI Label tool, batching costs no extra time beyond the initial drop. Drop the whole campaign folder, configure once, download one ZIP. The per-image overhead after the first setup is essentially zero.
        </p>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-8 mb-3">
          Keep the originals separately
        </h3>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          The tool writes only the downloaded copies. Your source files remain unchanged on your device. Maintaining a clean folder of originals lets you re-run the labeling step with different settings if a platform has different display requirements (for example, square crops for Instagram versus landscape for LinkedIn) without going back to the AI generator.
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          A simple naming convention makes this sustainable: originals in a folder called <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1.5 py-0.5 rounded">raw</code>, labeled outputs in a folder called <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1.5 py-0.5 rounded">labeled</code>, published versions in a folder called <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1.5 py-0.5 rounded">live</code>. Three folders, zero confusion.
        </p>

        {/* Section 5: alternatives */}
        <h2 id="alternatives" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          Alternatives and why browser-based wins on privacy
        </h2>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Several other approaches exist for adding a visible AI label to images. Each has real limitations that matter in a professional context.
        </p>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-8 mb-3">
          Desktop software (Photoshop, GIMP, Affinity Photo)
        </h3>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Desktop editors give you total control over typography and placement. The limitation is time: opening each file, adding a text layer, flattening, exporting, and closing takes 2 to 3 minutes per image even for an experienced user. A 30-image campaign becomes an hour of repetitive work. There is no batch equivalent of what the SammaPix AI Label tool does in one drop.
        </p>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-8 mb-3">
          Upload-based online watermark tools
        </h3>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Tools that process images on a remote server introduce a meaningful privacy problem. Your AI-generated campaign images often contain commercially sensitive creative direction, unreleased product visuals, or proprietary brand assets. Uploading those files to a third-party server means they leave your control. Server logs, storage retention policies, and breach exposure all become concerns. For client work, sending files to an unknown server may also violate your NDA or data processing agreement.
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Browser-based processing sidesteps this entirely. When the Canvas API draws the label onto your image, the operation happens in isolated browser memory. The file bytes travel from your local storage to RAM and back to local storage. No network request carries image data. This is not a claim about trust or intent: it is a structural property of client-side processing that holds regardless of what any server-side service's privacy policy says.
        </p>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-8 mb-3">
          Platform-native labels (Adobe, Meta Content Credentials)
        </h3>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Some AI platforms now embed Content Credentials or C2PA metadata directly into generated images. This satisfies the machine-readable requirement that Article 50 places on providers of AI systems. It does not replace the human-readable visible label requirement for deployers who publish the content. Machine-readable metadata is invisible to the viewer and is often stripped by platforms during upload or resave. A visible label remains necessary alongside any embedded metadata.
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          The practical conclusion: use a browser-based tool like{" "}
          <Link href="/tools/ai-label" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">
            SammaPix AI Label
          </Link>{" "}
          for the visible human-readable disclosure. Rely on C2PA metadata from the generation platform (where available) for the machine-readable layer. Both together give you the most complete coverage of the Article 50 requirements.
        </p>

        {/* Related links */}
        <div className="mt-8 mb-4">
          <p className="text-xs font-medium uppercase tracking-wider text-[#A3A3A3] mb-3">Related guides and tools</p>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/blog/eu-ai-act-label-ai-content"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md text-[#525252] hover:border-[#A3A3A3] hover:text-[#171717] dark:text-[#E5E5E5] bg-white dark:bg-[#1E1E1E] transition-colors"
            >
              EU AI Act Label Guide
            </Link>
            <Link
              href="/tools/ai-label"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md text-[#525252] hover:border-[#A3A3A3] hover:text-[#171717] dark:text-[#E5E5E5] bg-white dark:bg-[#1E1E1E] transition-colors"
            >
              AI Label Tool
            </Link>
            <Link
              href="/tools/watermark"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md text-[#525252] hover:border-[#A3A3A3] hover:text-[#171717] dark:text-[#E5E5E5] bg-white dark:bg-[#1E1E1E] transition-colors"
            >
              Watermark Images
            </Link>
            <Link
              href="/tools/compress"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md text-[#525252] hover:border-[#A3A3A3] hover:text-[#171717] dark:text-[#E5E5E5] bg-white dark:bg-[#1E1E1E] transition-colors"
            >
              Compress Images
            </Link>
            <Link
              href="/blog/batch-watermark-photos-free"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md text-[#525252] hover:border-[#A3A3A3] hover:text-[#171717] dark:text-[#E5E5E5] bg-white dark:bg-[#1E1E1E] transition-colors"
            >
              How to Batch Watermark Photos
            </Link>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-10 pt-8 border-t border-gray-100 dark:border-[#2A2A2A]">
          <h2 id="faq" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mb-6">
            FAQ
          </h2>
          <div className="space-y-6">
            {[
              {
                q: "Is the AI Label tool free?",
                a: "Yes. Adding a Made with AI label to a single image is completely free on SammaPix, with no signup required. Batch export (multiple images downloaded as a ZIP in one click) requires a free account or a Day Pass. The Day Pass gives you unlimited batch exports for 24 hours.",
              },
              {
                q: "Are my images uploaded to a server when I use this tool?",
                a: "No. The SammaPix AI Label tool runs entirely in your browser using the Canvas API. Your image files are read from local storage into browser memory, the label is composited onto the canvas, and the result is written back to your device as a downloaded file. No bytes leave your machine at any point. This makes the tool safe for confidential campaign assets, client deliverables, and personal images.",
              },
              {
                q: "Does adding a visible label satisfy the EU AI Act Article 50 requirement?",
                a: "A visible human-readable disclosure is the element that Article 50 requires deployers to add when they publish AI-generated images to an audience. The regulation also requires providers of AI models to embed a machine-readable marking at generation time, which is a separate obligation addressed at the platform level. Adding a visible label with a tool like SammaPix covers the deployer-side visible disclosure obligation. For a full legal analysis of who must comply and what counts as sufficient, read the EU AI Act label guide at sammapix.com/blog/eu-ai-act-label-ai-content. This article provides general informational guidance only and is not legal advice.",
              },
              {
                q: "Can I label a whole batch of AI images at once?",
                a: "Yes. Drop multiple images onto the tool in a single operation. The same label settings apply to every image in the batch. Use the batch download button to export all labeled images as a ZIP archive in one click. You do not need to configure and download each image individually.",
              },
              {
                q: "Which image formats does the AI Label tool support?",
                a: "Input formats include JPEG, PNG, WebP, and AVIF. Output is saved as a high-quality JPEG or PNG depending on the original format. If you need to convert a format before labeling (for example, HEIC from an iPhone), use the SammaPix Convert tool first, then run the converted files through the AI Label tool.",
              },
              {
                q: "Does adding the label reduce image quality?",
                a: "The label is composited using the browser Canvas API at the full resolution of the source image. Quality loss is negligible and equivalent to a standard resave at high quality settings. For very large source images above roughly 20 megapixels, the browser may apply a minor downscale during Canvas rendering, which is standard behavior for all browser-based image tools and not specific to SammaPix.",
              },
            ].map(({ q, a }) => (
              <div key={q}>
                <h3 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1.5">{q}</h3>
                <p className="text-sm text-[#737373] leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </BlogArticleLayout>

      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}

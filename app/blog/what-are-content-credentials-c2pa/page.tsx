import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { APP_URL } from "@/lib/constants";
import BlogArticleLayout from "@/components/blog/BlogArticleLayout";

// ── Metadata ──────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "What Are Content Credentials (C2PA)? 2026 Guide",
  description:
    "Content Credentials (C2PA) are tamper-evident provenance records built into media files. Learn how they differ from EXIF and SynthID, how to view them, and why they matter in 2026.",
  alternates: {
    canonical: `${APP_URL}/blog/what-are-content-credentials-c2pa`,
  },
  keywords: [
    "content credentials",
    "c2pa",
    "what is c2pa",
    "content credentials explained",
    "ai image provenance",
    "check content credentials",
    "c2pa standard 2026",
    "ai image watermark",
  ],
  openGraph: {
    title: "What Are Content Credentials (C2PA)? 2026 Guide",
    description:
      "C2PA Content Credentials attach a tamper-evident provenance record to photos and videos. 6,000+ coalition members, native Google Search support coming. Here is what they actually are and how to check them.",
    url: `${APP_URL}/blog/what-are-content-credentials-c2pa`,
    type: "article",
    publishedTime: "2026-08-09",
    authors: ["https://lucasammarco.com"],
  },
  twitter: {
    card: "summary_large_image",
    title: "What Are Content Credentials (C2PA)? 2026 Guide",
    description:
      "Content Credentials explained: the open standard that records who made an image, whether AI was used, and the edit history. How to view them today.",
    creator: "@lucasammarco",
  },
};

// ── Schema constants ──────────────────────────────────────────────────────────

const POST_DATE = "2026-08-09";
const POST_DATE_FORMATTED = "August 9, 2026";
const POST_URL = `${APP_URL}/blog/what-are-content-credentials-c2pa`;
const POST_TITLE = "What Are Content Credentials (C2PA)? 2026 Guide";

// ── Article schema ────────────────────────────────────────────────────────────

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: POST_TITLE,
  description:
    "Content Credentials are a tamper-evident provenance record attached to media files, built on the open C2PA standard (Coalition for Content Provenance and Authenticity). They record who made an image, whether AI was involved, which tools were used, and the edit history. This guide explains the C2PA standard, how it differs from plain EXIF metadata and invisible watermarks like SynthID, the 2026 momentum with 6,000+ coalition members, how to view Content Credentials today, and practical implications for creators, marketers, and journalists.",
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
    "content credentials",
    "c2pa",
    "what is c2pa",
    "content credentials explained",
    "ai image provenance",
    "check content credentials",
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
  name: "How to Check Content Credentials on an Image",
  description:
    "Verify whether an image carries C2PA Content Credentials using the official verify tool at contentcredentials.org/verify. No account or software needed.",
  totalTime: "PT2M",
  tool: [
    {
      "@type": "HowToTool",
      name: "Content Credentials Verify (contentcredentials.org/verify, free, browser-based)",
    },
  ],
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Go to contentcredentials.org/verify",
      text: "Open contentcredentials.org/verify in any modern browser. The tool is maintained by the Content Authenticity Initiative (CAI) and is free to use with no account required.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Upload or paste the image URL",
      text: "Drag the image file onto the dropzone, click to browse your device, or paste a direct image URL. The tool accepts JPEG, PNG, WebP, and other common formats.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Read the provenance manifest",
      text: "If the image carries a C2PA manifest, the tool displays the issuer (the organisation or person who signed the credentials), the creation date, whether AI was involved in making or editing the image, the tools used, and any edit history recorded. If no credentials are found, the image either has none or they were stripped during processing.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Look for the Cr icon in supported apps",
      text: "In Adobe Photoshop, Lightroom, and the Content Authenticity Initiative plugin, images with valid credentials show a small 'Cr' icon. Clicking it opens the full provenance panel. Google Search and Chrome are adding native C2PA verification in 2026, which will show credentials directly in search results.",
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
      name: "What are Content Credentials?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Content Credentials are a tamper-evident provenance record attached to a media file, built on the open C2PA standard (Coalition for Content Provenance and Authenticity). They store a cryptographically signed manifest that records who created the image, what tools were used, whether AI was involved, and the edit history. Anyone can verify the credentials without a special account, using the official verify tool at contentcredentials.org/verify.",
      },
    },
    {
      "@type": "Question",
      name: "Is C2PA the same as a watermark?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. C2PA Content Credentials are a cryptographically signed metadata manifest, separate from the image pixel data. A watermark (visible or invisible) is embedded in the image pixels themselves. Google DeepMind's SynthID is an example of an invisible pixel watermark. C2PA and SynthID can coexist on the same file and serve complementary purposes. EXIF metadata is a third, simpler category: basic camera data with no cryptographic signing or tamper detection.",
      },
    },
    {
      "@type": "Question",
      name: "Can Content Credentials be removed?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Taking a screenshot of an image, re-exporting without preservation, or stripping metadata removes the C2PA manifest. This is a known limitation. The specification acknowledges it: the absence of credentials does not prove an image is manipulated, just as their presence does not guarantee the claim is true. The system is designed to make provenance verifiable when present, not to make removal impossible.",
      },
    },
    {
      "@type": "Question",
      name: "Do all AI images have Content Credentials?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No, but coverage is expanding rapidly. OpenAI applies C2PA credentials to all images generated by ChatGPT and the DALL-E API as of May 2026. Google applies SynthID watermarks (a separate but complementary system) to Imagen outputs. Adobe Firefly attaches credentials automatically. Other AI generators vary. The C2PA coalition has over 6,000 members, but implementation across all generators is still in progress as of 2026.",
      },
    },
    {
      "@type": "Question",
      name: "How do I view Content Credentials on an image?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Use the official verify tool at contentcredentials.org/verify. Upload the image or paste a URL and the tool shows the full provenance manifest. In Adobe Photoshop and Lightroom, images with credentials show a 'Cr' icon in the interface. Google Search and Chrome are adding native C2PA display in 2026. The CAI browser extension is also available for Chrome and Firefox.",
      },
    },
    {
      "@type": "Question",
      name: "Does adding a visible 'Made with AI' label help if Content Credentials are not present?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, for human-visible disclosure. The EU AI Act (Article 50) requires that AI-generated content is labeled so users can understand they are looking at AI output. A visible label using a tool like SammaPix AI Label fulfills this human-visible disclosure requirement. It is complementary to C2PA: credentials are machine-readable and verifiable, while a visible label is immediately readable by anyone without any verification step. Both are useful; ideally you use both.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between C2PA, SynthID, and EXIF?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "These are three different approaches to recording image information. C2PA Content Credentials are a cryptographically signed provenance manifest stored in the file's metadata layer, tamper-evident and verifiable against a certificate. SynthID is an invisible watermark embedded in the image pixels themselves by Google DeepMind, surviving compression and some edits even if the file metadata is stripped. EXIF metadata is basic camera data (camera model, date, GPS) stored in the file header with no cryptographic protection, easily editable or removed. C2PA is the most comprehensive and verifiable of the three.",
      },
    },
  ],
};

// ── Page component ────────────────────────────────────────────────────────────

export default function WhatAreContentCredentialsC2paPage() {
  return (
    <>
      <BlogArticleLayout
        title={POST_TITLE}
        slug="what-are-content-credentials-c2pa"
        description={`The internet is filling up with AI-generated images, and most people have no reliable way to tell what is real. Content Credentials, built on the open C2PA standard, are the industry's answer: a tamper-evident provenance record baked into the file itself, recording who made it, what tools were used, and whether AI was involved. Here is what they actually are, how they work, and what you can do with them today.`}
        date={POST_DATE}
        dateFormatted={POST_DATE_FORMATTED}
        tags={["Privacy", "Tools", "Workflow"]}
        readingTime={11}
        headings={[
          { id: "what-are-content-credentials", title: "What are Content Credentials?" },
          { id: "how-c2pa-works", title: "How C2PA works technically" },
          { id: "comparison-table", title: "C2PA vs SynthID vs EXIF: comparison table" },
          { id: "2026-momentum", title: "Who is using C2PA in 2026" },
          { id: "how-to-view", title: "How to view Content Credentials today" },
          { id: "why-it-matters", title: "Why it matters for creators, marketers, and journalists" },
          { id: "eu-ai-act-connection", title: "The EU AI Act connection" },
          { id: "practical-tools", title: "Practical tools you can use now" },
          { id: "faq", title: "FAQ" },
        ]}
        summary={[
          "Content Credentials are a cryptographically signed provenance manifest built into media files, based on the open C2PA standard (Coalition for Content Provenance and Authenticity).",
          "They record who made the file, what tools were used, whether AI was involved, and the edit history. The credentials can be verified by anyone without a special account.",
          "C2PA is different from SynthID (an invisible pixel watermark from Google DeepMind) and from plain EXIF metadata (basic camera data with no cryptographic protection).",
          "OpenAI applies C2PA to all ChatGPT and API images since May 2026. TikTok has labeled over 1.3 billion AI videos using C2PA. Google is bringing native C2PA verification to Search and Chrome.",
          "You can verify credentials today at contentcredentials.org/verify. A SammaPix Content Credentials checker is coming.",
          "A visible 'Made with AI' label (as required by EU AI Act Article 50) complements C2PA for human-readable disclosure.",
        ]}
        heroImage={
          <figure>
            <img
              src="https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80"
              alt="AI-generated image concept representing content credentials and media provenance in 2026"
              className="w-full rounded-lg"
              loading="eager"
            />
            <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
              As AI-generated images become indistinguishable from photographs, Content Credentials provide a verifiable provenance record for every file. Photo by Google DeepMind on Unsplash.
            </figcaption>
          </figure>
        }
        ctaBlock={
          <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2">
              Add a visible AI disclosure label to your images and videos
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-4">
              While Content Credentials are machine-readable, the EU AI Act also requires human-visible disclosure. Use the SammaPix AI Label tools to add a clear &quot;Made with AI&quot; label to your images and videos. Free, no upload, runs in your browser.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/tools/ai-label"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
              >
                AI Label for Images
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
              <Link
                href="/tools/ai-label-video"
                className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#1A1A1A] text-gray-700 dark:text-[#A3A3A3] text-sm font-medium rounded-md border border-gray-200 dark:border-[#333] hover:bg-gray-50 dark:hover:bg-[#222] transition-colors"
              >
                AI Label for Videos
              </Link>
              <Link
                href="/tools/exif"
                className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#1A1A1A] text-gray-700 dark:text-[#A3A3A3] text-sm font-medium rounded-md border border-gray-200 dark:border-[#333] hover:bg-gray-50 dark:hover:bg-[#222] transition-colors"
              >
                EXIF Viewer
              </Link>
            </div>
          </div>
        }
      >
        {/* Quick Answer */}
        <div className="mb-8 p-4 bg-gray-50 dark:bg-[#1E1E1E] border-l-4 border-[#6366F1] rounded-r-md">
          <p className="text-xs font-semibold text-[#6366F1] mb-1.5 uppercase tracking-wide">
            Quick Answer
          </p>
          <p className="text-sm text-gray-700 dark:text-[#A3A3A3] leading-relaxed">
            Content Credentials are a cryptographically signed provenance record embedded in a media file, based on the open{" "}
            <a href="https://c2pa.org" target="_blank" rel="noopener noreferrer" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2">
              C2PA standard
            </a>
            . They record who created the file, what tools were used, and whether AI was involved. You can verify them today at{" "}
            <a href="https://contentcredentials.org/verify" target="_blank" rel="noopener noreferrer" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2">
              contentcredentials.org/verify
            </a>
            . They are different from EXIF metadata (no cryptographic signing) and SynthID (an invisible pixel watermark). A SammaPix Content Credentials checker is coming.
          </p>
        </div>

        {/* Section: What are Content Credentials */}
        <h2 id="what-are-content-credentials" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          What are Content Credentials?
        </h2>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Content Credentials are a tamper-evident provenance record attached to a media file. Think of them as a verifiable birth certificate for an image or video: they record the file&apos;s origin, the tools involved in creating or editing it, and whether any AI was used in the process. Anyone can read and verify these credentials without installing special software or creating an account.
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          They are built on the{" "}
          <a href="https://c2pa.org" target="_blank" rel="noopener noreferrer" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">
            C2PA standard
          </a>{" "}
          (Coalition for Content Provenance and Authenticity), an open technical specification developed by a coalition that includes Adobe, Microsoft, Google, Meta, OpenAI, Sony, BBC, and Amazon, among 6,000+ members. The C2PA specification is maintained as an open standard, which means any organisation can implement it without paying licensing fees.
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          The official brand name for consumer-facing implementations is &quot;Content Credentials,&quot; maintained by the{" "}
          <a href="https://contentauthenticity.org" target="_blank" rel="noopener noreferrer" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">
            Content Authenticity Initiative (CAI)
          </a>
          , which was founded by Adobe. The technical standard underneath is C2PA. Both terms refer to the same underlying system.
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Concretely, a C2PA manifest contains:
        </p>
        <ul className="space-y-2 mb-6 pl-4">
          {[
            "The issuer: the organisation or individual who signed the credentials (for example, Adobe, OpenAI, or a specific camera manufacturer).",
            "The creation date and timestamp.",
            "The tools used: for example, Adobe Photoshop 2026, ChatGPT, or a Sony camera model.",
            "AI involvement: whether any generative AI model was used to create or edit the content, and if so, which model.",
            "The edit history: a log of actions taken on the file, such as crop, resize, or AI-generated fill.",
            "A cryptographic hash: a fingerprint of the file at the time the credentials were signed, which makes tampering detectable.",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-[#737373] leading-relaxed">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#6366F1] shrink-0" />
              {item}
            </li>
          ))}
        </ul>

        {/* Section: How C2PA works */}
        <h2 id="how-c2pa-works" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          How C2PA works technically
        </h2>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          When a C2PA-enabled application (for example, Adobe Photoshop or a Sony camera with C2PA support) exports a file, it creates a manifest: a structured data record containing all the provenance information listed above. The manifest is then cryptographically signed using a certificate issued by the C2PA trust infrastructure. The signing step is what makes the credentials &quot;tamper-evident.&quot;
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          The manifest is embedded in the file&apos;s metadata layer alongside (but separate from) the pixel data. For JPEG files, it goes into a specific EXIF/XMP slot. For other formats like PNG, MP4, or WebP, the manifest uses format-specific container slots.
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          When someone checks the credentials using a verification tool, the tool does two things:
        </p>
        <ul className="space-y-2 mb-6 pl-4">
          {[
            "It checks the cryptographic signature against the C2PA trust list to verify that the issuer is a legitimate, recognized organisation.",
            "It recomputes the file&apos;s hash and compares it to the hash stored in the manifest. If the pixel data was altered after signing (for example, by editing in an application that does not preserve credentials), the hash will not match, indicating tampering.",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-[#737373] leading-relaxed">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-gray-300 dark:bg-[#525252] shrink-0" />
              <span dangerouslySetInnerHTML={{ __html: item }} />
            </li>
          ))}
        </ul>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          An important nuance: credentials can be &quot;hard binding&quot; (any pixel change breaks the hash, showing the edit) or &quot;soft binding&quot; (allowing certain transformations like JPEG re-compression while flagging them). Most implementations in 2026 use soft binding to accommodate normal distribution workflows.
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          A critical point to understand: if the credentials are stripped from the file (for example, by taking a screenshot or re-exporting without preservation), the absence of credentials does not prove the image is manipulated. It simply means there is no verifiable provenance. This is an acknowledged limitation of the system.
        </p>

        {/* Section: Comparison Table */}
        <h2 id="comparison-table" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          C2PA vs SynthID vs EXIF: comparison table
        </h2>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Three different technologies are often confused when people discuss image provenance and AI disclosure. Here is a clear comparison of what each one actually does.
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md overflow-hidden">
            <thead>
              <tr className="bg-[#FAFAFA] dark:bg-[#1A1A1A]">
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-[#525252] dark:text-[#A3A3A3] border-b border-[#E5E5E5] dark:border-[#2A2A2A]">Property</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-[#525252] dark:text-[#A3A3A3] border-b border-[#E5E5E5] dark:border-[#2A2A2A]">C2PA Content Credentials</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-[#525252] dark:text-[#A3A3A3] border-b border-[#E5E5E5] dark:border-[#2A2A2A]">SynthID</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-[#525252] dark:text-[#A3A3A3] border-b border-[#E5E5E5] dark:border-[#2A2A2A]">EXIF Metadata</th>
              </tr>
            </thead>
            <tbody className="text-[#737373] dark:text-[#737373]">
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">Where it lives</td>
                <td className="px-4 py-2.5 text-xs">File metadata layer (separate from pixels)</td>
                <td className="px-4 py-2.5 text-xs">Embedded in image pixels</td>
                <td className="px-4 py-2.5 text-xs">File header (EXIF/XMP tags)</td>
              </tr>
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#1A1A1A]/50">
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">Cryptographically signed?</td>
                <td className="px-4 py-2.5 text-xs font-medium text-green-600 dark:text-green-400">Yes</td>
                <td className="px-4 py-2.5 text-xs">No (AI-detectable pattern)</td>
                <td className="px-4 py-2.5 text-xs font-medium text-red-600 dark:text-red-400">No</td>
              </tr>
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">Records AI involvement?</td>
                <td className="px-4 py-2.5 text-xs font-medium text-green-600 dark:text-green-400">Yes (explicit field in manifest)</td>
                <td className="px-4 py-2.5 text-xs">Yes (it IS the AI signal)</td>
                <td className="px-4 py-2.5 text-xs">Only if software writes it manually</td>
              </tr>
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#1A1A1A]/50">
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">Survives re-export?</td>
                <td className="px-4 py-2.5 text-xs">Partially (depends on exporting tool)</td>
                <td className="px-4 py-2.5 text-xs font-medium text-green-600 dark:text-green-400">Yes (survives compression, some edits)</td>
                <td className="px-4 py-2.5 text-xs">Depends on tool (often stripped)</td>
              </tr>
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">Visible to humans?</td>
                <td className="px-4 py-2.5 text-xs">No (needs a viewer like contentcredentials.org)</td>
                <td className="px-4 py-2.5 text-xs">No (imperceptible watermark)</td>
                <td className="px-4 py-2.5 text-xs">No (needs EXIF reader)</td>
              </tr>
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#1A1A1A]/50">
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">Open standard?</td>
                <td className="px-4 py-2.5 text-xs font-medium text-green-600 dark:text-green-400">Yes (C2PA specification, free to implement)</td>
                <td className="px-4 py-2.5 text-xs">Partially (Google opened the spec in 2024)</td>
                <td className="px-4 py-2.5 text-xs font-medium text-green-600 dark:text-green-400">Yes (EXIF/XMP standards)</td>
              </tr>
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">Tamper-evident?</td>
                <td className="px-4 py-2.5 text-xs font-medium text-green-600 dark:text-green-400">Yes (hash comparison detects pixel edits)</td>
                <td className="px-4 py-2.5 text-xs">Partially (degrades under heavy edits)</td>
                <td className="px-4 py-2.5 text-xs font-medium text-red-600 dark:text-red-400">No (trivially editable)</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">Who issues it?</td>
                <td className="px-4 py-2.5 text-xs">Any C2PA member (Adobe, OpenAI, Sony, etc.)</td>
                <td className="px-4 py-2.5 text-xs">Google DeepMind only</td>
                <td className="px-4 py-2.5 text-xs">Any application (camera, editor)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          The practical takeaway: C2PA is the most comprehensive and verifiable of the three, but it requires the issuing application to implement it. SynthID survives more aggressive transformations but is specific to Google AI outputs. EXIF is universal but carries no cryptographic guarantees. They are complementary rather than competing technologies.
        </p>

        {/* Section: 2026 momentum */}
        <h2 id="2026-momentum" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          Who is using C2PA in 2026
        </h2>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          2026 is the year C2PA moved from a coalition project to a genuine infrastructure layer for the web. Here is what has actually shipped:
        </p>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-8 mb-3">OpenAI: all ChatGPT and API images</h3>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Since May 2026, OpenAI applies C2PA Content Credentials to every image generated by ChatGPT (including the free tier) and through the DALL-E API. The credentials record that the image was AI-generated by OpenAI and include a timestamp. OpenAI also applies Google DeepMind&apos;s SynthID invisible watermark simultaneously, so generated images carry both provenance signals.
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          This is a meaningful development because ChatGPT is the largest consumer AI image generator by user count. A significant share of all AI images produced daily now carry verifiable C2PA credentials.
        </p>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-8 mb-3">TikTok: 1.3 billion AI videos labeled</h3>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          TikTok has used C2PA to label over 1.3 billion AI-generated or AI-edited videos on the platform. This makes TikTok the largest single deployment of C2PA by volume as of mid-2026. The labels appear as a visible indicator in the TikTok interface and are backed by C2PA credentials in the underlying file.
        </p>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-8 mb-3">Google Search and Chrome: native verification coming</h3>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          At Google I/O 2026, Google announced that C2PA verification and SynthID detection are coming natively to Google Search and the Chrome browser. This means users will eventually be able to see an image&apos;s provenance record directly in search results and while browsing, without needing any third-party tool. The rollout timeline was not specified, but the announcement confirmed that Google is treating C2PA as infrastructure rather than an optional feature.
        </p>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-8 mb-3">Adobe, Sony, Leica, and Nikon: the camera and editing layer</h3>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Adobe embeds Content Credentials in all exports from Photoshop, Lightroom, and Firefly (Adobe&apos;s generative AI). Sony, Leica, and Nikon have shipped cameras that sign every RAW file at capture with C2PA credentials, providing a chain of custody from the physical moment of capture through any editing workflow. This is particularly relevant for photojournalism, where authenticity from the moment of capture is critical.
        </p>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-8 mb-3">The 6,000 member coalition</h3>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          The C2PA coalition, which manages the standard, has grown to over 6,000 members across media, technology, camera manufacturers, and news organisations. Members include BBC, Reuters, the Associated Press, Microsoft, Amazon, Meta, and many others. The breadth of the coalition is significant: it means C2PA is not a proprietary system controlled by any single company, and it has genuine industry-wide adoption across sectors that previously had no common provenance standard.
        </p>

        {/* Inline CTA */}
        <Link href="/tools/ai-label" className="flex items-center justify-between gap-4 bg-[#171717] text-white rounded-md px-6 py-5 hover:bg-[#262626] transition-colors group mt-2 mb-8">
          <div>
            <p className="text-xs font-medium text-[#A3A3A3] uppercase tracking-wide mb-1">Free tool, no upload, no signup</p>
            <p className="text-sm font-semibold text-white leading-snug">Add a visible &quot;Made with AI&quot; label to your images now</p>
          </div>
          <ArrowRight className="h-4 w-4 text-[#737373] group-hover:text-white group-hover:translate-x-0.5 transition-all shrink-0" strokeWidth={1.5} />
        </Link>

        {/* Section: How to view */}
        <h2 id="how-to-view" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          How to view Content Credentials today
        </h2>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          You do not need to install any software to check whether an image has Content Credentials. The primary verification method is the official tool maintained by the Content Authenticity Initiative.
        </p>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-8 mb-3">Method 1: contentcredentials.org/verify</h3>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Go to{" "}
          <a href="https://contentcredentials.org/verify" target="_blank" rel="noopener noreferrer" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">
            contentcredentials.org/verify
          </a>
          . Upload an image file or paste a direct image URL. The tool reads the C2PA manifest and displays the full provenance record: the issuer, creation date, AI involvement, tools used, and edit history. If no credentials are found, the image either has none or they were stripped during export or social media processing.
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          This tool works in any modern browser on desktop and mobile. No account is required. The image is not stored by the tool.
        </p>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-8 mb-3">Method 2: The Cr icon in Adobe applications</h3>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          In Adobe Photoshop, Lightroom, and Bridge, images with valid Content Credentials display a small &quot;Cr&quot; icon in the interface. Clicking the icon opens the full credentials panel showing the complete provenance record. This is the most seamless workflow for professional photographers and photo editors who already work in the Adobe ecosystem.
        </p>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-8 mb-3">Method 3: CAI browser extension</h3>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          The Content Authenticity Initiative provides a browser extension for Chrome and Firefox that shows the credentials icon on images while you browse the web. When you hover over or click an image, the extension checks for a C2PA manifest and displays the provenance information inline. This is the closest thing to a real-time verification experience currently available.
        </p>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-8 mb-3">Coming soon: Google Search and Chrome native</h3>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          As announced at Google I/O 2026, native C2PA verification is coming to Google Search and Chrome. When this ships, you will be able to see provenance information directly in search results without any extension or third-party tool. This will be the most significant expansion of C2PA accessibility to date, given that Google Search handles billions of image impressions per day.
        </p>

        <div className="mt-6 mb-8 p-4 bg-[#FAFAFA] dark:bg-[#1E1E1E] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md">
          <p className="text-xs font-semibold text-[#525252] dark:text-[#A3A3A3] mb-1.5 uppercase tracking-wide">
            Coming to SammaPix
          </p>
          <p className="text-sm text-[#737373] leading-relaxed">
            A Content Credentials checker is coming to SammaPix, allowing you to verify the C2PA provenance of any image directly in the browser alongside our existing EXIF viewer. Until then, use the official{" "}
            <a href="https://contentcredentials.org/verify" target="_blank" rel="noopener noreferrer" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2">
              contentcredentials.org/verify
            </a>{" "}
            tool, and use{" "}
            <Link href="/tools/exif" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2">
              SammaPix EXIF Viewer
            </Link>{" "}
            to inspect and strip basic metadata.
          </p>
        </div>

        {/* Section: Why it matters */}
        <h2 id="why-it-matters" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          Why it matters for creators, marketers, and journalists
        </h2>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Content Credentials are not just a technical curiosity. They have real, practical implications for anyone who creates, distributes, or publishes visual media.
        </p>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-8 mb-3">For photographers and creators: protecting your work</h3>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          If you shoot with a Leica, Sony Alpha, or recent Nikon camera model that supports C2PA, every image you capture is signed at the sensor level. This creates an unbroken chain of custody from the moment of capture. If someone later claims your photograph is AI-generated, you have a cryptographic record proving it was taken by a physical camera at a specific time and location.
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          For photographers who also use AI editing tools, Adobe Photoshop&apos;s credentials system records which edits were made by AI (such as Generative Fill) and which were manual. This gives clients and editors a transparent record of the post-processing workflow.
        </p>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-8 mb-3">For marketers: building trust in AI-generated campaigns</h3>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          As brands increasingly use AI-generated images in advertising and social media, transparency about AI involvement is becoming both a legal requirement (in the EU) and a brand trust consideration. Attaching Content Credentials to AI-generated campaign assets provides a verifiable record of disclosure, which is more robust than simply adding a caption or label.
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          A visible &quot;Made with AI&quot; label combined with C2PA credentials gives you both human-readable and machine-readable disclosure. This two-layer approach is the most complete implementation of AI transparency currently available.
        </p>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-8 mb-3">For journalists and news organisations</h3>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          BBC, Reuters, and the Associated Press are all C2PA coalition members. The news industry&apos;s interest in C2PA is straightforward: verifying that a photograph has not been manipulated is a core editorial concern, and C2PA provides a technical mechanism for doing this at scale. When a camera-captured image carries credentials from a trusted issuer (a specific photojournalist, a news organisation), editors can verify the image&apos;s authenticity before publication.
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          This does not eliminate the need for editorial judgment, but it adds a verifiable technical layer to the existing editorial workflow.
        </p>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-8 mb-3">For everyday users: a new layer of media literacy</h3>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          As Content Credentials become more widespread (particularly with Google Search&apos;s upcoming native support), checking an image&apos;s provenance will become as routine as checking a website&apos;s HTTPS certificate. When you see an image on the web, you will be able to verify in a few clicks whether it is a photograph taken by a specific person on a specific day, an AI-generated image from a known generator, or an image with no verifiable provenance at all.
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          The third category, no verifiable provenance, will become the most important signal. The absence of credentials is not proof of manipulation, but it is a prompt for additional scrutiny.
        </p>

        {/* Section: EU AI Act */}
        <h2 id="eu-ai-act-connection" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          The EU AI Act connection
        </h2>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          The EU AI Act&apos;s Article 50 requires that AI-generated content be labeled in a way that makes clear to people they are seeing AI output. This requirement applies to any provider deploying AI systems that generate text, images, audio, or video for users in the EU. The deadline for compliance on transparency obligations was August 2026.
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          C2PA Content Credentials are not specifically mentioned in the EU AI Act text, but they are directly relevant to fulfilling it. The Act requires that the labeling be &quot;machine-readable&quot; as well as human-readable. C2PA provides the machine-readable layer; a visible label provides the human-readable layer. Using both together is the most complete approach to compliance.
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          For a detailed breakdown of what Article 50 requires and how to implement visible AI disclosure labels, see our guide:{" "}
          <Link href="/blog/eu-ai-act-label-ai-content" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">
            EU AI Act: How to Label AI-Generated Content
          </Link>
          . For the practical tool to add visible labels to your images and videos,{" "}
          <Link href="/tools/ai-label" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">
            see SammaPix AI Label
          </Link>
          .
        </p>

        {/* Section: Practical tools */}
        <h2 id="practical-tools" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          Practical tools you can use now
        </h2>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          While a full C2PA signing workflow requires integration with a C2PA-enabled application (such as Adobe Photoshop or an API implementation), there are several things you can do today without any special software.
        </p>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-8 mb-3">Verify credentials on any image</h3>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Use{" "}
          <a href="https://contentcredentials.org/verify" target="_blank" rel="noopener noreferrer" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">
            contentcredentials.org/verify
          </a>{" "}
          to check whether an image carries C2PA credentials. This works on any image you have saved locally or can access via URL.
        </p>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-8 mb-3">Add a visible AI disclosure label (human-readable)</h3>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          The{" "}
          <Link href="/tools/ai-label" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">
            SammaPix AI Label tool
          </Link>{" "}
          lets you add a visible &quot;Made with AI&quot; or custom disclosure label to any image. This runs entirely in your browser, with no upload. It is the human-readable disclosure layer that complements C2PA&apos;s machine-readable credentials. For videos, the{" "}
          <Link href="/tools/ai-label-video" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">
            AI Label for Videos tool
          </Link>{" "}
          does the same for MP4 and WebM files.
        </p>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-8 mb-3">Inspect and manage basic EXIF metadata</h3>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          The{" "}
          <Link href="/tools/exif" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">
            SammaPix EXIF Viewer
          </Link>{" "}
          shows all the basic metadata in your image files (camera model, GPS, timestamps, software) and lets you strip it with one click. This is a different layer from C2PA credentials, but it is directly relevant to understanding what information is embedded in your files. Free, no upload, browser-based.
        </p>

        {/* Related pages */}
        <div className="mt-8 mb-4">
          <p className="text-xs font-medium uppercase tracking-wider text-[#A3A3A3] mb-3">Related guides and tools</p>
          <div className="flex flex-wrap gap-2">
            <Link href="/blog/eu-ai-act-label-ai-content" className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md text-[#525252] hover:border-[#A3A3A3] hover:text-[#171717] dark:text-[#E5E5E5] bg-white dark:bg-[#1E1E1E] transition-colors">
              EU AI Act: Label AI Content
            </Link>
            <Link href="/blog/how-to-add-made-with-ai-label" className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md text-[#525252] hover:border-[#A3A3A3] hover:text-[#171717] dark:text-[#E5E5E5] bg-white dark:bg-[#1E1E1E] transition-colors">
              How to Add a Made with AI Label
            </Link>
            <Link href="/blog/check-remove-exif-data-photos" className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md text-[#525252] hover:border-[#A3A3A3] hover:text-[#171717] dark:text-[#E5E5E5] bg-white dark:bg-[#1E1E1E] transition-colors">
              Check and Remove EXIF Data
            </Link>
            <Link href="/blog/remove-gps-from-photos" className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md text-[#525252] hover:border-[#A3A3A3] hover:text-[#171717] dark:text-[#E5E5E5] bg-white dark:bg-[#1E1E1E] transition-colors">
              Remove GPS from Photos
            </Link>
            <Link href="/tools/ai-label" className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md text-[#525252] hover:border-[#A3A3A3] hover:text-[#171717] dark:text-[#E5E5E5] bg-white dark:bg-[#1E1E1E] transition-colors">
              AI Label Tool
            </Link>
          </div>
        </div>

        {/* External resources box */}
        <div className="mt-10 p-5 rounded-md border border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#1A1A1A]">
          <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-2">
            Official C2PA resources
          </h3>
          <p className="text-sm text-[#737373] mb-4">
            The following resources are maintained by the organisations that develop and govern the C2PA standard.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <a href="https://c2pa.org" target="_blank" rel="noopener noreferrer" className="text-sm text-[#171717] dark:text-[#E5E5E5] underline underline-offset-2 hover:text-[#6366F1]">
              c2pa.org: the open C2PA specification
            </a>
            <a href="https://contentcredentials.org/verify" target="_blank" rel="noopener noreferrer" className="text-sm text-[#171717] dark:text-[#E5E5E5] underline underline-offset-2 hover:text-[#6366F1]">
              contentcredentials.org/verify: check any image
            </a>
            <a href="https://contentauthenticity.org" target="_blank" rel="noopener noreferrer" className="text-sm text-[#171717] dark:text-[#E5E5E5] underline underline-offset-2 hover:text-[#6366F1]">
              contentauthenticity.org: the CAI (Content Authenticity Initiative)
            </a>
            <Link href="/blog/eu-ai-act-label-ai-content" className="text-sm text-[#171717] dark:text-[#E5E5E5] underline underline-offset-2 hover:text-[#6366F1]">
              EU AI Act Article 50: labeling requirements guide
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
                q: "What are Content Credentials?",
                a: "Content Credentials are a cryptographically signed provenance record embedded in a media file, built on the open C2PA standard (Coalition for Content Provenance and Authenticity). They store a manifest that records who created the file, what tools were used, whether AI was involved, and the edit history. The credentials can be verified by anyone using the official tool at contentcredentials.org/verify.",
              },
              {
                q: "Is C2PA the same as a watermark?",
                a: "No. C2PA Content Credentials are a cryptographically signed metadata manifest stored in the file's metadata layer, separate from the image pixels. A watermark (visible or invisible) is embedded in the image pixels themselves. Google DeepMind's SynthID is an example of an invisible pixel watermark. C2PA and SynthID can coexist on the same file and serve complementary purposes. EXIF metadata is a third, simpler category: basic camera data with no cryptographic signing or tamper detection.",
              },
              {
                q: "Can Content Credentials be removed?",
                a: "Yes. Taking a screenshot, re-exporting without preservation, or stripping metadata removes the C2PA manifest. The C2PA specification acknowledges this: the absence of credentials does not prove an image is manipulated, just as their presence does not guarantee the claim is accurate. The system is designed to make provenance verifiable when present, not to make removal impossible.",
              },
              {
                q: "Do all AI images have Content Credentials?",
                a: "No, but coverage is expanding. OpenAI has applied C2PA credentials to all ChatGPT and DALL-E API images since May 2026. Adobe Firefly attaches credentials automatically. TikTok has labeled over 1.3 billion AI videos using C2PA. Other generators vary. The C2PA coalition has over 6,000 members, but implementation across all AI image generators is still in progress as of 2026.",
              },
              {
                q: "How do I view Content Credentials on an image?",
                a: "Use the official verify tool at contentcredentials.org/verify. Upload the image or paste a URL and the tool shows the full provenance manifest. In Adobe Photoshop and Lightroom, images with credentials show a 'Cr' icon. Google Search and Chrome are adding native C2PA display in 2026. The CAI browser extension is also available for Chrome and Firefox.",
              },
              {
                q: "Does adding a visible 'Made with AI' label help if Content Credentials are not present?",
                a: "Yes, for human-visible disclosure. The EU AI Act (Article 50) requires that AI-generated content be labeled so users understand they are looking at AI output. A visible label using a tool like SammaPix AI Label fulfills this human-visible disclosure requirement. It is complementary to C2PA: credentials are machine-readable and verifiable, while a visible label is immediately readable by anyone without a verification step. Both are useful; the most complete approach is to use both.",
              },
              {
                q: "What is the difference between C2PA, SynthID, and EXIF?",
                a: "These are three different approaches to recording image information. C2PA Content Credentials are a cryptographically signed provenance manifest stored in the file's metadata layer, tamper-evident and verifiable against a certificate. SynthID is an invisible watermark embedded in the image pixels by Google DeepMind, surviving compression and some edits even if file metadata is stripped. EXIF metadata is basic camera data (camera model, date, GPS) stored in the file header with no cryptographic protection, easily editable or removed. C2PA is the most comprehensive and verifiable of the three.",
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </>
  );
}

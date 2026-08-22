import type { Metadata } from "next";
import { APP_URL } from "@/lib/constants";
import JsonFormatterClient from "@/components/tools/JsonFormatterClient";
import JsonFormatterHeroDemo from "@/components/tools/JsonFormatterHeroDemo";
import RelatedTools from "@/components/tools/RelatedTools";
import MetaViewContent from "@/components/tracking/MetaViewContent";
import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

const TOOL_URL = `${APP_URL}/tools/json-formatter`;

// ── Metadata ──────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "JSON Formatter & Validator. Free, No Upload",
  description:
    "Format, beautify, minify and validate JSON instantly in your browser. Shows exact error line and column. 100% client-side — your data is never uploaded.",
  keywords: [
    "json formatter",
    "json formatter online",
    "json validator",
    "json beautifier",
    "json minifier",
    "format json online",
    "validate json",
    "json pretty print",
    "json formatter no upload",
    "free json formatter",
    "json parser online",
    "json lint",
  ],
  alternates: {
    canonical: TOOL_URL,
  },
  openGraph: {
    title: "JSON Formatter & Validator. Free, No Upload",
    description:
      "Paste or drop a .json file. Beautify, minify and validate instantly — error line/column shown. 100% in your browser, nothing uploaded.",
    url: TOOL_URL,
    type: "website",
    siteName: "SammaPix",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "SammaPix — free browser tools, no upload" }],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "JSON Formatter & Validator. Free, No Upload",
    description:
      "Format, beautify, minify and validate JSON in your browser. Error line/column shown. Nothing is ever uploaded.",
  },
};

// ── JSON-LD Schemas ───────────────────────────────────────────────────────────

const softwareAppSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "JSON Formatter & Validator",
  description:
    "Format (beautify), minify and validate JSON entirely in your browser. Shows the exact error line and column for invalid JSON. Supports 2-space, 4-space and tab indentation. 100% client-side — nothing is ever sent to a server.",
  url: TOOL_URL,
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Web Browser",
  browserRequirements: "Requires JavaScript",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
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
    "Beautify / pretty-print JSON with 2-space, 4-space or tab indentation",
    "Minify JSON to a single line",
    "Validate JSON and show exact error line and column number",
    "Drag-and-drop .json file support",
    "One-click copy of formatted output",
    "Live formatting — output updates as you type",
    "100% client-side — no data is ever uploaded to a server",
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is my JSON data uploaded to a server?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. The entire formatting and validation process happens in your browser using native JavaScript (JSON.parse and JSON.stringify). Nothing is ever sent to any server. Your JSON data never leaves your device.",
      },
    },
    {
      "@type": "Question",
      name: "Is this tool free to use?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, completely free. No account required, no rate limit, no watermark. The JSON Formatter and Validator is a client-side developer tool — just open it and start using it.",
      },
    },
    {
      "@type": "Question",
      name: "What does the error line and column number mean?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "When your JSON is invalid, the tool shows the exact position where the parser encountered an unexpected character. The line number tells you which row contains the error, and the column number tells you the character position on that row. This makes it fast to jump to the exact location in your editor.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between Beautify and Minify?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Beautify (also called pretty-print or format) adds indentation and line breaks to make the JSON human-readable. Minify removes all whitespace and newlines to produce the smallest possible single-line string — useful for reducing payload size in APIs or config files.",
      },
    },
    {
      "@type": "Question",
      name: "Can I load a .json file instead of pasting?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Click 'Load .json file' to open a file picker, or drag and drop a .json file directly onto the input area. The file is read locally — it is not uploaded anywhere.",
      },
    },
    {
      "@type": "Question",
      name: "Which indent options are available?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can choose 2 spaces (default), 4 spaces, or a tab character. The output updates immediately when you switch. All three are passed directly to JSON.stringify's third argument for standards-compliant indentation.",
      },
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: APP_URL },
    { "@type": "ListItem", position: 2, name: "Tools", item: `${APP_URL}/tools` },
    { "@type": "ListItem", position: 3, name: "JSON Formatter", item: TOOL_URL },
  ],
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to format and validate JSON online for free",
  description:
    "Beautify, minify or validate any JSON string in your browser — no upload, no account needed.",
  totalTime: "PT30S",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Paste or load your JSON",
      text: "Paste your JSON into the input area, or drag and drop a .json file onto it. You can also click 'Load .json file' to open a file picker. The file never leaves your browser.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Choose Beautify or Minify",
      text: "Select Beautify to pretty-print with your preferred indent (2 spaces, 4 spaces or tab), or select Minify to collapse it to a single line. The output updates live as you type.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Copy the result",
      text: "If the JSON is valid you will see a green 'Valid JSON' badge with the output byte size. Click the Copy button to copy the formatted result to your clipboard in one click.",
    },
  ],
};

// ── Icon — matches ToolCard.tsx accent #6366F1 ────────────────────────────────

function IconJsonFormatter() {
  const accent = "#6366F1";
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <style>{`
        @keyframes jf-p-brace  { 0%, 100% { opacity: 0.55; } 50% { opacity: 1; } }
        @keyframes jf-p-line   { 0%, 100% { transform: scaleX(0.4); opacity: 0.25; } 50% { transform: scaleX(1); opacity: 1; } }
        @keyframes jf-p-indent { 0%, 100% { transform: translateX(-5px); opacity: 0; } 35%, 65% { transform: translateX(0); opacity: 1; } }
        .jf-p-b  { animation: jf-p-brace  2.4s ease-in-out infinite; }
        .jf-p-l1 { transform-origin: 16px 17px; animation: jf-p-line   2.4s ease-in-out 0.10s infinite; }
        .jf-p-l2 { transform-origin: 16px 23px; animation: jf-p-line   2.4s ease-in-out 0.28s infinite; }
        .jf-p-l3 { transform-origin: 16px 29px; animation: jf-p-line   2.4s ease-in-out 0.46s infinite; }
        .jf-p-i1 { transform-origin: 38px 20px; animation: jf-p-indent 2.4s ease-in-out 0.18s infinite; }
        .jf-p-i2 { transform-origin: 38px 26px; animation: jf-p-indent 2.4s ease-in-out 0.38s infinite; }
        .jf-p-i3 { transform-origin: 36px 32px; animation: jf-p-indent 2.4s ease-in-out 0.55s infinite; }
      `}</style>
      <text className="jf-p-b" x="3" y="32" fontSize="22" fill={accent} fontWeight="700" fontFamily="monospace">{`{`}</text>
      <rect className="jf-p-l1" x="14" y="15" width="11" height="2.5" rx="1.25" fill={accent} fillOpacity="0.65"/>
      <rect className="jf-p-l2" x="14" y="21" width="7"  height="2.5" rx="1.25" fill={accent} fillOpacity="0.45"/>
      <rect className="jf-p-l3" x="14" y="27" width="9"  height="2.5" rx="1.25" fill={accent} fillOpacity="0.6"/>
      <path d="M26 24 L30 24 M28.5 22 L30 24 L28.5 26" stroke={accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.65"/>
      <rect className="jf-p-i1" x="34" y="17" width="11" height="2.5" rx="1.25" fill={accent} fillOpacity="0.85"/>
      <rect className="jf-p-i2" x="32" y="24" width="13" height="2.5" rx="1.25" fill={accent} fillOpacity="0.65"/>
      <rect className="jf-p-i3" x="34" y="31" width="9"  height="2.5" rx="1.25" fill={accent} fillOpacity="0.85"/>
      <text className="jf-p-b" x="44" y="38" fontSize="10" fill={accent} fontWeight="700" fontFamily="monospace">{`}`}</text>
    </svg>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function JsonFormatterPage() {
  return (
    <main>
      <MetaViewContent contentName="JSON Formatter" contentId="json-formatter" />

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />

      {/* ============================================================ */}
      {/*  HERO — Split layout: text left, animated demo right          */}
      {/* ============================================================ */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8 pb-2">
        {/* Back link */}
        <Link
          href="/tools"
          className="inline-flex items-center gap-1.5 text-xs text-[#A3A3A3] dark:text-[#737373] hover:text-[#171717] dark:hover:text-[#E5E5E5] transition-colors mb-3"
        >
          <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.5} />
          All tools
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-6 lg:gap-10 items-center">
          {/* ── LEFT: Icon + H1 + copy + trust badges ── */}
          <div>
            <div className="flex items-start gap-3 mb-3">
              <div
                className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center mt-0.5"
                style={{
                  backgroundColor: "#6366F115",
                  border: "1px solid #6366F130",
                }}
                aria-hidden="true"
              >
                {/* Compact icon variant for the 36px container */}
                <svg width="18" height="18" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <text x="3" y="32" fontSize="22" fill="#6366F1" fontWeight="700" fontFamily="monospace">{`{`}</text>
                  <rect x="14" y="15" width="11" height="2.5" rx="1.25" fill="#6366F1" fillOpacity="0.65"/>
                  <rect x="14" y="21" width="7"  height="2.5" rx="1.25" fill="#6366F1" fillOpacity="0.45"/>
                  <rect x="14" y="27" width="9"  height="2.5" rx="1.25" fill="#6366F1" fillOpacity="0.6"/>
                  <path d="M26 24 L30 24 M28.5 22 L30 24 L28.5 26" stroke="#6366F1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.65"/>
                  <rect x="34" y="17" width="11" height="2.5" rx="1.25" fill="#6366F1" fillOpacity="0.85"/>
                  <rect x="32" y="24" width="13" height="2.5" rx="1.25" fill="#6366F1" fillOpacity="0.65"/>
                  <rect x="34" y="31" width="9"  height="2.5" rx="1.25" fill="#6366F1" fillOpacity="0.85"/>
                  <text x="44" y="38" fontSize="10" fill="#6366F1" fontWeight="700" fontFamily="monospace">{`}`}</text>
                </svg>
              </div>
              <h1 className="text-2xl sm:text-3xl font-semibold text-[#171717] dark:text-[#E5E5E5] tracking-tight leading-tight">
                JSON Formatter. Free, No Upload
              </h1>
            </div>

            <p className="text-[15px] text-[#737373] dark:text-[#A3A3A3] leading-relaxed mb-4">
              Beautify, minify and validate JSON instantly in your browser. Shows the exact error line and column when your JSON is invalid. Uses native{" "}
              <code className="text-[13px] font-mono bg-[#F5F5F5] dark:bg-[#2A2A2A] px-1 py-0.5 rounded">JSON.parse</code>{" "}
              No third-party library, no network request, no upload.
            </p>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-[#525252] dark:text-[#A3A3A3]">
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2} />
                100% in your browser
              </span>
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2} />
                Nothing uploaded
              </span>
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2} />
                Free forever
              </span>
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2} />
                No signup
              </span>
            </div>
          </div>

          {/* ── RIGHT: Animated code editor demo ── */}
          <div className="max-w-[460px] w-full mx-auto lg:mx-0 lg:ml-auto">
            <JsonFormatterHeroDemo />
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  TOOL — JsonFormatterClient (sits below hero)                 */}
      {/* ============================================================ */}
      <div className="pt-3">
        <JsonFormatterClient />
      </div>

      {/* ── Related tools ── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-8">
        <RelatedTools toolId="json-formatter" />
      </div>

      {/* ============================================================ */}
      {/*  SEO content                                                  */}
      {/* ============================================================ */}
      <div className="bg-[#FAFAFA] dark:bg-[#111] border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 space-y-10">

          {/* About */}
          <section>
            <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
              Format JSON without uploading it anywhere
            </h2>
            <p className="text-sm text-[#525252] dark:text-[#A3A3A3] leading-relaxed mb-3">
              This tool uses the browser&apos;s built-in{" "}
              <code className="text-xs font-mono bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded">JSON.parse()</code>
              {" "}and{" "}
              <code className="text-xs font-mono bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded">JSON.stringify()</code>
              {" "}APIs. No third-party library, no network request. Your JSON string is processed entirely on your machine, which also makes it fast: even large JSON files (hundreds of kilobytes) format in milliseconds.
            </p>
            <p className="text-sm text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
              When your JSON is invalid,{" "}
              <code className="text-xs font-mono bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded">JSON.parse()</code>
              {" "}throws a{" "}
              <code className="text-xs font-mono bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded">SyntaxError</code>
              {" "}with a position offset in the message. The tool parses that offset to calculate the exact line and column number, so you can jump straight to the mistake in your editor.
            </p>
          </section>

          {/* Use cases */}
          <section>
            <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
              Common use cases
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { title: "Debug API responses", desc: "Paste a raw API response from Postman or curl and instantly see its structure with clean indentation, without copying to an IDE." },
                { title: "Validate config files", desc: "Drop a package.json, tsconfig.json or any other config file onto the input to confirm it is valid before committing." },
                { title: "Minify for production", desc: "Collapse pretty-printed JSON to a single line to reduce payload size when embedding it in a script tag or shipping in a response body." },
                { title: "Inspect log output", desc: "Structured logs often arrive as minified JSON objects. Beautify them to read the nested keys without squinting at a single line." },
              ].map(({ title, desc }) => (
                <div key={title} className="px-4 py-4 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg bg-white dark:bg-[#1E1E1E]">
                  <p className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1.5">{title}</p>
                  <p className="text-xs text-[#737373] dark:text-[#A3A3A3] leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Related developer tools */}
          <section>
            <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
              Related developer tools
            </h2>
            <div className="grid sm:grid-cols-3 gap-3">
              {[
                { href: "/tools/hash-generator", label: "Hash Generator", desc: "Generate MD5, SHA-256, SHA-512 from text or a file" },
                { href: "/tools/url-encode-decode", label: "URL Encoder / Decoder", desc: "Percent-encode or decode URL strings instantly" },
                { href: "/tools/image-to-base64", label: "Image to Base64", desc: "Encode any image as a Base64 Data URI" },
              ].map((t) => (
                <Link
                  key={t.href}
                  href={t.href}
                  className="px-3 py-3 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg bg-white dark:bg-[#1E1E1E] hover:border-[#6366F1]/60 transition-colors"
                >
                  <p className="text-xs font-semibold text-[#171717] dark:text-[#E5E5E5] mb-0.5">{t.label}</p>
                  <p className="text-[11px] text-[#737373]">{t.desc}</p>
                </Link>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section>
            <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mb-4">
              Frequently asked questions
            </h2>
            <div className="divide-y divide-[#E5E5E5] dark:divide-[#2A2A2A]">
              {faqSchema.mainEntity.map((q) => (
                <details key={q.name} className="group py-4">
                  <summary className="cursor-pointer list-none flex items-start justify-between gap-4 text-sm font-medium text-[#171717] dark:text-[#E5E5E5] hover:text-[#6366F1] transition-colors [&::-webkit-details-marker]:hidden">
                    {q.name}
                    <span className="flex-shrink-0 text-[#A3A3A3] group-open:rotate-45 transition-transform text-lg leading-none">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-sm text-[#737373] dark:text-[#A3A3A3] leading-relaxed pr-8">
                    {q.acceptedAnswer.text}
                  </p>
                </details>
              ))}
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}

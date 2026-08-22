import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { APP_URL } from "@/lib/constants";
import BlogArticleLayout from "@/components/blog/BlogArticleLayout";

// ── Metadata ──────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "How to Format and Validate JSON Online Free (No Upload) [2026]",
  description:
    "Format, prettify, and validate any JSON string instantly in your browser. No upload, no server, no account. Covers trailing commas, unquoted keys, single quotes, and why not to paste production data into random sites.",
  alternates: {
    canonical: `${APP_URL}/blog/how-to-format-json-online-free`,
  },
  keywords: [
    "format json online",
    "json formatter online free",
    "json prettify online",
    "validate json online",
    "json beautify online",
    "json lint online",
    "format json no upload",
    "json formatter browser",
    "online json formatter",
    "json validator free",
    "pretty print json",
    "json format checker",
  ],
  openGraph: {
    title: "How to Format and Validate JSON Online Free (No Upload) [2026]",
    description:
      "Format, prettify, and validate JSON instantly in your browser. No upload, no server, no account. Covers the most common JSON syntax errors and privacy risks of pasting data into random sites.",
    url: `${APP_URL}/blog/how-to-format-json-online-free`,
    type: "article",
    publishedTime: "2026-08-22",
    authors: ["https://lucasammarco.com"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Format and Validate JSON Online Free (No Upload) [2026]",
    description:
      "Format, prettify, and validate JSON in your browser. No upload, no server. Covers trailing commas, unquoted keys, single quotes. Free.",
    creator: "@lucasammarco",
  },
};

// ── Schema constants ──────────────────────────────────────────────────────────

const POST_DATE = "2026-08-22";
const POST_DATE_FORMATTED = "August 22, 2026";
const POST_URL = `${APP_URL}/blog/how-to-format-json-online-free`;
const POST_TITLE = "How to Format and Validate JSON Online Free (No Upload) [2026]";

// ── Article schema ────────────────────────────────────────────────────────────

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: POST_TITLE,
  description:
    "A practical guide to formatting and validating JSON in your browser. Covers what JSON formatting is, why it matters, the most common syntax errors (trailing commas, unquoted keys, single quotes, duplicate keys), the privacy risks of pasting production data into random online tools, and how to format JSON privately with zero upload.",
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
    "format json online",
    "json formatter online free",
    "json prettify online",
    "validate json online",
    "json beautify no upload",
    "json lint free",
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
  name: "How to Format and Validate JSON Online Without Uploading",
  description:
    "Format, prettify, and validate any JSON string in your browser using the SammaPix JSON Formatter. No file is uploaded. The formatting runs entirely in client-side JavaScript.",
  totalTime: "PT1M",
  tool: [
    {
      "@type": "HowToTool",
      name: "SammaPix JSON Formatter (browser-based, free)",
    },
  ],
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Open the JSON Formatter",
      text: "Go to sammapix.com/tools/json-formatter in any modern browser. No account, no extension, no plugin required.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Paste your JSON",
      text: "Paste your raw or minified JSON into the input panel. The tool accepts any valid JSON: objects, arrays, strings, numbers, booleans, and null.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Format or validate",
      text: "Click Format to prettify the JSON with 2-space indentation. If the JSON is invalid, the tool highlights the exact error location and error message so you can fix it.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Copy or download",
      text: "Copy the formatted JSON to your clipboard or download it as a .json file. Your data is never sent to a server.",
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
      name: "What does a JSON formatter do?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A JSON formatter takes raw or minified JSON text and re-prints it with consistent indentation (typically 2 or 4 spaces) so it is easier to read. It also validates the JSON: if there is a syntax error (trailing comma, missing quote, single quote instead of double, etc.) the formatter reports the exact line and character position of the error. Formatted JSON is functionally identical to minified JSON but far easier to inspect, debug, and review.",
      },
    },
    {
      "@type": "Question",
      name: "Is it safe to paste JSON into an online formatter?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It depends on the tool. Many online JSON formatters process data on their server, meaning your JSON is transmitted to a third-party computer you do not control. For production API responses, database exports, authentication tokens, or any data containing personal information, this is a privacy risk. The SammaPix JSON Formatter runs entirely in your browser using JavaScript: JSON.parse and JSON.stringify execute locally. Your data is never sent to a server. You can verify this by opening browser DevTools and watching the Network tab while you format: there are no outgoing requests.",
      },
    },
    {
      "@type": "Question",
      name: "What is the most common JSON syntax error?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The most common JSON error is a trailing comma: a comma after the last item in an object or array. In JavaScript, trailing commas are allowed and often encouraged by linters. In JSON, they are a syntax error. Example: {\"name\": \"Alice\", \"age\": 30,} is invalid JSON because of the comma after 30. Other frequent errors include: using single quotes instead of double quotes for strings or keys, leaving keys unquoted (valid JavaScript but invalid JSON), and writing undefined or NaN (valid JavaScript values that do not exist in JSON).",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between formatting and minifying JSON?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Formatting (also called prettifying or beautifying) adds whitespace: newlines, indentation, and spaces after colons and commas. The result is human-readable but larger in file size. Minifying removes all non-essential whitespace, reducing file size. The two representations are semantically identical: JSON.parse produces the same JavaScript object from both. For APIs and web performance, minified JSON is preferred. For debugging, code review, and documentation, formatted JSON is preferred. The SammaPix JSON Formatter supports both.",
      },
    },
    {
      "@type": "Question",
      name: "Does JSON support comments?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. The JSON specification (RFC 8259) does not support comments. This is a deliberate design decision by Douglas Crockford, who created JSON. Attempting to add // or /* */ comments to JSON will cause a parse error in any strict JSON parser. If you need comments in a JSON-like configuration format, consider JSONC (JSON with Comments, used by VS Code) or JSON5. Both are supersets of JSON that add comment support, but they require parsers that understand the extended format. Standard JSON.parse will reject them.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between JSON and JavaScript objects?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "JSON is a text format, not code. A JSON string is always wrapped in double quotes for string values, always uses double quotes for keys, never has trailing commas, and only supports these value types: string, number, object, array, true, false, and null. JavaScript object literals are more permissive: keys can be unquoted, single quotes are valid, trailing commas are allowed, and values can include undefined, NaN, Infinity, functions, and Symbol. When you call JSON.stringify on a JavaScript object, it converts it to valid JSON and discards unsupported values like undefined and functions.",
      },
    },
  ],
};

// ── Page ──────────────────────────────────────────────────────────────────────

export default function HowToFormatJsonOnlineFreePage() {
  return (
    <>
      <BlogArticleLayout
        title={POST_TITLE}
        slug="how-to-format-json-online-free"
        description="Raw JSON is notoriously hard to read when it arrives minified from an API or log file. This guide explains what JSON formatting and validation actually do, the most common JSON syntax errors and how to fix them, why you should not paste production data into random online tools, and how to format JSON privately in your browser with zero upload."
        date={POST_DATE}
        dateFormatted={POST_DATE_FORMATTED}
        tags={["Tools", "Workflow"]}
        readingTime={9}
        headings={[
          { id: "what-is-json-formatting", title: "What is JSON formatting and why it matters" },
          { id: "json-vs-js-objects", title: "JSON vs JavaScript objects: key differences" },
          { id: "common-json-errors", title: "Common JSON syntax errors and how to fix them" },
          { id: "privacy-no-upload", title: "Why you should not paste production JSON into random sites" },
          { id: "how-to-format", title: "How to format JSON in your browser, step by step" },
          { id: "minify-vs-format", title: "Formatting vs minifying: when to use each" },
          { id: "json-in-devtools", title: "Formatting JSON in browser DevTools" },
          { id: "json-in-editors", title: "Formatting JSON in VS Code and editors" },
          { id: "related-tools", title: "Related tools" },
          { id: "faq", title: "FAQ" },
        ]}
        summary={[
          "JSON formatting (prettifying) adds indentation and whitespace to make raw JSON human-readable. A formatter also validates the JSON and reports syntax errors with the exact location.",
          "The most common JSON errors are trailing commas after the last element, single quotes instead of double quotes, and unquoted keys. All are valid in JavaScript but invalid in JSON.",
          "Never paste production API responses, authentication tokens, or personal data into online tools that process on their server. Use a browser-based formatter instead.",
          "The SammaPix JSON Formatter runs entirely in your browser via JSON.parse and JSON.stringify. No data is sent to any server. Verifiable via DevTools Network tab.",
          "JSON does not support comments. If you need comments in a config file, use JSONC or JSON5, which are supersets supported by VS Code and specific parsers.",
          "Minified JSON is preferred for APIs and web performance. Formatted JSON is for debugging, code review, and documentation. Both parse to identical JavaScript objects.",
        ]}
        heroImage={
          <figure>
            <img
              src="https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="Developer working at a computer with code on screen, representing JSON formatting and validation workflow."
              className="w-full max-h-[460px] object-cover rounded-lg"
              loading="eager"
            />
            <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
              Formatting JSON transforms a single unreadable line into a structured, indented document you can actually inspect and debug.
            </figcaption>
          </figure>
        }
        ctaBlock={
          <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2">
              Format and validate JSON instantly, no upload required
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-4">
              Paste any JSON string. Prettify with 2-space indentation. Syntax errors reported with exact line and position. Runs entirely in your browser. Free.
            </p>
            <div className="flex flex-wrap gap-3 items-center">
              <Link
                href="/tools/json-formatter"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
              >
                Open JSON Formatter, Free
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
              <Link
                href="/blog/common-json-errors-and-how-to-fix-them"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
              >
                JSON errors reference guide <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
              <Link
                href="/tools/url-encode-decode"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
              >
                URL encode / decode <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
            </div>
          </div>
        }
      >

        {/* ── Section 1: What is JSON formatting ───────────────────────────────── */}

        <h2 id="what-is-json-formatting" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          What is JSON formatting and why it matters
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          JSON (JavaScript Object Notation) is a text-based data interchange format. It looks like this in its raw, minified form as received from an API:
        </p>

        <pre className="bg-gray-100 dark:bg-[#1E1E1E] text-xs font-mono p-4 rounded-md overflow-x-auto mb-4 text-gray-800 dark:text-[#D4D4D4] leading-relaxed">
{`{"user":{"id":1,"name":"Alice","email":"alice@example.com","roles":["admin","editor"],"active":true}}`}
        </pre>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          That single line is valid JSON, but it is nearly impossible to inspect at a glance. After formatting with 2-space indentation, the same data looks like this:
        </p>

        <pre className="bg-gray-100 dark:bg-[#1E1E1E] text-xs font-mono p-4 rounded-md overflow-x-auto mb-4 text-gray-800 dark:text-[#D4D4D4] leading-relaxed">
{`{
  "user": {
    "id": 1,
    "name": "Alice",
    "email": "alice@example.com",
    "roles": [
      "admin",
      "editor"
    ],
    "active": true
  }
}`}
        </pre>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Both representations are semantically identical. <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">JSON.parse()</code> produces the same JavaScript object from either. The difference is purely presentational: the formatted version makes structure, nesting depth, key names, and value types immediately visible without any mental parsing.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          A JSON formatter does two things simultaneously. It prettifies: it re-emits the JSON with consistent indentation, newlines, and spacing. It also validates: before it can format the JSON, it must parse it. If the JSON contains any syntax error, the formatter cannot parse it and instead reports where the error is. This dual function makes a formatter the first tool to reach for when debugging API responses, configuration files, webhook payloads, or any JSON data source.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Common scenarios where formatting saves significant time: reading paginated API responses while building an integration, debugging a webhook payload that triggers a 400 error, reviewing a configuration file before committing it, comparing two JSON responses to find what changed, and inspecting localStorage or IndexedDB values in a browser application.
        </p>

        {/* ── Section 2: JSON vs JavaScript objects ─────────────────────────────── */}

        <h2 id="json-vs-js-objects" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          JSON vs JavaScript objects: key differences
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The single biggest source of JSON confusion is that JSON looks like a JavaScript object literal, but the two formats have different rules. Understanding this difference prevents the most common syntax errors.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          <strong className="text-gray-800 dark:text-[#E5E5E5]">Keys must be double-quoted strings.</strong> In a JavaScript object, keys can be unquoted identifiers or single-quoted strings: <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">{`{name: "Alice"}`}</code> and <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">{`{'name': 'Alice'}`}</code> are both valid JavaScript. In JSON, keys must always be double-quoted: <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">{`{"name": "Alice"}`}</code>. Any other form is a syntax error.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          <strong className="text-gray-800 dark:text-[#E5E5E5]">String values must use double quotes.</strong> Single quotes around string values are valid JavaScript but invalid JSON. <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">{`{"name": 'Alice'}`}</code> will cause a JSON parse error. Always use double quotes for both keys and string values.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          <strong className="text-gray-800 dark:text-[#E5E5E5]">No trailing commas.</strong> <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">{`{"name": "Alice", "age": 30,}`}</code> is invalid JSON because of the comma after <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">30</code>. Modern JavaScript (ES5+) and most linters allow trailing commas in object and array literals. The JSON specification does not.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          <strong className="text-gray-800 dark:text-[#E5E5E5]">No comments.</strong> JSON has no comment syntax. <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">// comment</code> and <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">/* comment */</code> are syntax errors in JSON. If you need comments in a configuration format, look at JSONC (used by VS Code settings) or JSON5.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          <strong className="text-gray-800 dark:text-[#E5E5E5]">No undefined, NaN, Infinity, or functions.</strong> JSON supports only six value types: string, number, object, array, boolean (<code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">true</code> / <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">false</code>), and <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">null</code>. JavaScript values like <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">undefined</code>, <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">NaN</code>, <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">Infinity</code>, and function references are not representable in JSON. When you call <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">JSON.stringify</code> on an object with undefined properties, those properties are silently dropped from the output.
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Feature</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">JavaScript object</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">JSON</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Key quotes</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-green-700 dark:text-green-400">Optional (unquoted, single, or double)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-red-600 dark:text-red-400">Always double-quoted, required</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">String values</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-green-700 dark:text-green-400">Single or double quotes</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-red-600 dark:text-red-400">Double quotes only</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Trailing commas</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-green-700 dark:text-green-400">Allowed in ES5+</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-red-600 dark:text-red-400">Syntax error</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Comments</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-green-700 dark:text-green-400">// and /* */ both supported</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-red-600 dark:text-red-400">Not supported</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">undefined</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-green-700 dark:text-green-400">Valid value</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-red-600 dark:text-red-400">Not a valid JSON value</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">NaN / Infinity</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-green-700 dark:text-green-400">Valid numeric values</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-red-600 dark:text-red-400">Not supported, produce null via JSON.stringify</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Functions</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-green-700 dark:text-green-400">Valid as values</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-red-600 dark:text-red-400">Dropped silently by JSON.stringify</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Duplicate keys</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-green-700 dark:text-green-400">Last value wins silently</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-red-600 dark:text-red-400">Technically invalid; behavior undefined (most parsers use last value)</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ── Tool CTA #1 ────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">Format and validate JSON instantly, no upload</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            Paste any JSON. Prettify with 2-space indentation. Syntax errors shown with exact location. Runs entirely in your browser. No server, no account.
          </p>
          <Link
            href="/tools/json-formatter"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
          >
            Open JSON Formatter, Free <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
          </Link>
        </div>

        {/* ── Section 3: Common JSON errors ─────────────────────────────────── */}

        <h2 id="common-json-errors" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Common JSON syntax errors and how to fix them
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          These are the errors that appear most frequently when formatting or parsing JSON. See the companion article for a complete reference with error messages.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">1. Trailing comma</h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-2">
          The most common JSON error. A comma after the last item in an object or array.
        </p>

        <pre className="bg-gray-100 dark:bg-[#1E1E1E] text-xs font-mono p-4 rounded-md overflow-x-auto mb-2 text-gray-800 dark:text-[#D4D4D4] leading-relaxed">
{`// Invalid JSON
{
  "name": "Alice",
  "age": 30,   // trailing comma here
}

// Valid JSON
{
  "name": "Alice",
  "age": 30
}`}
        </pre>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-4">
          Fix: remove the comma after the last property or array element. The error message from <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">JSON.parse</code> is typically <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">Unexpected token {`}`}</code>.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">2. Single quotes instead of double quotes</h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-2">
          Valid JavaScript, invalid JSON.
        </p>

        <pre className="bg-gray-100 dark:bg-[#1E1E1E] text-xs font-mono p-4 rounded-md overflow-x-auto mb-2 text-gray-800 dark:text-[#D4D4D4] leading-relaxed">
{`// Invalid JSON
{'name': 'Alice'}

// Valid JSON
{"name": "Alice"}`}
        </pre>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-4">
          Fix: replace all single quotes with double quotes for both keys and string values. The error message is typically <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">Unexpected token &apos;</code>.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">3. Unquoted keys</h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-2">
          Unquoted object keys are valid JavaScript but invalid JSON.
        </p>

        <pre className="bg-gray-100 dark:bg-[#1E1E1E] text-xs font-mono p-4 rounded-md overflow-x-auto mb-2 text-gray-800 dark:text-[#D4D4D4] leading-relaxed">
{`// Invalid JSON
{name: "Alice", age: 30}

// Valid JSON
{"name": "Alice", "age": 30}`}
        </pre>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-4">
          Fix: add double quotes around every key. The error message is typically <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">Unexpected token n</code> (or whatever the first letter of the unquoted key is).
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">4. Comments</h3>

        <pre className="bg-gray-100 dark:bg-[#1E1E1E] text-xs font-mono p-4 rounded-md overflow-x-auto mb-2 text-gray-800 dark:text-[#D4D4D4] leading-relaxed">
{`// Invalid JSON
{
  "host": "localhost", // database host
  "port": 5432
}`}
        </pre>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-4">
          Fix: remove the comment entirely. If you need comments in a config file, rename the file <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">.jsonc</code> and use a JSONC-aware parser. The error message is <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">Unexpected token /</code>.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">5. Missing comma between items</h3>

        <pre className="bg-gray-100 dark:bg-[#1E1E1E] text-xs font-mono p-4 rounded-md overflow-x-auto mb-2 text-gray-800 dark:text-[#D4D4D4] leading-relaxed">
{`// Invalid JSON
{
  "name": "Alice"
  "age": 30
}

// Valid JSON
{
  "name": "Alice",
  "age": 30
}`}
        </pre>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-4">
          Fix: add the missing comma after the previous key-value pair. The error is <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">Unexpected string</code> or <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">Unexpected token &quot;</code>.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">6. Undefined or NaN values</h3>

        <pre className="bg-gray-100 dark:bg-[#1E1E1E] text-xs font-mono p-4 rounded-md overflow-x-auto mb-2 text-gray-800 dark:text-[#D4D4D4] leading-relaxed">
{`// Invalid JSON
{"score": NaN, "result": undefined}

// Valid JSON (use null when value is absent)
{"score": null, "result": null}`}
        </pre>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-4">
          Fix: replace <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">NaN</code>, <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">undefined</code>, and <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">Infinity</code> with <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">null</code> or remove the property entirely.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          For a complete reference of all JSON.parse error messages, causes, and fixes with more examples, read the companion article:{" "}
          <Link href="/blog/common-json-errors-and-how-to-fix-them" className="text-[#6366F1] hover:underline">
            Common JSON Errors and How to Fix Them
          </Link>.
        </p>

        {/* ── Section 4: Privacy, no upload ────────────────────────────────── */}

        <h2 id="privacy-no-upload" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Why you should not paste production JSON into random sites
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Most developers format JSON constantly throughout the day: API responses, configuration payloads, webhook bodies, database query results. The reflex is to paste JSON into the first search result for &quot;JSON formatter online.&quot; This is a habit worth reconsidering.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Many popular JSON formatter sites process data server-side. Your JSON is transmitted to their server, formatted there, and returned to your browser. For most JSON this is harmless. But consider what JSON payloads typically contain in production environments:
        </p>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Authentication tokens and API keys.</strong> JWT payloads, OAuth tokens, API response bodies from internal services. These should never leave your network.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Personal data.</strong> User records, email addresses, phone numbers, addresses. Pasting this into a third-party tool may violate GDPR, CCPA, or your company&apos;s data handling policy.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Financial data.</strong> Payment responses, order records, pricing data. Even if stripped of card numbers, transaction data can reveal business-sensitive information.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Internal API structures.</strong> The shape of your internal API can be valuable competitive intelligence or help an attacker map your system.
          </li>
        </ul>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The safe alternative is a browser-based formatter that processes JSON locally. The SammaPix JSON Formatter uses <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">JSON.parse()</code> and <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">JSON.stringify()</code> in your browser tab. No HTTP request carries your data anywhere. You can verify this: open DevTools, go to the Network tab, paste and format a large JSON payload, and observe that no request is made to any external server with your data.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The same privacy principle applies to other developer utilities: URL decoders, base64 decoders, hash generators. Always prefer tools that explicitly state and demonstrably run client-side. See also:{" "}
          <Link href="/blog/hash-generator-online" className="text-[#6366F1] hover:underline">
            Hash Generator: why in-browser hashing protects your files
          </Link>.
        </p>

        {/* ── Section 5: How to format step by step ─────────────────────────── */}

        <h2 id="how-to-format" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          How to format JSON in your browser, step by step
        </h2>

        <ol className="mb-4 space-y-3">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Open the JSON Formatter.</strong> Go to{" "}
            <Link href="/tools/json-formatter" className="text-[#6366F1] hover:underline">
              sammapix.com/tools/json-formatter
            </Link>{" "}
            in any modern browser. No signup required.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Paste your JSON.</strong> Click the input area and paste your raw or minified JSON. You can paste anything from a single JSON object to a large nested API response.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Click Format.</strong> The tool parses the JSON, validates it, and outputs prettified JSON with 2-space indentation. If there is a syntax error, the error message and position are shown instead.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Fix any errors.</strong> If validation fails, correct the reported error in the input, then format again. Common fixes: remove trailing commas, replace single quotes with double quotes, add missing commas between properties.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Copy or download.</strong> Copy the formatted JSON to your clipboard or download it as a <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">.json</code> file. Your data has not left your browser.
          </li>
        </ol>

        {/* ── Section 6: Format vs minify ───────────────────────────────────── */}

        <h2 id="minify-vs-format" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Formatting vs minifying: when to use each
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Formatting and minifying are opposite operations. Both produce valid JSON that parses to the same JavaScript object. The difference is whitespace.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          <strong className="text-gray-800 dark:text-[#E5E5E5]">Use formatted JSON</strong> when you are reading, debugging, reviewing, or documenting. Formatted JSON is also the standard for JSON files committed to version control: diffs are line-by-line and reviewers can see exactly what changed. Many style guides recommend 2-space indentation for JSON files.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          <strong className="text-gray-800 dark:text-[#E5E5E5]">Use minified JSON</strong> for HTTP API responses and anywhere network payload size matters. Whitespace in JSON responses is pure overhead. A deeply nested API response formatted with 2-space indentation can be 30 to 60% larger than its minified equivalent. For high-volume APIs, minification meaningfully reduces bandwidth and parse time.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          In JavaScript: <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">JSON.stringify(obj)</code> produces minified JSON. <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">JSON.stringify(obj, null, 2)</code> produces formatted JSON with 2-space indentation. <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">JSON.stringify(obj, null, 4)</code> uses 4-space indentation. The second argument (the replacer) can also be an array of keys to include or a function to transform values.
        </p>

        {/* ── Section 7: Format in DevTools ─────────────────────────────────── */}

        <h2 id="json-in-devtools" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Formatting JSON in browser DevTools
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          If you are working on a web application and need to inspect API responses, browser DevTools already includes a JSON formatter. Here is how to use it in Chrome (the pattern is identical in Firefox and Edge):
        </p>

        <ol className="mb-4 space-y-3">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Open DevTools.</strong> Press F12 or right-click and choose Inspect.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Go to the Network tab.</strong> Make the request that returns JSON (click a button, reload the page, etc.).
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Click the request.</strong> In the right panel, click the Preview or Response tab. Chrome automatically prettifies JSON responses in the Preview tab with a collapsible tree view.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Copy and paste if needed.</strong> If you need to format a JSON string from the Console, run <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">JSON.stringify(JSON.parse(yourString), null, 2)</code> in the Console to get a formatted version.
          </li>
        </ol>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          DevTools is useful for live network inspection but cannot format a JSON string you have copied from a log file, email, or ticket. For that, a dedicated formatter like{" "}
          <Link href="/tools/json-formatter" className="text-[#6366F1] hover:underline">
            the SammaPix JSON Formatter
          </Link>{" "}
          is more practical.
        </p>

        {/* ── Section 8: Format in editors ─────────────────────────────────── */}

        <h2 id="json-in-editors" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Formatting JSON in VS Code and editors
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          VS Code has built-in JSON formatting. Open a <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">.json</code> file and press <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">Shift+Alt+F</code> (Windows/Linux) or <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">Shift+Option+F</code> (Mac) to format the document. VS Code also supports JSONC (<code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">.jsonc</code> extension), which allows <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">//</code> comments. The <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">settings.json</code> and <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">launch.json</code> files in VS Code are actually JSONC.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Prettier, the popular code formatter, handles JSON with the command <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">prettier --write *.json</code> or via its VS Code extension. If you have a project with many JSON files, Prettier is the right tool to format them consistently on save.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          For one-off formatting of JSON from an API, a log, or a clipboard: a browser-based formatter is faster than opening a file in an editor. Paste, format, copy, done. No file saved, no editor opened.
        </p>

        {/* ── Tool CTA #2 ────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">Format JSON privately, right in your browser</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            JSON.parse + JSON.stringify run locally. No server. No account. Syntax errors shown with exact position. Minify also supported.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/tools/json-formatter"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            >
              Open JSON Formatter, Free <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link
              href="/blog/common-json-errors-and-how-to-fix-them"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
            >
              All JSON error messages explained <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>
        </div>

        {/* ── Section 9: Related tools ──────────────────────────────────────── */}

        <h2 id="related-tools" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Related tools
        </h2>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">
              <Link href="/tools/json-formatter" className="text-[#6366F1] hover:underline">JSON Formatter</Link>
            </strong>: format, prettify, minify, and validate JSON entirely in your browser. No upload, no account. See also:{" "}
            <Link href="/blog/common-json-errors-and-how-to-fix-them" className="text-[#6366F1] hover:underline">Common JSON errors reference</Link>.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">
              <Link href="/tools/url-encode-decode" className="text-[#6366F1] hover:underline">URL Encode / Decode</Link>
            </strong>: encode or decode percent-encoded URLs in your browser. Useful for decoding JSON that arrives URL-encoded in API query parameters. See the full{" "}
            <Link href="/blog/url-encode-decode-online" className="text-[#6366F1] hover:underline">URL encoding guide</Link>.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">
              <Link href="/tools/hash-generator" className="text-[#6366F1] hover:underline">Hash Generator</Link>
            </strong>: generate MD5, SHA-256, SHA-512 checksums from text or files in your browser. No upload. See{" "}
            <Link href="/blog/hash-generator-online" className="text-[#6366F1] hover:underline">Hash Generator guide</Link>.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">
              <Link href="/tools/image-to-base64" className="text-[#6366F1] hover:underline">Image to Base64</Link>
            </strong>: encode images to Base64 strings for embedding in JSON payloads, HTML, or CSS. Runs entirely in your browser.
          </li>
        </ul>

        {/* ── Tool CTA #3 ────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">Browser-based tools for developers and privacy-conscious users</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            Format JSON, encode URLs, hash files — all in your browser. No upload, no server, no account.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/tools/json-formatter" className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]">
              JSON Formatter <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link href="/tools/url-encode-decode" className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]">
              URL Encode / Decode <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link href="/tools/hash-generator" className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]">
              Hash Generator <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link href="/tools/image-to-base64" className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]">
              Image to Base64 <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>
        </div>

        {/* ── FAQ ──────────────────────────────────────────────────────────── */}

        <section id="faq">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
            FAQ
          </h2>
          {faqSchema.mainEntity.map((item, i) => (
            <div key={i} className="mb-6">
              <h3 className="text-base font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">{item.name}</h3>
              <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed">{item.acceptedAnswer.text}</p>
            </div>
          ))}
        </section>

      </BlogArticleLayout>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </>
  );
}

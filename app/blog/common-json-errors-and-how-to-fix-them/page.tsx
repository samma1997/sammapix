import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { APP_URL } from "@/lib/constants";
import BlogArticleLayout from "@/components/blog/BlogArticleLayout";

// ── Metadata ──────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Common JSON Errors and How to Fix Them (2026)",
  description:
    "Reference guide to every common JSON.parse error: Unexpected token, Unexpected end of input, trailing comma, unquoted keys, single quotes, duplicate keys. Cause, fix, and example for each.",
  alternates: {
    canonical: `${APP_URL}/blog/common-json-errors-and-how-to-fix-them`,
  },
  keywords: [
    "json parse error",
    "unexpected token json",
    "unexpected end of input json",
    "json syntax error",
    "json trailing comma error",
    "json error fix",
    "invalid json",
    "json validation error",
    "json.parse error",
    "common json errors",
    "json error messages",
    "debug json error",
  ],
  openGraph: {
    title: "Common JSON Errors and How to Fix Them (2026)",
    description:
      "Every common JSON parse error explained: Unexpected token, Unexpected end of input, trailing comma, single quotes, unquoted keys. Cause, fix, and example for each. Reference guide.",
    url: `${APP_URL}/blog/common-json-errors-and-how-to-fix-them`,
    type: "article",
    publishedTime: "2026-08-22",
    authors: ["https://lucasammarco.com"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Common JSON Errors and How to Fix Them (2026)",
    description:
      "Every JSON parse error explained with cause, fix, and example. Unexpected token, trailing comma, unquoted keys, single quotes, Unexpected end of input. Free reference.",
    creator: "@lucasammarco",
  },
};

// ── Schema constants ──────────────────────────────────────────────────────────

const POST_DATE = "2026-08-22";
const POST_DATE_FORMATTED = "August 22, 2026";
const POST_URL = `${APP_URL}/blog/common-json-errors-and-how-to-fix-them`;
const POST_TITLE = "Common JSON Errors and How to Fix Them (2026)";

// ── Article schema ────────────────────────────────────────────────────────────

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: POST_TITLE,
  description:
    "A complete reference guide to every common JSON.parse error message. Covers Unexpected token, Unexpected end of input, trailing comma, unquoted keys, single quotes instead of double quotes, duplicate keys, and more. Each error includes the cause, an invalid vs valid code example, and a fix.",
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
    "json parse error",
    "unexpected token json",
    "common json errors",
    "json syntax error fix",
    "json trailing comma error",
    "json validation errors",
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

// ── FAQ schema ────────────────────────────────────────────────────────────────

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What does 'Unexpected token' mean in a JSON parse error?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The error 'Unexpected token X at position N' means the JSON parser encountered a character it did not expect at a specific location. Common causes include: a single quote instead of a double quote (Unexpected token ' at position 0), an unquoted key (Unexpected token n for a key starting with 'n'), a trailing comma before a closing brace (Unexpected token }), or a comment starting with // (Unexpected token / at position N). The position number tells you the character offset from the start of the string where the parser failed. Count from zero to find the exact character.",
      },
    },
    {
      "@type": "Question",
      name: "What causes 'Unexpected end of JSON input'?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "This error means the JSON string ended before the parser finished reading a complete value. Common causes: a missing closing brace (} or ]), a truncated string (the JSON was cut off in the middle of a value or key), or an empty string passed to JSON.parse. The fix is to check whether the full JSON was received. In API contexts, this often means the response was truncated due to a network error, a Content-Length mismatch, or a server-side error that terminated the response body early.",
      },
    },
    {
      "@type": "Question",
      name: "Can trailing commas appear in JSON arrays?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Trailing commas are not allowed in JSON arrays or objects. [1, 2, 3,] is invalid JSON. [1, 2, 3] is valid. This is a common mistake when copying array literals from JavaScript into a JSON context, because JavaScript (ES5+) permits trailing commas in both array and object literals. The JSON specification (RFC 8259) explicitly forbids them. Remove the trailing comma to fix the error.",
      },
    },
    {
      "@type": "Question",
      name: "How do I quickly find and fix a JSON error?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The fastest workflow: paste your JSON into the SammaPix JSON Formatter (sammapix.com/tools/json-formatter). It runs JSON.parse in your browser and reports the error message and character position. Jump to that position, identify the error type (trailing comma, missing quote, single quote, etc.), fix it, and format again. For large JSON strings, the position number is critical: count from zero or use a text editor that shows character offset in the status bar. VS Code shows line and column in the bottom-right corner.",
      },
    },
    {
      "@type": "Question",
      name: "Why does my JSON work in JavaScript but fail in JSON.parse?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "JavaScript object literals and JSON are not the same format. JavaScript allows unquoted keys, single-quoted strings, trailing commas, comments, and values like undefined, NaN, and Infinity. JSON allows none of these. If you wrote an object literal in JavaScript code and then tried to serialize it as JSON, the output of JSON.stringify is valid JSON, but the raw literal text is not. Always use JSON.stringify to convert JavaScript objects to JSON strings, never try to use a raw JS object literal as a JSON string.",
      },
    },
  ],
};

// ── Page ──────────────────────────────────────────────────────────────────────

export default function CommonJsonErrorsPage() {
  return (
    <>
      <BlogArticleLayout
        title={POST_TITLE}
        slug="common-json-errors-and-how-to-fix-them"
        description="This is a reference guide you can bookmark. Every common JSON.parse error message is listed with its exact cause, an invalid vs valid code example, and the fix. Use it when you hit a JSON syntax error and need to understand it fast."
        date={POST_DATE}
        dateFormatted={POST_DATE_FORMATTED}
        tags={["Tools", "Workflow"]}
        readingTime={10}
        headings={[
          { id: "why-json-errors-matter", title: "Why JSON errors matter and how to read them" },
          { id: "error-unexpected-token", title: "Unexpected token" },
          { id: "error-unexpected-end", title: "Unexpected end of JSON input" },
          { id: "error-trailing-comma", title: "Trailing comma" },
          { id: "error-single-quotes", title: "Single quotes instead of double quotes" },
          { id: "error-unquoted-keys", title: "Unquoted keys" },
          { id: "error-comments", title: "Comments in JSON" },
          { id: "error-undefined-nan", title: "undefined, NaN, and Infinity values" },
          { id: "error-missing-comma", title: "Missing comma between items" },
          { id: "error-duplicate-keys", title: "Duplicate keys" },
          { id: "error-mismatched-brackets", title: "Mismatched or missing brackets" },
          { id: "error-control-characters", title: "Unescaped control characters in strings" },
          { id: "quick-fix-workflow", title: "Quick-fix workflow" },
          { id: "related-tools", title: "Related tools" },
          { id: "faq", title: "FAQ" },
        ]}
        summary={[
          "Trailing commas are the most common JSON error. A comma after the last object property or array element is valid JavaScript but invalid JSON.",
          "Single quotes are invalid in JSON. Both keys and string values must use double quotes.",
          "Unquoted keys are invalid in JSON. Every key must be a double-quoted string.",
          "JSON has no comment syntax. // and /* */ comments cause an Unexpected token / error.",
          "undefined, NaN, and Infinity are not valid JSON values. Use null instead.",
          "Unexpected end of JSON input usually means the JSON string was truncated. Check whether the full response was received.",
        ]}
        heroImage={
          <figure>
            <img
              src="https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="Code on a terminal screen representing JSON parsing, syntax errors, and developer debugging workflow."
              className="w-full max-h-[460px] object-cover rounded-lg"
              loading="eager"
            />
            <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
              JSON.parse throws a SyntaxError with an error message and character position. This guide explains every message and its fix.
            </figcaption>
          </figure>
        }
        ctaBlock={
          <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2">
              Paste your broken JSON and see the exact error location
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-4">
              The SammaPix JSON Formatter validates your JSON in-browser, shows the error message and character position, and formats it once the syntax is correct. No upload, no account, free.
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
                href="/blog/how-to-format-json-online-free"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
              >
                JSON formatting guide <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
            </div>
          </div>
        }
      >

        {/* ── Section 1: Why JSON errors matter ──────────────────────────────── */}

        <h2 id="why-json-errors-matter" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Why JSON errors matter and how to read them
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">JSON.parse()</code> throws a <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">SyntaxError</code> when it encounters invalid JSON. The error message always contains two pieces of information: a description of what went wrong, and the position (character offset from the start of the string) where the parser failed.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          For example: <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">SyntaxError: Unexpected token &apos;,&apos;, ...&quot;age&quot;: 30,{`}`}&quot; is not valid JSON</code> (Chrome) or <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">SyntaxError: JSON.parse: unexpected character at line 3 column 14</code> (Firefox).
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The error message wording varies between browsers and JavaScript engines. Chrome, Firefox, Node.js, and Deno each have their own phrasing. The underlying cause is always the same. This guide covers the cause and fix for every common error, regardless of which browser or runtime produced the message.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The fastest way to find and fix an error: paste the JSON into the{" "}
          <Link href="/tools/json-formatter" className="text-[#6366F1] hover:underline">
            SammaPix JSON Formatter
          </Link>. It runs <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">JSON.parse</code> locally and shows the error message with the character position, letting you jump directly to the problem.
        </p>

        {/* ── Error 1: Unexpected token ──────────────────────────────────────── */}

        <h2 id="error-unexpected-token" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Unexpected token
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-2">
          <strong className="text-gray-800 dark:text-[#E5E5E5]">Error messages:</strong>
        </p>
        <ul className="mb-3">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-disc"><code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">Unexpected token &apos;X&apos;, ...&quot;...&quot; is not valid JSON</code> (Chrome)</li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-disc"><code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">JSON Parse error: Expected &apos;X&apos;</code> (Safari)</li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-disc"><code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">Unexpected token X in JSON at position N</code> (Node.js older)</li>
        </ul>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          <strong className="text-gray-800 dark:text-[#E5E5E5]">Cause:</strong> The parser encountered a character it did not expect at a specific position. The character X in the message is the unexpected character. This is a generic error that covers many specific cases (trailing comma, single quote, unquoted key, comment). The specific character tells you which sub-case you are dealing with:
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Unexpected character</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Likely cause</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-mono text-xs">&apos;</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Single quote used instead of double quote for a key or string value</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-mono text-xs">{"}"} or {"]"}</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Trailing comma before the closing bracket: <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">{`{"a":1,}`}</code></td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-mono text-xs">/</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Comment in JSON (// or /*)</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-mono text-xs">letter (a-z)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Unquoted key, or an invalid literal like <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">undefined</code>, <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">NaN</code></td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-mono text-xs">second &quot;</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Missing comma between two adjacent string values or objects</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ── Error 2: Unexpected end of input ──────────────────────────────── */}

        <h2 id="error-unexpected-end" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Unexpected end of JSON input
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-2">
          <strong className="text-gray-800 dark:text-[#E5E5E5]">Error messages:</strong>
        </p>
        <ul className="mb-3">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-disc"><code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">Unexpected end of JSON input</code></li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-disc"><code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">JSON.parse: unexpected end of data at line N column N</code> (Firefox)</li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-disc"><code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">SyntaxError: Unterminated string in JSON at position N</code></li>
        </ul>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          <strong className="text-gray-800 dark:text-[#E5E5E5]">Cause:</strong> The JSON string ended before the parser finished reading a complete value. The most common causes:
        </p>

        <ul className="mb-3">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Missing closing bracket.</strong> An object or array was opened but never closed.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Truncated response.</strong> The API response was cut off mid-stream due to a network error, timeout, or server crash. The JSON is incomplete.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Empty string.</strong> <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">JSON.parse(&quot;&quot;)</code> throws this error because an empty string is not valid JSON.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Unterminated string value.</strong> A string was opened with a double quote but the closing quote is missing.
          </li>
        </ul>

        <pre className="bg-gray-100 dark:bg-[#1E1E1E] text-xs font-mono p-4 rounded-md overflow-x-auto mb-4 text-gray-800 dark:text-[#D4D4D4] leading-relaxed">
{`// Invalid: missing closing brace
{"name": "Alice", "scores": [10, 20, 30]

// Valid
{"name": "Alice", "scores": [10, 20, 30]}

// Invalid: truncated string value
{"name": "Ali

// Valid
{"name": "Alice"}`}
        </pre>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          <strong className="text-gray-800 dark:text-[#E5E5E5]">Fix:</strong> Add the missing closing bracket. If the JSON comes from an API, check that the full response body was received before parsing. Use <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">response.text()</code> to inspect the raw body before calling <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">response.json()</code>. Guard against empty strings: <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">text ? JSON.parse(text) : null</code>.
        </p>

        {/* ── Tool CTA #1 ────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">Paste broken JSON, see the exact error and position</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            The JSON Formatter runs JSON.parse in your browser and shows the error with character position. Fix the error, format, copy. No upload, no server.
          </p>
          <Link
            href="/tools/json-formatter"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
          >
            Open JSON Formatter, Free <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
          </Link>
        </div>

        {/* ── Error 3: Trailing comma ────────────────────────────────────────── */}

        <h2 id="error-trailing-comma" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Trailing comma
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-2">
          <strong className="text-gray-800 dark:text-[#E5E5E5]">Error message:</strong> <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">Unexpected token &apos;{"}"}&apos;</code> or <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">Unexpected token &apos;{"]"}&apos;</code>
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          <strong className="text-gray-800 dark:text-[#E5E5E5]">Cause:</strong> A comma appears after the last item in an object or array. The parser expects a new item after the comma but finds a closing bracket instead.
        </p>

        <pre className="bg-gray-100 dark:bg-[#1E1E1E] text-xs font-mono p-4 rounded-md overflow-x-auto mb-4 text-gray-800 dark:text-[#D4D4D4] leading-relaxed">
{`// Invalid: trailing comma in object
{
  "name": "Alice",
  "age": 30,
}

// Invalid: trailing comma in array
[1, 2, 3,]

// Valid object
{
  "name": "Alice",
  "age": 30
}

// Valid array
[1, 2, 3]`}
        </pre>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          <strong className="text-gray-800 dark:text-[#E5E5E5]">Fix:</strong> Remove the comma after the last item. In a multi-line JSON object, this is the comma on the last property line before the closing <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">{`}`}</code>.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          <strong className="text-gray-800 dark:text-[#E5E5E5]">Why this happens so often:</strong> JavaScript (ES5+) allows trailing commas in object and array literals, and many code style guides actively encourage them (because they make diffs cleaner). When developers copy a JS object literal into a JSON context, the trailing comma follows. The fix is always to remove the comma.
        </p>

        {/* ── Error 4: Single quotes ─────────────────────────────────────────── */}

        <h2 id="error-single-quotes" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Single quotes instead of double quotes
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-2">
          <strong className="text-gray-800 dark:text-[#E5E5E5]">Error message:</strong> <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">Unexpected token &apos;&apos;&apos;</code>
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          <strong className="text-gray-800 dark:text-[#E5E5E5]">Cause:</strong> Single quotes are used for a key name or a string value. JSON only accepts double quotes.
        </p>

        <pre className="bg-gray-100 dark:bg-[#1E1E1E] text-xs font-mono p-4 rounded-md overflow-x-auto mb-4 text-gray-800 dark:text-[#D4D4D4] leading-relaxed">
{`// Invalid: single-quoted key and value
{'name': 'Alice'}

// Invalid: single-quoted value only (key is double-quoted)
{"name": 'Alice'}

// Valid
{"name": "Alice"}`}
        </pre>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          <strong className="text-gray-800 dark:text-[#E5E5E5]">Fix:</strong> Replace all single quotes with double quotes. In most code editors, a find-and-replace on <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">&apos;</code> will work, but be careful: if any of your string values legitimately contain apostrophes, those will need to be escaped as <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">\&apos;</code> inside a double-quoted string (though in practice they do not need escaping in JSON since JSON strings are delimited by double quotes; apostrophes are literal characters inside a double-quoted JSON string).
        </p>

        {/* ── Error 5: Unquoted keys ─────────────────────────────────────────── */}

        <h2 id="error-unquoted-keys" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Unquoted keys
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-2">
          <strong className="text-gray-800 dark:text-[#E5E5E5]">Error message:</strong> <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">Unexpected token &apos;n&apos;</code> (or whatever the first letter of the unquoted key is)
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          <strong className="text-gray-800 dark:text-[#E5E5E5]">Cause:</strong> A key is written without quotes, as in a JavaScript object literal. JSON requires all keys to be double-quoted strings.
        </p>

        <pre className="bg-gray-100 dark:bg-[#1E1E1E] text-xs font-mono p-4 rounded-md overflow-x-auto mb-4 text-gray-800 dark:text-[#D4D4D4] leading-relaxed">
{`// Invalid: unquoted keys
{name: "Alice", age: 30}

// Valid
{"name": "Alice", "age": 30}`}
        </pre>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          <strong className="text-gray-800 dark:text-[#E5E5E5]">Fix:</strong> Add double quotes around every key. The parser sees the first letter of the unquoted key and does not recognize it as a valid start of a JSON value (which would need to be a <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">&quot;</code>, <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">{`{`}</code>, <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">[</code>, <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">t</code> for true, <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">f</code> for false, <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">n</code> for null, or a digit).
        </p>

        {/* ── Error 6: Comments ─────────────────────────────────────────────── */}

        <h2 id="error-comments" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Comments in JSON
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-2">
          <strong className="text-gray-800 dark:text-[#E5E5E5]">Error message:</strong> <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">Unexpected token &apos;/&apos;</code>
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          <strong className="text-gray-800 dark:text-[#E5E5E5]">Cause:</strong> A <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">//</code> or <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">/* */</code> comment appears in the JSON. Comments are not part of the JSON specification.
        </p>

        <pre className="bg-gray-100 dark:bg-[#1E1E1E] text-xs font-mono p-4 rounded-md overflow-x-auto mb-4 text-gray-800 dark:text-[#D4D4D4] leading-relaxed">
{`// Invalid: line comment
{
  "host": "localhost", // database host
  "port": 5432
}

// Invalid: block comment
{
  /* database config */
  "host": "localhost"
}

// Valid: no comments
{
  "host": "localhost",
  "port": 5432
}`}
        </pre>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          <strong className="text-gray-800 dark:text-[#E5E5E5]">Fix:</strong> Remove all comments. If you need comments in a configuration file, rename the file to use the <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">.jsonc</code> extension (JSON with Comments) and use a parser that supports it. VS Code reads <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">settings.json</code> as JSONC. Node.js does not support JSONC natively; use a library like <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">jsonc-parser</code>.
        </p>

        {/* ── Error 7: undefined, NaN, Infinity ─────────────────────────────── */}

        <h2 id="error-undefined-nan" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          undefined, NaN, and Infinity values
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-2">
          <strong className="text-gray-800 dark:text-[#E5E5E5]">Error messages:</strong>
        </p>
        <ul className="mb-3">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-disc"><code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">Unexpected token &apos;u&apos;</code> (for undefined)</li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-disc"><code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">Unexpected token &apos;N&apos;</code> (for NaN)</li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-disc"><code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">Unexpected token &apos;I&apos;</code> (for Infinity)</li>
        </ul>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          <strong className="text-gray-800 dark:text-[#E5E5E5]">Cause:</strong> These JavaScript values are not part of the JSON specification and cannot be represented in JSON.
        </p>

        <pre className="bg-gray-100 dark:bg-[#1E1E1E] text-xs font-mono p-4 rounded-md overflow-x-auto mb-4 text-gray-800 dark:text-[#D4D4D4] leading-relaxed">
{`// Invalid
{"score": NaN, "max": Infinity, "result": undefined}

// Valid: use null for missing or non-representable values
{"score": null, "max": null, "result": null}`}
        </pre>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          <strong className="text-gray-800 dark:text-[#E5E5E5]">Fix:</strong> Replace these values with <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">null</code>, or use a number that represents the concept (for example, <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">-1</code> or a very large number instead of <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">Infinity</code>). Note: when you call <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">JSON.stringify</code> on a JavaScript object with these values, <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">NaN</code> and <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">Infinity</code> are serialized as <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">null</code>, and <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">undefined</code> properties are dropped entirely. The raw literals appear in JSON only if you manually write them as text.
        </p>

        {/* ── Error 8: Missing comma ─────────────────────────────────────────── */}

        <h2 id="error-missing-comma" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Missing comma between items
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-2">
          <strong className="text-gray-800 dark:text-[#E5E5E5]">Error messages:</strong> <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">Unexpected string</code>, <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">Unexpected token &apos;&quot;&apos;</code>
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          <strong className="text-gray-800 dark:text-[#E5E5E5]">Cause:</strong> Two properties or array elements are adjacent without a comma between them. The parser expects a comma or a closing bracket after a value, but finds the start of a new value instead.
        </p>

        <pre className="bg-gray-100 dark:bg-[#1E1E1E] text-xs font-mono p-4 rounded-md overflow-x-auto mb-4 text-gray-800 dark:text-[#D4D4D4] leading-relaxed">
{`// Invalid: missing comma between properties
{
  "name": "Alice"
  "age": 30
}

// Invalid: missing comma in array
[1 2 3]

// Valid
{
  "name": "Alice",
  "age": 30
}

// Valid
[1, 2, 3]`}
        </pre>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          <strong className="text-gray-800 dark:text-[#E5E5E5]">Fix:</strong> Add the missing comma after the preceding value. When you see <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">Unexpected token &quot;&quot;</code> (a double quote), the parser reached the start of a new key while expecting a comma or closing bracket.
        </p>

        {/* ── Error 9: Duplicate keys ────────────────────────────────────────── */}

        <h2 id="error-duplicate-keys" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Duplicate keys
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-2">
          <strong className="text-gray-800 dark:text-[#E5E5E5]">Error message:</strong> None from JSON.parse (see explanation below)
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          <strong className="text-gray-800 dark:text-[#E5E5E5]">Cause:</strong> An object has two properties with the same key. The JSON specification (RFC 8259) says duplicate keys make an object &quot;semantically invalid&quot; but does not require parsers to throw an error. Most JSON parsers (including <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">JSON.parse</code>) silently accept duplicate keys and use the last value.
        </p>

        <pre className="bg-gray-100 dark:bg-[#1E1E1E] text-xs font-mono p-4 rounded-md overflow-x-auto mb-4 text-gray-800 dark:text-[#D4D4D4] leading-relaxed">
{`// Technically invalid but parsed without error by most parsers
{
  "name": "Alice",
  "name": "Bob"
}

// JSON.parse result: {"name": "Bob"} (last value wins)

// Valid: use distinct keys
{
  "firstName": "Alice",
  "lastName": "Bob"
}`}
        </pre>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          <strong className="text-gray-800 dark:text-[#E5E5E5]">Why this matters:</strong> Because <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">JSON.parse</code> does not throw, duplicate keys are silent bugs. The value you see in your application may not be the value you intended, and the behavior varies between parsers (some use the first value, some use the last). A JSON linter or formatter that checks for duplicates will catch this when <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">JSON.parse</code> does not.
        </p>

        {/* ── Error 10: Mismatched brackets ─────────────────────────────────── */}

        <h2 id="error-mismatched-brackets" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Mismatched or missing brackets
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-2">
          <strong className="text-gray-800 dark:text-[#E5E5E5]">Error messages:</strong> <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">Unexpected token &apos;{"]"}&apos;</code>, <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">Unexpected token &apos;{"}"}&apos;</code>, or <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">Unexpected end of JSON input</code>
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          <strong className="text-gray-800 dark:text-[#E5E5E5]">Cause:</strong> A closing bracket <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">]</code> is used to close an object <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">{`{`}</code>, or a <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">{`}`}</code> is used to close an array <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">[</code>. Or brackets are simply missing or extra.
        </p>

        <pre className="bg-gray-100 dark:bg-[#1E1E1E] text-xs font-mono p-4 rounded-md overflow-x-auto mb-4 text-gray-800 dark:text-[#D4D4D4] leading-relaxed">
{`// Invalid: wrong closing bracket type
{"scores": [10, 20, 30}]

// Invalid: extra closing bracket
{"name": "Alice"}}

// Valid
{"scores": [10, 20, 30]}`}
        </pre>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          <strong className="text-gray-800 dark:text-[#E5E5E5]">Fix:</strong> Match every <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">{`{`}</code> with a <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">{`}`}</code> and every <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">[</code> with a <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">]</code>. For complex nested JSON, a formatter with syntax highlighting makes bracket matching visible. An editor with bracket-pair colorization (VS Code has this built-in) helps trace deep nesting.
        </p>

        {/* ── Error 11: Control characters ──────────────────────────────────── */}

        <h2 id="error-control-characters" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Unescaped control characters in strings
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-2">
          <strong className="text-gray-800 dark:text-[#E5E5E5]">Error message:</strong> <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">Invalid control character at position N</code> or <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">Unexpected token</code>
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          <strong className="text-gray-800 dark:text-[#E5E5E5]">Cause:</strong> A raw control character (tab, newline, carriage return, or other characters with Unicode code points 0x00 to 0x1F) appears inside a JSON string without being escaped. JSON strings must have these characters escaped as <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">\t</code>, <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">\n</code>, <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">\r</code>, or <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">\uXXXX</code>.
        </p>

        <pre className="bg-gray-100 dark:bg-[#1E1E1E] text-xs font-mono p-4 rounded-md overflow-x-auto mb-4 text-gray-800 dark:text-[#D4D4D4] leading-relaxed">
{`// Invalid: raw newline inside string value
{"message": "Line one
Line two"}

// Valid: escaped newline
{"message": "Line one\\nLine two"}

// Also valid for tab
{"path": "C:\\\\Users\\\\Alice\\\\file.txt"}`}
        </pre>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          <strong className="text-gray-800 dark:text-[#E5E5E5]">Fix:</strong> Escape control characters. A raw literal newline inside a JSON string must be written as <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">\n</code>. This error often appears when JSON is built by string concatenation or template literals instead of <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">JSON.stringify</code>. Always use <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">JSON.stringify</code> to produce JSON from JavaScript values.
        </p>

        {/* ── Tool CTA #2 ────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">Validate JSON and see the error location instantly</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            Paste JSON. See error with position. Fix it. Format. No upload, no account, runs entirely in your browser.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/tools/json-formatter"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            >
              Open JSON Formatter, Free <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link
              href="/blog/how-to-format-json-online-free"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
            >
              JSON formatting complete guide <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>
        </div>

        {/* ── Section: Quick-fix workflow ────────────────────────────────────── */}

        <h2 id="quick-fix-workflow" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Quick-fix workflow for any JSON error
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Use this sequence for any JSON parse error, regardless of where it originates:
        </p>

        <ol className="mb-4 space-y-3">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Read the error message character.</strong> The character X in &quot;Unexpected token X&quot; tells you the specific error type. Use the table in the Unexpected token section above to identify it.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Note the position.</strong> The position N (character offset from zero) tells you exactly where the error is. Count from the start of the JSON string, or use a formatter that highlights the position.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Paste into a formatter.</strong> Open{" "}
            <Link href="/tools/json-formatter" className="text-[#6366F1] hover:underline">
              sammapix.com/tools/json-formatter
            </Link>
            . Paste the JSON. The error message and character position are shown immediately. Jump to that position.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Apply the fix.</strong> Find the error from this guide. Make the correction in the formatter&apos;s input.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Format again.</strong> Click Format. If there are multiple errors (common in manually written JSON), the formatter will report the next error after you fix the first one. Repeat until the JSON formats cleanly.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Fix the root cause.</strong> If the JSON came from a server, a build script, or a string concatenation, fix the generator so it produces valid JSON from the start. The best fix is always to use <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">JSON.stringify</code> rather than manually building JSON strings.
          </li>
        </ol>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Error</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Typical message</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Fix</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Trailing comma</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-mono text-xs">Unexpected token &apos;{"}"}&apos;</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Remove comma after last item</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Single quotes</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-mono text-xs">Unexpected token &apos;&apos;&apos;</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Replace all single quotes with double quotes</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Unquoted key</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-mono text-xs">Unexpected token &apos;n&apos; (first letter)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Add double quotes around every key</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Comment</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-mono text-xs">Unexpected token &apos;/&apos;</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Remove the comment. Use .jsonc if comments are needed</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">undefined / NaN</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-mono text-xs">Unexpected token &apos;u&apos; / &apos;N&apos;</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Replace with null or a valid number</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Missing comma</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-mono text-xs">Unexpected string / Unexpected token &apos;&quot;&apos;</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Add comma after the preceding value</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Truncated JSON</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-mono text-xs">Unexpected end of JSON input</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Check full response received. Add missing closing bracket</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Control character</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-mono text-xs">Invalid control character</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Escape as \n, \t, \r, or \uXXXX. Use JSON.stringify instead of string concat</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ── Section: Related tools ─────────────────────────────────────────── */}

        <h2 id="related-tools" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Related tools
        </h2>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">
              <Link href="/tools/json-formatter" className="text-[#6366F1] hover:underline">JSON Formatter</Link>
            </strong>: format, prettify, minify, and validate JSON in your browser. Shows error message and character position for every JSON parse error. No upload, no account. See also:{" "}
            <Link href="/blog/how-to-format-json-online-free" className="text-[#6366F1] hover:underline">JSON formatting complete guide</Link>.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">
              <Link href="/tools/url-encode-decode" className="text-[#6366F1] hover:underline">URL Encode / Decode</Link>
            </strong>: decode percent-encoded strings, which frequently appear when JSON is transmitted as a URL query parameter. See{" "}
            <Link href="/blog/url-encode-decode-online" className="text-[#6366F1] hover:underline">URL encoding guide</Link>.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">
              <Link href="/tools/hash-generator" className="text-[#6366F1] hover:underline">Hash Generator</Link>
            </strong>: generate checksums from text or files. Useful for verifying JSON file integrity. See{" "}
            <Link href="/blog/hash-generator-online" className="text-[#6366F1] hover:underline">Hash Generator guide</Link>.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">
              <Link href="/tools/image-to-base64" className="text-[#6366F1] hover:underline">Image to Base64</Link>
            </strong>: encode images as Base64 strings for embedding in JSON payloads without a file upload.
          </li>
        </ul>

        {/* ── Tool CTA #3 ────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">Developer tools that run entirely in your browser</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            Format JSON, encode URLs, hash files, convert images. No upload, no server, no account.
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </>
  );
}

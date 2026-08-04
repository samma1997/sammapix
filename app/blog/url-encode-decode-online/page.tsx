import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { APP_URL } from "@/lib/constants";
import BlogArticleLayout from "@/components/blog/BlogArticleLayout";

// ── Metadata ──────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "URL Encode / Decode Online Free — Percent-Encoding Explained [2026]",
  description:
    "Encode or decode any URL online for free. Understand percent-encoding, reserved characters (%20 %2F %3F %26), encodeURIComponent vs encodeURI, and when to use each. 100% in your browser. No upload.",
  alternates: {
    canonical: `${APP_URL}/blog/url-encode-decode-online`,
  },
  keywords: [
    "url encode",
    "url decode",
    "url encoder decoder",
    "percent encoding",
    "url encode online",
    "url decode online",
    "url encoder",
    "url decoder",
    "encodeURIComponent",
    "encodeURI",
    "url percent encoding",
    "encode url online free",
  ],
  openGraph: {
    title: "URL Encode / Decode Online Free — Percent-Encoding Explained [2026]",
    description:
      "Encode or decode any URL in your browser. Reserved characters, %20 vs +, encodeURIComponent vs encodeURI, API parameters. Free, no upload, no server.",
    url: `${APP_URL}/blog/url-encode-decode-online`,
    type: "article",
    publishedTime: "2026-08-04",
    authors: ["https://lucasammarco.com"],
  },
  twitter: {
    card: "summary_large_image",
    title: "URL Encode / Decode Online Free — Percent-Encoding [2026]",
    description:
      "Understand percent-encoding: %20, %2F, %3F, %26, encodeURIComponent vs encodeURI. Encode or decode URLs instantly in your browser. Free.",
    creator: "@lucasammarco",
  },
};

// ── Schema constants ──────────────────────────────────────────────────────────

const POST_DATE = "2026-08-04";
const POST_DATE_FORMATTED = "August 4, 2026";
const POST_URL = `${APP_URL}/blog/url-encode-decode-online`;
const POST_TITLE = "URL Encode / Decode Online Free — Percent-Encoding Explained [2026]";

// ── Article schema ────────────────────────────────────────────────────────────

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: POST_TITLE,
  description:
    "A complete guide to URL percent-encoding: what it is, why browsers require it, which characters get encoded and why, the difference between encodeURIComponent and encodeURI, common mistakes (double encoding, %20 vs +), and how to encode or decode any URL instantly in your browser without uploading anything.",
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
    "url encode online",
    "url decode online",
    "percent encoding",
    "encodeURIComponent",
    "url encoder decoder",
    "url special characters",
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
  name: "How to URL Encode or Decode a String Online",
  description:
    "Encode or decode any URL string or query parameter entirely in your browser using the SammaPix URL Encode / Decode tool. Uses native encodeURIComponent and decodeURIComponent. No file is ever uploaded. Free.",
  totalTime: "PT1M",
  tool: [
    {
      "@type": "HowToTool",
      name: "SammaPix URL Encode / Decode (browser-based, free)",
    },
  ],
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Open the URL Encode / Decode tool",
      text: "Go to sammapix.com/tools/url-encode-decode in any modern browser. No account, no extension required.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Paste your string",
      text: "Paste the URL or parameter value you want to encode or decode into the input field. The tool handles both full URLs and individual parameter values.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Choose Encode or Decode",
      text: "Click Encode to convert special characters to percent notation (e.g. space becomes %20). Click Decode to restore a percent-encoded string to human-readable form.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Copy the result",
      text: "The output appears instantly. Click the copy button to copy the encoded or decoded string to your clipboard, ready to paste into your API call, browser, or code.",
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
      name: "What is URL encoding (percent-encoding)?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "URL encoding, also called percent-encoding, is a method for representing characters that are not allowed or have special meaning in URLs. Each character is replaced by a percent sign followed by two hexadecimal digits representing the character's byte value in UTF-8. For example, a space becomes %20, a forward slash becomes %2F, and an ampersand becomes %26. The encoding is defined by RFC 3986 and is required any time you include arbitrary data inside a URL component such as a query string or path segment.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between encodeURIComponent and encodeURI?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "encodeURIComponent encodes everything except letters, digits, and the characters - _ . ! ~ * ' ( ). It is designed to encode a single component value — a query parameter, a path segment, or any piece of data that will be embedded inside a URL. encodeURI encodes everything except letters, digits, and the characters - _ . ! ~ * ' ( ) ; , / ? : @ & = + $ #. It preserves all the characters that have structural meaning in a URL, so it is only appropriate when you want to encode a full URL without breaking its structure. The most common mistake is using encodeURI on a parameter value that contains & or = — encodeURI leaves those characters unencoded, which breaks the query string. Always use encodeURIComponent for individual parameter values.",
      },
    },
    {
      "@type": "Question",
      name: "Why does a space sometimes appear as %20 and sometimes as +?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Both %20 and + represent a space, but they come from different encoding standards. %20 is the RFC 3986 (URI) standard for a space character in any URL component. The + notation for spaces comes from the older application/x-www-form-urlencoded format, used by HTML form submissions. When a browser submits a form via GET, spaces in form field values are encoded as +. However, + is only valid as a space replacement inside query strings sent via HTML forms — it is not valid in path segments, fragment identifiers, or in URLs consumed by APIs that follow strict RFC 3986. The safest practice: always use %20 (produced by encodeURIComponent) unless you are explicitly constructing application/x-www-form-urlencoded form data.",
      },
    },
    {
      "@type": "Question",
      name: "What characters must be percent-encoded in a URL?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "RFC 3986 defines unreserved characters as safe in URLs without encoding: letters A-Z and a-z, digits 0-9, and the four symbols hyphen (-), underscore (_), period (.), and tilde (~). All other characters should be percent-encoded in most URL components. The reserved characters — : / ? # [ ] @ ! $ & ' ( ) * + , ; = — have structural roles in URLs and must be encoded when they appear as data (not as structure). Practical examples: a space in a search query must be %20, an ampersand in a parameter value must be %26 (otherwise the parser treats it as a parameter separator), and a hash in a value must be %23 (otherwise the parser treats it as a fragment identifier).",
      },
    },
    {
      "@type": "Question",
      name: "What is double encoding and how do I avoid it?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Double encoding occurs when a string that is already percent-encoded gets encoded again. For example, %20 (an encoded space) becomes %2520 after a second encode pass — because the percent sign itself is encoded as %25. This is a very common bug. It happens when you call encodeURIComponent on a string that was already encoded, or when a library or framework encodes a URL component automatically while you also encode it manually. To avoid it: encode each parameter value exactly once before adding it to a URL. If you receive a URL from an external source and need to pass it as a parameter value, decode it first with decodeURIComponent, then re-encode it as a parameter value.",
      },
    },
    {
      "@type": "Question",
      name: "How do I encode a URL with special characters for an API request?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For an API request, encode each parameter value individually using encodeURIComponent, then join them into the query string. Example: if your API takes parameters q (search term) and lang (language), and the search term is 'coffee & donuts', build the URL as: baseUrl + '?q=' + encodeURIComponent('coffee & donuts') + '&lang=' + encodeURIComponent('en'). The result is: https://api.example.com/search?q=coffee%20%26%20donuts&lang=en. Never encode the full URL at once with encodeURI — it will leave the & separating parameters unencoded but break embedded & characters in values.",
      },
    },
    {
      "@type": "Question",
      name: "Does this URL encoder upload my data to a server?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. The SammaPix URL Encode / Decode tool runs 100% in your browser using JavaScript's native encodeURIComponent and decodeURIComponent functions. Nothing you type or paste is transmitted anywhere. No server receives your strings. This matters because query parameters sometimes contain tokens, API keys, passwords, or other sensitive credentials embedded in URLs. Open browser DevTools (F12), go to the Network tab, and type or paste anything into the tool — you will see no outgoing network requests carrying your input.",
      },
    },
    {
      "@type": "Question",
      name: "Can I decode a URL that contains Chinese, Arabic, or other non-ASCII characters?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Non-ASCII characters in URLs are encoded as their UTF-8 byte sequence in percent notation. A Chinese character like 中 has the UTF-8 encoding E4 B8 AD, so it appears in a URL as %E4%B8%AD. The decodeURIComponent function handles the full Unicode range — it decodes percent-encoded UTF-8 sequences back to their original Unicode characters correctly. If you paste %E4%B8%AD into the decode field, you will get 中. This is the standard way URLs represent Internationalized Domain Names (IDN) and Unicode path segments. The encode direction also works: type or paste any Unicode character and the tool produces its correct UTF-8 percent-encoded form.",
      },
    },
  ],
};

// ── Page ──────────────────────────────────────────────────────────────────────

export default function UrlEncodeDecodeOnlinePage() {
  return (
    <>
      <BlogArticleLayout
        title={POST_TITLE}
        slug="url-encode-decode-online"
        description="Every URL you send to an API, paste into a browser, or build in code must follow strict encoding rules. A single unencoded space or ampersand can break a request silently. This guide explains what percent-encoding is, which characters require it, the difference between encodeURIComponent and encodeURI, and how to encode or decode any URL instantly in your browser without uploading anything."
        date={POST_DATE}
        dateFormatted={POST_DATE_FORMATTED}
        tags={["Tools", "Workflow"]}
        readingTime={10}
        headings={[
          { id: "what-is-percent-encoding", title: "What is URL percent-encoding and why it exists" },
          { id: "reserved-characters", title: "Reserved vs unreserved characters: the full table" },
          { id: "encodeuricomponent-vs-encodeuri", title: "encodeURIComponent vs encodeURI: when to use each" },
          { id: "space-encoding", title: "%20 vs +: which to use for spaces" },
          { id: "common-characters-table", title: "Common characters and their encoded values" },
          { id: "double-encoding", title: "Double encoding: the most common mistake" },
          { id: "api-use-cases", title: "Encoding URL parameters for API requests" },
          { id: "how-to-encode-decode", title: "How to encode or decode a URL online, step by step" },
          { id: "related-tools", title: "Related tools" },
          { id: "faq", title: "FAQ" },
        ]}
        summary={[
          "URL percent-encoding replaces characters that are not safe or that have special meaning in URLs with a % sign followed by two hex digits representing the character's UTF-8 byte value.",
          "The reserved characters — : / ? # [ ] @ ! $ & ' ( ) * + , ; = — have structural roles in URLs and must be encoded when they appear as data, not structure.",
          "Use encodeURIComponent for individual query parameter values. Use encodeURI only for a full URL when you want to preserve its structure. Never use encodeURI on individual parameter values.",
          "A space is encoded as %20 by encodeURIComponent (RFC 3986 standard). The + notation for spaces comes from HTML form encoding (application/x-www-form-urlencoded) and is only valid in that specific context.",
          "Double encoding is a common bug: encoding an already-encoded string turns %20 into %2520. Encode each value exactly once, before composing the URL.",
          "The SammaPix URL Encode / Decode tool runs 100% in your browser using native JavaScript functions. No data is sent to any server.",
        ]}
        heroImage={
          <figure>
            <img
              src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="Browser address bar showing a URL with encoded characters, representing percent-encoding in web development."
              className="w-full max-h-[460px] object-cover rounded-lg"
              loading="eager"
            />
            <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
              Every URL you build in code or send to an API must follow percent-encoding rules. A single unencoded ampersand breaks the query string silently.
            </figcaption>
          </figure>
        }
        ctaBlock={
          <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2">
              Encode or decode any URL — no upload, no server
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-4">
              Native encodeURIComponent / decodeURIComponent. Works with query parameters, path segments, and full URLs. Runs 100% in your browser. Free.
            </p>
            <div className="flex flex-wrap gap-3 items-center">
              <Link
                href="/tools/url-encode-decode"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
              >
                Open URL Encoder / Decoder, Free
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
              <Link
                href="/blog/url-encoder-decoder-tool"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
              >
                Step-by-step encode / decode guide <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
              <Link
                href="/tools/hash-generator"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
              >
                Hash Generator <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
            </div>
          </div>
        }
      >

        {/* ── Section 1: What is percent-encoding ──────────────────────────── */}

        <h2 id="what-is-percent-encoding" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          What is URL percent-encoding and why it exists
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          A URL can only contain a limited set of characters from the ASCII character set. Characters outside that set, or characters that carry special meaning in a URL — like spaces, slashes, ampersands, and question marks — cannot appear in their raw form inside certain URL components. When they do, the URL becomes ambiguous or invalid.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Percent-encoding, formally defined in <strong className="text-gray-800 dark:text-[#E5E5E5]">RFC 3986</strong>, solves this by substituting each problematic character with a percent sign followed by two hexadecimal digits representing the character&apos;s UTF-8 byte value. A space is encoded as <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">%20</code> because 20 is the hexadecimal representation of 32, the ASCII code for space. A forward slash becomes <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">%2F</code>, an ampersand becomes <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">%26</code>, and a hash becomes <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">%23</code>.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          You encounter percent-encoding every day without noticing it. When you search for something on Google and look at the address bar, you see your query transformed: spaces become <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">+</code> or <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">%20</code>, special characters become percent sequences. When you click a link in an email with tracking parameters, those parameters are percent-encoded. When a REST API receives a query with a user-submitted value, that value must be encoded to prevent the parser from misinterpreting it.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The encoding is reversible: a percent-encoded string can always be decoded back to its original form. The decoding process replaces each <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">%XX</code> sequence with the character whose UTF-8 byte value is <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">XX</code> in hexadecimal.
        </p>

        {/* ── Section 2: Reserved vs unreserved characters ──────────────────── */}

        <h2 id="reserved-characters" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Reserved vs unreserved characters: the full table
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          RFC 3986 divides URL characters into two groups. Unreserved characters are safe to use in any URL component without encoding. Reserved characters have structural meaning and must be encoded when they appear as data rather than as URL delimiters.
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Category</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Characters</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Encode in data?</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Notes</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Unreserved</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-mono text-xs">A-Z a-z 0-9 - _ . ~</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-green-600 dark:text-green-400 font-medium">No — always safe</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Never need encoding. Safe in every URL component.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Reserved — general</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-mono text-xs">: / ? # [ ] @</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-red-600 dark:text-red-400 font-medium">Yes — encode as data</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Delimit scheme, host, path, query, fragment. Must encode when used as data.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Reserved — subcomponent</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-mono text-xs">! $ & &apos; ( ) * + , ; =</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-red-600 dark:text-red-400 font-medium">Yes — encode in query values</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">& separates parameters; = pairs keys and values. Encode when appearing inside a value.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Non-ASCII (Unicode)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Chinese, Arabic, emoji, etc.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-red-600 dark:text-red-400 font-medium">Always — UTF-8 byte encoding</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Encoded as their UTF-8 byte sequence. Example: 中 → %E4%B8%AD.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Space</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-mono text-xs">(ASCII 32)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-red-600 dark:text-red-400 font-medium">Always — as %20 (or + in forms)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">%20 is the RFC 3986 standard. + is only valid in HTML form encoding contexts.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          A practical way to remember the rule: if you are embedding a user-supplied value or any arbitrary string inside a URL, encode every character except letters, digits, hyphen, underscore, period, and tilde. When in doubt, encode more rather than less — a correctly encoded URL always works, but an under-encoded one may silently misbehave.
        </p>

        {/* ── Section 3: encodeURIComponent vs encodeURI ────────────────────── */}

        <h2 id="encodeuricomponent-vs-encodeuri" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          encodeURIComponent vs encodeURI: when to use each
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          JavaScript provides two built-in functions for URL encoding, and choosing the wrong one is one of the most common bugs in web development. The difference comes down to <em>what</em> they are designed to encode.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          <strong className="text-gray-800 dark:text-[#E5E5E5]">encodeURIComponent</strong> is designed to encode a single component value — a query parameter value, a path segment, or any piece of data that will be embedded inside a URL. It encodes all characters except: <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">A-Z a-z 0-9 - _ . ! ~ * &apos; ( )</code>. This means it encodes <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">/ ? # & = : @</code> — all the structural URL characters. That is exactly what you want when encoding a value, because those characters must not be interpreted as URL structure.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          <strong className="text-gray-800 dark:text-[#E5E5E5]">encodeURI</strong> is designed to encode a complete URL while preserving its structure. It leaves unencoded all the characters that have structural roles in URLs: <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">; , / ? : @ & = + $ #</code> in addition to the unreserved characters. This makes it useful only when you have a full URL and want to encode non-ASCII characters or spaces without breaking its structure. You should never use encodeURI on a parameter value that could contain <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">&amp;</code> or <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">=</code> — those characters will pass through unencoded and corrupt the query string.
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Function</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Leaves unencoded</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Use for</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Do not use for</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium font-mono text-xs">encodeURIComponent</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-mono text-xs">A-Z a-z 0-9 - _ . ! ~ * &apos; ( )</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Query parameter values, path segments, any data embedded in a URL</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Full URLs — it encodes / and ? and breaks the URL structure</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium font-mono text-xs">encodeURI</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-mono text-xs">A-Z a-z 0-9 - _ . ! ~ * &apos; ( ) ; , / ? : @ &amp; = + $ #</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">A full URL with Unicode chars or spaces, where structure must be preserved</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Parameter values — leaves & and = unencoded, corrupting query strings</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The practical rule: <strong className="text-gray-800 dark:text-[#E5E5E5]">always use encodeURIComponent for parameter values</strong>. Use encodeURI only in the rare case where you have a complete URL (perhaps received from user input) and want to make it URL-safe without destroying its structure. In most codebases, encodeURIComponent is the right choice 95% of the time.
        </p>

        {/* ── Section 4: %20 vs + ───────────────────────────────────────────── */}

        <h2 id="space-encoding" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          %20 vs +: which to use for spaces
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Both <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">%20</code> and <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">+</code> can represent a space in a URL, but they belong to different encoding standards and are not interchangeable in all contexts.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">%20</code> is the RFC 3986 standard encoding for a space. It is produced by <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">encodeURIComponent</code> and is valid in every URL component — path segments, query strings, fragment identifiers. It is universally understood by every HTTP library, server, and language runtime.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">+</code> as a space representation comes from the <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">application/x-www-form-urlencoded</code> MIME type — the format browsers use when submitting HTML forms via GET or POST. In that context only, a + in the query string is decoded as a space. This convention predates RFC 3986. Outside of HTML form submissions, a + is a literal plus sign, not a space.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The safest rule: <strong className="text-gray-800 dark:text-[#E5E5E5]">always use %20</strong> (produced by encodeURIComponent) unless you are explicitly building application/x-www-form-urlencoded data for an HTML form. APIs that expect RFC 3986-compliant URLs will interpret a + literally and your search query &quot;hello world&quot; will arrive as &quot;hello+world&quot; instead.
        </p>

        {/* ── Tool CTA #1 ────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">Encode or decode a URL parameter — runs 100% in your browser</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            Native encodeURIComponent / decodeURIComponent. Spaces as %20. Handles Unicode, special characters, API tokens. No server.
          </p>
          <Link
            href="/tools/url-encode-decode"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
          >
            Open URL Encoder / Decoder, Free <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
          </Link>
        </div>

        {/* ── Section 5: Common characters table ───────────────────────────── */}

        <h2 id="common-characters-table" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Common characters and their percent-encoded values
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The table below covers the characters most frequently encountered when building URLs manually, constructing API requests, or debugging broken query strings. The &quot;Encoded form&quot; column shows the result of applying encodeURIComponent.
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Character</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Encoded form</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Why it matters</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-mono">space</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-mono text-xs font-medium">%20</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Not allowed in URLs. Most common encoding mistake.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-mono">/</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-mono text-xs font-medium">%2F</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Path delimiter. Encode when a slash appears inside a parameter value.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-mono">?</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-mono text-xs font-medium">%3F</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Starts the query string. Encode when it appears in a value.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-mono">&amp;</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-mono text-xs font-medium">%26</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Separates query parameters. Critical to encode in values.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-mono">=</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-mono text-xs font-medium">%3D</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Separates key and value in query pairs. Encode when in value.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-mono">#</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-mono text-xs font-medium">%23</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Fragment identifier delimiter. A raw # in a value truncates the query.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-mono">+</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-mono text-xs font-medium">%2B</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Ambiguous (space in forms, literal + in RFC 3986). Encode for safety.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-mono">%</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-mono text-xs font-medium">%25</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">The encoding escape character itself. Must encode literal percent signs.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-mono">@</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-mono text-xs font-medium">%40</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Used in user@host authority. Encode when in a path or query value.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-mono">:</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-mono text-xs font-medium">%3A</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Scheme delimiter (https:). Encode in path or query component values.</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ── Section 6: Double encoding ────────────────────────────────────── */}

        <h2 id="double-encoding" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Double encoding: the most common mistake
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Double encoding happens when a string that is already percent-encoded gets encoded again. The most visible symptom: a literal <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">%25</code> appearing in your URL where you expect <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">%20</code> or another encoded character.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Here is what happens step by step. Suppose a user submits the string <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">hello world</code>. You encode it once: <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">hello%20world</code>. Now if you pass that result to encodeURIComponent again — or if a framework automatically encodes what you already encoded — the <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">%</code> in <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">%20</code> becomes <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">%25</code>, turning your encoded space into <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">hello%2520world</code>. The server receives <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">hello%20world</code> as a literal string — a different value from the user&apos;s original input.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Common sources of double encoding in real codebases:
        </p>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Manually encoding a value before passing it to a library</strong> that also encodes it internally. Axios, fetch, and most HTTP clients encode URL parameters automatically when you pass them as objects. If you pre-encode, they double-encode.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Receiving an already-encoded URL and passing it as a parameter value</strong>. If you receive a callback URL like <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">https://app.com/auth?token=abc</code> and encode it as a redirect parameter, the URL is encoded. If you then pass that parameter value through encodeURIComponent again, it double-encodes.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">String concatenation across multiple layers</strong>. A value is encoded at the API layer, passed to a router, which encodes the URL again, which passes it to a redirect handler that encodes it one more time.
          </li>
        </ul>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The fix is simple: encode each raw value exactly once, as late as possible in the URL construction process. If a value arrives already encoded (from an external source), decode it first with <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">decodeURIComponent</code>, then re-encode it as needed for your specific context. Never assume the encoding state of a string received from outside your system.
        </p>

        {/* ── Tool CTA #2 ────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">Check your encoded string — decode and re-encode without double encoding</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            Paste a suspicious URL to verify its encoding state. Decode then re-encode in one step. No server, no upload.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/tools/url-encode-decode"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            >
              Open URL Encoder / Decoder, Free <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link
              href="/blog/url-encoder-decoder-tool"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
            >
              Step-by-step guide <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>
        </div>

        {/* ── Section 7: API use cases ──────────────────────────────────────── */}

        <h2 id="api-use-cases" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Encoding URL parameters for API requests
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          API requests are where percent-encoding mistakes are most costly. A missing or incorrect encoding can produce a 400 Bad Request, return wrong data silently, or — in the worst case — expose a security vulnerability (open redirect, parameter injection). Here are the patterns that come up most often.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          <strong className="text-gray-800 dark:text-[#E5E5E5]">Building a search query with spaces and special characters.</strong> A user searches for &quot;coffee &amp; donuts&quot;. The raw string contains a space and an ampersand. You need to pass it as the <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">q</code> parameter. Correct approach:
        </p>

        <pre className="bg-gray-50 dark:bg-[#1E1E1E] border border-gray-200 dark:border-[#2A2A2A] rounded-md p-4 text-xs font-mono text-gray-700 dark:text-[#D4D4D4] overflow-x-auto mb-4">
{`const query = "coffee & donuts";
const url = "https://api.example.com/search?q=" + encodeURIComponent(query);
// Result: https://api.example.com/search?q=coffee%20%26%20donuts`}
        </pre>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          <strong className="text-gray-800 dark:text-[#E5E5E5]">Passing a redirect URL as a parameter.</strong> You want to redirect the user back to a URL after authentication. The redirect URL itself contains slashes, question marks, and more parameters. It must be fully encoded as a single parameter value:
        </p>

        <pre className="bg-gray-50 dark:bg-[#1E1E1E] border border-gray-200 dark:border-[#2A2A2A] rounded-md p-4 text-xs font-mono text-gray-700 dark:text-[#D4D4D4] overflow-x-auto mb-4">
{`const redirectUrl = "https://app.com/dashboard?tab=settings&mode=edit";
const loginUrl = "https://auth.example.com/login?redirect=" + encodeURIComponent(redirectUrl);
// Result: https://auth.example.com/login?redirect=https%3A%2F%2Fapp.com%2Fdashboard%3Ftab%3Dsettings%26mode%3Dedit`}
        </pre>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          <strong className="text-gray-800 dark:text-[#E5E5E5]">Multiple parameters constructed safely.</strong> Use URLSearchParams in JavaScript — it handles encoding automatically and correctly for each value:
        </p>

        <pre className="bg-gray-50 dark:bg-[#1E1E1E] border border-gray-200 dark:border-[#2A2A2A] rounded-md p-4 text-xs font-mono text-gray-700 dark:text-[#D4D4D4] overflow-x-auto mb-4">
{`const params = new URLSearchParams({
  q: "coffee & donuts",
  lang: "en",
  page: "1",
});
const url = "https://api.example.com/search?" + params.toString();
// Result: https://api.example.com/search?q=coffee+%26+donuts&lang=en&page=1
// Note: URLSearchParams uses + for spaces (form encoding), not %20.
// For strict RFC 3986, use encodeURIComponent manually.`}
        </pre>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Note that URLSearchParams uses the <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">application/x-www-form-urlencoded</code> format, encoding spaces as <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">+</code> rather than <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">%20</code>. Most API servers accept both, but if your target API requires strict RFC 3986 encoding, build the query string manually with encodeURIComponent.
        </p>

        {/* ── Section 8: How to encode/decode step by step ─────────────────── */}

        <h2 id="how-to-encode-decode" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          How to encode or decode a URL online, step by step
        </h2>

        <ol className="mb-4 space-y-3">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Open the URL Encode / Decode tool.</strong> Go to <Link href="/tools/url-encode-decode" className="text-[#6366F1] hover:underline">sammapix.com/tools/url-encode-decode</Link> in any modern browser. No signup, no extension required.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Paste your string.</strong> Paste the URL, parameter value, or percent-encoded string into the input field. For encoding: paste the raw string with spaces and special characters. For decoding: paste the percent-encoded string (e.g. <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">coffee%20%26%20donuts</code>).
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Click Encode or Decode.</strong> Encode converts the raw string to its percent-encoded form using encodeURIComponent. Decode converts the percent-encoded form back to its original text using decodeURIComponent.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Copy the result.</strong> Click the copy button. The output is ready to paste into your API call, code, terminal command, or browser address bar.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Verify if needed.</strong> If you received a percent-encoded string and want to confirm its decoded value, paste the encoded form and click Decode. The result is what a server or application would receive after decoding.
          </li>
        </ol>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The tool runs entirely in your browser using JavaScript&apos;s native <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">encodeURIComponent</code> and <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">decodeURIComponent</code> functions. No data is transmitted to any server. Sensitive strings — API keys embedded in URLs, OAuth tokens, internal endpoint paths — stay on your device.
        </p>

        {/* ── Section 9: Related tools ──────────────────────────────────────── */}

        <h2 id="related-tools" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Related tools
        </h2>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/url-encode-decode" className="text-[#6366F1] hover:underline">URL Encode / Decode</Link></strong>: the tool covered in this article. Encode or decode any URL or parameter value using native encodeURIComponent / decodeURIComponent. No upload, no server. See also: <Link href="/blog/url-encoder-decoder-tool" className="text-[#6366F1] hover:underline">step-by-step encode / decode guide</Link>.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/hash-generator" className="text-[#6366F1] hover:underline">Hash Generator</Link></strong>: generate MD5, SHA-1, SHA-256, SHA-384, or SHA-512 hashes from text or files in your browser. Useful for verifying file integrity or creating checksums. See <Link href="/blog/hash-generator-online" className="text-[#6366F1] hover:underline">hash generator guide</Link>.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/qr-code-generator" className="text-[#6366F1] hover:underline">QR Code Generator</Link></strong>: generate QR codes from any URL, text, Wi-Fi credentials, email, or vCard. No signup, no expiry. Download PNG or SVG. See <Link href="/blog/qr-code-generator-online" className="text-[#6366F1] hover:underline">QR code generator guide</Link>.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/image-to-base64" className="text-[#6366F1] hover:underline">Image to Base64</Link></strong>: encode any image to Base64 for embedding in HTML, CSS, or API payloads. No upload, no server. See <Link href="/blog/image-to-base64-online" className="text-[#6366F1] hover:underline">Image to Base64 guide</Link>.
          </li>
        </ul>

        {/* ── Tool CTA #3 ────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">Browser-based tools for developers — no upload, no server</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            Encode URLs, generate hashes, create QR codes, convert images — all client-side.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/tools/url-encode-decode" className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]">
              URL Encode / Decode <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link href="/tools/hash-generator" className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]">
              Hash Generator <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link href="/tools/qr-code-generator" className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]">
              QR Code Generator <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
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

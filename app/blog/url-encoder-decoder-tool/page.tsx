import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { APP_URL } from "@/lib/constants";
import BlogArticleLayout from "@/components/blog/BlogArticleLayout";

// ── Metadata ──────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "URL Encoder Decoder Tool — Encode & Decode URLs Online Without Installing Anything [2026]",
  description:
    "Encode or decode a URL online without installing any software. Step-by-step guide: encode a parameter with spaces and special characters, decode a received link, fix double encoding. 100% client-side. Free.",
  alternates: {
    canonical: `${APP_URL}/blog/url-encoder-decoder-tool`,
  },
  keywords: [
    "url encoder tool",
    "decode url string",
    "encode url parameter",
    "url decoder online",
    "url encode decode online",
    "online url encoder",
    "decode url online free",
    "url encoding tool",
    "encode url without software",
    "url decode no install",
    "percent decode url",
    "url component encoder",
  ],
  openGraph: {
    title: "URL Encoder Decoder Tool — Encode & Decode URLs Online Without Installing Anything [2026]",
    description:
      "Encode a parameter with spaces or &, decode a received link, fix double encoding. Step-by-step. 100% client-side — no install, no upload, no server. Free.",
    url: `${APP_URL}/blog/url-encoder-decoder-tool`,
    type: "article",
    publishedTime: "2026-08-04",
    authors: ["https://lucasammarco.com"],
  },
  twitter: {
    card: "summary_large_image",
    title: "URL Encoder Decoder Tool — No Install, No Upload [2026]",
    description:
      "Encode a URL parameter with spaces/special chars, decode a received link, fix double encoding. Step-by-step guide. Browser-based, free.",
    creator: "@lucasammarco",
  },
};

// ── Schema constants ──────────────────────────────────────────────────────────

const POST_DATE = "2026-08-04";
const POST_DATE_FORMATTED = "August 4, 2026";
const POST_URL = `${APP_URL}/blog/url-encoder-decoder-tool`;
const POST_TITLE = "URL Encoder Decoder Tool — Encode & Decode URLs Online Without Installing Anything [2026]";

// ── Article schema ────────────────────────────────────────────────────────────

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: POST_TITLE,
  description:
    "A practical step-by-step guide to encoding and decoding URLs entirely in your browser without installing any software. Covers encoding a parameter value with spaces and special characters, decoding a received URL, the difference between encoding a component and a full URL, common errors like double encoding and malformed input, and examples for API requests, redirect parameters, and query strings with user-submitted data.",
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
    "url encoder tool",
    "decode url string",
    "encode url parameter",
    "url decoder online",
    "percent decode",
    "url encoding no install",
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
  name: "How to Encode or Decode a URL Online Without Installing Software",
  description:
    "Encode a URL parameter with special characters, or decode a received percent-encoded URL, entirely in your browser using the SammaPix URL Encode / Decode tool. No software installation required. Uses native encodeURIComponent and decodeURIComponent. Free.",
  totalTime: "PT1M",
  tool: [
    {
      "@type": "HowToTool",
      name: "SammaPix URL Encode / Decode (browser-based, free, no install)",
    },
  ],
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Open the tool in your browser",
      text: "Go to sammapix.com/tools/url-encode-decode. No installation, no download, no account required. Works in Chrome, Firefox, Safari, and Edge.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Choose what you want to do",
      text: "To encode: paste the raw string (e.g. a search query, file path, or redirect URL) that you want to embed safely inside a URL. To decode: paste the percent-encoded string (e.g. coffee%20%26%20donuts) that you want to read in human-readable form.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Click Encode or Decode",
      text: "Click the Encode button to apply encodeURIComponent to your input. Click Decode to apply decodeURIComponent. The result appears instantly — no server roundtrip.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Copy and use the result",
      text: "Click the copy button. Use the output in your API call, browser address bar, code, terminal command, or wherever the URL is needed. The tool runs 100% in your browser — your string never leaves your device.",
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
      name: "How do I encode a URL with spaces and special characters?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Paste the string containing spaces and special characters into the URL Encode / Decode tool at sammapix.com/tools/url-encode-decode and click Encode. The tool applies encodeURIComponent, which converts spaces to %20, ampersands to %26, equal signs to %3D, slashes to %2F, and all other non-unreserved characters to their %XX form. The result is safe to embed in any URL component. Example: 'coffee & donuts' becomes 'coffee%20%26%20donuts'.",
      },
    },
    {
      "@type": "Question",
      name: "How do I decode a URL that has %20, %26, and other percent codes?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Paste the percent-encoded string into the input field and click Decode. The tool applies decodeURIComponent, which reverses the encoding: %20 becomes a space, %26 becomes &, %3F becomes ?, %2F becomes /, and so on. If the input is malformed (an incomplete % sequence or an invalid byte), the tool catches the error and reports it rather than crashing silently. The decoded output is the original human-readable string.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between encoding a URL component and encoding a full URL?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Encoding a component (a single parameter value, a path segment, or any piece of data embedded in a URL) uses encodeURIComponent, which encodes all characters except letters, digits, and - _ . ! ~ * ' ( ). This is the correct approach for parameter values. Encoding a full URL uses encodeURI, which preserves the structural characters of the URL — : / ? # [ ] @ & = + $ ; , — so the URL remains parseable. The critical difference: encodeURI does NOT encode & and =, so it is wrong for parameter values. encodeURIComponent DOES encode them, which would break a full URL's structure. Use encodeURIComponent for values; use encodeURI (rarely) for a complete URL you need to make safe without breaking.",
      },
    },
    {
      "@type": "Question",
      name: "What happens if I try to decode a malformed percent-encoded string?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A malformed percent-encoded string is one where a % is not followed by exactly two valid hexadecimal digits. For example: %2G (G is not hex), %2 (incomplete), or a bare % at the end of the string. JavaScript's decodeURIComponent throws a URIError for malformed input rather than silently returning a wrong result. The SammaPix URL Encode / Decode tool catches that error and displays a clear message so you can identify the invalid sequence. Common causes: copy-paste errors that truncated the encoded string, manual editing that broke a % sequence, or receiving a URL that was only partially encoded by a broken system.",
      },
    },
    {
      "@type": "Question",
      name: "Does this tool work without internet? Can I use it offline?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, once the page is loaded, the URL Encode / Decode tool works without an active internet connection. The encoding and decoding logic runs in JavaScript natively in your browser — it makes no network requests. If you load the page once and then disconnect from Wi-Fi, the tool continues to work. This is also why the tool is suitable for sensitive data: credentials, API keys, or internal endpoints embedded in URLs never leave your device, regardless of your network status.",
      },
    },
    {
      "@type": "Question",
      name: "How do I encode a redirect URL to use as a parameter?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A redirect URL is itself a complete URL — it contains slashes, question marks, ampersands, and other characters that would corrupt the outer URL if left unencoded. The correct approach: paste the full redirect URL into the encode field and click Encode. The entire URL is treated as a value and all its structural characters are encoded. Example: 'https://app.com/dashboard?tab=settings&mode=edit' becomes 'https%3A%2F%2Fapp.com%2Fdashboard%3Ftab%3Dsettings%26mode%3Dedit'. You then append that encoded string as a parameter value: 'https://auth.example.com/login?redirect=https%3A%2F%2Fapp.com%2Fdashboard%3Ftab%3Dsettings%26mode%3Dedit'.",
      },
    },
    {
      "@type": "Question",
      name: "Why does my decoded URL look different from what I expect?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "If a decoded URL looks unexpected, the most common reasons are: 1) The input was double-encoded — a string that was already percent-encoded was encoded again, so %20 became %2520. Decode it twice: once to get %20, then again to get the original space. 2) The encoding used + for spaces (HTML form encoding) rather than %20. The tool's decodeURIComponent treats + as a literal plus sign, not a space — to decode + as spaces you need to replace + with %20 first. 3) The input was truncated — a copy-paste operation cut off part of the string, leaving incomplete % sequences. Check that you copied the entire encoded string.",
      },
    },
    {
      "@type": "Question",
      name: "Is this URL encoder and decoder tool private?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The SammaPix URL Encode / Decode tool runs entirely in your browser using JavaScript's built-in encodeURIComponent and decodeURIComponent functions. Nothing you type or paste is sent to any server. No analytics events capture the content of your input. You can verify this with browser DevTools: open the Network tab, type or paste a string, and click Encode or Decode — you will see no outgoing requests containing your data. This matters because URLs frequently carry sensitive information: authentication tokens, session IDs, API keys, internal endpoint paths, and personal search queries.",
      },
    },
  ],
};

// ── Page ──────────────────────────────────────────────────────────────────────

export default function UrlEncoderDecoderToolPage() {
  return (
    <>
      <BlogArticleLayout
        title={POST_TITLE}
        slug="url-encoder-decoder-tool"
        description="You received a URL that looks like this: https://example.com/search?q=coffee%20%26%20donuts. Or you need to pass a callback URL as a parameter, but it contains slashes and ampersands that break the outer query string. This step-by-step guide shows you exactly how to encode or decode any URL in your browser — without installing any software, without uploading anything, and without exposing sensitive query parameters to a third-party server."
        date={POST_DATE}
        dateFormatted={POST_DATE_FORMATTED}
        tags={["Tools", "Workflow"]}
        readingTime={10}
        headings={[
          { id: "why-encode-decode", title: "Why you need to encode or decode a URL" },
          { id: "encode-step-by-step", title: "How to encode a URL parameter: step by step" },
          { id: "decode-step-by-step", title: "How to decode a percent-encoded URL: step by step" },
          { id: "component-vs-full-url", title: "Encoding a component vs encoding a full URL" },
          { id: "common-errors", title: "Common errors and how to fix them" },
          { id: "practical-examples", title: "Practical examples: API params, redirects, spaces and & characters" },
          { id: "privacy-no-upload", title: "Why no-upload matters for URL encoding" },
          { id: "related-tools", title: "Related tools" },
          { id: "faq", title: "FAQ" },
        ]}
        summary={[
          "URL encoding converts characters that are not safe or structurally meaningful in a URL into a %XX percent notation, making the URL parseable by any HTTP library or browser.",
          "To encode a parameter value, paste it into the tool and click Encode. The tool applies encodeURIComponent — the correct function for parameter values, which encodes & = / ? # and all non-unreserved characters.",
          "To decode a received percent-encoded URL or parameter, paste it and click Decode. The tool applies decodeURIComponent and reports any malformed input with a clear error message.",
          "Encoding a component value and encoding a full URL are different operations. Use encodeURIComponent for values; use encodeURI (rarely) for a complete URL. Never use encodeURI on a parameter value containing & or =.",
          "Double encoding is the most common mistake: calling encodeURIComponent on an already-encoded string turns %20 into %2520. Encode each value exactly once.",
          "The tool runs 100% in your browser. No string you paste is transmitted to any server, making it safe for API keys, tokens, and internal endpoints in URLs.",
        ]}
        heroImage={
          <figure>
            <img
              src="https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="Code editor showing URL encoding in JavaScript with encodeURIComponent, representing developer workflow for building API requests."
              className="w-full max-h-[460px] object-cover rounded-lg"
              loading="eager"
            />
            <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
              Encoding URL parameters correctly is one of those small things that prevents hours of debugging broken API requests.
            </figcaption>
          </figure>
        }
        ctaBlock={
          <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2">
              Encode or decode any URL — no install, no upload
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-4">
              Native encodeURIComponent / decodeURIComponent. Handles spaces, &, =, /, Unicode. Runs 100% in your browser. Free, no signup.
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
                href="/blog/url-encode-decode-online"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
              >
                Percent-encoding explained <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
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

        {/* ── Section 1: Why encode or decode ──────────────────────────────── */}

        <h2 id="why-encode-decode" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Why you need to encode or decode a URL
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          URLs can only safely carry a limited character set. Characters like spaces, ampersands (<code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">&amp;</code>), equal signs (<code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">=</code>), slashes (<code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">/</code>), question marks (<code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">?</code>), and hash signs (<code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">#</code>) have specific structural meanings. When they appear inside a parameter value, they break the URL parser&apos;s ability to understand where one part ends and the next begins.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Encoding is needed when you are <strong className="text-gray-800 dark:text-[#E5E5E5]">building</strong> a URL: constructing a search query with user input, passing a redirect URL as a parameter, building an API request where parameter values contain special characters, or forming a link where the displayed text becomes a URL component.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Decoding is needed when you are <strong className="text-gray-800 dark:text-[#E5E5E5]">reading</strong> a URL: making sense of a percent-encoded link someone sent you, debugging a 400 Bad Request to understand what the server actually received, extracting the value of a URL parameter that contains encoded characters, or reading log files that contain raw URL-encoded request paths.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Both operations require no software installation. Every modern browser includes JavaScript&apos;s native <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">encodeURIComponent</code> and <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">decodeURIComponent</code> functions, and the SammaPix URL Encode / Decode tool exposes those functions through a simple interface — paste, click, copy.
        </p>

        {/* ── Section 2: Encode step by step ───────────────────────────────── */}

        <h2 id="encode-step-by-step" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          How to encode a URL parameter: step by step
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The most common encoding task: you have a piece of data (a search term, a user name, a file path, a redirect URL) and you need to embed it safely inside a URL as a query parameter value. Here is the exact process.
        </p>

        <ol className="mb-4 space-y-3">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Open <Link href="/tools/url-encode-decode" className="text-[#6366F1] hover:underline">sammapix.com/tools/url-encode-decode</Link>.</strong> No install, no account. Works in any browser.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Paste your raw value.</strong> Paste only the parameter value — not the full URL, not the key name, just the value. For example, if you want to pass the search term &quot;coffee &amp; donuts&quot;, paste that string. If you want to pass a redirect URL like <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">https://app.com/profile?id=42&amp;tab=settings</code>, paste the full redirect URL.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Click Encode.</strong> The tool applies <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">encodeURIComponent</code>. Every character except letters, digits, hyphen, underscore, period, and tilde is converted to its <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">%XX</code> form.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Copy the encoded result.</strong> The output is <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">coffee%20%26%20donuts</code> for the search term, or <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">https%3A%2F%2Fapp.com%2Fprofile%3Fid%3D42%26tab%3Dsettings</code> for the redirect URL.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Append it to your URL.</strong> Use it as the value in your query string: <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">https://api.example.com/search?q=coffee%20%26%20donuts</code>, or for the redirect: <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">https://auth.example.com/login?next=https%3A%2F%2Fapp.com%2Fprofile%3Fid%3D42%26tab%3Dsettings</code>.
          </li>
        </ol>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Critical rule: <strong className="text-gray-800 dark:text-[#E5E5E5]">encode the value only, not the entire URL</strong>. Encoding the full URL with encodeURIComponent would encode the <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">://</code> and the <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">?</code> that separate scheme from host and path from query — destroying the URL&apos;s structure. Only encode the pieces of data you are embedding as values.
        </p>

        {/* ── Section 3: Decode step by step ───────────────────────────────── */}

        <h2 id="decode-step-by-step" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          How to decode a percent-encoded URL: step by step
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          You received a URL like <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">https://example.com/search?q=caf%C3%A9%20au%20lait%20%26%20croissant&amp;lang=fr</code> and want to read it in plain text. Or you are reading server logs and trying to understand what values arrived in a request. The decode process is the reverse of encoding.
        </p>

        <ol className="mb-4 space-y-3">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Open <Link href="/tools/url-encode-decode" className="text-[#6366F1] hover:underline">sammapix.com/tools/url-encode-decode</Link>.</strong>
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Paste the percent-encoded string.</strong> You can paste the full URL or just the encoded parameter value. For a full URL, decode to see the query string in readable form. For a specific value, paste just the value portion.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Click Decode.</strong> The tool applies <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">decodeURIComponent</code>. Every <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">%XX</code> sequence is replaced with the corresponding UTF-8 character. <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">%20</code> → space, <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">%26</code> → &amp;, <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">%C3%A9</code> → é.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Read or copy the result.</strong> The decoded output for the example above: <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">https://example.com/search?q=café au lait &amp; croissant&lang=fr</code>. Now you can read what the original search query was.
          </li>
        </ol>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          If the input contains a malformed sequence (an incomplete or invalid <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">%XX</code> code), the tool displays an error message rather than crashing silently. This helps you identify the exact problematic character in a poorly formed URL.
        </p>

        {/* ── Tool CTA #1 ────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">Encode or decode any URL — runs instantly in your browser</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            Native encodeURIComponent / decodeURIComponent. No install, no server, no upload. Free.
          </p>
          <Link
            href="/tools/url-encode-decode"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
          >
            Open URL Encoder / Decoder, Free <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
          </Link>
        </div>

        {/* ── Section 4: Component vs full URL ─────────────────────────────── */}

        <h2 id="component-vs-full-url" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Encoding a component vs encoding a full URL
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The most important conceptual distinction in URL encoding is whether you are encoding a piece of data (a component) or the URL itself. This determines which encoding function applies.
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">What you are encoding</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Correct function</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Example</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Why</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">A query parameter value</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-mono text-xs">encodeURIComponent</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-mono text-xs">coffee &amp; donuts → coffee%20%26%20donuts</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Must encode & and = so they are not mistaken for URL structure</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">A path segment with special chars</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-mono text-xs">encodeURIComponent</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-mono text-xs">my folder/file → my%20folder%2Ffile</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">The / must not create spurious path segments</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">A redirect URL as a parameter</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-mono text-xs">encodeURIComponent</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-mono text-xs">https://x.com/?a=1 → https%3A%2F%2Fx.com%2F%3Fa%3D1</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">The entire URL is a data value — all structural chars must be encoded</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">A full URL with non-ASCII chars</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-mono text-xs">encodeURI</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-mono text-xs">https://x.com/café → https://x.com/caf%C3%A9</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Encodes non-ASCII but preserves : // / ? & = so the URL stays valid</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The SammaPix URL Encode / Decode tool uses <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">encodeURIComponent</code> for encoding, making it the correct tool for encoding data values. For encoding a full URL to make it safe to paste in a browser, the browser itself will handle it — type or paste a URL with spaces directly and the browser encodes it automatically. You rarely need encodeURI in practice.
        </p>

        {/* ── Section 5: Common errors ──────────────────────────────────────── */}

        <h2 id="common-errors" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Common errors and how to fix them
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          URL encoding errors are often silent — they do not always throw an error. Instead, a request succeeds but returns wrong data, or a link redirects to the wrong page. Here are the patterns that cause the most debugging time.
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Error</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Symptom</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Fix</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Double encoding</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">%20 becomes %2520 in the final URL. Server receives wrong value.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Encode each raw value exactly once. Decode first if input may already be encoded.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Using encodeURI on parameter values</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">&amp; and = are not encoded. Query string splits incorrectly at the unencoded &amp;.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Always use encodeURIComponent for parameter values.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Unencoded # in a value</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Everything after the # is treated as a fragment, not sent to the server.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Encode # as %23 in any parameter value containing a hash sign.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Malformed percent sequence</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">decodeURIComponent throws URIError. Request fails or returns 400.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Check for truncated copy-paste. Paste into the decode tool to see the error position.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">+ decoded as a literal plus sign</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Search query shows "hello+world" instead of "hello world".</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Replace + with %20 before decoding, or use a form-specific decoder if input is form-encoded.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Encoding the full URL instead of the value</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">The URL becomes one giant encoded string — browser cannot parse it.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Only encode the data values you embed in the URL, not the URL structure itself.</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ── Tool CTA #2 ────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">Debug a broken URL — decode and check what arrived</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            Paste the raw or encoded URL and decode it to see what the server actually received. Catches double encoding, malformed sequences, and misused + signs.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/tools/url-encode-decode"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            >
              Open URL Encoder / Decoder, Free <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link
              href="/blog/url-encode-decode-online"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
            >
              Percent-encoding reference guide <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>
        </div>

        {/* ── Section 6: Practical examples ────────────────────────────────── */}

        <h2 id="practical-examples" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Practical examples: API params, redirects, spaces and &amp; characters
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Here are the scenarios that come up most often in real development, with before and after examples showing exactly what encoding produces.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          <strong className="text-gray-800 dark:text-[#E5E5E5]">Example 1 — Search query with space and ampersand.</strong> A user types &quot;coffee &amp; donuts&quot; into a search box. You need to pass it as the <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">q</code> parameter:
        </p>

        <pre className="bg-gray-50 dark:bg-[#1E1E1E] border border-gray-200 dark:border-[#2A2A2A] rounded-md p-4 text-xs font-mono text-gray-700 dark:text-[#D4D4D4] overflow-x-auto mb-4">
{`Input:   coffee & donuts
Encoded: coffee%20%26%20donuts
Full URL: https://api.example.com/search?q=coffee%20%26%20donuts`}
        </pre>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Without encoding, the raw &amp; would be interpreted as a query parameter separator, and the server would receive <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">q=coffee</code> and a second unnamed parameter <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">donuts</code> — a silently wrong result.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          <strong className="text-gray-800 dark:text-[#E5E5E5]">Example 2 — Redirect URL as a parameter.</strong> After login, redirect the user to their original destination. The destination URL is passed as a parameter:
        </p>

        <pre className="bg-gray-50 dark:bg-[#1E1E1E] border border-gray-200 dark:border-[#2A2A2A] rounded-md p-4 text-xs font-mono text-gray-700 dark:text-[#D4D4D4] overflow-x-auto mb-4">
{`Input:   https://app.com/dashboard?tab=settings&plan=pro
Encoded: https%3A%2F%2Fapp.com%2Fdashboard%3Ftab%3Dsettings%26plan%3Dpro
Full URL: https://auth.example.com/login?next=https%3A%2F%2Fapp.com%2Fdashboard%3Ftab%3Dsettings%26plan%3Dpro`}
        </pre>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          <strong className="text-gray-800 dark:text-[#E5E5E5]">Example 3 — Decoding a URL received from a third-party system.</strong> You receive a webhook URL from a payment provider:
        </p>

        <pre className="bg-gray-50 dark:bg-[#1E1E1E] border border-gray-200 dark:border-[#2A2A2A] rounded-md p-4 text-xs font-mono text-gray-700 dark:text-[#D4D4D4] overflow-x-auto mb-4">
{`Received: https://myapp.com/webhook?event=payment.success&amount=29.99%20EUR&customer=Marie%20Curie
Decoded:  https://myapp.com/webhook?event=payment.success&amount=29.99 EUR&customer=Marie Curie`}
        </pre>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          <strong className="text-gray-800 dark:text-[#E5E5E5]">Example 4 — Non-ASCII characters (Unicode).</strong> A French product name containing accented characters:
        </p>

        <pre className="bg-gray-50 dark:bg-[#1E1E1E] border border-gray-200 dark:border-[#2A2A2A] rounded-md p-4 text-xs font-mono text-gray-700 dark:text-[#D4D4D4] overflow-x-auto mb-4">
{`Input:   café au lait
Encoded: caf%C3%A9%20au%20lait
Full URL: https://shop.example.com/search?name=caf%C3%A9%20au%20lait`}
        </pre>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The é character encodes as <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">%C3%A9</code> — its UTF-8 byte sequence (0xC3 0xA9) expressed as two percent-encoded bytes. Any Unicode character, including Chinese, Arabic, emoji, and diacritics, encodes the same way.
        </p>

        {/* ── Section 7: Privacy ───────────────────────────────────────────── */}

        <h2 id="privacy-no-upload" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Why no-upload matters for URL encoding
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          URL encoding might seem like a trivial operation — it is, after all, just character substitution. But the strings you encode or decode frequently contain sensitive data. Consider what commonly appears in URLs:
        </p>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Authentication tokens.</strong> OAuth tokens, JWT tokens, and session IDs often appear as query parameters in callback URLs. Pasting these into an online tool that sends them to a server exposes them.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">API keys.</strong> Developers sometimes embed API keys directly in URLs for quick testing. An encode/decode tool that logs inputs would capture these keys.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Internal endpoint paths.</strong> URLs pointing to internal services, admin panels, or staging environments reveal infrastructure when logged by a third-party tool.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">User-submitted data.</strong> If you decode a URL containing user email addresses, names, or personal identifiers, exposing those to a server violates the data minimization principle of GDPR and similar regulations.
          </li>
        </ul>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The SammaPix URL Encode / Decode tool makes no network requests during encoding or decoding. The computation happens entirely in your browser tab using native JavaScript functions. Open browser DevTools (F12), go to the Network tab, filter by XHR or All, and paste or type any string — you will see no outgoing requests carrying your input. The only requests the page makes are for its own assets (CSS, fonts, the JS bundle) on page load.
        </p>

        {/* ── Tool CTA #3 ────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">Developer tools that run in your browser — no upload, no server</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            URL encoding, hash generation, QR codes, Base64 encoding — all client-side.
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

        {/* ── Section 8: Related tools ──────────────────────────────────────── */}

        <h2 id="related-tools" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Related tools
        </h2>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/url-encode-decode" className="text-[#6366F1] hover:underline">URL Encode / Decode</Link></strong>: the tool covered in this article. Native encodeURIComponent / decodeURIComponent. No upload, no server. See also: <Link href="/blog/url-encode-decode-online" className="text-[#6366F1] hover:underline">percent-encoding reference guide</Link>.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/hash-generator" className="text-[#6366F1] hover:underline">Hash Generator</Link></strong>: generate MD5, SHA-1, SHA-256, SHA-384, or SHA-512 hashes from text or files. Useful for checksums, file integrity, and verifying downloads. See <Link href="/blog/hash-generator-online" className="text-[#6366F1] hover:underline">hash generator guide</Link>.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/qr-code-generator" className="text-[#6366F1] hover:underline">QR Code Generator</Link></strong>: generate QR codes from any URL, text, Wi-Fi, email, or vCard. No signup, no expiry, download PNG or SVG. See <Link href="/blog/qr-code-generator-online" className="text-[#6366F1] hover:underline">QR code generator guide</Link>.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/image-to-base64" className="text-[#6366F1] hover:underline">Image to Base64</Link></strong>: encode any image to a Base64 data URI for embedding in HTML, CSS, or API payloads. No upload, no server. See <Link href="/blog/image-to-base64-online" className="text-[#6366F1] hover:underline">Image to Base64 guide</Link>.
          </li>
        </ul>

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

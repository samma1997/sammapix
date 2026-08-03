import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { APP_URL } from "@/lib/constants";
import BlogArticleLayout from "@/components/blog/BlogArticleLayout";

// ── Metadata ──────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Convert an Image to Base64 Online Free [2026]",
  description:
    "Encode any image to Base64, Data URI, CSS background-image, or HTML img src — 100% in your browser via FileReader. No upload, no server, no signup. Reverse decode included. Free.",
  alternates: {
    canonical: `${APP_URL}/blog/image-to-base64-online`,
  },
  keywords: [
    "image to base64",
    "encode image base64",
    "image to data uri",
    "base64 encode image online",
    "image to base64 online",
    "convert image to base64",
    "jpg to base64",
    "png to base64",
    "base64 data uri converter",
    "image base64 encoder free",
    "convert image to data uri",
    "inline image base64",
    "base64 image encoder no upload",
    "image to base64 javascript",
    "data uri generator online",
  ],
  openGraph: {
    title: "Convert an Image to Base64 Online Free [2026]",
    description:
      "Encode any image to Base64 or Data URI in your browser. No upload, no server. Output as plain base64, data URI, CSS, or HTML. Reverse decode included. Free.",
    url: `${APP_URL}/blog/image-to-base64-online`,
    type: "article",
    publishedTime: "2026-08-03",
    authors: ["https://lucasammarco.com"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Convert an Image to Base64 Online Free [2026]",
    description:
      "Encode image to Base64 / Data URI in browser via FileReader. No upload. Plain base64, CSS, HTML, Data URI output modes. Reverse decode. Free.",
    creator: "@lucasammarco",
  },
};

// ── Schema constants ──────────────────────────────────────────────────────────

const POST_DATE = "2026-08-03";
const POST_DATE_FORMATTED = "August 3, 2026";
const POST_URL = `${APP_URL}/blog/image-to-base64-online`;
const POST_TITLE = "Convert an Image to Base64 Online Free [2026]";

// ── Article schema ────────────────────────────────────────────────────────────

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: POST_TITLE,
  description:
    "Most base64 encoders upload your image to a remote server. SammaPix Image to Base64 runs entirely in your browser using the FileReader API — the file never leaves your device. This guide covers how base64 encoding works, when to use it (small icons, email embeds, reducing HTTP requests) and when NOT to (large images: +33% size, no browser caching), and how to output plain base64, Data URI, CSS background-image, or HTML img src.",
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
    "image to base64",
    "encode image base64",
    "image to data uri",
    "base64 encode image online",
    "convert image to base64",
    "inline image base64",
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
  name: "How to Convert an Image to Base64 Online Without Uploading It",
  description:
    "Encode any image as a Base64 string or Data URI in your browser. No file upload. Output as plain base64, Data URI, CSS background-image, or HTML img src. Reverse decode is also available. Free, no signup.",
  totalTime: "PT1M",
  tool: [
    {
      "@type": "HowToTool",
      name: "SammaPix Image to Base64 (browser-based, free, no upload)",
    },
  ],
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Open the Image to Base64 tool",
      text: "Go to sammapix.com/tools/image-to-base64 in any modern browser. No account or signup required.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Drop your image onto the tool",
      text: "Drag your image file onto the dropzone or click to browse. The FileReader API reads the file locally — nothing is uploaded to any server.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Choose your output format",
      text: "Select one of four output modes: Plain Base64 (the raw encoded string), Data URI (includes the MIME type prefix), CSS (ready to paste into background-image), or HTML (a complete img tag with the encoded src).",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Copy the encoded string",
      text: "Click Copy to clipboard. The encoded string is ready to paste into your codebase, email template, CSS file, or HTML document.",
    },
    {
      "@type": "HowToStep",
      position: 5,
      name: "Verify in DevTools if needed",
      text: "Open browser DevTools (F12), go to the Network tab, and watch for outgoing requests while the tool processes your image. You will see none — the encoding is entirely local.",
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
      name: "What is a Base64-encoded image and why do developers use it?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Base64 is an encoding scheme that converts binary data — including image files — into a string of ASCII characters. Because HTTP and HTML can only reliably transmit text, Base64 lets you embed binary image data directly inside text-based formats: HTML, CSS, JSON, XML, or email. A Base64-encoded image does not require a separate HTTP request from the browser. Instead, the image data is inlined directly into the document or stylesheet. This is useful for small assets like icons, favicons, spinners, and inline email images where the overhead of an extra HTTP request outweighs the size penalty of encoding.",
      },
    },
    {
      "@type": "Question",
      name: "When should I use Base64 for images, and when should I NOT?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Use Base64 for images that are small (under 5 to 10KB), change rarely, and are used on nearly every page — such as a logo SVG, a spinner GIF, a small favicon, or a UI icon embedded in CSS. In those cases, eliminating one HTTP round-trip is worth the encoding overhead. Do NOT use Base64 for large images, photographs, or product images. Base64 encoding increases file size by approximately 33% compared to the binary original. A 200KB JPEG becomes a 267KB string in your HTML or CSS. That string is not separately cacheable by the browser — the entire document must be re-fetched when it changes. For anything larger than a small icon, serving the image as a regular file with a cache-control header gives far better performance than inlining it as Base64.",
      },
    },
    {
      "@type": "Question",
      name: "What is a Data URI and how is it different from plain Base64?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A Data URI is a URI scheme that embeds data directly in a document. A plain Base64 string is just the encoded bytes with no context about what type of data it represents. A Data URI wraps that Base64 string with a MIME type prefix so the browser knows how to interpret it. The format is: data:[MIME type];base64,[encoded data]. For example, data:image/png;base64,iVBORw0KGgo... is a Data URI for a PNG image. You can use a Data URI directly as the src attribute of an img tag, as the url() value in a CSS background-image, or as the href of an anchor for download. Plain Base64 without the prefix is useful when you are passing the encoded bytes to an API or storing them in JSON where you will attach the MIME type separately.",
      },
    },
    {
      "@type": "Question",
      name: "Does this tool upload my image to a server?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. The SammaPix Image to Base64 tool encodes images entirely in your browser using the FileReader API — a standard browser API for reading local files without network access. Your image is read into browser memory, encoded to Base64 using the browser's built-in atob/btoa functions and the FileReader readAsDataURL method, and the result is displayed in the output field. No network request carries your image to any server. You can verify this by opening DevTools (F12), switching to the Network tab, and watching while the tool encodes your image. You will see no outgoing requests. This matters for confidential assets: internal logos, proprietary icons, confidential screenshots, or any image you do not want to hand to a third-party server.",
      },
    },
    {
      "@type": "Question",
      name: "How do I use a Base64-encoded image in CSS?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Use the Data URI as the value of the background-image property: .element { background-image: url('data:image/png;base64,iVBORw0KGgo...'); }. The tool outputs a ready-to-paste CSS snippet in the CSS output mode. This technique is commonly used for small UI icons, custom cursors, and background patterns that you want to ship inline with the stylesheet to avoid an extra HTTP request. Keep in mind that embedding large images in CSS bloats the stylesheet file and blocks rendering because CSS must fully download before the browser paints content.",
      },
    },
    {
      "@type": "Question",
      name: "How do I embed a Base64-encoded image in an HTML email?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Use the Data URI as the src of an img tag: <img src=\"data:image/png;base64,iVBORw0KGgo...\" alt=\"Logo\" />. This is useful for HTML email because many email clients block externally hosted images by default. Inlining small images (like a logo or divider) as Base64 in the email HTML means they display even when remote images are blocked. However, email providers impose size limits on HTML email (typically 100KB to 200KB total). Base64 adds 33% overhead to the image size, so only inline images that are genuinely small. For larger images in email, host them on a CDN and use the external URL.",
      },
    },
    {
      "@type": "Question",
      name: "What output formats does the tool support?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The tool provides four output modes. Plain Base64: the raw encoded string with no prefix — useful for APIs and JSON payloads where you control the MIME type separately. Data URI: the full data:[type];base64,[encoded] string, ready to use anywhere a URL is accepted. CSS: a complete background-image: url('...') declaration ready to paste into a stylesheet. HTML: a complete img tag with the base64 data as the src attribute, plus the alt and width attributes filled in from the image metadata. Reverse decoding (Base64 to image) is also supported: paste a Base64 string or Data URI and the tool decodes it back to a previewable, downloadable image.",
      },
    },
  ],
};

// ── Page ──────────────────────────────────────────────────────────────────────

export default function ImageToBase64OnlinePage() {
  return (
    <>
      <BlogArticleLayout
        title={POST_TITLE}
        slug="image-to-base64-online"
        description="Encoding an image to Base64 should not require uploading it to a third-party server. SammaPix Image to Base64 runs entirely in your browser via the FileReader API — no upload, no signup, no server. Output as plain Base64, Data URI, CSS, or HTML. Reverse decoding included. This guide covers how the encoding works, when to use inline Base64 (and the exact cases when you should not), and how to integrate the output into your codebase."
        date={POST_DATE}
        dateFormatted={POST_DATE_FORMATTED}
        tags={["Performance", "Tools"]}
        readingTime={11}
        headings={[
          { id: "what-is-base64", title: "What Base64 encoding actually is" },
          { id: "use-cases", title: "When to use Base64 images: the honest answer" },
          { id: "when-not-to-use", title: "When NOT to use Base64: the +33% problem" },
          { id: "how-it-works", title: "How the browser encodes images without uploading" },
          { id: "output-formats", title: "Output formats: plain, Data URI, CSS, HTML" },
          { id: "step-by-step", title: "How to encode an image to Base64, step by step" },
          { id: "css-usage", title: "Using Base64 in CSS background-image" },
          { id: "html-email-usage", title: "Embedding Base64 in HTML email" },
          { id: "javascript-snippet", title: "JavaScript snippet: encode any image in the browser" },
          { id: "comparison-table", title: "Inline Base64 vs external file: honest performance comparison" },
          { id: "verify-no-upload", title: "How to verify no upload happens (DevTools)" },
          { id: "related-tools", title: "Related tools" },
          { id: "faq", title: "FAQ" },
        ]}
        summary={[
          "Base64 encodes binary image data as an ASCII string so it can be inlined directly into HTML, CSS, JSON, or email — eliminating one HTTP request per image.",
          "The correct use case is small, frequently used assets under about 10KB: icons, favicons, spinners, and inline email images.",
          "Do NOT inline large images as Base64. Encoding inflates file size by approximately 33%, and the encoded string cannot be cached independently by the browser.",
          "SammaPix Image to Base64 encodes images 100% in your browser via the FileReader API. No file is uploaded to any server.",
          "Four output modes: plain Base64, Data URI, CSS background-image snippet, and HTML img tag.",
          "Reverse decoding is supported: paste any Base64 string or Data URI and the tool decodes it back to a previewable, downloadable image.",
          "Verifiable in DevTools: open the Network tab, encode an image, and you will see zero outgoing requests.",
        ]}
        heroImage={
          <figure>
            <img
              src="https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="A developer working at a computer reviewing encoded data strings, representing the need to encode images to Base64 for inline use in HTML and CSS without server uploads."
              className="w-full max-h-[460px] object-cover rounded-lg"
              loading="eager"
            />
            <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
              Converting an image to Base64 inline eliminates HTTP requests — but only when the image is small enough to make the trade-off worthwhile.
            </figcaption>
          </figure>
        }
        ctaBlock={
          <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2">
              Encode any image to Base64 in your browser right now
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-4">
              Plain Base64, Data URI, CSS snippet, or HTML img tag. Reverse decode included. No upload, no server, no signup. Free.
            </p>
            <div className="flex flex-wrap gap-3 items-center">
              <Link
                href="/tools/image-to-base64"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
              >
                Open Image to Base64, Free
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
              <Link
                href="/blog/base64-to-image-converter"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
              >
                Base64 to image decode guide <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
              <Link
                href="/tools/svg-to-png"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
              >
                SVG to PNG <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
            </div>
          </div>
        }
      >

        {/* ── Section 1: What is Base64 ──────────────────────────────────── */}

        <h2 id="what-is-base64" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          What Base64 encoding actually is
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Image files are binary data: sequences of bytes representing pixel colors, metadata, and compression information. HTML, CSS, JSON, and email are text formats. They were not designed to carry raw binary data.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Base64 solves this problem by converting every 3 bytes of binary data into 4 printable ASCII characters drawn from a 64-character alphabet (A–Z, a–z, 0–9, +, /). The result is a string that text-based formats can safely carry without corruption — because every character in it is a printable ASCII character with no special meaning in HTML, CSS, or JSON.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          When you embed a Base64-encoded image in an HTML document, the browser decodes the string back into binary data in memory and displays the image — without making a network request for a separate image file. This is the core reason developers use Base64 image encoding: to eliminate HTTP requests.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          What a Data URI looks like
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          A Data URI combines the Base64-encoded bytes with a MIME type prefix so the browser knows the data type:
        </p>

        <div className="bg-gray-50 dark:bg-[#1E1E1E] border border-gray-200 dark:border-[#2A2A2A] rounded-md p-4 mb-4 overflow-x-auto">
          <pre className="text-xs font-mono text-gray-800 dark:text-[#E5E5E5] whitespace-pre-wrap break-all">
{`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==`}
          </pre>
        </div>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          This is a 1x1 transparent PNG expressed as a Data URI. The three parts are: the scheme{" "}
          <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">data:</code>,
          the MIME type{" "}
          <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">image/png;base64</code>,
          and the encoded payload after the comma. The browser parses this the same way it parses a URL — except the data is embedded rather than fetched.
        </p>

        {/* ── Section 2: Use cases ───────────────────────────────────────── */}

        <h2 id="use-cases" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          When to use Base64 images: the honest answer
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Base64 inlining is a genuine performance optimization in a narrow set of circumstances. Here are the cases where it makes sense:
        </p>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Small, frequently used UI assets (under 5 to 10KB).</strong> Icons, spinners, decorative SVGs, small checkmark images — assets that appear on every page and change rarely. Inlining them in the CSS eliminates one HTTP request per icon. Below about 2KB, the encoding overhead is negligible and the saved round-trip is a net win.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">HTML email with remote image blocking.</strong> Many email clients (Outlook, Apple Mail with privacy settings, corporate email) block externally hosted images by default. A logo or banner encoded inline as Base64 displays even when remote images are blocked. Keep total HTML size under the email client limits (typically 100 to 200KB).
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Single-file HTML deliverables.</strong> When you are generating a standalone HTML report, a self-contained email template, or a snapshot document that must contain all its assets inline — so it displays correctly when opened from disk without internet access. Reporting tools, audit exports, and generated invoices often use this pattern.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">API payloads and JSON data structures.</strong> When passing images through an API that accepts JSON, Base64 is often the required format. Vision AI APIs (including many LLM multimodal endpoints) accept images as Base64 strings in JSON request bodies. This is a data transport use case, not a performance one.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">CSS custom cursors and loading spinners.</strong> Browser CSS allows custom cursors via{" "}
            <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">cursor: url('data:...')</code>.
            Inlining the cursor image prevents a flash of the default cursor while the cursor image loads. Same logic applies for CSS loading spinners: inline the image to eliminate the load delay.
          </li>
        </ul>

        {/* ── Section 3: When NOT to use ─────────────────────────────────── */}

        <h2 id="when-not-to-use" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          When NOT to use Base64: the +33% problem
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Base64 encoding inflates file size by approximately 33% compared to the binary original. This is not a limitation of the tool — it is a mathematical property of the encoding: 3 binary bytes become 4 ASCII characters, which is a 4/3 ratio, or 33.3% overhead.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          For a 200KB JPEG, inlining it as Base64 in your HTML produces a 267KB string embedded in the HTML document. That bloat has two compounding consequences:
        </p>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">No independent browser cache.</strong> A standalone image file can be cached by the browser with a long{" "}
            <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">Cache-Control: max-age</code>{" "}
            header. After the first visit, the browser serves it from disk. An inlined Base64 string lives inside the HTML document — when the HTML changes, the entire document re-downloads, including the re-encoded image bytes.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Larger initial payload = slower Time to First Byte and LCP.</strong> A large Base64 blob in your HTML or CSS bloats the document download, delays parsing, and postpones the Largest Contentful Paint. This is the opposite of what image optimization should accomplish.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">CDN and compression are less effective.</strong> Binary image files compressed with Brotli or Gzip shrink dramatically. A Base64 string also compresses, but the 33% overhead makes the starting point much larger. The CDN cannot serve the image file independently from the HTML if it is inlined.
          </li>
        </ul>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Image size (binary)</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Base64 size (approx.)</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Recommendation</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Under 2KB</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Under 2.7KB</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Safe to inline. Overhead minimal, HTTP request saved is a net win.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">2 to 10KB</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">2.7 to 13.3KB</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Case-by-case. Measure before committing. Useful for icons and small logos.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Over 10KB</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Over 13.3KB</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Do not inline. Serve as a separate file with cache-control headers.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Photographs</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Typically 100KB to 500KB encoded</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Never inline. Use a CDN and lazy loading.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The exception is email: in HTML email, the total document size limit matters more than caching concerns, because emails are not cached like web pages. Even in email, keep Base64-inlined images to the absolute minimum necessary.
        </p>

        {/* ── Section 4: How it works ────────────────────────────────────── */}

        <h2 id="how-it-works" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          How the browser encodes images without uploading
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The SammaPix Image to Base64 tool uses the{" "}
          <a href="https://developer.mozilla.org/en-US/docs/Web/API/FileReader" target="_blank" rel="noopener noreferrer" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">FileReader API</a>{" "}
          — a standard browser API that reads local files into memory without any network request. Here is the exact sequence:
        </p>

        <ol className="mb-4 space-y-3">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">You drop a file onto the tool or click to browse.</strong> The browser creates a File object pointing to the local file. No data has moved yet — the File object is just a reference.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">FileReader.readAsDataURL() is called on the File object.</strong> This is the key API. It reads the binary file data, encodes it as Base64, and prepends the Data URI prefix with the MIME type — all in memory, with no network I/O.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">The onload event fires with the result.</strong> The FileReader result property contains the complete Data URI string. The tool extracts this and displays it in the output field.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">The output is formatted according to the selected mode.</strong> Plain Base64 strips the{" "}
            <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">data:[type];base64,</code>{" "}
            prefix. Data URI keeps the full string. CSS wraps it in{" "}
            <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">background-image: url('...')</code>.
            HTML wraps it in an{" "}
            <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">&lt;img&gt;</code>{" "}
            tag with the appropriate attributes.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">You copy the output and paste it into your code.</strong> No file was transmitted anywhere. The entire operation happened in your browser tab.
          </li>
        </ol>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The FileReader API has been part of the HTML5 standard since 2012 and is supported in every modern browser including Chrome, Safari, Firefox, and Edge. It is the same API used by browser-based file editors, image processors, and drag-and-drop upload interfaces — except here the file data never leaves the browser because there is no upload step.
        </p>

        {/* ── Section 5: Output formats ──────────────────────────────────── */}

        <h2 id="output-formats" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Output formats: plain, Data URI, CSS, HTML
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The tool provides four output modes, each optimized for a different integration target:
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Mode</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Output format</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Best for</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Plain Base64</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-mono text-xs">iVBORw0KGgo...</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">API request bodies, JSON payloads, database storage, multimodal LLM APIs.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Data URI</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-mono text-xs">data:image/png;base64,...</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Anywhere a URL is accepted: img src, CSS url(), anchor href.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">CSS</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-mono text-xs">background-image: url('...')</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">CSS files, style attributes. Paste directly into a CSS rule.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">HTML</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-mono text-xs">&lt;img src="data:..." alt="..."&gt;</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">HTML documents, email templates, generated reports. Complete img tag ready to paste.</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ── Tool CTA #1 ─────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">Encode your image to Base64 now, no upload</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            Plain Base64, Data URI, CSS, or HTML output. Reverse decode also available. Runs entirely in your browser.
          </p>
          <Link
            href="/tools/image-to-base64"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
          >
            Open Image to Base64, Free <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
          </Link>
        </div>

        {/* ── Section 6: Step by step ───────────────────────────────────── */}

        <h2 id="step-by-step" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          How to encode an image to Base64, step by step
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The full process takes under 30 seconds:
        </p>

        <ol className="mb-4 space-y-3">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Go to sammapix.com/tools/image-to-base64</strong> in any modern browser. No account or signup required.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Drop your image or click to browse.</strong> Supported formats include JPEG, PNG, WebP, GIF, SVG, and AVIF. The file is read locally — nothing is transmitted.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Select your output mode.</strong> Choose Plain Base64, Data URI, CSS, or HTML depending on where you will paste the result.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Click Copy.</strong> The encoded string is copied to your clipboard. It is ready to paste directly into your editor, template, or API request.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Paste and test.</strong> If you used the HTML or CSS mode, paste the snippet into your markup and open the page in a browser to confirm the image renders correctly inline.
          </li>
        </ol>

        {/* ── Section 7: CSS usage ──────────────────────────────────────── */}

        <h2 id="css-usage" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Using Base64 in CSS background-image
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The CSS output mode produces a ready-to-use{" "}
          <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">background-image</code>{" "}
          declaration. Paste it into any CSS rule:
        </p>

        <div className="bg-gray-50 dark:bg-[#1E1E1E] border border-gray-200 dark:border-[#2A2A2A] rounded-md p-4 mb-4 overflow-x-auto">
          <pre className="text-xs font-mono text-gray-800 dark:text-[#E5E5E5] whitespace-pre-wrap break-all">
{`.icon-check {
  background-image: url('data:image/png;base64,iVBORw0KGgo...');
  background-size: contain;
  background-repeat: no-repeat;
  width: 16px;
  height: 16px;
}`}
          </pre>
        </div>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          This pattern is most effective for small UI icons that are used across many components. By embedding the icon in the CSS, you avoid one HTTP request per icon and ensure the icon loads at the same time as the stylesheet, with no flash of missing icon on first render.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          For SVG images, the CSS pattern is even more efficient. SVG is a text-based format and can sometimes be embedded directly (without Base64 encoding) using URL-encoded SVG. However, Base64-encoding SVG is simpler, more broadly supported, and avoids the escaping complexity of URL-encoding.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          If you need to convert an SVG file to a rasterized PNG before encoding (for compatibility with older email clients or browsers), use{" "}
          <Link href="/tools/svg-to-png" className="text-[#6366F1] hover:underline">SammaPix SVG to PNG</Link>{" "}
          first, then encode the PNG output to Base64 with this tool.
        </p>

        {/* ── Section 8: HTML email ─────────────────────────────────────── */}

        <h2 id="html-email-usage" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Embedding Base64 in HTML email
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Inline Base64 images are one of the few reliable techniques for making images appear in HTML email when remote image loading is disabled. The HTML output mode produces a complete img tag:
        </p>

        <div className="bg-gray-50 dark:bg-[#1E1E1E] border border-gray-200 dark:border-[#2A2A2A] rounded-md p-4 mb-4 overflow-x-auto">
          <pre className="text-xs font-mono text-gray-800 dark:text-[#E5E5E5] whitespace-pre-wrap break-all">
{`<img
  src="data:image/png;base64,iVBORw0KGgo..."
  alt="Company logo"
  width="120"
  height="40"
/>`}
          </pre>
        </div>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Practical guidelines for Base64 images in email:
        </p>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Keep total email HTML under 100KB.</strong> Gmail, Outlook, and Apple Mail clip emails exceeding approximately 102KB. A single large Base64 image can push a transactional email over this limit.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Always include width and height attributes.</strong> Email clients do not run JavaScript. Without width and height, images in emails collapse to zero dimensions until fully loaded.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Some spam filters flag large Base64 blobs.</strong> Inlining a large image can trigger spam scoring in aggressive filters. Keep Base64 images small (under 20KB encoded) and supplement with alt text.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Test in actual email clients before sending.</strong> Outlook desktop, Gmail web, Apple Mail, and mobile clients each handle Base64 differently. What renders correctly in one may not in another.
          </li>
        </ul>

        {/* ── Section 9: JavaScript snippet ─────────────────────────────── */}

        <h2 id="javascript-snippet" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          JavaScript snippet: encode any image in the browser
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          If you are building your own tool or need to encode images programmatically in JavaScript, the FileReader API is two dozen lines:
        </p>

        <div className="bg-gray-50 dark:bg-[#1E1E1E] border border-gray-200 dark:border-[#2A2A2A] rounded-md p-4 mb-4 overflow-x-auto">
          <pre className="text-xs font-mono text-gray-800 dark:text-[#E5E5E5] whitespace-pre">
{`/**
 * Encode a File or Blob to a Base64 Data URI.
 * Runs entirely client-side — no network request.
 */
function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result); // Data URI string
    reader.onerror = reject;
    reader.readAsDataURL(file); // Triggers the encode
  });
}

// Usage with a file input:
document.querySelector('#fileInput').addEventListener('change', async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const dataUri = await fileToBase64(file);
  console.log(dataUri);
  // → "data:image/png;base64,iVBORw0KGgo..."

  // Strip the prefix to get plain Base64:
  const base64Only = dataUri.split(',')[1];
  console.log(base64Only);
  // → "iVBORw0KGgo..."
});`}
          </pre>
        </div>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The{" "}
          <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">readAsDataURL</code>{" "}
          method does the encoding. The{" "}
          <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">reader.result</code>{" "}
          on the{" "}
          <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">onload</code>{" "}
          event is the complete Data URI. Splitting on the comma gives you the plain Base64. No library required. No upload. This is exactly what the SammaPix tool does under the hood.
        </p>

        {/* ── Tool CTA #2 ─────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">No JavaScript to write — use the tool directly</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            Drop any image, choose your output format, copy the result. No upload, no server. Free.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/tools/image-to-base64"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            >
              Open Image to Base64, Free <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link
              href="/blog/base64-to-image-converter"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
            >
              Decode Base64 back to image <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>
        </div>

        {/* ── Section 10: Comparison ────────────────────────────────────── */}

        <h2 id="comparison-table" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Inline Base64 vs external file: honest performance comparison
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The right choice between inlining an image as Base64 and serving it as a separate file depends on the image size, change frequency, and how many pages it appears on:
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Dimension</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Base64 inline</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">External file</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">HTTP requests</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">0 (image in document)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">1 per unique image URL</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">File size overhead</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">+33% vs binary</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">None (serves binary directly)</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Browser caching</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Not cached independently (part of document)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Cached by URL. Subsequent page loads serve from disk.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">CDN delivery</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Inline with the HTML — no independent CDN delivery</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">CDN serves from edge node closest to user</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Best for</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Small icons, email images, API payloads, single-file documents</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">All photographs, hero images, product images, large illustrations</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ── Section 11: Verify no upload ──────────────────────────────── */}

        <h2 id="verify-no-upload" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          How to verify no upload happens (DevTools)
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          You can verify that the tool is genuinely client-side in under two minutes:
        </p>

        <ol className="mb-4 space-y-3">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Open DevTools.</strong> Press F12 (Windows/Linux) or Command Option I (Mac).
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Go to the Network tab and clear existing requests.</strong> Make sure the tab is recording.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Drop your image into the tool.</strong> Watch the Network panel during the drop and encoding.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Observe: no outgoing requests during encoding.</strong> The only requests visible are the initial static page assets (JavaScript, CSS) loaded when you first opened the tool. No request carries your image file to any server. The encoding happens entirely in memory.
          </li>
        </ol>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          This is the definitive check. Tools that actually upload your file will show a POST or PUT request to their server during the drop or encode step. You will see none here because the FileReader API does not make network requests.
        </p>

        {/* ── Section 12: Related tools ──────────────────────────────────── */}

        <h2 id="related-tools" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Related tools
        </h2>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/image-to-base64" className="text-[#6366F1] hover:underline">Image to Base64</Link></strong>: the tool this article covers. Encode and decode. Four output modes. No upload.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/svg-to-png" className="text-[#6366F1] hover:underline">SVG to PNG</Link></strong>: rasterize an SVG to PNG before encoding. Useful when the target (email client, older browser) does not support SVG Data URIs. See the{" "}
            <Link href="/blog/svg-to-png-complete-guide-developers" className="text-[#6366F1] hover:underline">SVG to PNG developer guide</Link>.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/ico-generator" className="text-[#6366F1] hover:underline">ICO Generator</Link></strong>: generate a multi-size ICO favicon from a PNG. ICO files are often the source image for Base64 favicon embedding. See the{" "}
            <Link href="/blog/favicon-best-practices-2026" className="text-[#6366F1] hover:underline">favicon best practices guide</Link>.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/compress" className="text-[#6366F1] hover:underline">Compress Images</Link></strong>: reduce image file size before encoding to Base64. Smaller binary = smaller Base64 string = less overhead in your document. Always compress before encoding when file size matters.
          </li>
        </ul>

        {/* ── Tool CTA #3 ─────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">All browser-based. All free. No upload.</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            Image to Base64, SVG to PNG, ICO Generator, Compress — every tool runs locally in your browser. No signup, no server, no watermark.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/tools/image-to-base64"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
            >
              Image to Base64 <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link
              href="/tools/svg-to-png"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
            >
              SVG to PNG <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link
              href="/tools/ico-generator"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
            >
              ICO Generator <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link
              href="/tools/compress"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
            >
              Compress Images <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
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

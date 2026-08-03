import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { APP_URL } from "@/lib/constants";
import BlogArticleLayout from "@/components/blog/BlogArticleLayout";

// ── Metadata ──────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Base64 to Image: Decode & Download Free [2026]",
  description:
    "Paste any Base64 string or Data URI and decode it back to a previewable, downloadable PNG or JPG — 100% in your browser. No upload, no server, no signup. Also supports reverse encode. Free.",
  alternates: {
    canonical: `${APP_URL}/blog/base64-to-image-converter`,
  },
  keywords: [
    "base64 to image",
    "decode base64 image",
    "base64 to png",
    "base64 to jpg",
    "base64 image decoder",
    "data uri to image",
    "base64 decode image online",
    "convert base64 to image",
    "base64 image converter",
    "base64 to image online free",
    "decode data uri image",
    "base64 png decoder",
    "base64 image viewer",
    "render base64 image",
    "base64 to image download",
  ],
  openGraph: {
    title: "Base64 to Image: Decode & Download Free [2026]",
    description:
      "Paste a Base64 string or Data URI and decode it back to an image in your browser. No upload, no server. Preview + download PNG/JPG. Free.",
    url: `${APP_URL}/blog/base64-to-image-converter`,
    type: "article",
    publishedTime: "2026-08-03",
    authors: ["https://lucasammarco.com"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Base64 to Image: Decode & Download Free [2026]",
    description:
      "Paste Base64 or Data URI, get image preview + download. Runs in your browser — no upload. Also encodes image to Base64. Free.",
    creator: "@lucasammarco",
  },
};

// ── Schema constants ──────────────────────────────────────────────────────────

const POST_DATE = "2026-08-03";
const POST_DATE_FORMATTED = "August 3, 2026";
const POST_URL = `${APP_URL}/blog/base64-to-image-converter`;
const POST_TITLE = "Base64 to Image: Decode & Download Free [2026]";

// ── Article schema ────────────────────────────────────────────────────────────

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: POST_TITLE,
  description:
    "How to decode a Base64 string or Data URI back to an image — preview it in a browser and download it as PNG or JPG — without uploading to any server. Covers the practical use cases: debugging API responses, recovering inline email images, verifying encoded assets, and checking JSON payloads that contain Base64-encoded image fields.",
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
    "base64 to image",
    "decode base64 image",
    "base64 to png",
    "data uri to image",
    "base64 image decoder",
    "convert base64 to image",
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
  name: "How to Decode a Base64 String Back to an Image",
  description:
    "Paste a Base64 string or Data URI into SammaPix Image to Base64 and decode it back to a previewable, downloadable image. Runs entirely in your browser — no upload, no server, no signup.",
  totalTime: "PT1M",
  tool: [
    {
      "@type": "HowToTool",
      name: "SammaPix Image to Base64 (decode mode, browser-based, free, no upload)",
    },
  ],
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Open the Image to Base64 tool",
      text: "Go to sammapix.com/tools/image-to-base64 in any modern browser.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Switch to the Decode tab",
      text: "Click the Decode (Base64 to Image) tab to switch from encode mode to decode mode.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Paste your Base64 string or Data URI",
      text: "Paste the Base64 string (plain or with the data:[type];base64, prefix) into the input field. The tool accepts both plain Base64 and full Data URIs.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Preview the decoded image",
      text: "The tool decodes the string and renders a preview of the image immediately. You can verify the image visually before downloading.",
    },
    {
      "@type": "HowToStep",
      position: 5,
      name: "Download the image file",
      text: "Click Download to save the decoded image as a PNG or JPG file. The file is served from browser memory — no network request occurs.",
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
      name: "What is Base64 decoding and why would a developer need it?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Base64 decoding is the reverse of Base64 encoding: it converts an ASCII string (the encoded representation of binary data) back into the original binary data. Developers need it when they encounter a Base64 string in an API response, a JSON payload, a log file, or an HTML email source and need to see what image it represents. Common scenarios include debugging a REST or GraphQL API that returns image thumbnails as Base64, inspecting the content of a data URI embedded in a CSS file, recovering an image from an email template where images were inlined instead of hosted externally, and verifying that a Base64 value produced by your application encodes the correct image.",
      },
    },
    {
      "@type": "Question",
      name: "Does the tool accept both plain Base64 and Data URIs?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Plain Base64 is the raw encoded string with no prefix — for example, iVBORw0KGgoAAAA... A Data URI includes a MIME type prefix: data:image/png;base64,iVBORw0KGgoAAAA... The tool accepts both formats automatically. If you paste a plain Base64 string without the prefix, the tool infers the image type from the leading bytes of the decoded data (the magic bytes) and renders the preview accordingly. If you paste a Data URI, the MIME type from the prefix is used directly.",
      },
    },
    {
      "@type": "Question",
      name: "What image formats can be decoded?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Any image format your browser can render can be decoded and previewed. This includes JPEG, PNG, WebP, GIF (including animated GIFs), SVG, AVIF, and ICO. The decoding itself is format-agnostic — the browser's built-in image decoder handles the format after the Base64 string is decoded back to binary. If the Base64 string encodes a valid image in any browser-supported format, the tool will render it.",
      },
    },
    {
      "@type": "Question",
      name: "Does this tool upload my Base64 string to a server?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. The decoding happens entirely in your browser. The Base64 string is decoded to binary using the browser's built-in atob() function, then set as the src of an img element for preview. The img src is a Blob URL created from browser memory. No network request is made during decoding or preview. You can verify this by opening DevTools (F12), going to the Network tab, and watching while you paste and decode a Base64 string. You will see zero outgoing requests during the decode or preview step. This matters when the Base64 string encodes confidential content — internal screenshots, proprietary assets, or images extracted from private API responses.",
      },
    },
    {
      "@type": "Question",
      name: "How do I decode a Base64 image embedded in a JSON API response?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most REST and GraphQL APIs that return images as Base64 encode them in a JSON field. To decode: copy the value of the field (the Base64 string) from the API response, paste it into the decode input of the tool, and preview the result. If the JSON field is a plain Base64 string without a Data URI prefix, the tool handles it correctly. If the string has no MIME type context, try pasting it as-is first. If the preview does not render, add the appropriate Data URI prefix — for example, data:image/png;base64,[your string] — and try again. JPEG and PNG are the most common formats for API image responses.",
      },
    },
    {
      "@type": "Question",
      name: "Can I decode an animated GIF from Base64?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. If the Base64 string encodes an animated GIF, the preview will display the animation. The browser's native GIF decoder handles the animation frames after the binary is decoded from Base64. The download will produce an animated .gif file that plays correctly in browsers, Discord, Slack, email clients, and any other context that supports animated GIFs. Note that animated GIFs are typically large files — a 5-second, 480px GIF might be 2 to 10MB in binary, which becomes 2.7 to 13.3MB as Base64. This is a case where the GIF-to-MP4 conversion is worth considering for web use.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between base64 decode and image reverse-engineering?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Base64 decoding simply reverses the text encoding step. It does not reverse the image compression, remove filters, or reconstruct original RAW data. If someone JPEG-compressed a photo and then Base64-encoded the JPEG, decoding gives you the JPEG — not the original uncompressed photo. The lossy compression is permanent. Base64 is a lossless encoding applied on top of whatever binary format the image already is. Decoding recovers exactly the binary that was encoded — whether that is a lossless PNG, a lossy JPEG, or any other format. No quality is lost by the Base64 encoding/decoding cycle itself.",
      },
    },
  ],
};

// ── Page ──────────────────────────────────────────────────────────────────────

export default function Base64ToImageConverterPage() {
  return (
    <>
      <BlogArticleLayout
        title={POST_TITLE}
        slug="base64-to-image-converter"
        description="You have a Base64 string — in an API response, a JSON payload, an email template, or a CSS file — and you need to see the image it represents. SammaPix Image to Base64 decodes any Base64 string or Data URI back to a previewable, downloadable image, entirely in your browser. No upload, no server, no signup. This guide covers how decoding works, the practical dev scenarios where you need it, and when inline Base64 makes sense versus when it hurts performance."
        date={POST_DATE}
        dateFormatted={POST_DATE_FORMATTED}
        tags={["Performance", "Workflow"]}
        readingTime={10}
        headings={[
          { id: "why-decode", title: "Why developers need to decode Base64 images" },
          { id: "what-is-decoding", title: "What Base64 decoding actually does" },
          { id: "how-browser-decodes", title: "How the browser decodes Base64 without uploading" },
          { id: "step-by-step", title: "How to decode a Base64 string to an image, step by step" },
          { id: "api-response", title: "Decoding Base64 images from API responses" },
          { id: "email-templates", title: "Recovering images from HTML email templates" },
          { id: "css-extraction", title: "Extracting images from CSS background-image Data URIs" },
          { id: "javascript-snippet", title: "JavaScript snippet: decode Base64 to an image in the browser" },
          { id: "when-to-use-inline", title: "When inline Base64 is worth it and when it is not" },
          { id: "comparison", title: "Data URI inline vs external file: the tradeoff table" },
          { id: "verify-no-upload", title: "How to verify no upload happens (DevTools)" },
          { id: "related-tools", title: "Related tools" },
          { id: "faq", title: "FAQ" },
        ]}
        summary={[
          "Base64 decoding reverses the encoding step: it converts an ASCII string back into binary image data that can be previewed and downloaded.",
          "The main practical use cases are debugging API responses with inline images, recovering images from HTML email sources, and inspecting CSS Data URIs.",
          "SammaPix Image to Base64 decodes Base64 strings and Data URIs 100% in your browser. No string is uploaded to any server.",
          "Accepts both plain Base64 (no prefix) and full Data URIs (with the data:[type];base64, prefix). Format is auto-detected.",
          "The decoded image can be previewed and downloaded as PNG or JPG directly from browser memory.",
          "Base64 encoding adds 33% size overhead and eliminates independent browser caching — valid for small icons and email images, harmful for photos and large assets.",
        ]}
        heroImage={
          <figure>
            <img
              src="https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="A developer inspecting code on a screen, representing the need to decode Base64 strings in API responses and email templates back to viewable images."
              className="w-full max-h-[460px] object-cover rounded-lg"
              loading="eager"
            />
            <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
              Base64-encoded images appear as long strings in API responses, JSON payloads, and email HTML. Decoding them back to a viewable image is a common dev need.
            </figcaption>
          </figure>
        }
        ctaBlock={
          <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2">
              Decode any Base64 string to an image right now
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-4">
              Paste plain Base64 or a Data URI. Preview and download. Runs entirely in your browser — no upload, no server, no signup. Free.
            </p>
            <div className="flex flex-wrap gap-3 items-center">
              <Link
                href="/tools/image-to-base64"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
              >
                Open Image to Base64 (Decode), Free
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
              <Link
                href="/blog/image-to-base64-online"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
              >
                Encode image to Base64 guide <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
            </div>
          </div>
        }
      >

        {/* ── Section 1: Why decode ──────────────────────────────────────── */}

        <h2 id="why-decode" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Why developers need to decode Base64 images
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Base64-encoded images appear in more places than most developers expect. You encounter them when you are not looking for them: a long opaque string in a JSON response, an incomprehensible blob in a CSS file, or a massive src attribute in an HTML email template you are debugging.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          In each of those cases, the question is the same: what does this string actually look like as an image? The answer requires decoding — converting the ASCII string back to binary, then rendering it as an image. A web browser can do this natively in under a millisecond. The problem is that most developers do not have a quick, trustworthy tool to do it without copy-pasting into a site that uploads the string to a server.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          I built the decode mode of{" "}
          <Link href="/tools/image-to-base64" className="text-[#6366F1] hover:underline">SammaPix Image to Base64</Link>{" "}
          to handle this in your browser, with no server involved. Paste the string, see the image, download it if needed. The entire operation is local.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          The four main scenarios
        </h3>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Debugging an API response.</strong> A REST or GraphQL API returns an image field as Base64 in a JSON body. You need to verify the server is encoding the correct image — not a blank placeholder, not an error image, not a corrupted encode.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Recovering images from HTML email source.</strong> An email template inlines images as Base64 instead of hosting them externally. You want to extract the image to save or reuse it without the Base64 wrapper.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Inspecting a CSS Data URI.</strong> A stylesheet uses{" "}
            <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">background-image: url('data:image/...')</code>{" "}
            for an icon. You want to see what the icon looks like without adding it to an HTML file first.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Verifying a vision AI API integration.</strong> Your code extracts or generates a Base64 image for a multimodal LLM API (such as Claude, GPT-4o, or Gemini). You want to confirm the image your code sends is the right one before making the API call.
          </li>
        </ul>

        {/* ── Section 2: What is decoding ───────────────────────────────── */}

        <h2 id="what-is-decoding" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          What Base64 decoding actually does
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Base64 encoding converts 3 bytes of binary data into 4 ASCII characters. Decoding reverses this: every 4 ASCII characters in the Base64 string are converted back to 3 binary bytes. The output of decoding a Base64-encoded image is the original binary file — a JPEG, PNG, WebP, or whatever format was encoded.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Base64 is a lossless encoding. The decode step recovers every bit of the original binary exactly. There is no quality change during encoding or decoding. If you encode a JPEG and then decode it, you have the exact original JPEG bytes. The lossy compression was already applied when the JPEG was created — Base64 does not add or remove any compression.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          A Data URI is a Base64 string with a MIME type prefix:
        </p>

        <div className="bg-gray-50 dark:bg-[#1E1E1E] border border-gray-200 dark:border-[#2A2A2A] rounded-md p-4 mb-4 overflow-x-auto">
          <pre className="text-xs font-mono text-gray-800 dark:text-[#E5E5E5] whitespace-pre-wrap break-all">
{`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==`}
          </pre>
        </div>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The part before the comma is the preamble (scheme + MIME type). The part after the comma is the Base64-encoded binary. Decoding the Data URI means stripping the preamble, Base64-decoding the payload, and creating a binary Blob of the specified MIME type. A browser can then display that Blob as an image.
        </p>

        {/* ── Section 3: How browser decodes ────────────────────────────── */}

        <h2 id="how-browser-decodes" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          How the browser decodes Base64 without uploading
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Modern browsers have two built-in mechanisms for Base64 decoding. The tool uses both:
        </p>

        <ol className="mb-4 space-y-3">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">If the input is a Data URI,</strong> the tool sets it directly as the{" "}
            <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">src</code>{" "}
            of an img element. Browsers natively decode Data URI image sources — this is part of the HTML specification. No decode code is needed; the browser handles it.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">If the input is plain Base64 without a prefix,</strong> the tool uses{" "}
            <a href="https://developer.mozilla.org/en-US/docs/Web/API/atob" target="_blank" rel="noopener noreferrer" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">atob()</a>{" "}
            — the browser's built-in Base64 decode function — to convert the string to binary, then wraps the binary in a{" "}
            <a href="https://developer.mozilla.org/en-US/docs/Web/API/Blob" target="_blank" rel="noopener noreferrer" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">Blob</a>{" "}
            with the detected MIME type. The Blob is turned into a{" "}
            <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">blob:</code>{" "}
            URL and set as the img src.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">The image renders in the preview without any network request.</strong> The binary is in browser memory. The img src is a{" "}
            <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">blob:</code>{" "}
            URL that references local memory, not a remote server.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Download creates an anchor pointing to the same Blob URL.</strong> Clicking Download triggers a browser-native download from memory. No network request.
          </li>
        </ol>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The{" "}
          <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">atob()</code>{" "}
          function has been part of the browser standard since Internet Explorer 10. It is the symmetric counterpart to{" "}
          <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">btoa()</code>{" "}
          (encode). Both are synchronous, in-memory operations with zero network involvement.
        </p>

        {/* ── Section 4: Step by step ────────────────────────────────────── */}

        <h2 id="step-by-step" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          How to decode a Base64 string to an image, step by step
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The decode process takes under 30 seconds:
        </p>

        <ol className="mb-4 space-y-3">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Go to sammapix.com/tools/image-to-base64.</strong> No account or signup required.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Switch to the Decode tab.</strong> The tool has two modes: encode (image to Base64) and decode (Base64 to image). Click the Decode tab.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Paste your Base64 string or Data URI.</strong> The tool accepts both. If you paste a plain Base64 string (no prefix), the MIME type is inferred from the first bytes of the decoded binary. If you paste a Data URI (with the{" "}
            <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">data:[type];base64,</code>{" "}
            prefix), the MIME type is taken from the prefix.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Preview the image.</strong> The decoded image renders in the preview immediately. Verify it is the correct image before downloading.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Click Download.</strong> The image is downloaded as a file from browser memory. No network request occurs.
          </li>
        </ol>

        {/* ── Tool CTA #1 ─────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">Decode your Base64 string to an image now</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            Paste plain Base64 or Data URI. Preview. Download. No upload. Runs in your browser. Free.
          </p>
          <Link
            href="/tools/image-to-base64"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
          >
            Open Image to Base64 (Decode), Free <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
          </Link>
        </div>

        {/* ── Section 5: API response ───────────────────────────────────── */}

        <h2 id="api-response" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Decoding Base64 images from API responses
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Many APIs return images as Base64 in JSON responses. Examples include vision AI APIs that return annotated images, thumbnail generation services that return Base64-encoded previews, and document processing APIs that return extracted images from PDFs.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          A typical JSON API response with an image field looks like this:
        </p>

        <div className="bg-gray-50 dark:bg-[#1E1E1E] border border-gray-200 dark:border-[#2A2A2A] rounded-md p-4 mb-4 overflow-x-auto">
          <pre className="text-xs font-mono text-gray-800 dark:text-[#E5E5E5] whitespace-pre-wrap break-all">
{`{
  "id": "img_001",
  "format": "image/png",
  "data": "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
}`}
          </pre>
        </div>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          To decode this in the tool: copy the value of the{" "}
          <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">data</code>{" "}
          field (the string starting with{" "}
          <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">iVBOR...</code>),
          paste it into the decode input, and click Decode. The tool infers PNG from the leading bytes and renders the preview.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          If the API response provides a complete Data URI in the field value — such as{" "}
          <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">data:image/png;base64,iVBOR...</code>{" "}
          — paste the full string. The tool handles the prefix automatically.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Common image formats returned by APIs
        </h3>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Format</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Base64 prefix (magic bytes)</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Common API source</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">PNG</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-mono text-xs">iVBOR...</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Screenshot APIs, canvas exports, thumbnail generators</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">JPEG</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-mono text-xs">/9j/4...</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Camera APIs, photo processing APIs, vision AI results</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">WebP</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-mono text-xs">UklGR...</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Modern image APIs, web-optimized thumbnail services</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">GIF</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-mono text-xs">R0lGO...</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Animation generation APIs, legacy image services</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ── Section 6: Email templates ────────────────────────────────── */}

        <h2 id="email-templates" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Recovering images from HTML email templates
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          HTML email templates sometimes inline images as Base64 — typically logos, dividers, buttons, or icons — to ensure they display even when the recipient's email client blocks remote images. When you are tasked with updating or reusing an email template, you may need to extract those images.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The workflow:
        </p>

        <ol className="mb-4 space-y-3">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Open the email HTML source.</strong> In most email clients, you can view the raw HTML of a received email. Copy the HTML. In Gmail: three-dot menu, Show original. In Outlook: File, Properties, Internet headers (limited) — or forward as attachment and open the .eml file in a text editor.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Find the img tags with Base64 src values.</strong> Search for{" "}
            <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">src="data:image/</code>{" "}
            in the HTML. Each match is an inline Base64 image.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Copy the Data URI (starting from{" "}<code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">data:</code>{" "}and ending at the closing quote).</strong>
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Paste into the decode input and download.</strong> You now have the original image file.
          </li>
        </ol>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          This is also useful when auditing an email template for performance: every Base64 image adds to the email HTML size. Extracting and measuring each decoded image helps you decide which to keep inline versus host externally.
        </p>

        {/* ── Section 7: CSS extraction ─────────────────────────────────── */}

        <h2 id="css-extraction" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Extracting images from CSS background-image Data URIs
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          CSS files sometimes include Base64-encoded images as{" "}
          <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">background-image</code>{" "}
          values — particularly for small icons, spinners, and decorative elements. If you are working with a CSS file you did not author and need to see or extract those images:
        </p>

        <div className="bg-gray-50 dark:bg-[#1E1E1E] border border-gray-200 dark:border-[#2A2A2A] rounded-md p-4 mb-4 overflow-x-auto">
          <pre className="text-xs font-mono text-gray-800 dark:text-[#E5E5E5] whitespace-pre-wrap break-all">
{`.icon-check {
  background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZD0iTTkgMTYuMTdMNC44MyAxMmwtMS40MiAxLjQxTDkgMTkgMjEgN2wtMS40MS0xLjQxTDkgMTYuMTd6Ii8+PC9zdmc+');
  background-size: 16px 16px;
  width: 16px;
  height: 16px;
}`}
          </pre>
        </div>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          To extract the image: copy the Data URI value between the single quotes inside{" "}
          <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">url('...')</code>,
          paste it into the decode input, and download. The example above is an SVG encoded in Base64 — the decoded file would be an SVG that you can then edit directly.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Note that some CSS Data URIs use URL encoding instead of Base64 for SVG:
          {" "}<code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">url("data:image/svg+xml,%3Csvg...")</code>.
          That is a different encoding — URL percent-encoding, not Base64 — and the decode tool handles Base64 only. For URL-encoded SVG in CSS, use a URL decode tool or copy the raw SVG source from the HTML and save it directly.
        </p>

        {/* ── Section 8: JavaScript snippet ─────────────────────────────── */}

        <h2 id="javascript-snippet" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          JavaScript snippet: decode Base64 to an image in the browser
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          If you are building a tool or debugging in the browser console, this is the minimal code to decode a Base64 string to a downloadable image:
        </p>

        <div className="bg-gray-50 dark:bg-[#1E1E1E] border border-gray-200 dark:border-[#2A2A2A] rounded-md p-4 mb-4 overflow-x-auto">
          <pre className="text-xs font-mono text-gray-800 dark:text-[#E5E5E5] whitespace-pre">
{`/**
 * Decode a Base64 string or Data URI to a downloadable image.
 * Runs entirely client-side — no network request.
 */
function base64ToImageBlob(base64OrDataUri, mimeType = 'image/png') {
  // Strip the Data URI prefix if present
  const base64 = base64OrDataUri.includes(',')
    ? base64OrDataUri.split(',')[1]
    : base64OrDataUri;

  // Detect mimeType from prefix if available
  if (base64OrDataUri.startsWith('data:')) {
    mimeType = base64OrDataUri.split(';')[0].replace('data:', '');
  }

  // Decode Base64 to binary string
  const byteString = atob(base64);

  // Convert to Uint8Array
  const bytes = new Uint8Array(byteString.length);
  for (let i = 0; i < byteString.length; i++) {
    bytes[i] = byteString.charCodeAt(i);
  }

  return new Blob([bytes], { type: mimeType });
}

// Usage: decode and trigger download
function downloadBase64Image(base64OrDataUri, filename = 'image.png') {
  const blob = base64ToImageBlob(base64OrDataUri);
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url); // Release memory
}

// Example: paste into browser console with a real Base64 value
downloadBase64Image('data:image/png;base64,iVBORw0KGgo...', 'decoded.png');`}
          </pre>
        </div>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The core is{" "}
          <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">atob()</code>{" "}
          — the browser's built-in Base64 decoder. No library required. The{" "}
          <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">URL.createObjectURL(blob)</code>{" "}
          creates a temporary{" "}
          <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">blob:</code>{" "}
          URL pointing to browser memory. No network request. You can paste this into the browser console directly to test without writing a full application.
        </p>

        {/* ── Tool CTA #2 ─────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">No code required — use the tool directly</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            Paste your Base64 string or Data URI. Preview. Download. No upload, no server. Free.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/tools/image-to-base64"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            >
              Open Image to Base64 (Decode), Free <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link
              href="/blog/image-to-base64-online"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
            >
              Encode image to Base64 guide <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>
        </div>

        {/* ── Section 9: When to use inline ─────────────────────────────── */}

        <h2 id="when-to-use-inline" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          When inline Base64 is worth it and when it is not
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Whether decoding a Base64 string as part of an email audit or encoding an image for inline CSS, the core question is the same: is inlining the right call? Here is the practical decision framework:
        </p>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Inline is worth it when the image is small (under 5 to 10KB) and appears on every page.</strong> A 1KB spinner icon inlined in CSS saves an HTTP round-trip on every page load. The 33% encoding overhead on 1KB is 1.33KB — negligible. The saved request is real.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Inline is worth it for HTML email when remote images are blocked.</strong> A small logo inlined ensures it appears for recipients who have image blocking enabled. Keep the image under 20KB binary (27KB encoded) to stay well within email HTML size limits.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Do not inline photographs or large images.</strong> A 200KB JPEG becomes 267KB of Base64 string. That string lives in your HTML or CSS document, preventing independent browser caching, bloating the initial payload, and slowing Time to First Byte. Serve large images as standalone files from a CDN.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Do not inline images that change frequently.</strong> Every change to an inlined image requires the entire HTML or CSS document to be invalidated and re-downloaded. Images served as separate files can be cache-busted independently with a query string or content hash.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Always compress before encoding.</strong> If you are going to inline an image, compress it first with the{" "}
            <Link href="/tools/compress" className="text-[#6366F1] hover:underline">SammaPix Compress tool</Link>{" "}
            to minimize the binary size. A smaller binary produces a shorter Base64 string and reduces the overhead.
          </li>
        </ul>

        {/* ── Section 10: Comparison table ──────────────────────────────── */}

        <h2 id="comparison" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Data URI inline vs external file: the tradeoff table
        </h2>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Factor</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Base64 inline (Data URI)</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">External file (URL)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Size overhead</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">+33% vs binary</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">None. Binary served directly.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">HTTP requests eliminated</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">1 per inlined image</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">0 eliminated. 1 request per image.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Browser caching</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Not independently cached. Part of the document.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Cached by URL. Served from disk on repeat visits.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">CDN optimization</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Not separately edge-cached</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Served from nearest edge node</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Works when image loading disabled</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Yes (email clients, content blockers)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">No — blocked if remote images are disabled</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Best for</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Tiny icons, email images, API payloads, self-contained HTML</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Everything else — all photos, illustrations, large assets</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ── Section 11: Verify no upload ──────────────────────────────── */}

        <h2 id="verify-no-upload" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          How to verify no upload happens (DevTools)
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          This matters particularly when the Base64 string you are decoding represents a confidential image — an internal screenshot, a document scan, or a private asset extracted from an API response. Here is how to verify the decode is local:
        </p>

        <ol className="mb-4 space-y-3">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Open DevTools.</strong> Press F12 (Windows/Linux) or Command Option I (Mac).
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Go to the Network tab and clear any existing requests.</strong>
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Paste your Base64 string into the decode input and trigger the decode.</strong>
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Observe: no outgoing requests.</strong> During the decode and preview, you will see no POST, PUT, or GET request carrying your Base64 string to any server. The decode happens in memory via{" "}
            <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">atob()</code>.
            The image preview is rendered from a{" "}
            <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">blob:</code>{" "}
            URL. Nothing leaves your browser tab.
          </li>
        </ol>

        {/* ── Section 12: Related tools ──────────────────────────────────── */}

        <h2 id="related-tools" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Related tools
        </h2>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/image-to-base64" className="text-[#6366F1] hover:underline">Image to Base64</Link></strong>: the tool this article covers (decode mode). Also encodes images to Base64 with four output formats. See the{" "}
            <Link href="/blog/image-to-base64-online" className="text-[#6366F1] hover:underline">encode guide</Link>{" "}
            for the full encoding workflow.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/compress" className="text-[#6366F1] hover:underline">Compress Images</Link></strong>: reduce image file size before encoding to Base64. Smaller binary = shorter Base64 string = less payload bloat when inlining.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/svg-to-png" className="text-[#6366F1] hover:underline">SVG to PNG</Link></strong>: rasterize SVG files to PNG before encoding. Useful for email clients that do not support SVG Data URIs. See the full{" "}
            <Link href="/blog/svg-to-png-complete-guide-developers" className="text-[#6366F1] hover:underline">SVG to PNG developer guide</Link>.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/ico-generator" className="text-[#6366F1] hover:underline">ICO Generator</Link></strong>: create multi-size ICO favicon files from PNG. ICO favicons are sometimes distributed as Base64 for embedding in single-file HTML tools and reports.
          </li>
        </ul>

        {/* ── Tool CTA #3 ─────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">All in-browser. No upload. No server.</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            Decode Base64 to image, encode image to Base64, compress, convert SVG to PNG — every tool runs locally in your browser. Free, no signup.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/tools/image-to-base64"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
            >
              Image to Base64 <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link
              href="/tools/compress"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
            >
              Compress Images <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
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

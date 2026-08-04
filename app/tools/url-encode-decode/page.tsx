import type { Metadata } from "next";
import { APP_URL } from "@/lib/constants";
import UrlEncodeDecodeClient from "@/components/tools/UrlEncodeDecodeClient";
import RelatedTools from "@/components/tools/RelatedTools";
import Link from "next/link";

const TOOL_URL = `${APP_URL}/tools/url-encode-decode`;

// ── Metadata ──────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Free URL Encoder / Decoder Online: No Upload",
  description:
    "Encode or decode URL / percent-encoded text instantly in your browser — no upload, no signup. Supports encodeURIComponent and encodeURI with live output.",
  keywords: [
    "url encode decode",
    "url encoder",
    "url decoder",
    "percent encoding",
    "encode url online",
    "decode url no upload",
    "encodeURIComponent online",
    "encodeURI online",
    "url percent encode",
    "percent decode online",
    "url encoding tool",
    "browser url encoder",
  ],
  alternates: {
    canonical: TOOL_URL,
  },
  openGraph: {
    title: "Free URL Encoder / Decoder Online — No Upload",
    description:
      "Encode or decode URL percent-encoded text instantly in your browser. Supports encodeURIComponent (query params) and encodeURI (full URLs). Nothing is ever uploaded.",
    url: TOOL_URL,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free URL Encoder / Decoder Online — No Upload",
    description:
      "Encode or decode percent-encoded URLs instantly in your browser. encodeURIComponent + encodeURI. 100% client-side, no upload, no signup.",
  },
};

// ── JSON-LD Schemas ───────────────────────────────────────────────────────────

const softwareAppSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Free URL Encoder / Decoder",
  description:
    "Encode or decode URL percent-encoded text instantly in your browser using native JavaScript functions (encodeURIComponent / decodeURIComponent and encodeURI / decodeURI). No upload, no account required.",
  url: TOOL_URL,
  applicationCategory: "UtilitiesApplication",
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
    "URL encode text with encodeURIComponent (query parameters, path segments)",
    "URL encode text with encodeURI (full URL preservation)",
    "URL decode with decodeURIComponent and decodeURI",
    "Honest error message on malformed percent-encoded input",
    "Swap button to pipe output back to input and toggle mode",
    "Live output — updates as you type with a light debounce",
    "100% private — no data ever leaves your browser",
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is my text uploaded to any server?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. This tool uses native JavaScript functions (encodeURIComponent, encodeURI, decodeURIComponent, decodeURI) that run entirely inside your browser. No text is ever sent to a server.",
      },
    },
    {
      "@type": "Question",
      name: "What is percent-encoding (URL encoding)?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Percent-encoding (also called URL encoding) is a mechanism for representing special characters in a URL using a percent sign followed by two hexadecimal digits — for example, a space becomes %20 and a forward slash becomes %2F. It ensures that URLs remain valid and unambiguous across all HTTP clients and servers.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between encodeURIComponent and encodeURI?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "encodeURIComponent encodes almost every character except A-Z, a-z, 0-9, -, _, ., !, ~, *, ', (, and ). It is the right choice for encoding individual query parameter values, path segments, or any string that will be embedded inside a URL. encodeURI leaves URL structure characters alone (: / ? # [ ] @ ! $ & ' ( ) * + , ; =) because they carry syntactic meaning in a full URL. Use encodeURI when you have a complete URL and only want to sanitize unsafe characters without breaking its structure.",
      },
    },
    {
      "@type": "Question",
      name: "What happens when I decode malformed input?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "If the input contains an invalid percent sequence — for example %GG or a lone percent sign at the end — the native decodeURIComponent function throws a URIError. This tool catches that error and shows an honest message instead of crashing or returning garbage.",
      },
    },
    {
      "@type": "Question",
      name: "What does the Swap button do?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Swap moves the current output into the input field and flips the mode (Encode becomes Decode and vice versa). This lets you chain operations — for example, encode some text, then immediately decode it back to verify round-trip fidelity.",
      },
    },
    {
      "@type": "Question",
      name: "Is this tool free to use?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, completely free. There is no file size limit, no account, no signup, and no usage cap. It runs entirely in your browser with no server involved.",
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
    { "@type": "ListItem", position: 3, name: "URL Encoder / Decoder", item: TOOL_URL },
  ],
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to URL-encode or decode text online for free",
  description:
    "Encode or decode percent-encoded text instantly in your browser using native JS functions — no upload, no account.",
  totalTime: "PT1M",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Choose Encode or Decode mode",
      text: "Click the Encode tab to convert plain text to percent-encoded form, or the Decode tab to convert percent-encoded text back to readable form.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Select Component or Full URL mode and type your input",
      text: "Pick encodeURIComponent (default, for query params and path segments) or encodeURI (for a complete URL). Then type or paste your text into the input area — the output updates instantly.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Copy the result or Swap for chained operations",
      text: "Click Copy to copy the output to your clipboard. Use the Swap button to pipe the output back as input in the opposite mode, useful for round-trip testing.",
    },
  ],
};

// ── Page ──────────────────────────────────────────────────────────────────────

export default function UrlEncodeDecodePage() {
  return (
    <>
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

      {/* ── Hero split ── */}
      <div className="bg-white dark:bg-[#191919] border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-10 pb-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-[11px] text-[#A3A3A3] mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-[#525252] transition-colors">Home</Link>
            <span>/</span>
            <Link href="/tools" className="hover:text-[#525252] transition-colors">Tools</Link>
            <span>/</span>
            <span className="text-[#525252] dark:text-[#737373]">URL Encoder / Decoder</span>
          </nav>

          {/* Title block */}
          <div className="flex items-start gap-4 mb-6">
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: "#6366F114" }}
              aria-hidden="true"
            >
              {/* Inline hero icon — URL text transforming to %XX */}
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <style>{`
                  @keyframes ued-text-out {
                    0%, 20% { opacity: 1; transform: translateX(0px); }
                    40%      { opacity: 0; transform: translateX(-6px); }
                    100%     { opacity: 0; transform: translateX(-6px); }
                  }
                  @keyframes ued-pct-in {
                    0%, 38% { opacity: 0; transform: translateX(6px); }
                    58%, 88%{ opacity: 1; transform: translateX(0px); }
                    100%     { opacity: 0; transform: translateX(0px); }
                  }
                  @keyframes ued-arrow {
                    0%, 30% { transform: translateX(-1px); opacity: 0.5; }
                    55%     { transform: translateX(2px); opacity: 1; }
                    80%, 100% { transform: translateX(-1px); opacity: 0.5; }
                  }
                  .ued-text { animation: ued-text-out 2.6s cubic-bezier(0.4,0,0.2,1) infinite; }
                  .ued-pct  { animation: ued-pct-in  2.6s cubic-bezier(0.34,1.4,0.64,1) infinite; }
                  .ued-arr  { animation: ued-arrow   2.6s ease-in-out infinite; }
                `}</style>
                {/* Input box */}
                <rect x="2" y="16" width="18" height="16" rx="2.5" fill="#6366F1" fillOpacity="0.1" stroke="#6366F1" strokeWidth="1.25"/>
                <g className="ued-text">
                  <text x="11" y="27" fontSize="7" fill="#6366F1" fontWeight="700" fontFamily="monospace" textAnchor="middle">url</text>
                </g>
                {/* Arrow */}
                <g className="ued-arr">
                  <path d="M22 24 L26 24 M24 22 L26 24 L24 26" stroke="#6366F1" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                </g>
                {/* Output box */}
                <rect x="28" y="14" width="18" height="20" rx="2.5" fill="#6366F1" fillOpacity="0.08" stroke="#6366F1" strokeWidth="1.25"/>
                <g className="ued-pct" style={{ opacity: 0 }}>
                  <text x="37" y="23" fontSize="5" fill="#6366F1" fontWeight="800" fontFamily="monospace" textAnchor="middle">%2F</text>
                  <text x="37" y="30" fontSize="5" fill="#6366F1" fontWeight="800" fontFamily="monospace" textAnchor="middle">%3A</text>
                </g>
              </svg>
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#171717] dark:text-[#E5E5E5] leading-tight mb-1">
                Free URL Encoder / Decoder
              </h1>
              <p className="text-sm text-[#737373] dark:text-[#A3A3A3] leading-relaxed">
                Encode or decode URL / percent-encoded text instantly in your browser — no upload, no signup.
              </p>
            </div>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap gap-2">
            {["100% Free", "No Upload", "No Signup", "encodeURIComponent", "encodeURI", "Live Output"].map((b) => (
              <span
                key={b}
                className="inline-flex items-center text-[10px] font-medium px-2 py-0.5 rounded border bg-gray-50 text-gray-500 border-gray-200 dark:bg-[#2A2A2A] dark:text-[#A3A3A3] dark:border-[#3A3A3A]"
              >
                {b}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Tool ── */}
      <div className="bg-white dark:bg-[#191919] py-8">
        <UrlEncodeDecodeClient />
      </div>

      {/* ── Related tools ── */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-8">
        <RelatedTools toolId="url-encode-decode" />
      </div>

      {/* ── SEO content ── */}
      <div className="bg-[#FAFAFA] dark:bg-[#111] border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 space-y-10">

          {/* About */}
          <section>
            <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
              URL encoding and decoding without uploading anything
            </h2>
            <p className="text-sm text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
              This tool uses the native browser functions <code className="font-mono text-[#6366F1]">encodeURIComponent</code>,{" "}
              <code className="font-mono text-[#6366F1]">encodeURI</code>,{" "}
              <code className="font-mono text-[#6366F1]">decodeURIComponent</code> and{" "}
              <code className="font-mono text-[#6366F1]">decodeURI</code> — the same functions used by every modern JavaScript runtime.
              No library, no server, no upload. Your text is processed entirely inside your browser tab.
            </p>
          </section>

          {/* When to use */}
          <section>
            <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
              encodeURIComponent vs encodeURI — which one to use?
            </h2>
            <div className="space-y-3 text-sm text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
              <p>
                <strong className="text-[#171717] dark:text-[#E5E5E5]">encodeURIComponent</strong> encodes nearly every character
                except <code className="font-mono">A-Z a-z 0-9 - _ . ! ~ * &apos; ( )</code>. It is the correct choice for
                encoding individual query string values, form field values, or path segments that will be embedded inside a URL.
                For example, <code className="font-mono">hello world</code> becomes <code className="font-mono">hello%20world</code>.
              </p>
              <p>
                <strong className="text-[#171717] dark:text-[#E5E5E5]">encodeURI</strong> preserves URL structural characters
                like <code className="font-mono">: / ? # [ ] @ $ &amp; + , ; =</code> because they carry syntactic meaning.
                Use it when you have a complete URL and only want to fix unsafe characters without altering the structure.
              </p>
            </div>
          </section>

          {/* Use cases */}
          <section>
            <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
              Common use cases
            </h2>
            <ul className="space-y-2 text-sm text-[#525252] dark:text-[#A3A3A3]">
              {[
                "Building API query strings that include special characters like spaces, ampersands, or equals signs",
                "Encoding user input before embedding it in a URL to prevent injection or broken links",
                "Decoding a URL-encoded redirect parameter received from an OAuth flow or form submission",
                "Verifying that a URL parameter survived a round-trip through encoding and decoding",
                "Debugging a web request where percent-encoded values look garbled",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-[#6366F1] mt-0.5">–</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Internal links */}
          <section>
            <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
              Related developer tools on SammaPix
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { name: "Hash Generator", href: "/tools/hash-generator", desc: "MD5, SHA-256, SHA-512 from text or file" },
                { name: "Image to Base64", href: "/tools/image-to-base64", desc: "Encode images as Data URI or plain base64" },
                { name: "QR Code Generator", href: "/tools/qr-code-generator", desc: "Generate QR codes for URLs and text" },
              ].map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="block p-3 rounded-xl border border-gray-200 dark:border-[#2A2A2A] bg-white dark:bg-[#1E1E1E] hover:border-[#6366F1]/50 transition-colors group"
                >
                  <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] group-hover:text-[#6366F1] transition-colors">{tool.name}</p>
                  <p className="text-xs text-gray-500 dark:text-[#888] mt-0.5">{tool.desc}</p>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

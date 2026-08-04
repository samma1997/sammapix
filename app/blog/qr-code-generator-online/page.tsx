import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { APP_URL } from "@/lib/constants";
import BlogArticleLayout from "@/components/blog/BlogArticleLayout";

// ── Metadata ──────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Free QR Code Generator Online — No Signup, No Expiry [2026]",
  description:
    "Generate a QR code from any URL, text, Wi-Fi, email, or vCard entirely in your browser — no signup, no account, no expiry. Download PNG or SVG. Free for commercial use. 100% client-side, no upload.",
  alternates: {
    canonical: `${APP_URL}/blog/qr-code-generator-online`,
  },
  keywords: [
    "qr code generator",
    "free qr code generator",
    "qr code online",
    "qr code generator online",
    "qr code maker",
    "free qr code maker",
    "generate qr code",
    "qr code no signup",
    "qr code png svg",
    "static qr code free",
  ],
  openGraph: {
    title: "Free QR Code Generator Online — No Signup, No Expiry [2026]",
    description:
      "Generate QR codes from URL, text, Wi-Fi, email, or vCard in your browser. No signup, no account, no expiry. PNG and SVG download. Free for commercial use.",
    url: `${APP_URL}/blog/qr-code-generator-online`,
    type: "article",
    publishedTime: "2026-08-04",
    authors: ["https://lucasammarco.com"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free QR Code Generator Online — No Signup, No Expiry [2026]",
    description:
      "QR codes for URL, text, Wi-Fi, email, vCard — in your browser. No signup, no expiry. PNG + SVG. Free.",
    creator: "@lucasammarco",
  },
};

// ── Schema constants ──────────────────────────────────────────────────────────

const POST_DATE = "2026-08-04";
const POST_DATE_FORMATTED = "August 4, 2026";
const POST_URL = `${APP_URL}/blog/qr-code-generator-online`;
const POST_TITLE = "Free QR Code Generator Online — No Signup, No Expiry [2026]";

// ── Article schema ────────────────────────────────────────────────────────────

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: POST_TITLE,
  description:
    "Most free QR code generators online come with a hidden catch: they host your QR code on their servers and delete it after a period — or lock the high-resolution download behind a paywall. This guide explains how static QR codes work, why they never expire, the difference between PNG and SVG exports, and how to generate one entirely in your browser with no account required.",
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
    "qr code generator",
    "free qr code generator",
    "qr code online",
    "static qr code",
    "qr code png svg",
    "qr code no signup",
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
  name: "How to Generate a Free QR Code Online Without Signing Up",
  description:
    "Create a QR code from any URL, text, Wi-Fi credentials, email, or vCard entirely in your browser. Download as PNG for digital use or SVG for print. No account, no expiry, free for commercial use.",
  totalTime: "PT1M",
  tool: [
    {
      "@type": "HowToTool",
      name: "SammaPix QR Code Generator (browser-based, free)",
    },
  ],
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Open the QR Code Generator",
      text: "Go to sammapix.com/tools/qr-code-generator in any modern browser. No account or signup required.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Choose your data type and enter your content",
      text: "Select the type of data you want to encode: URL, plain text, Wi-Fi credentials, email address, or vCard contact. Enter the content in the corresponding fields. The QR code preview updates in real time.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Choose your output format",
      text: "Select PNG for digital use (screens, emails, presentations) or SVG for print (posters, business cards, menus). SVG scales to any size without quality loss.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Download your QR code",
      text: "Click Download PNG or Download SVG. The file is generated in your browser and saved directly to your device. No server processes your data. The QR code is yours forever — no expiry, no account needed to keep using it.",
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
      name: "Do free QR codes expire?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Static QR codes — which encode the destination directly into the QR pattern — never expire. They work as long as the destination they point to exists. Many 'free' QR code generators actually create dynamic QR codes that redirect through the generator's own servers. When the free plan expires or the service shuts down, those QR codes stop working. The SammaPix QR code generator creates static QR codes that encode your URL or data directly. They never expire and are not hosted on any server.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between a static and a dynamic QR code?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A static QR code encodes your destination URL or data directly in the QR pattern. Scan it and the scanner reads the data straight from the code. The data cannot be changed after the code is printed. A dynamic QR code encodes a short redirect URL that points to the QR generator's server, which then redirects to your actual destination. Dynamic codes can be edited after printing, and they provide scan analytics. The trade-off: they depend on the generator's servers staying online. If the service shuts down or your free trial expires, the QR code stops working. For most use cases — business cards, menus, posters — a static QR code is simpler, more private, and permanently reliable.",
      },
    },
    {
      "@type": "Question",
      name: "When should I download a PNG versus an SVG?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Download PNG when the QR code will be displayed on screens: websites, emails, presentations, social media posts, or digital signage. PNG is a pixel-based format — choose a size that matches the largest display you need (512px for most digital use, 1024px for large screen displays). Download SVG when the QR code will be printed: business cards, flyers, menus, posters, or packaging. SVG is a vector format that scales to any size — from a 1cm thumbnail to a 3-meter billboard — without any quality loss or pixelation. Design software like Illustrator, Figma, Affinity Designer, and InDesign all handle SVG natively.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use a QR code generated here for commercial purposes?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. QR codes generated by the SammaPix QR Code Generator are free for any use, including commercial. There is no watermark, no attribution requirement, and no license restriction. Use them on product packaging, marketing materials, restaurant menus, event signage, business cards, or any other commercial application. The QR code standard itself (ISO/IEC 18004) is managed by Denso Wave, which has declared it will not exercise patent rights over QR code use.",
      },
    },
    {
      "@type": "Question",
      name: "What data types can I encode in a QR code?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The SammaPix QR Code Generator supports URL (the most common use case — encode any https:// link), plain text (any message, up to a few hundred characters), Wi-Fi credentials (SSID and password — guests scan to join automatically without typing), email address (pre-fills the To field when scanned on a phone), and vCard (a digital contact card with name, phone, email, and address). QR codes can technically encode any text data — the types listed are the common ones that phones and QR scanner apps recognize and act on automatically.",
      },
    },
    {
      "@type": "Question",
      name: "How small can a QR code be and still scan reliably?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For print, the general rule is a minimum of 2cm x 2cm (about 0.8 inches square) at a scanning distance of 20-30cm. Smaller QR codes scan reliably only if the data encoded is short. QR codes with long URLs or vCard data have more modules (the black and white squares) and require a larger physical size to scan correctly. For business cards and similar small print, keep the encoded URL short — use a URL shortener if needed — and aim for at least 2.5cm x 2.5cm. For posters and signage, bigger is always better for users scanning from a distance.",
      },
    },
    {
      "@type": "Question",
      name: "Does this QR code generator upload my data to a server?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. The QR code is generated entirely in your browser using client-side JavaScript. The URL, Wi-Fi password, phone number, or any other data you enter never leaves your device. You can verify this by opening your browser developer tools (F12), going to the Network tab, and watching for outgoing requests while you type your data and download the QR code. You will see no requests carrying your input data. This is especially important for Wi-Fi QR codes, which encode your network password.",
      },
    },
    {
      "@type": "Question",
      name: "How many modules does a QR code have, and what affects the complexity?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A QR code is built on a grid of modules (the black and white squares). The grid size ranges from 21x21 (Version 1, the smallest) to 177x177 (Version 40, the largest). The version used depends on how much data you encode and the error correction level selected. A short URL like https://sammapix.com fits in a small, simple QR code. A full vCard with name, phone, email, address, and website may require a Version 10 or higher code with hundreds of modules. More modules means a denser, harder-to-scan pattern at small sizes — another reason to keep encoded data concise for print use cases.",
      },
    },
  ],
};

// ── Page ──────────────────────────────────────────────────────────────────────

export default function QrCodeGeneratorOnlinePage() {
  return (
    <>
      <BlogArticleLayout
        title={POST_TITLE}
        slug="qr-code-generator-online"
        description="Most 'free' QR code generators online are not actually free — they create dynamic QR codes hosted on their servers, lock the SVG behind a paywall, or delete your code when your trial ends. Here is a clear explanation of how QR codes work, why static QR codes never expire, and how to generate one for free in your browser with no account required."
        date={POST_DATE}
        dateFormatted={POST_DATE_FORMATTED}
        tags={["Tools", "Design"]}
        readingTime={9}
        headings={[
          { id: "what-is-a-qr-code", title: "What is a QR code and how does it encode data" },
          { id: "static-vs-dynamic", title: "Static vs dynamic QR codes: the key difference" },
          { id: "why-free-generators-expire", title: "Why most free QR code generators expire your codes" },
          { id: "data-types", title: "Data types: URL, text, Wi-Fi, vCard, email" },
          { id: "png-vs-svg", title: "PNG vs SVG: when to use each format" },
          { id: "comparison-table", title: "Static vs dynamic: honest comparison" },
          { id: "how-to-generate", title: "How to generate a QR code online, step by step" },
          { id: "commercial-use", title: "Commercial use: what you are and are not allowed to do" },
          { id: "related-tools", title: "Other image and design tools in your browser" },
          { id: "faq", title: "FAQ" },
        ]}
        summary={[
          "A QR code encodes data directly in its black-and-white module pattern. Static QR codes encode the destination directly — they never expire and work without any server.",
          "Many 'free' QR code generators create dynamic QR codes that route through their servers. When the free plan ends or the service shuts down, those codes stop working.",
          "The SammaPix QR Code Generator creates static QR codes entirely in your browser. No upload, no account, no expiry.",
          "Supports URL, plain text, Wi-Fi credentials, email address, and vCard contact cards.",
          "Download PNG for digital use (screens, email, presentations) or SVG for print (posters, business cards, menus). SVG scales to any size without pixelation.",
          "Free for commercial use. No watermark, no attribution, no license restriction.",
          "Your data never leaves your device — verifiable with browser DevTools.",
        ]}
        heroImage={
          <figure>
            <img
              src="https://images.pexels.com/photos/278430/pexels-photo-278430.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="QR codes printed on paper in a variety of sizes, representing the many practical uses for QR codes on menus, business cards, and posters."
              className="w-full max-h-[460px] object-cover rounded-lg"
              loading="eager"
            />
            <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
              Static QR codes encode data directly in the pattern — no server, no expiry, and free for commercial use forever.
            </figcaption>
          </figure>
        }
        ctaBlock={
          <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2">
              Generate a free QR code now — no account, no expiry
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-4">
              URL, text, Wi-Fi, email, vCard — all generated in your browser. Download PNG or SVG. No signup, no server,
              no expiry. Free for commercial use.
            </p>
            <div className="flex flex-wrap gap-3 items-center">
              <Link
                href="/tools/qr-code-generator"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
              >
                Generate QR Code, Free
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
              <Link
                href="/blog/create-qr-code-no-signup"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
              >
                Create QR code without signing up <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
              <Link
                href="/tools/add-text-to-image"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
              >
                Add text to image <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
            </div>
          </div>
        }
      >

        {/* ── Section 1: What is a QR code ─────────────────────────────────── */}

        <h2 id="what-is-a-qr-code" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          What is a QR code and how does it encode data
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          QR stands for Quick Response. The format was developed in 1994 by Denso Wave — a subsidiary of Toyota — to track automotive parts during manufacturing. The key innovation over traditional barcodes was the ability to encode far more data in a two-dimensional grid rather than a one-dimensional line of bars.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          A QR code is a square grid of small black-and-white squares called modules. The data is encoded in the arrangement of these modules using a standardized algorithm (ISO/IEC 18004). Every modern smartphone camera and virtually every QR scanner app can decode a QR code without any additional software — the decoding logic is built into the camera firmware.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The three large squares in the corners are finder patterns — they allow scanners to detect the QR code and determine its orientation regardless of the scanning angle. The small square in the bottom-right (for larger codes) is an alignment pattern. The rest of the grid encodes your data, along with error correction information that allows the code to be scanned even when partially covered or damaged.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Error correction is one reason QR codes can have a logo placed in their center. The standard supports four error correction levels: L (7% of codewords can be restored), M (15%), Q (25%), and H (30%). A higher error correction level means a larger, denser code — but also more tolerance for partial damage. Most QR code generators default to M or Q, which is the right balance for print use.
        </p>

        {/* ── Section 2: Static vs dynamic ─────────────────────────────────── */}

        <h2 id="static-vs-dynamic" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Static vs dynamic QR codes: the key difference
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The most important distinction to understand before generating a QR code is whether it is static or dynamic. These two types work completely differently, and the choice has long-term consequences for reliability and privacy.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          A <strong className="text-gray-800 dark:text-[#E5E5E5]">static QR code</strong> encodes your data directly into the module pattern. When someone scans it, their device reads the data from the pattern itself — no server is contacted. The data is permanent. You cannot change it after the code is printed, but it will work as long as the destination (a website URL, for example) exists. There is nothing to host, no subscription to maintain, and no expiry date.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          A <strong className="text-gray-800 dark:text-[#E5E5E5]">dynamic QR code</strong> encodes a short redirect URL pointing to the QR code service&apos;s own server. When someone scans the code, they first hit the service&apos;s redirect server, which then forwards them to your actual destination. This architecture allows you to change the destination after the code is printed — and provides scan analytics (how many scans, from which countries, at what times). The trade-off: the QR code depends entirely on the service&apos;s infrastructure. If the service shuts down, changes its free plan terms, or lets your subscription lapse, the QR code stops working.
        </p>

        {/* ── Section 3: Why free generators expire ────────────────────────── */}

        <h2 id="why-free-generators-expire" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Why most &quot;free&quot; QR code generators expire your codes
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The free QR code generator market has a well-documented dark pattern: advertise as &quot;free,&quot; generate dynamic codes by default, then charge for the redirect infrastructure or delete free codes after a trial period. Here is how it plays out in practice:
        </p>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Redirect dependency.</strong> The generated QR code encodes a URL like <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">qrservice.com/r/abc123</code> rather than your actual URL. The service controls whether that redirect works.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Expiry on free plans.</strong> Many services delete free dynamic QR codes after 30 to 90 days, or after reaching a scan limit. QR codes printed on menus, brochures, or product packaging become broken links.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">SVG locked behind paywall.</strong> The free PNG download is low-resolution. High-resolution or SVG output requires a paid plan. For print use cases, this forces an upgrade.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Data collection.</strong> Dynamic QR codes collect scan data — every scan tells the service when, where, and from what device the code was scanned. For a menu QR code at a restaurant or a personal business card, this is an unnecessary data handoff to a third party.
          </li>
        </ul>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          If you do not need scan analytics or the ability to edit the destination after printing, a static QR code is the right choice. It is simpler, more reliable, completely private, and permanently free. The SammaPix QR code generator creates static codes only — your data is encoded in the pattern, not hosted on any server.
        </p>

        {/* ── Section 4: Data types ─────────────────────────────────────────── */}

        <h2 id="data-types" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Data types: URL, text, Wi-Fi, vCard, email
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          A QR code can encode any text data. The reason different &quot;types&quot; exist is that smartphones and QR scanner apps recognize specific text formats and act on them automatically. Here is what each type does:
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Type</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">What gets encoded</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">What happens when scanned</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Best use cases</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">URL</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-mono text-xs">https://yourwebsite.com</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Browser opens the URL directly.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Business cards, flyers, product pages, app download links, social media profiles.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Plain text</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Any text string.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Scanner displays the text. No automatic action.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Event codes, coupon codes, instructions, short messages.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Wi-Fi</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-mono text-xs">WIFI:T:WPA;S:YourSSID;P:password;;</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Phone offers to join the network automatically. No password typing.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Restaurants, hotels, cafes, Airbnbs, offices — guest Wi-Fi access.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Email</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-mono text-xs">mailto:you@example.com?subject=Hello</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Email client opens with the address (and optionally subject) pre-filled.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Business cards, conference materials, feedback forms.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">vCard</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Name, phone, email, address, website in vCard 3.0 format.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Contacts app offers to add the person directly to the address book.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Business cards, networking events, digital rolodexes.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          For Wi-Fi QR codes, pay attention to privacy: the network password is encoded directly in the QR pattern. Anyone who scans the code or photographs it can read the password. Use this for guest networks rather than primary networks with access to sensitive internal resources.
        </p>

        {/* ── Section 5: PNG vs SVG ─────────────────────────────────────────── */}

        <h2 id="png-vs-svg" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          PNG vs SVG: when to use each format
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The format you download determines how the QR code scales and where it can be used without quality loss. This choice matters far more for QR codes than for photographs, because QR codes must be scannable — a blurry or pixelated module pattern causes scan failures.
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Format</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">How it scales</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Best use cases</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Software compatibility</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">PNG</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Pixel-based. Looks sharp at intended size but becomes pixelated when enlarged beyond original resolution.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Websites, email signatures, presentations, social media posts, digital displays.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">All browsers, all image editors, all operating systems. Universal support.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">SVG</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Vector-based. Scales to any size — from thumbnail to billboard — without any quality loss.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Print materials: business cards, flyers, menus, posters, packaging, banners, signage.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Adobe Illustrator, Affinity Designer, Figma, InDesign, Canva, GIMP (import). All modern browsers.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The practical rule: if the QR code will be printed, download SVG. If it will appear on a screen, download PNG at a size that matches your largest expected display. For web use, 512x512 pixels is appropriate for most layouts. For large digital signage, generate at 1024x1024 or higher.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          One important note: SVG is the format that most &quot;free&quot; QR code generators lock behind a paywall. Because professional print workflows require vector files, and because a 72 dpi PNG is unusable for a business card at 300 dpi, the SVG lock-in is a deliberate monetization strategy. The SammaPix QR code generator provides SVG download at no cost.
        </p>

        {/* ── Section 6: Comparison table ──────────────────────────────────── */}

        <h2 id="comparison-table" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Static vs dynamic: honest comparison
        </h2>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Feature</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Static QR code (SammaPix)</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Dynamic QR code (most SaaS generators)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Expiry</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Never expires. Works as long as the destination URL exists.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Expires or breaks if the free plan ends, subscription lapses, or the service shuts down.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Editability after printing</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Cannot change destination. Reprint needed for a new URL.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Can change destination without reprinting. Useful for printed menus and evolving campaigns.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Scan analytics</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">None. Scans go directly to the destination.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Full analytics: scan count, device type, location, time.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Privacy</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">No data collected. Scanner goes straight to destination.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Every scan is logged by the service. User location and device data collected.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Scan speed</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Instant. No redirect step.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Slight latency (redirect adds a round trip to the service server).</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Cost</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Free forever. No plan needed.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Free tier with limits; analytics and SVG typically require a paid plan ($5-15/month).</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Server dependency</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">None. Works completely offline after generation.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Requires the service's redirect server to be running every time someone scans.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Dynamic QR codes make sense when scan analytics matter (marketing campaigns, A/B testing landing pages) or when you need to update the destination without reprinting materials at scale. For personal and small business use — business cards, restaurant menus, Wi-Fi access, conference materials — static QR codes are the better default. They are simpler, more private, and permanently free.
        </p>

        {/* ── Tool CTA #1 ────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">Generate your static QR code in your browser — free, no account</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            URL, text, Wi-Fi, email, vCard. Download PNG or SVG. No server, no redirect, no expiry. Free for commercial use.
          </p>
          <Link
            href="/tools/qr-code-generator"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
          >
            Open QR Code Generator, Free <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
          </Link>
        </div>

        {/* ── Section 7: How to generate step by step ───────────────────────── */}

        <h2 id="how-to-generate" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          How to generate a QR code online, step by step
        </h2>

        <ol className="mb-4 space-y-3">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Go to sammapix.com/tools/qr-code-generator</strong> in any modern browser — Chrome, Safari, Firefox, or Edge. No account, no extension, no plugin required.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Choose your data type.</strong> Select URL, text, Wi-Fi, email, or vCard from the type selector. The input fields update to match the selected type.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Enter your data.</strong> Type or paste the URL, message, Wi-Fi credentials, email address, or contact details. The QR code preview updates in real time as you type — you can scan the preview immediately to verify it decodes correctly before downloading.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Choose your output format.</strong> Select PNG for digital use or SVG for print. Both are available at no cost.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Download your QR code.</strong> The file is generated in browser memory and saved to your device. Your data never leaves your browser. The QR code has no expiry date.
          </li>
        </ol>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Always scan the QR code yourself before distributing it — use your phone camera or a QR scanner app to verify it decodes to the correct URL or data. This takes ten seconds and saves you from distributing broken or incorrectly encoded codes on printed materials.
        </p>

        {/* ── Tool CTA #2 ────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">No signup, no server — your QR code stays in your browser</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            Generate and download PNG or SVG. Verify the preview before downloading. No account, no expiry, free for commercial use.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/tools/qr-code-generator"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            >
              Open QR Code Generator, Free <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link
              href="/blog/create-qr-code-no-signup"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
            >
              Why no-signup matters for QR codes <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>
        </div>

        {/* ── Section 8: Commercial use ─────────────────────────────────────── */}

        <h2 id="commercial-use" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Commercial use: what you are and are not allowed to do
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          QR codes generated by the SammaPix QR Code Generator are free for any use, including commercial. There is no watermark on the output, no attribution requirement, and no license restriction from SammaPix on the generated image.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The QR code standard itself (ISO/IEC 18004) is owned by Denso Wave, which developed the format in 1994. Denso Wave holds a patent on QR codes but has announced it will not exercise patent rights over QR code use — commercial or otherwise. The QR code format is effectively free to use by anyone, for any purpose.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          What you are responsible for: the content encoded in the QR code. If you encode a URL that leads to copyrighted content, a fraudulent site, or a spam destination, that is your legal responsibility — not the QR code generator&apos;s. Use QR codes to link to content you own or have rights to share.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Common legitimate commercial uses include: restaurant menus, product packaging, business cards, event signage, retail promotions, hotel Wi-Fi access, conference materials, and marketing campaigns. All of these are straightforwardly permitted.
        </p>

        {/* ── Section 9: Related tools ──────────────────────────────────────── */}

        <h2 id="related-tools" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Other image and design tools in your browser
        </h2>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/qr-code-generator" className="text-[#6366F1] hover:underline">QR Code Generator</Link></strong>: the tool covered in this article. URL, text, Wi-Fi, email, vCard. PNG and SVG download. No account, no expiry.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/image-to-base64" className="text-[#6366F1] hover:underline">Image to Base64</Link></strong>: encode any image to Base64 for embedding in CSS, HTML, or emails without a separate file request. See{" "}
            <Link href="/blog/image-to-base64-online" className="text-[#6366F1] hover:underline">Image to Base64 guide</Link>.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/add-text-to-image" className="text-[#6366F1] hover:underline">Add Text to Image</Link></strong>: overlay text on any image in your browser — choose font, size, color, and position. No upload. See{" "}
            <Link href="/blog/add-text-to-image-online" className="text-[#6366F1] hover:underline">Add text to image guide</Link>.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/svg-to-png" className="text-[#6366F1] hover:underline">SVG to PNG</Link></strong>: convert any SVG file to a rasterized PNG at any resolution. Useful for converting SVG graphics to web-ready images.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/ico-generator" className="text-[#6366F1] hover:underline">ICO Generator</Link></strong>: generate a favicon .ico file from any image. For creating website icons alongside QR codes and other brand assets.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/collage-maker" className="text-[#6366F1] hover:underline">Photo Collage Maker</Link></strong>: combine multiple photos into a single image for presentations, social media, or print materials.
          </li>
        </ul>

        {/* ── Tool CTA #3 ────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">All your design and image tools, all in-browser</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            QR codes, image encoding, text overlays, SVG conversion, favicon generation — without uploading files anywhere.
            All tools run locally in your browser. No server. No signup. No watermark.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/tools/qr-code-generator" className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]">
              QR Code Generator <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link href="/tools/image-to-base64" className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]">
              Image to Base64 <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link href="/tools/add-text-to-image" className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]">
              Add Text to Image <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link href="/tools/svg-to-png" className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]">
              SVG to PNG <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link href="/tools/ico-generator" className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]">
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

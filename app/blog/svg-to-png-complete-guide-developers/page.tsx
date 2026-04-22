import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { APP_URL } from "@/lib/constants";
import BlogArticleLayout from "@/components/blog/BlogArticleLayout";

export const metadata: Metadata = {
  title: "SVG to PNG: Complete Guide for Developers [2026]",
  description:
    "The developer guide to rasterizing SVG into PNG in 2026: intrinsic sizes, @2x/@3x scaling, favicon packs, transparency, and the pitfalls most tutorials skip.",
  alternates: {
    canonical: `${APP_URL}/blog/svg-to-png-complete-guide-developers`,
  },
  keywords: [
    "svg to png",
    "svg to png converter",
    "rasterize svg",
    "convert svg to png",
    "svg to png high resolution",
    "svg to png transparent",
    "app icon from svg",
    "favicon from svg",
    "svg to png for print",
    "svg viewbox size",
  ],
  openGraph: {
    title: "SVG to PNG: Complete Guide for Developers [2026]",
    description:
      "Intrinsic sizes, @2x/@3x scaling, favicon packs, transparency. The complete SVG to PNG guide for developers in 2026.",
    url: `${APP_URL}/blog/svg-to-png-complete-guide-developers`,
    type: "article",
    publishedTime: "2026-04-22",
    authors: ["https://lucasammarco.com"],
  },
  twitter: {
    card: "summary_large_image",
    title: "SVG to PNG: Complete Guide for Developers [2026]",
    description:
      "Intrinsic sizes, @2x/@3x scaling, favicon packs. Rasterize SVG properly in 2026.",
    creator: "@lucasammarco",
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "SVG to PNG: Complete Guide for Developers [2026]",
  description:
    "A developer-oriented guide to rasterizing SVG to PNG in 2026: viewBox math, HiDPI scaling, favicon packs, transparency preservation, and the common pitfalls.",
  url: `${APP_URL}/blog/svg-to-png-complete-guide-developers`,
  datePublished: "2026-04-22",
  dateModified: "2026-04-22",
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
    logo: { "@type": "ImageObject", url: "https://sammapix.com/og-image.png" },
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": `${APP_URL}/blog/svg-to-png-complete-guide-developers`,
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: APP_URL },
    { "@type": "ListItem", position: 2, name: "Blog", item: `${APP_URL}/blog` },
    {
      "@type": "ListItem",
      position: 3,
      name: "SVG to PNG: Complete Guide for Developers [2026]",
      item: `${APP_URL}/blog/svg-to-png-complete-guide-developers`,
    },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "When do I actually need to convert SVG to PNG?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "When the destination does not accept SVG: iOS and Android app icons (fixed sizes required), favicon fallback for legacy browsers, email templates (most clients strip SVG), social media uploads (Instagram, WhatsApp), print pipelines requiring raster formats, and embedding in documents like Word or PDF. For web use, keep the SVG — it scales perfectly at any resolution and is typically smaller.",
      },
    },
    {
      "@type": "Question",
      name: "What size PNG should I export from my SVG?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Depends on the target. Favicons: 16, 32, 48 at minimum plus 64, 128, 256 for HiDPI. App icons: 1024×1024 for both iOS and Play Store. Open Graph images: 1200×630. Retina web use: 2× the display size. Print at 300 DPI: multiply inches by 300 (a 5-inch image needs 1500 pixels). Do not upscale beyond what you actually need — PNG file size grows quadratically with dimensions.",
      },
    },
    {
      "@type": "Question",
      name: "How does the SVG viewBox affect the PNG output?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The viewBox defines the SVG coordinate system. If your SVG has width='100' height='100' (or inferred from viewBox='0 0 100 100'), the intrinsic size is 100×100. A 4× scale produces a 400×400 PNG. If width and height are missing, browsers fall back to the viewBox dimensions. If both are missing, most rasterizers pick 300×150 or a sensible default. For predictable output, always set both width and height on the root SVG element.",
      },
    },
    {
      "@type": "Question",
      name: "Will transparency be preserved when I convert SVG to PNG?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, by default. PNG supports 8-bit alpha — same as SVG. Any transparent region in the SVG stays transparent in the PNG. If you explicitly need a solid background (for apps that do not handle alpha), most conversion tools including SammaPix offer a background color option (transparent, white, black).",
      },
    },
    {
      "@type": "Question",
      name: "Why is my PNG file much larger than the SVG source?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Because SVG encodes shapes as math and PNG stores every pixel. A 2 KB SVG can render at any resolution — the bytes are a description of circles, paths, and gradients. A 2048×2048 PNG of the same image can be 200-500 KB because every pixel needs to be encoded. This is normal and expected. If file size matters, keep the SVG for web use and only rasterize when you need PNG.",
      },
    },
    {
      "@type": "Question",
      name: "Can I batch convert SVG to PNG in the browser?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. SammaPix SVG to PNG runs 100% in your browser using the Canvas API — drop up to 20 SVG files on the free plan (200 on Pro) and choose a scale preset (1×, 2×, 3×, 4×) or custom width up to 8192 pixels. No server upload, files never leave your device, and the intrinsic SVG size is parsed automatically from the width/height or viewBox attributes.",
      },
    },
  ],
};

export default function SvgToPngCompleteGuideDevelopersPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <BlogArticleLayout
        title="SVG to PNG: Complete Guide for Developers [2026]"
        slug="svg-to-png-complete-guide-developers"
        description="SVG is better than PNG on the web — it scales infinitely, the file is smaller, and the math stays crisp at any zoom. But sometimes you need PNG anyway: app icons, favicons, email templates, print. Here is the developer guide to rasterizing SVG properly in 2026."
        date="2026-04-22"
        dateFormatted="April 22, 2026"
        tags={["Performance"]}
        readingTime={10}
        headings={[
          { id: "when-need-png", title: "When you actually need PNG instead of SVG" },
          { id: "viewbox-math", title: "viewBox math and intrinsic size" },
          { id: "scaling-strategy", title: "Scaling strategy: 1×, 2×, 3×, custom" },
          { id: "favicon-pack", title: "Building a favicon pack from one SVG" },
          { id: "app-icons", title: "App icons for iOS and Android" },
          { id: "open-graph", title: "Open Graph and social previews" },
          { id: "transparency", title: "Transparency: keep it or flatten it?" },
          { id: "print", title: "Print output: the DPI conversion" },
          { id: "pitfalls", title: "Common pitfalls (and how to avoid them)" },
          { id: "benchmarks", title: "Size benchmarks: SVG vs PNG at scale" },
          { id: "tools", title: "Free browser-based SVG tools" },
          { id: "faq", title: "FAQ" },
        ]}
        summary={[
          "Keep SVG for the web. Rasterize to PNG only when the target does not accept SVG — app icons, favicon fallback, email templates, print, embedded documents.",
          "Read the SVG intrinsic size from width/height attributes or fall back to the viewBox. Always declare both on the root element for predictable output.",
          "Standard favicon pack: 16, 32, 48, 64, 128, 256. App icons: 1024×1024 for iOS and Play Store. Open Graph: 1200×630.",
          "Transparency is preserved by default. PNG supports 8-bit alpha. Use a solid background only when the target strictly requires it.",
          "PNG file size grows quadratically with dimensions. A 2 KB SVG at 4096×4096 can produce a 500 KB PNG — normal, expected, and why SVG wins on the web.",
        ]}
        heroImage={
          <figure className="my-8">
            <img
              src="https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Developer working on a laptop with code editor open, representing SVG rasterization workflow"
              className="w-full rounded-lg"
              loading="eager"
            />
            <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
              SVG to PNG is a daily developer task — doing it right saves hours of downstream rework. Photo by ThisIsEngineering on Pexels
            </figcaption>
          </figure>
        }
        ctaBlock={
          <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2">
              Rasterize SVG to PNG — free, fully in your browser
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-4">
              Drop your SVG files into SammaPix SVG to PNG and get PNG at any resolution (up to 8192 px) with
              transparency preserved. Runs 100% locally via Canvas API — no upload, no signup.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/tools/svg-to-png"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
              >
                Try SVG to PNG, Free
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
              <Link
                href="/tools/ico-generator"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
              >
                Favicon Generator <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
            </div>
          </div>
        }
      >
        {/* ── When need PNG ──────────────────────────────────────────────── */}
        <h2 id="when-need-png" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          When you actually need PNG instead of SVG
        </h2>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          SVG is the best format for most web content. A vector icon at 2 KB renders pixel-perfect at any zoom
          level, theme-able with CSS, manipulable with JavaScript, and indexable by search engines if you add
          title/desc. For buttons, logos, illustrations, and data visualizations, SVG beats PNG on every axis.
        </p>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          But there are five places where SVG does not work and you need PNG:
        </p>
        <ul className="list-disc pl-6 space-y-1.5 text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-4">
          <li><strong className="text-gray-900 dark:text-[#E5E5E5]">App icons.</strong> iOS and Google Play require fixed-size PNGs (1024×1024 masters, many derivative sizes). Submit SVG → rejected.</li>
          <li><strong className="text-gray-900 dark:text-[#E5E5E5]">Favicon fallback.</strong> Modern browsers accept SVG favicons but Safari on older iOS versions and many email clients that preview favicons do not. Multi-size .ico is the safe fallback.</li>
          <li><strong className="text-gray-900 dark:text-[#E5E5E5]">Email templates.</strong> Gmail, Outlook, Apple Mail strip SVG from HTML. The only reliable inline image format in email is PNG (or JPG).</li>
          <li><strong className="text-gray-900 dark:text-[#E5E5E5]">Social uploads.</strong> Instagram, WhatsApp, Facebook, and most ad platforms reject SVG uploads — they want raster.</li>
          <li><strong className="text-gray-900 dark:text-[#E5E5E5]">Print and embedded documents.</strong> Word, PowerPoint, many PDF pipelines, and print-on-demand services need raster. SVG may render unpredictably in Word specifically.</li>
        </ul>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          For a broader look at format tradeoffs read our{" "}
          <Link href="/blog/best-image-format-for-web-2026" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3]">
            complete image format guide for 2026
          </Link>
          .
        </p>

        {/* ── viewBox math ───────────────────────────────────────────────── */}
        <h2 id="viewbox-math" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          viewBox math and intrinsic size
        </h2>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The first thing a rasterizer needs to know is &ldquo;what size is this SVG naturally?&rdquo; There are
          three places it can find the answer, in priority order:
        </p>
        <ol className="list-decimal pl-6 space-y-1.5 text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-4">
          <li>The <code className="text-xs bg-gray-100 dark:bg-[#1E1E1E] px-1 py-0.5 rounded">width</code> and <code className="text-xs bg-gray-100 dark:bg-[#1E1E1E] px-1 py-0.5 rounded">height</code> attributes on the root <code className="text-xs bg-gray-100 dark:bg-[#1E1E1E] px-1 py-0.5 rounded">&lt;svg&gt;</code>.</li>
          <li>If only one is present, derive the other from the <code className="text-xs bg-gray-100 dark:bg-[#1E1E1E] px-1 py-0.5 rounded">viewBox</code> ratio.</li>
          <li>If both are missing, fall back to the <code className="text-xs bg-gray-100 dark:bg-[#1E1E1E] px-1 py-0.5 rounded">viewBox</code> extent (e.g. <code className="text-xs bg-gray-100 dark:bg-[#1E1E1E] px-1 py-0.5 rounded">viewBox=&quot;0 0 100 50&quot;</code> → intrinsic 100×50).</li>
          <li>If nothing is declared, rasterizers pick a default (browsers use 300×150; SammaPix uses 512×512).</li>
        </ol>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          <strong className="text-gray-900 dark:text-[#E5E5E5]">Always declare both width and height on the root element</strong>.
          Skipping them leads to unpredictable output across rasterizers. This is the single most common reason
          that &ldquo;my SVG converted fine in tool A but broke in tool B&rdquo; — the two tools used different
          fallback rules.
        </p>
        <pre className="text-[12px] leading-relaxed bg-gray-50 dark:bg-[#0F0F0F] text-gray-900 dark:text-[#E5E5E5] p-4 rounded-md overflow-x-auto my-4">
          <code>{`<!-- Good: explicit intrinsic size -->
<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <circle cx="50" cy="50" r="40" fill="#6366F1"/>
</svg>

<!-- Risky: rasterizer-dependent -->
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">...</svg>`}</code>
        </pre>

        {/* ── Scaling strategy ───────────────────────────────────────────── */}
        <h2 id="scaling-strategy" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Scaling strategy: 1×, 2×, 3×, custom
        </h2>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The output size is a function of intrinsic SVG size × scale factor. For a 100×100 SVG:
        </p>
        <ul className="list-disc pl-6 space-y-1.5 text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-4">
          <li><strong className="text-gray-900 dark:text-[#E5E5E5]">1×</strong> → 100×100 PNG. Good for matching the SVG design on non-HiDPI screens.</li>
          <li><strong className="text-gray-900 dark:text-[#E5E5E5]">2×</strong> → 200×200 PNG. Standard for Retina and HiDPI (most desktops and tablets in 2026).</li>
          <li><strong className="text-gray-900 dark:text-[#E5E5E5]">3×</strong> → 300×300 PNG. iPhones with 3× density (Plus and Pro models since iPhone 6 Plus).</li>
          <li><strong className="text-gray-900 dark:text-[#E5E5E5]">4×</strong> → 400×400 PNG. Android XXXHDPI, 4K monitors used at 100% scaling.</li>
          <li><strong className="text-gray-900 dark:text-[#E5E5E5]">Custom</strong> → any width up to 8192 pixels. Height scales to preserve aspect ratio.</li>
        </ul>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          SammaPix{" "}
          <Link href="/tools/svg-to-png" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3]">
            SVG to PNG
          </Link>
          {" "}parses the intrinsic size from width/height/viewBox automatically and lets you pick the scale
          preset or custom width. The maximum 8192 pixels is a deliberate guard — larger canvases can crash the
          tab on low-memory devices.
        </p>

        {/* ── Favicon pack ───────────────────────────────────────────────── */}
        <h2 id="favicon-pack" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Building a favicon pack from one SVG
        </h2>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          A modern favicon setup serves three files from one SVG master:
        </p>
        <ol className="list-decimal pl-6 space-y-1.5 text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-4">
          <li><strong className="text-gray-900 dark:text-[#E5E5E5]">favicon.svg</strong> — the original, served to modern browsers (Chrome/Firefox/Edge).</li>
          <li><strong className="text-gray-900 dark:text-[#E5E5E5]">favicon.ico</strong> — multi-size container with 16×16, 32×32, 48×48 (and optionally 64/128/256) for legacy clients.</li>
          <li><strong className="text-gray-900 dark:text-[#E5E5E5]">apple-touch-icon.png</strong> — 180×180 for iOS home screen shortcuts.</li>
        </ol>
        <pre className="text-[12px] leading-relaxed bg-gray-50 dark:bg-[#0F0F0F] text-gray-900 dark:text-[#E5E5E5] p-4 rounded-md overflow-x-auto my-4">
          <code>{`<link rel="icon" href="/favicon.ico" sizes="any">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">`}</code>
        </pre>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Build the favicon.ico from your SVG using the SammaPix{" "}
          <Link href="/tools/ico-generator" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3]">
            Favicon Generator
          </Link>
          {" "}— upload the SVG, pick sizes (16/32/48 minimum), download the .ico file. For the Apple touch icon,
          run the SVG through SVG to PNG at 180 pixels wide.
        </p>

        {/* ── App icons ──────────────────────────────────────────────────── */}
        <h2 id="app-icons" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          App icons for iOS and Android
        </h2>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Both iOS and Google Play require a <strong className="text-gray-900 dark:text-[#E5E5E5]">1024×1024 master PNG</strong> (no
          transparency for iOS App Store, transparency optional for Play). Historical derivative sizes have shrunk
          because both platforms now generate them from the 1024 master automatically, but some CI pipelines and
          older tooling still expect the full matrix:
        </p>
        <div className="overflow-x-auto my-6">
          <table className="min-w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200 dark:border-[#2A2A2A]">
                <th className="text-left py-2 pr-4 font-semibold text-gray-900 dark:text-[#E5E5E5]">Platform</th>
                <th className="text-right py-2 px-4 font-semibold text-gray-900 dark:text-[#E5E5E5]">Master size</th>
                <th className="text-left py-2 pl-4 font-semibold text-gray-900 dark:text-[#E5E5E5]">Notes</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 dark:text-[#A3A3A3]">
              <tr className="border-b border-gray-100 dark:border-[#1F1F1F]">
                <td className="py-2 pr-4">iOS App Store</td>
                <td className="text-right py-2 px-4 tabular-nums">1024×1024</td>
                <td className="py-2 pl-4">No alpha, no transparency, square</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-[#1F1F1F]">
                <td className="py-2 pr-4">Google Play</td>
                <td className="text-right py-2 px-4 tabular-nums">1024×1024</td>
                <td className="py-2 pl-4">32-bit PNG (alpha allowed)</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-[#1F1F1F]">
                <td className="py-2 pr-4">iOS home screen</td>
                <td className="text-right py-2 px-4 tabular-nums">180×180</td>
                <td className="py-2 pl-4">apple-touch-icon.png</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-[#1F1F1F]">
                <td className="py-2 pr-4">Android adaptive</td>
                <td className="text-right py-2 px-4 tabular-nums">512×512</td>
                <td className="py-2 pl-4">Foreground layer with safe-zone padding</td>
              </tr>
              <tr>
                <td className="py-2 pr-4">PWA manifest</td>
                <td className="text-right py-2 px-4 tabular-nums">192, 512</td>
                <td className="py-2 pl-4">Two PNGs declared in <code className="text-xs bg-gray-100 dark:bg-[#1E1E1E] px-1 py-0.5 rounded">manifest.json</code></td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          If you export a single 1024 PNG from SVG you can downscale inside Xcode/Android Studio. If you need all
          sizes pre-baked, SammaPix SVG to PNG&apos;s custom width field accepts any value from 16 to 8192 px —
          batch multiple runs or use Pro to process up to 200 files at once.
        </p>

        {/* ── Open Graph ─────────────────────────────────────────────────── */}
        <h2 id="open-graph" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Open Graph and social previews
        </h2>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Social platforms (Facebook, Twitter/X, LinkedIn, Slack previews) require a raster image with a very
          specific aspect ratio:
        </p>
        <ul className="list-disc pl-6 space-y-1.5 text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-4">
          <li><strong className="text-gray-900 dark:text-[#E5E5E5]">1200×630</strong> — Facebook Open Graph standard (ratio 1.91:1).</li>
          <li><strong className="text-gray-900 dark:text-[#E5E5E5]">1200×628</strong> — Twitter summary_large_image (nearly identical).</li>
          <li><strong className="text-gray-900 dark:text-[#E5E5E5]">1200×627</strong> — LinkedIn recommendation.</li>
        </ul>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          You cannot generate this directly from a square SVG — the aspect ratio mismatch means you either design
          a dedicated 1200×630 SVG or composite your logo inside a larger background. Do the layout in SVG first
          (full fidelity design), then rasterize to PNG at custom width 1200.
        </p>

        {/* ── Transparency ───────────────────────────────────────────────── */}
        <h2 id="transparency" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Transparency: keep it or flatten it?
        </h2>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          PNG supports 8-bit alpha (256 levels of transparency per pixel), same as SVG. By default the
          conversion preserves any transparent region. Two reasons to flatten to a solid background:
        </p>
        <ul className="list-disc pl-6 space-y-1.5 text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-4">
          <li><strong className="text-gray-900 dark:text-[#E5E5E5]">iOS App Store.</strong> Submitted app icons must not have alpha channel. A 1024 PNG with transparency will be rejected.</li>
          <li><strong className="text-gray-900 dark:text-[#E5E5E5]">Email clients.</strong> Some legacy clients render transparent PNGs on a dark background, making light icons invisible. A solid white or theme-matched background avoids the issue.</li>
        </ul>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          For a deep dive on transparency handling across formats, see our{" "}
          <Link href="/blog/png-to-jpg-vs-webp-2026" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3]">
            PNG to JPG vs WebP analysis
          </Link>
          .
        </p>

        {/* ── Print ──────────────────────────────────────────────────────── */}
        <h2 id="print" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Print output: the DPI conversion
        </h2>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Print pipelines do not think in pixels — they think in inches or millimetres at a specific DPI. The math
          to go from print dimensions to PNG pixels is:
        </p>
        <pre className="text-[12px] leading-relaxed bg-gray-50 dark:bg-[#0F0F0F] text-gray-900 dark:text-[#E5E5E5] p-4 rounded-md overflow-x-auto my-4">
          <code>{`pixels_width  = inches_width  × DPI
pixels_height = inches_height × DPI`}</code>
        </pre>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Common targets at 300 DPI (offset printing standard):
        </p>
        <ul className="list-disc pl-6 space-y-1.5 text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-4">
          <li>Business card (3.5 × 2 in) → <strong className="text-gray-900 dark:text-[#E5E5E5]">1050 × 600 px</strong></li>
          <li>Postcard (6 × 4 in) → <strong className="text-gray-900 dark:text-[#E5E5E5]">1800 × 1200 px</strong></li>
          <li>Letter (8.5 × 11 in) → <strong className="text-gray-900 dark:text-[#E5E5E5]">2550 × 3300 px</strong></li>
          <li>A4 (8.27 × 11.69 in) → <strong className="text-gray-900 dark:text-[#E5E5E5]">2480 × 3508 px</strong></li>
          <li>Poster (24 × 36 in) → <strong className="text-gray-900 dark:text-[#E5E5E5]">7200 × 10800 px</strong> (exceeds the 8192 tool limit — split into quarters)</li>
        </ul>

        {/* ── Pitfalls ───────────────────────────────────────────────────── */}
        <h2 id="pitfalls" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Common pitfalls (and how to avoid them)
        </h2>
        <ul className="list-disc pl-6 space-y-2 text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-4">
          <li><strong className="text-gray-900 dark:text-[#E5E5E5]">External fonts.</strong> If your SVG references a Google Font via <code className="text-xs bg-gray-100 dark:bg-[#1E1E1E] px-1 py-0.5 rounded">@import</code>, the rasterizer cannot load it. Convert all text to paths before rasterizing, or embed the font with base64.</li>
          <li><strong className="text-gray-900 dark:text-[#E5E5E5]">External images.</strong> <code className="text-xs bg-gray-100 dark:bg-[#1E1E1E] px-1 py-0.5 rounded">&lt;image xlink:href=&quot;./photo.jpg&quot;&gt;</code> inside an SVG will not load cross-origin. Inline via base64 or host same-origin.</li>
          <li><strong className="text-gray-900 dark:text-[#E5E5E5]">Script tags.</strong> Rasterizers disable <code className="text-xs bg-gray-100 dark:bg-[#1E1E1E] px-1 py-0.5 rounded">&lt;script&gt;</code> inside SVG for security. Any JS-driven animation is gone in the PNG.</li>
          <li><strong className="text-gray-900 dark:text-[#E5E5E5]">Filters.</strong> Complex SVG filters (feTurbulence, feGaussianBlur) render differently across rasterizers. Test the output visually, do not assume byte-level consistency.</li>
          <li><strong className="text-gray-900 dark:text-[#E5E5E5]">Huge viewBox.</strong> An SVG with <code className="text-xs bg-gray-100 dark:bg-[#1E1E1E] px-1 py-0.5 rounded">viewBox=&quot;0 0 10000 10000&quot;</code> scaled 4× produces a 40000×40000 PNG — crash territory. Check intrinsic size before picking scale.</li>
        </ul>

        {/* ── Benchmarks ─────────────────────────────────────────────────── */}
        <h2 id="benchmarks" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Size benchmarks: SVG vs PNG at scale
        </h2>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Quick illustration of why SVG wins on the web. We took a 2.1 KB logo SVG and rasterized at five target
          sizes:
        </p>
        <div className="overflow-x-auto my-6">
          <table className="min-w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200 dark:border-[#2A2A2A]">
                <th className="text-left py-2 pr-4 font-semibold text-gray-900 dark:text-[#E5E5E5]">Target size</th>
                <th className="text-right py-2 px-4 font-semibold text-gray-900 dark:text-[#E5E5E5]">SVG size</th>
                <th className="text-right py-2 px-4 font-semibold text-gray-900 dark:text-[#E5E5E5]">PNG size</th>
                <th className="text-right py-2 pl-4 font-semibold text-gray-900 dark:text-[#E5E5E5]">PNG vs SVG</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 dark:text-[#A3A3A3]">
              <tr className="border-b border-gray-100 dark:border-[#1F1F1F]"><td className="py-2 pr-4">256×256</td><td className="text-right py-2 px-4 tabular-nums">2.1 KB</td><td className="text-right py-2 px-4 tabular-nums">14 KB</td><td className="text-right py-2 pl-4 tabular-nums">6.7×</td></tr>
              <tr className="border-b border-gray-100 dark:border-[#1F1F1F]"><td className="py-2 pr-4">512×512</td><td className="text-right py-2 px-4 tabular-nums">2.1 KB</td><td className="text-right py-2 px-4 tabular-nums">38 KB</td><td className="text-right py-2 pl-4 tabular-nums">18×</td></tr>
              <tr className="border-b border-gray-100 dark:border-[#1F1F1F]"><td className="py-2 pr-4">1024×1024</td><td className="text-right py-2 px-4 tabular-nums">2.1 KB</td><td className="text-right py-2 px-4 tabular-nums">112 KB</td><td className="text-right py-2 pl-4 tabular-nums">53×</td></tr>
              <tr className="border-b border-gray-100 dark:border-[#1F1F1F]"><td className="py-2 pr-4">2048×2048</td><td className="text-right py-2 px-4 tabular-nums">2.1 KB</td><td className="text-right py-2 px-4 tabular-nums">320 KB</td><td className="text-right py-2 pl-4 tabular-nums">152×</td></tr>
              <tr><td className="py-2 pr-4">4096×4096</td><td className="text-right py-2 px-4 tabular-nums">2.1 KB</td><td className="text-right py-2 px-4 tabular-nums">920 KB</td><td className="text-right py-2 pl-4 tabular-nums">438×</td></tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The SVG stays 2.1 KB regardless of display size. The PNG grows quadratically because every additional
          pixel needs encoding. This is why you ship SVG to browsers and rasterize only when the target rejects
          SVG.
        </p>

        {/* ── Tools ──────────────────────────────────────────────────────── */}
        <h2 id="tools" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Free browser-based SVG tools
        </h2>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          SammaPix ships three tools covering the full SVG workflow, all running locally in your browser:
        </p>
        <div className="overflow-x-auto my-6">
          <table className="min-w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200 dark:border-[#2A2A2A]">
                <th className="text-left py-2 pr-4 font-semibold text-gray-900 dark:text-[#E5E5E5]">Goal</th>
                <th className="text-left py-2 px-4 font-semibold text-gray-900 dark:text-[#E5E5E5]">Tool</th>
                <th className="text-left py-2 pl-4 font-semibold text-gray-900 dark:text-[#E5E5E5]">Notes</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 dark:text-[#A3A3A3]">
              <tr className="border-b border-gray-100 dark:border-[#1F1F1F]">
                <td className="py-2 pr-4">SVG → PNG (any size)</td>
                <td className="py-2 px-4"><Link href="/tools/svg-to-png" className="text-[#6366F1] hover:underline">SVG to PNG</Link></td>
                <td className="py-2 pl-4">1× / 2× / 3× / 4× / custom up to 8192 px</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-[#1F1F1F]">
                <td className="py-2 pr-4">Multi-size favicon.ico</td>
                <td className="py-2 px-4"><Link href="/tools/ico-generator" className="text-[#6366F1] hover:underline">Favicon Generator</Link></td>
                <td className="py-2 pl-4">Accepts SVG, builds 16/32/48 + optional 64/128/256</td>
              </tr>
              <tr>
                <td className="py-2 pr-4">Compress resulting PNG</td>
                <td className="py-2 px-4"><Link href="/tools/compress" className="text-[#6366F1] hover:underline">Compress Images</Link></td>
                <td className="py-2 pl-4">Extra 10-20% size reduction</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Browse the full toolbox on the <Link href="/" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3]">SammaPix homepage</Link> — 35 free tools, all browser-based.
        </p>

        {/* ── FAQ ────────────────────────────────────────────────────────── */}
        <h2 id="faq" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          FAQ
        </h2>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">When do I actually need to convert SVG to PNG?</h3>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          When the destination does not accept SVG: iOS and Android app icons (fixed sizes required), favicon
          fallback for legacy browsers, email templates (most clients strip SVG), social media uploads, print
          pipelines, and embedding in Word or PDF. For web use, keep the SVG — it scales perfectly at any
          resolution.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">What size PNG should I export from my SVG?</h3>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Depends on the target. Favicons: 16, 32, 48 minimum plus 64, 128, 256 for HiDPI. App icons: 1024×1024
          for both iOS and Play Store. Open Graph: 1200×630. Retina web: 2× the display size. Print at 300 DPI:
          multiply inches by 300. Do not upscale beyond what you need — PNG file size grows quadratically.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">How does the SVG viewBox affect the PNG output?</h3>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The viewBox defines the SVG coordinate system. If your SVG has width/height attributes, that is the
          intrinsic size. A 4× scale produces 4× the pixels. If width and height are missing, rasterizers fall
          back to the viewBox dimensions. For predictable output, always set both on the root SVG element.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">Will transparency be preserved when I convert SVG to PNG?</h3>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Yes, by default. PNG supports 8-bit alpha — same as SVG. Any transparent region stays transparent. For
          apps that need a solid background (iOS App Store), tools including SammaPix offer a background color
          option.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">Why is my PNG file much larger than the SVG source?</h3>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Because SVG encodes shapes as math and PNG stores every pixel. A 2 KB SVG can render at any resolution.
          A 2048×2048 PNG can be 200-500 KB. This is normal and expected — the reason SVG wins on the web.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">Can I batch convert SVG to PNG in the browser?</h3>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Yes.{" "}
          <Link href="/tools/svg-to-png" className="text-[#6366F1] hover:underline">SammaPix SVG to PNG</Link>{" "}
          runs 100% in your browser using the Canvas API. Drop up to 20 SVGs on the free plan (200 on Pro) and
          pick the scale preset or custom width up to 8192 pixels. No server, no upload.
        </p>
      </BlogArticleLayout>
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { APP_URL } from "@/lib/constants";
import BlogArticleLayout from "@/components/blog/BlogArticleLayout";

export const metadata: Metadata = {
  title: "Favicon 2026: The 4 Sizes That Actually Matter (Skip the Other 18)",
  description:
    "Most favicon guides list 22 sizes. You only need 4. The exact PNG/SVG/ICO setup for crisp icons across Chrome, Safari, dark mode, iOS, and PWA — with the 4 HTML tags to copy-paste.",
  alternates: {
    canonical: `${APP_URL}/blog/favicon-best-practices-2026`,
  },
  keywords: [
    "favicon best practices",
    "favicon sizes 2026",
    "favicon svg",
    "favicon dark mode",
    "favicon generator",
    "multi-size favicon",
    "favicon ico",
    "apple-touch-icon",
    "pwa favicon",
    "html favicon tags",
  ],
  openGraph: {
    title: "Favicon 2026: The 4 Sizes That Actually Matter (Skip the Other 18)",
    description:
      "22 favicon sizes? You only need 4. The exact PNG/SVG/ICO setup with copy-paste HTML for every browser.",
    url: `${APP_URL}/blog/favicon-best-practices-2026`,
    type: "article",
    publishedTime: "2026-04-22",
    authors: ["https://lucasammarco.com"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Favicon Best Practices 2026",
    description:
      "Sizes, SVG, dark mode, PWA, the 4 HTML tags — the minimum viable favicon setup in 2026.",
    creator: "@lucasammarco",
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Favicon 2026: The 4 Sizes That Actually Matter (Skip the Other 18)",
  description:
    "Most favicon guides list 22 sizes. You only need 4. The exact PNG/SVG/ICO setup for crisp icons across Chrome, Safari, dark mode, iOS, and PWA — with the 4 HTML tags to copy-paste.",
  url: `${APP_URL}/blog/favicon-best-practices-2026`,
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
    "@id": `${APP_URL}/blog/favicon-best-practices-2026`,
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
      name: "Favicon 2026: The 4 Sizes That Actually Matter (Skip the Other 18)",
      item: `${APP_URL}/blog/favicon-best-practices-2026`,
    },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What favicon sizes do I actually need in 2026?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Minimum viable setup is three files: favicon.svg (served to modern browsers — scales infinitely), favicon.ico with 16, 32, and 48 pixel variants (legacy + Windows taskbar), and apple-touch-icon.png at 180×180 (iOS home screen). That covers 99% of real-world favicon slots. Add 192×192 and 512×512 PNGs for PWA manifest if you ship a Progressive Web App.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use a single SVG as my entire favicon?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Modern browsers accept it — Chrome, Firefox, Edge, and Safari 14+ read SVG favicons natively. But iOS Safari on old iPhones, many RSS readers, some chat previews, and Windows taskbar still expect ICO or PNG. The safe setup is SVG for modern plus ICO + apple-touch-icon as fallback. It is 3 extra files but guarantees visual consistency everywhere.",
      },
    },
    {
      "@type": "Question",
      name: "How do I make a favicon that adapts to dark mode?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Serve a single SVG that contains CSS media queries inside the SVG itself: @media (prefers-color-scheme: dark) { ... }. The SVG switches colors based on the user system theme. This works in Chrome, Firefox, and Edge for the favicon in the browser tab. Safari does not respect favicon SVG media queries yet as of April 2026 — fall back to a neutral color that works on both themes.",
      },
    },
    {
      "@type": "Question",
      name: "Why does my favicon not update when I change it?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Browsers aggressively cache favicons — sometimes for weeks. Force a refresh by adding a cache-busting query string (href=\"/favicon.ico?v=2\") or by appending a hash of the file contents. Clearing the browser cache does not always work because favicons live in a separate long-lived cache. The query string trick is the only reliable invalidation.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between favicon.ico and apple-touch-icon?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "favicon.ico is the legacy multi-size container displayed in browser tabs, bookmarks, and the Windows taskbar. It packs 16, 32, 48 pixel variants (optionally up to 256) into one file. apple-touch-icon.png is a single 180×180 PNG used by iOS when a user adds your site to the home screen — it becomes the app icon. They serve different slots and both are needed for full coverage.",
      },
    },
    {
      "@type": "Question",
      name: "Can I generate all favicon files from one SVG without installing any tool?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. SammaPix Favicon Generator builds a real multi-size favicon.ico from any source image (SVG, PNG, JPG, WebP) directly in your browser — no upload, no signup. For the apple-touch-icon run the SVG through SVG to PNG at 180 pixels wide. Those two tools plus your original SVG cover the full favicon pack.",
      },
    },
  ],
};

export default function FaviconBestPractices2026Page() {
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
        title="Favicon 2026: The 4 Sizes That Actually Matter (Skip the Other 18)"
        slug="favicon-best-practices-2026"
        description="The old answer to &lsquo;what favicon sizes do I need?&rsquo; was an endless grid of 15+ files. In 2026 modern browsers accept SVG natively, iOS ate Apple Touch Startup Image, and Windows tiles quietly died. Here is the minimum viable favicon setup plus everything you need to know about SVG + ICO, dark mode, PWA, and cache invalidation."
        date="2026-04-22"
        dateFormatted="April 22, 2026"
        tags={["Performance"]}
        readingTime={10}
        headings={[
          { id: "minimum-setup", title: "The 2026 minimum viable favicon setup" },
          { id: "every-size", title: "Every favicon size that still matters" },
          { id: "svg-plus-ico", title: "SVG + ICO: the hybrid approach" },
          { id: "four-html-tags", title: "The four HTML tags you actually need" },
          { id: "dark-mode", title: "Dark-mode favicons (and why Safari is behind)" },
          { id: "pwa-manifest", title: "PWA manifest icons" },
          { id: "ios-home-screen", title: "iOS home screen and apple-touch-icon" },
          { id: "windows-pinned", title: "Windows pinned sites and the tile.xml corpse" },
          { id: "rss-preview", title: "RSS readers, chat previews, and the long tail" },
          { id: "cache-invalidation", title: "How to force a favicon cache refresh" },
          { id: "pitfalls", title: "Common pitfalls" },
          { id: "workflow", title: "The full build workflow" },
          { id: "tools", title: "Free browser-based favicon tools" },
          { id: "faq", title: "FAQ" },
        ]}
        summary={[
          "Minimum viable favicon setup in 2026: one SVG + one multi-size favicon.ico + one 180×180 apple-touch-icon.png. Four HTML tags to ship.",
          "Serve SVG to modern browsers (Chrome/Firefox/Edge/Safari 14+) for infinite scaling. Keep ICO and PNG as fallback for legacy clients and iOS home screen.",
          "ICO should contain 16, 32, 48 pixel variants at minimum. Add 64, 128, 256 for HiDPI Windows shortcuts. SammaPix Favicon Generator builds all in one step.",
          "Dark-mode favicons work via CSS media queries inside the SVG — Chrome/Firefox/Edge respect them, Safari does not yet.",
          "Browsers cache favicons aggressively. Query-string busting (?v=2) is the only reliable way to force a refresh.",
        ]}
        heroImage={
          <figure className="my-8">
            <img
              src="https://images.pexels.com/photos/196655/pexels-photo-196655.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Laptop browser with multiple tabs open, each displaying a distinct favicon in the tab bar"
              className="w-full rounded-lg"
              loading="eager"
            />
            <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
              The favicon is the smallest branding surface and the most universally visible — getting it right is 15 minutes of work you do once. Photo by Picjumbo.com on Pexels
            </figcaption>
          </figure>
        }
        ctaBlock={
          <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2">
              Build your favicon pack — free, 100% in your browser
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-4">
              SammaPix Favicon Generator takes any PNG/SVG/JPG/WebP and packs a real multi-size favicon.ico with
              one click. Runs locally via Canvas API — no upload, no signup.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/tools/ico-generator"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
              >
                Try Favicon Generator, Free
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
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
        <div className="mb-8 p-4 bg-gray-50 dark:bg-[#1E1E1E] border-l-4 border-[#6366F1] rounded-r-md">
          <p className="text-xs font-semibold text-[#6366F1] mb-1.5 uppercase tracking-wide">
            TL;DR — minimum viable favicon 2026
          </p>
          <p className="text-sm text-gray-700 dark:text-[#A3A3A3] leading-relaxed">
            Ship 4 files: <code className="text-xs font-mono">favicon.ico</code> (multi-size 16/32/48),{" "}
            <code className="text-xs font-mono">icon.svg</code>,{" "}
            <code className="text-xs font-mono">apple-touch-icon.png</code> (180×180),{" "}
            <code className="text-xs font-mono">icon-512.png</code> (PWA). Add 4 HTML link tags in
            your <code className="text-xs font-mono">&lt;head&gt;</code>. Done — covers every browser
            including dark mode. Copy-paste code below.
          </p>
        </div>

        {/* ── Minimum setup ──────────────────────────────────────────────── */}
        <h2 id="minimum-setup" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          The 2026 minimum viable favicon setup
        </h2>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Most favicon generators from 2015 produced 15-30 files because every browser + OS version expected a
          specific slot. Most of those slots are dead now. In 2026 you ship three files:
        </p>
        <pre className="text-[12px] leading-relaxed bg-gray-50 dark:bg-[#0F0F0F] text-gray-900 dark:text-[#E5E5E5] p-4 rounded-md overflow-x-auto my-4">
          <code>{`public/
├── favicon.svg          # modern browsers, infinite scaling
├── favicon.ico          # multi-size container (16/32/48/+)
└── apple-touch-icon.png # iOS home screen (180×180)`}</code>
        </pre>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Plus four HTML tags in the document <code className="text-xs bg-gray-100 dark:bg-[#1E1E1E] px-1 py-0.5 rounded">&lt;head&gt;</code>.
          That is the complete setup. Everything else is either redundant or only needed for specific edge cases
          (PWA manifest, dark mode, legacy Windows tiles).
        </p>

        {/* ── Every size ─────────────────────────────────────────────────── */}
        <h2 id="every-size" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Every favicon size that still matters
        </h2>
        <div className="overflow-x-auto my-6">
          <table className="min-w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200 dark:border-[#2A2A2A]">
                <th className="text-left py-2 pr-4 font-semibold text-gray-900 dark:text-[#E5E5E5]">Size</th>
                <th className="text-left py-2 px-4 font-semibold text-gray-900 dark:text-[#E5E5E5]">Where it appears</th>
                <th className="text-left py-2 pl-4 font-semibold text-gray-900 dark:text-[#E5E5E5]">Required?</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 dark:text-[#A3A3A3]">
              <tr className="border-b border-gray-100 dark:border-[#1F1F1F]"><td className="py-2 pr-4">16×16</td><td className="py-2 px-4">Browser tab, bookmarks bar</td><td className="py-2 pl-4 text-emerald-600 dark:text-emerald-400">Required</td></tr>
              <tr className="border-b border-gray-100 dark:border-[#1F1F1F]"><td className="py-2 pr-4">32×32</td><td className="py-2 px-4">Retina browser tabs, some macOS contexts</td><td className="py-2 pl-4 text-emerald-600 dark:text-emerald-400">Required</td></tr>
              <tr className="border-b border-gray-100 dark:border-[#1F1F1F]"><td className="py-2 pr-4">48×48</td><td className="py-2 px-4">Windows taskbar site pinning</td><td className="py-2 pl-4 text-emerald-600 dark:text-emerald-400">Required</td></tr>
              <tr className="border-b border-gray-100 dark:border-[#1F1F1F]"><td className="py-2 pr-4">64×64, 128×128</td><td className="py-2 px-4">HiDPI Windows / Chrome desktop shortcuts</td><td className="py-2 pl-4">Recommended</td></tr>
              <tr className="border-b border-gray-100 dark:border-[#1F1F1F]"><td className="py-2 pr-4">180×180</td><td className="py-2 px-4">iOS home screen (apple-touch-icon)</td><td className="py-2 pl-4 text-emerald-600 dark:text-emerald-400">Required (if any iOS traffic)</td></tr>
              <tr className="border-b border-gray-100 dark:border-[#1F1F1F]"><td className="py-2 pr-4">192×192, 512×512</td><td className="py-2 px-4">PWA manifest, Android install prompts</td><td className="py-2 pl-4">Required if PWA</td></tr>
              <tr className="border-b border-gray-100 dark:border-[#1F1F1F]"><td className="py-2 pr-4">256×256</td><td className="py-2 px-4">Windows 10/11 large tiles</td><td className="py-2 pl-4">Optional</td></tr>
              <tr><td className="py-2 pr-4">1024×1024</td><td className="py-2 px-4">App store submission (separate from web favicon)</td><td className="py-2 pl-4">App-only</td></tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          For deep coverage of app icon sizes specifically, see our{" "}
          <Link href="/blog/svg-to-png-complete-guide-developers" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3]">
            SVG to PNG developer guide
          </Link>
          .
        </p>

        {/* ── SVG + ICO ──────────────────────────────────────────────────── */}
        <h2 id="svg-plus-ico" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          SVG + ICO: the hybrid approach
        </h2>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          SVG favicons are the future — one file, infinite resolution, CSS-themable. But as of April 2026 their
          support has gaps:
        </p>
        <ul className="list-disc pl-6 space-y-1.5 text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-4">
          <li><strong className="text-gray-900 dark:text-[#E5E5E5]">Chrome, Firefox, Edge, Safari 14+</strong>: full support for SVG favicons in tabs.</li>
          <li><strong className="text-gray-900 dark:text-[#E5E5E5]">iOS Safari home screen</strong>: still expects raster (apple-touch-icon.png).</li>
          <li><strong className="text-gray-900 dark:text-[#E5E5E5]">Windows taskbar pin</strong>: uses ICO variants, ignores SVG.</li>
          <li><strong className="text-gray-900 dark:text-[#E5E5E5]">Many email clients / RSS readers</strong>: parse only ICO or PNG.</li>
          <li><strong className="text-gray-900 dark:text-[#E5E5E5]">Slack, Discord, link previews</strong>: some respect SVG, some do not.</li>
        </ul>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The hybrid approach solves this: modern browsers fetch and render the SVG first, legacy clients fall
          back to ICO or the apple-touch-icon PNG. The browser picks automatically based on link rel ordering and
          Accept header.
        </p>

        {/* ── Four HTML tags ─────────────────────────────────────────────── */}
        <h2 id="four-html-tags" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          The four HTML tags you actually need
        </h2>
        <pre className="text-[12px] leading-relaxed bg-gray-50 dark:bg-[#0F0F0F] text-gray-900 dark:text-[#E5E5E5] p-4 rounded-md overflow-x-auto my-4">
          <code>{`<!-- Legacy fallback (ICO) -->
<link rel="icon" href="/favicon.ico" sizes="any">

<!-- Modern browsers (SVG) -->
<link rel="icon" href="/favicon.svg" type="image/svg+xml">

<!-- iOS home screen -->
<link rel="apple-touch-icon" href="/apple-touch-icon.png">

<!-- PWA manifest (only if you ship a PWA) -->
<link rel="manifest" href="/manifest.webmanifest">`}</code>
        </pre>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Three lines if you do not ship a PWA, four if you do. Anything more is ceremony or legacy bloat.{" "}
          <code className="text-xs bg-gray-100 dark:bg-[#1E1E1E] px-1 py-0.5 rounded">sizes=&quot;any&quot;</code>{" "}
          on the ICO link tells modern browsers &ldquo;ignore this file and prefer the SVG&rdquo; — critical for
          the hybrid to work.
        </p>

        {/* ── Dark mode ──────────────────────────────────────────────────── */}
        <h2 id="dark-mode" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Dark-mode favicons (and why Safari is behind)
        </h2>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          A black favicon on a dark browser tab disappears. A white favicon on a light tab disappears. The fix is
          to embed a CSS media query inside the SVG itself:
        </p>
        <pre className="text-[12px] leading-relaxed bg-gray-50 dark:bg-[#0F0F0F] text-gray-900 dark:text-[#E5E5E5] p-4 rounded-md overflow-x-auto my-4">
          <code>{`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <style>
    circle { fill: #171717 }
    @media (prefers-color-scheme: dark) {
      circle { fill: #ffffff }
    }
  </style>
  <circle cx="32" cy="32" r="28"/>
</svg>`}</code>
        </pre>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          This works in Chrome, Firefox, and Edge — the browser re-evaluates the SVG styles based on the user OS
          theme. <strong className="text-gray-900 dark:text-[#E5E5E5]">Safari ignores favicon SVG media queries as of April 2026.</strong>{" "}
          The fallback is to pick a neutral base color (medium gray, or a brand color that reads on both light
          and dark) so the Safari tab is not broken.
        </p>

        {/* ── PWA manifest ───────────────────────────────────────────────── */}
        <h2 id="pwa-manifest" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          PWA manifest icons
        </h2>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          If your site is installable as a Progressive Web App, the browser needs two PNGs declared in{" "}
          <code className="text-xs bg-gray-100 dark:bg-[#1E1E1E] px-1 py-0.5 rounded">manifest.webmanifest</code>:
        </p>
        <pre className="text-[12px] leading-relaxed bg-gray-50 dark:bg-[#0F0F0F] text-gray-900 dark:text-[#E5E5E5] p-4 rounded-md overflow-x-auto my-4">
          <code>{`{
  "name": "Your App",
  "short_name": "App",
  "icons": [
    { "src": "/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icon-512.png", "sizes": "512x512", "type": "image/png" },
    { "src": "/icon-512.png", "sizes": "512x512", "type": "image/png",
      "purpose": "maskable" }
  ]
}`}</code>
        </pre>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The <strong className="text-gray-900 dark:text-[#E5E5E5]">maskable</strong> purpose matters for Android —
          it tells the OS it can crop your icon into any shape (circle, squircle, rounded square) without
          breaking. Keep 20% padding around the visible logo so the maskable crop does not cut content.
        </p>

        {/* ── iOS home screen ────────────────────────────────────────────── */}
        <h2 id="ios-home-screen" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          iOS home screen and apple-touch-icon
        </h2>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          When someone taps &ldquo;Add to Home Screen&rdquo; in iOS Safari, iOS fetches{" "}
          <code className="text-xs bg-gray-100 dark:bg-[#1E1E1E] px-1 py-0.5 rounded">/apple-touch-icon.png</code>{" "}
          (or <code className="text-xs bg-gray-100 dark:bg-[#1E1E1E] px-1 py-0.5 rounded">/apple-touch-icon-180x180.png</code>,
          or whatever is declared via <code className="text-xs bg-gray-100 dark:bg-[#1E1E1E] px-1 py-0.5 rounded">&lt;link rel=&quot;apple-touch-icon&quot;&gt;</code>)
          and uses it as the app icon on the home screen.
        </p>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          iOS requires a <strong className="text-gray-900 dark:text-[#E5E5E5]">180×180 PNG without transparency</strong>
          and without rounded corners — iOS applies the rounded-square mask itself. If you ship a transparent PNG, iOS
          composites it on a white background automatically, which usually looks fine but can surprise you. For
          maximum control, flatten to a brand-color background.
        </p>

        {/* ── Windows pinned ─────────────────────────────────────────────── */}
        <h2 id="windows-pinned" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Windows pinned sites and the tile.xml corpse
        </h2>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Circa 2012-2019 Windows wanted you to ship{" "}
          <code className="text-xs bg-gray-100 dark:bg-[#1E1E1E] px-1 py-0.5 rounded">browserconfig.xml</code>{" "}
          with tile colors and a dedicated set of PNGs for Internet Explorer 11 pinned sites and Windows 8/10
          Start Menu tiles. IE11 died, Windows 11 removed Live Tiles — none of it is needed anymore. Most
          favicon generators still produce these files out of inertia.
        </p>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Skip the tile.xml and browserconfig.xml. If you inherited them from an old project, delete them —
          nothing breaks.
        </p>

        {/* ── RSS preview ────────────────────────────────────────────────── */}
        <h2 id="rss-preview" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          RSS readers, chat previews, and the long tail
        </h2>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The long tail of favicon consumers: Feedly, Reeder, Inoreader, NetNewsWire, Slack link previews,
          Discord embeds, Microsoft Teams cards, various podcast apps. Behavior is inconsistent — some fetch the
          SVG, some the ICO, some an Open Graph image. You cannot test them all.
        </p>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          What works reliably across the long tail: a 192×192 PNG served at <code className="text-xs bg-gray-100 dark:bg-[#1E1E1E] px-1 py-0.5 rounded">/icon-192.png</code>,
          discoverable via Open Graph image meta tag or the manifest. Most readers that cannot parse SVG fall
          back to this.
        </p>

        {/* ── Cache invalidation ─────────────────────────────────────────── */}
        <h2 id="cache-invalidation" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          How to force a favicon cache refresh
        </h2>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          You updated the favicon. It has been an hour. Nothing changed in the browser tab. This is infuriating
          and universal. Browsers cache favicons for weeks, sometimes months. Clearing the normal browser cache
          does not clear the favicon cache.
        </p>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The only reliable fix is a query-string version:
        </p>
        <pre className="text-[12px] leading-relaxed bg-gray-50 dark:bg-[#0F0F0F] text-gray-900 dark:text-[#E5E5E5] p-4 rounded-md overflow-x-auto my-4">
          <code>{`<link rel="icon" href="/favicon.ico?v=2" sizes="any">
<link rel="icon" href="/favicon.svg?v=2" type="image/svg+xml">`}</code>
        </pre>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Bump the version string every time the favicon changes. Some build systems automate this with content
          hashing (<code className="text-xs bg-gray-100 dark:bg-[#1E1E1E] px-1 py-0.5 rounded">favicon.abc123.ico</code>),
          which is even better for long-lived caching.
        </p>

        {/* ── Pitfalls ───────────────────────────────────────────────────── */}
        <h2 id="pitfalls" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Common pitfalls
        </h2>
        <ul className="list-disc pl-6 space-y-1.5 text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-4">
          <li><strong className="text-gray-900 dark:text-[#E5E5E5]">Too-detailed logo at 16×16.</strong> Anti-aliasing turns any logo with thin lines into mush at this size. Test the 16×16 render before shipping — simplify if needed.</li>
          <li><strong className="text-gray-900 dark:text-[#E5E5E5]">Transparent favicon on iOS.</strong> Safari composites a white background by default. Intentional-looking or surprising depends on the logo.</li>
          <li><strong className="text-gray-900 dark:text-[#E5E5E5]">ICO without the 16×16 variant.</strong> Some ICO generators default to 32+ only. Browser tabs end up rendering a blurry downscaled 32. Always include 16.</li>
          <li><strong className="text-gray-900 dark:text-[#E5E5E5]">Missing sizes=&quot;any&quot; on the ICO link.</strong> Without it, Chrome and Firefox prefer the ICO over the SVG. Your modern browsers miss the SVG benefit.</li>
          <li><strong className="text-gray-900 dark:text-[#E5E5E5]">SVG with external fonts or images.</strong> Favicons load in a restricted context — external resources do not load. Inline everything or convert text to paths.</li>
        </ul>

        {/* ── Workflow ───────────────────────────────────────────────────── */}
        <h2 id="workflow" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          The full build workflow
        </h2>
        <ol className="list-decimal pl-6 space-y-2 text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-4">
          <li>Design the logo as SVG. Square canvas (e.g. 64×64 viewBox) with the logo centered and some padding.</li>
          <li>Test the SVG at 16×16 by scaling it in the browser — if it becomes illegible, simplify.</li>
          <li>Save <code className="text-xs bg-gray-100 dark:bg-[#1E1E1E] px-1 py-0.5 rounded">public/favicon.svg</code>.</li>
          <li>Open <Link href="/tools/ico-generator" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3]">SammaPix Favicon Generator</Link>, drop the SVG, pick 16/32/48 (+ 64/128/256 optionally), download <code className="text-xs bg-gray-100 dark:bg-[#1E1E1E] px-1 py-0.5 rounded">favicon.ico</code>.</li>
          <li>Run the SVG through <Link href="/tools/svg-to-png" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3]">SammaPix SVG to PNG</Link> at custom width 180, save as <code className="text-xs bg-gray-100 dark:bg-[#1E1E1E] px-1 py-0.5 rounded">public/apple-touch-icon.png</code>.</li>
          <li>(Optional) Same tool at width 192 and 512 for PWA icons.</li>
          <li>Add the four HTML tags to your layout <code className="text-xs bg-gray-100 dark:bg-[#1E1E1E] px-1 py-0.5 rounded">&lt;head&gt;</code>.</li>
          <li>Hard-refresh, confirm the favicon renders on Chrome, Firefox, Safari, and iOS.</li>
        </ol>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Total time: 15 minutes once you know the shape. For reference on format tradeoffs read our{" "}
          <Link href="/blog/best-image-format-for-web-2026" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3]">
            complete image format guide
          </Link>
          {" "}and the{" "}
          <Link href="/blog/png-to-jpg-vs-webp-2026" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3]">
            PNG to JPG vs WebP analysis
          </Link>
          .
        </p>

        {/* ── Tools ──────────────────────────────────────────────────────── */}
        <h2 id="tools" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Free browser-based favicon tools
        </h2>
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
              <tr className="border-b border-gray-100 dark:border-[#1F1F1F]"><td className="py-2 pr-4">Multi-size favicon.ico</td><td className="py-2 px-4"><Link href="/tools/ico-generator" className="text-[#6366F1] hover:underline">Favicon Generator</Link></td><td className="py-2 pl-4">SVG/PNG/JPG/WebP → 16/32/48/64/128/256</td></tr>
              <tr className="border-b border-gray-100 dark:border-[#1F1F1F]"><td className="py-2 pr-4">SVG → apple-touch-icon.png</td><td className="py-2 px-4"><Link href="/tools/svg-to-png" className="text-[#6366F1] hover:underline">SVG to PNG</Link></td><td className="py-2 pl-4">Custom width 180 px, transparency preserved</td></tr>
              <tr className="border-b border-gray-100 dark:border-[#1F1F1F]"><td className="py-2 pr-4">Compress the output PNGs</td><td className="py-2 px-4"><Link href="/tools/compress" className="text-[#6366F1] hover:underline">Compress Images</Link></td><td className="py-2 pl-4">Extra 20-40% reduction on 180/192/512</td></tr>
              <tr><td className="py-2 pr-4">Convert raster → WebP</td><td className="py-2 px-4"><Link href="/tools/webp" className="text-[#6366F1] hover:underline">WebP Converter</Link></td><td className="py-2 pl-4">Only for manifest icons if CDN supports WebP</td></tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Full set of 35 tools on the <Link href="/" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3]">SammaPix homepage</Link>.
        </p>

        {/* ── FAQ ────────────────────────────────────────────────────────── */}
        <h2 id="faq" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          FAQ
        </h2>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">What favicon sizes do I actually need in 2026?</h3>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Minimum viable setup is three files: favicon.svg for modern browsers, favicon.ico with 16/32/48
          variants, apple-touch-icon.png at 180×180. Add 192×192 and 512×512 PNGs if you ship a PWA.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">Can I use a single SVG as my entire favicon?</h3>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Modern browsers accept it, but iOS home screen, Windows taskbar, and many RSS readers need ICO or PNG.
          Ship SVG + ICO + apple-touch-icon for full coverage.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">How do I make a favicon that adapts to dark mode?</h3>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Embed a CSS media query inside the SVG with prefers-color-scheme dark. Works in Chrome, Firefox, Edge.
          Safari does not respect it yet — fall back to a neutral color that reads on both themes.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">Why does my favicon not update when I change it?</h3>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Browsers cache favicons aggressively in a separate long-lived cache. Force refresh with a query-string
          version bump like href=/favicon.ico?v=2 whenever you change it.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">What is the difference between favicon.ico and apple-touch-icon?</h3>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          favicon.ico is the legacy multi-size container for browser tabs and Windows taskbar. apple-touch-icon
          is a single 180×180 PNG used by iOS for home screen shortcuts. Both are needed for full coverage.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">Can I generate all favicon files from one SVG without installing any tool?</h3>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Yes.{" "}
          <Link href="/tools/ico-generator" className="text-[#6366F1] hover:underline">SammaPix Favicon Generator</Link>{" "}
          builds the multi-size ICO. Run the SVG through{" "}
          <Link href="/tools/svg-to-png" className="text-[#6366F1] hover:underline">SVG to PNG</Link>{" "}
          at 180 pixels for apple-touch-icon. No upload, no signup.
        </p>
      </BlogArticleLayout>
    </>
  );
}

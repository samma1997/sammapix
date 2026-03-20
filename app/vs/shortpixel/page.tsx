import type { Metadata } from "next";
import Link from "next/link";
import { APP_URL } from "@/lib/constants";
import { Check, X, ArrowRight, Zap, Sparkles, Lock, FileImage } from "lucide-react";
import SiteGroundBanner from "@/components/ads/SiteGroundBanner";

export const metadata: Metadata = {
  title: "SammaPix vs ShortPixel - Free Image Compression Comparison 2026",
  description: "SammaPix vs ShortPixel comparison. SammaPix is 100% free, browser-based, and never uploads your files. ShortPixel requires an API key and server-side processing.",
  keywords: [
    "shortpixel alternative",
    "shortpixel vs",
    "free shortpixel alternative",
    "sammapix vs shortpixel",
    "image compression without upload",
  ],
  alternates: {
    canonical: `${APP_URL}/vs/shortpixel`,
  },
  openGraph: {
    title: "SammaPix vs ShortPixel - Honest Comparison 2026",
    description: "ShortPixel is a solid paid tool. SammaPix is free, browser-based, and adds AI rename- no API key or server upload required.",
    type: "website",
    url: `${APP_URL}/vs/shortpixel`,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SammaPix vs ShortPixel comparison",
      },
    ],
  },
};

const tableRows = [
  { feature: "JPG / PNG compression", sammapix: true, shortpixel: true },
  { feature: "WebP conversion", sammapix: true, shortpixel: true },
  { feature: "AVIF support", sammapix: false, shortpixel: true },
  { feature: "AI-powered image renaming", sammapix: true, shortpixel: false },
  { feature: "AI alt text generation", sammapix: true, shortpixel: false },
  { feature: "Processes entirely in browser", sammapix: true, shortpixel: false },
  { feature: "No file upload to server", sammapix: true, shortpixel: false },
  { feature: "Free plan available", sammapix: true, shortpixel: "100 credits/mo" },
  { feature: "No account required (compress)", sammapix: true, shortpixel: false },
  { feature: "Batch download as ZIP", sammapix: true, shortpixel: true },
  { feature: "Quality control slider", sammapix: true, shortpixel: true },
  { feature: "EXIF data removal", sammapix: true, shortpixel: false },
  { feature: "WordPress plugin", sammapix: false, shortpixel: true },
  { feature: "CDN delivery", sammapix: false, shortpixel: "Paid" },
  { feature: "API access", sammapix: "Pro", shortpixel: "Paid" },
  { feature: "Price for paid plan", sammapix: "$9/mo", shortpixel: "$4.99/mo (credits)" },
];

function Cell({ value }: { value: boolean | string }) {
  if (value === true) return <Check className="h-4 w-4 text-green-500 mx-auto" strokeWidth={2} />;
  if (value === false) return <X className="h-4 w-4 text-gray-300 mx-auto" strokeWidth={2} />;
  return <span className="text-xs text-gray-600 font-medium">{value}</span>;
}

export default function VsShortPixelPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-gray-400 mb-10">
        <Link href="/" className="hover:text-gray-600 transition-colors">SammaPix</Link>
        <span>/</span>
        <span>vs ShortPixel</span>
      </div>

      {/* Hero */}
      <div className="text-center mb-14">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-100 border border-gray-200 rounded-full text-xs text-gray-500 font-medium mb-6">
          Honest comparison- no sponsored ranking
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight mb-4 leading-tight">
          SammaPix vs ShortPixel
        </h1>
        <p className="text-lg text-gray-500 max-w-xl mx-auto">
          ShortPixel is a well-known image compression service- but it sends your files to a server and runs on a credit system. SammaPix is completely free, processes everything in your browser, and adds AI-powered renaming.
        </p>
        <div className="mt-8">
          <Link href="/">
            <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-md hover:bg-gray-800 transition-colors">
              Try SammaPix free
              <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
            </button>
          </Link>
        </div>
      </div>

      {/* Quick verdict */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-14">
        <div className="p-5 border border-indigo-200 bg-indigo-50/40 rounded-md">
          <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wide mb-2">Choose SammaPix if you…</p>
          <ul className="space-y-1.5 text-sm text-gray-700">
            <li className="flex items-start gap-2"><Check className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" strokeWidth={2} /> Want 100% free compression with no credit limits</li>
            <li className="flex items-start gap-2"><Check className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" strokeWidth={2} /> Care about privacy (files never leave your device)</li>
            <li className="flex items-start gap-2"><Check className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" strokeWidth={2} /> Need AI-generated SEO filenames and alt text</li>
            <li className="flex items-start gap-2"><Check className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" strokeWidth={2} /> Don&apos;t want to create an account just to compress</li>
          </ul>
        </div>
        <div className="p-5 border border-gray-200 bg-gray-50/60 rounded-md">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Choose ShortPixel if you…</p>
          <ul className="space-y-1.5 text-sm text-gray-700">
            <li className="flex items-start gap-2"><Check className="h-4 w-4 text-gray-400 mt-0.5 shrink-0" strokeWidth={2} /> Use WordPress and need a plugin that auto-optimizes</li>
            <li className="flex items-start gap-2"><Check className="h-4 w-4 text-gray-400 mt-0.5 shrink-0" strokeWidth={2} /> Need AVIF compression output</li>
            <li className="flex items-start gap-2"><Check className="h-4 w-4 text-gray-400 mt-0.5 shrink-0" strokeWidth={2} /> Want CDN-delivered, automatically compressed images</li>
          </ul>
        </div>
      </div>

      {/* Comparison table */}
      <div className="mb-14">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Feature comparison</h2>
        <div className="border border-gray-200 rounded-md overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-4 py-3 font-medium text-gray-500 w-1/2">Feature</th>
                <th className="text-center px-4 py-3 font-semibold text-gray-900 w-1/4">SammaPix</th>
                <th className="text-center px-4 py-3 font-medium text-gray-500 w-1/4">ShortPixel</th>
              </tr>
            </thead>
            <tbody>
              {tableRows.map((row, i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                  <td className="px-4 py-3 text-gray-600">{row.feature}</td>
                  <td className="px-4 py-3 text-center"><Cell value={row.sammapix} /></td>
                  <td className="px-4 py-3 text-center"><Cell value={row.shortpixel} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Key differences */}
      <div className="mb-14">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">The key differences</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-base font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <Lock className="h-4 w-4 text-gray-500" strokeWidth={1.5} />
              Privacy - ShortPixel uploads your images to its servers
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              ShortPixel&apos;s compression engine runs on their servers, which means every image you process is transmitted over the internet. SammaPix compresses and converts entirely in your browser using WebAssembly and the Canvas API. Your files stay on your device at all times- critical if you handle client photos, legal documents, or private images.
            </p>
          </div>
          <div>
            <h3 className="text-base font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <FileImage className="h-4 w-4 text-gray-500" strokeWidth={1.5} />
              Credits vs. truly free- a real difference for casual users
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              ShortPixel&apos;s free tier gives you 100 credits per month- each compressed image uses one credit. If you exceed the limit you need to buy more. SammaPix&apos;s compression is unlimited and free forever, no credit system, no account required. You can compress 500 images in a day and pay nothing.
            </p>
          </div>
          <div>
            <h3 className="text-base font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-indigo-500" strokeWidth={1.5} />
              AI rename- a feature ShortPixel doesn&apos;t offer
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              SammaPix uses Google Gemini to analyze each image and generate an SEO-friendly filename and alt text description. Upload <code className="text-xs bg-gray-100 px-1 py-0.5 rounded">IMG_7732.jpg</code>, get back <code className="text-xs bg-gray-100 px-1 py-0.5 rounded">fresh-basil-pasta-recipe-close-up.webp</code>. ShortPixel focuses purely on compression and delivery- it has no AI rename feature at any price point.
            </p>
          </div>
          <div>
            <h3 className="text-base font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <Zap className="h-4 w-4 text-gray-500" strokeWidth={1.5} />
              Where ShortPixel wins - WordPress and automation
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              ShortPixel&apos;s WordPress plugin is its strongest selling point. It automatically compresses every image you upload to WordPress, with no manual steps. If your entire workflow lives inside WordPress, ShortPixel is a natural fit. SammaPix is a browser-based tool designed for manual batch workflows- it has no WordPress plugin.
            </p>
          </div>
        </div>
      </div>

      {/* Who should switch */}
      <div className="mb-14 p-6 border border-gray-200 rounded-md bg-gray-50/40">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Who should switch from ShortPixel to SammaPix?</h2>
        <p className="text-sm text-gray-600 leading-relaxed mb-4">
          ShortPixel is a reliable paid service with a strong WordPress focus. Consider SammaPix if:
        </p>
        <ul className="space-y-3 text-sm text-gray-600">
          <li className="flex items-start gap-3">
            <Check className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" strokeWidth={2} />
            <span><strong className="text-gray-800">You&apos;re hitting ShortPixel&apos;s monthly credit limits.</strong> SammaPix compression has no limits- process as many files as you need, for free.</span>
          </li>
          <li className="flex items-start gap-3">
            <Check className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" strokeWidth={2} />
            <span><strong className="text-gray-800">You work with sensitive images.</strong> Legal, medical, or client photos should not be uploaded to third-party servers. SammaPix is 100% client-side.</span>
          </li>
          <li className="flex items-start gap-3">
            <Check className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" strokeWidth={2} />
            <span><strong className="text-gray-800">You want SEO-optimized filenames automatically.</strong> ShortPixel compresses your images but keeps the original filenames. SammaPix can rename them with AI in the same workflow.</span>
          </li>
          <li className="flex items-start gap-3">
            <Check className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" strokeWidth={2} />
            <span><strong className="text-gray-800">You don&apos;t use WordPress.</strong> For standalone websites, static sites, or manual workflows, a browser tool like SammaPix is faster and simpler.</span>
          </li>
        </ul>
      </div>

      {/* Internal links */}
      <div className="mb-14">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Explore SammaPix tools</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Link href="/tools/compress" className="flex items-center justify-between p-4 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors group">
            <div>
              <p className="text-sm font-medium text-gray-900">Image Compressor</p>
              <p className="text-xs text-gray-500 mt-0.5">Compress JPG, PNG, WebP- 100% free, no upload</p>
            </div>
            <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-gray-600 transition-colors" strokeWidth={1.5} />
          </Link>
          <Link href="/tools/ai-rename" className="flex items-center justify-between p-4 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors group">
            <div>
              <p className="text-sm font-medium text-gray-900">AI Rename</p>
              <p className="text-xs text-gray-500 mt-0.5">Generate SEO filenames and alt text with Gemini</p>
            </div>
            <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-gray-600 transition-colors" strokeWidth={1.5} />
          </Link>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="border border-gray-200 rounded-md p-8 text-center bg-gray-50">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Ready for a free ShortPixel alternative?</h2>
        <p className="text-sm text-gray-500 mb-6">
          No signup required for compression. No credit limits. Files never leave your browser.
        </p>
        <Link href="/">
          <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-md hover:bg-gray-800 transition-colors">
            Open SammaPix
            <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
          </button>
        </Link>
      </div>

      {/* Affiliate banners */}
      <div className="mt-8 space-y-3">
        <SiteGroundBanner variant="web-hosting" />
      </div>

      {/* Schema.org - Article */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "SammaPix vs ShortPixel - Which Image Compressor is Better in 2026?",
            description: "Detailed feature comparison between SammaPix and ShortPixel image compression tools.",
            author: { "@type": "Person", name: "Luca Sammarco" },
            publisher: { "@type": "Organization", name: "SammaPix", url: APP_URL },
            datePublished: "2026-03-12",
            dateModified: "2026-03-12",
          }),
        }}
      />

      {/* Schema.org - WebPage + ItemList comparison */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "SammaPix vs ShortPixel",
            description: "Feature-by-feature comparison between SammaPix and ShortPixel",
            url: `${APP_URL}/vs/shortpixel`,
            mainEntity: {
              "@type": "ItemList",
              name: "Feature Comparison",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Price", description: "SammaPix: Free (Pro $9/mo) | ShortPixel: 100 free credits/mo, then paid" },
                { "@type": "ListItem", position: 2, name: "No upload required", description: "SammaPix: Yes- 100% browser-based | ShortPixel: No- uploads to server" },
                { "@type": "ListItem", position: 3, name: "AI image renaming", description: "SammaPix: Yes (Google Gemini) | ShortPixel: No" },
                { "@type": "ListItem", position: 4, name: "WebP conversion", description: "SammaPix: Yes | ShortPixel: Yes" },
                { "@type": "ListItem", position: 5, name: "WordPress plugin", description: "SammaPix: No | ShortPixel: Yes" },
                { "@type": "ListItem", position: 6, name: "EXIF metadata removal", description: "SammaPix: Yes | ShortPixel: No" },
                { "@type": "ListItem", position: 7, name: "No account required", description: "SammaPix: Yes (for compression) | ShortPixel: No- account required" },
              ],
            },
          }),
        }}
      />

      {/* Schema.org - BreadcrumbList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: `${APP_URL}` },
              { "@type": "ListItem", position: 2, name: "Comparisons", item: `${APP_URL}/vs` },
              { "@type": "ListItem", position: 3, name: "SammaPix vs ShortPixel", item: `${APP_URL}/vs/shortpixel` },
            ],
          }),
        }}
      />

      {/* Schema.org - FAQPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Is SammaPix better than ShortPixel?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "SammaPix and ShortPixel serve different audiences. ShortPixel is a WordPress plugin designed for automated server-side optimization. SammaPix is a browser-based tool for manual workflows with stronger privacy, no file uploads, AI renaming, and WebP conversion. For WordPress sites, ShortPixel is excellent. For non-WordPress workflows or privacy-sensitive work, SammaPix is better and entirely free.",
                },
              },
              {
                "@type": "Question",
                name: "Is ShortPixel free?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "ShortPixel offers a free tier with 100 image credits per month. Once you exceed this limit, you must switch to a paid plan. SammaPix offers unlimited compression in the free tier.",
                },
              },
              {
                "@type": "Question",
                name: "What can SammaPix do that ShortPixel can't?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "SammaPix offers unique features that ShortPixel lacks: 100% in-browser processing with no file uploads, AI-powered image renaming and alt text generation, EXIF metadata removal, unlimited free compression with no credit system, and no account required for core tools.",
                },
              },
            ],
          }),
        }}
      />
    </div>
  );
}

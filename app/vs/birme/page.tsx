import type { Metadata } from "next";
import Link from "next/link";
import { APP_URL } from "@/lib/constants";
import { Check, X, ArrowRight, Zap, Sparkles, Lock, FileImage } from "lucide-react";
import SiteGroundBanner from "@/components/ads/SiteGroundBanner";

export const metadata: Metadata = {
  title: "SammaPix vs Birme — Bulk Image Resize & Optimize Comparison 2026",
  description: "SammaPix vs Birme for bulk image resizing and optimization. SammaPix adds WebP conversion, AI rename, EXIF removal, and compression — all browser-based and free.",
  keywords: [
    "birme alternative",
    "bulk image resize free",
    "birme vs sammapix",
    "birme vs",
    "free bulk image resizer",
  ],
  alternates: {
    canonical: `${APP_URL}/vs/birme`,
  },
  openGraph: {
    title: "SammaPix vs Birme — Bulk Image Tools Comparison 2026",
    description: "Birme is handy for bulk resizing. SammaPix does that and more — compression, WebP conversion, AI rename, EXIF removal — all free in-browser.",
    type: "website",
    url: `${APP_URL}/vs/birme`,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SammaPix vs Birme comparison",
      },
    ],
  },
};

const tableRows = [
  { feature: "Bulk image resize", sammapix: true, birme: true },
  { feature: "JPG / PNG compression", sammapix: true, birme: false },
  { feature: "WebP conversion", sammapix: true, birme: false },
  { feature: "AI-powered image renaming", sammapix: true, birme: false },
  { feature: "AI alt text generation", sammapix: true, birme: false },
  { feature: "Processes entirely in browser", sammapix: true, birme: true },
  { feature: "No file upload to server", sammapix: true, birme: true },
  { feature: "EXIF data removal", sammapix: true, birme: false },
  { feature: "Quality control slider", sammapix: true, birme: false },
  { feature: "Batch download as ZIP", sammapix: true, birme: true },
  { feature: "Resize by pixels or percentage", sammapix: true, birme: true },
  { feature: "Crop / aspect ratio control", sammapix: true, birme: true },
  { feature: "No account required", sammapix: true, birme: true },
  { feature: "Actively maintained", sammapix: true, birme: "Uncertain" },
  { feature: "Free to use", sammapix: true, birme: true },
  { feature: "Price for paid plan", sammapix: "$7/mo", birme: "N/A" },
];

function Cell({ value }: { value: boolean | string }) {
  if (value === true) return <Check className="h-4 w-4 text-green-500 mx-auto" strokeWidth={2} />;
  if (value === false) return <X className="h-4 w-4 text-gray-300 mx-auto" strokeWidth={2} />;
  return <span className="text-xs text-gray-600 font-medium">{value}</span>;
}

export default function VsBirmePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-gray-400 mb-10">
        <Link href="/" className="hover:text-gray-600 transition-colors">SammaPix</Link>
        <span>/</span>
        <span>vs Birme</span>
      </div>

      {/* Hero */}
      <div className="text-center mb-14">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-100 border border-gray-200 rounded-full text-xs text-gray-500 font-medium mb-6">
          Honest comparison — no sponsored ranking
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight mb-4 leading-tight">
          SammaPix vs Birme
        </h1>
        <p className="text-lg text-gray-500 max-w-xl mx-auto">
          Birme is a solid free tool for bulk image resizing. SammaPix covers everything Birme does — and adds compression, WebP conversion, AI-powered renaming, and EXIF removal in the same browser-based, no-upload workflow.
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
            <li className="flex items-start gap-2"><Check className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" strokeWidth={2} /> Need bulk resize AND compression in one workflow</li>
            <li className="flex items-start gap-2"><Check className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" strokeWidth={2} /> Want WebP output for better web performance</li>
            <li className="flex items-start gap-2"><Check className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" strokeWidth={2} /> Need AI-generated filenames for SEO</li>
            <li className="flex items-start gap-2"><Check className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" strokeWidth={2} /> Want EXIF metadata stripped from output files</li>
          </ul>
        </div>
        <div className="p-5 border border-gray-200 bg-gray-50/60 rounded-md">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Choose Birme if you…</p>
          <ul className="space-y-1.5 text-sm text-gray-700">
            <li className="flex items-start gap-2"><Check className="h-4 w-4 text-gray-400 mt-0.5 shrink-0" strokeWidth={2} /> Only need bulk resizing with no other features</li>
            <li className="flex items-start gap-2"><Check className="h-4 w-4 text-gray-400 mt-0.5 shrink-0" strokeWidth={2} /> Are familiar with Birme&apos;s interface and workflow</li>
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
                <th className="text-center px-4 py-3 font-medium text-gray-500 w-1/4">Birme</th>
              </tr>
            </thead>
            <tbody>
              {tableRows.map((row, i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                  <td className="px-4 py-3 text-gray-600">{row.feature}</td>
                  <td className="px-4 py-3 text-center"><Cell value={row.sammapix} /></td>
                  <td className="px-4 py-3 text-center"><Cell value={row.birme} /></td>
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
              <FileImage className="h-4 w-4 text-gray-500" strokeWidth={1.5} />
              Birme resizes — SammaPix resizes AND optimizes
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Birme is purpose-built for resizing: set a target width, crop to aspect ratio, download. It does not compress the output or convert to WebP. SammaPix&apos;s ResizePack tool does everything Birme does, and the result can then be run through compression or WebP conversion in the same session. You leave with smaller, optimized files — not just resized ones.
            </p>
          </div>
          <div>
            <h3 className="text-base font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <Lock className="h-4 w-4 text-gray-500" strokeWidth={1.5} />
              Both are browser-based — but SammaPix is actively maintained
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Both Birme and SammaPix process files in the browser without uploading them, which is excellent for privacy. The difference is development velocity — SammaPix ships new features regularly on a modern Next.js stack. Birme&apos;s development status is less clear, with infrequent updates. For a tool you rely on professionally, active maintenance matters.
            </p>
          </div>
          <div>
            <h3 className="text-base font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-indigo-500" strokeWidth={1.5} />
              AI rename — turn bulk-resized files into SEO assets
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              After resizing in Birme, your files still have names like <code className="text-xs bg-gray-100 px-1 py-0.5 rounded">image_1_resized.jpg</code>. SammaPix&apos;s AI rename uses Google Gemini to analyze each image and generate a descriptive, keyword-rich filename automatically. For anyone publishing images to a website or e-commerce store, this is a direct SEO improvement — not just an optimization step.
            </p>
          </div>
          <div>
            <h3 className="text-base font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <Zap className="h-4 w-4 text-gray-500" strokeWidth={1.5} />
              WebP conversion — a format Birme doesn&apos;t output
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Birme outputs JPEG and PNG — it does not convert to WebP. WebP files are 25-34% smaller at comparable quality and improve Core Web Vitals scores. SammaPix converts any image to WebP in-browser for free, making it the better choice for anyone optimizing a website for speed.
            </p>
          </div>
          <div>
            <h3 className="text-base font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <Lock className="h-4 w-4 text-gray-500" strokeWidth={1.5} />
              EXIF removal — strip location data Birme leaves behind
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Birme preserves EXIF metadata in resized output files. That metadata can include GPS coordinates, camera model, and timestamps. SammaPix&apos;s EXIF Remover strips this data client-side before download. For photographers who publish location-sensitive images, this privacy feature is important — and Birme simply does not offer it.
            </p>
          </div>
        </div>
      </div>

      {/* Who should switch */}
      <div className="mb-14 p-6 border border-gray-200 rounded-md bg-gray-50/40">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Who should switch from Birme to SammaPix?</h2>
        <p className="text-sm text-gray-600 leading-relaxed mb-4">
          Birme handles resizing well. Consider SammaPix if your workflow has grown beyond just resizing:
        </p>
        <ul className="space-y-3 text-sm text-gray-600">
          <li className="flex items-start gap-3">
            <Check className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" strokeWidth={2} />
            <span><strong className="text-gray-800">You publish images to a website.</strong> Web-ready images need to be compressed, in WebP format, and properly named for SEO. SammaPix covers all three steps.</span>
          </li>
          <li className="flex items-start gap-3">
            <Check className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" strokeWidth={2} />
            <span><strong className="text-gray-800">You have resized images but still need to compress them.</strong> Rather than switching between tools, SammaPix handles both in one session.</span>
          </li>
          <li className="flex items-start gap-3">
            <Check className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" strokeWidth={2} />
            <span><strong className="text-gray-800">Your image files still contain GPS or device metadata.</strong> SammaPix strips EXIF data before download — Birme does not.</span>
          </li>
          <li className="flex items-start gap-3">
            <Check className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" strokeWidth={2} />
            <span><strong className="text-gray-800">You want a tool that will be supported long-term.</strong> SammaPix is actively developed and ships new features regularly.</span>
          </li>
        </ul>
      </div>

      {/* Internal links */}
      <div className="mb-14">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Explore SammaPix tools</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Link href="/tools/resizepack" className="flex items-center justify-between p-4 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors group">
            <div>
              <p className="text-sm font-medium text-gray-900">ResizePack</p>
              <p className="text-xs text-gray-500 mt-0.5">Bulk resize images by pixels or percentage — free</p>
            </div>
            <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-gray-600 transition-colors" strokeWidth={1.5} />
          </Link>
          <Link href="/tools/compress" className="flex items-center justify-between p-4 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors group">
            <div>
              <p className="text-sm font-medium text-gray-900">Image Compressor</p>
              <p className="text-xs text-gray-500 mt-0.5">Compress JPG, PNG, WebP — no upload required</p>
            </div>
            <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-gray-600 transition-colors" strokeWidth={1.5} />
          </Link>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="border border-gray-200 rounded-md p-8 text-center bg-gray-50">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Need more than just bulk resize?</h2>
        <p className="text-sm text-gray-500 mb-6">
          SammaPix resizes, compresses, converts, and renames — all free, all in-browser.
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

      {/* Schema.org — Article */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "SammaPix vs Birme — Which Free Bulk Image Tool is Better in 2026?",
            description: "Detailed comparison between SammaPix and Birme for bulk image resizing, compression, and optimization.",
            author: { "@type": "Person", name: "Luca Sammarco" },
            publisher: { "@type": "Organization", name: "SammaPix", url: APP_URL },
            datePublished: "2026-03-12",
            dateModified: "2026-03-12",
          }),
        }}
      />

      {/* Schema.org — WebPage + ItemList comparison */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "SammaPix vs Birme",
            description: "Feature-by-feature comparison between SammaPix and Birme for bulk image resizing and optimization",
            url: `${APP_URL}/vs/birme`,
            mainEntity: {
              "@type": "ItemList",
              name: "Feature Comparison",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Bulk resize", description: "SammaPix: Yes | Birme: Yes" },
                { "@type": "ListItem", position: 2, name: "Image compression", description: "SammaPix: Yes | Birme: No" },
                { "@type": "ListItem", position: 3, name: "WebP conversion", description: "SammaPix: Yes | Birme: No" },
                { "@type": "ListItem", position: 4, name: "AI image renaming", description: "SammaPix: Yes (Google Gemini) | Birme: No" },
                { "@type": "ListItem", position: 5, name: "EXIF metadata removal", description: "SammaPix: Yes | Birme: No" },
                { "@type": "ListItem", position: 6, name: "Browser-based (no upload)", description: "SammaPix: Yes | Birme: Yes" },
                { "@type": "ListItem", position: 7, name: "Actively maintained", description: "SammaPix: Yes | Birme: Uncertain" },
              ],
            },
          }),
        }}
      />

      {/* Schema.org — BreadcrumbList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: `${APP_URL}` },
              { "@type": "ListItem", position: 2, name: "Comparisons", item: `${APP_URL}/vs` },
              { "@type": "ListItem", position: 3, name: "SammaPix vs Birme", item: `${APP_URL}/vs/birme` },
            ],
          }),
        }}
      />

      {/* Schema.org — FAQPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Is SammaPix better than Birme?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Both SammaPix and Birme are excellent free bulk image tools with browser-based processing and no uploads. Birme specializes in resizing. SammaPix is more comprehensive: it resizes, compresses, converts to WebP, removes EXIF metadata, and renames files with AI. SammaPix is also actively maintained with regular updates, while Birme's development status is less clear.",
                },
              },
              {
                "@type": "Question",
                name: "Is Birme free?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, Birme is completely free. It is a simple bulk image resizing tool with no premium plans or account required.",
                },
              },
              {
                "@type": "Question",
                name: "What can SammaPix do that Birme can't?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "SammaPix offers several capabilities beyond what Birme provides: image compression with quality control, WebP conversion for modern web formats, AI-powered image renaming and alt text generation, EXIF metadata removal for privacy protection, and active ongoing development with regular feature updates.",
                },
              },
            ],
          }),
        }}
      />
    </div>
  );
}

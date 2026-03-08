import type { Metadata } from "next";
import Link from "next/link";
import { Check, X, ArrowRight, Sparkles, Lock, Globe, DollarSign, Shield } from "lucide-react";
import SiteGroundBanner from "@/components/ads/SiteGroundBanner";

export const metadata: Metadata = {
  title: "SammaPix vs FilterPixel: Which Photo Optimizer is Better? (2026)",
  description:
    "SammaPix vs FilterPixel: free browser-based tool vs paid server-based optimizer. Compare EXIF handling, format support, AI features, and pricing. Find the right tool for your workflow.",
  keywords: [
    "filterpixel alternative",
    "sammapix vs filterpixel",
    "filterpixel competitor",
    "free photo optimizer browser",
    "image optimizer no upload",
    "filterpixel free alternative",
  ],
  alternates: {
    canonical: "https://sammapix.com/vs/filterpixel",
  },
  openGraph: {
    title: "SammaPix vs FilterPixel — Which Photo Optimizer is Better? (2026)",
    description:
      "FilterPixel is paid and server-based. SammaPix is free, runs in-browser, strips EXIF, renames with AI, and exports WebP. Full comparison inside.",
    type: "website",
  },
};

const tableRows = [
  { feature: "Price",                        sammapix: "Free + $59/yr Pro",  filterpixel: "Paid (from $15/mo)" },
  { feature: "Browser-based (no install)",    sammapix: true,                 filterpixel: false },
  { feature: "Server-based processing",       sammapix: false,                filterpixel: true },
  { feature: "Files stay on your device",     sammapix: true,                 filterpixel: false },
  { feature: "Batch processing",              sammapix: true,                 filterpixel: true },
  { feature: "EXIF / metadata strip",         sammapix: true,                 filterpixel: false },
  { feature: "AI image renaming",             sammapix: true,                 filterpixel: false },
  { feature: "WebP export",                   sammapix: true,                 filterpixel: false },
  { feature: "JPG / PNG compression",         sammapix: true,                 filterpixel: true },
  { feature: "AI alt text generation",        sammapix: true,                 filterpixel: false },
  { feature: "Free plan available",           sammapix: true,                 filterpixel: false },
  { feature: "No account required (core)",    sammapix: true,                 filterpixel: false },
  { feature: "Bulk ZIP download",             sammapix: true,                 filterpixel: "Limited" },
  { feature: "Quality control slider",        sammapix: true,                 filterpixel: false },
  { feature: "Actively maintained",           sammapix: true,                 filterpixel: true },
];

function Cell({ value }: { value: boolean | string }) {
  if (value === true) return <Check className="h-4 w-4 text-green-500 mx-auto" strokeWidth={2} />;
  if (value === false) return <X className="h-4 w-4 text-gray-300 mx-auto" strokeWidth={2} />;
  return <span className="text-xs text-gray-600 font-medium">{value}</span>;
}

export default function VsFilterPixelPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-gray-400 mb-10">
        <Link href="/" className="hover:text-gray-600 transition-colors">SammaPix</Link>
        <span>/</span>
        <span>vs FilterPixel</span>
      </div>

      {/* Hero */}
      <div className="text-center mb-14">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-100 border border-gray-200 rounded-full text-xs text-gray-500 font-medium mb-6">
          Honest comparison — no sponsored ranking
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight mb-4 leading-tight">
          SammaPix vs FilterPixel
        </h1>
        <p className="text-lg text-gray-500 max-w-xl mx-auto">
          FilterPixel uploads your images to their servers and charges a monthly fee. SammaPix processes everything in your browser for free — with EXIF strip, AI rename, and WebP export built in.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/">
            <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-md hover:bg-gray-800 transition-colors">
              Try SammaPix free
              <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
            </button>
          </Link>
          <Link href="/pricing">
            <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-50 transition-colors">
              See pricing
            </button>
          </Link>
        </div>
      </div>

      {/* Quick verdict */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-14">
        <div className="p-5 border border-indigo-200 bg-indigo-50/40 rounded-md">
          <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wide mb-2">Choose SammaPix if you…</p>
          <ul className="space-y-1.5 text-sm text-gray-700">
            <li className="flex items-start gap-2"><Check className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" strokeWidth={2} /> Want a completely free tier with no credit card</li>
            <li className="flex items-start gap-2"><Check className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" strokeWidth={2} /> Need to strip EXIF / GPS metadata before publishing</li>
            <li className="flex items-start gap-2"><Check className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" strokeWidth={2} /> Want AI-generated filenames and alt text for SEO</li>
            <li className="flex items-start gap-2"><Check className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" strokeWidth={2} /> Care about privacy — your files never leave the browser</li>
            <li className="flex items-start gap-2"><Check className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" strokeWidth={2} /> Need WebP export alongside JPG and PNG</li>
          </ul>
        </div>
        <div className="p-5 border border-gray-200 bg-gray-50/60 rounded-md">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Choose FilterPixel if you…</p>
          <ul className="space-y-1.5 text-sm text-gray-700">
            <li className="flex items-start gap-2"><Check className="h-4 w-4 text-gray-400 mt-0.5 shrink-0" strokeWidth={2} /> Need cloud-based processing integrated with a CMS</li>
            <li className="flex items-start gap-2"><Check className="h-4 w-4 text-gray-400 mt-0.5 shrink-0" strokeWidth={2} /> Prefer a server-side API for automated pipelines</li>
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
                <th className="text-center px-4 py-3 font-medium text-gray-500 w-1/4">FilterPixel</th>
              </tr>
            </thead>
            <tbody>
              {tableRows.map((row, i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                  <td className="px-4 py-3 text-gray-600">{row.feature}</td>
                  <td className="px-4 py-3 text-center"><Cell value={row.sammapix} /></td>
                  <td className="px-4 py-3 text-center"><Cell value={row.filterpixel} /></td>
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
              <Shield className="h-4 w-4 text-gray-500" strokeWidth={1.5} />
              Server-based vs browser-based — a fundamental difference
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              FilterPixel processes images on their servers. This means your files are uploaded, stored temporarily (or permanently, depending on their policy), and processed by infrastructure you don&apos;t control. For photographers, agencies, or anyone working with confidential or proprietary images, this matters. SammaPix runs entirely in your browser using WebAssembly and the Canvas API. Your images never leave your device — not even for a second. This is not a minor technical detail; it is a structural privacy guarantee.
            </p>
          </div>
          <div>
            <h3 className="text-base font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-gray-500" strokeWidth={1.5} />
              FilterPixel requires payment — SammaPix is free to start
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              FilterPixel has no meaningful free tier. You need a paid plan to access batch optimization and full format support. SammaPix&apos;s core tools — compression, WebP conversion, EXIF removal, and resize — are completely free with no account required and no usage caps on the per-file tools. AI rename requires a free account (5 renames/day) or Pro ($59/year for 200/day). For freelancers, small agencies, and individual creators, SammaPix eliminates a recurring cost entirely.
            </p>
          </div>
          <div>
            <h3 className="text-base font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <Lock className="h-4 w-4 text-gray-500" strokeWidth={1.5} />
              EXIF strip — FilterPixel doesn&apos;t offer it
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              EXIF metadata contains GPS coordinates, device information, timestamps, and sometimes even lens serial numbers. When you optimize an image with FilterPixel, that metadata is preserved in the output. SammaPix&apos;s EXIF Remover strips all metadata from JPGs and PNGs before download — entirely client-side, with zero server involvement. This is critical for photographers who publish location photos and do not want to expose where the shot was taken, or for agencies handling client images that contain sensitive device information.
            </p>
          </div>
          <div>
            <h3 className="text-base font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <Globe className="h-4 w-4 text-gray-500" strokeWidth={1.5} />
              WebP export — FilterPixel has limited format support
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              FilterPixel focuses on optimizing existing formats — primarily JPG and PNG — but does not offer format conversion to WebP. WebP is now supported in all major browsers and delivers 25–34% smaller file sizes than JPEG at equivalent visual quality. For anyone building websites with Core Web Vitals in mind, WebP is the default output format of choice. SammaPix converts any image to WebP in one click, in the browser, for free — no additional tools needed.
            </p>
          </div>
          <div>
            <h3 className="text-base font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-indigo-500" strokeWidth={1.5} />
              AI rename — a feature FilterPixel has never offered
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              FilterPixel is a pure optimization tool. It shrinks file sizes, but it does not help with SEO. SammaPix uses Google Gemini to analyze each image and generate a descriptive, SEO-optimized filename and alt text. Upload <code className="text-xs bg-gray-100 px-1 py-0.5 rounded">photo_001.jpg</code>, get back <code className="text-xs bg-gray-100 px-1 py-0.5 rounded">wooden-cabin-snowy-mountain-colorado-winter.webp</code> with a full alt text description. For bloggers and content teams, this eliminates one of the most tedious parts of the publishing workflow — manually writing meaningful filenames for every image.
            </p>
          </div>
          <div>
            <h3 className="text-base font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <Check className="h-4 w-4 text-gray-500" strokeWidth={1.5} />
              Where FilterPixel has an edge — server-side automation
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              FilterPixel&apos;s server-based architecture can be an advantage for certain enterprise workflows — specifically, when you need to integrate image optimization into a CI/CD pipeline, a CMS upload hook, or an automated media processing system. Because it runs on their servers, it can process images without any user interaction. SammaPix requires a browser session, which makes it better suited for manual workflows. If you need to optimize thousands of images automatically via an API, FilterPixel&apos;s model fits that use case — though at a cost.
            </p>
          </div>
        </div>
      </div>

      {/* Who should switch section */}
      <div className="mb-14 p-6 border border-gray-200 rounded-md bg-gray-50/40">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Who is switching from FilterPixel to SammaPix?</h2>
        <p className="text-sm text-gray-600 leading-relaxed mb-4">
          The typical FilterPixel user who moves to SammaPix is looking for one or more of the following:
        </p>
        <ul className="space-y-3 text-sm text-gray-600">
          <li className="flex items-start gap-3">
            <Check className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" strokeWidth={2} />
            <span><strong className="text-gray-800">Cost reduction:</strong> Eliminating a $15–$30/month subscription that feels excessive for a task the browser can handle natively.</span>
          </li>
          <li className="flex items-start gap-3">
            <Check className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" strokeWidth={2} />
            <span><strong className="text-gray-800">Privacy requirements:</strong> Client contracts or internal policies that prohibit uploading images to third-party servers.</span>
          </li>
          <li className="flex items-start gap-3">
            <Check className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" strokeWidth={2} />
            <span><strong className="text-gray-800">SEO workflow:</strong> Needing to rename images with descriptive filenames and add alt text — neither of which FilterPixel provides.</span>
          </li>
          <li className="flex items-start gap-3">
            <Check className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" strokeWidth={2} />
            <span><strong className="text-gray-800">WebP adoption:</strong> Needing to serve WebP images and wanting format conversion bundled with compression in a single step.</span>
          </li>
        </ul>
      </div>

      {/* Internal links */}
      <div className="mb-14">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Explore SammaPix tools</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Link href="/tools" className="flex items-center justify-between p-4 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors group">
            <div>
              <p className="text-sm font-medium text-gray-900">All tools</p>
              <p className="text-xs text-gray-500 mt-0.5">Compress, convert, rename, resize, EXIF strip</p>
            </div>
            <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-gray-600 transition-colors" strokeWidth={1.5} />
          </Link>
          <Link href="/pricing" className="flex items-center justify-between p-4 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors group">
            <div>
              <p className="text-sm font-medium text-gray-900">Pricing</p>
              <p className="text-xs text-gray-500 mt-0.5">Free forever — Pro at $59/year for power users</p>
            </div>
            <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-gray-600 transition-colors" strokeWidth={1.5} />
          </Link>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="border border-gray-200 rounded-md p-8 text-center bg-gray-50">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">A better photo optimizer — and it&apos;s free</h2>
        <p className="text-sm text-gray-500 mb-6">
          No server uploads, no subscription, no account required for core tools. Start optimizing in 10 seconds.
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
            headline: "SammaPix vs FilterPixel: Which Photo Optimizer is Better? (2026)",
            description:
              "Detailed feature comparison between SammaPix and FilterPixel. Covers privacy, pricing, EXIF removal, WebP export, AI rename, and format support.",
            author: { "@type": "Person", name: "Luca Sammarco" },
            publisher: { "@type": "Organization", name: "SammaPix", url: "https://sammapix.com" },
            datePublished: "2026-03-08",
            dateModified: "2026-03-08",
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
            name: "SammaPix vs FilterPixel",
            description: "Feature-by-feature comparison between SammaPix and FilterPixel photo optimization tools",
            url: "https://sammapix.com/vs/filterpixel",
            mainEntity: {
              "@type": "ItemList",
              name: "Feature Comparison",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Price", description: "SammaPix: Free + Pro $59/yr | FilterPixel: Paid from $15/mo" },
                { "@type": "ListItem", position: 2, name: "Browser-based", description: "SammaPix: Yes — files never leave device | FilterPixel: No — server-based" },
                { "@type": "ListItem", position: 3, name: "EXIF metadata strip", description: "SammaPix: Yes — client-side | FilterPixel: No" },
                { "@type": "ListItem", position: 4, name: "AI image renaming", description: "SammaPix: Yes (Google Gemini) | FilterPixel: No" },
                { "@type": "ListItem", position: 5, name: "WebP export", description: "SammaPix: Yes | FilterPixel: No" },
                { "@type": "ListItem", position: 6, name: "Free plan", description: "SammaPix: Yes — core tools free forever | FilterPixel: No" },
                { "@type": "ListItem", position: 7, name: "Batch processing", description: "SammaPix: Yes, up to 20 free | FilterPixel: Yes — paid" },
              ],
            },
          }),
        }}
      />
    </div>
  );
}

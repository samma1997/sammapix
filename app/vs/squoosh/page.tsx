import type { Metadata } from "next";
import Link from "next/link";
import { Check, X, ArrowRight, Sparkles, Lock, Globe } from "lucide-react";

export const metadata: Metadata = {
  title: "SammaPix vs Squoosh — Which Image Optimizer Should You Use in 2026?",
  description: "SammaPix vs Squoosh by Google: compare features, supported formats, AI capabilities, and batch processing. Find the best free image optimizer for your workflow.",
  keywords: [
    "squoosh alternative",
    "sammapix vs squoosh",
    "squoosh replacement",
    "image optimizer comparison",
    "google squoosh vs",
  ],
  openGraph: {
    title: "SammaPix vs Squoosh — Image Optimizer Comparison 2026",
    description: "Squoosh is powerful but single-file only. SammaPix adds batch processing, AI rename, and a simpler UX.",
    type: "website",
  },
};

const tableRows = [
  { feature: "JPG / PNG / WebP compression", sammapix: true, squoosh: true },
  { feature: "AVIF support", sammapix: false, squoosh: true },
  { feature: "WebP conversion", sammapix: true, squoosh: true },
  { feature: "Batch / multiple files at once", sammapix: true, squoosh: false },
  { feature: "Bulk ZIP download", sammapix: true, squoosh: false },
  { feature: "AI-powered image renaming", sammapix: true, squoosh: false },
  { feature: "AI alt text generation", sammapix: true, squoosh: false },
  { feature: "Quality slider", sammapix: true, squoosh: true },
  { feature: "Side-by-side preview", sammapix: false, squoosh: true },
  { feature: "Codec-level settings (MozJPEG, OxiPNG)", sammapix: false, squoosh: true },
  { feature: "Processes in browser (no upload)", sammapix: true, squoosh: true },
  { feature: "No account required", sammapix: true, squoosh: true },
  { feature: "Actively maintained", sammapix: true, squoosh: "Archived 2023" },
  { feature: "Mobile-friendly UX", sammapix: true, squoosh: false },
  { feature: "Free to use", sammapix: true, squoosh: true },
];

function Cell({ value }: { value: boolean | string }) {
  if (value === true) return <Check className="h-4 w-4 text-green-500 mx-auto" strokeWidth={2} />;
  if (value === false) return <X className="h-4 w-4 text-gray-300 mx-auto" strokeWidth={2} />;
  return <span className="text-xs text-gray-600 font-medium">{value}</span>;
}

export default function VsSquooshPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-gray-400 mb-10">
        <Link href="/" className="hover:text-gray-600 transition-colors">SammaPix</Link>
        <span>/</span>
        <span>vs Squoosh</span>
      </div>

      {/* Hero */}
      <div className="text-center mb-14">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-100 border border-gray-200 rounded-full text-xs text-gray-500 font-medium mb-6">
          Honest comparison — no sponsored ranking
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight mb-4 leading-tight">
          SammaPix vs Squoosh
        </h1>
        <p className="text-lg text-gray-500 max-w-xl mx-auto">
          Squoosh by Google is technically impressive. But it&apos;s single-file only, was archived in 2023, and has zero AI features. Here&apos;s how they compare.
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
            <li className="flex items-start gap-2"><Check className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" strokeWidth={2} /> Need to process multiple files at once</li>
            <li className="flex items-start gap-2"><Check className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" strokeWidth={2} /> Want AI-generated SEO filenames and alt text</li>
            <li className="flex items-start gap-2"><Check className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" strokeWidth={2} /> Want a tool that&apos;s actively maintained</li>
            <li className="flex items-start gap-2"><Check className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" strokeWidth={2} /> Work on mobile or need a simple UX</li>
          </ul>
        </div>
        <div className="p-5 border border-gray-200 bg-gray-50/60 rounded-md">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Choose Squoosh if you…</p>
          <ul className="space-y-1.5 text-sm text-gray-700">
            <li className="flex items-start gap-2"><Check className="h-4 w-4 text-gray-400 mt-0.5 shrink-0" strokeWidth={2} /> Need advanced codec settings (MozJPEG, OxiPNG, AVIF)</li>
            <li className="flex items-start gap-2"><Check className="h-4 w-4 text-gray-400 mt-0.5 shrink-0" strokeWidth={2} /> Want side-by-side before/after preview</li>
            <li className="flex items-start gap-2"><Check className="h-4 w-4 text-gray-400 mt-0.5 shrink-0" strokeWidth={2} /> Only need to process one image at a time</li>
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
                <th className="text-center px-4 py-3 font-medium text-gray-500 w-1/4">Squoosh</th>
              </tr>
            </thead>
            <tbody>
              {tableRows.map((row, i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                  <td className="px-4 py-3 text-gray-600">{row.feature}</td>
                  <td className="px-4 py-3 text-center"><Cell value={row.sammapix} /></td>
                  <td className="px-4 py-3 text-center"><Cell value={row.squoosh} /></td>
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
              <Globe className="h-4 w-4 text-gray-500" strokeWidth={1.5} />
              Squoosh was archived by Google in 2023
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Google&apos;s Chrome team archived the Squoosh repository in late 2023. The tool still works — browser APIs haven&apos;t changed — but it receives no new features, no security updates, and no bug fixes. SammaPix is actively developed and deployed on a modern Next.js stack.
            </p>
          </div>
          <div>
            <h3 className="text-base font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <Lock className="h-4 w-4 text-gray-500" strokeWidth={1.5} />
              Batch processing — Squoosh only does one file at a time
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Squoosh is designed as a single-image editor with a detailed before/after view. SammaPix is designed for batch workflows — drop 20 images at once, compress and convert them all, download a ZIP. For content creators and developers, this is a significant practical difference.
            </p>
          </div>
          <div>
            <h3 className="text-base font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-indigo-500" strokeWidth={1.5} />
              AI features — Squoosh has none
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              SammaPix uses Google Gemini to analyze images and generate SEO-optimized filenames and alt text. Upload <code className="text-xs bg-gray-100 px-1 py-0.5 rounded">DSC_1042.jpg</code>, get back <code className="text-xs bg-gray-100 px-1 py-0.5 rounded">sunset-amalfi-coast-italy.webp</code> with a full alt text description. Squoosh has no AI features and no plans to add them.
            </p>
          </div>
          <div>
            <h3 className="text-base font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <Check className="h-4 w-4 text-gray-500" strokeWidth={1.5} />
              Where Squoosh wins — codec control
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Squoosh exposes low-level codec settings: MozJPEG chroma subsampling, OxiPNG filter strategies, AVIF encoder settings. If you&apos;re a developer who needs to squeeze every byte and tune codec-level parameters, Squoosh&apos;s advanced controls are unmatched. SammaPix focuses on the 95% use case: good quality, small size, fast workflow.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="border border-gray-200 rounded-md p-8 text-center bg-gray-50">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Need batch processing + AI rename?</h2>
        <p className="text-sm text-gray-500 mb-6">
          SammaPix handles up to 20 files at once — free, no signup for compression.
        </p>
        <Link href="/">
          <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-md hover:bg-gray-800 transition-colors">
            Open SammaPix
            <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
          </button>
        </Link>
      </div>

      {/* Schema.org */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "SammaPix vs Squoosh — Which Image Optimizer Should You Use in 2026?",
            description: "Detailed feature comparison between SammaPix and Squoosh image optimization tools.",
            author: { "@type": "Person", name: "Luca Sammarco" },
            publisher: { "@type": "Organization", name: "SammaPix", url: "https://sammapix.com" },
            datePublished: "2026-03-05",
            dateModified: "2026-03-05",
          }),
        }}
      />
    </div>
  );
}

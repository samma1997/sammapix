import type { Metadata } from "next";
import Link from "next/link";
import { APP_URL } from "@/lib/constants";
import { Check, X, ArrowRight, Bot, Lock, DollarSign, Globe, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "SammaPix vs imgix: Image API for AI Agents & Pay-as-you-go (2026)",
  description:
    "SammaPix vs imgix: an honest comparison. imgix is an image CDN billed by delivery and plan; SammaPix is pay-as-you-go image + PDF processing an AI agent can call over MCP, with no key and zero-retention. Where each one wins.",
  keywords: [
    "sammapix vs imgix",
    "imgix alternative pay as you go",
    "imgix for ai agents",
    "image cdn alternative api",
    "imgix mcp",
    "image processing api no bandwidth billing",
  ],
  alternates: { canonical: `${APP_URL}/vs/imgix` },
  openGraph: {
    title: "SammaPix vs imgix - Image API for AI Agents & Pay-as-you-go (2026)",
    description:
      "imgix is an image CDN billed by delivery and plan. SammaPix is pay-as-you-go image + PDF processing over MCP, no key, zero-retention. Full comparison.",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "SammaPix" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "SammaPix vs imgix: Image API for AI Agents (2026)",
    description:
      "imgix is an image CDN with plans and bandwidth billing; SammaPix is pay-as-you-go, MCP-native, zero-retention. Honest comparison.",
  },
};

const tableRows = [
  { feature: "Pricing model", sammapix: "Pay-as-you-go", other: "Plan + delivery credits" },
  { feature: "Free tier", sammapix: "25 ops/day", other: "1,000 origin images" },
  { feature: "Billed by bandwidth/delivery", sammapix: false, other: true },
  { feature: "Monthly commitment", sammapix: false, other: "$25+/mo to scale" },
  { feature: "Image processing", sammapix: true, other: true },
  { feature: "PDF tools (compress/split/merge)", sammapix: true, other: false },
  { feature: "AI vision (describe/OCR/tags)", sammapix: true, other: "Add-on" },
  { feature: "Pipeline (chain ops in 1 call)", sammapix: true, other: false },
  { feature: "MCP server for AI agents", sammapix: true, other: false },
  { feature: "OAuth (no API key to paste)", sammapix: true, other: false },
  { feature: "Zero-retention (nothing stored)", sammapix: true, other: "Caches at edge" },
  { feature: "CDN delivery / real-time URLs", sammapix: false, other: true },
];

function Cell({ value }: { value: boolean | string }) {
  if (value === true) return <Check className="h-4 w-4 text-green-500 mx-auto" strokeWidth={2} />;
  if (value === false) return <X className="h-4 w-4 text-gray-300 mx-auto" strokeWidth={2} />;
  return <span className="text-xs text-gray-600 dark:text-[#A3A3A3] font-medium">{value}</span>;
}

export default function VsImgixPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
      <div className="flex items-center gap-2 text-xs text-gray-400 dark:text-[#737373] mb-10">
        <Link href="/" className="hover:text-gray-600 transition-colors">SammaPix</Link>
        <span>/</span>
        <Link href="/vs" className="hover:text-gray-600 transition-colors">Comparisons</Link>
        <span>/</span>
        <span>vs imgix</span>
      </div>

      <div className="text-center mb-14">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-100 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] rounded-full text-xs text-gray-500 dark:text-[#737373] font-medium mb-6">
          Honest comparison- no sponsored ranking
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-[#E5E5E5] tracking-tight mb-4 leading-tight">
          SammaPix vs imgix
        </h1>
        <p className="text-lg text-gray-500 dark:text-[#737373] max-w-xl mx-auto">
          imgix is a real-time image CDN — transform via URL, deliver from the edge, billed by plan and bandwidth. SammaPix is pay-as-you-go image and PDF processing an AI agent can call over MCP, with no key and zero-retention. Different jobs.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/for-ai-agents">
            <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-900 dark:bg-[#6366F1] text-white text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-[#4F46E5] transition-colors">
              SammaPix for AI agents
              <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
            </button>
          </Link>
          <Link href="/pricing">
            <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-[#191919] border border-gray-200 dark:border-[#2A2A2A] text-gray-700 dark:text-[#A3A3A3] text-sm font-medium rounded-md hover:bg-gray-50 transition-colors">
              See pricing
            </button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-14">
        <div className="p-5 border border-indigo-200 dark:border-[#6366F1]/30 bg-indigo-50/40 dark:bg-[#6366F1]/10 rounded-md">
          <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wide mb-2">Choose SammaPix if you…</p>
          <ul className="space-y-1.5 text-sm text-gray-700 dark:text-[#A3A3A3]">
            <li className="flex items-start gap-2"><Check className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" strokeWidth={2} /> Want an AI agent to process images + PDFs over MCP</li>
            <li className="flex items-start gap-2"><Check className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" strokeWidth={2} /> Prefer pay-as-you-go with no bandwidth billing</li>
            <li className="flex items-start gap-2"><Check className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" strokeWidth={2} /> Need PDF tools and AI vision, not just image transforms</li>
            <li className="flex items-start gap-2"><Check className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" strokeWidth={2} /> Need zero-retention for private files</li>
            <li className="flex items-start gap-2"><Check className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" strokeWidth={2} /> Don&apos;t need edge delivery of the results</li>
          </ul>
        </div>
        <div className="p-5 border border-gray-200 dark:border-[#2A2A2A] bg-gray-50/60 dark:bg-[#1E1E1E] rounded-md">
          <p className="text-xs font-semibold text-gray-500 dark:text-[#737373] uppercase tracking-wide mb-2">Choose imgix if you…</p>
          <ul className="space-y-1.5 text-sm text-gray-700 dark:text-[#A3A3A3]">
            <li className="flex items-start gap-2"><Check className="h-4 w-4 text-gray-400 dark:text-[#737373] mt-0.5 shrink-0" strokeWidth={2} /> Need real-time image transforms served from a CDN</li>
            <li className="flex items-start gap-2"><Check className="h-4 w-4 text-gray-400 dark:text-[#737373] mt-0.5 shrink-0" strokeWidth={2} /> Deliver responsive images to a website or app</li>
            <li className="flex items-start gap-2"><Check className="h-4 w-4 text-gray-400 dark:text-[#737373] mt-0.5 shrink-0" strokeWidth={2} /> Want URL-based transformations against an origin</li>
            <li className="flex items-start gap-2"><Check className="h-4 w-4 text-gray-400 dark:text-[#737373] mt-0.5 shrink-0" strokeWidth={2} /> Are comfortable with plan + bandwidth pricing</li>
          </ul>
        </div>
      </div>

      <div className="mb-14">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mb-6">Feature comparison</h2>
        <div className="border border-gray-200 dark:border-[#2A2A2A] rounded-md overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 dark:bg-[#252525] border-b border-gray-200 dark:border-[#2A2A2A]">
                <th className="text-left px-4 py-3 font-medium text-gray-500 dark:text-[#737373] w-1/2">Feature</th>
                <th className="text-center px-4 py-3 font-semibold text-gray-900 dark:text-[#E5E5E5] w-1/4">SammaPix</th>
                <th className="text-center px-4 py-3 font-medium text-gray-500 dark:text-[#737373] w-1/4">imgix</th>
              </tr>
            </thead>
            <tbody>
              {tableRows.map((row, i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-white dark:bg-[#191919]" : "bg-gray-50/50 dark:bg-[#1E1E1E]"}>
                  <td className="px-4 py-3 text-gray-600 dark:text-[#A3A3A3]">{row.feature}</td>
                  <td className="px-4 py-3 text-center"><Cell value={row.sammapix} /></td>
                  <td className="px-4 py-3 text-center"><Cell value={row.other} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-400 dark:text-[#737373] mt-3">
          imgix offers a free tier (up to 1,000 origin images, full API) and credit-based bundles from roughly $25/month upward, where bandwidth/delivery is the main cost driver. Prices as of 2026; check imgix for current rates.
        </p>
      </div>

      <div className="mb-14">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mb-6">The key differences</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2 flex items-center gap-2">
              <Globe className="h-4 w-4 text-gray-500 dark:text-[#737373]" strokeWidth={1.5} />
              imgix is a delivery CDN - SammaPix is a processing endpoint
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed">
              imgix sits in front of your image origin and transforms images in real time as they are requested, then caches and delivers them from the edge. It is built for websites and apps that serve responsive images to users. SammaPix does not deliver or cache anything: you send a file, it is processed in memory, and you get the result back. If your goal is fast delivery of transformed images to a browser, imgix is the right tool. If your goal is to process a file once — especially from an AI agent or a backend job — SammaPix is simpler and is not billed by bandwidth.
            </p>
          </div>
          <div>
            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2 flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-gray-500 dark:text-[#737373]" strokeWidth={1.5} />
              No bandwidth bill, no plan
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed">
              imgix&apos;s primary cost driver is delivery: every optimized image served consumes bandwidth, and overages run higher than contracted rates. That is exactly right for a CDN, but it means your bill scales with traffic, not just with work done. SammaPix charges per operation from a prepaid balance with a free daily tier and no monthly floor — you pay for the processing, never for delivery, because it does not deliver.
            </p>
          </div>
          <div>
            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2 flex items-center gap-2">
              <Bot className="h-4 w-4 text-indigo-500" strokeWidth={1.5} />
              Agent-native, plus PDF and AI vision
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed">
              imgix is an image CDN; it does not do PDFs and its AI features are an add-on. SammaPix gives an agent one MCP connection to 20+ image and PDF tools plus AI vision (describe, alt text, OCR, tags) and a pipeline that chains steps in a single call. The agent authorizes with OAuth — no key to paste — and discovers everything automatically.
            </p>
          </div>
          <div>
            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2 flex items-center gap-2">
              <Lock className="h-4 w-4 text-gray-500 dark:text-[#737373]" strokeWidth={1.5} />
              Zero-retention
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed">
              imgix caches transformed images at the edge to deliver them quickly — that is how a CDN works. SammaPix stores nothing: files are processed in memory and discarded when the request ends, which is what you want when an agent handles private or sensitive files.
            </p>
          </div>
          <div>
            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2 flex items-center gap-2">
              <Check className="h-4 w-4 text-gray-500 dark:text-[#737373]" strokeWidth={1.5} />
              Where imgix genuinely wins
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed">
              For serving responsive images on a high-traffic website, imgix is excellent: real-time URL transforms, an established edge network, and deep image rendering options. SammaPix is not a CDN and will not replace that. The two are complementary — process and prepare with SammaPix, deliver at scale with a CDN.
            </p>
          </div>
        </div>
      </div>

      <div className="mb-14 p-6 border border-gray-200 dark:border-[#2A2A2A] rounded-md bg-gray-50/40 dark:bg-[#1E1E1E]">
        <div className="flex items-center gap-2 mb-3">
          <Zap className="h-4 w-4 text-[#6366F1]" strokeWidth={1.5} />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-[#E5E5E5]">The short version</h2>
        </div>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed">
          Use imgix to deliver responsive, transformed images from a CDN. Use SammaPix to process images and PDFs on demand — especially for an AI agent — pay-as-you-go, no bandwidth bill, nothing stored. See our{" "}
          <Link href="/blog/image-api-for-ai-agents-comparison-2026" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2">image API comparison for agents</Link>{" "}and how to{" "}
          <Link href="/blog/image-pipelines-for-ai-agents" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2">build image pipelines</Link>.
        </p>
      </div>

      <div className="mb-14">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-[#E5E5E5] mb-4">Explore SammaPix</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Link href="/for-ai-agents" className="flex items-center justify-between p-4 border border-gray-200 dark:border-[#2A2A2A] rounded-md hover:bg-gray-50 transition-colors group">
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5]">For AI Agents</p>
              <p className="text-xs text-gray-500 dark:text-[#737373] mt-0.5">MCP server, pipeline, OAuth, zero-retention</p>
            </div>
            <ArrowRight className="h-4 w-4 text-gray-400 dark:text-[#737373] group-hover:text-gray-600 transition-colors" strokeWidth={1.5} />
          </Link>
          <Link href="/vs/cloudinary" className="flex items-center justify-between p-4 border border-gray-200 dark:border-[#2A2A2A] rounded-md hover:bg-gray-50 transition-colors group">
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5]">SammaPix vs Cloudinary</p>
              <p className="text-xs text-gray-500 dark:text-[#737373] mt-0.5">The other big media platform, compared</p>
            </div>
            <ArrowRight className="h-4 w-4 text-gray-400 dark:text-[#737373] group-hover:text-gray-600 transition-colors" strokeWidth={1.5} />
          </Link>
        </div>
      </div>

      <div className="border border-gray-200 dark:border-[#2A2A2A] rounded-md p-8 text-center bg-gray-50 dark:bg-[#1E1E1E]">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2">Process images without a CDN bill</h2>
        <p className="text-sm text-gray-500 dark:text-[#737373] mb-6">
          Pay-as-you-go image + PDF processing over MCP. No plan, no bandwidth billing, zero-retention.
        </p>
        <Link href="/for-ai-agents">
          <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-900 dark:bg-[#6366F1] text-white text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-[#4F46E5] transition-colors">
            See the agent toolbox
            <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
          </button>
        </Link>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "SammaPix vs imgix: Image API for AI Agents & Pay-as-you-go (2026)",
            description:
              "Honest comparison between SammaPix and imgix: image CDN billed by delivery vs pay-as-you-go image and PDF processing over MCP with zero-retention.",
            author: { "@type": "Person", name: "Luca Sammarco" },
            publisher: { "@type": "Organization", name: "SammaPix", url: APP_URL },
            datePublished: "2026-09-16",
            dateModified: "2026-09-16",
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: `${APP_URL}` },
              { "@type": "ListItem", position: 2, name: "Comparisons", item: `${APP_URL}/vs` },
              { "@type": "ListItem", position: 3, name: "SammaPix vs imgix", item: `${APP_URL}/vs/imgix` },
            ],
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Is SammaPix an imgix alternative?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "For processing, yes: SammaPix compresses, converts, resizes, crops and more, pay-as-you-go and without bandwidth billing. It is not a CDN, so it does not replace imgix's real-time URL transforms and edge delivery. Many teams process with SammaPix and deliver with a CDN.",
                },
              },
              {
                "@type": "Question",
                name: "Does imgix charge for bandwidth?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. imgix's main cost driver is delivery — every optimized image served consumes bandwidth, and overages run higher than contracted rates. SammaPix does not deliver images, so it never bills bandwidth; you pay per processing operation.",
                },
              },
              {
                "@type": "Question",
                name: "Can an AI agent call imgix?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Only through a coded integration and URL transforms. SammaPix is a remote MCP server, so an agent connects with one URL and OAuth and discovers 20+ image and PDF tools plus AI vision automatically.",
                },
              },
            ],
          }),
        }}
      />
    </div>
  );
}

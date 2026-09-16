import type { Metadata } from "next";
import Link from "next/link";
import { APP_URL } from "@/lib/constants";
import { Check, X, ArrowRight, Bot, Lock, DollarSign, Boxes, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "SammaPix vs Cloudinary: Image API for AI Agents & Pay-as-you-go (2026)",
  description:
    "SammaPix vs Cloudinary: an honest comparison. Cloudinary is a full media CDN with a monthly plan; SammaPix is pay-as-you-go image + PDF processing an AI agent can call over MCP with no key and zero-retention. See where each one wins.",
  keywords: [
    "sammapix vs cloudinary",
    "cloudinary alternative pay as you go",
    "cloudinary for ai agents",
    "image api without monthly plan",
    "cloudinary mcp",
    "cloudinary vs api",
  ],
  alternates: { canonical: `${APP_URL}/vs/cloudinary` },
  openGraph: {
    title: "SammaPix vs Cloudinary - Image API for AI Agents & Pay-as-you-go (2026)",
    description:
      "Cloudinary is a media CDN with an $89+/month plan. SammaPix is pay-as-you-go image + PDF processing over MCP, no key, zero-retention. Full comparison.",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "SammaPix" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "SammaPix vs Cloudinary: Image API for AI Agents (2026)",
    description:
      "Cloudinary is a media CDN with a monthly plan; SammaPix is pay-as-you-go, MCP-native, zero-retention. Honest comparison.",
  },
};

const tableRows = [
  { feature: "Pricing model", sammapix: "Pay-as-you-go", other: "$89+/month plan" },
  { feature: "Free tier", sammapix: "25 ops/day", other: "25 credits/month" },
  { feature: "Per-operation price", sammapix: "$0.003–0.005", other: "~$0.0004*" },
  { feature: "Monthly commitment", sammapix: false, other: true },
  { feature: "Image processing", sammapix: true, other: true },
  { feature: "PDF tools (compress/split/merge)", sammapix: true, other: "Limited" },
  { feature: "AI vision (describe/OCR/tags)", sammapix: true, other: "Add-on" },
  { feature: "Pipeline (chain ops in 1 call)", sammapix: true, other: false },
  { feature: "MCP server for AI agents", sammapix: true, other: false },
  { feature: "OAuth (no API key to paste)", sammapix: true, other: false },
  { feature: "Zero-retention (nothing stored)", sammapix: true, other: "Stores assets" },
  { feature: "Hosting / CDN delivery", sammapix: false, other: true },
  { feature: "Media storage / DAM", sammapix: false, other: true },
  { feature: "Video processing", sammapix: false, other: true },
];

function Cell({ value }: { value: boolean | string }) {
  if (value === true) return <Check className="h-4 w-4 text-green-500 mx-auto" strokeWidth={2} />;
  if (value === false) return <X className="h-4 w-4 text-gray-300 mx-auto" strokeWidth={2} />;
  return <span className="text-xs text-gray-600 dark:text-[#A3A3A3] font-medium">{value}</span>;
}

export default function VsCloudinaryPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
      <div className="flex items-center gap-2 text-xs text-gray-400 dark:text-[#737373] mb-10">
        <Link href="/" className="hover:text-gray-600 transition-colors">SammaPix</Link>
        <span>/</span>
        <Link href="/vs" className="hover:text-gray-600 transition-colors">Comparisons</Link>
        <span>/</span>
        <span>vs Cloudinary</span>
      </div>

      <div className="text-center mb-14">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-100 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] rounded-full text-xs text-gray-500 dark:text-[#737373] font-medium mb-6">
          Honest comparison- no sponsored ranking
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-[#E5E5E5] tracking-tight mb-4 leading-tight">
          SammaPix vs Cloudinary
        </h1>
        <p className="text-lg text-gray-500 dark:text-[#737373] max-w-xl mx-auto">
          Cloudinary is a full media CDN — storage, delivery, video, and a huge transformation catalog, on a monthly plan. SammaPix is pay-as-you-go image and PDF processing an AI agent can call over MCP, with no key and zero-retention. They solve different problems.
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
            <li className="flex items-start gap-2"><Check className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" strokeWidth={2} /> Prefer pay-as-you-go with no monthly commitment</li>
            <li className="flex items-start gap-2"><Check className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" strokeWidth={2} /> Need zero-retention for private files</li>
            <li className="flex items-start gap-2"><Check className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" strokeWidth={2} /> Want to chain operations in one pipeline call</li>
            <li className="flex items-start gap-2"><Check className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" strokeWidth={2} /> Don&apos;t need to host or deliver the images</li>
          </ul>
        </div>
        <div className="p-5 border border-gray-200 dark:border-[#2A2A2A] bg-gray-50/60 dark:bg-[#1E1E1E] rounded-md">
          <p className="text-xs font-semibold text-gray-500 dark:text-[#737373] uppercase tracking-wide mb-2">Choose Cloudinary if you…</p>
          <ul className="space-y-1.5 text-sm text-gray-700 dark:text-[#A3A3A3]">
            <li className="flex items-start gap-2"><Check className="h-4 w-4 text-gray-400 dark:text-[#737373] mt-0.5 shrink-0" strokeWidth={2} /> Need a media CDN that stores and delivers assets</li>
            <li className="flex items-start gap-2"><Check className="h-4 w-4 text-gray-400 dark:text-[#737373] mt-0.5 shrink-0" strokeWidth={2} /> Process video as well as images</li>
            <li className="flex items-start gap-2"><Check className="h-4 w-4 text-gray-400 dark:text-[#737373] mt-0.5 shrink-0" strokeWidth={2} /> Run high volume and can commit to a monthly plan</li>
            <li className="flex items-start gap-2"><Check className="h-4 w-4 text-gray-400 dark:text-[#737373] mt-0.5 shrink-0" strokeWidth={2} /> Want a full DAM and URL-based transformations</li>
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
                <th className="text-center px-4 py-3 font-medium text-gray-500 dark:text-[#737373] w-1/4">Cloudinary</th>
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
          * Cloudinary&apos;s per-transform price is lower, but it is pooled with storage and bandwidth and requires a monthly plan (Free 25 credits/mo, Plus ~$89/mo, Advanced ~$224/mo). Prices as of 2026; check each vendor for current rates.
        </p>
      </div>

      <div className="mb-14">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mb-6">The key differences</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2 flex items-center gap-2">
              <Boxes className="h-4 w-4 text-gray-500 dark:text-[#737373]" strokeWidth={1.5} />
              Cloudinary hosts your media - SammaPix processes and hands it back
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed">
              This is the fundamental difference, and we will be plain about it: Cloudinary is a media platform. It stores your assets, serves them from a CDN, transforms them on the fly via URL, handles video, and gives you a digital asset manager. SammaPix is not a CDN and does not host anything. You send a file, it is processed in memory, and you get the result back. If you need to store and deliver images to end users at scale, Cloudinary is the right category of tool. If you need on-demand processing an agent or backend can call, SammaPix is simpler and cheaper to start.
            </p>
          </div>
          <div>
            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2 flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-gray-500 dark:text-[#737373]" strokeWidth={1.5} />
              No monthly commitment
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed">
              Cloudinary&apos;s per-transform price is genuinely low, but you access it through a plan: Free at 25 credits per month, then roughly $89/month and $224/month tiers, with overages on top. For a small project, an occasional workload, or an agent that processes a handful of images a day, that is a commitment you may not want. SammaPix charges per operation from a prepaid credit balance, with a free daily tier and no monthly floor. You pay for what you use and nothing when you don&apos;t.
            </p>
          </div>
          <div>
            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2 flex items-center gap-2">
              <Bot className="h-4 w-4 text-indigo-500" strokeWidth={1.5} />
              Built for AI agents (MCP), not just developers
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed">
              Cloudinary is an excellent developer platform, but connecting an AI agent means provisioning keys and writing an integration. SammaPix runs as a remote MCP server: an agent adds one URL, authorizes with Google (OAuth, no key to paste), and discovers 20+ image and PDF tools plus AI vision automatically. The pipeline tool chains operations in a single call, which matters because for an agent tokens are the real cost.
            </p>
          </div>
          <div>
            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2 flex items-center gap-2">
              <Lock className="h-4 w-4 text-gray-500 dark:text-[#737373]" strokeWidth={1.5} />
              Zero-retention by design
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed">
              Because Cloudinary is a storage-and-delivery platform, your assets live on its servers by design — that is the point of a DAM. SammaPix stores nothing: files are processed in memory and discarded when the request ends. For an agent handling a user&apos;s private photos, contracts or scans, that difference is the deciding factor.
            </p>
          </div>
          <div>
            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2 flex items-center gap-2">
              <Check className="h-4 w-4 text-gray-500 dark:text-[#737373]" strokeWidth={1.5} />
              Where Cloudinary genuinely wins
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed">
              Cloudinary is a far larger platform. Storage, global CDN delivery, video transcoding, a huge transformation catalog, responsive delivery, and a mature DAM are things SammaPix does not do and is not trying to do. If your job is to host and serve media to millions of users, or to manage a large asset library with on-the-fly URL transformations, Cloudinary is the better tool and its per-transform economics are hard to beat. The two are complementary more than competitive.
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
          Use Cloudinary when you need to store and deliver media at scale and can commit to a plan. Use SammaPix when you need on-demand image and PDF processing — especially for an AI agent — with pay-as-you-go pricing, no key, and nothing stored. For a deeper look at the agent side, see our{" "}
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
          <Link href="/pricing" className="flex items-center justify-between p-4 border border-gray-200 dark:border-[#2A2A2A] rounded-md hover:bg-gray-50 transition-colors group">
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5]">Pricing</p>
              <p className="text-xs text-gray-500 dark:text-[#737373] mt-0.5">Pay-as-you-go credits, free daily tier</p>
            </div>
            <ArrowRight className="h-4 w-4 text-gray-400 dark:text-[#737373] group-hover:text-gray-600 transition-colors" strokeWidth={1.5} />
          </Link>
        </div>
      </div>

      <div className="border border-gray-200 dark:border-[#2A2A2A] rounded-md p-8 text-center bg-gray-50 dark:bg-[#1E1E1E]">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2">Give your agent image + PDF tools</h2>
        <p className="text-sm text-gray-500 dark:text-[#737373] mb-6">
          One MCP connection, pay-as-you-go, zero-retention. No monthly plan, no key to paste.
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
            headline: "SammaPix vs Cloudinary: Image API for AI Agents & Pay-as-you-go (2026)",
            description:
              "Honest comparison between SammaPix and Cloudinary: media CDN with a monthly plan vs pay-as-you-go image and PDF processing over MCP with zero-retention.",
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
              { "@type": "ListItem", position: 3, name: "SammaPix vs Cloudinary", item: `${APP_URL}/vs/cloudinary` },
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
                name: "Is SammaPix a Cloudinary alternative?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Partly. SammaPix replaces Cloudinary for on-demand image and PDF processing with pay-as-you-go pricing and no monthly plan, and it adds an MCP server so AI agents can call it directly. It does not replace Cloudinary's storage, CDN delivery, video, or DAM — SammaPix processes files and returns them rather than hosting them.",
                },
              },
              {
                "@type": "Question",
                name: "Is SammaPix cheaper than Cloudinary?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "It depends. Cloudinary's per-transform price is lower, but it requires a monthly plan and pools transforms with storage and bandwidth. SammaPix is pay-as-you-go with no monthly floor, so for small or occasional workloads it is cheaper to start; for very high volume with hosting, Cloudinary's economics win.",
                },
              },
              {
                "@type": "Question",
                name: "Can an AI agent use Cloudinary directly?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Only through a coded integration with an API key. SammaPix is a remote MCP server, so an agent connects with one URL and OAuth (no key to paste) and discovers the tools automatically.",
                },
              },
            ],
          }),
        }}
      />
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import {
  Bot, Zap, ShieldCheck, Boxes, Link2, Gauge, ArrowRight, Image as ImageIcon,
  FileText, Crop, RefreshCw, Layers, Coins, Lock,
} from "lucide-react";
import { APP_URL } from "@/lib/constants";
import ConnectSnippets from "@/components/agents/ConnectSnippets";

const TITLE = "SammaPix for AI Agents — Image & File Tools via MCP & API";
const DESC =
  "Give your AI agent real image and PDF processing: compress, convert, resize, crop and chain operations in one call. Connect over MCP (OAuth, no API key to paste) or REST. Zero-retention, pay-per-use, 50 free credits.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  keywords: [
    "MCP server image processing",
    "image tools for AI agents",
    "AI agent image API",
    "MCP image compression",
    "Claude image tools MCP",
    "AI image processing API",
    "convert image API for agents",
    "MCP tools image pdf",
    "agent file processing",
    "zero retention image API",
  ],
  alternates: { canonical: `${APP_URL}/for-ai-agents` },
  openGraph: {
    title: TITLE,
    description: DESC,
    url: `${APP_URL}/for-ai-agents`,
    siteName: "SammaPix",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "SammaPix for AI Agents" }],
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESC },
};

const FAQ = [
  {
    q: "What is the SammaPix MCP server?",
    a: "It is a Model Context Protocol (MCP) server that lets AI agents run SammaPix's image and PDF tools directly: compress, convert, resize, crop, rotate, read metadata, chain operations in a pipeline, and compress PDFs. The agent calls a tool, sends an image (as base64 or a URL) and gets the processed file back.",
  },
  {
    q: "How does an agent connect — do I need an API key?",
    a: "No key to paste. The MCP server uses OAuth 2.1: your agent opens a link, you sign in with Google and approve access, and the agent receives a token automatically. You get 50 free credits on your first authorization. If you prefer a raw integration, you can also generate an API key and call the REST API.",
  },
  {
    q: "What is the pipeline tool and why does it save tokens?",
    a: "Instead of calling compress, then convert, then resize as three separate tool calls (three round-trips, three sets of tokens, and intermediate files to manage), the pipeline tool runs the whole chain in ONE call and returns only the final result. This is faster and dramatically cheaper in tokens for agents.",
  },
  {
    q: "Is my data private? Are files stored?",
    a: "No. Every operation is zero-retention: files are processed in memory and discarded when the request ends. Nothing is written to disk, logged, or used for training. This makes it safe for an agent to process sensitive documents or private photos.",
  },
  {
    q: "How is it priced?",
    a: "Pay-per-use with prepaid credits. Most operations cost 1 credit; a pipeline costs 1 credit per step. Your first authorization includes 50 free credits, and credits are shared across the SammaPix website and the API/MCP. A failed operation is refunded automatically.",
  },
  {
    q: "Which AI clients does it work with?",
    a: "Any MCP-compatible client — Claude Desktop, Claude, Cursor, and other agent frameworks that support remote MCP servers over HTTP. Point the client at the SammaPix MCP URL and it discovers the tools automatically.",
  },
];

function jsonLd() {
  const app = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "SammaPix for AI Agents",
    description: DESC,
    url: `${APP_URL}/for-ai-agents`,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Web / MCP",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD", description: "50 free credits, then pay-per-use" },
    creator: { "@type": "Organization", name: "SammaPix", url: APP_URL },
    featureList: [
      "MCP server for AI agents (OAuth 2.1)",
      "Image compress, convert, resize, crop, rotate",
      "Pipeline: chain operations in one call",
      "PDF compress",
      "Zero-retention processing",
      "REST API with API keys",
    ],
  };
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: APP_URL },
      { "@type": "ListItem", position: 2, name: "For AI Agents", item: `${APP_URL}/for-ai-agents` },
    ],
  };
  return [app, faq, breadcrumb];
}

const VALUES = [
  { icon: Link2, title: "Chain ops in one call", body: "The pipeline tool runs compress → convert → resize in a single request. Fewer round-trips, far fewer tokens, no intermediate files for the agent to juggle." },
  { icon: ShieldCheck, title: "Zero-retention", body: "Files are processed in memory and discarded instantly. Nothing stored, logged, or used for training — safe for private photos and documents." },
  { icon: Boxes, title: "One toolbox, many ops", body: "Compress, convert, resize, crop, rotate, read metadata and compress PDFs — a single MCP server instead of stitching together many services." },
  { icon: Coins, title: "Pay-per-use, prepaid", body: "1 credit per op (1/step for pipelines), 50 free to start. You never front the compute — usage is prepaid, failed ops are refunded." },
];

const TOOLS = [
  { icon: Gauge, name: "Compress", desc: "Shrink images, keep the format" },
  { icon: RefreshCw, name: "Convert", desc: "webp · avif · jpeg · png" },
  { icon: ImageIcon, name: "Resize", desc: "Exact width/height, safe caps" },
  { icon: Crop, name: "Crop", desc: "Pixels or aspect ratio (16:9…)" },
  { icon: Layers, name: "Pipeline", desc: "Chain steps in one call" },
  { icon: FileText, name: "PDF compress", desc: "Slim PDFs, strip metadata" },
];

const STEPS = [
  { n: 1, t: "Add the MCP server", d: "Drop the SammaPix MCP URL into your agent (Claude, Cursor, …). It discovers the tools automatically." },
  { n: 2, t: "Sign in with Google", d: "On first use the agent opens a link — you approve access in one click. No API key to copy. You get 50 free credits." },
  { n: 3, t: "Let the agent work", d: "Ask it to optimise, convert or prepare images. It calls the tools; credits are spent per operation." },
];

export default function ForAiAgentsPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-[#191919]">
      {jsonLd().map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}

      {/* Hero */}
      <section className="px-4 sm:px-6 pt-16 pb-12 max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-[#E5E5E5] dark:border-[#2A2A2A] px-3 py-1 text-xs text-[#737373] mb-5">
          <Bot className="h-3.5 w-3.5 text-[#6366F1]" strokeWidth={1.5} /> Model Context Protocol · OAuth 2.1
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold text-[#171717] dark:text-[#E5E5E5] tracking-tight mb-5">
          Image &amp; file tools your AI agent can actually run
        </h1>
        <p className="text-base sm:text-lg text-[#737373] dark:text-[#A3A3A3] max-w-2xl mx-auto mb-8 leading-relaxed">
          SammaPix gives AI agents real image and PDF processing over MCP: compress, convert, resize, crop, and chain operations in a single call. Connect in seconds, no API key to paste. Zero-retention, pay-per-use.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link href="/dashboard/api" className="inline-flex items-center gap-2 bg-[#171717] dark:bg-[#E5E5E5] text-white dark:text-[#171717] rounded-lg px-5 py-2.5 text-sm font-medium hover:bg-[#262626] dark:hover:bg-white transition-colors">
            Get started free <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
          </Link>
          <a href="#connect" className="inline-flex items-center gap-2 border border-[#E5E5E5] dark:border-[#2A2A2A] text-[#525252] dark:text-[#A3A3A3] rounded-lg px-5 py-2.5 text-sm hover:border-[#A3A3A3] hover:text-[#171717] dark:hover:text-[#E5E5E5] transition-colors">
            How to connect
          </a>
        </div>
        <p className="text-xs text-[#A3A3A3] mt-4">50 free credits · works with Claude, Cursor &amp; any MCP client</p>
      </section>

      {/* Value props */}
      <section className="px-4 sm:px-6 py-12 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
          {VALUES.map((v) => (
            <div key={v.title} className="p-6 rounded-xl border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#1E1E1E]">
              <v.icon className="h-5 w-5 text-[#6366F1] mb-3" strokeWidth={1.5} />
              <h2 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1.5">{v.title}</h2>
              <p className="text-sm text-[#737373] dark:text-[#A3A3A3] leading-relaxed">{v.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tools */}
      <section className="px-4 sm:px-6 py-12 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-semibold text-[#171717] dark:text-[#E5E5E5] text-center mb-2">The tools your agent gets</h2>
          <p className="text-sm text-[#737373] text-center mb-8">Deterministic, fast, and priced per operation.</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {TOOLS.map((t) => (
              <div key={t.name} className="p-4 rounded-lg border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#1E1E1E]">
                <t.icon className="h-4 w-4 text-[#525252] mb-2" strokeWidth={1.5} />
                <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5]">{t.name}</p>
                <p className="text-xs text-[#A3A3A3] mt-0.5">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pipeline spotlight */}
      <section className="px-4 sm:px-6 py-12 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-3xl mx-auto text-center">
          <Zap className="h-6 w-6 text-[#6366F1] mx-auto mb-3" strokeWidth={1.5} />
          <h2 className="text-xl font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">One call instead of five</h2>
          <p className="text-sm text-[#737373] dark:text-[#A3A3A3] leading-relaxed mb-6 max-w-xl mx-auto">
            Preparing 500 product photos usually means chaining compress, convert, resize and rename per image — dozens of tool calls and tokens per file. With the SammaPix <strong className="text-[#171717] dark:text-[#E5E5E5]">pipeline</strong> tool the agent sends one request with the whole chain and gets the finished file back. Fewer round-trips, fewer tokens, no intermediate files.
          </p>
        </div>
      </section>

      {/* How to connect */}
      <section id="connect" className="px-4 sm:px-6 py-12 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl font-semibold text-[#171717] dark:text-[#E5E5E5] text-center mb-8">Connect in three steps</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {STEPS.map((s) => (
              <div key={s.n} className="p-5 rounded-xl border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#1E1E1E]">
                <div className="h-7 w-7 rounded-full bg-[#6366F1]/10 text-[#6366F1] flex items-center justify-center text-xs font-semibold mb-3">{s.n}</div>
                <p className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1">{s.t}</p>
                <p className="text-xs text-[#737373] dark:text-[#A3A3A3] leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>
          <ConnectSnippets appUrl={APP_URL} />
        </div>
      </section>

      {/* Privacy */}
      <section className="px-4 sm:px-6 py-12 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-3xl mx-auto flex items-start gap-4">
          <Lock className="h-6 w-6 text-[#6366F1] flex-shrink-0 mt-1" strokeWidth={1.5} />
          <div>
            <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mb-2">Zero-retention by design</h2>
            <p className="text-sm text-[#737373] dark:text-[#A3A3A3] leading-relaxed">
              Files sent to the API and MCP are processed entirely in memory and discarded the moment the request finishes. Nothing is stored, nothing is logged, nothing is used to train models. Your agent can safely handle private photos, contracts and scans.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="px-4 sm:px-6 py-12 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-xl font-semibold text-[#171717] dark:text-[#E5E5E5] mb-2">Simple, prepaid pricing</h2>
          <p className="text-sm text-[#737373] dark:text-[#A3A3A3] mb-6">1 credit per operation · 1 credit per pipeline step · failed ops refunded automatically.</p>
          <div className="inline-flex flex-wrap items-center justify-center gap-3">
            <div className="rounded-lg border border-[#6366F1]/30 bg-[#6366F1]/5 px-5 py-3">
              <p className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5]">50 credits</p>
              <p className="text-xs text-[#6366F1]">free to start</p>
            </div>
            <Link href="/dashboard/credits" className="rounded-lg border border-[#E5E5E5] dark:border-[#2A2A2A] px-5 py-3 hover:border-[#A3A3A3] transition-colors">
              <p className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5]">Top up anytime</p>
              <p className="text-xs text-[#737373]">from $5.99</p>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-4 sm:px-6 py-12 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-xl font-semibold text-[#171717] dark:text-[#E5E5E5] mb-6 text-center">Frequently asked questions</h2>
          <div className="space-y-0">
            {FAQ.map((f, i) => (
              <div key={i} className="py-5 border-b border-[#E5E5E5] dark:border-[#2A2A2A] last:border-0">
                <h3 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1.5">{f.q}</h3>
                <p className="text-sm text-[#737373] dark:text-[#A3A3A3] leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-4 sm:px-6 py-16 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-[#171717] dark:text-[#E5E5E5] mb-3">Give your agent superpowers</h2>
          <p className="text-sm text-[#737373] dark:text-[#A3A3A3] mb-6">Connect the SammaPix MCP server and start with 50 free credits.</p>
          <Link href="/dashboard/api" className="inline-flex items-center gap-2 bg-[#171717] dark:bg-[#E5E5E5] text-white dark:text-[#171717] rounded-lg px-6 py-3 text-sm font-medium hover:bg-[#262626] dark:hover:bg-white transition-colors">
            Get your key &amp; connect <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
          </Link>
        </div>
      </section>
    </main>
  );
}

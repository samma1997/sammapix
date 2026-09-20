import type { Metadata } from "next";
import Link from "next/link";
import { Bot, Zap, ArrowRight, Lock, Sparkles, Coins, ShieldCheck, Plug, Check } from "lucide-react";
import { APP_URL } from "@/lib/constants";
import ConnectSnippets from "@/components/agents/ConnectSnippets";
import Reveal from "@/components/agents/Reveal";
import HeroVisual from "@/components/agents/HeroVisual";
import ConnectionFlow from "@/components/agents/ConnectionFlow";
import PipelineFlow from "@/components/agents/PipelineFlow";
import ZeroRetentionVisual from "@/components/agents/ZeroRetentionVisual";
import { ValueGrid, ToolGrid } from "@/components/agents/AgentCards";

const TITLE = "SammaPix for AI Agents — Image & File Tools via MCP & API";
const DESC =
  "Give your AI agent real image and PDF processing: compress, convert, resize, crop and chain operations in one call. Connect over MCP (OAuth, no API key to paste) or REST. Zero-retention, pay-per-use, 25 free ops every day.";

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
    a: "It is a Model Context Protocol (MCP) server that lets AI agents run SammaPix's 20+ image and PDF tools directly: compress, convert, resize, crop, rotate, flip, adjust, grayscale, blur, tint, negate, round corners, add borders, watermark, read metadata, compress and merge and split and rotate PDFs, turn images into a PDF, and chain any of these in a pipeline. The agent calls a tool, sends an image (as base64 or a URL) and gets the processed file back.",
  },
  {
    q: "How does an agent connect — do I need an API key?",
    a: "No key to paste. The MCP server uses OAuth 2.1: your agent opens a link, you sign in with Google and approve access, and the agent receives a token automatically. You get 25 free operations every day, plus 50 credits on your first authorization. If you prefer a raw integration, you can also generate an API key and call the REST API.",
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
    a: "Free accounts get 25 free operations per day; Pro subscribers get a much larger daily allowance (500/day) so they can use the API/MCP without hitting the wall. Beyond that it is pay-per-use with prepaid credits: 1 credit per operation (a pipeline is 1 per step), or 2 credits for AI vision ops (describe, alt text, OCR, tags, filename). From about $0.003 per credit. Credits are shared across the SammaPix website and the API/MCP, and a failed operation is refunded automatically.",
  },
  {
    q: "Which AI clients does it work with?",
    a: "Any MCP-compatible client — Claude Desktop, Claude, Cursor, and other agent frameworks that support remote MCP servers over HTTP. Point the client at the SammaPix MCP URL and it discovers the tools automatically.",
  },
  {
    q: "Is there an OpenAPI spec and machine-readable docs?",
    a: "Yes. The full REST API is described in an OpenAPI 3.1 spec at https://www.sammapix.com/openapi.json, and there is an LLM-friendly overview at https://www.sammapix.com/llms.txt. Point your agent or codegen tool at either to integrate without guesswork.",
  },
  {
    q: "Can an agent try it without signing up?",
    a: "Yes. Deterministic operations (compress, convert, resize, crop, rotate, PDF compress/split/rotate and more) have a keyless free trial: a few calls per day per IP with no API key and no account, so an agent can demonstrate the result in-chat before anyone signs up. After that, grab a free API key (25 ops/day) or connect over MCP. AI vision ops require a key.",
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
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD", description: "25 free operations per day, then pay-per-use" },
    creator: { "@type": "Organization", name: "SammaPix", url: APP_URL },
    featureList: [
      "MCP server for AI agents (OAuth 2.1)",
      "20+ image tools: compress, convert, resize, crop, rotate, flip, adjust, grayscale, blur, tint, watermark, round, border",
      "PDF tools: compress, merge, split, rotate, image-to-PDF, info",
      "Pipeline: chain operations in one call",
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

export default function ForAiAgentsPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-[#191919]">
      {jsonLd().map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}

      {/* Hero */}
      <section className="relative overflow-hidden px-4 sm:px-6 pt-16 pb-16">
        {/* subtle grid backdrop */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.035] dark:opacity-[0.06]"
          aria-hidden
          style={{
            backgroundImage:
              "linear-gradient(#6366F1 1px, transparent 1px), linear-gradient(90deg, #6366F1 1px, transparent 1px)",
            backgroundSize: "44px 44px",
            maskImage: "radial-gradient(ellipse 70% 60% at 50% 30%, #000 40%, transparent 75%)",
            WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 30%, #000 40%, transparent 75%)",
          }}
        />

        <div className="relative mx-auto max-w-4xl text-center">
          <Reveal y={14}>
            <div className="mb-5 inline-flex items-center gap-1.5 rounded-full border border-[#E5E5E5] bg-white/60 px-3 py-1 text-xs text-[#737373] backdrop-blur dark:border-[#2A2A2A] dark:bg-[#1E1E1E]/60">
              <Bot className="h-3.5 w-3.5 text-[#6366F1]" strokeWidth={1.5} /> Model Context Protocol · OAuth 2.1
            </div>
          </Reveal>
          <Reveal y={18} delay={60}>
            <h1 className="mb-5 text-3xl font-bold tracking-tight text-[#171717] dark:text-[#E5E5E5] sm:text-5xl">
              Image &amp; file tools your AI agent can actually run
            </h1>
          </Reveal>
          <Reveal y={18} delay={120}>
            <p className="mx-auto mb-8 max-w-2xl text-base leading-relaxed text-[#737373] dark:text-[#A3A3A3] sm:text-lg">
              SammaPix gives AI agents real image and PDF processing over MCP: compress, convert, resize, crop, and chain operations in a single call. Connect in seconds, no API key to paste. Zero-retention, pay-per-use.
            </p>
          </Reveal>
          <Reveal y={18} delay={180}>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link href="/dashboard/api" className="inline-flex items-center gap-2 rounded-lg bg-[#171717] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#262626] dark:bg-[#E5E5E5] dark:text-[#171717] dark:hover:bg-white">
                Get started free <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
              </Link>
              <a href="#connect" className="inline-flex items-center gap-2 rounded-lg border border-[#E5E5E5] px-5 py-2.5 text-sm text-[#525252] transition-colors hover:border-[#A3A3A3] hover:text-[#171717] dark:border-[#2A2A2A] dark:text-[#A3A3A3] dark:hover:text-[#E5E5E5]">
                How to connect
              </a>
            </div>
          </Reveal>
          <Reveal y={14} delay={240}>
            <p className="mt-4 text-xs text-[#A3A3A3]">25 free ops/day + 50 to start · works with Claude, Cursor &amp; any MCP client</p>
          </Reveal>

          <Reveal y={26} delay={280}>
            <div className="mt-14">
              <HeroVisual />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Value props */}
      <section className="border-t border-[#E5E5E5] px-4 py-16 dark:border-[#2A2A2A] sm:px-6">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <div className="mb-8 text-center">
              <h2 className="text-xl font-semibold text-[#171717] dark:text-[#E5E5E5]">Built for agents, not humans clicking buttons</h2>
              <p className="mt-2 text-sm text-[#737373] dark:text-[#A3A3A3]">Deterministic tools, one connection, priced by the operation.</p>
            </div>
          </Reveal>
          <ValueGrid />
        </div>
      </section>

      {/* Connection flow (OAuth, no key) */}
      <section className="border-t border-[#E5E5E5] px-4 py-16 dark:border-[#2A2A2A] sm:px-6">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <div className="mb-3 flex items-center justify-center gap-2">
              <Sparkles className="h-5 w-5 text-[#6366F1]" strokeWidth={1.5} />
              <h2 className="text-xl font-semibold text-[#171717] dark:text-[#E5E5E5]">Connect from the chat — no API key</h2>
            </div>
            <p className="mx-auto mb-10 max-w-xl text-center text-sm leading-relaxed text-[#737373] dark:text-[#A3A3A3]">
              The agent hits a SammaPix tool, opens a link, and you sign in with Google. Approve once and it&rsquo;s connected — the token is handed back automatically over OAuth 2.1. Nothing to copy, nothing to store.
            </p>
          </Reveal>
          <Reveal y={24}>
            <ConnectionFlow />
          </Reveal>
        </div>
      </section>

      {/* Tools */}
      <section className="border-t border-[#E5E5E5] px-4 py-16 dark:border-[#2A2A2A] sm:px-6">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <h2 className="mb-2 text-center text-xl font-semibold text-[#171717] dark:text-[#E5E5E5]">The tools your agent gets</h2>
            <p className="mb-8 text-center text-sm text-[#737373] dark:text-[#A3A3A3]">20+ image &amp; PDF tools plus AI vision, behind one MCP server. Send a file, get a file.</p>
          </Reveal>
          <ToolGrid />
        </div>
      </section>

      {/* Pipeline spotlight */}
      <section className="border-t border-[#E5E5E5] px-4 py-16 dark:border-[#2A2A2A] sm:px-6">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <div className="mb-3 flex items-center justify-center gap-2">
              <Zap className="h-5 w-5 text-[#6366F1]" strokeWidth={1.5} />
              <h2 className="text-xl font-semibold text-[#171717] dark:text-[#E5E5E5]">One call instead of five</h2>
            </div>
            <p className="mx-auto mb-10 max-w-xl text-center text-sm leading-relaxed text-[#737373] dark:text-[#A3A3A3]">
              Preparing product photos usually means chaining compress, convert and resize per image — dozens of tool calls and tokens per file. With the <strong className="text-[#171717] dark:text-[#E5E5E5]">pipeline</strong> tool the agent sends one request describing the whole chain and gets only the finished file back. Fewer round-trips, fewer tokens, no intermediate files.{" "}
              <Link href="/blog/image-pipelines-for-ai-agents" className="text-[#6366F1] hover:underline">See ready-made pipeline flows →</Link>
            </p>
          </Reveal>
          <Reveal y={24}>
            <div className="rounded-2xl border border-[#E5E5E5] bg-white p-6 dark:border-[#2A2A2A] dark:bg-[#1E1E1E] sm:p-10">
              <PipelineFlow />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Honest comparison */}
      <section id="compare" className="border-t border-[#E5E5E5] px-4 py-16 dark:border-[#2A2A2A] sm:px-6">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <h2 className="mb-2 text-center text-xl font-semibold text-[#171717] dark:text-[#E5E5E5]">How SammaPix compares</h2>
            <p className="mx-auto mb-8 max-w-xl text-center text-sm leading-relaxed text-[#737373] dark:text-[#A3A3A3]">
              An honest comparison. No single service is cheapest at everything, so here is exactly where each one wins and where SammaPix does.
            </p>
          </Reveal>
          <Reveal y={20}>
            <div className="overflow-x-auto rounded-2xl border border-[#E5E5E5] dark:border-[#2A2A2A]">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-[#FAFAFA] dark:bg-[#161616]">
                    <th className="px-3 py-2.5 text-left text-xs font-semibold text-[#737373] dark:text-[#A3A3A3]"> </th>
                    <th className="px-3 py-2.5 text-left text-xs font-semibold text-[#6366F1]">SammaPix</th>
                    <th className="px-3 py-2.5 text-left text-xs font-semibold text-[#737373] dark:text-[#A3A3A3]">Cloudinary</th>
                    <th className="px-3 py-2.5 text-left text-xs font-semibold text-[#737373] dark:text-[#A3A3A3]">TinyPNG</th>
                    <th className="px-3 py-2.5 text-left text-xs font-semibold text-[#737373] dark:text-[#A3A3A3]">Gemini direct</th>
                  </tr>
                </thead>
                <tbody className="text-[#171717] dark:text-[#E5E5E5]">
                  {[
                    ["Scope", "Image + PDF + AI vision", "Image/video CDN", "Compression", "AI vision only"],
                    ["Connect", "OAuth, no key to paste", "API key", "API key", "API key + your code"],
                    ["Pricing", "Pay-as-you-go", "$89+/mo plan", "Pay-as-you-go", "Pay-as-you-go"],
                    ["Per op", "$0.003–0.005", "~$0.0004*", "$0.009 (→$0.002)", "~$0.0008 (DIY)"],
                    ["Pipeline (chain in 1 call)", "Yes", "No", "No", "No"],
                    ["PDF tools", "Yes", "Limited", "No", "No"],
                    ["AI vision (describe/OCR/tags)", "Yes", "Add-on", "No", "Yes"],
                    ["Zero-retention", "Yes", "Stores assets", "Uploads files", "Depends on your setup"],
                    ["MCP-native", "Yes", "No", "No", "No"],
                  ].map((row, i) => (
                    <tr key={i} className="border-t border-[#F0F0F0] dark:border-[#232323]">
                      <td className="px-3 py-2.5 text-xs font-medium text-[#737373] dark:text-[#A3A3A3]">{row[0]}</td>
                      <td className="px-3 py-2.5 font-medium">{row[1]}</td>
                      <td className="px-3 py-2.5 text-[#737373] dark:text-[#A3A3A3]">{row[2]}</td>
                      <td className="px-3 py-2.5 text-[#737373] dark:text-[#A3A3A3]">{row[3]}</td>
                      <td className="px-3 py-2.5 text-[#737373] dark:text-[#A3A3A3]">{row[4]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
          <Reveal>
            <p className="mx-auto mt-4 max-w-2xl text-center text-xs leading-relaxed text-[#A3A3A3]">
              * Cloudinary&apos;s per-transform price is lower but requires a monthly plan and is pooled with storage and bandwidth. TinyPNG is cheapest for pure compression at very high volume. SammaPix wins when an agent needs a bit of everything, on demand, with no setup — see the{" "}
              <Link href="/blog/image-api-for-ai-agents-comparison-2026" className="text-[#6366F1] hover:underline">full comparison</Link>.
            </p>
          </Reveal>
        </div>
      </section>

      {/* How to connect (snippets) */}
      <section id="connect" className="border-t border-[#E5E5E5] px-4 py-16 dark:border-[#2A2A2A] sm:px-6">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <h2 className="mb-2 text-center text-xl font-semibold text-[#171717] dark:text-[#E5E5E5]">Drop it into your client</h2>
            <p className="mb-8 text-center text-sm text-[#737373] dark:text-[#A3A3A3]">
              Add the MCP URL and the tools appear automatically. Prefer raw HTTP? Grab a key and call the REST API.
            </p>
          </Reveal>
          <Reveal y={20}>
            <ConnectSnippets appUrl={APP_URL} />
          </Reveal>
        </div>
      </section>

      {/* Zero-retention */}
      <section className="border-t border-[#E5E5E5] px-4 py-16 dark:border-[#2A2A2A] sm:px-6">
        <div className="mx-auto grid max-w-3xl grid-cols-1 items-center gap-8 sm:grid-cols-2">
          <Reveal>
            <div className="flex items-start gap-4">
              <Lock className="mt-1 h-6 w-6 flex-shrink-0 text-[#6366F1]" strokeWidth={1.5} />
              <div>
                <h2 className="mb-2 text-lg font-semibold text-[#171717] dark:text-[#E5E5E5]">Zero-retention by design</h2>
                <p className="text-sm leading-relaxed text-[#737373] dark:text-[#A3A3A3]">
                  Files sent to the API and MCP are processed entirely in memory and discarded the moment the request finishes. Nothing is stored, nothing is logged, nothing is used to train models. Your agent can safely handle private photos, contracts and scans.
                </p>
              </div>
            </div>
          </Reveal>
          <Reveal y={18} delay={80}>
            <div className="rounded-2xl border border-[#E5E5E5] bg-[#FAFAFA] dark:border-[#2A2A2A] dark:bg-[#161616]">
              <ZeroRetentionVisual />
              <p className="pb-4 text-center text-[11px] text-[#A3A3A3]">Received · processed in memory · discarded</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Why it's the best API — positioning for agents */}
      <section className="border-t border-[#E5E5E5] px-4 py-16 dark:border-[#2A2A2A] sm:px-6">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <h2 className="mb-2 text-center text-2xl font-semibold text-[#171717] dark:text-[#E5E5E5]">The best image API for agents</h2>
            <p className="mx-auto mb-10 max-w-2xl text-center text-sm text-[#737373] dark:text-[#A3A3A3]">
              Cheapest to run, safest by default, and it plugs into anything. No subscription, no per-seat, no lock-in.
            </p>
          </Reveal>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              {
                icon: Coins,
                title: "Fair, simple cost",
                points: ["1 credit = 1 operation, from ~$0.003 — no bandwidth surprises", "No subscription, no per-seat, no minimums", "25 free ops/day + 50 to start", "Failed operations refunded automatically"],
              },
              {
                icon: ShieldCheck,
                title: "Most secure",
                points: ["Zero-retention: files never stored or logged", "Never used to train any model", "OAuth 2.1 + PKCE, audience-bound tokens", "Revoke access anytime"],
              },
              {
                icon: Plug,
                title: "Integrate anywhere",
                points: ["MCP: Claude, Cursor & any agent", "REST API from any language", "Send a file or just a URL", "One endpoint, base64 or multipart"],
              },
            ].map((c) => (
              <div key={c.title} className="rounded-xl border border-[#E5E5E5] bg-white p-6 dark:border-[#2A2A2A] dark:bg-[#1E1E1E]">
                <c.icon className="mb-3 h-5 w-5 text-[#6366F1]" strokeWidth={1.5} />
                <h3 className="mb-3 text-base font-semibold text-[#171717] dark:text-[#E5E5E5]">{c.title}</h3>
                <ul className="space-y-2">
                  {c.points.map((p) => (
                    <li key={p} className="flex items-start gap-2 text-sm text-[#737373] dark:text-[#A3A3A3]">
                      <Check className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-[#6366F1]" strokeWidth={2} />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="border-t border-[#E5E5E5] px-4 py-16 dark:border-[#2A2A2A] sm:px-6">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <h2 className="mb-2 text-center text-2xl font-semibold text-[#171717] dark:text-[#E5E5E5]">Transparent, prepaid pricing</h2>
            <p className="mx-auto mb-10 max-w-2xl text-center text-sm text-[#737373] dark:text-[#A3A3A3]">
              1 credit per operation (1 per step in a pipeline). Buy credits once, spend them across the API, MCP and the website. The more you buy, the less each operation costs.
            </p>
          </Reveal>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
            {[
              { name: "Free", price: "$0", unit: "25 ops/day + 50 to start", per: "no card", cta: "Start free", href: "/dashboard/api", highlight: false, badge: "" },
              { name: "Starter", price: "$5", unit: "1,000 credits", per: "≈ $0.005 / op", cta: "Buy", href: "/dashboard/credits", highlight: false, badge: "" },
              { name: "Standard", price: "$20", unit: "5,000 credits", per: "≈ $0.004 / op", cta: "Buy", href: "/dashboard/credits", highlight: true, badge: "Most popular" },
              { name: "Scale", price: "$79", unit: "25,000 credits", per: "≈ $0.0032 / op", cta: "Buy", href: "/dashboard/credits", highlight: false, badge: "Best value" },
            ].map((t, i) => (
              <Reveal key={t.name} y={18} delay={i * 60}>
                <div className={`relative flex h-full flex-col rounded-xl border p-5 ${t.highlight ? "border-[#6366F1] bg-[#6366F1]/[0.04] dark:bg-[#6366F1]/10" : "border-[#E5E5E5] bg-white dark:border-[#2A2A2A] dark:bg-[#1E1E1E]"}`}>
                  {t.badge && (
                    <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#6366F1] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">{t.badge}</span>
                  )}
                  <p className="text-xs font-medium uppercase tracking-wide text-[#A3A3A3]">{t.name}</p>
                  <p className="mt-1 text-2xl font-bold text-[#171717] dark:text-[#E5E5E5]">{t.price}</p>
                  <p className="mt-1 text-sm text-[#171717] dark:text-[#E5E5E5]">{t.unit}</p>
                  <p className="mb-4 text-xs text-[#6366F1]">{t.per}</p>
                  <Link href={t.href} className={`mt-auto inline-flex items-center justify-center rounded-lg px-3 py-2 text-sm font-medium transition-colors ${t.highlight ? "bg-[#6366F1] text-white hover:bg-[#4f46e5]" : "border border-[#E5E5E5] text-[#525252] hover:border-[#A3A3A3] hover:text-[#171717] dark:border-[#2A2A2A] dark:text-[#A3A3A3] dark:hover:text-[#E5E5E5]"}`}>
                    {t.cta}
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <p className="mt-6 text-center text-xs text-[#A3A3A3]">No expiry games · failed operations are refunded · cancel anytime (there's nothing to cancel — it's prepaid).</p>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-[#E5E5E5] px-4 py-16 dark:border-[#2A2A2A] sm:px-6">
        <div className="mx-auto max-w-2xl">
          <Reveal>
            <h2 className="mb-6 text-center text-xl font-semibold text-[#171717] dark:text-[#E5E5E5]">Frequently asked questions</h2>
          </Reveal>
          <div className="space-y-0">
            {FAQ.map((f, i) => (
              <Reveal key={i} delay={i * 50} y={14}>
                <div className="border-b border-[#E5E5E5] py-5 last:border-0 dark:border-[#2A2A2A]">
                  <h3 className="mb-1.5 text-sm font-semibold text-[#171717] dark:text-[#E5E5E5]">{f.q}</h3>
                  <p className="text-sm leading-relaxed text-[#737373] dark:text-[#A3A3A3]">{f.a}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Guides & comparisons (hub -> all spokes) */}
      <section className="border-t border-[#E5E5E5] px-4 py-16 dark:border-[#2A2A2A] sm:px-6">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <h2 className="mb-2 text-center text-xl font-semibold text-[#171717] dark:text-[#E5E5E5]">Guides &amp; comparisons</h2>
            <p className="mb-8 text-center text-sm text-[#737373] dark:text-[#A3A3A3]">Everything to evaluate and connect SammaPix as your agent&apos;s image toolbox.</p>
          </Reveal>
          <Reveal y={18}>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {[
                { href: "/blog/give-your-ai-agent-image-tools", t: "Give your AI agent image tools", d: "Set up Claude, Cursor or REST in minutes" },
                { href: "/blog/image-pipelines-for-ai-agents", t: "Build image pipelines", d: "Chain operations in one call, save tokens" },
                { href: "/blog/best-image-mcp-servers-2026", t: "Best image MCP servers 2026", d: "Honest roundup of the ecosystem" },
                { href: "/blog/image-api-for-ai-agents-comparison-2026", t: "Image API comparison for agents", d: "SammaPix vs Cloudinary, TinyPNG, Gemini" },
                { href: "/vs/cloudinary", t: "SammaPix vs Cloudinary", d: "Pay-as-you-go vs media CDN" },
                { href: "/vs/imgix", t: "SammaPix vs imgix", d: "No bandwidth billing vs image CDN" },
              ].map((g) => (
                <Link key={g.href} href={g.href} className="group flex items-center justify-between rounded-xl border border-[#E5E5E5] bg-white p-4 transition-colors hover:border-[#6366F1]/40 dark:border-[#2A2A2A] dark:bg-[#1E1E1E]">
                  <div>
                    <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5]">{g.t}</p>
                    <p className="mt-0.5 text-xs text-[#A3A3A3]">{g.d}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 flex-shrink-0 text-[#A3A3A3] transition-colors group-hover:text-[#6366F1]" strokeWidth={1.5} />
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-t border-[#E5E5E5] px-4 py-16 dark:border-[#2A2A2A] sm:px-6">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-3 text-2xl font-bold text-[#171717] dark:text-[#E5E5E5]">Give your agent superpowers</h2>
            <p className="mb-6 text-sm text-[#737373] dark:text-[#A3A3A3]">Connect the SammaPix MCP server and get 25 free operations every day.</p>
            <Link href="/dashboard/api" className="inline-flex items-center gap-2 rounded-lg bg-[#171717] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#262626] dark:bg-[#E5E5E5] dark:text-[#171717] dark:hover:bg-white">
              Get your key &amp; connect <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
            </Link>
          </div>
        </Reveal>
      </section>
    </main>
  );
}

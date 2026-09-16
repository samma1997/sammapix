import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { APP_URL } from "@/lib/constants";
import BlogArticleLayout from "@/components/blog/BlogArticleLayout";

export const metadata: Metadata = {
  title: "Best Image MCP Servers for AI Agents (2026)",
  description:
    "A practical, honest roundup of the best image (and PDF) MCP servers for AI agents in 2026 — what each one does, how it is priced, and when to pick it. Includes all-in-one, upscaling, vectorizing and optimizing servers.",
  alternates: { canonical: `${APP_URL}/blog/best-image-mcp-servers-2026` },
  keywords: [
    "best image mcp servers",
    "image mcp server 2026",
    "mcp server for images",
    "ai agent image tools",
    "mcp image processing",
    "pdf mcp server",
    "claude image mcp",
    "cursor image mcp",
  ],
  openGraph: {
    title: "Best Image MCP Servers for AI Agents (2026)",
    description:
      "What each image MCP server does, how it is priced, and when to pick it — an honest roundup for 2026.",
    url: `${APP_URL}/blog/best-image-mcp-servers-2026`,
    type: "article",
    publishedTime: "2026-09-16",
    authors: ["https://lucasammarco.com"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Image MCP Servers for AI Agents (2026)",
    description: "Honest roundup of image + PDF MCP servers: what each does, pricing, and when to pick it.",
    creator: "@lucasammarco",
  },
};

const POST_DATE = "2026-09-16";
const POST_URL = `${APP_URL}/blog/best-image-mcp-servers-2026`;
const POST_TITLE = "Best Image MCP Servers for AI Agents (2026)";

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: POST_TITLE,
  description:
    "An honest roundup of the best image and PDF MCP servers for AI agents in 2026, with what each does, pricing, and when to pick it.",
  url: POST_URL,
  datePublished: POST_DATE,
  dateModified: POST_DATE,
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
  mainEntityOfPage: { "@type": "WebPage", "@id": POST_URL },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: APP_URL },
    { "@type": "ListItem", position: 2, name: "Blog", item: `${APP_URL}/blog` },
    { "@type": "ListItem", position: 3, name: POST_TITLE, item: POST_URL },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is an image MCP server?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "An image MCP server exposes image (and often PDF) operations as tools an AI agent can call directly from its client over the Model Context Protocol. The agent sends a file, the server processes it and returns the result, with no custom integration to build.",
      },
    },
    {
      "@type": "Question",
      name: "Which image MCP server is best for most agents?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For a general-purpose agent that needs a bit of everything — compress, convert, resize, crop, PDF operations and AI vision — an all-in-one server like SammaPix is the most convenient: one connection, pay-as-you-go, OAuth with no key, and a pipeline that chains operations in a single call. For a single specialized task like AI upscaling, a dedicated server may fit better.",
      },
    },
    {
      "@type": "Question",
      name: "Do image MCP servers store my files?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It varies. Some are local (they run on your machine), some are hosted. SammaPix is a hosted server that is zero-retention: files are processed in memory and discarded. Always check each server's data policy before sending sensitive files.",
      },
    },
  ],
};

const H2 = "text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight";
const H3 = "text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2";
const P = "text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3";

export default function BestImageMcpServersPage() {
  return (
    <>
      <BlogArticleLayout
        title={POST_TITLE}
        slug="best-image-mcp-servers-2026"
        description="MCP lets AI agents call real tools. For image work there is now a small ecosystem of servers — some all-in-one, some specialized in upscaling or vectorizing. Here is an honest look at the best ones in 2026, what each does, and when to pick it."
        date={POST_DATE}
        dateFormatted="September 16, 2026"
        tags={["Tools", "Workflow"]}
        readingTime={9}
        headings={[
          { id: "quick-answer", title: "Quick answer" },
          { id: "criteria", title: "How we judged them" },
          { id: "all-in-one", title: "Best all-in-one: SammaPix" },
          { id: "specialists", title: "Specialists worth knowing" },
          { id: "choose", title: "How to choose" },
          { id: "faq", title: "FAQ" },
        ]}
        summary={[
          "Image MCP servers let an AI agent process images and PDFs directly, without a coded integration.",
          "For general-purpose work, an all-in-one server (SammaPix) is the most convenient: one connection, pay-as-you-go, OAuth, pipeline.",
          "For a single specialized task — upscaling, vectorizing — a dedicated server can fit better.",
          "Check whether each server is local or hosted and what its data policy is before sending sensitive files.",
        ]}
        heroImage={
          <figure className="my-8">
            <img
              src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80"
              alt="Grid of connected tools representing MCP servers an AI agent can call"
              className="w-full rounded-lg"
              loading="eager"
            />
            <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
              MCP turns image tools into something an agent can call directly. Photo on Unsplash
            </figcaption>
          </figure>
        }
        ctaBlock={
          <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2">Try the all-in-one server</h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-4">
              SammaPix gives your agent 20+ image and PDF tools plus AI vision over one MCP connection. OAuth, zero-retention, free daily tier.
            </p>
            <Link
              href="/for-ai-agents"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            >
              See the agent toolbox
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>
        }
      >
        <div className="bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] rounded-md p-5 mb-8">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-[#737373] mb-2">Quick answer</p>
          <p id="quick-answer" className="text-sm text-gray-700 dark:text-[#E5E5E5] leading-relaxed">
            The best image MCP server depends on the job. For a general-purpose agent that needs to compress,
            convert, resize, crop, work with PDFs and understand images, an all-in-one server like{" "}
            <strong className="text-gray-900 dark:text-[#E5E5E5]">SammaPix</strong> is the most convenient:
            one connection, 20+ tools plus AI vision, pay-as-you-go, OAuth with no key, and a pipeline that
            chains operations in a single call. For a single specialized task — AI upscaling or vectorizing —
            a dedicated server can be the better pick.
          </p>
        </div>

        <h2 id="criteria" className={H2}>How we judged them</h2>
        <p className={P}>
          We looked at four things that actually matter to an agent, not a human clicking a UI:
          breadth (how many operations from one connection), connection friction (does it need an API key or
          does it broker auth), pricing model (pay-as-you-go vs plan vs free/local), and data handling
          (hosted vs local, and whether files are retained). We are not ranking on hype — several of these
          are excellent at one specific thing.
        </p>

        <h2 id="all-in-one" className={H2}>Best all-in-one: SammaPix</h2>
        <p className={P}>
          <strong className="text-gray-900 dark:text-[#E5E5E5]">SammaPix</strong> is a hosted, remote MCP
          server with 20+ image and PDF tools — compress, convert, resize, crop, rotate, flip, watermark,
          round, border, plus PDF compress/split/merge/rotate and image-to-PDF — and AI vision tools
          (describe, alt text, OCR, tags, filename). Its standout is the <strong className="text-gray-900 dark:text-[#E5E5E5]">pipeline</strong>{" "}
          tool, which chains several operations in one call so the agent spends tokens once instead of once
          per step. Connection is OAuth 2.1 (no key to paste), pricing is pay-as-you-go with a free daily
          tier, and every operation is zero-retention. It is the right default when an agent needs a bit of
          everything on demand. Full details on the{" "}
          <Link href="/for-ai-agents" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2">for-AI-agents page</Link>,
          and a deeper price comparison in our{" "}
          <Link href="/blog/image-api-for-ai-agents-comparison-2026" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2">image API comparison</Link>.
        </p>

        <h2 id="specialists" className={H2}>Specialists worth knowing</h2>
        <p className={P}>
          If your agent only ever does one thing, a focused server can be a great fit. A few from the MCP
          ecosystem:
        </p>
        <h3 className={H3}>Topaz (topaz-mcp) — AI upscaling</h3>
        <p className={P}>
          The official Topaz Labs MCP server focuses on AI upscaling and enhancement. If high-quality
          upscaling is your core need and you already use Topaz, a dedicated server that does that one thing
          well is a reasonable pick. It is a specialist, not an all-in-one toolbox.
        </p>
        <h3 className={H3}>image2svg — raster to vector</h3>
        <p className={P}>
          A small server that converts raster images (PNG/JPG/WEBP/TIFF) to SVG vectors, accepting base64 or
          a URL and running locally or as a Docker HTTP server. Perfect when vectorizing is the whole job;
          not intended for general image editing.
        </p>
        <h3 className={H3}>Zero-auth optimizers (e.g. Cleanor)</h3>
        <p className={P}>
          Some hosted servers focus on quick, no-signup image optimizing and converting (WebP/AVIF/JPEG),
          sometimes bundled with developer utilities. These are handy for a fast optimize step with zero
          setup; they typically do not cover PDFs or AI vision.
        </p>
        <h3 className={H3}>Local image-manipulation servers</h3>
        <p className={P}>
          Several community servers run entirely on your machine and expose local image editing to an agent.
          The trade-off is you host and maintain them yourself, but nothing leaves your computer — a good
          choice when that constraint matters more than breadth or convenience.
        </p>

        <h2 id="choose" className={H2}>How to choose</h2>
        <ul className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3 list-disc pl-5 space-y-2">
          <li><strong className="text-gray-900 dark:text-[#E5E5E5]">Need a bit of everything?</strong> Pick an all-in-one (SammaPix) so the agent has one connection to image + PDF + AI vision.</li>
          <li><strong className="text-gray-900 dark:text-[#E5E5E5]">Single specialized task?</strong> A dedicated server (upscaling, vectorizing) can be higher quality for that one job.</li>
          <li><strong className="text-gray-900 dark:text-[#E5E5E5]">Files must never leave your machine?</strong> Choose a local server and accept the hosting/maintenance overhead.</li>
          <li><strong className="text-gray-900 dark:text-[#E5E5E5]">Want no key and no monthly plan?</strong> Prefer a hosted server with OAuth and pay-as-you-go pricing.</li>
        </ul>
        <p className={P}>
          Whatever you pick, once you have chosen a server the setup is the same: add its URL to your MCP
          client and authorize. We wrote a short guide on exactly that:{" "}
          <Link href="/blog/image-pipelines-for-ai-agents" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2">how to build image pipelines for agents</Link>.
        </p>

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      </BlogArticleLayout>
    </>
  );
}

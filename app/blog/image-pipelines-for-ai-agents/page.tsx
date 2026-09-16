import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { APP_URL } from "@/lib/constants";
import BlogArticleLayout from "@/components/blog/BlogArticleLayout";

export const metadata: Metadata = {
  title: "How to Build Image Pipelines for AI Agents (2026)",
  description:
    "Chain image operations in a single call so an AI agent uses fewer tokens and no intermediate files. Ready-made flows for web-optimize, thumbnails, social, OCR and captioning — with copy-paste MCP and REST examples.",
  alternates: { canonical: `${APP_URL}/blog/image-pipelines-for-ai-agents` },
  keywords: [
    "image pipeline for ai agents",
    "chain image operations one call",
    "mcp pipeline tool",
    "agent image workflow",
    "compress convert resize one request",
    "sammapix pipeline",
    "save tokens image processing agent",
    "ai agent image editing",
  ],
  openGraph: {
    title: "How to Build Image Pipelines for AI Agents (2026)",
    description:
      "One call, whole chain: crop → resize → convert → compress. Ready-made agent flows with copy-paste MCP and REST examples.",
    url: `${APP_URL}/blog/image-pipelines-for-ai-agents`,
    type: "article",
    publishedTime: "2026-09-16",
    authors: ["https://lucasammarco.com"],
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Build Image Pipelines for AI Agents (2026)",
    description:
      "Chain image ops in one call. Ready-made flows + copy-paste MCP/REST examples so your agent spends fewer tokens.",
    creator: "@lucasammarco",
  },
};

const POST_DATE = "2026-09-16";
const POST_URL = `${APP_URL}/blog/image-pipelines-for-ai-agents`;
const POST_TITLE = "How to Build Image Pipelines for AI Agents (2026)";

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: POST_TITLE,
  description:
    "A practical guide to chaining image operations in a single call for AI agents, with ready-made flows and copy-paste MCP and REST examples.",
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

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "Build an image pipeline for an AI agent",
  description:
    "Chain crop, resize, convert and compress into a single pipeline call so an AI agent gets a web-ready image back in one request.",
  step: [
    { "@type": "HowToStep", name: "Connect the MCP server", text: "Add https://www.sammapix.com/api/mcp to your MCP client and authorize with Google (OAuth, no API key)." },
    { "@type": "HowToStep", name: "Describe the chain", text: "Call the pipeline tool with an ordered steps array, e.g. crop 16:9, resize 1200, convert webp, compress 75." },
    { "@type": "HowToStep", name: "Get the final file", text: "The server runs every step in sequence and returns only the final image, so the agent never handles intermediate files." },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is an image pipeline for an AI agent?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "An image pipeline chains several image operations — for example crop, resize, convert and compress — into a single API or MCP call. The output of each step feeds the next, and the agent gets back only the final image. This avoids multiple round-trips and intermediate files, which saves tokens.",
      },
    },
    {
      "@type": "Question",
      name: "Why does a pipeline save tokens for an agent?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Each separate tool call costs the agent a round-trip: a request, a response, and tokens to describe the next step and pass the intermediate file along. A pipeline collapses the whole chain into one request and one response, so the agent spends tokens once instead of once per step.",
      },
    },
    {
      "@type": "Question",
      name: "How much does a pipeline cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "On SammaPix a pipeline costs 1 credit per step, and every account has a free daily tier. A four-step chain costs 4 credits (roughly $0.013–0.02 depending on the credit pack), and a failed step is refunded automatically.",
      },
    },
  ],
};

export default function ImagePipelinesForAgentsPage() {
  return (
    <>
      <BlogArticleLayout
        title={POST_TITLE}
        slug="image-pipelines-for-ai-agents"
        description="An AI agent that crops, resizes, converts and compresses an image with four separate calls burns four round-trips of tokens. A pipeline does the whole chain in one call and returns only the final file. Here is how to build them, with ready-made flows and copy-paste examples."
        date={POST_DATE}
        dateFormatted="September 16, 2026"
        tags={["Workflow", "Tools"]}
        readingTime={8}
        headings={[
          { id: "quick-answer", title: "Quick answer" },
          { id: "why", title: "Why pipelines matter for agents" },
          { id: "anatomy", title: "Anatomy of a pipeline call" },
          { id: "flows", title: "Ready-made flows to copy" },
          { id: "ai-flows", title: "Flows that mix editing and AI" },
          { id: "rest", title: "Calling it over REST" },
          { id: "studio", title: "Building flows visually (Node Studio)" },
          { id: "faq", title: "FAQ" },
        ]}
        summary={[
          "A pipeline chains image operations into one call — the output of each step feeds the next, and the agent gets back only the final file.",
          "This saves tokens: one round-trip instead of one per step, with no intermediate files to pass along.",
          "Copy-paste flows included: web-optimize, thumbnail, social square, and OCR-then-compress.",
          "On SammaPix a pipeline costs 1 credit per step, a failed step is refunded, and there is a free daily tier.",
        ]}
        heroImage={
          <figure className="my-8">
            <img
              src="https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800&q=80"
              alt="A sequence of connected steps representing an image processing pipeline"
              className="w-full rounded-lg"
              loading="eager"
            />
            <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
              One request describes the whole chain; the agent gets back only the final file. Photo on Unsplash
            </figcaption>
          </figure>
        }
        ctaBlock={
          <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2">
              Give your agent the pipeline
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-4">
              Add the SammaPix MCP server and your agent can chain 15+ image operations in a single call. OAuth, zero-retention, free daily tier.
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
            An image pipeline chains several operations — such as crop, resize, convert and compress — into a
            single call. The output of each step feeds the next, and the agent gets back only the final image.
            On SammaPix, the pipeline tool accepts an ordered <code>steps</code> array and runs the whole chain
            server-side, so an agent avoids multiple round-trips and never handles intermediate files. This is
            the single biggest token saver when an agent works with images.
          </p>
        </div>

        <h2 id="why" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Why pipelines matter for agents
        </h2>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          For a human, calling four endpoints in a row is a minor inconvenience. For an AI agent it is the main
          cost. Every separate tool call is a round-trip: the agent spends tokens to describe the operation, waits
          for a response, then spends more tokens to describe the next step and pass the intermediate file along.
          Four operations means four times that overhead. A pipeline collapses the chain into one request and one
          response, so the agent pays the token cost once. In a real run, a 314&nbsp;KB screenshot went through
          crop&nbsp;→&nbsp;resize&nbsp;→&nbsp;WebP&nbsp;→&nbsp;compress and came out at 8.7&nbsp;KB (−97%) — in a single call.
        </p>

        <h2 id="anatomy" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Anatomy of a pipeline call
        </h2>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The pipeline tool takes a source image (as base64 or a URL) and an ordered <code>steps</code> array.
          Each step is an object with an <code>op</code> and its <code>params</code>. Chainable ops include
          compress, resize, crop, convert, rotate, flip, grayscale, blur, adjust, tint, negate, flatten, border,
          round and watermark.
        </p>
        <pre className="bg-[#0A0A0A] text-[#E5E5E5] text-xs rounded-md p-4 overflow-x-auto mb-3"><code>{`{
  "imageUrl": "https://example.com/photo.jpg",
  "steps": [
    { "op": "crop",     "params": { "ratio": "16:9" } },
    { "op": "resize",   "params": { "width": 1200 } },
    { "op": "convert",  "params": { "format": "webp", "quality": 80 } },
    { "op": "compress", "params": { "quality": 75 } }
  ]
}`}</code></pre>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The server runs the steps in order and returns only the final image. You are billed 1 credit per step,
          and a failed step refunds the whole call.
        </p>

        <h2 id="flows" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Ready-made flows to copy
        </h2>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          <strong className="text-gray-900 dark:text-[#E5E5E5]">Web-optimize</strong> (or just call the{" "}
          <code>optimize_for_web</code> tool, which does this in one step):
        </p>
        <pre className="bg-[#0A0A0A] text-[#E5E5E5] text-xs rounded-md p-4 overflow-x-auto mb-3"><code>{`[
  { "op": "resize",  "params": { "width": 1920, "height": 1920, "fit": "inside" } },
  { "op": "convert", "params": { "format": "webp", "quality": 80 } }
]`}</code></pre>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          <strong className="text-gray-900 dark:text-[#E5E5E5]">Thumbnail</strong> (square crop, small, compressed):
        </p>
        <pre className="bg-[#0A0A0A] text-[#E5E5E5] text-xs rounded-md p-4 overflow-x-auto mb-3"><code>{`[
  { "op": "crop",     "params": { "ratio": "1:1" } },
  { "op": "resize",   "params": { "width": 400 } },
  { "op": "convert",  "params": { "format": "webp", "quality": 70 } }
]`}</code></pre>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          <strong className="text-gray-900 dark:text-[#E5E5E5]">Social square with a watermark</strong>:
        </p>
        <pre className="bg-[#0A0A0A] text-[#E5E5E5] text-xs rounded-md p-4 overflow-x-auto mb-3"><code>{`[
  { "op": "crop",      "params": { "ratio": "1:1" } },
  { "op": "resize",    "params": { "width": 1080 } },
  { "op": "watermark", "params": { "text": "@yourbrand", "position": "bottom-right", "opacity": 0.6 } },
  { "op": "convert",   "params": { "format": "jpeg", "quality": 85 } }
]`}</code></pre>

        <h2 id="ai-flows" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Flows that mix editing and AI
        </h2>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The pipeline chains deterministic image ops. AI vision tools (describe, alt text, OCR, tags, filename)
          return text, so an agent composes them itself around a pipeline. Common agent patterns:
        </p>
        <ul className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3 list-disc pl-5 space-y-2">
          <li><strong className="text-gray-900 dark:text-[#E5E5E5]">Publish-ready</strong>: run <code>optimize_for_web</code>, then <code>alt_text</code> and <code>suggest_filename</code> on the same image — a web-ready file plus its accessibility text and SEO filename.</li>
          <li><strong className="text-gray-900 dark:text-[#E5E5E5]">Read then shrink</strong>: <code>extract_text</code> (OCR) to capture what a screenshot says, then a compress pipeline to store it small.</li>
          <li><strong className="text-gray-900 dark:text-[#E5E5E5]">Catalogue</strong>: <code>describe</code> + <code>tags</code> to index a photo library, with a thumbnail pipeline for previews.</li>
        </ul>

        <h2 id="rest" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Calling it over REST
        </h2>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Not using MCP? The same pipeline is a plain HTTP endpoint:
        </p>
        <pre className="bg-[#0A0A0A] text-[#E5E5E5] text-xs rounded-md p-4 overflow-x-auto mb-3"><code>{`curl -X POST ${APP_URL}/api/v1/pipeline \\
  -H "Authorization: Bearer sk_live_YOUR_KEY" \\
  -F "file=@photo.jpg" \\
  -F 'steps=[{"op":"resize","params":{"width":1200}},{"op":"convert","params":{"format":"webp","quality":80}}]' \\
  -o out.webp`}</code></pre>

        <h2 id="studio" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Building flows visually (Node Studio)
        </h2>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Prefer to design a flow by hand before handing it to an agent? SammaPix has a visual node editor where you
          drop the first tool, connect the next, and watch the image transform step by step — the same chain your
          agent runs, built with your mouse. It is the fastest way to work out the right sequence and parameters,
          then copy them into a pipeline call. Explore the tools on the{" "}
          <Link href="/for-ai-agents" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2">for-AI-agents page</Link>.
        </p>

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      </BlogArticleLayout>
    </>
  );
}

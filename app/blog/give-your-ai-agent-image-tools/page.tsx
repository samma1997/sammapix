import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { APP_URL } from "@/lib/constants";
import BlogArticleLayout from "@/components/blog/BlogArticleLayout";

export const metadata: Metadata = {
  title: "How to Give Your AI Agent Image Tools (Claude, Cursor, ChatGPT) — 2026",
  description:
    "Step-by-step: connect image and PDF tools to Claude, Cursor and other AI agents over MCP, or call them via REST. Copy-paste config, first prompts to try, and how billing works.",
  alternates: { canonical: `${APP_URL}/blog/give-your-ai-agent-image-tools` },
  keywords: [
    "give ai agent image tools",
    "add image tools to claude",
    "cursor mcp image server",
    "connect mcp server claude",
    "chatgpt image processing api",
    "mcp image tools setup",
    "ai agent compress image",
  ],
  openGraph: {
    title: "How to Give Your AI Agent Image Tools (Claude, Cursor, ChatGPT) — 2026",
    description:
      "Connect image + PDF tools to your agent over MCP in minutes. Copy-paste config, first prompts, and how billing works.",
    url: `${APP_URL}/blog/give-your-ai-agent-image-tools`,
    type: "article",
    publishedTime: "2026-09-16",
    authors: ["https://lucasammarco.com"],
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Give Your AI Agent Image Tools (Claude, Cursor, ChatGPT)",
    description: "Connect image + PDF tools to your agent over MCP in minutes. Copy-paste config and first prompts.",
    creator: "@lucasammarco",
  },
};

const POST_DATE = "2026-09-16";
const POST_URL = `${APP_URL}/blog/give-your-ai-agent-image-tools`;
const POST_TITLE = "How to Give Your AI Agent Image Tools (Claude, Cursor, ChatGPT) — 2026";

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: POST_TITLE,
  description:
    "A step-by-step guide to connecting image and PDF tools to AI agents like Claude and Cursor over MCP, or via the REST API.",
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
  name: "Give your AI agent image tools over MCP",
  description: "Connect a remote MCP image/PDF server to an AI agent client and start processing files.",
  step: [
    { "@type": "HowToStep", name: "Add the MCP server", text: "Add https://www.sammapix.com/api/mcp as a custom connector / MCP server in your client (Claude, Cursor, etc.)." },
    { "@type": "HowToStep", name: "Authorize", text: "Approve the OAuth sign-in with Google. No API key to paste." },
    { "@type": "HowToStep", name: "Use it", text: "Ask the agent to compress, convert, describe or OCR an image; it calls the tools automatically." },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Which AI agents support MCP image tools?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Any MCP-compatible client, including Claude (desktop and web) and Cursor. Clients that do not support remote MCP can still use the tools through the REST API with an API key.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need an API key to connect?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Not for MCP. SammaPix uses OAuth 2.1 — the agent opens a link, you sign in with Google and approve, and it receives a token automatically. For the REST API you generate a key on the dashboard.",
      },
    },
    {
      "@type": "Question",
      name: "How is it billed?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Pay-as-you-go with prepaid credits and a free daily tier. Most operations cost 1 credit, AI vision ops 2, and a pipeline is 1 per step. A failed operation is refunded automatically.",
      },
    },
  ],
};

const H2 = "text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight";
const P = "text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3";
const PRE = "bg-[#0A0A0A] text-[#E5E5E5] text-xs rounded-md p-4 overflow-x-auto mb-3";

export default function GiveAgentImageToolsPage() {
  return (
    <>
      <BlogArticleLayout
        title={POST_TITLE}
        slug="give-your-ai-agent-image-tools"
        description="Your agent can already reason about images. To let it actually process them — compress, convert, describe, OCR, turn into a PDF — connect an image MCP server. Here is how, for Claude, Cursor and beyond, in a few minutes."
        date={POST_DATE}
        dateFormatted="September 16, 2026"
        tags={["Workflow", "Tools"]}
        readingTime={7}
        headings={[
          { id: "quick-answer", title: "Quick answer" },
          { id: "need", title: "What you need" },
          { id: "claude-desktop", title: "Claude Desktop / Cursor (config file)" },
          { id: "claude-web", title: "Claude on the web (connector)" },
          { id: "rest", title: "Other agents: the REST API" },
          { id: "try", title: "First prompts to try" },
          { id: "billing", title: "How billing works" },
          { id: "faq", title: "FAQ" },
        ]}
        summary={[
          "Connect a remote MCP server and your agent gains image + PDF tools it can call directly.",
          "Claude and Cursor: add the MCP URL; authorize with OAuth (no API key).",
          "Other clients: use the REST API with a generated key.",
          "Pay-as-you-go with a free daily tier; failed ops are refunded.",
        ]}
        heroImage={
          <figure className="my-8">
            <img
              src="https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&q=80"
              alt="A developer connecting tools to an AI assistant"
              className="w-full rounded-lg"
              loading="eager"
            />
            <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
              One connection turns your agent into an image and PDF processor. Photo on Unsplash
            </figcaption>
          </figure>
        }
        ctaBlock={
          <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2">Connect in seconds</h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-4">
              Add the SammaPix MCP server to your agent: 20+ image and PDF tools plus AI vision, OAuth, zero-retention, free daily tier.
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
            To give an AI agent image tools, connect a remote MCP server. In an MCP client like Claude or
            Cursor, add the server URL <code>{APP_URL}/api/mcp</code>, approve the OAuth sign-in (no API key to
            paste), and the agent discovers 20+ image and PDF tools plus AI vision automatically. For clients
            without MCP support, call the same tools through the REST API with a generated key.
          </p>
        </div>

        <h2 id="need" className={H2}>What you need</h2>
        <p className={P}>
          An MCP-compatible agent client (Claude desktop or web, Cursor, or similar) and a Google account for
          the one-time sign-in. That is it — there is no SDK to install and no key to manage for the MCP path.
        </p>

        <h2 id="claude-desktop" className={H2}>Claude Desktop / Cursor (config file)</h2>
        <p className={P}>
          Add the server to your client&apos;s MCP configuration:
        </p>
        <pre className={PRE}><code>{`{
  "mcpServers": {
    "sammapix": { "url": "${APP_URL}/api/mcp" }
  }
}`}</code></pre>
        <p className={P}>
          Restart the client. The first time the agent uses a tool, it opens the OAuth flow: sign in with
          Google, approve, and you are connected. If you prefer a key instead of OAuth, add an{" "}
          <code>Authorization</code> header:
        </p>
        <pre className={PRE}><code>{`{
  "mcpServers": {
    "sammapix": {
      "url": "${APP_URL}/api/mcp",
      "headers": { "Authorization": "Bearer sk_live_YOUR_KEY" }
    }
  }
}`}</code></pre>

        <h2 id="claude-web" className={H2}>Claude on the web (connector)</h2>
        <p className={P}>
          In Claude&apos;s settings, open <strong className="text-gray-900 dark:text-[#E5E5E5]">Connectors</strong>{" "}
          → <strong className="text-gray-900 dark:text-[#E5E5E5]">Add custom connector</strong>. Give it a name
          (SammaPix) and paste the MCP server URL <code>{APP_URL}/api/mcp</code>. Continue, sign in with Google
          when prompted, and the tools appear. Nothing else to configure.
        </p>

        <h2 id="rest" className={H2}>Other agents: the REST API</h2>
        <p className={P}>
          If your framework does not support remote MCP yet, call the same tools over plain HTTP. Generate a
          key on the{" "}
          <Link href="/dashboard/api" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2">API dashboard</Link>{" "}
          and hit an endpoint:
        </p>
        <pre className={PRE}><code>{`curl -X POST ${APP_URL}/api/v1/convert \\
  -H "Authorization: Bearer sk_live_YOUR_KEY" \\
  -F "file=@photo.jpg" -F "format=webp" -F "quality=80" \\
  -o out.webp`}</code></pre>

        <h2 id="try" className={H2}>First prompts to try</h2>
        <ul className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3 list-disc pl-5 space-y-2">
          <li>&quot;Compress this image and convert it to WebP.&quot;</li>
          <li>&quot;Describe this image and generate alt text and an SEO filename.&quot;</li>
          <li>&quot;Extract the text from this screenshot.&quot; (OCR)</li>
          <li>&quot;Optimize this photo for the web.&quot; (one-call pipeline)</li>
          <li>&quot;Turn these images into a single PDF.&quot;</li>
        </ul>
        <p className={P}>
          For chaining several edits in one call, see{" "}
          <Link href="/blog/image-pipelines-for-ai-agents" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2">how to build image pipelines</Link>.
        </p>

        <h2 id="billing" className={H2}>How billing works</h2>
        <p className={P}>
          Every account has a free daily tier. Beyond that it is pay-as-you-go with prepaid credits: most
          operations cost 1 credit, AI vision ops (describe, alt text, OCR, tags, filename) cost 2, and a
          pipeline is 1 per step. A failed operation is refunded automatically, and credits are shared across
          the website and the API/MCP. To compare the economics with other services, see our{" "}
          <Link href="/blog/image-api-for-ai-agents-comparison-2026" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2">image API comparison for agents</Link>.
        </p>

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      </BlogArticleLayout>
    </>
  );
}

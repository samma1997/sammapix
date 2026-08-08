import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { APP_URL } from "@/lib/constants";
import BlogArticleLayout from "@/components/blog/BlogArticleLayout";

export const metadata: Metadata = {
  title: "EU AI Act: Do You Have to Label AI Content? (2026)",
  description:
    "EU AI Act Article 50 requires visible disclosure on AI-generated images, audio and video since 2 August 2026. Who must comply, what counts as a label, and how to do it free.",
  alternates: {
    canonical: `${APP_URL}/blog/eu-ai-act-label-ai-content`,
  },
  keywords: [
    "eu ai act label ai content",
    "do i have to disclose ai generated content",
    "made with ai label requirement",
    "ai act article 50",
    "label ai images eu",
    "ai content disclosure law 2026",
    "eu ai act transparency",
    "ai generated image label",
  ],
  openGraph: {
    title: "EU AI Act: Do You Have to Label AI Content? (2026)",
    description:
      "EU AI Act Article 50 requires visible disclosure on AI-generated images, audio and video since 2 August 2026. Who must comply, exemptions, and how to add a label free.",
    url: `${APP_URL}/blog/eu-ai-act-label-ai-content`,
    type: "article",
    publishedTime: "2026-08-08",
    authors: ["https://lucasammarco.com"],
  },
  twitter: {
    card: "summary_large_image",
    title: "EU AI Act: Do You Have to Label AI Content? (2026)",
    description:
      "EU AI Act Article 50 is live. If you publish AI-generated images, video or audio you likely need a visible disclosure label. Here is what the law actually says.",
    creator: "@lucasammarco",
  },
};

const POST_DATE = "2026-08-08";
const POST_DATE_FORMATTED = "August 8, 2026";
const POST_URL = `${APP_URL}/blog/eu-ai-act-label-ai-content`;
const POST_TITLE = "EU AI Act: Do You Have to Label AI Content? (2026)";

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: POST_TITLE,
  description:
    "EU AI Act Article 50 transparency rules apply from 2 August 2026. Providers of AI systems must mark AI-generated content in a machine-readable way; deployers who publish AI-generated or manipulated images, audio, or video must also add a visible human-readable disclosure. This guide explains who is affected, what counts as a compliant label, the exemptions, the timeline, and how to add a Made with AI label free in your browser.",
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
    logo: {
      "@type": "ImageObject",
      url: "https://sammapix.com/og-image.png",
    },
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": POST_URL,
  },
  keywords: [
    "eu ai act label ai content",
    "do i have to disclose ai generated content",
    "made with ai label requirement",
    "ai act article 50",
    "label ai images eu",
    "ai content disclosure law 2026",
  ],
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
      name: "Do I have to label AI-generated images under EU law?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, in most cases. From 2 August 2026, EU AI Act Article 50 requires deployers who publish AI-generated or AI-manipulated images (including deepfakes) to disclose this in a way that a person can clearly perceive. A visible 'Made with AI' label placed on or near the image is the most straightforward way to comply. The invisible machine-readable watermark from the AI tool alone is not sufficient for the human disclosure obligation.",
      },
    },
    {
      "@type": "Question",
      name: "Is the invisible AI watermark enough, or do I need a visible label too?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Both are required and they serve different obligations. Providers of the AI system must embed a machine-readable marker (such as SynthID or C2PA metadata) into the output. Deployers who then publish that content must additionally make the disclosure clearly perceptible to a human viewer. That means a visible label is required on top of any invisible watermark. The two obligations work together: one is for machines to detect, the other is for people to read.",
      },
    },
    {
      "@type": "Question",
      name: "What if my content is artistic or satirical? Do I still need to label it?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For clearly artistic, creative, satirical, or fictional works, the disclosure obligation is lighter. You still need to disclose the AI origin, but you can do so in a way that does not spoil the enjoyment or intended effect of the work. A discreet corner label or a caption note meets this requirement. The exemption does not remove the obligation entirely; it only allows you to be less prominent about the placement.",
      },
    },
    {
      "@type": "Question",
      name: "Does the EU AI Act apply to businesses outside the EU?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "If your AI-generated content is published or made available to users located in the EU, the AI Act can apply regardless of where your business is based. The regulation follows a market-access model similar to GDPR: the location of the person who sees the content matters, not just the location of the person who created it. Businesses with any EU audience should review their disclosure practices.",
      },
    },
    {
      "@type": "Question",
      name: "How do I add a Made with AI label to an image for free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "SammaPix offers a free, browser-based AI label tool at sammapix.com/tools/ai-label. You upload your image, choose the label text (such as 'Made with AI' or 'AI-generated'), pick a position and style, and download the labeled image. Everything runs in your browser and the file never leaves your device.",
      },
    },
    {
      "@type": "Question",
      name: "When did the EU AI Act Article 50 rules come into force?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The EU AI Act Article 50 transparency obligations became applicable on 2 August 2026. Systems that were already deployed before that date have until 2 December 2026 to comply with the machine-marking part of Article 50(2). The visible human-readable disclosure obligation for deployers applies from 2 August 2026 for new content.",
      },
    },
  ],
};

export default function EuAiActLabelAiContentPage() {
  return (
    <>
      <BlogArticleLayout
        title={POST_TITLE}
        slug="eu-ai-act-label-ai-content"
        description={`Since 2 August 2026, the EU AI Act Article 50 transparency rules are in force. If you publish AI-generated images, video, or audio (as a marketer, creator, agency, or business) you may be legally required to add a visible disclosure label. This guide explains exactly what the law says, who it affects, what counts as a compliant label, and how to add one free in under a minute.`}
        date={POST_DATE}
        dateFormatted={POST_DATE_FORMATTED}
        tags={["Workflow"]}
        readingTime={11}
        headings={[
          { id: "short-answer", title: "The short answer" },
          { id: "what-article-50-says", title: "What EU AI Act Article 50 actually requires" },
          { id: "two-obligations", title: "Two separate obligations: machine marking and human disclosure" },
          { id: "who-is-affected", title: "Who is affected in practice" },
          { id: "exemptions", title: "Exemptions and nuances" },
          { id: "timeline", title: "Timeline: when do the rules apply?" },
          { id: "penalties", title: "Penalties: why this matters beyond compliance" },
          { id: "how-to-comply", title: "How to comply in practice for images" },
          { id: "faq", title: "FAQ" },
        ]}
        summary={[
          "EU AI Act Article 50 transparency rules apply from 2 August 2026 for AI-generated images, audio, and video.",
          "Deployers who publish AI-generated or manipulated content must add a visible, human-perceptible disclosure label.",
          "The invisible machine-readable watermark from the AI tool alone does not satisfy the visible disclosure obligation.",
          "Exemptions exist for clearly artistic, satirical, or fictional works, but the duty to disclose is not removed entirely.",
          "Businesses publishing AI content to EU audiences are covered regardless of where those businesses are based.",
          "A free browser-based tool at SammaPix lets you add a compliant 'Made with AI' label in under a minute, with no upload.",
        ]}
        heroImage={
          <figure>
            <img
              src="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80"
              alt="Abstract visualization of AI-generated content showing digital patterns representing the EU AI Act labeling requirements for artificial intelligence content"
              className="w-full rounded-lg"
              loading="eager"
            />
            <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
              The EU AI Act Article 50 transparency rules require visible labeling of AI-generated content from 2 August 2026. Photo by Google DeepMind on Unsplash
            </figcaption>
          </figure>
        }
        ctaBlock={
          <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2">
              Add a &ldquo;Made with AI&rdquo; label free, in your browser
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-4">
              Use the SammaPix AI Label tool to add a visible, compliant AI disclosure label to any image. Choose the text, position, and style. The image never leaves your device.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/tools/ai-label"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
              >
                Open AI Label Tool
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
              <Link
                href="/tools/stampit"
                className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#1A1A1A] text-gray-700 dark:text-[#A3A3A3] text-sm font-medium rounded-md border border-gray-200 dark:border-[#333] hover:bg-gray-50 dark:hover:bg-[#222] transition-colors"
              >
                Try Stampit Watermark
              </Link>
            </div>
          </div>
        }
      >
        {/* Disclaimer */}
        <div className="mb-6 p-3 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 rounded-md">
          <p className="text-xs text-amber-800 dark:text-amber-300 leading-relaxed">
            <strong>Note:</strong> This article provides general information about EU AI Act Article 50 based on the published regulation text. It is not legal advice. If you need guidance specific to your situation, consult a qualified legal professional.
          </p>
        </div>

        {/* Quick Answer box */}
        <div className="mb-8 p-4 bg-gray-50 dark:bg-[#1E1E1E] border-l-4 border-[#6366F1] rounded-r-md">
          <p className="text-xs font-semibold text-[#6366F1] mb-1.5 uppercase tracking-wide">
            Quick Answer
          </p>
          <p className="text-sm text-gray-700 dark:text-[#A3A3A3] leading-relaxed">
            Yes. From 2 August 2026, EU AI Act Article 50 requires that AI-generated or AI-manipulated images, audio, and video carry a visible, human-perceptible disclosure when published. The invisible machine-readable watermark that the AI tool embeds is not enough on its own. Deployers who publish content must add a label that a person can clearly see. Use the free{" "}
            <Link href="/tools/ai-label" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2">
              SammaPix AI Label tool
            </Link>{" "}
            to add a compliant label to your images in under a minute, without uploading anything.
          </p>
        </div>

        {/* Section 1: Short answer */}
        <h2 id="short-answer" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          The short answer
        </h2>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          If you publish images, audio, or video that were generated or meaningfully altered by an AI system, and that content reaches users in the European Union, the EU AI Act now requires you to label it clearly. The rules came into force on 2 August 2026 under Article 50 of Regulation (EU) 2024/1689.
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          The obligation falls on &ldquo;deployers,&rdquo; meaning the businesses and individuals who take AI-generated output and publish it to an audience. It is not limited to the AI companies themselves. A marketer who uses Midjourney images in an ad campaign, a blogger who publishes AI-illustrated posts, or an agency producing AI-narrated videos for a client all fall within the scope of the rule.
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          The label does not need to be large, but it must be perceptible. A discreet corner badge that says &ldquo;Made with AI&rdquo; is sufficient. Burying the disclosure in small print far from the content, or relying only on an invisible technical watermark, does not satisfy the requirement.
        </p>

        {/* Section 2: What Article 50 says */}
        <h2 id="what-article-50-says" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          What EU AI Act Article 50 actually requires
        </h2>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Article 50 of the EU AI Act sits within the chapter on transparency obligations. You can read the full text on the{" "}
          <a
            href="https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32024R1689"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors"
          >
            EU Lex database (Regulation 2024/1689)
          </a>{" "}
          and the European Commission has published supporting guidance on its{" "}
          <a
            href="https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors"
          >
            digital strategy pages
          </a>.
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          In plain language, Article 50 does the following:
        </p>

        <ul className="space-y-3 mb-6 pl-4">
          <li className="flex items-start gap-2 text-sm text-[#737373] leading-relaxed">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-indigo-400 shrink-0" />
            <span>
              <strong className="text-[#171717] dark:text-[#E5E5E5]">Article 50(1) and 50(2): System-level marking.</strong>{" "}
              Providers of AI systems that generate or manipulate content (images, audio, video, text) must ensure the outputs are marked in a machine-readable format. This is the technical watermarking layer: think Google&apos;s SynthID, or the C2PA metadata standard. The provider of the AI tool is responsible for building this in.
            </span>
          </li>
          <li className="flex items-start gap-2 text-sm text-[#737373] leading-relaxed">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-indigo-400 shrink-0" />
            <span>
              <strong className="text-[#171717] dark:text-[#E5E5E5]">Article 50(4): Visible human disclosure.</strong>{" "}
              Deployers who publish AI-generated or AI-manipulated images, audio, or video to the public must disclose this in a way that a person can clearly perceive. This is a separate, additional obligation on top of the machine-readable marking. It is the visible label that readers and viewers actually see.
            </span>
          </li>
          <li className="flex items-start gap-2 text-sm text-[#737373] leading-relaxed">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-indigo-400 shrink-0" />
            <span>
              <strong className="text-[#171717] dark:text-[#E5E5E5]">Deepfakes.</strong>{" "}
              The rule gives special attention to AI-generated or manipulated images and video that depict real people (deepfakes). For these, the disclosure obligation is particularly strict: a clear and prominent label is required. Satire and parody involving real people are subject to a lighter treatment, but cannot escape disclosure entirely.
            </span>
          </li>
        </ul>

        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          The key point for anyone publishing AI content today: the regulation does not only target the AI companies. It reaches down to the businesses and individuals who use AI tools to produce content that they then share publicly. If you are the one hitting &ldquo;publish,&rdquo; you carry the disclosure obligation.
        </p>

        {/* Section 3: Two obligations */}
        <h2 id="two-obligations" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          Two separate obligations: machine marking and human disclosure
        </h2>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          A common misconception is that the invisible technical watermark already embedded by the AI tool you use is enough. It is not. Article 50 creates two distinct layers of obligation that work alongside each other.
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md overflow-hidden">
            <thead>
              <tr className="bg-[#FAFAFA] dark:bg-[#1A1A1A]">
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-[#525252] dark:text-[#A3A3A3] border-b border-[#E5E5E5] dark:border-[#2A2A2A]">Obligation</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-[#525252] dark:text-[#A3A3A3] border-b border-[#E5E5E5] dark:border-[#2A2A2A]">Who must do it?</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-[#525252] dark:text-[#A3A3A3] border-b border-[#E5E5E5] dark:border-[#2A2A2A]">What it involves</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-[#525252] dark:text-[#A3A3A3] border-b border-[#E5E5E5] dark:border-[#2A2A2A]">Audience</th>
              </tr>
            </thead>
            <tbody className="text-[#737373] dark:text-[#737373]">
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">Machine-readable marking (Art. 50(2))</td>
                <td className="px-4 py-2.5 text-xs">Providers of AI systems (the AI tool companies)</td>
                <td className="px-4 py-2.5 text-xs">Embed invisible technical markers in AI output (e.g. SynthID, C2PA metadata)</td>
                <td className="px-4 py-2.5 text-xs">Detection tools and automated systems</td>
              </tr>
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#1A1A1A]/50">
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">Human-perceptible disclosure (Art. 50(4))</td>
                <td className="px-4 py-2.5 text-xs font-medium text-indigo-600 dark:text-indigo-400">Deployers (you, if you publish AI content)</td>
                <td className="px-4 py-2.5 text-xs">Add a visible label or notice a person can clearly see</td>
                <td className="px-4 py-2.5 text-xs">Human viewers and readers</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          If you generate an image with Midjourney or DALL-E, the AI company may embed an invisible marker. But that does nothing for the person looking at your Instagram post or your website. The visible label is your responsibility as the publisher.
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          The practical implication: any business or creator who publishes AI-generated images, audio, or video to a public audience needs a workflow for adding a visible label before distribution. That is true even if the AI tool says it already watermarks the output invisibly.
        </p>

        {/* Inline CTA */}
        <Link href="/tools/ai-label" className="flex items-center justify-between gap-4 bg-[#171717] text-white rounded-md px-6 py-5 hover:bg-[#262626] transition-colors group mt-2 mb-8">
          <div>
            <p className="text-xs font-medium text-[#A3A3A3] uppercase tracking-wide mb-1">Free tool, no upload, no signup</p>
            <p className="text-sm font-semibold text-white leading-snug">Add a visible AI label to your images now</p>
          </div>
          <ArrowRight className="h-4 w-4 text-[#737373] group-hover:text-white group-hover:translate-x-0.5 transition-all shrink-0" strokeWidth={1.5} />
        </Link>

        {/* Section 4: Who is affected */}
        <h2 id="who-is-affected" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          Who is affected in practice
        </h2>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          The EU AI Act casts a wide net when it comes to who counts as a &ldquo;deployer&rdquo; for the purposes of Article 50. Essentially, any professional or business that takes AI-generated content and makes it publicly available is caught by the rule. Here are the most common categories.
        </p>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-8 mb-3">Marketing teams and agencies</h3>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          AI-generated visuals have become routine in digital advertising. A team producing social media creatives with Midjourney, generating product mockups with Adobe Firefly, or creating AI-narrated video ads would all need to label that content before publishing. The same applies to agencies producing this material on behalf of clients: the obligation falls on whoever publishes the content, not just whoever created it.
        </p>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-8 mb-3">Social media managers and creators</h3>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          A brand account that posts AI-generated images, a travel influencer who uses AI to fill in missing photos, or a content creator who publishes AI-generated voice-over content all fall within the scope of Article 50. Even a single post featuring AI-generated imagery published to a public account would, in principle, require a disclosure.
        </p>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-8 mb-3">Ecommerce sellers using AI product images</h3>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Many online sellers now generate product visuals using AI tools rather than photography. A product listing that shows an AI-generated image of a bag, a garment, or a piece of furniture displayed in a setting that never existed is AI-generated content. Publishing that image without disclosure would put the seller in breach of Article 50, particularly when the image could be mistaken for a photograph of a real product.
        </p>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-8 mb-3">Publishers and blogs using AI illustrations</h3>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Many publications, from large news outlets to individual bloggers, now use AI-generated images as article illustrations. If you publish an AI-generated illustration as the hero image of a blog post, or as a social media graphic to promote an article, the image needs a label. The same logic extends to AI-generated podcast thumbnails, newsletter headers, and any other public-facing visual.
        </p>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-8 mb-3">Businesses with AI-generated audio or video</h3>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Article 50 covers audio and video, not just images. A business that uses an AI voice generator for customer-facing audio content, or that publishes videos where faces or voices have been AI-altered, must disclose this. The disclosure rule is particularly strict for deepfakes, meaning content where a real person&apos;s likeness has been generated or manipulated by AI.
        </p>

        {/* Section 5: Exemptions */}
        <h2 id="exemptions" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          Exemptions and nuances
        </h2>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Article 50 is not a blanket rule with no exceptions. Three notable carve-outs exist, and understanding them helps you calibrate your compliance effort correctly.
        </p>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-8 mb-3">1. Editorial responsibility exception</h3>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Content published under genuine editorial responsibility is treated differently. Where a natural person holds editorial accountability for the content and where a human editorial process applies, the automatic disclosure obligation may not apply in the same way. This is primarily aimed at traditional media and journalism. Importantly, this exception is narrow: the editorial process must be substantive and genuine, not a rubber-stamp review. Simply having a human who technically approved the post is unlikely to qualify.
        </p>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-8 mb-3">2. Law enforcement exception</h3>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Law enforcement, national security, and public security uses fall outside the standard transparency requirements in specific circumstances. This is a narrow professional exception that will not apply to commercial or content-publishing uses.
        </p>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-8 mb-3">3. Artistic, creative, satirical, or fictional works</h3>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          For content that is clearly artistic, creative, satirical, or fictional in nature, the disclosure obligation is lighter rather than absent. You must still disclose the AI origin, but you may do so in a way that does not materially spoil the enjoyment or intended effect of the work. A small label in the corner, or a caption line, satisfies this. Removing the obligation entirely by calling something &ldquo;art&rdquo; is not what the regulation permits.
        </p>

        <div className="p-4 bg-[#FAFAFA] dark:bg-[#1A1A1A] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md mb-6">
          <p className="text-xs font-semibold text-[#525252] dark:text-[#A3A3A3] uppercase tracking-wide mb-2">Practical note</p>
          <p className="text-sm text-[#737373] leading-relaxed">
            The safest approach, even for content that might qualify for the artistic exception, is to add a discreet label anyway. A small &ldquo;AI-generated&rdquo; text overlay in a corner takes seconds to add and eliminates any ambiguity about compliance. Use the free{" "}
            <Link href="/tools/ai-label" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2">
              SammaPix AI Label tool
            </Link>{" "}
            to add it without disrupting your workflow.
          </p>
        </div>

        {/* Section 6: Timeline */}
        <h2 id="timeline" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          Timeline: when do the rules apply?
        </h2>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          The EU AI Act was published in the Official Journal of the European Union on 12 July 2024 and entered into force on 1 August 2024. Different parts of the regulation apply on a phased schedule.
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md overflow-hidden">
            <thead>
              <tr className="bg-[#FAFAFA] dark:bg-[#1A1A1A]">
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-[#525252] dark:text-[#A3A3A3] border-b border-[#E5E5E5] dark:border-[#2A2A2A]">Date</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-[#525252] dark:text-[#A3A3A3] border-b border-[#E5E5E5] dark:border-[#2A2A2A]">What becomes applicable</th>
              </tr>
            </thead>
            <tbody className="text-[#737373] dark:text-[#737373]">
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">1 August 2024</td>
                <td className="px-4 py-2.5 text-xs">AI Act enters into force. Prohibited practices chapter applies from 2 February 2025.</td>
              </tr>
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#1A1A1A]/50">
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">2 August 2025</td>
                <td className="px-4 py-2.5 text-xs">GPAI model obligations and governance chapter apply.</td>
              </tr>
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A] bg-green-50 dark:bg-green-950/20">
                <td className="px-4 py-2.5 text-xs font-medium text-green-700 dark:text-green-400">2 August 2026</td>
                <td className="px-4 py-2.5 text-xs font-medium text-green-700 dark:text-green-400">Article 50 transparency obligations apply. Visible AI content labeling required for new content published to EU audiences.</td>
              </tr>
              <tr className="bg-amber-50 dark:bg-amber-950/20">
                <td className="px-4 py-2.5 text-xs font-medium text-amber-700 dark:text-amber-400">2 December 2026</td>
                <td className="px-4 py-2.5 text-xs text-amber-700 dark:text-amber-400">Deadline for the machine-readable marking obligation (Art. 50(2)) for AI systems already on the market before 2 August 2026.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          If you are publishing AI-generated content right now, today is already inside the compliance window for Article 50. The visible labeling obligation is live. Providers of AI tools have until December 2026 to retrofit machine-readable marking into products that launched before August 2026, but that does not give deployers more time on the visible label. That obligation applies to content you publish from 2 August 2026 onward.
        </p>

        {/* Section 7: Penalties */}
        <h2 id="penalties" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          Penalties: why this matters beyond compliance
        </h2>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          The EU AI Act sets out a tiered penalty structure, and the fines can be substantial. Non-compliance with the rules for general-purpose AI systems and with transparency obligations can result in fines reaching into the millions of euros, depending on the category of violation and the size of the company. The AI Act follows a similar philosophy to the GDPR in that regulators have meaningful enforcement tools available and have stated publicly that they intend to use them.
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          For businesses, the risk goes beyond the direct fine. A finding of non-compliance under the AI Act creates reputational exposure, can trigger follow-on investigations under other EU laws, and can result in civil liability to individuals whose likeness was used without proper disclosure (particularly for deepfake-related violations).
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          The practical counterpoint is that adding a visible label costs almost nothing. The compliance effort is genuinely low, and the risk of not complying is real. This is one of those situations where the cost-benefit calculation is straightforward.
        </p>

        {/* Section 8: How to comply */}
        <h2 id="how-to-comply" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          How to comply in practice for images
        </h2>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          The regulation does not specify an exact visual format for the disclosure. It requires that the label be &ldquo;clearly perceptible&rdquo; to a human viewer. In practice, the following approaches all qualify:
        </p>

        <ul className="space-y-3 mb-6 pl-4">
          <li className="flex items-start gap-2 text-sm text-[#737373] leading-relaxed">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-gray-300 dark:bg-[#525252] shrink-0" />
            <span>A text overlay directly on the image reading &ldquo;Made with AI,&rdquo; &ldquo;AI-generated,&rdquo; or &ldquo;AI-assisted.&rdquo;</span>
          </li>
          <li className="flex items-start gap-2 text-sm text-[#737373] leading-relaxed">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-gray-300 dark:bg-[#525252] shrink-0" />
            <span>A small badge or watermark in a corner of the image, clearly readable at normal viewing size.</span>
          </li>
          <li className="flex items-start gap-2 text-sm text-[#737373] leading-relaxed">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-gray-300 dark:bg-[#525252] shrink-0" />
            <span>A caption immediately below the image stating that the image is AI-generated.</span>
          </li>
          <li className="flex items-start gap-2 text-sm text-[#737373] leading-relaxed">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-gray-300 dark:bg-[#525252] shrink-0" />
            <span>For video and audio: a spoken disclosure at the start or a persistent on-screen label throughout.</span>
          </li>
        </ul>

        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          What does not qualify on its own: an invisible technical watermark, a disclosure buried three paragraphs below the image in small type, or a generic site-wide policy statement that says &ldquo;some of our images may be AI-generated.&rdquo; The disclosure must be tied to the specific content and perceptible at the point where a viewer encounters it.
        </p>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-8 mb-3">Step-by-step: adding a compliant label with SammaPix</h3>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          The{" "}
          <Link href="/tools/ai-label" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">
            SammaPix AI Label tool
          </Link>{" "}
          is free, runs entirely in your browser, and requires no account or file upload. Here is how to use it:
        </p>

        <ol className="space-y-3 mb-6 pl-4">
          {[
            "Open the AI Label tool at sammapix.com/tools/ai-label.",
            "Drop your AI-generated image into the tool or click to select it from your device.",
            "Choose your label text. Options include 'Made with AI', 'AI-generated', 'AI-assisted', or custom text.",
            "Select the position: top-left, top-right, bottom-left, or bottom-right corner, or centered.",
            "Choose a label style: a solid badge, a semi-transparent overlay, or an outlined text format.",
            "Preview the result and adjust if needed.",
            "Download the labeled image. The file never left your browser. Everything processed locally.",
          ].map((step, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-[#737373] leading-relaxed">
              <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 text-xs font-bold flex items-center justify-center">
                {i + 1}
              </span>
              {step}
            </li>
          ))}
        </ol>

        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          For teams publishing at volume, you can also use{" "}
          <Link href="/tools/stampit" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">
            SammaPix Stampit
          </Link>{" "}
          for batch watermarking across large image sets. The workflow is the same and the output is compliant with a visible disclosure on every image.
        </p>

        {/* Section: Practical compliance checklist */}
        <div className="mt-8 mb-6 p-5 rounded-md border border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#1A1A1A]">
          <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            Quick compliance checklist for AI content publishers
          </h3>
          <ul className="space-y-2">
            {[
              "Identify which images, audio files, and videos in your content pipeline are AI-generated or AI-manipulated.",
              "Add a visible label to each piece of AI-generated content before it is published to a public audience.",
              "Check that the label is perceptible at normal viewing size (not hidden in a corner at 6px font).",
              "For AI-manipulated images of real people, ensure the label is clear and prominent.",
              "Do not rely on the invisible watermark from your AI tool as a substitute for the visible label.",
              "Review your social media scheduling queue for any scheduled posts with unlabeled AI images.",
              "Update your team or agency briefing to include AI disclosure as a standard step in the publishing workflow.",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-[#737373] leading-relaxed">
                <span className="mt-1 h-3.5 w-3.5 rounded-sm border border-[#D4D4D4] dark:border-[#444] flex-shrink-0 bg-white dark:bg-[#2A2A2A]" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Internal links cluster */}
        <div className="mt-8 mb-4">
          <p className="text-xs font-medium uppercase tracking-wider text-[#A3A3A3] mb-3">Related tools and guides</p>
          <div className="flex flex-wrap gap-2">
            <Link href="/tools/ai-label" className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md text-[#525252] hover:border-[#A3A3A3] hover:text-[#171717] dark:text-[#E5E5E5] bg-white dark:bg-[#1E1E1E] transition-colors">
              Made with AI Label Tool
            </Link>
            <Link href="/tools/stampit" className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md text-[#525252] hover:border-[#A3A3A3] hover:text-[#171717] dark:text-[#E5E5E5] bg-white dark:bg-[#1E1E1E] transition-colors">
              Stampit Batch Watermark
            </Link>
            <Link href="/tools/exif" className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md text-[#525252] hover:border-[#A3A3A3] hover:text-[#171717] dark:text-[#E5E5E5] bg-white dark:bg-[#1E1E1E] transition-colors">
              EXIF Metadata Viewer
            </Link>
            <Link href="/blog/which-apps-strip-photo-metadata" className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md text-[#525252] hover:border-[#A3A3A3] hover:text-[#171717] dark:text-[#E5E5E5] bg-white dark:bg-[#1E1E1E] transition-colors">
              Which Apps Strip Photo Metadata?
            </Link>
            <Link href="/blog/batch-watermark-photos-free-guide" className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md text-[#525252] hover:border-[#A3A3A3] hover:text-[#171717] dark:text-[#E5E5E5] bg-white dark:bg-[#1E1E1E] transition-colors">
              How to Batch Watermark Photos Free
            </Link>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-10 pt-8 border-t border-gray-100 dark:border-[#2A2A2A]">
          <h2 id="faq" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mb-6">
            FAQ
          </h2>
          <div className="space-y-6">
            {[
              {
                q: "Do I have to label AI-generated images under EU law?",
                a: "Yes, in most cases. From 2 August 2026, EU AI Act Article 50 requires deployers who publish AI-generated or AI-manipulated images (including deepfakes) to disclose this in a way a person can clearly perceive. A visible 'Made with AI' label placed on or near the image is the most straightforward way to comply. The invisible machine-readable watermark from your AI tool alone does not satisfy the visible disclosure obligation.",
              },
              {
                q: "Is the invisible AI watermark enough, or do I need a visible label too?",
                a: "Both are required, and they serve different obligations. Providers of AI systems must embed a machine-readable marker (such as SynthID or C2PA metadata) into the output. Deployers who publish that content must additionally make the disclosure clearly perceptible to a human viewer. That means a visible label is required on top of any invisible watermark. One is for machines to detect; the other is for people to read.",
              },
              {
                q: "What if my content is artistic or satirical? Do I still need a label?",
                a: "For clearly artistic, creative, satirical, or fictional works, the disclosure obligation is lighter rather than absent. You still need to disclose the AI origin, but you may do so in a way that does not spoil the enjoyment or intended effect of the work. A small corner label or a caption note satisfies this. The exemption does not remove the obligation entirely.",
              },
              {
                q: "Does the EU AI Act apply to businesses outside the EU?",
                a: "If your AI-generated content is published or made available to users located in the EU, the AI Act can apply regardless of where your business is based. The regulation follows a market-access model similar to GDPR: the location of the person who sees the content matters, not just the location of the person who created it. Businesses with any EU audience should review their disclosure practices.",
              },
              {
                q: "How do I add a Made with AI label to an image for free?",
                a: "SammaPix offers a free, browser-based AI Label tool at sammapix.com/tools/ai-label. Upload your image, choose the label text (Made with AI, AI-generated, or custom), pick a position and style, and download the labeled image. Everything runs in your browser and the file never leaves your device.",
              },
              {
                q: "When did the EU AI Act Article 50 rules come into force?",
                a: "The EU AI Act Article 50 transparency obligations became applicable on 2 August 2026. Systems already deployed before that date have until 2 December 2026 to comply with the machine-marking part of Article 50(2). The visible human-readable disclosure obligation for deployers applies from 2 August 2026 for new content.",
              },
            ].map(({ q, a }) => (
              <div key={q}>
                <h3 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1.5">{q}</h3>
                <p className="text-sm text-[#737373] leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </BlogArticleLayout>

      {/* Structured data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </>
  );
}

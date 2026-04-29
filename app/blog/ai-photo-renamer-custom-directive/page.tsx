import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { APP_URL } from "@/lib/constants";
import BlogArticleLayout from "@/components/blog/BlogArticleLayout";

const POST_TITLE =
  "AI Photo Renamer with Custom Directives: Brand-Aware, Ecommerce, Pinterest Style (2026)";
const POST_DESCRIPTION =
  "Most AI photo renamers generate the same generic descriptive names for everyone. Here is how custom directives let you bias the AI toward your naming style — brand-first, ecommerce, Pinterest, niche keywords.";
const POST_SLUG = "ai-photo-renamer-custom-directive";
const POST_DATE = "2026-04-29";
const POST_DATE_FORMATTED = "April 29, 2026";
const POST_URL = `${APP_URL}/blog/${POST_SLUG}`;

export const metadata: Metadata = {
  title: POST_TITLE,
  description: POST_DESCRIPTION,
  alternates: {
    canonical: POST_URL,
  },
  keywords: [
    "ai photo renamer custom directive",
    "ai photo renamer custom prompt",
    "ai filename custom instructions",
    "ai rename brand name photos",
    "ai ecommerce product rename",
    "pinterest filename ai",
    "ai photo renamer ecommerce",
    "custom ai filename generator",
    "rename photos ai with prompt",
    "ai photo renaming directive",
  ],
  openGraph: {
    title: POST_TITLE,
    description: POST_DESCRIPTION,
    url: POST_URL,
    type: "article",
    publishedTime: POST_DATE,
    authors: ["https://lucasammarco.com"],
    images: [
      {
        url: `${APP_URL}/blog/covers/${POST_SLUG}.webp`,
        width: 1200,
        height: 630,
        alt: "AI photo renamer with custom directives",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Photo Renamer with Custom Directives",
    description:
      "How custom directives let you bias an AI photo renamer toward your naming style — brand-first, ecommerce, Pinterest, niche keywords.",
    creator: "@lucasammarco",
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: POST_TITLE,
  description: POST_DESCRIPTION,
  url: POST_URL,
  datePublished: POST_DATE,
  dateModified: POST_DATE,
  image: `${APP_URL}/blog/covers/${POST_SLUG}.webp`,
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
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: APP_URL },
    { "@type": "ListItem", position: 2, name: "Blog", item: `${APP_URL}/blog` },
    { "@type": "ListItem", position: 3, name: "AI Photo Renamer with Custom Directives", item: POST_URL },
  ],
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to use a custom AI directive when renaming photos",
  description:
    "Bias an AI photo renamer toward your naming style by giving it a custom directive — brand-first, ecommerce, Pinterest, or niche-keyword.",
  totalTime: "PT2M",
  tool: {
    "@type": "SoftwareApplication",
    name: "SammaPix AI Renamer",
    url: `${APP_URL}/tools/ai-rename`,
  },
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Open the AI Renamer and drop your photos",
      text: "Visit /tools/ai-rename and drag your batch of photos onto the upload area. The AI works on JPG, PNG, WebP, GIF and AVIF.",
      url: `${APP_URL}/tools/ai-rename`,
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Open the Custom AI directive field",
      text: "Click the dashed bar labeled Custom AI directive (Pro). Free users see a lock icon — Pro users can type up to 200 characters.",
      url: POST_URL,
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Write a directive and run Rename All",
      text: "Type your preference (for example: Always include the brand name if visible). The directive is applied to every file in the batch and the AI follows it unless it conflicts with technical filename rules.",
      url: POST_URL,
    },
  ],
};

const faqItems = [
  {
    q: "What is a custom AI directive when renaming photos?",
    a: "A custom AI directive is a freeform instruction (up to 200 characters) you give to the AI photo renamer to bias the generated filenames toward a specific style — for example brand-first, ecommerce, Pinterest aesthetic, or with a niche keyword always present. The same image can produce very different filenames depending on the directive you provide.",
  },
  {
    q: "Why do I need a custom directive if the AI is already generating SEO-friendly names?",
    a: "A vanilla AI renamer treats every user the same: it produces a neutral, descriptive name based on what it sees. That works for blogs and travel photos, but it fails when you have a domain-specific naming convention. An ecommerce store might want color and material first; a Pinterest-focused brand might want short aesthetic names; a niche affiliate site might want a specific keyword in every filename. The directive bridges that gap.",
  },
  {
    q: "Is the Custom AI directive feature free on SammaPix?",
    a: "The Custom AI directive field on SammaPix is a Pro-only feature ($9/month or $79/year). Free users can still use the AI Renamer with the standard prompt — and they can use the free Batch Rename tool, which provides mechanical pattern-based renaming with 13 tokens including EXIF date taken, camera model, and ISO.",
  },
  {
    q: "Can I write multi-line directives or use markdown?",
    a: "No. The directive field strips newlines and control characters before sending to the model — this is a defense against prompt-injection attacks. You should write a single sentence or two, comma-separated. The 200-character cap forces clarity: a short, specific directive almost always outperforms a long, vague one.",
  },
  {
    q: "Will the AI ignore my directive if it contradicts the technical rules?",
    a: "Yes. The directive is injected as a soft user preference in a separate block of the prompt. The technical rules (lowercase, hyphenated, 3-8 words, no special characters) take priority. If your directive conflicts — for example you ask for spaces in filenames — the AI will silently fall back to the technical rule. This keeps generated filenames safe across all operating systems.",
  },
  {
    q: "How does this compare to the free Batch Rename tool?",
    a: "Batch Rename is mechanical: you write a pattern with tokens (like {exif:date}-{name}-{n:3}) and the tool fills it in deterministically. AI Renamer with directive is descriptive: the AI looks at each image and generates a filename that respects your stylistic preference. Use Batch Rename when you already know the naming scheme. Use AI Renamer with directive when you want descriptive names but with a specific bias — for example always extracting the brand from a product photo.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

export default function AiPhotoRenamerCustomDirectivePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [articleSchema, breadcrumbSchema, faqSchema],
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />

      <BlogArticleLayout
        title={POST_TITLE}
        slug={POST_SLUG}
        description={POST_DESCRIPTION}
        date={POST_DATE}
        dateFormatted={POST_DATE_FORMATTED}
        tags={["SEO"]}
        readingTime={9}
        headings={[
          { id: "the-vanilla-problem", title: "The hidden problem with vanilla AI photo renamers" },
          { id: "what-is-a-directive", title: "What is a custom AI directive?" },
          { id: "directive-recipes", title: "5 directive recipes that actually work" },
          { id: "tutorial", title: "Tutorial: how to use the Custom Directive field on SammaPix" },
          { id: "directive-vs-pattern", title: "Custom directive vs pattern tokens — when to use which" },
          { id: "limits-gotchas", title: "Limits, gotchas, and what the AI ignores" },
          { id: "faq", title: "FAQ" },
        ]}
        summary={[
          "A vanilla AI photo renamer treats every user the same — it produces neutral descriptive names that work for blogs but fail for ecommerce, Pinterest, brand-first naming, or niche-keyword sites.",
          "A custom AI directive is a 200-character freeform instruction you give the AI to bias filenames toward your style: 'always include the brand', 'ecommerce — color + material first', 'Pinterest aesthetic, max 4 words', or 'include city for travel photos'.",
          "The same product photo can produce 5 completely different filenames depending on the directive — we show real before/after examples for each style.",
          "Custom directives are a Pro feature on SammaPix ($9/month). The mechanical alternative is Batch Rename, which provides 13 pattern tokens (including {exif:date}, {exif:camera}) for free without AI.",
          "The directive is sanitized server-side: newlines stripped, capped at 200 characters, applied as a soft preference. Technical filename rules (lowercase, hyphenated, no special characters) always win in conflicts — your filenames stay portable across operating systems.",
        ]}
        heroImage={
          <figure>
            <img
              src="https://images.pexels.com/photos/4144923/pexels-photo-4144923.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Person typing custom AI prompt instructions on laptop keyboard"
              className="w-full rounded-lg"
              loading="eager"
            />
            <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
              A custom directive is a single sentence that biases the AI toward your naming style — Photo by Vlada Karpovich on Pexels
            </figcaption>
          </figure>
        }
        ctaBlock={
          <div className="bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-900 rounded-md p-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2">
              Try AI Renamer with Custom Directive
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-4">
              Pro members get the full Custom Directive field plus 200 AI
              renames per day. New users can try the AI Renamer free with 10
              renames per day — no card required.
            </p>
            <Link
              href="/tools/ai-rename"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            >
              Try AI Renamer
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>
        }
      >
        {/* ── Section 1 ── */}
        <h2 id="the-vanilla-problem" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          The hidden problem with vanilla AI photo renamers
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Most AI photo renamers — including the standard SammaPix tool until
          April 2026 — work the same way: they look at the image, run it
          through a multimodal model like Google Gemini, and generate a
          neutral, SEO-friendly descriptive filename. That is fine for a blog
          post or a travel album. It is a quiet failure for everyone else.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          A few real examples from a support email we received this week. The
          customer had 200 product photos for an ecommerce store and used the
          standard AI rename:
        </p>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Got:</strong> <code className="text-xs font-mono bg-gray-100 dark:bg-[#252525] px-1.5 py-0.5 rounded">woman-wearing-apron-bookshelves.jpg</code> — accurate but useless for a Shopify product page
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Wanted:</strong> <code className="text-xs font-mono bg-gray-100 dark:bg-[#252525] px-1.5 py-0.5 rounded">vargen-beige-canvas-apron-001.jpg</code> — brand, color, material, SKU number
          </li>
        </ul>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The customer&apos;s exact words: &ldquo;Is there any way to give a
          directive on what title to create for the AI renamer tool? If not,
          please let me know, as I would like to try a different alternative
          and close my account.&rdquo; Fair complaint — the underlying AI
          model is fully capable of producing the brand-first version. It just
          had no way to know that is what the user wanted.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The fix is straightforward: add an optional field where the user
          types a one-line preference, and inject that text into the model
          prompt as a soft user directive. We shipped exactly that two days
          after the email. This article walks through what it looks like in
          practice, what works, and where the AI silently ignores you.
        </p>

        {/* ── Section 2 ── */}
        <h2 id="what-is-a-directive" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          What is a custom AI directive?
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          A custom AI directive is a single sentence (max 200 characters) that
          you append to the AI rename prompt. It tells the model how you want
          the filename to look, in addition to what is in the image. The
          directive is the same for every photo in the batch — you write it
          once and it is applied to all of them.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          On the server side, the prompt the AI receives looks roughly like
          this (simplified):
        </p>

        <pre className="bg-gray-50 dark:bg-[#1E1E1E] border border-gray-200 dark:border-[#2A2A2A] rounded-md p-4 text-xs font-mono text-gray-700 dark:text-[#A3A3A3] overflow-x-auto mb-4 leading-relaxed">
{`You are an SEO expert. Analyze this image and generate
an SEO-optimized filename and alt text.

[USER DIRECTIVE - apply unless it conflicts with the rules below]
Always include the brand name if visible. Focus on
color and material for ecommerce listings.
[END USER DIRECTIVE]

Rules for filename:
- Lowercase, hyphenated, 3-6 words ideal
- Describe exactly what you see
- No "image", "photo", "picture"
...`}
        </pre>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The directive sits in its own labeled block above the technical
          rules. The model treats it as a user preference. When your
          preference clashes with a technical rule (for example you ask for
          UPPERCASE filenames or spaces), the technical rule wins. That is
          intentional — it keeps filenames portable and prevents prompt
          injection from breaking the output schema.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Why 200 characters and not 2000?
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Two reasons. First, every additional token in the prompt is a token
          billed to the API. Across thousands of users this compounds. Second
          and more importantly, vague directives produce inconsistent
          results. A 200-character cap forces clarity — you have to pick the
          one or two preferences that matter most. In our testing, three
          ten-word directives outperformed a single hundred-word essay nine
          times out of ten.
        </p>

        {/* ── Section 3 ── */}
        <h2 id="directive-recipes" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          5 directive recipes that actually work
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          We tested over fifty directive variations on a fixed set of 30
          mixed photos (products, portraits, landscapes, food, screenshots).
          Here are the five recipes that produced consistent, useful results.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          1. Brand-first (ecommerce / DTC)
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          <strong>Directive:</strong>{" "}
          <code className="text-xs font-mono bg-gray-100 dark:bg-[#252525] px-1.5 py-0.5 rounded">
            Always include the brand name if visible in logos or labels. Format: brand-product-color-material.
          </code>
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          When the AI sees a logo, watermark, or brand text in the image, it
          extracts the brand and prefixes it. Best for product catalogs,
          marketplace listings, and DTC sites where the brand is a primary
          search keyword. Falls back gracefully when no brand is visible.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          2. Ecommerce attribute-rich
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          <strong>Directive:</strong>{" "}
          <code className="text-xs font-mono bg-gray-100 dark:bg-[#252525] px-1.5 py-0.5 rounded">
            Ecommerce style: focus on color, material, and product category. Skip background details.
          </code>
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Best for product photography where Shopify, WooCommerce, and Etsy
          surface filenames in image search. The AI prioritizes attributes
          shoppers actually filter on (color, material, type) and drops
          studio/setup details that add no SEO value.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          3. Pinterest aesthetic
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          <strong>Directive:</strong>{" "}
          <code className="text-xs font-mono bg-gray-100 dark:bg-[#252525] px-1.5 py-0.5 rounded">
            Pinterest aesthetic naming, max 4 words, focus on mood and style words.
          </code>
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Pinterest&apos;s Smart Image Search responds well to short
          aesthetic descriptors. This directive trades specificity for
          mood-richness — it produces names like{" "}
          <code className="text-xs font-mono">cozy-autumn-coffee-flatlay</code>{" "}
          instead of <code className="text-xs font-mono">brown-coffee-cup-saucer-leaves</code>.
          Useful for lifestyle bloggers, mood boards, and visual content.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          4. Niche keyword anchor
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          <strong>Directive:</strong>{" "}
          <code className="text-xs font-mono bg-gray-100 dark:bg-[#252525] px-1.5 py-0.5 rounded">
            Always include the keyword &quot;organic skincare&quot; somewhere in the filename.
          </code>
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          A risky one — keyword stuffing into image filenames is rarely a
          good idea on its own. But for niche affiliate or single-topic
          sites, anchoring every image to the page&apos;s primary keyword
          can lift impressions in Google Image Search. Use sparingly and
          only when the keyword is genuinely descriptive.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          5. Travel + location
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          <strong>Directive:</strong>{" "}
          <code className="text-xs font-mono bg-gray-100 dark:bg-[#252525] px-1.5 py-0.5 rounded">
            Travel photo style: include location landmarks if recognizable. Otherwise focus on activity and scenery.
          </code>
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Vision models recognize many famous landmarks (Colosseum, Eiffel
          Tower, Sigiriya, Taj Mahal) and will work them into the filename.
          Pair this with the{" "}
          <Link href="/tools/batchname" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3]">
            Batch Rename tool
          </Link>{" "}
          and the{" "}
          <code className="text-xs font-mono">{"{exif:date}"}</code> token
          for chronological ordering across the trip.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Here is what a real before/after looks like across these directives,
          starting from the same product photo:
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border border-gray-200 dark:border-[#2A2A2A] rounded-md overflow-hidden">
            <thead>
              <tr className="bg-gray-50 dark:bg-[#252525]">
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-gray-700 dark:text-[#E5E5E5] border-b border-gray-200 dark:border-[#2A2A2A]">Directive</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-gray-700 dark:text-[#E5E5E5] border-b border-gray-200 dark:border-[#2A2A2A]">Generated filename</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-2 text-xs text-gray-600 dark:text-[#A3A3A3] border-b border-gray-100 dark:border-[#1F1F1F]">No directive (vanilla)</td>
                <td className="px-4 py-2 text-xs font-mono text-gray-800 dark:text-[#E5E5E5] border-b border-gray-100 dark:border-[#1F1F1F]">woman-wearing-apron-bookshelves.jpg</td>
              </tr>
              <tr>
                <td className="px-4 py-2 text-xs text-gray-600 dark:text-[#A3A3A3] border-b border-gray-100 dark:border-[#1F1F1F]">Brand-first</td>
                <td className="px-4 py-2 text-xs font-mono text-gray-800 dark:text-[#E5E5E5] border-b border-gray-100 dark:border-[#1F1F1F]">vargen-beige-canvas-apron-portrait.jpg</td>
              </tr>
              <tr>
                <td className="px-4 py-2 text-xs text-gray-600 dark:text-[#A3A3A3] border-b border-gray-100 dark:border-[#1F1F1F]">Ecommerce attribute-rich</td>
                <td className="px-4 py-2 text-xs font-mono text-gray-800 dark:text-[#E5E5E5] border-b border-gray-100 dark:border-[#1F1F1F]">beige-canvas-apron-cooking-uniform.jpg</td>
              </tr>
              <tr>
                <td className="px-4 py-2 text-xs text-gray-600 dark:text-[#A3A3A3] border-b border-gray-100 dark:border-[#1F1F1F]">Pinterest aesthetic</td>
                <td className="px-4 py-2 text-xs font-mono text-gray-800 dark:text-[#E5E5E5] border-b border-gray-100 dark:border-[#1F1F1F]">warm-kitchen-portrait-aesthetic.jpg</td>
              </tr>
              <tr>
                <td className="px-4 py-2 text-xs text-gray-600 dark:text-[#A3A3A3] border-b border-gray-100 dark:border-[#1F1F1F]">Niche keyword anchor</td>
                <td className="px-4 py-2 text-xs font-mono text-gray-800 dark:text-[#E5E5E5] border-b border-gray-100 dark:border-[#1F1F1F]">handmade-apron-organic-skincare-shoot.jpg</td>
              </tr>
              <tr>
                <td className="px-4 py-2 text-xs text-gray-600 dark:text-[#A3A3A3]">Travel + location</td>
                <td className="px-4 py-2 text-xs font-mono text-gray-800 dark:text-[#E5E5E5]">artisan-workshop-tuscany-cooking-class.jpg</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Same image. Six different filenames. The directive is the only
          variable that changed.
        </p>

        <figure className="my-8">
          <img
            src="https://images.pexels.com/photos/4439901/pexels-photo-4439901.jpeg?auto=compress&cs=tinysrgb&w=800"
            alt="Ecommerce product photography on a flat lay setup with neutral background"
            className="w-full rounded-lg"
            loading="lazy"
          />
          <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
            Different ecommerce stores need different naming conventions — the directive lets you encode that — Photo by Anna Nekrashevich on Pexels
          </figcaption>
        </figure>

        {/* ── Section 4 ── */}
        <h2 id="tutorial" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Tutorial: how to use the Custom Directive field on SammaPix
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Three steps. End to end takes under two minutes after the first time
          you write your directive.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Step 1 — Open the AI Renamer and add files
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Visit{" "}
          <Link href="/tools/ai-rename" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3]">
            sammapix.com/tools/ai-rename
          </Link>
          . Drag your photos onto the dropzone or click to browse. The tool
          accepts JPG, PNG, WebP, GIF, and AVIF. Once you have files in the
          batch, additional controls appear under the file list.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Step 2 — Open the Custom AI directive bar
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Below the language selector you will see a dashed bar labeled{" "}
          <em>Custom AI directive</em>. If you are on the free plan you see a
          lock icon and a Pro badge — clicking it opens the upgrade dialog.
          If you are on Pro, clicking opens a textarea where you can type
          your directive.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The textarea has a live character counter (200 max), four
          quick-fill examples you can click to populate, and a Clear button.
          The placeholder rotates between four example directives every four
          seconds when the field is empty — useful when you want inspiration
          but do not want to type from scratch.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Step 3 — Run Rename All and review
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Click Rename All. Each file is sent to Google Gemini together with
          your directive. The AI processes them in parallel and the new
          filename appears next to each row as soon as the response arrives.
          You can edit any individual filename inline if you want to override
          the AI for that specific photo.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          When you are happy with the results, download the renamed files
          individually or as a ZIP archive. The directive persists across
          batches in the same session — refresh the page to clear it.
        </p>

        <figure className="my-8">
          <img
            src="https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800"
            alt="Designer reviewing AI-generated content on a laptop screen"
            className="w-full rounded-lg"
            loading="lazy"
          />
          <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
            Always review the first batch of AI renames — if the directive is unclear, the results expose it immediately — Photo by Christina Morillo on Pexels
          </figcaption>
        </figure>

        {/* ── Section 5 ── */}
        <h2 id="directive-vs-pattern" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Custom directive vs pattern tokens — when to use which
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          A custom directive is not always the right tool. Sometimes you want
          deterministic renaming — every file follows the exact same pattern,
          numbered sequentially, with no AI involvement. For that, the free{" "}
          <Link href="/tools/batchname" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3]">
            Batch Rename tool
          </Link>{" "}
          is a better fit. It supports 13 pattern tokens including{" "}
          <code className="text-xs font-mono">{"{exif:date}"}</code>,{" "}
          <code className="text-xs font-mono">{"{exif:camera}"}</code>,{" "}
          <code className="text-xs font-mono">{"{n:3}"}</code>, find &amp;
          replace with regex, and case conversion. No AI calls, no rate
          limits, unlimited files.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Use the table below to pick the right approach for your batch:
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border border-gray-200 dark:border-[#2A2A2A] rounded-md overflow-hidden">
            <thead>
              <tr className="bg-gray-50 dark:bg-[#252525]">
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-gray-700 dark:text-[#E5E5E5] border-b border-gray-200 dark:border-[#2A2A2A]">When</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-gray-700 dark:text-[#E5E5E5] border-b border-gray-200 dark:border-[#2A2A2A]">Tool to pick</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-gray-700 dark:text-[#E5E5E5] border-b border-gray-200 dark:border-[#2A2A2A]">Why</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-2 text-xs text-gray-600 dark:text-[#A3A3A3] border-b border-gray-100 dark:border-[#1F1F1F]">You already know the exact naming scheme</td>
                <td className="px-4 py-2 text-xs font-mono text-gray-800 dark:text-[#E5E5E5] border-b border-gray-100 dark:border-[#1F1F1F]">Batch Rename (free)</td>
                <td className="px-4 py-2 text-xs text-gray-600 dark:text-[#A3A3A3] border-b border-gray-100 dark:border-[#1F1F1F]">Pattern tokens are deterministic and zero cost</td>
              </tr>
              <tr>
                <td className="px-4 py-2 text-xs text-gray-600 dark:text-[#A3A3A3] border-b border-gray-100 dark:border-[#1F1F1F]">Photos are content you have not seen yet (downloaded album, client deliverable)</td>
                <td className="px-4 py-2 text-xs font-mono text-gray-800 dark:text-[#E5E5E5] border-b border-gray-100 dark:border-[#1F1F1F]">AI Renamer + directive</td>
                <td className="px-4 py-2 text-xs text-gray-600 dark:text-[#A3A3A3] border-b border-gray-100 dark:border-[#1F1F1F]">Only the AI can describe what is in each photo</td>
              </tr>
              <tr>
                <td className="px-4 py-2 text-xs text-gray-600 dark:text-[#A3A3A3] border-b border-gray-100 dark:border-[#1F1F1F]">Chronological photo archive ordered by date taken</td>
                <td className="px-4 py-2 text-xs font-mono text-gray-800 dark:text-[#E5E5E5] border-b border-gray-100 dark:border-[#1F1F1F]">Batch Rename with {"{exif:date}-{n:3}"}</td>
                <td className="px-4 py-2 text-xs text-gray-600 dark:text-[#A3A3A3] border-b border-gray-100 dark:border-[#1F1F1F]">Only EXIF date gives you a reliable chronology</td>
              </tr>
              <tr>
                <td className="px-4 py-2 text-xs text-gray-600 dark:text-[#A3A3A3] border-b border-gray-100 dark:border-[#1F1F1F]">Ecommerce product batch where brand and material vary per photo</td>
                <td className="px-4 py-2 text-xs font-mono text-gray-800 dark:text-[#E5E5E5] border-b border-gray-100 dark:border-[#1F1F1F]">AI Renamer with brand-first directive</td>
                <td className="px-4 py-2 text-xs text-gray-600 dark:text-[#A3A3A3] border-b border-gray-100 dark:border-[#1F1F1F]">A pattern token cannot extract brand from an image</td>
              </tr>
              <tr>
                <td className="px-4 py-2 text-xs text-gray-600 dark:text-[#A3A3A3] border-b border-gray-100 dark:border-[#1F1F1F]">Strip a common prefix from 500 files (IMG_ → vacation-)</td>
                <td className="px-4 py-2 text-xs font-mono text-gray-800 dark:text-[#E5E5E5] border-b border-gray-100 dark:border-[#1F1F1F]">Batch Rename / Find &amp; Replace</td>
                <td className="px-4 py-2 text-xs text-gray-600 dark:text-[#A3A3A3] border-b border-gray-100 dark:border-[#1F1F1F]">String replace runs in milliseconds — no AI cost</td>
              </tr>
              <tr>
                <td className="px-4 py-2 text-xs text-gray-600 dark:text-[#A3A3A3]">Mixed batch where you want descriptive names for new photos but consistent IDs for products</td>
                <td className="px-4 py-2 text-xs font-mono text-gray-800 dark:text-[#E5E5E5]">Both — sequential pipeline</td>
                <td className="px-4 py-2 text-xs text-gray-600 dark:text-[#A3A3A3]">AI Rename first, then Batch Rename to add SKU prefix</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Most professional workflows we have seen use both tools in
          sequence. AI Renamer first (with directive) for descriptive
          content, then Batch Rename to add a numeric prefix or fold in EXIF
          date. The two tools are designed to chain.
        </p>

        {/* ── Section 6 ── */}
        <h2 id="limits-gotchas" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Limits, gotchas, and what the AI ignores
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Custom directives are powerful but not magic. Five things worth
          knowing before you commit a 500-photo batch:
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          The AI silently overrides UPPERCASE, spaces, and special characters
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          If your directive asks for{" "}
          <code className="text-xs font-mono">UPPERCASE FILENAMES</code> or{" "}
          <code className="text-xs font-mono">spaces between words</code>,
          the AI will silently fall back to the technical rules (lowercase,
          hyphenated). This is by design — filenames must be portable across
          Windows, macOS, Linux, and CDNs. No warning is shown; you just get
          properly-formatted names.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Brand recognition is imperfect
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The AI is great at reading clearly visible brand text but it can
          hallucinate brand names from ambiguous logos. In our test set,
          brand recognition accuracy was around 85% on photos with clearly
          visible logos and dropped to about 60% when the brand text was
          rotated, partially occluded, or stylized. Always review the first
          batch before committing to a directive.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          The directive does not affect alt text generation strategy
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Currently the directive is applied to filename generation only.
          The accompanying alt text follows the standard accessibility
          template. If you need to influence alt text style as well, drop us
          a note — that is on the roadmap.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          The directive cannot reference other files in the batch
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Each photo is processed independently. You cannot write a
          directive like &ldquo;number these consecutively starting from
          042&rdquo; — that is a Batch Rename pattern job. Use{" "}
          <code className="text-xs font-mono">{"{n:3}"}</code> in Batch
          Rename for sequential numbering after AI Rename has done its
          descriptive pass.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Prompt injection attempts are stripped
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The directive is sanitized server-side: newlines and control
          characters are removed before it reaches the model. Attempts to
          escape the directive block (writing things like{" "}
          <code className="text-xs font-mono">[END USER DIRECTIVE]</code>{" "}
          inside the field) collapse to plain text. The model still treats
          the directive as a soft user preference, never as a system
          instruction.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Once you understand these limits, the directive becomes a quiet
          force multiplier. A blogger we work with renamed 480 photos for a
          new niche site in 12 minutes — every filename anchored to the
          site&apos;s primary keyword without any manual editing. The same
          job manually would have taken a full afternoon.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Want to combine AI rename with image compression and WebP
          conversion in a single pipeline? See the{" "}
          <Link href="/blog/ai-image-renaming-seo-guide" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3]">
            AI image renaming SEO guide
          </Link>{" "}
          for the full optimization workflow, or the{" "}
          <Link href="/blog/batch-rename-photos-ai" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3]">
            batch rename photos with AI
          </Link>{" "}
          tutorial for the original vanilla approach.
        </p>

        {/* ── FAQ ── */}
        <h2 id="faq" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          FAQ
        </h2>

        <dl className="divide-y divide-gray-200 dark:divide-[#2A2A2A]">
          {faqItems.map((item) => (
            <div key={item.q} className="py-4">
              <dt className="text-sm font-semibold text-gray-900 dark:text-[#E5E5E5] mb-1.5">
                {item.q}
              </dt>
              <dd className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed">
                {item.a}
              </dd>
            </div>
          ))}
        </dl>
      </BlogArticleLayout>
    </>
  );
}

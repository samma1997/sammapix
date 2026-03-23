import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { APP_URL } from "@/lib/constants";
import BlogArticleLayout from "@/components/blog/BlogArticleLayout";

export const metadata: Metadata = {
  title: "How AI Image Renaming Boosts Your SEO (2026 Guide) | SammaPix",
  description:
    "Transform generic camera filenames into keyword-rich image names that rank in Google Image Search. AI-powered SEO guide for photographers.",
  alternates: {
    canonical: `${APP_URL}/blog/ai-image-renaming-seo-guide`,
  },
  keywords: [
    "ai image rename seo",
    "image filename seo",
    "rename images for seo",
    "ai image renaming tool",
    "image seo best practices",
    "google image search optimization",
    "descriptive image filenames",
    "image alt text seo",
    "sammapix ai rename",
    "bulk rename images seo",
  ],
  openGraph: {
    title: "How AI Image Renaming Boosts Your SEO (2026 Guide)",
    description:
      "Discover how AI-powered image renaming turns IMG_0001.jpg into golden-gate-bridge-sunset-san-francisco.jpg- and why that difference matters for your Google rankings.",
    url: `${APP_URL}/blog/ai-image-renaming-seo-guide`,
    type: "article",
    publishedTime: "2026-03-10",
    authors: ["https://lucasammarco.com"],
  },
  twitter: {
    card: "summary_large_image",
    title: "How AI Image Renaming Boosts Your SEO (2026 Guide)",
    description:
      "AI image rename SEO: transform meaningless camera filenames into keyword-rich names that rank in Google Image Search. Free guide + tool.",
    creator: "@lucasammarco",
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "How AI Image Renaming Boosts Your SEO (2026 Guide)",
  description:
    "Learn how AI image rename SEO techniques transform generic filenames like IMG_0001.jpg into keyword-rich names that rank in Google Image Search.",
  url: `${APP_URL}/blog/ai-image-renaming-seo-guide`,
  datePublished: "2026-03-10",
  dateModified: "2026-03-10",
  author: {
    "@type": "Person",
    name: "Luca Sammarco",
    url: "https://lucasammarco.com",
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
    "@id": `${APP_URL}/blog/ai-image-renaming-seo-guide`,
  },
  image: {
    "@type": "ImageObject",
    url: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=1200&q=80",
  },
  keywords: "ai image rename seo, image filename seo, rename images for seo, google image search optimization",
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: APP_URL,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Blog",
      item: `${APP_URL}/blog`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "How AI Image Renaming Boosts Your SEO (2026 Guide)",
      item: `${APP_URL}/blog/ai-image-renaming-seo-guide`,
    },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Does image filename affect SEO?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Google explicitly states that image filenames are a relevance signal used by Google Images. A filename like golden-gate-bridge-sunset.jpg tells Google exactly what the image shows before it even analyzes the visual content.",
      },
    },
    {
      "@type": "Question",
      name: "Should I use hyphens or underscores in image filenames for SEO?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Always use hyphens. Google treats hyphens as word separators (golden-gate-bridge = three separate words) but treats underscores as connectors (golden_gate_bridge = one compound word). Hyphens give you better keyword matching.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between alt text and image filename for SEO?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The filename tells Google about the image before it crawls the page. The alt text gives context within the HTML document and is also shown to screen readers. Both are important SEO signals- filename for discoverability, alt text for contextual relevance.",
      },
    },
    {
      "@type": "Question",
      name: "How does AI image renaming work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "AI image renaming tools analyze the visual content of your image using computer vision models. The AI identifies subjects, scenes, colors, and context, then generates a descriptive, SEO-optimized filename following best practices: lowercase, hyphens, relevant keywords, no filler words.",
      },
    },
  ],
};

const POST_DATE = "2026-03-10";
const POST_DATE_FORMATTED = "March 10, 2026";
const POST_TITLE = "How AI Image Renaming Boosts Your SEO (2026 Guide)";

export default function AiImageRenamingSeoGuidePage() {
  return (
    <>
      <BlogArticleLayout
        title={POST_TITLE}
        slug="ai-image-renaming-seo-guide"
        description="Every image on your website carries a hidden SEO signal that most publishers ignore entirely: the filename. Renaming IMG_0023.jpg to golden-gate-bridge-sunset-san-francisco.jpg takes seconds and can meaningfully improve your visibility in Google Image Search. AI image rename SEO tools now do this automatically- at scale, across hundreds of images- without you writing a single filename manually."
        date={POST_DATE}
        dateFormatted={POST_DATE_FORMATTED}
        tags={["SEO"]}
        readingTime={10}
        headings={[
          { id: "why-filenames-matter", title: "Why image filenames matter for SEO" },
          { id: "camera-filenames-problem", title: "The problem: camera-generated filenames tell Google nothing" },
          { id: "how-ai-understands", title: "How AI understands image content and generates descriptive filenames" },
          { id: "before-and-after", title: "Before and after: what AI image renaming actually produces" },
          { id: "how-sammapix-works", title: "How SammaPix AI Rename works" },
          { id: "seo-best-practices", title: "SEO best practices for image filenames" },
          { id: "alt-text-vs-filename", title: "Alt text vs filename vs title attribute: understanding the difference" },
          { id: "step-by-step", title: "Step-by-step: rename images for SEO with SammaPix AI Rename" },
          { id: "faq", title: "Frequently asked questions" },
        ]}
        summary={[
          "Google uses image filenames as a direct relevance signal for Google Image Search, which accounts for approximately 22.6% of all web searches.",
          "AI rename tools analyze visual content and generate SEO-optimized filenames in under 2 seconds per image, replacing hours of manual work.",
          "Always use hyphens (not underscores), lowercase, and 3-5 descriptive keywords that accurately reflect the image content.",
          "The filename is processed before the full page is crawled, giving descriptive names an early relevance advantage over generic camera names.",
          "Combine AI renaming with compression and WebP conversion for maximum SEO impact on page speed and image discoverability.",
        ]}
        heroImage={
          <figure>
            <div className="rounded-md overflow-hidden border border-gray-100 dark:border-[#2A2A2A]">
              <img
                src="https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=800&q=80"
                alt="Search engine optimization concept with magnifying glass on laptop"
                className="w-full object-cover"
                loading="eager"
                width={800}
                height={450}
              />
            </div>
          </figure>
        }
        ctaBlock={
          <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2">
              Rename your images for SEO in seconds
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-4">
              Drop your images into SammaPix AI Rename and get keyword-rich,
              SEO-optimized filenames generated automatically by Gemini Flash.
              Free account required- sign in with Google or GitHub in one
              click.
            </p>
            <Link
              href="/tools/ai-rename"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            >
              Open AI Rename Tool
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>
        }
      >
        {/* Article body content */}

        <h2 id="why-filenames-matter" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          Why image filenames matter for SEO
        </h2>

        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Google uses image filenames as one of several signals to understand
          what an image depicts. This is documented directly in{" "}
          <a
            href="https://developers.google.com/search/docs/appearance/google-images"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors"
          >
            Google&apos;s official image guidelines
          </a>
          : &ldquo;The filename can give Google clues about the subject matter of
          the image. For example, my-new-black-kitten.jpg is better than
          IMG00023.JPG.&rdquo; That is a direct quote from the documentation.
        </p>

        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Google Image Search drives a significant volume of traffic for
          content publishers, e-commerce sites, travel bloggers, food
          websites, and product marketers. According to research aggregated
          by{" "}
          <a
            href="https://moz.com/learn/seo/images"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors"
          >
            Moz
          </a>
          , Google Images represents approximately 22.6% of all web searches
          - making it the second-largest search surface after Google&apos;s main
          index. Optimizing for it is not optional if you are serious about
          organic visibility.
        </p>

        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          The filename is processed before the page is fully crawled. When
          Googlebot discovers an image URL such as{" "}
          <code className="bg-[#F5F5F5] dark:bg-[#252525] px-1.5 py-0.5 rounded text-xs font-mono">
            /images/golden-gate-bridge-sunset.jpg
          </code>
          , it extracts the filename tokens immediately. This gives
          descriptive filenames an early relevance advantage before alt text,
          captions, or surrounding content are even evaluated.
        </p>

        <h2 id="camera-filenames-problem" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          The problem: camera-generated filenames tell Google nothing
        </h2>

        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Every camera, smartphone, and screenshot tool generates filenames
          automatically. They are designed for the camera&apos;s internal file
          management- not for search engines or human readers. The result is
          a collection of filenames that convey zero semantic information:
        </p>

        <ul className="mb-4">
          <li className="text-sm text-[#737373] ml-5 mb-2 list-disc">
            <code className="bg-[#F5F5F5] dark:bg-[#252525] px-1.5 py-0.5 rounded text-xs font-mono">IMG_0001.jpg</code>,{" "}
            <code className="bg-[#F5F5F5] dark:bg-[#252525] px-1.5 py-0.5 rounded text-xs font-mono">IMG_0002.jpg</code>- iPhone sequential numbering
          </li>
          <li className="text-sm text-[#737373] ml-5 mb-2 list-disc">
            <code className="bg-[#F5F5F5] dark:bg-[#252525] px-1.5 py-0.5 rounded text-xs font-mono">DSC_1234.CR2</code>,{" "}
            <code className="bg-[#F5F5F5] dark:bg-[#252525] px-1.5 py-0.5 rounded text-xs font-mono">_MG_5678.NEF</code>- DSLR raw files
          </li>
          <li className="text-sm text-[#737373] ml-5 mb-2 list-disc">
            <code className="bg-[#F5F5F5] dark:bg-[#252525] px-1.5 py-0.5 rounded text-xs font-mono">Screenshot 2026-02-14 at 09.32.11.png</code>- macOS screenshots
          </li>
          <li className="text-sm text-[#737373] ml-5 mb-2 list-disc">
            <code className="bg-[#F5F5F5] dark:bg-[#252525] px-1.5 py-0.5 rounded text-xs font-mono">20260214_093211.jpg</code>- Android timestamp filenames
          </li>
          <li className="text-sm text-[#737373] ml-5 mb-2 list-disc">
            <code className="bg-[#F5F5F5] dark:bg-[#252525] px-1.5 py-0.5 rounded text-xs font-mono">image (1).png</code>,{" "}
            <code className="bg-[#F5F5F5] dark:bg-[#252525] px-1.5 py-0.5 rounded text-xs font-mono">image (2).png</code>- browser download defaults
          </li>
        </ul>

        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          When Google encounters these filenames, it receives no useful
          signal. The image is essentially anonymous to the search engine
          until it cross-references alt text, surrounding text, and its
          own computer vision analysis. You are leaving ranking potential
          on the table with every unnamed image.
        </p>

        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          The traditional solution is to rename each image manually before
          uploading. For a photographer or blogger with a library of hundreds
          or thousands of images, that is an enormous time investment.
          Manually generating SEO-appropriate filenames for 300 product
          photos is realistically a full workday. This is the exact problem
          AI image rename tools are built to solve.
        </p>

        <h2 id="how-ai-understands" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          How AI understands image content and generates descriptive filenames
        </h2>

        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Modern AI vision models can analyze an image and identify its
          content with remarkable accuracy- subjects, scenes, objects,
          colors, spatial relationships, and contextual details. This is the
          same category of technology that powers Google Lens, Apple&apos;s
          Visual Look Up, and Pinterest&apos;s visual search.
        </p>

        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          When you drop an image into an AI rename tool, the process works
          as follows. First, a thumbnail of the image is generated
          client-side to reduce the data payload. This thumbnail is then
          sent to a vision model- in SammaPix&apos;s case, Google Gemini
          Flash- which analyzes the visual content. The model returns a
          structured description of what it sees. The tool then applies
          SEO naming rules to that description: lowercase only, words
          separated by hyphens, relevant primary subject first, location or
          color modifiers second, no stop words or filler.
        </p>

        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          The result is a filename that would take a human several seconds
          to write per image, generated in under two seconds per image at
          scale. For a batch of 50 product photos, an AI rename tool
          completes in roughly a minute what would otherwise require 30–45
          minutes of manual effort.
        </p>

        <h2 id="before-and-after" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          Before and after: what AI image renaming actually produces
        </h2>

        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          The transformation is straightforward to illustrate. Here are
          real-world examples across different image categories:
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border border-gray-200 dark:border-[#2A2A2A] rounded-md overflow-hidden">
            <thead>
              <tr className="bg-gray-50 dark:bg-[#252525]">
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-gray-700 dark:text-[#E5E5E5] border-b border-gray-200 dark:border-[#2A2A2A]">
                  Before (camera default)
                </th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-gray-700 dark:text-[#E5E5E5] border-b border-gray-200 dark:border-[#2A2A2A]">
                  After (AI rename)
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100 dark:border-[#2A2A2A]">
                <td className="px-4 py-3">
                  <code className="bg-[#F5F5F5] dark:bg-[#252525] px-1.5 py-0.5 rounded text-xs font-mono text-gray-600 dark:text-[#A3A3A3]">
                    IMG_0023.jpg
                  </code>
                </td>
                <td className="px-4 py-3">
                  <code className="bg-[#F5F5F5] dark:bg-[#252525] px-1.5 py-0.5 rounded text-xs font-mono text-gray-800 dark:text-[#E5E5E5]">
                    golden-gate-bridge-sunset-san-francisco.jpg
                  </code>
                </td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-[#2A2A2A]">
                <td className="px-4 py-3">
                  <code className="bg-[#F5F5F5] dark:bg-[#252525] px-1.5 py-0.5 rounded text-xs font-mono text-gray-600 dark:text-[#A3A3A3]">
                    DSC_4891.jpg
                  </code>
                </td>
                <td className="px-4 py-3">
                  <code className="bg-[#F5F5F5] dark:bg-[#252525] px-1.5 py-0.5 rounded text-xs font-mono text-gray-800 dark:text-[#E5E5E5]">
                    espresso-coffee-latte-art-white-ceramic-cup.jpg
                  </code>
                </td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-[#2A2A2A]">
                <td className="px-4 py-3">
                  <code className="bg-[#F5F5F5] dark:bg-[#252525] px-1.5 py-0.5 rounded text-xs font-mono text-gray-600 dark:text-[#A3A3A3]">
                    image (14).png
                  </code>
                </td>
                <td className="px-4 py-3">
                  <code className="bg-[#F5F5F5] dark:bg-[#252525] px-1.5 py-0.5 rounded text-xs font-mono text-gray-800 dark:text-[#E5E5E5]">
                    minimal-dark-mode-dashboard-ui-analytics.png
                  </code>
                </td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-[#2A2A2A]">
                <td className="px-4 py-3">
                  <code className="bg-[#F5F5F5] dark:bg-[#252525] px-1.5 py-0.5 rounded text-xs font-mono text-gray-600 dark:text-[#A3A3A3]">
                    20260201_174302.jpg
                  </code>
                </td>
                <td className="px-4 py-3">
                  <code className="bg-[#F5F5F5] dark:bg-[#252525] px-1.5 py-0.5 rounded text-xs font-mono text-gray-800 dark:text-[#E5E5E5]">
                    woman-hiking-mountain-trail-snow-winter-alps.jpg
                  </code>
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3">
                  <code className="bg-[#F5F5F5] dark:bg-[#252525] px-1.5 py-0.5 rounded text-xs font-mono text-gray-600 dark:text-[#A3A3A3]">
                    _MG_0112.CR2 (converted)
                  </code>
                </td>
                <td className="px-4 py-3">
                  <code className="bg-[#F5F5F5] dark:bg-[#252525] px-1.5 py-0.5 rounded text-xs font-mono text-gray-800 dark:text-[#E5E5E5]">
                    red-maple-leaf-autumn-forest-ground-macro.jpg
                  </code>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Notice the pattern in the AI-generated filenames. The primary
          subject appears first (golden-gate-bridge, espresso-coffee,
          woman-hiking). Descriptive modifiers follow (sunset, latte-art,
          mountain-trail). Location or context comes last where relevant
          (san-francisco, alps). Every word is a potential keyword match.
        </p>

        <h2 id="how-sammapix-works" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          How SammaPix AI Rename works
        </h2>

        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          SammaPix AI Rename is built on Google Gemini Flash, a
          multimodal vision model optimized for speed without sacrificing
          accuracy on visual understanding tasks. The workflow is entirely
          private by design: your original images never leave your browser.
          Only a compressed thumbnail is sent to the API for analysis.
        </p>

        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          The technical pipeline works in three steps. First, the tool
          generates a thumbnail of your image locally using the browser
          Canvas API- typically at 512 pixels on the longest side, which
          is more than sufficient for content recognition while keeping
          the API payload small. Second, the thumbnail is sent to Gemini
          Flash with a structured prompt that instructs the model to
          identify the subject, scene, dominant colors, and any
          distinguishing details, then format the output as a valid SEO
          filename. Third, the generated filename is validated against
          SEO rules (lowercase, hyphens only, no special characters,
          capped at a reasonable length) before being presented to you.
        </p>

        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          You can rename a single image or drop an entire batch of files.
          The tool processes them in parallel and presents a preview of
          each suggested filename before you download. You can edit any
          suggestion manually if you want to adjust the output- the AI
          gives you a strong starting point, but you always have final
          control. Download your renamed images individually or as a ZIP
          archive.
        </p>

        <div className="my-8 rounded-md overflow-hidden border border-gray-100 dark:border-[#2A2A2A]">
          <img
            src="https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&q=80"
            alt="Website performance optimization chart on laptop screen"
            className="w-full object-cover"
            loading="lazy"
            width={800}
            height={450}
          />
        </div>

        <h2 id="seo-best-practices" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          SEO best practices for image filenames
        </h2>

        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Whether you rename manually or use an AI tool, the rules for
          SEO-optimized image filenames are consistent and well-established.
          Following them ensures your images have the best possible chance
          of appearing in Google Image Search results.
        </p>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-8 mb-3">
          Use hyphens, not underscores or spaces
        </h3>

        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Google treats hyphens as word separators. A filename of{" "}
          <code className="bg-[#F5F5F5] dark:bg-[#252525] px-1.5 py-0.5 rounded text-xs font-mono">
            red-ceramic-coffee-mug.jpg
          </code>{" "}
          is parsed as four separate words: red, ceramic, coffee, mug.
          Underscores are treated as connectors - Google reads{" "}
          <code className="bg-[#F5F5F5] dark:bg-[#252525] px-1.5 py-0.5 rounded text-xs font-mono">
            red_ceramic_coffee_mug.jpg
          </code>{" "}
          as a single compound token. Spaces in filenames are encoded as{" "}
          <code className="bg-[#F5F5F5] dark:bg-[#252525] px-1.5 py-0.5 rounded text-xs font-mono">
            %20
          </code>{" "}
          in URLs, which creates messy links and can cause crawl issues.
          Always use hyphens.
        </p>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-8 mb-3">
          Keep filenames lowercase
        </h3>

        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          URLs are case-sensitive on most server configurations. A file
          named{" "}
          <code className="bg-[#F5F5F5] dark:bg-[#252525] px-1.5 py-0.5 rounded text-xs font-mono">
            Golden-Gate-Bridge.jpg
          </code>{" "}
          and{" "}
          <code className="bg-[#F5F5F5] dark:bg-[#252525] px-1.5 py-0.5 rounded text-xs font-mono">
            golden-gate-bridge.jpg
          </code>{" "}
          can be treated as two different resources by the server, creating
          duplicate content issues. Lowercase filenames also look cleaner
          in image URLs and match the convention used by all major web
          platforms.
        </p>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-8 mb-3">
          Be descriptive and specific
        </h3>

        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Generic filenames like{" "}
          <code className="bg-[#F5F5F5] dark:bg-[#252525] px-1.5 py-0.5 rounded text-xs font-mono">
            photo.jpg
          </code>{" "}
          or{" "}
          <code className="bg-[#F5F5F5] dark:bg-[#252525] px-1.5 py-0.5 rounded text-xs font-mono">
            image1.jpg
          </code>{" "}
          provide no ranking benefit. Aim for 3 to 5 descriptive keywords
          that accurately reflect the image content. Include the primary
          subject, any relevant modifiers (color, material, style), and
          location or context where meaningful. Avoid keyword stuffing-
          a filename like{" "}
          <code className="bg-[#F5F5F5] dark:bg-[#252525] px-1.5 py-0.5 rounded text-xs font-mono">
            buy-cheap-coffee-mug-online-store-sale.jpg
          </code>{" "}
          reads as spam and provides no additional ranking benefit over a
          clean, accurate descriptive name.
        </p>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-8 mb-3">
          Drop stop words and filler
        </h3>

        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Words like &ldquo;a&rdquo;, &ldquo;the&rdquo;, &ldquo;of&rdquo;, &ldquo;and&rdquo;, &ldquo;with&rdquo; add length
          to the filename without contributing to keyword relevance. Keep
          filenames tight. Prefer{" "}
          <code className="bg-[#F5F5F5] dark:bg-[#252525] px-1.5 py-0.5 rounded text-xs font-mono">
            wooden-dining-table-modern-interior.jpg
          </code>{" "}
          over{" "}
          <code className="bg-[#F5F5F5] dark:bg-[#252525] px-1.5 py-0.5 rounded text-xs font-mono">
            a-photo-of-a-wooden-dining-table-in-a-modern-interior.jpg
          </code>
          .
        </p>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-8 mb-3">
          Match the filename to the page topic
        </h3>

        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          A travel blog post about Tokyo should feature images with
          filenames that include relevant location keywords. An e-commerce
          product page for running shoes should have filenames reflecting
          the specific product model, color, and use case. Contextual
          alignment between the filename, alt text, page title, and
          surrounding content reinforces your topical relevance signal to
          Google.
        </p>

        <h2 id="alt-text-vs-filename" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          Alt text vs filename vs title attribute: understanding the difference
        </h2>

        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          These three image attributes serve different purposes and carry
          different weight as SEO signals. Confusing them leads to missed
          optimization opportunities. Here is how each one functions:
        </p>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-8 mb-3">
          Image filename (the URL path)
        </h3>

        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          The filename is part of the image&apos;s URL. It is processed by
          Google before the page HTML is fully parsed. It signals topical
          relevance early in the crawl cycle. It cannot be changed without
          also updating every reference to the image URL on your site.
          This is why getting filenames right before upload matters-
          changing them after indexing requires redirects.
        </p>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-8 mb-3">
          Alt text (the{" "}
          <code className="bg-[#F5F5F5] dark:bg-[#252525] px-1.5 py-0.5 rounded text-xs font-mono">
            alt
          </code>{" "}
          attribute)
        </h3>

        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Alt text is the most important on-page image SEO signal. It lives
          in the HTML as{" "}
          <code className="bg-[#F5F5F5] dark:bg-[#252525] px-1.5 py-0.5 rounded text-xs font-mono">
            {'<img alt="golden gate bridge at sunset" />'}
          </code>
          . It serves two critical functions: it describes the image to
          Google&apos;s crawler in the context of the page, and it provides
          text to screen readers for accessibility. Alt text should describe
          the image as it relates to the page content- not as a generic
          description and not as a keyword dump.
        </p>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-8 mb-3">
          Title attribute
        </h3>

        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          The{" "}
          <code className="bg-[#F5F5F5] dark:bg-[#252525] px-1.5 py-0.5 rounded text-xs font-mono">
            title
          </code>{" "}
          attribute on an image appears as a tooltip when a user hovers
          over it. It is the weakest of the three signals for SEO purposes-
          Google gives it minimal weight. Focus your optimization effort on
          filename and alt text first. The title attribute is useful for
          user experience (hover tooltips) but should not be treated as a
          primary SEO lever. According to{" "}
          <a
            href="https://web.dev/learn/performance"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors"
          >
            web.dev&apos;s performance guidelines
          </a>
          , investing time in meaningful alt text and optimized filenames
          returns far more value than filling in title attributes.
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border border-gray-200 dark:border-[#2A2A2A] rounded-md overflow-hidden">
            <thead>
              <tr className="bg-gray-50 dark:bg-[#252525]">
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-gray-700 dark:text-[#E5E5E5] border-b border-gray-200 dark:border-[#2A2A2A]">Signal</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-gray-700 dark:text-[#E5E5E5] border-b border-gray-200 dark:border-[#2A2A2A]">SEO weight</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-gray-700 dark:text-[#E5E5E5] border-b border-gray-200 dark:border-[#2A2A2A]">Purpose</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-gray-700 dark:text-[#E5E5E5] border-b border-gray-200 dark:border-[#2A2A2A]">Required?</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100 dark:border-[#2A2A2A]">
                <td className="px-4 py-2.5 text-gray-800 dark:text-[#E5E5E5] font-medium">Filename</td>
                <td className="px-4 py-2.5 text-gray-600 dark:text-[#A3A3A3]">High</td>
                <td className="px-4 py-2.5 text-gray-600 dark:text-[#A3A3A3]">Early relevance signal at crawl time</td>
                <td className="px-4 py-2.5 text-gray-600 dark:text-[#A3A3A3]">Yes (always present)</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-[#2A2A2A]">
                <td className="px-4 py-2.5 text-gray-800 dark:text-[#E5E5E5] font-medium">Alt text</td>
                <td className="px-4 py-2.5 text-gray-600 dark:text-[#A3A3A3]">Very high</td>
                <td className="px-4 py-2.5 text-gray-600 dark:text-[#A3A3A3]">Contextual relevance + accessibility</td>
                <td className="px-4 py-2.5 text-gray-600 dark:text-[#A3A3A3]">Yes (required for accessibility)</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 text-gray-800 dark:text-[#E5E5E5] font-medium">Title attribute</td>
                <td className="px-4 py-2.5 text-gray-600 dark:text-[#A3A3A3]">Low</td>
                <td className="px-4 py-2.5 text-gray-600 dark:text-[#A3A3A3]">Tooltip on hover, minimal SEO value</td>
                <td className="px-4 py-2.5 text-gray-600 dark:text-[#A3A3A3]">Optional</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 id="step-by-step" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          Step-by-step: rename images for SEO with SammaPix AI Rename
        </h2>

        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Using the{" "}
          <Link
            href="/tools/ai-rename"
            className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors"
          >
            SammaPix AI Rename tool
          </Link>{" "}
          takes under five minutes for a batch of 30 to 50 images.
          Here is the complete workflow:
        </p>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-8 mb-3">
          Step 1 - Sign in (free account required)
        </h3>

        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          AI Rename requires a free account to prevent API abuse. Click
          &ldquo;Sign in with Google&rdquo; or &ldquo;Sign in with GitHub&rdquo;- no forms,
          no passwords, no email verification. The entire sign-in flow takes
          under 15 seconds.
        </p>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-8 mb-3">
          Step 2 - Drop your images into the tool
        </h3>

        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Drag and drop a batch of images onto the drop zone, or click to
          open a file picker. You can mix JPEG, PNG, WebP, and HEIC files
          in the same batch. The tool accepts up to 5 images per session
          on the free plan and up to 200 on Pro.
        </p>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-8 mb-3">
          Step 3 - Review AI-generated suggestions
        </h3>

        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          For each image, the tool displays the original filename alongside
          the AI-generated suggestion. Review each suggestion- in our
          testing, Gemini Flash is accurate on about 95% of images without
          any manual correction needed. For the edge cases (abstract art,
          macro photography with ambiguous subjects), you can click the
          filename field and edit it directly.
        </p>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-8 mb-3">
          Step 4 - Download your renamed images
        </h3>

        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Download individual images by clicking the download button on
          each card, or click &ldquo;Download All as ZIP&rdquo; to get the entire
          batch in a single archive. The original files are unchanged-
          the tool creates new copies with the new filenames. Your files
          never left your device except for the thumbnail sent to Gemini
          for analysis.
        </p>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-8 mb-3">
          Step 5 - Upload and update alt text
        </h3>

        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Upload the renamed images to your CMS, e-commerce platform, or
          image hosting service. Take the opportunity to update the alt
          text for each image to match the new descriptive filename- use
          the filename as a starting point, then rephrase it as a natural
          sentence. For example,{" "}
          <code className="bg-[#F5F5F5] dark:bg-[#252525] px-1.5 py-0.5 rounded text-xs font-mono">
            golden-gate-bridge-sunset-san-francisco.jpg
          </code>{" "}
          becomes{" "}
          <code className="bg-[#F5F5F5] dark:bg-[#252525] px-1.5 py-0.5 rounded text-xs font-mono">
            alt=&quot;Golden Gate Bridge at sunset viewed from San Francisco&quot;
          </code>
          .
        </p>

        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          If you also need to reduce file sizes before uploading- which is
          almost always a good idea for web performance- run your images
          through the{" "}
          <Link
            href="/tools/compress"
            className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors"
          >
            SammaPix Compress tool
          </Link>{" "}
          or{" "}
          <Link
            href="/tools/webp"
            className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors"
          >
            Convert to WebP
          </Link>{" "}
          first, then rename. The order does not affect the SEO benefit,
          but compressing before renaming means you only keep one optimized
          copy of each file. For more on compression best practices, see our
          guide on{" "}
          <Link
            href="/blog/compress-images-without-losing-quality"
            className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors"
          >
            compressing images without losing quality
          </Link>
          .
        </p>

        <hr className="my-8 border-gray-100 dark:border-[#2A2A2A]" />

        <h2 id="faq" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          Frequently asked questions
        </h2>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-8 mb-3">
          Does image filename actually affect SEO rankings?
        </h3>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Yes. Google&apos;s own documentation confirms that image filenames
          are a relevance signal for Google Images. While filename alone
          is not a ranking factor for your main page results, it directly
          affects discoverability in Google Image Search- which is
          responsible for approximately one in five all web searches. For
          content-heavy sites, photography portfolios, food blogs, and
          e-commerce stores, optimizing image filenames is one of the
          highest-return technical SEO tasks available.
        </p>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-8 mb-3">
          Should I use hyphens or underscores in image filenames for SEO?
        </h3>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Always use hyphens. Google treats hyphens as word separators-{" "}
          <code className="bg-[#F5F5F5] dark:bg-[#252525] px-1.5 py-0.5 rounded text-xs font-mono">
            golden-gate-bridge
          </code>{" "}
          is parsed as three separate keywords. Underscores are treated as
          connectors-{" "}
          <code className="bg-[#F5F5F5] dark:bg-[#252525] px-1.5 py-0.5 rounded text-xs font-mono">
            golden_gate_bridge
          </code>{" "}
          is treated as one compound token. Hyphens give you better keyword
          matching across all three words.
        </p>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-8 mb-3">
          What is the difference between alt text and image filename for SEO?
        </h3>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          The filename is part of the image URL and gives Google an initial
          relevance signal before the full page is crawled. The alt text
          lives in the HTML and provides contextual relevance within the
          page- it also serves as accessibility text for screen readers.
          Both are important. A descriptive filename without good alt text
          leaves half the signal unused, and vice versa. The two work
          together to reinforce topical relevance.
        </p>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-8 mb-3">
          Is it worth renaming old images already indexed by Google?
        </h3>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Yes, but you must set up proper 301 redirects from the old image
          URL to the new one. If you rename and upload without redirects,
          any existing backlinks or indexed image URLs will return 404
          errors, causing you to lose existing ranking equity. If your
          images are not yet indexed or do not have inbound links, you can
          rename and re-upload without redirects.
        </p>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-8 mb-3">
          How many keywords should I include in an image filename?
        </h3>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Aim for three to five descriptive keywords. Fewer than three often
          leaves relevant context out. More than five starts to look like
          keyword stuffing to Google&apos;s algorithms and produces unwieldy
          filenames. The sweet spot is a filename that reads naturally and
          accurately describes the image- if it sounds like an honest
          description of what you see in the image, it is probably correct.
        </p>

      </BlogArticleLayout>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}

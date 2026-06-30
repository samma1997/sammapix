import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { APP_URL } from "@/lib/constants";
import BlogArticleLayout from "@/components/blog/BlogArticleLayout";

export const metadata: Metadata = {
  title: "How to Batch-Prepare Images for Your Website (Resize, Compress, WebP, Rename)",
  description:
    "Preparing a folder of images for a website means four jobs: resize, compress, convert to WebP, and give them SEO filenames. This guide shows the order to do them in and how to run all four in one pass, instead of four separate tools. Updated 2026.",
  alternates: { canonical: `${APP_URL}/blog/how-to-batch-prepare-images-for-website` },
  keywords: [
    "prepare images for website",
    "image optimization pipeline",
    "one click image optimize",
    "batch optimize images",
    "resize compress rename images",
    "bulk image optimization",
    "optimize images before upload",
  ],
  openGraph: {
    title: "How to Batch-Prepare Images for Your Website (Resize, Compress, WebP, Rename)",
    description:
      "The four jobs for web-ready images, the order to do them in, and how to run all four in one pass instead of four tools. Updated 2026.",
    url: `${APP_URL}/blog/how-to-batch-prepare-images-for-website`,
    type: "article",
    publishedTime: "2026-06-30",
    authors: ["https://lucasammarco.com"],
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Batch-Prepare Images for Your Website",
    description: "Resize, compress, WebP, and rename a whole folder of images in one pass instead of four tools. Updated 2026.",
    creator: "@lucasammarco",
  },
};

const POST_DATE = "2026-06-30";
const POST_DATE_FORMATTED = "June 30, 2026";
const POST_URL = `${APP_URL}/blog/how-to-batch-prepare-images-for-website`;
const POST_TITLE = "How to Batch-Prepare Images for Your Website";

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "How to Batch-Prepare Images for Your Website (Resize, Compress, WebP, Rename)",
  description:
    "The four jobs that make an image web-ready, the order to do them in, and how to run all four in one pass instead of four separate tools.",
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
  keywords: ["prepare images for website", "image optimization pipeline", "batch optimize images", "optimize images before upload"],
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
      name: "What does it mean to prepare an image for the web?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It means four jobs: resizing it to a sensible width, compressing it to a small file size, converting it to a modern format like WebP, and giving it a descriptive filename for SEO. Done together, these turn a heavy camera original into a fast, search-friendly web image.",
      },
    },
    {
      "@type": "Question",
      name: "What order should I do these steps in?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Resize first, because shrinking the dimensions removes most of the weight. Then compress, then convert to WebP, then rename. A tool that does all four in one pass handles the order for you, which is why a single pipeline beats four separate tools.",
      },
    },
    {
      "@type": "Question",
      name: "Can I do a whole folder at once?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, and you should. The SammaPix WebLift tool takes a batch of images and resizes, compresses, converts to WebP, and renames them in one pass, so a folder of fifty images is one job rather than two hundred manual steps.",
      },
    },
    {
      "@type": "Question",
      name: "Why rename images for the web?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Search engines read filenames. A file called red-leather-armchair.webp tells Google more than IMG_4821.webp, which helps the image rank in image search and adds context to the page. Renaming as part of the same pass means it never gets skipped.",
      },
    },
    {
      "@type": "Question",
      name: "Does this help page speed and SEO?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Directly. Images are usually the heaviest part of a page, so resizing and compressing them improves Core Web Vitals, which Google uses for ranking. WebP cuts the weight further, and descriptive filenames add image-search visibility. Together they make pages faster and more findable.",
      },
    },
  ],
};

export default function HowToBatchPrepareImagesPage() {
  return (
    <>
      <BlogArticleLayout
        title={POST_TITLE}
        slug="how-to-batch-prepare-images-for-website"
        description="A web-ready image is really four jobs in a trench coat: resize, compress, convert to WebP, and rename. This guide explains each one, the order that gets the best result, and how to run all four on a whole folder in a single pass instead of juggling four separate tools."
        date={POST_DATE}
        dateFormatted={POST_DATE_FORMATTED}
        tags={["Tools", "Workflow"]}
        readingTime={8}
        headings={[
          { id: "four-jobs", title: "The four jobs of a web-ready image" },
          { id: "order", title: "The order that matters" },
          { id: "one-pass", title: "Running all four in one pass" },
          { id: "rename", title: "Why renaming belongs in the pipeline" },
          { id: "when", title: "When a pipeline beats single tools" },
          { id: "faq", title: "FAQ" },
        ]}
        summary={[
          "A web-ready image needs four things: resize, compress, WebP, and an SEO filename.",
          "Resize first, because cutting dimensions removes most of the weight before compression.",
          "WebLift runs all four on a whole batch in one pass, instead of four separate tools.",
          "Descriptive filenames help image search, so renaming belongs in the same step.",
          "A single pipeline is for bulk prep; reach for a focused tool when you need just one job.",
        ]}
        heroImage={
          <figure>
            <img
              src="https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80"
              alt="A folder of images being processed for the web"
              className="w-full rounded-lg"
              loading="eager"
            />
            <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
              One pass turns a folder of camera originals into web-ready files
            </figcaption>
          </figure>
        }
        ctaBlock={
          <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2">
              Resize, compress, WebP, and rename in one pass
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-4">
              WebLift runs the whole image pipeline on a batch at once, so a folder of camera originals comes
              out web-ready in a single step.
            </p>
            <Link
              href="/tools/weblift"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            >
              Try WebLift, Free <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>
        }
      >
        <h2 id="four-jobs" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          The four jobs of a web-ready image
        </h2>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          A camera original is not a web image. Turning one into the other is really four separate jobs, and skipping any of them leaves performance on the table:
        </p>
        <ul className="mb-4 space-y-2">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-disc"><strong className="text-gray-800 dark:text-[#E5E5E5]">Resize</strong> the dimensions down to what the page actually displays.</li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-disc"><strong className="text-gray-800 dark:text-[#E5E5E5]">Compress</strong> to cut the file size without visible quality loss.</li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-disc"><strong className="text-gray-800 dark:text-[#E5E5E5]">Convert to WebP</strong> for a smaller file at the same quality.</li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-disc"><strong className="text-gray-800 dark:text-[#E5E5E5]">Rename</strong> to a descriptive, SEO-friendly filename.</li>
        </ul>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Each one has its own deep dive, from{" "}
          <Link href="/blog/compress-images-without-losing-quality" className="text-[#6366F1] hover:underline">compressing without losing quality</Link>{" "}
          to picking the{" "}
          <Link href="/blog/best-image-format-for-web-2026" className="text-[#6366F1] hover:underline">best format for the web</Link>. This guide is about doing them together, efficiently, on more than one image at a time.
        </p>

        <h2 id="order" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          The order that matters
        </h2>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Order changes the result. <strong className="text-gray-800 dark:text-[#E5E5E5]">Resize first.</strong> Most of an image's weight comes from its pixel dimensions, so shrinking a 4000-pixel photo to 1600 removes the bulk before anything else runs. <strong className="text-gray-800 dark:text-[#E5E5E5]">Compress second</strong>, on the already-smaller image. <strong className="text-gray-800 dark:text-[#E5E5E5]">Convert to WebP third</strong>, so the format saving stacks on top of the compression. <strong className="text-gray-800 dark:text-[#E5E5E5]">Rename last</strong>, once the file is final. Get the order wrong by hand and you do redundant work; a pipeline that bakes in the order removes the question entirely.
        </p>

        <h2 id="one-pass" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Running all four in one pass
        </h2>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Doing this manually means four tools and four exports per image, which is fine for one photo and miserable for fifty. The{" "}
          <Link href="/tools/weblift" className="text-[#6366F1] hover:underline">SammaPix WebLift tool</Link>{" "}
          runs the whole pipeline at once: drop in a batch, and every image comes out resized, compressed, converted to WebP, and renamed, in a single download. A folder of fifty images becomes one job instead of two hundred steps.
        </p>

        <div data-tts-skip className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">A whole folder, web-ready in one step</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">WebLift resizes, compresses, converts to WebP, and renames a batch in one pass. Free, in your browser.</p>
          <Link href="/tools/weblift" className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors">
            Open WebLift, Free <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
          </Link>
        </div>

        <h2 id="rename" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Why renaming belongs in the pipeline
        </h2>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Renaming is the step people drop, because it feels separate from performance. It is not. Search engines read filenames, so <strong className="text-gray-800 dark:text-[#E5E5E5]">red-leather-armchair.webp</strong> tells Google something that <strong className="text-gray-800 dark:text-[#E5E5E5]">IMG_4821.webp</strong> never will, and that feeds image search and on-page context. The trouble is that renaming files one by one is the most tedious job of the four, which is exactly why it gets skipped. Folding it into the same pass, ideally with AI-generated descriptive names, is the only way it reliably happens. For the SEO detail, see our guide on{" "}
          <Link href="/blog/ai-image-renaming-seo-guide" className="text-[#6366F1] hover:underline">AI image renaming for SEO</Link>.
        </p>

        <h2 id="when" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          When a pipeline beats single tools
        </h2>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          A pipeline is for <strong className="text-gray-800 dark:text-[#E5E5E5]">bulk preparation</strong>: a batch of product shots before a store upload, a folder of photos before a site migration, every image for a new page at once. When you only need one job on one image, a focused tool is quicker, so reach for the standalone{" "}
          <Link href="/tools/compress" className="text-[#6366F1] hover:underline">compressor</Link>{" "}
          or{" "}
          <Link href="/tools/webp" className="text-[#6366F1] hover:underline">WebP converter</Link>{" "}
          instead. For a single blog image specifically, see{" "}
          <Link href="/blog/what-size-should-blog-images-be" className="text-[#6366F1] hover:underline">what size blog images should be</Link>. The pipeline earns its place the moment you are doing all four jobs on more than a handful of files.
        </p>

        <section id="faq">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">FAQ</h2>
          {faqSchema.mainEntity.map((item, i) => (
            <div key={i} className="mb-6">
              <h3 className="text-base font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">{item.name}</h3>
              <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed">{item.acceptedAnswer.text}</p>
            </div>
          ))}
        </section>
      </BlogArticleLayout>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </>
  );
}

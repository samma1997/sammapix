import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { APP_URL } from "@/lib/constants";
import BlogArticleLayout from "@/components/blog/BlogArticleLayout";

export const metadata: Metadata = {
  title: "What Size Should Blog Images Be? Dimensions, File Size & Format (2026)",
  description:
    "The practical spec for blog post images: how wide they should be in pixels, how small the file should be in KB, and which format to use. Plus the one-step way to hit all three, and the mistakes that slow your blog down. Updated 2026.",
  alternates: { canonical: `${APP_URL}/blog/what-size-should-blog-images-be` },
  keywords: [
    "what size should blog images be",
    "blog image size",
    "best image size for blog post",
    "blog featured image size",
    "blog image dimensions",
    "wordpress blog image size",
    "blog image file size",
  ],
  openGraph: {
    title: "What Size Should Blog Images Be? Dimensions, File Size & Format (2026)",
    description:
      "How wide, how small, and which format your blog images should be, plus the one-step way to hit all three. Updated 2026.",
    url: `${APP_URL}/blog/what-size-should-blog-images-be`,
    type: "article",
    publishedTime: "2026-06-30",
    authors: ["https://lucasammarco.com"],
  },
  twitter: {
    card: "summary_large_image",
    title: "What Size Should Blog Images Be? (2026)",
    description: "How wide, how small, and which format your blog images should be, plus the one-step way to hit all three.",
    creator: "@lucasammarco",
  },
};

const POST_DATE = "2026-06-30";
const POST_DATE_FORMATTED = "June 30, 2026";
const POST_URL = `${APP_URL}/blog/what-size-should-blog-images-be`;
const POST_TITLE = "What Size Should Blog Images Be?";

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "What Size Should Blog Images Be? Dimensions, File Size & Format",
  description:
    "The practical spec for blog post images: pixel width, file size in KB, and which format to use, plus the one-step way to hit all three.",
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
  keywords: ["blog image size", "what size should blog images be", "blog image dimensions", "blog featured image size"],
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
      name: "What size should blog images be?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For most blogs, make in-body images 1200 to 1600 pixels wide, keep each file under about 150 to 200 KB, and serve them as WebP with a JPG fallback. That is wide enough to look sharp on modern screens while staying small enough to load fast.",
      },
    },
    {
      "@type": "Question",
      name: "What is the best width in pixels for a blog image?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Match it to your theme's content width, which is usually 700 to 800 pixels, then double it for retina screens, so 1200 to 1600 pixels wide is the sweet spot. Going much larger just adds weight no visitor will ever see, because the browser scales it down anyway.",
      },
    },
    {
      "@type": "Question",
      name: "How small should a blog image file be?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Aim for under 150 to 200 KB per in-body image, and under about 100 KB for thumbnails. A single image over 1 MB, which is what a raw phone photo often is, is the most common reason a blog post feels slow.",
      },
    },
    {
      "@type": "Question",
      name: "What is the best format for blog images?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "WebP. It is 25 to 35 percent smaller than JPG at the same quality and every modern browser supports it. Use JPG only as a fallback for very old software. Use PNG just for graphics with text or transparency, not for photos.",
      },
    },
    {
      "@type": "Question",
      name: "What size should a blog featured image be?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A featured or hero image is usually shown wider, so 1600 to 2000 pixels wide is reasonable, but keep it compressed to roughly 200 to 300 KB. It is also the image used in social previews, so a 1.91 to 1 ratio, around 1200 by 630, works well for sharing cards.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need to resize before uploading, or will the CMS do it?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Resize first. A CMS like WordPress generates display sizes, but it keeps your giant original and often still serves oversized files. Uploading an already correctly sized, compressed image is the only way to be sure the page stays light.",
      },
    },
  ],
};

export default function WhatSizeBlogImagesPage() {
  return (
    <>
      <BlogArticleLayout
        title={POST_TITLE}
        slug="what-size-should-blog-images-be"
        description="There is a simple spec for blog images: a width, a file size, and a format. Get those three right and your posts stay sharp and fast. This guide gives the exact numbers, explains why each one matters, and shows the one-step way to hit all three before you upload."
        date={POST_DATE}
        dateFormatted={POST_DATE_FORMATTED}
        tags={["Tools", "SEO"]}
        readingTime={8}
        headings={[
          { id: "short-answer", title: "The short answer" },
          { id: "width", title: "Width: how many pixels wide" },
          { id: "filesize", title: "File size: how many KB" },
          { id: "format", title: "Format: WebP first" },
          { id: "one-step", title: "Hitting all three in one step" },
          { id: "mistakes", title: "The mistakes that slow blogs down" },
          { id: "faq", title: "FAQ" },
        ]}
        summary={[
          "In-body blog images: 1200 to 1600 px wide, under 150 to 200 KB, served as WebP.",
          "Featured or hero images: 1600 to 2000 px wide, kept to roughly 200 to 300 KB.",
          "Match width to your theme's content width, then double it for retina screens.",
          "WebP is 25 to 35 percent smaller than JPG at the same quality, with full browser support.",
          "Resize and compress before uploading, since a CMS keeps your oversized original.",
        ]}
        heroImage={
          <figure>
            <img
              src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80"
              alt="A laptop showing a blog post being written with an image"
              className="w-full rounded-lg"
              loading="eager"
            />
            <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
              The right blog image is a balance of width, weight, and format
            </figcaption>
          </figure>
        }
        ctaBlock={
          <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2">
              Get blog-ready images in one drop
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-4">
              BlogDrop resizes, compresses, and converts an image to WebP in a single step, so it hits the
              right width, weight, and format without you touching three tools.
            </p>
            <Link
              href="/tools/blogdrop"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            >
              Try BlogDrop, Free <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>
        }
      >
        <h2 id="short-answer" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          The short answer
        </h2>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          A blog image has three numbers worth getting right: how wide it is, how heavy the file is, and what format it is in. For the images that sit inside a post, the spec is simple:
        </p>
        <ul className="mb-4 space-y-2">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-disc"><strong className="text-gray-800 dark:text-[#E5E5E5]">Width:</strong> 1200 to 1600 pixels wide.</li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-disc"><strong className="text-gray-800 dark:text-[#E5E5E5]">File size:</strong> under 150 to 200 KB each.</li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-disc"><strong className="text-gray-800 dark:text-[#E5E5E5]">Format:</strong> WebP, with JPG as a fallback.</li>
        </ul>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          For a featured or hero image, which is shown larger, go 1600 to 2000 pixels wide and keep it to roughly 200 to 300 KB. The rest of this guide explains why each number is what it is, so you can adjust for your own theme.
        </p>

        <h2 id="width" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Width: how many pixels wide
        </h2>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The trick is to match the image width to the space it actually fills, then account for high-resolution screens. Most blog themes have a content column of 700 to 800 pixels. A retina display packs roughly twice the pixels into that space, so to look crisp the image needs to be about double the column width: <strong className="text-gray-800 dark:text-[#E5E5E5]">1200 to 1600 pixels</strong>. Anything beyond that is wasted, because the browser just scales it down to fit the column while still downloading every extra pixel. That is why a 4000-pixel phone photo is not sharper on your blog, only slower.
        </p>

        <h2 id="filesize" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          File size: how many KB
        </h2>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Width is about sharpness, file size is about speed, and they are separate. Even at the right pixel width, an uncompressed image can be large. Target <strong className="text-gray-800 dark:text-[#E5E5E5]">under 150 to 200 KB</strong> for in-body images and around 100 KB for thumbnails. The reason matters for more than feel: Google uses page speed as a ranking factor through Core Web Vitals, and images are usually the heaviest thing on a page. One oversized hero image is the single most common cause of a slow post. For the deeper performance angle, see our guide on{" "}
          <Link href="/blog/optimize-images-core-web-vitals-2026" className="text-[#6366F1] hover:underline">optimizing images for Core Web Vitals</Link>.
        </p>

        <h2 id="format" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Format: WebP first
        </h2>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          For photographs on a blog, <strong className="text-gray-800 dark:text-[#E5E5E5]">WebP</strong> is the default in 2026. It is 25 to 35 percent smaller than JPG at the same visual quality, and every current browser supports it, so the old reason to avoid it is gone. Keep JPG only as a fallback for ancient software, and reserve PNG for graphics with text, logos, or transparency, never for photos, where it balloons the file. If you are weighing the options, our{" "}
          <Link href="/blog/best-image-format-for-web-2026" className="text-[#6366F1] hover:underline">best image format for the web</Link>{" "}
          guide breaks down each one.
        </p>

        <h2 id="one-step" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Hitting all three in one step
        </h2>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Doing this by hand means three tools: one to resize, one to compress, one to convert to WebP. That is the job{" "}
          <Link href="/tools/blogdrop" className="text-[#6366F1] hover:underline">BlogDrop</Link>{" "}
          collapses into one. You drop a full-resolution photo in, and it comes out resized to a sensible blog width, compressed to a light file size, and converted to WebP, ready to upload. It is the fastest way to meet the whole spec above without thinking about it for every image.
        </p>

        <div data-tts-skip className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">Right width, weight, and format in one drop</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">BlogDrop resizes, compresses, and converts to WebP in a single step. Free, in your browser.</p>
          <Link href="/tools/blogdrop" className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors">
            Open BlogDrop, Free <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
          </Link>
        </div>

        <h2 id="mistakes" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          The mistakes that slow blogs down
        </h2>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Three mistakes account for most slow blogs. The first is <strong className="text-gray-800 dark:text-[#E5E5E5]">uploading the raw photo</strong>, a 4000-pixel, 4 MB file straight off a phone. The second is <strong className="text-gray-800 dark:text-[#E5E5E5]">trusting the CMS to handle it</strong>: WordPress makes smaller display versions but keeps your huge original and often still serves oversized files, so resizing first is the only guarantee. The third is <strong className="text-gray-800 dark:text-[#E5E5E5]">skipping the filename and alt text</strong>: a descriptive filename and alt attribute help both accessibility and image search, and cost nothing to add while you are preparing the image. For the full WordPress-specific routine, see{" "}
          <Link href="/blog/optimize-images-wordpress-guide" className="text-[#6366F1] hover:underline">how to optimize images for WordPress</Link>.
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

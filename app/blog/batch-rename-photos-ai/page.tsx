import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { APP_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Batch Rename Photos with AI: SEO-Friendly Filenames (2026)",
  description:
    "Learn how to batch rename photos with AI automatically. Transform generic image filenames like IMG_0001.jpg into SEO-friendly, descriptive names in seconds.",
  alternates: {
    canonical: `${APP_URL}/blog/batch-rename-photos-ai`,
  },
  keywords: [
    "batch rename photos ai",
    "ai image renamer",
    "rename photos automatically",
    "seo friendly filenames",
    "batch rename images",
    "rename photos in bulk",
    "image rename tool",
    "ai photo renaming",
  ],
  openGraph: {
    title: "Batch Rename Photos with AI: SEO-Friendly Filenames (2026)",
    description:
      "Automatically rename hundreds of photos with AI. Transform generic names like IMG_0001 into keyword-rich, descriptive filenames for better SEO.",
    url: `${APP_URL}/blog/batch-rename-photos-ai`,
    type: "article",
    publishedTime: "2026-03-21",
    authors: ["https://lucasammarco.com"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Batch Rename Photos with AI",
    description:
      "Automatically rename hundreds of photos with AI. Transform generic filenames into SEO-friendly names in seconds.",
    creator: "@lucasammarco",
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Batch Rename Photos with AI: SEO-Friendly Filenames (2026)",
  description:
    "Learn how to automatically rename hundreds of photos with AI. Transform generic filenames like IMG_0001.jpg into descriptive, SEO-optimized names instantly.",
  url: `${APP_URL}/blog/batch-rename-photos-ai`,
  datePublished: "2026-03-21",
  dateModified: "2026-03-21",
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
    "@id": `${APP_URL}/blog/batch-rename-photos-ai`,
  },
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
      name: "Batch Rename Photos with AI",
      item: `${APP_URL}/blog/batch-rename-photos-ai`,
    },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is batch renaming photos with AI?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Batch renaming with AI automatically renames hundreds of photos at once using artificial intelligence. Instead of manually naming each file, AI analyzes the image content and generates descriptive, keyword-rich filenames that describe what is in each photo. This works for portraits, landscapes, products, and any image type.",
      },
    },
    {
      "@type": "Question",
      name: "Why does image filename matter for SEO?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Image filenames are a direct ranking signal for Google Image Search. A descriptive filename like 'woman-running-forest-morning.jpg' ranks better than 'IMG_0001.jpg'. Google uses filenames to understand image content, and keyword-rich filenames increase the chances your images appear in relevant search results. This is one of the easiest SEO wins available.",
      },
    },
    {
      "@type": "Question",
      name: "How does SammaPix AI Rename work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "SammaPix AI Rename uses Google Gemini 1.5 Flash to analyze each image and generate a descriptive filename. The AI examines the visual content, identifies objects, people, scenes, and actions, then creates a concise, SEO-friendly name. Batch mode processes hundreds of photos at once. All processing happens in your browser — your images never leave your device.",
      },
    },
    {
      "@type": "Question",
      name: "Can I batch rename photos without internet?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "AI Rename requires an internet connection because it uses Google Gemini API to analyze images. However, you are not uploading your actual images to the internet — only a small thumbnail is sent to Google for analysis. The full-resolution image stays on your device. Your files are never stored on any server.",
      },
    },
    {
      "@type": "Question",
      name: "What file formats does batch rename support?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "SammaPix batch rename supports JPG, PNG, WebP, GIF, and HEIC formats. You can rename photos from iPhones (HEIC), DSLRs (RAW after conversion), smartphones, and web images all in the same batch. Mixed formats in a single batch work perfectly.",
      },
    },
    {
      "@type": "Question",
      name: "Is batch renaming with AI free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "SammaPix AI Rename is free for up to 5 renames per day on the free plan. For unlimited batch renaming, upgrade to SammaPix Pro for $7/month. This gives you 200 AI renames per day, batch processing for up to 100 images at once, and ZIP download.",
      },
    },
  ],
};

const POST_DATE = "2026-03-21";
const POST_DATE_FORMATTED = "March 21, 2026";
const POST_URL = `${APP_URL}/blog/batch-rename-photos-ai`;
const POST_TITLE = "Batch Rename Photos with AI: SEO-Friendly Filenames (2026)";

export default function BatchRenamePhotosAIPage() {
  const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(POST_TITLE)}&url=${encodeURIComponent(POST_URL)}&via=lucasammarco`;
  const linkedinShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(POST_URL)}`;

  return (
    <div className="py-12 px-4 sm:px-6 bg-white dark:bg-[#191919] min-h-screen">
      <div className="max-w-2xl mx-auto">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm text-gray-400 dark:text-[#737373] hover:text-gray-700 dark:hover:text-[#E5E5E5] mb-8 transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.5} />
          Back to Blog
        </Link>

        <article>
          <header className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs font-medium uppercase tracking-wide text-purple-700">
                SEO
              </span>
              <span className="text-gray-200 dark:text-[#333]">·</span>
              <time
                className="text-xs text-gray-400 dark:text-[#737373]"
                dateTime={POST_DATE}
              >
                {POST_DATE_FORMATTED}
              </time>
              <span className="text-gray-200 dark:text-[#333]">·</span>
              <span className="text-xs text-gray-400 dark:text-[#737373]">
                8 min read
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-[#E5E5E5] tracking-tight leading-tight mb-4">
              {POST_TITLE}
            </h1>

            <p className="text-base text-gray-500 dark:text-[#A3A3A3] leading-relaxed mb-5">
              Most photos have meaningless filenames: IMG_0001.jpg, DSC_2847.jpg,
              PHOTO_20260315.jpg. These names hurt your SEO. Google Image Search
              uses filenames to understand image content, and descriptive names
              rank higher. Renaming hundreds of photos manually takes forever. AI
              makes it instant: analyze your photos once, rename them all at once
              with SEO-optimized descriptions.
            </p>
          </header>

          <div className="prose-content">

            <figure className="my-8">
              <img
                src="https://images.unsplash.com/photo-1606986628025-35d57e735ae0?w=800&q=80"
                alt="AI technology analyzing and organizing digital photos on a computer screen"
                className="w-full rounded-lg"
                loading="lazy"
              />
              <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
                AI-powered batch renaming transforms generic filenames into SEO-optimized descriptive names - Photo by Markus Winkler on Unsplash
              </figcaption>
            </figure>

            <h2 className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
              Why image filenames matter for SEO (and why you are probably getting it wrong)
            </h2>

            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              Google Image Search is one of the highest-traffic sources for
              photographers, e-commerce sites, and content creators. Unlike web
              pages, search engines cannot read image content directly. They use
              multiple signals to understand what is in a photo:
            </p>

            <ul className="mb-4">
              <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
                <strong className="text-gray-800 dark:text-[#E5E5E5]">Filename:</strong> "woman-jogging-park-morning.jpg" is more informative than "IMG_4521.jpg"
              </li>
              <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
                <strong className="text-gray-800 dark:text-[#E5E5E5]">Alt text:</strong> the HTML alt attribute describing the image
              </li>
              <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
                <strong className="text-gray-800 dark:text-[#E5E5E5]">Page context:</strong> surrounding text and headings
              </li>
              <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
                <strong className="text-gray-800 dark:text-[#E5E5E5]">Image metadata:</strong> EXIF data, dimensions, file size
              </li>
            </ul>

            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              Filenames are one of the few signals you completely control.
              According to{" "}
              <a
                href="https://www.google.com/search/howsearchworks/crawling-indexing/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors"
              >
                Google's own documentation
              </a>
              , descriptive filenames improve image discoverability. A photo of
              coffee equipment titled "espresso-machine-gaggia-classic.jpg"
              is more likely to appear when someone searches "gaggia espresso
              machine" than the same image named "photo.jpg".
            </p>

            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              The problem: most photographers and content creators use camera
              defaults or generic names. A typical DSLR produces 5000+ photos per
              project. Renaming them manually would take days. That is where AI
              comes in.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
              How AI batch renaming works
            </h2>

            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              Modern AI models like Google Gemini can "see" images and describe
              them accurately. AI batch renaming takes advantage of this
              capability to generate descriptive names automatically.
            </p>

            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
              The process
            </h3>

            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              You select a batch of photos and send them to the AI renamer. For
              each image, the AI:
            </p>

            <ol className="mb-4 list-decimal list-inside space-y-2">
              <li className="text-sm text-gray-600 dark:text-[#A3A3A3]">
                Analyzes the visual content (objects, people, scenery, activities)
              </li>
              <li className="text-sm text-gray-600 dark:text-[#A3A3A3]">
                Identifies dominant subjects and contextual details
              </li>
              <li className="text-sm text-gray-600 dark:text-[#A3A3A3]">
                Generates a concise, descriptive filename
              </li>
              <li className="text-sm text-gray-600 dark:text-[#A3A3A3]">
                Applies keyword-rich naming conventions for SEO
              </li>
              <li className="text-sm text-gray-600 dark:text-[#A3A3A3]">
                Proposes the new filename for your approval
              </li>
            </ol>

            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              The entire batch processes in seconds to minutes, depending on
              quantity and internet speed. You can accept all suggestions, edit
              individual names, or reject and try again.
            </p>

            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
              What makes a good AI-generated filename?
            </h3>

            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              Not all AI-generated names are equal. The best filenames are:
            </p>

            <ul className="mb-4">
              <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
                <strong className="text-gray-800 dark:text-[#E5E5E5]">Concise:</strong> 3-6 words max. Long filenames are harder to read and don't add SEO value after 50 characters.
              </li>
              <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
                <strong className="text-gray-800 dark:text-[#E5E5E5]">Keyword-rich:</strong> include searchable terms that describe the photo (e.g., "red-fox-snow-forest" instead of "animal-in-white-stuff").
              </li>
              <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
                <strong className="text-gray-800 dark:text-[#E5E5E5]">Hyphenated:</strong> use hyphens between words. Dashes help search engines parse word boundaries. Never use underscores for SEO filenames.
              </li>
              <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
                <strong className="text-gray-800 dark:text-[#E5E5E5]">Lowercase:</strong> all lowercase. Uppercase doesn't hurt, but lowercase is convention and cleaner.
              </li>
              <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
                <strong className="text-gray-800 dark:text-[#E5E5E5]">Accurate:</strong> no misleading or keyword-stuffed names. "seagull-flying-beach" is better than "sexy-birdwatching-vacation-photos-beach-free-download".
              </li>
            </ul>

            <figure className="my-8">
              <img
                src="https://images.unsplash.com/photo-1516321318423-f06d6e504b00?w=800&q=80"
                alt="Hand typing keywords on a laptop keyboard for SEO optimization"
                className="w-full rounded-lg"
                loading="lazy"
              />
              <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
                Keyword-rich filenames improve search visibility for your images - Photo by Merakist on Unsplash
              </figcaption>
            </figure>

            <h2 className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
              Real-world examples: before and after
            </h2>

            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              Here is what AI batch renaming looks like in practice:
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm border border-gray-200 dark:border-[#2A2A2A] rounded-md overflow-hidden">
                <thead>
                  <tr className="bg-gray-50 dark:bg-[#252525]">
                    <th className="text-left px-4 py-2.5 text-xs font-semibold text-gray-700 dark:text-[#E5E5E5] border-b border-gray-200 dark:border-[#2A2A2A]">Original filename</th>
                    <th className="text-left px-4 py-2.5 text-xs font-semibold text-gray-700 dark:text-[#E5E5E5] border-b border-gray-200 dark:border-[#2A2A2A]">AI-generated name</th>
                    <th className="text-left px-4 py-2.5 text-xs font-semibold text-gray-700 dark:text-[#E5E5E5] border-b border-gray-200 dark:border-[#2A2A2A]">SEO improvement</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100 dark:border-[#2A2A2A]">
                    <td className="px-4 py-2.5 text-gray-800 dark:text-[#E5E5E5] font-mono text-xs">IMG_5381.jpg</td>
                    <td className="px-4 py-2.5 text-gray-600 dark:text-[#A3A3A3] font-mono text-xs">woman-hiking-mountain-trail.jpg</td>
                    <td className="px-4 py-2.5 text-green-700 dark:text-green-500 font-medium text-xs">Searchable for hiking, woman, mountain</td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-[#2A2A2A]">
                    <td className="px-4 py-2.5 text-gray-800 dark:text-[#E5E5E5] font-mono text-xs">DSC_2847.JPG</td>
                    <td className="px-4 py-2.5 text-gray-600 dark:text-[#A3A3A3] font-mono text-xs">golden-retriever-playing-beach-sunset.jpg</td>
                    <td className="px-4 py-2.5 text-green-700 dark:text-green-500 font-medium text-xs">Strong for dog breed + location + time</td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-[#2A2A2A]">
                    <td className="px-4 py-2.5 text-gray-800 dark:text-[#E5E5E5] font-mono text-xs">PHOTO_20260315.jpg</td>
                    <td className="px-4 py-2.5 text-gray-600 dark:text-[#A3A3A3] font-mono text-xs">fresh-salad-with-tomato-cucumber-feta.jpg</td>
                    <td className="px-4 py-2.5 text-green-700 dark:text-green-500 font-medium text-xs">Ranks for food photography queries</td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-[#2A2A2A]">
                    <td className="px-4 py-2.5 text-gray-800 dark:text-[#E5E5E5] font-mono text-xs">pic1.jpg</td>
                    <td className="px-4 py-2.5 text-gray-600 dark:text-[#A3A3A3] font-mono text-xs">espresso-machine-gaggia-classic-counter.jpg</td>
                    <td className="px-4 py-2.5 text-green-700 dark:text-green-500 font-medium text-xs">Targets specific product + context</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2.5 text-gray-800 dark:text-[#E5E5E5] font-mono text-xs">vacation_photo_8.jpg</td>
                    <td className="px-4 py-2.5 text-gray-600 dark:text-[#A3A3A3] font-mono text-xs">piazza-san-marco-venice-italy-crowded.jpg</td>
                    <td className="px-4 py-2.5 text-green-700 dark:text-green-500 font-medium text-xs">Local SEO + landmark name</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
              How to batch rename photos with SammaPix AI Rename
            </h2>

            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              The{" "}
              <Link
                href="/tools/ai-rename"
                className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors"
              >
                SammaPix AI Rename tool
              </Link>{" "}
              makes batch renaming simple. No plugins, no desktop software, no
              complex setup. Here is the workflow:
            </p>

            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
              Step 1 - Select your photos
            </h3>

            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              Open AI Rename and drag a folder of photos onto the upload area.
              You can select 5–200+ images at once depending on your plan. The
              tool accepts JPG, PNG, WebP, GIF, and HEIC formats. Mixed formats
              in a single batch work perfectly.
            </p>

            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
              Step 2 - Configure naming style (optional)
            </h3>

            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              Choose how descriptive you want the names:
            </p>

            <ul className="mb-4">
              <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
                <strong className="text-gray-800 dark:text-[#E5E5E5]">Short (3 words):</strong> "woman-jogging-park.jpg"
              </li>
              <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
                <strong className="text-gray-800 dark:text-[#E5E5E5]">Medium (5 words):</strong> "woman-jogging-in-park-morning-light.jpg"
              </li>
              <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
                <strong className="text-gray-800 dark:text-[#E5E5E5]">Detailed (7+ words):</strong> "athletic-woman-jogging-on-forest-trail-at-sunrise.jpg"
              </li>
            </ul>

            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
              Step 3 - AI generates suggestions
            </h3>

            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              The AI analyzes each photo and proposes SEO-friendly names. The
              process takes 1–5 seconds per image depending on file size and
              internet speed. You see a preview of the new names side-by-side
              with your originals.
            </p>

            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
              Step 4 - Review and edit
            </h3>

            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              Accept names as-is, edit individual suggestions, or reject and
              regenerate. You have full control. If the AI suggests something
              inaccurate, change it in place. This takes seconds per image.
            </p>

            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
              Step 5 - Download renamed files
            </h3>

            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              Once you approve all names, download the renamed photos as
              individual files or as a ZIP archive. The original files stay in
              their original location. You get a new set with the SEO-friendly
              names applied.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
              Use cases where batch renaming with AI saves hours
            </h2>

            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
              Photographers and content creators
            </h3>

            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              After a shoot, a photographer might have 500+ photos. Renaming them
              manually would take 8+ hours. AI Rename does it in 5–10 minutes,
              with SEO-optimized names ready to upload to stock photo sites
              (Unsplash, Pexels, Shutterstock) immediately.
            </p>

            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
              E-commerce teams
            </h3>

            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              Product photos with generic names like "IMG_0001" hurt your image
              search visibility. Rename to "red-leather-handbag-large-capacity"
              and you rank for product-specific searches. Batch process entire
              product catalogs in minutes.
            </p>

            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
              Blog and content websites
            </h3>

            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              Each blog post uses 5–20 images. Descriptive filenames improve
              image search traffic and on-page SEO. Instead of uploading
              "screenshot1.png", use "wordpress-woocommerce-product-page-setup.png".
            </p>

            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
              Travel and lifestyle blogs
            </h3>

            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              Geographic data in filenames helps local SEO. "eiffel-tower-sunset-paris"
              ranks better than "vacation_pic_2.jpg". Batch rename 100+ travel
              photos with location and activity keywords instantly.
            </p>

            <figure className="my-8">
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80"
                alt="Team collaborating on digital media workflow with organized files and folders"
                className="w-full rounded-lg"
                loading="lazy"
              />
              <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
                AI batch renaming scales from single photos to thousands - Photo by Unsplash on Unsplash
              </figcaption>
            </figure>

            <h2 className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
              Complementary tools: combine renaming with other optimizations
            </h2>

            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              AI Rename is powerful on its own, but it works best as part of a
              complete image optimization workflow. After renaming, consider:
            </p>

            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
              Compress images for web
            </h3>

            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              SEO-friendly filenames are worthless if your images take 10 seconds
              to load. After renaming, use{" "}
              <Link
                href="/tools/compress"
                className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors"
              >
                SammaPix Compress
              </Link>{" "}
              to reduce file sizes by 50–80% without visible quality loss. Smaller
              files = faster loading = better SEO rankings and user experience.
            </p>

            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
              Convert to WebP for modern browsers
            </h3>

            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              After renaming and compressing, convert images to WebP format for
              an additional 25–35% file size reduction. The{" "}
              <Link
                href="/tools/webp"
                className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors"
              >
                SammaPix WebP converter
              </Link>{" "}
              maintains all your new filenames while converting the format.
            </p>

            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
              Remove EXIF data for privacy
            </h3>

            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              Before uploading renamed photos, consider removing EXIF metadata
              (GPS coordinates, camera model, timestamps). Good filenames improve
              SEO, but hidden location data is a privacy risk. Strip EXIF, keep
              filenames, publish with confidence.
            </p>

            <hr className="my-8 border-gray-100 dark:border-[#2A2A2A]" />

            <h2 className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
              FAQ
            </h2>

            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
              What is batch renaming photos with AI?
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              Batch renaming with AI automatically renames hundreds of photos at
              once using artificial intelligence. Instead of naming each file
              manually, AI analyzes the image content and generates descriptive,
              keyword-rich filenames that describe what is in each photo. This
              works for any image type— portraits, landscapes, products, food,
              animals, etc.
            </p>

            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
              Why does image filename matter for SEO?
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              Image filenames are a direct ranking signal for Google Image Search.
              A descriptive filename like "woman-running-forest.jpg" ranks better
              than "IMG_0001.jpg". Google uses filenames to understand image
              content, and keyword-rich filenames increase the chances your images
              appear in relevant search results. This is one of the easiest,
              highest-leverage SEO improvements available.
            </p>

            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
              How does SammaPix AI Rename work?
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              SammaPix AI Rename uses Google Gemini 1.5 Flash to analyze each
              image and generate a descriptive filename. The AI examines the visual
              content, identifies objects, people, scenes, and activities, then
              creates a concise, SEO-friendly name. Batch mode processes hundreds
              of photos at once. All processing happens in your browser— your
              images never leave your device or are stored on any server.
            </p>

            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
              Can I batch rename photos without uploading them?
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              Your full-resolution images never leave your device or are stored on
              a server. AI Rename sends only a small thumbnail to Google Gemini
              for analysis. The analysis happens in seconds, and the thumbnail is
              discarded immediately. Your original image files are never uploaded,
              stored, or retained.
            </p>

            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
              Is batch renaming with AI free?
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              SammaPix AI Rename is free for up to 5 renames per day on the free
              plan. For unlimited batch renaming and larger batches, upgrade to
              SammaPix Pro for $7/month. Pro gives you 200 AI renames per day,
              batch processing for up to 100 images at once, and ZIP download
              support.
            </p>

            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
              What file formats does AI Rename support?
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              SammaPix AI Rename supports JPG, PNG, WebP, GIF, and HEIC formats.
              You can rename photos from iPhones (HEIC), DSLRs (after RAW
              conversion to JPG), smartphones, and web images all in the same
              batch. Mixed formats work perfectly.
            </p>

          </div>

          {/* Share section */}
          <div className="mt-10 pt-6 border-t border-gray-100 dark:border-[#2A2A2A]">
            <p className="text-sm font-medium text-gray-700 dark:text-[#E5E5E5] mb-3">
              Share this article
            </p>
            <div className="flex items-center gap-3">
              <a
                href={twitterShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 border border-gray-200 dark:border-[#2A2A2A] rounded-md text-sm text-gray-600 dark:text-[#A3A3A3] hover:bg-gray-50 dark:hover:bg-[#252525] hover:text-gray-900 dark:hover:text-[#E5E5E5] transition-colors"
              >
                <svg
                  role="img"
                  viewBox="0 0 24 24"
                  className="h-4 w-4 fill-current"
                  aria-label="Share on X (Twitter)"
                >
                  <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
                </svg>
                Share on X
              </a>
              <a
                href={linkedinShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 border border-gray-200 dark:border-[#2A2A2A] rounded-md text-sm text-gray-600 dark:text-[#A3A3A3] hover:bg-gray-50 dark:hover:bg-[#252525] hover:text-gray-900 dark:hover:text-[#E5E5E5] transition-colors"
              >
                <svg
                  role="img"
                  viewBox="0 0 24 24"
                  className="h-4 w-4 fill-current"
                  aria-label="Share on LinkedIn"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                Share on LinkedIn
              </a>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-8 pt-8 border-t border-gray-100 dark:border-[#2A2A2A]">
            <div className="bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-900 rounded-md p-6">
              <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2">
                Start batch renaming with AI today
              </h3>
              <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-4">
                Transform generic filenames like IMG_0001.jpg into SEO-friendly
                names instantly. Free for 5 renames per day. Pro plan $7/month
                for unlimited renaming and larger batches.
              </p>
              <Link
                href="/tools/ai-rename"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
              >
                Try AI Rename — Free
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
            </div>
          </div>

          {/* Related articles */}
          <div className="mt-10 pt-8 border-t border-gray-100 dark:border-[#2A2A2A]">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-[#E5E5E5] mb-4">
              Related articles
            </h3>
            <div className="space-y-3">
              <Link
                href="/blog/ai-image-renaming-seo-guide"
                className="flex items-start gap-3 group"
              >
                <span className="text-xs font-medium uppercase tracking-wide shrink-0 mt-0.5 text-purple-700">
                  SEO
                </span>
                <span className="text-sm text-gray-600 dark:text-[#A3A3A3] group-hover:text-gray-900 dark:group-hover:text-[#E5E5E5] transition-colors">
                  How AI Image Renaming Boosts Your SEO (2026 Guide)
                </span>
              </Link>
              <Link
                href="/blog/compress-images-without-losing-quality"
                className="flex items-start gap-3 group"
              >
                <span className="text-xs font-medium uppercase tracking-wide shrink-0 mt-0.5 text-blue-700">
                  Performance
                </span>
                <span className="text-sm text-gray-600 dark:text-[#A3A3A3] group-hover:text-gray-900 dark:group-hover:text-[#E5E5E5] transition-colors">
                  How to Compress Images Without Losing Quality (2026 Guide)
                </span>
              </Link>
              <Link
                href="/blog/complete-guide-webp-format"
                className="flex items-start gap-3 group"
              >
                <span className="text-xs font-medium uppercase tracking-wide shrink-0 mt-0.5 text-blue-700">
                  Performance
                </span>
                <span className="text-sm text-gray-600 dark:text-[#A3A3A3] group-hover:text-gray-900 dark:group-hover:text-[#E5E5E5] transition-colors">
                  Complete Guide to WebP Format: Why & How to Use It
                </span>
              </Link>
            </div>
          </div>
        </article>

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
      </div>
    </div>
  );
}

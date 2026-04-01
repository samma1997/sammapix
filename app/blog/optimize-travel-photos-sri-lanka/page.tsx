import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { APP_URL } from "@/lib/constants";
import BlogArticleLayout from "@/components/blog/BlogArticleLayout";

export const metadata: Metadata = {
  title: "How I Optimized 71 Travel Photos from Sri Lanka in 5 Minutes",
  description:
    "I came home from Sri Lanka with 71 photos totaling 350MB+. Here's the exact browser-based workflow I used to compress, rename, and convert them all to WebP in under 5 minutes.",
  alternates: {
    canonical: `${APP_URL}/blog/optimize-travel-photos-sri-lanka`,
  },
  keywords: [
    "optimize travel photos for blog",
    "compress travel photos",
    "image workflow photography",
    "travel photo optimization",
    "batch compress images",
    "webp convert travel photos",
    "browser image optimizer",
    "sri lanka travel photography",
  ],
  openGraph: {
    title: "How I Optimized 71 Travel Photos from Sri Lanka in 5 Minutes",
    description:
      "71 photos, 350MB+, zero uploads to any server. The complete workflow I used to compress, AI-rename, and convert my Sri Lanka travel photos to web-ready WebP files.",
    url: `${APP_URL}/blog/optimize-travel-photos-sri-lanka`,
    type: "article",
    publishedTime: "2026-03-24",
    authors: ["https://lucasammarco.com"],
  },
  twitter: {
    card: "summary_large_image",
    title: "How I Optimized 71 Travel Photos from Sri Lanka in 5 Minutes",
    description:
      "71 travel photos, 350MB+, optimized in 5 minutes with a fully browser-based workflow. No uploads, no Photoshop, no plugins.",
    creator: "@lucasammarco",
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "How I Optimized 71 Travel Photos from Sri Lanka in 5 Minutes",
  description:
    "A first-person workflow walkthrough: compressing, AI-renaming, and converting 71 Sri Lanka travel photos to web-ready WebP files using browser-based tools.",
  url: `${APP_URL}/blog/optimize-travel-photos-sri-lanka`,
  datePublished: "2026-03-24",
  dateModified: "2026-03-24",
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
    "@id": `${APP_URL}/blog/optimize-travel-photos-sri-lanka`,
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
      name: "How I Optimized 71 Travel Photos from Sri Lanka in 5 Minutes",
      item: `${APP_URL}/blog/optimize-travel-photos-sri-lanka`,
    },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do I optimize travel photos for a blog without losing quality?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Use a three-step workflow: first compress your images at quality 78-82 (which reduces file size by 60-75% with no visible difference), then convert to WebP format for an additional 25-30% savings, and finally rename files with descriptive, keyword-rich names for SEO. Browser-based tools like SammaPix handle all three steps without uploading your photos to any server.",
      },
    },
    {
      "@type": "Question",
      name: "How long does it take to optimize a large batch of travel photos?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "With a browser-based batch workflow, 71 photos can be compressed, renamed, and converted in under 5 minutes. The key is using tools that process files in parallel on your device rather than uploading them one by one to a server. Drag all files at once, apply settings, and download the results as a ZIP.",
      },
    },
    {
      "@type": "Question",
      name: "Should I convert travel photos to WebP before uploading to my blog?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. WebP produces files 25-34% smaller than JPEG at equivalent visual quality, and browser support is now above 97%. Converting your travel photos to WebP before uploading means faster page loads, better Core Web Vitals scores, and lower bandwidth costs. The only exception is if you need to support very old email clients or legacy CMS systems that do not accept WebP.",
      },
    },
    {
      "@type": "Question",
      name: "Is it safe to compress photos in the browser instead of using desktop software?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, and it is actually more private. Browser-based compression processes your images entirely on your device using JavaScript APIs. Your files never leave your computer, no data is uploaded to any server, and the results are identical to what desktop software produces. It is also faster for batch operations since there is zero upload latency.",
      },
    },
  ],
};

export default function OptimizeTravelPhotosSriLankaPage() {
  return (
    <>
      <BlogArticleLayout
        title="How I Optimized 71 Travel Photos from Sri Lanka in 5 Minutes"
        slug="optimize-travel-photos-sri-lanka"
        description="In March 2025 I spent 16 days traveling across Sri Lanka- from Colombo's temples to Ella's tea plantations to the southern coast. I came home with 71 photos totaling over 350MB. Here's the exact browser-based workflow I used to compress, AI-rename, and convert all of them to web-ready files in under 5 minutes, without uploading a single image to any server."
        date="2026-03-24"
        dateFormatted="March 24, 2026"
        tags={["Workflow"]}
        readingTime={8}
        headings={[
          { id: "the-trip", title: "The trip: 16 days across Sri Lanka" },
          { id: "the-problem", title: "The problem: 350MB of unsorted photos" },
          { id: "the-workflow", title: "The 3-step workflow that fixed everything" },
          { id: "step-compress", title: "Step 1: Compress - 350MB down to 87MB" },
          { id: "step-rename", title: "Step 2: AI Rename - from IMG_3570 to SEO gold" },
          { id: "step-convert", title: "Step 3: WebP Convert - another 25% off" },
          { id: "results", title: "The results: 350MB to 65MB in 5 minutes" },
          { id: "why-browser-matters", title: "Why browser-based matters for travel photographers" },
          { id: "faq", title: "FAQ" },
        ]}
        summary={[
          "71 travel photos from Sri Lanka went from 350MB+ to 65MB using a three-step browser-based workflow: Compress, AI Rename, and WebP Convert.",
          "Compression at quality 80 reduced file sizes by 75% with zero visible quality difference on screen.",
          "AI Rename transformed generic IMG_3570.JPG filenames into descriptive, SEO-friendly names like gangaramaya-temple-buddha-statues-colombo-sri-lanka.webp.",
          "Everything ran in the browser- no uploads, no server processing, no privacy concerns with personal travel photos.",
          "The entire workflow for all 71 images took under 5 minutes, including download as a ZIP archive.",
        ]}
        heroImage={
          <figure>
            <img
              src="https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_1200/v1/sammapix/portfolio/sri-lanka/40-sigiriya-rock-fortress-panoramic-golden-hour-sri-lanka"
              alt="Panoramic view of Sigiriya Rock Fortress at golden hour, lush jungle canopy, hazy mountains in Dambulla, Sri Lanka"
              className="w-full rounded-lg"
              loading="eager"
            />
            <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
              Sigiriya Rock Fortress at golden hour - one of 71 photos from my Sri Lanka trip that needed optimizing
            </figcaption>
          </figure>
        }
        ctaBlock={
          <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2">
              Optimize your travel photos now- free, no upload
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-4">
              Drop your travel photos into SammaPix and compress, rename, and
              convert them to WebP in minutes. Everything runs in your browser-
              your photos never leave your device. Supports JPG, PNG, WebP,
              HEIC, and more.
            </p>
            <Link
              href="/tools/compress"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            >
              Try SammaPix Compress, Free
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>
        }
      >
        {/* Article body content */}

        <h2 id="the-trip" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          The trip: 16 days across Sri Lanka
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          In March 2025 I took a 16-day trip across Sri Lanka. The route went
          from Colombo south through Maharagama and Gampaha, then north to
          Kurunegala and the Cultural Triangle (Dambulla, Sigiriya), down
          through the hill country (Kandy, Nuwara Eliya), east to Badulla and
          the Ella train route, south to Matara and the coast, and back up to
          Negombo before flying home.
        </p>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          I shot everything on an iPhone 13 Pro. No tripod, no external lenses,
          no Lightroom presets. Just the default camera app, tapping the shutter
          whenever something caught my eye. Temples, street markets, tea
          plantations, train rides, wildlife, coastlines, portraits of people I
          met along the way.
        </p>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          By the time I landed back home, I had 71 keepers across 11 locations.
        </p>

        <figure className="my-8">
          <img
            src="https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_1200/v1/sammapix/portfolio/sri-lanka/01-gangaramaya-temple-buddha-statues-stupa-colombo-sri-lanka"
            alt="Gangaramaya Temple, Colombo, Sri Lanka: Serene Buddha statues line terraces leading to a modern, tiered stupa under a clear sky"
            className="w-full rounded-lg"
            loading="lazy"
          />
          <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
            Gangaramaya Temple in Colombo - the first photo of the trip. Originally named IMG_3570.JPG, 5.2MB
          </figcaption>
        </figure>

        <h2 id="the-problem" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          The problem: 350MB of unsorted photos
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Here is what I was looking at when I sat down to process them:
        </p>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">71 files</strong> named IMG_3570.JPG through IMG_5018.JPG
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Total size: 358MB</strong> (average 5MB per photo)
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Resolution: 3024x4032px</strong> each (12MP iPhone sensor)
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Filenames: meaningless</strong> - no human could tell IMG_4201 from IMG_4202
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Format: JPEG</strong> straight from camera, unoptimized
          </li>
        </ul>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          If I uploaded these directly to a blog or portfolio, each page would
          load megabytes of images that browsers would struggle to render
          quickly. Google would penalize the page speed, visitors on mobile
          would bounce, and the filenames would contribute zero SEO value.
          Not a great starting point.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          In the past I would have opened Photoshop, batch-resized, exported
          one by one, then manually renamed each file. That process takes 30-45
          minutes for 71 files, and it is mind-numbingly boring. This time I
          tried a different approach.
        </p>

        <h2 id="the-workflow" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          The 3-step workflow that fixed everything
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          I used three SammaPix tools in sequence, all running in the browser
          with zero uploads to any external server:
        </p>

        <ol className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">
              <Link href="/tools/compress" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">Compress</Link>
            </strong> - reduce file size by 75% with quality 80
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">
              <Link href="/tools/ai-rename" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">AI Rename</Link>
            </strong> - generate descriptive, SEO-friendly filenames
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">
              <Link href="/tools/webp" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">WebP Convert</Link>
            </strong> - switch format for another 25% savings
          </li>
        </ol>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Total time: under 5 minutes. Let me walk through each step.
        </p>

        <h2 id="step-compress" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Step 1: Compress - 350MB down to 87MB
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          I opened{" "}
          <Link
            href="/tools/compress"
            className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors"
          >
            SammaPix Compress
          </Link>
          , dragged all 71 JPEGs onto the drop zone, and set quality to 80.
          The tool processed every file in parallel, right in the browser tab.
          No upload bar, no waiting for a server response.
        </p>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The results were immediate. Average file size dropped from 5MB to
          about 1.2MB per image. Total folder size went from 358MB to roughly
          87MB- a 75.7% reduction. And when I opened the compressed files
          side by side with the originals at 100% zoom, I genuinely could not
          tell which was which.
        </p>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          That is the thing about quality 80 on modern JPEG encoders: the data
          being thrown away is data the human eye cannot perceive at normal
          viewing distances. The compressed version of this Dambulla Cave Temple
          photo is 1.1MB instead of 4.8MB- and it looks identical:
        </p>

        <figure className="my-8">
          <img
            src="https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_1200/v1/sammapix/portfolio/sri-lanka/34-dambulla-cave-temple-reclining-buddha-sri-lanka-murals"
            alt="Dambulla Cave Temple, Sri Lanka: Reclining Buddha, seated Buddha, vibrant ancient murals. Lotus flower offerings in sacred light"
            className="w-full rounded-lg"
            loading="lazy"
          />
          <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
            Dambulla Cave Temple - compressed from 4.8MB to 1.1MB at quality 80 with no visible difference
          </figcaption>
        </figure>

        <h2 id="step-rename" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Step 2: AI Rename - from IMG_3570 to SEO gold
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          This was the step that surprised me most. I loaded the same 71 files
          into{" "}
          <Link
            href="/tools/ai-rename"
            className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors"
          >
            SammaPix AI Rename
          </Link>
          . The tool analyzed each image using AI vision and generated a
          descriptive, keyword-rich filename.
        </p>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Here are some real before/after examples from my batch:
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border border-gray-200 dark:border-[#2A2A2A] rounded-md overflow-hidden">
            <thead>
              <tr className="bg-gray-50 dark:bg-[#252525]">
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-gray-700 dark:text-[#E5E5E5] border-b border-gray-200 dark:border-[#2A2A2A]">Original filename</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-gray-700 dark:text-[#E5E5E5] border-b border-gray-200 dark:border-[#2A2A2A]">AI-generated filename</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100 dark:border-[#2A2A2A]">
                <td className="px-4 py-2.5 text-gray-600 dark:text-[#A3A3A3] font-mono text-xs">IMG_3570.JPG</td>
                <td className="px-4 py-2.5 text-gray-800 dark:text-[#E5E5E5] font-mono text-xs">gangaramaya-temple-buddha-statues-stupa-colombo-sri-lanka.jpg</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-[#2A2A2A]">
                <td className="px-4 py-2.5 text-gray-600 dark:text-[#A3A3A3] font-mono text-xs">IMG_3812.JPG</td>
                <td className="px-4 py-2.5 text-gray-800 dark:text-[#E5E5E5] font-mono text-xs">sigiriya-rock-fortress-panoramic-golden-hour-sri-lanka.jpg</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-[#2A2A2A]">
                <td className="px-4 py-2.5 text-gray-600 dark:text-[#A3A3A3] font-mono text-xs">IMG_4105.JPG</td>
                <td className="px-4 py-2.5 text-gray-800 dark:text-[#E5E5E5] font-mono text-xs">nuwara-eliya-tea-plantation-drone-sunset-sri-lanka.jpg</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-[#2A2A2A]">
                <td className="px-4 py-2.5 text-gray-600 dark:text-[#A3A3A3] font-mono text-xs">IMG_4390.JPG</td>
                <td className="px-4 py-2.5 text-gray-800 dark:text-[#E5E5E5] font-mono text-xs">coconut-tree-hill-mirissa-sri-lanka-tropical-bay-view.jpg</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 text-gray-600 dark:text-[#A3A3A3] font-mono text-xs">IMG_5001.JPG</td>
                <td className="px-4 py-2.5 text-gray-800 dark:text-[#E5E5E5] font-mono text-xs">negombo-sri-lanka-fisherman-holding-dried-fish-portrait.jpg</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Every filename now contains the subject, location, and relevant
          keywords. When search engines crawl these images, the filenames alone
          tell Google exactly what each photo shows. That is free SEO that most
          photographers completely ignore.
        </p>

        <figure className="my-8">
          <img
            src="https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_1200/v1/sammapix/portfolio/sri-lanka/61-coconut-tree-hill-mirissa-sri-lanka-tropical-bay-view"
            alt="Coconut Tree Hill, Mirissa, Sri Lanka. Lush palm trees overlook a turquoise bay and sandy beach under a blue sky"
            className="w-full rounded-lg"
            loading="lazy"
          />
          <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
            This photo went from IMG_4390.JPG to coconut-tree-hill-mirissa-sri-lanka-tropical-bay-view.webp
          </figcaption>
        </figure>

        <h2 id="step-convert" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Step 3: WebP Convert - another 25% off
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The final step was converting from JPEG to WebP using the{" "}
          <Link
            href="/tools/webp"
            className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors"
          >
            SammaPix WebP converter
          </Link>
          . WebP is Google&apos;s modern image format, and it produces files 25-34%
          smaller than JPEG at equivalent perceptual quality. Browser support
          is above 97% in 2026, so there is no practical reason to stick with
          JPEG for web delivery.
        </p>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          I dragged the 71 compressed and renamed JPEGs into the converter. A
          few seconds later, every file was WebP. The total folder size dropped
          from 87MB to about 65MB- another 25% reduction on top of the
          compression savings.
        </p>

        <figure className="my-8">
          <img
            src="https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_1200/v1/sammapix/portfolio/sri-lanka/49-nuwara-eliya-sri-lanka-tea-factory-wilting-leaves-worker"
            alt="Green tea leaves drying in industrial trays at a tea factory in Nuwara Eliya, Sri Lanka. Worker visible in background"
            className="w-full rounded-lg"
            loading="lazy"
          />
          <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
            Nuwara Eliya tea factory - the rich greens and subtle textures survived compression and WebP conversion perfectly
          </figcaption>
        </figure>

        <h2 id="results" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          The results: 350MB to 65MB in 5 minutes
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Here is the complete breakdown of what happened to my 71 Sri Lanka
          photos:
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border border-gray-200 dark:border-[#2A2A2A] rounded-md overflow-hidden">
            <thead>
              <tr className="bg-gray-50 dark:bg-[#252525]">
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-gray-700 dark:text-[#E5E5E5] border-b border-gray-200 dark:border-[#2A2A2A]">Step</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-gray-700 dark:text-[#E5E5E5] border-b border-gray-200 dark:border-[#2A2A2A]">Total size</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-gray-700 dark:text-[#E5E5E5] border-b border-gray-200 dark:border-[#2A2A2A]">Reduction</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100 dark:border-[#2A2A2A]">
                <td className="px-4 py-2.5 text-gray-800 dark:text-[#E5E5E5]">Original (iPhone JPEGs)</td>
                <td className="px-4 py-2.5 text-gray-600 dark:text-[#A3A3A3]">358 MB</td>
                <td className="px-4 py-2.5 text-gray-600 dark:text-[#A3A3A3]">-</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-[#2A2A2A]">
                <td className="px-4 py-2.5 text-gray-800 dark:text-[#E5E5E5]">After Compress (quality 80)</td>
                <td className="px-4 py-2.5 text-gray-600 dark:text-[#A3A3A3]">87 MB</td>
                <td className="px-4 py-2.5 text-gray-600 dark:text-[#A3A3A3]">-75.7%</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-[#2A2A2A]">
                <td className="px-4 py-2.5 text-gray-800 dark:text-[#E5E5E5]">After AI Rename</td>
                <td className="px-4 py-2.5 text-gray-600 dark:text-[#A3A3A3]">87 MB</td>
                <td className="px-4 py-2.5 text-gray-600 dark:text-[#A3A3A3]">0% (metadata only)</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 text-gray-800 dark:text-[#E5E5E5] font-medium">After WebP Convert</td>
                <td className="px-4 py-2.5 text-gray-800 dark:text-[#E5E5E5] font-medium">65 MB</td>
                <td className="px-4 py-2.5 text-gray-800 dark:text-[#E5E5E5] font-medium">-81.8% total</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          From 358MB down to 65MB. That is an 81.8% reduction in total file
          size, with no visible quality loss and every file now carrying a
          descriptive, SEO-optimized filename. The entire process took less
          time than it takes to make a cup of tea.
        </p>

        <figure className="my-8">
          <img
            src="https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_1200/v1/sammapix/portfolio/sri-lanka/15-maharagama-sri-lanka-elephant-mahout-tropical-bond"
            alt="Mahout stands before a majestic Asian elephant in Maharagama, Sri Lanka. Lush tropical foliage and subtle golden sunlight"
            className="w-full rounded-lg"
            loading="lazy"
          />
          <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
            An elephant and its mahout in Maharagama - even complex textures like elephant skin survived the optimization perfectly
          </figcaption>
        </figure>

        <h2 id="why-browser-matters" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Why browser-based matters for travel photographers
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Most image optimization tools require you to upload your photos to a
          server. For personal travel photos, that is a privacy problem I am not
          comfortable with. My Sri Lanka photos include portraits of people I
          met, GPS-tagged locations, and personal moments. I do not want those
          sitting on someone else&apos;s server.
        </p>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          With browser-based processing, every step happened locally on my
          laptop. The files never left my machine. The compression runs in a
          Web Worker using the Canvas API, the WebP conversion uses the
          browser&apos;s native encoder, and the AI rename sends only a tiny
          thumbnail to the AI model- never the full-resolution original.
        </p>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          There is also a speed advantage. Uploading 358MB of photos to a
          server and waiting for them to be processed and downloaded would take
          considerably longer than 5 minutes, even on a fast connection. Local
          processing eliminates that entire round trip.
        </p>

        <figure className="my-8">
          <img
            src="https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_1200/v1/sammapix/portfolio/sri-lanka/66-negombo-sri-lanka-fisherman-holding-dried-fish-portrait"
            alt="Smiling Sri Lankan fisherman in Negombo holding a large, sun-dried fish, with ocean background"
            className="w-full rounded-lg"
            loading="lazy"
          />
          <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
            A Negombo fisherman - the kind of personal travel portrait I would never upload to a random server for processing
          </figcaption>
        </figure>

        <hr className="my-8 border-gray-100 dark:border-[#2A2A2A]" />

        <h2 id="faq" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          FAQ
        </h2>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          How do I optimize travel photos for a blog without losing quality?
        </h3>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Use a three-step workflow: first compress your images at quality 78-82
          (which reduces file size by 60-75% with no visible difference), then
          convert to WebP format for an additional 25-30% savings, and finally
          rename files with descriptive, keyword-rich names for SEO.
          Browser-based tools like SammaPix handle all three steps without
          uploading your photos to any server.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          How long does it take to optimize a large batch of travel photos?
        </h3>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          With a browser-based batch workflow, 71 photos can be compressed,
          renamed, and converted in under 5 minutes. The key is using tools that
          process files in parallel on your device rather than uploading them one
          by one to a server. Drag all files at once, apply settings, and
          download the results as a ZIP.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Should I convert travel photos to WebP before uploading to my blog?
        </h3>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Yes. WebP produces files 25-34% smaller than JPEG at equivalent visual
          quality, and browser support is now above 97%. Converting your travel
          photos to WebP before uploading means faster page loads, better Core
          Web Vitals scores, and lower bandwidth costs. The only exception is if
          you need to support very old email clients or legacy CMS systems that
          do not accept WebP.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Is it safe to compress photos in the browser instead of using desktop software?
        </h3>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Yes, and it is actually more private. Browser-based compression
          processes your images entirely on your device using JavaScript APIs.
          Your files never leave your computer, no data is uploaded to any
          server, and the results are identical to what desktop software
          produces. It is also faster for batch operations since there is zero
          upload latency.
        </p>
      </BlogArticleLayout>

      {/* Schema stays outside the client component */}
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

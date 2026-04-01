import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { APP_URL } from "@/lib/constants";
import BlogArticleLayout from "@/components/blog/BlogArticleLayout";

export const metadata: Metadata = {
  title: "I Used AI to Rename 71 Photos for SEO: Here's What Happened",
  description:
    "I renamed 71 travel photos from generic IMG_3570.JPG filenames to descriptive, keyword-rich names using AI. Here are the real results and why image filenames matter for SEO.",
  alternates: {
    canonical: `${APP_URL}/blog/ai-rename-travel-photos-seo-results`,
  },
  keywords: [
    "ai rename photos seo",
    "rename images for seo",
    "photo filename seo",
    "image file name optimization",
    "ai image renaming",
    "seo friendly image names",
    "rename photos automatically",
    "image seo filenames",
  ],
  openGraph: {
    title: "I Used AI to Rename 71 Photos for SEO: Here's What Happened",
    description:
      "71 travel photos renamed from IMG_3570.JPG to descriptive, SEO-optimized filenames using AI vision. Real before/after examples and the impact on Google Image Search.",
    url: `${APP_URL}/blog/ai-rename-travel-photos-seo-results`,
    type: "article",
    publishedTime: "2026-03-24",
    authors: ["https://lucasammarco.com"],
  },
  twitter: {
    card: "summary_large_image",
    title: "I Used AI to Rename 71 Photos for SEO: Here's What Happened",
    description:
      "From IMG_3570.JPG to gangaramaya-temple-buddha-statues-colombo-sri-lanka.webp. How AI-powered renaming transformed 71 travel photos into SEO assets.",
    creator: "@lucasammarco",
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "I Used AI to Rename 71 Photos for SEO: Here's What Happened",
  description:
    "A real-world experiment: using AI to rename 71 Sri Lanka travel photos from generic camera filenames to descriptive, SEO-optimized names. Before/after examples and results.",
  url: `${APP_URL}/blog/ai-rename-travel-photos-seo-results`,
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
    "@id": `${APP_URL}/blog/ai-rename-travel-photos-seo-results`,
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
      name: "I Used AI to Rename 71 Photos for SEO",
      item: `${APP_URL}/blog/ai-rename-travel-photos-seo-results`,
    },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Do image filenames actually affect SEO rankings?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Google has confirmed that image filenames are used as a ranking signal for Google Image Search. A file named 'gangaramaya-temple-buddha-statues-colombo-sri-lanka.webp' tells Google exactly what the image shows, while 'IMG_3570.JPG' provides zero context. Descriptive filenames also correlate with better alt text and surrounding content, which further strengthens image SEO signals.",
      },
    },
    {
      "@type": "Question",
      name: "What makes a good SEO image filename?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A good SEO image filename is descriptive, uses hyphens to separate words, includes relevant keywords naturally, and identifies the subject and location. For example: 'nuwara-eliya-tea-plantation-sunset-sri-lanka.webp'. Keep filenames under 60 characters, avoid special characters, underscores, or spaces, and use lowercase only. The filename should read like a natural description of what the image shows.",
      },
    },
    {
      "@type": "Question",
      name: "Can AI accurately rename photos based on their content?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Modern AI vision models can identify subjects, locations, objects, activities, and even cultural contexts in photographs with high accuracy. In a test of 71 diverse travel photos from Sri Lanka, AI correctly identified temples, wildlife, landscapes, portraits, and cultural scenes in every case, generating filenames that accurately described the image content and included relevant SEO keywords.",
      },
    },
    {
      "@type": "Question",
      name: "How many photos can I rename with AI at once?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "With SammaPix AI Rename, free users can rename up to 10 images per day, and Pro users get 200 per day. The tool processes images in batch, so you drag your files onto the drop zone and get all the renamed files back at once. For 71 photos, a Pro account handles the entire batch in a single session.",
      },
    },
  ],
};

export default function AiRenameTravelPhotosSeoResultsPage() {
  return (
    <>
      <BlogArticleLayout
        title="I Used AI to Rename 71 Photos for SEO: Here's What Happened"
        slug="ai-rename-travel-photos-seo-results"
        description="Every photo I took in Sri Lanka was named IMG_something.JPG. That means 71 images with zero SEO value in their filenames. I ran them all through an AI renaming tool and the results changed how I think about image optimization. Here's the full experiment with real before/after examples."
        date="2026-03-24"
        dateFormatted="March 24, 2026"
        tags={["SEO"]}
        readingTime={9}
        headings={[
          { id: "the-problem", title: "The problem: 71 photos named IMG_something" },
          { id: "why-filenames-matter", title: "Why image filenames matter for SEO" },
          { id: "the-experiment", title: "The experiment: AI rename on 71 real photos" },
          { id: "real-results", title: "The real results: 71 before/after filenames" },
          { id: "patterns", title: "What the AI got right (and what I learned)" },
          { id: "alt-text-correlation", title: "The filename-to-alt-text pipeline" },
          { id: "how-to-do-it", title: "How to rename your own photos with AI" },
          { id: "faq", title: "FAQ" },
        ]}
        summary={[
          "Image filenames are a confirmed Google ranking signal for Image Search - generic names like IMG_3570.JPG contribute zero SEO value.",
          "AI vision analyzed 71 Sri Lanka travel photos and generated descriptive, keyword-rich filenames that accurately identified subjects, locations, and cultural context.",
          "Good image filenames follow a pattern: subject-descriptor-location-country, using hyphens, lowercase, and under 60 characters.",
          "Descriptive filenames create a natural pipeline to better alt text, which further strengthens image SEO signals.",
          "The entire renaming process for 71 photos took under 2 minutes using browser-based AI, with no manual work required.",
        ]}
        heroImage={
          <figure>
            <img
              src="https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_1200/v1/sammapix/portfolio/sri-lanka/46-kandy-sri-lanka-temple-sacred-tooth-relic-daylight"
              alt="Ancient Temple of the Sacred Tooth Relic, Kandy, Sri Lanka. Intricate white walls, sacred moat reflecting sky, red tiled roof, Buddhist flags"
              className="w-full rounded-lg"
              loading="eager"
            />
            <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
              This was IMG_4055.JPG. Now it is kandy-sri-lanka-temple-sacred-tooth-relic-daylight.webp. Google can read the difference.
            </figcaption>
          </figure>
        }
        ctaBlock={
          <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2">
              Rename your photos with AI- free, instant
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-4">
              Drop your images into SammaPix AI Rename and get descriptive,
              SEO-friendly filenames in seconds. The AI analyzes what each photo
              shows and generates keyword-rich names automatically. No manual
              work required.
            </p>
            <Link
              href="/tools/ai-rename"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            >
              Try SammaPix AI Rename, Free
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>
        }
      >
        {/* Article body content */}

        <h2 id="the-problem" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          The problem: 71 photos named IMG_something
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          I spent 16 days traveling across Sri Lanka in March 2025. Colombo,
          Kandy, Nuwara Eliya, the hill country train to Ella, the southern
          coast, and back to Negombo. I came home with 71 photos shot on an
          iPhone 13 Pro- temples, wildlife, tea plantations, street scenes,
          portraits, landscapes across 11 different locations.
        </p>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Every single photo was named by the camera: IMG_3570.JPG,
          IMG_3571.JPG, IMG_3572.JPG... all the way through IMG_5018.JPG.
          Seventy-one files where the filename tells you absolutely nothing
          about what the image actually shows.
        </p>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          If you are a photographer, blogger, or website owner, this is a
          problem you have probably ignored. I certainly had for years. But
          image filenames are one of the most overlooked and easiest SEO wins
          available, and I wanted to see exactly how much of a difference
          proper naming makes.
        </p>

        <figure className="my-8">
          <img
            src="https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_1200/v1/sammapix/portfolio/sri-lanka/01-gangaramaya-temple-buddha-statues-stupa-colombo-sri-lanka"
            alt="Gangaramaya Temple, Colombo, Sri Lanka: Serene Buddha statues line terraces leading to a modern, tiered stupa under a clear sky"
            className="w-full rounded-lg"
            loading="lazy"
          />
          <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
            IMG_3570.JPG tells Google nothing. gangaramaya-temple-buddha-statues-stupa-colombo-sri-lanka.webp tells Google everything.
          </figcaption>
        </figure>

        <h2 id="why-filenames-matter" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Why image filenames matter for SEO
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Google has been explicit about this. Their{" "}
          <a
            href="https://developers.google.com/search/docs/appearance/google-images"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors"
          >
            image SEO best practices
          </a>{" "}
          documentation states: &ldquo;The filename can give Google clues about
          the subject matter of the image. For example,
          my-new-black-kitten.jpg is better than IMG00023.JPG.&rdquo;
        </p>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Here is why image filenames carry weight in search:
        </p>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Google Image Search ranking signal:</strong> The filename is one of the first signals Google uses to understand what an image depicts. A descriptive filename helps Google match your image to relevant search queries.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">URL structure:</strong> Image filenames become part of the image URL. Search engines parse URLs for keyword relevance, just as they do for page URLs.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Alt text correlation:</strong> When a filename is descriptive, the alt text tends to be more descriptive too. This creates a compounding SEO effect where multiple signals reinforce each other.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Accessibility fallback:</strong> Screen readers sometimes reference filenames. A descriptive filename provides a baseline of context even if alt text is missing.
          </li>
        </ul>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The bottom line: every image named IMG_3570.JPG is a missed
          opportunity. And when you have 71 of them, that is 71 missed
          opportunities on a single page or portfolio.
        </p>

        <h2 id="the-experiment" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          The experiment: AI rename on 71 real photos
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          I loaded all 71 Sri Lanka photos into{" "}
          <Link
            href="/tools/ai-rename"
            className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors"
          >
            SammaPix AI Rename
          </Link>
          . The tool works by sending a small thumbnail of each image to an AI
          vision model (Google Gemini), which analyzes the visual content and
          generates a descriptive filename. The original full-resolution file
          never leaves your browser- only the thumbnail goes to the AI.
        </p>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The photos covered an extremely diverse range of subjects: Buddhist
          temples and statues, urban street markets, elephant encounters, cave
          temple interiors, mountain landscapes, tea factory interiors, train
          journeys, fishing harbors, coastal scenes, and intimate portraits.
          A real stress test for any AI vision system.
        </p>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Processing all 71 images took about 90 seconds. Here is what came out.
        </p>

        <h2 id="real-results" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          The real results: 71 before/after filenames
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Here is a selection of the actual before and after filenames, grouped
          by location and subject type. Every filename shown below is real, not
          a hypothetical example.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Temples and religious sites
        </h3>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border border-gray-200 dark:border-[#2A2A2A] rounded-md overflow-hidden">
            <thead>
              <tr className="bg-gray-50 dark:bg-[#252525]">
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-gray-700 dark:text-[#E5E5E5] border-b border-gray-200 dark:border-[#2A2A2A]">Original</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-gray-700 dark:text-[#E5E5E5] border-b border-gray-200 dark:border-[#2A2A2A]">AI-generated name</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100 dark:border-[#2A2A2A]">
                <td className="px-4 py-2.5 text-gray-600 dark:text-[#A3A3A3] font-mono text-xs">IMG_3570.JPG</td>
                <td className="px-4 py-2.5 text-gray-800 dark:text-[#E5E5E5] font-mono text-xs">gangaramaya-temple-buddha-statues-stupa-colombo-sri-lanka</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-[#2A2A2A]">
                <td className="px-4 py-2.5 text-gray-600 dark:text-[#A3A3A3] font-mono text-xs">IMG_3575.JPG</td>
                <td className="px-4 py-2.5 text-gray-800 dark:text-[#E5E5E5] font-mono text-xs">gangaramaya-temple-buddha-statues-interior-colombo-sri-lanka</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-[#2A2A2A]">
                <td className="px-4 py-2.5 text-gray-600 dark:text-[#A3A3A3] font-mono text-xs">IMG_3580.JPG</td>
                <td className="px-4 py-2.5 text-gray-800 dark:text-[#E5E5E5] font-mono text-xs">golden-buddha-statue-serene-face-colombo-sri-lanka</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-[#2A2A2A]">
                <td className="px-4 py-2.5 text-gray-600 dark:text-[#A3A3A3] font-mono text-xs">IMG_3700.JPG</td>
                <td className="px-4 py-2.5 text-gray-800 dark:text-[#E5E5E5] font-mono text-xs">dambulla-cave-temple-reclining-buddha-sri-lanka-murals</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 text-gray-600 dark:text-[#A3A3A3] font-mono text-xs">IMG_4055.JPG</td>
                <td className="px-4 py-2.5 text-gray-800 dark:text-[#E5E5E5] font-mono text-xs">kandy-sri-lanka-temple-sacred-tooth-relic-daylight</td>
              </tr>
            </tbody>
          </table>
        </div>

        <figure className="my-8">
          <img
            src="https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_1200/v1/sammapix/portfolio/sri-lanka/34-dambulla-cave-temple-reclining-buddha-sri-lanka-murals"
            alt="Dambulla Cave Temple, Sri Lanka: Reclining Buddha, seated Buddha, vibrant ancient murals. Lotus flower offerings in sacred light"
            className="w-full rounded-lg"
            loading="lazy"
          />
          <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
            The AI identified this as a reclining Buddha at Dambulla Cave Temple with ancient murals - all from the image content alone
          </figcaption>
        </figure>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Landscapes and nature
        </h3>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border border-gray-200 dark:border-[#2A2A2A] rounded-md overflow-hidden">
            <thead>
              <tr className="bg-gray-50 dark:bg-[#252525]">
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-gray-700 dark:text-[#E5E5E5] border-b border-gray-200 dark:border-[#2A2A2A]">Original</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-gray-700 dark:text-[#E5E5E5] border-b border-gray-200 dark:border-[#2A2A2A]">AI-generated name</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100 dark:border-[#2A2A2A]">
                <td className="px-4 py-2.5 text-gray-600 dark:text-[#A3A3A3] font-mono text-xs">IMG_3812.JPG</td>
                <td className="px-4 py-2.5 text-gray-800 dark:text-[#E5E5E5] font-mono text-xs">sigiriya-rock-fortress-panoramic-golden-hour-sri-lanka</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-[#2A2A2A]">
                <td className="px-4 py-2.5 text-gray-600 dark:text-[#A3A3A3] font-mono text-xs">IMG_3815.JPG</td>
                <td className="px-4 py-2.5 text-gray-800 dark:text-[#E5E5E5] font-mono text-xs">pidurangala-rock-panoramic-jungle-view-sri-lanka</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-[#2A2A2A]">
                <td className="px-4 py-2.5 text-gray-600 dark:text-[#A3A3A3] font-mono text-xs">IMG_4105.JPG</td>
                <td className="px-4 py-2.5 text-gray-800 dark:text-[#E5E5E5] font-mono text-xs">nuwara-eliya-tea-plantation-drone-sunset-sri-lanka</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 text-gray-600 dark:text-[#A3A3A3] font-mono text-xs">IMG_4390.JPG</td>
                <td className="px-4 py-2.5 text-gray-800 dark:text-[#E5E5E5] font-mono text-xs">coconut-tree-hill-mirissa-sri-lanka-tropical-bay-view</td>
              </tr>
            </tbody>
          </table>
        </div>

        <figure className="my-8">
          <img
            src="https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_1200/v1/sammapix/portfolio/sri-lanka/50-nuwara-eliya-tea-plantation-drone-sunset-sri-lanka"
            alt="Nuwara Eliya tea country sunset: man flying drone over lush green plantations, child watching, golden hour light, Sri Lanka"
            className="w-full rounded-lg"
            loading="lazy"
          />
          <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
            The AI identified the tea plantation, the drone, the sunset lighting, and the Nuwara Eliya location - all from visual analysis
          </figcaption>
        </figure>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          People, culture, and street life
        </h3>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border border-gray-200 dark:border-[#2A2A2A] rounded-md overflow-hidden">
            <thead>
              <tr className="bg-gray-50 dark:bg-[#252525]">
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-gray-700 dark:text-[#E5E5E5] border-b border-gray-200 dark:border-[#2A2A2A]">Original</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-gray-700 dark:text-[#E5E5E5] border-b border-gray-200 dark:border-[#2A2A2A]">AI-generated name</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100 dark:border-[#2A2A2A]">
                <td className="px-4 py-2.5 text-gray-600 dark:text-[#A3A3A3] font-mono text-xs">IMG_4060.JPG</td>
                <td className="px-4 py-2.5 text-gray-800 dark:text-[#E5E5E5] font-mono text-xs">kandy-sri-lanka-traditional-drummer-temple-ceremony</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-[#2A2A2A]">
                <td className="px-4 py-2.5 text-gray-600 dark:text-[#A3A3A3] font-mono text-xs">IMG_4065.JPG</td>
                <td className="px-4 py-2.5 text-gray-800 dark:text-[#E5E5E5] font-mono text-xs">kandy-sri-lanka-elderly-man-portrait-local-cafe-life</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-[#2A2A2A]">
                <td className="px-4 py-2.5 text-gray-600 dark:text-[#A3A3A3] font-mono text-xs">IMG_5001.JPG</td>
                <td className="px-4 py-2.5 text-gray-800 dark:text-[#E5E5E5] font-mono text-xs">negombo-sri-lanka-fisherman-holding-dried-fish-portrait</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 text-gray-600 dark:text-[#A3A3A3] font-mono text-xs">IMG_4500.JPG</td>
                <td className="px-4 py-2.5 text-gray-800 dark:text-[#E5E5E5] font-mono text-xs">matara-sri-lanka-coastline-palm-trees-indian-ocean-view</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Wildlife and trains
        </h3>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border border-gray-200 dark:border-[#2A2A2A] rounded-md overflow-hidden">
            <thead>
              <tr className="bg-gray-50 dark:bg-[#252525]">
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-gray-700 dark:text-[#E5E5E5] border-b border-gray-200 dark:border-[#2A2A2A]">Original</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-gray-700 dark:text-[#E5E5E5] border-b border-gray-200 dark:border-[#2A2A2A]">AI-generated name</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100 dark:border-[#2A2A2A]">
                <td className="px-4 py-2.5 text-gray-600 dark:text-[#A3A3A3] font-mono text-xs">IMG_3640.JPG</td>
                <td className="px-4 py-2.5 text-gray-800 dark:text-[#E5E5E5] font-mono text-xs">maharagama-sri-lanka-elephant-mahout-tropical-bond</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-[#2A2A2A]">
                <td className="px-4 py-2.5 text-gray-600 dark:text-[#A3A3A3] font-mono text-xs">IMG_3750.JPG</td>
                <td className="px-4 py-2.5 text-gray-800 dark:text-[#E5E5E5] font-mono text-xs">sri-lanka-toque-macaque-temple-spirit-wildlife</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-[#2A2A2A]">
                <td className="px-4 py-2.5 text-gray-600 dark:text-[#A3A3A3] font-mono text-xs">IMG_4200.JPG</td>
                <td className="px-4 py-2.5 text-gray-800 dark:text-[#E5E5E5] font-mono text-xs">sri-lanka-ella-train-journey-jungle-hill-country</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 text-gray-600 dark:text-[#A3A3A3] font-mono text-xs">IMG_4210.JPG</td>
                <td className="px-4 py-2.5 text-gray-800 dark:text-[#E5E5E5] font-mono text-xs">badulla-sri-lanka-smiling-train-conductor-rainy-day</td>
              </tr>
            </tbody>
          </table>
        </div>

        <figure className="my-8">
          <img
            src="https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_1200/v1/sammapix/portfolio/sri-lanka/54-sri-lanka-ella-train-journey-jungle-hill-country"
            alt="Iconic blue-red Sri Lankan train winding through lush hill country jungle, man in open doorway, Ella railway journey"
            className="w-full rounded-lg"
            loading="lazy"
          />
          <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
            The famous Ella train ride - the AI identified the blue-red train, the jungle setting, and the hill country context
          </figcaption>
        </figure>

        <h2 id="patterns" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          What the AI got right (and what I learned)
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          After reviewing all 71 renamed files, several patterns stood out:
        </p>

        <p className="text-sm font-semibold text-gray-800 dark:text-[#E5E5E5] mt-4 mb-1">
          It identified specific landmarks.
        </p>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The AI recognized Gangaramaya Temple, Sigiriya Rock Fortress, Dambulla
          Cave Temple, the Temple of the Sacred Tooth Relic in Kandy, and
          Coconut Tree Hill in Mirissa. These are not generic &ldquo;temple&rdquo;
          or &ldquo;mountain&rdquo; labels- they are the actual place names,
          which carry significantly more SEO weight.
        </p>

        <p className="text-sm font-semibold text-gray-800 dark:text-[#E5E5E5] mt-4 mb-1">
          It included geographic context.
        </p>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Nearly every filename includes &ldquo;sri-lanka&rdquo; and the
          specific city or region (Colombo, Kandy, Nuwara Eliya, Matara,
          Negombo). This is critical for travel photography SEO because people
          search for images by location: &ldquo;Sigiriya rock fortress
          photos,&rdquo; &ldquo;Kandy temple Sri Lanka,&rdquo;
          &ldquo;Negombo fisherman.&rdquo;
        </p>

        <p className="text-sm font-semibold text-gray-800 dark:text-[#E5E5E5] mt-4 mb-1">
          It captured mood and time of day.
        </p>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Filenames like &ldquo;sigiriya-rock-fortress-panoramic-golden-hour&rdquo;
          and &ldquo;nuwara-eliya-tea-plantation-drone-sunset&rdquo; include
          lighting and mood descriptors. These match how people actually
          search for photography: &ldquo;Sigiriya golden hour photo&rdquo; or
          &ldquo;Sri Lanka sunset tea plantation.&rdquo;
        </p>

        <p className="text-sm font-semibold text-gray-800 dark:text-[#E5E5E5] mt-4 mb-1">
          The naming pattern is consistent.
        </p>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Every filename follows the same structure:
          <code className="text-xs bg-gray-100 dark:bg-[#252525] px-1.5 py-0.5 rounded mx-1">
            subject-descriptor-location-country
          </code>
          with hyphens separating words, all lowercase, no special characters.
          This consistency is something you would struggle to maintain if
          renaming 71 files manually- your naming convention would drift by
          file 20.
        </p>

        <figure className="my-8">
          <img
            src="https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_1200/v1/sammapix/portfolio/sri-lanka/32-sri-lanka-toque-macaque-temple-spirit-wildlife"
            alt="Sri Lankan Toque Macaque monkey, pink face, shaggy hair, sits on temple wall near burning oil lamps, Sri Lanka"
            className="w-full rounded-lg"
            loading="lazy"
          />
          <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
            The AI identified the specific species (Toque Macaque) and the temple context - not just &ldquo;monkey.jpg&rdquo;
          </figcaption>
        </figure>

        <h2 id="alt-text-correlation" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          The filename-to-alt-text pipeline
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Here is something I did not expect: once your filenames are
          descriptive, writing alt text becomes trivial. The filename
          essentially is the alt text, just with hyphens instead of spaces.
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border border-gray-200 dark:border-[#2A2A2A] rounded-md overflow-hidden">
            <thead>
              <tr className="bg-gray-50 dark:bg-[#252525]">
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-gray-700 dark:text-[#E5E5E5] border-b border-gray-200 dark:border-[#2A2A2A]">Filename</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-gray-700 dark:text-[#E5E5E5] border-b border-gray-200 dark:border-[#2A2A2A]">Natural alt text</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100 dark:border-[#2A2A2A]">
                <td className="px-4 py-2.5 text-gray-600 dark:text-[#A3A3A3] font-mono text-xs">negombo-sri-lanka-fisherman-holding-dried-fish-portrait</td>
                <td className="px-4 py-2.5 text-gray-800 dark:text-[#E5E5E5] text-xs">Negombo Sri Lanka fisherman holding dried fish portrait</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-[#2A2A2A]">
                <td className="px-4 py-2.5 text-gray-600 dark:text-[#A3A3A3] font-mono text-xs">sigiriya-rock-fortress-monkeys-sunset-sri-lanka-jungle</td>
                <td className="px-4 py-2.5 text-gray-800 dark:text-[#E5E5E5] text-xs">Sigiriya Rock Fortress with monkeys at sunset, Sri Lanka jungle</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 text-gray-600 dark:text-[#A3A3A3] font-mono text-xs">gampaha-sri-lanka-buddhist-temple-oil-lamps-devotion</td>
                <td className="px-4 py-2.5 text-gray-800 dark:text-[#E5E5E5] text-xs">Gampaha Sri Lanka Buddhist temple oil lamps devotion</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          This creates a compounding SEO effect. The filename, the alt text,
          and the surrounding content all reinforce the same keywords. Google
          sees three consistent signals about what the image shows, rather than
          an opaque IMG_3570 filename with manually written alt text that may or
          may not match.
        </p>

        <figure className="my-8">
          <img
            src="https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_1200/v1/sammapix/portfolio/sri-lanka/66-negombo-sri-lanka-fisherman-holding-dried-fish-portrait"
            alt="Smiling Sri Lankan fisherman in Negombo holding a large, sun-dried fish, with ocean background"
            className="w-full rounded-lg"
            loading="lazy"
          />
          <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
            negombo-sri-lanka-fisherman-holding-dried-fish-portrait.webp - the filename, alt text, and caption all work together for SEO
          </figcaption>
        </figure>

        <h2 id="how-to-do-it" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          How to rename your own photos with AI
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          If you want to replicate this workflow with your own photos, the
          process is straightforward:
        </p>

        <ol className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Open{" "}
              <Link href="/tools/ai-rename" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">SammaPix AI Rename</Link>
            </strong> and sign in (the tool requires a free account to prevent API abuse)
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Drag your photos</strong> onto the drop zone- you can do up to 20 at a time on the free plan
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Review the suggested names</strong> - the AI generates a preview so you can adjust before committing
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Download</strong> the renamed files individually or as a ZIP archive
          </li>
        </ol>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          For best results, pair AI Rename with{" "}
          <Link
            href="/tools/compress"
            className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors"
          >
            SammaPix Compress
          </Link>{" "}
          and{" "}
          <Link
            href="/tools/webp"
            className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors"
          >
            WebP Convert
          </Link>
          . The full workflow (compress, rename, convert) takes under 5 minutes
          for 71 photos and gives you web-ready, SEO-optimized images with no
          manual effort.
        </p>

        <hr className="my-8 border-gray-100 dark:border-[#2A2A2A]" />

        <h2 id="faq" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          FAQ
        </h2>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Do image filenames actually affect SEO rankings?
        </h3>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Yes. Google has confirmed that image filenames are used as a ranking
          signal for Google Image Search. A file named
          &ldquo;gangaramaya-temple-buddha-statues-colombo-sri-lanka.webp&rdquo;
          tells Google exactly what the image shows, while
          &ldquo;IMG_3570.JPG&rdquo; provides zero context. Descriptive
          filenames also correlate with better alt text and surrounding content,
          which further strengthens image SEO signals.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          What makes a good SEO image filename?
        </h3>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          A good SEO image filename is descriptive, uses hyphens to separate
          words, includes relevant keywords naturally, and identifies the
          subject and location. For example:
          &ldquo;nuwara-eliya-tea-plantation-sunset-sri-lanka.webp&rdquo;. Keep
          filenames under 60 characters, avoid special characters, underscores,
          or spaces, and use lowercase only. The filename should read like a
          natural description of what the image shows.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Can AI accurately rename photos based on their content?
        </h3>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Modern AI vision models can identify subjects, locations, objects,
          activities, and even cultural contexts in photographs with high
          accuracy. In a test of 71 diverse travel photos from Sri Lanka, AI
          correctly identified temples, wildlife, landscapes, portraits, and
          cultural scenes in every case, generating filenames that accurately
          described the image content and included relevant SEO keywords.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          How many photos can I rename with AI at once?
        </h3>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          With SammaPix AI Rename, free users can rename up to 10 images per
          day, and Pro users get 200 per day. The tool processes images in
          batch, so you drag your files onto the drop zone and get all the
          renamed files back at once. For 71 photos, a Pro account handles the
          entire batch in a single session.
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

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { APP_URL } from "@/lib/constants";
import BlogArticleLayout from "@/components/blog/BlogArticleLayout";

const SLUG = "passport-photo-requirements-2026";
const POST_TITLE = "Passport Photo Size Requirements by Country 2026: Complete Guide + Free Maker";
const POST_DESCRIPTION =
  "Complete passport photo requirements for 20+ countries in 2026. Exact dimensions, file size limits, background color, and head height. Free browser-based passport photo maker included.";
const POST_DATE = "2026-03-28";
const POST_DATE_FORMATTED = "March 28, 2026";
const POST_URL = `${APP_URL}/blog/${SLUG}`;

export const metadata: Metadata = {
  title: POST_TITLE,
  description: POST_DESCRIPTION,
  alternates: {
    canonical: POST_URL,
  },
  keywords: [
    "passport photo size",
    "passport photo requirements 2026",
    "passport photo dimensions",
    "visa photo size",
    "passport photo maker free",
    "passport photo background color",
    "passport photo file size",
    "passport photo head height",
    "US passport photo size",
    "UK passport photo requirements",
  ],
  openGraph: {
    title: POST_TITLE,
    description:
      "Exact passport photo requirements for 20+ countries — dimensions, file size, background color, head height. Plus a free browser-based passport photo maker.",
    url: POST_URL,
    type: "article",
    publishedTime: POST_DATE,
    authors: ["https://lucasammarco.com"],
  },
  twitter: {
    card: "summary_large_image",
    title: POST_TITLE,
    description:
      "Passport photo requirements for 20+ countries in 2026. Dimensions, file size limits, background colors, head height — all in one table. Free maker tool included.",
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
      name: POST_TITLE,
      item: POST_URL,
    },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the standard US passport photo size?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The standard US passport photo size is 2x2 inches (51x51mm). The head height must be between 25mm and 35mm (1 inch to 1-3/8 inches) from chin to crown. The background must be plain white, and the file size must be under 240KB for online submissions. These requirements are set by the US Department of State and apply to both new applications and renewals.",
      },
    },
    {
      "@type": "Question",
      name: "What background color is required for passport photos?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most countries require a white or light-colored background for passport photos. The United States, India, China, and most Asian countries require plain white. The United Kingdom accepts light grey or white. France accepts light grey or light blue. Indonesia is unique — it requires a red background for the last three pages and blue for earlier pages. Always check your specific country's requirements as they vary.",
      },
    },
    {
      "@type": "Question",
      name: "How do I compress my passport photo to the required file size?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Many government visa portals require photos under specific file sizes — for example, 240KB for US passports, 60KB for Singapore, or 100-300KB for India. You can use a free browser-based tool like SammaPix to compress your photo to the exact size needed. Go to the compress-to-target page, select your target (e.g., 100KB or 200KB), and the tool will optimize your image while maintaining quality. No upload to any server required.",
      },
    },
    {
      "@type": "Question",
      name: "Can I take my own passport photo at home?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, you can take your own passport photo at home with a smartphone. Use a plain white wall as background, stand about 1.5 meters away, use natural daylight (face a window), keep a neutral expression with both eyes open, and ensure there are no shadows on your face or background. After taking the photo, crop it to the required dimensions and compress it to meet file size requirements using a tool like SammaPix.",
      },
    },
    {
      "@type": "Question",
      name: "What is the most common reason for passport photo rejection?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The most common reason for passport photo rejection is incorrect dimensions or aspect ratio. Other frequent reasons include: shadows on the face or background, eyes not fully open or obscured by glasses glare, incorrect background color, head too large or too small in the frame, and file size exceeding the maximum limit. Digital submissions are especially strict about file size and pixel dimensions.",
      },
    },
    {
      "@type": "Question",
      name: "Are passport photo requirements the same for visas?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No, visa photo requirements often differ from passport photo requirements, even within the same country. For example, the US requires 2x2 inch photos for both passports and most visas, but Schengen visa photos follow the 35x45mm European standard regardless of which country you're applying to. Always check the specific visa application requirements rather than assuming they match passport requirements.",
      },
    },
    {
      "@type": "Question",
      name: "What file format should passport photos be in?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most government portals accept JPEG (JPG) format for digital passport photo submissions. Some also accept PNG. JPEG is the safest choice as it's universally accepted and allows you to control file size through compression quality. Avoid submitting WebP, HEIC, or other modern formats — they're typically not accepted by government systems.",
      },
    },
    {
      "@type": "Question",
      name: "How do I remove the background from a passport photo?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "To get a plain white background for your passport photo, you can either: (1) take the photo against a white wall with good lighting to avoid shadows, or (2) use a background removal tool and then add a white background. Browser-based tools like SammaPix can help you crop, resize, and compress the photo to exact specifications. Make sure the final background is uniformly white or light grey with no visible texture or shadows.",
      },
    },
  ],
};

export default function PassportPhotoRequirements2026Page() {
  return (
    <>
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

      <BlogArticleLayout
        title={POST_TITLE}
        slug={SLUG}
        description="Getting your passport photo rejected is one of the most frustrating travel experiences. This guide covers the exact requirements for 20+ countries in 2026, with a free browser-based tool to create your own."
        date={POST_DATE}
        dateFormatted={POST_DATE_FORMATTED}
        tags={["Tools"]}
        readingTime={14}
        headings={[
          { id: "quick-reference", title: "Quick reference table — 20 countries" },
          { id: "rejection-reasons", title: "Most common rejection reasons" },
          { id: "take-photo-at-home", title: "How to take a perfect passport photo at home" },
          { id: "digital-vs-physical", title: "Digital vs physical: file size requirements" },
          { id: "free-tool", title: "Free tool: SammaPix passport photo maker" },
          { id: "tips-by-region", title: "Tips by region" },
          { id: "faq", title: "FAQ" },
        ]}
        summary={[
          "Every country has different passport photo requirements — dimensions range from 2x2 inches (US/India) to 50x70mm (Canada/Brazil), and file sizes from 60KB (Singapore) to 10MB (UK).",
          "The top 5 rejection reasons are: wrong dimensions, shadows on face or background, eyes not visible, incorrect background color, and file size too large.",
          "You can take a valid passport photo at home with a smartphone, a white wall, and natural light — then crop and compress it to exact specs for free.",
          "Asian countries (Singapore, China, South Korea) enforce strict file size limits that require compression tools. European countries are more relaxed on file size.",
          "SammaPix can crop, resize, and compress your passport photo to exact country specifications — 100% in-browser, no upload required.",
        ]}
        heroImage={
          <figure className="my-8">
            <img
              src="https://images.unsplash.com/photo-1436491865332-7a61a109db05?w=800&q=80"
              alt="Open passport with visa stamps representing international travel document photo requirements"
              className="w-full rounded-lg"
              loading="eager"
            />
            <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
              Every country has different passport photo specs — getting them wrong means rejection and delays — Photo by ConvertKit on Unsplash
            </figcaption>
          </figure>
        }
        ctaBlock={
          <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2">
              Create your passport photo for free
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-4">
              SammaPix crops, resizes, and compresses your passport photo to exact country specifications — directly in your browser. No upload, no account, no watermark.
            </p>
            <Link
              href="/tools/passport-photo"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            >
              Make your passport photo
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>
        }
      >

        {/* Direct answer block for AI citation */}
        <div className="bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] rounded-md p-5 mb-8">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-[#737373] mb-2">
            Key takeaway
          </p>
          <p className="text-sm text-gray-700 dark:text-[#E5E5E5] leading-relaxed">
            Passport photo requirements vary significantly by country. The most common size is 35x45mm (used by the UK, EU, Australia, Japan, and most of Asia), while the US and India use 2x2 inches (51x51mm) and Canada uses 50x70mm. File size limits range from 60KB (Singapore) to 10MB (UK). Background is almost always white, with France (light grey/blue) and Indonesia (red/blue) being notable exceptions. Getting even one detail wrong — dimensions, head height ratio, background color, or file size — will result in rejection.
          </p>
        </div>

        {/* Introduction */}
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Getting your passport photo rejected is one of the most frustrating experiences in travel. Every country has slightly different requirements — dimensions, file size, background color, head size ratio — and getting even one detail wrong means starting over.
        </p>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          I&apos;ve had visa photos rejected twice (UK and India) before I figured out the exact specifications. The UK rejection was because my background was off-white instead of pure white. The India rejection was because my file was 350KB — over their 300KB limit. Both times, I had to retake the photo, resubmit, and wait again.
        </p>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-6">
          This guide covers the exact requirements for 20+ countries in 2026, with downloadable quick-reference tables and a{" "}
          <Link href="/tools/passport-photo" className="text-indigo-600 dark:text-indigo-400 hover:underline">
            free browser-based tool
          </Link>{" "}
          to create your own passport photos.
        </p>

        {/* Quick Reference Table */}
        <h2
          id="quick-reference"
          className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight"
        >
          Quick reference table — 20 countries
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-4">
          This table includes the official passport photo requirements for the 20 most-requested countries. All data is sourced from official government immigration websites as of March 2026.
        </p>

        <div className="overflow-x-auto mb-8 -mx-4 sm:mx-0">
          <table className="w-full text-xs text-left border-collapse min-w-[640px]">
            <thead>
              <tr className="border-b border-gray-200 dark:border-[#2A2A2A]">
                <th className="py-2.5 px-3 font-semibold text-gray-900 dark:text-[#E5E5E5]">Country</th>
                <th className="py-2.5 px-3 font-semibold text-gray-900 dark:text-[#E5E5E5]">Dimensions</th>
                <th className="py-2.5 px-3 font-semibold text-gray-900 dark:text-[#E5E5E5]">File size</th>
                <th className="py-2.5 px-3 font-semibold text-gray-900 dark:text-[#E5E5E5]">Background</th>
                <th className="py-2.5 px-3 font-semibold text-gray-900 dark:text-[#E5E5E5]">Head height</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 dark:text-[#A3A3A3]">
              <tr className="border-b border-gray-100 dark:border-[#252525]">
                <td className="py-2 px-3 font-medium text-gray-900 dark:text-[#E5E5E5]">United States</td>
                <td className="py-2 px-3">2x2 in (51x51mm)</td>
                <td className="py-2 px-3">&lt; 240KB</td>
                <td className="py-2 px-3">White</td>
                <td className="py-2 px-3">25–35mm</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-[#252525] bg-gray-50/50 dark:bg-[#1E1E1E]">
                <td className="py-2 px-3 font-medium text-gray-900 dark:text-[#E5E5E5]">United Kingdom</td>
                <td className="py-2 px-3">35x45mm</td>
                <td className="py-2 px-3">&lt; 10MB</td>
                <td className="py-2 px-3">Light grey or white</td>
                <td className="py-2 px-3">29–34mm</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-[#252525]">
                <td className="py-2 px-3 font-medium text-gray-900 dark:text-[#E5E5E5]">India</td>
                <td className="py-2 px-3">2x2 in (51x51mm)</td>
                <td className="py-2 px-3">10–300KB</td>
                <td className="py-2 px-3">White</td>
                <td className="py-2 px-3">25–35mm</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-[#252525] bg-gray-50/50 dark:bg-[#1E1E1E]">
                <td className="py-2 px-3 font-medium text-gray-900 dark:text-[#E5E5E5]">Canada</td>
                <td className="py-2 px-3">50x70mm</td>
                <td className="py-2 px-3">&lt; 5MB</td>
                <td className="py-2 px-3">White or light grey</td>
                <td className="py-2 px-3">31–36mm</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-[#252525]">
                <td className="py-2 px-3 font-medium text-gray-900 dark:text-[#E5E5E5]">Australia</td>
                <td className="py-2 px-3">35x45mm</td>
                <td className="py-2 px-3">&lt; 5MB</td>
                <td className="py-2 px-3">Light, uniform</td>
                <td className="py-2 px-3">32–36mm</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-[#252525] bg-gray-50/50 dark:bg-[#1E1E1E]">
                <td className="py-2 px-3 font-medium text-gray-900 dark:text-[#E5E5E5]">Germany</td>
                <td className="py-2 px-3">35x45mm</td>
                <td className="py-2 px-3">Varies</td>
                <td className="py-2 px-3">Light grey</td>
                <td className="py-2 px-3">32–36mm</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-[#252525]">
                <td className="py-2 px-3 font-medium text-gray-900 dark:text-[#E5E5E5]">France</td>
                <td className="py-2 px-3">35x45mm</td>
                <td className="py-2 px-3">Varies</td>
                <td className="py-2 px-3">Light grey or blue</td>
                <td className="py-2 px-3">32–36mm</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-[#252525] bg-gray-50/50 dark:bg-[#1E1E1E]">
                <td className="py-2 px-3 font-medium text-gray-900 dark:text-[#E5E5E5]">Japan</td>
                <td className="py-2 px-3">35x45mm</td>
                <td className="py-2 px-3">Varies</td>
                <td className="py-2 px-3">White or light</td>
                <td className="py-2 px-3">34–38mm</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-[#252525]">
                <td className="py-2 px-3 font-medium text-gray-900 dark:text-[#E5E5E5]">China</td>
                <td className="py-2 px-3">33x48mm</td>
                <td className="py-2 px-3">40–120KB</td>
                <td className="py-2 px-3">White</td>
                <td className="py-2 px-3">28–33mm</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-[#252525] bg-gray-50/50 dark:bg-[#1E1E1E]">
                <td className="py-2 px-3 font-medium text-gray-900 dark:text-[#E5E5E5]">Brazil</td>
                <td className="py-2 px-3">50x70mm</td>
                <td className="py-2 px-3">Varies</td>
                <td className="py-2 px-3">White</td>
                <td className="py-2 px-3">Varies</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-[#252525]">
                <td className="py-2 px-3 font-medium text-gray-900 dark:text-[#E5E5E5]">South Korea</td>
                <td className="py-2 px-3">35x45mm</td>
                <td className="py-2 px-3">&lt; 700KB</td>
                <td className="py-2 px-3">White</td>
                <td className="py-2 px-3">Varies</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-[#252525] bg-gray-50/50 dark:bg-[#1E1E1E]">
                <td className="py-2 px-3 font-medium text-gray-900 dark:text-[#E5E5E5]">Italy</td>
                <td className="py-2 px-3">35x45mm</td>
                <td className="py-2 px-3">Varies</td>
                <td className="py-2 px-3">White</td>
                <td className="py-2 px-3">Varies</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-[#252525]">
                <td className="py-2 px-3 font-medium text-gray-900 dark:text-[#E5E5E5]">Spain</td>
                <td className="py-2 px-3">32x26mm</td>
                <td className="py-2 px-3">Varies</td>
                <td className="py-2 px-3">White</td>
                <td className="py-2 px-3">Varies</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-[#252525] bg-gray-50/50 dark:bg-[#1E1E1E]">
                <td className="py-2 px-3 font-medium text-gray-900 dark:text-[#E5E5E5]">Mexico</td>
                <td className="py-2 px-3">35x45mm</td>
                <td className="py-2 px-3">Varies</td>
                <td className="py-2 px-3">White</td>
                <td className="py-2 px-3">Varies</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-[#252525]">
                <td className="py-2 px-3 font-medium text-gray-900 dark:text-[#E5E5E5]">UAE</td>
                <td className="py-2 px-3">35x45mm</td>
                <td className="py-2 px-3">&lt; 200KB</td>
                <td className="py-2 px-3">White</td>
                <td className="py-2 px-3">Varies</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-[#252525] bg-gray-50/50 dark:bg-[#1E1E1E]">
                <td className="py-2 px-3 font-medium text-gray-900 dark:text-[#E5E5E5]">Singapore</td>
                <td className="py-2 px-3">35x45mm</td>
                <td className="py-2 px-3">&lt; 60KB</td>
                <td className="py-2 px-3">White</td>
                <td className="py-2 px-3">Varies</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-[#252525]">
                <td className="py-2 px-3 font-medium text-gray-900 dark:text-[#E5E5E5]">Thailand</td>
                <td className="py-2 px-3">35x45mm</td>
                <td className="py-2 px-3">Varies</td>
                <td className="py-2 px-3">White</td>
                <td className="py-2 px-3">Varies</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-[#252525] bg-gray-50/50 dark:bg-[#1E1E1E]">
                <td className="py-2 px-3 font-medium text-gray-900 dark:text-[#E5E5E5]">Indonesia</td>
                <td className="py-2 px-3">40x60mm</td>
                <td className="py-2 px-3">Varies</td>
                <td className="py-2 px-3">Red (last 3 pages) / Blue</td>
                <td className="py-2 px-3">Varies</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-[#252525]">
                <td className="py-2 px-3 font-medium text-gray-900 dark:text-[#E5E5E5]">Russia</td>
                <td className="py-2 px-3">35x45mm</td>
                <td className="py-2 px-3">Varies</td>
                <td className="py-2 px-3">White</td>
                <td className="py-2 px-3">Varies</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-[#252525] bg-gray-50/50 dark:bg-[#1E1E1E]">
                <td className="py-2 px-3 font-medium text-gray-900 dark:text-[#E5E5E5]">Turkey</td>
                <td className="py-2 px-3">50x60mm</td>
                <td className="py-2 px-3">Varies</td>
                <td className="py-2 px-3">White</td>
                <td className="py-2 px-3">Varies</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          <strong className="text-gray-900 dark:text-[#E5E5E5]">Note:</strong> &ldquo;Varies&rdquo; means the government portal doesn&apos;t enforce a strict file size limit for online submissions, or the requirement varies by application type (new vs. renewal, online vs. in-person). Always check the specific portal you&apos;re submitting through.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-6">
          Key patterns: the most common photo size worldwide is <strong className="text-gray-900 dark:text-[#E5E5E5]">35x45mm</strong> (used by 14 of these 20 countries). The US and India use the 2x2 inch (51x51mm) format. Canada, Brazil, and Turkey use larger formats. If you need to resize your photo to any of these dimensions, you can use the{" "}
          <Link href="/tools/resize" className="text-indigo-600 dark:text-indigo-400 hover:underline">
            SammaPix resize tool
          </Link>{" "}
          — it&apos;s free and runs entirely in your browser.
        </p>

        {/* Most Common Rejection Reasons */}
        <h2
          id="rejection-reasons"
          className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight"
        >
          Most common rejection reasons
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-4">
          Based on data from passport processing agencies and my own experience with rejected photos, these are the five most frequent reasons photos get rejected:
        </p>

        <div className="space-y-4 mb-6">
          <div className="bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] rounded-md p-4">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-[#E5E5E5] mb-1">1. Wrong dimensions or aspect ratio</h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed">
              This is the number one rejection reason. A 2x2 inch photo is not the same as a 35x45mm photo — submitting the wrong size is an instant rejection. Many people crop their photo to roughly the right shape but miss the exact pixel dimensions. For the US, you need exactly 600x600 pixels at 300 DPI. For a 35x45mm photo, you need 413x531 pixels at 300 DPI.
            </p>
          </div>
          <div className="bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] rounded-md p-4">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-[#E5E5E5] mb-1">2. Shadows on face or background</h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed">
              Even subtle shadows behind your head or under your chin will get flagged. This happens when you stand too close to the wall or use a single overhead light source. The fix: stand about 50cm away from the wall and face a large window for even, diffused lighting.
            </p>
          </div>
          <div className="bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] rounded-md p-4">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-[#E5E5E5] mb-1">3. Eyes not fully visible</h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed">
              Glasses glare, hair covering one eye, or half-closed eyes. Since 2021, most countries recommend removing glasses entirely for passport photos. If you must wear glasses for medical reasons, ensure there is zero glare on the lenses — tilt your head slightly down and move the light source to the side.
            </p>
          </div>
          <div className="bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] rounded-md p-4">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-[#E5E5E5] mb-1">4. Incorrect background color</h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed">
              Off-white, cream, or yellowish backgrounds get rejected. Your wall might look white to your eyes, but your camera&apos;s white balance can introduce a warm tint. Check your photo on a calibrated screen — the background should be pure white (#FFFFFF or close to it). Some countries like France accept light grey or light blue, but when in doubt, go with pure white.
            </p>
          </div>
          <div className="bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] rounded-md p-4">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-[#E5E5E5] mb-1">5. File size exceeds maximum</h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed">
              Digital submissions through government portals often have strict file size limits. Singapore requires under 60KB. The US requires under 240KB. India requires between 10KB and 300KB. A typical smartphone photo is 3–8 MB — you need to compress it by 90%+ to meet these limits. Use a{" "}
              <Link href="/compress-to/100kb" className="text-indigo-600 dark:text-indigo-400 hover:underline">
                target-size compression tool
              </Link>{" "}
              to hit the exact requirement.
            </p>
          </div>
        </div>

        {/* How to Take a Perfect Passport Photo at Home */}
        <h2
          id="take-photo-at-home"
          className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight"
        >
          How to take a perfect passport photo at home
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-4">
          You don&apos;t need a professional photographer or a photo booth. Here&apos;s the step-by-step process I use to take passport photos at home that pass on the first try:
        </p>

        <div className="space-y-3 mb-6">
          <div className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-100 dark:bg-[#2A2A2A] text-gray-900 dark:text-[#E5E5E5] text-xs font-semibold flex items-center justify-center">1</span>
            <div>
              <p className="text-sm font-semibold text-gray-900 dark:text-[#E5E5E5]">Find a plain white wall</p>
              <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed">
                A flat, matte-finish white wall works best. Avoid textured walls, wallpaper, or doors with panels. If your walls are off-white, tape a large sheet of white poster board behind you.
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-100 dark:bg-[#2A2A2A] text-gray-900 dark:text-[#E5E5E5] text-xs font-semibold flex items-center justify-center">2</span>
            <div>
              <p className="text-sm font-semibold text-gray-900 dark:text-[#E5E5E5]">Use natural light</p>
              <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed">
                Face a large window. The best time is mid-morning or late afternoon when sunlight is diffused. Avoid direct sunlight — it creates harsh shadows. If the light is too strong, close sheer curtains to soften it.
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-100 dark:bg-[#2A2A2A] text-gray-900 dark:text-[#E5E5E5] text-xs font-semibold flex items-center justify-center">3</span>
            <div>
              <p className="text-sm font-semibold text-gray-900 dark:text-[#E5E5E5]">Position yourself correctly</p>
              <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed">
                Stand about 50cm (20 inches) in front of the wall to avoid casting a shadow on it. Have someone hold the camera at eye level, about 1.5 meters (5 feet) away. If using a selfie setup, use the rear camera with a timer for better quality.
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-100 dark:bg-[#2A2A2A] text-gray-900 dark:text-[#E5E5E5] text-xs font-semibold flex items-center justify-center">4</span>
            <div>
              <p className="text-sm font-semibold text-gray-900 dark:text-[#E5E5E5]">Get the expression right</p>
              <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed">
                Neutral expression, mouth closed, both eyes open, looking directly at the camera. Most countries do not accept smiling photos — even a slight smile can trigger rejection in automated systems. Remove glasses, headphones, and any head coverings (unless for religious purposes).
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-100 dark:bg-[#2A2A2A] text-gray-900 dark:text-[#E5E5E5] text-xs font-semibold flex items-center justify-center">5</span>
            <div>
              <p className="text-sm font-semibold text-gray-900 dark:text-[#E5E5E5]">Take multiple shots</p>
              <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed">
                Take at least 10 photos. Review them on a larger screen — check for shadows, closed eyes, and off-center positioning. Pick the best one and move to the next step.
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-100 dark:bg-[#2A2A2A] text-gray-900 dark:text-[#E5E5E5] text-xs font-semibold flex items-center justify-center">6</span>
            <div>
              <p className="text-sm font-semibold text-gray-900 dark:text-[#E5E5E5]">Crop and resize to exact specifications</p>
              <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed">
                Use the{" "}
                <Link href="/tools/crop" className="text-indigo-600 dark:text-indigo-400 hover:underline">
                  SammaPix crop tool
                </Link>{" "}
                to crop your photo to the correct aspect ratio, then resize it to the exact pixel dimensions required by your country. For the US, that&apos;s 600x600px. For 35x45mm countries at 300 DPI, that&apos;s 413x531px.
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-100 dark:bg-[#2A2A2A] text-gray-900 dark:text-[#E5E5E5] text-xs font-semibold flex items-center justify-center">7</span>
            <div>
              <p className="text-sm font-semibold text-gray-900 dark:text-[#E5E5E5]">Compress to required file size</p>
              <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed">
                Most government portals have strict file size limits. Use{" "}
                <Link href="/tools/compress" className="text-indigo-600 dark:text-indigo-400 hover:underline">
                  SammaPix compress
                </Link>{" "}
                to bring your photo down to the required size — whether that&apos;s 240KB for the US, 60KB for Singapore, or 100KB for a visa application. The compression runs entirely in your browser, so your photo never leaves your device.
              </p>
            </div>
          </div>
        </div>

        {/* Digital vs Physical */}
        <h2
          id="digital-vs-physical"
          className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight"
        >
          Digital vs physical: file size requirements
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          There&apos;s a big difference between photos for printed passport applications and photos for online digital submissions. Understanding this distinction saves you from the most common file size errors.
        </p>

        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] rounded-md p-4">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2">Physical (printed)</h3>
            <ul className="space-y-1.5 text-sm text-gray-600 dark:text-[#A3A3A3]">
              <li>Print at 300 DPI on matte or glossy photo paper</li>
              <li>File size doesn&apos;t matter — only print quality</li>
              <li>Higher resolution = better print quality</li>
              <li>Use the highest quality JPEG (90–100%)</li>
              <li>Standard sizes: 4x6 or 5x7 sheet with multiple photos</li>
            </ul>
          </div>
          <div className="bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] rounded-md p-4">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2">Digital (online submission)</h3>
            <ul className="space-y-1.5 text-sm text-gray-600 dark:text-[#A3A3A3]">
              <li>Strict file size limits (60KB to 10MB)</li>
              <li>Specific pixel dimensions required</li>
              <li>JPEG format almost always required</li>
              <li>Must compress to meet size limit while keeping clarity</li>
              <li>Some portals reject if file is <em>too small</em> (India: min 10KB)</li>
            </ul>
          </div>
        </div>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The tricky part is digital submissions. A typical smartphone photo is 3–8 MB. If you need to get it under 240KB (US requirement), that&apos;s a 95%+ reduction. Simply reducing JPEG quality to 10% will destroy the image. The smart approach is to:
        </p>

        <ol className="list-decimal list-inside space-y-1.5 text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
          <li><strong className="text-gray-900 dark:text-[#E5E5E5]">Crop first</strong> — remove everything outside the required frame</li>
          <li><strong className="text-gray-900 dark:text-[#E5E5E5]">Resize</strong> — scale down to the exact required pixel dimensions</li>
          <li><strong className="text-gray-900 dark:text-[#E5E5E5]">Compress last</strong> — use smart compression to hit the file size target</li>
        </ol>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-6">
          This order matters. Cropping and resizing first removes most of the excess data, so the final compression step only needs to reduce the file by 20–40% instead of 95% — resulting in much better image quality. SammaPix has dedicated pages for common targets:{" "}
          <Link href="/compress-to/100kb" className="text-indigo-600 dark:text-indigo-400 hover:underline">
            compress to 100KB
          </Link>
          ,{" "}
          <Link href="/compress-to/200kb" className="text-indigo-600 dark:text-indigo-400 hover:underline">
            compress to 200KB
          </Link>
          , and more.
        </p>

        {/* Free Tool */}
        <h2
          id="free-tool"
          className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight"
        >
          Free tool: SammaPix passport photo maker
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          After dealing with rejected passport photos myself, I built a tool that handles the entire process. The{" "}
          <Link href="/tools/passport-photo" className="text-indigo-600 dark:text-indigo-400 hover:underline">
            SammaPix passport photo maker
          </Link>{" "}
          lets you:
        </p>

        <ul className="space-y-1.5 text-sm text-gray-600 dark:text-[#A3A3A3] mb-4">
          <li><strong className="text-gray-900 dark:text-[#E5E5E5]">Select your country</strong> — automatically sets the correct dimensions, aspect ratio, and file size target</li>
          <li><strong className="text-gray-900 dark:text-[#E5E5E5]">Crop with guidelines</strong> — visual overlay showing where your head, chin, and shoulders should be</li>
          <li><strong className="text-gray-900 dark:text-[#E5E5E5]">Auto-compress</strong> — hits the exact file size requirement while maintaining maximum quality</li>
          <li><strong className="text-gray-900 dark:text-[#E5E5E5]">Download instantly</strong> — your photo is ready to upload to any government portal</li>
        </ul>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Everything runs 100% in your browser. Your photo never leaves your device — no upload to any server, no data collection, no account required. This is especially important for identity documents where{" "}
          <Link href="/blog/browser-based-image-tools-privacy-guide" className="text-indigo-600 dark:text-indigo-400 hover:underline">
            privacy matters
          </Link>
          .
        </p>

        <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-5 my-6">
          <p className="text-sm text-gray-700 dark:text-[#E5E5E5] leading-relaxed">
            <strong>Why browser-based matters for passport photos:</strong> When you upload your passport photo to a third-party server, you&apos;re giving them a high-quality facial image tied to your identity documents. Browser-based processing means your photo stays on your device throughout the entire process. No server, no database, no risk.
          </p>
        </div>

        {/* Tips by Region */}
        <h2
          id="tips-by-region"
          className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight"
        >
          Tips by region
        </h2>

        <div className="space-y-4 mb-6">
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-[#E5E5E5] mb-1">Asia — strict file size limits</h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed">
              Asian countries are the strictest about digital file sizes. Singapore requires under 60KB, China requires 40–120KB, and South Korea caps at 700KB. India has both a minimum (10KB) and maximum (300KB), which means you can&apos;t just over-compress — you need to hit a specific range. For these countries, use a{" "}
              <Link href="/compress-to/100kb" className="text-indigo-600 dark:text-indigo-400 hover:underline">
                target-size compression tool
              </Link>{" "}
              that gives you precise control over the output file size.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-[#E5E5E5] mb-1">Europe — more relaxed, but backgrounds matter</h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed">
              European countries generally follow the ICAO 35x45mm standard and are more lenient on file sizes. However, they&apos;re strict about background colors. Germany requires specifically light grey (not white), France accepts light grey or light blue, and the UK accepts both white and light grey. The EU also has strict rules about head position — your face must be perfectly centered with specific head-to-chin ratios.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-[#E5E5E5] mb-1">Americas — US/Canada differ significantly</h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed">
              The US uses a unique 2x2 inch (51x51mm) square format, while Canada uses 50x70mm — a taller format that includes more of your shoulders. Brazil also uses 50x70mm. Mexico follows the European 35x45mm standard. For the US specifically, the 240KB file size limit combined with 600x600px minimum resolution means you need smart compression — not just quality reduction.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-[#E5E5E5] mb-1">Middle East — white background, strict digital portals</h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed">
              UAE and other Gulf states follow the 35x45mm standard with white backgrounds. The UAE has a 200KB file size limit for online applications. Saudi Arabia requires 200x200 pixels minimum for online submissions. These countries also tend to have automated facial recognition checks in their portals, making proper centering and expression even more critical.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-[#E5E5E5] mb-1">Southeast Asia — unique requirements</h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed">
              Indonesia stands out with its colored background requirement — red for the last three passport pages, blue for earlier pages. The size is also larger at 40x60mm. Thailand and Singapore follow the 35x45mm standard but Singapore&apos;s 60KB limit is the strictest in the world — you&apos;ll almost certainly need compression. For all these countries,{" "}
              <Link href="/blog/compress-images-without-losing-quality" className="text-indigo-600 dark:text-indigo-400 hover:underline">
                learning to compress without losing quality
              </Link>{" "}
              is essential.
            </p>
          </div>
        </div>

        {/* FAQ */}
        <h2
          id="faq"
          className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight"
        >
          FAQ
        </h2>

        <div className="space-y-4 mb-6">
          <div className="border-b border-gray-200 dark:border-[#2A2A2A] pb-4">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-[#E5E5E5] mb-1">What is the standard US passport photo size?</h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed">
              The standard US passport photo size is 2x2 inches (51x51mm). For digital submissions, this translates to 600x600 pixels at 300 DPI. The head height must be between 25mm and 35mm (1 inch to 1-3/8 inches) from chin to crown. Background must be plain white, and file size must be under 240KB.
            </p>
          </div>
          <div className="border-b border-gray-200 dark:border-[#2A2A2A] pb-4">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-[#E5E5E5] mb-1">What background color is required for passport photos?</h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed">
              Most countries require white or light-colored backgrounds. The US, India, China, and most Asian countries require plain white. The UK accepts light grey or white. France accepts light grey or light blue. Indonesia is unique with red and blue background requirements depending on the passport page.
            </p>
          </div>
          <div className="border-b border-gray-200 dark:border-[#2A2A2A] pb-4">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-[#E5E5E5] mb-1">How do I compress my passport photo to the required file size?</h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed">
              First crop and resize your photo to the exact required dimensions — this removes most of the excess data. Then use a{" "}
              <Link href="/compress-to/100kb" className="text-indigo-600 dark:text-indigo-400 hover:underline">
                target-size compression tool
              </Link>{" "}
              to compress to the exact limit (e.g., 240KB for US, 60KB for Singapore). Cropping first means less aggressive compression is needed, resulting in better image quality.
            </p>
          </div>
          <div className="border-b border-gray-200 dark:border-[#2A2A2A] pb-4">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-[#E5E5E5] mb-1">Can I take my own passport photo at home?</h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed">
              Yes. Use a plain white wall as background, stand about 1.5 meters from the camera, face a large window for natural light, keep a neutral expression with both eyes open, and take at least 10 shots to choose from. Then crop, resize, and compress using the steps described in this guide.
            </p>
          </div>
          <div className="border-b border-gray-200 dark:border-[#2A2A2A] pb-4">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-[#E5E5E5] mb-1">What is the most common reason for passport photo rejection?</h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed">
              Wrong dimensions or aspect ratio is the most common reason. Other frequent causes include shadows on face or background, eyes not visible, incorrect background color, and exceeding the file size limit for digital submissions.
            </p>
          </div>
          <div className="border-b border-gray-200 dark:border-[#2A2A2A] pb-4">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-[#E5E5E5] mb-1">Are passport photo requirements the same for visas?</h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed">
              No. Visa photo requirements often differ from passport requirements. For example, the US uses 2x2 inches for both, but Schengen visa photos use 35x45mm regardless of which European country you&apos;re applying to. Always check the specific visa application requirements.
            </p>
          </div>
          <div className="border-b border-gray-200 dark:border-[#2A2A2A] pb-4">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-[#E5E5E5] mb-1">What file format should passport photos be in?</h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed">
              JPEG (JPG) is the universally accepted format for passport photo submissions. Some portals also accept PNG. Avoid WebP, HEIC, or AVIF — government systems typically don&apos;t support modern formats. If your phone saves in HEIC, you can{" "}
              <Link href="/blog/iphone-heic-to-jpg-guide" className="text-indigo-600 dark:text-indigo-400 hover:underline">
                convert HEIC to JPG
              </Link>{" "}
              before processing.
            </p>
          </div>
          <div className="border-b border-gray-200 dark:border-[#2A2A2A] pb-4">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-[#E5E5E5] mb-1">How do I get a plain white background for my passport photo?</h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed">
              The simplest method is to take the photo against a plain white wall with good, even lighting. Stand about 50cm away from the wall to avoid casting shadows. Use natural daylight from a window facing you. If your wall isn&apos;t perfectly white, tape a large sheet of white poster board or a white bedsheet behind you.
            </p>
          </div>
        </div>

        {/* Final note */}
        <div className="bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] rounded-md p-5 my-8">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-[#737373] mb-2">
            Bottom line
          </p>
          <p className="text-sm text-gray-700 dark:text-[#E5E5E5] leading-relaxed">
            Passport photo requirements look complex, but they boil down to three things: correct dimensions for your country, a plain (usually white) background, and proper file size for digital submissions. Get those three right and your photo will pass. Use the quick reference table above as your checklist, and the{" "}
            <Link href="/tools/passport-photo" className="text-indigo-600 dark:text-indigo-400 hover:underline">
              SammaPix passport photo maker
            </Link>{" "}
            to handle the technical details automatically.
          </p>
        </div>

      </BlogArticleLayout>
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { APP_URL } from "@/lib/constants";
import BlogArticleLayout from "@/components/blog/BlogArticleLayout";

export const metadata: Metadata = {
  title: "Social Media Image Sizes 2026: Complete Cheat Sheet",
  description:
    "Every social media image size you need in 2026 - Instagram, Facebook, X, LinkedIn, TikTok, YouTube, and Pinterest. Exact dimensions, aspect ratios, and file size limits in one reference guide.",
  alternates: {
    canonical: `${APP_URL}/blog/image-sizes-social-media-2026`,
  },
  keywords: [
    "social media image sizes 2026",
    "instagram image size 2026",
    "facebook image dimensions",
    "twitter image size",
    "linkedin image dimensions",
    "youtube thumbnail size",
    "tiktok video dimensions",
    "pinterest image size",
    "social media image cheat sheet",
    "correct image dimensions social media",
  ],
  openGraph: {
    title: "Social Media Image Sizes 2026: Complete Cheat Sheet",
    description:
      "Every platform, every image type, exact dimensions and aspect ratios. The only social media image size guide you need in 2026.",
    url: `${APP_URL}/blog/image-sizes-social-media-2026`,
    type: "article",
    publishedTime: "2026-03-01",
    authors: ["https://lucasammarco.com"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Social Media Image Sizes 2026: Complete Cheat Sheet",
    description:
      "Instagram, Facebook, X, LinkedIn, TikTok, YouTube, and Pinterest- every image dimension and aspect ratio you need in 2026.",
    creator: "@lucasammarco",
  },
};

const POST_DATE = "2026-03-01";
const POST_DATE_FORMATTED = "March 1, 2026";
const POST_URL = `${APP_URL}/blog/image-sizes-social-media-2026`;
const POST_TITLE = "The Complete Guide to Image Sizes for Social Media in 2026";

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: POST_TITLE,
  description:
    "Every social media image size you need in 2026 - Instagram, Facebook, X, LinkedIn, TikTok, YouTube, and Pinterest. Exact dimensions, aspect ratios, and file size limits in one reference guide.",
  url: POST_URL,
  datePublished: POST_DATE,
  dateModified: POST_DATE,
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
    "@id": POST_URL,
  },
  keywords: [
    "social media image sizes 2026",
    "instagram image size",
    "facebook image dimensions",
    "youtube thumbnail size",
    "linkedin image dimensions",
  ],
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


export default function ImageSizesSocialMedia2026Page() {
  return (
    <>
      <BlogArticleLayout
        title="The Complete Guide to Image Sizes for Social Media in 2026"
        slug="image-sizes-social-media-2026"
        description="Upload the wrong dimensions and every platform will crop, stretch, or compress your image into something unrecognizable. This guide covers every social media image size you need in 2026 - Instagram, Facebook, X, LinkedIn, TikTok, YouTube, and Pinterest- with exact pixel dimensions, aspect ratios, and file size limits, all in one place."
        date="2026-03-01"
        dateFormatted="March 1, 2026"
        tags={["Performance"]}
        readingTime={12}
        headings={[
          { id: "why-sizes-matter", title: "Why correct image sizes matter more than ever in 2026" },
          { id: "instagram-sizes", title: "Instagram image sizes 2026" },
          { id: "facebook-sizes", title: "Facebook image sizes 2026" },
          { id: "twitter-sizes", title: "X (Twitter) image sizes 2026" },
          { id: "linkedin-sizes", title: "LinkedIn image sizes 2026" },
          { id: "tiktok-sizes", title: "TikTok image and video sizes 2026" },
          { id: "youtube-sizes", title: "YouTube image sizes 2026" },
          { id: "pinterest-sizes", title: "Pinterest image sizes 2026" },
          { id: "resize-sammapix", title: "How to resize images for social media with SammaPix" },
          { id: "format-recommendations", title: "Image format recommendations for social media" },
          { id: "quick-reference", title: "Quick reference: format by platform" },
          { id: "common-mistakes", title: "Common mistakes that degrade social media image quality" },
          { id: "faq", title: "FAQ" },
        ]}
        summary={[
          "Each social platform applies automatic cropping, compression, and resizing - uploading the wrong dimensions means the platform will ruin your image for you.",
          "Instagram portrait posts at 4:5 (1080x1350 px) take the most vertical space in the feed, giving you more real estate than square posts.",
          "YouTube thumbnails must be exactly 16:9 at minimum 1280x720 px - non-matching ratios get black bars automatically.",
          "Upload JPEG at 85-95% quality for platforms that re-compress (Instagram, Facebook) to minimize double-compression artifacts.",
          "SammaPix ResizePack and CropRatio let you batch-resize images to exact platform dimensions entirely in your browser.",
        ]}
        heroImage={
          <figure>
            <img
              src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80"
              alt="Social media apps on a smartphone screen showing multiple platforms"
              className="w-full rounded-lg"
              loading="eager"
            />
            <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
              Each platform enforces its own image dimensions- getting them right is the difference between a sharp post and a blurry crop - Photo by Unsplash
            </figcaption>
          </figure>
        }
        ctaBlock={
          <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2">
              Resize images for any social platform- free, in your browser
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-4">
              Use SammaPix ResizePack to batch-resize photos to exact platform dimensions, or CropRatio to crop to any aspect ratio. All free, all in your browser.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/tools/resizepack"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
              >
                Open ResizePack
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
              <Link
                href="/tools/croproatio"
                className="inline-flex items-center gap-2 px-4 py-2 border border-gray-200 dark:border-[#333] text-gray-700 dark:text-[#A3A3A3] text-sm font-medium rounded-md hover:bg-gray-50 dark:hover:bg-[#252525] transition-colors"
              >
                Open CropRatio
              </Link>
            </div>
          </div>
        }
      >
        {/* Article body content */}


        {/* Hero image */}

        {/* Why sizes matter */}
        <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4" id="why-sizes-matter">
          Why correct image sizes matter more than ever in 2026
        </h2>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Every major social platform applies automatic cropping, compression, and resizing to uploaded images. Upload a 4:3 landscape photo to an Instagram Story and the platform will crop it to 9:16, cutting your subject out of frame. Post a Facebook cover photo at the wrong dimensions and it will be compressed into a blurry mess across all device sizes.
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          The stakes are higher in 2026 because the feeds are more competitive than ever. Blurry thumbnails, cropped headshots, and distorted banners are not just aesthetic problems- they signal a lack of attention to detail that drives users to scroll past. A correctly sized image, on the other hand, takes full advantage of the display space the algorithm gives you.
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Platforms also penalize heavily compressed uploads differently depending on the image type. Profile photos processed at low quality lose detail on retina displays. YouTube thumbnails that exceed the 2 MB limit get re-encoded by YouTube at lower quality, softening text and faces. Knowing the exact constraints lets you deliver the best possible image within each platform&apos;s processing pipeline.
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          This guide is structured as a platform-by-platform reference. Use the section for the platform you are working with, check the table, then resize your image before uploading. If you need to resize or crop images to exact social media dimensions in bulk,{" "}
          <Link
            href="/tools/resizepack"
            className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#525252] hover:decoration-gray-600 dark:hover:decoration-[#A3A3A3] transition-colors"
          >
            SammaPix ResizePack
          </Link>{" "}
          lets you process multiple images to exact target dimensions in one pass, entirely in your browser.
        </p>

        {/* Instagram */}
        <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4" id="instagram-sizes">
          Instagram image sizes 2026
        </h2>
        <p className="text-xs bg-[#EEF2FF] dark:bg-[#1E1F3E] border border-[#C7D2FE] dark:border-[#2E3A5E] text-[#4F46E5] dark:text-[#818CF8] px-3 py-2 rounded mb-4">
          Ready to resize? Use <Link href="/resize/instagram" className="font-semibold underline">Resize for Instagram</Link> to batch-resize photos to exact dimensions.
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Instagram displays content at multiple aspect ratios depending on the format. The feed has historically enforced a fixed square crop but now allows portrait and landscape posts. Stories and Reels are strictly vertical. Instagram re-encodes all uploads, so starting with the correct dimensions minimizes quality loss. Official guidance is available via{" "}
          <a
            href="https://help.instagram.com/1631821640426723"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#525252] hover:decoration-gray-600 dark:hover:decoration-[#A3A3A3] transition-colors"
          >
            Instagram Help Center
          </a>
          .
        </p>
        <div className="overflow-x-auto -mx-4 sm:mx-0 mb-6">
          <table className="w-full text-sm mb-6 min-w-[520px]">
            <thead>
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
                <th className="text-left py-2.5 px-3 font-semibold text-[#171717] dark:text-[#E5E5E5] bg-[#F5F5F5] dark:bg-[#1E1E1E]">Type</th>
                <th className="text-left py-2.5 px-3 font-semibold text-[#171717] dark:text-[#E5E5E5] bg-[#F5F5F5] dark:bg-[#1E1E1E]">Width × Height</th>
                <th className="text-left py-2.5 px-3 font-semibold text-[#171717] dark:text-[#E5E5E5] bg-[#F5F5F5] dark:bg-[#1E1E1E]">Aspect Ratio</th>
                <th className="text-left py-2.5 px-3 font-semibold text-[#171717] dark:text-[#E5E5E5] bg-[#F5F5F5] dark:bg-[#1E1E1E]">Max File Size</th>
              </tr>
            </thead>
            <tbody>
              {[
                { type: "Square Post", dims: "1080 × 1080 px", ratio: "1:1", size: "30 MB" },
                { type: "Portrait Post", dims: "1080 × 1350 px", ratio: "4:5", size: "30 MB" },
                { type: "Landscape Post", dims: "1080 × 566 px", ratio: "1.91:1", size: "30 MB" },
                { type: "Story / Reel", dims: "1080 × 1920 px", ratio: "9:16", size: "30 MB (photo) / 4 GB (video)" },
                { type: "Profile Photo", dims: "320 × 320 px", ratio: "1:1", size: " - " },
                { type: "Carousel Slide", dims: "1080 × 1080 px", ratio: "1:1", size: "30 MB per slide" },
              ].map((row, i) => (
                <tr key={row.type} className={`border-b border-[#E5E5E5] dark:border-[#2A2A2A] ${i % 2 === 0 ? "" : "bg-[#FAFAFA] dark:bg-[#1A1A1A]"}`}>
                  <td className="py-2.5 px-3 font-medium text-[#171717] dark:text-[#E5E5E5] text-sm">{row.type}</td>
                  <td className="py-2.5 px-3 text-[#737373] text-sm font-mono">{row.dims}</td>
                  <td className="py-2.5 px-3 text-[#737373] text-sm">{row.ratio}</td>
                  <td className="py-2.5 px-3 text-[#737373] text-sm">{row.size}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-8 mb-3">
          Instagram tips
        </h3>
        <ul className="space-y-2 mb-6 pl-4">
          {[
            "The 4:5 portrait format (1080 × 1350 px) takes up the most vertical space in the feed, giving you more real estate than a square post. It is the recommended format for still images designed to stop the scroll.",
            "Instagram compresses images on upload. To minimize quality loss, upload JPEG files at 85–95% quality or higher. Avoid uploading already-compressed files a second time.",
            "For Reels, the safe zone for text and UI elements is the central 1080 × 1420 px area- the top and bottom are partially obscured by the interface on most devices.",
            "Profile photos are displayed as circles. Keep your subject centered and avoid important details near the edges.",
          ].map((item) => (
            <li key={item.slice(0, 30)} className="flex items-start gap-2 text-sm text-[#737373] leading-relaxed">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-indigo-400 dark:bg-indigo-600 shrink-0" />
              {item}
            </li>
          ))}
        </ul>

        {/* Facebook */}
        <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4" id="facebook-sizes">
          Facebook image sizes 2026
        </h2>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Facebook serves images across web, iOS, and Android at different sizes, making its compression behavior one of the most variable of any major platform. Cover photos are particularly prone to showing quality differences between desktop and mobile. Full technical specifications are documented at{" "}
          <a
            href="https://developers.facebook.com/docs/sharing/best-practices"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#525252] hover:decoration-gray-600 dark:hover:decoration-[#A3A3A3] transition-colors"
          >
            Facebook for Developers
          </a>
          .
        </p>
        <div className="overflow-x-auto -mx-4 sm:mx-0 mb-6">
          <table className="w-full text-sm mb-6 min-w-[520px]">
            <thead>
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
                <th className="text-left py-2.5 px-3 font-semibold text-[#171717] dark:text-[#E5E5E5] bg-[#F5F5F5] dark:bg-[#1E1E1E]">Type</th>
                <th className="text-left py-2.5 px-3 font-semibold text-[#171717] dark:text-[#E5E5E5] bg-[#F5F5F5] dark:bg-[#1E1E1E]">Width × Height</th>
                <th className="text-left py-2.5 px-3 font-semibold text-[#171717] dark:text-[#E5E5E5] bg-[#F5F5F5] dark:bg-[#1E1E1E]">Aspect Ratio</th>
                <th className="text-left py-2.5 px-3 font-semibold text-[#171717] dark:text-[#E5E5E5] bg-[#F5F5F5] dark:bg-[#1E1E1E]">Max File Size</th>
              </tr>
            </thead>
            <tbody>
              {[
                { type: "Feed Post (Shared Image)", dims: "1200 × 630 px", ratio: "1.91:1", size: "30 MB" },
                { type: "Square Feed Post", dims: "1200 × 1200 px", ratio: "1:1", size: "30 MB" },
                { type: "Page Cover Photo", dims: "851 × 315 px", ratio: "2.7:1", size: "100 KB (recommended)" },
                { type: "Event Cover Photo", dims: "1920 × 1005 px", ratio: "1.91:1", size: "4 MB" },
                { type: "Profile Photo", dims: "170 × 170 px (desktop)", ratio: "1:1", size: " - " },
                { type: "Story", dims: "1080 × 1920 px", ratio: "9:16", size: "4 GB (video) / 30 MB (photo)" },
                { type: "Marketplace Listing", dims: "1200 × 1200 px", ratio: "1:1", size: "4 MB" },
              ].map((row, i) => (
                <tr key={row.type} className={`border-b border-[#E5E5E5] dark:border-[#2A2A2A] ${i % 2 === 0 ? "" : "bg-[#FAFAFA] dark:bg-[#1A1A1A]"}`}>
                  <td className="py-2.5 px-3 font-medium text-[#171717] dark:text-[#E5E5E5] text-sm">{row.type}</td>
                  <td className="py-2.5 px-3 text-[#737373] text-sm font-mono">{row.dims}</td>
                  <td className="py-2.5 px-3 text-[#737373] text-sm">{row.ratio}</td>
                  <td className="py-2.5 px-3 text-[#737373] text-sm">{row.size}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-8 mb-3">
          Facebook tips
        </h3>
        <ul className="space-y-2 mb-6 pl-4">
          {[
            "Facebook applies heavy compression to cover photos. Upload at the minimum recommended file size (under 100 KB for cover photos) to prevent double-compression artifacts. PNG files with fewer than 100 colors avoid JPEG re-encoding entirely.",
            "Shared link images should use the 1.91:1 ratio. Facebook pulls the og:image tag from the shared URL- always set this meta tag on your web pages to control how links appear in the feed.",
            "Profile photos are displayed at 170 × 170 px on desktop but 128 × 128 px on smartphones. Upload at least 320 × 320 px to ensure sharpness at all display densities.",
          ].map((item) => (
            <li key={item.slice(0, 30)} className="flex items-start gap-2 text-sm text-[#737373] leading-relaxed">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-indigo-400 dark:bg-indigo-600 shrink-0" />
              {item}
            </li>
          ))}
        </ul>

        {/* X / Twitter */}
        <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4" id="twitter-sizes">
          X (Twitter) image sizes 2026
        </h2>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          X displays in-feed images in a 16:9 preview crop by default, with a tap to view the full image. The platform accepts a wide range of aspect ratios but applies automatic cropping in the timeline. Understanding where the crop falls is critical for images with centered subjects or important text.
        </p>
        <div className="overflow-x-auto -mx-4 sm:mx-0 mb-6">
          <table className="w-full text-sm mb-6 min-w-[520px]">
            <thead>
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
                <th className="text-left py-2.5 px-3 font-semibold text-[#171717] dark:text-[#E5E5E5] bg-[#F5F5F5] dark:bg-[#1E1E1E]">Type</th>
                <th className="text-left py-2.5 px-3 font-semibold text-[#171717] dark:text-[#E5E5E5] bg-[#F5F5F5] dark:bg-[#1E1E1E]">Width × Height</th>
                <th className="text-left py-2.5 px-3 font-semibold text-[#171717] dark:text-[#E5E5E5] bg-[#F5F5F5] dark:bg-[#1E1E1E]">Aspect Ratio</th>
                <th className="text-left py-2.5 px-3 font-semibold text-[#171717] dark:text-[#E5E5E5] bg-[#F5F5F5] dark:bg-[#1E1E1E]">Max File Size</th>
              </tr>
            </thead>
            <tbody>
              {[
                { type: "Post / Tweet Image", dims: "1600 × 900 px", ratio: "16:9", size: "5 MB (JPG/PNG) / 15 MB (GIF)" },
                { type: "Profile Photo", dims: "400 × 400 px", ratio: "1:1", size: "2 MB" },
                { type: "Header / Banner", dims: "1500 × 500 px", ratio: "3:1", size: "5 MB" },
                { type: "Card Image (Summary Card)", dims: "1200 × 628 px", ratio: "1.91:1", size: "5 MB" },
              ].map((row, i) => (
                <tr key={row.type} className={`border-b border-[#E5E5E5] dark:border-[#2A2A2A] ${i % 2 === 0 ? "" : "bg-[#FAFAFA] dark:bg-[#1A1A1A]"}`}>
                  <td className="py-2.5 px-3 font-medium text-[#171717] dark:text-[#E5E5E5] text-sm">{row.type}</td>
                  <td className="py-2.5 px-3 text-[#737373] text-sm font-mono">{row.dims}</td>
                  <td className="py-2.5 px-3 text-[#737373] text-sm">{row.ratio}</td>
                  <td className="py-2.5 px-3 text-[#737373] text-sm">{row.size}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-8 mb-3">
          X / Twitter tips
        </h3>
        <ul className="space-y-2 mb-6 pl-4">
          {[
            "The timeline crops images to a 16:9 preview. Designing images at exactly 1600 × 900 px ensures what you see in preview is exactly what the user sees without tapping- critical for text-heavy graphics.",
            "X accepts JPEG, PNG, GIF, and WebP. For photographs, JPEG is the most efficient choice and avoids any re-encoding artifacts from format conversion on the platform's side.",
            "X uses the twitter:image meta tag for link card images. Always set this on your web pages alongside og:image, since Twitter reads its own tags preferentially.",
          ].map((item) => (
            <li key={item.slice(0, 30)} className="flex items-start gap-2 text-sm text-[#737373] leading-relaxed">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-indigo-400 dark:bg-indigo-600 shrink-0" />
              {item}
            </li>
          ))}
        </ul>

        {/* LinkedIn */}
        <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4" id="linkedin-sizes">
          LinkedIn image sizes 2026
        </h2>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          LinkedIn is used by professionals who will judge your content against a high standard of production quality. Blurry banners and pixelated logos signal carelessness in a context where first impressions carry real professional weight. LinkedIn displays images differently between desktop and mobile, so design with both in mind.
        </p>
        <div className="overflow-x-auto -mx-4 sm:mx-0 mb-6">
          <table className="w-full text-sm mb-6 min-w-[520px]">
            <thead>
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
                <th className="text-left py-2.5 px-3 font-semibold text-[#171717] dark:text-[#E5E5E5] bg-[#F5F5F5] dark:bg-[#1E1E1E]">Type</th>
                <th className="text-left py-2.5 px-3 font-semibold text-[#171717] dark:text-[#E5E5E5] bg-[#F5F5F5] dark:bg-[#1E1E1E]">Width × Height</th>
                <th className="text-left py-2.5 px-3 font-semibold text-[#171717] dark:text-[#E5E5E5] bg-[#F5F5F5] dark:bg-[#1E1E1E]">Aspect Ratio</th>
                <th className="text-left py-2.5 px-3 font-semibold text-[#171717] dark:text-[#E5E5E5] bg-[#F5F5F5] dark:bg-[#1E1E1E]">Max File Size</th>
              </tr>
            </thead>
            <tbody>
              {[
                { type: "Post Image (Landscape)", dims: "1200 × 627 px", ratio: "1.91:1", size: "5 MB" },
                { type: "Post Image (Square)", dims: "1200 × 1200 px", ratio: "1:1", size: "5 MB" },
                { type: "Post Image (Portrait)", dims: "627 × 1200 px", ratio: "4:5", size: "5 MB" },
                { type: "Profile Photo", dims: "400 × 400 px", ratio: "1:1", size: "8 MB" },
                { type: "Personal Cover Photo", dims: "1584 × 396 px", ratio: "4:1", size: "8 MB" },
                { type: "Company Page Cover", dims: "1128 × 191 px", ratio: "6:1", size: "4 MB" },
                { type: "Company Logo", dims: "300 × 300 px", ratio: "1:1", size: "4 MB" },
                { type: "Article Cover", dims: "1200 × 644 px", ratio: "1.86:1", size: "5 MB" },
              ].map((row, i) => (
                <tr key={row.type} className={`border-b border-[#E5E5E5] dark:border-[#2A2A2A] ${i % 2 === 0 ? "" : "bg-[#FAFAFA] dark:bg-[#1A1A1A]"}`}>
                  <td className="py-2.5 px-3 font-medium text-[#171717] dark:text-[#E5E5E5] text-sm">{row.type}</td>
                  <td className="py-2.5 px-3 text-[#737373] text-sm font-mono">{row.dims}</td>
                  <td className="py-2.5 px-3 text-[#737373] text-sm">{row.ratio}</td>
                  <td className="py-2.5 px-3 text-[#737373] text-sm">{row.size}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Second image */}
        <figure className="my-8">
          <img
            src="https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=800&q=80"
            alt="Content creator working on a laptop creating digital content"
            className="w-full rounded-lg"
            loading="lazy"
          />
          <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
            Consistent, correctly sized images across platforms build a professional content presence - Photo by Unsplash
          </figcaption>
        </figure>

        {/* TikTok */}
        <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4" id="tiktok-sizes">
          TikTok image and video sizes 2026
        </h2>
        <p className="text-xs bg-[#EEF2FF] dark:bg-[#1E1F3E] border border-[#C7D2FE] dark:border-[#2E3A5E] text-[#4F46E5] dark:text-[#818CF8] px-3 py-2 rounded mb-4">
          Ready to resize? Use <Link href="/resize/tiktok" className="font-semibold underline">Resize for TikTok</Link> to batch-resize photos to vertical (9:16) dimensions.
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          TikTok is primarily a video platform, and its image standards are defined around vertical video. Photo posts and carousels are also supported as of 2023 and growing in popularity for editorial and product content. The platform&apos;s UI elements occupy significant space at the top and bottom of the frame- design your key content to sit in the central safe zone.
        </p>
        <div className="overflow-x-auto -mx-4 sm:mx-0 mb-6">
          <table className="w-full text-sm mb-6 min-w-[520px]">
            <thead>
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
                <th className="text-left py-2.5 px-3 font-semibold text-[#171717] dark:text-[#E5E5E5] bg-[#F5F5F5] dark:bg-[#1E1E1E]">Type</th>
                <th className="text-left py-2.5 px-3 font-semibold text-[#171717] dark:text-[#E5E5E5] bg-[#F5F5F5] dark:bg-[#1E1E1E]">Width × Height</th>
                <th className="text-left py-2.5 px-3 font-semibold text-[#171717] dark:text-[#E5E5E5] bg-[#F5F5F5] dark:bg-[#1E1E1E]">Aspect Ratio</th>
                <th className="text-left py-2.5 px-3 font-semibold text-[#171717] dark:text-[#E5E5E5] bg-[#F5F5F5] dark:bg-[#1E1E1E]">Max File Size</th>
              </tr>
            </thead>
            <tbody>
              {[
                { type: "Video (Vertical - Recommended)", dims: "1080 × 1920 px", ratio: "9:16", size: "287.6 MB" },
                { type: "Video (Square)", dims: "1080 × 1080 px", ratio: "1:1", size: "287.6 MB" },
                { type: "Video (Landscape)", dims: "1920 × 1080 px", ratio: "16:9", size: "287.6 MB" },
                { type: "Photo Post / Carousel", dims: "1080 × 1920 px", ratio: "9:16", size: "20 MB per image" },
                { type: "Profile Photo", dims: "200 × 200 px", ratio: "1:1", size: " - " },
              ].map((row, i) => (
                <tr key={row.type} className={`border-b border-[#E5E5E5] dark:border-[#2A2A2A] ${i % 2 === 0 ? "" : "bg-[#FAFAFA] dark:bg-[#1A1A1A]"}`}>
                  <td className="py-2.5 px-3 font-medium text-[#171717] dark:text-[#E5E5E5] text-sm">{row.type}</td>
                  <td className="py-2.5 px-3 text-[#737373] text-sm font-mono">{row.dims}</td>
                  <td className="py-2.5 px-3 text-[#737373] text-sm">{row.ratio}</td>
                  <td className="py-2.5 px-3 text-[#737373] text-sm">{row.size}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* YouTube */}
        <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4" id="youtube-sizes">
          YouTube image sizes 2026
        </h2>
        <p className="text-xs bg-[#EEF2FF] dark:bg-[#1E1F3E] border border-[#C7D2FE] dark:border-[#2E3A5E] text-[#4F46E5] dark:text-[#818CF8] px-3 py-2 rounded mb-4">
          Ready to resize? Use <Link href="/resize/youtube-thumbnail" className="font-semibold underline">Resize for YouTube</Link> to batch-resize thumbnails to 1280×720px.
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          YouTube thumbnail design is one of the highest-impact visual tasks for video creators. Research consistently shows that thumbnails directly influence click-through rate more than titles for most content categories. YouTube also has strict size requirements for channel art that must adapt across TV, desktop, tablet, and mobile simultaneously. Official specs are published at{" "}
          <a
            href="https://support.google.com/youtube/answer/2972003"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#525252] hover:decoration-gray-600 dark:hover:decoration-[#A3A3A3] transition-colors"
          >
            YouTube Help Center
          </a>
          .
        </p>
        <div className="overflow-x-auto -mx-4 sm:mx-0 mb-6">
          <table className="w-full text-sm mb-6 min-w-[520px]">
            <thead>
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
                <th className="text-left py-2.5 px-3 font-semibold text-[#171717] dark:text-[#E5E5E5] bg-[#F5F5F5] dark:bg-[#1E1E1E]">Type</th>
                <th className="text-left py-2.5 px-3 font-semibold text-[#171717] dark:text-[#E5E5E5] bg-[#F5F5F5] dark:bg-[#1E1E1E]">Width × Height</th>
                <th className="text-left py-2.5 px-3 font-semibold text-[#171717] dark:text-[#E5E5E5] bg-[#F5F5F5] dark:bg-[#1E1E1E]">Aspect Ratio</th>
                <th className="text-left py-2.5 px-3 font-semibold text-[#171717] dark:text-[#E5E5E5] bg-[#F5F5F5] dark:bg-[#1E1E1E]">Max File Size</th>
              </tr>
            </thead>
            <tbody>
              {[
                { type: "Video Thumbnail", dims: "1280 × 720 px", ratio: "16:9", size: "2 MB" },
                { type: "Channel Banner (TV)", dims: "2560 × 1440 px", ratio: "16:9", size: "6 MB" },
                { type: "Channel Banner (Desktop)", dims: "2560 × 423 px (safe zone)", ratio: " - ", size: "6 MB" },
                { type: "Channel Profile Photo", dims: "800 × 800 px", ratio: "1:1", size: "4 MB" },
                { type: "Community Post Image", dims: "1280 × 720 px", ratio: "16:9", size: " - " },
                { type: "End Screen Element", dims: "1280 × 720 px", ratio: "16:9", size: " - " },
              ].map((row, i) => (
                <tr key={row.type} className={`border-b border-[#E5E5E5] dark:border-[#2A2A2A] ${i % 2 === 0 ? "" : "bg-[#FAFAFA] dark:bg-[#1A1A1A]"}`}>
                  <td className="py-2.5 px-3 font-medium text-[#171717] dark:text-[#E5E5E5] text-sm">{row.type}</td>
                  <td className="py-2.5 px-3 text-[#737373] text-sm font-mono">{row.dims}</td>
                  <td className="py-2.5 px-3 text-[#737373] text-sm">{row.ratio}</td>
                  <td className="py-2.5 px-3 text-[#737373] text-sm">{row.size}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-8 mb-3">
          YouTube tips
        </h3>
        <ul className="space-y-2 mb-6 pl-4">
          {[
            "YouTube channel banners are the most complex image on this list. The full 2560 × 1440 px canvas is displayed on TVs; desktop shows only the central 1546 × 423 px band; mobile shows 1546 × 423 px; tablets show a wider band. Design text and logos in the center 1235 × 338 px safe zone to ensure visibility on all devices.",
            "Thumbnails must be under 2 MB. YouTube re-encodes images that exceed this limit, causing visible quality degradation on titles and faces. Compress your thumbnail to under 2 MB before uploading- use SammaPix Compress to do this without visible quality loss.",
            "The minimum thumbnail size is 640 × 360 px, but 1280 × 720 px is the standard. Higher-resolution screens will show visible pixelation below this threshold.",
          ].map((item) => (
            <li key={item.slice(0, 30)} className="flex items-start gap-2 text-sm text-[#737373] leading-relaxed">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-indigo-400 dark:bg-indigo-600 shrink-0" />
              {item}
            </li>
          ))}
        </ul>

        {/* Pinterest */}
        <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4" id="pinterest-sizes">
          Pinterest image sizes 2026
        </h2>
        <p className="text-xs bg-[#EEF2FF] dark:bg-[#1E1F3E] border border-[#C7D2FE] dark:border-[#2E3A5E] text-[#4F46E5] dark:text-[#818CF8] px-3 py-2 rounded mb-4">
          Ready to resize? Use <Link href="/resize/pinterest" className="font-semibold underline">Resize for Pinterest</Link> to batch-resize pins to the recommended 1000×1500px (2:3 ratio).
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Pinterest is a visual discovery engine, not a traditional social media platform, which means images compete entirely on visual impact. Tall, vertical pins take up significantly more feed space than horizontal ones and consistently outperform square or landscape formats. Pinterest recommends a strict 2:3 ratio for standard pins as the best performer in their feed algorithm.
        </p>
        <div className="overflow-x-auto -mx-4 sm:mx-0 mb-6">
          <table className="w-full text-sm mb-6 min-w-[520px]">
            <thead>
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
                <th className="text-left py-2.5 px-3 font-semibold text-[#171717] dark:text-[#E5E5E5] bg-[#F5F5F5] dark:bg-[#1E1E1E]">Type</th>
                <th className="text-left py-2.5 px-3 font-semibold text-[#171717] dark:text-[#E5E5E5] bg-[#F5F5F5] dark:bg-[#1E1E1E]">Width × Height</th>
                <th className="text-left py-2.5 px-3 font-semibold text-[#171717] dark:text-[#E5E5E5] bg-[#F5F5F5] dark:bg-[#1E1E1E]">Aspect Ratio</th>
                <th className="text-left py-2.5 px-3 font-semibold text-[#171717] dark:text-[#E5E5E5] bg-[#F5F5F5] dark:bg-[#1E1E1E]">Max File Size</th>
              </tr>
            </thead>
            <tbody>
              {[
                { type: "Standard Pin (Recommended)", dims: "1000 × 1500 px", ratio: "2:3", size: "20 MB" },
                { type: "Square Pin", dims: "1000 × 1000 px", ratio: "1:1", size: "20 MB" },
                { type: "Long Pin (Infographic)", dims: "1000 × 2100 px", ratio: "1:2.1", size: "20 MB" },
                { type: "Video Pin", dims: "1000 × 1500 px", ratio: "2:3", size: "2 GB" },
                { type: "Profile Photo", dims: "165 × 165 px", ratio: "1:1", size: " - " },
                { type: "Board Cover", dims: "222 × 150 px", ratio: "1.48:1", size: " - " },
              ].map((row, i) => (
                <tr key={row.type} className={`border-b border-[#E5E5E5] dark:border-[#2A2A2A] ${i % 2 === 0 ? "" : "bg-[#FAFAFA] dark:bg-[#1A1A1A]"}`}>
                  <td className="py-2.5 px-3 font-medium text-[#171717] dark:text-[#E5E5E5] text-sm">{row.type}</td>
                  <td className="py-2.5 px-3 text-[#737373] text-sm font-mono">{row.dims}</td>
                  <td className="py-2.5 px-3 text-[#737373] text-sm">{row.ratio}</td>
                  <td className="py-2.5 px-3 text-[#737373] text-sm">{row.size}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* How to resize section */}
        <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4" id="resize-sammapix">
          How to resize images for social media with SammaPix
        </h2>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Resizing each image to the correct dimensions for every platform manually- especially when managing multiple accounts- is time-consuming work. SammaPix provides two tools that handle this efficiently, entirely in your browser without uploading your files to any server.
        </p>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-8 mb-3">
          ResizePack- batch resize to exact dimensions
        </h3>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          <Link
            href="/tools/resizepack"
            className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#525252] hover:decoration-gray-600 dark:hover:decoration-[#A3A3A3] transition-colors"
          >
            ResizePack
          </Link>{" "}
          lets you drop multiple images and output them at a set of target dimensions in one operation. You can define pixel dimensions- for example, 1080 × 1080 px for Instagram square posts- and process an entire folder of images in seconds. The output maintains maximum quality using canvas-based client-side processing. Useful for:
        </p>
        <ul className="space-y-2 mb-6 pl-4">
          {[
            "Preparing a set of product photos for Instagram at 1080 × 1080 px",
            "Exporting a batch of blog header images to the correct Facebook share dimensions",
            "Resizing team headshots to the exact profile photo dimensions for LinkedIn",
          ].map((item) => (
            <li key={item.slice(0, 30)} className="flex items-start gap-2 text-sm text-[#737373] leading-relaxed">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-indigo-400 dark:bg-indigo-600 shrink-0" />
              {item}
            </li>
          ))}
        </ul>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-8 mb-3">
          CropRatio- crop to exact aspect ratios
        </h3>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          When you need to crop an existing image to a specific social media ratio - 4:5 for Instagram portrait, 9:16 for Stories, 16:9 for YouTube thumbnails- {" "}
          <Link
            href="/tools/croproatio"
            className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#525252] hover:decoration-gray-600 dark:hover:decoration-[#A3A3A3] transition-colors"
          >
            CropRatio
          </Link>{" "}
          gives you a visual crop tool with locked aspect ratios. Select the target platform ratio, position the crop frame over your subject, and export at full resolution. No guessing whether you are hitting the exact ratio manually.
        </p>

        {/* First CTA box */}
        <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md overflow-hidden mt-8 mb-8">
          <div className="px-5 py-4 bg-[#FAFAFA] dark:bg-[#1E1E1E] border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
            <p className="text-xs font-semibold uppercase tracking-wide text-[#A3A3A3] dark:text-[#737373]">
              Free tools- no upload, no signup
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-[#E5E5E5] dark:divide-[#2A2A2A]">
            <Link
              href="/tools/resizepack"
              className="flex items-center justify-between gap-3 px-5 py-4 hover:bg-[#FAFAFA] dark:hover:bg-[#1E1E1E] transition-colors group"
            >
              <div>
                <p className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-0.5">Batch Resize</p>
                <p className="text-xs text-[#737373]">Batch resize to exact pixel dimensions</p>
              </div>
              <ArrowRight className="h-4 w-4 text-[#A3A3A3] group-hover:text-[#171717] dark:group-hover:text-[#E5E5E5] group-hover:translate-x-0.5 transition-all shrink-0" strokeWidth={1.5} />
            </Link>
            <Link
              href="/tools/croproatio"
              className="flex items-center justify-between gap-3 px-5 py-4 hover:bg-[#FAFAFA] dark:hover:bg-[#1E1E1E] transition-colors group"
            >
              <div>
                <p className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-0.5">Crop & Ratio</p>
                <p className="text-xs text-[#737373]">Crop images to locked aspect ratios</p>
              </div>
              <ArrowRight className="h-4 w-4 text-[#A3A3A3] group-hover:text-[#171717] dark:group-hover:text-[#E5E5E5] group-hover:translate-x-0.5 transition-all shrink-0" strokeWidth={1.5} />
            </Link>
          </div>
        </div>

        {/* Image format recommendations */}
        <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4" id="format-recommendations">
          Image format recommendations for social media
        </h2>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Choosing the right file format before uploading matters as much as choosing the right dimensions. Each platform applies its own encoding pipeline on upload- but the format you provide determines how much quality the platform has to work with before its compression kicks in.
        </p>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-8 mb-3">
          JPEG- the universal choice for social media photos
        </h3>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          JPEG remains the most reliable format for uploading photographs to social media. Every major platform is optimized to handle JPEG, supports its metadata conventions, and applies its own re-encoding on top of it. Upload at 85–95% quality- higher than this rarely improves visible quality but increases file size, and lower than 80% will show compression artifacts after the platform re-encodes the image again.
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          For most platforms - Instagram, Facebook, X, LinkedIn - JPEG is the format that gives platforms the cleanest source material to work from. Use{" "}
          <Link
            href="/tools/compress"
            className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#525252] hover:decoration-gray-600 dark:hover:decoration-[#A3A3A3] transition-colors"
          >
            SammaPix Compress
          </Link>{" "}
          to reduce JPEG file sizes before upload without degrading the quality the platform will use as its source.
        </p>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-8 mb-3">
          PNG- for graphics, logos, and screenshots
        </h3>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          For any image that contains flat areas of color, text overlays, or a transparent background- such as a logo, infographic, or screenshot - PNG is the correct choice. JPEG compression introduces visible artifacts on hard edges and flat fills that PNG encoding avoids entirely through its lossless compression model.
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Some platforms, notably Facebook, also serve PNG files with less aggressive re-encoding than JPEG in certain contexts. For cover photos and page logos, PNG often yields sharper final output.
        </p>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-8 mb-3">
          WebP- for your own website, not direct social uploads
        </h3>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          WebP is the ideal format for images on your own website- blog posts, landing pages, and portfolio galleries. It delivers 25–35% smaller files than JPEG at equivalent quality and is supported by all modern browsers. Use{" "}
          <Link
            href="/tools/webp"
            className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#525252] hover:decoration-gray-600 dark:hover:decoration-[#A3A3A3] transition-colors"
          >
            SammaPix WebP Converter
          </Link>{" "}
          to batch-convert photos before publishing to your site.
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          For direct social media uploads, WebP is accepted by some platforms (X/Twitter, Facebook) but is not the recommended format for maximum quality preservation. Stick to JPEG for social uploads and reserve WebP for your own web properties.
        </p>

        {/* Quick reference summary */}
        <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4" id="quick-reference">
          Quick reference: format by platform
        </h2>
        <div className="overflow-x-auto -mx-4 sm:mx-0 mb-6">
          <table className="w-full text-sm mb-6 min-w-[460px]">
            <thead>
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
                <th className="text-left py-2.5 px-3 font-semibold text-[#171717] dark:text-[#E5E5E5] bg-[#F5F5F5] dark:bg-[#1E1E1E]">Platform</th>
                <th className="text-left py-2.5 px-3 font-semibold text-[#171717] dark:text-[#E5E5E5] bg-[#F5F5F5] dark:bg-[#1E1E1E]">Best Format (Photos)</th>
                <th className="text-left py-2.5 px-3 font-semibold text-[#171717] dark:text-[#E5E5E5] bg-[#F5F5F5] dark:bg-[#1E1E1E]">Best Format (Graphics)</th>
                <th className="text-left py-2.5 px-3 font-semibold text-[#171717] dark:text-[#E5E5E5] bg-[#F5F5F5] dark:bg-[#1E1E1E]">WebP Accepted</th>
              </tr>
            </thead>
            <tbody>
              {[
                { platform: "Instagram", photo: "JPEG (85–95%)", graphic: "PNG", webp: "No" },
                { platform: "Facebook", photo: "JPEG (85–95%)", graphic: "PNG", webp: "Yes" },
                { platform: "X / Twitter", photo: "JPEG (85–95%)", graphic: "PNG", webp: "Yes" },
                { platform: "LinkedIn", photo: "JPEG (85–95%)", graphic: "PNG", webp: "No" },
                { platform: "TikTok", photo: "JPEG / PNG", graphic: "PNG", webp: "No" },
                { platform: "YouTube", photo: "JPEG (90%+)", graphic: "PNG", webp: "No" },
                { platform: "Pinterest", photo: "JPEG (85–95%)", graphic: "PNG", webp: "No" },
              ].map((row, i) => (
                <tr key={row.platform} className={`border-b border-[#E5E5E5] dark:border-[#2A2A2A] ${i % 2 === 0 ? "" : "bg-[#FAFAFA] dark:bg-[#1A1A1A]"}`}>
                  <td className="py-2.5 px-3 font-medium text-[#171717] dark:text-[#E5E5E5] text-sm">{row.platform}</td>
                  <td className="py-2.5 px-3 text-[#737373] text-sm">{row.photo}</td>
                  <td className="py-2.5 px-3 text-[#737373] text-sm">{row.graphic}</td>
                  <td className="py-2.5 px-3 text-[#737373] text-sm">{row.webp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Common mistakes */}
        <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4" id="common-mistakes">
          Common mistakes that degrade social media image quality
        </h2>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Even with the correct dimensions, certain upload practices degrade final image quality in ways that are preventable.
        </p>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-8 mb-3">
          Double compression
        </h3>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Every social platform re-encodes your uploaded image with its own compression algorithm. If you upload an image that has already been compressed aggressively- for example, a JPEG at 60% quality- the platform compounds the existing artifacts with its own pass, producing visibly degraded output. Always upload from a high-quality source file and let the platform apply its single compression pass.
        </p>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-8 mb-3">
          Uploading screenshots of other social posts
        </h3>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Reposting content by screenshotting it and re-uploading introduces multiple quality degradation passes. Screen resolution adds DPI scaling artifacts, and the platform applies its own compression on top. If you want to reshare existing content, use the platform&apos;s native share or repost feature rather than screenshotting.
        </p>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-8 mb-3">
          Wrong aspect ratio leading to forced cropping
        </h3>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Platforms never leave letterbox bars around images- they crop to fill the container. If your image does not match the expected aspect ratio for the placement, the platform crops it, often removing the most important part of the frame. Use{" "}
          <Link
            href="/tools/croproatio"
            className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#525252] hover:decoration-gray-600 dark:hover:decoration-[#A3A3A3] transition-colors"
          >
            CropRatio
          </Link>{" "}
          to crop to the correct ratio before uploading and control exactly which part of the image is preserved.
        </p>

        {/* FAQ */}
        <div className="mt-10 pt-8 border-t border-gray-100 dark:border-[#2A2A2A]">
          <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mb-6" id="faq">
            FAQ
          </h2>
          <div className="space-y-6">
            {[
              {
                q: "What is the universal best image size for social media in 2026?",
                a: "There is no single universal size- each platform and placement has its own specifications. However, 1080 × 1080 px at 1:1 is the most versatile single size: it works as an Instagram square post, a Facebook feed image, a LinkedIn post, and a Pinterest square pin without cropping. For anything else, resize to the exact dimensions listed for each platform in this guide.",
              },
              {
                q: "What happens if I upload an image that is too small?",
                a: "The platform scales it up, introducing pixelation and blurring that is irreversible. Always upload at or above the recommended dimensions. You can reduce an image to fit, but you cannot recover quality by enlarging a small image.",
              },
              {
                q: "Should I compress my images before uploading to social media?",
                a: "You should reduce the file size enough to speed up the upload, but not so aggressively that you introduce visible artifacts. A good rule of thumb is to target 85–90% JPEG quality- below the platform's quality threshold so you are not paying a file size penalty, but above the threshold where artifacts become visible after the platform's own re-encoding pass.",
              },
              {
                q: "Why do my Instagram images look blurry after upload?",
                a: "The three most common causes are: uploading below the recommended 1080 px width, uploading a file that has already been heavily compressed, or using a format that Instagram re-encodes aggressively (such as a heavily compressed WebP). Upload as a high-quality JPEG at exactly 1080 px width for the sharpest results.",
              },
              {
                q: "Do image sizes change frequently?",
                a: "Platform specifications change with feature updates- typically once or twice per year per platform. YouTube banner dimensions changed with the introduction of the channel page redesign. Instagram story safe zones shifted with the introduction of the Reels tab UI. Bookmark this guide and check back after major platform redesigns.",
              },
              {
                q: "What is the best tool to resize images for social media for free?",
                a: "SammaPix Batch Resize lets you batch-resize images to exact pixel dimensions entirely in your browser- no upload, no account required. Crop & Ratio handles aspect-ratio cropping with a visual interface for when you need to select a specific region. Both tools are free and process your files locally without sending them to any server.",
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

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}

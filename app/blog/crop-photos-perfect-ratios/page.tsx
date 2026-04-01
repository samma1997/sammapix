import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { APP_URL } from "@/lib/constants";
import BlogArticleLayout from "@/components/blog/BlogArticleLayout";

export const metadata: Metadata = {
  title: "Crop Photos to Perfect Ratios for Print & Social",
  description:
    "Learn every crop photo ratio you need: 1:1 for Instagram, 4:6 for print, 16:9 for widescreen, 9:16 for Stories. Includes DPI requirements, composition tips, and batch cropping guide.",
  alternates: {
    canonical: `${APP_URL}/blog/crop-photos-perfect-ratios`,
  },
  keywords: [
    "crop photo ratio",
    "aspect ratio for photos",
    "photo crop for Instagram",
    "print photo sizes",
    "crop ratio for social media",
    "photo aspect ratio guide",
    "batch crop photos",
    "rule of thirds cropping",
    "photo DPI for print",
    "image crop dimensions",
  ],
  openGraph: {
    title: "How to Crop Photos to Perfect Ratios for Print and Social Media",
    description:
      "Every crop photo ratio explained: 1:1, 4:3, 3:2, 16:9, 9:16, and 5:4- with use cases for Instagram, print, widescreen, and Stories. Includes DPI and composition guidance.",
    url: `${APP_URL}/blog/crop-photos-perfect-ratios`,
    type: "article",
    publishedTime: "2026-02-20",
    authors: ["https://lucasammarco.com"],
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Crop Photos to Perfect Ratios for Print and Social Media",
    description:
      "Every crop photo ratio explained - Instagram, print, widescreen, Stories. Includes DPI requirements and composition tips.",
    creator: "@lucasammarco",
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline:
    "How to Crop Photos to Perfect Ratios for Print and Social Media",
  description:
    "Learn every crop photo ratio you need: 1:1 for Instagram, 4:6 for print, 16:9 for widescreen, 9:16 for Stories. Includes DPI requirements, composition tips, and batch cropping guide.",
  url: `${APP_URL}/blog/crop-photos-perfect-ratios`,
  datePublished: "2026-02-20",
  dateModified: "2026-02-20",
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
    "@id": `${APP_URL}/blog/crop-photos-perfect-ratios`,
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
      name: "How to Crop Photos to Perfect Ratios for Print and Social Media",
      item: `${APP_URL}/blog/crop-photos-perfect-ratios`,
    },
  ],
};

const POST_DATE = "2026-02-20";
const POST_DATE_FORMATTED = "February 20, 2026";
const POST_URL = `${APP_URL}/blog/crop-photos-perfect-ratios`;
const POST_TITLE =
  "How to Crop Photos to Perfect Ratios for Print and Social Media";


export default function CropPhotoPerfectRatiosPage() {
  return (
    <>
      <BlogArticleLayout
        title="How to Crop Photos to Perfect Ratios for Print and Social Media"
        slug="crop-photos-perfect-ratios"
        description="Cropping a photo sounds simple- until your Instagram post gets cut off, your 4x6 print has white bars on both sides, or your YouTube thumbnail is pillarboxed. Every platform and every print size expects a specific crop photo ratio, and getting it wrong costs you resolution, composition, and credibility. This guide covers every ratio you will encounter, when to use each one, and how to apply them without guesswork."
        date="2026-02-20"
        dateFormatted="February 20, 2026"
        tags={["Tools"]}
        readingTime={10}
        headings={[
          { id: "what-is-aspect-ratio", title: "What is an aspect ratio and why does it matter for cropping?" },
          { id: "six-common-ratios", title: "The six most common aspect ratios explained" },
          { id: "ratio-reference-table", title: "Aspect ratio reference table: which ratio for which purpose" },
          { id: "print-dpi-requirements", title: "Print sizes and DPI requirements: what you need to know" },
          { id: "rule-of-thirds", title: "Rule of thirds and composition when cropping" },
          { id: "batch-crop-sammapix", title: "How to batch crop photos to a specific ratio with SammaPix CropRatio" },
          { id: "platform-requirements", title: "Platform-specific cropping requirements in 2026" },
          { id: "faq", title: "FAQ" },
        ]}
        summary={[
          "The 4:5 portrait ratio takes up the most feed space on Instagram, making it the optimal choice for engagement over square or landscape crops.",
          "For sharp physical prints, you need at least 300 DPI at the final print dimensions - a 4x6 print requires 1200x1800 pixels minimum.",
          "Always straighten the horizon and apply the rule of thirds before finalizing any crop to ensure strong composition.",
          "SammaPix CropRatio lets you batch crop to any preset or custom ratio with smart face detection, entirely in-browser.",
          "Pre-crop photos to the exact target ratio before uploading to any print lab or social platform to avoid automated center-crops that ruin compositions.",
        ]}
        heroImage={
          <figure>
            <img
              src="https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800&q=80&auto=format&fit=crop"
              alt="Photography composition with camera and printed photos on a wooden surface"
              className="w-full rounded-lg"
              loading="eager"
            />
            <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
              Getting the right crop ratio is the difference between a sharp post and a blurry, auto-cropped mess
            </figcaption>
          </figure>
        }
        ctaBlock={
          <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2">
              Crop, resize, and compress- all free, all in your browser
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-4">
              Use SammaPix Crop & Ratio to batch-crop to any ratio, ResizePack to hit exact pixel targets, and Compress to reduce file size without visible quality loss- all free, all in your browser.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/tools/croproatio"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
              >
                Open CropRatio
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
              <Link
                href="/tools/resizepack"
                className="inline-flex items-center gap-2 px-4 py-2 border border-gray-200 dark:border-[#333] text-gray-700 dark:text-[#A3A3A3] text-sm font-medium rounded-md hover:bg-gray-50 dark:hover:bg-[#252525] transition-colors"
              >
                Try ResizePack
              </Link>
              <Link
                href="/tools/compress"
                className="inline-flex items-center gap-2 px-4 py-2 border border-gray-200 dark:border-[#333] text-gray-700 dark:text-[#A3A3A3] text-sm font-medium rounded-md hover:bg-gray-50 dark:hover:bg-[#252525] transition-colors"
              >
                Try Compress
              </Link>
            </div>
          </div>
        }
      >
        {/* Article body content */}


        <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4" id="what-is-aspect-ratio">
          What is an aspect ratio and why does it matter for cropping?
        </h2>

        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          An{" "}
          <a
            href="https://en.wikipedia.org/wiki/Aspect_ratio_(image)"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors"
          >
            aspect ratio
          </a>{" "}
          is the proportional relationship between an image&apos;s width
          and height, expressed as two numbers separated by a colon- for
          example 16:9 or 4:3. It describes shape, not size. A 1920x1080
          pixel screen and a 3840x2160 pixel screen share the same 16:9
          aspect ratio even though their resolutions differ by a factor of
          four.
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          When you crop a photo, you are trimming it to match a specific
          ratio. If the target ratio does not match your original image,
          you will lose part of the frame. The goal is to crop
          intentionally- preserving your subject while satisfying the
          dimension requirements of your destination platform or print
          size.
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Getting the crop photo ratio right before you share or send to
          print saves you from platform auto-cropping (which never picks
          the right area of your image), print shop rejections, and the
          visual awkwardness of letterboxed or pillarboxed outputs.
        </p>

        <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4" id="six-common-ratios">
          The six most common aspect ratios explained
        </h2>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-8 mb-3">
          1:1 - The square
        </h3>

        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Equal width and height. Instagram popularized the square format
          when it launched, and while the platform now supports other
          ratios, 1:1 remains the safest choice for feed posts because it
          occupies the maximum grid real estate without being cropped in
          thumbnails.
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Square crops work best for portraits (face fills the frame
          symmetrically), product shots on white backgrounds, and detail
          shots where the subject is centered. They struggle with
          landscapes and wide architectural shots- avoid forcing a
          horizontal scene into a square unless you have a strong central
          subject to anchor it.
        </p>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-8 mb-3">
          4:3 - The classic camera ratio
        </h3>

        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Historically the standard for 35mm slide film and early digital
          cameras, 4:3 is slightly wider than square and feels natural for
          most subjects. Modern smartphones often default to 4:3 in Photo
          mode because it matches the sensor&apos;s native shape. Standard
          print sizes like 4x3 inches and 8x6 inches use this ratio
          directly.
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Use 4:3 for general photography, travel snapshots, food shots,
          and any print destined for a standard photo album. It is
          forgiving on composition because the modest horizontal extension
          beyond square accommodates most scenes without forcing you to
          sacrifice too much of the frame on either side.
        </p>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-8 mb-3">
          3:2 - The DSLR standard
        </h3>

        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          The 3:2 ratio comes from 35mm film photography and is baked into
          virtually every full-frame and crop-sensor DSLR and mirrorless
          camera. A standard 4x6 inch print- the most common consumer
          print size globally- is exactly 3:2. So is a 6x4 inch, 12x8
          inch, or any other doubling of those dimensions.
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          If you shoot with a DSLR or mirrorless camera and plan to print
          4x6 copies, you are already in the right ratio and can print
          with no cropping at all. The ratio is also used for LinkedIn
          post images and some blog header formats.
        </p>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-8 mb-3">
          16:9 - Widescreen
        </h3>

        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          The dominant ratio for video and screens. Every modern television,
          laptop screen, desktop monitor, and YouTube video uses 16:9.
          It is also the required ratio for YouTube thumbnails (1280x720
          minimum), Twitter/X link preview cards, Facebook shared link
          images, and LinkedIn article cover photos.
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Cropping a portrait or square photo to 16:9 is aggressive- you
          lose a significant portion of the vertical dimension. Plan for
          this when shooting: if you know an image is destined for a
          widescreen crop, compose loosely and avoid placing critical
          elements near the top or bottom of the frame.
        </p>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-8 mb-3">
          9:16 - Vertical / Stories
        </h3>

        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          The portrait orientation of 16:9- and the native format of
          every short-form video platform. Instagram Stories, Instagram
          Reels, TikTok, YouTube Shorts, Facebook Stories, Pinterest Idea
          Pins, and Snapchat all use 9:16. At 1080x1920 pixels, it fills
          a smartphone screen edge to edge.
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          When cropping a horizontal photo to 9:16, you will lose most of
          the width. The result only works if the primary subject is
          vertically centered in the original frame. A better approach is
          to shoot vertical from the start when you know the destination is
          Stories- or use a tool that lets you place the crop manually
          rather than automatically centering it.
        </p>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-8 mb-3">
          5:4 - Portrait and print
        </h3>

        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          The 5:4 ratio corresponds to the 8x10 inch print- one of the
          most popular portrait print sizes in photography studios. It is
          slightly more square than 4:3, which makes it flattering for
          portrait work and less claustrophobic than a strict square.
          Instagram also supports portrait posts at 4:5 (the inverse of
          5:4), which is the tallest ratio the platform allows in feed
          posts and occupies more screen space than a square.
        </p>

        <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4" id="ratio-reference-table">
          Aspect ratio reference table: which ratio for which purpose
        </h2>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border border-gray-200 dark:border-[#2A2A2A] rounded-md overflow-hidden">
            <thead>
              <tr className="bg-gray-50 dark:bg-[#252525]">
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-gray-700 dark:text-[#E5E5E5] border-b border-gray-200 dark:border-[#2A2A2A]">
                  Ratio
                </th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-gray-700 dark:text-[#E5E5E5] border-b border-gray-200 dark:border-[#2A2A2A]">
                  Pixels (common)
                </th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-gray-700 dark:text-[#E5E5E5] border-b border-gray-200 dark:border-[#2A2A2A]">
                  Primary use cases
                </th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-gray-700 dark:text-[#E5E5E5] border-b border-gray-200 dark:border-[#2A2A2A]">
                  Print size
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100 dark:border-[#2A2A2A]">
                <td className="px-4 py-2.5 text-gray-800 dark:text-[#E5E5E5] font-medium">
                  1:1
                </td>
                <td className="px-4 py-2.5 text-[#737373]">
                  1080×1080
                </td>
                <td className="px-4 py-2.5 text-[#737373]">
                  Instagram grid, Facebook post, profile avatars
                </td>
                <td className="px-4 py-2.5 text-[#737373]">
                  4×4&Prime;, 5×5&Prime;
                </td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-[#2A2A2A]">
                <td className="px-4 py-2.5 text-gray-800 dark:text-[#E5E5E5] font-medium">
                  4:3
                </td>
                <td className="px-4 py-2.5 text-[#737373]">
                  1200×900
                </td>
                <td className="px-4 py-2.5 text-[#737373]">
                  Standard camera output, blog images, presentation slides
                </td>
                <td className="px-4 py-2.5 text-[#737373]">
                  4×3&Prime;, 8×6&Prime;
                </td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-[#2A2A2A]">
                <td className="px-4 py-2.5 text-gray-800 dark:text-[#E5E5E5] font-medium">
                  3:2
                </td>
                <td className="px-4 py-2.5 text-[#737373]">
                  1500×1000
                </td>
                <td className="px-4 py-2.5 text-[#737373]">
                  DSLR native, LinkedIn posts, 4×6 print
                </td>
                <td className="px-4 py-2.5 text-[#737373]">
                  4×6&Prime;, 6×9&Prime;, 8×12&Prime;
                </td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-[#2A2A2A]">
                <td className="px-4 py-2.5 text-gray-800 dark:text-[#E5E5E5] font-medium">
                  16:9
                </td>
                <td className="px-4 py-2.5 text-[#737373]">
                  1920×1080
                </td>
                <td className="px-4 py-2.5 text-[#737373]">
                  YouTube thumbnails, Twitter cards, desktop wallpapers, video
                </td>
                <td className="px-4 py-2.5 text-[#737373]">
                 - (screen format)
                </td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-[#2A2A2A]">
                <td className="px-4 py-2.5 text-gray-800 dark:text-[#E5E5E5] font-medium">
                  9:16
                </td>
                <td className="px-4 py-2.5 text-[#737373]">
                  1080×1920
                </td>
                <td className="px-4 py-2.5 text-[#737373]">
                  Instagram Stories & Reels, TikTok, YouTube Shorts
                </td>
                <td className="px-4 py-2.5 text-[#737373]">
                 - (screen format)
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 text-gray-800 dark:text-[#E5E5E5] font-medium">
                  5:4
                </td>
                <td className="px-4 py-2.5 text-[#737373]">
                  1250×1000
                </td>
                <td className="px-4 py-2.5 text-[#737373]">
                  Instagram portrait posts (4:5), studio portrait prints
                </td>
                <td className="px-4 py-2.5 text-[#737373]">
                  5×4&Prime;, 10×8&Prime;, 20×16&Prime;
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4" id="print-dpi-requirements">
          Print sizes and DPI requirements: what you need to know
        </h2>

        {/* Second Unsplash image */}
        <div className="mb-8 rounded-md overflow-hidden border border-gray-100 dark:border-[#2A2A2A]">
          <img
            src="https://images.unsplash.com/photo-1493863641943-9b68992a8d07?w=800&q=80&auto=format&fit=crop"
            alt="Camera and photo prints laid out showing different print sizes and compositions"
            className="w-full h-52 object-cover"
            loading="lazy"
            width={800}
            height={416}
          />
        </div>

        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Aspect ratio determines shape. DPI (dots per inch) determines
          print quality. You need both to be correct for a sharp physical
          print. According to{" "}
          <a
            href="https://photographylife.com/dpi-for-printing-photos"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors"
          >
            Photography Life
          </a>
          , the minimum resolution for a print that looks sharp when
          viewed at normal distances (30–40 cm) is 240 DPI. Professional
          labs typically require 300 DPI at the final print dimensions.
        </p>

        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          To calculate the minimum pixel dimensions for a given print size
          at 300 DPI, multiply each dimension in inches by 300:
        </p>

        <ul className="text-sm text-[#737373] leading-relaxed mb-4 list-disc pl-5 space-y-2">
          <li>
            <strong className="text-gray-800 dark:text-[#E5E5E5]">
              4×6 inch print (3:2 ratio):
            </strong>{" "}
            1200×1800 px minimum at 300 DPI
          </li>
          <li>
            <strong className="text-gray-800 dark:text-[#E5E5E5]">
              5×7 inch print (approx 5:7 ratio):
            </strong>{" "}
            1500×2100 px minimum at 300 DPI
          </li>
          <li>
            <strong className="text-gray-800 dark:text-[#E5E5E5]">
              8×10 inch print (5:4 ratio):
            </strong>{" "}
            2400×3000 px minimum at 300 DPI
          </li>
          <li>
            <strong className="text-gray-800 dark:text-[#E5E5E5]">
              11×14 inch print (approx 11:14 ratio):
            </strong>{" "}
            3300×4200 px minimum at 300 DPI
          </li>
          <li>
            <strong className="text-gray-800 dark:text-[#E5E5E5]">
              12×18 inch print (2:3 ratio):
            </strong>{" "}
            3600×5400 px minimum at 300 DPI
          </li>
        </ul>

        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          A 12-megapixel smartphone camera produces images around
          4000×3000 pixels- enough for a sharp 13×10 inch print at
          300 DPI. Modern cameras at 24–50 megapixels produce images
          that can be printed at 20×13 inches or larger without
          interpolation. The limitation is always the crop: the more you
          crop, the fewer pixels remain, and the smaller the maximum
          print you can make at full quality.
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          This is why cropping and resizing are connected decisions.{" "}
          <Link
            href="/tools/resizepack"
            className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors"
          >
            SammaPix ResizePack
          </Link>{" "}
          lets you resize images to exact pixel dimensions after cropping,
          so you can verify the final pixel count before sending to a
          print lab.
        </p>

        <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4" id="rule-of-thirds">
          Rule of thirds and composition when cropping
        </h2>

        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          The most technically correct crop can still produce a weak image
          if the composition is off. Cropping is not just a mechanical
          operation- it is a creative one. The crop is your second chance
          to nail the composition you intended when you pressed the
          shutter.
        </p>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-8 mb-3">
          Apply the rule of thirds
        </h3>

        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Divide your crop frame into a 3×3 grid. Place your primary
          subject at one of the four intersection points of those grid
          lines rather than dead center. Eyes in portraits should fall on
          the upper horizontal third. A horizon line in a landscape
          should sit on the top or bottom third, not in the middle.
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          When cropping, use this grid as your anchor. If you are moving
          toward a 1:1 square from a wider shot, shift the crop box so
          the main subject lands on an intersection point. The result will
          feel intentional rather than mechanical. Most photo editing apps
          display a thirds grid overlay when you are in crop mode- use it
          every time.
        </p>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-8 mb-3">
          Leave breathing room
        </h3>

        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          A common cropping mistake is cropping too tight. Subjects that
          are pressed against the edges of the frame feel claustrophobic.
          As a rule: leave at least 5–10% of empty space around the
          subject on all sides. For portraits, never crop at the joints- 
          not at the wrist, elbow, knee, or ankle. Crop between joints
          instead.
        </p>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-8 mb-3">
          Straighten before you crop
        </h3>

        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          A tilted horizon is one of the most jarring problems in
          photography. Always check your horizon line before finalizing a
          crop. Most tools let you rotate and crop simultaneously- use
          the rotate function first, then finalize the ratio. Straightening
          after the fact costs you pixels around the edges, so account
          for this in your composition.
        </p>

        <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4" id="batch-crop-sammapix">
          How to batch crop photos to a specific ratio with SammaPix CropRatio
        </h2>

        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Cropping one photo manually is straightforward. Cropping fifty
          photos to the same ratio- all with correct compositions, without
          the platform auto-cropping them incorrectly- is tedious and
          error-prone if done one by one.
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          SammaPix{" "}
          <Link
            href="/tools/croproatio"
            className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors"
          >
            CropRatio
          </Link>{" "}
          is a browser-based batch cropping tool designed for exactly this
          workflow. Here is how it works:
        </p>

        <ul className="text-sm text-[#737373] leading-relaxed mb-4 list-disc pl-5 space-y-2">
          <li>
            <strong className="text-gray-800 dark:text-[#E5E5E5]">
              Drop your photos
            </strong>{" "}
           - drag a folder or individual files into the drop zone. The
            tool accepts JPG, PNG, and WebP with no upload limit.
          </li>
          <li>
            <strong className="text-gray-800 dark:text-[#E5E5E5]">
              Select your target ratio
            </strong>{" "}
           - choose from presets (1:1, 4:3, 3:2, 16:9, 9:16, 5:4) or
            enter a custom ratio for unusual formats.
          </li>
          <li>
            <strong className="text-gray-800 dark:text-[#E5E5E5]">
              Choose crop positioning
            </strong>{" "}
           - center, smart-crop to the detected face or subject, or
            define a focal point manually per image.
          </li>
          <li>
            <strong className="text-gray-800 dark:text-[#E5E5E5]">
              Preview before export
            </strong>{" "}
           - review each crop in the thumbnail grid. Adjust any that look
            off before downloading.
          </li>
          <li>
            <strong className="text-gray-800 dark:text-[#E5E5E5]">
              Download individually or as a ZIP
            </strong>{" "}
           - all processing happens in your browser. No files are uploaded
            to any server.
          </li>
        </ul>

        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          The smart crop option is particularly useful for portrait
          batches where you want faces to remain centered in the frame
          regardless of how the original photo was composed. It detects
          face regions and positions the crop box so the face stays within
          the upper third of the output.
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          After cropping, you can optionally pass your files through{" "}
          <Link
            href="/tools/compress"
            className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors"
          >
            SammaPix Compress
          </Link>{" "}
          to reduce file sizes for web delivery- maintaining your exact
          crop dimensions at a fraction of the original file weight.
        </p>

        <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4" id="platform-requirements">
          Platform-specific cropping requirements in 2026
        </h2>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-8 mb-3">
          Instagram
        </h3>

        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Instagram supports three ratios in the feed: square (1:1),
          landscape (1.91:1, which is close to 16:9 but cropped to
          Instagram&apos;s container), and portrait (4:5). The 4:5 portrait
          ratio takes up the most vertical space in the feed and therefore
          gets more visual attention- use it for single-subject photos
          where vertical framing works. Square 1:1 is the safest for
          carousel posts because all images display consistently.
        </p>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-8 mb-3">
          YouTube and video platforms
        </h3>

        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          YouTube thumbnails must be 16:9. The minimum dimensions are
          1280×720 pixels, but 1920×1080 is recommended for retina
          displays. Thumbnails that do not match 16:9 will have black bars
          added automatically- always crop to the correct ratio before
          uploading.
        </p>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-8 mb-3">
          Pinterest
        </h3>

        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Pinterest favors vertical content. The optimal ratio for standard
          pins is 2:3 (1000×1500 pixels), and for Idea Pins (the
          full-screen format), 9:16. Images that are too wide get cropped
          to a square in the feed, which can ruin compositions- always
          crop vertically before uploading to Pinterest.
        </p>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-8 mb-3">
          Print: photo labs
        </h3>

        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Most consumer photo labs in 2026 use automated cropping when the
          image ratio does not match the selected print size. The software
          crops from the center by default- which means it will cut off
          people&apos;s heads, miss the key subject in a landscape, or
          produce awkward compositions consistently. Always pre-crop to
          the target print ratio before uploading to any online lab.
        </p>

        <hr className="my-8 border-gray-100 dark:border-[#2A2A2A]" />

        <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4" id="faq">
          FAQ
        </h2>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-8 mb-3">
          What is the best crop photo ratio for Instagram?
        </h3>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          For feed posts: 4:5 (portrait) for maximum visual impact, or
          1:1 (square) for consistent carousel appearances. For Stories
          and Reels: 9:16. Avoid 16:9 landscape in the feed- it renders
          small relative to portrait and square posts.
        </p>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-8 mb-3">
          What ratio is a standard 4x6 photo print?
        </h3>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          A 4x6 inch print is exactly 3:2- the native ratio of virtually
          all DSLR and mirrorless cameras. If you shoot with one of these
          cameras and print 4x6, you can print the full frame with no
          cropping. Smartphone photos (typically 4:3) will require a small
          crop on the long edges to fit a 4x6 print.
        </p>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-8 mb-3">
          How many pixels do I need for a sharp 8x10 print?
        </h3>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          At 300 DPI, an 8x10 inch print requires 2400×3000 pixels minimum.
          At 240 DPI (acceptable for photos viewed at arm&apos;s length),
          the minimum is 1920×2400 pixels. Any modern smartphone with
          12 megapixels or more produces images with sufficient resolution
          for this size- provided you have not cropped heavily.
        </p>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-8 mb-3">
          Can I crop a horizontal photo to 9:16 for Stories?
        </h3>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Technically yes, but the result is rarely good. Cropping a
          landscape photo to a 9:16 vertical removes roughly 75% of the
          horizontal width- most subjects will be cut off. A better
          approach: place the photo as a background element in a 9:16
          canvas with blurred edges, or use an app that lets you position
          a small landscape image within a 9:16 frame with a colored or
          blurred background.
        </p>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-8 mb-3">
          What is the difference between aspect ratio and resolution?
        </h3>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Aspect ratio describes the shape of an image (width-to-height
          proportion). Resolution describes the number of pixels. A
          1080×1080 image and a 3000×3000 image have the same 1:1 aspect
          ratio but very different resolutions. For web use, aspect ratio
          matters most. For print, both ratio and resolution must match
          the target size.
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
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { APP_URL } from "@/lib/constants";
import BlogArticleLayout from "@/components/blog/BlogArticleLayout";

// ── Metadata ──────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Crop an Image into a Circle Online Free [2026]",
  description:
    "Crop any image into a perfect circle online — entirely in your browser via Canvas. No upload, no server, no signup. Output is a transparent PNG. Batch + ZIP. Free.",
  alternates: {
    canonical: `${APP_URL}/blog/crop-image-into-circle-online`,
  },
  keywords: [
    "crop image into circle",
    "crop image to circle online",
    "circle crop image",
    "round profile picture",
    "circular avatar maker",
    "make profile picture circle",
    "crop photo into circle",
    "circular image online",
    "circle crop online free",
    "round profile picture online",
    "circular avatar free",
    "crop image circle no upload",
    "profile picture circle transparent",
    "crop photo circle png",
  ],
  openGraph: {
    title: "Crop an Image into a Circle Online Free [2026]",
    description:
      "Crop any image into a circle in your browser via Canvas. No upload, no server, no signup. Transparent PNG output. Batch 20 images, ZIP download. Free.",
    url: `${APP_URL}/blog/crop-image-into-circle-online`,
    type: "article",
    publishedTime: "2026-08-03",
    authors: ["https://lucasammarco.com"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Crop an Image into a Circle Online Free [2026]",
    description:
      "Circle crop tool that runs 100% in your browser via Canvas. No upload, no server. Transparent PNG output. Batch 20 images, ZIP download. Free.",
    creator: "@lucasammarco",
  },
};

// ── Schema constants ──────────────────────────────────────────────────────────

const POST_DATE = "2026-08-03";
const POST_DATE_FORMATTED = "August 3, 2026";
const POST_URL = `${APP_URL}/blog/crop-image-into-circle-online`;
const POST_TITLE = "Crop an Image into a Circle Online Free [2026]";

// ── Article schema ────────────────────────────────────────────────────────────

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: POST_TITLE,
  description:
    "Most online circle crop tools upload your image to a remote server. SammaPix Round Image runs entirely in your browser using the Canvas API — the file never leaves your device. This guide explains how browser-based circle cropping works, why the output is a transparent PNG (not JPG), how to center your subject perfectly, and how to batch-process profile pictures at once.",
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
  keywords: [
    "crop image into circle",
    "circle crop online",
    "round profile picture",
    "circular avatar",
    "circle crop transparent png",
    "profile picture circle",
  ],
};

// ── Breadcrumb schema ─────────────────────────────────────────────────────────

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: APP_URL },
    { "@type": "ListItem", position: 2, name: "Blog", item: `${APP_URL}/blog` },
    {
      "@type": "ListItem",
      position: 3,
      name: POST_TITLE,
      item: POST_URL,
    },
  ],
};

// ── HowTo schema ──────────────────────────────────────────────────────────────

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Crop an Image into a Circle Online Without Uploading It",
  description:
    "Crop any image into a perfect circle in your browser with no file upload, using SammaPix Round Image powered by the HTML Canvas API. The output is a transparent PNG — no white box around the circle. Supports batch processing and ZIP download.",
  totalTime: "PT1M",
  tool: [
    {
      "@type": "HowToTool",
      name: "SammaPix Round Image (browser-based, free, no upload)",
    },
  ],
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Open the Round Image tool",
      text: "Go to sammapix.com/tools/round-image in any modern browser. No account or signup required.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Drop your images onto the tool",
      text: "Drag one or more images onto the dropzone or click to browse. You can load up to 20 files at once. The files are read locally by your browser — nothing is uploaded to any server.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Select circle crop mode",
      text: "Choose the circle option to crop the image into a perfect circle. The tool uses the inscribed circle — the largest circle that fits inside the image dimensions.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Click Apply",
      text: "The tool draws each image onto an HTML Canvas element, applies a circular clipping path, and exports it as a transparent PNG. Processing happens entirely on your device in milliseconds.",
    },
    {
      "@type": "HowToStep",
      position: 5,
      name: "Download individually or as a ZIP",
      text: "Download each circular image on its own, or click Download All as ZIP to get all processed files in a single archive. Everything is served from browser memory — no file ever touches a server.",
    },
  ],
};

// ── FAQ schema ────────────────────────────────────────────────────────────────

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Does cropping an image into a circle online mean uploading it to a server?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "With most tools, yes. Canva, Adobe Express, and similar services upload your image to their servers for processing. With SammaPix Round Image, no. The circle crop is applied entirely in your browser using the HTML Canvas API — a built-in browser technology for drawing and compositing images locally. Your file never leaves your device. You can verify this yourself by opening your browser's Network inspector (F12) and watching for outgoing requests while the tool processes your image. You will see none.",
      },
    },
    {
      "@type": "Question",
      name: "Why does circle cropping output a PNG instead of a JPG?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "JPEG does not support transparency. A circle has a transparent background — everything outside the circular boundary is see-through. If you exported a circle crop as JPEG, the browser would fill the transparent area with white (or black), destroying the circular appearance and replacing it with a square with a circle drawn on top. PNG supports alpha channels (transparency), so the pixels outside the circle are genuinely transparent. When you place the PNG on any background — a web page, a slide, a document — the circle appears correctly without any white box around it. This is the correct output format for any image with a transparent background.",
      },
    },
    {
      "@type": "Question",
      name: "Can I crop a profile picture into a circle for Twitter, LinkedIn, or Zoom?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, and this is one of the most common uses. Most social platforms — Twitter, LinkedIn, Zoom, Slack, Discord, Google Meet — display profile pictures in a circular frame. However, they do this by cropping a square image into a circle in their own UI. The underlying file you upload does not need to be circular. That said, cropping your photo into a circle first lets you control exactly which part of the image is visible, ensure the subject is centered, and preview exactly what the final circular avatar will look like before uploading. The SammaPix Round Image tool outputs a transparent PNG circle, which you can upload directly or use in a presentation, app mockup, or document where the circle appears without a background box.",
      },
    },
    {
      "@type": "Question",
      name: "Can I batch crop multiple profile pictures into circles at once?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. SammaPix Round Image supports batch processing of up to 20 images per session. Drop all your files at once onto the dropzone, select circle crop mode, and click Apply. Each image is processed independently through the same Canvas pipeline. When done, you can download each circular file individually or click Download All as ZIP to get every cropped image in a single archive — all from browser memory, with no upload.",
      },
    },
    {
      "@type": "Question",
      name: "What is the inscribed circle, and will it crop parts of my subject?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The inscribed circle is the largest circle that fits entirely within the image rectangle. For a square image (same width and height), the inscribed circle touches all four edges and the circle diameter equals the image side length. For a non-square image (landscape or portrait), the inscribed circle is limited by the shorter dimension. For example, a 1200x900 image produces a 900px-diameter circle — the 900px height is the limiting dimension. The center of the circle is placed at the center of the image. This means that for a portrait photo where the subject is centered, the face and upper body will be well-centered in the circle. For images where the subject is off-center, you may want to crop and square the image first using a tool like SammaPix Crop to Ratio before applying the circle crop.",
      },
    },
    {
      "@type": "Question",
      name: "Does the circle crop affect image quality?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. The circle crop is a geometric clipping operation — the pixels inside the circle are taken directly from the original image without any re-encoding or interpolation. The canvas draws the original image and applies a circular clip path. The result is exported as a lossless PNG. The pixels inside the circle are identical to the original source pixels. There is no quality loss whatsoever for the visible image content.",
      },
    },
    {
      "@type": "Question",
      name: "How do I verify no upload happens when I circle crop my image?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Open your browser developer tools (F12 on Windows/Linux, Command Option I on Mac), click the Network tab, then drop your image into the SammaPix Round Image tool and click Apply. Watch the network panel. You will see requests for static page assets (JavaScript, CSS) when the tool first loads. During circle cropping and download, you will see zero outgoing requests. The image is read by the FileReader API, processed entirely in memory via the Canvas API, and the circular output is downloaded via a blob: URL — no network call is made.",
      },
    },
  ],
};

// ── Page ──────────────────────────────────────────────────────────────────────

export default function CropImageIntoCircleOnlinePage() {
  return (
    <>
      <BlogArticleLayout
        title={POST_TITLE}
        slug="crop-image-into-circle-online"
        description="Cropping a profile picture into a circle should not require handing your photo to a third-party server. SammaPix Round Image runs entirely in your browser via the Canvas API — no upload, no signup, no server. The output is a transparent PNG, which means the circular cutout works on any background without a white box. Here is everything about how it works and when you need it."
        date={POST_DATE}
        dateFormatted={POST_DATE_FORMATTED}
        tags={["Creative", "Tools"]}
        readingTime={9}
        headings={[
          { id: "the-upload-problem", title: "The problem: most circle crop tools upload your photo" },
          { id: "how-browser-circle-crop-works", title: "How browser-based circle cropping actually works" },
          { id: "why-transparent-png", title: "Why the output must be a transparent PNG, not a JPG" },
          { id: "subject-centering", title: "How to center your subject before circle cropping" },
          { id: "batch-processing", title: "How to batch crop multiple profile pictures into circles" },
          { id: "step-by-step", title: "How to crop an image into a circle online, step by step" },
          { id: "profile-picture-use-cases", title: "Circle crop for social media: Twitter, LinkedIn, Zoom, and Discord" },
          { id: "quality-impact", title: "Does circle cropping affect image quality?" },
          { id: "comparison-table", title: "Browser-based vs upload-based circle crop tools: honest comparison" },
          { id: "verify-no-upload", title: "How to verify no upload happens" },
          { id: "related-image-tools", title: "Other image tools that run in your browser" },
          { id: "faq", title: "FAQ" },
        ]}
        summary={[
          "Most online circle crop tools (Canva, Adobe Express, PFPMaker) upload your file to a remote server. For profile photos and personal images, that is an unnecessary risk.",
          "SammaPix Round Image runs entirely in your browser using the HTML Canvas API. Your file never leaves your device.",
          "The output is always a transparent PNG — the pixels outside the circle are genuinely see-through, not white-filled. This is essential for placing the circular avatar on any background.",
          "The circle is the largest inscribed circle for your image. For non-square images, the shorter dimension determines the circle diameter.",
          "Batch-process up to 20 images in one session and download all circular PNGs as a ZIP — entirely in-browser.",
          "You can verify no upload happens by watching the Network inspector in DevTools while the tool runs.",
        ]}
        heroImage={
          <figure>
            <img
              src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="A team of people looking at a laptop screen, representing the profile pictures used across workplace tools like Zoom, Slack, and LinkedIn that require circular avatar images."
              className="w-full max-h-[460px] object-cover rounded-lg"
              loading="eager"
            />
            <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
              Profile pictures for Zoom, Slack, and LinkedIn all display in a circle — cropping yours correctly means full control over what the circle shows.
            </figcaption>
          </figure>
        }
        ctaBlock={
          <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2">
              Crop your images into a circle right now, no upload needed
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-4">
              SammaPix Round Image runs entirely in your browser via the Canvas API. Transparent PNG output.
              Batch 20 images at once. Download individually or as ZIP. Free, no signup.
            </p>
            <div className="flex flex-wrap gap-3 items-center">
              <Link
                href="/tools/round-image"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
              >
                Open Round Image, Free
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
              <Link
                href="/tools/croproatio"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
              >
                Crop to Ratio <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
              <Link
                href="/tools/remove-bg"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
              >
                Remove Background <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
            </div>
          </div>
        }
      >

        {/* ── Section 1: The upload problem ──────────────────────────────── */}

        <h2 id="the-upload-problem" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          The problem: most circle crop tools upload your photo
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          You need a circular profile picture for LinkedIn, a round avatar for Slack, or a circular photo for a presentation slide. You search for &ldquo;crop image into circle online&rdquo; and land on one of the common tools — PFPMaker, Canva, Adobe Express, or one of dozens of smaller sites.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          You drag the image in. A progress bar appears. The file uploads to their server, gets processed remotely, and you receive the circular crop back. Applying a circular clip path to an image is one of the most elementary Canvas operations that exists. There is no technical reason it needs a server.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          For a photo of a product this is a minor inconvenience. But profile pictures are inherently personal — your face, your colleagues&apos; faces, photos of your children for a school directory, headshots for a company website. Every upload to an unknown service is a privacy risk you are accepting without realizing it.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          I built{" "}
          <Link href="/tools/round-image" className="text-[#6366F1] hover:underline">SammaPix Round Image</Link>{" "}
          to crop images into circles entirely inside your browser. No server is involved at any point. The tool uses the HTML Canvas API — a built-in browser technology that has been available in every modern browser for over a decade. Clipping a circle is a drawing operation, and modern browsers handle it locally and instantly.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          What &ldquo;no upload&rdquo; actually means
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          When you drop an image into SammaPix Round Image, your browser reads the file using the{" "}
          <a href="https://developer.mozilla.org/en-US/docs/Web/API/FileReader" target="_blank" rel="noopener noreferrer" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">FileReader API</a>{" "}
          — a standard browser API for reading local files without network access. The image is decoded into pixel data, passed to an{" "}
          <a href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement" target="_blank" rel="noopener noreferrer" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">HTML Canvas element</a>,{" "}
          clipped with a circular path, and exported as a{" "}
          <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">blob:</code>{" "}
          URL downloaded directly from browser memory. Zero network requests carry your image to any remote server.
        </p>

        {/* ── Section 2: How browser circle crop works ──────────────────── */}

        <h2 id="how-browser-circle-crop-works" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          How browser-based circle cropping actually works
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Understanding the mechanism helps you trust the result and predict the output exactly. Here is what happens under the hood when you click Apply with circle mode selected:
        </p>

        <ol className="mb-4 space-y-3">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">FileReader reads the image from your device.</strong> The file is loaded into browser memory as an ArrayBuffer. No network request is made. The read is entirely local — the same mechanism your device&apos;s photo app uses to open an image file.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">The browser decodes the image into a bitmap.</strong> The compressed image file (JPEG, PNG, WebP, etc.) is decoded into a raw pixel array — an ImageBitmap object in browser memory. This is the same operation that happens when a browser renders any image on a webpage.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">A square Canvas element is created.</strong> The canvas is sized to the diameter of the inscribed circle — the largest circle that fits within the image dimensions. For a 1200x900 image, the canvas is 900x900 pixels. For a 1080x1080 square image, the canvas is 1080x1080 pixels.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">A circular clipping path is applied.</strong> Before drawing the image, the canvas 2D context calls{" "}
            <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">ctx.arc()</code>{" "}
            to define a circle at the canvas center, then{" "}
            <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">ctx.clip()</code>{" "}
            to restrict all subsequent drawing to inside that circle.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">The image is drawn centered on the canvas.</strong> The image is drawn so its center aligns with the canvas center. Only the pixels within the circular clip path are rendered — everything outside the circle remains transparent alpha.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">The result is exported as a transparent PNG and offered for download.</strong> The canvas is converted to a PNG Blob — the only format that preserves the transparent alpha channel. The Blob is served via a temporary{" "}
            <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">blob:</code> URL and downloaded directly. Nothing leaves your device.
          </li>
        </ol>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The Canvas API has been a browser standard since HTML5 (2014) and is available in every modern browser including Chrome, Safari, Firefox, and Edge. Clipping paths are one of its core drawing primitives — applying a circle clip and drawing an image inside it is three lines of JavaScript. No server is needed or justified.
        </p>

        {/* ── Section 3: Why transparent PNG ────────────────────────────── */}

        <h2 id="why-transparent-png" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Why the output must be a transparent PNG, not a JPG
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          This is the most important thing to understand about circle cropping. When you crop an image into a circle, the area outside the circle should be <strong className="text-gray-800 dark:text-[#E5E5E5]">transparent</strong> — meaning it has no color at all and shows through to whatever is underneath it (a web page background, a slide background, a document page).
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          JPEG format does not support transparency. If you tried to save the circle crop as a JPEG, the browser would be forced to fill the transparent pixels with a solid color — typically white or black. The result would look like a square image with a circle drawn on it, surrounded by a white box. This completely defeats the purpose of the circle crop.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          PNG format supports an alpha channel — a fourth value for each pixel that controls opacity from 0 (fully transparent) to 255 (fully opaque). Pixels inside the circle have full opacity. Pixels outside the circle have zero opacity (they are completely transparent). When you place this PNG on any background, the circle appears clean and correct.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          When you see a white box around your circle
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          If you have ever used a circle crop tool and ended up with a white box around the circular image, that tool exported JPEG instead of PNG (or a PNG that was pre-filled with white before cropping). SammaPix Round Image exports a genuine transparent PNG — the alpha channel is correctly set to zero for all pixels outside the circle. You can verify this in any image editor by opening the PNG and checking whether the background layer is empty or filled.
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Output format</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Supports transparency</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Result on a colored background</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">PNG (correct)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Yes — alpha channel preserves transparency.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Circle appears clean. Background shows through where the circle is not. No box.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">JPEG (wrong)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">No — transparent pixels are filled with white (or black).</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Circle appears surrounded by a white box. Looks wrong on any non-white background.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">WebP (also valid)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Yes — WebP supports alpha transparency.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Circle appears clean. Slightly smaller file than PNG. Use PNG for maximum compatibility.</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ── Section 4: Subject centering ──────────────────────────────── */}

        <h2 id="subject-centering" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          How to center your subject before circle cropping
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The inscribed circle is always centered at the center of the image. If your subject — your face, your logo, the focal point of the photo — is not centered in the image, the circle will crop it off-center or even cut off part of the subject.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          For profile pictures and headshots, the face is typically centered in portrait-orientation photos already. But for landscape photos or images where the subject is positioned to one side (following the rule of thirds, for example), the circle will be centered on the midpoint of the image, not on the face.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Step 1: Square crop to the area you want circled
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The best practice is to first crop the image to a square (1:1 aspect ratio) centered on your subject, then apply the circle crop. Use{" "}
          <Link href="/tools/croproatio" className="text-[#6366F1] hover:underline">SammaPix Crop to Ratio</Link>{" "}
          to crop your image to 1:1 with your subject centered. A square input produces the ideal inscribed circle — the full width and height are both used, and the circle is as large as possible.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          What happens with non-square inputs
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          If you apply circle crop to a landscape photo (wider than tall), the circle diameter is determined by the height — the shorter dimension. The left and right edges of the image are cut off. For a 1200x800 image, the output is an 800x800 transparent PNG with an 800px-diameter circle drawn from the center of the original 1200x800 image.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          For a portrait photo (taller than wide), the circle diameter is determined by the width. The top and bottom edges are cut. For a 900x1200 image, the output is a 900x900 transparent PNG with a 900px-diameter circle.
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Input aspect ratio</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Circle diameter</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Output canvas size</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">What gets cropped</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Square (1:1)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Full width = full height</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Same as input</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Only the four corners outside the circle</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Landscape (wider than tall)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Equal to height</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">height x height (square)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Left and right edges plus the four corners</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Portrait (taller than wide)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Equal to width</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">width x width (square)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Top and bottom edges plus the four corners</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ── Section 5: Batch processing ───────────────────────────────── */}

        <h2 id="batch-processing" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          How to batch crop multiple profile pictures into circles
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Preparing one profile picture is quick. The real need for batch processing appears when you have a team directory, a speakers page for a conference, a company org chart, or a school yearbook — any situation where you need to convert a collection of portrait photos into consistent circular avatars.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          SammaPix Round Image supports batch processing natively. Drop up to 20 images at once onto the dropzone. All files are loaded into browser memory simultaneously. You select circle crop mode once, and the same circular clipping is applied identically to every image in the batch. The Canvas pipeline processes each file sequentially in milliseconds.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          When all circles are applied, you can:
        </p>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Download each file individually.</strong> Click the download button next to any image to save the transparent PNG on its own.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Download all as a ZIP.</strong> Click Download All as ZIP to get every circular PNG packaged into a single archive, ready to upload to your platform, send to a designer, or add to your website. The ZIP is assembled in-browser using the JSZip library — no server involved.
          </li>
        </ul>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          For web developers building a team page, this workflow is especially useful: prepare all headshots at the same dimensions, drop them all at once, circle crop in one click, download as ZIP, and unpack directly into your project folder. Every avatar is a transparent PNG ready to be placed on any background color.
        </p>

        {/* ── Tool CTA #1 ────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">Crop your images into circles in your browser now</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            Batch-process up to 20 images. Transparent PNG output. Download all as ZIP.
            No upload. No signup. Free.
          </p>
          <Link
            href="/tools/round-image"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
          >
            Open Round Image, Free <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
          </Link>
        </div>

        {/* ── Section 6: Step by step ───────────────────────────────────── */}

        <h2 id="step-by-step" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          How to crop an image into a circle online, step by step
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The full process takes under two minutes for a batch of 20 images:
        </p>

        <ol className="mb-4 space-y-3">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">(Optional) Square crop your image first.</strong> If your subject is not centered in the photo, use{" "}
            <Link href="/tools/croproatio" className="text-[#6366F1] hover:underline">Crop to Ratio</Link>{" "}
            to cut it to 1:1 with the face or focal point centered. This ensures the circle fits the subject perfectly.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Go to sammapix.com/tools/round-image</strong> in Chrome, Safari, Firefox, or Edge. No account required.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Drop your images onto the dropzone</strong> or click to browse. You can select multiple files at once. Accepted formats include JPEG, PNG, WebP, GIF, and AVIF. Files are loaded into browser memory immediately.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Select circle crop mode.</strong> The circle option applies the inscribed circle at the center of each image. For square inputs this crops only the four corners. For non-square inputs this also trims the longer edges.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Click Apply.</strong> Each image is processed through the Canvas pipeline in sequence. A preview of each circular PNG appears below, showing the transparent background as a checkerboard pattern — the standard visual indicator for transparency.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Download individually or as ZIP.</strong> Click the download icon next to any image, or click Download All as ZIP to get everything in one archive. No network request occurs. Files are served from browser memory.
          </li>
        </ol>

        {/* ── Section 7: Social profile picture use cases ───────────────── */}

        <h2 id="profile-picture-use-cases" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Circle crop for social media: Twitter, LinkedIn, Zoom, and Discord
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Every major platform displays profile pictures in a circle. Here is what each platform actually needs and how circle cropping in advance helps:
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Twitter / X
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Twitter accepts a square image and applies its own circular crop in the UI. The recommended size is 400x400 pixels, though Twitter accepts up to 2MB. You do not need to upload a pre-cropped circle — but using the Round Image tool gives you a preview of exactly what the circle will look like before you upload. This is useful for ensuring your face or logo is well-centered before the platform applies its own circular mask.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          LinkedIn
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          LinkedIn applies a circular mask to all profile photos and also applies its own smart crop. The recommended upload size is 400x400 to 7680x4320 pixels (square). For professional headshots where the face is already well-centered in the frame, LinkedIn&apos;s auto-crop usually works well. For creative or stylized shots where you want precise control over which part of the image appears in the circle, pre-crop using Round Image first.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Zoom and Google Meet
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Video conferencing tools display your avatar in a circle when your camera is off. Zoom recommends a square image of at least 96x96 pixels. Google Meet uses your Google profile picture. Both apply their own circular crop. Using Round Image to preview and prepare the circular version means you know exactly how your avatar will appear during meetings — this is especially useful for company-wide avatar standardization projects.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Discord and Slack
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Both Discord and Slack display user avatars in circles throughout the interface. Discord recommends a minimum of 128x128 pixels and displays at much smaller sizes in most views (32x32 or 40x40 px). Having a pre-circled transparent PNG is useful when you want to use the avatar in a graphic, a server banner, or a design mockup where you need the circular shape to be visible against a background that is not white.
        </p>

        {/* ── Section 8: Quality impact ──────────────────────────────────── */}

        <h2 id="quality-impact" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Does circle cropping affect image quality?
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          No. The circle crop is a pure geometric clipping operation. The pixels inside the circle are identical to the corresponding pixels in the original image. No re-encoding, no interpolation, no quality reduction of any kind is applied to the visible image content.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The Canvas API draws the original decoded image directly onto the canvas and clips it. The clip path masks the alpha channel of the output pixels — it does not modify the RGB color values at all. The only difference between the original source pixels and the output pixels within the circle is the added alpha value (set to fully opaque), which matches what they already were for a non-transparent source image.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The output format is PNG, which is lossless. Unlike JPEG, PNG does not re-compress or re-encode the image data in a lossy way. The pixel values inside the circle in the output PNG are mathematically identical to the source image&apos;s pixel values at those coordinates.
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Input format</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Output format</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Quality impact on visible pixels</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">JPEG</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Transparent PNG</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Zero quality loss on visible pixels. The decode step is lossless; no re-encoding of the image content.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">PNG</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Transparent PNG</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Zero quality loss. Both input and output are lossless. Pixels are identical.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">WebP</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Transparent PNG</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">The initial WebP decode is lossless for lossless WebP; for lossy WebP, original compression artifacts are preserved but no new ones are introduced.</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ── Tool CTA #2 ────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">Your images stay on your device</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            No upload, no account, no server. Supports JPEG, PNG, WebP, GIF, AVIF. Batch 20 files.
            Transparent PNG output. ZIP download. Free.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/tools/round-image"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            >
              Open Round Image, Free <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link
              href="/blog/round-image-corners-free"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
            >
              Rounded corners guide <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>
        </div>

        {/* ── Section 9: Comparison table ───────────────────────────────── */}

        <h2 id="comparison-table" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Browser-based vs upload-based circle crop tools: honest comparison
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Here is an objective comparison across the dimensions that matter when choosing a tool for circle cropping profile pictures online:
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Dimension</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Upload-based (PFPMaker, Canva, Adobe Express)</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Browser-based (SammaPix)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Privacy</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Face photos and headshots uploaded to a remote server. You trust their storage and deletion policies.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">File never leaves your device. Verifiable via browser Network inspector.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Output format</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Varies. Some export PNG, some export JPG with white fill (defeating the circle effect).</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Always a genuine transparent PNG — no white box, works on any background.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Batch processing</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Most free plans limit to one image at a time or require a subscription for bulk circle crop.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Up to 20 images per session. Download all as ZIP. Free.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Speed</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Depends on upload speed and server load. Slow on poor connections or large batches.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Instant on modern hardware. No network latency. Processing done by your device CPU.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">File size limits</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Free plans often cap at 5 to 25 MB per file.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Limited by device memory. No artificial cap imposed by the tool.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Signup required</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Often required beyond very basic free use. Canva requires an account for ZIP downloads.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">No account required. No signup. No watermark on output.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Works offline</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">No — requires internet to upload and process.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">After the page loads, circle cropping works without an internet connection.</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ── Section 10: Verify no upload ──────────────────────────────── */}

        <h2 id="verify-no-upload" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          How to verify no upload happens
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          You do not need to take my word for it. Here is how to verify this yourself in under two minutes:
        </p>

        <ol className="mb-4 space-y-3">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Open DevTools.</strong> Press F12 (Windows/Linux) or Command Option I (Mac) in your browser. On Safari you may need to enable the Develop menu first in Settings &#8250; Advanced.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Go to the Network tab.</strong> Click the Network panel in DevTools. If you see existing requests, clear them.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Drop your images and click Apply.</strong> Watch the Network panel as the tool processes each file.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Observe: no outgoing requests.</strong> You will see no network activity during circle cropping or download. The only requests that appear are the initial page load assets (JavaScript, CSS). Nothing carries your image to any server.
          </li>
        </ol>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          If you want to be extra thorough, enable the &ldquo;Preserve log&rdquo; option in the Network tab before starting. You will still see zero outgoing requests carrying your image bytes.
        </p>

        {/* ── Section 11: Related tools ─────────────────────────────────── */}

        <h2 id="related-image-tools" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Other image tools that run in your browser
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          SammaPix offers a full suite of browser-based image tools, all with no upload and no server processing. Here is when to use each alongside Round Image:
        </p>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/croproatio" className="text-[#6366F1] hover:underline">Crop to Ratio</Link></strong>: crop images to exact aspect ratios — 1:1, 4:3, 16:9, 4:5. Use this before circle cropping to square your image and center your subject. See{" "}
            <Link href="/blog/crop-photos-perfect-ratios" className="text-[#6366F1] hover:underline">how to crop photos to perfect ratios</Link>.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/remove-bg" className="text-[#6366F1] hover:underline">Remove Background</Link></strong>: AI-powered background removal. Remove the background before circle cropping for a portrait where you want the subject isolated inside the circle, with no background visible at all.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/add-border" className="text-[#6366F1] hover:underline">Add Border</Link></strong>: add a colored border around any image. After circle cropping, use this to add a circular ring effect — drop the PNG onto the border tool, choose inset mode, and set a thin border color to create a ring around the circle.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/rotate-image" className="text-[#6366F1] hover:underline">Rotate Image</Link></strong>: rotate any image before circle cropping. If your portrait photo is sideways due to EXIF orientation issues, fix the rotation first, then circle crop.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/resizepack" className="text-[#6366F1] hover:underline">Resize Images</Link></strong>: resize your circular PNG to the exact pixel dimensions required by the target platform — 400x400 for Twitter, 300x300 for LinkedIn, 128x128 for Discord.
          </li>
        </ul>

        {/* ── Tool CTA #3 ────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">All your image editing needs, all in-browser</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            Circle crop, add rounded corners, crop to ratio, remove background, rotate, and resize without uploading your images anywhere.
            All tools run locally in your browser via Canvas API. No server. No signup. No watermark.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/tools/round-image"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
            >
              Round Image <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link
              href="/tools/croproatio"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
            >
              Crop to Ratio <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link
              href="/tools/remove-bg"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
            >
              Remove Background <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link
              href="/tools/resizepack"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
            >
              Resize Images <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>
        </div>

        {/* ── FAQ ──────────────────────────────────────────────────────────── */}

        <section id="faq">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
            FAQ
          </h2>
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </>
  );
}

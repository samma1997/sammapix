import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { APP_URL } from "@/lib/constants";
import BlogArticleLayout from "@/components/blog/BlogArticleLayout";

// ── Metadata ──────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "How to Make an Image Grid Free (2x2, 3x3, 4x6) [2026]",
  description:
    "Create a precise image grid free — 2x2, 3x3, and more — in your browser via Canvas. Custom gap, background color, cover or contain. No upload, no watermark, no signup. Free.",
  alternates: {
    canonical: `${APP_URL}/blog/image-grid-maker-free`,
  },
  keywords: [
    "image grid maker",
    "photo grid maker",
    "picture grid maker free",
    "make image grid online",
    "combine multiple photos into one",
    "photo collage free",
    "picture collage free",
    "2x2 photo grid",
    "3x3 photo grid",
    "image grid no watermark",
    "free photo grid maker",
    "online photo grid",
    "batch photo grid",
    "image grid for instagram",
    "combine photos into grid",
  ],
  openGraph: {
    title: "How to Make an Image Grid Free (2x2, 3x3, 4x6) [2026]",
    description:
      "Create a precise image grid free in your browser — 2x2, 3x3, and more. Custom gap, background, cover or contain fit. No upload, no watermark. Free.",
    url: `${APP_URL}/blog/image-grid-maker-free`,
    type: "article",
    publishedTime: "2026-08-03",
    authors: ["https://lucasammarco.com"],
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Make an Image Grid Free (2x2, 3x3, 4x6) [2026]",
    description:
      "Image grid maker that runs 100% in your browser via Canvas. 2/3/4/6/9 layouts. Custom gap, background. No upload. No watermark. Free.",
    creator: "@lucasammarco",
  },
};

// ── Schema constants ──────────────────────────────────────────────────────────

const POST_DATE = "2026-08-03";
const POST_DATE_FORMATTED = "August 3, 2026";
const POST_URL = `${APP_URL}/blog/image-grid-maker-free`;
const POST_TITLE = "How to Make an Image Grid Free (2x2, 3x3, 4x6) [2026]";

// ── Article schema ────────────────────────────────────────────────────────────

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: POST_TITLE,
  description:
    "Making an image grid — a 2x2, 3x3, or custom layout combining multiple photos into one image — does not require uploading your photos to a server. SammaPix Collage Maker runs entirely in your browser using the Canvas API. This guide explains how precise image grids work in the browser, the difference between layout presets, how gap and background control the look, and the right settings for Instagram, print, and social use.",
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
    "image grid maker",
    "photo grid maker free",
    "combine multiple photos into one",
    "2x2 photo grid",
    "3x3 photo grid",
    "picture collage free",
    "image grid no watermark",
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
  name: "How to Make an Image Grid Free (2x2, 3x3) Online",
  description:
    "Create a precise image grid in your browser for free using SammaPix Collage Maker. Choose a 2x2, 3x3, or other grid layout, set the gap size and background color, pick cover or contain fit, and download — no upload, no watermark, no signup.",
  totalTime: "PT2M",
  tool: [
    {
      "@type": "HowToTool",
      name: "SammaPix Collage Maker (browser-based, free, no upload, no watermark)",
    },
  ],
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Open the Collage Maker tool",
      text: "Go to sammapix.com/tools/collage-maker in any modern browser. No account required.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Select a grid layout preset",
      text: "Choose 4-grid for a 2x2 square grid or 9-grid for a 3x3 grid. The 6-grid gives you a 2x3 or 3x2 arrangement. Each preset creates equal-proportion cells arranged in the chosen grid.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Load your images into each cell",
      text: "Drag image files onto each grid cell, or click a cell to browse for a file. Accepted formats include JPEG, PNG, WebP, GIF, and AVIF. Files are read locally — no upload happens.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Set the gap between cells",
      text: "Enter the gap width in pixels. A gap of 0 produces a flush grid with no visible separation. A gap of 8 to 12px gives a clean spaced look. A gap of 30 to 60px with a white background creates a contact sheet effect.",
    },
    {
      "@type": "HowToStep",
      position: 5,
      name: "Choose the background color for the gaps",
      text: "Select white, black, or any custom HEX color. This fills the gap areas between cells and the outer canvas margin.",
    },
    {
      "@type": "HowToStep",
      position: 6,
      name: "Pick cover or contain fit",
      text: "Cover fills each cell completely with the image, cropping the overflow. Contain shows the full image inside the cell with letterboxing. Use cover for a uniform flush grid, contain to preserve every photo's full composition.",
    },
    {
      "@type": "HowToStep",
      position: 7,
      name: "Download the grid image",
      text: "Click Download. The Canvas API composites all images into the grid and exports a JPEG or PNG from browser memory. No network request occurs. The file is available immediately with no watermark.",
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
      name: "What is an image grid maker and how is it different from a collage maker?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "An image grid maker arranges multiple photos into a precise, equal-proportion grid layout — a 2x2, 3x3, 2x3, or similar arrangement where each cell is the same size. A collage maker is a broader term that includes grids but also covers asymmetric layouts, freeform arrangements, overlapping photos, and mixed-size cells. SammaPix Collage Maker functions specifically as a grid maker: it creates equal-proportion grids with selectable gap, background color, and cover or contain fit. Every cell in the grid receives the same amount of canvas space.",
      },
    },
    {
      "@type": "Question",
      name: "How do I make a 2x2 or 3x3 image grid for free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Go to sammapix.com/tools/collage-maker. For a 2x2 grid, select the 4-grid preset (4 cells arranged in 2 rows and 2 columns). For a 3x3 grid, select the 9-grid preset (9 cells in 3 rows and 3 columns). Drop your photos into the cells, set your gap and background color, choose cover or contain fit, and click Download. The result is a clean grid image with no watermark, created entirely in your browser. No upload, no account, no subscription required.",
      },
    },
    {
      "@type": "Question",
      name: "Can I make an image grid without a watermark for free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. SammaPix Collage Maker produces grid images with no watermark on the free plan. Most popular free online collage and grid tools (PicsArt, FotoJet, and similar) add their logo or URL to the exported image unless you pay for a subscription. SammaPix does not add any branding to the output because the tool runs locally in your browser via the Canvas API — there is no server processing cost per image to recoup, so no watermark is needed to monetize the free tier.",
      },
    },
    {
      "@type": "Question",
      name: "What is the best gap size for a photo grid for Instagram?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For an Instagram feed post, a gap of 4 to 8 pixels with a white background gives a clean, modern look that is common among photography and lifestyle accounts. A 0-pixel gap (flush grid) is also widely used for a bold, editorial feel. For a contact-sheet aesthetic — the look of a printed proof sheet — use a gap of 20 to 40 pixels with a white background. The gap preference is mostly aesthetic, but keep in mind that larger gaps reduce the effective pixel area allocated to each photo in the grid.",
      },
    },
    {
      "@type": "Question",
      name: "Can I combine multiple photos into one image without an app download?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. SammaPix Collage Maker runs entirely in your web browser — no app download, no installation, no account. Visit sammapix.com/tools/collage-maker from Chrome, Safari, Firefox, or Edge on any desktop or mobile device. The tool uses the HTML Canvas API, which is built into every modern browser. You can combine 2, 3, 4, 6, or 9 photos into one image and download the result immediately, no software installation required.",
      },
    },
    {
      "@type": "Question",
      name: "Does the image grid maker work on mobile (iPhone/Android)?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Canvas API used by SammaPix Collage Maker is supported in mobile browsers including Safari on iOS and Chrome on Android. The tool is accessible from a mobile browser, though the interface is optimized for desktop use due to the drag-and-drop cell interaction. On mobile, you can tap each cell to browse your photo library and select an image. The compositing and download work the same way as on desktop — locally in the browser, no upload.",
      },
    },
    {
      "@type": "Question",
      name: "How do I split a grid image into separate Instagram posts?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Create your grid collage in the Collage Maker and download it. Then use the SammaPix Instagram Grid Splitter to divide the image into equal portrait slices. Each slice becomes one slide in an Instagram carousel post. When you upload the carousel and viewers swipe through, they see each panel in sequence — and when they view your profile grid, the panels tile together to form the full grid image. This technique is used by many Instagram accounts to create a visual grid effect that spans multiple posts.",
      },
    },
  ],
};

// ── Page ──────────────────────────────────────────────────────────────────────

export default function ImageGridMakerFreePage() {
  return (
    <>
      <BlogArticleLayout
        title={POST_TITLE}
        slug="image-grid-maker-free"
        description="Combining multiple photos into a precise image grid — a 2x2, 3x3, or any other equal-cell arrangement — should not require paying for a subscription or uploading your photos to an unknown server. SammaPix Collage Maker creates exact image grids entirely in your browser via the Canvas API. Choose your grid size, control the gap and background color, pick cover or contain fit, and download a clean image with no watermark. Here is the complete guide to making image grids for social media, print, and batch photo work."
        date={POST_DATE}
        dateFormatted={POST_DATE_FORMATTED}
        tags={["Creative", "Tools"]}
        readingTime={10}
        headings={[
          { id: "what-is-an-image-grid", title: "What is an image grid and when do you need one?" },
          { id: "how-browser-grid-works", title: "How a browser-based image grid maker works" },
          { id: "grid-layout-presets", title: "Grid layout presets: 2x2, 3x3, and more" },
          { id: "gap-background-color", title: "Gap and background color: controlling the look of your grid" },
          { id: "cover-contain-fit", title: "Cover vs contain fit: preserving composition vs filling the cell" },
          { id: "step-by-step", title: "How to make an image grid step by step" },
          { id: "instagram-grid", title: "Image grids for Instagram: the right settings for social" },
          { id: "print-grid", title: "Image grids for print: contact sheets and gallery layouts" },
          { id: "no-watermark", title: "Free image grid makers that don&apos;t add a watermark" },
          { id: "comparison-table", title: "Browser-based vs upload-based image grid tools: honest comparison" },
          { id: "related-image-tools", title: "Other tools for working with multiple photos" },
          { id: "faq", title: "FAQ" },
        ]}
        summary={[
          "An image grid maker places multiple photos into equal-proportion cells arranged in a 2x2, 3x3, or other precise grid — one output image containing multiple photos.",
          "SammaPix Collage Maker creates image grids entirely in your browser using the Canvas API. No upload, no server, no signup.",
          "Grid presets cover 2, 3, 4, 6, and 9 photos. The 4-grid is a 2x2 and the 9-grid is a 3x3.",
          "Gap size and background color control the visual character of the spacing between cells.",
          "Cover mode fills each cell completely (crops overflow). Contain mode shows the full image with letterboxing.",
          "No watermark is added to the output — a key differentiator from most free collage tools.",
          "The same tool works for Instagram grids, print contact sheets, and batch photo layouts.",
        ]}
        heroImage={
          <figure>
            <img
              src="https://images.pexels.com/photos/3756879/pexels-photo-3756879.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="A flat lay of multiple printed photographs arranged in a grid on a white surface, representing the goal of making a clean image grid from multiple photos without uploading them to a server."
              className="w-full max-h-[460px] object-cover rounded-lg"
              loading="eager"
            />
            <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
              A precise image grid from multiple photos, created locally in your browser with no upload and no watermark.
            </figcaption>
          </figure>
        }
        ctaBlock={
          <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2">
              Make an image grid right now, no upload needed
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-4">
              SammaPix Collage Maker creates 2x2, 3x3, and other grids entirely in your browser via Canvas API.
              Custom gap, background color, cover or contain fit. No watermark. No signup. Free.
            </p>
            <div className="flex flex-wrap gap-3 items-center">
              <Link
                href="/tools/collage-maker"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
              >
                Open Image Grid Maker, Free
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
              <Link
                href="/tools/instagram-grid-splitter"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
              >
                Instagram Grid Splitter <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
              <Link
                href="/tools/resizepack"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
              >
                Resize Images <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
            </div>
          </div>
        }
      >

        {/* ── Section 1: What is an image grid ──────────────────────────────── */}

        <h2 id="what-is-an-image-grid" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          What is an image grid and when do you need one?
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          An image grid is a single output image that contains multiple photos arranged in equal-proportion cells, laid out in rows and columns. A 2x2 grid has 4 cells in 2 rows and 2 columns. A 3x3 grid has 9 cells in 3 rows and 3 columns. Every cell is the same size, the photos are placed side by side with a consistent gap, and the result is one downloadable image.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          This is different from a photo mosaic (where many small images tile to form one large image) and different from a freeform collage (where photos overlap or vary in size). An image grid is a structured, precise layout — the kind you see in printed photography contact sheets, Instagram multi-photo posts, press kits, product comparison pages, and team member galleries.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Common use cases for image grids
        </h3>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Instagram feed posts.</strong> A 2x2 or 3x3 grid posted as a single image lets you show multiple photos in one post without the viewer needing to swipe. Popular for &ldquo;round up&rdquo; posts, event recaps, and product showcases.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Photo contact sheets.</strong> A contact sheet is a printed grid of all photos from a shoot — typically 9 to 20 small thumbnails on one page. Used by film photographers, event photographers, and studios to review a shoot at a glance.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Before-and-after comparisons.</strong> A 2-column grid places the before image on the left and the after on the right, making the difference immediately visible in a single shareable image.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Product multi-angle views.</strong> E-commerce product shots placed in a 2x2 grid — front, back, side, and detail — give buyers a complete visual overview in a single image that loads faster and is easier to scan than four separate images.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Press kits and media galleries.</strong> A 3x3 grid of editorial photos packaged as a single high-resolution image is a common format in press kits and brand media pages.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Team member pages.</strong> A 2x3 grid of headshots is a concise way to introduce a team. One image instead of six separate images simplifies layout and reduces page complexity.
          </li>
        </ul>

        {/* ── Section 2: How browser grid works ────────────────────────────── */}

        <h2 id="how-browser-grid-works" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          How a browser-based image grid maker works
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The HTML Canvas API — a standard built into every modern browser — was designed exactly for image compositing tasks like this. Here is what happens when you create a grid with SammaPix Collage Maker:
        </p>

        <ol className="mb-4 space-y-3">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">You choose a layout preset.</strong> The preset defines the number of rows and columns and the proportion of each cell. A 4-grid (2x2) divides the canvas into 4 equal squares. A 9-grid (3x3) divides it into 9 equal squares. A 6-grid divides it into 6 equal rectangles.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">You load images into each cell.</strong> Your browser reads each file using the FileReader API — a local file read with no network request. The image is decoded into an ImageBitmap in browser memory.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">A single Canvas element is created.</strong> The canvas dimensions are calculated from the layout: total width = (cell width × columns) + (gap × (columns + 1)), and the same for height. At a typical output of 2400px, a 3x3 grid with an 8px gap gives each cell approximately 784px of width (2400 minus 4 gaps of 8px, divided by 3).
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">The background color fills the entire canvas.</strong> This sets the color for all gap areas and any letterboxing from contain mode. All pixels outside the cells are this color.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Each image is drawn into its cell via drawImage.</strong> The Canvas 2D context uses{" "}
            <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh)</code>{" "}
            to scale and position each photo into its allocated cell. In cover mode, the source rectangle is cropped to match the cell aspect ratio. In contain mode, the destination rectangle is shrunk to fit the full source image.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">The canvas exports to a downloadable file.</strong> The{" "}
            <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">canvas.toBlob()</code>{" "}
            method converts the canvas to a JPEG or PNG file in browser memory. A temporary{" "}
            <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">blob:</code>{" "}
            URL triggers the browser download. Nothing is sent to any server.
          </li>
        </ol>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The entire compositing pipeline — from reading your files to producing the downloadable grid image — happens inside your browser tab. On a modern laptop, a 9-photo 3x3 grid at 2400px output is composited in well under one second.
        </p>

        {/* ── Section 3: Grid layout presets ───────────────────────────────── */}

        <h2 id="grid-layout-presets" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Grid layout presets: 2x2, 3x3, and more
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          SammaPix Collage Maker offers five layout presets. Here is what each one produces and when to use it:
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Preset name</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Grid shape</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Photos required</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Best for</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">2-grid</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">1x2 (side by side)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">2 photos</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Before/after, two-product comparison, diptych art print.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">3-grid</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">1x3 (triptych row)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">3 photos</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Triptych print, three-step process, panoramic sequence.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">4-grid (2x2)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">2x2 square grid</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">4 photos</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Instagram square post, product 4-angle, family 4-photo, event highlights.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">6-grid</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">2x3 or 3x2 grid</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">6 photos</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Wedding recap, six-step tutorial, team page (2 rows of 3), menu items.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">9-grid (3x3)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">3x3 square grid</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">9 photos</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Instagram feed preview, photo contact sheet, lookbook, event recap.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Each preset produces a square output canvas by default, which is the most versatile format for digital sharing (works cleanly for Instagram 1:1, print squares, and most web contexts). If you need a different final ratio, export the square grid and use{" "}
          <Link href="/tools/croproatio" className="text-[#6366F1] hover:underline">SammaPix Crop to Ratio</Link>{" "}
          to trim it to 4:5 for Instagram or 16:9 for a banner.
        </p>

        {/* ── Section 4: Gap and background ──────────────────────────────────── */}

        <h2 id="gap-background-color" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Gap and background color: controlling the look of your grid
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The gap and background color are not minor details — they are the two parameters that most influence whether a grid looks professional or amateurish. Getting them right takes about 30 seconds but makes a significant difference.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Gap size: how much space between cells
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The gap applies uniformly between all cells and around the outer canvas boundary. This means a 2x2 grid with a 10px gap has a 10px border around the entire grid plus a 10px separator between the four cells. The gap reduces the pixel area available to each cell — a larger gap means each photo gets fewer pixels in the cell.
        </p>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">0px gap, flush grid.</strong> Maximum image area. Clean and bold. Used by many Instagram accounts for a no-border editorial look. The photos share edges directly, so transitions between different photos can be jarring if they have very different colors at the edges. Best when the photos share a consistent color palette.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">4 to 8px gap, clean separation.</strong> The most widely used range for social media. Enough gap to visually separate the photos without the background color becoming a dominant design element. Works well with both white and black backgrounds.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">12 to 20px gap, editorial spacing.</strong> The gap becomes a visible part of the design. Common in editorial photography layouts, print lookbooks, and portfolio presentations where the white or black space between photos is intentional.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">30 to 60px gap, contact sheet.</strong> The look of a printed proof sheet or museum contact print. Each photo sits in its own clearly defined space. Best with a white background and black-and-white or muted-color photos.
          </li>
        </ul>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Background color: what fills the gaps
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The background color fills every pixel that is not covered by a photo — the gaps between cells, the outer canvas margin, and any letterboxing from contain mode. Three choices dominate:
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Color</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Feel</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Works best for</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">White (#FFFFFF)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Clean, editorial, classic</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Instagram, print contact sheets, portfolio pages, most general use.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Black (#000000)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Dramatic, high-contrast, cinematic</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Night photography, high-contrast shots, dark-mode presentations, film stills.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Custom HEX</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Brand-aligned, cohesive</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Marketing materials, product launches, brand social posts, event assets.</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ── Tool CTA #1 ────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">Make your image grid right now</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            2x2, 3x3, and more. Custom gap and background. Cover or contain fit.
            No upload. No watermark. No signup. Free.
          </p>
          <Link
            href="/tools/collage-maker"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
          >
            Open Image Grid Maker, Free <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
          </Link>
        </div>

        {/* ── Section 5: Cover vs contain ─────────────────────────────────────── */}

        <h2 id="cover-contain-fit" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Cover vs contain fit: preserving composition vs filling the cell
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Every cell in your image grid is a rectangle. Your photos rarely have the exact same aspect ratio as the cell. The fit mode decides what to do with the mismatch. This is the most important technical setting in the tool.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Cover fit: flush cells, center-cropped
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Cover mode scales each photo so that it fills the entire cell — both width and height. If the photo is wider than the cell&apos;s aspect ratio, the left and right edges are cropped. If it is taller, the top and bottom edges are cropped. The crop is centered, meaning the center of the photo aligns with the center of the cell.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          In a 3x3 grid with a mix of landscape (16:9) and portrait (3:4) photos, cover mode produces a uniform grid where every cell is completely filled with image content. No letterboxing is visible. The grid looks like a professional photo layout.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The tradeoff: subjects not at the center of the frame may be cropped. A portrait where the face is at the top of the frame, or a landscape where the key element is at the left edge, will lose content in cover mode. For those photos, consider using the{" "}
          <Link href="/tools/croproatio" className="text-[#6366F1] hover:underline">Crop to Ratio tool</Link>{" "}
          to manually pre-crop the photo before adding it to the grid, giving you control over which part of the image fills the cell.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Contain fit: full photos, letterboxed cells
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Contain mode scales each photo to fit entirely within its cell without any cropping. The full composition of the photo is always visible. Where the photo does not fill the cell — the top/bottom of a landscape photo in a square cell, or the sides of a portrait photo in a square cell — the background color fills the gap.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Contain mode is the right choice when no cropping is acceptable — documentary photography, editorial images with deliberate compositions, fine art prints, and client deliverables where the photographer controls the frame. With a consistent background color (white for a print-style look, black for a cinematic feel), contain mode looks intentional rather than accidental.
        </p>

        {/* ── Section 6: Step by step ───────────────────────────────────── */}

        <h2 id="step-by-step" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          How to make an image grid step by step
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Here is the full process from choosing your grid to downloading the file:
        </p>

        <ol className="mb-4 space-y-3">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Go to sammapix.com/tools/collage-maker</strong> in Chrome, Safari, Firefox, or Edge. No account required.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Select your grid layout.</strong> For a 2x2 grid, choose the 4-grid preset. For a 3x3 grid, choose the 9-grid preset. For a 2x3 grid, choose 6-grid. The cell slots appear immediately.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Load your photos.</strong> Drag an image file onto each cell, or click a cell to browse your device. JPEG, PNG, WebP, GIF, and AVIF are all accepted. The files are read locally — nothing is uploaded.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Set the gap.</strong> Type a pixel value. For a clean social media look: 6 to 8px. For a flush grid: 0px. For a contact sheet: 30 to 50px.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Choose the background color.</strong> White for a clean look. Black for a dramatic look. Any custom HEX for brand color.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Select cover or contain.</strong> Cover for a flush, uniform grid. Contain to preserve the full composition of every photo.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Click Download.</strong> The Canvas composites the grid and exports a JPEG or PNG from browser memory. No network request occurs. The file downloads immediately to your device with no watermark.
          </li>
        </ol>

        {/* ── Section 7: Instagram grid ──────────────────────────────────── */}

        <h2 id="instagram-grid" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Image grids for Instagram: the right settings for social
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Instagram has specific characteristics that influence which grid settings work best. Here are the recommended configurations for the most common Instagram use cases:
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Single post: 4-grid (2x2) with 6px white gap, cover mode
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          This is the most popular configuration for Instagram multi-photo summary posts. Four equal cells in a square canvas, a thin white gap, and cover mode for uniform cell fills. The result posts cleanly as a 1:1 Instagram feed photo. The white gap creates a subtle but visible separation that makes the grid feel organized rather than random.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Feed preview: 9-grid (3x3) with 0px gap, cover mode
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Some Instagram accounts post a 3x3 grid as a single image to give followers a compact preview of nine recent photos at once — a weekly summary, a series recap, or a travel album overview. A 0px gap with cover mode gives this the densest, most visually packed feel. Alternatively, use the{" "}
          <Link href="/tools/instagram-grid-splitter" className="text-[#6366F1] hover:underline">SammaPix Instagram Grid Splitter</Link>{" "}
          to split a single wide image into three equal portrait panels for a carousel — when viewed on your profile, the three posts tile together to form a panoramic strip across the grid.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Before/after: 2-grid with 4px black gap, cover mode
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Side-by-side before/after posts work well as a 2-grid with a thin black or white gap. Instagram will display the full wide image in the feed. Cover mode keeps both cells completely filled, giving the comparison a clean professional look. Make sure both photos have the same height when resized, so the left-right comparison is fair. Pre-resize both to the same dimensions using{" "}
          <Link href="/tools/resizepack" className="text-[#6366F1] hover:underline">SammaPix Resize Images</Link>{" "}
          before adding them to the grid.
        </p>

        {/* ── Section 8: Print grid ──────────────────────────────────────── */}

        <h2 id="print-grid" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Image grids for print: contact sheets and gallery layouts
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          For print use, the key difference is resolution. A 2400px canvas works well for digital sharing but is only 8 inches wide at 300 DPI — the standard for photo printing. For a larger print, aim for a canvas width of 3600px (12 inches at 300 DPI) or higher. If you are printing a contact sheet on standard A4 or letter paper, 2400px is more than sufficient for a small-format proof sheet.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          For contact sheets, the classic look is a 3x3 or 4x4 grid with a white background and a 20 to 40px gap. Contain mode is typically preferred for contact sheets because photographers use them to review compositions — cropping would defeat the purpose. A thin black border around each cell (achieved by using a black background color with a gap of 2 to 4px, then a white outer gap) can simulate the look of a traditional darkroom contact sheet.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          For gallery and portfolio print layouts, the 4-grid or 6-grid with a wider white gap (30 to 60px) and contain mode creates a clean, matted appearance. Each photo is presented with breathing room, similar to how photos are matted in a printed book or a fine art portfolio.
        </p>

        {/* ── Tool CTA #2 ────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">Your photos stay on your device</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            No upload, no account, no server. 2x2, 3x3, and more. Custom gap and background. No watermark. Free.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/tools/collage-maker"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            >
              Open Image Grid Maker, Free <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link
              href="/blog/photo-collage-maker-online"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
            >
              Full collage guide (layouts, fit, Instagram) <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>
        </div>

        {/* ── Section 9: No watermark ────────────────────────────────────── */}

        <h2 id="no-watermark" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Free image grid makers that do not add a watermark
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Searching for &ldquo;free image grid maker&rdquo; or &ldquo;free photo grid&rdquo; returns dozens of tools. The majority of them add their own branding to the exported image on the free plan. This is not always obvious until you try to download — the watermark appears on the downloaded file even when the in-browser preview looks clean.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The reason most free tools do this is business model: they use the watermark on free exports to advertise to anyone who sees the image. Removing the watermark requires paying for a plan. This is a reasonable monetization choice for tools that run server-side infrastructure. But for a client deliverable, a brand&apos;s social post, or any commercial use, a watermarked image is not usable.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          SammaPix Collage Maker adds no watermark because it has no server-side infrastructure cost per image. The tool runs entirely in your browser. When you click Download, the Canvas API produces the grid image locally and your browser saves it to your device. The marginal cost of each grid export to the tool is zero — there is nothing to recoup with a watermark.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          You can verify this yourself: download a grid, open it in any image viewer or editor, and inspect the pixels. No branding, no URL, no logo will be present. The only pixels in the image are your photos, the gap color, and the background — exactly what the canvas exported.
        </p>

        {/* ── Section 10: Comparison table ──────────────────────────────── */}

        <h2 id="comparison-table" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Browser-based vs upload-based image grid tools: honest comparison
        </h2>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Feature</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Typical upload-based grid tools</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">SammaPix Collage Maker</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Photo upload</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Yes — files sent to remote server</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">No — files stay in browser memory</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Watermark on free export</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Usually yes — removed only with paid plan</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Never — no watermark on any plan</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Account required</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Often required to download or remove watermark</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">No — download immediately with no signup</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Gap control</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Sometimes available, often preset only</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Full pixel control. Any value 0px to any size.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Background color</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">White and black common, custom sometimes available</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Any HEX color. Full spectrum.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Cover / contain fit</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Cover only on most tools</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Both cover and contain. Your choice per grid.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Processing speed</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Depends on server load and upload speed</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Under 1 second via Canvas API on modern hardware</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ── Section 11: Related tools ──────────────────────────────────── */}

        <h2 id="related-image-tools" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Other tools for working with multiple photos
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          SammaPix offers several tools that pair naturally with the image grid maker:
        </p>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/collage-maker" className="text-[#6366F1] hover:underline">Collage Maker</Link></strong>: the tool this article covers. Use it to make 2x2, 3x3, and other grids. See the full guide at{" "}
            <Link href="/blog/photo-collage-maker-online" className="text-[#6366F1] hover:underline">Photo Collage Maker Online Free</Link>.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/instagram-grid-splitter" className="text-[#6366F1] hover:underline">Instagram Grid Splitter</Link></strong>: divide a wide or tall image into equal portrait slices for an Instagram carousel. Use after creating your grid to split it for a multi-post grid effect on your Instagram profile.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/resizepack" className="text-[#6366F1] hover:underline">Resize Images</Link></strong>: standardize the dimensions of your photos before adding them to the grid. When all source images share the same aspect ratio as the grid cells, cover and contain modes produce cleaner, more predictable results.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/croproatio" className="text-[#6366F1] hover:underline">Crop to Ratio</Link></strong>: crop individual photos to the cell aspect ratio before adding them to the grid. Gives you control over exactly which part of each photo fills its cell — useful when cover mode would crop an important subject.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/add-border" className="text-[#6366F1] hover:underline">Add Border</Link></strong>: add a solid-color border around the finished grid image. Useful for a white frame effect before printing or sharing. See{" "}
            <Link href="/blog/add-border-to-image-online" className="text-[#6366F1] hover:underline">Add a border to an image online free</Link>.
          </li>
        </ul>

        {/* ── Tool CTA #3 ────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">All the tools you need for photo grids and collages</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            Grid, split, crop, resize, and border — all in your browser, no upload, no watermark.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/tools/collage-maker"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
            >
              Collage Maker <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link
              href="/tools/instagram-grid-splitter"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
            >
              Instagram Grid Splitter <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link
              href="/tools/croproatio"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
            >
              Crop to Ratio <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
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

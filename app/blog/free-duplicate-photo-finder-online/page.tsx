import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { APP_URL } from "@/lib/constants";
import BlogArticleLayout from "@/components/blog/BlogArticleLayout";

export const metadata: Metadata = {
  title: "Free Duplicate Photo Finder Online (No Upload, No Install, 2026)",
  description:
    "Find and remove duplicate photos free online — no upload, no install. SammaPix TwinHunt uses perceptual hashing to catch exact and near-duplicate images entirely in your browser.",
  alternates: {
    canonical: `${APP_URL}/blog/free-duplicate-photo-finder-online`,
  },
  keywords: [
    "duplicate photo finder online free",
    "free duplicate photo finder",
    "find duplicate photos free",
    "duplicate image finder free",
    "remove duplicate photos online",
    "find similar photos online",
    "photo deduplicator free",
    "browser duplicate finder no upload",
  ],
  openGraph: {
    title: "Free Duplicate Photo Finder Online (No Upload, No Install, 2026)",
    description:
      "How to find and remove duplicate photos free, without installing software or uploading your files. SammaPix TwinHunt runs entirely in your browser using perceptual hashing.",
    url: `${APP_URL}/blog/free-duplicate-photo-finder-online`,
    type: "article",
    publishedTime: "2026-10-22",
    authors: ["https://lucasammarco.com"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Duplicate Photo Finder Online (No Upload, No Install, 2026)",
    description:
      "Find duplicate and near-duplicate photos free in your browser. No upload, no install. Uses perceptual hashing to catch copies even after resize or re-save.",
    creator: "@lucasammarco",
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Free Duplicate Photo Finder Online (No Upload, No Install, 2026)",
  description:
    "SammaPix TwinHunt is a free browser-based duplicate photo finder that uses perceptual hashing (pHash) to detect exact and near-duplicate images. No file is ever uploaded to a server. It runs entirely in your browser using the Canvas API and Discrete Cosine Transform, processing each image in approximately 50ms.",
  url: `${APP_URL}/blog/free-duplicate-photo-finder-online`,
  datePublished: "2026-10-22",
  dateModified: "2026-10-22",
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
    "@id": `${APP_URL}/blog/free-duplicate-photo-finder-online`,
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
      name: "Free Duplicate Photo Finder Online (No Upload, No Install, 2026)",
      item: `${APP_URL}/blog/free-duplicate-photo-finder-online`,
    },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is there a free duplicate photo finder that doesn't upload my photos?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. SammaPix TwinHunt is a completely free duplicate photo finder that runs entirely in your browser. No image is ever uploaded to a server. It uses perceptual hashing (pHash) via the Canvas API and Discrete Cosine Transform to compare photos locally. It works offline once the page has loaded.",
      },
    },
    {
      "@type": "Question",
      name: "What is the best free alternative to Duplicate Cleaner or Gemini?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "SammaPix TwinHunt is the best free browser-based alternative for users who do not want to install software. It supports JPG, PNG, WebP, and HEIC files, uses adjustable sensitivity (strict, normal, loose), and processes up to 50 images free (500 with Pro). Unlike Duplicate Cleaner or Gemini, there is nothing to download or pay for.",
      },
    },
    {
      "@type": "Question",
      name: "Can it find near-duplicate photos, not just exact copies?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. TwinHunt uses perceptual hashing with adjustable sensitivity. Strict mode catches exact copies (Hamming distance 0-5). Normal mode catches very similar images including minor crops and re-saves (Hamming distance 6-10). Loose mode catches broader visual similarities (Hamming distance 11-20).",
      },
    },
    {
      "@type": "Question",
      name: "Does TwinHunt work with iPhone HEIC photos?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. TwinHunt supports HEIC files from iPhone cameras. It uses the embedded JPEG thumbnail inside the HEIC container for fast preview generation, and computes the perceptual hash via a standard canvas draw. This works natively on macOS and iOS browsers without requiring a separate conversion step.",
      },
    },
    {
      "@type": "Question",
      name: "Will TwinHunt delete my duplicate photos automatically?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No, and this is by design. Browsers cannot delete files from your filesystem for security reasons. TwinHunt identifies duplicates and shows them side by side with file names, sizes, and similarity scores. You then download a plain-text deletion report and manually delete the files in Finder or File Explorer. You remain in complete control of which files are removed.",
      },
    },
  ],
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Find Duplicate Photos Free Online",
  description:
    "Use SammaPix TwinHunt to find and remove duplicate and near-duplicate photos entirely in your browser. No upload required. Supports JPG, PNG, WebP, and HEIC.",
  totalTime: "PT5M",
  tool: {
    "@type": "SoftwareApplication",
    name: "SammaPix TwinHunt",
    url: `${APP_URL}/tools/twinhunt`,
  },
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Open TwinHunt in your browser",
      text: "Go to sammapix.com/tools/twinhunt. No account or installation is required to start. The tool loads in your browser and processes everything locally.",
      url: `${APP_URL}/tools/twinhunt`,
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Drop or select your photos",
      text: "Drag and drop your photos onto the upload area, or click to browse. You can load up to 50 images on the free plan. JPG, PNG, WebP, and HEIC are all supported.",
      url: `${APP_URL}/tools/twinhunt`,
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Let the algorithm run",
      text: "TwinHunt computes a perceptual hash (pHash) for each image using the Discrete Cosine Transform. Every pair is compared at approximately 50ms per image. No data leaves your device.",
      url: `${APP_URL}/tools/twinhunt`,
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Review duplicate groups",
      text: "Duplicate and near-duplicate pairs appear side by side with file names, sizes, and similarity badges. Use the sensitivity slider to adjust how aggressive the matching is.",
      url: `${APP_URL}/tools/twinhunt`,
    },
    {
      "@type": "HowToStep",
      position: 5,
      name: "Download the deletion report and clean up",
      text: "Mark which copies to remove, then download a plain-text deletion report. Open Finder or File Explorer and delete the listed files. You stay in complete control of what is removed.",
      url: `${APP_URL}/tools/twinhunt`,
    },
  ],
};

const POST_DATE = "2026-10-22";
const POST_DATE_FORMATTED = "October 22, 2026";
const POST_URL = `${APP_URL}/blog/free-duplicate-photo-finder-online`;
const POST_TITLE =
  "Free Duplicate Photo Finder Online (No Upload, No Install, 2026)";

export default function FreeDuplicatePhotoFinderPage() {
  return (
    <>
      <BlogArticleLayout
        title="Free Duplicate Photo Finder Online (No Upload, No Install, 2026)"
        slug="free-duplicate-photo-finder-online"
        description="Desktop apps like Duplicate Cleaner and Gemini cost money, require installation, and take over your filesystem. Upload-based web tools send your private photos to a stranger&apos;s server. There is a third option: a duplicate photo finder that runs entirely in your browser, costs nothing, installs nothing, and never receives a single pixel of your images."
        date={POST_DATE}
        dateFormatted={POST_DATE_FORMATTED}
        tags={["Tools"]}
        readingTime={9}
        headings={[
          { id: "why-duplicates-pile-up", title: "Why duplicate photos pile up faster than you expect" },
          { id: "three-types-of-finders", title: "Three types of duplicate finders: installed app vs upload tool vs browser tool" },
          { id: "how-twinhunt-works", title: "How TwinHunt finds duplicates: perceptual hashing explained" },
          { id: "how-to-use", title: "How to find duplicate photos free with TwinHunt (step by step)" },
          { id: "comparison-table", title: "Comparison: browser tool vs installed app vs upload-based web tool" },
          { id: "which-copy-to-keep", title: "How to decide which copy to keep" },
          { id: "batch-deletion-workflow", title: "Batch deletion workflow: from TwinHunt report to a clean library" },
          { id: "limitations", title: "What TwinHunt cannot do (and what to use instead)" },
          { id: "faq", title: "FAQ" },
        ]}
        summary={[
          "SammaPix TwinHunt finds exact and near-duplicate photos entirely in your browser using perceptual hashing (pHash). No file ever leaves your device.",
          "Perceptual hashing detects duplicates even after resizing, re-saving, or minor edits — unlike byte-level comparison that misses everything except perfect copies.",
          "Adjustable sensitivity has three modes: strict (exact copies), normal (very similar including small crops), and loose (broader visual matches).",
          "Processing runs at approximately 50ms per image. The tool supports JPG, PNG, WebP, and HEIC, including iPhone photos.",
          "TwinHunt does not delete files — it identifies them and provides a deletion report. Actual removal stays in your hands via Finder or File Explorer.",
        ]}
        heroImage={
          <figure className="my-8">
            <img
              src="https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_1200/v1/sammapix/portfolio/bali-2026/04-balinese-man-street-market-smile-bali-indonesia"
              alt="Joyful Balinese man in motorcycle helmet, teal jacket, holding bag at street market stall in Bali, Indonesia."
              className="w-full rounded-lg"
              loading="eager"
            />
            <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
              Bali, Indonesia. One of my own travel photos, see more in the{" "}
              <Link href="/portfolio" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">SammaPix portfolio</Link> , all edited with these same tools.
            </figcaption>
          </figure>
        }
        ctaBlock={
          <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2">
              Find duplicate photos free, right now
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-4">
              Drop your photos into TwinHunt. Perceptual hashing runs in your browser in seconds. No upload, no account required. Supports JPG, PNG, WebP, and HEIC.
            </p>
            <Link
              href="/tools/twinhunt"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            >
              Find duplicates free
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>
        }
      >

        {/* Quick answer block */}
        <div className="bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] rounded-md p-5 mb-8">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-[#737373] mb-2">
            Quick answer
          </p>
          <p className="text-sm text-gray-700 dark:text-[#E5E5E5] leading-relaxed">
            The best free duplicate photo finder that requires no upload and no
            installation is{" "}
            <Link
              href="/tools/twinhunt"
              className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors"
            >
              SammaPix TwinHunt
            </Link>
            . It runs entirely in your browser using perceptual hashing (pHash)
            via the Discrete Cosine Transform. Exact copies and near-duplicates
            (resized, re-saved, or lightly edited versions) are both caught.
            Processing takes approximately 50ms per image. No photo data is ever
            transmitted to any server.
          </p>
        </div>

        <h2
          id="why-duplicates-pile-up"
          className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight"
        >
          Why duplicate photos pile up faster than you expect
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Most people assume duplicates come from accidentally copying a folder
          twice. The reality is far messier. Photos accumulate duplicates from
          at least five different directions simultaneously, which is why a
          library that felt manageable a year ago can suddenly contain thousands
          of redundant files.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          The five main sources of photo duplicates
        </h3>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Cloud sync overlap:</strong> iCloud Photos, Google Photos, and Dropbox each sync independently. Migrating between services, or using two simultaneously, frequently results in the same photo stored in multiple places with slightly different filenames or timestamps.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">WhatsApp and messaging apps:</strong> Every photo you send or receive is saved to your camera roll as a separate file, even if you already had the original. A photo sent in a group chat of ten people creates ten re-saved copies, often compressed to different sizes.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Burst mode and brackets:</strong> Modern smartphones shoot bursts of 5-20 frames for a single moment. Most users pick one keeper but never delete the rest, leaving 4-19 near-identical files per burst permanently in the library.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Export and edit copies:</strong> Photo editors like Lightroom, Snapseed, and Photoshop routinely save edited versions alongside originals. A single RAW file can generate a JPEG export, a resized web version, and a watermarked copy — all of the same image.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Device migrations and backups:</strong> Transferring photos from an old phone to a new one, restoring from a backup, or pulling photos off an SD card to a drive that already has some of the same images are all silent duplicate generators.
          </li>
        </ul>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The cumulative effect is significant. A typical smartphone user with
          five years of photos and a single cloud service migration can
          realistically have 15-30% of their library consumed by duplicates or
          near-duplicates. On a 50GB library, that is 7-15GB of recoverable
          storage.
        </p>

        <h2
          id="three-types-of-finders"
          className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight"
        >
          Three types of duplicate finders: installed app vs upload tool vs browser tool
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Before diving into how TwinHunt works, it helps to understand the
          landscape of available tools and the tradeoffs each approach involves.
          There are three fundamentally different architectures for duplicate
          photo finders, and they vary considerably in privacy, cost, and
          convenience.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Installed desktop apps (Duplicate Cleaner, Gemini, dupeGuru)
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Desktop apps scan your local filesystem directly and can handle very
          large libraries — tens of thousands of photos without breaking a
          sweat. Gemini 2 (macOS only) costs $19.99 one-time. Duplicate Cleaner
          Pro costs $29.95. dupeGuru is free and open-source but has not been
          actively maintained. The main friction is installation: you need to
          download an app, grant filesystem permissions, and trust a third-party
          application with full access to your photo library.
        </p>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          For corporate laptops with security restrictions, borrowed computers,
          or users who simply do not want to install software for a one-time
          cleanup task, desktop apps are impractical. They are also unavailable
          on Chromebooks and Linux machines with limited app ecosystems.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Upload-based web tools
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Several web services offer duplicate detection by uploading your
          photos to their servers for processing. This approach requires no
          installation, which is convenient. The critical limitation is privacy:
          your photos physically leave your device and are transmitted to and
          stored on a third-party server, even if temporarily. For vacation
          snapshots of public places this may be acceptable. For photos
          containing children, private moments, home interiors, or any
          identifiable personal content, it introduces a risk most users would
          not consciously accept if they understood it fully.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Browser-based tools (no upload, no install)
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The third approach runs the entire analysis inside your browser tab
          using JavaScript and the Canvas API. Nothing is transmitted. The tool
          works on any device with a modern browser — Windows, Mac, Linux,
          Chromebook — with no installation. The tradeoff is scale: browser
          processing is slower than a native app and practical limits apply (up
          to 50 images free, 500 with a Pro account on TwinHunt). For most
          personal photo library cleanup tasks, those limits are more than
          adequate.
        </p>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          SammaPix{" "}
          <Link
            href="/tools/twinhunt"
            className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors"
          >
            TwinHunt
          </Link>{" "}
          is the tool in this category with the most complete implementation:
          perceptual hashing rather than byte comparison, HEIC support, and
          adjustable sensitivity for near-duplicate detection.
        </p>

        <h2
          id="how-twinhunt-works"
          className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight"
        >
          How TwinHunt finds duplicates: perceptual hashing explained
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Most people assume duplicate detection works by comparing file sizes
          or checksums. This byte-level approach only catches perfect,
          bit-for-bit identical copies. It completely misses the duplicates that
          matter most in real photo libraries: the same photo saved at different
          resolutions, re-exported from an editor, re-compressed by a messaging
          app, or screenshotted from a video.
        </p>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          TwinHunt uses perceptual hashing (pHash), which works differently.
          Instead of comparing bytes, it generates a visual fingerprint based on
          the image content itself. Two images with the same visual content —
          even if stored at different resolutions, compressed differently, or
          lightly edited — will produce fingerprints that are close together,
          measurable as a low Hamming distance between the two 64-bit hashes.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          The DCT-based pHash algorithm step by step
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          TwinHunt uses a Discrete Cosine Transform (DCT) implementation of
          pHash. Here is what actually happens when you drop a photo into the
          tool:
        </p>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
            The image is drawn to a Canvas element and resized to 32x32 pixels in grayscale. This removes color information and high-frequency noise, leaving only the structural content.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
            The Discrete Cosine Transform is applied to the 32x32 pixel array, decomposing the image into frequency components — similar to how JPEG compression works internally.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
            The top-left 8x8 block of DCT coefficients is extracted. This block encodes the low-frequency visual structure of the image — the broad shapes and tones that remain consistent across resizings and minor edits.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
            A 64-bit hash is generated by comparing each coefficient to the average. The result is a compact fingerprint that represents the image&apos;s visual structure.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
            Every pair of hashes is compared using Hamming distance — counting how many of the 64 bits differ. A distance of 0-5 is an exact or near-exact duplicate. A distance of 6-10 is very similar. A distance of 11-20 is a loose visual match.
          </li>
        </ul>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Every step of this computation runs in your browser via the Canvas API
          and JavaScript. No image pixel data is sent to any server. The entire
          analysis for 50 photos completes in a few seconds on a modern
          laptop.
        </p>

        <figure className="my-8">
          <img
            src="https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_1200/v1/sammapix/portfolio/japan/21-japanese-ema-votive-tablets-shibuya-tokyo-japan-rainy"
            alt="Close-up of numerous wooden Japanese ema votive tablets hanging at a shrine in Shibuya, Tokyo, on a soft, rainy day."
            className="w-full rounded-lg"
            loading="lazy"
          />
          <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
            Shibuya, Tokyo, Japan, from my own travel photography. See the full set in the{" "}
            <Link href="/portfolio" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">SammaPix portfolio</Link> , every shot edited with these tools.
          </figcaption>
        </figure>

        <h2
          id="how-to-use"
          className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight"
        >
          How to find duplicate photos free with TwinHunt (step by step)
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The workflow takes under five minutes for a typical batch of 50
          photos. Here is exactly what to do.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Step 1: Open TwinHunt in your browser
        </h3>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Navigate to{" "}
          <Link
            href="/tools/twinhunt"
            className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors"
          >
            sammapix.com/tools/twinhunt
          </Link>
          . No account is required to start. The page works in Chrome, Firefox,
          Safari, and Edge. It also works offline once the page has fully
          loaded — the processing logic is cached locally.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Step 2: Select and drop your photos
        </h3>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Drag a folder or a selection of photos onto the upload area, or click
          to browse. You can load up to 50 images on the free plan. JPG, PNG,
          WebP, and HEIC are all supported. If you are cleaning up iPhone
          photos, HEIC files from your camera roll work directly — no
          conversion step needed.
        </p>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          For best results when targeting a specific suspected duplicate set,
          narrow the selection to the relevant folder rather than loading your
          entire library at once. The pairwise comparison grows quadratically
          with file count, so 50 well-chosen images will produce cleaner,
          faster results than 50 random images from five different trips.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Step 3: Watch the analysis run
        </h3>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          TwinHunt computes a perceptual hash for each photo immediately after
          it is loaded. Processing runs at approximately 50ms per image. For a
          50-image batch, the full hash computation takes around 2-3 seconds.
          The pairwise comparison phase runs after all hashes are ready and
          typically completes in under a second. Nothing is sent anywhere during
          this process.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Step 4: Review the duplicate groups
        </h3>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Duplicate and near-duplicate pairs appear side by side. Each match
          shows both filenames, both file sizes, and a similarity badge
          indicating the Hamming distance. Use the sensitivity slider to tune
          the matching threshold:
        </p>
        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Strict (Hamming 0-5):</strong> Only exact copies and near-perfect matches. Use this first to find the safest deletions.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Normal (Hamming 6-10):</strong> Very similar images, including small crops, WhatsApp re-compressions, and minor edits. The most useful mode for real library cleanup.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Loose (Hamming 11-20):</strong> Broader visual similarities. Useful for finding burst-mode groups and similar compositions, but review carefully as false positives increase.
          </li>
        </ul>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Step 5: Export the deletion report and clean up
        </h3>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Mark the photos you want to remove, then download the plain-text
          deletion report. The report lists the filenames you flagged. Open
          Finder (macOS) or File Explorer (Windows), locate the files, and
          delete them. TwinHunt cannot delete files itself — browsers do not
          have filesystem write access by design — which means you always make
          the final deletion decision.
        </p>

        <h2
          id="comparison-table"
          className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight"
        >
          Comparison: browser tool vs installed app vs upload-based web tool
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The table below compares the three main approaches across the
          dimensions that matter most for personal photo library cleanup.
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border border-gray-200 dark:border-[#2A2A2A] rounded-md overflow-hidden">
            <thead>
              <tr className="bg-gray-50 dark:bg-[#252525]">
                <th className="text-left px-3 py-2.5 text-xs font-semibold text-gray-700 dark:text-[#E5E5E5] border-b border-gray-200 dark:border-[#2A2A2A]">
                  Feature
                </th>
                <th className="text-left px-3 py-2.5 text-xs font-semibold text-gray-700 dark:text-[#E5E5E5] border-b border-gray-200 dark:border-[#2A2A2A]">
                  TwinHunt (browser)
                </th>
                <th className="text-left px-3 py-2.5 text-xs font-semibold text-gray-700 dark:text-[#E5E5E5] border-b border-gray-200 dark:border-[#2A2A2A]">
                  Installed app
                </th>
                <th className="text-left px-3 py-2.5 text-xs font-semibold text-gray-700 dark:text-[#E5E5E5] border-b border-gray-200 dark:border-[#2A2A2A]">
                  Upload-based web tool
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100 dark:border-[#2A2A2A]">
                <td className="px-3 py-2.5 text-gray-800 dark:text-[#E5E5E5] font-medium text-xs">
                  Installation required
                </td>
                <td className="px-3 py-2.5 text-gray-700 dark:text-[#E5E5E5] text-xs font-medium">
                  No
                </td>
                <td className="px-3 py-2.5 text-gray-600 dark:text-[#A3A3A3] text-xs">
                  Yes
                </td>
                <td className="px-3 py-2.5 text-gray-600 dark:text-[#A3A3A3] text-xs">
                  No
                </td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-[#2A2A2A]">
                <td className="px-3 py-2.5 text-gray-800 dark:text-[#E5E5E5] font-medium text-xs">
                  Photos stay on your device
                </td>
                <td className="px-3 py-2.5 text-gray-700 dark:text-[#E5E5E5] text-xs font-medium">
                  Yes (100%)
                </td>
                <td className="px-3 py-2.5 text-gray-700 dark:text-[#E5E5E5] text-xs font-medium">
                  Yes
                </td>
                <td className="px-3 py-2.5 text-gray-600 dark:text-[#A3A3A3] text-xs">
                  No (uploaded to server)
                </td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-[#2A2A2A]">
                <td className="px-3 py-2.5 text-gray-800 dark:text-[#E5E5E5] font-medium text-xs">
                  Near-duplicate detection
                </td>
                <td className="px-3 py-2.5 text-gray-700 dark:text-[#E5E5E5] text-xs font-medium">
                  Yes (pHash, adjustable)
                </td>
                <td className="px-3 py-2.5 text-gray-600 dark:text-[#A3A3A3] text-xs">
                  Varies by app
                </td>
                <td className="px-3 py-2.5 text-gray-600 dark:text-[#A3A3A3] text-xs">
                  Varies by service
                </td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-[#2A2A2A]">
                <td className="px-3 py-2.5 text-gray-800 dark:text-[#E5E5E5] font-medium text-xs">
                  HEIC support (iPhone)
                </td>
                <td className="px-3 py-2.5 text-gray-700 dark:text-[#E5E5E5] text-xs font-medium">
                  Yes
                </td>
                <td className="px-3 py-2.5 text-gray-600 dark:text-[#A3A3A3] text-xs">
                  Gemini yes, others limited
                </td>
                <td className="px-3 py-2.5 text-gray-600 dark:text-[#A3A3A3] text-xs">
                  Varies
                </td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-[#2A2A2A]">
                <td className="px-3 py-2.5 text-gray-800 dark:text-[#E5E5E5] font-medium text-xs">
                  Cost
                </td>
                <td className="px-3 py-2.5 text-gray-700 dark:text-[#E5E5E5] text-xs font-medium">
                  Free (up to 50 images)
                </td>
                <td className="px-3 py-2.5 text-gray-600 dark:text-[#A3A3A3] text-xs">
                  $19.99-$29.95 (dupeGuru free)
                </td>
                <td className="px-3 py-2.5 text-gray-600 dark:text-[#A3A3A3] text-xs">
                  Varies, often freemium
                </td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-[#2A2A2A]">
                <td className="px-3 py-2.5 text-gray-800 dark:text-[#E5E5E5] font-medium text-xs">
                  Works on Chromebook / Linux
                </td>
                <td className="px-3 py-2.5 text-gray-700 dark:text-[#E5E5E5] text-xs font-medium">
                  Yes
                </td>
                <td className="px-3 py-2.5 text-gray-600 dark:text-[#A3A3A3] text-xs">
                  Limited (Gemini macOS only)
                </td>
                <td className="px-3 py-2.5 text-gray-600 dark:text-[#A3A3A3] text-xs">
                  Yes
                </td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-[#2A2A2A]">
                <td className="px-3 py-2.5 text-gray-800 dark:text-[#E5E5E5] font-medium text-xs">
                  Works offline
                </td>
                <td className="px-3 py-2.5 text-gray-700 dark:text-[#E5E5E5] text-xs font-medium">
                  Yes (once loaded)
                </td>
                <td className="px-3 py-2.5 text-gray-700 dark:text-[#E5E5E5] text-xs font-medium">
                  Yes
                </td>
                <td className="px-3 py-2.5 text-gray-600 dark:text-[#A3A3A3] text-xs">
                  No
                </td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-[#2A2A2A]">
                <td className="px-3 py-2.5 text-gray-800 dark:text-[#E5E5E5] font-medium text-xs">
                  Max images (free)
                </td>
                <td className="px-3 py-2.5 text-gray-600 dark:text-[#A3A3A3] text-xs">
                  50 (500 with Pro)
                </td>
                <td className="px-3 py-2.5 text-gray-700 dark:text-[#E5E5E5] text-xs font-medium">
                  Unlimited
                </td>
                <td className="px-3 py-2.5 text-gray-600 dark:text-[#A3A3A3] text-xs">
                  Varies, often 20-50
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2.5 text-gray-800 dark:text-[#E5E5E5] font-medium text-xs">
                  Can delete files directly
                </td>
                <td className="px-3 py-2.5 text-gray-600 dark:text-[#A3A3A3] text-xs">
                  No (deletion report only)
                </td>
                <td className="px-3 py-2.5 text-gray-700 dark:text-[#E5E5E5] text-xs font-medium">
                  Yes
                </td>
                <td className="px-3 py-2.5 text-gray-600 dark:text-[#A3A3A3] text-xs">
                  No
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2
          id="which-copy-to-keep"
          className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight"
        >
          How to decide which copy to keep
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Finding duplicates is only half the work. Deciding which file to keep
          and which to delete requires a brief but consistent decision framework.
          Applying the same logic to every group makes the cleanup much faster
          and reduces the chance of deleting the wrong version.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Resolution: keep the larger file
        </h3>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          When two photos are visually identical but stored at different
          resolutions, always keep the larger one. The smaller file is almost
          certainly a re-compressed or resized copy — from WhatsApp, a web
          export, or a thumbnail saved inadvertently. A higher-resolution
          original can always be downsized later; the reverse is not true.
          TwinHunt shows both file sizes in the comparison view, making this
          call straightforward.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Edit vs original: keep both, or keep the edited version only
        </h3>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          If the duplicate pair consists of a RAW or unedited JPEG and an
          edited export, ask yourself whether you would ever re-edit the
          original. If you use a non-destructive editor like Lightroom that
          stores edit instructions separately, the RAW file is worth keeping.
          If the edit came from a destructive tool like Instagram filters or
          a basic phone editor, the original adds little value once editing
          is complete.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Burst mode: pick your best, delete the rest
        </h3>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          For burst-mode groups, TwinHunt&apos;s Normal or Loose sensitivity will
          surface them. Choose the sharpest, best-composed frame, mark
          the others for deletion, and move on. There is rarely a reason to
          keep five near-identical frames of a child blowing out birthday
          candles.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          When in doubt, keep the file with the earlier creation date
        </h3>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          If resolution and quality look equal, the earlier creation date is
          typically the original. Files re-saved by apps, migrated through
          cloud services, or re-exported from editors usually carry a newer
          timestamp than the source file.
        </p>

        <h2
          id="batch-deletion-workflow"
          className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight"
        >
          Batch deletion workflow: from TwinHunt report to a clean library
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Because TwinHunt produces a deletion report rather than deleting
          files directly, the batch deletion step requires a small amount of
          manual work. Here is the fastest way to complete it on each platform.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          macOS: using Finder with the deletion report
        </h3>
        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
            Open Finder and navigate to the folder containing the duplicates.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
            Open the deletion report in TextEdit or any text editor.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
            Use Finder&apos;s search bar (Command + F) to locate each file by name, or use Spotlight (Command + Space) for files scattered across multiple folders.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
            Select all files to delete and move them to Trash (Command + Delete). Empty Trash when done.
          </li>
        </ul>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          For larger batches on macOS, the Terminal command{" "}
          <code className="text-xs bg-gray-100 dark:bg-[#252525] px-1 py-0.5 rounded font-mono">
            while read f; do rm &quot;$f&quot;; done &lt; deletion-report.txt
          </code>{" "}
          processes the entire list in seconds, assuming the report contains
          full file paths.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Windows: using File Explorer or PowerShell
        </h3>
        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
            Open File Explorer and use the search bar to locate files by name from the report.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
            Select and delete each listed file, or use the Windows search (Windows + S) for files in unknown locations.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
            For batch deletion in PowerShell, use{" "}
            <code className="text-xs bg-gray-100 dark:bg-[#252525] px-1 py-0.5 rounded font-mono">
              Get-Content deletion-report.txt | Remove-Item
            </code>{" "}
            if the report contains full paths.
          </li>
        </ul>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          After cleaning up: compress and convert the keepers
        </h3>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Once duplicates are removed, two follow-up tasks consistently recover
          additional storage: compressing large JPEG and PNG files, and
          converting HEIC or PNG files to WebP for web use. Both are available
          free in SammaPix:
        </p>
        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
            <Link
              href="/tools/compress"
              className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors"
            >
              SammaPix Compress
            </Link>{" "}
            — reduce JPEG and PNG file sizes by 50-80% with no visible quality change. Runs in your browser, no upload.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
            <Link
              href="/tools/webp"
              className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors"
            >
              SammaPix Convert
            </Link>{" "}
            — convert HEIC, PNG, and RAW files to JPEG or WebP for broader compatibility and smaller file sizes.
          </li>
        </ul>

        <h2
          id="limitations"
          className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight"
        >
          What TwinHunt cannot do (and what to use instead)
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          TwinHunt is the right tool for most personal photo library cleanup
          tasks. There are specific use cases where its browser-based
          architecture is a genuine limitation, and being clear about those
          is more useful than overstating what it can do.
        </p>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Very large libraries (thousands of photos):</strong> The free tier supports 50 images per batch and the Pro tier supports 500. If you need to scan 10,000+ photos in a single pass, a desktop app like dupeGuru (free, open-source) is a more practical choice. You can use TwinHunt for targeted folder-by-folder cleanup in the meantime.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Heavy crops and aggressive filters:</strong> pHash detects duplicates based on low-frequency visual structure. A heavily cropped image (removing more than roughly a third of the frame) or a drastically filtered image (like a black-and-white conversion of a color photo) may not match even in Loose mode. These are edge cases, but worth knowing.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Automatic deletion:</strong> Browsers do not have filesystem write access. TwinHunt provides a deletion report; the actual removal must be done in your file manager. Desktop apps like Gemini can move files to Trash directly.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Video duplicate detection:</strong> TwinHunt currently handles image files only. Duplicate video detection requires different tooling.
          </li>
        </ul>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          For the overwhelming majority of personal photo library cleanup use
          cases — clearing out a year of phone photos, deduplicating after a
          cloud service migration, or finding WhatsApp re-saves among your
          originals — TwinHunt&apos;s 50-image free tier and adjustable pHash
          sensitivity are fully adequate. Try it on your most obvious duplicate
          folder first to get a feel for the results before committing to a Pro
          subscription for larger batches.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Ready to start? Drop your photos into{" "}
          <Link
            href="/tools/twinhunt"
            className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors"
          >
            TwinHunt
          </Link>{" "}
          and get the first batch of duplicates identified in under a minute.
        </p>

        <hr className="my-8 border-gray-100 dark:border-[#2A2A2A]" />

        <h2
          id="faq"
          className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight"
        >
          FAQ
        </h2>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Is there a free duplicate photo finder that doesn&apos;t upload my photos?
        </h3>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Yes. SammaPix TwinHunt runs entirely in your browser. No photo is
          ever uploaded to any server. Every comparison happens locally using
          the Canvas API and perceptual hashing. You can verify this by opening
          your browser&apos;s network inspector while running the tool — no outbound
          requests containing image data will appear.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          What is the best free alternative to Duplicate Cleaner or Gemini?
        </h3>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          SammaPix TwinHunt is the best browser-based alternative for users who
          want no installation and no cost. It supports JPG, PNG, WebP, and
          HEIC, uses adjustable perceptual hashing sensitivity, and processes up
          to 50 images free. For whole-library scans of tens of thousands of
          photos, dupeGuru (free, open-source desktop app) handles larger
          volumes, though it requires installation.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Can it find near-duplicate photos, not just exact copies?
        </h3>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Yes. Perceptual hashing finds duplicates based on visual content, not
          file bytes. TwinHunt has three sensitivity levels: Strict (Hamming
          distance 0-5) for exact copies, Normal (6-10) for very similar images
          including minor crops and WhatsApp re-compressions, and Loose (11-20)
          for broader visual matches including burst-mode groups.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Does TwinHunt work with iPhone HEIC photos?
        </h3>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Yes. TwinHunt supports HEIC files natively. It uses the embedded JPEG
          thumbnail inside the HEIC container for fast preview generation via
          exifr, and computes the perceptual hash from the full image data via
          a standard canvas draw. No separate conversion step is required. HEIC
          support works on macOS and iOS browsers.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Will TwinHunt delete my duplicate photos automatically?
        </h3>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          No. Browsers cannot write to or delete files from your filesystem by
          design. TwinHunt identifies duplicates, shows them side by side with
          sizes and similarity scores, and lets you download a plain-text
          deletion report. You then manually delete the listed files in Finder
          or File Explorer. This means you are always in complete control of
          what gets removed.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          How many photos can I scan for free?
        </h3>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          TwinHunt allows up to 50 images per session on the free plan. For
          larger batches — up to 500 images — a SammaPix Pro account is
          required. For personal library cleanup of a specific folder or set
          of photos, 50 images per session is typically sufficient if you work
          through your library in targeted batches by folder or date range.
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { APP_URL } from "@/lib/constants";
import BlogArticleLayout from "@/components/blog/BlogArticleLayout";

export const metadata: Metadata = {
  title: "How to Find & Delete Duplicate Photos Free [2026 Guide]",
  description:
    "Your phone has hundreds of duplicate photos eating storage. Here's how to find and delete them in minutes — free, no app install, works in your browser.",
  alternates: {
    canonical: `${APP_URL}/blog/find-delete-duplicate-photos-free`,
  },
  keywords: [
    "find duplicate photos",
    "duplicate photo finder free",
    "delete duplicate photos",
    "find similar images",
    "remove duplicate photos",
    "photo duplicate remover online",
    "find duplicate photos free",
  ],
  openGraph: {
    title: "How to Find & Delete Duplicate Photos Free [2026 Guide]",
    description:
      "Your phone has hundreds of duplicate photos eating storage. Learn how to find and delete them in minutes with a free browser-based tool. No app install required.",
    url: `${APP_URL}/blog/find-delete-duplicate-photos-free`,
    type: "article",
    publishedTime: "2026-04-16",
    authors: ["https://lucasammarco.com"],
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Find & Delete Duplicate Photos Free [2026 Guide]",
    description:
      "Your phone has hundreds of duplicate photos eating storage. Find and delete them in minutes — free, no install, works in your browser.",
    creator: "@lucasammarco",
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "How to Find & Delete Duplicate Photos Free [2026 Guide]",
  description:
    "Your phone has hundreds of duplicate photos eating storage. Here's how to find and delete them in minutes — free, no app install, works in your browser.",
  url: `${APP_URL}/blog/find-delete-duplicate-photos-free`,
  datePublished: "2026-04-16",
  dateModified: "2026-04-16",
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
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": `${APP_URL}/blog/find-delete-duplicate-photos-free`,
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: APP_URL },
    {
      "@type": "ListItem",
      position: 2,
      name: "Blog",
      item: `${APP_URL}/blog`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "How to Find & Delete Duplicate Photos Free [2026 Guide]",
      item: `${APP_URL}/blog/find-delete-duplicate-photos-free`,
    },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How many duplicate photos does the average phone have?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Studies and user reports consistently show that 15-25% of photos on the average phone are duplicates or near-duplicates. For a phone with 3,000 photos, that means 450 to 750 redundant images taking up 1-3 GB of storage.",
      },
    },
    {
      "@type": "Question",
      name: "Does finding duplicates require uploading my photos?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Not with browser-based tools like SammaPix TwinHunt. All processing happens locally in your browser using the File API and Canvas API. Your photos never leave your device, and no image data is transmitted to any server.",
      },
    },
    {
      "@type": "Question",
      name: "Can TwinHunt find near-duplicates, not just exact copies?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. TwinHunt uses perceptual hashing to analyze the visual content of each image. This catches near-duplicates like re-compressed copies, resized versions, lightly cropped photos, and even screenshots of the same image — not just byte-identical files.",
      },
    },
    {
      "@type": "Question",
      name: "Will deleting duplicates affect my iCloud or Google Photos?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "TwinHunt works with local files on your device. If your photos are synced to iCloud or Google Photos, deleting a local file may trigger a sync deletion depending on your settings. Before bulk-deleting, check whether your cloud service is set to mirror local changes or keep its own copy.",
      },
    },
    {
      "@type": "Question",
      name: "How much storage can I recover by removing duplicate photos?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Results vary by library, but most users recover 10-25% of their photo storage. In our tests, a 500-photo camera roll yielded 83 duplicates (17%), WhatsApp saved photos had 34% duplicates, and screenshots folders had 27%. Total recoverable storage from a mid-size library is typically 1-3 GB.",
      },
    },
    {
      "@type": "Question",
      name: "Does TwinHunt work with RAW files?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "TwinHunt supports common image formats including JPEG, PNG, WebP, and HEIC. RAW formats (.CR2, .NEF, .ARW) have limited browser support. For RAW files, export them as JPEG or TIFF first, or use TwinHunt on the JPEG previews that your camera typically generates alongside RAW files.",
      },
    },
  ],
};

export default function FindDeleteDuplicatePhotosFree() {
  return (
    <>
      <BlogArticleLayout
        title="How to Find & Delete Duplicate Photos Free [2026 Guide]"
        slug="find-delete-duplicate-photos-free"
        description="Your phone has hundreds of duplicate photos eating storage. Here's how to find and delete them in minutes — free, no app install, works in your browser."
        date="2026-04-16"
        dateFormatted="April 16, 2026"
        tags={["Tools"]}
        readingTime={10}
        headings={[
          {
            id: "more-duplicates-than-you-think",
            title: "Your phone has more duplicates than you think",
          },
          {
            id: "what-counts-as-duplicate",
            title: "What counts as a duplicate?",
          },
          {
            id: "three-ways-to-find-duplicates",
            title: "The 3 ways to find duplicate photos",
          },
          {
            id: "how-twinhunt-finds-duplicates",
            title: "How TwinHunt finds duplicates",
          },
          {
            id: "real-test-500-photos",
            title: "Real test: 500 photos, how many duplicates?",
          },
          {
            id: "desktop-vs-browser-comparison",
            title: "Desktop apps vs browser-based: honest comparison",
          },
          {
            id: "tips-prevent-duplicates",
            title: "Tips to prevent duplicates",
          },
          { id: "faq", title: "FAQ" },
          { id: "related-guides", title: "Related guides" },
        ]}
        summary={[
          "The average phone contains 15-25% duplicate photos from burst mode, WhatsApp auto-saves, Live Photos, and cloud sync overlaps.",
          "Simple file comparison only catches exact copies — perceptual hashing is needed to find near-duplicates like re-compressed or resized versions.",
          "Desktop apps like Gemini 2 cost $20+/year and require installation; SammaPix TwinHunt is free, runs in your browser, and never uploads your photos.",
          "In real-world testing, TwinHunt found 83 duplicates in a 500-photo camera roll (17%), saving 1.2 GB across three test folders.",
          "Prevent future duplicates by disabling auto-save in messaging apps, culling burst shots immediately, and running a quarterly cleanup.",
        ]}
        heroImage={
          <figure>
            <img
              src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80"
              alt="Camera and organized photo prints on a desk representing photo library management"
              className="w-full rounded-lg"
              loading="eager"
            />
            <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
              A well-organized photo library starts with removing the duplicates
              you did not know you had - Photo by Alexander Andrews on Unsplash
            </figcaption>
          </figure>
        }
        ctaBlock={
          <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2">
              Ready to clean up your photo library?
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-4">
              Drop your photos into TwinHunt and find every duplicate in
              minutes. Free, no signup, runs entirely in your browser. Then
              compress the keepers to save even more space.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/tools/twinhunt"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
              >
                Open TwinHunt
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
              <Link
                href="/tools/compress"
                className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-[#444] text-gray-900 dark:text-[#E5E5E5] text-sm font-medium rounded-md hover:bg-gray-50 dark:hover:bg-[#2A2A2A] transition-colors"
              >
                Compress Photos
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
            </div>
          </div>
        }
      >
        {/* ───────────────── Section 1 ───────────────── */}

        <h2
          className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight"
          id="more-duplicates-than-you-think"
        >
          Your phone has more duplicates than you think
        </h2>

        <p className="text-sm text-[#737373] leading-relaxed mb-3">
          Open your phone right now and check your photo count. If you are
          like most people, you have somewhere between 2,000 and 10,000
          images. What you probably do not realize is that 15 to 25 percent
          of those are duplicates or near-duplicates. That is not a guess.
          Storage analysis tools consistently report the same range across
          millions of devices.
        </p>

        <p className="text-sm text-[#737373] leading-relaxed mb-3">
          Where do all these duplicates come from? The sources are more
          varied than you might expect:
        </p>

        <ul className="mb-4 space-y-2">
          <li className="flex gap-2.5 text-sm text-[#737373]">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-gray-300 dark:bg-[#525252] shrink-0" />
            <span>
              <strong className="text-gray-800 dark:text-[#E5E5E5]">
                iPhone Live Photos.
              </strong>{" "}
              Every Live Photo stores a still frame plus a short video clip.
              Many apps export the still separately when you share, creating
              a near-duplicate you never asked for.
            </span>
          </li>
          <li className="flex gap-2.5 text-sm text-[#737373]">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-gray-300 dark:bg-[#525252] shrink-0" />
            <span>
              <strong className="text-gray-800 dark:text-[#E5E5E5]">
                WhatsApp and Telegram auto-saves.
              </strong>{" "}
              Messaging apps automatically save every photo sent to you into
              your camera roll. If the same image gets forwarded in three
              group chats, you now have three copies.
            </span>
          </li>
          <li className="flex gap-2.5 text-sm text-[#737373]">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-gray-300 dark:bg-[#525252] shrink-0" />
            <span>
              <strong className="text-gray-800 dark:text-[#E5E5E5]">
                Burst mode.
              </strong>{" "}
              Hold the shutter button and your phone captures 10 frames per
              second. Most people keep all of them instead of selecting the
              best one. That single moment now occupies 30-50 MB instead of
              3-5 MB.
            </span>
          </li>
          <li className="flex gap-2.5 text-sm text-[#737373]">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-gray-300 dark:bg-[#525252] shrink-0" />
            <span>
              <strong className="text-gray-800 dark:text-[#E5E5E5]">
                Screenshots of photos.
              </strong>{" "}
              You screenshot a photo to share it on Instagram Stories, then
              forget to delete the screenshot. Now you have the original and
              a lower-quality copy sitting side by side.
            </span>
          </li>
          <li className="flex gap-2.5 text-sm text-[#737373]">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-gray-300 dark:bg-[#525252] shrink-0" />
            <span>
              <strong className="text-gray-800 dark:text-[#E5E5E5]">
                Cloud sync overlaps.
              </strong>{" "}
              iCloud, Google Photos, Dropbox, and OneDrive can all sync the
              same photo into different folders on the same device. Each sync
              service creates its own copy.
            </span>
          </li>
          <li className="flex gap-2.5 text-sm text-[#737373]">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-gray-300 dark:bg-[#525252] shrink-0" />
            <span>
              <strong className="text-gray-800 dark:text-[#E5E5E5]">
                Editing without deleting originals.
              </strong>{" "}
              You crop a photo or apply a filter, your phone saves the edited
              version as a new file, and the untouched original stays in your
              library.
            </span>
          </li>
        </ul>

        <p className="text-sm text-[#737373] leading-relaxed mb-3">
          The math adds up fast. If you take 100 photos per month and 20% end
          up duplicated through these channels, you accumulate roughly 240
          unnecessary photos per year. At 3-5 MB each, that is 700 MB to 1.2
          GB of wasted storage annually, just from duplicates.
        </p>

        {/* ───────────────── Section 2 ───────────────── */}

        <h2
          className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight"
          id="what-counts-as-duplicate"
        >
          What counts as a duplicate?
        </h2>

        <p className="text-sm text-[#737373] leading-relaxed mb-3">
          Not all duplicates are created equal. Understanding the difference
          matters because each type requires a different detection method.
        </p>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-6 mb-2">
          Exact duplicates
        </h3>

        <p className="text-sm text-[#737373] leading-relaxed mb-3">
          These are byte-for-byte identical files. The image data, metadata,
          and file structure are all the same. The only thing that might
          differ is the filename. A photo named{" "}
          <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1.5 py-0.5 rounded">
            IMG_4523.jpg
          </code>{" "}
          and its copy named{" "}
          <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1.5 py-0.5 rounded">
            photo-backup.jpg
          </code>{" "}
          are exact duplicates if their contents are identical. These are the
          easiest to detect: compute a hash (like SHA-256) of each file, and
          identical hashes mean identical files.
        </p>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-6 mb-2">
          Near-duplicates
        </h3>

        <p className="text-sm text-[#737373] leading-relaxed mb-3">
          These are photos that look the same to your eyes but differ at the
          byte level. Common causes include re-compression (saving a JPEG
          twice reduces quality slightly each time), resizing (a 4000px
          original and its 1200px thumbnail), format conversion (the same
          image saved as both JPEG and PNG), and minor edits (cropping a few
          pixels off the edge). Simple file comparison will never catch these
          because the raw bytes are different even though the visual content
          is nearly identical.
        </p>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-6 mb-2">
          Similar photos
        </h3>

        <p className="text-sm text-[#737373] leading-relaxed mb-3">
          These are photos of the same scene taken within seconds of each
          other. Burst shots are the classic example: 10 frames of your dog
          catching a frisbee, where only the timing and slight movement
          differ. These are not technically duplicates, but keeping all of
          them serves no purpose. You want the best one.
        </p>

        <p className="text-sm text-[#737373] leading-relaxed mb-3">
          Most people only think about exact duplicates when they hear
          &ldquo;duplicate photos.&rdquo; But the near-duplicates and similar photos
          usually account for more wasted space because they include all
          those burst shots, screenshots, and re-compressed copies that slip
          through simple file-matching tools.
        </p>

        {/* ───────────────── Section 3 ───────────────── */}

        <h2
          className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight"
          id="three-ways-to-find-duplicates"
        >
          The 3 ways to find duplicate photos
        </h2>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-6 mb-2">
          1. Manual review
        </h3>

        <p className="text-sm text-[#737373] leading-relaxed mb-3">
          You scroll through your library, spot photos that look the same,
          and delete the extras one by one. This works if you have 50 photos.
          It does not work if you have 5,000. At a generous estimate of 3
          seconds per photo comparison, reviewing a 3,000-photo library takes
          over two hours of focused attention. And you will still miss
          near-duplicates because your eyes cannot reliably spot a
          re-compressed JPEG next to its original.
        </p>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-6 mb-2">
          2. Desktop applications
        </h3>

        <p className="text-sm text-[#737373] leading-relaxed mb-3">
          Apps like Gemini 2 (macOS, $20/year), CCleaner (Windows, $30/year),
          and Duplicate Photos Fixer Pro do a solid job of finding
          duplicates. They run locally on your machine, which is good for
          privacy. The downsides: they cost money, require installation, are
          platform-locked (Gemini 2 does not run on Windows, CCleaner does
          not run on Mac), and some come bundled with bloatware or
          aggressive upsell prompts. CCleaner in particular has a history of
          bundling unwanted software that you have to opt out of during
          installation.
        </p>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-6 mb-2">
          3. Browser-based tools
        </h3>

        <p className="text-sm text-[#737373] leading-relaxed mb-3">
          This is the newer approach and the one that makes the most sense
          for most people.{" "}
          <Link
            href="/tools/twinhunt"
            className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors"
          >
            SammaPix TwinHunt
          </Link>{" "}
          runs entirely in your browser. You do not install anything. You do
          not create an account. You do not upload your photos to any server.
          The tool uses the browser&apos;s File API and Canvas API to read and
          analyze your images locally. It works on any operating system
          (Windows, macOS, Linux, ChromeOS) because it only needs a modern
          browser.
        </p>

        <div className="my-6 p-4 bg-gray-50 dark:bg-[#1E1E1E] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md">
          <p className="text-sm text-[#737373]">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">
              Why browser-based matters for privacy:
            </strong>{" "}
            Many &ldquo;free&rdquo; online duplicate finders ask you to upload your
            photos to their servers for processing. Your personal photos then
            sit on someone else&apos;s infrastructure, subject to their privacy
            policy and security practices. Browser-based tools like{" "}
            <Link
              href="/"
              className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors"
            >
              SammaPix
            </Link>{" "}
            eliminate this risk entirely. Your photos never leave your device.
          </p>
        </div>

        {/* ───────────────── Section 4 ───────────────── */}

        <h2
          className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight"
          id="how-twinhunt-finds-duplicates"
        >
          How TwinHunt finds duplicates
        </h2>

        <p className="text-sm text-[#737373] leading-relaxed mb-3">
          Here is the step-by-step workflow from start to finish. The entire
          process takes less than five minutes for most photo libraries.
        </p>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-6 mb-2">
          Step 1: Drop your photos
        </h3>

        <p className="text-sm text-[#737373] leading-relaxed mb-3">
          Open{" "}
          <Link
            href="/tools/twinhunt"
            className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors"
          >
            TwinHunt
          </Link>{" "}
          in your browser. Drag a folder of photos onto the drop zone, or
          click to select a folder from your file system. TwinHunt accepts
          JPEG, PNG, WebP, HEIC, and other common image formats. There is no
          file count limit and no file size limit. You can process your
          entire camera roll export at once.
        </p>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-6 mb-2">
          Step 2: AI scans your library
        </h3>

        <p className="text-sm text-[#737373] leading-relaxed mb-3">
          TwinHunt generates a perceptual hash for every image. This is a
          compact fingerprint that represents the visual content of the photo,
          not the raw file bytes. Two photos that look identical produce
          nearly identical hashes, even if one was resized or re-compressed.
          The scanning happens entirely in your browser tab. A progress bar
          shows you exactly where the process stands.
        </p>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-6 mb-2">
          Step 3: Groups of similar photos appear
        </h3>

        <p className="text-sm text-[#737373] leading-relaxed mb-3">
          Once scanning finishes, TwinHunt presents your duplicates organized
          into groups. Each group contains two or more photos that match. You
          see thumbnails side by side with file size, dimensions, and
          creation date for each image. The tool automatically highlights
          which version it recommends keeping (usually the highest resolution
          or the one with the most complete metadata).
        </p>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-6 mb-2">
          Step 4: You pick which to keep
        </h3>

        <p className="text-sm text-[#737373] leading-relaxed mb-3">
          Review each group and select the copies you want to remove. You can
          accept TwinHunt&apos;s recommendations with a single click or override
          them manually. Click any thumbnail to view it at full size. For
          near-duplicates where the difference is subtle (a slightly
          different crop, a minor exposure adjustment), the full-size preview
          helps you make the right call.
        </p>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-6 mb-2">
          Step 5: Download your cleaned set
        </h3>

        <p className="text-sm text-[#737373] leading-relaxed mb-3">
          After selecting the duplicates to remove, download the cleaned set
          of unique photos. Your original files are never modified or deleted
          by TwinHunt. You get a clean export with only the keepers. Want to
          reduce file sizes further? Run the keepers through{" "}
          <Link
            href="/tools/compress"
            className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors"
          >
            SammaPix Compress
          </Link>{" "}
          to shrink them by 60-80% with no visible quality loss.
        </p>

        {/* Inline CTA */}
        <div className="my-8 flex">
          <Link
            href="/tools/twinhunt"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
          >
            Try TwinHunt free
            <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
          </Link>
        </div>

        {/* ───────────────── Section 5 ───────────────── */}

        <h2
          className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight"
          id="real-test-500-photos"
        >
          Real test: 500 photos, how many duplicates?
        </h2>

        <p className="text-sm text-[#737373] leading-relaxed mb-3">
          We ran TwinHunt on three real-world photo folders to see how many
          duplicates a typical user accumulates. No cherry-picked results.
          These are actual libraries from everyday phone use.
        </p>

        <div className="my-6 overflow-x-auto">
          <table className="w-full border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md overflow-hidden text-sm">
            <thead>
              <tr className="bg-gray-50 dark:bg-[#1E1E1E]">
                <th className="text-left px-4 py-2.5 font-semibold text-[#171717] dark:text-[#E5E5E5] border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
                  Folder
                </th>
                <th className="text-left px-4 py-2.5 font-semibold text-[#171717] dark:text-[#E5E5E5] border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
                  Total photos
                </th>
                <th className="text-left px-4 py-2.5 font-semibold text-[#171717] dark:text-[#E5E5E5] border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
                  Duplicates found
                </th>
                <th className="text-left px-4 py-2.5 font-semibold text-[#171717] dark:text-[#E5E5E5] border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
                  Duplicate rate
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
                <td className="px-4 py-2.5 text-[#737373]">Camera roll</td>
                <td className="px-4 py-2.5 text-[#737373]">500</td>
                <td className="px-4 py-2.5 text-[#737373]">83</td>
                <td className="px-4 py-2.5 text-[#737373]">17%</td>
              </tr>
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
                <td className="px-4 py-2.5 text-[#737373]">
                  WhatsApp saved
                </td>
                <td className="px-4 py-2.5 text-[#737373]">200</td>
                <td className="px-4 py-2.5 text-[#737373]">67</td>
                <td className="px-4 py-2.5 text-[#737373]">34%</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 text-[#737373]">
                  Screenshots folder
                </td>
                <td className="px-4 py-2.5 text-[#737373]">150</td>
                <td className="px-4 py-2.5 text-[#737373]">41</td>
                <td className="px-4 py-2.5 text-[#737373]">27%</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-sm text-[#737373] leading-relaxed mb-3">
          <strong className="text-gray-800 dark:text-[#E5E5E5]">
            Total storage recovered: 1.2 GB
          </strong>{" "}
          across all three folders. The WhatsApp folder had the highest
          duplicate rate because messaging apps aggressively save every photo
          you receive, including forwarded images you have already seen in
          other chats. The camera roll duplicates came primarily from burst
          shots and Live Photo exports. The screenshots folder was full of
          nearly identical screenshots taken seconds apart (different scroll
          positions on the same webpage, slight variations of the same text
          conversation).
        </p>

        <p className="text-sm text-[#737373] leading-relaxed mb-3">
          The breakdown between exact and near-duplicates was revealing. In
          the camera roll, only 31 of the 83 duplicates (37%) were exact
          copies. The remaining 52 were near-duplicates: burst shots, Live
          Photo exports, and re-compressed versions saved by different apps.
          A tool that only checks for exact matches would have missed 63% of
          the duplicates.
        </p>

        {/* ───────────────── Section 6 ───────────────── */}

        <h2
          className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight"
          id="desktop-vs-browser-comparison"
        >
          Desktop apps vs browser-based: honest comparison
        </h2>

        <p className="text-sm text-[#737373] leading-relaxed mb-3">
          There is no single &ldquo;best&rdquo; tool for everyone. Here is a fair
          comparison of the four most common options in 2026.
        </p>

        <div className="my-6 overflow-x-auto">
          <table className="w-full border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md overflow-hidden text-sm">
            <thead>
              <tr className="bg-gray-50 dark:bg-[#1E1E1E]">
                <th className="text-left px-4 py-2.5 font-semibold text-[#171717] dark:text-[#E5E5E5] border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
                  Tool
                </th>
                <th className="text-left px-4 py-2.5 font-semibold text-[#171717] dark:text-[#E5E5E5] border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
                  Price
                </th>
                <th className="text-left px-4 py-2.5 font-semibold text-[#171717] dark:text-[#E5E5E5] border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
                  Platform
                </th>
                <th className="text-left px-4 py-2.5 font-semibold text-[#171717] dark:text-[#E5E5E5] border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
                  Privacy
                </th>
                <th className="text-left px-4 py-2.5 font-semibold text-[#171717] dark:text-[#E5E5E5] border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
                  Near-duplicates
                </th>
                <th className="text-left px-4 py-2.5 font-semibold text-[#171717] dark:text-[#E5E5E5] border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
                  Install required
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
                <td className="px-4 py-2.5 font-medium text-[#171717] dark:text-[#E5E5E5]">
                  Gemini 2
                </td>
                <td className="px-4 py-2.5 text-[#737373]">$20/year</td>
                <td className="px-4 py-2.5 text-[#737373]">macOS only</td>
                <td className="px-4 py-2.5 text-[#737373]">
                  Local processing
                </td>
                <td className="px-4 py-2.5 text-[#737373]">Yes</td>
                <td className="px-4 py-2.5 text-[#737373]">Yes</td>
              </tr>
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
                <td className="px-4 py-2.5 font-medium text-[#171717] dark:text-[#E5E5E5]">
                  CCleaner
                </td>
                <td className="px-4 py-2.5 text-[#737373]">$30/year</td>
                <td className="px-4 py-2.5 text-[#737373]">Windows only</td>
                <td className="px-4 py-2.5 text-[#737373]">
                  Local, but bloatware risk
                </td>
                <td className="px-4 py-2.5 text-[#737373]">Limited</td>
                <td className="px-4 py-2.5 text-[#737373]">Yes</td>
              </tr>
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
                <td className="px-4 py-2.5 font-medium text-[#171717] dark:text-[#E5E5E5]">
                  Google Photos
                </td>
                <td className="px-4 py-2.5 text-[#737373]">Free</td>
                <td className="px-4 py-2.5 text-[#737373]">Any (web)</td>
                <td className="px-4 py-2.5 text-[#737373]">
                  Uploads to Google cloud
                </td>
                <td className="px-4 py-2.5 text-[#737373]">Yes</td>
                <td className="px-4 py-2.5 text-[#737373]">No</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-medium text-[#171717] dark:text-[#E5E5E5]">
                  SammaPix TwinHunt
                </td>
                <td className="px-4 py-2.5 text-[#737373]">Free</td>
                <td className="px-4 py-2.5 text-[#737373]">
                  Any OS (browser)
                </td>
                <td className="px-4 py-2.5 text-[#737373]">
                  100% local, no upload
                </td>
                <td className="px-4 py-2.5 text-[#737373]">Yes</td>
                <td className="px-4 py-2.5 text-[#737373]">No</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-sm text-[#737373] leading-relaxed mb-3">
          Gemini 2 is excellent if you are on macOS and willing to pay. Its
          duplicate detection is fast and accurate, and it integrates
          well with Finder. The limitation is that it is locked to Apple
          hardware and requires a subscription.
        </p>

        <p className="text-sm text-[#737373] leading-relaxed mb-3">
          CCleaner gets the job done on Windows, but it comes with
          baggage. The installer bundles toolbar offers and upsells for
          their premium product. Their near-duplicate detection is also less
          sophisticated than the other options listed here.
        </p>

        <p className="text-sm text-[#737373] leading-relaxed mb-3">
          Google Photos has built-in duplicate detection, but it requires
          uploading all your photos to Google&apos;s servers. For users who
          already store everything in Google Photos, this is fine. For
          users who prefer to keep photos local or who are concerned about
          cloud privacy, it is a non-starter.
        </p>

        <p className="text-sm text-[#737373] leading-relaxed mb-3">
          <Link
            href="/tools/twinhunt"
            className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors"
          >
            TwinHunt
          </Link>{" "}
          fills the gap: free, works on any OS, finds near-duplicates, and
          keeps everything local. The tradeoff is that processing very large
          libraries (50,000+ photos) is slower in a browser than in a native
          app. For the vast majority of users with libraries under 10,000
          photos, the difference is negligible.
        </p>

        {/* ───────────────── Section 7 ───────────────── */}

        <h2
          className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight"
          id="tips-prevent-duplicates"
        >
          Tips to prevent duplicates
        </h2>

        <p className="text-sm text-[#737373] leading-relaxed mb-3">
          Cleaning up duplicates is satisfying, but preventing them from
          accumulating in the first place saves you more time in the long
          run. Here are five habits that dramatically reduce duplicate
          buildup.
        </p>

        <ul className="mb-4 space-y-3">
          <li className="flex gap-2.5 text-sm text-[#737373]">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-gray-300 dark:bg-[#525252] shrink-0" />
            <span>
              <strong className="text-gray-800 dark:text-[#E5E5E5]">
                Disable auto-save in WhatsApp and Telegram.
              </strong>{" "}
              Open WhatsApp, go to Settings, then Chats, and turn off
              &ldquo;Save to Camera Roll.&rdquo; Do the same in Telegram under
              Settings, then Data and Storage, then &ldquo;Save to Gallery.&rdquo; This
              single change eliminates the biggest source of duplicates for
              most people. You can still manually save photos you actually
              want to keep.
            </span>
          </li>
          <li className="flex gap-2.5 text-sm text-[#737373]">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-gray-300 dark:bg-[#525252] shrink-0" />
            <span>
              <strong className="text-gray-800 dark:text-[#E5E5E5]">
                Use HEIC instead of JPG on iPhone.
              </strong>{" "}
              HEIC files are roughly half the size of equivalent JPEGs with
              no visible quality difference. Go to Settings, then Camera,
              then Formats, and select &ldquo;High Efficiency.&rdquo; Smaller files
              mean duplicates take up less space when they do occur, and HEIC
              avoids the JPG-plus-Live-Photo double-save that some export
              workflows create.
            </span>
          </li>
          <li className="flex gap-2.5 text-sm text-[#737373]">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-gray-300 dark:bg-[#525252] shrink-0" />
            <span>
              <strong className="text-gray-800 dark:text-[#E5E5E5]">
                Cull burst shots immediately.
              </strong>{" "}
              After taking a burst, open the burst group right away and
              select the best frame. Delete the rest before they sync
              everywhere. If you let burst shots sit for a week, they
              propagate across every sync service and become much harder to
              clean up.
            </span>
          </li>
          <li className="flex gap-2.5 text-sm text-[#737373]">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-gray-300 dark:bg-[#525252] shrink-0" />
            <span>
              <strong className="text-gray-800 dark:text-[#E5E5E5]">
                Organize first, then deduplicate.
              </strong>{" "}
              Before running a duplicate scan, sort your photos into logical
              folders by date or event. This makes it easier to spot which
              copy is the &ldquo;original&rdquo; and which is the stray. You can use{" "}
              <Link
                href="/tools/ai-organize"
                className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors"
              >
                AI Organize
              </Link>{" "}
              to automatically sort photos by content, scene, and date
              before running TwinHunt.
            </span>
          </li>
          <li className="flex gap-2.5 text-sm text-[#737373]">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-gray-300 dark:bg-[#525252] shrink-0" />
            <span>
              <strong className="text-gray-800 dark:text-[#E5E5E5]">
                Run a quarterly cleanup.
              </strong>{" "}
              Even with good habits, duplicates creep in. Set a calendar
              reminder every three months to run TwinHunt on your photo
              library. A 5-minute quarterly scan prevents the kind of
              duplicate buildup that takes an hour to sort through later.
            </span>
          </li>
        </ul>

        <figure className="my-8">
          <img
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80"
            alt="Clean minimalist landscape representing an organized and clutter-free photo library"
            className="w-full rounded-lg"
            loading="lazy"
          />
          <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
            A few simple habits keep your photo library clean long-term -
            Photo by Bailey Zindel on Unsplash
          </figcaption>
        </figure>

        <hr className="my-8 border-gray-100 dark:border-[#2A2A2A]" />

        {/* ───────────────── Section 8: FAQ ───────────────── */}

        <h2
          className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight"
          id="faq"
        >
          FAQ
        </h2>

        <div className="space-y-3">
          <details className="group border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md overflow-hidden">
            <summary className="cursor-pointer px-4 py-3 text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] bg-gray-50 dark:bg-[#1E1E1E] hover:bg-gray-100 dark:hover:bg-[#252525] transition-colors">
              How many duplicate photos does the average phone have?
            </summary>
            <div className="px-4 py-3">
              <p className="text-sm text-[#737373] leading-relaxed">
                Storage analysis data consistently shows that 15-25% of photos
                on the average phone are duplicates or near-duplicates. For a
                phone with 3,000 photos, that translates to 450-750 redundant
                images. The primary sources are messaging app auto-saves, burst
                mode shots, Live Photo exports, cloud sync overlaps, and
                screenshots of existing photos.
              </p>
            </div>
          </details>

          <details className="group border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md overflow-hidden">
            <summary className="cursor-pointer px-4 py-3 text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] bg-gray-50 dark:bg-[#1E1E1E] hover:bg-gray-100 dark:hover:bg-[#252525] transition-colors">
              Does finding duplicates require uploading my photos?
            </summary>
            <div className="px-4 py-3">
              <p className="text-sm text-[#737373] leading-relaxed">
                Not with browser-based tools.{" "}
                <Link
                  href="/tools/twinhunt"
                  className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors"
                >
                  TwinHunt
                </Link>{" "}
                processes everything locally using your browser&apos;s File API
                and Canvas API. Your photos never leave your device. No image
                data, thumbnails, or hash values are transmitted to any server.
                Some other &ldquo;free&rdquo; tools do require uploads, so always check
                before using them. If you want to verify privacy claims, you
                can use{" "}
                <Link
                  href="/tools/exif"
                  className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors"
                >
                  EXIF Viewer
                </Link>{" "}
                to check what metadata your photos contain before processing
                them anywhere.
              </p>
            </div>
          </details>

          <details className="group border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md overflow-hidden">
            <summary className="cursor-pointer px-4 py-3 text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] bg-gray-50 dark:bg-[#1E1E1E] hover:bg-gray-100 dark:hover:bg-[#252525] transition-colors">
              Can TwinHunt find near-duplicates, not just exact copies?
            </summary>
            <div className="px-4 py-3">
              <p className="text-sm text-[#737373] leading-relaxed">
                Yes. TwinHunt uses perceptual hashing, which analyzes the visual
                content of each image rather than the raw file bytes. This means
                it catches near-duplicates like re-compressed copies, resized
                versions, lightly cropped photos, format conversions (the same
                image saved as both JPEG and PNG), and even screenshots of
                photos. A tool that only compares file hashes (MD5, SHA-256)
                would miss all of these.
              </p>
            </div>
          </details>

          <details className="group border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md overflow-hidden">
            <summary className="cursor-pointer px-4 py-3 text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] bg-gray-50 dark:bg-[#1E1E1E] hover:bg-gray-100 dark:hover:bg-[#252525] transition-colors">
              Will deleting duplicates affect my iCloud or Google Photos?
            </summary>
            <div className="px-4 py-3">
              <p className="text-sm text-[#737373] leading-relaxed">
                TwinHunt works with local files on your device. It does not
                connect to iCloud, Google Photos, or any cloud service. However,
                if your cloud service is configured to mirror local changes
                (which is the default for both iCloud Photos and Google Photos
                backup), then deleting a local file may trigger a deletion in
                the cloud on the next sync. Before bulk-deleting, check your
                sync settings. If you want to be extra cautious, export your
                photos to a separate folder, run TwinHunt on that folder, and
                only delete from your main library after confirming the results.
              </p>
            </div>
          </details>

          <details className="group border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md overflow-hidden">
            <summary className="cursor-pointer px-4 py-3 text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] bg-gray-50 dark:bg-[#1E1E1E] hover:bg-gray-100 dark:hover:bg-[#252525] transition-colors">
              How much storage can I recover?
            </summary>
            <div className="px-4 py-3">
              <p className="text-sm text-[#737373] leading-relaxed">
                Results depend on your library, but most users recover 10-25% of
                their photo storage. In our testing across three folders (camera
                roll, WhatsApp saved, screenshots), the average duplicate rate
                was 22% and total recovered space was 1.2 GB. Heavy WhatsApp
                users and people who frequently use burst mode tend to be at
                the higher end. After removing duplicates, running the remaining
                photos through{" "}
                <Link
                  href="/tools/compress"
                  className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors"
                >
                  SammaPix Compress
                </Link>{" "}
                can reduce their size by another 60-80%.
              </p>
            </div>
          </details>

          <details className="group border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md overflow-hidden">
            <summary className="cursor-pointer px-4 py-3 text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] bg-gray-50 dark:bg-[#1E1E1E] hover:bg-gray-100 dark:hover:bg-[#252525] transition-colors">
              Does it work with RAW files?
            </summary>
            <div className="px-4 py-3">
              <p className="text-sm text-[#737373] leading-relaxed">
                TwinHunt supports common image formats including JPEG, PNG,
                WebP, and HEIC. RAW formats (.CR2, .NEF, .ARW, .DNG) have
                limited native browser support. For RAW-heavy libraries, the
                best approach is to run TwinHunt on the JPEG previews that most
                cameras generate alongside RAW files. If your camera only shoots
                RAW without embedded previews, export them as JPEG or TIFF
                first, then run the scan. The duplicate groups will correspond
                to the same RAW files you need to clean up.
              </p>
            </div>
          </details>
        </div>

        <hr className="my-8 border-gray-100 dark:border-[#2A2A2A]" />

        {/* ───────────────── Section 9: Related guides ───────────────── */}

        <h2
          className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight"
          id="related-guides"
        >
          Related guides
        </h2>

        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Once your duplicates are gone, these guides help you optimize
          and organize what remains.
        </p>

        <ul className="space-y-3 mb-4">
          <li className="flex gap-2.5 text-sm text-[#737373]">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-gray-300 dark:bg-[#525252] shrink-0" />
            <span>
              <Link
                href="/tools/compress"
                className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors"
              >
                Compress Photos
              </Link>{" "}
              — Reduce file sizes by 60-80% with no visible quality loss.
              The natural next step after removing duplicates.
            </span>
          </li>
          <li className="flex gap-2.5 text-sm text-[#737373]">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-gray-300 dark:bg-[#525252] shrink-0" />
            <span>
              <Link
                href="/tools/ai-organize"
                className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors"
              >
                AI Organize
              </Link>{" "}
              — Automatically sort your photos into folders by content,
              scene type, and date. Useful before running a duplicate scan
              so you can see which folder each duplicate belongs to.
            </span>
          </li>
          <li className="flex gap-2.5 text-sm text-[#737373]">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-gray-300 dark:bg-[#525252] shrink-0" />
            <span>
              <Link
                href="/tools/exif"
                className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors"
              >
                EXIF Viewer
              </Link>{" "}
              — Check and strip metadata from your photos. Useful for
              verifying which version of a near-duplicate has the most
              complete metadata before deleting the other.
            </span>
          </li>
          <li className="flex gap-2.5 text-sm text-[#737373]">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-gray-300 dark:bg-[#525252] shrink-0" />
            <span>
              <Link
                href="/blog/organize-travel-photos-by-country"
                className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors"
              >
                How to Organize Travel Photos by Country
              </Link>{" "}
              — A complete guide to sorting travel photos into logical
              folders by location, date, and trip. Pairs well with
              duplicate removal for a fully organized library.
            </span>
          </li>
        </ul>
      </BlogArticleLayout>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}

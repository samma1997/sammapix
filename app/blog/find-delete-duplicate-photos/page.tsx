import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { APP_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "How to Find and Delete Duplicate Photos (Free Tool)",
  description:
    "Learn how to find and delete duplicate photos using perceptual hashing. Step-by-step guide to photo deduplication with TwinHunt- free, browser-based, no uploads.",
  alternates: {
    canonical: `${APP_URL}/blog/find-delete-duplicate-photos`,
  },
  keywords: [
    "find duplicate photos",
    "delete duplicate images",
    "photo deduplication",
    "duplicate photo finder free",
    "perceptual hashing images",
    "remove duplicate photos",
    "find similar photos",
  ],
  openGraph: {
    title: "How to Find and Delete Duplicate Photos (Free Tool)",
    description:
      "Stop wasting storage on duplicate and near-duplicate photos. Learn how perceptual hashing works and how to clean your photo library in minutes with TwinHunt.",
    url: `${APP_URL}/blog/find-delete-duplicate-photos`,
    type: "article",
    publishedTime: "2026-03-12",
    authors: ["https://lucasammarco.com"],
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Find and Delete Duplicate Photos (Free Tool)",
    description:
      "Stop wasting storage on duplicate photos. Learn how perceptual hashing works and clean your library with TwinHunt- free, no uploads.",
    creator: "@lucasammarco",
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "How to Find and Delete Duplicate Photos (Free Tool)",
  description:
    "Learn how to find and delete duplicate photos using perceptual hashing. Step-by-step guide to photo deduplication with TwinHunt- free, browser-based, no uploads.",
  url: `${APP_URL}/blog/find-delete-duplicate-photos`,
  datePublished: "2026-03-12",
  dateModified: "2026-03-12",
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
    "@id": `${APP_URL}/blog/find-delete-duplicate-photos`,
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
      name: "How to Find and Delete Duplicate Photos (Free Tool)",
      item: `${APP_URL}/blog/find-delete-duplicate-photos`,
    },
  ],
};

const POST_DATE = "2026-03-12";
const POST_DATE_FORMATTED = "March 12, 2026";
const POST_URL = `${APP_URL}/blog/find-delete-duplicate-photos`;
const POST_TITLE = "How to Find and Delete Duplicate Photos (Free Tool)";

export default function FindDeleteDuplicatePhotosPage() {
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
              <span className="text-xs font-medium uppercase tracking-wide text-blue-700">
                Tools
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
                9 min read
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-[#E5E5E5] tracking-tight leading-tight mb-4">
              {POST_TITLE}
            </h1>

            <p className="text-base text-gray-500 dark:text-[#A3A3A3] leading-relaxed mb-5">
              The average photo library doubles in size every two years. A
              significant portion of that growth is duplicates- exact copies
              synced across devices, near-identical burst shots, and edited
              variants sitting alongside their originals. Finding and deleting
              them manually is impossible at scale. This guide explains how
              duplicate detection actually works and how to do it for free,
              without uploading your photos anywhere.
            </p>
          </header>

          <div className="prose-content">

            <figure className="my-8">
              <img
                src="https://images.unsplash.com/photo-1558618666-fcd25c85f1d7?w=800&q=80"
                alt="Laptop showing photo management software with multiple image files"
                className="w-full rounded-lg"
                loading="lazy"
              />
              <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
                A cluttered photo library wastes storage and makes finding the right image harder - Photo by Fotis Fotopoulos on Unsplash
              </figcaption>
            </figure>

            <h2 className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
              Why duplicate photos accumulate faster than you think
            </h2>

            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              Duplicates do not just come from consciously copying files. They
              accumulate through a dozen invisible channels. Every time a photo
              syncs from your phone to iCloud and then to your Mac, you may end
              up with two or three copies in different directories. Backup
              software creates archives that overlap with live libraries.
              Messaging apps save received photos to your camera roll, creating
              copies of images you already have from other sources.
            </p>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              Professional photographers deal with a different but equally
              common problem: burst shots. Press the shutter in burst mode and
              you might have 15 nearly identical frames of the same moment.
              Only one or two of those will be keepers- the rest are storage
              waste.
            </p>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              The result is photo libraries where 20–40% of the storage space
              is occupied by redundant images. For a 100GB library, that could
              be 20–40GB of recoverable space- and dozens of hours of wasted
              time scrolling through near-identical photos.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
              How duplicate photo detection works: exact vs near duplicates
            </h2>

            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              There are two fundamentally different types of duplicates, and
              they require different detection techniques.
            </p>

            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
              Exact duplicates: cryptographic hashing
            </h3>

            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              Exact duplicates are files where every byte is identical. Even if
              the filenames are different (photo.jpg vs photo-copy.jpg vs
              IMG_4721.jpg), the underlying image data is the same. Detecting
              these is straightforward with cryptographic hashing.
            </p>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              A cryptographic hash function (like MD5 or SHA-256) takes any
              file as input and produces a short fixed-length output called a
              hash or digest. The same file always produces the same hash. Two
              different files with even a single changed byte produce entirely
              different hashes. If two files share the same hash, they are
              byte-for-byte identical- guaranteed.
            </p>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              This approach is fast and certain, but it only catches true
              exact duplicates. A photo that has been re-compressed, resized,
              cropped, or had its EXIF metadata modified will not match even
              though it looks visually identical. That is where perceptual
              hashing comes in.
            </p>

            <figure className="my-8">
              <img
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80"
                alt="Data analysis visualization representing hash-based duplicate detection"
                className="w-full rounded-lg"
                loading="lazy"
              />
              <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
                Perceptual hashing analyzes image content rather than raw bytes to find visual duplicates - Photo by Luke Chesser on Unsplash
              </figcaption>
            </figure>

            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
              Near duplicates: perceptual hashing
            </h3>

            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              <a href="https://en.wikipedia.org/wiki/Perceptual_hashing" target="_blank" rel="noopener noreferrer" className="text-[#6366F1] hover:underline">Perceptual hashing</a> is one of the most elegant algorithms in
              computer vision. Instead of hashing the raw file bytes, it hashes
              the visual content of the image in a way that is tolerant of minor
              variations. Two images that look the same to the human eye will
              produce very similar perceptual hashes- even if one has been
              resized, lightly edited, or saved at a different compression level.
            </p>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              The most widely used algorithms are:
            </p>

            <ul className="mb-4">
              <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
                <strong className="text-gray-800 dark:text-[#E5E5E5]">dHash (Difference Hash):</strong> Detects differences in adjacent pixel brightness. Very fast, excellent for finding near-duplicates in large libraries.
              </li>
              <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
                <strong className="text-gray-800 dark:text-[#E5E5E5]">pHash (Perceptual Hash):</strong> Uses a Discrete Cosine Transform (DCT) to analyze frequency components of the image. More accurate but slightly slower than dHash.
              </li>
              <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
                <strong className="text-gray-800 dark:text-[#E5E5E5]">aHash (Average Hash):</strong> Compares each pixel to the average brightness of the image. Fastest but least accurate.
              </li>
            </ul>

            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              The similarity between two perceptual hashes is measured by their
              Hamming distance- the number of bit positions where the two
              hashes differ. A Hamming distance of 0 means identical images.
              A distance of 1–5 indicates very similar images (often the same
              scene with minor variations). A distance above 10 typically
              indicates different images.
            </p>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              This is exactly how{" "}
              <Link
                href="/tools/twinhunt"
                className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors"
              >
                SammaPix TwinHunt
              </Link>{" "}
              finds both exact duplicates and near-duplicates in your photo
              library. All processing happens in your browser- no image data
              is ever transmitted to any server.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
              Step-by-step: finding and deleting duplicate photos with TwinHunt
            </h2>

            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
              Step 1 - Open TwinHunt
            </h3>

            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              Go to{" "}
              <Link
                href="/tools/twinhunt"
                className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors"
              >
                sammapix.com/tools/twinhunt
              </Link>
              . No account required, no file size limits, no watermarks. The
              tool runs entirely in your browser using the File System Access
              API.
            </p>

            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
              Step 2 - Select your photo folder
            </h3>

            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              Click the &ldquo;Select Folder&rdquo; button and choose the directory
              containing your photos. Find Duplicates can process entire photo
              libraries, including nested subdirectories. For large libraries
              (10,000+ photos), the initial hash computation takes a few
              minutes. Progress is shown in real time.
            </p>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              Alternatively, drag a folder directly onto the drop zone. Both
              methods give Find Duplicates read access to the files- no modifications
              are made during the scanning phase.
            </p>

            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
              Step 3 - Choose your sensitivity level
            </h3>

            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              Find Duplicates offers three detection modes:
            </p>

            <ul className="mb-4">
              <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
                <strong className="text-gray-800 dark:text-[#E5E5E5]">Exact only:</strong> Finds byte-for-byte identical files using cryptographic hashing. Zero false positives. Safe for automated deletion.
              </li>
              <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
                <strong className="text-gray-800 dark:text-[#E5E5E5]">Similar (recommended):</strong> Finds exact duplicates plus near-duplicates with a Hamming distance of 5 or less. Catches re-compressed copies, lightly edited versions, and screenshots of photos.
              </li>
              <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
                <strong className="text-gray-800 dark:text-[#E5E5E5]">Very similar:</strong> Hamming distance up to 10. Finds burst shots and photos taken within seconds of each other. Requires manual review- this mode can surface groups that are similar but not actually duplicates.
              </li>
            </ul>

            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              For most users, the &ldquo;Similar&rdquo; mode is the right starting
              point. It catches the vast majority of real duplicates while
              keeping false positives manageable.
            </p>

            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
              Step 4 - Review the duplicate groups
            </h3>

            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              Find Duplicates presents results as groups of similar images, displayed
              side by side. Each group shows the file name, file size, creation
              date, and pixel dimensions for each image. The recommended
              &ldquo;keep&rdquo; candidate (typically the highest resolution or most
              recently modified version) is highlighted automatically.
            </p>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              You can click any image to view it at full size before making a
              decision. This is especially important for near-duplicates in
              the &ldquo;Very similar&rdquo; mode, where you want to confirm that the
              images are genuinely equivalent before deleting.
            </p>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              Use the &ldquo;Select all duplicates&rdquo; button to auto-select the
              recommended deletion candidates across all groups, or review and
              adjust each group manually. Find Duplicates never pre-selects files
              for deletion without your explicit confirmation.
            </p>

            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
              Step 5 - Delete selected duplicates
            </h3>

            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              Once you have reviewed and confirmed your selections, click
              &ldquo;Delete Selected&rdquo;. Deletions move files to the Trash (on macOS
              and Windows) rather than permanently deleting them immediately.
              This gives you a safety net if you change your mind after the
              operation.
            </p>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              After deletion, Find Duplicates shows a summary: total files deleted,
              total storage recovered, and a breakdown by group.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
              Exact vs near duplicates: how to decide what to keep
            </h2>

            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              For exact duplicates, the decision is easy: keep one copy,
              delete the rest. All copies are identical so there is no quality
              consideration. Keep the one in your primary, organized library
              location and delete copies in backup folders, downloads, or
              synced directories.
            </p>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              For near-duplicates, use these criteria to decide which version
              to keep:
            </p>

            <ul className="mb-4">
              <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
                <strong className="text-gray-800 dark:text-[#E5E5E5]">Higher resolution wins.</strong> If two images show the same scene and one is 4000×3000 pixels while the other is 1200×900, keep the higher resolution version.
              </li>
              <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
                <strong className="text-gray-800 dark:text-[#E5E5E5]">Larger file size often means better quality.</strong> Between two otherwise equal images, the larger file typically has less compression, meaning less quality loss.
              </li>
              <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
                <strong className="text-gray-800 dark:text-[#E5E5E5]">Prefer originals over edited copies.</strong> Keep the RAW or unedited original. Edited JPEGs can always be regenerated from the original; the reverse is not true.
              </li>
              <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
                <strong className="text-gray-800 dark:text-[#E5E5E5]">Check EXIF metadata.</strong> The original photo preserves EXIF data (camera settings, GPS, timestamp) that an edited copy may have stripped.
              </li>
            </ul>

            <figure className="my-8">
              <img
                src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80"
                alt="Clean code on screen representing organized file management and deduplication"
                className="w-full rounded-lg"
                loading="lazy"
              />
              <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
                A systematic approach to photo management keeps your library clean long-term - Photo by Clement Helardot on Unsplash
              </figcaption>
            </figure>

            <h2 className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
              Preventing duplicate accumulation going forward
            </h2>

            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              Cleaning your library once is satisfying. Keeping it clean over
              time requires a few systematic habits.
            </p>

            <p className="text-sm font-semibold text-gray-800 dark:text-[#E5E5E5] mt-4 mb-1">
              Establish a single source of truth.
            </p>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              Decide where your canonical photo library lives- whether that is
              Apple Photos, <a href="https://support.google.com/photos/answer/6220791" target="_blank" rel="noopener noreferrer" className="text-[#6366F1] hover:underline">Google Photos</a>, Lightroom, or a folder structure on
              an external drive. All other locations (phone camera roll, cloud
              syncs, backup folders) feed into this one library and are cleared
              regularly.
            </p>

            <p className="text-sm font-semibold text-gray-800 dark:text-[#E5E5E5] mt-4 mb-1">
              Cull on import.
            </p>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              The best time to remove near-duplicate burst shots is immediately
              after an import session, while you still remember which frame was
              best. Letting these accumulate means doing the decision-making
              work later when context is lost.
            </p>

            <p className="text-sm font-semibold text-gray-800 dark:text-[#E5E5E5] mt-4 mb-1">
              Run Find Duplicates quarterly.
            </p>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              Even with good habits, duplicates accumulate. A quarterly
              deduplication scan catches what slips through. With TwinHunt
              running entirely in the browser, it takes less than five minutes
              for a library under 5,000 photos.
            </p>

            <hr className="my-8 border-gray-100 dark:border-[#2A2A2A]" />

            <h2 className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
              FAQ
            </h2>

            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
              Will Find Duplicates find duplicate photos even if they have different filenames?
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              Yes. Find Duplicates uses perceptual hashing which analyzes the visual
              content of the image, not the filename. A photo named
              IMG_4721.jpg and its copy named vacation-photo.jpg will be
              detected as identical regardless of the name difference.
            </p>

            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
              Can Find Duplicates find duplicates across different formats (JPEG and PNG of the same image)?
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              Yes. Perceptual hashing operates on the decoded visual content of
              the image, not the encoded bytes. A JPEG and a PNG of the same
              photo will produce very similar perceptual hashes and be grouped
              as near-duplicates. Cryptographic hash matching (for exact
              duplicates) requires byte-identical files, so it would not catch
              cross-format copies- but perceptual hashing does.
            </p>

            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
              Are my photos sent to any server?
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              No. Find Duplicates processes all images entirely within your browser
              using JavaScript. No image data, no thumbnails, and no hash
              values are transmitted to any external server. Your photos never
              leave your device.
            </p>

            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
              How large a photo library can Find Duplicates handle?
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              Find Duplicates can process libraries of tens of thousands of images.
              For very large libraries (50,000+ photos), processing time
              increases but the tool remains stable. Processing speed depends
              on your device&apos;s CPU and the image resolutions in the library.
              Most libraries under 10,000 photos complete in under two minutes.
            </p>

            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
              What happens to deleted files?
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              Deleted files are moved to your operating system&apos;s Trash (Recycle
              Bin on Windows, Trash on macOS). They are not permanently deleted
              immediately. You have a recovery window to restore anything that
              was deleted by mistake before emptying the Trash.
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
            <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-6">
              <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2">
                Find and delete your duplicate photos now
              </h3>
              <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-4">
                Drop your photo library into Find Duplicates and find exact and
                near-duplicate photos in minutes. Runs entirely in your browser- 
                your photos never leave your device.
              </p>
              <Link
                href="/tools/twinhunt"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
              >
                Open TwinHunt
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
                href="/blog/how-to-cull-photos-fast"
                className="flex items-start gap-3 group"
              >
                <span className="text-xs font-medium uppercase tracking-wide shrink-0 mt-0.5 text-blue-700">
                  Tools
                </span>
                <span className="text-sm text-gray-600 dark:text-[#A3A3A3] group-hover:text-gray-900 dark:group-hover:text-[#E5E5E5] transition-colors">
                  How to Cull Photos Fast: A Photographer&apos;s Workflow Guide
                </span>
              </Link>
              <Link
                href="/blog/compress-images-without-losing-quality"
                className="flex items-start gap-3 group"
              >
                <span className="text-xs font-medium uppercase tracking-wide shrink-0 mt-0.5 text-green-700">
                  Optimization
                </span>
                <span className="text-sm text-gray-600 dark:text-[#A3A3A3] group-hover:text-gray-900 dark:group-hover:text-[#E5E5E5] transition-colors">
                  Compress Images Without Losing Quality (2026)
                </span>
              </Link>
              <Link
                href="/blog/remove-exif-data-photos"
                className="flex items-start gap-3 group"
              >
                <span className="text-xs font-medium uppercase tracking-wide shrink-0 mt-0.5 text-purple-700">
                  Privacy
                </span>
                <span className="text-sm text-gray-600 dark:text-[#A3A3A3] group-hover:text-gray-900 dark:group-hover:text-[#E5E5E5] transition-colors">
                  How to Remove EXIF Data from Photos Online (Free)
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
      </div>
    </div>
  );
}

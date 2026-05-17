import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { APP_URL } from "@/lib/constants";
import BlogArticleLayout from "@/components/blog/BlogArticleLayout";

export const metadata: Metadata = {
  title: "Does Signal Strip EXIF Metadata? Honest 2026 Answer",
  description:
    "Signal is the only major messaging app that strips EXIF by default — and the only one that never keeps it server-side. Here is what is true and the open bug.",
  alternates: {
    canonical: `${APP_URL}/blog/does-signal-strip-exif-metadata`,
  },
  keywords: [
    "does signal strip exif",
    "does signal strip metadata",
    "signal exif removal",
    "signal photo privacy",
    "signal metadata gps",
    "signal vs whatsapp privacy",
    "signal file attachment metadata",
    "signal android exif bug",
  ],
  openGraph: {
    title: "Does Signal Strip EXIF Metadata? Honest 2026 Answer",
    description:
      "Signal strips EXIF by default and stores nothing server-side — the gold standard for messaging privacy. But there is one open bug and one escape hatch you should know about.",
    url: `${APP_URL}/blog/does-signal-strip-exif-metadata`,
    type: "article",
    publishedTime: "2026-05-17",
    authors: ["https://lucasammarco.com"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Does Signal Strip EXIF Metadata? Honest 2026 Answer",
    description:
      "Signal is the only messenger that strips EXIF by default AND stores nothing server-side. The bug, the loophole, and what to do about it.",
    creator: "@lucasammarco",
  },
};

const POST_DATE = "2026-05-17";
const POST_DATE_FORMATTED = "May 17, 2026";
const POST_URL = `${APP_URL}/blog/does-signal-strip-exif-metadata`;
const POST_TITLE = "Does Signal Strip EXIF Metadata? Honest 2026 Answer";

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: POST_TITLE,
  description:
    "An evidence-based look at Signal's EXIF metadata handling in 2026: how Signal differs from WhatsApp/Telegram/Discord, the file-attachment escape hatch, the Android bug that adds new EXIF, and why Signal is still the most reliable choice for metadata privacy.",
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
    "does signal strip exif",
    "signal photo privacy",
    "signal metadata",
    "signal vs whatsapp privacy",
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: APP_URL },
    { "@type": "ListItem", position: 2, name: "Blog", item: `${APP_URL}/blog` },
    { "@type": "ListItem", position: 3, name: POST_TITLE, item: POST_URL },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Does Signal strip EXIF metadata from photos?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — Signal strips EXIF metadata from photos sent through the standard image flow on both iOS and Android. GPS coordinates, camera make and model, timestamps, software version, and exposure settings are all removed before the photo is encrypted and transmitted. Signal is the only major messaging app that performs this stripping automatically by default with no user configuration required.",
      },
    },
    {
      "@type": "Question",
      name: "Does Signal keep my photo metadata on its servers?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Signal does not retain photo metadata on its servers — unlike Instagram, Facebook, and most other platforms that strip EXIF for public viewers but keep the original metadata internally for analytics and advertising. Signal's end-to-end encryption combined with its no-retention policy means the company itself cannot read what was sent. This is the most important distinction between Signal and every other major messaging app.",
      },
    },
    {
      "@type": "Question",
      name: "Does Signal strip EXIF when I send a photo as a file?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Probably not. The file attachment mode in Signal is the documented escape hatch — when you explicitly send a photo as a file (rather than as an image through the photo picker), the file is transmitted as-is. This is the same pattern most messaging apps use: the photo-pipeline strips metadata, the file-pipeline preserves it. If you need full original quality on Signal without leaking GPS, strip the EXIF yourself first.",
      },
    },
    {
      "@type": "Question",
      name: "Are there bugs in Signal's EXIF handling?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — at least one. GitHub issue #12075 on Signal-Android (filed March 2022) reports that Signal adds new EXIF metadata to images during processing, including to images that were already stripped clean before upload. The issue is marked closed but the specific tags Signal adds are not formally documented. The takeaway: even Signal's automatic stripping is not perfect, which is another reason to strip metadata yourself before sending sensitive photos.",
      },
    },
    {
      "@type": "Question",
      name: "How is Signal different from WhatsApp and Telegram on metadata?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Signal strips EXIF automatically by default and never stores it server-side. WhatsApp strips for the photo path but preserves everything when you send 'as document' — the well-known document trap. Telegram preserves EXIF by default unless you explicitly compress, and keeps your full message history on its servers. Signal is the only one of the three with both automatic stripping and zero server retention, which makes it the safest choice for privacy-critical photo sharing.",
      },
    },
    {
      "@type": "Question",
      name: "Should I still strip EXIF before sending on Signal?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Even though Signal is the gold standard for messaging privacy, there are three reasons to strip metadata yourself first. First, the file attachment escape hatch preserves everything. Second, the Android bug that adds new EXIF tags is closed but not formally resolved. Third, undocumented behavior can change without notice. The safe habit is to strip with a browser-based EXIF tool before sending — once you have it, the rest is defense in depth.",
      },
    },
  ],
};

export default function DoesSignalStripExifMetadataPage() {
  return (
    <>
      <BlogArticleLayout
        title={POST_TITLE}
        slug="does-signal-strip-exif-metadata"
        description={`Signal is the messaging app that privacy people recommend by default — and for good reason. It is the only major messenger that strips EXIF metadata automatically, the only one that never stores the original on its servers, and the only one that ships this behavior with zero user configuration. But Signal also has one open bug, one escape hatch, and the same fundamental problem every undocumented privacy feature has: the platform owes you nothing if the behavior changes tomorrow.`}
        date={POST_DATE}
        dateFormatted={POST_DATE_FORMATTED}
        tags={["Privacy"]}
        readingTime={8}
        headings={[
          { id: "short-answer", title: "The short answer" },
          { id: "evidence", title: "What the evidence shows" },
          { id: "signal-vs-others", title: "Signal vs WhatsApp vs Telegram" },
          { id: "file-attachment-hatch", title: "The file attachment escape hatch" },
          { id: "android-bug", title: "The Android bug that adds new EXIF" },
          { id: "no-server-retention", title: "Why no server retention matters" },
          { id: "still-strip-yourself", title: "Why you should still strip first" },
          { id: "the-fix", title: "The 30-second fix" },
          { id: "faq", title: "FAQ" },
        ]}
        summary={[
          "Signal is the only major messaging app that strips EXIF metadata automatically by default — every other app either preserves it or requires user configuration.",
          "Signal also does NOT retain metadata server-side, which is the most important privacy distinction vs WhatsApp/Instagram/Discord that strip publicly but keep data internally.",
          "The file attachment mode is the escape hatch: if you send a photo as a file (not as an image), the original is preserved with all EXIF intact.",
          "GitHub issue #12075 (Signal-Android, March 2022) reports that Signal adds new EXIF tags to images during processing — including to already-stripped images.",
          "Best practice: strip EXIF yourself before sending, even on Signal. Defense in depth costs 30 seconds and removes every uncertainty.",
        ]}
        heroImage={
          <figure>
            <img
              src="https://images.pexels.com/photos/4348404/pexels-photo-4348404.jpeg?auto=compress&cs=tinysrgb&w=800&q=80"
              alt="Smartphone screen representing Signal messenger photo privacy and EXIF metadata stripping"
              className="w-full rounded-lg"
              loading="eager"
            />
            <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
              Signal is the only major messenger that strips EXIF by default and stores nothing server-side — but even Signal has edge cases worth knowing - Photo by Cottonbro Studio on Pexels
            </figcaption>
          </figure>
        }
        ctaBlock={
          <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2">
              Strip EXIF before sending — even on Signal
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-4">
              The SammaPix EXIF Viewer shows every metadata tag in your photo and removes them with one click. Runs in your browser — nothing uploaded, nothing tracked.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/tools/exif"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
              >
                Open EXIF Tool
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
              <Link
                href="/tools/compress"
                className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#1A1A1A] text-gray-700 dark:text-[#A3A3A3] text-sm font-medium rounded-md border border-gray-200 dark:border-[#333] hover:bg-gray-50 dark:hover:bg-[#222] transition-colors"
              >
                Compress photo
              </Link>
            </div>
          </div>
        }
      >
        <div className="mb-8 p-4 bg-gray-50 dark:bg-[#1E1E1E] border-l-4 border-[#6366F1] rounded-r-md">
          <p className="text-xs font-semibold text-[#6366F1] mb-1.5 uppercase tracking-wide">
            TL;DR — does Signal strip EXIF?
          </p>
          <p className="text-sm text-gray-700 dark:text-[#A3A3A3] leading-relaxed">
            <strong>Yes for images, automatically</strong> — Signal is the only major messenger that does this by default.{" "}
            <strong>No for files</strong> — sending a photo via the file attachment menu preserves all EXIF.{" "}
            <strong>No server retention</strong> — unlike Instagram/Facebook/Discord, Signal does not keep the original on its servers.{" "}
            <strong>One known bug</strong> (Signal-Android #12075): the app may add new EXIF tags during processing. The safe habit:{" "}
            <Link href="/tools/exif" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2">
              strip EXIF before sending
            </Link>
            , every time, every app.
          </p>
        </div>

        {/* Section: The short answer */}
        <h2 id="short-answer" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          The short answer
        </h2>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Signal is the messaging app that privacy-conscious users default to, and on the EXIF question it earns its reputation. Every major source — privacy blogs, the Signal community forum, GitHub issue trackers, and side-by-side comparisons with WhatsApp and Telegram — converges on the same conclusion: <strong>Signal strips EXIF metadata from photos sent as images by default, on both iOS and Android, with no user configuration required</strong>. GPS coordinates, camera make and model, timestamps, software version, and exposure settings are all removed before the photo is encrypted and transmitted.
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          More importantly, Signal does not retain photo metadata on its servers. Most platforms that strip EXIF do so for the version they show to other users while keeping the original metadata internally — Instagram, Facebook, and Discord all follow this pattern. Signal does not. The combination of end-to-end encryption and a no-retention policy means the platform itself cannot read what was sent, which is the strongest possible privacy guarantee for messaging photos. But Signal is not perfect: there is a known bug, an obvious loophole, and the same underlying problem every undocumented privacy feature has — if behavior changes tomorrow, you have no contract to fall back on.
        </p>

        {/* Section: Evidence */}
        <h2 id="evidence" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          What the evidence shows
        </h2>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Unlike Discord — where third-party reports converge but Signal has never formally documented its EXIF behavior either — Signal&apos;s privacy posture is reinforced from multiple directions: the company&apos;s public privacy commitments, the Signal Foundation&apos;s open-source codebase (which can be audited for the stripping logic itself), and an active GitHub issue tracker where users have surfaced both confirmations and bugs over the years.
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          The cross-reference of sources we mapped:
        </p>
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md overflow-hidden">
            <thead>
              <tr className="bg-[#FAFAFA] dark:bg-[#1A1A1A]">
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-[#525252] dark:text-[#A3A3A3] border-b border-[#E5E5E5] dark:border-[#2A2A2A]">Source</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-[#525252] dark:text-[#A3A3A3] border-b border-[#E5E5E5] dark:border-[#2A2A2A]">Claim about images</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-[#525252] dark:text-[#A3A3A3] border-b border-[#E5E5E5] dark:border-[#2A2A2A]">Claim about file mode</th>
              </tr>
            </thead>
            <tbody className="text-[#737373] dark:text-[#737373]">
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">PrivacyStrip blog</td>
                <td className="px-4 py-2.5 text-xs">Strips GPS, camera, timestamps</td>
                <td className="px-4 py-2.5 text-xs">Preserves metadata</td>
              </tr>
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#1A1A1A]/50">
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">EditPrivacy tested</td>
                <td className="px-4 py-2.5 text-xs">All EXIF removed</td>
                <td className="px-4 py-2.5 text-xs">Behavior depends on mode</td>
              </tr>
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">Fastio 2026 comparison</td>
                <td className="px-4 py-2.5 text-xs">Strips by default, no server retention</td>
                <td className="px-4 py-2.5 text-xs">Escape hatch via file mode</td>
              </tr>
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#1A1A1A]/50">
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">PrivacyGuides forum</td>
                <td className="px-4 py-2.5 text-xs">Community-confirmed stripping</td>
                <td className="px-4 py-2.5 text-xs">File mode = preserved</td>
              </tr>
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">GitHub issue #1984 (iOS)</td>
                <td className="px-4 py-2.5 text-xs">Historical bug, now fixed</td>
                <td className="px-4 py-2.5 text-xs">N/A</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">GitHub issue #12075 (Android)</td>
                <td className="px-4 py-2.5 text-xs"><strong>Adds new EXIF after stripping</strong></td>
                <td className="px-4 py-2.5 text-xs">N/A</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          The convergence is strong: image-mode uploads strip EXIF, file-mode uploads preserve it. The only outlier is the Android issue #12075 (March 2022), which reports that Signal can add new EXIF tags during its processing pipeline — including to images that were already stripped clean before upload. The issue is marked closed but not formally resolved with documented fixes. For our purposes, that is one more reason to strip yourself: even an app that strips correctly can introduce new tags as a side effect of how it processes images.
        </p>

        {/* Section: Signal vs Others */}
        <h2 id="signal-vs-others" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          Signal vs WhatsApp vs Telegram
        </h2>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          The clearest way to see why Signal stands out is to put the three side-by-side on the questions that actually matter for metadata privacy.
        </p>
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md overflow-hidden">
            <thead>
              <tr className="bg-[#FAFAFA] dark:bg-[#1A1A1A]">
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-[#525252] dark:text-[#A3A3A3] border-b border-[#E5E5E5] dark:border-[#2A2A2A]">Question</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-[#525252] dark:text-[#A3A3A3] border-b border-[#E5E5E5] dark:border-[#2A2A2A]">Signal</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-[#525252] dark:text-[#A3A3A3] border-b border-[#E5E5E5] dark:border-[#2A2A2A]">WhatsApp</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-[#525252] dark:text-[#A3A3A3] border-b border-[#E5E5E5] dark:border-[#2A2A2A]">Telegram</th>
              </tr>
            </thead>
            <tbody className="text-[#737373] dark:text-[#737373]">
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">Strips EXIF by default (image mode)</td>
                <td className="px-4 py-2.5 text-xs text-green-600">Yes</td>
                <td className="px-4 py-2.5 text-xs text-green-600">Yes</td>
                <td className="px-4 py-2.5 text-xs text-red-600">Only if compressed</td>
              </tr>
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#1A1A1A]/50">
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">File-mode bypass exists</td>
                <td className="px-4 py-2.5 text-xs text-red-600">Yes</td>
                <td className="px-4 py-2.5 text-xs text-red-600">Yes (document mode)</td>
                <td className="px-4 py-2.5 text-xs text-red-600">Yes</td>
              </tr>
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">Retains metadata server-side</td>
                <td className="px-4 py-2.5 text-xs text-green-600"><strong>No</strong></td>
                <td className="px-4 py-2.5 text-xs text-red-600">Yes (via E2E backups)</td>
                <td className="px-4 py-2.5 text-xs text-red-600">Yes (cloud chats)</td>
              </tr>
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#1A1A1A]/50">
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">End-to-end encrypted by default</td>
                <td className="px-4 py-2.5 text-xs text-green-600">Yes</td>
                <td className="px-4 py-2.5 text-xs text-green-600">Yes</td>
                <td className="px-4 py-2.5 text-xs text-red-600">No (secret chats only)</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">Open-source client (auditable)</td>
                <td className="px-4 py-2.5 text-xs text-green-600">Yes (iOS + Android)</td>
                <td className="px-4 py-2.5 text-xs text-red-600">No</td>
                <td className="px-4 py-2.5 text-xs text-green-600">Partially (client only)</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          The two rows that matter most for metadata privacy: <strong>no server retention</strong> and <strong>open-source auditability</strong>. Signal wins both. WhatsApp strips EXIF for the recipient but it sits inside Meta&apos;s servers (and end-to-end encrypted backups can be a complicated edge case). Telegram only strips when you send the compressed image, defaulting to preserving everything for the file path, and most chats are not end-to-end encrypted at all. If metadata privacy is a hard requirement, Signal is the only one of the three that holds up under scrutiny.
        </p>

        {/* Section: File attachment hatch */}
        <h2 id="file-attachment-hatch" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          The file attachment escape hatch
        </h2>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Signal&apos;s file attachment mode exists because users sometimes need to send a photo with its original quality, original format, and yes, original metadata intact — for example, when sending a high-resolution photo to a designer who needs the EXIF data for color management. In those cases the design choice is deliberate: the user explicitly asked for the original file.
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          The problem is the same one we covered in our{" "}
          <Link href="/blog/does-discord-strip-exif-metadata" className="text-[#171717] dark:text-[#E5E5E5] underline underline-offset-2">
            Discord analysis
          </Link>
          : users routinely route through the file pipeline without realizing it. If you tap the &quot;+&quot; button in Signal and choose &quot;Document&quot; or pick a photo from your file manager rather than from the in-app photo picker, the photo travels with full EXIF. The recipient can save it and read your GPS in ten seconds with any free EXIF viewer.
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          The good news on Signal specifically is that the user interface clearly distinguishes &quot;Photo&quot; from &quot;Document&quot; in the share sheet — the visual separation is more explicit than on Discord or WhatsApp. The bad news is that none of these apps actually warn you about the privacy implication of choosing one over the other. It is on the user to know.
        </p>

        {/* Section: Android bug */}
        <h2 id="android-bug" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          The Android bug that adds new EXIF
        </h2>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          GitHub issue <a href="https://github.com/signalapp/Signal-Android/issues/12075" target="_blank" rel="noopener noreferrer" className="text-[#171717] dark:text-[#E5E5E5] underline underline-offset-2">#12075 on Signal-Android</a> (filed March 17, 2022) reports a surprising bug: even when Signal correctly strips EXIF from incoming images, it may add new EXIF tags during its own image processing pipeline. The reporter specifically warns that &quot;new EXIF metadata gets added to images — including the ones which are stripped off of it&quot; and recommends using ExifTool (rather than Android-based viewers) to verify the actual state of files after Signal touches them.
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          The issue is marked closed but the specific tags Signal adds are not formally documented in the public thread, and there is no maintainer-confirmed resolution PR. A related, earlier issue (#5968) about metadata removal had a fix attempt (PR #7542) that the reporter says &quot;failed to solve&quot; the original problem. The pattern across these issues is consistent: Signal&apos;s privacy posture is the strongest in the messaging space, but the implementation has had bugs over the years, and not all of them are fully closed out with public documentation.
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          For most users this is academic: any tags Signal adds during processing are likely benign (a Signal app version, perhaps a generic timestamp) and do not reveal anything sensitive. But for the privacy-paranoid use case — journalists, activists, anyone whose threat model includes nation-state actors — the principle matters: even an app you trust can introduce metadata you did not authorize.
        </p>

        {/* Section: No server retention */}
        <h2 id="no-server-retention" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          Why no server retention matters
        </h2>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          The single most important privacy property in the messaging-app space is not whether the app strips EXIF for the viewer — it is whether the app keeps the original data on its servers. This is where Signal is genuinely alone among the major messengers.
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          When you send a photo to Instagram, Facebook, or Discord, the platform receives the original file (with full EXIF, before any stripping happens at upload) and stores it. The public-facing version that other users see has the metadata removed, but Meta, Discord, and similar platforms still hold the original on their servers for analytics, recommendations, and (in Meta&apos;s case) advertising. A legal request, a data breach, or a future policy change can expose that retained metadata.
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Signal&apos;s architecture is fundamentally different. End-to-end encryption means Signal&apos;s servers cannot decrypt the photo bytes you send — they relay encrypted payloads between devices without ever holding readable image data. Combined with Signal&apos;s public commitment not to retain metadata, this means there is nothing on Signal&apos;s servers that could leak even if you sent a photo with full EXIF intact. The only way your GPS coordinates end up exposed is if the recipient saves the file and reads them — which means the threat model is people, not the platform.
        </p>

        {/* Section: still strip yourself */}
        <h2 id="still-strip-yourself" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          Why you should still strip first
        </h2>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Given everything above — Signal strips by default, never retains, is end-to-end encrypted — why bother stripping EXIF yourself? Three reasons, each independently strong.
        </p>
        <ol className="list-decimal pl-6 mb-4 space-y-2 text-sm text-[#737373]">
          <li>
            <strong>The file mode bypass.</strong> If you accidentally send via the document path (and people do, especially when sharing from outside the app), the original file with full EXIF goes through unchanged. The recipient extracts your GPS in seconds.
          </li>
          <li>
            <strong>The Android bug.</strong> Issue #12075 is closed but not transparently resolved. Even Signal&apos;s automatic stripping has had implementation bugs; defense in depth at the user level removes that risk entirely.
          </li>
          <li>
            <strong>Undocumented behavior changes.</strong> Signal has never published an official privacy guarantee about EXIF handling. The strong reputation is real but informal. If Signal changes the behavior in a future release for any reason, you will not know until someone tests and reports it.
          </li>
        </ol>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          The cost of stripping yourself is roughly thirty seconds per photo, and the benefit is that you no longer depend on any platform behavior at all — your photo arrives at the recipient with the EXIF you chose to include, regardless of how the messaging app processes it in between.
        </p>

        {/* Section: the fix */}
        <h2 id="the-fix" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          The 30-second fix
        </h2>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          The same workflow works for every messaging app, including Signal. Open the{" "}
          <Link href="/tools/exif" className="text-[#171717] dark:text-[#E5E5E5] underline underline-offset-2">
            SammaPix EXIF Viewer
          </Link>
          {" "}in your browser, drop the photo you plan to send, and review what tags are currently present. Remove the ones that matter (GPS coordinates and camera info are usually the headline concerns) with one click, save the cleaned file, and send that version through Signal — image mode or file mode, your choice no longer matters from a privacy standpoint.
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          The whole tool runs client-side. Your photo never gets uploaded to a server — not ours, not anyone&apos;s. That is the only architecture that makes sense for a privacy tool, and it is the same property that makes Signal trustworthy: the data never leaves the device in a form anyone else can read.
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          For broader context on how every major messaging platform handles metadata, see our{" "}
          <Link href="/blog/which-apps-strip-photo-metadata" className="text-[#171717] dark:text-[#E5E5E5] underline underline-offset-2">
            full audit of 12 messaging apps
          </Link>
          , the deeper{" "}
          <Link href="/blog/does-discord-strip-exif-metadata" className="text-[#171717] dark:text-[#E5E5E5] underline underline-offset-2">
            Discord analysis
          </Link>
          , and the general guide on{" "}
          <Link href="/blog/remove-exif-protect-privacy" className="text-[#171717] dark:text-[#E5E5E5] underline underline-offset-2">
            removing EXIF to protect privacy
          </Link>
          . The pattern is consistent across the industry: most platforms have an inconsistent or undocumented EXIF behavior, the file attachment path almost always preserves everything, and the only reliable way to control your metadata is to control it yourself before upload.
        </p>

        {/* Section: FAQ */}
        <h2 id="faq" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          FAQ
        </h2>

        <div className="space-y-5">
          <div>
            <h3 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1.5">
              Does Signal strip EXIF metadata from photos?
            </h3>
            <p className="text-sm text-[#737373] leading-relaxed">
              Yes — Signal strips EXIF metadata from photos sent through the standard image flow on both iOS and Android. GPS coordinates, camera make and model, timestamps, software version, and exposure settings are all removed before the photo is encrypted and transmitted. Signal is the only major messaging app that performs this stripping automatically by default with no user configuration required.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1.5">
              Does Signal keep my photo metadata on its servers?
            </h3>
            <p className="text-sm text-[#737373] leading-relaxed">
              No. Signal does not retain photo metadata on its servers — unlike Instagram, Facebook, and most other platforms that strip EXIF for public viewers but keep the original metadata internally for analytics and advertising. Signal&apos;s end-to-end encryption combined with its no-retention policy means the company itself cannot read what was sent. This is the most important distinction between Signal and every other major messaging app.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1.5">
              Does Signal strip EXIF when I send a photo as a file?
            </h3>
            <p className="text-sm text-[#737373] leading-relaxed">
              Probably not. The file attachment mode in Signal is the documented escape hatch — when you explicitly send a photo as a file (rather than as an image through the photo picker), the file is transmitted as-is. This is the same pattern most messaging apps use: the photo-pipeline strips metadata, the file-pipeline preserves it. If you need full original quality on Signal without leaking GPS, strip the EXIF yourself first.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1.5">
              Are there bugs in Signal&apos;s EXIF handling?
            </h3>
            <p className="text-sm text-[#737373] leading-relaxed">
              Yes — at least one.{" "}
              <a href="https://github.com/signalapp/Signal-Android/issues/12075" target="_blank" rel="noopener noreferrer" className="text-[#171717] dark:text-[#E5E5E5] underline underline-offset-2">
                GitHub issue #12075
              </a>
              {" "}on Signal-Android (filed March 2022) reports that Signal adds new EXIF metadata to images during processing, including to images that were already stripped clean before upload. The issue is marked closed but the specific tags Signal adds are not formally documented. The takeaway: even Signal&apos;s automatic stripping is not perfect, which is another reason to strip metadata yourself before sending sensitive photos.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1.5">
              How is Signal different from WhatsApp and Telegram on metadata?
            </h3>
            <p className="text-sm text-[#737373] leading-relaxed">
              Signal strips EXIF automatically by default and never stores it server-side. WhatsApp strips for the photo path but preserves everything when you send &quot;as document&quot; — the well-known document trap. Telegram preserves EXIF by default unless you explicitly compress, and keeps your full message history on its servers. Signal is the only one of the three with both automatic stripping and zero server retention, which makes it the safest choice for privacy-critical photo sharing.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1.5">
              Should I still strip EXIF before sending on Signal?
            </h3>
            <p className="text-sm text-[#737373] leading-relaxed">
              Yes. Even though Signal is the gold standard for messaging privacy, there are three reasons to strip metadata yourself first. First, the file attachment escape hatch preserves everything. Second, the Android bug that adds new EXIF tags is closed but not formally resolved. Third, undocumented behavior can change without notice. The safe habit is to strip with a browser-based EXIF tool before sending — once you have it, the rest is defense in depth.
            </p>
          </div>
        </div>
      </BlogArticleLayout>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </>
  );
}

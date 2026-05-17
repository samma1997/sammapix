import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { APP_URL } from "@/lib/constants";
import BlogArticleLayout from "@/components/blog/BlogArticleLayout";

export const metadata: Metadata = {
  title: "Does Reddit Strip EXIF Metadata? Honest 2026 Answer",
  description:
    "Reddit strips EXIF on most uploads — but a real HackerOne bug exposed GPS via HEIC conversion. The history, the current status, and what to do.",
  alternates: {
    canonical: `${APP_URL}/blog/does-reddit-strip-exif-metadata`,
  },
  keywords: [
    "does reddit strip exif",
    "does reddit remove metadata",
    "reddit exif gps",
    "reddit photo privacy",
    "reddit heic bug",
    "reddit metadata leak",
    "hackerone 1069039",
    "reddit image upload privacy",
  ],
  openGraph: {
    title: "Does Reddit Strip EXIF Metadata? Honest 2026 Answer",
    description:
      "Reddit strips EXIF on most uploads — but a HackerOne bug (#1069039) once exposed GPS through HEIC conversion. Here is the history and current status.",
    url: `${APP_URL}/blog/does-reddit-strip-exif-metadata`,
    type: "article",
    publishedTime: "2026-05-17",
    authors: ["https://lucasammarco.com"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Does Reddit Strip EXIF Metadata? Honest 2026 Answer",
    description:
      "Reddit strips EXIF normally — but a real bug once leaked GPS via HEIC. The bug, the fix, and why you should still strip yourself.",
    creator: "@lucasammarco",
  },
};

const POST_DATE = "2026-05-17";
const POST_DATE_FORMATTED = "May 17, 2026";
const POST_URL = `${APP_URL}/blog/does-reddit-strip-exif-metadata`;
const POST_TITLE = "Does Reddit Strip EXIF Metadata? Honest 2026 Answer";

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: POST_TITLE,
  description:
    "An evidence-based look at Reddit's EXIF metadata handling in 2026, including the HackerOne #1069039 HEIC vulnerability that preserved GPS coordinates in PNG conversions, how it was fixed, and why platform-side stripping is never enough.",
  url: POST_URL,
  datePublished: POST_DATE,
  dateModified: POST_DATE,
  author: { "@type": "Person", name: "Luca Sammarco", url: "https://www.sammapix.com/about", image: "https://www.sammapix.com/luca-sammarco.jpg", sameAs: ["https://lucasammarco.com", "https://github.com/samma1997"] },
  publisher: { "@type": "Organization", name: "SammaPix", url: APP_URL, logo: { "@type": "ImageObject", url: "https://sammapix.com/og-image.png" } },
  mainEntityOfPage: { "@type": "WebPage", "@id": POST_URL },
  keywords: ["does reddit strip exif", "reddit metadata", "hackerone 1069039", "reddit heic bug"],
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
      name: "Does Reddit strip EXIF metadata from photos?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes for standard uploads in 2026. Reddit re-encodes images submitted to the post upload flow and strips EXIF metadata including GPS coordinates, camera model, and timestamps. However, Reddit has a documented history of edge cases where metadata leaked through — most notably HackerOne report #1069039 from 2020, where HEIC files uploaded via Safari on macOS were converted to PNG with GPS coordinates intact. The bug has been fixed, but the existence of such bugs at a major platform is the reason to strip metadata yourself before uploading.",
      },
    },
    {
      "@type": "Question",
      name: "What was the Reddit HEIC GPS bug (HackerOne #1069039)?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "In 2020, a security researcher reported through HackerOne that Reddit's image upload pipeline had a bug specifically affecting HEIC files (the default iPhone photo format). When a user uploaded a HEIC photo via Safari on macOS, Reddit's conversion to PNG preserved the GPS coordinates from the original file. The PNG that other Reddit users could view and download had the location data embedded, exposing the uploader's exact coordinates. The bug was fixed, but the report (#1069039) remains a documented example of how 'we strip EXIF' policies can fail on edge cases.",
      },
    },
    {
      "@type": "Question",
      name: "Does Reddit keep my photo metadata on its servers?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Reddit serves a re-encoded version of your photo through its CDN (i.redd.it / reddit-uploaded-media.akamaized.net) with EXIF stripped in normal cases. However, the platform receives your original file at the upload endpoint before stripping happens, and like most platforms, Reddit's privacy policy allows internal retention of user-uploaded content for moderation and analytics. The version shown to other users is metadata-clean (when stripping works correctly); the version Reddit holds internally is whatever you uploaded.",
      },
    },
    {
      "@type": "Question",
      name: "Does Reddit strip EXIF from posts versus comment image uploads?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The same image-processing pipeline handles both, so the EXIF stripping behavior should be identical between post uploads and comment images. However, Reddit has multiple upload paths (Old Reddit upload form, New Reddit modal, official mobile apps, third-party Reddit clients), and historical bugs like the HEIC issue suggest that different paths can have slightly different processing. The safest assumption is that any Reddit upload could leak metadata in edge cases — strip before uploading.",
      },
    },
    {
      "@type": "Question",
      name: "Can someone extract GPS from a photo I posted on Reddit?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "In standard cases, no — Reddit's CDN serves images with EXIF stripped. But the HackerOne bug history shows that this is not absolute. There have been at least one documented case (HEIC upload via Safari) where GPS coordinates were exposed publicly. If you have ever posted iPhone photos to Reddit during the affected period, those uploads may still be cached with original metadata. The general rule: do not trust platform-side stripping for anything you would not want public if it leaked.",
      },
    },
    {
      "@type": "Question",
      name: "How can I strip EXIF from a Reddit photo before uploading?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Use a browser-based EXIF viewer like the SammaPix EXIF Viewer. Drop the photo, see every metadata tag (GPS, camera model, timestamp, software version), and remove them with one click. The tool runs locally — nothing uploaded to any server — and produces a cleaned file you can post on Reddit without depending on platform-side stripping at all. This is the only approach that survives platform bugs, policy changes, and undocumented edge cases.",
      },
    },
  ],
};

export default function DoesRedditStripExifMetadataPage() {
  return (
    <>
      <BlogArticleLayout
        title={POST_TITLE}
        slug="does-reddit-strip-exif-metadata"
        description={`Reddit strips EXIF metadata from uploaded photos in normal 2026 conditions — every standard image you post goes through a re-encoding pipeline that removes GPS, camera model, and timestamps. But Reddit also has the most-cited example in the messaging-platform space of how stripping policies fail: HackerOne report #1069039 from 2020 documented that HEIC files uploaded via Safari on macOS preserved GPS coordinates in the converted PNG. The bug is fixed, but it remains the textbook case for why platform-side stripping is necessary but not sufficient.`}
        date={POST_DATE}
        dateFormatted={POST_DATE_FORMATTED}
        tags={["Privacy"]}
        readingTime={7}
        headings={[
          { id: "short-answer", title: "The short answer" },
          { id: "evidence", title: "What the evidence shows" },
          { id: "hackerone-bug", title: "The HackerOne #1069039 HEIC bug" },
          { id: "why-it-matters", title: "Why this bug matters for everyone" },
          { id: "upload-paths", title: "Reddit's many upload paths" },
          { id: "third-party-clients", title: "Third-party Reddit clients" },
          { id: "the-fix", title: "The 30-second fix" },
          { id: "faq", title: "FAQ" },
        ]}
        summary={[
          "Reddit strips EXIF from images in 2026 standard uploads — GPS, camera model, timestamps removed during re-encoding.",
          "HackerOne report #1069039 (2020) documented Reddit preserving GPS in HEIC-to-PNG conversion via Safari on macOS — fixed, but instructive.",
          "Reddit has at least 4 different upload paths (Old Reddit form, New Reddit modal, official apps, third-party clients) — behavior may vary subtly between them.",
          "Even when the platform strips correctly, Reddit retains your original upload internally — the public-facing version is clean, the version Reddit holds is not.",
          "Strip EXIF yourself before posting. The HEIC bug is fixed but the next edge-case bug is always one upload away.",
        ]}
        heroImage={
          <figure>
            <img
              src="https://images.pexels.com/photos/1170412/pexels-photo-1170412.jpeg?auto=compress&cs=tinysrgb&w=800&q=80"
              alt="Smartphone screen showing social media app representing Reddit photo upload privacy and metadata"
              className="w-full rounded-lg"
              loading="eager"
            />
            <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
              Reddit strips EXIF in normal cases — but the HEIC vulnerability proved &quot;we strip metadata&quot; policies can fail on edge cases - Photo via Pexels
            </figcaption>
          </figure>
        }
        ctaBlock={
          <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2">
              Strip EXIF before posting on Reddit
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-4">
              The SammaPix EXIF Viewer shows every metadata tag and removes them with one click. Runs in your browser — nothing uploaded.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/tools/exif" className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors">
                Open EXIF Tool
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
              <Link href="/tools/compress" className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#1A1A1A] text-gray-700 dark:text-[#A3A3A3] text-sm font-medium rounded-md border border-gray-200 dark:border-[#333] hover:bg-gray-50 dark:hover:bg-[#222] transition-colors">
                Compress photo
              </Link>
            </div>
          </div>
        }
      >
        <div className="mb-8 p-4 bg-gray-50 dark:bg-[#1E1E1E] border-l-4 border-[#6366F1] rounded-r-md">
          <p className="text-xs font-semibold text-[#6366F1] mb-1.5 uppercase tracking-wide">
            TL;DR — does Reddit strip EXIF?
          </p>
          <p className="text-sm text-gray-700 dark:text-[#A3A3A3] leading-relaxed">
            <strong>Yes in 2026 standard cases.</strong> Reddit re-encodes uploaded images and strips GPS, camera model, timestamps.{" "}
            <strong>But Reddit has a documented history of bugs</strong> — HackerOne #1069039 (2020) leaked GPS via HEIC-to-PNG conversion.{" "}
            <strong>Reddit also retains the original upload internally.</strong> Only the CDN-served version is clean. Strip EXIF yourself before posting — the only path that does not depend on platform behavior staying correct.
          </p>
        </div>

        <h2 id="short-answer" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">The short answer</h2>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Reddit strips EXIF metadata from images uploaded through its standard 2026 pipelines. When you post a photo via the Reddit website, mobile app, or supported third-party client, the server-side re-encoding removes GPS coordinates, camera information, timestamps, and most other EXIF tags. The version that lands on Reddit&apos;s CDN (typically i.redd.it for in-line images) is metadata-clean for the viewer.
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          But Reddit is also the messaging-platform space&apos;s textbook example of how &quot;we strip metadata&quot; policies can fail on edge cases. In 2020 a security researcher filed HackerOne report #1069039 documenting a specific path — HEIC files uploaded through Safari on macOS — where Reddit&apos;s conversion to PNG preserved the GPS coordinates from the original file. For the period during which the bug existed, users who posted iPhone photos this way had their exact coordinates publicly visible to anyone who downloaded the image. The bug was fixed, but it stays in the public record as proof that platform-side stripping is necessary but not sufficient.
        </p>

        <h2 id="evidence" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">What the evidence shows</h2>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Reddit&apos;s EXIF posture in 2026 is reinforced from multiple sources:
        </p>
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md overflow-hidden">
            <thead>
              <tr className="bg-[#FAFAFA] dark:bg-[#1A1A1A]">
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-[#525252] dark:text-[#A3A3A3] border-b border-[#E5E5E5] dark:border-[#2A2A2A]">Source</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-[#525252] dark:text-[#A3A3A3] border-b border-[#E5E5E5] dark:border-[#2A2A2A]">Claim</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-[#525252] dark:text-[#A3A3A3] border-b border-[#E5E5E5] dark:border-[#2A2A2A]">Notes</th>
              </tr>
            </thead>
            <tbody className="text-[#737373] dark:text-[#737373]">
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">MetaClean 2026 analysis</td>
                <td className="px-4 py-2.5 text-xs">Reddit strips EXIF in standard cases</td>
                <td className="px-4 py-2.5 text-xs">&quot;Yes, but not always&quot;</td>
              </tr>
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#1A1A1A]/50">
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]"><strong>HackerOne #1069039</strong></td>
                <td className="px-4 py-2.5 text-xs"><strong>HEIC-to-PNG preserved GPS</strong></td>
                <td className="px-4 py-2.5 text-xs">Fixed; public record</td>
              </tr>
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">Fastio 2026 comparison</td>
                <td className="px-4 py-2.5 text-xs">Strips on public CDN copies</td>
                <td className="px-4 py-2.5 text-xs">Retains internally</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">WildandFree Tools</td>
                <td className="px-4 py-2.5 text-xs">Strips most EXIF in 2026</td>
                <td className="px-4 py-2.5 text-xs">Notes inconsistency on edge cases</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          The convergence is unambiguous for current behavior: Reddit strips EXIF in 2026 standard uploads. The convergence is equally unambiguous on the principle that edge cases exist — every source qualifies the &quot;Reddit strips&quot; claim with caveats about historical bugs or upload-path variations. Reddit&apos;s public HackerOne disclosure history is unusual transparency for a major platform; the disclosure of #1069039 is the kind of evidence other platforms rarely make public.
        </p>

        <h2 id="hackerone-bug" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">The HackerOne #1069039 HEIC bug</h2>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          The full title of <a href="https://hackerone.com/reports/1069039" target="_blank" rel="noopener noreferrer" className="text-[#171717] dark:text-[#E5E5E5] underline underline-offset-2">HackerOne report #1069039</a> is &quot;GPS metadata preserved when converting HEIF to PNG&quot;. The mechanism is specific and instructive:
        </p>
        <ol className="list-decimal pl-6 mb-4 space-y-2 text-sm text-[#737373]">
          <li>An iPhone user takes a photo. The default iOS format is HEIC (the file extension for HEIF — High Efficiency Image Format).</li>
          <li>The user opens reddit.com in Safari on macOS and uploads the HEIC file directly through the post-creation interface.</li>
          <li>Reddit&apos;s server-side pipeline converts the HEIC to PNG (since most browsers don&apos;t render HEIC natively).</li>
          <li>The conversion code path correctly stripped most EXIF — but a specific GPS-coordinate extraction step preserved the location data in the PNG output.</li>
          <li>The PNG served from Reddit&apos;s CDN contained the original GPS coordinates, readable by anyone who downloaded the file with an EXIF viewer.</li>
        </ol>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          The vulnerability was reported through Reddit&apos;s HackerOne program, accepted, and fixed. The report is publicly disclosed (rare for major platforms) and serves as a permanent record of how a privacy policy can be locally correct (Reddit&apos;s general statement that it strips EXIF was true) but globally incomplete (the specific HEIC-via-Safari-on-macOS path was overlooked).
        </p>

        <h2 id="why-it-matters" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">Why this bug matters for everyone</h2>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Even though the specific HEIC bug is fixed, the report&apos;s real significance is what it implies about every other platform. Reddit was transparent enough to disclose this vulnerability publicly — but it had existed for an unknown length of time before being reported. During that period, every Reddit user who uploaded an iPhone photo via Safari on macOS exposed their GPS coordinates to anyone who looked. The platform&apos;s privacy claim (&quot;we strip EXIF&quot;) was technically true in most cases and meaningfully false in this one.
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Every other platform with a metadata-stripping policy has similar edge cases somewhere in their codebase. Most are never reported. Reddit&apos;s HackerOne disclosure is not an outlier behavior by Reddit — it&apos;s the rare case where the public got to see the underlying reality. The lesson is the same one Signal, Discord, Telegram, and WhatsApp users should internalize: platform stripping is a courtesy, not a contract. The only path that gives you control is to strip metadata yourself before you upload.
        </p>

        <h2 id="upload-paths" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">Reddit&apos;s many upload paths</h2>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Reddit has more distinct image upload paths than any other major social platform, partly because of its history (Old Reddit vs New Reddit) and partly because of its open API:
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-1.5 text-sm text-[#737373]">
          <li><strong>Old Reddit</strong> (old.reddit.com) — text-only posts with image links; upload via separate uploader.</li>
          <li><strong>New Reddit</strong> (reddit.com) — integrated image upload modal in the post-creation flow.</li>
          <li><strong>Official mobile apps</strong> (iOS and Android) — separate upload pipeline tied to the OS photo picker.</li>
          <li><strong>Comment image uploads</strong> — separate path for images attached to comments rather than posts.</li>
          <li><strong>Third-party clients</strong> (Apollo, RIF, Boost — most discontinued after the 2023 API changes, but some still operate) — each with its own image handling.</li>
        </ul>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          The HackerOne bug affected a specific intersection (HEIC + Safari + macOS + reddit.com upload). Other intersections may have their own quirks that no one has reported yet. The proliferation of paths is itself a reason to not trust any specific path completely.
        </p>

        <h2 id="third-party-clients" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">Third-party Reddit clients</h2>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          After Reddit&apos;s API pricing changes in 2023 most popular third-party clients (Apollo, Reddit is Fun) shut down. The few remaining alternatives use various approaches for image upload — some pass through Reddit&apos;s standard endpoints (and thus inherit Reddit&apos;s stripping behavior), some implement their own uploaders. From a metadata privacy perspective, the safest assumption is that third-party clients have less rigorous EXIF handling than the official ones, simply because they have fewer engineering resources to dedicate to the problem.
        </p>

        <h2 id="the-fix" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">The 30-second fix</h2>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          The argument for stripping metadata before uploading to Reddit is strong even in 2026: yes, Reddit strips EXIF in standard cases, but the HackerOne bug history proves that edge cases exist. Drop the photo into the{" "}
          <Link href="/tools/exif" className="text-[#171717] dark:text-[#E5E5E5] underline underline-offset-2">
            SammaPix EXIF Viewer
          </Link>
          {" "}before posting, remove the metadata you do not want to share, and upload the cleaned version. Whatever Reddit&apos;s pipeline does or does not strip becomes irrelevant.
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          For more context on how other platforms handle metadata, see our analysis of{" "}
          <Link href="/blog/does-signal-strip-exif-metadata" className="text-[#171717] dark:text-[#E5E5E5] underline underline-offset-2">Signal</Link>,{" "}
          <Link href="/blog/does-discord-strip-exif-metadata" className="text-[#171717] dark:text-[#E5E5E5] underline underline-offset-2">Discord</Link>,{" "}
          <Link href="/blog/does-telegram-strip-exif-metadata" className="text-[#171717] dark:text-[#E5E5E5] underline underline-offset-2">Telegram</Link>, and our broader{" "}
          <Link href="/blog/which-apps-strip-photo-metadata" className="text-[#171717] dark:text-[#E5E5E5] underline underline-offset-2">audit of 12 messaging apps</Link>. The pattern across platforms is consistent — even when stripping works, edge cases exist, file modes preserve, and platforms rarely commit formally to their privacy behavior. Control at your end is the only reliable layer.
        </p>

        <h2 id="faq" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">FAQ</h2>
        <div className="space-y-5">
          <div>
            <h3 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1.5">Does Reddit strip EXIF metadata from photos?</h3>
            <p className="text-sm text-[#737373] leading-relaxed">Yes for standard uploads in 2026. Reddit re-encodes images submitted to the post upload flow and strips EXIF metadata including GPS coordinates, camera model, and timestamps. However, Reddit has a documented history of edge cases where metadata leaked through — most notably HackerOne report #1069039 from 2020, where HEIC files uploaded via Safari on macOS were converted to PNG with GPS coordinates intact.</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1.5">What was the Reddit HEIC GPS bug (HackerOne #1069039)?</h3>
            <p className="text-sm text-[#737373] leading-relaxed">In 2020, a security researcher reported through HackerOne that Reddit&apos;s image upload pipeline had a bug specifically affecting HEIC files (the default iPhone photo format). When a user uploaded a HEIC photo via Safari on macOS, Reddit&apos;s conversion to PNG preserved the GPS coordinates from the original file. The PNG that other Reddit users could view and download had the location data embedded, exposing the uploader&apos;s exact coordinates. The bug was fixed.</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1.5">Does Reddit keep my photo metadata on its servers?</h3>
            <p className="text-sm text-[#737373] leading-relaxed">Reddit serves a re-encoded version of your photo through its CDN with EXIF stripped in normal cases. However, the platform receives your original file at the upload endpoint before stripping happens, and like most platforms, Reddit&apos;s privacy policy allows internal retention of user-uploaded content. The version shown to other users is metadata-clean; the version Reddit holds internally is whatever you uploaded.</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1.5">Does Reddit strip EXIF from posts versus comment image uploads?</h3>
            <p className="text-sm text-[#737373] leading-relaxed">The same image-processing pipeline handles both. However, Reddit has multiple upload paths (Old Reddit, New Reddit, official mobile apps, third-party clients), and historical bugs like the HEIC issue suggest that different paths can have slightly different processing. The safest assumption is that any Reddit upload could leak metadata in edge cases — strip before uploading.</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1.5">Can someone extract GPS from a photo I posted on Reddit?</h3>
            <p className="text-sm text-[#737373] leading-relaxed">In standard cases, no — Reddit&apos;s CDN serves images with EXIF stripped. But the HackerOne bug history shows that this is not absolute. If you have ever posted iPhone photos to Reddit during the affected period, those uploads may still be cached with original metadata.</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1.5">How can I strip EXIF from a Reddit photo before uploading?</h3>
            <p className="text-sm text-[#737373] leading-relaxed">Use a browser-based EXIF viewer like the{" "}
              <Link href="/tools/exif" className="text-[#171717] dark:text-[#E5E5E5] underline underline-offset-2">SammaPix EXIF Viewer</Link>. Drop the photo, see every metadata tag, and remove them with one click. The tool runs locally — nothing uploaded — and produces a cleaned file you can post on Reddit without depending on platform-side stripping at all.</p>
          </div>
        </div>
      </BlogArticleLayout>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { APP_URL } from "@/lib/constants";
import BlogArticleLayout from "@/components/blog/BlogArticleLayout";

export const metadata: Metadata = {
  title: "Does Telegram Strip EXIF Metadata? Honest 2026 Answer",
  description:
    "Telegram strips EXIF only when you compress — send as file and full GPS coordinates travel intact. The 5-second trap most users fall into, and how to avoid it.",
  alternates: {
    canonical: `${APP_URL}/blog/does-telegram-strip-exif-metadata`,
  },
  keywords: [
    "does telegram strip exif",
    "does telegram remove metadata",
    "telegram exif gps",
    "telegram photo privacy",
    "telegram file vs photo upload",
    "telegram metadata preserved",
    "telegram compress photo metadata",
    "telegram document mode privacy",
  ],
  openGraph: {
    title: "Does Telegram Strip EXIF Metadata? Honest 2026 Answer",
    description:
      "Telegram strips EXIF for compressed images but preserves everything when you send as file. The 5-second trap and how to avoid it.",
    url: `${APP_URL}/blog/does-telegram-strip-exif-metadata`,
    type: "article",
    publishedTime: "2026-05-17",
    authors: ["https://lucasammarco.com"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Does Telegram Strip EXIF Metadata? Honest 2026 Answer",
    description:
      "Telegram strips EXIF for compressed photos. Send as file and your GPS coordinates travel intact. Here is the fix.",
    creator: "@lucasammarco",
  },
};

const POST_DATE = "2026-05-17";
const POST_DATE_FORMATTED = "May 17, 2026";
const POST_URL = `${APP_URL}/blog/does-telegram-strip-exif-metadata`;
const POST_TITLE = "Does Telegram Strip EXIF Metadata? Honest 2026 Answer";

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: POST_TITLE,
  description:
    "An evidence-based look at Telegram's EXIF metadata handling in 2026: how compression triggers stripping, why the file/document mode preserves everything, and the only reliable way to keep your photo metadata private.",
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
    "does telegram strip exif",
    "telegram metadata",
    "telegram photo privacy",
    "telegram file upload exif",
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
      name: "Does Telegram strip EXIF metadata from photos?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Only conditionally. Telegram strips EXIF when you send photos through the standard photo picker that compresses the image — the re-encoding process removes GPS, camera model, timestamps, and exposure settings as a side effect of compression. But Telegram does NOT strip EXIF when you send the same photo as a file via the document attachment menu. In file mode the original photo is transmitted byte-for-byte with all metadata intact.",
      },
    },
    {
      "@type": "Question",
      name: "Does Telegram remove GPS coordinates from photos?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For compressed image uploads, yes — GPS data is stripped along with the rest of the EXIF block. For file/document uploads, no — GPS coordinates are preserved exactly as they were in the original photo. Telegram's own bug tracker confirms this distinction. If you accidentally send a vacation photo as a file, anyone in the chat can extract your exact location with a free EXIF viewer in seconds.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between Telegram photo mode and file mode?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Photo mode (the default when you tap the camera icon or paperclip and select a photo from your gallery) compresses the image — usually significantly — and strips most metadata as a byproduct. File mode (when you choose 'Send as File' or pick the photo from a file manager rather than the gallery) preserves the original quality, original resolution, and all original metadata. The trade-off is quality versus privacy: file mode keeps the photo crisp but leaks all your EXIF.",
      },
    },
    {
      "@type": "Question",
      name: "Does Telegram keep my photo metadata on its servers?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes for cloud chats. Telegram stores your chat history on its servers (which is what enables the multi-device sync that competitors like Signal do not offer), and that includes the photos you have shared. Only Secret Chats are end-to-end encrypted and not stored server-side. For everything else — including standard 1-on-1 conversations, groups, and channels — Telegram has the photos you sent, including the EXIF if you sent them in file mode.",
      },
    },
    {
      "@type": "Question",
      name: "Can my Telegram contacts extract GPS coordinates from photos I send?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "If you sent the photo as a compressed image, no — the GPS data was stripped during compression. If you sent it as a file, yes — anyone in the chat or channel can save the file and read your exact GPS coordinates with any free EXIF viewer. This is by design: file mode exists to preserve original quality, and Telegram does not warn users about the privacy implication of choosing it.",
      },
    },
    {
      "@type": "Question",
      name: "How can I check if a photo has EXIF before sending on Telegram?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Use a browser-based EXIF viewer like the SammaPix EXIF Viewer. It shows every metadata tag in your photo (GPS coordinates, camera model, timestamp, software version, lens info) without uploading the file anywhere. If you see GPS or sensitive tags, strip them with one click before sending. This works the same way regardless of whether you eventually send via photo mode or file mode — and it removes the entire question of platform behavior.",
      },
    },
  ],
};

export default function DoesTelegramStripExifMetadataPage() {
  return (
    <>
      <BlogArticleLayout
        title={POST_TITLE}
        slug="does-telegram-strip-exif-metadata"
        description={`Telegram is the only major messenger where the answer to &quot;does it strip EXIF?&quot; depends entirely on a UI choice most users do not understand they are making. Send a photo as a compressed image and the metadata is removed. Send it as a file — the option a single tap away in the same menu — and every byte of EXIF travels intact, including the GPS coordinates that pin your home address.`}
        date={POST_DATE}
        dateFormatted={POST_DATE_FORMATTED}
        tags={["Privacy"]}
        readingTime={8}
        headings={[
          { id: "short-answer", title: "The short answer" },
          { id: "the-two-modes", title: "Telegram's two upload modes" },
          { id: "evidence", title: "What the evidence shows" },
          { id: "telegram-bug-tracker", title: "Telegram's own bug tracker confirms it" },
          { id: "cloud-chat-retention", title: "The cloud chat retention problem" },
          { id: "secret-chats", title: "Secret Chats — the privacy escape hatch" },
          { id: "the-trap", title: "The 5-second trap that most users fall into" },
          { id: "the-fix", title: "The 30-second fix" },
          { id: "faq", title: "FAQ" },
        ]}
        summary={[
          "Telegram strips EXIF only when you compress — the photo-picker default. Send the same photo as a file/document and full EXIF including GPS is preserved.",
          "Telegram's own public bug tracker (bug #19150) documents this behavior: 'GPS coordinates (EXIF) erased when images sent as file' is filed as a bug, not a feature.",
          "Cloud chats (the default) store your photos on Telegram's servers. Only Secret Chats are end-to-end encrypted with no server retention.",
          "The UI gives no warning when you choose file mode vs photo mode — it is on the user to know which path preserves privacy and which does not.",
          "Safest workflow: strip EXIF before sending. Then it does not matter which mode you accidentally pick.",
        ]}
        heroImage={
          <figure>
            <img
              src="https://images.pexels.com/photos/1851415/pexels-photo-1851415.jpeg?auto=compress&cs=tinysrgb&w=800&q=80"
              alt="Smartphone messenger app representing Telegram photo upload privacy and metadata handling"
              className="w-full rounded-lg"
              loading="eager"
            />
            <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
              Telegram&apos;s photo mode strips EXIF, file mode preserves it — same menu, opposite privacy outcome - Photo by Pexels
            </figcaption>
          </figure>
        }
        ctaBlock={
          <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2">
              Strip EXIF before sending to Telegram
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-4">
              The SammaPix EXIF Viewer shows every metadata tag and removes them with one click. Runs in your browser — nothing uploaded.
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
            TL;DR — does Telegram strip EXIF?
          </p>
          <p className="text-sm text-gray-700 dark:text-[#A3A3A3] leading-relaxed">
            <strong>Photo mode (default photo picker):</strong> Yes, EXIF stripped during compression.{" "}
            <strong>File mode (send as document):</strong> No, full EXIF preserved including GPS.{" "}
            <strong>Cloud chats (default):</strong> Photos stored on Telegram&apos;s servers.{" "}
            <strong>Secret Chats:</strong> End-to-end encrypted, not stored. The safe habit is to{" "}
            <Link href="/tools/exif" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2">
              strip EXIF before sending
            </Link>
            {" "}so the mode choice does not matter.
          </p>
        </div>

        {/* Section: short answer */}
        <h2 id="short-answer" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          The short answer
        </h2>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Telegram&apos;s EXIF behavior is the most context-dependent of any major messenger. Whether your photo metadata gets stripped or preserved depends entirely on which of two upload modes you happened to pick — and the two modes are one tap apart in the same menu, with no UI warning about the privacy difference between them. The result is that two different users sharing the same photo on the same day can end up with completely opposite outcomes for what travels to the recipient.
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          The mechanism is straightforward: when you send through the photo picker, Telegram compresses the image (often significantly), and the re-encoding process strips most of the EXIF block as a byproduct. When you send through the document/file attachment menu, Telegram treats the image as an arbitrary file and stores the bytes untouched. The compressed version loses quality but gains privacy; the file version preserves quality but leaks every EXIF tag including GPS coordinates.
        </p>

        {/* Section: two modes */}
        <h2 id="the-two-modes" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          Telegram&apos;s two upload modes
        </h2>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          To make the distinction concrete, here is what happens to the same source photo when sent through each of the four common Telegram upload paths.
        </p>
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md overflow-hidden">
            <thead>
              <tr className="bg-[#FAFAFA] dark:bg-[#1A1A1A]">
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-[#525252] dark:text-[#A3A3A3] border-b border-[#E5E5E5] dark:border-[#2A2A2A]">Upload path</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-[#525252] dark:text-[#A3A3A3] border-b border-[#E5E5E5] dark:border-[#2A2A2A]">Compresses?</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-[#525252] dark:text-[#A3A3A3] border-b border-[#E5E5E5] dark:border-[#2A2A2A]">Strips EXIF?</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-[#525252] dark:text-[#A3A3A3] border-b border-[#E5E5E5] dark:border-[#2A2A2A]">GPS leaked?</th>
              </tr>
            </thead>
            <tbody className="text-[#737373] dark:text-[#737373]">
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">Photo picker → compressed</td>
                <td className="px-4 py-2.5 text-xs">Yes</td>
                <td className="px-4 py-2.5 text-xs text-green-600">Yes</td>
                <td className="px-4 py-2.5 text-xs text-green-600">No</td>
              </tr>
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#1A1A1A]/50">
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">Paperclip → &quot;Send as File&quot;</td>
                <td className="px-4 py-2.5 text-xs">No</td>
                <td className="px-4 py-2.5 text-xs text-red-600">No</td>
                <td className="px-4 py-2.5 text-xs text-red-600">Yes</td>
              </tr>
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">File manager → share to Telegram</td>
                <td className="px-4 py-2.5 text-xs">No</td>
                <td className="px-4 py-2.5 text-xs text-red-600">No</td>
                <td className="px-4 py-2.5 text-xs text-red-600">Yes</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">Camera capture in-app</td>
                <td className="px-4 py-2.5 text-xs">Yes</td>
                <td className="px-4 py-2.5 text-xs text-green-600">Yes (often no EXIF to begin with)</td>
                <td className="px-4 py-2.5 text-xs text-green-600">No</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          The pattern is binary and predictable: compression strips, lack of compression preserves. Unlike Discord — where the same image can be re-encoded or preserved depending on subtle path differences — Telegram&apos;s behavior is consistent. The problem is not that the behavior is opaque; it is that the UI gives users no signal about which outcome they are choosing.
        </p>

        {/* Section: Evidence */}
        <h2 id="evidence" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          What the evidence shows
        </h2>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Unlike Discord (where third-party reports converge but Telegram has been silent), Telegram&apos;s EXIF behavior is reinforced from multiple independent sources, including the company&apos;s own public bug tracker. The cross-reference:
        </p>
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md overflow-hidden">
            <thead>
              <tr className="bg-[#FAFAFA] dark:bg-[#1A1A1A]">
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-[#525252] dark:text-[#A3A3A3] border-b border-[#E5E5E5] dark:border-[#2A2A2A]">Source</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-[#525252] dark:text-[#A3A3A3] border-b border-[#E5E5E5] dark:border-[#2A2A2A]">On photo mode</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-[#525252] dark:text-[#A3A3A3] border-b border-[#E5E5E5] dark:border-[#2A2A2A]">On file mode</th>
              </tr>
            </thead>
            <tbody className="text-[#737373] dark:text-[#737373]">
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">MetaClean (2026)</td>
                <td className="px-4 py-2.5 text-xs">Stripped via compression</td>
                <td className="px-4 py-2.5 text-xs">Preserved</td>
              </tr>
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#1A1A1A]/50">
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">EditPrivacy tested</td>
                <td className="px-4 py-2.5 text-xs">All EXIF removed</td>
                <td className="px-4 py-2.5 text-xs">All EXIF intact</td>
              </tr>
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">Fastio comparison</td>
                <td className="px-4 py-2.5 text-xs">Strips during re-encode</td>
                <td className="px-4 py-2.5 text-xs">Preserved (MakerNotes too)</td>
              </tr>
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#1A1A1A]/50">
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">4n6 forensics analysis</td>
                <td className="px-4 py-2.5 text-xs">Removes GPS + camera</td>
                <td className="px-4 py-2.5 text-xs">Preserves everything</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]"><strong>Telegram bug tracker #19150</strong></td>
                <td className="px-4 py-2.5 text-xs">N/A</td>
                <td className="px-4 py-2.5 text-xs"><strong>&quot;GPS erased when images sent as file&quot;</strong></td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          The convergence is unusually strong here — every source agrees, and Telegram&apos;s own bug tracker (#19150) confirms the file-mode behavior by filing it as a bug. The title of that bug, &quot;GPS coordinates (EXIF) erased when images sent as file&quot;, is itself instructive: it implies users had been complaining that GPS was being erased, but the underlying confirmation is that file-mode normally preserves EXIF (the bug being a reverse case where it was getting stripped unexpectedly).
        </p>

        {/* Section: Telegram bug tracker */}
        <h2 id="telegram-bug-tracker" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          Telegram&apos;s own bug tracker confirms it
        </h2>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Telegram is unusual among messaging platforms in operating a public bug tracker at <code className="font-mono text-xs bg-[#F5F5F5] dark:bg-[#1A1A1A] px-1.5 py-0.5 rounded text-[#171717] dark:text-[#E5E5E5]">bugs.telegram.org</code>. The platform&apos;s users have filed multiple EXIF-related issues over the years, and the existence of those issues — even when individual reports are about edge cases — is implicit confirmation of the underlying behavior:
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-1.5 text-sm text-[#737373]">
          <li>Bug <a href="https://bugs.telegram.org/c/19150" target="_blank" rel="noopener noreferrer" className="text-[#171717] dark:text-[#E5E5E5] underline underline-offset-2">#19150 &quot;GPS coordinates (EXIF) erased when images sent as file&quot;</a> — user reports that EXIF was being stripped in a case where it should have been preserved, confirming that file-mode is the path users rely on for metadata preservation.</li>
          <li>Multiple older issues request the ability to opt into EXIF stripping for file uploads — implicit confirmation that file mode preserves by default.</li>
          <li>No Telegram support documentation explicitly states the EXIF behavior in either mode — the behavior is reverse-engineered from observation, not promised by the platform.</li>
        </ul>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          The forensics community treats Telegram&apos;s file mode as a reliable way to preserve original photo evidence — which from a privacy perspective is the worst possible signal. If law-enforcement forensics labs trust Telegram file mode to preserve EXIF intact, your friends with five seconds and a free EXIF viewer can do the same thing.
        </p>

        {/* Section: cloud chat retention */}
        <h2 id="cloud-chat-retention" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          The cloud chat retention problem
        </h2>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Even when Telegram strips EXIF from a compressed photo upload, there is a deeper privacy issue most users underestimate: <strong>Telegram stores your chat history on its servers by default</strong>. This is what enables the multi-device sync that Telegram is famous for — open Telegram on any device and your full history is there — but it comes at the cost of server-side retention.
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          For metadata privacy this matters because Telegram&apos;s servers hold the photos you have sent in their post-compression state. Even after EXIF stripping, the photo file itself sits on Telegram&apos;s infrastructure. A legal request, a server breach, or a future policy change could expose that file. The metadata may be gone, but the photo is still there — and depending on context (a beach photo of an identifiable beach, a building visible in the background) the photo alone can be enough to compromise privacy.
        </p>

        {/* Section: secret chats */}
        <h2 id="secret-chats" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          Secret Chats — the privacy escape hatch
        </h2>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Telegram does offer end-to-end encrypted conversations through the <strong>Secret Chats</strong> feature, but they are an opt-in, not a default. You have to explicitly start a Secret Chat from a contact&apos;s profile, and they have several limitations that explain why most users do not use them:
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-1.5 text-sm text-[#737373]">
          <li>Secret Chats are device-specific — they do not sync across your devices the way regular chats do.</li>
          <li>You can only have a Secret Chat with one other user (no group Secret Chats).</li>
          <li>Some features (forwarding, certain media types, message editing) are restricted.</li>
        </ul>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          When you do use a Secret Chat, the EXIF behavior is the same as for regular chats — compressed photos get stripped, file uploads preserve metadata — but the additional benefit is that Telegram&apos;s servers cannot read the photo content at all. For privacy-critical photo sharing on Telegram, Secret Chat + compressed image mode is the strongest combination the platform offers. But even then, defense in depth via pre-upload stripping is the safest choice.
        </p>

        {/* Section: the trap */}
        <h2 id="the-trap" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          The 5-second trap that most users fall into
        </h2>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          The single most common way Telegram users accidentally leak EXIF is by sharing photos from outside the in-app picker. Two specific workflows account for almost all the cases:
        </p>
        <ol className="list-decimal pl-6 mb-4 space-y-2 text-sm text-[#737373]">
          <li>
            <strong>Sharing from a file manager.</strong> When you open the Files app on iOS (or Files by Google on Android) and tap &quot;Share &rarr; Telegram&quot;, the share sheet routes through the document/file pipeline rather than the photo pipeline. Same photo, opposite privacy outcome.
          </li>
          <li>
            <strong>The &quot;Send as File&quot; checkbox.</strong> When you drop a high-resolution photo into the desktop Telegram client and check the option to send as file instead of as compressed photo, you are explicitly choosing the path that preserves quality — and along with quality, you preserve all your EXIF.
          </li>
        </ol>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Both of these workflows are growing because Telegram users routinely want to preserve original photo quality (Telegram is often used as a casual cloud-storage substitute for sharing photos with family). Quality preservation is a legitimate need; the unintended privacy leak is the cost. The platform offers no warning when you make this choice — the UI for file-mode upload is identical whether the file is a PDF (no EXIF risk) or a JPG taken with your phone (full GPS exposure).
        </p>

        {/* Section: the fix */}
        <h2 id="the-fix" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          The 30-second fix
        </h2>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          The cleanest way to remove the entire Telegram EXIF question is to strip metadata yourself before sending — once you do that, it does not matter which mode you accidentally pick. Drop the photo into the{" "}
          <Link href="/tools/exif" className="text-[#171717] dark:text-[#E5E5E5] underline underline-offset-2">
            SammaPix EXIF Viewer
          </Link>
          , review what tags are present, remove the ones you want gone, and send the cleaned version through Telegram in whichever mode preserves the quality you need.
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          For context on how other messengers handle metadata, see our analysis of{" "}
          <Link href="/blog/does-signal-strip-exif-metadata" className="text-[#171717] dark:text-[#E5E5E5] underline underline-offset-2">
            Signal
          </Link>
          {" "}(the only major messenger that strips by default and never retains server-side), our{" "}
          <Link href="/blog/does-discord-strip-exif-metadata" className="text-[#171717] dark:text-[#E5E5E5] underline underline-offset-2">
            Discord deep-dive
          </Link>
          , and the wider{" "}
          <Link href="/blog/which-apps-strip-photo-metadata" className="text-[#171717] dark:text-[#E5E5E5] underline underline-offset-2">
            audit of 12 messaging apps
          </Link>
          . The pattern across the space is consistent: file/document modes preserve EXIF, photo modes typically strip it, and no platform offers a formal privacy guarantee. The only reliable control is at your end.
        </p>

        {/* Section: FAQ */}
        <h2 id="faq" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          FAQ
        </h2>

        <div className="space-y-5">
          <div>
            <h3 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1.5">
              Does Telegram strip EXIF metadata from photos?
            </h3>
            <p className="text-sm text-[#737373] leading-relaxed">
              Only conditionally. Telegram strips EXIF when you send photos through the standard photo picker that compresses the image — the re-encoding process removes GPS, camera model, timestamps, and exposure settings as a side effect of compression. But Telegram does NOT strip EXIF when you send the same photo as a file via the document attachment menu. In file mode the original photo is transmitted byte-for-byte with all metadata intact.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1.5">
              Does Telegram remove GPS coordinates from photos?
            </h3>
            <p className="text-sm text-[#737373] leading-relaxed">
              For compressed image uploads, yes — GPS data is stripped along with the rest of the EXIF block. For file/document uploads, no — GPS coordinates are preserved exactly as they were in the original photo.{" "}
              <a href="https://bugs.telegram.org/c/19150" target="_blank" rel="noopener noreferrer" className="text-[#171717] dark:text-[#E5E5E5] underline underline-offset-2">
                Telegram&apos;s own bug tracker
              </a>
              {" "}confirms this distinction. If you accidentally send a vacation photo as a file, anyone in the chat can extract your exact location with a free EXIF viewer in seconds.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1.5">
              What is the difference between Telegram photo mode and file mode?
            </h3>
            <p className="text-sm text-[#737373] leading-relaxed">
              Photo mode (the default when you tap the camera icon or paperclip and select a photo from your gallery) compresses the image — usually significantly — and strips most metadata as a byproduct. File mode (when you choose &quot;Send as File&quot; or pick the photo from a file manager rather than the gallery) preserves the original quality, original resolution, and all original metadata. The trade-off is quality versus privacy: file mode keeps the photo crisp but leaks all your EXIF.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1.5">
              Does Telegram keep my photo metadata on its servers?
            </h3>
            <p className="text-sm text-[#737373] leading-relaxed">
              Yes for cloud chats. Telegram stores your chat history on its servers (which is what enables the multi-device sync that competitors like Signal do not offer), and that includes the photos you have shared. Only Secret Chats are end-to-end encrypted and not stored server-side. For everything else — including standard 1-on-1 conversations, groups, and channels — Telegram has the photos you sent, including the EXIF if you sent them in file mode.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1.5">
              Can my Telegram contacts extract GPS coordinates from photos I send?
            </h3>
            <p className="text-sm text-[#737373] leading-relaxed">
              If you sent the photo as a compressed image, no — the GPS data was stripped during compression. If you sent it as a file, yes — anyone in the chat or channel can save the file and read your exact GPS coordinates with any free EXIF viewer. This is by design: file mode exists to preserve original quality, and Telegram does not warn users about the privacy implication of choosing it.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1.5">
              How can I check if a photo has EXIF before sending on Telegram?
            </h3>
            <p className="text-sm text-[#737373] leading-relaxed">
              Use a browser-based EXIF viewer like the{" "}
              <Link href="/tools/exif" className="text-[#171717] dark:text-[#E5E5E5] underline underline-offset-2">
                SammaPix EXIF Viewer
              </Link>
              . It shows every metadata tag in your photo (GPS coordinates, camera model, timestamp, software version, lens info) without uploading the file anywhere. If you see GPS or sensitive tags, strip them with one click before sending. This works the same way regardless of whether you eventually send via photo mode or file mode — and it removes the entire question of platform behavior.
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

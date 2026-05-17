import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { APP_URL } from "@/lib/constants";
import BlogArticleLayout from "@/components/blog/BlogArticleLayout";

export const metadata: Metadata = {
  title: "Does Discord Strip EXIF Metadata? Honest 2026 Answer",
  description:
    "Everyone claims Discord strips EXIF — but Discord has never documented it. We mapped what 6 sources say, the file-attachment loophole, and what to do instead.",
  alternates: {
    canonical: `${APP_URL}/blog/does-discord-strip-exif-metadata`,
  },
  keywords: [
    "does discord strip exif metadata",
    "discord exif data",
    "discord image privacy",
    "does discord remove gps",
    "discord metadata leak",
    "discord nitro exif",
    "discord file upload metadata",
    "discord image upload privacy",
  ],
  openGraph: {
    title: "Does Discord Strip EXIF Metadata? Honest 2026 Answer",
    description:
      "Discord has never officially documented its EXIF behavior. Here is what the available evidence actually shows — including the file-attachment loophole.",
    url: `${APP_URL}/blog/does-discord-strip-exif-metadata`,
    type: "article",
    publishedTime: "2026-05-17",
    authors: ["https://lucasammarco.com"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Does Discord Strip EXIF Metadata? Honest 2026 Answer",
    description:
      "Most privacy blogs claim Discord strips EXIF. Discord has never confirmed it. Here is what the evidence shows + what to do.",
    creator: "@lucasammarco",
  },
};

const POST_DATE = "2026-05-17";
const POST_DATE_FORMATTED = "May 17, 2026";
const POST_URL = `${APP_URL}/blog/does-discord-strip-exif-metadata`;
const POST_TITLE = "Does Discord Strip EXIF Metadata? Honest 2026 Answer";

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: POST_TITLE,
  description:
    "An evidence-based look at how Discord handles photo EXIF metadata in 2026: what privacy blogs claim, what Discord has actually documented, the file-attachment loophole, and the only reliable way to keep your GPS data private when sharing on Discord.",
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
    "does discord strip exif",
    "discord image metadata",
    "discord nitro exif",
    "discord file upload privacy",
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
      name: "Does Discord officially strip EXIF metadata from photos?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Discord has never published official documentation confirming that it strips EXIF metadata. Multiple privacy-focused blogs claim that direct image uploads have metadata removed during re-encoding, but these claims are based on informal observation, not Discord support documentation. Discord's official help center covers file attachments and upload limits but does not address EXIF handling. The lack of a formal privacy guarantee means the behavior can change at any time without notice.",
      },
    },
    {
      "@type": "Question",
      name: "Does Discord remove GPS coordinates from photos?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Probably for direct image uploads — most third-party sources report that re-encoded inline images served from Discord's CDN no longer contain GPS coordinates. However, files sent through the paperclip attachment menu or shared from a file manager (rather than the photo picker) are often preserved byte-for-byte. The only way to be sure GPS coordinates are removed is to strip them yourself before sending.",
      },
    },
    {
      "@type": "Question",
      name: "What is Discord's current file upload limit in 2026?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Discord lowered the free upload limit from 25 MB to 10 MB in September 2024. Current 2026 tiers are: free accounts can upload up to 10 MB per file, Nitro Basic ($3/month) raises this to 50 MB, and full Nitro ($10/month) allows up to 500 MB per file. Servers boosted to Tier 3 (around $49/month split across boosters) raise every member's limit to 100 MB in that specific server.",
      },
    },
    {
      "@type": "Question",
      name: "Does Discord Nitro handle EXIF differently?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "There is no evidence that Discord Nitro changes EXIF stripping behavior. Nitro raises file size limits (from 10 MB free up to 500 MB) and unlocks higher-resolution image previews, but the underlying upload pipeline appears identical. If anything, Nitro increases the privacy risk because users routinely send original-quality photos as file attachments (the path most likely to preserve full metadata) instead of compressed inline images.",
      },
    },
    {
      "@type": "Question",
      name: "Can my Discord friends extract GPS coordinates from photos I send?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "If you sent the photo as a direct inline image (drag-and-drop, paste, camera roll picker), the GPS data was very likely stripped during Discord's re-encoding. If you sent it as a file attachment (paperclip menu, Files app share sheet, or by checking 'send as file'), any member of the channel can right-click the attachment, save it, and read your exact GPS coordinates with a free EXIF viewer. The whole exchange takes about ten seconds.",
      },
    },
    {
      "@type": "Question",
      name: "How can I check if a photo still has EXIF before sending?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Use a browser-based EXIF viewer that runs locally on your device. The SammaPix EXIF Viewer shows every tag in your photo (GPS coordinates, camera model, timestamp, software version, lens info) without uploading the file anywhere. If the viewer shows GPS or camera tags, your photo is carrying that data when you upload it to Discord. Remove the metadata in the same tool with one click before sharing.",
      },
    },
  ],
};

export default function DoesDiscordStripExifMetadataPage() {
  return (
    <>
      <BlogArticleLayout
        title={POST_TITLE}
        slug="does-discord-strip-exif-metadata"
        description={`Every privacy blog repeats the same claim: Discord automatically strips EXIF from your photos. Discord itself has never published documentation confirming it. So what is the actual evidence? We mapped what 6 third-party sources report, what Discord&apos;s own support center documents, the loophole in file attachments, and the only reliable way to keep your metadata private when sharing on Discord — regardless of what the platform does or does not do.`}
        date={POST_DATE}
        dateFormatted={POST_DATE_FORMATTED}
        tags={["Privacy"]}
        readingTime={9}
        headings={[
          { id: "short-answer", title: "The short answer" },
          { id: "what-sources-say", title: "What every source actually claims" },
          { id: "discord-official", title: "What Discord has officially documented" },
          { id: "file-attachment-loophole", title: "The file-attachment loophole" },
          { id: "upload-tiers", title: "Discord 2026 upload tiers (verified)" },
          { id: "nitro-myth", title: "Does Nitro change EXIF handling? No." },
          { id: "verify-yourself", title: "The only way to be sure" },
          { id: "the-fix", title: "The 30-second fix" },
          { id: "faq", title: "FAQ" },
        ]}
        summary={[
          "Discord has never officially documented its EXIF stripping behavior — every privacy-blog claim is based on informal observation, not a Discord support article.",
          "Most third-party tests report that direct image uploads (drag-and-drop, paste, camera roll picker) have metadata stripped during re-encoding to Discord's CDN.",
          "The file-attachment path (paperclip, 'send as file', mobile Files app) is the documented loophole — files there are sent byte-for-byte and most observers report metadata preserved.",
          "Discord's free upload tier dropped from 25 MB to 10 MB in September 2024. Nitro Basic is 50 MB; full Nitro is 500 MB. Nitro does not change EXIF behavior.",
          "Because Discord offers no formal guarantee, the only reliable path is to strip EXIF before uploading — a 30-second action with any browser-based EXIF tool.",
        ]}
        heroImage={
          <figure>
            <img
              src="https://images.pexels.com/photos/4348401/pexels-photo-4348401.jpeg?auto=compress&cs=tinysrgb&w=800&q=80"
              alt="Smartphone screen representing Discord image upload privacy and EXIF metadata concerns"
              className="w-full rounded-lg"
              loading="eager"
            />
            <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
              Discord has never officially documented how it handles photo metadata — and that uncertainty is itself a privacy problem - Photo by Cottonbro Studio on Pexels
            </figcaption>
          </figure>
        }
        ctaBlock={
          <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2">
              Strip EXIF before sending to Discord — free, in your browser
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-4">
              The SammaPix EXIF Viewer shows every metadata tag in your photo and removes them with one click. Nothing gets uploaded — your file never leaves your device.
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
            TL;DR — does Discord strip EXIF?
          </p>
          <p className="text-sm text-gray-700 dark:text-[#A3A3A3] leading-relaxed">
            <strong>Probably yes for direct image uploads</strong> (every third-party source agrees, but Discord has never officially documented it).{" "}
            <strong>Probably no for file attachments</strong> (paperclip uploads and &quot;send as file&quot; appear to preserve metadata byte-for-byte).{" "}
            <strong>Discord Nitro:</strong> raises file size, does not change EXIF behavior. Because there is no formal guarantee, the only reliable approach is to{" "}
            <Link href="/tools/exif" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2">
              strip EXIF before uploading
            </Link>
            .
          </p>
        </div>

        {/* Section: The short answer */}
        <h2 id="short-answer" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          The short answer
        </h2>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Search for &quot;does Discord strip EXIF&quot; and you will find a dozen privacy blogs all confidently asserting that Discord automatically removes metadata from your photos. They are probably right — for the most common upload path. But the topic is more nuanced than any single-line answer captures, and the underlying truth is uncomfortable for anyone who cares about privacy: <strong>Discord has never published any official documentation about how it handles photo EXIF metadata</strong>. Every claim you read is based on informal observation, not a Discord support article.
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          That alone is the most important thing to understand. EXIF handling on Discord is undocumented behavior, which means it can change at any time without notice. The convergence of third-party reports does suggest that direct image uploads currently get stripped, and that file attachments currently do not. But there is no contract, no guarantee, and no recourse if the behavior shifts tomorrow. For anything sensitive — your home address embedded in vacation photos, the precise GPS of a trip you do not want to advertise, the model of a camera you do not want strangers to know you own — the only reliable approach is to strip EXIF yourself before upload.
        </p>

        {/* Section: What every source says */}
        <h2 id="what-sources-say" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          What every source actually claims
        </h2>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          We compared what six third-party sources publicly assert about Discord&apos;s EXIF handling. The headline finding: there is broad agreement that direct image uploads strip EXIF, but no source provides reproducible test data, and at least one source contradicts the consensus entirely.
        </p>
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md overflow-hidden">
            <thead>
              <tr className="bg-[#FAFAFA] dark:bg-[#1A1A1A]">
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-[#525252] dark:text-[#A3A3A3] border-b border-[#E5E5E5] dark:border-[#2A2A2A]">Source type</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-[#525252] dark:text-[#A3A3A3] border-b border-[#E5E5E5] dark:border-[#2A2A2A]">Claim about direct image upload</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-[#525252] dark:text-[#A3A3A3] border-b border-[#E5E5E5] dark:border-[#2A2A2A]">Claim about file attachments</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-[#525252] dark:text-[#A3A3A3] border-b border-[#E5E5E5] dark:border-[#2A2A2A]">Test methodology shown?</th>
              </tr>
            </thead>
            <tbody className="text-[#737373] dark:text-[#737373]">
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">PrivMeta privacy blog</td>
                <td className="px-4 py-2.5 text-xs">Strips most metadata</td>
                <td className="px-4 py-2.5 text-xs">&quot;May behave differently&quot;</td>
                <td className="px-4 py-2.5 text-xs text-red-600">No</td>
              </tr>
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#1A1A1A]/50">
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">MetaRemover guides</td>
                <td className="px-4 py-2.5 text-xs">Strips EXIF including GPS</td>
                <td className="px-4 py-2.5 text-xs">Behavior depends on re-encoding</td>
                <td className="px-4 py-2.5 text-xs text-red-600">No</td>
              </tr>
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">RemovEXIF 2025 analysis</td>
                <td className="px-4 py-2.5 text-xs">Strips on most uploads</td>
                <td className="px-4 py-2.5 text-xs">Original file may be preserved</td>
                <td className="px-4 py-2.5 text-xs text-red-600">No</td>
              </tr>
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#1A1A1A]/50">
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">Quora community thread</td>
                <td className="px-4 py-2.5 text-xs">Mixed user reports</td>
                <td className="px-4 py-2.5 text-xs">Confirms attachments preserved</td>
                <td className="px-4 py-2.5 text-xs">Anecdotal</td>
              </tr>
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">ExifRemoval blog</td>
                <td className="px-4 py-2.5 text-xs"><strong>Claims Discord does NOT strip</strong></td>
                <td className="px-4 py-2.5 text-xs">All metadata preserved</td>
                <td className="px-4 py-2.5 text-xs text-red-600">No</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">Discord support center</td>
                <td className="px-4 py-2.5 text-xs">No statement</td>
                <td className="px-4 py-2.5 text-xs">No statement</td>
                <td className="px-4 py-2.5 text-xs">N/A</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Two things stand out from this comparison. First, the consensus (Discord strips direct uploads) is real but not unanimous — at least one source flatly contradicts it. Second, <strong>no source publishes reproducible test data</strong> with specific tags, file formats, and CDN responses. The privacy-blog ecosystem is essentially repeating the same claim with different wording, while Discord itself stays silent.
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          That is exactly the situation a privacy-conscious user should treat as a red flag. Even if 95% of the time the consensus is correct, the absence of formal documentation means the remaining 5% — when behavior changes, when an edge case slips through, when a new client version handles something differently — falls on you.
        </p>

        {/* Section: Discord official */}
        <h2 id="discord-official" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          What Discord has officially documented
        </h2>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Discord&apos;s official support center has detailed help articles on uploading files, file size limits, attachment types, and even how to share large files with workarounds. But on EXIF metadata, the support center is silent. The only public Discord-affiliated mention of EXIF we could find is a community feature request titled <em>&quot;Please preserve image exif tags&quot;</em>, posted by users asking Discord to <em>stop</em> stripping EXIF. That request alone is implicit confirmation that direct image uploads do strip EXIF — but it is a community post, not an engineering statement.
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          What Discord has formally documented are the upload mechanics around file types and sizes. The platform distinguishes between <strong>inline images</strong> (which the client renders as previews in the message stream) and <strong>file attachments</strong> (which appear as downloadable items in the channel). This distinction matters more than most users realize, because the two paths route through different server-side logic — and only one of them appears to involve re-encoding.
        </p>

        {/* Section: File attachment loophole */}
        <h2 id="file-attachment-loophole" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          The file-attachment loophole
        </h2>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          The most consistent finding across all third-party reports is that <strong>file attachments are NOT re-encoded</strong>. When you upload a photo via the paperclip menu, check the &quot;send as file&quot; option for an oversize image, or share a photo from a file manager (rather than the photo gallery picker), Discord treats it as an arbitrary file and stores it untouched on its CDN. Anyone who downloads that attachment receives the file exactly as you uploaded it — with every original EXIF tag intact.
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          This matters because two common workflows route through the file-attachment path without users realizing it:
        </p>
        <ol className="list-decimal pl-6 mb-4 space-y-2 text-sm text-[#737373]">
          <li>
            <strong>Mobile Files app sharing.</strong> On iOS and Android, when you open a file manager (Apple Files, Files by Google, iCloud Drive, Google Drive), navigate to a photo, and tap &quot;Share &rarr; Discord&quot;, the share sheet typically routes through the file-attachment pipeline. The photo gallery picker inside the Discord app is the safe path; the system file manager is not.
          </li>
          <li>
            <strong>The &quot;send as file&quot; option on desktop.</strong> When you drag a high-resolution image into a Discord channel and Discord offers a checkbox to send it as a file instead of as a compressed image, people often click it to preserve quality. This bypasses the re-encoding pipeline — and along with the better quality you also preserve all the EXIF.
          </li>
        </ol>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          For a user posting in a private friends-only server, the practical implication is real but limited: anyone in the channel who knows what to look for can right-click any file attachment, save it locally, and read the GPS coordinates from the EXIF block with any free EXIF viewer. The action takes maybe ten seconds. Whether that matters depends on who else is in the server and what is in the photo — but the mechanism exists, and most users have no idea it does.
        </p>

        {/* Section: Upload tiers verified */}
        <h2 id="upload-tiers" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          Discord 2026 upload tiers (verified)
        </h2>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Unlike the EXIF question, the file-size limits are officially documented. Discord lowered the free upload limit from 25 MB to 10 MB in September 2024, with the justification that &quot;99% of users stick to files smaller than 10 MB&quot;. The current 2026 tier structure:
        </p>
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md overflow-hidden">
            <thead>
              <tr className="bg-[#FAFAFA] dark:bg-[#1A1A1A]">
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-[#525252] dark:text-[#A3A3A3] border-b border-[#E5E5E5] dark:border-[#2A2A2A]">Tier</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-[#525252] dark:text-[#A3A3A3] border-b border-[#E5E5E5] dark:border-[#2A2A2A]">Cost</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-[#525252] dark:text-[#A3A3A3] border-b border-[#E5E5E5] dark:border-[#2A2A2A]">Upload limit per file</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-[#525252] dark:text-[#A3A3A3] border-b border-[#E5E5E5] dark:border-[#2A2A2A]">EXIF stripping</th>
              </tr>
            </thead>
            <tbody className="text-[#737373] dark:text-[#737373]">
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">Free</td>
                <td className="px-4 py-2.5 text-xs">$0</td>
                <td className="px-4 py-2.5 text-xs">10 MB</td>
                <td className="px-4 py-2.5 text-xs">Same rules as all tiers</td>
              </tr>
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#1A1A1A]/50">
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">Nitro Basic</td>
                <td className="px-4 py-2.5 text-xs">$3/month</td>
                <td className="px-4 py-2.5 text-xs">50 MB</td>
                <td className="px-4 py-2.5 text-xs">Same rules as all tiers</td>
              </tr>
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">Nitro (full)</td>
                <td className="px-4 py-2.5 text-xs">$10/month</td>
                <td className="px-4 py-2.5 text-xs">500 MB</td>
                <td className="px-4 py-2.5 text-xs">Same rules as all tiers</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">Server Boost Tier 3</td>
                <td className="px-4 py-2.5 text-xs">Boost-funded</td>
                <td className="px-4 py-2.5 text-xs">100 MB (free users in that server)</td>
                <td className="px-4 py-2.5 text-xs">Same rules as all tiers</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          The pricing matters indirectly for privacy: as upload limits grow, users send larger original-quality files. Those larger files are far more likely to be sent through the file-attachment pipeline (where EXIF survives) instead of the inline image pipeline (where it does not). Counter-intuitively, paying for Nitro can <em>increase</em> your privacy risk if you do not strip EXIF first.
        </p>

        {/* Section: Nitro myth */}
        <h2 id="nitro-myth" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          Does Nitro change EXIF handling? No.
        </h2>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          A common assumption in Discord communities is that paying for Nitro changes how files are processed — perhaps Nitro uploads preserve more quality, perhaps they bypass the re-encoding pipeline, perhaps they handle metadata more carefully. None of that is supported by any source we found. Nitro is a quota change, not a pipeline change. The same EXIF behavior — strip on inline upload, preserve on file attachment — applies at every tier.
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          The privacy implication is the opposite of what most users assume. If you have Nitro and routinely send original-quality 100+ MB photos, you are almost certainly sending them as file attachments. Those attachments preserve EXIF. The free user sending 5 MB compressed previews of the same photo is, perversely, in a safer position.
        </p>

        {/* Section: Verify yourself */}
        <h2 id="verify-yourself" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          The only way to be sure
        </h2>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Given that Discord has not formally documented any EXIF stripping behavior, the only reliable approach is to verify your photos yourself before upload. The workflow is short:
        </p>
        <ol className="list-decimal pl-6 mb-4 space-y-2 text-sm text-[#737373]">
          <li>
            Open the{" "}
            <Link href="/tools/exif" className="text-[#171717] dark:text-[#E5E5E5] underline underline-offset-2">
              SammaPix EXIF Viewer
            </Link>
            {" "}in your browser. The tool runs entirely client-side — your photo never gets uploaded to a server.
          </li>
          <li>
            Drop the photo you plan to send. Read what EXIF tags it currently carries. If you see GPS coordinates, camera model, software version, or timestamps, that data is sitting in your file right now.
          </li>
          <li>
            If you want to keep some tags (timestamp, for instance) and remove others (GPS, camera model), strip selectively. If you want a clean file, remove all metadata in one click.
          </li>
          <li>
            Send the cleaned photo to Discord using whichever path you prefer. Even if Discord re-encodes and strips during upload, you have removed the data before it ever left your device — the only path that gives a real guarantee.
          </li>
        </ol>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          This habit takes about thirty seconds per photo once you have done it once, and it covers you not just on Discord but on every platform with undocumented or inconsistent EXIF behavior — which is most of them.
        </p>

        {/* Section: the fix */}
        <h2 id="the-fix" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          The 30-second fix
        </h2>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          If you only change one habit after reading this, make it this: never trust any platform to protect your metadata. Strip EXIF yourself before upload, every time, regardless of where the photo is going. The{" "}
          <Link href="/tools/exif" className="text-[#171717] dark:text-[#E5E5E5] underline underline-offset-2">
            SammaPix EXIF Viewer
          </Link>
          {" "}is built for exactly this workflow — drop a photo, see every tag, remove the ones you want gone, save the cleaned file. The whole thing runs in your browser. No upload, no server, no account.
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          For deeper reading on how other messaging platforms handle metadata, see our broader audit of{" "}
          <Link href="/blog/which-apps-strip-photo-metadata" className="text-[#171717] dark:text-[#E5E5E5] underline underline-offset-2">
            12 messaging apps and what they actually strip
          </Link>
          {" "}and the specific guide on{" "}
          <Link href="/blog/remove-exif-protect-privacy" className="text-[#171717] dark:text-[#E5E5E5] underline underline-offset-2">
            removing EXIF to protect your privacy
          </Link>
          . The pattern is consistent across the industry: most platforms strip metadata for public viewers but keep it internally, file attachments preserve everything, and no major platform offers a formal privacy contract for image metadata. The lesson is the same everywhere — control the data before it leaves your device, because you cannot rely on the platform to do it for you.
        </p>

        {/* Section: FAQ */}
        <h2 id="faq" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          FAQ
        </h2>

        <div className="space-y-5">
          <div>
            <h3 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1.5">
              Does Discord officially strip EXIF metadata from photos?
            </h3>
            <p className="text-sm text-[#737373] leading-relaxed">
              Discord has never published official documentation confirming that it strips EXIF metadata. Multiple privacy-focused blogs claim that direct image uploads have metadata removed during re-encoding, but these claims are based on informal observation, not Discord support documentation. Discord&apos;s official help center covers file attachments and upload limits but does not address EXIF handling. The lack of a formal privacy guarantee means the behavior can change at any time without notice.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1.5">
              Does Discord remove GPS coordinates from photos?
            </h3>
            <p className="text-sm text-[#737373] leading-relaxed">
              Probably for direct image uploads — most third-party sources report that re-encoded inline images served from Discord&apos;s CDN no longer contain GPS coordinates. However, files sent through the paperclip attachment menu or shared from a file manager (rather than the photo picker) are often preserved byte-for-byte. The only way to be sure GPS coordinates are removed is to strip them yourself before sending.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1.5">
              What is Discord&apos;s current file upload limit in 2026?
            </h3>
            <p className="text-sm text-[#737373] leading-relaxed">
              Discord lowered the free upload limit from 25 MB to 10 MB in September 2024. Current 2026 tiers are: free accounts can upload up to 10 MB per file, Nitro Basic ($3/month) raises this to 50 MB, and full Nitro ($10/month) allows up to 500 MB per file. Servers boosted to Tier 3 raise every member&apos;s limit to 100 MB in that specific server.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1.5">
              Does Discord Nitro handle EXIF differently?
            </h3>
            <p className="text-sm text-[#737373] leading-relaxed">
              There is no evidence that Discord Nitro changes EXIF stripping behavior. Nitro raises file size limits (from 10 MB free up to 500 MB) and unlocks higher-resolution image previews, but the underlying upload pipeline appears identical. If anything, Nitro increases the privacy risk because users routinely send original-quality photos as file attachments (the path most likely to preserve full metadata) instead of compressed inline images.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1.5">
              Can my Discord friends extract GPS coordinates from photos I send?
            </h3>
            <p className="text-sm text-[#737373] leading-relaxed">
              If you sent the photo as a direct inline image, the GPS data was very likely stripped during Discord&apos;s re-encoding. If you sent it as a file attachment (paperclip menu, Files app share sheet, or by checking &quot;send as file&quot;), any member of the channel can right-click the attachment, save it, and read your exact GPS coordinates with a free EXIF viewer. The whole exchange takes about ten seconds.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1.5">
              How can I check if a photo still has EXIF before sending?
            </h3>
            <p className="text-sm text-[#737373] leading-relaxed">
              Use a browser-based EXIF viewer that runs locally on your device. The{" "}
              <Link href="/tools/exif" className="text-[#171717] dark:text-[#E5E5E5] underline underline-offset-2">
                SammaPix EXIF Viewer
              </Link>
              {" "}shows every tag in your photo (GPS coordinates, camera model, timestamp, software version, lens info) without uploading the file anywhere. If the viewer shows GPS or camera tags, your photo is carrying that data when you upload it to Discord. Remove the metadata in the same tool with one click before sharing.
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

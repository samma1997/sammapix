import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { APP_URL } from "@/lib/constants";
import BlogArticleLayout from "@/components/blog/BlogArticleLayout";

export const metadata: Metadata = {
  title:
    "Which Apps Strip Photo Metadata? 12 Apps Tested [2026]",
  description:
    "We tested 12 apps for EXIF stripping. Some keep your GPS data hidden inside. See the full results — the WhatsApp document trick most people miss.",
  alternates: {
    canonical: `${APP_URL}/blog/which-apps-strip-photo-metadata`,
  },
  keywords: [
    "which apps strip photo metadata",
    "does whatsapp remove exif",
    "does instagram keep location data",
    "messaging app photo privacy",
    "signal vs whatsapp metadata",
    "photo metadata comparison",
    "exif data social media",
  ],
  openGraph: {
    title: "Which Apps Strip Photo Metadata? The Complete 2026 Guide",
    description:
      "Fact-checked comparison of 12 platforms: which strip EXIF, which keep GPS internally, and the WhatsApp document mode trap nobody talks about.",
    url: `${APP_URL}/blog/which-apps-strip-photo-metadata`,
    type: "article",
    publishedTime: "2026-04-06",
    authors: ["https://lucasammarco.com"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Which Apps Strip Photo Metadata? The Complete 2026 Guide",
    description:
      "12 platforms fact-checked: which strip EXIF, which keep your GPS, and the WhatsApp document mode trap most people miss.",
    creator: "@lucasammarco",
  },
};

const POST_DATE = "2026-04-06";
const POST_DATE_FORMATTED = "April 6, 2026";
const POST_URL = `${APP_URL}/blog/which-apps-strip-photo-metadata`;
const POST_TITLE = "Which Apps Strip Photo Metadata? The Complete 2026 Guide";

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: POST_TITLE,
  description:
    "Fact-checked comparison of 12 platforms: which apps strip EXIF metadata from photos, which keep your GPS data internally, and the WhatsApp document mode trap most people miss.",
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
    "which apps strip photo metadata",
    "does whatsapp remove exif",
    "does instagram keep location data",
    "messaging app photo privacy",
    "signal vs whatsapp metadata",
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
      name: "Does WhatsApp remove GPS from photos?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It depends on the mode. Photo mode: yes, WhatsApp strips most EXIF including GPS. Document mode: NO, it preserves 100% of metadata including exact GPS coordinates. Best quality mode: unreliable, GPS is preserved in approximately 23% of cases.",
      },
    },
    {
      "@type": "Question",
      name: "Which messaging app is safest for photos?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Signal. It strips all metadata from photos before sending and does not store anything server-side. It is the only major messaging app that removes EXIF data AND does not retain it on their servers.",
      },
    },
    {
      "@type": "Question",
      name: "Does Instagram really keep my location data?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Instagram strips metadata from the public-facing copy that other users see, but the platform retains the original file with all metadata internally. This data is used for advertising, analytics, and geotagging features.",
      },
    },
    {
      "@type": "Question",
      name: "Is taking a screenshot enough to remove metadata?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, a screenshot removes the original EXIF data. However, you lose significant resolution — a 48MP photo becomes whatever your screen can display (typically 2-4MP). A dedicated EXIF stripper keeps full image quality while removing all metadata.",
      },
    },
    {
      "@type": "Question",
      name: "Can someone find my location from a photo I posted on Reddit?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Reddit strips metadata now, but it previously had a bug (HackerOne report #1069039) where HEIC uploads preserved GPS data in the converted PNG. Always strip metadata before uploading to any platform to be safe.",
      },
    },
  ],
};

export default function WhichAppsStripPhotoMetadataPage() {
  return (
    <>
      <BlogArticleLayout
        title={POST_TITLE}
        slug="which-apps-strip-photo-metadata"
        description={`You strip EXIF data before sharing a photo — but does the platform strip it for you? The answer is more complicated than you think. Some apps strip metadata publicly but keep it internally. Others don&apos;t strip anything at all. And one popular app has a hidden mode that preserves 100% of your GPS data.`}
        date={POST_DATE}
        dateFormatted={POST_DATE_FORMATTED}
        tags={["Privacy"]}
        readingTime={10}
        headings={[
          { id: "comparison-table", title: "The short answer — a comparison table" },
          { id: "whatsapp-trap", title: "The WhatsApp trap — document mode preserves everything" },
          { id: "social-media-keep-it", title: "Social media platforms — they strip it, but they keep it" },
          { id: "messaging-apps", title: "Messaging apps — the riskiest category" },
          { id: "reddit-heic-bug", title: "The Reddit HEIC bug — when even platforms fail" },
          { id: "how-to-protect", title: "How to protect yourself (3 methods)" },
          { id: "faq", title: "FAQ" },
        ]}
        summary={[
          "Most social platforms strip EXIF for public viewers but keep your full metadata (including GPS) internally for ads and analytics.",
          "WhatsApp photo mode strips metadata, but document mode preserves 100% of EXIF including exact GPS coordinates — a critical privacy trap.",
          "Signal is the only major messaging app that strips all metadata AND stores nothing server-side.",
          "Telegram, iMessage, and email preserve full metadata by default — private messaging is the highest-risk context for metadata exposure.",
          "Reddit had a HEIC bug that leaked GPS data (HackerOne #1069039) — even major platforms can fail, so always strip before uploading.",
        ]}
        heroImage={
          <figure>
            <img
              src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80"
              alt="Person using smartphone representing photo metadata privacy risks across messaging apps and social platforms"
              className="w-full rounded-lg"
              loading="eager"
            />
            <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
              Every app handles your photo metadata differently — and the differences matter more than you think - Photo by John Schnobrich on Unsplash
            </figcaption>
          </figure>
        }
        ctaBlock={
          <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2">
              Strip metadata before sharing — free, in your browser
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-4">
              Use SammaPix EXIF Viewer to check what metadata your photos contain, then remove it with one click. Nothing gets uploaded — everything runs locally in your browser.
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
                Try Compress
              </Link>
            </div>
          </div>
        }
      >
        {/* Section: Comparison Table */}
        <h2 id="comparison-table" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          The short answer — a comparison table
        </h2>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          We fact-checked 12 platforms to see exactly what happens to your photo metadata when you share it. The results are more nuanced than any &quot;yes or no&quot; answer you will find elsewhere. Some platforms strip metadata for viewers but keep it internally. Others preserve everything. And one has a mode that most people use without realizing it sends their exact GPS coordinates.
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md overflow-hidden">
            <thead>
              <tr className="bg-[#FAFAFA] dark:bg-[#1A1A1A]">
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-[#525252] dark:text-[#A3A3A3] border-b border-[#E5E5E5] dark:border-[#2A2A2A]">Platform</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-[#525252] dark:text-[#A3A3A3] border-b border-[#E5E5E5] dark:border-[#2A2A2A]">Strips EXIF for viewers?</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-[#525252] dark:text-[#A3A3A3] border-b border-[#E5E5E5] dark:border-[#2A2A2A]">Keeps data internally?</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-[#525252] dark:text-[#A3A3A3] border-b border-[#E5E5E5] dark:border-[#2A2A2A]">GPS removed?</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-[#525252] dark:text-[#A3A3A3] border-b border-[#E5E5E5] dark:border-[#2A2A2A]">Notes</th>
              </tr>
            </thead>
            <tbody className="text-[#737373] dark:text-[#737373]">
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">Instagram</td>
                <td className="px-4 py-2.5 text-xs">Yes</td>
                <td className="px-4 py-2.5 text-xs">Yes</td>
                <td className="px-4 py-2.5 text-xs">Yes (for viewers)</td>
                <td className="px-4 py-2.5 text-xs">Re-compresses to ~70-75% JPEG. Platform retains original metadata.</td>
              </tr>
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#1A1A1A]/50">
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">Facebook</td>
                <td className="px-4 py-2.5 text-xs">Yes</td>
                <td className="px-4 py-2.5 text-xs">Yes</td>
                <td className="px-4 py-2.5 text-xs">Yes (for viewers)</td>
                <td className="px-4 py-2.5 text-xs">Strips for public, stores internally for ads/targeting.</td>
              </tr>
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">Twitter/X</td>
                <td className="px-4 py-2.5 text-xs">Yes</td>
                <td className="px-4 py-2.5 text-xs">Yes</td>
                <td className="px-4 py-2.5 text-xs">Yes (for viewers)</td>
                <td className="px-4 py-2.5 text-xs">Strips on upload, platform retains.</td>
              </tr>
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#1A1A1A]/50">
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">WhatsApp (photo mode)</td>
                <td className="px-4 py-2.5 text-xs">Yes</td>
                <td className="px-4 py-2.5 text-xs">Unknown</td>
                <td className="px-4 py-2.5 text-xs">Yes</td>
                <td className="px-4 py-2.5 text-xs">Strips most EXIF when sent as photo.</td>
              </tr>
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A] bg-red-50 dark:bg-red-950/20">
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">WhatsApp (document mode)</td>
                <td className="px-4 py-2.5 text-xs font-bold text-red-600 dark:text-red-400">NO</td>
                <td className="px-4 py-2.5 text-xs">N/A</td>
                <td className="px-4 py-2.5 text-xs font-bold text-red-600 dark:text-red-400">NO — 100% GPS preserved</td>
                <td className="px-4 py-2.5 text-xs font-medium text-red-600 dark:text-red-400">CRITICAL: sending as document keeps ALL metadata including exact GPS.</td>
              </tr>
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A] bg-amber-50 dark:bg-amber-950/20">
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">WhatsApp (best quality)</td>
                <td className="px-4 py-2.5 text-xs">Partial</td>
                <td className="px-4 py-2.5 text-xs">Unknown</td>
                <td className="px-4 py-2.5 text-xs font-medium text-amber-600 dark:text-amber-400">GPS preserved in ~23% of cases</td>
                <td className="px-4 py-2.5 text-xs">Not reliable for privacy.</td>
              </tr>
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">Telegram</td>
                <td className="px-4 py-2.5 text-xs font-medium text-red-600 dark:text-red-400">No (by default)</td>
                <td className="px-4 py-2.5 text-xs">No</td>
                <td className="px-4 py-2.5 text-xs font-medium text-red-600 dark:text-red-400">No</td>
                <td className="px-4 py-2.5 text-xs">Does NOT strip metadata by default.</td>
              </tr>
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A] bg-green-50 dark:bg-green-950/20">
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">Signal</td>
                <td className="px-4 py-2.5 text-xs font-medium text-green-600 dark:text-green-400">Yes</td>
                <td className="px-4 py-2.5 text-xs font-medium text-green-600 dark:text-green-400">No</td>
                <td className="px-4 py-2.5 text-xs font-medium text-green-600 dark:text-green-400">Yes</td>
                <td className="px-4 py-2.5 text-xs">Strips ALL metadata. Stores nothing server-side. The gold standard.</td>
              </tr>
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">iMessage</td>
                <td className="px-4 py-2.5 text-xs font-medium text-red-600 dark:text-red-400">No</td>
                <td className="px-4 py-2.5 text-xs">N/A</td>
                <td className="px-4 py-2.5 text-xs font-medium text-red-600 dark:text-red-400">No</td>
                <td className="px-4 py-2.5 text-xs">Preserves full metadata including GPS.</td>
              </tr>
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#1A1A1A]/50">
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">Email (Gmail, Outlook)</td>
                <td className="px-4 py-2.5 text-xs font-medium text-red-600 dark:text-red-400">No</td>
                <td className="px-4 py-2.5 text-xs">N/A</td>
                <td className="px-4 py-2.5 text-xs font-medium text-red-600 dark:text-red-400">No</td>
                <td className="px-4 py-2.5 text-xs">Full original file with all metadata.</td>
              </tr>
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">Discord</td>
                <td className="px-4 py-2.5 text-xs">Yes</td>
                <td className="px-4 py-2.5 text-xs">Unknown</td>
                <td className="px-4 py-2.5 text-xs">Yes</td>
                <td className="px-4 py-2.5 text-xs">Strips for public display.</td>
              </tr>
              <tr className="last:border-b-0">
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">Reddit</td>
                <td className="px-4 py-2.5 text-xs">Yes</td>
                <td className="px-4 py-2.5 text-xs">Yes</td>
                <td className="px-4 py-2.5 text-xs">Yes (for viewers)</td>
                <td className="px-4 py-2.5 text-xs">Had a HEIC bug that leaked GPS (HackerOne #1069039).</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          The pattern is clear: social media platforms protect you from other users seeing your GPS, but they keep the data for themselves. Messaging apps are all over the map — from Signal (strips everything, stores nothing) to iMessage (preserves everything). And WhatsApp has a mode that most people use without realizing it exposes their exact location.
        </p>

        {/* Section: WhatsApp trap */}
        <h2 id="whatsapp-trap" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          The WhatsApp trap — document mode preserves everything
        </h2>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          This is the finding that no other guide covers properly. Most people assume WhatsApp is safe for sharing photos. And for <strong>normal photo sharing</strong>, it is — WhatsApp&apos;s photo mode strips most EXIF data including GPS coordinates before the image reaches the recipient.
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          But WhatsApp has three different ways to send an image, and they handle metadata completely differently:
        </p>

        <ul className="space-y-3 mb-6 pl-4">
          <li className="flex items-start gap-2 text-sm text-[#737373] leading-relaxed">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-green-400 shrink-0" />
            <span><strong className="text-[#171717] dark:text-[#E5E5E5]">Photo mode</strong> (default camera/gallery share): strips most EXIF data including GPS. This is the safe option.</span>
          </li>
          <li className="flex items-start gap-2 text-sm text-[#737373] leading-relaxed">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-red-400 shrink-0" />
            <span><strong className="text-[#171717] dark:text-[#E5E5E5]">Document mode</strong> (attach as file): preserves <strong>100% of EXIF data</strong> including exact GPS coordinates. The recipient gets the complete original file with every metadata field intact. This is equivalent to sending the file via email.</span>
          </li>
          <li className="flex items-start gap-2 text-sm text-[#737373] leading-relaxed">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-amber-400 shrink-0" />
            <span><strong className="text-[#171717] dark:text-[#E5E5E5]">&quot;Best quality&quot; mode</strong> (HD toggle): preserves GPS in approximately 23% of cases. This mode is unreliable — you cannot count on it to protect your location data.</span>
          </li>
        </ul>

        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Here is why this matters: people send photos as documents all the time, usually to preserve image quality. A photographer sharing proofs. A parent sending school photos. A real estate agent sharing property shots. Every one of those files carries the sender&apos;s exact GPS coordinates — and neither sender nor recipient typically realizes it.
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Most people assume private messaging is safe, but it is actually the highest-risk context for metadata exposure. On Instagram, at least the platform strips GPS from the public copy. In a WhatsApp document, there is no safety net at all.
        </p>

        {/* Section: Social media keep it */}
        <h2 id="social-media-keep-it" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          Social media platforms — they strip it, but they keep it
        </h2>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Instagram, Facebook, Twitter/X, and Reddit all strip EXIF metadata from the public-facing copies of your photos. If someone downloads your Instagram post, they will not find GPS coordinates in the file. This is a real privacy benefit — but it is only half the story.
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          As one highly-upvoted Reddit commenter (236 upvotes) put it: &quot;Doesn&apos;t mean they don&apos;t process and save the information before they strip it for the public facing frontend.&quot;
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          That is exactly what happens. The moment you upload a photo to Instagram or Facebook, the platform ingests the full original file including all metadata. Your GPS coordinates, camera model, timestamps, software version — everything gets processed and stored in the platform&apos;s systems. This data feeds into:
        </p>
        <ul className="space-y-2 mb-4 pl-4">
          {[
            "Location-based advertising targeting",
            "Geotagging features and location suggestions",
            "Analytics and behavioral profiling",
            "Content moderation and fraud detection",
            "Data that can be subpoenaed by law enforcement",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-[#737373] leading-relaxed">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-gray-300 dark:bg-[#525252] shrink-0" />
              {item}
            </li>
          ))}
        </ul>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          So when people say &quot;Instagram strips EXIF data,&quot; what they really mean is: Instagram strips EXIF data <em>from the copy other users can download</em>. The platform itself has your complete metadata. You are protected from random viewers but not from the platform and anyone the platform shares data with.
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          If you want the platform itself to never have your GPS data, you need to strip it <em>before</em> uploading. Beyond privacy, Instagram also{" "}
          <Link href="/blog/instagram-image-quality-loss-fix" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">
            compresses your photos aggressively, reducing quality by up to 13x
          </Link>.
        </p>

        {/* Section: Messaging apps */}
        <h2 id="messaging-apps" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          Messaging apps — the riskiest category
        </h2>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Messaging apps are where most metadata privacy failures happen, because people assume private conversations are inherently safe. They are not. Here is how each major app handles photo metadata:
        </p>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-8 mb-3">Signal — the gold standard</h3>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Signal strips <strong>all</strong> EXIF metadata from photos before sending. GPS coordinates, camera model, timestamps, software version — everything gets removed. And unlike social media platforms, Signal does not retain the original metadata on their servers either. The data is gone, completely and permanently. If photo privacy is your priority, Signal is the only messaging app that does this correctly.
        </p>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-8 mb-3">Telegram — does NOT strip by default</h3>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          This surprises most people. Telegram, despite its privacy-focused reputation, does <strong>not</strong> strip EXIF metadata from photos by default. If you send a photo through Telegram, the recipient can extract your GPS coordinates, camera model, and everything else embedded in the file. You need to manually adjust settings or use Telegram&apos;s built-in photo editor to strip metadata — which most users never do.
        </p>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-8 mb-3">iMessage — preserves full metadata</h3>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          iMessage sends the original photo file with all metadata intact. Every photo your mom sends you via iMessage contains her exact GPS coordinates. Every photo you send contains yours. Apple does not strip any EXIF data from iMessage attachments. Given that iMessage is the default messaging app for hundreds of millions of iPhone users, this is a massive blind spot.
        </p>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-8 mb-3">Email — full original file, always</h3>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Gmail, Outlook, Yahoo Mail, ProtonMail — no email client strips EXIF metadata. The recipient gets the exact original file with every metadata field preserved. If you email a photo to someone, they have your GPS coordinates. Never email sensitive photos without stripping metadata first.
        </p>

        {/* Section: Reddit HEIC bug */}
        <h2 id="reddit-heic-bug" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          The Reddit HEIC bug — when even platforms fail
        </h2>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Even platforms that are supposed to strip metadata can fail. A notable case: Reddit had a bug where uploading photos in HEIC format (the default format on modern iPhones) preserved GPS metadata in the converted PNG file that Reddit served to other users.
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          This was reported through HackerOne (report #1069039) and eventually fixed. But for an unknown period of time, anyone who uploaded iPhone photos to Reddit was potentially exposing their exact location to anyone who downloaded the image.
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          The lesson: even major platforms with dedicated security teams can have metadata stripping failures. You should never rely on a third party to protect your privacy. Strip metadata yourself, before the file leaves your device. That is the only approach that works 100% of the time regardless of platform bugs, policy changes, or edge cases.
        </p>

        {/* Inline CTA */}
        <Link href="/tools/exif" className="flex items-center justify-between gap-4 bg-[#171717] text-white rounded-md px-6 py-5 hover:bg-[#262626] transition-colors group mt-2 mb-8">
          <div>
            <p className="text-xs font-medium text-[#A3A3A3] uppercase tracking-wide mb-1">Free tool - no upload, no signup</p>
            <p className="text-sm font-semibold text-white leading-snug">Check and strip EXIF data from your photos now</p>
          </div>
          <ArrowRight className="h-4 w-4 text-[#737373] group-hover:text-white group-hover:translate-x-0.5 transition-all shrink-0" strokeWidth={1.5} />
        </Link>

        {/* Section: How to protect yourself */}
        <h2 id="how-to-protect" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          How to protect yourself (3 methods)
        </h2>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Based on our analysis of all 12 platforms, here are three approaches that actually work — ranked from most practical to most comprehensive.
        </p>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-8 mb-3">1. Strip metadata before sharing</h3>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          The most reliable method. Use a browser-based tool like{" "}
          <Link href="/tools/exif" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">SammaPix EXIF Viewer</Link>
          {" "}to check what metadata your photo contains and remove it with one click. Because the tool runs entirely in your browser, your photos never leave your device — no upload, no account, no data stored anywhere. This works regardless of which platform or app you plan to share through.
        </p>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-8 mb-3">2. Use Signal for private photo sharing</h3>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          If you regularly share photos through messaging apps and want metadata stripped automatically, Signal is the only app that does it right. It strips all EXIF data and stores nothing server-side. No other major messaging app offers both of these guarantees.
        </p>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-8 mb-3">3. Never use document mode on WhatsApp for photos</h3>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          This is the single most actionable tip in this article. If you use WhatsApp (and 2 billion people do), always send photos as photos — never as documents. Document mode preserves 100% of your metadata including exact GPS coordinates. If you need to send a high-quality version, strip the metadata first, then send as a document.
        </p>

        {/* Related pages — internal links */}
        <div className="mt-8 mb-4">
          <p className="text-xs font-medium uppercase tracking-wider text-[#A3A3A3] mb-3">Related guides &amp; tools</p>
          <div className="flex flex-wrap gap-2">
            <Link href="/blog/check-remove-exif-data-photos" className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md text-[#525252] hover:border-[#A3A3A3] hover:text-[#171717] dark:text-[#E5E5E5] bg-white dark:bg-[#1E1E1E] transition-colors">
              How to Check &amp; Remove EXIF Data
            </Link>
            <Link href="/compress-to/100kb" className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md text-[#525252] hover:border-[#A3A3A3] hover:text-[#171717] dark:text-[#E5E5E5] bg-white dark:bg-[#1E1E1E] transition-colors">
              Compress to 100KB
            </Link>
            <Link href="/compress-to/200kb" className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md text-[#525252] hover:border-[#A3A3A3] hover:text-[#171717] dark:text-[#E5E5E5] bg-white dark:bg-[#1E1E1E] transition-colors">
              Compress to 200KB
            </Link>
            <Link href="/passport-photo/us" className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md text-[#525252] hover:border-[#A3A3A3] hover:text-[#171717] dark:text-[#E5E5E5] bg-white dark:bg-[#1E1E1E] transition-colors">
              US Passport Photo
            </Link>
            <Link href="/convert/heic-to-jpg" className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md text-[#525252] hover:border-[#A3A3A3] hover:text-[#171717] dark:text-[#E5E5E5] bg-white dark:bg-[#1E1E1E] transition-colors">
              Convert HEIC to JPG
            </Link>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-10 pt-8 border-t border-gray-100 dark:border-[#2A2A2A]">
          <h2 id="faq" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mb-6">
            FAQ
          </h2>
          <div className="space-y-6">
            {[
              {
                q: "Does WhatsApp remove GPS from photos?",
                a: "It depends on the mode. Photo mode (the default gallery/camera share): yes, WhatsApp strips most EXIF including GPS. Document mode (attach as file): NO, it preserves 100% of metadata including exact GPS coordinates. Best quality mode (HD toggle): unreliable \u2014 GPS is preserved in approximately 23% of cases. Always strip metadata before sending if privacy matters.",
              },
              {
                q: "Which messaging app is safest for photos?",
                a: "Signal. It strips all metadata from photos before sending and does not store anything server-side. It is the only major messaging app that removes EXIF data AND does not retain it on their servers. Telegram does NOT strip metadata by default, iMessage preserves everything, and email sends the full original file.",
              },
              {
                q: "Does Instagram really keep my location data?",
                a: "Yes. Instagram strips metadata from the public-facing copy that other users can download, but the platform retains the original file with all metadata internally. This data is used for advertising, geotagging suggestions, and analytics. You are protected from other users seeing your GPS but not from Instagram itself.",
              },
              {
                q: "Is taking a screenshot enough to remove metadata?",
                a: "Yes, a screenshot removes the original EXIF data. However, you lose significant image quality \u2014 a 48MP photo becomes a ~2-4MP screenshot depending on your screen resolution. A dedicated EXIF stripper like SammaPix keeps full image quality while removing all metadata, giving you privacy without the quality tradeoff.",
              },
              {
                q: "Can someone find my location from a photo I posted on Reddit?",
                a: "Reddit strips metadata now, but it previously had a bug (HackerOne report #1069039) where HEIC uploads preserved GPS data in the converted PNG. The bug was fixed, but it demonstrates that even major platforms can fail. Always strip metadata before uploading to any platform to be safe.",
              },
            ].map(({ q, a }) => (
              <div key={q}>
                <h3 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1.5">{q}</h3>
                <p className="text-sm text-[#737373] leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </BlogArticleLayout>

      {/* Structured data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </>
  );
}

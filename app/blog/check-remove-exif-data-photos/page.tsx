import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { APP_URL } from "@/lib/constants";
import BlogArticleLayout from "@/components/blog/BlogArticleLayout";

export const metadata: Metadata = {
  title:
    "How to Check and Remove EXIF Data from Your Photos (2026 Guide)",
  description:
    "Your phone embeds exact GPS coordinates into every photo you take. Learn how to check if your photos contain location data, which platforms strip it, and how to remove EXIF metadata for free.",
  alternates: {
    canonical: `${APP_URL}/blog/check-remove-exif-data-photos`,
  },
  keywords: [
    "remove exif data from photos",
    "check exif data",
    "photo gps metadata",
    "strip location data from photos",
    "exif remover online",
    "remove metadata from photos",
    "photo privacy gps",
    "does instagram remove exif",
  ],
  openGraph: {
    title: "How to Check and Remove EXIF Data from Your Photos (2026 Guide)",
    description:
      "Your phone embeds GPS coordinates accurate to 3 meters into every photo. Learn how to check for it, which apps strip it, and how to remove EXIF data for free.",
    url: `${APP_URL}/blog/check-remove-exif-data-photos`,
    type: "article",
    publishedTime: "2026-04-04",
    authors: ["https://lucasammarco.com"],
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Check and Remove EXIF Data from Your Photos (2026 Guide)",
    description:
      "Your phone embeds GPS coordinates into every photo. Learn how to check, which apps strip it, and how to remove EXIF data for free with SammaPix.",
    creator: "@lucasammarco",
  },
};

const POST_DATE = "2026-04-04";
const POST_DATE_FORMATTED = "April 4, 2026";
const POST_URL = `${APP_URL}/blog/check-remove-exif-data-photos`;
const POST_TITLE = "How to Check and Remove EXIF Data from Your Photos (2026 Guide)";

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: POST_TITLE,
  description:
    "Your phone embeds exact GPS coordinates into every photo you take. Learn how to check if your photos contain location data, which platforms strip it, and how to remove EXIF metadata for free.",
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
    "remove exif data from photos",
    "check exif data",
    "photo gps metadata",
    "strip location data from photos",
    "exif remover online",
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
      name: "Does turning off location services remove EXIF data from existing photos?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Turning off location services for your camera app only prevents new photos from getting GPS coordinates. Existing photos on your device keep whatever metadata was embedded when they were taken. You need to strip EXIF from those files separately.",
      },
    },
    {
      "@type": "Question",
      name: "Do messaging apps like WhatsApp strip EXIF data?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "WhatsApp strips some metadata when sending photos, but not everything. Signal strips all EXIF data. Email preserves all metadata completely. iMessage also preserves full metadata. Always strip EXIF before sharing if privacy matters.",
      },
    },
    {
      "@type": "Question",
      name: "Is taking a screenshot enough to remove metadata?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A screenshot removes EXIF data from the original image, but it significantly degrades image quality. Screenshot resolution depends on your screen, not the original photo resolution. Use a dedicated EXIF remover to keep full image quality while stripping metadata.",
      },
    },
    {
      "@type": "Question",
      name: "Can someone find my home address from a photo?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "If the photo was taken at home with GPS enabled, the EXIF data contains coordinates accurate to about 3 meters. Anyone who downloads the original file can extract those coordinates and pinpoint your address. Always strip EXIF before sharing photos taken at home.",
      },
    },
    {
      "@type": "Question",
      name: "Does SammaPix upload my photos to remove EXIF?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. SammaPix processes everything in your browser using client-side JavaScript. Your photos never leave your device. No server upload, no account required, no data stored.",
      },
    },
  ],
};

export default function CheckRemoveExifDataPhotosPage() {
  return (
    <>
      <BlogArticleLayout
        title={POST_TITLE}
        slug="check-remove-exif-data-photos"
        description={`"How would one check for this information?" - that&apos;s the question 270 people upvoted on a Reddit post about GPS metadata in photos. Most people have no idea their phone embeds exact GPS coordinates into every single photo they take. This guide covers how to check if your photos contain location data, which platforms strip it, and how to remove EXIF metadata completely.`}
        date={POST_DATE}
        dateFormatted={POST_DATE_FORMATTED}
        tags={["Privacy"]}
        readingTime={8}
        headings={[
          { id: "what-is-exif-data", title: "What is EXIF data and why should you care?" },
          { id: "how-to-check-location-data", title: "How to check if your photos contain location data" },
          { id: "platforms-strip-exif", title: "Which apps and platforms strip EXIF data automatically?" },
          { id: "screenshot-trick", title: "The screenshot trick - and why it is not the best solution" },
          { id: "how-to-remove-exif", title: "How to remove EXIF data from photos (3 methods)" },
          { id: "ai-location-without-exif", title: "Can AI find your location even without EXIF data?" },
          { id: "faq", title: "FAQ" },
        ]}
        summary={[
          "Your phone embeds GPS coordinates accurate to ~3 meters into every photo - most people have no idea this data exists.",
          "Checking for EXIF data is easy on any device: iPhone info button, Android details, Windows Properties, Mac Preview, or an online EXIF viewer.",
          "Instagram, Facebook, and Twitter strip EXIF publicly but keep your location data internally - platforms are not a reliable privacy solution.",
          "Screenshots remove metadata but destroy image quality. A dedicated EXIF stripper keeps full resolution while removing all location data.",
          "AI tools like GeoSpy can now identify locations from visual content alone - EXIF removal is necessary but not sufficient for full privacy.",
        ]}
        heroImage={
          <figure>
            <img
              src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80"
              alt="Smartphone displaying a map with location pin representing GPS metadata embedded in phone photos"
              className="w-full rounded-lg"
              loading="eager"
            />
            <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
              Every photo your phone takes can carry your exact GPS coordinates - Photo by Maxim Ilyahov on Unsplash
            </figcaption>
          </figure>
        }
        ctaBlock={
          <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2">
              Check and strip EXIF data - free, in your browser
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-4">
              Use SammaPix EXIF Viewer to see exactly what metadata your photos contain, then strip GPS data or all EXIF with one click. Nothing gets uploaded - everything runs locally.
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
        {/* Section: What is EXIF data */}
        <h2 id="what-is-exif-data" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          What is EXIF data and why should you care?
        </h2>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Every time you take a photo with your phone, the camera app writes a hidden block of data into the image file. This is called EXIF data (Exchangeable Image File Format), and it includes far more than you might expect: camera settings like aperture and shutter speed, the exact timestamp, your device model and software version, and - most critically - your precise GPS coordinates.
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Most smartphones embed location data accurate to approximately 3 meters. That means a photo taken in your living room contains coordinates that point directly to your house. A photo taken at your workplace reveals where you work. A photo at your kid&apos;s school reveals where they go to school. All of this data is invisible when you look at the photo, but trivially easy to extract for anyone who downloads the original file.
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          As one Reddit user put it: &quot;my running app was posting my exact route including where i start aka my front door.&quot; That&apos;s not a hypothetical - it&apos;s the reality for millions of people sharing photos and fitness data without realizing what&apos;s embedded in those files.
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          And it&apos;s not just GPS. Your camera model, timestamps, and software version can all be used to profile you. If someone can see you always shoot with a specific iPhone model, always at certain times of day, always processed through the same editing app - that&apos;s a behavioral fingerprint that links your photos together even across different platforms.
        </p>

        {/* Section: How to check location data */}
        <h2 id="how-to-check-location-data" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          How to check if your photos contain location data
        </h2>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          The first step is knowing whether your photos actually carry GPS metadata. Here&apos;s how to check on every major platform.
        </p>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-8 mb-3">On iPhone</h3>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Open any photo in the Photos app, then tap the <strong>(i)</strong> info button at the bottom. If the photo has GPS data, you&apos;ll see a small map showing exactly where it was taken. If there&apos;s no map section, the photo has no location metadata.
        </p>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-8 mb-3">On Android</h3>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Open the photo in Google Photos or your default gallery app. Swipe up on the image (or tap the three-dot menu and select &quot;Details&quot;). Look for a location section with a map preview. If it&apos;s there, the photo has GPS coordinates embedded.
        </p>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-8 mb-3">On Windows</h3>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Right-click the image file &rarr; Properties &rarr; Details tab. Scroll down to the GPS section. If you see Latitude and Longitude values, the photo contains location data. This is the method most people on Reddit recommend because it requires zero software.
        </p>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-8 mb-3">On Mac</h3>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Open the image in Preview &rarr; Tools &rarr; Show Inspector (or press Cmd+I) &rarr; click the GPS tab (the globe icon). If coordinates are listed, the photo has location data. If the GPS tab shows nothing, the photo is clean.
        </p>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-8 mb-3">Online (fastest method)</h3>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Drop the photo into{" "}
          <Link href="/tools/exif" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">SammaPix EXIF Viewer</Link>
          . It shows every metadata field at once - GPS coordinates, camera model, timestamp, software, everything. And since it runs entirely in your browser, the photo never leaves your device. No upload, no account needed.
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          <strong>Quick note:</strong> if you don&apos;t see any location section using any of these methods, your photo is clean. No GPS data means there&apos;s nothing to worry about for that specific file.
        </p>

        {/* Section: Platforms that strip EXIF */}
        <h2 id="platforms-strip-exif" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          Which apps and platforms strip EXIF data automatically?
        </h2>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          This is where things get confusing - and where most people get a false sense of security. In that Reddit thread, one of the most upvoted comments (236 upvotes) nailed it: just because a platform strips metadata for viewers doesn&apos;t mean the platform hasn&apos;t already saved your location data on their servers.
        </p>

        {/* Platform comparison table */}
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md overflow-hidden">
            <thead>
              <tr className="bg-[#FAFAFA] dark:bg-[#1A1A1A]">
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-[#525252] dark:text-[#A3A3A3] border-b border-[#E5E5E5] dark:border-[#2A2A2A]">Platform</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-[#525252] dark:text-[#A3A3A3] border-b border-[#E5E5E5] dark:border-[#2A2A2A]">Strips EXIF publicly?</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-[#525252] dark:text-[#A3A3A3] border-b border-[#E5E5E5] dark:border-[#2A2A2A]">Keeps data internally?</th>
              </tr>
            </thead>
            <tbody className="text-[#737373] dark:text-[#737373]">
              {[
                { platform: "Instagram", strips: "Yes", keeps: "Yes" },
                { platform: "Facebook", strips: "Yes", keeps: "Yes" },
                { platform: "Twitter/X", strips: "Yes", keeps: "Yes" },
                { platform: "WhatsApp", strips: "Partial (strips on send, not on original)", keeps: "Unknown" },
                { platform: "Telegram", strips: "No (by default)", keeps: "No" },
                { platform: "Email", strips: "No", keeps: "N/A" },
                { platform: "iMessage", strips: "No", keeps: "N/A" },
                { platform: "Discord", strips: "Yes", keeps: "Unknown" },
                { platform: "Reddit", strips: "Yes", keeps: "Yes" },
                { platform: "Signal", strips: "Yes", keeps: "No" },
              ].map(({ platform, strips, keeps }) => (
                <tr key={platform} className="border-b border-[#E5E5E5] dark:border-[#2A2A2A] last:border-b-0">
                  <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">{platform}</td>
                  <td className="px-4 py-2.5 text-xs">{strips}</td>
                  <td className="px-4 py-2.5 text-xs">{keeps}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          The key takeaway: platforms that &quot;strip EXIF&quot; are doing it for the <em>public-facing</em> copy. The platform itself has already ingested your full metadata, including GPS coordinates, the moment you uploaded. They use this data for advertising, geotagging, and analytics. As one highly-upvoted commenter put it: you&apos;re trusting the platform with your location data whether they show it to others or not.
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          And notice the gaps: Telegram, email, and iMessage don&apos;t strip anything. If you send a photo via email to someone you don&apos;t fully trust, they get your exact GPS coordinates. Same with iMessage. Most people assume private messaging is &quot;safe&quot; but it&apos;s actually the highest-risk context for metadata exposure.
        </p>

        {/* Section: Screenshot trick */}
        <h2 id="screenshot-trick" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          The screenshot trick - and why it&apos;s not the best solution
        </h2>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          A popular suggestion on Reddit (44 upvotes): just take a screenshot of the photo before sharing it. The screenshot won&apos;t carry the original EXIF data, so no GPS leak. Technically true, but there are real downsides.
        </p>
        <ul className="space-y-2 mb-4 pl-4">
          {[
            "You lose significant resolution. A 12MP photo screenshotted on a 1080p screen drops to about 2MP. That is a massive quality loss.",
            "Screenshot resolution depends entirely on your screen size, not the original photo. A 48MP photo becomes whatever your phone screen can display.",
            "Screenshots add their own metadata - the timestamp, your device model, and potentially new GPS data from the moment you took the screenshot.",
            "If you are sharing photos for any professional or quality-conscious purpose (selling products, portfolio, prints), screenshots are not acceptable.",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-[#737373] leading-relaxed">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-gray-300 dark:bg-[#525252] shrink-0" />
              {item}
            </li>
          ))}
        </ul>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          The better approach: use a tool that strips EXIF metadata while keeping the original image at full resolution. That way you get privacy <em>and</em> quality - no compromise.
        </p>

        {/* Section: How to remove EXIF data */}
        <h2 id="how-to-remove-exif" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          How to remove EXIF data from photos (3 methods)
        </h2>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-8 mb-3">
          Method 1: Browser-based tool (recommended)
        </h3>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          <Link href="/tools/exif" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">SammaPix EXIF Viewer</Link>{" "}
          lets you drop a photo, see every metadata field (GPS, camera model, timestamps, software - everything), then strip GPS only or remove all EXIF with one click. The cleaned file downloads at full original quality. Nothing gets uploaded to any server - the entire process runs in your browser using client-side JavaScript.
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          This is the fastest method because it works on any device with a browser, requires no installation, no account, and handles the two most common use cases: checking what data exists and removing it.
        </p>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-8 mb-3">
          Method 2: Built-in phone settings (prevention)
        </h3>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          You can prevent GPS data from being embedded in the first place by turning off location access for your camera app.
        </p>
        <ul className="space-y-2 mb-4 pl-4">
          {[
            "iPhone: Settings \u2192 Privacy & Security \u2192 Location Services \u2192 Camera \u2192 Never",
            "Android: Open Camera app \u2192 Settings (gear icon) \u2192 Location tag \u2192 Off",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-[#737373] leading-relaxed">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-gray-300 dark:bg-[#525252] shrink-0" />
              {item}
            </li>
          ))}
        </ul>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Important: this only affects <em>new</em> photos. Every photo you&apos;ve already taken still has whatever GPS data was embedded at capture time. You need to strip those files separately.
        </p>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-8 mb-3">
          Method 3: Desktop built-in tools
        </h3>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          <strong>Windows:</strong> Right-click the image &rarr; Properties &rarr; Details tab &rarr; click &quot;Remove Properties and Personal Information&quot; at the bottom. You can choose to remove all metadata or select specific fields. Works on Windows 10 and 11 with no extra software.
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          <strong>Mac:</strong> Open the image in Preview &rarr; Tools &rarr; Show Inspector &rarr; GPS tab &rarr; you can view the coordinates but Preview doesn&apos;t offer a built-in removal tool. The macOS Photos app is better: select your images, go to File &rarr; Export &rarr; Export Photos, and uncheck &quot;Location Information.&quot; For batch processing, the command-line tool{" "}
          <a href="https://exiftool.org" target="_blank" rel="noopener noreferrer" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">ExifTool</a>{" "}
          is the gold standard.
        </p>

        {/* Section: AI location detection */}
        <h2 id="ai-location-without-exif" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          Can AI find your location even without EXIF data?
        </h2>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          This was one of the most-discussed points in the Reddit thread (157 upvotes), and it&apos;s a legitimate concern. The short answer: yes, and it&apos;s getting better fast.
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          AI tools like{" "}
          <a href="https://geospy.ai" target="_blank" rel="noopener noreferrer" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">GeoSpy</a>
          , Google Gemini, and PimEyes can analyze the visual content of a photo - street signs, architecture style, vegetation type, sun angle, road markings, license plates, power line configurations - and estimate where it was taken. Some of these tools are disturbingly accurate even with no metadata at all.
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          As one commenter noted: &quot;even without EXIF, if your photo shows a specific type of street lamp, a certain chain store in the background, or a particular style of architecture, AI can narrow down the location.&quot; Another pointed out that Gemini was able to identify neighborhoods from photos that had zero metadata.
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          This means EXIF removal is necessary but not sufficient for complete location privacy. If you need maximum protection:
        </p>
        <ul className="space-y-2 mb-4 pl-4">
          {[
            "Strip all EXIF data before sharing (the bare minimum).",
            "Avoid including street signs, building numbers, or unique landmarks in the background of photos you share publicly.",
            "Be aware that distinctive vegetation, weather patterns, and architecture all give location clues to AI systems.",
            "For truly sensitive situations, consider blurring or cropping backgrounds before sharing.",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-[#737373] leading-relaxed">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-gray-300 dark:bg-[#525252] shrink-0" />
              {item}
            </li>
          ))}
        </ul>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          That said, for the vast majority of people, stripping EXIF data is the single most impactful thing you can do. AI-based geolocation requires effort and intent from whoever is trying to find you. EXIF data, on the other hand, hands over your exact coordinates to anyone who right-clicks and checks file properties.
        </p>

        {/* Inline CTA */}
        <Link href="/tools/exif" className="flex items-center justify-between gap-4 bg-[#171717] text-white rounded-md px-6 py-5 hover:bg-[#262626] transition-colors group mt-2 mb-8">
          <div>
            <p className="text-xs font-medium text-[#A3A3A3] uppercase tracking-wide mb-1">Free tool - no upload, no signup</p>
            <p className="text-sm font-semibold text-white leading-snug">Check and strip EXIF data from your photos now</p>
          </div>
          <ArrowRight className="h-4 w-4 text-[#737373] group-hover:text-white group-hover:translate-x-0.5 transition-all shrink-0" strokeWidth={1.5} />
        </Link>

        {/* FAQ Section */}
        <div className="mt-10 pt-8 border-t border-gray-100 dark:border-[#2A2A2A]">
          <h2 id="faq" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mb-6">
            FAQ
          </h2>
          <div className="space-y-6">
            {[
              {
                q: "Does turning off location services remove EXIF data from existing photos?",
                a: "No. Turning off location services only prevents new photos from getting GPS coordinates. Every photo you have already taken keeps whatever metadata was embedded at capture time. You need to use an EXIF remover to strip GPS data from existing files.",
              },
              {
                q: "Do messaging apps like WhatsApp strip EXIF data?",
                a: "WhatsApp strips some metadata when sending photos, but not all of it. Signal strips everything and keeps nothing server-side. Email preserves all metadata completely - the recipient gets the full original file with GPS intact. iMessage also preserves full metadata. If privacy matters, strip EXIF before sending through any channel.",
              },
              {
                q: "Is taking a screenshot enough to remove metadata?",
                a: "Technically yes - a screenshot won\u2019t carry the original photo\u2019s EXIF data. But you lose significant image quality because screenshot resolution depends on your screen, not the original photo. A 48MP photo becomes a ~2MP screenshot. Use a dedicated EXIF remover to keep full image quality while stripping all metadata.",
              },
              {
                q: "Can someone find my home address from a photo?",
                a: "If the photo was taken at home with GPS enabled (which is the default on most phones), the EXIF data contains coordinates accurate to about 3 meters. Anyone who downloads the original file can extract those coordinates and pinpoint your address on a map. Always strip EXIF before sharing photos taken at or near your home.",
              },
              {
                q: "Does SammaPix upload my photos to remove EXIF?",
                a: "No. SammaPix processes everything in your browser using client-side JavaScript. Your photos never leave your device. There is no server upload, no account required, and no data is stored anywhere. The tool reads the EXIF data locally and produces a clean copy for download.",
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

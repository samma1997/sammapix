import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Shield, MapPin, Camera, AlertTriangle } from "lucide-react";
import { APP_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "How to Remove GPS Location from Photos Before Posting Online (Free)",
  description:
    "Every photo you take contains hidden GPS coordinates. Learn why that is a privacy risk and how to remove GPS data from photos online for free — no software needed.",
  alternates: {
    canonical: `${APP_URL}/blog/remove-gps-from-photos`,
  },
  keywords: [
    "remove GPS from photos online free",
    "remove GPS data from photos",
    "delete location data from photos",
    "strip EXIF GPS metadata",
    "remove location from image before posting",
  ],
  openGraph: {
    title: "How to Remove GPS Location from Photos Before Posting Online (Free)",
    description:
      "Every photo you take contains hidden GPS coordinates. Learn why that is a privacy risk and how to remove GPS data from photos for free.",
    url: `${APP_URL}/blog/remove-gps-from-photos`,
    type: "article",
    publishedTime: "2026-02-24",
  },
};

export default function RemoveGpsFromPhotosPage() {
  const postUrl = `${APP_URL}/blog/remove-gps-from-photos`;
  const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent("How to Remove GPS Location from Photos Before Posting Online (Free)")}&url=${encodeURIComponent(postUrl)}&via=lucasammarco`;
  const linkedinShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`;

  return (
    <div className="py-12 px-4 sm:px-6 bg-white dark:bg-[#191919] min-h-screen">
      <div className="max-w-2xl mx-auto">

        {/* Back link */}
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
              <span className="text-[10px] font-medium bg-[#F5F5F5] dark:bg-[#252525] text-purple-700 dark:text-purple-400 px-2 py-0.5 rounded border border-[#E5E5E5] dark:border-[#333] uppercase tracking-wide">
                Privacy
              </span>
              <span className="text-[10px] text-[#A3A3A3] dark:text-[#737373]">
                Feb 24, 2026
              </span>
              <span className="text-[10px] text-[#A3A3A3] dark:text-[#737373]">
                &middot; 6 min read
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-[#E5E5E5] leading-snug tracking-tight mb-4">
              How to Remove GPS Location from Photos Before Posting Online (Free)
            </h1>
            <p className="text-base text-gray-500 dark:text-[#A3A3A3] leading-relaxed">
              Every photo your smartphone takes includes your exact GPS coordinates embedded in the file. Most people have no idea. Here is what that data reveals, why it matters, and how to strip it in seconds before you share anything online.
            </p>
          </header>

          {/* Privacy risk callout */}
          <div className="flex items-start gap-3 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 rounded-md px-4 py-4 mb-8">
            <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-500 mt-0.5 shrink-0" strokeWidth={1.5} />
            <p className="text-sm text-amber-800 dark:text-amber-300 leading-relaxed">
              A photo taken at your home contains GPS coordinates accurate to within a few meters. Anyone who downloads that photo can extract the exact address where you live.
            </p>
          </div>

          <div className="prose-custom space-y-0">

            <figure className="my-8">
              <img
                src="https://images.unsplash.com/photo-1563986768609-322da13575f2?w=800&q=80"
                alt="Digital privacy and security concept representing hidden data in photos"
                className="w-full rounded-lg"
                loading="lazy"
              />
              <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
                Your photos carry more data than you think — Photo by Scott Webb on Unsplash
              </figcaption>
            </figure>

            {/* Section 1 */}
            <h2 className="text-lg font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3">
              What is GPS metadata and where does it come from?
            </h2>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              Every digital photo contains a hidden block of data called <a href="https://en.wikipedia.org/wiki/Exif" target="_blank" rel="noopener noreferrer" className="text-[#6366F1] hover:underline">EXIF (Exchangeable Image File Format)</a>. This metadata is written by your camera or smartphone at the moment you take the shot, and it travels with the file everywhere you copy or upload it.
            </p>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              EXIF data includes useful information like camera model, lens settings, shutter speed, and ISO. But when location services are enabled on your phone — which they are by default on most devices — it also records GPS coordinates: latitude, longitude, and often altitude, accurate to within a few meters.
            </p>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              This data is invisible when you look at the photo normally. You cannot see it in the image itself. But it is embedded in the file, and any tool that reads EXIF metadata — including free online tools, desktop software, and command-line utilities — can extract it instantly.
            </p>

            {/* Metadata fields list */}
            <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md divide-y divide-[#E5E5E5] dark:divide-[#2A2A2A] mb-6 mt-4">
              {[
                { icon: MapPin, label: "GPS Coordinates", detail: "Latitude and longitude, accurate to ~3 meters" },
                { icon: Camera, label: "Device & Lens", detail: "Exact phone model, camera app, lens focal length" },
                { icon: Shield, label: "Timestamp", detail: "Date and time the photo was taken, down to the second" },
              ].map(({ icon: Icon, label, detail }) => (
                <div key={label} className="flex items-center gap-3 px-4 py-3">
                  <Icon className="h-4 w-4 text-[#A3A3A3] shrink-0" strokeWidth={1.5} />
                  <div>
                    <span className="text-xs font-medium text-gray-700 dark:text-[#E5E5E5]">{label}</span>
                    <span className="text-xs text-gray-400 dark:text-[#737373] ml-2">{detail}</span>
                  </div>
                </div>
              ))}
            </div>

            <figure className="my-8">
              <img
                src="https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&q=80"
                alt="Smartphone camera being used to take a photo, embedding GPS metadata"
                className="w-full rounded-lg"
                loading="lazy"
              />
              <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
                Every smartphone photo embeds GPS coordinates by default — Photo by Rodion Kutsaiev on Unsplash
              </figcaption>
            </figure>

            {/* Section 2 */}
            <h2 className="text-lg font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3">
              Real-world privacy risks from GPS photo metadata
            </h2>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              The risks are not theoretical. There are documented cases where GPS metadata in photos led to serious privacy breaches.
            </p>

            <h3 className="text-sm font-semibold text-gray-800 dark:text-[#D4D4D4] mt-6 mb-2">
              Home address exposure
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              When you photograph something in your home — a product you are selling on Craigslist or Facebook Marketplace, a pet, a room — and upload it without removing metadata, the GPS coordinates in that file reveal your home address to anyone who downloads it. Stalking cases have been traced back to exactly this scenario.
            </p>

            <h3 className="text-sm font-semibold text-gray-800 dark:text-[#D4D4D4] mt-6 mb-2">
              Celebrity and journalist location tracking
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              In 2012, Vice Media published photos of John McAfee while he was in hiding in Central America. The iPhone photos embedded GPS coordinates in the EXIF data, revealing his exact location to authorities. More recently, journalists reporting in conflict zones have been exposed because their published photos contained GPS data showing where they were operating.
            </p>

            <h3 className="text-sm font-semibold text-gray-800 dark:text-[#D4D4D4] mt-6 mb-2">
              Workplace and routine mapping
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              A series of photos posted over time can map your entire daily routine. GPS timestamps in photo series reveal where you work, where your children go to school, and the routes you travel regularly. This is the kind of data that stalkers, abusive ex-partners, and bad actors actively look for.
            </p>

            <h3 className="text-sm font-semibold text-gray-800 dark:text-[#D4D4D4] mt-6 mb-2">
              Military and operational security
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              In 2007, US Army soldiers photographed newly delivered Apache helicopters in Iraq and posted the photos online. The GPS metadata revealed the exact coordinates of the military base. The Army had to update its digital photography policy after the incident.
            </p>

            {/* Section 3 */}
            <h2 className="text-lg font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3">
              Do social media platforms remove GPS metadata automatically?
            </h2>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              Some platforms do strip EXIF data when you upload — Instagram, Facebook, and Twitter/X all remove most metadata from uploaded photos on their servers. However, this is not a privacy guarantee for several reasons:
            </p>
            <ul className="space-y-2 mb-4 pl-4">
              {[
                "Platform policies change. A platform that strips metadata today may stop doing so in a future update.",
                "Many platforms do not strip metadata. Forums, marketplaces, classified ad sites, and personal blogs often serve files as-is.",
                "The photo exists in its original form on your device and in your cloud backup, from where it can be shared directly.",
                "You may share photos via email, messaging apps, or file transfer — bypassing any platform-level stripping entirely.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-gray-300 dark:bg-[#525252] shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              The safe approach is to remove GPS metadata from the source file before sharing it anywhere. That way it does not matter which platform you use or how they handle uploads.
            </p>

            {/* Section 4 — Step by step */}
            <h2 className="text-lg font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3">
              How to remove GPS data from photos using SammaPix EXIF Lens
            </h2>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              <Link href="/tools/exif" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#525252] hover:decoration-gray-600 dark:hover:decoration-[#A3A3A3] transition-colors">
                SammaPix EXIF Lens
              </Link>{" "}
              is a free, browser-based tool that reads and strips EXIF metadata from your photos entirely on your device. Your files never leave your browser — no upload to any server, no cloud processing, no account required.
            </p>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-4">
              Here is the complete process, step by step.
            </p>

            {/* Step list */}
            <div className="space-y-4 mb-6">
              {[
                {
                  step: "1",
                  title: "Open EXIF Lens",
                  body: "Go to sammapix.com/tools/exif. No account needed, no signup form. The tool loads entirely in your browser.",
                },
                {
                  step: "2",
                  title: "Drop your photos",
                  body: "Drag and drop one or more photos onto the drop zone, or click to select files. JPG, JPEG, and TIFF files are supported — these are the formats that contain EXIF GPS data. PNG files typically do not embed GPS data.",
                },
                {
                  step: "3",
                  title: "Inspect the metadata",
                  body: "EXIF Lens displays a full breakdown of all metadata fields in the file. Look for the GPS section — you will see GPSLatitude, GPSLongitude, and GPSAltitude if location data is present. This is the data you are about to remove.",
                },
                {
                  step: "4",
                  title: "Strip GPS data and download",
                  body: 'Click "Remove EXIF" to strip all GPS fields (and optionally all other metadata). Download the clean file. The original on your device is untouched — only the downloaded copy has the metadata removed.',
                },
                {
                  step: "5",
                  title: "Verify the result",
                  body: "Drop the downloaded file back into EXIF Lens to confirm. The GPS section should be gone. You can now share the file without worrying about location data exposure.",
                },
              ].map(({ step, title, body }) => (
                <div key={step} className="flex gap-4">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#F5F5F5] dark:bg-[#252525] border border-[#E5E5E5] dark:border-[#333] flex items-center justify-center mt-0.5">
                    <span className="text-[11px] font-semibold text-gray-600 dark:text-[#A3A3A3]">{step}</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800 dark:text-[#E5E5E5] mb-1">{title}</p>
                    <p className="text-sm text-gray-500 dark:text-[#737373] leading-relaxed">{body}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA inline */}
            <Link
              href="/tools/exif"
              className="flex items-center justify-between gap-4 bg-[#171717] text-white rounded-md px-6 py-5 hover:bg-[#262626] transition-colors group mt-6 mb-8"
            >
              <div>
                <p className="text-xs font-medium text-[#A3A3A3] uppercase tracking-wide mb-1">
                  Free tool — no signup
                </p>
                <p className="text-sm font-semibold text-white leading-snug">
                  Remove GPS from your photos now — SammaPix EXIF Lens
                </p>
              </div>
              <ArrowRight
                className="h-4 w-4 text-[#737373] group-hover:text-white group-hover:translate-x-0.5 transition-all shrink-0"
                strokeWidth={1.5}
              />
            </Link>

            {/* Section 5 */}
            <h2 className="text-lg font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3">
              Other methods to remove GPS from photos
            </h2>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              If you prefer to work with your files locally or need to process large batches, there are alternatives.
            </p>

            <h3 className="text-sm font-semibold text-gray-800 dark:text-[#D4D4D4] mt-6 mb-2">
              Windows: File Properties
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              Right-click the image, select Properties, go to the Details tab, and click "Remove Properties and Personal Information" at the bottom. You can choose to remove all metadata or specific fields. This method works for single files and is built into Windows 10 and 11 — no software to install.
            </p>

            <h3 className="text-sm font-semibold text-gray-800 dark:text-[#D4D4D4] mt-6 mb-2">
              macOS: Preview
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              macOS Preview does not strip EXIF data when you export a photo. For reliable GPS removal on Mac, use a dedicated tool. Image Capture in macOS does not remove metadata either. The most reliable free option on Mac is to export via Photos app with the "Location" option disabled, or use a browser-based tool like SammaPix EXIF Lens.
            </p>

            <h3 className="text-sm font-semibold text-gray-800 dark:text-[#D4D4D4] mt-6 mb-2">
              iPhone: Settings
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              You can prevent GPS data from being written in the first place. Go to Settings &rarr; Privacy &amp; Security &rarr; <a href="https://support.apple.com/guide/iphone/control-the-location-information-you-share-iph3dd5f9be/ios" target="_blank" rel="noopener noreferrer" className="text-[#6366F1] hover:underline">Location Services</a> &rarr; Camera, and set it to "Never." This stops your camera app from embedding GPS coordinates in new photos. To strip GPS from existing photos before sharing, use the Share sheet and enable "Strip location data" in iOS 17+.
            </p>

            <h3 className="text-sm font-semibold text-gray-800 dark:text-[#D4D4D4] mt-6 mb-2">
              Command line: ExifTool
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              For technical users and batch processing, ExifTool is the standard: <code className="text-xs bg-[#F5F5F5] dark:bg-[#252525] px-1.5 py-0.5 rounded text-gray-700 dark:text-[#D4D4D4]">exiftool -gps:all= -overwrite_original photo.jpg</code> removes all GPS tags from a file. Use <code className="text-xs bg-[#F5F5F5] dark:bg-[#252525] px-1.5 py-0.5 rounded text-gray-700 dark:text-[#D4D4D4]">-r</code> flag for recursive directory processing. Powerful but requires installation and command-line comfort.
            </p>

            <figure className="my-8">
              <img
                src="https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800&q=80"
                alt="Location pin on a map representing GPS coordinates embedded in photos"
                className="w-full rounded-lg"
                loading="lazy"
              />
              <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
                GPS coordinates in your photos can pinpoint your exact location — Photo by Capturing the human heart on Unsplash
              </figcaption>
            </figure>

            {/* Section 6 */}
            <h2 className="text-lg font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3">
              Compress and clean in one step
            </h2>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              If you are preparing photos for a website or social post, you likely want to both strip GPS metadata and reduce file size before uploading. Doing both separately doubles the work.
            </p>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              SammaPix handles both in a single workflow.{" "}
              <Link href="/tools/compress" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#525252] hover:decoration-gray-600 dark:hover:decoration-[#A3A3A3] transition-colors">
                The compress tool
              </Link>{" "}
              strips EXIF metadata as part of the compression process — when you compress a photo, the output file contains no GPS data and no other metadata that could identify you or your location. You get a lighter file and a cleaner file in one download, entirely processed in your browser.
            </p>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              Use{" "}
              <Link href="/tools/exif" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#525252] hover:decoration-gray-600 dark:hover:decoration-[#A3A3A3] transition-colors">
                EXIF Lens
              </Link>{" "}
              when you need to inspect metadata first, remove it without re-compressing, or verify that a file is clean before sharing. Use the compress tool when you want the full optimization pipeline — metadata removal, compression, and optional WebP conversion — in one pass.
            </p>

            {/* FAQ */}
            <div className="mt-10 pt-8 border-t border-gray-100 dark:border-[#2A2A2A]">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-[#E5E5E5] mb-6">
                FAQ
              </h2>
              <div className="space-y-6">
                {[
                  {
                    q: "Does removing GPS data change the photo quality?",
                    a: "No. EXIF metadata is stored separately from the image pixels. Removing it does not alter the visual content of the photo in any way. The image will look identical — the file will simply be slightly smaller because the metadata block is gone.",
                  },
                  {
                    q: "What about screenshots — do they contain GPS data?",
                    a: "Screenshots taken on desktop computers generally contain no GPS data. Screenshots taken on a smartphone may contain some device metadata but typically not GPS coordinates unless the OS explicitly writes them. The main risk is photos taken with a camera app (including the built-in camera on a phone) with location services enabled.",
                  },
                  {
                    q: "Can I remove GPS data from a JPEG without re-saving it?",
                    a: "Yes. EXIF metadata can be stripped from a JPEG without re-encoding the image data. Tools like EXIF Lens and ExifTool do this correctly — they remove the metadata block without touching the compressed image payload, so there is no quality loss from re-compression.",
                  },
                  {
                    q: "Does WhatsApp or iMessage strip GPS when sending photos?",
                    a: "WhatsApp strips EXIF data (including GPS) when sending photos through the app. iMessage does not strip metadata — a photo sent via iMessage retains all original EXIF data including GPS coordinates. This is why it matters to strip GPS before sending, not just before posting publicly.",
                  },
                ].map(({ q, a }) => (
                  <div key={q}>
                    <h3 className="text-sm font-semibold text-gray-800 dark:text-[#E5E5E5] mb-1.5">{q}</h3>
                    <p className="text-sm text-gray-500 dark:text-[#737373] leading-relaxed">{a}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Related tool CTA */}
          <div className="mt-10">
            <Link
              href="/tools/exif"
              className="flex items-center justify-between gap-4 bg-[#171717] text-white rounded-md px-6 py-5 hover:bg-[#262626] transition-colors group"
            >
              <div>
                <p className="text-xs font-medium text-[#A3A3A3] uppercase tracking-wide mb-1">
                  Free tool
                </p>
                <p className="text-sm font-semibold text-white leading-snug">
                  Try SammaPix EXIF Lens — remove GPS from photos in your browser
                </p>
              </div>
              <ArrowRight
                className="h-4 w-4 text-[#737373] group-hover:text-white group-hover:translate-x-0.5 transition-all shrink-0"
                strokeWidth={1.5}
              />
            </Link>
          </div>

          {/* Share */}
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
                <svg role="img" viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-label="Share on X (Twitter)">
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
                <svg role="img" viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-label="Share on LinkedIn">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                Share on LinkedIn
              </a>
            </div>
          </div>

          {/* End CTA */}
          <div className="mt-8 pt-8 border-t border-gray-100 dark:border-[#2A2A2A]">
            <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-6">
              <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2">
                Try SammaPix free
              </h3>
              <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-4">
                Compress, convert to WebP, strip GPS and EXIF metadata — no signup needed. 100% client-side, your images never leave your browser.
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
              >
                Start optimizing
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
              {[
                {
                  href: "/blog/remove-exif-data-photos",
                  tag: "Privacy",
                  tagColor: "text-purple-700",
                  title: "How to Remove EXIF Data from Photos Online for Free",
                },
                {
                  href: "/blog/compress-images-for-website",
                  tag: "Performance",
                  tagColor: "text-orange-700",
                  title: "How to Compress Images for Web Without Losing Quality",
                },
                {
                  href: "/blog/travel-map-gps-photos",
                  tag: "Tools",
                  tagColor: "text-blue-700",
                  title: "Turn Your GPS Photos into a Travel Map (Free Tool)",
                },
              ].map(({ href, tag, tagColor, title }) => (
                <Link key={href} href={href} className="flex items-start gap-3 group">
                  <span className={`text-xs font-medium uppercase tracking-wide shrink-0 mt-0.5 ${tagColor}`}>
                    {tag}
                  </span>
                  <span className="text-sm text-gray-600 dark:text-[#A3A3A3] group-hover:text-gray-900 dark:group-hover:text-[#E5E5E5] transition-colors">
                    {title}
                  </span>
                </Link>
              ))}
            </div>
          </div>

        </article>

        {/* Article schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              headline: "How to Remove GPS Location from Photos Before Posting Online (Free)",
              description:
                "Every photo you take contains hidden GPS coordinates. Learn why that is a privacy risk and how to remove GPS data from photos online for free — no software needed.",
              url: `${APP_URL}/blog/remove-gps-from-photos`,
              datePublished: "2026-02-24",
              dateModified: "2026-02-24",
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
                "@id": `${APP_URL}/blog/remove-gps-from-photos`,
              },
              keywords: [
                "remove GPS from photos online free",
                "remove GPS data from photos",
                "strip EXIF GPS metadata",
                "delete location data from photos",
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: APP_URL },
                { "@type": "ListItem", position: 2, name: "Blog", item: `${APP_URL}/blog` },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: "How to Remove GPS Location from Photos Before Posting Online (Free)",
                  item: `${APP_URL}/blog/remove-gps-from-photos`,
                },
              ],
            }),
          }}
        />

      </div>
    </div>
  );
}

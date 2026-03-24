import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, AlertTriangle, Shield, Eye, MapPin } from "lucide-react";
import { APP_URL } from "@/lib/constants";
import BlogArticleLayout from "@/components/blog/BlogArticleLayout";

export const metadata: Metadata = {
  title:
    "How to Remove EXIF Data and Protect Your Privacy | SammaPix Blog",
  description:
    "Every photo you share contains hidden metadata that can reveal your location, device, and identity. Learn what EXIF data is, why it is a privacy risk, and how to strip it for free.",
  alternates: {
    canonical: `${APP_URL}/blog/remove-exif-protect-privacy`,
  },
  keywords: [
    "remove exif data",
    "photo privacy",
    "gps data in photos",
    "strip metadata from images",
    "exif remover online free",
    "remove metadata from photo",
    "photo metadata privacy risk",
  ],
  openGraph: {
    title: "How to Remove EXIF Data and Protect Your Privacy",
    description:
      "Your photos reveal more than you think. Hidden EXIF metadata includes your GPS location, device serial number, and timestamp. Here is how to strip it- for free, in seconds.",
    url: `${APP_URL}/blog/remove-exif-protect-privacy`,
    type: "article",
    publishedTime: "2026-02-06",
    authors: ["https://lucasammarco.com"],
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Remove EXIF Data and Protect Your Privacy",
    description:
      "Your photos reveal more than you think. EXIF metadata includes GPS location, device, and timestamps. Learn how to strip it free with SammaPix EXIF Viewer.",
    creator: "@lucasammarco",
  },
};

const POST_DATE = "2026-02-06";
const POST_DATE_FORMATTED = "February 6, 2026";
const POST_URL = `${APP_URL}/blog/remove-exif-protect-privacy`;
const POST_TITLE = "How to Remove EXIF Data and Protect Your Privacy";

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: POST_TITLE,
  description:
    "Every photo you share contains hidden metadata that can reveal your location, device, and identity. Learn what EXIF data is, why it is a privacy risk, and how to strip it for free.",
  url: POST_URL,
  datePublished: POST_DATE,
  dateModified: POST_DATE,
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
    "@id": POST_URL,
  },
  keywords: [
    "remove exif data",
    "photo privacy",
    "gps data in photos",
    "strip metadata from images",
    "exif remover online free",
  ],
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Remove EXIF Data from Photos Using SammaPix EXIF Viewer",
  description:
    "Step-by-step guide to stripping EXIF metadata- including GPS location- from your photos for free using SammaPix EXIF Viewer.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Open EXIF Viewer",
      text: "Go to sammapix.com/tools/exif in your browser. No account or signup is required.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Drop your photos",
      text: "Drag and drop one or more photos onto the drop zone, or click to select files. Supported formats include JPG and TIFF.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Inspect the metadata",
      text: "Review the full EXIF breakdown. Look for the GPS section showing GPSLatitude, GPSLongitude, and GPSAltitude fields.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Remove EXIF and download",
      text: "Click Remove EXIF to strip all GPS fields and metadata. Download the clean file- the original on your device is untouched.",
    },
    {
      "@type": "HowToStep",
      position: 5,
      name: "Verify the result",
      text: "Drop the downloaded file back into EXIF Viewer to confirm the GPS section is gone before sharing.",
    },
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

export default function RemoveExifProtectPrivacyPage() {
  return (
    <>
      <BlogArticleLayout
        title={POST_TITLE}
        slug="remove-exif-protect-privacy"
        description="Every photo you share carries a hidden passenger - EXIF metadata that can reveal exactly where you were, what device you used, and when the shot was taken. Most people have no idea it exists. Here is everything you need to know, and how to remove it in seconds."
        date={POST_DATE}
        dateFormatted={POST_DATE_FORMATTED}
        tags={["Privacy"]}
        readingTime={8}
        headings={[
          { id: "what-is-exif-data", title: "What is EXIF data?" },
          { id: "why-exif-privacy-risk", title: "Why EXIF data is a real privacy risk" },
          { id: "social-platforms-strip", title: "Do social platforms strip EXIF automatically?" },
          { id: "how-to-remove-exif", title: "How to remove EXIF data using SammaPix EXIF Viewer" },
          { id: "exif-privacy-tips", title: "EXIF privacy tips for social media sharing" },
          { id: "alternative-methods", title: "Alternative methods for removing EXIF data" },
          { id: "faq", title: "FAQ" },
        ]}
        summary={[
          "EXIF metadata in photos includes GPS coordinates, camera model, timestamps, and device serial numbers - all invisible but extractable by anyone.",
          "Real cases like the John McAfee incident and military base exposure demonstrate the serious privacy risks of GPS metadata in photos.",
          "Social platforms like Instagram strip EXIF data, but email, iMessage, marketplaces, and direct file sharing do not.",
          "SammaPix EXIF Viewer strips metadata entirely in your browser with no upload, no server, and no account required.",
          "Building EXIF removal into your sharing workflow is the only reliable way to protect location privacy across all platforms.",
        ]}
        heroImage={
          <figure>
            <img
              src="https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&q=80"
              alt="Digital security concept with lock icon and data protection visualization"
              className="w-full rounded-lg"
              loading="eager"
            />
            <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
              Hidden metadata in photos is a real privacy risk most people overlook - Photo by FLY:D on Unsplash
            </figcaption>
          </figure>
        }
        ctaBlock={
          <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2">
              Remove EXIF data from your photos- free
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-4">
              SammaPix EXIF Viewer reads and strips metadata entirely in your browser. No upload, no signup, no file size limits. Your photos never leave your device.
            </p>
            <Link
              href="/tools/exif"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            >
              Open EXIF Viewer
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>
        }
      >
        {/* Privacy warning callout */}
        <div className="flex items-start gap-3 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 rounded-md px-4 py-4 mb-8">
          <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-500 mt-0.5 shrink-0" strokeWidth={1.5} />
          <p className="text-sm text-amber-800 dark:text-amber-300 leading-relaxed">
            A photo taken at your home and shared online can reveal your precise home address to anyone who downloads it- even if it is posted on a private listing or a public social feed. GPS metadata embedded in the file does this automatically.
          </p>
        </div>

        <h2 id="what-is-exif-data" className="text-lg font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3">
          What is EXIF data?
        </h2>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          EXIF stands for Exchangeable Image File Format. It is a standard for embedding technical metadata directly inside digital image files- specifically JPEG, TIFF, and RAW formats. The standard was developed by the Japan Electronic Industries Development Association in 1995 and is now used by virtually every digital camera and smartphone camera app in the world.
        </p>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          When you press the shutter, the camera writes a block of data into the file alongside the image pixels. This block is invisible when you view the photo but can be read by any software that knows where to look- including free online tools, desktop apps, and command-line utilities. The full technical specification is documented on the{" "}
          <a href="https://en.wikipedia.org/wiki/Exif" target="_blank" rel="noopener noreferrer" className="text-[#6366F1] hover:underline">EXIF Wikipedia page</a>.
        </p>

        {/* EXIF fields grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 mt-4">
          {[
            { icon: MapPin, title: "GPS Coordinates", detail: "Latitude, longitude, altitude- accurate to within a few meters on modern smartphones." },
            { icon: Eye, title: "Camera & Device", detail: "Camera make, model, lens type, focal length, aperture, shutter speed, ISO." },
            { icon: Shield, title: "Timestamp", detail: "Exact date and time the photo was taken, often to the millisecond." },
            { icon: AlertTriangle, title: "Device Serial / Software", detail: "Camera serial number, firmware version, editing software used (e.g. Lightroom, Photoshop)." },
          ].map(({ icon: Icon, title, detail }) => (
            <div key={title} className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md px-4 py-3 flex items-start gap-3">
              <Icon className="h-4 w-4 text-[#A3A3A3] shrink-0 mt-0.5" strokeWidth={1.5} />
              <div>
                <p className="text-xs font-semibold text-gray-800 dark:text-[#E5E5E5] mb-0.5">{title}</p>
                <p className="text-xs text-gray-500 dark:text-[#737373] leading-relaxed">{detail}</p>
              </div>
            </div>
          ))}
        </div>

        <h2 id="why-exif-privacy-risk" className="text-lg font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3">
          Why EXIF data is a real privacy risk
        </h2>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The risks are not hypothetical. There are documented, high-profile cases where EXIF metadata led directly to serious privacy breaches.
        </p>

        <h3 className="text-sm font-semibold text-gray-800 dark:text-[#D4D4D4] mt-6 mb-2">Home address from a Marketplace listing</h3>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Selling something on Craigslist, Facebook Marketplace, or Vinted? If you photograph the item at home and upload the original file, the GPS coordinates in the EXIF data reveal your home address to every buyer- and everyone else who downloads the image. Stalking cases have been traced back to exactly this scenario.
        </p>

        <h3 className="text-sm font-semibold text-gray-800 dark:text-[#D4D4D4] mt-6 mb-2">The John McAfee case (2012)</h3>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Vice Media published an exclusive interview with John McAfee while he was in hiding in Guatemala. The accompanying iPhone photos had GPS coordinates embedded in their EXIF data. The coordinates were publicly readable in the published images, revealing McAfee&apos;s exact location to authorities. He was found and detained shortly after. The error- leaving GPS metadata intact in published photos- was entirely avoidable.
        </p>

        <h3 className="text-sm font-semibold text-gray-800 dark:text-[#D4D4D4] mt-6 mb-2">Military operational security</h3>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          In 2007, US Army soldiers photographed newly delivered Apache helicopters at a base in Iraq and posted the images to the internet. The GPS metadata embedded in the photos revealed the exact coordinates of the military base. The incident prompted the US Army to update its digital photography and social media policy. The same risk applies to anyone working in a sensitive location.
        </p>

        <h3 className="text-sm font-semibold text-gray-800 dark:text-[#D4D4D4] mt-6 mb-2">Routine and pattern exposure</h3>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          A series of photos posted to a public social account over time can map an entire daily routine. GPS timestamps reveal where you work, where your children attend school, and what routes you travel regularly. This kind of pattern data is exactly what stalkers and abusive ex-partners look for- and it is sitting in plain sight for anyone who knows to look at EXIF metadata.
        </p>

        <figure className="my-8">
          <img
            src="https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&q=80"
            alt="Person taking a photo with a smartphone outdoors"
            className="w-full rounded-lg"
            loading="lazy"
          />
          <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
            Every smartphone photo can carry precise GPS coordinates in its metadata - Photo by Jonas Leupe on Unsplash
          </figcaption>
        </figure>

        <h2 id="social-platforms-strip" className="text-lg font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3">
          Do social platforms strip EXIF automatically?
        </h2>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Instagram, Facebook, and X (Twitter) do strip most EXIF metadata when you upload a photo through their apps. This sounds reassuring- but it is not a reliable privacy strategy.
        </p>
        <ul className="space-y-2 mb-4 pl-4">
          {[
            "Platform policies are not permanent guarantees. A policy in place today can change with any app update.",
            "Most platforms other than major social networks do not strip metadata. Forums, marketplaces, blogs, and classified ad sites typically serve images as-is.",
            "Photos shared via email, AirDrop, iMessage, or direct file transfer bypass any platform stripping entirely.",
            "The original file on your device retains all metadata even after a platform strips it from their copy.",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-gray-300 dark:bg-[#525252] shrink-0" />
              {item}
            </li>
          ))}
        </ul>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The only reliable approach is to strip EXIF data from the source file before you share it anywhere- so the metadata never reaches any platform in the first place.
        </p>

        <h2 id="how-to-remove-exif" className="text-lg font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3">
          How to remove EXIF data using SammaPix EXIF Viewer
        </h2>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-4">
          <Link href="/tools/exif" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#525252] hover:decoration-gray-600 dark:hover:decoration-[#A3A3A3] transition-colors">SammaPix EXIF Viewer</Link>{" "}
          processes your photos entirely in the browser- no upload, no server, no account required. Here is the complete process.
        </p>

        <div className="space-y-4 mb-8">
          {[
            { step: "1", title: "Open EXIF Viewer", body: "Go to sammapix.com/tools/exif. No account needed. The tool loads entirely in your browser using client-side JavaScript." },
            { step: "2", title: "Drop your photos", body: "Drag one or more photos onto the drop zone, or click to select files. EXIF Viewer supports JPG, JPEG, and TIFF- the formats that embed EXIF GPS data. PNG files generally do not embed GPS data." },
            { step: "3", title: "Inspect the metadata", body: "EXIF Viewer shows a full breakdown of every metadata field in the file. Find the GPS section and note the GPSLatitude, GPSLongitude, and GPSAltitude values. This is the location data embedded in your photo." },
            { step: "4", title: "Choose what to remove", body: 'Select "Remove GPS only" to strip just the location fields while preserving camera settings metadata (useful if you are a photographer keeping technical data), or select "Remove all EXIF" to strip everything.' },
            { step: "5", title: "Download the clean file", body: "The downloaded file has the metadata removed. Your original file on your device is untouched- only the downloaded copy is clean. The image itself is pixel-identical to the original." },
            { step: "6", title: "Verify before sharing", body: "Drop the downloaded file back into EXIF Viewer to confirm the GPS section is gone. When the GPS fields are absent, the file is safe to share publicly." },
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
        <Link href="/tools/exif" className="flex items-center justify-between gap-4 bg-[#171717] text-white rounded-md px-6 py-5 hover:bg-[#262626] transition-colors group mt-2 mb-8">
          <div>
            <p className="text-xs font-medium text-[#A3A3A3] uppercase tracking-wide mb-1">Free tool- no upload, no signup</p>
            <p className="text-sm font-semibold text-white leading-snug">Strip EXIF data from your photos now - SammaPix EXIF Viewer</p>
          </div>
          <ArrowRight className="h-4 w-4 text-[#737373] group-hover:text-white group-hover:translate-x-0.5 transition-all shrink-0" strokeWidth={1.5} />
        </Link>

        <h2 id="exif-privacy-tips" className="text-lg font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3">
          EXIF privacy tips for social media sharing
        </h2>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Even if you trust the platforms you share to, building good habits around EXIF data reduces your overall digital footprint. Here are the most important practices.
        </p>

        <p className="text-sm font-semibold text-gray-800 dark:text-[#E5E5E5] mt-4 mb-1">Always strip GPS before listing anything for sale</p>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Marketplace listings (Facebook, Craigslist, Depop, eBay) are the highest-risk context. The images are often downloadable by anyone, and sellers typically photograph items in their home. Remove GPS data before every listing photo you upload.
        </p>

        <p className="text-sm font-semibold text-gray-800 dark:text-[#E5E5E5] mt-4 mb-1">Be careful with iMessage and email</p>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          WhatsApp strips EXIF before sending. iMessage does not- photos sent via iMessage retain all original metadata including GPS. Email attachments also preserve metadata. If you are sending photos that include sensitive GPS data (your home, a private event, a confidential location), strip them first.
        </p>

        <p className="text-sm font-semibold text-gray-800 dark:text-[#E5E5E5] mt-4 mb-1">Disable GPS for your camera app if you do not need it</p>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          On iPhone: Settings &rarr; Privacy &amp; Security &rarr; Location Services &rarr; Camera &rarr; Never. On Android: Camera settings &rarr; Location tag &rarr; Off. Photos taken without GPS enabled will never have coordinates to worry about. The downside is losing location data for travel photography- so it is a tradeoff worth considering per use case.
        </p>

        <p className="text-sm font-semibold text-gray-800 dark:text-[#E5E5E5] mt-4 mb-1">Use a dedicated workflow for client photos</p>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          If you are a photographer delivering images to clients, EXIF data contains your camera serial number, lens details, and shooting settings. Some clients or agencies specify that delivered files should have metadata stripped- particularly in line with{" "}
          <a href="https://iptc.org/standards/photo-metadata/" target="_blank" rel="noopener noreferrer" className="text-[#6366F1] hover:underline">IPTC photo metadata standards</a>. Build EXIF removal into your export workflow rather than doing it manually per job.
        </p>

        <p className="text-sm font-semibold text-gray-800 dark:text-[#E5E5E5] mt-4 mb-1">Compress and strip in one step</p>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          If you are also optimizing images for web use,{" "}
          <Link href="/compress" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#525252] hover:decoration-gray-600 dark:hover:decoration-[#A3A3A3] transition-colors">SammaPix Compress</Link>{" "}
          strips all EXIF metadata automatically as part of the compression process. You get a lighter file with no metadata in a single operation- no separate EXIF removal step needed.
        </p>

        <figure className="my-8">
          <img
            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80"
            alt="Digital privacy concept showing a person using a secure device"
            className="w-full rounded-lg"
            loading="lazy"
          />
          <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
            Building good metadata hygiene into your photo sharing workflow protects your privacy - Photo by John Schnobrich on Unsplash
          </figcaption>
        </figure>

        <h2 id="alternative-methods" className="text-lg font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3">
          Alternative methods for removing EXIF data
        </h2>

        <h3 className="text-sm font-semibold text-gray-800 dark:text-[#D4D4D4] mt-6 mb-2">Windows: built-in File Properties</h3>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Right-click any image file &rarr; Properties &rarr; Details tab &rarr; "Remove Properties and Personal Information." You can strip all metadata or specific fields. Works on Windows 10 and 11 with no software to install. Limitation: one file at a time, no batch processing.
        </p>

        <h3 className="text-sm font-semibold text-gray-800 dark:text-[#D4D4D4] mt-6 mb-2">macOS: Photos app export</h3>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          In the macOS Photos app, select your images, go to File &rarr; Export &rarr; Export Photos, and uncheck "Location Information." This exports copies without GPS data. Note: macOS Preview does not strip EXIF on export, so the Photos app method is the native approach for GPS removal on Mac.
        </p>

        <h3 className="text-sm font-semibold text-gray-800 dark:text-[#D4D4D4] mt-6 mb-2">iOS 17+: Share sheet</h3>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          In iOS 17 and later, when you share a photo via the Share sheet, tap "Options" at the top and you will find a "Location" toggle. Disabling it strips GPS coordinates from the shared copy. This is the fastest mobile method but only works on iOS 17+ and only during the share action.
        </p>

        <h3 className="text-sm font-semibold text-gray-800 dark:text-[#D4D4D4] mt-6 mb-2">Command line: ExifTool</h3>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          <a href="https://exiftool.org" target="_blank" rel="noopener noreferrer" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#525252] hover:decoration-gray-600 dark:hover:decoration-[#A3A3A3] transition-colors">ExifTool</a>{" "}
          by Phil Harvey is the authoritative open-source tool for batch EXIF processing. To remove all GPS fields:{" "}
          <code className="text-xs bg-[#F5F5F5] dark:bg-[#252525] px-1.5 py-0.5 rounded text-gray-700 dark:text-[#D4D4D4]">exiftool -gps:all= -overwrite_original photo.jpg</code>. Use the{" "}
          <code className="text-xs bg-[#F5F5F5] dark:bg-[#252525] px-1.5 py-0.5 rounded text-gray-700 dark:text-[#D4D4D4]">-r</code> flag for recursive directory processing. Powerful for automation but requires terminal comfort and installation.
        </p>

        {/* FAQ */}
        <div className="mt-10 pt-8 border-t border-gray-100 dark:border-[#2A2A2A]">
          <h2 id="faq" className="text-lg font-semibold text-gray-900 dark:text-[#E5E5E5] mb-6">
            FAQ
          </h2>
          <div className="space-y-6">
            {[
              { q: "Does removing EXIF data affect image quality?", a: "No. EXIF metadata is stored in a separate block from the image pixel data. Removing it does not re-encode the image and causes no quality loss. The file will be slightly smaller- the metadata block is typically a few kilobytes- but the visual content is identical." },
              { q: "Does Instagram remove EXIF data from uploaded photos?", a: "Instagram strips most EXIF metadata including GPS when you upload through their app. However, this is not a guarantee- platform policies change, and many other contexts (email, iMessage, marketplaces) do not strip metadata. The safest approach is always to strip GPS from the source file before sharing." },
              { q: "Can I remove EXIF from a RAW file?", a: "RAW files (CR2, NEF, ARW, etc.) contain EXIF data but the metadata is interleaved with proprietary camera data in ways that vary by manufacturer. Browser-based tools like EXIF Viewer work best with JPEG and TIFF. For RAW files, ExifTool is the most reliable option for safe metadata removal without corrupting the file." },
              { q: "What is the difference between GPS metadata and other EXIF data?", a: "GPS metadata (GPSLatitude, GPSLongitude, GPSAltitude, GPSTimeStamp) is the most privacy-sensitive EXIF data because it directly reveals your physical location. Other EXIF data (camera model, shutter speed, ISO) is less sensitive but can still reveal what equipment you own or software you use. You can strip GPS only, or strip all EXIF- the choice depends on your use case." },
              { q: "Does converting a JPEG to PNG or WebP remove EXIF data?", a: "Converting formats strips EXIF data in most cases - PNG and WebP formats do not use the EXIF standard, so converting from JPEG typically removes the metadata block. However, some tools re-embed EXIF data during conversion. If privacy is the goal, explicitly strip metadata rather than relying on format conversion to do it." },
            ].map(({ q, a }) => (
              <div key={q}>
                <h3 className="text-sm font-semibold text-gray-800 dark:text-[#E5E5E5] mb-1.5">{q}</h3>
                <p className="text-sm text-gray-500 dark:text-[#737373] leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </BlogArticleLayout>

      {/* Structured data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
    </>
  );
}

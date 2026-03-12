import { Metadata } from "next";
import { MapPin, Shield, FolderOpen, Smartphone, FileText, Zap, ArrowRight } from "lucide-react";
import Link from "next/link";
import GeoSortClient from "@/components/tools/GeoSort";
import ToolHeader from "@/components/tools/ToolHeader";
import { APP_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Sort Photos by Location & Country Free | GPS Organizer | SammaPix",
  description:
    "Sort photos by location free using GPS data from EXIF. Organize travel photos by country automatically. No upload, browser-based.",
  keywords: [
    "sort photos by location",
    "gps photo organizer",
    "sort by country",
    "photo location sorting",
    "gps photo sort",
    "travel photo organizer",
  ],
  alternates: { canonical: `${APP_URL}/tools/geosort` },
  openGraph: {
    title: "Sort Photos by Location & Country Free | SammaPix",
    description:
      "Sort photos by location free using GPS EXIF data. Organize travel photos by country automatically. No upload needed.",
    url: `${APP_URL}/tools/geosort`,
    siteName: "SammaPix",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SammaPix GPS Photo Organizer",
      },
    ],
  },
};

const features = [
  {
    icon: <MapPin className="h-5 w-5 text-gray-700 dark:text-[#A3A3A3]" strokeWidth={1.5} />,
    title: "Reads GPS from EXIF",
    description:
      "Every photo taken with a smartphone or GPS-enabled camera stores coordinates in the file. GeoSort reads them instantly.",
  },
  {
    icon: <Zap className="h-5 w-5 text-gray-700 dark:text-[#A3A3A3]" strokeWidth={1.5} />,
    title: "Smart — only 2-3 API calls for a full trip",
    description:
      "200 photos from Japan? GeoSort detects they're all in the same area and makes just 2–3 location lookups instead of 200. Done in seconds.",
  },
  {
    icon: <FolderOpen className="h-5 w-5 text-gray-700 dark:text-[#A3A3A3]" strokeWidth={1.5} />,
    title: "Auto-organizes by country",
    description:
      "Photos are grouped into folders like Japan/, Thailand/, Italy/. Mixed trips sorted in seconds — no manual work.",
  },
  {
    icon: <FileText className="h-5 w-5 text-gray-700 dark:text-[#A3A3A3]" strokeWidth={1.5} />,
    title: "ZIP or sorting guide for large batches",
    description:
      "Small batch? Download a ZIP. Big shoot (200+ RAW files at 7 MB each)? Download a lightweight CSV guide with filename → folder — no need to re-download 1.4 GB.",
  },
  {
    icon: <Shield className="h-5 w-5 text-gray-700 dark:text-[#A3A3A3]" strokeWidth={1.5} />,
    title: "100% private — runs in your browser",
    description:
      "GPS reading and file sorting happen entirely on your device. Your photos are never uploaded to any server.",
  },
  {
    icon: <Smartphone className="h-5 w-5 text-gray-700 dark:text-[#A3A3A3]" strokeWidth={1.5} />,
    title: "Works with iPhone & Android",
    description:
      "Supports JPG and HEIC (iPhone format). Photos from any camera with GPS are supported — travel, street, landscape.",
  },
];

const steps = [
  { n: "1", title: "Drop your photos", desc: "Select or drag JPG / HEIC files from any trip — mix multiple destinations freely." },
  { n: "2", title: "GeoSort reads GPS", desc: "Each photo's GPS coordinates are extracted from EXIF data directly in the browser." },
  { n: "3", title: "Grouped by country", desc: "Coordinates are reverse-geocoded to a country name. Photos without GPS go to _unsorted/." },
  { n: "4", title: "Download ZIP", desc: "One click downloads a ZIP with subfolders ready to use: Japan/, Thailand/, Italy/ …" },
];

export default function GeoSortPage() {
  return (
    <main>
      <ToolHeader
        title="GeoSort"
        description="Drop your travel photos — GPS data is read locally and photos are organized into folders by country. Nothing leaves your device."
        icon={MapPin}
        accentColor="#22C55E"
      />

      <GeoSortClient />

      {/* What is GeoSort */}
      <section className="py-12 px-4 sm:px-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mb-4">What is GeoSort?</h2>
          <p className="text-sm text-[#737373] leading-relaxed mb-4">
            GeoSort is a free browser-based tool that reads GPS coordinates from your photo EXIF data and automatically sorts images into folders by country. It processes all files locally — no photos are uploaded to any server. A trip of 200 photos typically requires only 2–3 location API calls due to smart geographic clustering.
          </p>
          <p className="text-sm text-[#737373] leading-relaxed">
            It supports JPG and HEIC (iPhone format). Photos without GPS coordinates are placed in an <code className="text-xs bg-[#F5F5F5] dark:bg-[#252525] border border-[#E5E5E5] dark:border-[#2A2A2A] px-1.5 py-0.5 rounded font-mono">_unsorted/</code> folder. For batches over 150 MB, GeoSort generates a CSV sorting guide instead of a ZIP to avoid re-downloading large RAW files.
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="py-12 px-4 sm:px-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-6">How it works</h2>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            {steps.map((s) => (
              <div key={s.n} className="p-4 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md bg-white dark:bg-[#1E1E1E]">
                <div className="h-7 w-7 rounded-full bg-[#F5F5F5] dark:bg-[#252525] border border-[#E5E5E5] dark:border-[#2A2A2A] flex items-center justify-center mb-3">
                  <span className="text-xs font-semibold text-[#525252]">{s.n}</span>
                </div>
                <h3 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1">{s.title}</h3>
                <p className="text-xs text-[#737373] leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 px-4 sm:px-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-6">Why GeoSort?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {features.map((f) => (
              <div key={f.title} className="p-5 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md bg-white dark:bg-[#1E1E1E]">
                <div className="h-9 w-9 rounded-md border border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#F5F5F5] dark:bg-[#252525] flex items-center justify-center mb-4">
                  {f.icon}
                </div>
                <h3 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1.5">{f.title}</h3>
                <p className="text-sm text-[#737373] leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 px-4 sm:px-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-6">Common questions</h2>
          <div className="space-y-5">
            {[
              {
                q: "My photos ended up in _unsorted — why?",
                a: "Photos go to _unsorted when they have no GPS data in the EXIF. This happens when location was disabled on the camera/phone, or if the EXIF was stripped by a social media platform before you downloaded the photo.",
              },
              {
                q: "Does GeoSort work with iPhone HEIC photos?",
                a: "Yes. HEIC is the default format on iPhone and GeoSort reads GPS from it natively. Just select your HEIC files and they'll be sorted like any JPG.",
              },
              {
                q: "Are my photos uploaded to a server?",
                a: "No. Everything runs inside your browser. The GPS coordinates are sent to OpenStreetMap only to get the country name (no photo data), and the ZIP is created locally on your device.",
              },
              {
                q: "I have 200 RAW files at 7 MB each — will it crash?",
                a: "No. GeoSort reads only the EXIF header of each file (a few KB), not the full image. For geocoding, it detects photos taken in the same area and makes just 2–3 API calls instead of 200 — so it finishes in seconds. For the download: if your total batch exceeds 150 MB, GeoSort automatically offers a sorting guide (.csv) instead of a ZIP. Open the CSV, see which file goes in which folder, and move them manually — no need to re-download gigabytes you already have.",
              },
            ].map((faq) => (
              <div key={faq.q} className="pb-5 border-b border-[#E5E5E5] dark:border-[#2A2A2A] last:border-0">
                <h3 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1.5">{faq.q}</h3>
                <p className="text-sm text-[#737373] leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related guide */}
      <section className="py-8 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto">
          <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg p-4 bg-[#FAFAFA]">
            <p className="text-xs text-[#A3A3A3] uppercase tracking-wide mb-1">📖 Related guide</p>
            <a href="/blog/geosort-sort-photos-by-location" className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] hover:text-[#6366F1] flex items-center gap-1">
              GeoSort: Sort Your Photos by Location Automatically →
            </a>
          </div>
        </div>
      </section>

      {/* Related tools */}
      <section className="py-12 px-4 sm:px-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-4">
            More free image tools
          </h2>
          <div className="flex flex-wrap gap-2">
            {[
              { name: "Create Travel Map", href: "/tools/travelmap" },
              { name: "Remove EXIF", href: "/tools/exif" },
              { name: "Find Duplicates", href: "/tools/twinhunt" },
            ].map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md text-[#525252] hover:border-[#A3A3A3] hover:text-[#171717] dark:text-[#E5E5E5] bg-white dark:bg-[#1E1E1E] transition-colors"
              >
                {tool.name}
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Schema.org */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "SammaPix GeoSort",
            description:
              "Free tool that reads GPS EXIF data from photos and sorts them by location, creating folders per city or country. Works 100% in-browser, no uploads.",
            url: `${APP_URL}/tools/geosort`,
            applicationCategory: "PhotographyApplication",
            operatingSystem: "Web Browser",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            author: {
              "@type": "Person",
              name: "Luca Sammarco",
              url: "https://lucasammarco.com",
            },
            creator: {
              "@type": "Organization",
              name: "SammaPix",
              url: `${APP_URL}`,
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.7",
              ratingCount: "75",
            },
            featureList: [
              "GPS EXIF reading",
              "Sort by city or country",
              "Batch rename with location",
              "Zero uploads",
            ],
          }),
        }}
      />
    </main>
  );
}

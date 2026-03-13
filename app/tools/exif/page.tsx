import { Metadata } from "next";
import { ScanLine, Shield, MapPin, Download, ShieldOff, ArrowRight } from "lucide-react";
import Link from "next/link";
import ExifLens from "@/components/tools/ExifLens";
import ToolHeader from "@/components/tools/ToolHeader";
import { APP_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Remove EXIF Data & GPS from Photos Free Online | SammaPix",
  description:
    "Remove GPS & EXIF instantly — protect your privacy. Strip location, metadata, camera info. Free online, zero uploads, zero tracking.",
  keywords: [
    "remove exif data",
    "remove gps from photos",
    "exif remover",
    "metadata remover",
    "strip exif",
    "remove location from photo",
    "privacy tool",
    "metadata remover",
    "location privacy",
  ],
  alternates: { canonical: `${APP_URL}/tools/exif` },
  openGraph: {
    title: "Remove EXIF Data & GPS from Photos Free Online | SammaPix",
    description:
      "Remove GPS & EXIF instantly — protect your privacy. Strip location, metadata, camera info. Free online, zero uploads, zero tracking.",
    url: `${APP_URL}/tools/exif`,
    siteName: "SammaPix",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SammaPix EXIF Remover",
      },
    ],
  },
};

const features = [
  {
    icon: <ScanLine className="h-5 w-5 text-gray-700 dark:text-[#A3A3A3]" strokeWidth={1.5} />,
    title: "View all metadata",
    description:
      "See every EXIF field in your photo: GPS coordinates, camera make and model, lens, ISO, shutter speed, aperture, focal length, date, and software.",
  },
  {
    icon: <MapPin className="h-5 w-5 text-gray-700 dark:text-[#A3A3A3]" strokeWidth={1.5} />,
    title: "Remove GPS for privacy",
    description:
      "Photos taken with a smartphone contain precise GPS coordinates. One click removes location data only — keeping all other metadata intact.",
  },
  {
    icon: <Shield className="h-5 w-5 text-gray-700 dark:text-[#A3A3A3]" strokeWidth={1.5} />,
    title: "Strip all EXIF",
    description:
      "Remove every piece of metadata from a photo in one step. Camera model, timestamps, software — all gone. Ideal before sharing images publicly.",
  },
  {
    icon: <Download className="h-5 w-5 text-gray-700 dark:text-[#A3A3A3]" strokeWidth={1.5} />,
    title: "Batch processing",
    description:
      "Upload multiple photos at once. Remove GPS or strip EXIF from all files simultaneously, then download everything as a single ZIP.",
  },
];

const steps = [
  {
    n: "1",
    title: "Drop your photos",
    desc: "Select or drag JPG, HEIC, or PNG files. All metadata is read instantly in your browser.",
  },
  {
    n: "2",
    title: "See all metadata",
    desc: "Location, camera, settings, and date are displayed for each file. GPS is highlighted as a privacy risk.",
  },
  {
    n: "3",
    title: "Remove & download",
    desc: "Strip GPS only or all EXIF with one click per file — or use the action bar to process all at once. Download as ZIP.",
  },
];

const faqs = [
  {
    q: "Will this work on iPhone HEIC photos?",
    a: "Yes — EXIF Lens reads full metadata from HEIC files, including GPS coordinates, camera model, and capture settings. However, EXIF removal is only supported for JPEG files. To strip metadata from a HEIC photo, convert it to JPG first (any standard photo app can do this), then run it through EXIF Lens.",
  },
  {
    q: "Is my GPS actually removed?",
    a: "Yes. When you click 'Remove GPS', the GPS IFD block is deleted from the EXIF structure using piexifjs, a well-tested library. The resulting file contains zero GPS fields. You can verify this by reloading the cleaned file — the GPS section will show 'No data'.",
  },
  {
    q: "What metadata does EXIF contain?",
    a: "EXIF (Exchangeable Image File Format) is a standard embedded in photo files. It can contain: GPS coordinates (latitude, longitude, altitude), camera make and model, lens model, ISO sensitivity, aperture (f-number), shutter speed, focal length, date and time of capture, software used to edit the photo, and more. This data is added automatically by cameras and smartphones.",
  },
  {
    q: "Are my photos uploaded to a server?",
    a: "No. Everything happens entirely in your browser. The files are never sent to any server. EXIF is read using the exifr library running locally, and metadata is removed using piexifjs — both run 100% client-side. Your photos stay on your device.",
  },
];

export default function ExifPage() {
  return (
    <main>
      <ToolHeader
        title="EXIF Lens"
        description="View all metadata in your photos — GPS location, camera, settings, and date. Remove GPS or strip all EXIF with one click. Nothing leaves your browser."
        icon={ShieldOff}
        accentColor="#EF4444"
      />

      <ExifLens />

      {/* How it works */}
      <section className="py-12 px-4 sm:px-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-6">How it works</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
          <h2 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-6">What EXIF Lens does</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
            {faqs.map((faq) => (
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
            <a href="/blog/remove-exif-data-photos" className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] hover:text-[#6366F1] flex items-center gap-1">
              How to Remove EXIF Data from Photos (Protect Your Privacy) →
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
              { name: "Sort Photos by Location", href: "/tools/geosort" },
              { name: "Create Travel Map", href: "/tools/travelmap" },
              { name: "AI Rename", href: "/tools/ai-rename" },
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
            "@graph": [
              {
                "@type": "SoftwareApplication",
                name: "SammaPix EXIF Lens",
                description:
                  "Remove GPS, EXIF data and all metadata from photos online free. Strip location, camera info, timestamps. Privacy-focused, browser-based tool.",
                url: `${APP_URL}/tools/exif`,
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
                  ratingValue: "4.8",
                  ratingCount: "110",
                },
                featureList: [
                  "Remove GPS coordinates",
                  "Strip EXIF metadata",
                  "Remove camera info",
                  "Batch processing",
                  "ZIP download",
                  "Privacy-focused",
                ],
              },
              {
                "@type": "FAQPage",
                "mainEntity": [
                  {
                    "@type": "Question",
                    "name": "What is EXIF data in a photo?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "EXIF (Exchangeable Image File Format) is metadata automatically embedded in digital photos by cameras and smartphones. It includes: GPS coordinates (latitude, longitude, altitude), camera make and model, lens, ISO, aperture, shutter speed, focal length, date and time of capture, and software used. This data is invisible but can be read by image viewers and online tools."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Can someone track my location from a photo?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Yes, if a photo contains GPS coordinates in its EXIF data. When you upload a geotagged photo to social media, blogs, or share it online, anyone can extract those precise coordinates and determine exactly where you were when the photo was taken. This is a significant privacy risk, especially for your home address or frequent locations."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Does removing EXIF data reduce image quality?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "No. EXIF data is metadata stored separately from the actual image pixels. Removing it does not affect image quality, visual appearance, or file size. The photo looks identical — only the hidden metadata is removed. SammaPix removes EXIF without re-encoding the image."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Do social media sites strip EXIF data?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Most major social media platforms (Facebook, Instagram, Twitter) automatically strip EXIF data from photos you upload for privacy reasons. However, less common platforms may not, and direct photo sharing via email or messaging apps often preserves EXIF. To be safe, remove EXIF yourself before sharing."
                    }
                  }
                ]
              }
            ],
          }),
        }}
      />
    </main>
  );
}

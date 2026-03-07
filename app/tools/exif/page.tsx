import { Metadata } from "next";
import { ScanLine, Shield, MapPin, Download } from "lucide-react";
import ExifLens from "@/components/tools/ExifLens";
import ToolHeader from "@/components/tools/ToolHeader";
import { APP_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "EXIF Viewer & Remover — Strip GPS from Photos | SammaPix",
  description:
    "View all EXIF metadata in your photos and remove GPS location, camera info, and timestamps in one click. Fully browser-based — nothing uploaded.",
  alternates: { canonical: `${APP_URL}/tools/exif` },
  openGraph: {
    title: "EXIF Viewer & Remover — Strip GPS from Photos | SammaPix",
    description:
      "View all EXIF metadata in your photos and remove GPS location, camera info, and timestamps in one click. Fully browser-based — nothing uploaded.",
    url: `${APP_URL}/tools/exif`,
    siteName: "SammaPix",
    type: "website",
  },
};

const features = [
  {
    icon: <ScanLine className="h-5 w-5 text-gray-700" strokeWidth={1.5} />,
    title: "View all metadata",
    description:
      "See every EXIF field in your photo: GPS coordinates, camera make and model, lens, ISO, shutter speed, aperture, focal length, date, and software.",
  },
  {
    icon: <MapPin className="h-5 w-5 text-gray-700" strokeWidth={1.5} />,
    title: "Remove GPS for privacy",
    description:
      "Photos taken with a smartphone contain precise GPS coordinates. One click removes location data only — keeping all other metadata intact.",
  },
  {
    icon: <Shield className="h-5 w-5 text-gray-700" strokeWidth={1.5} />,
    title: "Strip all EXIF",
    description:
      "Remove every piece of metadata from a photo in one step. Camera model, timestamps, software — all gone. Ideal before sharing images publicly.",
  },
  {
    icon: <Download className="h-5 w-5 text-gray-700" strokeWidth={1.5} />,
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
      />

      <ExifLens />

      {/* How it works */}
      <section className="py-12 px-4 sm:px-6 border-t border-[#E5E5E5]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-sm font-semibold text-[#171717] mb-6">How it works</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {steps.map((s) => (
              <div key={s.n} className="p-4 border border-[#E5E5E5] rounded-md bg-white">
                <div className="h-7 w-7 rounded-full bg-[#F5F5F5] border border-[#E5E5E5] flex items-center justify-center mb-3">
                  <span className="text-xs font-semibold text-[#525252]">{s.n}</span>
                </div>
                <h3 className="text-sm font-semibold text-[#171717] mb-1">{s.title}</h3>
                <p className="text-xs text-[#737373] leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 px-4 sm:px-6 border-t border-[#E5E5E5]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-sm font-semibold text-[#171717] mb-6">What EXIF Lens does</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((f) => (
              <div key={f.title} className="p-5 border border-[#E5E5E5] rounded-md bg-white">
                <div className="h-9 w-9 rounded-md border border-[#E5E5E5] bg-[#F5F5F5] flex items-center justify-center mb-4">
                  {f.icon}
                </div>
                <h3 className="text-sm font-semibold text-[#171717] mb-1.5">{f.title}</h3>
                <p className="text-sm text-[#737373] leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 px-4 sm:px-6 border-t border-[#E5E5E5]">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-sm font-semibold text-[#171717] mb-6">Common questions</h2>
          <div className="space-y-5">
            {faqs.map((faq) => (
              <div key={faq.q} className="pb-5 border-b border-[#E5E5E5] last:border-0">
                <h3 className="text-sm font-semibold text-[#171717] mb-1.5">{faq.q}</h3>
                <p className="text-sm text-[#737373] leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

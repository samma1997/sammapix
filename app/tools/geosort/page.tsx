import { Metadata } from "next";
import { MapPin, Shield, FolderOpen, Smartphone } from "lucide-react";
import GeoSortClient from "@/components/tools/GeoSort";
import ToolHeader from "@/components/tools/ToolHeader";
import { APP_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "GeoSort — Organize Photos by Location | SammaPix",
  description:
    "Upload travel photos and GeoSort automatically reads GPS data to organize them into folders by country and city. Download a ZIP ready to use.",
  alternates: { canonical: `${APP_URL}/tools/geosort` },
  openGraph: {
    title: "GeoSort — Organize Photos by Location | SammaPix",
    description:
      "Upload travel photos and GeoSort automatically reads GPS data to organize them into folders by country and city. Download a ZIP ready to use.",
    url: `${APP_URL}/tools/geosort`,
    siteName: "SammaPix",
    type: "website",
  },
};

const features = [
  {
    icon: <MapPin className="h-5 w-5 text-gray-700" strokeWidth={1.5} />,
    title: "Reads GPS from EXIF",
    description:
      "Every photo taken with a smartphone or GPS-enabled camera stores coordinates in the file. GeoSort reads them instantly.",
  },
  {
    icon: <FolderOpen className="h-5 w-5 text-gray-700" strokeWidth={1.5} />,
    title: "Auto-organizes by country",
    description:
      "Photos are grouped into folders like Japan/, Thailand/, Italy/. Mixed trips sorted in seconds — no manual work.",
  },
  {
    icon: <Shield className="h-5 w-5 text-gray-700" strokeWidth={1.5} />,
    title: "100% private — runs in your browser",
    description:
      "GPS reading and file sorting happen entirely on your device. Your photos are never uploaded to any server.",
  },
  {
    icon: <Smartphone className="h-5 w-5 text-gray-700" strokeWidth={1.5} />,
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
      />

      <GeoSortClient />

      {/* How it works */}
      <section className="py-12 px-4 sm:px-6 border-t border-[#E5E5E5]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-sm font-semibold text-[#171717] mb-6">How it works</h2>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
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
          <h2 className="text-sm font-semibold text-[#171717] mb-6">Why GeoSort?</h2>
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
            ].map((faq) => (
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

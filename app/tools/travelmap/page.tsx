import { Metadata } from "next";
import { MapPin, Globe, Navigation, Shield, Camera } from "lucide-react";
import TravelMapClient from "@/components/tools/TravelMap";
import ToolHeader from "@/components/tools/ToolHeader";
import { APP_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "TravelMap — Visualize Your Travel Photos on a Map | SammaPix",
  description:
    "Upload your travel photos and TravelMap automatically plots every GPS location on an interactive map. See your journey, count countries, measure distance.",
  alternates: { canonical: `${APP_URL}/tools/travelmap` },
  openGraph: {
    title: "TravelMap — Visualize Your Travel Photos on a Map | SammaPix",
    description:
      "Upload your travel photos and TravelMap automatically plots every GPS location on an interactive map. See your journey, count countries, measure distance.",
    url: `${APP_URL}/tools/travelmap`,
    siteName: "SammaPix",
    type: "website",
  },
};

const features = [
  {
    icon: <MapPin className="h-5 w-5 text-gray-700" strokeWidth={1.5} />,
    title: "Interactive map",
    description:
      "Powered by OpenStreetMap and Leaflet. Zoom, pan, and click each pin to see the photo filename, location name, and date it was taken.",
  },
  {
    icon: <Globe className="h-5 w-5 text-gray-700" strokeWidth={1.5} />,
    title: "Counts countries",
    description:
      "TravelMap automatically groups your photos by country and shows a country breakdown with photo counts — see exactly which countries you covered.",
  },
  {
    icon: <Navigation className="h-5 w-5 text-gray-700" strokeWidth={1.5} />,
    title: "Measures km traveled",
    description:
      "Using the Haversine formula, TravelMap calculates the straight-line distance between all your GPS points in chronological order and shows total km.",
  },
  {
    icon: <Shield className="h-5 w-5 text-gray-700" strokeWidth={1.5} />,
    title: "100% private",
    description:
      "GPS coordinates are extracted from EXIF data entirely inside your browser. Your photos never leave your device — only lat/lon values hit our API for location names.",
  },
  {
    icon: <Camera className="h-5 w-5 text-gray-700" strokeWidth={1.5} />,
    title: "Works with any camera",
    description:
      "iPhone HEIC, Android JPG, mirrorless cameras with GPS — if the file has GPS in its EXIF, TravelMap plots it. Sorted chronologically by capture date.",
  },
  {
    icon: <MapPin className="h-5 w-5 text-gray-700" strokeWidth={1.5} />,
    title: "Export your journey",
    description:
      "Copy all coordinates as JSON for use in other apps, or open the full route in Google Maps. Use browser screenshot for a quick map image.",
  },
];

const steps = [
  {
    n: "1",
    title: "Drop your travel photos",
    desc: "Select or drag any JPG, HEIC, or PNG files. Mix multiple trips and destinations freely.",
  },
  {
    n: "2",
    title: "GPS is read locally",
    desc: "TravelMap reads the GPS coordinates from each photo's EXIF data entirely in your browser — no upload needed.",
  },
  {
    n: "3",
    title: "Pins appear on the map",
    desc: "Each photo gets a numbered pin, color-coded by country. A dashed line connects them in chronological order.",
  },
];

const faqs = [
  {
    q: "What if my photos have no GPS?",
    a: "Photos without GPS data are silently skipped. Only photos with valid coordinates are plotted. If none of your photos have GPS, you will see an error message. To check if a photo has GPS, right-click it on macOS and choose 'Get Info' — the location appears under the More Info section.",
  },
  {
    q: "Can I export the map as a PNG?",
    a: "The simplest approach is to use your browser's built-in screenshot tool (Cmd+Shift+4 on macOS, Win+Shift+S on Windows) to capture the map. You can also copy all GPS coordinates as JSON using the 'Copy coordinates' button and paste them into tools like Google My Maps or Felt to generate a shareable map.",
  },
  {
    q: "Does this work with iPhone photos?",
    a: "Yes. iPhone photos in HEIC format include GPS coordinates in EXIF data by default — as long as Location Services was enabled for the Camera app when the photo was taken. TravelMap reads HEIC and JPG equally well.",
  },
  {
    q: "How accurate is the distance calculation?",
    a: "TravelMap uses the Haversine formula to calculate great-circle distance (straight-line as the crow flies) between consecutive GPS points. It does not account for roads or actual travel routes — think of it as a lower-bound estimate of the distance your journey covered.",
  },
];

export default function TravelMapPage() {
  return (
    <main>
      <ToolHeader
        title="TravelMap"
        description="Drop your travel photos — GPS coordinates are read locally and plotted on an interactive map. See your journey, count countries, measure distance."
      />

      <TravelMapClient />

      {/* How it works */}
      <section className="py-12 px-4 sm:px-6 border-t border-[#E5E5E5]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-sm font-semibold text-[#171717] mb-6">
            How it works
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {steps.map((s) => (
              <div
                key={s.n}
                className="p-4 border border-[#E5E5E5] rounded-md bg-white"
              >
                <div className="h-7 w-7 rounded-full bg-[#F5F5F5] border border-[#E5E5E5] flex items-center justify-center mb-3">
                  <span className="text-xs font-semibold text-[#525252]">
                    {s.n}
                  </span>
                </div>
                <h3 className="text-sm font-semibold text-[#171717] mb-1">
                  {s.title}
                </h3>
                <p className="text-xs text-[#737373] leading-relaxed">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 px-4 sm:px-6 border-t border-[#E5E5E5]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-sm font-semibold text-[#171717] mb-6">
            Why TravelMap?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {features.map((f) => (
              <div
                key={f.title}
                className="p-5 border border-[#E5E5E5] rounded-md bg-white"
              >
                <div className="h-9 w-9 rounded-md border border-[#E5E5E5] bg-[#F5F5F5] flex items-center justify-center mb-4">
                  {f.icon}
                </div>
                <h3 className="text-sm font-semibold text-[#171717] mb-1.5">
                  {f.title}
                </h3>
                <p className="text-sm text-[#737373] leading-relaxed">
                  {f.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 px-4 sm:px-6 border-t border-[#E5E5E5]">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-sm font-semibold text-[#171717] mb-6">
            Common questions
          </h2>
          <div className="space-y-5">
            {faqs.map((faq) => (
              <div
                key={faq.q}
                className="pb-5 border-b border-[#E5E5E5] last:border-0"
              >
                <h3 className="text-sm font-semibold text-[#171717] mb-1.5">
                  {faq.q}
                </h3>
                <p className="text-sm text-[#737373] leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

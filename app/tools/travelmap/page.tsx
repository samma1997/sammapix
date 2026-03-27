import { Metadata } from "next";
import { MapPin, Globe, Navigation, Shield, Camera, Map, ArrowRight } from "lucide-react";
import Link from "next/link";
import TravelMapClientWrapper from "@/components/tools/TravelMapClientWrapper";
import ToolHeader from "@/components/tools/ToolHeader";
import HowToUse from "@/components/tools/HowToUse";
import { APP_URL } from "@/lib/constants";
import MetaViewContent from "@/components/tracking/MetaViewContent";


export const metadata: Metadata = {
  title: "Travel Photo Map Maker - Visualize GPS Routes Free | SammaPix",
  description:
    "Visualize your journey on an interactive map. Count countries, measure distance, download JSON. Free GPS photo mapper, zero uploads.",
  keywords: [
    "travel map creator",
    "gps photo map",
    "travel visualization",
    "photo map generator",
    "journey map",
    "gps visualization",
    "gps photo map",
    "travel visualization",
    "journey map",
  ],
  alternates: { canonical: `${APP_URL}/tools/travelmap` },
  openGraph: {
    title: "Travel Photo Map Maker - Visualize GPS Routes Free | SammaPix",
    description:
      "Visualize your journey on an interactive map. Count countries, measure distance, download JSON. Free GPS photo mapper, zero uploads.",
    url: `${APP_URL}/tools/travelmap`,
    siteName: "SammaPix",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SammaPix Travel Map Creator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Travel Photo Map Maker - Visualize GPS Routes Free | SammaPix",
    description:
      "Visualize your journey on an interactive map. Count countries, measure distance, download JSON. Free GPS photo mapper, zero uploads.",
  },
};

const features = [
  {
    icon: <MapPin className="h-5 w-5 text-gray-700 dark:text-[#A3A3A3]" strokeWidth={1.5} />,
    title: "Interactive map",
    description:
      "Powered by OpenStreetMap and Leaflet. Zoom, pan, and click each pin to see the photo filename, location name, and date it was taken.",
  },
  {
    icon: <Globe className="h-5 w-5 text-gray-700 dark:text-[#A3A3A3]" strokeWidth={1.5} />,
    title: "Counts countries",
    description:
      "TravelMap automatically groups your photos by country and shows a country breakdown with photo counts- see exactly which countries you covered.",
  },
  {
    icon: <Navigation className="h-5 w-5 text-gray-700 dark:text-[#A3A3A3]" strokeWidth={1.5} />,
    title: "Measures km traveled",
    description:
      "Using the Haversine formula, TravelMap calculates the straight-line distance between all your GPS points in chronological order and shows total km.",
  },
  {
    icon: <Shield className="h-5 w-5 text-gray-700 dark:text-[#A3A3A3]" strokeWidth={1.5} />,
    title: "100% private",
    description:
      "GPS coordinates are extracted from EXIF data entirely inside your browser. Your photos never leave your device- only lat/lon values hit our API for location names.",
  },
  {
    icon: <Camera className="h-5 w-5 text-gray-700 dark:text-[#A3A3A3]" strokeWidth={1.5} />,
    title: "Works with any camera",
    description:
      "iPhone HEIC, Android JPG, mirrorless cameras with GPS- if the file has GPS in its EXIF, TravelMap plots it. Sorted chronologically by capture date.",
  },
  {
    icon: <MapPin className="h-5 w-5 text-gray-700 dark:text-[#A3A3A3]" strokeWidth={1.5} />,
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
    desc: "TravelMap reads the GPS coordinates from each photo's EXIF data entirely in your browser- no upload needed.",
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
    a: "Photos without GPS data are silently skipped. Only photos with valid coordinates are plotted. If none of your photos have GPS, you will see an error message. To check if a photo has GPS, right-click it on macOS and choose 'Get Info'- the location appears under the More Info section.",
  },
  {
    q: "Can I export the map as a PNG?",
    a: "The simplest approach is to use your browser's built-in screenshot tool (Cmd+Shift+4 on macOS, Win+Shift+S on Windows) to capture the map. You can also copy all GPS coordinates as JSON using the 'Copy coordinates' button and paste them into tools like Google My Maps or Felt to generate a shareable map.",
  },
  {
    q: "Does this work with iPhone photos?",
    a: "Yes. iPhone photos in HEIC format include GPS coordinates in EXIF data by default- as long as Location Services was enabled for the Camera app when the photo was taken. TravelMap reads HEIC and JPG equally well.",
  },
  {
    q: "How accurate is the distance calculation?",
    a: "TravelMap uses the Haversine formula to calculate great-circle distance (straight-line as the crow flies) between consecutive GPS points. It does not account for roads or actual travel routes- think of it as a lower-bound estimate of the distance your journey covered.",
  },
];

export default function TravelMapPage() {
  return (
    <main>
      <MetaViewContent contentName="TravelMap" contentId="travelmap" />
      <ToolHeader
        title="Photo Map"
        description="Drop your travel photos - GPS coordinates are read locally and plotted on an interactive map. See your journey, count countries, measure distance."
        icon={Map}
        accentColor="#3B82F6"
      />

      {/* Tool + Next Step suggestions */}
      <TravelMapClientWrapper />

      <HowToUse
        toolName="TravelMap"
        steps={[
          {
            title: "Drop photos with GPS",
            desc: "Upload JPG or HEIC files taken with a GPS-enabled camera or phone. Mix photos from multiple trips freely.",
          },
          {
            title: "Interactive map generated",
            desc: "GPS coordinates are read from EXIF locally in your browser. Each photo gets a numbered pin, color-coded by country.",
          },
          {
            title: "See your travel route",
            desc: "Pins are connected in chronological order. See total distance traveled, countries visited, and photos per country.",
          },
        ]}
        proTip={{
          text: "Use GeoSort to organize your travel photos into country folders before mapping them.",
          linkLabel: "Sort by location",
          linkHref: "/tools/geosort",
        }}
      />

      {/* What is TravelMap */}
      <section className="py-12 px-4 sm:px-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mb-4">What is TravelMap?</h2>
          <p className="text-sm text-[#737373] leading-relaxed mb-4">
            TravelMap is a free browser-based tool that reads GPS coordinates from your photo EXIF data and visualizes them on an interactive map powered by OpenStreetMap. Each photo appears as a numbered pin, color-coded by country, connected by a dashed line in chronological order of capture date.
          </p>
          <p className="text-sm text-[#737373] leading-relaxed">
            TravelMap calculates total distance traveled using the Haversine formula, counts countries visited, and shows a breakdown of photos per country. It supports JPG and HEIC files. No photo data is ever uploaded- only GPS coordinates are sent to the reverse geocoding API to resolve location names.
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="py-12 px-4 sm:px-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-6">
            How it works
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {steps.map((s) => (
              <div
                key={s.n}
                className="p-4 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md bg-white dark:bg-[#1E1E1E]"
              >
                <div className="h-7 w-7 rounded-full bg-[#F5F5F5] dark:bg-[#252525] border border-[#E5E5E5] dark:border-[#2A2A2A] flex items-center justify-center mb-3">
                  <span className="text-xs font-semibold text-[#525252]">
                    {s.n}
                  </span>
                </div>
                <h3 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1">
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
      <section className="py-12 px-4 sm:px-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-6">
            Why TravelMap?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {features.map((f) => (
              <div
                key={f.title}
                className="p-5 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md bg-white dark:bg-[#1E1E1E]"
              >
                <div className="h-9 w-9 rounded-md border border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#F5F5F5] dark:bg-[#252525] flex items-center justify-center mb-4">
                  {f.icon}
                </div>
                <h3 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1.5">
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
      <section className="py-12 px-4 sm:px-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-6">
            Common questions
          </h2>
          <div className="space-y-5">
            {faqs.map((faq) => (
              <div
                key={faq.q}
                className="pb-5 border-b border-[#E5E5E5] dark:border-[#2A2A2A] last:border-0"
              >
                <h3 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1.5">
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

      {/* Related guide */}
      <section className="py-8 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto">
          <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg p-4 bg-[#FAFAFA]">
            <p className="text-xs text-[#A3A3A3] uppercase tracking-wide mb-1">📖 Related guide</p>
            <a href="/blog/create-travel-photo-map" className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] hover:text-[#6366F1] flex items-center gap-1">
              Turn Your GPS Photos into a Travel Map →
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
              { name: "Sort by Location", href: "/tools/geosort" },
              { name: "Remove EXIF", href: "/tools/exif" },
              { name: "Cull Photos", href: "/tools/cull" },
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

      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: `${APP_URL}`,
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Tools",
                item: `${APP_URL}/tools`,
              },
              {
                "@type": "ListItem",
                position: 3,
                name: "Photo Map",
                item: `${APP_URL}/tools/travelmap`,
              },
            ],
          }),
        }}
      />

      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Does TravelMap upload my photos to a server?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "No. TravelMap is completely private. GPS coordinates are extracted from your photos entirely in the browser. Only the GPS coordinates are sent to OpenStreetMap for reverse geocoding to get location names- your actual photos never leave your device.",
                },
              },
              {
                "@type": "Question",
                name: "How accurate is the distance calculation?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "TravelMap uses the Haversine formula to calculate great-circle distance (straight-line as the crow flies) between consecutive GPS points. It does not account for roads or actual travel routes- think of it as a lower-bound estimate of the distance your journey covered.",
                },
              },
              {
                "@type": "Question",
                name: "What if my photos don't have GPS data?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Photos without GPS data are silently skipped. Only photos with valid coordinates are plotted on the map. To check if a photo has GPS, right-click it on macOS and choose 'Get Info'- the location appears under More Info section.",
                },
              },
              {
                "@type": "Question",
                name: "Can I export the map as an image?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The simplest approach is to use your browser's screenshot tool (Cmd+Shift+4 on macOS, Win+Shift+S on Windows). You can also copy all GPS coordinates as JSON and paste them into tools like Google My Maps or Felt to generate a shareable map.",
                },
              },
            ],
          }),
        }}
      />

      {/* Software Application Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "SammaPix Photo Map",
            description:
              "Visualize your travel photos on an interactive map using GPS metadata. See routes, distances traveled and countries visited. No upload required.",
            url: `${APP_URL}/tools/travelmap`,
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
              ratingCount: "55",
            },
            featureList: [
              "Interactive travel map",
              "Countries visited counter",
              "Distance traveled calculation",
              "GPS EXIF reading",
            ],
          }),
        }}
      />
    </main>
  );
}

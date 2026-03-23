import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { APP_URL } from "@/lib/constants";
import BlogArticleLayout from "@/components/blog/BlogArticleLayout";

export const metadata: Metadata = {
  title:
    "How to Create an Interactive Travel Photo Map from Your iPhone Photos | SammaPix",
  description:
    "Learn how to create a travel photo map from iPhone photos using GPS EXIF data. A step-by-step guide to visualizing where every photo was taken- no uploads required.",
  alternates: {
    canonical: `${APP_URL}/blog/create-travel-photo-map`,
  },
  keywords: [
    "create travel photo map from iPhone photos",
    "travel photo map",
    "iPhone GPS photo map",
    "EXIF GPS data photos",
    "photo map from GPS coordinates",
    "visualize travel photos on map",
    "interactive photo map",
  ],
  openGraph: {
    title:
      "How to Create an Interactive Travel Photo Map from Your iPhone Photos",
    description:
      "Your iPhone quietly records GPS coordinates in every photo. Here is how to turn that hidden data into an interactive travel map- in minutes, with no uploads.",
    url: `${APP_URL}/blog/create-travel-photo-map`,
    type: "article",
    publishedTime: "2026-02-18",
    authors: ["https://lucasammarco.com"],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "How to Create an Interactive Travel Photo Map from Your iPhone Photos",
    description:
      "Your iPhone quietly records GPS coordinates in every photo. Turn that hidden data into an interactive travel map- no uploads required.",
    creator: "@lucasammarco",
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline:
    "How to Create an Interactive Travel Photo Map from Your iPhone Photos",
  description:
    "Learn how to create a travel photo map from iPhone photos using GPS EXIF data. A step-by-step guide to visualizing where every photo was taken- no uploads required.",
  url: `${APP_URL}/blog/create-travel-photo-map`,
  datePublished: "2026-02-18",
  dateModified: "2026-02-18",
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
    "@id": `${APP_URL}/blog/create-travel-photo-map`,
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: APP_URL,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Blog",
      item: `${APP_URL}/blog`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "How to Create an Interactive Travel Photo Map from Your iPhone Photos",
      item: `${APP_URL}/blog/create-travel-photo-map`,
    },
  ],
};

export default function CreateTravelPhotoMapPage() {
  return (
    <>
      <BlogArticleLayout
        title="How to Create an Interactive Travel Photo Map from Your iPhone Photos"
        slug="create-travel-photo-map"
        description="Every photo you take on your iPhone contains hidden GPS coordinates recorded at the moment of capture. Here is how to unlock that data and turn years of travel photos into an interactive map- without uploading a single file."
        date="2026-02-18"
        dateFormatted="February 18, 2026"
        tags={["Tools"]}
        readingTime={7}
        headings={[
          { id: "iphone-mapping-photos", title: "Your iPhone is quietly mapping every photo you take" },
          { id: "gps-exif-data", title: "How GPS EXIF data works in iPhone photos" },
          { id: "create-travel-map", title: "How to create a travel photo map from your iPhone photos" },
          { id: "tips-better-maps", title: "Tips for better travel photo maps" },
          { id: "privacy-gps-data", title: "The privacy angle: who can see your GPS data" },
          { id: "faq", title: "FAQ" },
        ]}
        summary={[
          "Every iPhone photo with location services enabled contains precise GPS coordinates in its EXIF metadata, accurate to within a few meters.",
          "SammaPix Photo Map reads GPS data entirely in your browser - no uploads, no server processing, your photos never leave your device.",
          "Always check Settings > Privacy > Location Services > Camera is set to 'While Using the App' before traveling to ensure GPS data is recorded.",
          "Photos shared via WhatsApp and some messaging apps have GPS data stripped automatically - use AirDrop or direct file transfer to preserve location data.",
          "Before sharing photos publicly, use the EXIF Remover to strip GPS metadata and protect your location privacy.",
        ]}
        heroImage={
          <figure>
            <img
              src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80"
              alt="Travel photographer reviewing photos on camera while sitting at a scenic overlook"
              className="w-full rounded-lg"
              loading="eager"
            />
            <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
              Every travel photo carries hidden GPS coordinates that can be turned into an interactive map - Photo by Annie Spratt on Unsplash
            </figcaption>
          </figure>
        }
        ctaBlock={
          <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2">
              Create your travel photo map
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-4">
              Drop your iPhone photos into SammaPix Photo Map and see exactly
              where every shot was taken- no account needed, nothing
              uploaded.
            </p>
            <Link
              href="/tools/travelmap"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            >
              Open Photo Map
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>
        }
      >
        {/* Article body content */}

        <h2 id="iphone-mapping-photos" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Your iPhone is quietly mapping every photo you take
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Open any photo on your iPhone and tap the info icon (i). Scroll
          down and you will see a small map with a pin. That pin is the
          exact GPS location where the photo was taken- latitude and
          longitude, accurate to within a few meters.
        </p>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          This data is stored in the EXIF metadata of the image file. EXIF
          (Exchangeable Image File Format) is a standard that embeds
          technical information directly inside the photo: camera settings,
          timestamp, device model, and- when location services are enabled
         - precise GPS coordinates. On an iPhone, this happens
          automatically for every shot taken with the default Camera app.
        </p>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Most people never look at this data. But if you have been taking
          photos for years, you are sitting on a detailed geographic record
          of everywhere you have been. The right tool can turn that invisible
          metadata into a visual travel map in seconds.
        </p>

        <h2 id="gps-exif-data" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          How GPS EXIF data works in iPhone photos
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          When you press the shutter on your iPhone, the Camera app records
          several GPS-related EXIF fields alongside the image data:
        </p>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">GPSLatitude / GPSLongitude</strong>- the precise capture location as decimal degrees
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">GPSAltitude</strong>- elevation at the time of capture
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">GPSDateStamp / GPSTimeStamp</strong>- UTC date and time of the shot
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">GPSImgDirection</strong>- the compass direction the camera was pointed
          </li>
        </ul>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          This data is embedded at the binary level in the JPEG or HEIC file
          and travels with the photo when you copy, export, or share it
          (unless an app explicitly strips it). The coordinates are stored in
          DMS (degrees, minutes, seconds) format internally but can be
          converted to decimal degrees, which is what mapping libraries use.
        </p>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          One important note: if you share a photo from your iPhone using
          AirDrop or iCloud, the GPS data is preserved. If you share via
          some messaging apps (WhatsApp, for example), those apps strip EXIF
          metadata before sending- a privacy feature that also removes the
          location data.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Make sure GPS is enabled for your iPhone camera
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Before any of this works, location services must be enabled for
          the Camera app. This is often turned off after a privacy review or
          iOS update. Here is how to check and enable it:
        </p>

        <ol className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-decimal">
            Open Settings on your iPhone
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-decimal">
            Scroll down and tap Privacy &amp; Security
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-decimal">
            Tap Location Services
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-decimal">
            Scroll down to Camera and tap it
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-decimal">
            Set it to While Using the App (not Never)
          </li>
        </ol>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Once enabled, every new photo taken with the Camera app will
          include GPS coordinates. Photos taken with location disabled will
          have no GPS data and will not appear as pins on any map.
        </p>

        <h2 id="create-travel-map" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          How to create a travel photo map from your iPhone photos
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The fastest way to create a travel photo map from iPhone photos is{" "}
          <Link
            href="/tools/travelmap"
            className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors"
          >
            SammaPix Photo Map
          </Link>
          . It reads the GPS coordinates directly from your files in the
          browser- nothing is uploaded, nothing leaves your device.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Step 1 - Export your photos from iPhone to your computer
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Connect your iPhone to your Mac or PC and use Image Capture (Mac)
          or Windows Photos to copy the photos you want to map. Make sure
          you export as JPEG or HEIC- both formats preserve EXIF GPS data.
          Avoid exporting via apps that strip metadata.
        </p>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Alternatively, if your photos are already in iCloud and synced to
          your Mac, just navigate to them in Finder. iCloud Photos preserves
          EXIF data when syncing.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Step 2 - Open SammaPix Photo Map
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Go to{" "}
          <Link
            href="/tools/travelmap"
            className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors"
          >
            sammapix.com/tools/travelmap
          </Link>
          . No account required, no file size limits, no watermarks. The
          tool runs entirely in your browser.

        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Step 3 - Drop your photos onto the map interface
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Drag your photo folder directly onto the drop zone, or click to
          select files. Photo Map processes hundreds of photos at once. As
          each file is read, a pin appears on the map at the GPS coordinates
          stored in its EXIF data.
        </p>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Photos without GPS data are noted in a counter at the top- useful
          for identifying which shots were taken with location disabled.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Step 4 - Explore your travel map
        </h3>

        <figure className="my-8">
          <img
            src="https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&q=80"
            alt="Vintage world map spread out on a table with travel planning items"
            className="w-full rounded-lg"
            loading="lazy"
          />
          <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
            Your iPhone photos contain all the data needed to build a detailed travel map - Photo by Andrew Stutesman on Unsplash
          </figcaption>
        </figure>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Zoom and pan to explore the map. Click any pin to see the photo
          thumbnail, the exact capture time, and the GPS coordinates. Pins
          cluster automatically when zoomed out- zoom in to separate
          nearby locations. The map uses{" "}
          <a href="https://leafletjs.com" target="_blank" rel="noopener noreferrer" className="text-[#6366F1] hover:underline">Leaflet.js</a>{" "}
          with tiles from{" "}
          <a href="https://www.openstreetmap.org" target="_blank" rel="noopener noreferrer" className="text-[#6366F1] hover:underline">OpenStreetMap</a>{" "}
         - both open-source and free.
        </p>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Use the date range filter to isolate a specific trip. If you have
          loaded photos from multiple journeys, filtering by date turns the
          full archive into focused per-trip maps.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Step 5 - Export or share your map
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Export the current map view as a static PNG or JPEG at your chosen
          zoom level. SammaPix Pro users can generate a shareable link that
          lets anyone view the interactive map in their browser.
        </p>

        <figure className="my-8">
          <img
            src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&q=80"
            alt="Stunning landscape view of mountains and lake from an elevated vantage point"
            className="w-full rounded-lg"
            loading="lazy"
          />
          <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
            Travel photos with GPS data enabled become pins on your personal world map - Photo by Luca Bravo on Unsplash
          </figcaption>
        </figure>

        <h2 id="tips-better-maps" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Tips for better travel photo maps
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The quality of your map depends on the quality of the input data.
          A few habits make a significant difference.
        </p>

        <p className="text-sm font-semibold text-gray-800 dark:text-[#E5E5E5] mt-4 mb-1">
          Always shoot with GPS enabled.
        </p>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The single most important habit. Check your iPhone location
          settings before every trip. A photo without GPS data is a blank on
          your map that cannot be recovered after the fact.
        </p>

        <p className="text-sm font-semibold text-gray-800 dark:text-[#E5E5E5] mt-4 mb-1">
          Map one trip at a time.
        </p>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          A map of 5,000 photos from 10 years of travel looks like noise. A
          map of 200 photos from a focused week in Japan tells a story. Use
          the date filter or pre-sort your photos before dropping them into
          Photo Map.
        </p>

        <p className="text-sm font-semibold text-gray-800 dark:text-[#E5E5E5] mt-4 mb-1">
          Sort by location before mapping.
        </p>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          If you want to separate photos by city or region before
          visualizing them,{" "}
          <Link
            href="/tools/geosort"
            className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors"
          >
            SammaPix Sort by Location
          </Link>{" "}
          automatically groups photos into folders by GPS proximity. Run
          Sort by Location first, then map each folder individually for clean,
          focused results.
        </p>

        <p className="text-sm font-semibold text-gray-800 dark:text-[#E5E5E5] mt-4 mb-1">
          Check GPS accuracy near buildings and tunnels.
        </p>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          GPS accuracy on iPhones is excellent outdoors but degrades in
          dense urban canyons, underground, or indoors. Photos taken
          underground (metro stations, tunnels) may have inaccurate
          coordinates, or none at all. This is a hardware limitation of GPS
          technology, not a tool issue.
        </p>

        <h2 id="privacy-gps-data" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          The privacy angle: who can see your GPS data
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          GPS metadata embedded in photos is invisible to the eye but
          readable by anyone with the file. If you share a photo taken at
          your home and it retains GPS data, you have shared your home
          address. Most people do not think about this.
        </p>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          SammaPix Photo Map processes all coordinates locally in your
          browser. No photo data is transmitted to any server. This lets you
          explore your location history safely- and also makes it clear
          exactly how much GPS data your photos carry before you share them
          publicly.
        </p>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          When you are ready to share photos online, use the SammaPix EXIF
          Remover to strip all GPS metadata from the files. The image itself
          is unchanged- only the invisible metadata is removed.
        </p>

        <hr className="my-8 border-gray-100 dark:border-[#2A2A2A]" />

        <h2 id="faq" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          FAQ
        </h2>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Do iPhone photos always include GPS data?
        </h3>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Only if location services are enabled for the Camera app. If you
          or a previous iOS update disabled location access for Camera, your
          photos will not have GPS EXIF data. Check Settings &rarr; Privacy
          &amp; Security &rarr; Location Services &rarr; Camera and set it
          to While Using the App.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Does this work with photos from Android phones or digital cameras?
        </h3>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Yes. The EXIF GPS standard is the same across devices. Android
          phones with location enabled embed GPS data in the same EXIF
          fields. Modern mirrorless and DSLR cameras with built-in GPS or
          paired smartphone geotagging also embed compatible coordinates.
          SammaPix Photo Map reads EXIF GPS data from any JPEG or HEIC file,
          regardless of which device took the photo.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Are my photos or GPS coordinates sent to any server?
        </h3>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          No. SammaPix Photo Map reads EXIF data entirely within your
          browser using the FileReader API. Your photos never leave your
          device. The only external requests are for map tiles (the visual
          map layer), which come from an open-source tile provider and
          contain only the area coordinates of the map view you are
          looking at- not your photo data.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          What if some photos are missing from the map?
        </h3>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Photos without GPS data will not appear as pins. Photo Map shows a
          count of how many photos were loaded vs. how many had valid GPS
          coordinates. Common reasons for missing GPS: location was disabled
          at capture time, the photo was exported through an app that strips
          EXIF (some messengers do this), or the photo is a screenshot (which
          never has GPS data).
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Can I use this to map a whole year of iPhone photos at once?
        </h3>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Yes. Photo Map handles large batches efficiently. For best results
          with a large archive, use the date filter after loading to explore
          individual trips rather than viewing everything at once. You can
          also pre-organize photos using{" "}
          <Link
            href="/tools/geosort"
            className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors"
          >
            Sort by Location
          </Link>{" "}
          to separate them by location before mapping.
        </p>
      </BlogArticleLayout>

      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}

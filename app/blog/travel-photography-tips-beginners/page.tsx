import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title:
    "10 Best Travel Photography Tips for Beginners (2026 Guide) | SammaPix",
  description:
    "Master travel photography with 10 proven tips covering composition, golden hour, gear essentials, and GPS tagging. A complete beginner's guide for 2026.",
  alternates: {
    canonical: "https://sammapix.com/blog/travel-photography-tips-beginners",
  },
  keywords: [
    "travel photography tips",
    "beginner travel photography",
    "how to take better travel photos",
    "travel photography guide",
    "travel photo composition",
    "golden hour photography",
    "GPS tagging photos",
    "travel photography gear",
  ],
  openGraph: {
    title: "10 Best Travel Photography Tips for Beginners (2026 Guide)",
    description:
      "Composition, light, gear, and GPS tagging — 10 proven travel photography tips that will immediately improve your shots.",
    url: "https://sammapix.com/blog/travel-photography-tips-beginners",
    type: "article",
    publishedTime: "2026-03-12",
    authors: ["https://lucasammarco.com"],
  },
  twitter: {
    card: "summary_large_image",
    title: "10 Best Travel Photography Tips for Beginners (2026 Guide)",
    description:
      "Composition, light, gear, and GPS tagging — 10 proven travel photography tips that will immediately improve your shots.",
    creator: "@lucasammarco",
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "10 Best Travel Photography Tips for Beginners (2026 Guide)",
  description:
    "Master travel photography with 10 proven tips covering composition, golden hour, gear essentials, and GPS tagging. A complete beginner's guide for 2026.",
  url: "https://sammapix.com/blog/travel-photography-tips-beginners",
  datePublished: "2026-03-12",
  dateModified: "2026-03-12",
  author: {
    "@type": "Person",
    name: "Luca Sammarco",
    url: "https://lucasammarco.com",
  },
  publisher: {
    "@type": "Organization",
    name: "SammaPix",
    url: "https://sammapix.com",
    logo: {
      "@type": "ImageObject",
      url: "https://sammapix.com/og-image.png",
    },
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": "https://sammapix.com/blog/travel-photography-tips-beginners",
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
      item: "https://sammapix.com",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Blog",
      item: "https://sammapix.com/blog",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "10 Best Travel Photography Tips for Beginners (2026 Guide)",
      item: "https://sammapix.com/blog/travel-photography-tips-beginners",
    },
  ],
};

const POST_DATE = "2026-03-12";
const POST_DATE_FORMATTED = "March 12, 2026";
const POST_URL =
  "https://sammapix.com/blog/travel-photography-tips-beginners";
const POST_TITLE =
  "10 Best Travel Photography Tips for Beginners (2026 Guide)";

export default function TravelPhotographyTipsBeginnersPage() {
  const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(POST_TITLE)}&url=${encodeURIComponent(POST_URL)}&via=lucasammarco`;
  const linkedinShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(POST_URL)}`;

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
              <span className="text-xs font-medium uppercase tracking-wide text-blue-700">
                Photography
              </span>
              <span className="text-gray-200 dark:text-[#333]">·</span>
              <time
                className="text-xs text-gray-400 dark:text-[#737373]"
                dateTime={POST_DATE}
              >
                {POST_DATE_FORMATTED}
              </time>
              <span className="text-gray-200 dark:text-[#333]">·</span>
              <span className="text-xs text-gray-400 dark:text-[#737373]">
                9 min read
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-[#E5E5E5] tracking-tight leading-tight mb-4">
              {POST_TITLE}
            </h1>

            <p className="text-base text-gray-500 dark:text-[#A3A3A3] leading-relaxed mb-5">
              Travel photography is one of the most rewarding creative skills
              you can develop. The problem is most beginners come home with
              thousands of mediocre shots and a handful of good ones. These 10
              tips will flip that ratio — giving you a systematic approach to
              capturing better travel photos from day one.
            </p>
          </header>

          {/* Article body */}
          <div className="prose-content">

            <h2 className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
              Why most travel photos disappoint
            </h2>

            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              The most common complaint from beginner travel photographers is
              this: the photos looked great on the camera screen, but when
              viewed on a laptop they feel flat, cluttered, or just unremarkable.
              This gap between expectation and result usually comes down to a
              small set of repeatable mistakes — not equipment.
            </p>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              You do not need an expensive camera to take compelling travel
              photos. A modern smartphone with deliberate technique will
              outperform a DSLR used thoughtlessly. The tips below focus on
              decisions you make before pressing the shutter — decisions that
              cost nothing and make the biggest difference.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
              Tip 1 — Learn the rule of thirds before anything else
            </h2>

            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              The rule of thirds is the single fastest way to improve composition.
              Divide your frame into a 3x3 grid — most cameras and phones can
              display this overlay. Place your subject at one of the four
              intersection points, not dead center.
            </p>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              Center composition feels static. Off-center subjects create visual
              tension and guide the viewer&apos;s eye through the frame. When
              shooting landscapes, place the horizon on the top or bottom third
              rather than splitting the image exactly in half. This simple shift
              immediately makes photos feel more intentional.
            </p>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              Enable the grid overlay on your camera or phone before your next
              trip. You will use it constantly until the framing becomes
              instinctive.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
              Tip 2 — Shoot during golden hour, always
            </h2>

            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              Golden hour — the 40 to 60 minutes after sunrise and before sunset
              — produces warm, directional light that flatters nearly every
              subject. Harsh midday sun creates deep shadows on faces, blown-out
              skies, and flat colors. The same location shot during golden hour
              looks completely different.
            </p>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              This is the single most impactful habit you can build. Plan your
              most important shots around sunrise and sunset. Use apps like{" "}
              <a
                href="https://www.photoephemeris.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors"
              >
                PhotoPills
              </a>{" "}
              or The Photographer&apos;s Ephemeris to find exact sunrise and
              sunset times at your destination. Use the midday hours for
              exploring, food, and rest.
            </p>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              Blue hour — the 20 minutes after sunset — is equally valuable for
              cityscapes and long exposures. The sky turns a deep, saturated
              blue that complements artificial light beautifully.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
              Tip 3 — Look for leading lines
            </h2>

            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              Leading lines are roads, paths, fences, rivers, staircases, or any
              linear element that draws the viewer&apos;s eye deeper into the
              image. They create depth and a sense of journey — both of which are
              central to travel photography.
            </p>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              When you arrive at a new location, scan the scene for natural
              lines before raising your camera. A cobblestone alley leading to a
              cathedral, a long bridge disappearing into fog, a mountain road
              curving into the distance — these are ready-made compositions.
              Position yourself so the line enters from one of the lower corners
              and moves toward your subject.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
              Tip 4 — Change your perspective
            </h2>

            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              The eye-level, standing-straight shot is the default for most
              people — and it is why most travel photos look the same. Getting
              low, climbing higher, or shooting through a foreground element
              transforms a familiar subject into something fresh.
            </p>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              Get down to ground level for street markets, children, animals,
              or flowers. Find elevated viewpoints — a rooftop terrace, a hill,
              a bridge — for cityscapes and landscapes. Use doorways, arches,
              or foliage as natural frames around your main subject. Each
              perspective shift produces a fundamentally different photograph
              from the same scene.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
              Tip 5 — Include people for scale and story
            </h2>

            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              Architecture and landscape photos gain immediate impact when a
              human figure is included. People provide scale — a tiny figure
              standing in front of an enormous temple communicates size far more
              effectively than the temple alone. They also add narrative: the
              viewer wonders who this person is and why they are there.
            </p>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              You do not need to ask strangers to pose. A distant figure walking
              away from camera, a local vendor at a market stall, or a travel
              companion looking into the distance all work. The person does not
              need to be the subject — they are an element that makes the
              composition more alive.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
              Tip 6 — Pack only the gear you will actually carry
            </h2>

            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              The best camera is the one you have with you. This is not just a
              cliche — it is the central gear reality of travel photography.
              Heavy camera bags stay in hotels. The photographer who brings a
              mirrorless with a single versatile lens will outshoot the one who
              leaves their DSLR and three primes at the room.
            </p>

            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              For most travel situations, a practical kit looks like this:
            </p>

            <ul className="mb-4">
              <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
                <strong className="text-gray-800 dark:text-[#E5E5E5]">Body:</strong> A lightweight mirrorless or your smartphone
              </li>
              <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
                <strong className="text-gray-800 dark:text-[#E5E5E5]">Lens:</strong> A 24-70mm equivalent covers most travel situations
              </li>
              <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
                <strong className="text-gray-800 dark:text-[#E5E5E5]">Extra batteries:</strong> At least two — charging infrastructure is unpredictable
              </li>
              <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
                <strong className="text-gray-800 dark:text-[#E5E5E5]">Storage:</strong> Multiple small cards over one large card — a failed card should not ruin the entire trip
              </li>
              <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
                <strong className="text-gray-800 dark:text-[#E5E5E5]">ND filter:</strong> Useful for waterfalls and bright midday light
              </li>
            </ul>

            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              Leave the tripod unless your primary goal is long-exposure or
              astrophotography. A small GorillaPod fits any bag and covers most
              situations where you would otherwise need a full tripod.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
              Tip 7 — Shoot RAW for editing flexibility
            </h2>

            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              RAW files preserve all the data captured by the sensor — they are
              unprocessed and uncompressed. JPEG files apply in-camera
              processing and discard the data that did not survive the
              compression. For travel photography, where you rarely control the
              light, that preserved data is essential.
            </p>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              With a RAW file, recovering a slightly overexposed sky or lifting
              shadow detail in a backlit portrait is straightforward in
              Lightroom or Capture One. The same adjustment on a JPEG often
              produces visible artifacts. If your camera supports RAW, enable
              it. You will use the extra latitude on almost every trip.
            </p>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              iPhone users shooting in ProRAW (available on iPhone 12 Pro and
              later) gain the same editing headroom. Check your Camera settings
              to enable it. Note that RAW files are significantly larger than
              JPEGs — budget for additional storage accordingly.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
              Tip 8 — Enable GPS tagging and use it deliberately
            </h2>

            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              Every photo your smartphone takes can embed GPS coordinates in the
              EXIF metadata. This is not just a convenience feature — it is a
              long-term asset that transforms your photo archive into a
              geographic record of everywhere you have been.
            </p>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              On iPhone, go to Settings &rarr; Privacy &amp; Security &rarr;
              Location Services &rarr; Camera and set it to While Using the App.
              On Android, open the Camera app, go to Settings, and enable
              Location tags. Once enabled, every photo will carry the precise
              coordinates of where it was taken.
            </p>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              With GPS-tagged photos, you can:
            </p>

            <ul className="mb-4">
              <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
                Visualize your entire trip on an interactive map with{" "}
                <Link
                  href="/tools/travelmap"
                  className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors"
                >
                  SammaPix TravelMap
                </Link>
              </li>
              <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
                Automatically sort photos by country or city using{" "}
                <Link
                  href="/tools/geosort"
                  className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors"
                >
                  SammaPix GeoSort
                </Link>
              </li>
              <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
                Recall exactly where a specific photo was taken years later
              </li>
              <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
                Return to the same spot for a second attempt or a seasonal comparison
              </li>
            </ul>

            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              For DSLR and mirrorless cameras that lack built-in GPS, most
              manufacturers offer a Bluetooth companion app (Canon Camera Connect,
              Nikon SnapBridge, Sony Imaging Edge) that syncs GPS coordinates
              from your phone to the camera&apos;s EXIF data in real time. Use it.
            </p>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              One privacy note: GPS data travels with the image file when you
              share it. Before posting photos online, use the{" "}
              <Link
                href="/tools/exif"
                className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors"
              >
                SammaPix EXIF Remover
              </Link>{" "}
              to strip location data from any image you share publicly. You can
              also view the full EXIF data of any photo — including lens, shutter
              speed, and aperture — with{" "}
              <Link
                href="/tools/exif"
                className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors"
              >
                EXIF Lens
              </Link>
              .
            </p>

            <h2 className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
              Tip 9 — Edit with restraint, not aggression
            </h2>

            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              Heavy-handed editing — oversaturated colors, crushed blacks, HDR
              halos — dates a photograph instantly and telegraphs inexperience.
              The goal of post-processing travel photos should be to enhance
              what was already there, not to create something that did not exist.
            </p>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              A solid baseline edit for most travel photos involves: straighten
              the horizon, adjust exposure so highlights are not blown out,
              increase clarity slightly for texture, and set white balance to
              match the actual light conditions at the time. Everything beyond
              that is stylistic choice, not correction.
            </p>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              If you want a specific filmic look — the warm grain of Kodak Gold,
              the faded tones of expired slide film — apply it consistently
              across your series rather than varying the style image by image.
              Consistency is what makes a travel gallery feel cohesive. The{" "}
              <Link
                href="/tools/filmlab"
                className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors"
              >
                SammaPix FilmLab
              </Link>{" "}
              tool lets you apply film emulation looks directly in your browser
              — no Lightroom required.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
              Tip 10 — Cull ruthlessly and share selectively
            </h2>

            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              The hardest skill in photography is not taking a great shot — it is
              selecting the best shots from a thousand. Showing 50 photos from a
              trip to a friend dilutes the impact. Showing 10 carefully chosen
              images makes every one of them stronger.
            </p>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              Develop a culling workflow. After each day of shooting, do a first
              pass and delete anything clearly out of focus, poorly exposed, or
              redundant. Then do a second pass to pick the best from similar
              shots. A good rule of thumb: never share more than one photo from
              the same location and framing.
            </p>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              For photographers managing large libraries across multiple trips,
              tools like{" "}
              <Link
                href="/tools/geosort"
                className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors"
              >
                GeoSort
              </Link>{" "}
              help organize the volume so you can focus on the creative work of
              selection.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
              Building a complete travel photography workflow
            </h2>

            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              These 10 tips work best as a connected system rather than
              individual tricks. Here is what a complete workflow looks like in
              practice:
            </p>

            <ol className="mb-4">
              <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-decimal">
                <strong className="text-gray-800 dark:text-[#E5E5E5]">Before the trip:</strong> Research locations, identify golden hour times, plan your priority shots
              </li>
              <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-decimal">
                <strong className="text-gray-800 dark:text-[#E5E5E5]">Gear check:</strong> Enable GPS tagging, charge batteries, format cards
              </li>
              <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-decimal">
                <strong className="text-gray-800 dark:text-[#E5E5E5]">In the field:</strong> Apply composition principles consciously, vary perspective, prioritize golden hour
              </li>
              <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-decimal">
                <strong className="text-gray-800 dark:text-[#E5E5E5]">End of day:</strong> Back up cards, do a rough cull on your laptop
              </li>
              <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-decimal">
                <strong className="text-gray-800 dark:text-[#E5E5E5]">After the trip:</strong> Final cull, edit selected photos, organize by location using GeoSort, build your travel map
              </li>
              <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-decimal">
                <strong className="text-gray-800 dark:text-[#E5E5E5]">Before sharing:</strong> Strip GPS from photos you share publicly using the EXIF Remover
              </li>
            </ol>

            <hr className="my-8 border-gray-100 dark:border-[#2A2A2A]" />

            <h2 className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
              FAQ
            </h2>

            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
              What is the most important travel photography tip for beginners?
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              Shoot during golden hour. Light quality has more impact on a photo
              than any other variable under your control. A mediocre composition
              in beautiful golden light will almost always beat a perfect
              composition in harsh midday sun.
            </p>

            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
              Do I need an expensive camera for travel photography?
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              No. Modern smartphones — particularly iPhone Pro models and
              flagship Android devices — produce excellent travel photos. The
              skills covered in this guide apply regardless of camera. Buy better
              glass before you buy a better body, and consider whether the
              additional weight of a dedicated camera is worth the benefit for
              your style of travel.
            </p>

            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
              How do I find the GPS coordinates of where a photo was taken?
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              Use the{" "}
              <Link
                href="/tools/exif"
                className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors"
              >
                SammaPix EXIF Lens
              </Link>{" "}
              tool. Drop any photo in and it will display all EXIF metadata —
              including GPS coordinates, camera model, lens, aperture, shutter
              speed, and ISO. Everything runs in your browser with no uploads.
            </p>

            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
              How many photos should I take at each location?
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              There is no fixed number, but a useful practice is to shoot until
              you have what you came for, then stop. Bracketing exposures and
              trying multiple compositions is good practice. Shooting 50 nearly
              identical frames of the same subject is not — it creates editing
              work without producing better results.
            </p>
          </div>

          {/* Share section */}
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
                <svg
                  role="img"
                  viewBox="0 0 24 24"
                  className="h-4 w-4 fill-current"
                  aria-label="Share on X (Twitter)"
                >
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
                <svg
                  role="img"
                  viewBox="0 0 24 24"
                  className="h-4 w-4 fill-current"
                  aria-label="Share on LinkedIn"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                Share on LinkedIn
              </a>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-8 pt-8 border-t border-gray-100 dark:border-[#2A2A2A]">
            <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-6">
              <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2">
                Put your travel photos to work
              </h3>
              <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-4">
                Map your GPS-tagged photos with TravelMap, sort them by
                location with GeoSort, or explore your EXIF data with EXIF
                Lens — all free, all in-browser.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/tools/travelmap"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
                >
                  Open TravelMap
                  <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
                </Link>
                <Link
                  href="/tools/filmlab"
                  className="inline-flex items-center gap-2 px-4 py-2 border border-gray-200 dark:border-[#333] text-gray-700 dark:text-[#A3A3A3] text-sm font-medium rounded-md hover:bg-gray-50 dark:hover:bg-[#252525] transition-colors"
                >
                  Try FilmLab
                </Link>
              </div>
            </div>
          </div>

          {/* Related articles */}
          <div className="mt-10 pt-8 border-t border-gray-100 dark:border-[#2A2A2A]">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-[#E5E5E5] mb-4">
              Related articles
            </h3>
            <div className="space-y-3">
              <Link
                href="/blog/create-travel-photo-map"
                className="flex items-start gap-3 group"
              >
                <span className="text-xs font-medium uppercase tracking-wide shrink-0 mt-0.5 text-blue-700">
                  Tools
                </span>
                <span className="text-sm text-gray-600 dark:text-[#A3A3A3] group-hover:text-gray-900 dark:group-hover:text-[#E5E5E5] transition-colors">
                  How to Create an Interactive Travel Photo Map from Your iPhone Photos
                </span>
              </Link>
              <Link
                href="/blog/organize-travel-photos-by-country"
                className="flex items-start gap-3 group"
              >
                <span className="text-xs font-medium uppercase tracking-wide shrink-0 mt-0.5 text-blue-700">
                  Tools
                </span>
                <span className="text-sm text-gray-600 dark:text-[#A3A3A3] group-hover:text-gray-900 dark:group-hover:text-[#E5E5E5] transition-colors">
                  How to Organize Travel Photos by Country Automatically
                </span>
              </Link>
              <Link
                href="/blog/film-effects-digital-photos-free"
                className="flex items-start gap-3 group"
              >
                <span className="text-xs font-medium uppercase tracking-wide shrink-0 mt-0.5 text-purple-700">
                  Editing
                </span>
                <span className="text-sm text-gray-600 dark:text-[#A3A3A3] group-hover:text-gray-900 dark:group-hover:text-[#E5E5E5] transition-colors">
                  How to Add Film Effects to Digital Photos (Free, No Photoshop)
                </span>
              </Link>
            </div>
          </div>
        </article>

        {/* Structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      </div>
    </div>
  );
}

import React from "react";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MapPin, Calendar, ArrowLeft, ArrowRight } from "lucide-react";
import { getAllTrips, getTripBySlug } from "@/lib/destinations";
import { cn } from "@/lib/utils";
import type { TripPhoto } from "@/lib/destinations";

// ---------------------------------------------------------------------------
// Static params
// ---------------------------------------------------------------------------
export async function generateStaticParams() {
  return getAllTrips().map((t) => ({ slug: t.slug }));
}

// ---------------------------------------------------------------------------
// Dynamic metadata
// ---------------------------------------------------------------------------
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const trip = getTripBySlug(params.slug);
  if (!trip) return {};

  const year = new Date(trip.startDate).getFullYear();

  return {
    title: `${trip.destination} ${year} — Travel Photography`,
    description: trip.description.slice(0, 155),
    alternates: {
      canonical: `https://sammapix.com/destinations/${trip.slug}`,
    },
    openGraph: {
      title: `${trip.destination} ${year} — Travel Photography`,
      description: trip.description.slice(0, 155),
      url: `https://sammapix.com/destinations/${trip.slug}`,
      type: "website",
      images: [{ url: trip.coverSrc, width: 1200, height: 630 }],
    },
  };
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function formatDateRange(start: string, end: string): string {
  return `${formatDate(start)} — ${formatDate(end)}`;
}

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------
export default function TripPage({
  params,
}: {
  params: { slug: string };
}) {
  const trip = getTripBySlug(params.slug);
  if (!trip) notFound();

  const allTrips = getAllTrips();
  const currentIndex = allTrips.findIndex((t) => t.slug === trip.slug);
  const prevTrip = currentIndex > 0 ? allTrips[currentIndex - 1] : null;
  const nextTrip =
    currentIndex < allTrips.length - 1 ? allTrips[currentIndex + 1] : null;

  const year = new Date(trip.startDate).getFullYear();

  // Schema JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: `${trip.destination} Photography — ${year}`,
    description: trip.description.slice(0, 200),
    url: `https://sammapix.com/destinations/${trip.slug}`,
    author: {
      "@type": "Person",
      name: "Luca Sammarco",
      url: "https://sammapix.com",
    },
    about: {
      "@type": "Place",
      name: trip.destination,
      containedInPlace: {
        "@type": "Country",
        name: trip.country,
      },
    },
    image: trip.photos.map((p) => ({
      "@type": "ImageObject",
      contentUrl: p.src,
      thumbnailUrl: p.srcThumb,
      description: p.description,
      name: p.caption,
      about: {
        "@type": "Place",
        name: p.location,
      },
      dateCreated: p.date,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ------------------------------------------------------------------ */}
      {/* A. Hero Section — full width                                        */}
      {/* ------------------------------------------------------------------ */}
      <section className="relative w-full" style={{ maxHeight: "520px" }}>
        <div className="relative w-full aspect-video" style={{ maxHeight: "520px" }}>
          <Image
            src={trip.coverSrc}
            alt={`${trip.destination} travel photography hero — ${year}`}
            fill
            priority
            sizes="100vw"
            className="object-cover"
            unoptimized
          />
          {/* Gradient overlay — bottom 40% */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.36) 40%, transparent 100%)",
            }}
            aria-hidden="true"
          />
          {/* Hero text on overlay */}
          <div className="absolute bottom-0 left-0 right-0 px-5 pb-8 sm:px-10 sm:pb-10">
            <h1 className="text-3xl sm:text-5xl font-bold text-white tracking-tight mb-2 drop-shadow-sm">
              {trip.destination}
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-sm text-white/80">
              <span>{formatDateRange(trip.startDate, trip.endDate)}</span>
              <span className="text-white/40" aria-hidden="true">·</span>
              <span>{trip.photoCount} photos</span>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* B. Breadcrumb + Intro                                               */}
      {/* ------------------------------------------------------------------ */}
      <div className="px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">

          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mt-8 mb-6">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-gray-400">
              <li>
                <Link href="/" className="hover:text-gray-600 transition-colors">
                  SammaPix
                </Link>
              </li>
              <li aria-hidden="true" className="text-gray-300">/</li>
              <li>
                <Link
                  href="/destinations"
                  className="hover:text-gray-600 transition-colors"
                >
                  Destinations
                </Link>
              </li>
              <li aria-hidden="true" className="text-gray-300">/</li>
              <li className="text-gray-900 font-medium">{trip.destination}</li>
            </ol>
          </nav>

          {/* Title + date badge */}
          <div className="mb-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight mb-3">
              {trip.destination} —{" "}
              <span className="font-normal text-gray-500">
                {new Date(trip.startDate).toLocaleDateString("en-GB", {
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </h2>

            {/* Date badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-sm text-sm text-gray-600">
              <Calendar className="h-3.5 w-3.5 text-gray-400" strokeWidth={1.5} />
              <time dateTime={trip.startDate}>{formatDate(trip.startDate)}</time>
              <span className="text-gray-400" aria-hidden="true">→</span>
              <time dateTime={trip.endDate}>{formatDate(trip.endDate)}</time>
            </div>
          </div>

          {/* SEO description paragraph */}
          <p className="text-gray-600 leading-relaxed mb-5 max-w-2xl">
            {trip.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-12" role="list" aria-label="Trip tags">
            {trip.tags.map((tag) => (
              <span
                key={tag}
                role="listitem"
                className="inline-block px-2.5 py-1 bg-gray-100 border border-gray-200 rounded-sm text-xs text-gray-600 font-medium"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* C. Photo Grid                                                       */}
      {/* ------------------------------------------------------------------ */}
      <section
        aria-label={`${trip.destination} travel photographs`}
        className="px-4 sm:px-6"
      >
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col gap-0">
            {trip.photos.map((photo, index) => (
              <PhotoRow
                key={photo.id}
                photo={photo}
                index={index}
                isLast={index === trip.photos.length - 1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* D. Navigation                                                       */}
      {/* ------------------------------------------------------------------ */}
      <nav
        aria-label="Trip navigation"
        className="px-4 sm:px-6 py-16 border-t border-gray-200 mt-16"
      >
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
          {/* Back to destinations — always shown */}
          <Link
            href="/destinations"
            className={cn(
              "inline-flex items-center gap-2 text-sm text-gray-500",
              "hover:text-gray-900 transition-colors"
            )}
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
            Back to Destinations
          </Link>

          {/* Next trip link — shown if there is a next trip */}
          {nextTrip && (
            <Link
              href={`/destinations/${nextTrip.slug}`}
              className={cn(
                "inline-flex items-center gap-2 text-sm text-gray-500",
                "hover:text-gray-900 transition-colors"
              )}
            >
              <span className="hidden sm:inline text-gray-400 text-xs">Next trip:</span>
              <span className="font-medium text-gray-700">{nextTrip.destination}</span>
              <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
            </Link>
          )}

          {/* If no next trip, show prev trip */}
          {!nextTrip && prevTrip && (
            <Link
              href={`/destinations/${prevTrip.slug}`}
              className={cn(
                "inline-flex items-center gap-2 text-sm text-gray-500",
                "hover:text-gray-900 transition-colors"
              )}
            >
              <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
              <span className="hidden sm:inline text-gray-400 text-xs">Previous trip:</span>
              <span className="font-medium text-gray-700">{prevTrip.destination}</span>
            </Link>
          )}
        </div>
      </nav>
    </>
  );
}

// ---------------------------------------------------------------------------
// PhotoRow — alternating layout per photo
// ---------------------------------------------------------------------------
interface PhotoRowProps {
  photo: TripPhoto;
  index: number;
  isLast: boolean;
}

function PhotoRow({ photo, index, isLast }: PhotoRowProps) {
  const isOdd = index % 2 === 0; // 0-indexed, so index 0 = "odd" = photo left

  return (
    <article
      aria-label={photo.caption}
      className={cn(
        "py-12",
        !isLast && "border-b border-gray-100"
      )}
    >
      <div
        className={cn(
          "flex flex-col gap-6",
          // Desktop: side-by-side. Odd rows: photo left; even rows: photo right
          "md:flex-row md:items-center md:gap-10",
          !isOdd && "md:flex-row-reverse"
        )}
      >
        {/* Photo — 60% width on desktop */}
        <div className="md:w-[60%] shrink-0">
          <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden bg-gray-100">
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(max-width: 768px) 100vw, 60vw"
              className="object-cover"
              unoptimized
            />
          </div>
        </div>

        {/* Text content — 40% width on desktop */}
        <div className="md:w-[40%]">
          {/* Caption */}
          <h3 className="text-lg font-semibold text-gray-900 mb-2 leading-snug">
            {photo.caption}
          </h3>

          {/* Location */}
          <p className="flex items-center gap-1.5 text-xs font-medium text-brand mb-4">
            <MapPin className="h-3 w-3 shrink-0" strokeWidth={2} />
            {photo.location}
          </p>

          {/* SEO description */}
          <p className="text-sm text-gray-600 leading-relaxed">
            {photo.description}
          </p>

          {/* Date */}
          <time
            dateTime={photo.date}
            className="block mt-4 text-xs text-gray-400"
          >
            {formatDate(photo.date)}
          </time>
        </div>
      </div>
    </article>
  );
}

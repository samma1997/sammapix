import React from "react";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { MapPin, Image as ImageIcon, Globe } from "lucide-react";
import { getAllTrips } from "@/lib/destinations";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Travel Portfolio — Luca Sammarco Photography",
  description:
    "Photography portfolio organized by travel destination: Sri Lanka, Bali, Thailand, Japan, China. Curated travel photographs with stories from each journey.",
  alternates: {
    canonical: "https://sammapix.com/destinations",
  },
  openGraph: {
    title: "Travel Portfolio — Luca Sammarco Photography",
    description:
      "Photography portfolio organized by travel destination: Sri Lanka, Bali, Thailand, Japan, China.",
    url: "https://sammapix.com/destinations",
    type: "website",
  },
};

// Helpers
function formatDateRange(startDate: string, endDate: string): string {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const startStr = start.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  const endStr = end.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  return `${startStr} — ${endStr}`;
}

export default function DestinationsPage() {
  const trips = getAllTrips();

  const totalPhotos = trips.reduce((sum, t) => sum + t.photoCount, 0);
  const uniqueCountries = new Set(trips.map((t) => t.country)).size;

  // Schema JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: "Travel Photography Portfolio — Luca Sammarco",
    description:
      "A curated collection of travel photographs organized by destination, covering Asia and beyond.",
    author: {
      "@type": "Person",
      name: "Luca Sammarco",
      url: "https://sammapix.com",
    },
    hasPart: trips.map((t) => ({
      "@type": "ImageGallery",
      name: `${t.destination} — ${new Date(t.startDate).getFullYear()}`,
      description: t.excerpt,
      url: `https://sammapix.com/destinations/${t.slug}`,
      about: {
        "@type": "Place",
        name: t.destination,
        containedInPlace: {
          "@type": "Country",
          name: t.country,
        },
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="py-12 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">

          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-1.5 text-sm text-gray-400">
              <li>
                <Link
                  href="/"
                  className="hover:text-gray-600 transition-colors"
                >
                  SammaPix
                </Link>
              </li>
              <li aria-hidden="true" className="text-gray-300">/</li>
              <li className="text-gray-900 font-medium">Destinations</li>
            </ol>
          </nav>

          {/* Page header */}
          <header className="mb-10">
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-2">
              Travel Portfolio
            </h1>
            <p className="text-gray-500 mb-6">
              Folders organized by trip — click to explore
            </p>

            {/* Stats row */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1.5">
                <Globe className="h-4 w-4 text-gray-400" strokeWidth={1.5} />
                <span>
                  <span className="font-semibold text-gray-900">
                    {trips.length}
                  </span>{" "}
                  trips
                </span>
              </span>
              <span className="text-gray-300" aria-hidden="true">·</span>
              <span className="flex items-center gap-1.5">
                <ImageIcon
                  className="h-4 w-4 text-gray-400"
                  strokeWidth={1.5}
                />
                <span>
                  <span className="font-semibold text-gray-900">
                    {totalPhotos}
                  </span>{" "}
                  photos
                </span>
              </span>
              <span className="text-gray-300" aria-hidden="true">·</span>
              <span className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-gray-400" strokeWidth={1.5} />
                <span>
                  <span className="font-semibold text-gray-900">
                    {uniqueCountries}
                  </span>{" "}
                  countries
                </span>
              </span>
            </div>
          </header>

          {/* Trip grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-12">
            {trips.map((trip) => (
              <TripCard key={trip.slug} trip={trip} />
            ))}
          </div>

          {/* Country tag strip */}
          <div className="border-t border-gray-200 pt-8">
            <p className="text-xs text-gray-400 uppercase tracking-widest font-medium mb-4">
              Destinations
            </p>
            <div className="flex flex-wrap gap-2">
              {trips.map((trip) => (
                <Link
                  key={trip.slug}
                  href={`/destinations/${trip.slug}`}
                  className={cn(
                    "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm",
                    "border border-gray-200 bg-white text-sm text-gray-600",
                    "hover:bg-gray-50 hover:border-gray-300 hover:text-gray-900",
                    "transition-colors duration-150"
                  )}
                >
                  {trip.destination}
                  <span className="text-gray-400 text-xs">
                    {new Date(trip.startDate).getFullYear()}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// -----------------------------------------------------------------------------
// TripCard — individual folder card
// -----------------------------------------------------------------------------
interface TripCardProps {
  trip: {
    slug: string;
    destination: string;
    continent: string;
    startDate: string;
    endDate: string;
    coverSrc: string;
    excerpt: string;
    photoCount: number;
  };
}

function TripCard({ trip }: TripCardProps) {
  return (
    <Link
      href={`/destinations/${trip.slug}`}
      className={cn(
        "group block bg-white border border-gray-200 rounded-lg overflow-hidden",
        "hover:bg-gray-50 hover:border-gray-300 hover:shadow-xs",
        "transition-all duration-150"
      )}
      aria-label={`View ${trip.destination} trip — ${trip.photoCount} photos`}
    >
      {/* Cover image */}
      <div className="relative w-full aspect-video overflow-hidden bg-gray-100">
        <Image
          src={trip.coverSrc}
          alt={`${trip.destination} travel photography cover`}
          fill
          sizes="(max-width: 640px) 100vw, 50vw"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          unoptimized
        />
      </div>

      {/* Card body */}
      <div className="p-4">
        {/* Folder icon + destination name */}
        <div className="flex items-center gap-2 mb-1">
          <span aria-hidden="true" className="text-base leading-none">
            &#128193;
          </span>
          <span className="font-semibold text-gray-900 text-base leading-tight">
            {trip.destination}
          </span>
        </div>

        {/* Date range */}
        <p className="text-xs text-gray-400 mb-2 ml-7">
          {formatDateRange(trip.startDate, trip.endDate)}
        </p>

        {/* Meta info */}
        <p className="text-xs text-gray-400 mb-3 ml-7">
          <span className="text-gray-600 font-medium">
            {trip.photoCount} photos
          </span>
          <span className="mx-1.5 text-gray-300">·</span>
          <span>{trip.continent}</span>
        </p>

        {/* Excerpt — single line clamp */}
        <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed ml-7">
          {trip.excerpt}
        </p>
      </div>
    </Link>
  );
}

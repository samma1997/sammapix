import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllTrips } from "@/lib/destinations";
import { getEnrichedTrip } from "@/lib/portfolio-data";
import { GalleryGrid } from "@/components/portfolio/GalleryGrid";

// ---------------------------------------------------------------------------
// Static params
// ---------------------------------------------------------------------------
export const revalidate = 60; // ISR: refresh every 60s

export async function generateStaticParams() {
  return getAllTrips().map((t) => ({ slug: t.slug }));
}

// ---------------------------------------------------------------------------
// Dynamic metadata
// ---------------------------------------------------------------------------
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const trip = await getEnrichedTrip(slug);
  if (!trip) return {};

  const year = new Date(trip.startDate).getFullYear();

  return {
    title: `${trip.destination} ${year} — Travel Photography`,
    description: trip.description.slice(0, 155),
    alternates: {
      canonical: `https://sammapix.com/about/${trip.slug}`,
    },
    openGraph: {
      title: `${trip.destination} ${year} — Travel Photography`,
      description: trip.description.slice(0, 155),
      url: `https://sammapix.com/about/${trip.slug}`,
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
  const s = new Date(start);
  const e = new Date(end);

  const sDay = s.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
  const eDay = e.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
  const eYear = e.getFullYear();

  // Stesso anno: "6 Mar – 20 Mar 2025"
  if (s.getFullYear() === e.getFullYear()) {
    return `${sDay} – ${eDay} ${eYear}`;
  }

  // Anni diversi: "25 Mar 2023 – 15 Apr 2024"
  return `${formatDate(start)} – ${formatDate(end)}`;
}

// ---------------------------------------------------------------------------
// Page component (server component)
// ---------------------------------------------------------------------------
export default async function TripPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const trip = await getEnrichedTrip(slug);
  if (!trip) notFound();

  const year = new Date(trip.startDate).getFullYear();

  // Schema JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: `${trip.destination} Photography — ${year}`,
    description: trip.description.slice(0, 200),
    url: `https://sammapix.com/about/${trip.slug}`,
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
      {/* Header minimal                                                      */}
      {/* ------------------------------------------------------------------ */}
      <div className="px-4 sm:px-6 py-8 max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-xs text-gray-400 mb-6"
        >
          <Link
            href="/about"
            className="hover:text-gray-600 transition-colors"
          >
            about
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-gray-600">
            {trip.destination.toLowerCase()}
          </span>
        </nav>

        {/* Titolo + date + contatore */}
        <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">
          {trip.destination}
        </h1>
        <p className="text-sm text-gray-400 mt-1">
          {formatDateRange(trip.startDate, trip.endDate)}
          {" \u00b7 "}
          {trip.photos.length} photographs
        </p>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Gallery grid — 3 colonne desktop, 2 tablet, 1 mobile              */}
      {/* ------------------------------------------------------------------ */}
      <section
        aria-label={`${trip.destination} travel photographs`}
        className="max-w-6xl mx-auto px-4 sm:px-6 pb-16"
      >
        <GalleryGrid photos={trip.photos} />
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Back link                                                           */}
      {/* ------------------------------------------------------------------ */}
      <div className="px-4 sm:px-6 pb-16 max-w-6xl mx-auto">
        <Link
          href="/about"
          className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
        >
          &larr; back to about
        </Link>
      </div>
    </>
  );
}

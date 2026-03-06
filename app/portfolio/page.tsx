import React from "react";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { getAllTrips } from "@/lib/destinations";

export const metadata: Metadata = {
  title: "Portfolio — Luca Sammarco Photography",
  description:
    "Photography portfolio organized by travel destination: Sri Lanka, Bali, Thailand, Japan, China. Curated travel photographs with stories from each journey.",
  alternates: {
    canonical: "https://sammapix.com/portfolio",
  },
  openGraph: {
    title: "Portfolio — Luca Sammarco Photography",
    description:
      "Photography portfolio organized by travel destination: Sri Lanka, Bali, Thailand, Japan, China.",
    url: "https://sammapix.com/portfolio",
    type: "website",
  },
};

export default function PortfolioPage() {
  const trips = getAllTrips();

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
      url: `https://sammapix.com/portfolio/${t.slug}`,
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

      <div className="py-10 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">

          {/* Page header — minimal, stile Notion */}
          <header className="mb-10">
            <h1 className="text-sm font-normal text-gray-400 lowercase tracking-wide">
              portfolio
            </h1>
            <div className="mt-3 h-px bg-gray-100 w-full" />
          </header>

          {/* Trip grid — fotografico, card con immagine e overlay testo */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {trips.map((trip) => (
              <TripCard key={trip.slug} trip={trip} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

// -----------------------------------------------------------------------------
// TripCard — solo foto di copertina con testo sovrapposto
// -----------------------------------------------------------------------------
interface TripCardProps {
  trip: {
    slug: string;
    destination: string;
    startDate: string;
    coverSrc: string;
  };
}

function TripCard({ trip }: TripCardProps) {
  const year = new Date(trip.startDate).getFullYear();

  return (
    <Link
      href={`/portfolio/${trip.slug}`}
      aria-label={`${trip.destination} ${year}`}
      className="group relative block aspect-[3/4] overflow-hidden bg-gray-100"
    >
      <Image
        src={trip.coverSrc}
        alt={`${trip.destination} travel photography ${year}`}
        fill
        sizes="(max-width: 640px) 50vw, 33vw"
        className="object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.02]"
        unoptimized
      />

      {/* Gradient bottom overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent"
        aria-hidden="true"
      />

      {/* Testo overlay bottom */}
      <div className="absolute bottom-0 left-0 right-0 px-3 pb-3">
        <p className="text-white text-sm font-bold leading-tight">
          {trip.destination}
        </p>
        <p className="text-white/60 text-xs mt-0.5">{year}</p>
      </div>
    </Link>
  );
}

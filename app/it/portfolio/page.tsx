import React from "react";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { getAllTrips } from "@/lib/destinations";
import { APP_URL } from "@/lib/constants";

const EN_URL = `${APP_URL}/portfolio`;
const IT_URL = `${APP_URL}/it/portfolio`;

export const metadata: Metadata = {
  title: "Portfolio - Fotografia di Luca Sammarco",
  description:
    "Portfolio fotografico organizzato per destinazione di viaggio. Fotografie di viaggio curate da Sri Lanka, Bali, Giappone e altri paesi, con una storia per ogni viaggio.",
  alternates: {
    canonical: IT_URL,
    languages: { en: EN_URL, it: IT_URL, "x-default": EN_URL },
  },
  openGraph: {
    title: "Portfolio - Fotografia di Luca Sammarco",
    description:
      "Portfolio fotografico organizzato per destinazione di viaggio. Fotografie di viaggio curate da tutto il mondo.",
    url: IT_URL,
    type: "website",
    locale: "it_IT",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "SammaPix" }],
  },
};

export default function PortfolioItPage() {
  const trips = getAllTrips();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: "Portfolio di fotografia di viaggio - Luca Sammarco",
    description:
      "Una raccolta curata di fotografie di viaggio organizzate per destinazione, tra Asia e non solo.",
    author: {
      "@type": "Person",
      name: "Luca Sammarco",
      url: "https://sammapix.com",
    },
    hasPart: trips.map((t) => ({
      "@type": "ImageGallery",
      name: `${t.destination}- ${new Date(t.startDate).getFullYear()}`,
      description: t.excerpt,
      url: `https://sammapix.com/portfolio/${t.slug}`,
      about: {
        "@type": "Place",
        name: t.destination,
        containedInPlace: { "@type": "Country", name: t.country },
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
          <header className="mb-10">
            <h1 className="text-sm font-normal text-gray-400 lowercase tracking-wide">portfolio</h1>
            <div className="mt-3 h-px bg-gray-100 w-full" />
          </header>

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

interface TripCardProps {
  trip: { slug: string; destination: string; startDate: string; coverSrc: string };
}

function TripCard({ trip }: TripCardProps) {
  const year = new Date(trip.startDate).getFullYear();

  return (
    <Link
      href={`/about/${trip.slug}`}
      aria-label={`${trip.destination} ${year}`}
      className="group relative block aspect-[3/4] overflow-hidden bg-gray-100"
    >
      <Image
        src={trip.coverSrc}
        alt={`Fotografia di viaggio a ${trip.destination} ${year}`}
        fill
        sizes="(max-width: 640px) 50vw, 33vw"
        className="object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.02]"
        unoptimized
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent" aria-hidden="true" />
      <div className="absolute bottom-0 left-0 right-0 px-3 pb-3">
        <p className="text-white text-sm font-bold leading-tight">{trip.destination}</p>
        <p className="text-white/60 text-xs mt-0.5">{year}</p>
      </div>
    </Link>
  );
}

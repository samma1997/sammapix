import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import HeroSection from "@/components/layout/HeroSection";
import { getAllTrips } from "@/lib/destinations";

export default function HomePage() {
  const trips = getAllTrips();

  return (
    <>
      {/* 1. Hero fotografico editoriale */}
      <HeroSection />

      <div className="border-t border-gray-100" />

      {/* 2. Trips list — griglia compatta */}
      <section className="py-10 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <header className="mb-6">
            <h2 className="text-sm font-normal text-gray-400 lowercase tracking-wide">
              trips
            </h2>
            <div className="mt-3 h-px bg-gray-100 w-full" />
          </header>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {trips.map((trip) => {
              const year = new Date(trip.startDate).getFullYear();
              return (
                <Link
                  key={trip.slug}
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

                  {/* Gradient overlay */}
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    aria-hidden="true"
                  />

                  {/* Testo overlay — visibile su hover */}
                  <div className="absolute bottom-0 left-0 right-0 px-3 pb-3 translate-y-1 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <p className="text-white text-sm font-bold leading-tight">
                      {trip.destination}
                    </p>
                    <p className="text-white/60 text-xs mt-0.5">{year}</p>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Link view all */}
          <div className="mt-6 text-right">
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-1 text-xs text-gray-400 hover:text-gray-700 transition-colors"
            >
              view all
              <ArrowRight className="h-3 w-3" strokeWidth={1.5} />
            </Link>
          </div>
        </div>
      </section>

      <div className="border-t border-gray-100" />

      {/* 3. Tools teaser */}
      <section className="py-10 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <header className="mb-6">
            <h2 className="text-sm font-normal text-gray-400 lowercase tracking-wide">
              image tools
            </h2>
            <div className="mt-2 h-px bg-gray-100 w-full" />
            <p className="mt-3 text-xs text-gray-400">
              Free browser-based tools for photographers and web creators.
            </p>
          </header>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {/* Compress */}
            <Link
              href="/tools/compress"
              className="group flex flex-col justify-between p-4 border border-gray-200 rounded-md bg-white hover:bg-gray-50 transition-colors"
            >
              <div>
                <p className="text-sm font-medium text-gray-900 mb-1">Compress</p>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Reduce file size without quality loss
                </p>
              </div>
              <ArrowRight className="h-3.5 w-3.5 text-gray-300 group-hover:text-gray-600 transition-colors mt-4 self-end" strokeWidth={1.5} />
            </Link>

            {/* WebP */}
            <Link
              href="/tools/webp"
              className="group flex flex-col justify-between p-4 border border-gray-200 rounded-md bg-white hover:bg-gray-50 transition-colors"
            >
              <div>
                <p className="text-sm font-medium text-gray-900 mb-1">WebP</p>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Convert to modern format, 30% lighter
                </p>
              </div>
              <ArrowRight className="h-3.5 w-3.5 text-gray-300 group-hover:text-gray-600 transition-colors mt-4 self-end" strokeWidth={1.5} />
            </Link>

            {/* AI Rename */}
            <Link
              href="/tools/ai-rename"
              className="group flex flex-col justify-between p-4 border border-gray-200 rounded-md bg-white hover:bg-gray-50 transition-colors"
            >
              <div>
                <p className="text-sm font-medium text-gray-900 mb-1">AI Rename</p>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Auto-generate SEO filenames with AI
                </p>
              </div>
              <ArrowRight className="h-3.5 w-3.5 text-gray-300 group-hover:text-gray-600 transition-colors mt-4 self-end" strokeWidth={1.5} />
            </Link>

            {/* EXIF — coming soon */}
            <div className="flex flex-col justify-between p-4 border border-dashed border-gray-200 rounded-md bg-white cursor-default">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-sm font-medium text-gray-400">EXIF</p>
                  <span className="text-[10px] font-medium text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded border border-dashed border-gray-200">
                    soon
                  </span>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed">
                  Strip metadata and GPS data from photos
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

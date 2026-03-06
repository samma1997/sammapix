// HeroSection — server component
// Carica i dati dei viaggi dal data layer e renderizza il hero fotografico
// full-width con griglia editoriale. Nessun testo sovrapposto alle foto.

import Image from "next/image";
import Link from "next/link";
import { getAllTrips } from "@/lib/destinations";

export default function HeroSection() {
  const trips = getAllTrips();

  // I 4 viaggi principali nell'ordine: sri-lanka, bali, japan, thailand
  const heroSlugs = ["sri-lanka-2025", "bali-2024", "japan-2023", "thailand-2024"];
  const heroTrips = heroSlugs
    .map((slug) => trips.find((t) => t.slug === slug))
    .filter((t): t is NonNullable<typeof t> => t !== undefined);

  // Fallback: se un viaggio mancasse, usa i primi 4 disponibili
  const displayTrips = heroTrips.length >= 4 ? heroTrips : trips.slice(0, 4);

  return (
    <section className="px-4 sm:px-6 pb-8">
      <div className="max-w-5xl mx-auto">

        {/* Intro testuale minimal — sopra il hero */}
        <div className="mb-6 pt-10">
          <p className="text-sm text-gray-500 font-medium tracking-tight">
            Luca Sammarco
          </p>
          <div className="w-full h-px bg-gray-200 my-2" />
          <p className="text-xs text-gray-400 tracking-wide">
            travel photographer&nbsp;&middot;&nbsp;tool builder
          </p>
        </div>

        {/* Griglia hero fotografica */}
        <Link href="/portfolio" className="group block">
          <div
            className="grid gap-1.5 min-h-[60vh] sm:min-h-[70vh] lg:min-h-[80vh]"
            style={{
              gridTemplateColumns: "2fr 1fr",
              gridTemplateRows: "1fr 1fr",
            }}
          >
            {/* Foto 1 — grande, copre tutta la colonna sinistra */}
            {displayTrips[0] && (
              <div
                className="relative overflow-hidden rounded-md bg-gray-100"
                style={{ gridRow: "1 / 3" }}
              >
                <Image
                  src={displayTrips[0].coverSrc}
                  alt={`${displayTrips[0].destination} travel photography`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                  sizes="(max-width: 640px) 67vw, (max-width: 1024px) 50vw, 660px"
                  priority
                  unoptimized
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
              </div>
            )}

            {/* Foto 2 — top destra */}
            {displayTrips[1] && (
              <div className="relative overflow-hidden rounded-md bg-gray-100">
                <Image
                  src={displayTrips[1].coverSrc}
                  alt={`${displayTrips[1].destination} travel photography`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                  sizes="(max-width: 640px) 33vw, (max-width: 1024px) 25vw, 320px"
                  unoptimized
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
              </div>
            )}

            {/* Foto 3 e 4 — bottom destra, due foto affiancate */}
            <div className="grid grid-cols-2 gap-1.5" style={{ gridColumn: "2 / 3", gridRow: "2 / 3" }}>
              {displayTrips[2] && (
                <div className="relative overflow-hidden rounded-md bg-gray-100">
                  <Image
                    src={displayTrips[2].coverSrc}
                    alt={`${displayTrips[2].destination} travel photography`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                    sizes="(max-width: 640px) 17vw, (max-width: 1024px) 13vw, 160px"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
                </div>
              )}
              {displayTrips[3] && (
                <div className="relative overflow-hidden rounded-md bg-gray-100">
                  <Image
                    src={displayTrips[3].coverSrc}
                    alt={`${displayTrips[3].destination} travel photography`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                    sizes="(max-width: 640px) 17vw, (max-width: 1024px) 13vw, 160px"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
                </div>
              )}
            </div>
          </div>
        </Link>

        {/* Link "view all trips" — centrato, sotto il hero */}
        <div className="mt-4 text-center">
          <Link
            href="/portfolio"
            className="text-xs text-gray-400 hover:text-gray-700 transition-colors hover:underline underline-offset-4"
          >
            &rarr; view all trips
          </Link>
        </div>
      </div>
    </section>
  );
}

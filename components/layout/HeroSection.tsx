// HeroSection — server component
// Griglia fotografica con più foto random da tutti i viaggi.
// Ogni foto linka direttamente alla galleria del viaggio specifico.

import Image from "next/image";
import Link from "next/link";
import { getAllTrips } from "@/lib/destinations";

interface HeroPhoto {
  src: string;
  slug: string;
  destination: string;
  alt: string;
  span?: "tall"; // alcune foto occupano 2 righe per varietà
}

export default function HeroSection() {
  const trips = getAllTrips();

  // Raccoglie cover + 2 foto per viaggio → ~15 foto totali
  const pool: HeroPhoto[] = trips.flatMap((trip) => [
    {
      src: trip.coverSrc,
      slug: trip.slug,
      destination: trip.destination,
      alt: `${trip.destination} travel photography`,
    },
    ...trip.photos.slice(0, 2).map((p) => ({
      src: p.srcThumb,
      slug: trip.slug,
      destination: trip.destination,
      alt: p.alt,
    })),
  ]);

  // Shuffle deterministico — ordine fisso ma che mescola i viaggi
  // (interleave: trip0-cover, trip1-cover, trip2-cover, trip0-ph1, ...)
  const display: HeroPhoto[] = [];
  const byTrip = trips.map((_, i) => pool.slice(i * 3, i * 3 + 3));
  const maxPhotosPerTrip = 3;
  for (let row = 0; row < maxPhotosPerTrip; row++) {
    for (const tripPhotos of byTrip) {
      if (tripPhotos[row]) display.push(tripPhotos[row]);
    }
  }

  // Prendi le prime 12 per non riempire troppo
  const photos = display.slice(0, 12);

  return (
    <section className="px-4 sm:px-6 pt-8 pb-8">
      <div className="max-w-5xl mx-auto">

        {/* Griglia foto — 3 colonne, aspect 4/3, ogni foto → proprio viaggio */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-1 sm:gap-1.5">
          {photos.map((photo, i) => (
            <Link
              key={`${photo.slug}-${i}`}
              href={`/portfolio/${photo.slug}`}
              className="group relative block overflow-hidden bg-gray-100 aspect-[4/3]"
              aria-label={`View ${photo.destination} gallery`}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                priority={i < 4}
                unoptimized
              />
              {/* Overlay con destinazione su hover */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
              <div className="absolute bottom-0 left-0 right-0 px-2 pb-2 translate-y-1 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <p className="text-white text-xs font-medium leading-tight truncate">
                  {photo.destination}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Link "view all" */}
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

"use client";

// HeroSection — strip fotografica a tutta altezza, ispirata a Ralph Gibson
// Sfondo scuro, foto a colonne verticali, ogni foto → viaggio specifico

import Image from "next/image";
import Link from "next/link";

// Una foto rappresentativa per ogni viaggio
const HERO_PHOTOS = [
  { slug: "sri-lanka-2025",  src: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_fill,f_auto,q_auto,w_600,h_900/v1/sammapix/portfolio/sri-lanka/01-gangaramaya-temple-buddha-statues-stupa-colombo-sri-lanka",  destination: "Sri Lanka",  year: "2025" },
  { slug: "sri-lanka-2025",  src: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_fill,f_auto,q_auto,w_600,h_900/v1/sammapix/portfolio/sri-lanka/05-nine-arches-bridge-ella-train-sri-lanka",  destination: "Ella",  year: "2025" },
  { slug: "sri-lanka-2025",  src: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_fill,f_auto,q_auto,w_600,h_900/v1/sammapix/portfolio/sri-lanka/08-sigiriya-lion-rock-fortress-aerial-view-sri-lanka",  destination: "Sigiriya",  year: "2025" },
  { slug: "sri-lanka-2025",  src: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_fill,f_auto,q_auto,w_600,h_900/v1/sammapix/portfolio/sri-lanka/11-galle-fort-lighthouse-colonial-architecture-sri-lanka",  destination: "Galle",  year: "2025" },
  { slug: "sri-lanka-2025",  src: "https://res.cloudinary.com/do9hrcwn1/image/upload/c_fill,f_auto,q_auto,w_600,h_900/v1/sammapix/portfolio/sri-lanka/15-mirissa-beach-palm-tree-sunset-sri-lanka",  destination: "Mirissa",  year: "2025" },
];

export default function HeroSection() {
  return (
    <section
      className="w-full bg-[#0a0a0a] overflow-x-auto"
      style={{ height: "calc(100vh - 56px)" }}
    >
      {/* Strip orizzontale — 5 colonne uguali, scorrimento su mobile */}
      <div
        className="flex h-full min-w-max md:min-w-0 md:grid"
        style={{
          gridTemplateColumns: `repeat(${HERO_PHOTOS.length}, 1fr)`,
        }}
      >
        {HERO_PHOTOS.map((photo, i) => (
          <Link
            key={photo.slug}
            href={`/portfolio/${photo.slug}`}
            className="group relative block h-full overflow-hidden"
            style={{ minWidth: "220px" }}
            aria-label={`${photo.destination} ${photo.year}`}
          >
            {/* Foto */}
            <Image
              src={photo.src}
              alt={`${photo.destination} travel photography ${photo.year}`}
              fill
              className="object-cover transition-all duration-700 group-hover:scale-[1.04] brightness-90 group-hover:brightness-100"
              sizes="(max-width: 768px) 220px, 20vw"
              priority={i < 3}
              unoptimized
            />

            {/* Separatore verticale sottile tra le foto */}
            {i < HERO_PHOTOS.length - 1 && (
              <div className="absolute top-0 right-0 w-px h-full bg-white/10 z-10" />
            )}

            {/* Label destinazione — bottom left, sempre visibile, minimal */}
            <div className="absolute bottom-5 left-5 z-20">
              <p className="text-white/40 text-[11px] font-medium tracking-widest uppercase transition-colors duration-300 group-hover:text-white/90">
                {photo.destination}
              </p>
              <p className="text-white/20 text-[10px] tracking-widest group-hover:text-white/50 transition-colors duration-300">
                {photo.year}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

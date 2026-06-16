"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Lightbox } from "./Lightbox";
import type { TripPhoto } from "@/lib/destinations";

interface HeroPhotoStripProps {
  /** All photos of the trip (the lightbox navigates the full gallery). */
  photos: TripPhoto[];
  /** How many photos to show in the strip (default 5). */
  visibleCount?: number;
}

/**
 * The five-column hero strip on /about, made interactive.
 * Visual layout is identical to the previous static version — only
 * click-to-open-lightbox, cursor and a11y focus are added.
 */
export function HeroPhotoStrip({ photos, visibleCount = 5 }: HeroPhotoStripProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const strip = photos.slice(0, visibleCount);

  return (
    <>
      <div className="flex h-full w-full gap-0.5">
        {strip.map((photo, index) => (
          <button
            key={photo.id}
            type="button"
            onClick={() => setLightboxIndex(index)}
            className="relative flex-1 overflow-hidden group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-inset"
            aria-label={`Open photo: ${photo.caption || photo.alt}`}
          >
            <Image
              src={photo.srcThumb}
              alt={photo.alt}
              fill
              sizes="20vw"
              className="object-cover brightness-75 group-hover:brightness-90 transition-all duration-500 ease-out"
              unoptimized
              priority={index < 3}
            />
          </button>
        ))}
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          photos={photos}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </>
  );
}

"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Lightbox } from "./Lightbox";
import type { TripPhoto } from "@/lib/destinations";

interface GalleryGridProps {
  photos: TripPhoto[];
}

export function GalleryGrid({ photos }: GalleryGridProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <>
      <div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-0.5"
        role="list"
        aria-label="Photo gallery"
      >
        {photos.map((photo, i) => (
          <button
            key={photo.id}
            role="listitem"
            className="relative aspect-[4/3] overflow-hidden group cursor-pointer focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
            onClick={() => setLightboxIndex(i)}
            aria-label={`Open photo: ${photo.caption}`}
          >
            <Image
              src={photo.srcThumb}
              alt={photo.alt}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              unoptimized
            />
            {/* Overlay hover leggero */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-300" />
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

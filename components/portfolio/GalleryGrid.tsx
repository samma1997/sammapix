"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Lightbox } from "./Lightbox";
import type { TripPhoto } from "@/lib/destinations";

interface GalleryGridProps {
  photos: TripPhoto[];
}

/**
 * True masonry layout: each photo keeps its natural aspect ratio.
 * Columns are balanced by cumulative height to avoid one column
 * being significantly taller than the others.
 */
function distributePhotos(photos: TripPhoto[], cols: number): TripPhoto[][] {
  const columns: TripPhoto[][] = Array.from({ length: cols }, () => []);
  const heights: number[] = new Array(cols).fill(0);

  for (const photo of photos) {
    // Normalised height (width=1)
    const ratio = (photo.height || 800) / (photo.width || 1200);
    // Find shortest column
    const minIdx = heights.indexOf(Math.min(...heights));
    columns[minIdx].push(photo);
    heights[minIdx] += ratio;
  }

  return columns;
}

export function GalleryGrid({ photos }: GalleryGridProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Map photo to its original index for lightbox
  const photoIndex = (photo: TripPhoto) =>
    photos.findIndex((p) => p.id === photo.id);

  return (
    <>
      {/* Desktop: 3 columns */}
      <div
        className="hidden md:flex gap-1"
        role="list"
        aria-label="Photo gallery"
      >
        {distributePhotos(photos, 3).map((col, ci) => (
          <div key={ci} className="flex flex-col gap-1 flex-1 min-w-0">
            {col.map((photo) => (
              <PhotoTile
                key={photo.id}
                photo={photo}
                index={photoIndex(photo)}
                onOpen={setLightboxIndex}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Tablet: 2 columns */}
      <div
        className="hidden sm:flex md:hidden gap-1"
        role="list"
        aria-label="Photo gallery"
      >
        {distributePhotos(photos, 2).map((col, ci) => (
          <div key={ci} className="flex flex-col gap-1 flex-1 min-w-0">
            {col.map((photo) => (
              <PhotoTile
                key={photo.id}
                photo={photo}
                index={photoIndex(photo)}
                onOpen={setLightboxIndex}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Mobile: 2 columns (più compatto) */}
      <div
        className="flex sm:hidden gap-1"
        role="list"
        aria-label="Photo gallery"
      >
        {distributePhotos(photos, 2).map((col, ci) => (
          <div key={ci} className="flex flex-col gap-1 flex-1 min-w-0">
            {col.map((photo) => (
              <PhotoTile
                key={photo.id}
                photo={photo}
                index={photoIndex(photo)}
                onOpen={setLightboxIndex}
              />
            ))}
          </div>
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

function PhotoTile({
  photo,
  index,
  onOpen,
}: {
  photo: TripPhoto;
  index: number;
  onOpen: (i: number) => void;
}) {
  const w = photo.width || 1200;
  const h = photo.height || 800;

  return (
    <button
      role="listitem"
      className="relative w-full overflow-hidden group cursor-pointer focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
      style={{ aspectRatio: `${w}/${h}` }}
      onClick={() => onOpen(index)}
      aria-label={`Open photo: ${photo.caption}`}
    >
      <Image
        src={photo.srcThumb}
        alt={photo.alt}
        fill
        sizes="(max-width: 640px) 50vw, (max-width: 768px) 50vw, 33vw"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        unoptimized
      />
      {/* Caption overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <p className="absolute bottom-3 left-3 right-3 text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 line-clamp-1">
        {photo.caption}
      </p>
    </button>
  );
}

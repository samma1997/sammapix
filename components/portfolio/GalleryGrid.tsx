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

  // Split photos into 3 columns for masonry layout
  const columns: TripPhoto[][] = [[], [], []];
  photos.forEach((photo, i) => {
    columns[i % 3].push(photo);
  });

  // Map photo to its original index for lightbox
  const photoIndex = (photo: TripPhoto) => photos.findIndex(p => p.id === photo.id);

  return (
    <>
      {/* Desktop: 3-column masonry | Tablet: 2 columns | Mobile: 1 column */}
      <div className="hidden md:flex gap-0.5" role="list" aria-label="Photo gallery">
        {columns.map((col, ci) => (
          <div key={ci} className="flex flex-col gap-0.5 flex-1">
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
      <div className="hidden sm:flex md:hidden gap-0.5" role="list" aria-label="Photo gallery">
        {[0, 1].map(ci => (
          <div key={ci} className="flex flex-col gap-0.5 flex-1">
            {photos.filter((_, i) => i % 2 === ci).map((photo) => (
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

      {/* Mobile: 1 column */}
      <div className="flex sm:hidden flex-col gap-0.5" role="list" aria-label="Photo gallery">
        {photos.map((photo) => (
          <PhotoTile
            key={photo.id}
            photo={photo}
            index={photoIndex(photo)}
            onOpen={setLightboxIndex}
          />
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
  return (
    <button
      role="listitem"
      className="relative w-full overflow-hidden group cursor-pointer focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
      style={{ aspectRatio: "3/4" }}
      onClick={() => onOpen(index)}
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
      {/* Caption overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <p className="absolute bottom-3 left-3 right-3 text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 line-clamp-1">
        {photo.caption}
      </p>
    </button>
  );
}

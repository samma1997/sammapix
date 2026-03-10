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
    const ratio = (photo.height || 800) / (photo.width || 1200);
    const minIdx = heights.indexOf(Math.min(...heights));
    columns[minIdx].push(photo);
    heights[minIdx] += ratio;
  }

  return columns;
}

/** Swap Cloudinary URL width for optimized thumbnails */
function thumbUrl(url: string, width: number): string {
  return url.replace(/w_\d+/, `w_${width}`);
}

export function GalleryGrid({ photos }: GalleryGridProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const photoIndex = (photo: TripPhoto) =>
    photos.findIndex((p) => p.id === photo.id);

  const renderColumn = (col: TripPhoto[]) =>
    col.map((photo, i) => (
      <PhotoTile
        key={photo.id}
        photo={photo}
        index={photoIndex(photo)}
        onOpen={setLightboxIndex}
        eager={i < 2}
      />
    ));

  return (
    <>
      {/* Desktop: 3 columns */}
      <div className="hidden md:flex gap-1" role="list" aria-label="Photo gallery">
        {distributePhotos(photos, 3).map((col, ci) => (
          <div key={ci} className="flex flex-col gap-1 flex-1 min-w-0">
            {renderColumn(col)}
          </div>
        ))}
      </div>

      {/* Tablet: 2 columns */}
      <div className="hidden sm:flex md:hidden gap-1" role="list" aria-label="Photo gallery">
        {distributePhotos(photos, 2).map((col, ci) => (
          <div key={ci} className="flex flex-col gap-1 flex-1 min-w-0">
            {renderColumn(col)}
          </div>
        ))}
      </div>

      {/* Mobile: 2 columns */}
      <div className="flex sm:hidden gap-1" role="list" aria-label="Photo gallery">
        {distributePhotos(photos, 2).map((col, ci) => (
          <div key={ci} className="flex flex-col gap-1 flex-1 min-w-0">
            {renderColumn(col)}
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
  eager,
}: {
  photo: TripPhoto;
  index: number;
  onOpen: (i: number) => void;
  eager: boolean;
}) {
  const w = photo.width || 1200;
  const h = photo.height || 800;

  return (
    <button
      role="listitem"
      className="relative w-full overflow-hidden group cursor-pointer focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 bg-[#1A1A1A]"
      style={{ aspectRatio: `${w}/${h}` }}
      onClick={() => onOpen(index)}
      aria-label={`Open photo: ${photo.caption || photo.alt}`}
    >
      <Image
        src={thumbUrl(photo.srcThumb, 400)}
        alt={photo.alt || "Travel photograph"}
        fill
        sizes="(max-width: 640px) 50vw, (max-width: 768px) 50vw, 33vw"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        loading={eager ? "eager" : "lazy"}
      />
    </button>
  );
}

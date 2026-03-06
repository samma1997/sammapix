"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import type { TripPhoto } from "@/lib/destinations";

interface LightboxProps {
  photos: TripPhoto[];
  initialIndex: number;
  onClose: () => void;
}

export function Lightbox({ photos, initialIndex, onClose }: LightboxProps) {
  const [current, setCurrent] = useState(initialIndex);

  const goNext = useCallback(() => {
    setCurrent((i) => Math.min(i + 1, photos.length - 1));
  }, [photos.length]);

  const goPrev = useCallback(() => {
    setCurrent((i) => Math.max(i - 1, 0));
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose, goNext, goPrev]);

  // Blocca scroll del body mentre lightbox e aperto
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const photo = photos[current];

  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Photo ${current + 1} of ${photos.length}: ${photo.caption}`}
    >
      {/* Contatore — in alto a sinistra */}
      <div className="absolute top-4 left-4 text-white/60 text-xs tabular-nums select-none">
        {current + 1} / {photos.length}
      </div>

      {/* Pulsante chiudi — in alto a destra */}
      <button
        className="absolute top-3 right-4 text-white/60 hover:text-white text-3xl leading-none transition-colors duration-150 p-1"
        onClick={onClose}
        aria-label="Close lightbox"
      >
        &times;
      </button>

      {/* Freccia sinistra */}
      {current > 0 && (
        <button
          className="absolute left-2 sm:left-4 text-white/60 hover:text-white text-4xl px-3 py-8 transition-colors duration-150 select-none"
          onClick={(e) => {
            e.stopPropagation();
            goPrev();
          }}
          aria-label="Previous photo"
        >
          &#8249;
        </button>
      )}

      {/* Foto + caption — click su questo blocco non chiude il lightbox */}
      <div
        className="flex flex-col items-center gap-3 max-w-[90vw]"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={photo.src}
          alt={photo.alt}
          width={1200}
          height={800}
          className="max-h-[75vh] w-auto object-contain rounded-sm"
          unoptimized
          priority
        />
        <div className="text-center px-4">
          <p className="text-white/90 text-sm font-medium leading-snug">
            {photo.caption}
          </p>
          <p className="text-white/50 text-xs mt-1">{photo.location}</p>
        </div>
      </div>

      {/* Freccia destra */}
      {current < photos.length - 1 && (
        <button
          className="absolute right-2 sm:right-4 text-white/60 hover:text-white text-4xl px-3 py-8 transition-colors duration-150 select-none"
          onClick={(e) => {
            e.stopPropagation();
            goNext();
          }}
          aria-label="Next photo"
        >
          &#8250;
        </button>
      )}
    </div>
  );
}

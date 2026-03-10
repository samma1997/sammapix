"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import type { TripPhoto } from "@/lib/destinations";

interface LightboxProps {
  photos: TripPhoto[];
  initialIndex: number;
  onClose: () => void;
}

export function Lightbox({ photos, initialIndex, onClose }: LightboxProps) {
  const [current, setCurrent] = useState(initialIndex);
  const [loaded, setLoaded] = useState<Set<number>>(new Set([initialIndex]));
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);

  const goNext = useCallback(() => {
    setCurrent((i) => Math.min(i + 1, photos.length - 1));
  }, [photos.length]);

  const goPrev = useCallback(() => {
    setCurrent((i) => Math.max(i - 1, 0));
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose, goNext, goPrev]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // Preload adjacent images
  useEffect(() => {
    const toPreload = [current - 1, current + 1].filter(
      (i) => i >= 0 && i < photos.length
    );
    toPreload.forEach((i) => {
      if (!loaded.has(i)) {
        const img = new window.Image();
        img.src = photos[i].src;
        setLoaded((prev) => new Set(prev).add(i));
      }
    });
  }, [current, photos, loaded]);

  // Touch swipe
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - touchStartY.current;
    // Only swipe if horizontal movement > vertical and > 50px
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
      if (dx < 0) goNext();
      else goPrev();
    }
  };

  const photo = photos[current];

  return (
    <div
      className="fixed inset-0 z-50 bg-[#0A0A0A] flex items-center justify-center"
      onClick={onClose}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      role="dialog"
      aria-modal="true"
      aria-label={`Photo ${current + 1} of ${photos.length}${photo.caption ? `: ${photo.caption}` : ""}`}
    >
      {/* Counter */}
      <div className="absolute top-4 left-4 text-[#525252] text-xs tabular-nums select-none z-10">
        {current + 1} / {photos.length}
      </div>

      {/* Close button */}
      <button
        className="absolute top-3 right-4 text-[#525252] hover:text-[#E5E5E5] text-3xl leading-none transition-colors duration-150 p-1 z-10"
        onClick={onClose}
        aria-label="Close lightbox"
      >
        &times;
      </button>

      {/* Previous arrow */}
      {current > 0 && (
        <button
          className="absolute left-2 sm:left-4 text-[#525252] hover:text-[#E5E5E5] text-4xl px-3 py-8 transition-colors duration-150 select-none z-10"
          onClick={(e) => {
            e.stopPropagation();
            goPrev();
          }}
          aria-label="Previous photo"
        >
          &#8249;
        </button>
      )}

      {/* Photo + caption */}
      <div
        className="flex flex-col items-center gap-3 max-w-[90vw]"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          key={photo.id}
          src={photo.src}
          alt={photo.alt || "Travel photograph"}
          width={photo.width || 1200}
          height={photo.height || 800}
          className="max-h-[75vh] w-auto object-contain rounded-sm"
          sizes="90vw"
          priority
        />
        {(photo.caption || photo.location) && (
          <div className="text-center px-4">
            {photo.caption && (
              <p className="text-[#E5E5E5] text-sm font-medium leading-snug">
                {photo.caption}
              </p>
            )}
            {photo.location && (
              <p className="text-[#A3A3A3] text-xs mt-1">{photo.location}</p>
            )}
          </div>
        )}
      </div>

      {/* Next arrow */}
      {current < photos.length - 1 && (
        <button
          className="absolute right-2 sm:right-4 text-[#525252] hover:text-[#E5E5E5] text-4xl px-3 py-8 transition-colors duration-150 select-none z-10"
          onClick={(e) => {
            e.stopPropagation();
            goNext();
          }}
          aria-label="Next photo"
        >
          &#8250;
        </button>
      )}

      {/* Hidden preload for adjacent images */}
      {[current - 1, current + 1]
        .filter((i) => i >= 0 && i < photos.length)
        .map((i) => (
          <link
            key={photos[i].id}
            rel="preload"
            as="image"
            href={photos[i].src}
          />
        ))}
    </div>
  );
}

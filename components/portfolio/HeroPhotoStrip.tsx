"use client";

import React from "react";
import Image from "next/image";
import type { TripPhoto } from "@/lib/destinations";

interface HeroPhotoStripProps {
  /** Photos to scroll in the background (mixed across trips). */
  photos: TripPhoto[];
  /** Kept for backwards compatibility, no longer used. */
  visibleCount?: number;
}

/**
 * Animated hero background: an infinite horizontal marquee of full-height
 * photo panels that scroll slowly behind the title. Decorative (aria-hidden),
 * pauses on hover. The list is duplicated once so the loop is seamless.
 */
export function HeroPhotoStrip({ photos }: HeroPhotoStripProps) {
  if (!photos.length) return null;

  const loop = [...photos, ...photos];
  // Constant visual speed: longer strips take proportionally longer.
  const duration = Math.max(45, photos.length * 3);

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <style>{`@keyframes heroMarquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}`}</style>
      <div
        className="flex h-full w-max items-stretch will-change-transform hover:[animation-play-state:paused]"
        style={{ animation: `heroMarquee ${duration}s linear infinite` }}
      >
        {loop.map((photo, i) => (
          <div
            key={`${photo.id}-${i}`}
            className="relative h-full w-[44vw] sm:w-[28vw] md:w-[20vw] shrink-0 border-r border-black/30"
          >
            <Image
              src={photo.srcThumb}
              alt=""
              fill
              sizes="28vw"
              className="object-cover brightness-[0.62]"
              unoptimized
              priority={i < 5}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

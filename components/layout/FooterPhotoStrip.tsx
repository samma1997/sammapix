"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useSession } from "next-auth/react";

interface Photo {
  src: string;
  alt: string;
}

/**
 * Footer "Photography by Luca" strip.
 * - Shuffles the pool on mount so the photos are different on every visit.
 * - Hidden for logged-in users (they already know the photographer; this is a
 *   discovery touch aimed at new and anonymous visitors).
 * Decorative + below the fold + lazy-loaded → no SEO/LCP cost.
 */
export default function FooterPhotoStrip({ photos }: { photos: Photo[] }) {
  const { status } = useSession();
  // Deterministic first 6 for the initial render (SSR + first client paint),
  // then a random 6 after mount to avoid a hydration mismatch.
  const [shown, setShown] = useState<Photo[]>(() => photos.slice(0, 6));

  useEffect(() => {
    if (!photos.length) return;
    // Fisher-Yates shuffle, then take 6.
    const pool = [...photos];
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    setShown(pool.slice(0, 6));
  }, [photos]);

  // Hide for logged-in users.
  if (status === "authenticated") return null;
  if (!shown.length) return null;

  return (
    <div className="border-t border-gray-100 dark:border-[#2A2A2A] mt-10 pt-8">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-4">
        <div>
          <p className="text-xs font-medium text-gray-900 dark:text-[#E5E5E5]">
            Photography by Luca
          </p>
          <p className="mt-1 text-[13px] text-gray-400 dark:text-[#737373] max-w-md leading-relaxed">
            I&apos;m a travel photographer. I built these tools to handle my own
            photos, here are a few of them.
          </p>
        </div>
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-1.5 text-[13px] font-medium text-gray-500 dark:text-[#A3A3A3] hover:text-gray-900 dark:hover:text-white transition-colors duration-150 shrink-0"
        >
          See the full portfolio
          <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
        </Link>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
        {shown.map((p) => (
          <Link
            key={p.src}
            href="/portfolio"
            aria-label="View travel photography portfolio"
            className="group relative aspect-square overflow-hidden rounded-md bg-gray-100 dark:bg-[#1C1C1C]"
          >
            <Image
              src={p.src}
              alt={p.alt}
              fill
              sizes="(max-width: 640px) 33vw, 16vw"
              loading="lazy"
              className="object-cover brightness-95 group-hover:brightness-100 group-hover:scale-105 transition-all duration-500"
              unoptimized
            />
          </Link>
        ))}
      </div>
    </div>
  );
}

"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import type { TripPhoto } from "@/lib/destinations";
import { trackEvent } from "@/lib/analytics";

interface LightboxProps {
  photos: TripPhoto[];
  initialIndex: number;
  onClose: () => void;
}

/**
 * Derive a readable slug from a Cloudinary URL.
 * e.g. ".../sammapix/portfolio/sri-lanka/01-gangaramaya-temple-..." -> "01-gangaramaya-temple-..."
 */
function slugFromSrc(src: string): string {
  const clean = src.split("?")[0].replace(/\/$/, "");
  const last = clean.substring(clean.lastIndexOf("/") + 1);
  return last || "photo";
}

/**
 * Build a high-resolution download URL that forces a download (attachment)
 * with a readable filename, by swapping the Cloudinary transformation segment.
 */
function buildDownloadUrl(src: string): { url: string; filename: string } {
  const slug = slugFromSrc(src);
  // Cloudinary appends ".jpg" automatically to the fl_attachment filename,
  // so the value here must NOT include the extension.
  const attachmentName = `sammapix-${slug}`;
  const filename = `${attachmentName}.jpg`;
  // fl_attachment:<name> must be its OWN chained transformation component
  // (separated by "/"), placed BEFORE the resize component. Putting it in the
  // same comma-segment as a resize returns a 400 from Cloudinary.
  const transform = `fl_attachment:${attachmentName}/c_limit,w_2560,q_auto:good`;
  const url = src.replace(/c_limit,f_auto,q_auto,w_1200/, transform);
  return { url, filename };
}

export function Lightbox({ photos, initialIndex, onClose }: LightboxProps) {
  const [current, setCurrent] = useState(initialIndex);
  const [loaded, setLoaded] = useState<Set<number>>(new Set([initialIndex]));
  const [isZoomed, setIsZoomed] = useState(false);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  // Pan state (only used when zoomed)
  const isPanning = useRef(false);
  const panStart = useRef({ x: 0, y: 0 });
  const scrollStart = useRef({ left: 0, top: 0 });
  const zoomContainerRef = useRef<HTMLDivElement>(null);
  const lastTap = useRef(0);

  const goNext = useCallback(() => {
    setIsZoomed(false);
    setCurrent((i) => Math.min(i + 1, photos.length - 1));
  }, [photos.length]);

  const goPrev = useCallback(() => {
    setIsZoomed(false);
    setCurrent((i) => Math.max(i - 1, 0));
  }, []);

  // Reset zoom whenever the photo changes
  useEffect(() => {
    setIsZoomed(false);
  }, [current]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isZoomed) setIsZoomed(false);
        else onClose();
      }
      if (!isZoomed) {
        if (e.key === "ArrowRight") goNext();
        if (e.key === "ArrowLeft") goPrev();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose, goNext, goPrev, isZoomed]);

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

  const photo = photos[current];
  const { url: downloadUrl, filename: downloadName } = buildDownloadUrl(photo.src);

  const handleDownload = useCallback(() => {
    try {
      trackEvent("portfolio_photo_download", { id: photo.id });
    } catch {
      /* analytics is best-effort */
    }
  }, [photo.id]);

  // Touch swipe (only when NOT zoomed; when zoomed the container scrolls/pans)
  const onTouchStart = (e: React.TouchEvent) => {
    if (isZoomed) return;
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (isZoomed) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - touchStartY.current;
    // Only swipe if horizontal movement > vertical and > 50px
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
      if (dx < 0) goNext();
      else goPrev();
    }
  };

  // Toggle zoom centred on the click/tap point
  const toggleZoom = (e: React.MouseEvent) => {
    e.stopPropagation();
    const next = !isZoomed;
    setIsZoomed(next);
    if (next) {
      // After render, centre the scroll on the click point
      requestAnimationFrame(() => {
        const el = zoomContainerRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const relX = (e.clientX - rect.left) / rect.width;
        const relY = (e.clientY - rect.top) / rect.height;
        el.scrollLeft = relX * (el.scrollWidth - el.clientWidth);
        el.scrollTop = relY * (el.scrollHeight - el.clientHeight);
      });
    }
  };

  // Mouse pan (drag-to-scroll) when zoomed
  const onPanMouseDown = (e: React.MouseEvent) => {
    if (!isZoomed) return;
    isPanning.current = true;
    panStart.current = { x: e.clientX, y: e.clientY };
    const el = zoomContainerRef.current;
    if (el) scrollStart.current = { left: el.scrollLeft, top: el.scrollTop };
  };

  const onPanMouseMove = (e: React.MouseEvent) => {
    if (!isPanning.current) return;
    const el = zoomContainerRef.current;
    if (!el) return;
    el.scrollLeft = scrollStart.current.left - (e.clientX - panStart.current.x);
    el.scrollTop = scrollStart.current.top - (e.clientY - panStart.current.y);
  };

  const endPan = () => {
    isPanning.current = false;
  };

  // Double-tap on touch to toggle zoom out
  const onImageTouchEnd = (e: React.TouchEvent) => {
    const now = Date.now();
    if (now - lastTap.current < 300 && isZoomed) {
      e.stopPropagation();
      setIsZoomed(false);
    }
    lastTap.current = now;
  };

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

      {/* Top-right controls: download + close */}
      <div className="absolute top-3 right-4 flex items-center gap-3 z-10">
        <a
          href={downloadUrl}
          download={downloadName}
          onClick={(e) => {
            e.stopPropagation();
            handleDownload();
          }}
          className="text-[#525252] hover:text-[#E5E5E5] transition-colors duration-150 p-1"
          aria-label="Download photo in high resolution for personal use"
          title="Download (high-res, personal use)"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
        </a>
        <button
          className="text-[#525252] hover:text-[#E5E5E5] text-3xl leading-none transition-colors duration-150 p-1"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          aria-label="Close lightbox"
        >
          &times;
        </button>
      </div>

      {/* Previous arrow (hidden while zoomed) */}
      {!isZoomed && current > 0 && (
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
        {isZoomed ? (
          // Zoomed: scrollable / pannable container with the image at larger size.
          // touch-action: pinch-zoom lets iOS/Android pinch-zoom natively.
          <div
            ref={zoomContainerRef}
            className="overflow-auto cursor-grab active:cursor-grabbing max-w-[92vw] max-h-[85vh] rounded-sm"
            style={{ touchAction: "pinch-zoom" }}
            onMouseDown={onPanMouseDown}
            onMouseMove={onPanMouseMove}
            onMouseUp={endPan}
            onMouseLeave={endPan}
            onTouchEnd={onImageTouchEnd}
          >
            <Image
              key={photo.id}
              src={photo.src}
              alt={photo.alt || "Travel photograph"}
              width={photo.width || 1200}
              height={photo.height || 800}
              className="w-auto max-w-none select-none"
              style={{ height: "min(160vh, 200vw)" }}
              sizes="92vw"
              draggable={false}
              onClick={toggleZoom}
              priority
            />
          </div>
        ) : (
          <Image
            key={photo.id}
            src={photo.src}
            alt={photo.alt || "Travel photograph"}
            width={photo.width || 1200}
            height={photo.height || 800}
            className="max-h-[75vh] w-auto object-contain rounded-sm cursor-zoom-in"
            sizes="90vw"
            onClick={toggleZoom}
            priority
          />
        )}

        {/* Caption + location + license note */}
        <div className="text-center px-4">
          {photo.caption && (
            <p className="text-[#E5E5E5] text-sm font-medium leading-snug">
              {photo.caption}
            </p>
          )}
          {photo.location && (
            <p className="text-[#A3A3A3] text-xs mt-1">{photo.location}</p>
          )}
          <p className="text-[#737373] text-xs mt-2 max-w-md mx-auto leading-relaxed">
            Free for personal use — print it or set it as your wallpaper.
            {" "}&copy; Luca Sammarco &middot; Not for commercial use.
          </p>
        </div>
      </div>

      {/* Next arrow (hidden while zoomed) */}
      {!isZoomed && current < photos.length - 1 && (
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

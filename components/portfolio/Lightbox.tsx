"use client";

import React, { useState, useEffect, useCallback, useRef, useMemo } from "react";
import Image from "next/image";
import type { TripPhoto } from "@/lib/destinations";
import { trackEvent } from "@/lib/analytics";
import { usePortfolioSocial } from "@/hooks/usePortfolioSocial";

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
  // License gate visibility (accept-before-download). Pending download URL is
  // kept on the anchor itself; we only need a flag to render the dialog.
  const [showGate, setShowGate] = useState(false);
  const downloadAnchorRef = useRef<HTMLAnchorElement>(null);

  // Social layer: counters, likes, license-accepted flag.
  const ids = useMemo(() => photos.map((p) => p.id), [photos]);
  const { getStat, isLiked, toggleLike, accepted, markAccepted, recordDownload } =
    usePortfolioSocial(ids);

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
      // The gate dialog handles its own Escape (capture phase) and stops it.
      if (showGate) return;
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
  }, [onClose, goNext, goPrev, isZoomed, showGate]);

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

  // Fire the actual browser download (via the hidden anchor) + record it.
  const triggerDownload = useCallback(() => {
    try {
      trackEvent("portfolio_photo_download", { id: photo.id });
    } catch {
      /* analytics is best-effort */
    }
    // Programmatically click the real <a download> so the file saves with the
    // proper Cloudinary fl_attachment URL/filename.
    downloadAnchorRef.current?.click();
    // Record the download server-side (best-effort) and bump the counter.
    void recordDownload(photo.id);
  }, [photo.id, recordDownload]);

  // Download click entry point: gate on first time, then go straight through.
  const onDownloadClick = useCallback(() => {
    if (accepted) {
      triggerDownload();
    } else {
      setShowGate(true);
    }
  }, [accepted, triggerDownload]);

  // User accepted the personal-use license in the gate dialog.
  const onAcceptLicense = useCallback(() => {
    markAccepted();
    setShowGate(false);
    triggerDownload();
  }, [markAccepted, triggerDownload]);

  // Close the gate on Escape without leaving the lightbox.
  useEffect(() => {
    if (!showGate) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        setShowGate(false);
      }
    };
    window.addEventListener("keydown", handleKey, true);
    return () => window.removeEventListener("keydown", handleKey, true);
  }, [showGate]);

  const stat = getStat(photo.id);
  const liked = isLiked(photo.id);

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
      {/* Counter (top-left, discreet) */}
      <div className="absolute top-4 left-4 sm:top-5 sm:left-6 rounded-full bg-black/40 backdrop-blur-sm px-2.5 py-1 text-[#D4D4D4] text-xs tabular-nums select-none z-20">
        {current + 1} / {photos.length}
      </div>

      {/* Hidden real download anchor — clicked programmatically after the
          license gate so the file saves with the proper Cloudinary URL. */}
      <a
        ref={downloadAnchorRef}
        href={downloadUrl}
        download={downloadName}
        className="hidden"
        aria-hidden="true"
        tabIndex={-1}
      />

      {/* Top-right controls: like + download CTA + close */}
      <div className="absolute top-4 right-4 sm:top-5 sm:right-6 flex items-center gap-2 sm:gap-3 z-20">
        {/* Like (heart) — outline pill, fills red when liked */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            void toggleLike(photo.id);
          }}
          className={`group flex h-10 items-center gap-1.5 rounded-full border px-3 text-sm font-medium backdrop-blur-sm transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
            liked
              ? "border-[#F43F5E]/40 bg-[#F43F5E]/15 text-[#FB7185]"
              : "border-white/20 bg-black/30 text-[#E5E5E5] hover:border-white/40 hover:bg-black/50"
          }`}
          aria-label={liked ? "Unlike this photo" : "Like this photo"}
          aria-pressed={liked}
          title={liked ? "Unlike" : "Like"}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill={liked ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="1.9"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className="transition-transform duration-150 group-active:scale-90"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
          {stat.likes > 0 && (
            <span className="tabular-nums select-none">{stat.likes}</span>
          )}
        </button>

        {/* Download — prominent on-brand CTA, the visual focal point */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onDownloadClick();
          }}
          className="flex h-10 items-center gap-2 rounded-lg bg-[#6366F1] px-4 text-sm font-medium text-white shadow-lg shadow-[#6366F1]/25 transition-all duration-150 hover:bg-[#5457E5] active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          aria-label="Download photo in high resolution for personal use"
          title="Download (high-res, personal use)"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          <span>Free download</span>
        </button>

        {/* Close — discreet but reachable */}
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/30 text-[#D4D4D4] backdrop-blur-sm transition-all duration-150 hover:border-white/30 hover:bg-black/50 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          aria-label="Close lightbox"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      {/* Previous arrow (hidden while zoomed) */}
      {!isZoomed && current > 0 && (
        <button
          className="absolute left-2 sm:left-5 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/30 text-[#D4D4D4] backdrop-blur-sm transition-all duration-150 hover:border-white/30 hover:bg-black/50 hover:text-white select-none z-20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          onClick={(e) => {
            e.stopPropagation();
            goPrev();
          }}
          aria-label="Previous photo"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
      )}

      {/* Photo — centred in the available space; info lives in a bottom bar
          overlay so it never pushes the image off-centre (Pexels-like). */}
      <div
        className="flex items-center justify-center max-w-[92vw]"
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
            className="max-h-[82vh] w-auto object-contain rounded-md cursor-zoom-in shadow-2xl shadow-black/40"
            sizes="92vw"
            onClick={toggleZoom}
            priority
          />
        )}
      </div>

      {/* Bottom info bar — caption, location, counters & license.
          Rendered as a non-intrusive overlay on a subtle gradient so it
          never shifts the image away from the optical centre. Hidden while
          zoomed to keep the canvas clean. */}
      {!isZoomed && (
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/70 via-black/35 to-transparent pb-5 pt-12 sm:pb-6 sm:pt-16"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="pointer-events-auto mx-auto flex max-w-3xl flex-col items-center px-4 text-center">
            {photo.caption && (
              <p className="text-[#FAFAFA] text-sm sm:text-base font-medium leading-snug">
                {photo.caption}
              </p>
            )}
            {photo.location && (
              <p className="text-[#D4D4D4] text-xs sm:text-sm mt-1">{photo.location}</p>
            )}

            {/* Social counters (download / like) — discreet social proof */}
            <div className="flex items-center justify-center gap-4 mt-2 text-[#A3A3A3] text-xs select-none">
              <span className="inline-flex items-center gap-1" aria-label={`${stat.downloads} downloads`}>
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                <span className="tabular-nums">{stat.downloads}</span>
              </span>
              <span
                className={`inline-flex items-center gap-1 ${liked ? "text-[#FB7185]" : ""}`}
                aria-label={`${stat.likes} likes`}
              >
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill={liked ? "currentColor" : "none"}
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
                <span className="tabular-nums">{stat.likes}</span>
              </span>
            </div>

            {/* License note — clean, human copy. No em-dash. */}
            <p className="text-[#C4C4C4] text-xs mt-2.5 leading-relaxed">
              Free to download for personal use. Print it or set it as your wallpaper.
            </p>
            <p className="text-[#8A8A8A] text-[11px] mt-0.5 leading-relaxed">
              &copy; Luca Sammarco &middot; Please don&apos;t use it commercially.
            </p>
          </div>
        </div>
      )}

      {/* Next arrow (hidden while zoomed) */}
      {!isZoomed && current < photos.length - 1 && (
        <button
          className="absolute right-2 sm:right-5 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/30 text-[#D4D4D4] backdrop-blur-sm transition-all duration-150 hover:border-white/30 hover:bg-black/50 hover:text-white select-none z-20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          onClick={(e) => {
            e.stopPropagation();
            goNext();
          }}
          aria-label="Next photo"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="9 18 15 12 9 6" />
          </svg>
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

      {/* License gate (accept-before-download) — first download only */}
      {showGate && (
        <div
          className="absolute inset-0 z-20 flex items-center justify-center bg-black/60 px-4"
          onClick={(e) => {
            e.stopPropagation();
            setShowGate(false);
          }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="pf-gate-title"
          aria-describedby="pf-gate-desc"
        >
          <div
            className="relative w-full max-w-sm rounded-2xl border border-[#262626] bg-[#141414] p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setShowGate(false)}
              className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full text-[#737373] hover:bg-white/5 hover:text-[#E5E5E5] transition-colors duration-150"
              aria-label="Cancel download"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Brand-tinted download icon as the dialog's visual anchor */}
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#6366F1]/15 text-[#818CF8]">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
            </div>

            <h2
              id="pf-gate-title"
              className="text-[#F5F5F5] text-lg font-semibold mt-4 pr-6"
            >
              Yours to enjoy, for free
            </h2>
            <p
              id="pf-gate-desc"
              className="text-[#A3A3A3] text-sm mt-2 leading-relaxed"
            >
              Print it, frame it, or set it as your wallpaper. Just keep it
              personal: no commercial use. &copy; Luca Sammarco.
            </p>

            <button
              type="button"
              autoFocus
              onClick={onAcceptLicense}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-[#6366F1] px-4 py-2.5 text-sm font-medium text-white shadow-lg shadow-[#6366F1]/25 transition-all duration-150 hover:bg-[#5457E5] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Got it, download
            </button>
            <button
              type="button"
              onClick={() => setShowGate(false)}
              className="mt-2 w-full text-center text-[#737373] hover:text-[#E5E5E5] text-sm transition-colors duration-150 py-1.5"
            >
              Maybe later
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

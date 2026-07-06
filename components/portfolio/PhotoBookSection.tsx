"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { PhotoBook } from "@/lib/photobooks";

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <path d="M17.47 14.38c-.29-.15-1.71-.84-1.98-.94-.27-.1-.46-.15-.65.15-.19.29-.75.94-.92 1.13-.17.19-.34.22-.63.07-.29-.15-1.22-.45-2.33-1.44-.86-.77-1.44-1.72-1.61-2.01-.17-.29-.02-.45.13-.6.13-.13.29-.34.44-.51.15-.17.19-.29.29-.48.1-.19.05-.36-.02-.51-.07-.15-.65-1.57-.89-2.15-.23-.56-.47-.48-.65-.49-.17-.01-.36-.01-.55-.01-.19 0-.51.07-.77.36-.27.29-1.01.99-1.01 2.41 0 1.42 1.04 2.79 1.18 2.98.15.19 2.05 3.13 4.97 4.39.69.3 1.24.48 1.66.61.7.22 1.33.19 1.84.12.56-.08 1.71-.7 1.95-1.37.24-.67.24-1.25.17-1.37-.07-.12-.26-.19-.55-.34zM12.05 21.5h-.01c-1.7 0-3.36-.46-4.81-1.32l-.34-.2-3.57.94.95-3.48-.22-.36a9.5 9.5 0 01-1.45-5.05c0-5.24 4.27-9.5 9.52-9.5 2.54 0 4.93.99 6.72 2.79a9.44 9.44 0 012.78 6.72c0 5.24-4.27 9.5-9.52 9.5zm8.1-17.6A11.36 11.36 0 0012.05.5C5.79.5.7 5.59.7 11.85c0 2.09.55 4.13 1.59 5.93L.6 23.5l5.86-1.54a11.3 11.3 0 005.59 1.42h.01c6.26 0 11.35-5.09 11.35-11.35 0-3.03-1.18-5.88-3.32-8.03z" />
  </svg>
);

export default function PhotoBookSection({ book }: { book: PhotoBook }) {
  const waHref = `https://wa.me/${book.whatsappNumber.replace(/\D/g, "")}?text=${encodeURIComponent(
    book.whatsappMessage
  )}`;

  const gallery = [
    { src: book.images.front, label: "cover" },
    { src: book.images.back, label: "back cover" },
    ...book.images.spreads.map((src) => ({ src, label: "inside" })),
  ];

  const [main, setMain] = useState(gallery[0].src);
  const sectionRef = useRef<HTMLElement>(null);
  const [showTab, setShowTab] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) =>
        setShowTab(!entry.isIntersecting && entry.boundingClientRect.top < 0),
      { threshold: 0 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const scrollToBook = () =>
    sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <>
      <section
        ref={sectionRef}
        aria-label={`${book.title} ${book.year}, the printed book`}
        className="border-y border-gray-100 dark:border-[#262626] bg-white dark:bg-[#0a0a0a] scroll-mt-4"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* LEFT, main image + thumbnails */}
            <div>
              <div className="relative aspect-[4/3] rounded-md overflow-hidden bg-gray-50 dark:bg-[#111]">
                <Image
                  key={main}
                  src={main}
                  alt={`${book.title} ${book.year}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 480px"
                  className="object-contain"
                  priority
                />
              </div>
              <div className="mt-3 grid grid-cols-4 gap-2 sm:gap-3">
                {gallery.map((img) => {
                  const active = img.src === main;
                  return (
                    <button
                      key={img.src}
                      onClick={() => setMain(img.src)}
                      aria-label={`Show ${img.label}`}
                      className={`relative aspect-square rounded-sm overflow-hidden transition ${
                        active
                          ? "ring-2 ring-gray-900 dark:ring-white"
                          : "ring-1 ring-gray-200 dark:ring-[#333] opacity-70 hover:opacity-100"
                      }`}
                    >
                      <Image
                        src={img.src}
                        alt={img.label}
                        fill
                        sizes="120px"
                        className="object-cover"
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* RIGHT, the story */}
            <div>
              <p className="text-[11px] tracking-[0.28em] uppercase text-gray-400 dark:text-[#737373]">
                {book.kicker}
              </p>
              <h2 className="mt-2 font-serif text-3xl sm:text-4xl tracking-tight text-gray-900 dark:text-[#E5E5E5]">
                {book.title}{" "}
                <span className="text-gray-300 dark:text-[#525252]">{book.year}</span>
              </h2>

              <div className="mt-4 space-y-3">
                {book.paragraphs.map((p, i) => (
                  <p key={i} className="text-sm leading-relaxed text-gray-600 dark:text-[#A3A3A3]">
                    {p}
                  </p>
                ))}
              </div>

              <p className="mt-4 text-sm leading-relaxed text-gray-900 dark:text-[#E5E5E5] font-medium">
                {book.costLine}
              </p>

              <ul className="mt-4 flex flex-wrap gap-2">
                {book.specs.map((s) => (
                  <li
                    key={s}
                    className="text-[11px] tracking-wide text-gray-500 dark:text-[#A3A3A3] border border-gray-200 dark:border-[#333] rounded-full px-3 py-1"
                  >
                    {s}
                  </li>
                ))}
              </ul>

              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-md bg-[#25D366] text-white text-sm font-medium px-5 py-2.5 hover:bg-[#1EBE5A] transition-colors"
              >
                <WhatsAppIcon className="h-4 w-4 fill-current" />
                Request on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Side slide-out, appears while scrolling past the section */}
      <div
        className={`fixed right-0 top-1/2 -translate-y-1/2 z-40 flex items-stretch transition-all duration-300 ${
          showTab ? "translate-x-0 opacity-100" : "translate-x-full opacity-0 pointer-events-none"
        }`}
      >
        {/* Panel that slides open */}
        <div
          className={`overflow-hidden transition-[width,opacity] duration-300 ${
            drawerOpen ? "w-[248px] opacity-100" : "w-0 opacity-0"
          }`}
        >
          <div className="w-[248px] h-full bg-white dark:bg-[#111] border border-gray-200 dark:border-[#262626] rounded-l-xl shadow-2xl p-4 flex flex-col gap-3">
            <div className="flex gap-3">
              <div className="relative w-14 h-[74px] shrink-0 rounded-sm overflow-hidden ring-1 ring-gray-100 dark:ring-[#262626]">
                <Image src={book.images.front} alt="" fill sizes="56px" className="object-cover" />
              </div>
              <div>
                <p className="font-serif text-lg leading-tight text-gray-900 dark:text-[#E5E5E5]">
                  {book.title} {book.year}
                </p>
                <p className="text-[11px] text-gray-500 dark:text-[#737373] mt-0.5">
                  Printed photo book
                </p>
              </div>
            </div>
            <p className="text-xs leading-relaxed text-gray-600 dark:text-[#A3A3A3]">
              {book.costLine}
            </p>
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-[#25D366] text-white text-sm font-medium px-4 py-2.5 hover:bg-[#1EBE5A] transition-colors"
            >
              <WhatsAppIcon className="h-4 w-4 fill-current" />
              Request on WhatsApp
            </a>
            <button
              onClick={scrollToBook}
              className="text-[11px] text-gray-400 hover:text-gray-600 dark:hover:text-[#A3A3A3] transition-colors"
            >
              See the book &uarr;
            </button>
          </div>
        </div>

        {/* The always-visible tab */}
        <button
          onClick={() => setDrawerOpen((o) => !o)}
          aria-label={drawerOpen ? "Close" : `Request the ${book.title} book`}
          className="self-center flex items-center gap-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-l-lg px-2.5 py-4 shadow-lg"
          style={{ writingMode: "vertical-rl" }}
        >
          <span className="rotate-180 text-xs font-medium tracking-wide flex items-center gap-2">
            <span className="text-base">📖</span>
            {drawerOpen ? "Close" : "Request the book"}
          </span>
        </button>
      </div>
    </>
  );
}

"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

// TODO: swap for the real Chrome Web Store listing URL once approved.
const STORE_URL = "https://chromewebstore.google.com/detail/hjapemceemgeefiojpngmnpblokkacgd";

function Mark({ size = 24 }: { size?: number }) {
  return (
    <svg viewBox="0 0 32 32" width={size} height={size} aria-hidden="true">
      <rect width="32" height="32" rx="7" fill="#8B5CF6" />
      <g fill="#fff">
        <rect x="8" y="6" width="4" height="4" /><rect x="12" y="6" width="4" height="4" /><rect x="16" y="6" width="4" height="4" /><rect x="20" y="6" width="4" height="4" />
        <rect x="8" y="10" width="4" height="4" />
        <rect x="8" y="14" width="4" height="4" /><rect x="12" y="14" width="4" height="4" /><rect x="16" y="14" width="4" height="4" /><rect x="20" y="14" width="4" height="4" />
        <rect x="20" y="18" width="4" height="4" />
        <rect x="8" y="22" width="4" height="4" /><rect x="12" y="22" width="4" height="4" /><rect x="16" y="22" width="4" height="4" /><rect x="20" y="22" width="4" height="4" />
      </g>
    </svg>
  );
}

// Clean product frame — matches the site's card language (light, subtle border, soft shadow).
function Device({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative mx-auto w-full max-w-[300px]">
      <div className="absolute -inset-6 bg-[radial-gradient(closest-side,rgba(139,92,246,0.16),transparent)] dark:bg-[radial-gradient(closest-side,rgba(139,92,246,0.22),transparent)]" aria-hidden="true" />
      <div className="relative rounded-2xl border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#141414] shadow-[0_20px_50px_-20px_rgba(23,23,23,0.25)] overflow-hidden">
        <div className="flex gap-1.5 px-3.5 py-2.5 border-b border-[#F0F0F0] dark:border-[#232323] bg-[#FAFAFA] dark:bg-[#1A1A1A]">
          <span className="h-2.5 w-2.5 rounded-full bg-[#E5E5E5] dark:bg-[#333]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#E5E5E5] dark:bg-[#333]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#E5E5E5] dark:bg-[#333]" />
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} loading="lazy" className="block w-full h-auto" />
      </div>
    </div>
  );
}

const H2 = "text-2xl sm:text-3xl font-semibold tracking-tight text-[#171717] dark:text-[#E5E5E5]";
const P = "mt-3 text-[15px] leading-relaxed text-[#737373] dark:text-[#A3A3A3]";
const KICK = "text-xs font-semibold tracking-wider uppercase text-[#6366F1] dark:text-[#818cf8]";
const BTN_PRIMARY =
  "inline-flex items-center justify-center gap-2 rounded-lg bg-[#171717] dark:bg-[#E5E5E5] text-white dark:text-[#171717] font-medium px-5 py-2.5 text-sm hover:opacity-90 transition-opacity";
const BTN_GHOST =
  "inline-flex items-center justify-center rounded-lg border border-[#E5E5E5] dark:border-[#2A2A2A] text-[#171717] dark:text-[#E5E5E5] font-medium px-5 py-2.5 text-sm hover:bg-[#FAFAFA] dark:hover:bg-[#1E1E1E] transition-colors";

export default function ChromeLanding() {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const els = root.current?.querySelectorAll<HTMLElement>(".rv");
    if (!els) return;
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }),
      { threshold: 0.15, rootMargin: "0px 0px -6% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div ref={root} className="bg-white dark:bg-[#191919]">
      <style>{`.rv{opacity:0;transform:translateY(14px);transition:opacity .6s cubic-bezier(.2,.7,.2,1),transform .6s cubic-bezier(.2,.7,.2,1)}.rv.in{opacity:1;transform:none}@media(prefers-reduced-motion:reduce){.rv{opacity:1;transform:none;transition:none}}`}</style>

      {/* HERO */}
      <section className="px-4 sm:px-6 pt-16 sm:pt-24 pb-14 sm:pb-20">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-10 items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#1E1E1E] px-3 py-1.5 text-xs font-medium text-[#525252] dark:text-[#A3A3A3]">
              <Mark size={15} /> Chrome extension
            </span>
            <h1 className="mt-5 text-4xl sm:text-5xl font-semibold tracking-tight text-[#171717] dark:text-[#E5E5E5] leading-[1.08]">
              Every image tool, right in your browser
            </h1>
            <p className="mt-5 text-base sm:text-lg leading-relaxed text-[#737373] dark:text-[#A3A3A3] max-w-lg">
              Compress, convert, crop and clean images, extract RAR/7z/ZIP archives, and grab every image from any page — from the browser side panel. 100% private, no uploads.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href={STORE_URL} target="_blank" rel="noopener" className={BTN_PRIMARY}>Add to Chrome — free</a>
              <Link href="/" className={BTN_GHOST}>Use the web app →</Link>
            </div>
            <p className="mt-4 text-[13px] text-[#A3A3A3] dark:text-[#737373]">100% in your browser · No account for single tools · Works on any page</p>
          </div>
          <div className="rv"><Device src="/chrome/panel-home.png" alt="SammaPix toolbox in the browser side panel" /></div>
        </div>
      </section>

      {/* TRUST */}
      <section className="px-4 sm:px-6 py-4 border-y border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#1E1E1E]">
        <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-x-8 gap-y-2 text-[13px] text-[#737373] dark:text-[#A3A3A3]">
          {["100% in your browser", "No uploads, ever", "Free to start", "12 native tools"].map((t) => (
            <span key={t} className="inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#8B5CF6]" />{t}
            </span>
          ))}
        </div>
      </section>

      {/* FEATURE 1 — compress */}
      <section className="px-4 sm:px-6 py-16 sm:py-24">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-12 items-center rv">
          <div className="order-2 lg:order-1">
            <span className={KICK}>Compress &amp; convert</span>
            <h2 className={`mt-3 ${H2}`}>See the savings before you save</h2>
            <p className={P}>
              Drag the quality slider and watch the file size drop in real time — <b className="text-[#171717] dark:text-[#E5E5E5] font-semibold">2.4&nbsp;MB → 480&nbsp;KB, −80%</b>. Choose WebP, PNG or JPG, then download. Convert, crop, watermark, blur and EXIF cleaning all work the same way, on your device.
            </p>
          </div>
          <div className="order-1 lg:order-2"><Device src="/chrome/panel-compress.png" alt="Compress with a live size preview" /></div>
        </div>
      </section>

      {/* FEATURE 2 — from page (killer) */}
      <section className="px-4 sm:px-6 py-16 sm:py-24 border-t border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#1E1E1E]">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-12 items-center rv">
          <div><Device src="/chrome/panel-page.png" alt="Grab and act on every image of a page" /></div>
          <div>
            <span className={KICK}>Grab from any page</span>
            <h2 className={`mt-3 ${H2}`}>The one thing a website can&apos;t do</h2>
            <p className={P}>
              Open the panel on a shop, a gallery, a moodboard — SammaPix shows you every image on the page. Select the ones you want and download, compress or rename them in bulk. Free up to 50 images a day, unlimited with Pro.
            </p>
            <ul className="mt-5 space-y-2.5">
              {["Bulk download to a single ZIP", "Bulk compress to save space", "Bulk rename with a pattern (photo-001, 002…)"].map((t) => (
                <li key={t} className="flex items-center gap-3 text-sm text-[#171717] dark:text-[#E5E5E5]">
                  <span className="h-4 w-4 rounded-md bg-[#6366F1] flex-none inline-flex items-center justify-center">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none"><path d="M5 12l5 5L20 6" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* FEATURE 3 — archives */}
      <section className="px-4 sm:px-6 py-16 sm:py-24">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-12 items-center rv">
          <div className="order-2 lg:order-1">
            <span className={KICK}>Archives</span>
            <h2 className={`mt-3 ${H2}`}>Open RAR &amp; 7z without installing anything</h2>
            <p className={P}>
              Extract RAR, 7z, ZIP and TAR right in the browser, powered by WebAssembly. Save files one by one or all at once. No desktop software, no uploads.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {["RAR", "7z", "ZIP", "TAR", "GZ"].map((c) => (
                <span key={c} className="px-3 py-1.5 rounded-lg border border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#1E1E1E] text-xs font-medium text-[#525252] dark:text-[#A3A3A3]">{c}</span>
              ))}
            </div>
          </div>
          <div className="order-1 lg:order-2"><Device src="/chrome/panel-gate.png" alt="Fair usage — 50 images a day free, unlimited with Pro" /></div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="px-4 sm:px-6 py-16 sm:py-20 border-t border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#1E1E1E]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className={H2}>Three clicks, done</h2>
          <div className="mt-10 grid md:grid-cols-3 gap-4 text-left">
            {[
              { e: "🧩", t: "Open the panel", d: "Click the SammaPix icon on any page. The whole toolbox lives in the side panel." },
              { e: "🛠️", t: "Pick a tool", d: "Compress, extract an archive, or grab the images off the page you're on." },
              { e: "⬇️", t: "Save locally", d: "Everything is processed on your device and saved straight to your downloads." },
            ].map((s) => (
              <div key={s.t} className="p-6 rounded-xl border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#191919]">
                <p className="text-xl mb-3">{s.e}</p>
                <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5]">{s.t}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-[#737373] dark:text-[#A3A3A3]">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="px-4 sm:px-6 py-20 sm:py-28 text-center">
        <div className="max-w-2xl mx-auto rv">
          <div className="inline-flex mb-6"><Mark size={40} /></div>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#171717] dark:text-[#E5E5E5]">Put the toolbox in your browser</h2>
          <p className="mt-4 text-base text-[#737373] dark:text-[#A3A3A3]">Free. Private. No uploads. Works on every page.</p>
          <div className="mt-8">
            <a href={STORE_URL} target="_blank" rel="noopener" className={`${BTN_PRIMARY} px-6 py-3 text-[15px]`}>Add to Chrome — free</a>
          </div>
          <p className="mt-6 text-sm text-[#737373] dark:text-[#A3A3A3]">
            Prefer the web? All 52 tools live at{" "}
            <Link href="/" className="text-[#6366F1] dark:text-[#818cf8] font-medium hover:underline">sammapix.com</Link>.
          </p>
        </div>
      </section>
    </div>
  );
}

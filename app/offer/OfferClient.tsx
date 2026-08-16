"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Shield, Zap } from "lucide-react";

// Scadenza offerta: 24 agosto 2026 23:59:59 UTC (allineata a expires_at del promo COMEBACK55 su Stripe)
const DEADLINE = Date.parse("2026-08-24T23:59:59Z");
const PAY_URL =
  "https://buy.stripe.com/eVqfZhgCO4h2bYj5NJbII02?prefilled_promo_code=COMEBACK55";

const SHOWCASE = [
  {
    tool: "Remove Background",
    blurb: "One click. No watermark. Unlimited on Pro.",
    before: "/demo/remove-bg-original.png",
    after: "/demo/remove-bg-transparent.png",
    checker: true,
  },
  {
    tool: "Upscale to 4K",
    blurb: "Turn small photos into sharp, print-ready images.",
    before: "/demo/upscale-original.jpg",
    after: "/demo/upscale-2x.jpg",
    checker: false,
  },
  {
    tool: "FilmLab film looks",
    blurb: "Cinematic and vintage grades in a click.",
    before: "/demo/filmlab-raw.jpg",
    after: "/demo/filmlab-faded.jpg",
    checker: false,
  },
];

const UNLOCKS = [
  "Unlimited AI Rename (instead of 5/day)",
  "Batch resize & compress 100+ files at once",
  "Upscale to 4K, print-ready",
  "Remove Background, unlimited, no watermark",
  "Photo Cull, FilmLab, Color Match + every Pro tool",
];

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function Cta({ expired, block }: { expired: boolean; block?: boolean }) {
  return (
    <a
      href={expired ? "/pricing" : PAY_URL}
      className={`${block ? "block w-full" : "inline-block"} bg-[#6366F1] hover:bg-[#5457E5] text-white font-semibold text-[15px] px-8 py-3.5 rounded-lg transition-colors text-center`}
    >
      {expired ? "See Pro plans" : "Get Pro for $29 →"}
    </a>
  );
}

export default function OfferClient() {
  const [remaining, setRemaining] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => setRemaining(Math.max(0, DEADLINE - Date.now()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const expired = remaining !== null && remaining <= 0;
  const d = remaining ?? 0;
  const units = [
    { v: Math.floor(d / 86400000), l: "days" },
    { v: Math.floor((d % 86400000) / 3600000), l: "hrs" },
    { v: Math.floor((d % 3600000) / 60000), l: "min" },
    { v: Math.floor((d % 60000) / 1000), l: "sec" },
  ];

  return (
    <main className="bg-white">
      {/* HERO */}
      <section className="max-w-5xl mx-auto px-5 pt-16 pb-10 text-center">
        <p className="text-lg font-semibold text-[#171717] tracking-tight mb-8">
          Samma<span className="text-[#6366F1]">Pix</span>
        </p>
        <span className="inline-block bg-[#EEF0FF] text-[#4F46E5] text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-5">
          Subscribers only · ends in {remaining === null ? "7 days" : `${units[0].v}d ${units[1].v}h`}
        </span>
        <h1 className="text-[34px] sm:text-[44px] leading-[1.05] font-bold text-[#171717] tracking-tight mb-4 max-w-2xl mx-auto">
          Your first year of Pro for <span className="text-[#6366F1]">$29</span>
        </h1>
        <p className="text-[16px] leading-relaxed text-[#525252] mb-8 max-w-xl mx-auto">
          Unlock all 88 tools. The ones that remove backgrounds, upscale to 4K,
          batch-process hundreds of photos and save you hours. For less than a
          coffee a month.
        </p>

        {/* Countdown */}
        {!expired && (
          <div className="flex gap-2 justify-center max-w-sm mx-auto mb-7">
            {units.map((u) => (
              <div key={u.l} className="flex-1 bg-[#0F1115] rounded-lg py-3">
                <div className="text-2xl font-bold text-white tabular-nums leading-none">
                  {remaining === null ? "--" : pad(u.v)}
                </div>
                <div className="text-[10px] uppercase tracking-wide text-[#8B8B8B] mt-1.5">
                  {u.l}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="flex items-center justify-center gap-3 flex-wrap">
          <Cta expired={expired} />
          <span className="text-sm text-[#A3A3A3]">
            <span className="line-through">$108</span> $29 first year · cancel anytime
          </span>
        </div>
      </section>

      {/* SHOWCASE — before/after prova reale */}
      <section className="max-w-5xl mx-auto px-5 py-10">
        <p className="text-center text-xs font-semibold uppercase tracking-wider text-[#A3A3A3] mb-8">
          See what Pro does to your photos
        </p>
        <div className="space-y-10">
          {SHOWCASE.map((s, i) => (
            <div
              key={s.tool}
              className={`flex flex-col ${i % 2 ? "md:flex-row-reverse" : "md:flex-row"} gap-6 items-center`}
            >
              {/* Before / After */}
              <div className="grid grid-cols-2 gap-2 w-full md:w-3/5">
                <figure className="relative">
                  <div className="relative aspect-[1448/905] rounded-lg overflow-hidden border border-[#E5E5E5]">
                    <Image src={s.before} alt={`${s.tool} before`} fill className="object-cover" sizes="(max-width:768px) 50vw, 300px" />
                  </div>
                  <figcaption className="absolute top-2 left-2 bg-white/90 text-[#525252] text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded">
                    Before
                  </figcaption>
                </figure>
                <figure className="relative">
                  <div
                    className="relative aspect-[1448/905] rounded-lg overflow-hidden border border-[#E5E5E5]"
                    style={
                      s.checker
                        ? {
                            backgroundImage:
                              "linear-gradient(45deg,#e5e5e5 25%,transparent 25%),linear-gradient(-45deg,#e5e5e5 25%,transparent 25%),linear-gradient(45deg,transparent 75%,#e5e5e5 75%),linear-gradient(-45deg,transparent 75%,#e5e5e5 75%)",
                            backgroundSize: "16px 16px",
                            backgroundPosition: "0 0,0 8px,8px -8px,-8px 0",
                          }
                        : undefined
                    }
                  >
                    <Image src={s.after} alt={`${s.tool} after`} fill className="object-cover" sizes="(max-width:768px) 50vw, 300px" />
                  </div>
                  <figcaption className="absolute top-2 left-2 bg-[#6366F1] text-white text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded">
                    After
                  </figcaption>
                </figure>
              </div>
              {/* Copy */}
              <div className="w-full md:w-2/5 text-center md:text-left">
                <h3 className="text-xl font-bold text-[#171717] tracking-tight mb-2">{s.tool}</h3>
                <p className="text-[15px] leading-relaxed text-[#525252]">{s.blurb}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 88 TOOLS product shot */}
      <section className="max-w-4xl mx-auto px-5 py-10">
        <div className="bg-[#0F1115] rounded-2xl overflow-hidden border border-[#1f2128]">
          <div className="px-6 pt-6 pb-2 text-center">
            <h3 className="text-xl font-bold text-white tracking-tight mb-1">88 tools. One plan.</h3>
            <p className="text-sm text-[#9BA0AA]">Everything runs in your browser. Nothing is ever uploaded.</p>
          </div>
          <div className="relative aspect-[16/9] mt-2">
            <Image src="/screenshots/tools-dark.png" alt="SammaPix tools" fill className="object-cover object-top" sizes="(max-width:768px) 100vw, 800px" />
          </div>
        </div>
      </section>

      {/* PRICE + unlocks */}
      <section className="max-w-xl mx-auto px-5 py-10">
        <div className="bg-[#F5F5FF] border border-[#E0E0FF] rounded-2xl p-8 text-center">
          <span className="inline-block bg-[#6366F1] text-white text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4">
            Subscribers only
          </span>
          <div className="mb-1">
            <span className="text-lg text-[#A3A3A3] line-through mr-2">$108</span>
            <span className="text-5xl font-bold text-[#171717] tracking-tight">$29</span>
          </div>
          <p className="text-[15px] text-[#525252] mb-5">for your <strong>first year</strong> of Pro</p>
          {!expired && (
            <div className="flex gap-1.5 justify-center max-w-xs mx-auto mb-5">
              {units.map((u) => (
                <div key={u.l} className="flex-1 bg-white border border-[#E0E0FF] rounded-md py-2">
                  <div className="text-lg font-bold text-[#171717] tabular-nums leading-none">{remaining === null ? "--" : pad(u.v)}</div>
                  <div className="text-[9px] uppercase tracking-wide text-[#A3A3A3] mt-1">{u.l}</div>
                </div>
              ))}
            </div>
          )}
          <Cta expired={expired} block />
          <p className="text-xs text-[#A3A3A3] mt-3">Discount applied automatically · code <strong>COMEBACK55</strong></p>
        </div>

        <ul className="space-y-2.5 mt-8">
          {UNLOCKS.map((u) => (
            <li key={u} className="flex items-start gap-2.5">
              <Check className="h-4 w-4 text-[#6366F1] mt-0.5 shrink-0" strokeWidth={2.5} />
              <span className="text-sm text-[#525252] leading-relaxed">{u}</span>
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-center gap-6 mt-8 text-xs text-[#737373]">
          <span className="flex items-center gap-1.5"><Shield className="h-3.5 w-3.5 text-[#6366F1]" strokeWidth={2} /> 100% in your browser</span>
          <span className="flex items-center gap-1.5"><Zap className="h-3.5 w-3.5 text-[#6366F1]" strokeWidth={2} /> Nothing uploaded</span>
        </div>
      </section>

      {/* FOUNDER note */}
      <section className="max-w-xl mx-auto px-5 py-10">
        <div className="flex gap-4 items-start bg-[#FAFAFA] border border-[#EEEEEE] rounded-xl p-6">
          <Image src="/luca-sammarco.jpg" alt="Luca Sammarco" width={48} height={48} className="rounded-full object-cover shrink-0" />
          <div>
            <p className="text-[15px] leading-relaxed text-[#525252] mb-2">
              &ldquo;I built SammaPix because I was tired of uploading my photos to
              sketchy sites just to compress or convert them. Everything here runs
              in your browser. This offer is my thank-you to the people who&apos;ve
              been here from the start.&rdquo;
            </p>
            <p className="text-sm font-semibold text-[#171717]">Luca — founder of SammaPix</p>
          </div>
        </div>
        <p className="text-xs text-[#A3A3A3] leading-relaxed text-center mt-6">
          73% off the normal $108/year (paid monthly). Renews at $65/year after the
          first year. Cancel anytime in two clicks, no questions asked.
        </p>
        <div className="mt-6 pt-6 border-t border-[#EEEEEE] flex items-center justify-center gap-2 text-xs text-[#A3A3A3]">
          <Link href="/" className="hover:text-[#525252]">SammaPix</Link>
          <span>·</span>
          <Link href="/pricing" className="hover:text-[#525252]">All plans</Link>
          <ArrowRight className="h-3 w-3" strokeWidth={1.5} />
        </div>
      </section>
    </main>
  );
}

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

// Scadenza offerta: 24 agosto 2026 23:59:59 UTC (allineata a expires_at del promo COMEBACK55 su Stripe)
const DEADLINE = Date.parse("2026-08-24T23:59:59Z");
const PAY_URL =
  "https://buy.stripe.com/eVqfZhgCO4h2bYj5NJbII02?prefilled_promo_code=COMEBACK55";

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
  const days = Math.floor(d / 86400000);
  const hours = Math.floor((d % 86400000) / 3600000);
  const mins = Math.floor((d % 3600000) / 60000);
  const secs = Math.floor((d % 60000) / 1000);

  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-5 py-16">
      <div className="w-full max-w-md">
        {/* Logo */}
        <p className="text-lg font-semibold text-[#171717] tracking-tight mb-10">
          Samma<span className="text-[#6366F1]">Pix</span>
        </p>

        {/* Badge */}
        <span className="inline-block bg-[#EEF0FF] text-[#4F46E5] text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-5">
          Subscribers only
        </span>

        <h1 className="text-[28px] leading-tight font-bold text-[#171717] tracking-tight mb-3">
          Your first year of Pro for{" "}
          <span className="text-[#6366F1]">$29</span>
        </h1>
        <p className="text-[15px] leading-relaxed text-[#525252] mb-8">
          A one-time offer for people already on our list. Everything Pro
          unlocks, for less than a coffee a month.
        </p>

        {/* Countdown */}
        {!expired ? (
          <div className="mb-8">
            <p className="text-xs font-medium uppercase tracking-wider text-[#A3A3A3] mb-2">
              Offer ends in
            </p>
            <div className="flex gap-2">
              {[
                { v: days, l: "days" },
                { v: hours, l: "hrs" },
                { v: mins, l: "min" },
                { v: secs, l: "sec" },
              ].map((u) => (
                <div
                  key={u.l}
                  className="flex-1 bg-[#0F1115] rounded-lg py-3 text-center"
                >
                  <div className="text-2xl font-bold text-white tabular-nums leading-none">
                    {remaining === null ? "--" : pad(u.v)}
                  </div>
                  <div className="text-[10px] uppercase tracking-wide text-[#8B8B8B] mt-1.5">
                    {u.l}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="mb-8 bg-[#FAFAFA] border border-[#E5E5E5] rounded-lg p-4">
            <p className="text-sm text-[#525252]">
              This offer has ended. You can still go Pro at the{" "}
              <Link href="/pricing" className="text-[#6366F1] font-medium">
                regular price
              </Link>
              .
            </p>
          </div>
        )}

        {/* Price card */}
        <div className="bg-[#F5F5FF] border border-[#E0E0FF] rounded-xl p-6 text-center mb-6">
          <div className="mb-1">
            <span className="text-base text-[#A3A3A3] line-through mr-2">
              $108
            </span>
            <span className="text-4xl font-bold text-[#171717] tracking-tight">
              $29
            </span>
          </div>
          <p className="text-[15px] text-[#525252] mb-5">
            for your <strong>first year</strong>
          </p>
          <a
            href={expired ? "/pricing" : PAY_URL}
            className="block w-full bg-[#6366F1] hover:bg-[#5457E5] text-white font-semibold text-[15px] py-3.5 rounded-lg transition-colors"
          >
            {expired ? "See Pro plans" : "Get Pro for $29 →"}
          </a>
          <p className="text-xs text-[#A3A3A3] mt-3">
            Discount applied automatically. Code{" "}
            <strong>COMEBACK55</strong>.
          </p>
        </div>

        {/* What's unlocked */}
        <ul className="space-y-2.5 mb-8">
          {UNLOCKS.map((u) => (
            <li key={u} className="flex items-start gap-2.5">
              <Check
                className="h-4 w-4 text-[#6366F1] mt-0.5 shrink-0"
                strokeWidth={2.5}
              />
              <span className="text-sm text-[#525252] leading-relaxed">{u}</span>
            </li>
          ))}
        </ul>

        <p className="text-xs text-[#A3A3A3] leading-relaxed">
          That&apos;s 73% off the normal $108/year (paid monthly). Renews at
          $65/year after the first year. Cancel anytime in two clicks, no
          questions asked.
        </p>

        <div className="mt-8 pt-6 border-t border-[#EEEEEE] flex items-center gap-2 text-xs text-[#A3A3A3]">
          <Link href="/" className="hover:text-[#525252]">
            SammaPix
          </Link>
          <span>·</span>
          <Link href="/pricing" className="hover:text-[#525252]">
            All plans
          </Link>
          <ArrowRight className="h-3 w-3" strokeWidth={1.5} />
        </div>
      </div>
    </main>
  );
}

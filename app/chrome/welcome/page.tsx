import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Welcome to SammaPix for Chrome",
  description: "You're all set. Pin SammaPix so the image toolbox is always one click away.",
  robots: { index: false, follow: false },
};

function Mark({ size = 28 }: { size?: number }) {
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

export default function WelcomePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#191919] relative overflow-hidden">
      <style>{`
        @keyframes wbob{0%,100%{transform:translateY(0)}50%{transform:translateY(-9px)}}
        @keyframes wpulse{0%,100%{transform:scale(1);box-shadow:0 0 0 0 rgba(99,102,241,.5)}50%{transform:scale(1.06);box-shadow:0 0 0 8px rgba(99,102,241,0)}}
        @keyframes wfade{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}
        .w-arrow{animation:wbob 1.8s ease-in-out infinite}
        .w-pin{animation:wpulse 2s ease-in-out infinite}
        .w-in{opacity:0;animation:wfade .7s cubic-bezier(.2,.7,.2,1) forwards}
        @media (prefers-reduced-motion:reduce){.w-arrow,.w-pin,.w-in{animation:none;opacity:1}}
      `}</style>

      {/* Arrow pointing to the real Chrome puzzle icon (top-right) */}
      <div className="hidden md:flex fixed top-3 right-16 z-40 items-start gap-2 w-arrow pointer-events-none">
        <div className="mt-9 rounded-full bg-[#171717] dark:bg-[#E5E5E5] text-white dark:text-[#171717] text-xs font-semibold px-3 py-1.5 shadow-lg whitespace-nowrap">
          Pin me from the 🧩 up here
        </div>
        <svg width="70" height="80" viewBox="0 0 70 80" fill="none" aria-hidden="true">
          <path d="M6 74 C 40 74, 60 55, 62 12" stroke="#171717" className="dark:stroke-[#E5E5E5]" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="1 7" />
          <path d="M52 16 L63 8 L64 22" stroke="#171717" className="dark:stroke-[#E5E5E5]" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
      </div>

      {/* HERO */}
      <section className="px-4 sm:px-6 pt-20 sm:pt-24 pb-10 text-center">
        <div className="max-w-2xl mx-auto w-in">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-[#F5F3FF] dark:bg-[#241d3a] mb-6 shadow-[0_8px_24px_-8px_rgba(139,92,246,0.5)]">
            <Mark size={34} />
          </div>
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-[#171717] dark:text-[#E5E5E5] leading-[1.05]">
            You&apos;re in. Now pin it 👆
          </h1>
          <p className="mt-5 text-base sm:text-lg text-[#737373] dark:text-[#A3A3A3]">
            Pin SammaPix to your toolbar so the whole image toolbox is always one click away — no more digging through menus.
          </p>
        </div>
      </section>

      {/* PIN STEP — the star, with a live-looking Chrome bar */}
      <section className="px-4 sm:px-6 pb-6">
        <div className="max-w-3xl mx-auto rounded-2xl border border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#1E1E1E] p-6 sm:p-8 w-in" style={{ animationDelay: "80ms" }}>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <span className="text-xs font-semibold tracking-wider uppercase text-[#6366F1] dark:text-[#818cf8]">3 seconds · one time</span>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-[#171717] dark:text-[#E5E5E5]">
                Pin SammaPix
              </h2>
              <ol className="mt-4 space-y-3.5">
                <li className="flex gap-3 text-[15px] text-[#171717] dark:text-[#E5E5E5]">
                  <span className="flex-none h-6 w-6 rounded-full bg-[#171717] dark:bg-[#E5E5E5] text-white dark:text-[#171717] text-xs font-semibold inline-flex items-center justify-center">1</span>
                  <span>Click the <b>puzzle icon</b> <span className="align-middle">🧩</span> at the top-right of Chrome.</span>
                </li>
                <li className="flex gap-3 text-[15px] text-[#171717] dark:text-[#E5E5E5]">
                  <span className="flex-none h-6 w-6 rounded-full bg-[#171717] dark:bg-[#E5E5E5] text-white dark:text-[#171717] text-xs font-semibold inline-flex items-center justify-center">2</span>
                  <span>Click the <b>pin</b> next to <b>SammaPix — Image Tools</b>.</span>
                </li>
              </ol>
            </div>

            <div className="rounded-xl border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#141414] shadow-[0_16px_40px_-16px_rgba(23,23,23,0.35)] overflow-hidden">
              <div className="flex items-center gap-2 px-3 py-2.5 border-b border-[#F0F0F0] dark:border-[#232323]">
                <div className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#E5E5E5] dark:bg-[#333]" /><span className="h-2.5 w-2.5 rounded-full bg-[#E5E5E5] dark:bg-[#333]" /><span className="h-2.5 w-2.5 rounded-full bg-[#E5E5E5] dark:bg-[#333]" />
                </div>
                <div className="flex-1 h-6 rounded-full bg-[#F1F1F4] dark:bg-[#232323]" />
                <div className="h-7 w-7 rounded-lg bg-[#EDEDF2] dark:bg-[#2A2A2A] inline-flex items-center justify-center text-sm ring-2 ring-[#6366F1]/40">🧩</div>
              </div>
              <div className="p-3">
                <div className="flex items-center justify-between gap-2 rounded-lg border border-[#6366F1] bg-[#F5F3FF] dark:bg-[#241d3a] px-3 py-2.5">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Mark size={20} />
                    <span className="text-[13px] font-medium text-[#171717] dark:text-[#E5E5E5] truncate">SammaPix — Image Tools</span>
                  </div>
                  <span className="w-pin flex-none h-7 w-7 rounded-md bg-[#6366F1] text-white inline-flex items-center justify-center text-sm" title="Pin">📌</span>
                </div>
                {[0, 1].map((i) => (
                  <div key={i} className="mt-2 flex items-center gap-2.5 rounded-lg px-3 py-2.5 opacity-35">
                    <div className="h-5 w-5 rounded bg-[#E5E5E5] dark:bg-[#2A2A2A]" />
                    <div className="h-3 w-24 rounded bg-[#E5E5E5] dark:bg-[#2A2A2A]" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT YOU GOT — product preview */}
      <section className="px-4 sm:px-6 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-10 items-center w-in" style={{ animationDelay: "160ms" }}>
          <div>
            <span className="text-xs font-semibold tracking-wider uppercase text-[#6366F1] dark:text-[#818cf8]">This is what you got</span>
            <h2 className="mt-2 text-2xl sm:text-3xl font-semibold tracking-tight text-[#171717] dark:text-[#E5E5E5]">
              Click the icon, the toolbox opens
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-[#737373] dark:text-[#A3A3A3]">
              Everything lives in the side panel. Try one right now:
            </p>
            <ul className="mt-4 space-y-2.5">
              {[
                { e: "🗜️", t: "Compress a photo — watch the size drop live" },
                { e: "📦", t: "Open a RAR or 7z, no software needed" },
                { e: "🖼️", t: "Grab every image on a page, in bulk" },
              ].map((c) => (
                <li key={c.t} className="flex items-center gap-3 text-sm text-[#171717] dark:text-[#E5E5E5]">
                  <span className="text-base">{c.e}</span>{c.t}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-[#737373] dark:text-[#A3A3A3]">
              100% in your browser, nothing uploaded. Prefer the web?{" "}
              <Link href="/" className="text-[#6366F1] dark:text-[#818cf8] font-medium hover:underline">All 52 tools are on sammapix.com</Link>.
            </p>
          </div>
          <div className="relative mx-auto w-full max-w-[280px]">
            <div className="absolute -inset-6 bg-[radial-gradient(closest-side,rgba(139,92,246,0.16),transparent)]" aria-hidden="true" />
            <div className="relative rounded-2xl border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#141414] shadow-[0_20px_50px_-20px_rgba(23,23,23,0.3)] overflow-hidden">
              <div className="flex gap-1.5 px-3.5 py-2.5 border-b border-[#F0F0F0] dark:border-[#232323] bg-[#FAFAFA] dark:bg-[#1A1A1A]">
                <span className="h-2.5 w-2.5 rounded-full bg-[#E5E5E5] dark:bg-[#333]" /><span className="h-2.5 w-2.5 rounded-full bg-[#E5E5E5] dark:bg-[#333]" /><span className="h-2.5 w-2.5 rounded-full bg-[#E5E5E5] dark:bg-[#333]" />
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/chrome/panel-home.png" alt="SammaPix toolbox" loading="lazy" className="block w-full h-auto" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

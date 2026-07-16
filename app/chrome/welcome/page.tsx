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
    <div className="min-h-screen bg-white dark:bg-[#191919]">
      <section className="px-4 sm:px-6 pt-16 sm:pt-20 pb-8 text-center">
        <div className="max-w-xl mx-auto">
          <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-[#F5F3FF] dark:bg-[#241d3a] mb-6">
            <Mark size={30} />
          </div>
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#171717] dark:text-[#E5E5E5]">
            You&apos;re all set 🎉
          </h1>
          <p className="mt-4 text-base text-[#737373] dark:text-[#A3A3A3]">
            One quick thing and SammaPix will always be a single click away.
          </p>
        </div>
      </section>

      {/* PIN STEP — the star */}
      <section className="px-4 sm:px-6 pb-6">
        <div className="max-w-3xl mx-auto rounded-2xl border border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#1E1E1E] p-6 sm:p-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <span className="text-xs font-semibold tracking-wider uppercase text-[#6366F1] dark:text-[#818cf8]">Step 1 · takes 3 seconds</span>
              <h2 className="mt-2 text-xl sm:text-2xl font-semibold tracking-tight text-[#171717] dark:text-[#E5E5E5]">
                Pin SammaPix to your toolbar
              </h2>
              <ol className="mt-4 space-y-3">
                <li className="flex gap-3 text-sm text-[#171717] dark:text-[#E5E5E5]">
                  <span className="flex-none h-6 w-6 rounded-full bg-[#171717] dark:bg-[#E5E5E5] text-white dark:text-[#171717] text-xs font-semibold inline-flex items-center justify-center">1</span>
                  <span>Click the <b>puzzle icon</b> <span className="inline-block align-middle">🧩</span> at the top-right of Chrome.</span>
                </li>
                <li className="flex gap-3 text-sm text-[#171717] dark:text-[#E5E5E5]">
                  <span className="flex-none h-6 w-6 rounded-full bg-[#171717] dark:bg-[#E5E5E5] text-white dark:text-[#171717] text-xs font-semibold inline-flex items-center justify-center">2</span>
                  <span>Click the <b>pin</b> <span className="inline-block align-middle">📌</span> next to <b>SammaPix — Image Tools</b>.</span>
                </li>
              </ol>
            </div>

            {/* Chrome toolbar mock */}
            <div className="rounded-xl border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#141414] shadow-sm overflow-hidden">
              <div className="flex items-center gap-2 px-3 py-2.5 border-b border-[#F0F0F0] dark:border-[#232323]">
                <div className="flex-1 h-6 rounded-full bg-[#F1F1F4] dark:bg-[#232323]" />
                <div className="h-7 w-7 rounded-lg bg-[#F1F1F4] dark:bg-[#232323] inline-flex items-center justify-center text-sm">🧩</div>
              </div>
              <div className="p-3">
                <div className="flex items-center justify-between gap-2 rounded-lg border border-[#6366F1] bg-[#F5F3FF] dark:bg-[#241d3a] px-3 py-2.5">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Mark size={20} />
                    <span className="text-[13px] font-medium text-[#171717] dark:text-[#E5E5E5] truncate">SammaPix — Image Tools</span>
                  </div>
                  <span className="flex-none h-6 w-6 rounded-md bg-[#6366F1] text-white inline-flex items-center justify-center text-xs" title="Pin">📌</span>
                </div>
                <div className="mt-2 flex items-center gap-2.5 rounded-lg px-3 py-2.5 opacity-40">
                  <div className="h-5 w-5 rounded bg-[#E5E5E5] dark:bg-[#2A2A2A]" />
                  <div className="h-3 w-28 rounded bg-[#E5E5E5] dark:bg-[#2A2A2A]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STEP 2 + try it */}
      <section className="px-4 sm:px-6 pb-20">
        <div className="max-w-3xl mx-auto">
          <div className="rounded-2xl border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#191919] p-6 sm:p-8">
            <span className="text-xs font-semibold tracking-wider uppercase text-[#6366F1] dark:text-[#818cf8]">Step 2</span>
            <h2 className="mt-2 text-xl sm:text-2xl font-semibold tracking-tight text-[#171717] dark:text-[#E5E5E5]">
              Click the SammaPix icon to open the toolbox
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-[#737373] dark:text-[#A3A3A3]">
              The whole toolbox lives in the side panel. Try one of these right now:
            </p>
            <div className="mt-5 grid sm:grid-cols-3 gap-3">
              {[
                { e: "🗜️", t: "Compress a photo", d: "Drop an image, watch the size drop live." },
                { e: "📦", t: "Open a RAR", d: "Extract archives, no software needed." },
                { e: "🖼️", t: "Grab a page's images", d: "Download or rename them in bulk." },
              ].map((c) => (
                <div key={c.t} className="p-4 rounded-xl border border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#1E1E1E]">
                  <p className="text-lg mb-1.5">{c.e}</p>
                  <h3 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5]">{c.t}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-[#737373] dark:text-[#A3A3A3]">{c.d}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm text-[#737373] dark:text-[#A3A3A3]">
              Everything runs in your browser — nothing is uploaded. Prefer the web?{" "}
              <Link href="/" className="text-[#6366F1] dark:text-[#818cf8] font-medium hover:underline">All 52 tools are on sammapix.com</Link>.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

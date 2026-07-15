"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

// TODO: swap for the real Chrome Web Store listing URL once approved.
const STORE_URL = "https://chromewebstore.google.com/search/SammaPix";

function Mark({ size = 34 }: { size?: number }) {
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

function Panel({ src, alt, glow = "#8b5cf6" }: { src: string; alt: string; glow?: string }) {
  return (
    <div className="sp-device">
      <div className="sp-device-glow" style={{ background: glow }} />
      <div className="sp-device-frame">
        <div className="sp-device-bar">
          <span /><span /><span />
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} loading="lazy" />
      </div>
    </div>
  );
}

export default function ChromeLanding() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const els = root.current?.querySelectorAll<HTMLElement>(".reveal");
    if (!els) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div ref={root} className="sp-land">
      <style>{CSS}</style>

      {/* ── HERO ── */}
      <header className="sp-hero">
        <div className="sp-hero-bg" aria-hidden="true">
          <div className="sp-mesh" />
          <div className="sp-grid" />
          <div className="sp-grain" />
        </div>

        <div className="sp-hero-inner">
          <div className="sp-hero-copy">
            <div className="sp-eyebrow sp-load" style={{ animationDelay: "0ms" }}>
              <Mark size={17} /> <span>Chrome Extension · v5</span>
            </div>
            <h1 className="sp-h1 sp-load" style={{ animationDelay: "80ms" }}>
              Every image tool,
              <br />
              <em>one panel away.</em>
            </h1>
            <p className="sp-lead sp-load" style={{ animationDelay: "170ms" }}>
              Compress, convert, crop and clean images. Extract RAR, 7z and ZIP.
              And grab every image from any page you visit — right inside your
              browser&apos;s side panel. Nothing is uploaded.
            </p>
            <div className="sp-cta-row sp-load" style={{ animationDelay: "260ms" }}>
              <a href={STORE_URL} target="_blank" rel="noopener" className="sp-btn sp-btn-primary">
                <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="9" fill="#fff" /><path fill="#fff" d="M24 4a20 20 0 0 1 17.3 10H24a10 10 0 0 0-8.66 5L8.7 7.6A20 20 0 0 1 24 4z" opacity=".9" /></svg>
                Add to Chrome — free
              </a>
              <Link href="/" className="sp-btn sp-btn-ghost">Use the web app →</Link>
            </div>
            <p className="sp-fineprint sp-load" style={{ animationDelay: "340ms" }}>
              100% in your browser · No account for single tools · Works on any page
            </p>
          </div>

          <div className="sp-hero-art sp-load" style={{ animationDelay: "220ms" }}>
            <Panel src="/chrome/panel-home.png" alt="SammaPix toolbox in the browser side panel" />
          </div>
        </div>
      </header>

      {/* ── TRUST STRIP ── */}
      <section className="sp-trust reveal">
        {["100% in your browser", "No uploads, ever", "Free to start", "12 native tools"].map((t) => (
          <span key={t}>{t}</span>
        ))}
      </section>

      {/* ── FEATURE ROWS ── */}
      <section className="sp-feature reveal">
        <div className="sp-feature-copy">
          <span className="sp-kicker">Compress</span>
          <h2 className="sp-h2">See the savings <em>before</em> you save.</h2>
          <p className="sp-p">
            Drag the quality slider and watch the file size drop in real time —
            <b> “2.4 MB → 480 KB, −80%”</b>. Choose WebP, PNG or JPG, then download.
            Same for convert, crop, watermark, blur and EXIF cleaning, all on-device.
          </p>
        </div>
        <div className="sp-feature-art"><Panel src="/chrome/panel-compress.png" alt="Compress with a live size preview" glow="#6366f1" /></div>
      </section>

      <section className="sp-feature sp-feature-rev reveal">
        <div className="sp-feature-copy">
          <span className="sp-kicker sp-kicker-amber">The killer feature</span>
          <h2 className="sp-h2">Grab <em>every</em> image from any page.</h2>
          <p className="sp-p">
            Open the panel on a shop, a gallery, a moodboard — SammaPix shows you
            every image on it. Select what you want, then download, compress or
            rename them in bulk. The one thing a website can never do for you.
          </p>
          <ul className="sp-list">
            <li>Bulk download to a single ZIP</li>
            <li>Bulk compress to save space</li>
            <li>Bulk rename with a pattern (photo-001, 002…)</li>
          </ul>
        </div>
        <div className="sp-feature-art"><Panel src="/chrome/panel-page.png" alt="Grab and act on every image of a page" glow="#0891b2" /></div>
      </section>

      <section className="sp-feature reveal">
        <div className="sp-feature-copy">
          <span className="sp-kicker sp-kicker-green">Archives</span>
          <h2 className="sp-h2">Open RAR &amp; 7z <em>without</em> installing anything.</h2>
          <p className="sp-p">
            Extract RAR, 7z, ZIP and TAR right in the browser, powered by
            WebAssembly. Save files one by one or all at once. No sketchy desktop
            software, no uploads.
          </p>
          <div className="sp-chips">
            {["RAR", "7z", "ZIP", "TAR", "GZ"].map((c) => <span key={c}>{c}</span>)}
          </div>
        </div>
        <div className="sp-feature-art sp-feature-art-mini"><Panel src="/chrome/panel-gate.png" alt="Fair usage: 50 images a day free, unlimited with Pro" glow="#8b5cf6" /></div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="sp-how reveal">
        <h2 className="sp-h2 sp-center">Three clicks, done.</h2>
        <div className="sp-steps">
          {[
            { n: "01", t: "Open the panel", d: "Click the SammaPix icon on any page. The whole toolbox lives in the side panel." },
            { n: "02", t: "Pick a tool", d: "Compress, extract an archive, or grab the images off the page you're on." },
            { n: "03", t: "Save locally", d: "Everything is processed on your device and saved straight to your downloads." },
          ].map((s) => (
            <div key={s.n} className="sp-step">
              <span className="sp-step-n">{s.n}</span>
              <h3>{s.t}</h3>
              <p>{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="sp-final reveal">
        <div className="sp-final-glow" aria-hidden="true" />
        <Mark size={44} />
        <h2 className="sp-h1 sp-final-h">
          Put the toolbox <em>in your browser.</em>
        </h2>
        <p className="sp-lead sp-center">Free. Private. No uploads. Works on every page.</p>
        <a href={STORE_URL} target="_blank" rel="noopener" className="sp-btn sp-btn-primary sp-btn-lg">
          Add to Chrome — free
        </a>
        <p className="sp-fineprint">
          Prefer the web? All 52 tools live at{" "}
          <Link href="/" className="sp-link">sammapix.com</Link>.
        </p>
      </section>
    </div>
  );
}

const CSS = `
.sp-land{--bg:#0b0b0f;--ink:#f2f2f7;--dim:#9a9aa8;--line:rgba(255,255,255,.09);--vio:#8b5cf6;--vio2:#a78bfa;--ind:#6366f1;background:var(--bg);color:var(--ink);position:relative;overflow:hidden;font-family:var(--font-body,system-ui,sans-serif)}
.sp-land em{font-style:italic;font-family:var(--font-display,Georgia,serif);color:var(--vio2)}
.sp-land h1,.sp-land h2,.sp-land h3{font-family:var(--font-display,Georgia,serif);font-weight:500}

/* HERO */
.sp-hero{position:relative;padding:clamp(64px,9vw,120px) 24px clamp(60px,7vw,96px)}
.sp-hero-bg{position:absolute;inset:0;overflow:hidden;pointer-events:none}
.sp-mesh{position:absolute;inset:-20% -10% 0;background:
  radial-gradient(46% 40% at 22% 18%,rgba(139,92,246,.42),transparent 60%),
  radial-gradient(40% 38% at 82% 8%,rgba(99,102,241,.34),transparent 62%),
  radial-gradient(50% 46% at 68% 46%,rgba(8,145,178,.20),transparent 60%);
  filter:blur(8px);animation:spdrift 22s ease-in-out infinite alternate}
@keyframes spdrift{to{transform:translate3d(2%,0,0) scale(1.08)}}
.sp-grid{position:absolute;inset:0;background-image:linear-gradient(var(--line) 1px,transparent 1px),linear-gradient(90deg,var(--line) 1px,transparent 1px);background-size:64px 64px;mask-image:radial-gradient(70% 60% at 50% 30%,#000,transparent 80%);opacity:.5}
.sp-grain{position:absolute;inset:0;opacity:.05;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")}
.sp-hero-inner{position:relative;max-width:1120px;margin:0 auto;display:grid;grid-template-columns:1.05fr .95fr;gap:clamp(24px,4vw,64px);align-items:center}
.sp-hero-copy{max-width:560px}
.sp-eyebrow{display:inline-flex;align-items:center;gap:8px;padding:7px 13px;border:1px solid var(--line);border-radius:100px;background:rgba(255,255,255,.03);font-size:12.5px;font-weight:600;color:#c9c4ff;letter-spacing:.01em}
.sp-h1{font-size:clamp(40px,6.4vw,76px);line-height:1.02;letter-spacing:-.02em;margin:22px 0 0}
.sp-lead{font-size:clamp(15px,1.6vw,18px);line-height:1.6;color:var(--dim);margin-top:22px}
.sp-cta-row{display:flex;flex-wrap:wrap;gap:12px;margin-top:30px}
.sp-btn{display:inline-flex;align-items:center;gap:9px;border-radius:13px;padding:13px 22px;font-size:14.5px;font-weight:650;text-decoration:none;transition:transform .15s ease,box-shadow .25s ease,background .2s}
.sp-btn:active{transform:scale(.97)}
.sp-btn-primary{background:linear-gradient(180deg,#7c6bff,#6d5cf5);color:#fff;box-shadow:0 10px 30px rgba(124,107,255,.4),inset 0 1px 0 rgba(255,255,255,.25)}
.sp-btn-primary:hover{box-shadow:0 14px 40px rgba(124,107,255,.55);transform:translateY(-1px)}
.sp-btn-ghost{border:1px solid var(--line);color:var(--ink);background:rgba(255,255,255,.02)}
.sp-btn-ghost:hover{background:rgba(255,255,255,.06)}
.sp-btn-lg{padding:16px 30px;font-size:15.5px}
.sp-fineprint{margin-top:16px;font-size:12.5px;color:#6f6f7e}

/* DEVICE */
.sp-hero-art{display:flex;justify-content:center}
.sp-device{position:relative;width:100%;max-width:330px}
.sp-device-glow{position:absolute;inset:6% 10%;border-radius:40px;filter:blur(60px);opacity:.5;z-index:0}
.sp-device-frame{position:relative;z-index:1;border-radius:26px;border:1px solid rgba(255,255,255,.12);background:#111;overflow:hidden;box-shadow:0 40px 90px rgba(0,0,0,.6),0 0 0 1px rgba(255,255,255,.04);animation:spfloat 7s ease-in-out infinite}
@keyframes spfloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
.sp-device-bar{display:flex;gap:6px;padding:11px 14px;background:#0f0f13;border-bottom:1px solid rgba(255,255,255,.06)}
.sp-device-bar span{width:9px;height:9px;border-radius:50%;background:rgba(255,255,255,.16)}
.sp-device-frame img{display:block;width:100%;height:auto}

/* TRUST */
.sp-trust{display:flex;flex-wrap:wrap;justify-content:center;gap:12px 34px;padding:26px 24px;border-top:1px solid var(--line);border-bottom:1px solid var(--line);background:rgba(255,255,255,.015)}
.sp-trust span{font-size:13px;color:var(--dim);font-weight:500;display:inline-flex;align-items:center;gap:9px}
.sp-trust span::before{content:"";width:6px;height:6px;border-radius:50%;background:var(--vio2)}

/* FEATURES */
.sp-feature{max-width:1080px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:clamp(28px,5vw,72px);align-items:center;padding:clamp(64px,9vw,120px) 24px}
.sp-feature-rev .sp-feature-copy{order:2}
.sp-kicker{display:inline-block;font-size:12px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--vio2);margin-bottom:16px}
.sp-kicker-amber{color:#f6b25a}.sp-kicker-green{color:#5fd08a}
.sp-h2{font-size:clamp(28px,3.6vw,44px);line-height:1.08;letter-spacing:-.015em}
.sp-p{font-size:16px;line-height:1.65;color:var(--dim);margin-top:18px;max-width:480px}
.sp-p b{color:var(--ink);font-weight:650}
.sp-list{margin-top:20px;display:flex;flex-direction:column;gap:10px;padding:0;list-style:none}
.sp-list li{font-size:14.5px;color:var(--ink);display:flex;align-items:center;gap:11px}
.sp-list li::before{content:"";width:18px;height:18px;border-radius:6px;background:linear-gradient(135deg,var(--vio),var(--ind));flex:0 0 auto;box-shadow:0 2px 8px rgba(139,92,246,.4)}
.sp-chips{display:flex;gap:8px;flex-wrap:wrap;margin-top:22px}
.sp-chips span{padding:7px 13px;border:1px solid var(--line);border-radius:10px;font-size:12.5px;font-weight:650;color:var(--dim);background:rgba(255,255,255,.02)}
.sp-feature-art{display:flex;justify-content:center}
.sp-feature-art .sp-device{max-width:300px}
.sp-feature-art-mini .sp-device{max-width:260px}

/* HOW */
.sp-how{max-width:1080px;margin:0 auto;padding:clamp(48px,7vw,96px) 24px}
.sp-center{text-align:center}
.sp-steps{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin-top:44px}
.sp-step{border:1px solid var(--line);border-radius:20px;padding:28px 24px;background:linear-gradient(180deg,rgba(255,255,255,.035),rgba(255,255,255,.01))}
.sp-step-n{font-family:var(--font-display,Georgia,serif);font-size:34px;color:var(--vio2);opacity:.8}
.sp-step h3{font-size:18px;margin:12px 0 8px}
.sp-step p{font-size:14px;line-height:1.6;color:var(--dim)}

/* FINAL */
.sp-final{position:relative;text-align:center;padding:clamp(80px,11vw,150px) 24px clamp(70px,9vw,120px);border-top:1px solid var(--line);overflow:hidden}
.sp-final-glow{position:absolute;left:50%;top:20%;width:640px;height:640px;transform:translateX(-50%);background:radial-gradient(circle,rgba(139,92,246,.34),transparent 62%);filter:blur(40px);pointer-events:none}
.sp-final>*{position:relative}
.sp-final-h{font-size:clamp(34px,5.4vw,64px);margin:22px auto 0;max-width:14ch}
.sp-final .sp-lead{margin:18px auto 0;max-width:44ch}
.sp-final .sp-btn{margin-top:34px}
.sp-link{color:var(--vio2);font-weight:600;text-decoration:none}.sp-link:hover{text-decoration:underline}

/* MOTION */
.sp-load{opacity:0;transform:translateY(16px);animation:spup .7s cubic-bezier(.2,.7,.2,1) forwards}
@keyframes spup{to{opacity:1;transform:none}}
.reveal{opacity:0;transform:translateY(26px);transition:opacity .8s cubic-bezier(.2,.7,.2,1),transform .8s cubic-bezier(.2,.7,.2,1)}
.reveal.in{opacity:1;transform:none}
@media (prefers-reduced-motion:reduce){.sp-load,.reveal{opacity:1;transform:none;animation:none}.sp-device-frame,.sp-mesh{animation:none}}

/* RESPONSIVE */
@media(max-width:860px){
  .sp-hero-inner{grid-template-columns:1fr;text-align:center}
  .sp-hero-copy{margin:0 auto}.sp-cta-row,.sp-eyebrow{justify-content:center}.sp-hero-art{margin-top:44px}
  .sp-feature{grid-template-columns:1fr;text-align:center}.sp-feature-rev .sp-feature-copy{order:0}
  .sp-p,.sp-list,.sp-chips{margin-left:auto;margin-right:auto}.sp-list li,.sp-chips{justify-content:center}
  .sp-steps{grid-template-columns:1fr}
}
`;

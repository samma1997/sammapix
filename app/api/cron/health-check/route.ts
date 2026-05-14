import { NextRequest, NextResponse } from "next/server";
import { getResend } from "@/lib/resend";

export const runtime = "nodejs";
export const maxDuration = 60;

const SITE_URL = "https://www.sammapix.com";
// Destinatario alert: imposta env HEALTH_ALERT_EMAIL in Vercel. Fallback
// usa la stessa mailbox del FROM SammaPix per non disperdere alert su email
// esterne se l'env non è settata.
const ALERT_EMAIL = process.env.HEALTH_ALERT_EMAIL || "luca@sammapix.com";

const CRITICAL_PAGES = ["/", "/tools", "/tools/exif", "/tools/remove-bg", "/pricing", "/blog", "/dashboard"];
const CRITICAL_API = ["/api/auth/session", "/api/strategy-review-latest"];

const UA = "SammaPix-Healthcheck/1.0 (+https://www.sammapix.com)";

type Issue = { kind: string; target: string; detail: string };

async function fetchWithTimeout(url: string, timeoutMs = 10_000, init?: RequestInit): Promise<Response> {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    return await fetch(url, { ...init, signal: ctrl.signal, headers: { "User-Agent": UA, ...(init?.headers || {}) } });
  } finally {
    clearTimeout(t);
  }
}

async function checkPage(path: string): Promise<Issue[]> {
  const issues: Issue[] = [];
  const url = `${SITE_URL}${path}`;
  let res: Response;

  try {
    res = await fetchWithTimeout(url);
  } catch (err) {
    issues.push({ kind: "fetch_failed", target: path, detail: String(err) });
    return issues;
  }

  if (!res.ok) {
    issues.push({ kind: "page_status", target: path, detail: `HTTP ${res.status}` });
    return issues;
  }

  // Parse HTML to find chunk URLs (same-origin /_next/static/...)
  const html = await res.text();
  const chunkPaths = Array.from(html.matchAll(/\/_next\/static\/[a-zA-Z0-9._/-]+\.(?:js|css|woff2?)/g)).map((m) => m[0]);
  const uniqueChunks = Array.from(new Set(chunkPaths)).slice(0, 12); // limit to first 12 to avoid timeout

  // Fetch all chunks in parallel
  const chunkResults = await Promise.allSettled(
    uniqueChunks.map(async (cp) => {
      const cr = await fetchWithTimeout(`${SITE_URL}${cp}`, 8000, { method: "HEAD" });
      if (!cr.ok) throw new Error(`HTTP ${cr.status}`);
      return cp;
    })
  );

  for (let i = 0; i < chunkResults.length; i++) {
    const r = chunkResults[i];
    if (r.status === "rejected") {
      issues.push({ kind: "chunk_failed", target: uniqueChunks[i], detail: r.reason?.message || "unknown" });
    }
  }

  return issues;
}

async function checkApi(path: string): Promise<Issue[]> {
  const issues: Issue[] = [];
  try {
    const r = await fetchWithTimeout(`${SITE_URL}${path}`, 10_000);
    if (!r.ok) issues.push({ kind: "api_status", target: path, detail: `HTTP ${r.status}` });
  } catch (err) {
    issues.push({ kind: "api_fetch_failed", target: path, detail: String(err) });
  }
  return issues;
}

async function checkServiceWorker(): Promise<Issue[]> {
  const issues: Issue[] = [];
  try {
    const r = await fetchWithTimeout(`${SITE_URL}/sw.js`);
    if (!r.ok) {
      issues.push({ kind: "sw_status", target: "/sw.js", detail: `HTTP ${r.status}` });
      return issues;
    }
    const code = await r.text();
    // Sanity: SW deve avere un CACHE_NAME definito e includere "sammapix" — protegge da regressioni
    if (!code.includes("CACHE_NAME")) {
      issues.push({ kind: "sw_malformed", target: "/sw.js", detail: "missing CACHE_NAME constant" });
    }
    // SW non deve cachare /_next/static/ (regressione del bug 2026-05-10)
    if (/cache.*\/_next\/static|\/_next\/static.*cache/i.test(code) && !code.includes("startsWith(\"/_next/\")")) {
      issues.push({ kind: "sw_caches_next_static", target: "/sw.js", detail: "SW potrebbe cachare /_next/ chunks (regressione bug fix v3)" });
    }
  } catch (err) {
    issues.push({ kind: "sw_fetch_failed", target: "/sw.js", detail: String(err) });
  }
  return issues;
}

function formatEmail(issues: Issue[], elapsedMs: number): { subject: string; html: string } {
  const subject = `🚨 SammaPix down — ${issues.length} issue${issues.length > 1 ? "s" : ""}`;
  const rows = issues
    .map(
      (i) =>
        `<tr><td style="padding:6px;border-bottom:1px solid #eee;font-family:monospace;font-size:12px"><b>${i.kind}</b></td><td style="padding:6px;border-bottom:1px solid #eee;font-family:monospace;font-size:12px">${i.target}</td><td style="padding:6px;border-bottom:1px solid #eee;font-family:monospace;font-size:12px;color:#b91c1c">${i.detail}</td></tr>`
    )
    .join("");
  const html = `
    <div style="font-family:system-ui,sans-serif;max-width:600px">
      <h2 style="color:#b91c1c">🚨 SammaPix Health Check Failed</h2>
      <p style="font-size:14px;color:#374151">Health check eseguito alle ${new Date().toISOString()} — durata ${elapsedMs}ms.</p>
      <p style="font-size:14px;color:#374151"><b>${issues.length} problemi rilevati</b> sul sito di produzione.</p>
      <table style="width:100%;border-collapse:collapse;margin-top:12px">
        <thead><tr style="background:#f3f4f6"><th align="left" style="padding:8px;font-size:12px">Type</th><th align="left" style="padding:8px;font-size:12px">Target</th><th align="left" style="padding:8px;font-size:12px">Detail</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
      <p style="font-size:13px;color:#6b7280;margin-top:20px">
        <b>Probable causes:</b><br>
        • <code>chunk_failed</code> → cache mismatch tra deployment (ricontrolla SW + browser cache)<br>
        • <code>page_status 5xx</code> → errore runtime Vercel (controlla logs)<br>
        • <code>sw_caches_next_static</code> → regressione del fix SW v3 (NON deve cachare /_next/)<br>
        • <code>api_fetch_failed</code> → bot detection / firewall / Vercel down
      </p>
      <p style="font-size:13px;color:#6b7280;margin-top:12px">
        <a href="https://vercel.com/samma97s-projects/sammapix">Vercel Dashboard →</a> ·
        <a href="https://www.sammapix.com">Open site →</a>
      </p>
    </div>
  `;
  return { subject, html };
}

export async function GET(request: NextRequest) {
  // Cron-only protection
  const isCron = request.headers.get("user-agent")?.includes("vercel-cron") || request.nextUrl.searchParams.get("token") === process.env.HEALTH_CHECK_TOKEN;
  if (!isCron && process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const start = Date.now();
  const allIssues: Issue[] = [];

  // 1. Service Worker
  allIssues.push(...(await checkServiceWorker()));

  // 2. Pages (parallel)
  const pageResults = await Promise.all(CRITICAL_PAGES.map(checkPage));
  pageResults.forEach((issues) => allIssues.push(...issues));

  // 3. APIs (parallel)
  const apiResults = await Promise.all(CRITICAL_API.map(checkApi));
  apiResults.forEach((issues) => allIssues.push(...issues));

  const elapsedMs = Date.now() - start;
  const ok = allIssues.length === 0;

  // Send alert email if issues
  if (!ok) {
    try {
      const { subject, html } = formatEmail(allIssues, elapsedMs);
      await getResend().emails.send({
        from: "SammaPix Health <hello@sammapix.com>",
        to: ALERT_EMAIL,
        subject,
        html,
      });
    } catch (err) {
      console.error("[health-check] failed to send alert:", err);
    }
  }

  return NextResponse.json({
    ok,
    issuesCount: allIssues.length,
    issues: allIssues,
    elapsedMs,
    pagesChecked: CRITICAL_PAGES.length,
    apisChecked: CRITICAL_API.length,
    alertSent: !ok,
    timestamp: new Date().toISOString(),
  });
}

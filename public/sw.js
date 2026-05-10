// SammaPix Service Worker v3 — PWA shell + offline fallback only.
// IMPORTANT: NON cachiamo più /_next/static/ chunks: ogni deploy genera
// hash diversi e una cache stale serve chunk inesistenti → "Failed to fetch"
// errori a catena (visto in produzione 2026-05-10). Il browser cache HTTP
// è già sufficiente per gli asset Next.js.
const CACHE_NAME = "sammapix-v3";
const OFFLINE_URL = "/dashboard";
const PRECACHE = ["/manifest.json", "/icon-192.png", "/icon-512.png"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      cache.addAll(PRECACHE).catch(() => undefined)
    )
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    Promise.all([
      // Drop ALL old caches (sammapix-v1, sammapix-v2, ecc.)
      caches.keys().then((keys) =>
        Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
      ),
      self.clients.claim(),
    ])
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  const url = new URL(request.url);

  // Skip cross-origin (analytics, CDN esterni, ecc.)
  if (url.origin !== self.location.origin) return;

  // CRITICAL: NEVER intercept Next.js build artifacts.
  // Lasciamo che il browser gestisca direttamente — l'header Cache-Control
  // di Vercel li cachea già correttamente con immutable hash.
  if (url.pathname.startsWith("/_next/")) return;

  // CRITICAL: NEVER intercept API routes.
  if (url.pathname.startsWith("/api/")) return;

  // Navigation: network-first, fallback offline shell solo su errore di rete reale
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request).catch(() =>
        caches.match(OFFLINE_URL).then((r) => r || new Response("Offline", { status: 503 }))
      )
    );
    return;
  }

  // Altri static (manifest, icons): cache-first con fallback network
  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;
      return fetch(request)
        .then((res) => {
          if (res.ok && PRECACHE.some((p) => url.pathname === p)) {
            const clone = res.clone();
            caches.open(CACHE_NAME).then((c) => c.put(request, clone));
          }
          return res;
        })
        .catch(() => new Response("", { status: 504 }));
    })
  );
});

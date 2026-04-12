// ═══════════════════════════════════════════════════════════════════
// SammaPix Content Script — Scans page for all images
// ═══════════════════════════════════════════════════════════════════

function scanImages() {
  const images = new Map(); // deduplicate by src

  // 1. All <img> tags
  document.querySelectorAll("img").forEach(img => {
    const src = img.currentSrc || img.src;
    if (!src || src.startsWith("data:image/svg") || src.startsWith("data:image/gif;base64,R0lGOD") || src.length < 10) return;
    if (images.has(src)) return;

    const rect = img.getBoundingClientRect();
    // Skip tiny images (icons, spacers, tracking pixels)
    if (rect.width < 40 && rect.height < 40 && !src.includes("logo")) return;

    images.set(src, {
      src,
      width: img.naturalWidth || rect.width,
      height: img.naturalHeight || rect.height,
      displayWidth: Math.round(rect.width),
      displayHeight: Math.round(rect.height),
      alt: img.alt || "",
      format: guessFormat(src),
    });
  });

  // 2. CSS background images
  document.querySelectorAll("*").forEach(el => {
    const bg = getComputedStyle(el).backgroundImage;
    if (!bg || bg === "none") return;
    const match = bg.match(/url\(["']?(https?:\/\/[^"')]+)["']?\)/);
    if (!match) return;
    const src = match[1];
    if (images.has(src)) return;

    const rect = el.getBoundingClientRect();
    if (rect.width < 40 && rect.height < 40) return;

    images.set(src, {
      src,
      width: Math.round(rect.width),
      height: Math.round(rect.height),
      displayWidth: Math.round(rect.width),
      displayHeight: Math.round(rect.height),
      alt: "",
      format: guessFormat(src),
      isBgImage: true,
    });
  });

  // 3. <picture> / <source> elements
  document.querySelectorAll("picture source").forEach(source => {
    const srcset = source.srcset;
    if (!srcset) return;
    const src = srcset.split(",")[0].trim().split(" ")[0];
    if (!src || images.has(src)) return;

    images.set(src, {
      src,
      width: 0,
      height: 0,
      displayWidth: 0,
      displayHeight: 0,
      alt: "",
      format: guessFormat(src),
    });
  });

  return Array.from(images.values());
}

function guessFormat(url) {
  const clean = url.split("?")[0].split("#")[0].toLowerCase();
  if (clean.endsWith(".webp") || url.includes("format=webp") || url.includes("fm=webp")) return "WebP";
  if (clean.endsWith(".png")) return "PNG";
  if (clean.endsWith(".jpg") || clean.endsWith(".jpeg")) return "JPG";
  if (clean.endsWith(".gif")) return "GIF";
  if (clean.endsWith(".svg")) return "SVG";
  if (clean.endsWith(".avif") || url.includes("format=avif")) return "AVIF";
  if (clean.endsWith(".heic")) return "HEIC";
  if (url.startsWith("data:image/png")) return "PNG";
  if (url.startsWith("data:image/jpeg")) return "JPG";
  if (url.startsWith("data:image/webp")) return "WebP";
  return "IMG";
}

// Listen for scan requests from side panel
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "scanImages") {
    const images = scanImages();
    sendResponse({ images, url: window.location.href, title: document.title });
  }
  return true;
});

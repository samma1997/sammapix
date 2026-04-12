// ═══════════════════════════════════════════════════════════════════
// SammaPix Chrome Extension
// Everything runs client-side via Canvas API — no uploads, no server
//
// Features that work INSIDE the extension (instant):
//   - Save as JPG (strips all EXIF/GPS automatically)
//   - Save as PNG (strips all EXIF/GPS automatically)
//   - Save as WebP (smaller file, strips EXIF)
//   - Compress image (80% quality JPG, ~90% size reduction)
//
// Features that open sammapix.com:
//   - Remove Background (needs WASM model)
//   - Resize for social media
//   - Passport Photo
//   - All 27 tools
// ═══════════════════════════════════════════════════════════════════

const BASE_URL = "https://www.sammapix.com";

// ═══════════════════════════════════════════
// INSTALL: Create context menus
// ═══════════════════════════════════════════
chrome.runtime.onInstalled.addListener(() => {
  // ── INSTANT ACTIONS (work inside extension) ──

  chrome.contextMenus.create({
    id: "save-jpg-clean",
    title: "📷 Save as JPG (EXIF/GPS removed)",
    contexts: ["image"],
  });

  chrome.contextMenus.create({
    id: "save-png-clean",
    title: "📷 Save as PNG (EXIF/GPS removed)",
    contexts: ["image"],
  });

  chrome.contextMenus.create({
    id: "save-webp",
    title: "⚡ Save as WebP (smaller file, no EXIF)",
    contexts: ["image"],
  });

  chrome.contextMenus.create({
    id: "compress-jpg",
    title: "📦 Compress & Save (80% quality JPG)",
    contexts: ["image"],
  });

  // ── SEPARATOR ──

  chrome.contextMenus.create({
    id: "sep1",
    type: "separator",
    contexts: ["image"],
  });

  // ── SAMMAPIX TOOLS (open site) ──

  chrome.contextMenus.create({
    id: "parent-tools",
    title: "🛠 More SammaPix tools",
    contexts: ["image"],
  });

  const siteTools = [
    { id: "remove-bg", title: "✂️ Remove Background (AI)", path: "/tools/remove-bg" },
    { id: "resize", title: "📐 Resize for social media", path: "/tools/resizepack" },
    { id: "passport", title: "📸 Passport Photo (140+ countries)", path: "/tools/passport-photo" },
    { id: "crop", title: "🖼 Crop to ratio", path: "/tools/croproatio" },
    { id: "upscale", title: "🔍 Upscale / Enhance", path: "/tools/upscale" },
    { id: "watermark", title: "💧 Add Watermark", path: "/tools/stampit" },
  ];

  for (const tool of siteTools) {
    chrome.contextMenus.create({
      id: `tool-${tool.id}`,
      parentId: "parent-tools",
      title: tool.title,
      contexts: ["image"],
    });
  }

  chrome.contextMenus.create({
    id: "tool-sep",
    parentId: "parent-tools",
    type: "separator",
    contexts: ["image"],
  });

  chrome.contextMenus.create({
    id: "tool-all",
    parentId: "parent-tools",
    title: "🚀 All 27 tools on sammapix.com",
    contexts: ["image"],
  });
});

// ═══════════════════════════════════════════
// HANDLE: Context menu clicks
// ═══════════════════════════════════════════
chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  const imageUrl = info.srcUrl;
  if (!imageUrl) return;

  // ── INSTANT ACTIONS ──
  const instantActions = {
    "save-jpg-clean": { mimeType: "image/jpeg", ext: "jpg", quality: 0.95 },
    "save-png-clean": { mimeType: "image/png", ext: "png", quality: 1 },
    "save-webp":      { mimeType: "image/webp", ext: "webp", quality: 0.90 },
    "compress-jpg":   { mimeType: "image/jpeg", ext: "jpg", quality: 0.80 },
  };

  if (instantActions[info.menuItemId]) {
    const action = instantActions[info.menuItemId];
    try {
      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: convertAndDownload,
        args: [imageUrl, action.mimeType, action.ext, action.quality],
      });
    } catch (err) {
      // CORS fallback → open sammapix.com
      chrome.tabs.create({
        url: `${BASE_URL}/tools/webp?ref=chrome-ext`,
      });
    }
    return;
  }

  // ── SITE TOOLS ──
  if (info.menuItemId === "tool-all") {
    chrome.tabs.create({ url: `${BASE_URL}?ref=chrome-ext` });
    return;
  }

  if (info.menuItemId.startsWith("tool-")) {
    const toolId = info.menuItemId.replace("tool-", "");
    const tool = [
      { id: "remove-bg", path: "/tools/remove-bg" },
      { id: "resize", path: "/tools/resizepack" },
      { id: "passport", path: "/tools/passport-photo" },
      { id: "crop", path: "/tools/croproatio" },
      { id: "upscale", path: "/tools/upscale" },
      { id: "watermark", path: "/tools/stampit" },
    ].find(t => t.id === toolId);

    if (tool) {
      chrome.tabs.create({ url: `${BASE_URL}${tool.path}?ref=chrome-ext` });
    }
  }
});

// ═══════════════════════════════════════════
// INJECTED: Convert image via Canvas API
// Canvas automatically strips ALL EXIF/GPS metadata
// ═══════════════════════════════════════════
function convertAndDownload(imageUrl, mimeType, ext, quality) {
  const img = new Image();
  img.crossOrigin = "anonymous";

  img.onload = () => {
    const canvas = document.createElement("canvas");
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    // Canvas.toBlob STRIPS all EXIF/GPS metadata automatically
    // The exported image is clean — no location, no camera info, nothing
    canvas.toBlob((blob) => {
      if (!blob) {
        alert("SammaPix: Could not process this image (CORS restriction).\n\nTry: Right-click → More SammaPix tools → use the web version.");
        return;
      }

      // Generate clean filename
      let filename = "image";
      try {
        const path = new URL(imageUrl).pathname;
        const base = path.split("/").pop().split(".")[0].replace(/[^a-zA-Z0-9_-]/g, "");
        if (base && base.length > 0 && base.length < 80) filename = base;
      } catch {}

      // Show size reduction for compress
      const sizeKB = Math.round(blob.size / 1024);
      const suffix = quality < 0.9 ? `-compressed-${sizeKB}kb` : "-clean";

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${filename}${suffix}.${ext}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      // Brief notification
      const toast = document.createElement("div");
      toast.textContent = `✅ SammaPix: Saved as ${ext.toUpperCase()} (${sizeKB}KB) — EXIF/GPS removed`;
      toast.style.cssText = "position:fixed;bottom:20px;right:20px;background:#171717;color:#fff;padding:12px 20px;border-radius:10px;font-family:system-ui;font-size:13px;z-index:999999;box-shadow:0 4px 12px rgba(0,0,0,0.15);transition:opacity 0.3s;";
      document.body.appendChild(toast);
      setTimeout(() => { toast.style.opacity = "0"; setTimeout(() => toast.remove(), 300); }, 3000);

      setTimeout(() => URL.revokeObjectURL(url), 5000);
    }, mimeType, quality);
  };

  img.onerror = () => {
    alert("SammaPix: Could not load this image (CORS restriction).\n\nTry: Right-click → More SammaPix tools → use the web version.");
  };

  img.src = imageUrl;
}

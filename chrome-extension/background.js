// ═══════════════════════════════════════════════════════════════════
// SammaPix Chrome Extension v3 — Preview + Convert + Usage Limits
// ═══════════════════════════════════════════════════════════════════

const BASE_URL = "https://www.sammapix.com";
const DAILY_FREE_LIMIT = 10;

// ═══════════════════════════════════════════
// INSTALL: Create context menus
// ═══════════════════════════════════════════
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "save-jpg",
    title: "📷 Save as JPG (remove EXIF/GPS)",
    contexts: ["image"],
  });

  chrome.contextMenus.create({
    id: "save-png",
    title: "📷 Save as PNG (remove EXIF/GPS)",
    contexts: ["image"],
  });

  chrome.contextMenus.create({
    id: "save-webp",
    title: "⚡ Save as WebP (smaller file)",
    contexts: ["image"],
  });

  chrome.contextMenus.create({
    id: "compress",
    title: "📦 Compress (80% quality)",
    contexts: ["image"],
  });

  chrome.contextMenus.create({ id: "sep1", type: "separator", contexts: ["image"] });

  chrome.contextMenus.create({
    id: "tools-parent",
    title: "🛠 More SammaPix tools",
    contexts: ["image"],
  });

  const tools = [
    { id: "remove-bg", title: "✂️ Remove Background (AI)", path: "/tools/remove-bg" },
    { id: "resize", title: "📐 Resize for social media", path: "/tools/resizepack" },
    { id: "passport", title: "📸 Passport Photo (140+ countries)", path: "/tools/passport-photo" },
    { id: "upscale", title: "🔍 Upscale / Enhance", path: "/tools/upscale" },
    { id: "watermark", title: "💧 Add Watermark", path: "/tools/stampit" },
  ];

  for (const t of tools) {
    chrome.contextMenus.create({
      id: `tool-${t.id}`,
      parentId: "tools-parent",
      title: t.title,
      contexts: ["image"],
    });
  }

  chrome.contextMenus.create({ id: "tool-sep", parentId: "tools-parent", type: "separator", contexts: ["image"] });
  chrome.contextMenus.create({
    id: "tool-all",
    parentId: "tools-parent",
    title: "🚀 All 27 tools on sammapix.com",
    contexts: ["image"],
  });
});

// ═══════════════════════════════════════════
// USAGE TRACKING
// ═══════════════════════════════════════════
async function getUsageToday() {
  const today = new Date().toISOString().slice(0, 10);
  const data = await chrome.storage.local.get(["usageDate", "usageCount"]);
  if (data.usageDate === today) return data.usageCount || 0;
  await chrome.storage.local.set({ usageDate: today, usageCount: 0 });
  return 0;
}

async function incrementUsage() {
  const today = new Date().toISOString().slice(0, 10);
  const count = await getUsageToday();
  await chrome.storage.local.set({ usageDate: today, usageCount: count + 1 });
  return count + 1;
}

// ═══════════════════════════════════════════
// HANDLE CLICKS
// ═══════════════════════════════════════════
chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  const imageUrl = info.srcUrl;
  if (!imageUrl) return;

  // Site tools → open sammapix.com
  if (info.menuItemId === "tool-all") {
    chrome.tabs.create({ url: `${BASE_URL}?ref=ext` });
    return;
  }
  if (info.menuItemId.startsWith("tool-")) {
    const paths = {
      "tool-remove-bg": "/tools/remove-bg",
      "tool-resize": "/tools/resizepack",
      "tool-passport": "/tools/passport-photo",
      "tool-upscale": "/tools/upscale",
      "tool-watermark": "/tools/stampit",
    };
    const path = paths[info.menuItemId];
    if (path) chrome.tabs.create({ url: `${BASE_URL}${path}?ref=ext` });
    return;
  }

  // Instant actions → check usage + show preview
  const actions = {
    "save-jpg": { mimeType: "image/jpeg", ext: "jpg", quality: 0.95, label: "JPG" },
    "save-png": { mimeType: "image/png", ext: "png", quality: 1, label: "PNG" },
    "save-webp": { mimeType: "image/webp", ext: "webp", quality: 0.90, label: "WebP" },
    "compress": { mimeType: "image/jpeg", ext: "jpg", quality: 0.80, label: "Compressed JPG" },
  };

  const action = actions[info.menuItemId];
  if (!action) return;

  // Check usage limit
  const usage = await getUsageToday();
  const limitReached = usage >= DAILY_FREE_LIMIT;

  try {
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: showPreviewAndProcess,
      args: [imageUrl, action.mimeType, action.ext, action.quality, action.label, usage, DAILY_FREE_LIMIT, limitReached, BASE_URL],
    });
  } catch (err) {
    chrome.tabs.create({ url: `${BASE_URL}/tools/webp?ref=ext` });
  }

  if (!limitReached) {
    await incrementUsage();
  }
});

// ═══════════════════════════════════════════
// INJECTED: Preview overlay + process image
// ═══════════════════════════════════════════
function showPreviewAndProcess(imageUrl, mimeType, ext, quality, label, usage, limit, limitReached, baseUrl) {
  // Remove any existing overlay
  const existing = document.getElementById("sammapix-overlay");
  if (existing) existing.remove();

  // If limit reached, show registration prompt
  if (limitReached) {
    showOverlay(null, null, null, usage, limit, true, baseUrl, label);
    return;
  }

  // Process image
  const img = new Image();
  img.crossOrigin = "anonymous";

  img.onload = () => {
    const canvas = document.createElement("canvas");
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    canvas.toBlob((blob) => {
      if (!blob) {
        showError();
        return;
      }

      // Get original size
      fetch(imageUrl).then(r => r.blob()).then(originalBlob => {
        const originalSize = originalBlob.size;
        const newSize = blob.size;
        const reduction = Math.round((1 - newSize / originalSize) * 100);
        const blobUrl = URL.createObjectURL(blob);

        // Get filename
        let filename = "image";
        try {
          const path = new URL(imageUrl).pathname;
          const base = path.split("/").pop().split(".")[0].replace(/[^a-zA-Z0-9_-]/g, "");
          if (base && base.length > 0 && base.length < 80) filename = base;
        } catch {}

        const originalExt = imageUrl.split(".").pop().split("?")[0].toLowerCase();

        showOverlay({
          blobUrl,
          filename: `${filename}-sammapix.${ext}`,
          originalSize,
          newSize,
          reduction,
          originalFormat: originalExt.toUpperCase(),
          newFormat: label,
          width: img.naturalWidth,
          height: img.naturalHeight,
        }, canvas.toDataURL(mimeType, quality), imageUrl, usage + 1, limit, false, baseUrl, label);
      }).catch(() => {
        // Can't get original size, still show preview
        const blobUrl = URL.createObjectURL(blob);
        showOverlay({
          blobUrl,
          filename: `image-sammapix.${ext}`,
          originalSize: null,
          newSize: blob.size,
          reduction: null,
          originalFormat: "?",
          newFormat: label,
          width: img.naturalWidth,
          height: img.naturalHeight,
        }, canvas.toDataURL(mimeType, quality), imageUrl, usage + 1, limit, false, baseUrl, label);
      });
    }, mimeType, quality);
  };

  img.onerror = () => showError();
  img.src = imageUrl;

  function showError() {
    const overlay = document.createElement("div");
    overlay.id = "sammapix-overlay";
    overlay.innerHTML = `
      <div style="position:fixed;inset:0;background:rgba(0,0,0,0.6);z-index:999999;display:flex;align-items:center;justify-content:center;font-family:system-ui,-apple-system,sans-serif;">
        <div style="background:#fff;border-radius:16px;padding:32px;max-width:400px;text-align:center;box-shadow:0 20px 60px rgba(0,0,0,0.3);">
          <div style="font-size:40px;margin-bottom:12px;">🔒</div>
          <h3 style="margin:0 0 8px;font-size:16px;color:#171717;">Can't process this image</h3>
          <p style="margin:0 0 16px;font-size:13px;color:#737373;">This image has CORS restrictions. Use the web version instead.</p>
          <a href="${baseUrl}/tools/webp?ref=ext" target="_blank" style="display:inline-block;padding:10px 24px;background:#171717;color:#fff;border-radius:8px;text-decoration:none;font-size:13px;font-weight:600;">Open SammaPix →</a>
          <button onclick="this.closest('#sammapix-overlay').remove()" style="display:block;margin:12px auto 0;background:none;border:none;color:#A3A3A3;cursor:pointer;font-size:12px;">Close</button>
        </div>
      </div>`;
    document.body.appendChild(overlay);
  }

  function showOverlay(result, previewDataUrl, origUrl, currentUsage, dailyLimit, isLimited, siteUrl, formatLabel) {
    const overlay = document.createElement("div");
    overlay.id = "sammapix-overlay";

    if (isLimited) {
      // LIMIT REACHED — show registration prompt
      overlay.innerHTML = `
        <div style="position:fixed;inset:0;background:rgba(0,0,0,0.6);z-index:999999;display:flex;align-items:center;justify-content:center;font-family:system-ui,-apple-system,sans-serif;" onclick="if(event.target===this)this.remove()">
          <div style="background:#fff;border-radius:20px;padding:36px;max-width:420px;text-align:center;box-shadow:0 20px 60px rgba(0,0,0,0.3);">
            <div style="font-size:48px;margin-bottom:16px;">✨</div>
            <h3 style="margin:0 0 8px;font-size:18px;color:#171717;font-weight:700;">Daily limit reached</h3>
            <p style="margin:0 0 6px;font-size:14px;color:#737373;">${dailyLimit}/${dailyLimit} free conversions used today</p>
            <p style="margin:0 0 24px;font-size:13px;color:#A3A3A3;">Register for free to get unlimited access — same account works on the extension and sammapix.com</p>
            <a href="${siteUrl}/signup?ref=ext-limit" target="_blank" style="display:inline-block;padding:12px 32px;background:#171717;color:#fff;border-radius:10px;text-decoration:none;font-size:14px;font-weight:600;transition:background 0.2s;" onmouseover="this.style.background='#333'" onmouseout="this.style.background='#171717'">Register free — unlimited access →</a>
            <p style="margin:16px 0 0;font-size:11px;color:#A3A3A3;">Resets tomorrow at midnight</p>
            <button onclick="this.closest('#sammapix-overlay').remove()" style="display:block;margin:12px auto 0;background:none;border:none;color:#A3A3A3;cursor:pointer;font-size:12px;">Close</button>
          </div>
        </div>`;
      document.body.appendChild(overlay);
      return;
    }

    // SUCCESS — show preview with stats
    const sizeOriginal = result.originalSize ? formatBytes(result.originalSize) : "—";
    const sizeNew = formatBytes(result.newSize);
    const reductionText = result.reduction !== null && result.reduction > 0
      ? `<span style="color:#16A34A;font-weight:600;">-${result.reduction}%</span>`
      : `<span style="color:#737373;">same size</span>`;

    const usageBar = `
      <div style="margin-top:16px;padding-top:14px;border-top:1px solid #E5E5E5;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
          <span style="font-size:11px;color:#A3A3A3;">${currentUsage}/${dailyLimit} free today</span>
          ${currentUsage >= dailyLimit - 3 ? `<a href="${siteUrl}/signup?ref=ext" target="_blank" style="font-size:11px;color:#6366F1;text-decoration:none;font-weight:500;">Get unlimited →</a>` : ""}
        </div>
        <div style="height:4px;background:#E5E5E5;border-radius:4px;overflow:hidden;">
          <div style="height:100%;width:${Math.min(100, (currentUsage / dailyLimit) * 100)}%;background:${currentUsage >= dailyLimit - 2 ? '#EF4444' : '#171717'};border-radius:4px;transition:width 0.3s;"></div>
        </div>
      </div>`;

    overlay.innerHTML = `
      <div style="position:fixed;inset:0;background:rgba(0,0,0,0.6);z-index:999999;display:flex;align-items:center;justify-content:center;font-family:system-ui,-apple-system,sans-serif;backdrop-filter:blur(4px);" onclick="if(event.target===this)this.remove()">
        <div style="background:#fff;border-radius:20px;max-width:480px;width:90vw;box-shadow:0 20px 60px rgba(0,0,0,0.3);overflow:hidden;">

          <!-- Header -->
          <div style="padding:16px 20px;display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid #F5F5F5;">
            <div style="display:flex;align-items:center;gap:8px;">
              <span style="font-size:15px;font-weight:700;color:#171717;">SammaPix</span>
              <span style="font-size:10px;padding:2px 8px;background:#F0FDF4;color:#16A34A;border-radius:4px;font-weight:600;">DONE</span>
            </div>
            <button onclick="this.closest('#sammapix-overlay').remove()" style="background:none;border:none;cursor:pointer;font-size:18px;color:#A3A3A3;padding:4px;">✕</button>
          </div>

          <!-- Preview -->
          <div style="padding:16px 20px 0;">
            <div style="border-radius:12px;overflow:hidden;background:#F5F5F5;max-height:240px;display:flex;align-items:center;justify-content:center;">
              <img src="${previewDataUrl}" style="max-width:100%;max-height:240px;object-fit:contain;" />
            </div>
          </div>

          <!-- Stats -->
          <div style="padding:16px 20px 0;">
            <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;">
              <div style="background:#F9FAFB;border-radius:10px;padding:12px;text-align:center;">
                <div style="font-size:10px;color:#A3A3A3;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:4px;">Format</div>
                <div style="font-size:13px;color:#171717;font-weight:600;">${result.originalFormat} → ${result.newFormat}</div>
              </div>
              <div style="background:#F9FAFB;border-radius:10px;padding:12px;text-align:center;">
                <div style="font-size:10px;color:#A3A3A3;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:4px;">Size</div>
                <div style="font-size:13px;color:#171717;font-weight:600;">${sizeOriginal} → ${sizeNew}</div>
              </div>
              <div style="background:#F0FDF4;border-radius:10px;padding:12px;text-align:center;">
                <div style="font-size:10px;color:#A3A3A3;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:4px;">EXIF/GPS</div>
                <div style="font-size:13px;color:#16A34A;font-weight:600;">✅ Removed</div>
              </div>
            </div>
          </div>

          <!-- Actions -->
          <div style="padding:16px 20px;">
            <div style="display:flex;gap:8px;">
              <button onclick="
                const a=document.createElement('a');
                a.href='${result.blobUrl}';
                a.download='${result.filename}';
                document.body.appendChild(a);a.click();a.remove();
              " style="flex:1;padding:12px;background:#171717;color:#fff;border:none;border-radius:10px;font-size:13px;font-weight:600;cursor:pointer;transition:background 0.2s;" onmouseover="this.style.background='#333'" onmouseout="this.style.background='#171717'">
                📥 Download ${result.newFormat}
              </button>
              <a href="${siteUrl}/tools/compress?ref=ext" target="_blank" style="padding:12px 16px;background:#F5F5F5;color:#171717;border:none;border-radius:10px;font-size:13px;font-weight:500;cursor:pointer;text-decoration:none;display:flex;align-items:center;transition:background 0.2s;" onmouseover="this.style.background='#EBEBEB'" onmouseout="this.style.background='#F5F5F5'">
                More tools →
              </a>
            </div>

            ${usageBar}
          </div>
        </div>
      </div>`;

    document.body.appendChild(overlay);

    // Auto-close after 30 seconds
    setTimeout(() => {
      const el = document.getElementById("sammapix-overlay");
      if (el) el.style.opacity = "0";
      setTimeout(() => { const el2 = document.getElementById("sammapix-overlay"); if (el2) el2.remove(); }, 300);
    }, 30000);
  }

  function formatBytes(bytes) {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return Math.round(bytes / 1024) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  }
}

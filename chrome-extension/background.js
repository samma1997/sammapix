// ═══════════════════════════════════════════════════════════════════
// SammaPix Background — Side Panel + Context Menu
// ═══════════════════════════════════════════════════════════════════

const BASE_URL = "https://www.sammapix.com";

// Open side panel on toolbar icon click
chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });

// ═══════════════════════════════════════════
// CONTEXT MENUS
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
    id: "scan-page",
    title: "🔍 Scan all images on this page",
    contexts: ["page", "image"],
  });
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === "scan-page") {
    await chrome.sidePanel.open({ tabId: tab.id });
    return;
  }

  const imageUrl = info.srcUrl;
  if (!imageUrl) return;

  const actions = {
    "save-jpg": { mimeType: "image/jpeg", ext: "jpg", quality: 0.95, label: "JPG" },
    "save-png": { mimeType: "image/png", ext: "png", quality: 1, label: "PNG" },
    "save-webp": { mimeType: "image/webp", ext: "webp", quality: 0.90, label: "WebP" },
    "compress": { mimeType: "image/jpeg", ext: "jpg", quality: 0.80, label: "Compressed JPG" },
  };

  const action = actions[info.menuItemId];
  if (!action) return;

  // Check usage
  const usage = await getUsageToday();
  if (usage >= 10) {
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: showLimitOverlay,
      args: [BASE_URL],
    });
    return;
  }

  try {
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: processAndPreview,
      args: [imageUrl, action.mimeType, action.ext, action.quality, action.label, usage + 1, BASE_URL],
    });
    await incrementUsage();
  } catch {
    chrome.tabs.create({ url: `${BASE_URL}/tools/webp?ref=ext` });
  }
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
}

// ═══════════════════════════════════════════
// INJECTED: Limit overlay
// ═══════════════════════════════════════════
function showLimitOverlay(baseUrl) {
  const existing = document.getElementById("sammapix-overlay");
  if (existing) existing.remove();
  const d = document.createElement("div");
  d.id = "sammapix-overlay";
  d.innerHTML = `<div style="position:fixed;inset:0;background:rgba(0,0,0,0.6);z-index:999999;display:flex;align-items:center;justify-content:center;font-family:system-ui;backdrop-filter:blur(4px)" onclick="if(event.target===this)this.remove()"><div style="background:#fff;border-radius:20px;padding:36px;max-width:400px;text-align:center;box-shadow:0 20px 60px rgba(0,0,0,.3)"><div style="font-size:48px;margin-bottom:16px">✨</div><h3 style="margin:0 0 8px;font-size:18px;color:#171717;font-weight:700">Daily limit reached</h3><p style="margin:0 0 6px;font-size:14px;color:#737373">10/10 free conversions used today</p><p style="margin:0 0 24px;font-size:13px;color:#A3A3A3">Register free for unlimited access</p><a href="${baseUrl}/signup?ref=ext-limit" target="_blank" style="display:inline-block;padding:12px 32px;background:#171717;color:#fff;border-radius:10px;text-decoration:none;font-size:14px;font-weight:600">Register free →</a><button onclick="this.closest('#sammapix-overlay').remove()" style="display:block;margin:12px auto 0;background:none;border:none;color:#A3A3A3;cursor:pointer;font-size:12px">Close</button></div></div>`;
  document.body.appendChild(d);
}

// ═══════════════════════════════════════════
// INJECTED: Process + preview overlay
// ═══════════════════════════════════════════
function processAndPreview(imageUrl, mimeType, ext, quality, label, currentUsage, baseUrl) {
  const existing = document.getElementById("sammapix-overlay");
  if (existing) existing.remove();

  const img = new Image();
  img.crossOrigin = "anonymous";
  img.onload = () => {
    const c = document.createElement("canvas");
    c.width = img.naturalWidth; c.height = img.naturalHeight;
    c.getContext("2d").drawImage(img, 0, 0);
    c.toBlob(blob => {
      if (!blob) { alert("SammaPix: CORS restriction. Use More SammaPix tools."); return; }
      fetch(imageUrl).then(r=>r.blob()).then(orig => {
        show(blob, orig.size, blob.size, c.toDataURL(mimeType, quality));
      }).catch(() => show(blob, null, blob.size, c.toDataURL(mimeType, quality)));
    }, mimeType, quality);
  };
  img.onerror = () => alert("SammaPix: Can't load image (CORS).");
  img.src = imageUrl;

  function show(blob, origSize, newSize, preview) {
    let fn = "image";
    try { const b = new URL(imageUrl).pathname.split("/").pop().split(".")[0].replace(/[^a-zA-Z0-9_-]/g,""); if(b&&b.length>0&&b.length<80)fn=b; } catch{}
    const blobUrl = URL.createObjectURL(blob);
    const origFmt = imageUrl.split(".").pop().split("?")[0].toUpperCase().slice(0,4);
    const reduction = origSize ? Math.round((1-newSize/origSize)*100) : null;
    const sO = origSize ? fmtB(origSize) : "—";
    const sN = fmtB(newSize);
    const d = document.createElement("div"); d.id="sammapix-overlay";
    d.innerHTML=`<div style="position:fixed;inset:0;background:rgba(0,0,0,.6);z-index:999999;display:flex;align-items:center;justify-content:center;font-family:system-ui;backdrop-filter:blur(4px)" onclick="if(event.target===this)this.remove()"><div style="background:#fff;border-radius:20px;max-width:460px;width:90vw;box-shadow:0 20px 60px rgba(0,0,0,.3);overflow:hidden"><div style="padding:14px 18px;display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid #F5F5F5"><div style="display:flex;align-items:center;gap:8px"><span style="font-size:15px;font-weight:700;color:#171717">SammaPix</span><span style="font-size:9px;padding:2px 8px;background:#F0FDF4;color:#16A34A;border-radius:4px;font-weight:600">DONE</span></div><button onclick="this.closest('#sammapix-overlay').remove()" style="background:none;border:none;cursor:pointer;font-size:18px;color:#A3A3A3">✕</button></div><div style="padding:14px 18px 0"><div style="border-radius:12px;overflow:hidden;background:#F5F5F5;max-height:200px;display:flex;align-items:center;justify-content:center"><img src="${preview}" style="max-width:100%;max-height:200px;object-fit:contain"/></div></div><div style="padding:14px 18px 0;display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px"><div style="background:#F9FAFB;border-radius:10px;padding:10px;text-align:center"><div style="font-size:9px;color:#A3A3A3;text-transform:uppercase;letter-spacing:.5px;margin-bottom:3px">Format</div><div style="font-size:12px;color:#171717;font-weight:600">${origFmt}→${label}</div></div><div style="background:#F9FAFB;border-radius:10px;padding:10px;text-align:center"><div style="font-size:9px;color:#A3A3A3;text-transform:uppercase;letter-spacing:.5px;margin-bottom:3px">Size</div><div style="font-size:12px;color:#171717;font-weight:600">${sO}→${sN}</div></div><div style="background:#F0FDF4;border-radius:10px;padding:10px;text-align:center"><div style="font-size:9px;color:#A3A3A3;text-transform:uppercase;letter-spacing:.5px;margin-bottom:3px">EXIF/GPS</div><div style="font-size:12px;color:#16A34A;font-weight:600">✅ Clean</div></div></div><div style="padding:14px 18px"><div style="display:flex;gap:8px"><button onclick="const a=document.createElement('a');a.href='${blobUrl}';a.download='${fn}-sammapix.${ext}';document.body.appendChild(a);a.click();a.remove()" style="flex:1;padding:11px;background:#171717;color:#fff;border:none;border-radius:10px;font-size:13px;font-weight:600;cursor:pointer">📥 Download</button><a href="${baseUrl}?ref=ext" target="_blank" style="padding:11px 14px;background:#F5F5F5;color:#171717;border-radius:10px;font-size:12px;font-weight:500;text-decoration:none;display:flex;align-items:center">More →</a></div><div style="margin-top:12px;padding-top:10px;border-top:1px solid #E5E5E5"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:5px"><span style="font-size:10px;color:#A3A3A3">${currentUsage}/10 free today</span>${currentUsage>=8?`<a href="${baseUrl}/signup?ref=ext" target="_blank" style="font-size:10px;color:#6366F1;text-decoration:none;font-weight:500">Unlimited →</a>`:""}</div><div style="height:3px;background:#E5E5E5;border-radius:3px;overflow:hidden"><div style="height:100%;width:${Math.min(100,currentUsage*10)}%;background:${currentUsage>=8?"#EF4444":"#171717"};border-radius:3px"></div></div></div></div></div></div>`;
    document.body.appendChild(d);
    setTimeout(()=>{const e=document.getElementById("sammapix-overlay");if(e){e.style.opacity="0";setTimeout(()=>{const e2=document.getElementById("sammapix-overlay");if(e2)e2.remove()},300)}},30000);
  }
  function fmtB(b){if(b<1024)return b+"B";if(b<1048576)return Math.round(b/1024)+"KB";return(b/1048576).toFixed(1)+"MB"}
}

const BASE_URL = "https://www.sammapix.com";

chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });

// Listen for scan requests from side panel
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.action === "scan") {
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, async (tabs) => {
      if (!tabs[0]?.id) { sendResponse({ images: [] }); return; }
      try {
        const results = await chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          func: () => {
            const m = new Map();
            document.querySelectorAll("img").forEach(el => {
              const s = el.currentSrc || el.src;
              if (!s || s.length < 10 || s.startsWith("data:image/svg") || m.has(s)) return;
              const r = el.getBoundingClientRect();
              if (r.width < 20 && r.height < 20) return;
              m.set(s, { src: s, w: el.naturalWidth || Math.round(r.width), h: el.naturalHeight || Math.round(r.height) });
            });
            document.querySelectorAll("*").forEach(el => {
              const bg = getComputedStyle(el).backgroundImage;
              if (!bg || bg === "none") return;
              const x = bg.match(/url\(["']?(https?:\/\/[^"')]+)["']?\)/);
              if (!x || m.has(x[1])) return;
              const r = el.getBoundingClientRect();
              if (r.width < 20 && r.height < 20) return;
              m.set(x[1], { src: x[1], w: Math.round(r.width), h: Math.round(r.height) });
            });
            return Array.from(m.values());
          },
        });
        sendResponse({ images: results[0]?.result || [] });
      } catch (e) {
        sendResponse({ images: [], error: e.message });
      }
    });
    return true; // async response
  }
});

// Context menus
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({ id: "save-jpg", title: "Save as JPG (remove EXIF)", contexts: ["image"] });
  chrome.contextMenus.create({ id: "save-png", title: "Save as PNG (remove EXIF)", contexts: ["image"] });
  chrome.contextMenus.create({ id: "save-webp", title: "Save as WebP (smaller)", contexts: ["image"] });
  chrome.contextMenus.create({ id: "compress", title: "Compress (80% quality)", contexts: ["image"] });
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (!info.srcUrl) return;
  const acts = {
    "save-jpg": { m: "image/jpeg", e: "jpg", q: 0.95 },
    "save-png": { m: "image/png", e: "png", q: 1 },
    "save-webp": { m: "image/webp", e: "webp", q: 0.9 },
    "compress": { m: "image/jpeg", e: "jpg", q: 0.8 },
  };
  const a = acts[info.menuItemId];
  if (!a) return;
  try {
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: (url, mime, ext, q) => {
        const img = new Image(); img.crossOrigin = "anonymous";
        img.onload = () => {
          const c = document.createElement("canvas"); c.width = img.naturalWidth; c.height = img.naturalHeight;
          c.getContext("2d").drawImage(img, 0, 0);
          c.toBlob(b => {
            if (!b) return;
            const u = URL.createObjectURL(b);
            const a = document.createElement("a"); a.href = u;
            let fn = "image"; try { fn = new URL(url).pathname.split("/").pop().split(".")[0] || "image"; } catch {}
            a.download = fn + "." + ext; document.body.appendChild(a); a.click(); a.remove();
          }, mime, q);
        };
        img.src = url;
      },
      args: [info.srcUrl, a.m, a.e, a.q],
    });
  } catch {}
});

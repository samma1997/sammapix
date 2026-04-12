// SammaPix Background — only handles side panel + context menus
chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });

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

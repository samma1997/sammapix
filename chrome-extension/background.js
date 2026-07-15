// SammaPix Background — side panel + right-click image menus
chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({ id: "save-jpg", title: "Save as JPG (remove EXIF)", contexts: ["image"] });
  chrome.contextMenus.create({ id: "save-png", title: "Save as PNG (remove EXIF)", contexts: ["image"] });
  chrome.contextMenus.create({ id: "save-webp", title: "Save as WebP (smaller)", contexts: ["image"] });
  chrome.contextMenus.create({ id: "compress", title: "Compress (80% quality)", contexts: ["image"] });
});

const ACTS = {
  "save-jpg": { m: "image/jpeg", e: "jpg", q: 0.95 },
  "save-png": { m: "image/png", e: "png", q: 1 },
  "save-webp": { m: "image/webp", e: "webp", q: 0.9 },
  "compress": { m: "image/jpeg", e: "jpg", q: 0.8 },
};

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (!info.srcUrl || !tab || !tab.id) return;
  const a = ACTS[info.menuItemId];
  if (!a) return;
  try {
    // Optional host access, requested at runtime (right-click is a user gesture).
    // Keeps the default install on narrow permissions for a faster store review.
    if (chrome.permissions && chrome.permissions.request) {
      const okHost = await chrome.permissions.request({ origins: ["<all_urls>"] });
      if (!okHost) return;
    }
    // Fetch the real bytes here in the extension context — the granted host access
    // bypasses CORS, so we can re-encode any image without tainting a canvas.
    const resp = await fetch(info.srcUrl);
    const blob = await resp.blob();
    const bmp = await createImageBitmap(blob);
    const canvas = new OffscreenCanvas(bmp.width, bmp.height);
    canvas.getContext("2d").drawImage(bmp, 0, 0);
    if (bmp.close) bmp.close();
    const outBlob = await canvas.convertToBlob({ type: a.m, quality: a.q });
    const dataUrl = await new Promise((res) => {
      const fr = new FileReader();
      fr.onload = () => res(fr.result);
      fr.readAsDataURL(outBlob);
    });
    let fn = "image";
    try { fn = new URL(info.srcUrl).pathname.split("/").pop().split(".")[0].replace(/[^a-zA-Z0-9_-]/g, "") || "image"; } catch {}
    // Trigger the download from the page (side panel/worker can't click an <a>)
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: (durl, name) => {
        const link = document.createElement("a");
        link.href = durl; link.download = name;
        document.body.appendChild(link); link.click(); link.remove();
      },
      args: [dataUrl, fn + "." + a.e],
    });
  } catch (e) {}
});

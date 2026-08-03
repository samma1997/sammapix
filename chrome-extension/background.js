// SammaPix Background — side panel + right-click image menus
chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });

chrome.runtime.onInstalled.addListener((details) => {
  // removeAll first so a reload/update never hits a "duplicate id" error.
  chrome.contextMenus.removeAll(() => {
    chrome.contextMenus.create({ id: "save-jpg", title: "Save as JPG (remove EXIF)", contexts: ["image"] });
    chrome.contextMenus.create({ id: "save-png", title: "Save as PNG (remove EXIF)", contexts: ["image"] });
    chrome.contextMenus.create({ id: "save-webp", title: "Save as WebP (smaller)", contexts: ["image"] });
    chrome.contextMenus.create({ id: "compress", title: "Compress (80% quality)", contexts: ["image"] });
    chrome.contextMenus.create({ id: "grab-page", title: "Grab all images on this page (SammaPix)", contexts: ["page", "selection", "link"] });
  });
  // First install → open the welcome page that teaches how to pin the extension.
  if (details && details.reason === "install") {
    chrome.tabs.create({ url: "https://www.sammapix.com/chrome/welcome?ref=ext-install" });
  }
});

// The context menu remembers which tool the side panel should open on load.
let pendingTool = null;
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg && msg.q === "pending") { sendResponse({ tool: pendingTool }); pendingTool = null; }
});

const ACTS = {
  "save-jpg": { m: "image/jpeg", e: "jpg", q: 0.95 },
  "save-png": { m: "image/png", e: "png", q: 1 },
  "save-webp": { m: "image/webp", e: "webp", q: 0.9 },
  "compress": { m: "image/jpeg", e: "jpg", q: 0.8 },
};

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  // Page-level menu: open the side panel straight on the From-page picker.
  if (info.menuItemId === "grab-page") {
    if (!tab || !tab.id) return;
    pendingTool = "page";
    try { await chrome.sidePanel.open({ tabId: tab.id }); } catch (e) {}
    // If the panel was already open, tell it to switch now.
    try { chrome.runtime.sendMessage({ sp: "open", tool: "page" }).catch(() => {}); } catch (e) {}
    return;
  }
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

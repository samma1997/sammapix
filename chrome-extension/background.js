// SammaPix Chrome Extension
// 1. Right-click image → Save as JPG/PNG (works INSIDE extension, no site needed)
// 2. Right-click image → Open in SammaPix tool (compress, resize, remove bg, etc.)
// 3. Popup with quick access to all tools

const BASE_URL = "https://www.sammapix.com";

const TOOLS = [
  { id: "compress", title: "Compress with SammaPix", path: "/tools/compress" },
  { id: "resize", title: "Resize with SammaPix", path: "/tools/resizepack" },
  { id: "convert-webp", title: "Convert to WebP", path: "/tools/webp" },
  { id: "remove-bg", title: "Remove Background", path: "/tools/remove-bg" },
  { id: "strip-exif", title: "Strip EXIF / GPS Data", path: "/tools/exif" },
];

// ═══════════════════════════════════════════
// INSTALL: Create context menus
// ═══════════════════════════════════════════
chrome.runtime.onInstalled.addListener(() => {
  // --- Quick Convert (works inside extension) ---
  chrome.contextMenus.create({
    id: "sammapix-save-jpg",
    title: "Save image as JPG",
    contexts: ["image"],
  });

  chrome.contextMenus.create({
    id: "sammapix-save-png",
    title: "Save image as PNG",
    contexts: ["image"],
  });

  // --- Separator ---
  chrome.contextMenus.create({
    id: "sammapix-sep1",
    type: "separator",
    contexts: ["image"],
  });

  // --- SammaPix Tools (opens site) ---
  chrome.contextMenus.create({
    id: "sammapix-parent",
    title: "More SammaPix tools",
    contexts: ["image"],
  });

  for (const tool of TOOLS) {
    chrome.contextMenus.create({
      id: `sammapix-${tool.id}`,
      parentId: "sammapix-parent",
      title: tool.title,
      contexts: ["image"],
    });
  }

  chrome.contextMenus.create({
    id: "sammapix-all",
    parentId: "sammapix-parent",
    title: "All 27 tools →",
    contexts: ["image"],
  });
});

// ═══════════════════════════════════════════
// HANDLE: Context menu clicks
// ═══════════════════════════════════════════
chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  const imageUrl = info.srcUrl;
  if (!imageUrl) return;

  // --- Save as JPG / PNG (in-extension, no site needed) ---
  if (info.menuItemId === "sammapix-save-jpg" || info.menuItemId === "sammapix-save-png") {
    const format = info.menuItemId === "sammapix-save-jpg" ? "jpeg" : "png";
    const ext = format === "jpeg" ? "jpg" : "png";
    const mimeType = `image/${format}`;

    // Inject script into the active tab to convert the image via Canvas
    try {
      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: convertAndDownload,
        args: [imageUrl, mimeType, ext],
      });
    } catch (err) {
      // Fallback: open in new tab with instructions
      console.error("Script injection failed:", err);
      chrome.tabs.create({ url: `${BASE_URL}/tools/webp?ref=chrome-extension&imageUrl=${encodeURIComponent(imageUrl)}` });
    }
    return;
  }

  // --- Open all tools ---
  if (info.menuItemId === "sammapix-all") {
    chrome.tabs.create({ url: BASE_URL + "?ref=chrome-extension" });
    return;
  }

  // --- Open specific tool ---
  const toolId = info.menuItemId.replace("sammapix-", "");
  const tool = TOOLS.find(t => t.id === toolId);
  if (tool) {
    chrome.tabs.create({
      url: `${BASE_URL}${tool.path}?ref=chrome-extension`,
    });
  }
});

// ═══════════════════════════════════════════
// INJECTED FUNCTION: Convert image via Canvas API
// This runs inside the active tab's context
// ═══════════════════════════════════════════
function convertAndDownload(imageUrl, mimeType, ext) {
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
        alert("SammaPix: Could not convert this image (CORS restriction). Try right-click → More SammaPix tools → Convert to WebP.");
        return;
      }
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;

      // Generate filename from URL or use default
      let filename = "image";
      try {
        const urlPath = new URL(imageUrl).pathname;
        const baseName = urlPath.split("/").pop().split(".")[0];
        if (baseName && baseName.length > 0 && baseName.length < 100) {
          filename = baseName;
        }
      } catch {}
      a.download = `${filename}.${ext}`;

      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, mimeType, 0.92);
  };

  img.onerror = () => {
    alert("SammaPix: Could not load this image (CORS restriction). Try right-click → More SammaPix tools.");
  };

  img.src = imageUrl;
}

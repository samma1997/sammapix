// SammaPix Chrome Extension — Context Menu + Quick Actions
// Right-click on any image → open in SammaPix tool

const TOOLS = [
  { id: "compress", title: "Compress Image", path: "/tools/compress" },
  { id: "resize", title: "Resize Image", path: "/tools/resizepack" },
  { id: "convert-webp", title: "Convert to WebP", path: "/tools/webp" },
  { id: "convert-jpg", title: "Convert to JPG", path: "/convert/png-to-jpg" },
  { id: "remove-bg", title: "Remove Background", path: "/tools/remove-bg" },
  { id: "strip-exif", title: "Strip EXIF / GPS Data", path: "/tools/exif" },
];

const BASE_URL = "https://www.sammapix.com";

// Create context menu on install
chrome.runtime.onInstalled.addListener(() => {
  // Parent menu
  chrome.contextMenus.create({
    id: "sammapix-parent",
    title: "SammaPix",
    contexts: ["image"],
  });

  // Tool submenus
  for (const tool of TOOLS) {
    chrome.contextMenus.create({
      id: `sammapix-${tool.id}`,
      parentId: "sammapix-parent",
      title: tool.title,
      contexts: ["image"],
    });
  }

  // Separator + open site
  chrome.contextMenus.create({
    id: "sammapix-separator",
    parentId: "sammapix-parent",
    type: "separator",
    contexts: ["image"],
  });

  chrome.contextMenus.create({
    id: "sammapix-open",
    parentId: "sammapix-parent",
    title: "Open SammaPix (all 27 tools)",
    contexts: ["image"],
  });
});

// Handle context menu clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "sammapix-open") {
    chrome.tabs.create({ url: BASE_URL });
    return;
  }

  const toolId = info.menuItemId.replace("sammapix-", "");
  const tool = TOOLS.find(t => t.id === toolId);

  if (tool) {
    // Open the tool page — user can then drop/paste the image
    // We pass the image URL as a query param so the tool can auto-fetch it
    const imageUrl = info.srcUrl;
    const toolUrl = `${BASE_URL}${tool.path}?ref=chrome-extension${imageUrl ? `&imageUrl=${encodeURIComponent(imageUrl)}` : ""}`;
    chrome.tabs.create({ url: toolUrl });
  }
});

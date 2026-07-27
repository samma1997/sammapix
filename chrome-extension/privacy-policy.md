# Privacy Policy — SammaPix Chrome Extension

**Last updated:** July 27, 2026

## What this extension does

SammaPix gives you browser-based image tools (compress, convert, crop, resize, watermark, blur, strip EXIF), archive extraction (RAR/7z/ZIP/TAR), and a "grab images from any page" bulk downloader — plus quick access to the full toolset on sammapix.com.

## Your images never leave your device

All image and archive processing happens locally in your browser via the Canvas API and WebAssembly. **We never upload, store, or see your files.**

## What we do collect

- **Anonymous usage analytics.** To understand which tools people use, the extension sends small, content-free events (for example: "compress opened", "page grab of N images", "day pass clicked"). These carry only a random, locally-generated ID and coarse tags (tool name, output format, count). They contain **no image data, no page content, no URLs, and no personal information**. Events are sent to sammapix.com, which forwards them to Google Analytics. You can **turn this off** anytime from the "Anonymous usage stats" switch in the extension footer.
- **Account & quota (only for bulk "from page" actions).** Bulk download/convert/rename of a page's images is tied to your SammaPix account (free: 50 images/day; Pro: unlimited). When you run one of those actions, the extension checks your usage with sammapix.com using your existing signed-in session. The individual tools (compress, convert, crop, archives, right-click save) do **not** require an account and make no such call.

## Third parties

- **Google Analytics (GA4)** — receives the anonymous usage events described above.
- **Stripe** — only if you choose to buy a Day Pass or Pro; checkout happens on the sammapix.com website, not inside the extension.

## Permissions used

- **contextMenus** — right-click actions ("Save as JPG/PNG/WebP", "Grab all images on this page").
- **activeTab / scripting** — to read the images of the page you're currently on, only when you open "Images on this page".
- **sidePanel** — the extension UI lives in the browser side panel.
- **optional host access (`<all_urls>`)** — requested only at the moment you run a bulk page action, so it can fetch the page's images. Not granted on install.

## Contact

Questions: luca@sammapix.com · https://www.sammapix.com

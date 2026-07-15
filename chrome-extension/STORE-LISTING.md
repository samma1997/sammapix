# SammaPix — Chrome Web Store: scheda pronta da copia-incolla (v5)

Pacchetto da caricare: `~/Downloads/sammapix-extension-v5.4.3.zip` (versione 5.4.3)

---

## Nome (già nel manifest)
SammaPix — Image Tools

## Summary / Riepilogo breve (max 132 caratteri)
Compress, convert, crop & clean images. Extract RAR/7z/ZIP. Grab every image from a page in bulk. 100% in your browser.

## Categoria
Photos (alternativa: Tools)

## Lingua
English (United States)

## Descrizione dettagliata (copia tutto)
SammaPix is a fast image toolbox that lives in your browser side panel. Open it on any page and get things done in seconds, without uploading anything.

IMAGE TOOLS (100% in your browser)
• Compress JPG, PNG and WebP with a live size preview (see the saving before you save)
• Convert between WebP, PNG and JPG
• Crop with draggable handles, undo any step
• Add a text watermark
• Blur / censor faces, plates or private info
• Clean EXIF and GPS metadata
• Batch: drop many photos and process them all at once into a ZIP

ARCHIVES (100% in your browser)
• Extract RAR, 7z, ZIP, TAR and more, right in the browser, no software to install
• Download files one by one or all as a ZIP

GRAB IMAGES FROM ANY PAGE
• See every image on the page you are visiting
• Select the ones you want and download, compress or rename them in bulk
• Perfect for research, shopping, moodboards and product pages

Everything runs locally using your device's own processing. Your images never leave your browser. Bulk actions use a free SammaPix account (up to 50 images a day, unlimited with Pro), so your limit is the same on the site and in the extension.

Need more? All 52 SammaPix tools live at sammapix.com — upscale, remove background, HEIC, PDF, video and more.

Free. Private. No uploads.

## Single purpose (richiesto in review)
The extension is an image utility: it lets users compress, convert, edit, clean and extract images and archives, and collect the images on the page they are viewing, processing everything locally in the browser.

## Giustificazione permessi (te la chiedono in review — copia le righe)
- host_permissions "<all_urls>": needed to (a) fetch and process the images on whatever page the user chooses, and (b) contact the user's own SammaPix account at sammapix.com to check their daily quota / Pro status for bulk actions. Nothing is accessed until the user opens the panel or triggers an action.
- activeTab + scripting: to read the images of the tab the user is actively working on and to trigger downloads in that page.
- contextMenus: to add the right-click "Save as JPG / PNG / WebP / Compress" options on images.
- sidePanel: the whole tool UI lives in the browser side panel.
- content_security_policy 'wasm-unsafe-eval': required to run the WebAssembly used to extract RAR/7z/ZIP archives locally.

## Data usage (dichiarazione privacy nel form — sii accurato)
- Image processing happens locally in the browser; images are never uploaded.
- For BULK actions only, the extension contacts the user's own SammaPix account (sammapix.com) to read their daily image quota and Pro status (Authentication). This uses the user's existing SammaPix login session.
- No data is sold or shared with third parties. No browsing history or personal content is collected.
- Data categories to declare: "Authentication information" (session with sammapix.com). NOT: web history, personal communications, financial info, health, location.

## Privacy policy URL (richiesto)
https://www.sammapix.com/privacy  (online, 200 OK)

## URL ufficiale / home page
https://www.sammapix.com

## URL assistenza
https://www.sammapix.com/about

## Contenuti per adulti
No

---

## Screenshot (1-5, formato 1280x800 o 640x400)
Generati pronti in `~/Downloads/sammapix-store-shots/` (vedi sotto). Ne bastano 3-5.

## Cosa fa DAVVERO (per la review, onesto)
- Tool immagine nativi client-side: compress, convert, crop, watermark, blur, clean EXIF, batch.
- Archivi client-side (wasm): RAR (node-unrar-js) + 7z/ZIP/TAR (libarchive.js).
- "Da pagina": scansiona le immagini della scheda attiva, azioni in blocco (scarica/comprimi/rinomina) con quota condivisa col sito (50/giorno free, illimitato Pro) via /api/usage/images.
- I 52 tool completi (upscale, remove-bg, HEIC, PDF, video, AI) restano sul sito; l'estensione ci rimanda.

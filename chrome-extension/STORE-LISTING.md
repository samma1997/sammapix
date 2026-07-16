# SammaPix — Chrome Web Store: scheda pronta da copia-incolla (v5)

Pacchetto da caricare: `~/Downloads/sammapix-extension-v5.6.0.zip` (versione 5.6.0)

---

## Nome (già nel manifest) — vedi opzioni ASO in fondo
SammaPix — Image Tools

## Summary / Riepilogo breve (max 132 caratteri) — keyword-rich
Image compressor & converter (JPG, PNG, WebP), RAR/7z/ZIP extractor, and bulk image downloader for any page. Free, no uploads.

## Categoria
Photos (alternativa: Tools)

## Lingua
English (United States)

## Descrizione dettagliata (copia tutto)
SammaPix is a free image toolbox in your browser side panel: an image compressor, converter, cropper and cleaner, an archive extractor (RAR, 7z, ZIP), and a bulk image downloader that grabs every image from any page. Everything runs locally — nothing is uploaded.

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
- host_permissions "https://sammapix.com/*": needed to contact the user's own SammaPix account to check their daily quota / Pro status for bulk actions.
- optional_host_permissions "<all_urls>": requested AT RUNTIME, only when the user runs a bulk "grab from page" action or a right-click save on a cross-origin image, to fetch and process those images. The default install does not hold broad host access.
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

---

## 🔎 ASO — farsi trovare nello store

### Keyword che la gente cerca (coperte da summary + descrizione)
image compressor · compress image · compress jpg · compress png · image converter · convert to webp · png to jpg · webp converter · image downloader · download all images · download images from website · save all images · unrar · rar extractor · extract rar · open 7z · 7z extractor · extract zip · resize image · crop image · remove exif · image tools · photo tools

### Nome (il fattore ASO #1) — 3 opzioni, scegli tu
Il nome pesa tantissimo nella ricerca. "Image Tools" è generico; aggiungere una keyword forte aiuta:
- **A)** `SammaPix — Image Compressor & Tools`  (aggiunge la keyword #1, resta brand-first)
- **B)** `SammaPix — Compress, Convert & Download Images`  (copre 3 keyword, più "search-y")
- **C)** `SammaPix — Image Tools`  (attuale, brand puro, meno scoperta)

Nota: il nome viene dal `manifest.json`. Se cambi, lo aggiorno lì e ricostruisco lo ZIP (va nella prossima versione, non durante la revisione della v5.5).

### Altri segnali ASO (nel tempo)
- Recensioni positive (chiedi ai primi utenti) · numero di installazioni · categoria coerente (Photos).
- Screenshot chiari (già pronti) e promo tile aumentano il CTR nello store.

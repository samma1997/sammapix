# SammaPix for Chrome — Launch Kit

Testi pronti per il lancio (in inglese, target globale). Attiva `EXTENSION_LIVE = true` e metti l'URL vero dello store nei link, poi posta.

---

## 🚀 Product Hunt

**Name:** SammaPix — Image Compressor & Tools

**Tagline (60 char max):**
The image toolbox that lives in your browser side panel

**Description:**
Compress, convert, crop and clean images, extract RAR/7z/ZIP archives, and grab every image from any page — right in your browser side panel. Everything runs locally, nothing is uploaded. The one thing a website can't do: open it on any page and download, compress or rename all its images in bulk.

**Topics:** Chrome Extensions · Design Tools · Productivity · Photography

**Maker's first comment:**
Hey Product Hunt 👋

I'm Luca, a photographer and the maker of SammaPix. I kept bouncing between sketchy "download all images" extensions and heavy desktop apps just to compress a photo or open a .rar. So I put the whole thing where I actually work — the browser side panel.

SammaPix for Chrome does the everyday image jobs, locally (nothing is uploaded):
• Compress & convert (with a live size preview)
• Crop, watermark, blur, clean EXIF/GPS
• Extract RAR, 7z, ZIP — no software to install
• Grab every image on a page and download/compress/rename them in bulk

Free to use, and there's a full 52-tool web app at sammapix.com if you want more (upscale, remove bg, HEIC, PDF, video…).

Would love your feedback — especially on the "grab images from any page" flow. What would you use it for?

---

## 🐦 X / Twitter

**Single post:**
Just launched SammaPix for Chrome 🧩

Compress, convert & clean images, extract RAR/7z/ZIP, and grab every image from any page — all in your browser side panel. Nothing uploaded.

Free → [store link]

**Thread:**
1/ I got tired of sketchy "download all images" extensions and opening a desktop app just to compress one photo.

So I built the image toolbox into the browser side panel. Meet SammaPix for Chrome 🧩

2/ Compress & convert with a live size preview — you see "2.4 MB → 480 KB (−80%)" before you save. WebP, PNG, JPG.

3/ Extract RAR, 7z and ZIP right in the browser. No software, no uploads — it's WebAssembly running locally.

4/ The one thing a website can't do: open the panel on any page and it shows you every image on it. Select → download, compress or rename in bulk.

5/ It's free. Full 52-tool web app at sammapix.com if you want upscale, remove-bg, HEIC, PDF, video.

Add it here → [store link]

---

## 💼 LinkedIn

I just shipped SammaPix for Chrome 🧩

For 2 years SammaPix has been a web app with 50+ image tools. The #1 request I couldn't solve on the web: "let me work on the images that are already on this page."

A website can't see another page's images. An extension can.

So SammaPix now lives in your browser side panel:
→ Compress & convert with a live size preview
→ Extract RAR / 7z / ZIP with no software
→ Grab every image on any page and download, compress or rename them in bulk

Everything runs locally — nothing is uploaded. Free to start.

Grateful for any feedback, and happy to answer how the local-processing / privacy side works.

[store link]

---

## 📱 TikTok — @sammasaysciao (script 20-30s)

**Hook (0-2s, on screen):** "This Chrome extension replaces 3 apps."
(voice) "Stop downloading random tools to compress a photo."

**Beat 1 (2-8s):** show the side panel opening on a random page → "It lives right here, in the side panel."

**Beat 2 (8-15s):** drag a photo into Compress → slider → "2.4 MB to 480 KB, watch it live." Then drop a .rar → "Opens RAR and 7z. No software."

**Beat 3 (15-22s):** open a busy page (shop/gallery) → "Da pagina" → grid of images → "It grabs EVERY image on the page. Download them all in one zip." (this is the wow moment — let it breathe)

**CTA (22-28s):** "Free. Link in bio." (on screen: 🧩 Add to Chrome)

**Caption:** the extension that grabs every image from any page 🧩 #chrome #productivity #photography #tech
**Sounds:** trending upbeat / satisfying-reveal audio (check current trends before posting).

---

## 👽 Reddit (attenzione alle regole self-promo di ogni sub)

**r/chrome_extensions** (di solito ok annunciare il proprio):
Title: I built a free image toolbox that lives in the Chrome side panel (compress, extract RAR/7z, grab all images from a page)
Body: honest, first-person, ask for feedback, mention it's free + local processing, link at the end. NON spammare, rispondi ai commenti.

**r/photography, r/webdev, r/InternetIsBeautiful**: leggi le regole prima. Meglio un post "made this" onesto o un commento pertinente in un thread esistente, non un ad.

---

## ✅ Checklist giorno del lancio
1. `EXTENSION_LIVE = true` in `lib/constants.ts` + metti l'URL vero dello store in: `ExtensionCta.tsx`, `ExtensionAhaPrompt.tsx`, `ChromeLanding.tsx`, `app/chrome/welcome/page.tsx`, `Navbar.tsx` (link /chrome), background.js welcome.
2. Deploy sito (merge develop → main).
3. Product Hunt (posta di martedì-giovedì, 00:01 PST per max esposizione).
4. X + LinkedIn + TikTok in giornata.
5. Rispondi a TUTTI i commenti nelle prime ore (aiuta il ranking ovunque).
6. Chiedi ai primi utenti una recensione sullo store (peso ASO).

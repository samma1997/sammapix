# SammaPix — Launch Playbook
> Documento operativo. Ogni sezione ha il testo pronto da copiare-incollare.
> Spunta ogni voce quando fatto.

---

## STATO ATTUALE
- [x] Vercel Pro attivo
- [x] AdSense configurato (in revisione)
- [x] Google Search Console verificato
- [x] Sitemap inviata (15 pagine)
- [x] AlternativeTo ✅
- [x] SaaSHub ✅ (in approvazione)
- [ ] Hacker News Show HN
- [ ] Reddit r/InternetIsBeautiful
- [ ] Reddit r/SideProject
- [ ] Reddit r/webdev
- [ ] Product Hunt
- [ ] StackShare
- [ ] Toolify.ai
- [ ] AIxploria
- [ ] FutureTools
- [ ] MicroLaunch
- [ ] Peerlist
- [ ] DEV.to articolo
- [ ] GitHub PR awesome-ai-tools

---

## TIMING OTTIMALE

| Piattaforma | Giorno | Ora (IT) | Note |
|---|---|---|---|
| **Hacker News** | Lun–Mar | 15:00–17:00 | Evita weekend |
| **Reddit** | Lun–Gio | 11:00–13:00 | Peak EST = 17:00 IT |
| **Product Hunt** | Martedì | 02:01 IT | Mezzanotte PST = 02:01 IT |
| **Directory AI** | Qualsiasi | — | Submittile tutte insieme |

---

## 1. HACKER NEWS — Show HN
> URL: https://news.ycombinator.com/submit
> Crea account su HN se non ce l'hai. Aspetta che l'account abbia qualche ora di vita prima di postare.

**Titolo (copia esatto):**
```
Show HN: SammaPix – Free in-browser image compressor with AI rename (sammapix.com)
```

**Testo del post:**
```
I built SammaPix after getting frustrated with TinyPNG uploading my images to their servers and not supporting batch processing.

SammaPix does everything client-side using WebAssembly and Canvas API — your files never leave the browser. It also uses Google Gemini to automatically rename files with SEO-optimized names (IMG_4829.jpg → golden-retriever-puppy-grass.webp).

Key features:
- Batch compress up to 20 images at once (JPG, PNG, WebP)
- Convert to WebP in one click
- AI rename + alt text generation (free with login, 5/day)
- Remove EXIF metadata (GPS, camera data)
- Bulk ZIP download
- No uploads, no signup for compression

Tech stack: Next.js 14, browser-image-compression, Canvas API, Google Gemini Flash.

Would love feedback on the UX and performance — especially on mobile.
```

---

## 2. REDDIT — r/InternetIsBeautiful
> URL: https://reddit.com/r/InternetIsBeautiful/submit
> NON menzionare che è il tuo tool — posta come utente che ha trovato qualcosa di utile.

**Titolo:**
```
This free tool compresses and renames your images with AI — all in the browser, nothing uploaded
```

**Testo:**
```
sammapix.com

Drop multiple images, it compresses them in bulk, converts to WebP, and uses AI to rename them with proper SEO filenames (IMG_1234.jpg → sunset-amalfi-coast-italy.webp). Everything happens locally — no uploads.

Works great for cleaning up photo dumps before posting them.
```

---

## 3. REDDIT — r/SideProject
> URL: https://reddit.com/r/SideProject/submit

**Titolo:**
```
I built a free image compressor with AI rename — it processes everything in your browser
```

**Testo:**
```
Hey r/SideProject,

I just launched SammaPix (sammapix.com) — a free browser-based image optimizer.

The main differentiators vs TinyPNG/Squoosh:
✅ Batch processing (up to 20 files at once)
✅ Client-side only — files never leave your device
✅ AI rename: upload IMG_4829.jpg, get back golden-retriever-playing-grass.webp
✅ WebP conversion built-in
✅ EXIF metadata removal

Built with Next.js 14 + Google Gemini Flash for the AI part.

Free forever for core features. Would love feedback from this community!
```

---

## 4. REDDIT — r/webdev
> URL: https://reddit.com/r/webdev/submit
> Angolo tecnico — parla di come è costruito.

**Titolo:**
```
I built a client-side image optimizer — no uploads, uses Canvas API + WebAssembly
```

**Testo:**
```
Built SammaPix (sammapix.com) as an alternative to TinyPNG that doesn't upload files to a server.

Technical approach:
- Compression: browser-image-compression library (WASM under the hood)
- WebP conversion: Canvas API toBlob('image/webp')
- AI rename: Next.js API route → Google Gemini Flash vision model → slugified filename
- EXIF removal: piexifjs client-side
- ZIP: JSZip + file-saver

The fun part was detecting when WebP output is actually larger than the original and falling back to the original format — happens with already-optimized images.

Anyone else building client-side image tools? Happy to share what I learned about browser compression limits.
```

---

## 5. PRODUCT HUNT
> URL: https://producthunt.com/posts/new
> IMPORTANTE: Lancia di martedì alle 02:01 ora italiana (= mezzanotte PST)
> Prepara tutto in anticipo, salva come draft.

**Nome:** SammaPix

**Tagline (max 60 caratteri):**
```
Free batch image optimizer with AI rename — no uploads
```

**Descrizione:**
```
SammaPix compresses, converts, and AI-renames your images — all in the browser.

✦ Batch process up to 20 images at once
✦ Convert to WebP (25% smaller than JPEG)
✦ AI rename: IMG_1234.jpg → product-hero-shot-blue-sneakers.webp
✦ AI alt text generation for SEO
✦ Remove EXIF/GPS metadata
✦ 100% client-side — your files never leave your device
✦ Free forever for core tools

Built as a faster, privacy-first alternative to TinyPNG (no server uploads) and Squoosh (archived in 2023, single-file only).

Pro plan at $7/month for unlimited AI rename, 100 files per batch, and ZIP download.
```

**First comment (da postare subito dopo il launch):**
```
Hey Product Hunt! 👋 Luca here, maker of SammaPix.

I built this because I was tired of TinyPNG uploading my client photos to their servers, and Squoosh (great tool, but archived by Google in 2023) only doing one file at a time.

The AI rename feature is my favorite part — you drop a folder of DSC_0001.jpg files and get back proper SEO filenames with alt text descriptions. Runs on Google Gemini Flash, free for 5/day with a login.

Happy to answer questions about the tech stack (Next.js + Canvas API + WebAssembly) or the AI implementation. Would love your honest feedback!
```

---

## 6. STACKSHARE
> URL: https://stackshare.io/submit

**Nome:** SammaPix
**Website:** https://sammapix.com
**Category:** Image Optimization / Developer Tools
**Description:**
```
Free browser-based image optimizer with batch processing, WebP conversion, and AI-powered filename generation. Compresses JPG, PNG, and WebP client-side using WebAssembly and Canvas API — files never leave the browser.
```

---

## 7. TOOLIFY.AI
> URL: https://www.toolify.ai/submit-ai-tool

**Nome:** SammaPix
**URL:** https://sammapix.com
**Category:** Image Tools
**Description:** (stessa di SaaSHub)

---

## 8. AIXPLORIA
> URL: https://www.aixploria.com/en/submit-ai/

Compila il form con:
- Nome: SammaPix
- URL: https://sammapix.com
- Category: Image Tools
- Description: vedi sotto

---

## 8b. OPENTOOLS
> URL: https://friends.opentools.ai

---

## 8c. AI TOOLS DIRECTORY
> URL: https://aitoolsdirectory.com/submit-tool

---

## 8d. INSIDR.AI
> URL: https://www.insidr.ai/submit-tools/

---

## 8e. TOPAI.TOOLS
> URL: https://topai.tools/submit

---

## 8f. ALTERN.AI
> URL: https://altern.ai/submit
> Appare in homepage 1 settimana + newsletter + backlink dofollow

---

## 8g. BASEDTOOLS.AI
> URL: https://www.basedtools.ai/submit
> Listato entro 24h

---

## 8h. AI SCOUT
> URL: https://aiscout.net/submit-listing/

---

## 8i. SUBMIT YOUR AI TOOL
> URL: https://submityouraitool.com/

---

## 8l. DROP YOUR AI
> URL: https://www.dropyourai.com/submit-tool

---

## 9. FUTURETOOLS
> URL: https://www.futuretools.io/submit-a-tool

**Description:**
```
SammaPix is a free browser-based image optimizer that compresses JPG, PNG, and WebP images in bulk — up to 20 files at once — without uploading anything to a server. Convert to WebP, remove EXIF data, and use Google Gemini AI to generate SEO-optimized filenames and alt text automatically.
```

---

## 10. DEV.TO — Articolo tecnico
> URL: https://dev.to/new
> Un articolo tecnico porta traffico organico per mesi.

**Titolo:**
```
How I built a client-side image compressor with AI rename using Next.js and Google Gemini
```

**Testo (bozza):**
```markdown
# How I built a client-side image compressor with AI rename

I recently launched [SammaPix](https://sammapix.com) — a free image optimizer that runs entirely in the browser. Here's what I learned building it.

## Why client-side?

TinyPNG is great, but it uploads your files to their servers. For anyone working with client photos or confidential images, this is a deal-breaker. I wanted everything to run locally.

## The compression stack

```typescript
import imageCompression from 'browser-image-compression';

const compressed = await imageCompression(file, {
  maxSizeMB: targetSizeMB,
  maxWidthOrHeight: 1920,
  useWebWorker: true,
});
```

`browser-image-compression` uses WebAssembly under the hood and runs in a Web Worker — non-blocking.

## WebP conversion with Canvas API

```typescript
function convertToWebP(file: File): Promise<Blob> {
  return new Promise((resolve) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      canvas.getContext('2d')!.drawImage(img, 0, 0);
      canvas.toBlob((blob) => resolve(blob!), 'image/webp', quality);
      URL.revokeObjectURL(url);
    };
    img.src = url;
  });
}
```

## The AI rename feature

The most interesting part. I send a thumbnail to Google Gemini Flash and ask for an SEO filename:

```typescript
const result = await model.generateContent([
  { inlineData: { data: base64, mimeType: 'image/jpeg' } },
  'Generate a short SEO-optimized filename for this image. Return only the filename in kebab-case, no extension, max 8 words.'
]);
```

Gemini Flash is fast (~800ms) and cheap enough that 5 free renames/day per user works fine.

## The tricky part: WebP isn't always smaller

Sometimes converting to WebP actually makes the file larger (already-optimized JPEGs, for example). I added a guard:

```typescript
if (config.convertToWebP && resultBlob.size >= originalSize) {
  resultBlob = file; // use original
  outputFormat = getMimeOutputFormat(file.type);
}
```

## What I'd do differently

- Start with Zustand for state management earlier
- Use Web Workers from day one for the ZIP generation

Check it out at [sammapix.com](https://sammapix.com). Happy to answer questions!
```

---

## 11. MICROLAUNCHER
> URL: https://microlaunch.net

Crea account e invia il tool — stesso testo di FutureTools.

---

## 11b. UNEED
> URL: https://www.uneed.best/submit-a-tool
> Competizione giornaliera (8-15 prodotti/giorno) — chi vince ottiene listing permanente + backlink dofollow

---

## 11c. FAZIER
> URL: https://fazier.com
> Prima fai upvote/commento su 2 prodotti → poi sblocchi la submission
> Top prodotti finiscono nella newsletter (2.500 iscritti)

---

## 11d. PRODUCTBURST
> URL: https://productburst.com
> Ranking daily + weekly, backlink dofollow per tutti, nessun gatekeeper

---

## 11e. LAUNCHING NEXT
> URL: https://www.launchingnext.com/submit/
> 45K+ startup listate, free

---

## 12. PEERLIST
> URL: https://peerlist.io

Crea profilo sviluppatore → aggiungi SammaPix come progetto → partecipa al Weekly Product Spotlight.

---

## DESCRIZIONE UNIVERSALE
> Usa questo testo per qualsiasi directory che non ha istruzioni specifiche:

```
SammaPix is a free browser-based image optimizer. Compress JPG, PNG, and WebP images in bulk, convert to WebP, remove EXIF metadata, and use AI (Google Gemini) to automatically generate SEO-optimized filenames and alt text. Everything runs locally in your browser — no file uploads, no server. Free for up to 20 files. Pro plan at $7/month for unlimited AI rename and 100 files per batch.
```

---

## PIANO D'AZIONE SETTIMANALE

### Settimana 1 (adesso)
- [ ] Hacker News Show HN (lunedì/martedì, ore 15-17 IT)
- [ ] Reddit r/InternetIsBeautiful (stesso giorno, ore 11-13 IT)
- [ ] StackShare → stackshare.io
- [ ] Toolify.ai → toolify.ai/submit-ai-tool
- [ ] AIxploria → aixploria.com/en/submit-ai
- [ ] FutureTools → futuretools.io/submit-a-tool
- [ ] OpenTools → friends.opentools.ai
- [ ] AI Tools Directory → aitoolsdirectory.com/submit-tool
- [ ] Uneed → uneed.best/submit-a-tool
- [ ] Fazier → fazier.com (prima upvota 2 prodotti)

### Settimana 2
- [ ] Reddit r/SideProject
- [ ] Reddit r/webdev
- [ ] DEV.to articolo tecnico
- [ ] Insidr.ai → insidr.ai/submit-tools
- [ ] MicroLaunch → microlaunch.net
- [ ] Peerlist → peerlist.io

### Settimana 3 (prep Product Hunt)
- [ ] Trova un hunter con follower
- [ ] Prepara assets (logo, screenshots, GIF demo)
- [ ] Contatta 20-30 persone per upvote il giorno del lancio
- [ ] Lancia martedì alle 02:01 IT

---

## 13. GITHUB — Pull Request su Awesome Lists
> Backlink permanenti da GitHub = ottimo per SEO

Fai una PR su ognuna di queste repo:

**1. mahseema/awesome-ai-tools (IMAGE.md)**
→ https://github.com/mahseema/awesome-ai-tools/blob/main/IMAGE.md

**2. ikaijua/Awesome-AITools**
→ https://github.com/ikaijua/Awesome-AITools
> Il README dice esplicitamente "Welcome to submit pull requests"

**3. eudk/awesome-ai-tools**
→ https://github.com/eudk/awesome-ai-tools

**Riga da aggiungere (uguale per tutte):**
```
- [SammaPix](https://sammapix.com) - Free browser-based image compressor with batch processing, WebP conversion, and AI-powered filename renaming via Google Gemini.
```

**Come fare una PR:**
1. Vai sulla repo → click **Fork** in alto a destra
2. Modifica il README.md aggiungendo la riga nella sezione Image Tools
3. Clicca **Propose changes**
4. Titolo PR: `Add SammaPix - browser image compressor with AI rename`
5. Clicca **Create Pull Request**

---

## NOTE IMPORTANTI
- **Reddit r/InternetIsBeautiful**: NON mostrare il signup. Aggiungi `?ref=iib` alla URL e nascondi i bottoni di login per chi arriva da quel referrer.
- **Reddit**: Non postare lo stesso link in più subreddit lo stesso giorno — aspetta 2-3 giorni tra un post e l'altro.
- **HN**: Se il post non prende trazione nelle prime 2 ore, non ri-postare — aspetta settimane.
- **Product Hunt**: Lancia lunedì o venerdì alle 00:01 PST (= 09:01 IT) per meno competizione.
- **Timing HN**: Domenica 6:00 AM UTC = probabilità 2.5x maggiore di arrivare in front page rispetto a mercoledì.
- **AdSense**: In attesa di approvazione. Una volta approvato, gli annunci partono automaticamente.

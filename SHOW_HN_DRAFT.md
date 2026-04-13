# Show HN Draft — SammaPix

---

## HACKER NEWS — "Show HN"

### Title options (pick one — all under 80 chars)

**Option A** (privacy angle, strongest)
```
Show HN: SammaPix – 27 image tools that run 100% in your browser
```
65 chars

**Option B** (specificity + open source signal)
```
Show HN: SammaPix – client-side image toolkit, no uploads ever
```
62 chars

**Option C** (developer-oriented, mentions AI)
```
Show HN: SammaPix – browser-based image tools with local AI processing
```
71 chars

---

### Body

I got tired of uploading images to random websites just to compress or rename them. So I built SammaPix.

It's 27 image tools that run entirely in the browser using the Canvas API, WebAssembly, and File System Access API. No server ever sees your files. Compress, convert HEIC/WebP, batch resize, strip EXIF data, crop, watermark — all processed locally.

The interesting engineering challenge was the AI features. I wanted AI-powered rename, alt text generation, and photo sorting without sending originals to any external service. The solution: generate a small thumbnail client-side, send only that to Google Gemini, keep the original on the user's machine. The thumbnail is small enough to be cheap; the original stays private.

Stack: Next.js 15, TypeScript, Tailwind, Web Workers for heavy processing so the UI doesn't block.

A few things I'd genuinely like feedback on:

- The privacy tradeoff of the AI thumbnail approach — is it good enough, or would you expect zero external calls?
- The tool discovery UX — with 27 tools it's easy to get lost
- Whether the open-source + freemium model makes sense (Pro is $9/month for unlimited AI credits)

Live: https://www.sammapix.com
Source: https://github.com/samma1997/sammapix

Built solo. First public post about it.

---

## REDDIT — r/webdev

### Title
```
I built a free browser-based image toolkit (27 tools, no uploads, open source) — would love feedback
```

### Body

Hey r/webdev,

I've been quietly building SammaPix for a while and finally feel like it's worth sharing.

The premise is simple: all the image tools I kept needing (compress, HEIC convert, WebP convert, EXIF strip, batch resize, crop, watermark, PDF-to-image, etc.) in one place, running entirely client-side. No uploads, no accounts required for the free tools, no watermarks on output.

The part I'm most curious about technically: the AI features (rename, alt text, photo sort/organize) work by generating a client-side thumbnail and sending only that to Google Gemini — the original file never leaves the browser. I think it's a reasonable privacy tradeoff but curious if others see it differently.

Stack: Next.js 15 / TypeScript / Tailwind / Web Workers

27 tools total across compression, AI, creative, and organization categories.

- Live: https://www.sammapix.com
- Source (MIT): https://github.com/samma1997/sammapix

Happy to answer questions about the architecture, the client-side processing approach, or the AI integration. Feedback welcome, especially on UX — with 27 tools the navigation is something I'm still iterating on.

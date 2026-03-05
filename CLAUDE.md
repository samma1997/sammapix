# CLAUDE.md — SammaPix
## Istruzioni per lavoro autonomo notturno

> Lavora in TOTALE AUTONOMIA. Non chiedere mai conferma. Esegui tutto in ordine.
> Se trovi un errore, risolvilo e vai avanti. Non fermarti mai.
> Scrivi in PROGRESS.md cosa hai fatto ad ogni fase completata.

---

## 🎯 VISIONE DEL PROGETTO

**SammaPix** è il miglior tool web gratuito per ottimizzare immagini.
- Autore: Luca "Samma" Sammarco (personal brand integrato)
- Mercato: Internazionale, lingua inglese
- Target: Tutti — semplice per chiunque, nessun tecnicismo
- Modello: Freemium (Free + Pro $7/mese) + AdSense

**NON** è una piattaforma multi-tool generica. È focalizzato sulle immagini e lo fa meglio di tutti.

---

## 🛠️ TOOL DA COSTRUIRE (in ordine di priorità)

### Fase 1 — MVP (build stanotte)
1. **Compress** — compressione JPG, PNG, GIF, WebP lato browser
2. **Convert to WebP** — conversione formato lato browser
3. **AI Rename** — rinomina con Gemini Flash (solo utenti con account)
4. **Bulk** — batch processing fino a N file con download ZIP

### Fase 2 — Soon after launch
5. **Resize** — ridimensiona in px o percentuale
6. **EXIF Remover** — rimuovi metadati GPS e privacy data dalle foto

### Fase 3 — Roadmap futura
7. **Background Remover** — rimuovi sfondo AI
8. **SVG Optimizer** — pulisce SVG da metadati inutili
9. **API pubblica** — per sviluppatori, piano a pagamento

---

## 🎨 DESIGN SYSTEM — STILE NOTION

Il design deve sembrare Notion. Clean, minimal, molto whitespace, sofisticato.

### Principi Notion:
- **Sfondo**: Bianco puro `#FFFFFF` (light) / `#191919` (dark)
- **Font**: Inter — stesso di Notion
- **Colori**: Quasi zero colori vivaci. Solo grigi, neri, bianchi.
- **Accento**: Un solo colore brand — Indigo `#6366f1` usato CON PARSIMONIA
- **Border**: `1px solid #E5E7EB` — sottilissimi
- **Border radius**: `6px` per input/card, `4px` per badge — NON arrotondati esagerati
- **Shadow**: Quasi nessuna. Max `0 1px 3px rgba(0,0,0,0.08)`
- **Spaziatura**: Generosa. Molto respiro tra gli elementi
- **Icone**: Lucide React — stroke width 1.5, non bold

### Palette completa:
```css
/* Neutrali (usati per tutto) */
--gray-50:  #FAFAFA
--gray-100: #F5F5F5
--gray-200: #E5E5E5
--gray-300: #D4D4D4
--gray-400: #A3A3A3
--gray-500: #737373
--gray-600: #525252
--gray-700: #404040
--gray-800: #262626
--gray-900: #171717
--black:    #0A0A0A

/* Brand (usato con parsimonia) */
--brand:    #6366F1   /* solo su CTA primari e hover */

/* Semantici */
--success:  #16A34A
--error:    #DC2626
--warning:  #D97706

/* Superfici */
--surface:       #FFFFFF
--surface-hover: #F5F5F5
--border:        #E5E5E5
--border-focus:  #6366F1
```

### Componenti chiave — look Notion:

**Navbar:**
```
Logo (testo, no icona colorata) | Tool | Pricing | Blog | Sign In | [Get Pro →]
Bordo inferiore: 1px solid #E5E5E5
Background: bianco con backdrop-blur leggero su scroll
```

**DropZone:**
```
Bordo: 1.5px dashed #D4D4D4 (NON colorato)
Background: #FAFAFA
Hover: background #F5F5F5, bordo #A3A3A3
Drag over: bordo #6366F1 (unico momento di colore)
Radius: 8px
Testo: grigio medio, font-size normale, NON urlante
```

**Card risultato:**
```
Background: #FFFFFF
Border: 1px solid #E5E5E5
Radius: 6px
Shadow: none (o 0 1px 2px rgba(0,0,0,0.04))
Hover: background #FAFAFA
```

**Bottoni:**
```
Primary: background #171717, text white, hover #262626
         (bottone nero stile Notion — NON colorato)
Secondary: background white, border #E5E5E5, hover background #F5F5F5
Destructive: background #DC2626
```

**Badge:**
```
Background: #F5F5F5
Text: #525252
Border: 1px solid #E5E5E5
Font-size: 11px, font-weight: 500, uppercase, letter-spacing: 0.05em
Radius: 4px
```

**Slider:**
```
Track: #E5E5E5
Fill: #171717 (nero, stile Notion)
Thumb: circle bianco con border #D4D4D4
```

**Input/Select:**
```
Border: 1px solid #E5E5E5
Focus: border #6366F1 (unico momento brand)
Background: white
Radius: 6px
```

---

## 🔐 AUTENTICAZIONE

- **Compressione, WebP, Resize, EXIF Remover**: completamente anonimi, zero login
- **AI Rename**: richiede account (riduce abusi Gemini API)
- **Piano Pro**: richiede account

**Provider login:** Google + GitHub + Magic Link (email)
**Stack:** NextAuth.js v4

Quando utente anonimo tenta AI Rename:
→ Modal leggero stile Notion: "Sign in to use AI Rename — it's free"
→ Google button + GitHub button
→ Nessun form di registrazione lungo

---

## 🛡️ SICUREZZA — HARDENED

Implementa tutto questo, nessuna scorciatoia:

### Headers di sicurezza (tutti obbligatori)
```
Content-Security-Policy: default-src 'self'; script-src 'self' https://js.stripe.com; ...
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
```

### Cloudflare WAF (da configurare)
- Attiva WAF Free tier su Cloudflare
- Rate limiting: max 100 req/min per IP su tutte le route `/api/*`
- Block countries con alto rischio di abuso se necessario
- Hotlink protection per le immagini statiche

### Protezione API
- Rate limiting per IP su tutti gli endpoint (Cloudflare KV)
- Honeypot field nascosto nei form (cattura bot)
- Verifica `Origin` header su tutte le API route
- Gemini API key SOLO server-side, mai nel bundle JS
- Stripe secret key SOLO server-side
- Audit log di tutte le chiamate AI rename (Cloudflare D1)
- Anomaly detection: alert se stesso IP fa >20 req/min

### Input validation
- Sanifica tutti i filename prima del display (XSS prevention)
- Valida MIME type reale del file (non solo estensione)
- Max file size validato lato server OLTRE che lato client
- Nessun file mai salvato su server — tutto client-side o eliminato subito

### GDPR / Privacy
- Privacy policy chiara: "Le tue immagini non lasciano il browser" (per compress/convert)
- Per AI rename: "Il thumbnail viene inviato a Google Gemini per l'analisi"
- Cookie banner GDPR compliant (solo per AdSense)
- EXIF remover rimuove anche dati GPS — comunicalo come feature di privacy

---

## 💡 GESTIONE ADBLOCK

Rileva AdBlock con questo approccio (non invasivo):

```typescript
// lib/adblock-detector.ts
async function detectAdBlock(): Promise<boolean> {
  try {
    await fetch('https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js', {
      method: 'HEAD',
      mode: 'no-cors'
    });
    return false;
  } catch {
    return true;
  }
}
```

**Risposta se AdBlock rilevato:**
- Mostra banner discreto in fondo alla pagina (NON popup, NON blocker)
- Testo Notion-style: "Looks like you're using an ad blocker. SammaPix is free because of ads. Consider whitelisting us — or go Pro to remove them entirely."
- Due CTA: [Whitelist SammaPix] [Get Pro — $7/mo]
- Il tool continua a funzionare normalmente
- Il banner si chiude con X e non riappare per 7 giorni (localStorage)

**Con AdBlock attivo — monetizzazione alternativa:**
- Mostra link affiliate contestuali al posto degli annunci (Carbon Ads o link manuali)
- Esempio: dopo compressione → "Speed up your whole site with Cloudflare →"

---

## 🏗️ STACK TECNICO DEFINITIVO

| Layer | Tecnologia |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS + shadcn/ui (tema custom Notion) |
| Font | Inter (Google Fonts, self-hosted) |
| Compressione | `browser-image-compression` (client-side) |
| Conversione WebP | Canvas API nativa (client-side) |
| Resize | Canvas API nativa (client-side) |
| EXIF Remover | `piexifjs` (client-side) |
| AI Rename | Google Gemini 1.5 Flash API |
| Auth | NextAuth.js v4 (Google + GitHub + Magic Link) |
| Database | Cloudflare D1 (SQLite) via Drizzle ORM |
| Cache/Rate limit | Cloudflare KV |
| Pagamenti | Stripe |
| Hosting | Cloudflare Pages (edge runtime) |
| Email | Resend (free tier) |
| Monitoring errori | Sentry (free tier) |
| Uptime | UptimeRobot (free) |
| Analytics | Cloudflare Web Analytics (privacy-first, gratis) |

---

## 📁 STRUTTURA URL

```
sammapix.com/                    ← Homepage con tool direttamente
sammapix.com/compress/           ← Compress dedicato
sammapix.com/convert/to-webp/    ← Convert to WebP
sammapix.com/ai-rename/          ← AI Rename (login required)
sammapix.com/resize/             ← Resize immagini
sammapix.com/exif-remover/       ← Rimuovi metadati EXIF
sammapix.com/bulk/               ← Bulk processing
sammapix.com/pricing/            ← Piani Free vs Pro
sammapix.com/blog/               ← Blog SEO
sammapix.com/blog/[slug]/
sammapix.com/api/                ← Docs API (futura)
sammapix.com/vs/tinypng/         ← Comparison pages (SEO)
sammapix.com/vs/squoosh/
sammapix.com/dashboard/          ← Solo utenti loggati
```

---

## 💰 MONETIZZAZIONE

### Piano Free
- Compress: illimitato (client-side, $0 costo)
- Convert WebP: illimitato (client-side, $0 costo)
- Resize: illimitato (client-side, $0 costo)
- EXIF Remover: illimitato (client-side, $0 costo)
- AI Rename: richiede login, 5/giorno
- Batch: max 5 file
- Download ZIP: no
- AdSense visibile (con banner AdBlock se rilevato)

### Piano Pro $7/mese
- Tutto illimitato
- AI Rename: 200/giorno
- Batch: 100 file
- Download ZIP: sì
- Zero pubblicità
- Dashboard con storico 30 giorni
- API access (10k req/mese)
- Supporto prioritario

---

## 🔍 SEO — PRIORITÀ

**Keyword ad alto impatto e bassa difficoltà da attaccare subito:**
1. `ai image renaming tool` — KD 12, ZERO competitor
2. `tinypng alternative` — KD 25, 3.300 ricerche/mese
3. `free webp converter no watermark` — KD 28
4. `compress image without losing quality` — KD 38
5. `exif remover online free` — KD 20, domanda alta (privacy)
6. `remove metadata from image` — KD 22

**Comparison pages (link bait + SEO):**
- `/vs/tinypng/` — attacca il leader di mercato
- `/vs/squoosh/` — attacca Google

**Blog — 3 articoli da pubblicare subito:**
1. "How to rename images for SEO automatically with AI"
2. "TinyPNG vs SammaPix: which free image compressor is better in 2026?"
3. "How to remove EXIF data from photos online (free)"

---

## 📋 ORDINE DI ESECUZIONE STANOTTE

```
STEP 1 — Setup (non skippare)
  - npx create-next-app@14 . --typescript --tailwind --eslint --app
  - Configura Tailwind con design system Notion (colori, font Inter)
  - Setup shadcn/ui con tema custom (neutral palette)
  - Installa dipendenze
  - Configura next.config.ts per Cloudflare Pages
  - Crea tutti i types/ e constants.ts
  - git init + primo commit

STEP 2 — Core tool (client-side, zero API)
  - lib/compress.ts (browser-image-compression)
  - lib/webp-converter.ts (Canvas API)
  - lib/resizer.ts (Canvas API)
  - lib/exif-remover.ts (piexifjs)
  - Zustand store per gestione file queue
  - DropZone component (stile Notion)
  - FileCard component
  - Download singolo + ZIP

STEP 3 — UI completa
  - Homepage con tool above the fold
  - Navbar Notion-style
  - Toolbar impostazioni
  - FileList con stati (loading, done, error)
  - Dark mode
  - Mobile responsive

STEP 4 — Auth + AI Rename
  - NextAuth setup (Google + GitHub)
  - Modal login leggero (stile Notion)
  - API route /api/ai/rename con Gemini Flash
  - Rate limiting via Cloudflare KV
  - Audit log in D1
  - UI AI Rename con crediti badge

STEP 5 — Sicurezza Hardened
  - Security headers in next.config.ts
  - CSP configurata
  - AdBlock detector + banner
  - Input validation completa
  - WAF instructions in DEPLOY.md

STEP 6 — Stripe + Pricing page
  - Pagina /pricing stile Notion (due colonne, pulita)
  - Stripe checkout
  - Webhook handler
  - ProBanner contestuale al raggiungimento limiti

STEP 7 — SEO + Blog
  - Meta tags per ogni pagina
  - Schema.org markup
  - Sitemap.xml
  - robots.txt
  - 3 articoli blog placeholder
  - Pagine /vs/tinypng/ e /vs/squoosh/

STEP 8 — Build & Verifica
  - npm run build (deve passare senza errori)
  - npm run lint (zero errori)
  - Verifica bundle size
  - Aggiorna PROGRESS.md con stato finale
  - Crea DEPLOY.md con istruzioni Cloudflare Pages
```

---

## ✅ DEFINIZIONE DI "FATTO"

- [ ] `npm run build` passa senza errori TypeScript
- [ ] Compress + WebP + Resize + EXIF funzionano end-to-end nel browser
- [ ] Login con Google funziona (NextAuth)
- [ ] AI Rename funziona dopo login (anche con API key placeholder)
- [ ] Stripe checkout funziona in test mode
- [ ] AdBlock detector mostra banner discreto
- [ ] Security headers configurati e verificabili
- [ ] Design Notion-style su tutte le pagine
- [ ] Dark mode funzionante
- [ ] Mobile responsive (min 320px)
- [ ] SEO meta tags su ogni pagina
- [ ] Blog con 3 articoli placeholder
- [ ] DEPLOY.md con istruzioni Cloudflare
- [ ] PROGRESS.md aggiornato con ogni fase completata

---

## ⚙️ DIPENDENZE DA INSTALLARE

```bash
npm install \
  browser-image-compression \
  piexifjs \
  @google/generative-ai \
  next-auth \
  @auth/drizzle-adapter \
  drizzle-orm \
  stripe \
  @stripe/stripe-js \
  zustand \
  immer \
  react-dropzone \
  jszip \
  file-saver \
  slugify \
  lucide-react \
  framer-motion \
  @radix-ui/react-slider \
  @radix-ui/react-toast \
  @radix-ui/react-dialog \
  @radix-ui/react-switch \
  resend \
  zod

npm install -D \
  @cloudflare/next-on-pages \
  wrangler \
  @cloudflare/workers-types \
  drizzle-kit
```

---

## 🔑 VARIABILI D'AMBIENTE (.env.local.example)

```bash
# Gemini AI
GEMINI_API_KEY=AIza...

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=generate-with-openssl-rand-base64-32
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
GITHUB_CLIENT_ID=...
GITHUB_CLIENT_SECRET=...

# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_PRO_PRICE_ID=price_...

# Cloudflare KV (per rate limiting)
KV_REST_API_URL=...
KV_REST_API_TOKEN=...

# Resend (email)
RESEND_API_KEY=re_...

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
```

---

## ⚠️ REGOLE OPERATIVE

1. **Mai fermarti** — errore = risolvilo e vai avanti
2. **Mai chiedere conferma** — decidi tu
3. **Design Notion** — meno colori è meglio, più spazio è meglio
4. **TypeScript strict** — no `any`
5. **Commit dopo ogni step** — messaggio chiaro es. "feat: core compression engine"
6. **PROGRESS.md** — scrivi cosa hai fatto dopo ogni step
7. **Sicurezza** — non saltare mai i security headers o la validazione input

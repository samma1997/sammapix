# SammaPix — Fotografia baseline 25 luglio 2026

> Scopo: registrare i numeri di OGGI per poterli confrontare ai re-check e capire se le modifiche funzionano (regola: misurare prima/dopo con la finestra giusta).
> Come si usa: alle date di re-check, rilancia gli stessi comandi e scrivi i nuovi numeri accanto alla baseline.

---

## 1. BASELINE (numeri di oggi, 25/7/2026)

### Traffico (GSC, ~2-3gg ritardo, ultimi 7gg)
| Metrica | Baseline 25/7 | Re-check | Obiettivo |
|---|---|---|---|
| Click / 7gg | ~1.320 (+28% WoW) | | in salita |
| Impressioni / 7gg | ~86.900 (+13% WoW) | | in salita |
| CTR medio | ~1,5% | | > 1,5% |
| Posizione media | ~8,5 | | < 8 |

### /tools/unrar (tool #1, cluster "estrai rar online")
| Metrica | Baseline 25/7 | Re-check | Obiettivo |
|---|---|---|---|
| Click / settimana | ~276 | | in salita |
| Posizione media cluster rar | ~7 | | < 5 |
| Impressioni / mese | ~13.000 | | — |
| Bounce | 47% | | < 40% |
| Dead click (Clarity) | 29% | | < 20% |

### Conversione / vendite (Stripe)
| Metrica | Baseline 25/7 | Re-check | Obiettivo |
|---|---|---|---|
| Day Pass | 2 in 2 giorni (24-25/7) — era 0 a luglio | | 5-10 / settimana |
| MRR | $54 (6 Pro attivi) | | in salita |
| Fonte Day Pass | unrar + twinhunt | | più tool |

### Funnel (GA4, 90gg) — dove muore il traffico
| Gradino | Baseline 25/7 | Re-check |
|---|---|---|
| Sessioni | 3.681 | |
| tool_used | 2.112 (57%) | |
| download | 638 (30% di chi usa) | |
| upsell_shown | 560 | |
| upsell click | 28 (5%) | |
| begin_checkout | 205 | |
| trial + purchase | 17 + 3 | |

### Frizione (Clarity, dead click %)
crop/16-9 89% (PRE-fix 23/7) · compress-to 75% · unrar 29% · passport 33% · resize 7%

---

## 2. MODIFICHE FATTE (22-25/7) da correlare ai re-check

| Data | Modifica | Cosa muove | Finestra effetto |
|---|---|---|---|
| 22/7 | Momento del valore + Day Pass primario | vendite Day Pass | giorni |
| 22/7 | Tracking download + key events GA4 | visibilità funnel | subito |
| 22/7 | Ads sui cluster grossi | ricavi ads | dipende da AdSense |
| 23/7 | Fix crop dead-click | conversione crop | giorni |
| 24/7 | Pagine RAW arw/nef/dng + boost FAQ unrar | traffico SEO | 2-4 settimane |
| 24/7 | Fix PDF (drag&drop + selezione pagine) | usabilità PDF | giorni |
| 25/7 | Fix unrar messaggi | meno rimbalzi | giorni |
| 25/7 | Fix privacy (Pixel via + copy onesto) | sblocca backlink privacy | abilitante |
| 25/7 | Playbook backlink (esecuzione in corso) | autorità → posizioni | 1-3 mesi |
| 28/7 | Momento del valore sul CROP (Day Pass dopo download singolo, trigger success) | vendite Day Pass dal crop | giorni |
| 1/8 | Upsell color-match: pitch da "batch 500 foto" a "success" (Day Pass) | CTR upsell color-match (era 89 mostrati/1 click in 14gg) | giorni |
| 1/8 | CTR compress-to: title template + meta 4 tagli grossi (velocita'/taglia esatta) | CTR /compress-to/* a pari posizione | 2-3 settimane |

**NB 28/7 — vena cambiata:** unrar -68 click WoW (a posizione INVARIATA pos ~6,7 → volatilità, non danno nostro). CROP è la vena in crescita con posizioni transazionali forti (crop to a4 pos 2,9 CTR 25%; crop 3:4 pos 2,9 CTR 27%) ma monetizzava zero (mono-uso, upsell solo su batch). Fix: momento del valore sul download singolo. **PROMOSSO A MAIN 28/7 (commit 67efc67), in produzione.** Re-check ~4-6 ago: Day Pass con source `upsell:success:/crop/*` in Stripe (stripe-session-source.mjs / stripe-daypass-audit.mjs).

---

## 3. CALENDARIO RE-CHECK + comandi

### ~1 agosto — CONVERSIONE (finestra: giorni)
- `node --env-file=.env.local scripts/funnel.mjs 30`
- `node --env-file=.env.local scripts/ga4-bounce.mjs 14`
- `node --env-file=.env.local scripts/clarity-insights.mjs 3` (dead click crop scesi?)
- Stripe check Day Pass (i 2 sono diventati un ritmo?)
- **Domanda:** conversione e bounce migliorati? Day Pass ≥ 5/settimana?

### ~20-25 agosto — SEO / TRAFFICO (finestra: 3-4 settimane)
- `node --env-file=.env.local scripts/gsc-page-queries.mjs /tools/unrar` (pos < 5?)
- `node --env-file=.env.local scripts/gsc-pages.mjs` (pagine RAW prendono impressioni?)
- `node --env-file=.env.local scripts/gsc-striking.mjs`
- **CTR compress-to (fix 1/8):** su `gsc-striking`, /compress-to/2mb era CTR 0,55% pos 8,8 (+1381 upside). CTR salito A PARI POSIZIONE? Se pos invariata ma CTR su → il title/meta ha morso. Se CTR fermo → serve autorita' (backlink), non copy.
- **Domanda:** unrar sale di posizione? Le pagine RAW catturano traffico? Il cluster compress-to converte piu' click?

### ~fine agosto/settembre — BACKLINK (finestra: 1-3 mesi)
- Google Search Console → Link report (quali backlink indicizzati?)
- **Domanda:** i backlink del playbook hanno mosso l'autorità/posizioni?

---

## 4. Come leggere i risultati (regola anti-illusione)
- Se una metrica sale MA la modifica correlata è troppo fresca per la sua finestra → NON è (ancora) merito della modifica.
- Conversione = la muovono i fix conversione. Traffico = lo muove la SEO. Non confondere.
- Traffico organico (unrar) cresce da solo: separalo sempre dall'effetto delle modifiche.

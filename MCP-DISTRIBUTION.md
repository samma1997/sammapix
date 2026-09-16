# SammaPix MCP — kit di distribuzione (submission-ready)

Obiettivo: rendere il server MCP di SammaPix scopribile dagli agenti. Il collo di
bottiglia non sono altri tool ma la **distribuzione**. Qui trovi tutto pronto:
copy, URL, comandi. Le submission su servizi esterni le fai tu (bastano pochi click).

**Dati canonici (copia-incolla ovunque):**

| Campo | Valore |
|---|---|
| Nome | SammaPix |
| Nome registry | `com.sammapix/sammapix` |
| Endpoint MCP | `https://www.sammapix.com/api/mcp` |
| Transport | Streamable HTTP (remote) |
| Auth | OAuth 2.1 (no API key) oppure Bearer key per REST |
| Discovery | `https://www.sammapix.com/.well-known/mcp.json` |
| Landing | `https://www.sammapix.com/for-ai-agents` |
| Repo | `https://github.com/samma1997/sammapix` (MIT) |
| Categoria | Image / PDF / Media processing |

**Descrizione breve (una riga):**
> Agent-native image & PDF processing: 20+ tools (compress, convert, resize, crop, rotate, watermark, PDF compress/merge/split, image-to-PDF…) plus a pipeline that chains ops in one call. Remote MCP, OAuth, zero-retention.

**Descrizione lunga:**
> SammaPix is a remote MCP server that gives AI agents real image and PDF processing over HTTP. 20+ deterministic tools — compress, convert, resize, crop, rotate, flip, adjust, grayscale, blur, tint, negate, border, round, watermark, read metadata; compress/merge/split/rotate PDFs, images-to-PDF, PDF info — plus a **pipeline** tool that chains multiple image operations in a single call (fewer round-trips, far fewer tokens). Connect over OAuth 2.1 with no API key to paste, or generate a key for the REST API. Every operation is zero-retention: files are processed in memory and discarded. Pay-per-use with prepaid credits, 25 free operations every day, failed ops refunded automatically.

**Tag/keywords:** `image`, `pdf`, `compress`, `convert`, `resize`, `crop`, `watermark`, `pipeline`, `oauth`, `zero-retention`, `remote-mcp`

---

## 1. Registry ufficiale MCP (registry.modelcontextprotocol.io) — priorità 1

È la fonte da cui molte directory pescano. Il file `server.json` è già nel repo.
Namespace `com.sammapix` → serve verifica **DNS** del dominio (che controlli tu).

**Passi (una volta sola):**
1. Installa il publisher: `brew install mcp-publisher` (o scarica il binario dai release di `modelcontextprotocol/registry`).
2. Autentica il dominio via DNS:
   - `mcp-publisher login dns --domain sammapix.com` → ti stampa un record **TXT** da aggiungere.
   - Aggiungi quel TXT su Cloudflare (DNS di sammapix.com), aspetta la propagazione.
3. Pubblica dalla root del repo: `mcp-publisher publish` (legge `server.json`).

> Nota: è una pubblicazione su servizio esterno → fai tu login e publish. Il file
> `server.json` è già pronto e versionato. In alternativa namespace GitHub
> `io.github.samma1997/sammapix` con `mcp-publisher login github` (nessun DNS).

---

## 2. Smithery (smithery.ai) — priorità 1

Directory MCP più usata dagli agenti. Indicizza da GitHub + `.well-known/mcp.json`.
1. Vai su https://smithery.ai/new
2. "Add a remote server" → incolla `https://www.sammapix.com/api/mcp`
3. Collega il repo `samma1997/sammapix`, usa descrizione lunga + tag sopra.

## 3. Glama (glama.ai/mcp/servers) — priorità 2

1. https://glama.ai/mcp/servers → "Submit server"
2. Repo `https://github.com/samma1997/sammapix` (auto-scan) + endpoint remoto sopra.

## 4. mcp.so — priorità 2

1. https://mcp.so/submit
2. Incolla endpoint + repo + descrizione breve + tag.

## 5. PulseMCP (pulsemcp.com) — priorità 3

1. https://www.pulsemcp.com/submit
2. Endpoint remoto + landing `for-ai-agents` come homepage.

## 6. awesome-mcp-servers (PR) — priorità 2

Repo: `github.com/punkpeye/awesome-mcp-servers`. Sezione consigliata: **Art & Culture / Image** o **File Systems / PDF**. Riga da inserire (ordine alfabetico):

```md
- [SammaPix](https://github.com/samma1997/sammapix) 🌐 — Remote MCP for image & PDF processing: compress, convert, resize, crop, watermark, PDF ops, and a pipeline that chains operations in one call. OAuth, zero-retention.
```

Legenda emoji del repo: 🌐 = remote service. (Verifica la legenda corrente prima della PR.)

## 7. mcpservers.org (PR) — priorità 3

Repo dietro il sito. Stessa riga della #6, categoria image/pdf.

---

## Verifica rapida che il server sia "sano" per i crawler

```bash
curl -s https://www.sammapix.com/.well-known/mcp.json | jq .
curl -s https://www.sammapix.com/.well-known/oauth-protected-resource | jq .
curl -s -o /dev/null -w '%{http_code}\n' -X POST https://www.sammapix.com/api/mcp \
  -H 'content-type: application/json' \
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/list"}'   # atteso 401 (auth richiesta)
```

## Ordine consigliato

1 (registry ufficiale) → 2 (Smithery) → 6 (awesome PR) → 3/4/5 → 7.
Le prime due portano il grosso del traffico agent-native.

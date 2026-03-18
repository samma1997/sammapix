# Browser-Based Video Processing: Research Report 2025-2026

> Research condotto il 2026-03-18 per il progetto SammaPix.
> Stack attuale: `@ffmpeg/ffmpeg@0.12.15` + `@ffmpeg/core@0.12.10` (single-thread WASM)

---

## Executive Summary

**FFmpeg.wasm single-thread e' la scelta peggiore nel 2026.** L'ecosistema si e' evoluto drasticamente. La raccomandazione principale e':

1. **Migrare a MediaBunny + WebCodecs API** per tutte le operazioni video (compress, resize, crop, convert)
2. **Usare gifenc con Web Workers** per video-to-GIF
3. **Canvas + HTMLVideoElement** per thumbnail extraction (zero dipendenze)
4. **Approccio ibrido** per transcription: browser-whisper (WebGPU) per free tier, Deepgram API per premium
5. **react-easy-crop** per UI di crop interattivo
6. **Architettura ibrida**: client-side per preview + operazioni leggere, server-side opzionale per heavy processing nel premium tier

---

## 1. FFmpeg.wasm Alternatives & Improvements

### 1.1 MediaBunny (RACCOMANDATO)

**Il sostituto diretto di FFmpeg.wasm nel 2026.**

- **Repo**: https://github.com/Vanilagy/mediabunny
- **NPM**: `mediabunny` (versione corrente stabile)
- **Licenza**: MPL-2.0 (gratuito anche per uso commerciale closed-source)
- **Bundle size**: tree-shakable, includi solo cio' che usi

**Perche' e' superiore a FFmpeg.wasm:**

| Feature | FFmpeg.wasm | MediaBunny |
|---------|-------------|------------|
| Encoding | Software (CPU-only WASM) | Hardware-accelerated (WebCodecs API) |
| Memory | Carica tutto il file in RAM | Streaming, processa in chunks |
| Speed | 1x baseline | 3-10x piu' veloce |
| Bundle | ~25MB core WASM | Tree-shakable, tiny |
| Threading | Richiede SharedArrayBuffer + COOP/COEP headers | Built-in pipeline design |
| Formati | Tutti (FFmpeg completo) | MP4, MOV, WebM, MKV, WAVE, MP3, Ogg, ADTS, FLAC |
| Codec | Tutti | 25+ codec con HW acceleration |

**Capabilities**: transmuxing, transcoding, resizing, rotation, cropping, resampling, trimming.

**Codice esempio base:**
```typescript
import { transcode } from 'mediabunny';

// Compress video con hardware acceleration
const result = await transcode({
  input: inputFile,
  output: { format: 'mp4', codec: 'h264' },
  video: { width: 1280, height: 720, bitrate: 2_000_000 }
});
```

**Note importanti:**
- mp4-muxer (stesso autore, Vanilagy) e' stato **deprecato** in favore di MediaBunny
- Remotion ha migrato da @remotion/media-parser a MediaBunny (settembre-ottobre 2025)
- Diffusion Studio Core v2.0 e' costruito sopra MediaBunny

### 1.2 MP4Box.js

- **NPM**: `mp4box` (v0.6.0+ riscritto in TypeScript come ESM)
- **Uso**: parsing, segmentazione e manipolazione MP4, non encoding/transcoding
- **Utile per**: demuxing rapido, estrazione metadata, fragmented MP4
- **Non sostituisce FFmpeg per encoding**, ma complementa WebCodecs per muxing

### 1.3 WebCodecs API (Maturo nel 2026)

- **Status**: supportato in Chrome, Edge, Safari (VideoDecoder completo; AudioDecoder in Safari Technology Preview)
- **Firefox**: supporto in arrivo (gia' supporta H.265 playback da v133, ma NON WebCodecs decode)
- **H.264**: supportato da tutti i browser con WebCodecs
- **H.265 (HEVC) encoding**: Chrome >= 130 su Windows/macOS/Android
- **Hardware acceleration H.265**: 75% Windows, 99% macOS, 86% Android, 90% iOS

**Browser support reale (dati da 224,360 sessioni, gennaio 2026):**
Verificabile su https://webcodecsfundamentals.org/datasets/codec-support/

### 1.4 Diffusion Studio Core

- **NPM**: `@diffusionstudio/core` (v2.0+, 49KB gzip)
- **Repo**: https://github.com/diffusionstudio/core
- **Uso**: video compositing engine completo (timeline, layer, effetti, transizioni)
- **Costruito su**: MediaBunny + Canvas2D + WebCodecs
- **Ideale se**: vuoi costruire un editor video completo nel browser

### 1.5 @remotion/webcodecs

- **NPM**: `@remotion/webcodecs@4.0.x`
- **Licenza**: gratuito per team <= 3 persone, Company License per team >= 4
- **Note**: sta migrando internamente a MediaBunny

### 1.6 MediaRecorder API

- **Non raccomandato** per re-encoding/compression: qualita' e controllo limitati
- **Utile solo per**: recording da canvas/webcam/screen capture
- **Non offre**: controllo su bitrate preciso, codec params, crop, resize

---

## 2. Video Compression in Browser

### 2.1 Approccio piu' veloce nel 2026

**WebCodecs + MediaBunny = hardware-accelerated encoding.**

Un progetto open-source (VideoCompressors.com) ha dimostrato **10x speedup** rispetto a FFmpeg.wasm usando un "dual-engine" approach:
- **Primario**: WebCodecs API (hardware acceleration via GPU)
- **Fallback**: FFmpeg.wasm (per browser senza WebCodecs)

### 2.2 GPU Encoding nel Browser

Si', WebCodecs **usa effettivamente la GPU** per encoding H.264/H.265 quando disponibile:

```typescript
// Verifica supporto hardware
const support = await VideoEncoder.isConfigSupported({
  codec: 'avc1.42001E', // H.264 Baseline
  width: 1920,
  height: 1080,
  bitrate: 5_000_000,
  hardwareAcceleration: 'prefer-hardware'
});
```

- macOS: quasi 100% HW acceleration per H.264/H.265 (VideoToolbox)
- Windows: dipende da GPU (Intel QSV, NVIDIA NVENC, AMD VCE)
- Android: MediaCodec hardware encoder

### 2.3 Come fanno i competitor

**Veed.io, Kapwing, Clideo**: tutti usano **server-side processing**. Il video viene uploadato sui loro server cloud, processato con FFmpeg nativo (non WASM), e il risultato scaricato.

- Vantaggi: velocita' nativa, nessun limite browser
- Svantaggi: richiede upload/download, privacy concern, costo server
- Requisiti: 25+ Mbps per editing fluido 1080p

**Per SammaPix (freemium, privacy-first)**: l'approccio client-side con WebCodecs e' il differenziatore competitivo.

### 2.4 Preset ottimali se si resta su FFmpeg.wasm

Se necessario come fallback:
- **Codec**: `libx264` (piu' veloce in WASM rispetto a libx265)
- **Preset**: `-preset veryfast` (miglior trade-off speed/size; `ultrafast` produce file 2-3x piu' grandi)
- **CRF**: `28` per compressione aggressiva, `23` per buona qualita'
- **Profilo**: `-profile:v baseline` (piu' veloce, meno features)

---

## 3. Video to GIF

### 3.1 Librerie disponibili

| Libreria | Dimensione | Web Workers | Velocita' | Manutenzione |
|----------|-----------|-------------|-----------|-------------|
| **gifenc** | ~8KB | Si' (manuale) | Molto veloce | Attivo |
| gif.js | ~40KB | Si' (built-in) | Media | Abbandonato (2017) |
| gifshot | ~30KB | Si' | Media | Manutenzione minima |
| gif-encoder-2 | ~15KB | No | Lenta | Node-only |

### 3.2 Approccio raccomandato: WebCodecs + gifenc

**Architettura ottimale:**

```
Video File
  -> WebCodecs VideoDecoder (HW-accelerated frame extraction)
    -> Canvas (resize frame)
      -> gifenc (quantize + encode in Web Worker pool)
        -> GIF output
```

```typescript
import { GIFEncoder, quantize, applyPalette } from 'gifenc';

// In un Web Worker:
function encodeFrame(rgbaPixels: Uint8Array, width: number, height: number) {
  const palette = quantize(rgbaPixels, 256);
  const index = applyPalette(rgbaPixels, palette);

  const encoder = GIFEncoder();
  encoder.writeFrame(index, width, height, { palette });
  encoder.finish();
  return encoder.bytesView();
}
```

**Performance tip**: usa un pool di 4 Web Workers, distribuisci i frame tra i worker, poi riassembla in ordine nel main thread.

### 3.3 Alternativa: MediaBunny GIF output

MediaBunny supporta GIF come formato di output, quindi potresti fare:
```typescript
// Singola chiamata per video -> GIF
import { transcode } from 'mediabunny';
const gif = await transcode({ input: videoFile, output: { format: 'gif' } });
```

---

## 4. Video Thumbnail Extraction

### 4.1 Approccio raccomandato: HTMLVideoElement + Canvas

**Questo e' il metodo migliore. NON serve FFmpeg.**

```typescript
async function extractThumbnail(
  videoFile: File,
  timeInSeconds: number = 1
): Promise<string> {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;

    // Blob URL: nessun problema CORS perche' e' same-origin
    const blobUrl = URL.createObjectURL(videoFile);
    video.src = blobUrl;
    video.crossOrigin = 'anonymous'; // necessario solo per URL remoti
    video.muted = true;

    video.addEventListener('loadedmetadata', () => {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      video.currentTime = timeInSeconds;
    });

    video.addEventListener('seeked', () => {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
      URL.revokeObjectURL(blobUrl);
      resolve(dataUrl);
    });

    video.addEventListener('error', (e) => {
      URL.revokeObjectURL(blobUrl);
      reject(new Error('Video load failed'));
    });
  });
}
```

### 4.2 Perche' canvas.drawImage da blob video potrebbe fallire

Cause comuni:
1. **Video non decodificabile**: il browser non supporta il codec (es. HEVC su Firefox)
2. **Timing**: `drawImage` chiamato prima che il frame sia pronto -> usare l'evento `seeked`
3. **Video con durata 0 o metadata mancanti**: alcuni MP4 malformati
4. **Canvas tainted**: succede SOLO con video caricati da URL cross-origin senza CORS headers. Con Blob URL (`URL.createObjectURL(file)`) questo problema NON esiste perche' il blob e' same-origin.

### 4.3 CORS/Taint issues

- **Blob URL da File input**: nessun problema CORS, mai tainted
- **URL remoto same-origin**: nessun problema
- **URL remoto cross-origin**: serve `crossOrigin="anonymous"` + server deve mandare `Access-Control-Allow-Origin`
- **Workaround**: fetch il video come blob, poi crea blob URL locale

```typescript
// Se hai un URL remoto con CORS issues:
const response = await fetch(remoteUrl);
const blob = await response.blob();
const localUrl = URL.createObjectURL(blob); // ora e' same-origin
```

---

## 5. Video Resize/Crop

### 5.1 Strategia: CSS Preview + WebCodecs Export

**Si', l'approccio corretto e':**
- **Preview**: CSS `transform: scale()` + `object-fit` + `clip-path` per crop/resize istantaneo
- **Export finale**: WebCodecs/MediaBunny per il rendering effettivo

Questo evita qualsiasi processing durante l'editing, rendendo l'UI istantanea.

### 5.2 Librerie React per Crop UI

**react-easy-crop (RACCOMANDATO)**

- **NPM**: `react-easy-crop@5.5.6`
- **Peso**: leggero
- **Supporta VIDEO** (non solo immagini!)
- **Features**: zoom, rotation, aspect ratio lock, touch events
- **Repo**: https://github.com/ValentinH/react-easy-crop

```tsx
import Cropper from 'react-easy-crop';

function VideoCropper({ videoUrl }: { videoUrl: string }) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedArea, setCroppedArea] = useState(null);

  return (
    <Cropper
      video={videoUrl}  // Supporta video direttamente!
      crop={crop}
      zoom={zoom}
      aspect={16 / 9}
      onCropChange={setCrop}
      onZoomChange={setZoom}
      onCropComplete={(_, croppedAreaPixels) => {
        setCroppedArea(croppedAreaPixels);
      }}
    />
  );
}
```

**Alternative:**
- `react-advanced-cropper` - piu' customizzabile, framework-like
- `react-image-crop` - solo immagini, non supporta video

---

## 6. Video Transcription

### 6.1 Confronto soluzioni browser-based

| Soluzione | Velocita' | Accuratezza | Offline | Privacy | Setup |
|-----------|----------|-------------|---------|---------|-------|
| **browser-whisper (WebGPU)** | Veloce (GPU) | 95%+ | Si' | 100% locale | `npm i browser-whisper` |
| @remotion/whisper-web (WASM) | Lenta | 95%+ | Si' | 100% locale | `npm i @remotion/whisper-web` |
| whisper.cpp WASM | Lenta | 95%+ | Si' | 100% locale | Build manuale |
| Web Speech API | Real-time | 80-90% | No | Dati inviati a Google/Apple | Built-in |

### 6.2 browser-whisper (RACCOMANDATO per client-side)

- **NPM**: `browser-whisper`
- **Repo**: https://github.com/tanpreetjolly/browser-whisper
- **Backend**: WebGPU (primario) + WASM (fallback automatico)
- **Architettura**: 2 Web Workers paralleli (model loading + audio decoding), zero-copy PCM transfer
- **Demo**: https://whisper.tanpreet.xyz/demo/

```typescript
import { transcribe } from 'browser-whisper';

const result = await transcribe({
  audio: audioFile, // o video file
  model: 'base',   // tiny, base, small, medium
});
```

### 6.3 Confronto API server-side

| Provider | Prezzo/1000 min | WER (accuracy) | Streaming | Latenza |
|----------|----------------|-----------------|-----------|---------|
| **Deepgram Nova-3** | $4.30 | 5.3-6.8% | Si' (<300ms) | Molto bassa |
| OpenAI Whisper API | $6.00 | ~10.6% | No | Alta |
| Google Chirp 2 | $16.00 | Simile a Whisper | Si' | Media |
| AssemblyAI | $6.50 | ~6% | Si' | Bassa |

**Raccomandazione per SammaPix:**
- **Free tier**: browser-whisper (WebGPU) - zero costo server, privacy totale
- **Premium tier**: Deepgram Nova-3 - migliore accuratezza, streaming, prezzo piu' basso

**Attenzione su Whisper API**: applica un minimo di 1-2 minuti per file. Se dividi l'audio in clip brevi (~8s per speaker turn), i minuti fatturati si moltiplicano 5x.

---

## 7. Performance Optimization per FFmpeg.wasm (se lo mantieni come fallback)

### 7.1 Multi-thread con SharedArrayBuffer

```typescript
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { toBlobURL } from '@ffmpeg/util';

const ffmpeg = new FFmpeg();

// Carica versione multi-thread
await ffmpeg.load({
  coreURL: await toBlobURL(
    '/node_modules/@ffmpeg/core-mt/dist/umd/ffmpeg-core.js',
    'text/javascript'
  ),
  wasmURL: await toBlobURL(
    '/node_modules/@ffmpeg/core-mt/dist/umd/ffmpeg-core.wasm',
    'application/wasm'
  ),
  workerURL: await toBlobURL(
    '/node_modules/@ffmpeg/core-mt/dist/umd/ffmpeg-core.worker.js',
    'text/javascript'
  ),
});
```

**Requisiti obbligatori per multi-thread:**
```
# HTTP Headers (vercel.json o middleware)
Cross-Origin-Opener-Policy: same-origin
Cross-Origin-Embedder-Policy: require-corp
```

**Speedup atteso**: 1.5-3x rispetto a single-thread (SIMD + multi-thread).

### 7.2 Web Worker per non bloccare UI

FFmpeg.wasm gia' spawna web workers internamente nella versione multi-thread. Per la versione single-thread, wrappa in un worker manualmente:

```typescript
// ffmpeg.worker.ts
import { FFmpeg } from '@ffmpeg/ffmpeg';

const ffmpeg = new FFmpeg();
let loaded = false;

self.onmessage = async (e) => {
  if (!loaded) {
    await ffmpeg.load(e.data.config);
    loaded = true;
  }

  ffmpeg.writeFile(e.data.inputName, e.data.inputData);
  await ffmpeg.exec(e.data.args);
  const output = ffmpeg.readFile(e.data.outputName);
  self.postMessage({ output }, [output.buffer]);
};
```

### 7.3 Preset ottimali per velocita' in WASM

```bash
# Compressione veloce
-c:v libx264 -preset veryfast -crf 28 -profile:v baseline -movflags +faststart

# Resize veloce
-vf scale=1280:720 -c:v libx264 -preset ultrafast -crf 23

# GIF (se usi FFmpeg come fallback)
-vf "fps=10,scale=480:-1:flags=lanczos" -loop 0
```

### 7.4 Streaming output

FFmpeg.wasm NON supporta vero streaming output. Il file viene scritto completamente in memory prima di essere disponibile. Workaround:
- Usa `ffmpeg.on('progress', callback)` per mostrare progresso
- Per streaming reale -> passa a WebCodecs/MediaBunny

---

## 8. Architettura Raccomandata per SammaPix

### 8.1 Architettura Ibrida (RACCOMANDATO)

```
+------------------------------------------------------------------+
|                        BROWSER (Client)                           |
|                                                                   |
|  [File Input] -> [Preview Engine]                                 |
|                   - CSS transform per crop/resize preview         |
|                   - HTMLVideoElement per playback                 |
|                   - react-easy-crop per UI interattivo            |
|                                                                   |
|  [Processing Engine]                                              |
|    Primary:  MediaBunny + WebCodecs (HW-accelerated)             |
|    Fallback: FFmpeg.wasm multi-thread (browser senza WebCodecs)   |
|                                                                   |
|  [Tool-specific]                                                  |
|    Compress:    MediaBunny transcode                              |
|    Resize:      MediaBunny resize                                 |
|    Crop:        MediaBunny crop                                   |
|    Thumbnail:   HTMLVideoElement + Canvas (zero deps)             |
|    Video->GIF:  WebCodecs decode + gifenc encode (Worker pool)    |
|    Transcribe:  browser-whisper (WebGPU/WASM)                     |
|                                                                   |
+------------------------------------------------------------------+
           |                                    |
           | (Free tier: tutto client-side)      | (Premium tier: opzionale)
           |                                    |
+------------------------------------------------------------------+
|                     SERVER (Opzionale)                             |
|                                                                   |
|  [Heavy Processing API]                                           |
|    - FFmpeg nativo per file enormi (>500MB)                       |
|    - Batch processing                                             |
|    - Deepgram API per transcription premium                       |
|    - H.265 encoding per browser non supportati                    |
|                                                                   |
|  [Stack]: Cloudflare Workers / Vercel Functions + R2/S3           |
+------------------------------------------------------------------+
```

### 8.2 Strategia di migrazione da FFmpeg.wasm

**Fase 1 (Immediata)**:
- Aggiungere feature detection per WebCodecs
- Implementare thumbnail extraction con Canvas (rimuovere FFmpeg per questo)
- Implementare react-easy-crop per crop UI

**Fase 2 (Breve termine)**:
- Integrare MediaBunny per compress/resize/crop
- Mantenere FFmpeg.wasm come fallback (Firefox, browser vecchi)
- Implementare gifenc + Web Workers per video-to-GIF

**Fase 3 (Medio termine)**:
- Integrare browser-whisper per transcription
- Implementare server-side processing API per premium tier
- Rimuovere FFmpeg.wasm quando WebCodecs ha >95% browser support

### 8.3 Feature Detection

```typescript
// Utility per scegliere il motore giusto
export function getVideoEngine(): 'webcodecs' | 'ffmpeg-mt' | 'ffmpeg-st' {
  // WebCodecs disponibile?
  if (typeof VideoEncoder !== 'undefined' && typeof VideoDecoder !== 'undefined') {
    return 'webcodecs';
  }

  // SharedArrayBuffer disponibile? (multi-thread FFmpeg)
  if (typeof SharedArrayBuffer !== 'undefined') {
    return 'ffmpeg-mt';
  }

  // Fallback single-thread
  return 'ffmpeg-st';
}
```

### 8.4 Modello Freemium

| Feature | Free (Client-only) | Premium (Hybrid) |
|---------|-------------------|-------------------|
| Compress | WebCodecs/MediaBunny (fino a 200MB) | Server-side (file illimitati) |
| Resize | Client-side | Client-side |
| Crop | Client-side | Client-side |
| GIF | Client-side (max 30s) | Server-side (illimitato) |
| Thumbnail | Client-side | Client-side |
| Transcribe | browser-whisper (max 5 min) | Deepgram API (illimitato) |
| Batch | No | Si' (server-side) |
| Watermark | Si' | No |

---

## 9. Package Summary

### Da installare

| Package | Versione | Scopo | Dimensione |
|---------|----------|-------|-----------|
| `mediabunny` | latest | Video compress/resize/crop/convert | Tree-shakable |
| `gifenc` | latest | GIF encoding veloce | ~8KB |
| `react-easy-crop` | ^5.5.6 | Crop UI interattivo (supporta video) | Leggero |
| `browser-whisper` | latest | Transcription client-side (WebGPU) | Medio (+ model download) |

### Da mantenere come fallback

| Package | Versione | Scopo |
|---------|----------|-------|
| `@ffmpeg/ffmpeg` | ^0.12.15 | Fallback per browser senza WebCodecs |
| `@ffmpeg/core-mt` | ^0.12.x | Multi-thread per performance migliore |

### Da rimuovere eventualmente

| Package | Motivo |
|---------|--------|
| `@ffmpeg/core` | Sostituito da `@ffmpeg/core-mt` |

---

## Sources

- [MediaBunny - NPM](https://www.npmjs.com/package/mediabunny)
- [MediaBunny - Documentation](https://mediabunny.dev/guide/introduction)
- [MediaBunny - GitHub](https://github.com/Vanilagy/mediabunny)
- [MediaBunny - Supported Formats & Codecs](https://mediabunny.dev/guide/supported-formats-and-codecs)
- [mp4-muxer - GitHub (deprecated in favor of MediaBunny)](https://github.com/Vanilagy/mp4-muxer)
- [Diffusion Studio Core - GitHub](https://github.com/diffusionstudio/core)
- [WebCodecs API - MDN](https://developer.mozilla.org/en-US/docs/Web/API/WebCodecs_API)
- [WebCodecs Codec Support Dataset (224K sessions)](https://webcodecsfundamentals.org/datasets/codec-support/)
- [Chrome HEVC Hardware Encoding Support](https://github.com/nickelc/chromium-hevc-hardware-decoding)
- [FFmpeg.wasm Multi-threading](https://deepwiki.com/ffmpegwasm/ffmpeg.wasm/4.4-multi-threading)
- [FFmpeg.wasm Performance Docs](https://ffmpegwasm.netlify.app/docs/performance/)
- [gifenc - GitHub](https://github.com/mattdesl/gifenc)
- [react-easy-crop - GitHub](https://github.com/ValentinH/react-easy-crop)
- [browser-whisper - GitHub](https://github.com/tanpreetjolly/browser-whisper)
- [@remotion/whisper-web - NPM](https://www.npmjs.com/package/@remotion/whisper-web)
- [@remotion/webcodecs - Docs](https://www.remotion.dev/docs/webcodecs/)
- [Deepgram Pricing Comparison 2025](https://deepgram.com/learn/speech-to-text-api-pricing-breakdown-2025)
- [Deepgram vs OpenAI vs Google STT](https://deepgram.com/learn/deepgram-vs-openai-vs-google-stt-accuracy-latency-price-compared)
- [Video Compressor Dual-Engine (HN)](https://news.ycombinator.com/item?id=46989283)
- [Tainted Canvas Explained](https://corsfix.com/blog/tainted-canvas)
- [Canvas CORS - MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/How_to/CORS_enabled_image)
- [Best FFmpeg.wasm Alternatives](https://dayverse.id/en/articles/best-ffmpeg-wasm-alternatives-client-side)
- [Whisper vs Deepgram 2025](https://deepgram.com/learn/whisper-vs-deepgram)

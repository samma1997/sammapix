import type { Metadata } from "next";
import Link from "next/link";
import { APP_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Informativa sulla Privacy",
  description:
    "Informativa sulla privacy di SammaPix. La grande maggioranza degli strumenti elabora le immagini interamente nel tuo browser. Scopri quali dati raccogliamo, come li utilizziamo e i tuoi diritti GDPR.",
  alternates: {
    canonical: `${APP_URL}/it/privacy`,
    languages: {
      it: `${APP_URL}/it/privacy`,
      en: `${APP_URL}/privacy`,
      "x-default": `${APP_URL}/privacy`,
    },
  },
  openGraph: {
    title: "Informativa sulla Privacy",
    description:
      "Informativa sulla privacy di SammaPix. La grande maggioranza degli strumenti elabora le immagini interamente nel tuo browser. Scopri quali dati raccogliamo, come li utilizziamo e i tuoi diritti GDPR.",
    type: "website",
    url: `${APP_URL}/it/privacy`,
    locale: "it_IT",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "SammaPix" }],
  },
};

export default function PrivacyItPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">

      {/* Back link */}
      <div className="mb-8">
        <Link
          href="/"
          className="text-sm text-[#A3A3A3] dark:text-[#737373] hover:text-[#525252] dark:hover:text-[#A3A3A3] transition-colors"
        >
          &larr; Torna a SammaPix
        </Link>
      </div>

      {/* Page header */}
      <div className="mb-10 pb-8 border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
        <h1 className="text-2xl font-semibold text-[#171717] dark:text-[#E5E5E5] tracking-tight mb-2">
          Informativa sulla Privacy
        </h1>
        <p className="text-sm text-[#A3A3A3] dark:text-[#737373]">
          Ultimo aggiornamento: 8 luglio 2026
        </p>
      </div>

      {/* Body */}
      <div className="space-y-10 text-sm text-[#525252] dark:text-[#A3A3A3] leading-relaxed">

        {/* 1. Panoramica e titolare del trattamento */}
        <section>
          <h2 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            1. Panoramica e Titolare del Trattamento
          </h2>
          <p>
            SammaPix (&ldquo;noi&rdquo;, &ldquo;ci&rdquo; o &ldquo;il Servizio&rdquo;) è una piattaforma browser-based per l&apos;ottimizzazione delle immagini, gestita da Luca Sammarco, un privato residente in Italia. La presente Informativa sulla Privacy spiega quali dati personali raccogliamo su di te, perché e su quale base giuridica li trattiamo, con chi li condividiamo e quali diritti hai nei loro confronti.
          </p>
          <p className="mt-3">
            Siamo impegnati a trattare i dati personali in modo lecito, corretto e trasparente, in conformità con il Regolamento Generale sulla Protezione dei Dati (UE) 2016/679 (&ldquo;GDPR&rdquo;), il Codice in materia di protezione dei dati personali (D.Lgs. n. 196/2003 come modificato dal D.Lgs. n. 101/2018) e le altre normative applicabili in materia di protezione dei dati.
          </p>
          <p className="mt-3">
            Il titolare del trattamento di tutti i dati personali trattati in connessione con il Servizio è:
          </p>
          <div className="mt-3 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md p-4 space-y-1">
            <p><strong className="text-[#404040] dark:text-[#D4D4D4]">Luca Sammarco</strong></p>
            <p>Italia</p>
            <p>
              Email:{" "}
              <a href="mailto:luca@sammapix.com" className="text-[#6366F1] hover:underline">
                luca@sammapix.com
              </a>
            </p>
            <p>
              Sito web:{" "}
              <a
                href="https://sammapix.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#6366F1] hover:underline"
              >
                sammapix.com
              </a>
            </p>
          </div>
        </section>

        {/* 2. Le tue immagini */}
        <section>
          <h2 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            2. Elaborazione di Immagini e File: cosa lascia il tuo dispositivo e cosa no
          </h2>

          <p className="font-medium text-[#404040] dark:text-[#D4D4D4]">
            Per la grande maggioranza degli strumenti, le tue immagini non lasciano mai il tuo dispositivo.
          </p>
          <p className="mt-2">
            I seguenti strumenti elaborano tutti i dati delle immagini interamente nel tuo browser web, utilizzando la CPU locale e le API del browser. Nessun dato relativo alle immagini viene trasmesso ai server di SammaPix o a terze parti in nessun momento del processo:
          </p>
          <ul className="mt-2 pl-5 list-disc space-y-1 columns-2">
            <li>Comprimi (JPG, PNG, WebP, GIF, AVIF)</li>
            <li>Converti in WebP</li>
            <li>Convertitore HEIC</li>
            <li>Ridimensionamento Batch</li>
            <li>Ritaglia e Proporzioni</li>
            <li>Filigrana</li>
            <li>Filtri Fotografici</li>
            <li>Visualizzatore EXIF</li>
            <li>Trova Duplicati</li>
            <li>Selezione Foto</li>
            <li>PDF in Immagine</li>
            <li>Rinomina in Batch</li>
            <li>Ottimizza per Web</li>
            <li>Pronto per il Blog</li>
          </ul>

          <p className="mt-4 font-medium text-[#404040] dark:text-[#D4D4D4]">
            Strumenti AI: trasmissione limitata e temporanea a Google Gemini
          </p>
          <p className="mt-2">
            I seguenti strumenti richiedono un account registrato e inviano dati all&apos;API Google Gemini 2.5 Flash per l&apos;analisi AI. In ogni caso viene trasmessa solo un&apos;anteprima a risoluzione ridotta (massimo 512 pixel sul lato più lungo), non il file originale completo:
          </p>
          <ul className="mt-2 pl-5 list-disc space-y-1">
            <li>
              <strong className="text-[#404040] dark:text-[#D4D4D4]">AI Rinomina</strong> — genera un nome file descrittivo e ottimizzato per la SEO a partire dal contenuto visivo dell&apos;anteprima.
            </li>
            <li>
              <strong className="text-[#404040] dark:text-[#D4D4D4]">AI Alt Text</strong> — genera una descrizione di accessibilità a partire dal contenuto visivo dell&apos;anteprima.
            </li>
            <li>
              <strong className="text-[#404040] dark:text-[#D4D4D4]">AI Ordina Foto / AI Organizza</strong> — categorizza le immagini per contenuto visivo per l&apos;organizzazione in batch.
            </li>
            <li>
              <strong className="text-[#404040] dark:text-[#D4D4D4]">Trascrivi</strong> — invia il file audio (non un&apos;anteprima) a Google Gemini per la conversione da parlato a testo.
            </li>
          </ul>
          <p className="mt-3">
            SammaPix non conserva alcuna copia dell&apos;anteprima o del file audio dopo il completamento della chiamata API a Google Gemini. L&apos;anteprima o il file audio esiste in modo transitorio nella memoria del server esclusivamente per effettuare la richiesta API e non viene registrato, memorizzato nella cache o archiviato.
          </p>
          <p className="mt-3">
            Il trattamento dei dati inviati all&apos;API Gemini da parte di Google è disciplinato dalla propria informativa sulla privacy e dai{" "}
            <a
              href="https://ai.google.dev/gemini-api/terms"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#6366F1] hover:underline"
            >
              Termini aggiuntivi del Servizio API Gemini
            </a>
            . Non siamo responsabili delle pratiche di trattamento dei dati di Google. Ti invitiamo a consultare la documentazione di Google prima di utilizzare gli strumenti AI se hai dubbi sui dati che stai inviando.
          </p>
          <p className="mt-3">
            La base giuridica per la trasmissione dei dati di anteprima a Google Gemini è l&apos;esecuzione del contratto con te (art. 6, par. 1, lett. b) GDPR), ovvero la fornitura delle funzionalità degli strumenti AI da te richieste.
          </p>
        </section>

        {/* 3. Integrazioni cloud opzionali */}
        <section>
          <h2 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            3. Integrazioni Opzionali con Archivi Cloud
          </h2>
          <p>
            SammaPix offre integrazioni opzionali con Google Drive e Dropbox per consentirti di importare file direttamente dal tuo archivio cloud nel browser per elaborarli.
          </p>
          <ul className="mt-3 pl-5 list-disc space-y-2">
            <li>
              <strong className="text-[#404040] dark:text-[#D4D4D4]">Google Drive</strong> — I file vengono acceduti tramite l&apos;API Google Picker utilizzando lo scope OAuth{" "}
              <code className="text-xs bg-[#F5F5F5] dark:bg-[#262626] text-[#525252] dark:text-[#A3A3A3] px-1.5 py-0.5 rounded">drive.readonly</code>.{" "}
              SammaPix legge solo i file che selezioni esplicitamente. Non navighiamo nell&apos;intero Drive, non archiviamo i tuoi file e non conserviamo il tuo token di accesso Google oltre la sessione del browser attiva.
            </li>
            <li>
              <strong className="text-[#404040] dark:text-[#D4D4D4]">Dropbox</strong> — I file vengono acceduti tramite il widget Dropbox Chooser. Solo i file che selezioni esplicitamente vengono caricati nel browser. SammaPix non memorizza le credenziali Dropbox né conserva i tuoi file.
            </li>
          </ul>
          <p className="mt-3">
            Una volta importati, i file vengono elaborati localmente nel browser esattamente come i file caricati direttamente. Non vengono trasmessi dati aggiuntivi come risultato dell&apos;utilizzo di queste integrazioni (ad eccezione degli strumenti AI, per i quali si applica la politica di sola anteprima descritta nella Sezione 2).
          </p>
        </section>

        {/* 4. Dati dell'account */}
        <section>
          <h2 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            4. Dati dell&apos;Account
          </h2>
          <p>
            Un account registrato è necessario per utilizzare gli strumenti AI e accedere alle funzionalità del piano Pro. Quando crei un account, raccogliamo e conserviamo i seguenti dati personali:
          </p>
          <ul className="mt-2 pl-5 list-disc space-y-1">
            <li>Il tuo indirizzo email</li>
            <li>Il tuo nome visualizzato e l&apos;URL dell&apos;immagine del profilo (forniti dal tuo provider OAuth: Google o GitHub)</li>
            <li>Il metodo di autenticazione utilizzato (Google OAuth, GitHub OAuth o magic link via email)</li>
            <li>Data e ora di creazione dell&apos;account e dell&apos;ultimo accesso</li>
            <li>Contatori giornalieri delle operazioni AI (utilizzati per applicare i limiti di utilizzo del piano)</li>
            <li>Stato del piano (Free o Pro), data di inizio dell&apos;abbonamento e ID cliente Stripe (se sottoscrivi il piano Pro)</li>
          </ul>
          <p className="mt-3">
            <strong className="text-[#404040] dark:text-[#D4D4D4]">Base giuridica:</strong> Esecuzione di un contratto (art. 6, par. 1, lett. b) GDPR), ovvero la fornitura del Servizio e l&apos;applicazione dei limiti di piano previsti dai presenti Termini di Servizio.
          </p>
          <p className="mt-3">
            Non vendiamo i tuoi dati personali a terze parti. Non utilizziamo il tuo indirizzo email per comunicazioni di marketing senza il tuo previo consenso esplicito o un&apos;altra base giuridica applicabile.
          </p>
        </section>

        {/* 5. Autenticazione */}
        <section>
          <h2 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            5. Autenticazione e Gestione delle Sessioni
          </h2>
          <p>
            L&apos;autenticazione è gestita da NextAuth.js. Puoi accedere tramite Google OAuth, GitHub OAuth o email (magic link). Quando accedi tramite Google o GitHub, richiediamo solo gli scope OAuth minimi necessari per la verifica dell&apos;identità: il tuo indirizzo email e le informazioni pubbliche del profilo. Non richiediamo l&apos;accesso al tuo Google Drive, Gmail, ai repository GitHub o ad altri servizi oltre a quanto necessario per autenticare la tua identità.
          </p>
          <p className="mt-3">
            I token di sessione vengono archiviati come cookie sicuri, HTTP-only e same-site, con scadenza dopo 30 giorni di inattività o immediatamente alla disconnessione. Questi cookie sono strettamente necessari per l&apos;accesso autenticato al Servizio e vengono impostati sulla base giuridica dell&apos;esecuzione del contratto (art. 6, par. 1, lett. b) GDPR).
          </p>
          <p className="mt-3">
            I cookie di sessione specifici impostati da NextAuth sono:
          </p>
          <ul className="mt-2 pl-5 list-disc space-y-1">
            <li>
              <code className="text-xs bg-[#F5F5F5] dark:bg-[#262626] px-1.5 py-0.5 rounded">next-auth.session-token</code> — memorizza la sessione autenticata. Necessario per il funzionamento del login. Scade dopo 30 giorni di inattività o alla disconnessione.
            </li>
            <li>
              <code className="text-xs bg-[#F5F5F5] dark:bg-[#262626] px-1.5 py-0.5 rounded">next-auth.csrf-token</code> — token di protezione contro gli attacchi cross-site request forgery. Scadenza di sessione.
            </li>
            <li>
              <code className="text-xs bg-[#F5F5F5] dark:bg-[#262626] px-1.5 py-0.5 rounded">next-auth.callback-url</code> — memorizza l&apos;URL di reindirizzamento durante il flusso OAuth. Scadenza di sessione.
            </li>
          </ul>
        </section>

        {/* 6. Pagamenti */}
        <section>
          <h2 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            6. Elaborazione dei Pagamenti
          </h2>
          <p>
            L&apos;elaborazione dei pagamenti per gli abbonamenti al piano Pro è gestita interamente da Stripe, Inc. Quando sottoscrivi il piano Pro, fornisci i tuoi dati di pagamento direttamente a Stripe tramite la loro interfaccia di pagamento ospitata. SammaPix non riceve, elabora o archivia il numero completo della tua carta, il CVV, i dati del conto bancario o altre credenziali di pagamento non elaborate. Gli unici dati relativi ai pagamenti che conserviamo sono il tuo ID cliente Stripe e lo stato del tuo abbonamento (attivo, cancellato, in periodo di prova, ecc.), necessari per determinare i tuoi diritti relativi al piano.
          </p>
          <p className="mt-3">
            Stripe elabora i tuoi dati di pagamento come responsabile del trattamento indipendente, soggetto alla conformità PCI DSS. Il trattamento delle tue informazioni di pagamento da parte di Stripe è disciplinato dalla{" "}
            <a
              href="https://stripe.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#6366F1] hover:underline"
            >
              Privacy Policy di Stripe
            </a>
            .
          </p>
          <p className="mt-3">
            <strong className="text-[#404040] dark:text-[#D4D4D4]">Base giuridica:</strong> Esecuzione di un contratto (art. 6, par. 1, lett. b) GDPR) per il trattamento relativo alla gestione degli abbonamenti; adempimento di un obbligo legale (art. 6, par. 1, lett. c) GDPR) per la conservazione dei registri di pagamento richiesti dalla normativa fiscale italiana e dell&apos;UE.
          </p>
        </section>

        {/* 7. Analytics */}
        <section>
          <h2 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            7. Analisi dei Dati (Analytics)
          </h2>

          <p className="font-medium text-[#404040] dark:text-[#D4D4D4]">Vercel Analytics (sempre attivo, senza cookie)</p>
          <p className="mt-2">
            Utilizziamo Vercel Analytics per raccogliere dati aggregati e anonimi sulle visualizzazioni di pagina e le metriche di performance web (come i tempi di caricamento delle pagine). Vercel Analytics non utilizza cookie e non ricorre a fingerprinting o ad altre tecniche per identificare singoli utenti. Non vengono trasmesse informazioni personalmente identificabili. Questo servizio è attivo per tutti gli utenti senza richiedere il consenso ai cookie e opera sulla base del nostro legittimo interesse a mantenere e migliorare il Servizio (art. 6, par. 1, lett. f) GDPR).
          </p>

          <p className="mt-4 font-medium text-[#404040] dark:text-[#D4D4D4]">Google Analytics 4 (GA4) — subordinato al consenso ai cookie</p>
          <p className="mt-2">
            Utilizziamo Google Analytics 4 per comprendere come gli utenti interagiscono con il Servizio. GA4 può raccogliere il tuo indirizzo IP (parzialmente anonimizzato da Google), il tipo di browser, il tipo di dispositivo, la regione geografica, le pagine visitate e gli eventi come l&apos;utilizzo degli strumenti. GA4 imposta cookie persistenti per distinguere gli utenti tra sessioni diverse. GA4 viene attivato solo dopo che hai concesso il consenso ai cookie tramite il nostro banner.
          </p>
          <p className="mt-3">
            <strong className="text-[#404040] dark:text-[#D4D4D4]">Base giuridica:</strong> Il tuo consenso (art. 6, par. 1, lett. a) GDPR), che puoi revocare in qualsiasi momento aggiornando le tue preferenze sui cookie.
          </p>

          <p className="mt-4 font-medium text-[#404040] dark:text-[#D4D4D4]">Meta Pixel (Facebook Pixel) — subordinato al consenso ai cookie</p>
          <p className="mt-2">
            Utilizziamo il Meta Pixel per misurare l&apos;efficacia delle nostre campagne pubblicitarie sulle piattaforme Meta (Facebook e Instagram). Il Pixel può raccogliere il tuo indirizzo IP, informazioni sul browser, l&apos;URL delle pagine che visiti e le azioni che compi sul Servizio (come la registrazione o l&apos;avvio di una prova gratuita). Il Pixel imposta cookie persistenti nel tuo browser. Il Meta Pixel viene attivato solo dopo che hai concesso il consenso ai cookie.
          </p>
          <p className="mt-3">
            <strong className="text-[#404040] dark:text-[#D4D4D4]">Base giuridica:</strong> Il tuo consenso (art. 6, par. 1, lett. a) GDPR), che puoi revocare in qualsiasi momento. Puoi anche gestire l&apos;utilizzo dei tuoi dati da parte di Meta tramite i{" "}
            <a
              href="https://www.facebook.com/privacy/policies/cookies"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#6366F1] hover:underline"
            >
              controlli sui cookie di Meta
            </a>
            .
          </p>

          <p className="mt-4 font-medium text-[#404040] dark:text-[#D4D4D4]">Meta Conversions API (lato server)</p>
          <p className="mt-2">
            In aggiunta al Meta Pixel lato client, utilizziamo anche la Conversions API di Meta per inviare determinati eventi di conversione (come la registrazione dell&apos;account e l&apos;acquisto dell&apos;abbonamento) direttamente dal nostro server a Meta per finalità di attribuzione pubblicitaria. Questa integrazione lato server trasmette:
          </p>
          <ul className="mt-2 pl-5 list-disc space-y-1">
            <li>Il tuo indirizzo email in formato hash (SHA-256)</li>
            <li>Il tuo indirizzo IP (in formato hash prima della trasmissione)</li>
            <li>Il tipo di evento (es. &ldquo;CompleteRegistration&rdquo;, &ldquo;Subscribe&rdquo;)</li>
            <li>Un timestamp e un ID evento per la deduplicazione con il Pixel lato browser</li>
          </ul>
          <p className="mt-3">
            La Conversions API viene attivata solo quando hai concesso il consenso ai cookie. Il tuo indirizzo email e il tuo IP vengono convertiti in hash prima della trasmissione e Meta riceve solo i valori in hash, non gli originali. Nonostante l&apos;hashing, questo costituisce trattamento di dati personali ed è soggetto al tuo consenso.
          </p>
          <p className="mt-3">
            <strong className="text-[#404040] dark:text-[#D4D4D4]">Base giuridica:</strong> Il tuo consenso (art. 6, par. 1, lett. a) GDPR).
          </p>

          <p className="mt-4 font-medium text-[#404040] dark:text-[#D4D4D4]">Google Ads — subordinato al consenso ai cookie</p>
          <p className="mt-2">
            Utilizziamo il monitoraggio delle conversioni di Google Ads (tramite il Google tag / gtag.js) per misurare l&apos;efficacia delle nostre campagne pubblicitarie su Google. Google Ads può raccogliere il tuo indirizzo IP e impostare cookie per attribuire le conversioni (come gli abbonamenti al piano Pro) ai clic sugli annunci. Il tracciamento di Google Ads viene attivato solo dopo che hai concesso il consenso ai cookie.
          </p>
          <p className="mt-3">
            <strong className="text-[#404040] dark:text-[#D4D4D4]">Base giuridica:</strong> Il tuo consenso (art. 6, par. 1, lett. a) GDPR).
          </p>
        </section>

        {/* 8. Pubblicità */}
        <section>
          <h2 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            8. Pubblicità (Piano Free)
          </h2>
          <p>
            Gli utenti del piano Free possono visualizzare annunci pubblicitari erogati da Google AdSense. Google AdSense utilizza cookie e tecnologie di tracciamento simili per mostrare annunci che possono essere personalizzati in base alla cronologia di navigazione, agli interessi e ai dati demografici inferiti. AdSense viene attivato solo dopo che hai concesso il consenso ai cookie tramite il nostro banner.
          </p>
          <p className="mt-3">
            Puoi gestire le tue preferenze di personalizzazione degli annunci in qualsiasi momento tramite{" "}
            <a
              href="https://adssettings.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#6366F1] hover:underline"
            >
              Impostazioni Annunci Google
            </a>
            {" "}o rinunciare alla pubblicità personalizzata tramite il{" "}
            <a
              href="https://optout.aboutads.info"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#6366F1] hover:underline"
            >
              modulo di opt-out della Digital Advertising Alliance
            </a>
            .
          </p>
          <p className="mt-3">
            Gli utenti del piano Pro non visualizzano annunci AdSense.
          </p>
          <p className="mt-3">
            <strong className="text-[#404040] dark:text-[#D4D4D4]">Base giuridica:</strong> Il tuo consenso (art. 6, par. 1, lett. a) GDPR).
          </p>
        </section>

        {/* 9. Comunicazioni email */}
        <section>
          <h2 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            9. Comunicazioni via Email
          </h2>
          <p>
            La consegna delle email è gestita da Resend, Inc., un fornitore di servizi email transazionali. Utilizziamo Resend per inviare due categorie di email:
          </p>

          <p className="mt-3 font-medium text-[#404040] dark:text-[#D4D4D4]">Email transazionali</p>
          <p className="mt-1">
            Queste email sono necessarie per il funzionamento del Servizio e del tuo account. Includono: email di verifica dell&apos;account e magic link per l&apos;accesso, notifiche di modifica della password, conferme di abbonamento e ricevute di pagamento, conferme di cancellazione dell&apos;abbonamento e comunicazioni rilevanti riguardanti modifiche ai presenti Termini o alla nostra Informativa sulla Privacy. Queste email vengono inviate sulla base giuridica dell&apos;esecuzione del contratto (art. 6, par. 1, lett. b) GDPR) e non è possibile disiscriversi da esse finché si dispone di un account attivo.
          </p>

          <p className="mt-3 font-medium text-[#404040] dark:text-[#D4D4D4]">Email di marketing</p>
          <p className="mt-1">
            Se hai acconsentito alle comunicazioni di marketing, o laddove consentito dalla normativa applicabile (ad esempio la disposizione di soft opt-in per i clienti esistenti prevista dal Codice Privacy italiano e dalla Direttiva ePrivacy), potremmo inviarti aggiornamenti sui prodotti, annunci di nuove funzionalità, suggerimenti e offerte promozionali. Queste email vengono inviate sulla base giuridica del tuo consenso o del legittimo interesse (art. 6, par. 1, lett. a) o f) GDPR). Puoi disiscriverti dalle email di marketing in qualsiasi momento cliccando sul link di disiscrizione in qualsiasi email di marketing o contattandoci all&apos;indirizzo{" "}
            <a href="mailto:luca@sammapix.com" className="text-[#6366F1] hover:underline">
              luca@sammapix.com
            </a>
            . La disiscrizione dalle email di marketing non influisce sulla ricezione delle email transazionali.
          </p>
          <p className="mt-3">
            Resend tratta il tuo indirizzo email e i dati di consegna delle email come responsabile del trattamento per nostro conto. Le pratiche sulla privacy di Resend sono descritte nella{" "}
            <a
              href="https://resend.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#6366F1] hover:underline"
            >
              Privacy Policy di Resend
            </a>
            .
          </p>
        </section>

        {/* 10. Cookie */}
        <section>
          <h2 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            10. Cookie Policy
          </h2>
          <p>
            Utilizziamo un banner per il consenso ai cookie per darti il controllo sui cookie non essenziali. Le categorie seguenti spiegano quali cookie impostiamo e su quale base.
          </p>

          <div className="mt-4 space-y-4">

            <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md p-4">
              <p className="font-medium text-[#404040] dark:text-[#D4D4D4] mb-2">Strettamente Necessari — Nessun consenso richiesto</p>
              <p className="mb-2 text-xs text-[#737373] dark:text-[#525252]">Questi cookie sono essenziali per il funzionamento del Servizio e non possono essere disattivati. Vengono impostati sulla base dell&apos;esecuzione del contratto.</p>
              <div className="overflow-x-auto">
                <table className="w-full text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
                      <th className="text-left py-1.5 pr-3 font-medium text-[#404040] dark:text-[#D4D4D4]">Nome cookie</th>
                      <th className="text-left py-1.5 pr-3 font-medium text-[#404040] dark:text-[#D4D4D4]">Finalità</th>
                      <th className="text-left py-1.5 font-medium text-[#404040] dark:text-[#D4D4D4]">Scadenza</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E5E5E5] dark:divide-[#2A2A2A]">
                    <tr>
                      <td className="py-1.5 pr-3"><code className="bg-[#F5F5F5] dark:bg-[#262626] px-1 rounded">next-auth.session-token</code></td>
                      <td className="py-1.5 pr-3">Gestione della sessione autenticata</td>
                      <td className="py-1.5">30 giorni / alla disconnessione</td>
                    </tr>
                    <tr>
                      <td className="py-1.5 pr-3"><code className="bg-[#F5F5F5] dark:bg-[#262626] px-1 rounded">next-auth.csrf-token</code></td>
                      <td className="py-1.5 pr-3">Protezione da attacchi CSRF</td>
                      <td className="py-1.5">Sessione</td>
                    </tr>
                    <tr>
                      <td className="py-1.5 pr-3"><code className="bg-[#F5F5F5] dark:bg-[#262626] px-1 rounded">next-auth.callback-url</code></td>
                      <td className="py-1.5 pr-3">Flusso di reindirizzamento OAuth</td>
                      <td className="py-1.5">Sessione</td>
                    </tr>
                    <tr>
                      <td className="py-1.5 pr-3"><code className="bg-[#F5F5F5] dark:bg-[#262626] px-1 rounded">cookie-consent</code></td>
                      <td className="py-1.5 pr-3">Memorizza la tua preferenza di consenso ai cookie</td>
                      <td className="py-1.5">1 anno</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md p-4">
              <p className="font-medium text-[#404040] dark:text-[#D4D4D4] mb-2">Preferenze — Nessun consenso richiesto</p>
              <p className="mb-2 text-xs text-[#737373] dark:text-[#525252]">Questi memorizzano le tue preferenze di visualizzazione localmente e non contengono dati personali.</p>
              <div className="overflow-x-auto">
                <table className="w-full text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
                      <th className="text-left py-1.5 pr-3 font-medium text-[#404040] dark:text-[#D4D4D4]">Chiave (localStorage)</th>
                      <th className="text-left py-1.5 pr-3 font-medium text-[#404040] dark:text-[#D4D4D4]">Finalità</th>
                      <th className="text-left py-1.5 font-medium text-[#404040] dark:text-[#D4D4D4]">Scadenza</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="py-1.5 pr-3"><code className="bg-[#F5F5F5] dark:bg-[#262626] px-1 rounded">theme</code></td>
                      <td className="py-1.5 pr-3">Preferenza modalità chiara / scura</td>
                      <td className="py-1.5">Persistente (localStorage)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md p-4">
              <p className="font-medium text-[#404040] dark:text-[#D4D4D4] mb-2">Analytics e Pubblicità — Consenso richiesto</p>
              <p className="mb-2 text-xs text-[#737373] dark:text-[#525252]">Questi cookie vengono impostati solo dopo che hai concesso il consenso tramite il nostro banner. Puoi revocare il consenso in qualsiasi momento.</p>
              <div className="overflow-x-auto">
                <table className="w-full text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
                      <th className="text-left py-1.5 pr-3 font-medium text-[#404040] dark:text-[#D4D4D4]">Nome cookie</th>
                      <th className="text-left py-1.5 pr-3 font-medium text-[#404040] dark:text-[#D4D4D4]">Fornitore</th>
                      <th className="text-left py-1.5 pr-3 font-medium text-[#404040] dark:text-[#D4D4D4]">Finalità</th>
                      <th className="text-left py-1.5 font-medium text-[#404040] dark:text-[#D4D4D4]">Scadenza</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E5E5E5] dark:divide-[#2A2A2A]">
                    <tr>
                      <td className="py-1.5 pr-3"><code className="bg-[#F5F5F5] dark:bg-[#262626] px-1 rounded">_fbp</code></td>
                      <td className="py-1.5 pr-3">Meta</td>
                      <td className="py-1.5 pr-3">Identifica i browser per l&apos;attribuzione pubblicitaria; impostato dal Meta Pixel al caricamento della pagina</td>
                      <td className="py-1.5">90 giorni</td>
                    </tr>
                    <tr>
                      <td className="py-1.5 pr-3"><code className="bg-[#F5F5F5] dark:bg-[#262626] px-1 rounded">_fbc</code></td>
                      <td className="py-1.5 pr-3">Meta</td>
                      <td className="py-1.5 pr-3">Memorizza il Meta click ID (fbclid) quando si arriva da un annuncio Facebook o Instagram</td>
                      <td className="py-1.5">90 giorni</td>
                    </tr>
                    <tr>
                      <td className="py-1.5 pr-3"><code className="bg-[#F5F5F5] dark:bg-[#262626] px-1 rounded">_gcl_au</code></td>
                      <td className="py-1.5 pr-3">Google</td>
                      <td className="py-1.5 pr-3">Cookie linker di conversione Google Ads; traccia gli eventi di conversione pubblicitaria</td>
                      <td className="py-1.5">90 giorni</td>
                    </tr>
                    <tr>
                      <td className="py-1.5 pr-3"><code className="bg-[#F5F5F5] dark:bg-[#262626] px-1 rounded">_ga</code></td>
                      <td className="py-1.5 pr-3">Google</td>
                      <td className="py-1.5 pr-3">Google Analytics 4 — distingue gli utenti unici</td>
                      <td className="py-1.5">2 anni</td>
                    </tr>
                    <tr>
                      <td className="py-1.5 pr-3"><code className="bg-[#F5F5F5] dark:bg-[#262626] px-1 rounded">_ga_*</code></td>
                      <td className="py-1.5 pr-3">Google</td>
                      <td className="py-1.5 pr-3">Google Analytics 4 — persistenza dello stato della sessione</td>
                      <td className="py-1.5">2 anni</td>
                    </tr>
                    <tr>
                      <td className="py-1.5 pr-3"><code className="bg-[#F5F5F5] dark:bg-[#262626] px-1 rounded">__gads</code></td>
                      <td className="py-1.5 pr-3">Google</td>
                      <td className="py-1.5 pr-3">Google AdSense — personalizzazione degli annunci e frequency capping (solo piano Free)</td>
                      <td className="py-1.5">13 mesi</td>
                    </tr>
                    <tr>
                      <td className="py-1.5 pr-3"><code className="bg-[#F5F5F5] dark:bg-[#262626] px-1 rounded">__gpi</code></td>
                      <td className="py-1.5 pr-3">Google</td>
                      <td className="py-1.5 pr-3">Google AdSense — personalizzazione degli annunci (solo piano Free)</td>
                      <td className="py-1.5">13 mesi</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

          </div>

          <p className="mt-4">
            Puoi revocare o modificare il tuo consenso ai cookie in qualsiasi momento cliccando su &ldquo;Impostazioni Cookie&rdquo; nel footer di qualsiasi pagina. Puoi anche disabilitare i cookie tramite le impostazioni del browser, ma questo potrebbe compromettere il funzionamento di alcune funzionalità del Servizio. La revoca del consenso non pregiudica la liceità del trattamento effettuato prima della revoca.
          </p>
        </section>

        {/* 11. Responsabili del trattamento terzi */}
        <section>
          <h2 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            11. Responsabili del Trattamento Terzi e Sub-Responsabili
          </h2>
          <p>
            I seguenti servizi di terze parti possono trattare dati personali in connessione con il Servizio. Tutti i trasferimenti internazionali di dati personali al di fuori del SEE avvengono sulla base delle Clausole Contrattuali Standard (SCC) adottate ai sensi dell&apos;art. 46, par. 2, lett. c) GDPR, di decisioni di adeguatezza o di altre garanzie appropriate ai sensi del Capitolo V del GDPR.
          </p>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
                  <th className="text-left py-2 pr-4 font-medium text-[#404040] dark:text-[#D4D4D4]">Servizio</th>
                  <th className="text-left py-2 pr-4 font-medium text-[#404040] dark:text-[#D4D4D4]">Fornitore</th>
                  <th className="text-left py-2 pr-4 font-medium text-[#404040] dark:text-[#D4D4D4]">Finalità</th>
                  <th className="text-left py-2 pr-4 font-medium text-[#404040] dark:text-[#D4D4D4]">Dati trattati</th>
                  <th className="text-left py-2 font-medium text-[#404040] dark:text-[#D4D4D4]">Sede</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E5E5] dark:divide-[#2A2A2A]">
                <tr>
                  <td className="py-2 pr-4">Gemini 2.5 Flash API</td>
                  <td className="py-2 pr-4">Google LLC</td>
                  <td className="py-2 pr-4">Analisi AI di immagini e audio</td>
                  <td className="py-2 pr-4">Anteprime immagini, file audio</td>
                  <td className="py-2">USA</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">Google OAuth</td>
                  <td className="py-2 pr-4">Google LLC</td>
                  <td className="py-2 pr-4">Autenticazione accesso</td>
                  <td className="py-2 pr-4">Email, nome, foto profilo</td>
                  <td className="py-2">USA</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">GitHub OAuth</td>
                  <td className="py-2 pr-4">GitHub, Inc.</td>
                  <td className="py-2 pr-4">Autenticazione accesso</td>
                  <td className="py-2 pr-4">Email, username, foto profilo</td>
                  <td className="py-2">USA</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">Stripe</td>
                  <td className="py-2 pr-4">Stripe, Inc.</td>
                  <td className="py-2 pr-4">Elaborazione pagamenti</td>
                  <td className="py-2 pr-4">Dati carta di pagamento, nome e email di fatturazione</td>
                  <td className="py-2">USA / UE</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">Vercel</td>
                  <td className="py-2 pr-4">Vercel, Inc.</td>
                  <td className="py-2 pr-4">Hosting, infrastruttura, funzioni serverless, analytics senza cookie</td>
                  <td className="py-2 pr-4">Indirizzi IP (transitori, nei log delle richieste), metriche di pagina anonimizzate</td>
                  <td className="py-2">USA / edge globale</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">Meta Pixel</td>
                  <td className="py-2 pr-4">Meta Platforms, Inc.</td>
                  <td className="py-2 pr-4">Misurazione conversioni pubblicitarie (subordinata al consenso)</td>
                  <td className="py-2 pr-4">Indirizzo IP, info browser, eventi di pagina, cookie (_fbp, _fbc)</td>
                  <td className="py-2">USA</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">Meta Conversions API</td>
                  <td className="py-2 pr-4">Meta Platforms, Inc.</td>
                  <td className="py-2 pr-4">Attribuzione pubblicitaria lato server (subordinata al consenso)</td>
                  <td className="py-2 pr-4">Email in hash, IP in hash, tipo di evento</td>
                  <td className="py-2">USA</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">Google Ads (gtag)</td>
                  <td className="py-2 pr-4">Google LLC</td>
                  <td className="py-2 pr-4">Tracciamento conversioni pubblicitarie (subordinato al consenso)</td>
                  <td className="py-2 pr-4">Indirizzo IP, cookie (_gcl_au), eventi di conversione</td>
                  <td className="py-2">USA</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">Google Analytics 4</td>
                  <td className="py-2 pr-4">Google LLC</td>
                  <td className="py-2 pr-4">Analytics comportamentali (subordinate al consenso)</td>
                  <td className="py-2 pr-4">IP anonimizzato, browser, dispositivo, pagine, eventi, cookie (_ga, _ga_*)</td>
                  <td className="py-2">USA</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">Google AdSense</td>
                  <td className="py-2 pr-4">Google LLC</td>
                  <td className="py-2 pr-4">Pubblicità — solo piano Free (subordinata al consenso)</td>
                  <td className="py-2 pr-4">Info browser, profili di interesse, cookie (__gads, __gpi)</td>
                  <td className="py-2">USA</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">Resend</td>
                  <td className="py-2 pr-4">Resend, Inc.</td>
                  <td className="py-2 pr-4">Invio email transazionali e di marketing</td>
                  <td className="py-2 pr-4">Indirizzo email, nome, eventi di apertura/click email</td>
                  <td className="py-2">USA</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 12. Conservazione dei dati */}
        <section>
          <h2 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            12. Conservazione dei Dati
          </h2>
          <ul className="pl-5 list-disc space-y-2">
            <li>
              <strong className="text-[#404040] dark:text-[#D4D4D4]">Dati dell&apos;account</strong> (indirizzo email, nome visualizzato, foto profilo, contatori di utilizzo, stato del piano) vengono conservati per tutto il tempo in cui il tuo account rimane attivo. A seguito della cancellazione dell&apos;account, questi dati vengono eliminati in modo permanente e irreversibile entro 30 giorni dalla richiesta di cancellazione, salvo che la conservazione sia richiesta dalla legge.
            </li>
            <li>
              <strong className="text-[#404040] dark:text-[#D4D4D4]">Anteprime immagini e file audio</strong> (strumenti AI) non vengono archiviati da SammaPix in alcun supporto persistente. Esistono in modo transitorio nella memoria del server solo per la durata della chiamata API a Google Gemini e vengono immediatamente eliminati dopo la ricezione della risposta.
            </li>
            <li>
              <strong className="text-[#404040] dark:text-[#D4D4D4]">File caricati dall&apos;utente (strumenti lato client)</strong> vengono elaborati interamente nel tuo browser e non vengono mai trasmessi o archiviati sui server di SammaPix. Non esiste un periodo di conservazione poiché non viene mai creata una copia lato server.
            </li>
            <li>
              <strong className="text-[#404040] dark:text-[#D4D4D4]">Dati di pagamento</strong> (ID cliente Stripe, storico abbonamenti, dati delle fatture) vengono conservati per il periodo richiesto dalla normativa fiscale e contabile italiana applicabile, generalmente 10 anni dalla data della transazione ai sensi dell&apos;art. 2220 del Codice Civile italiano, anche dopo la cancellazione dell&apos;account.
            </li>
            <li>
              <strong className="text-[#404040] dark:text-[#D4D4D4]">Dati relativi alle email di marketing</strong> (registrazioni del consenso, registrazioni delle disiscrizioni) vengono conservati per il tempo necessario a dimostrare la conformità alla normativa applicabile in materia di email marketing.
            </li>
            <li>
              <strong className="text-[#404040] dark:text-[#D4D4D4]">Dati analitici</strong> vengono conservati in conformità con le politiche di conservazione dei rispettivi fornitori terzi di analytics (es. GA4: conservazione predefinita 14 mesi).
            </li>
            <li>
              <strong className="text-[#404040] dark:text-[#D4D4D4]">Log di accesso al server</strong> (generati da Vercel) contengono indirizzi IP transitori e metadati delle richieste e vengono conservati per il periodo specificato nella politica di conservazione dei dati di Vercel.
            </li>
          </ul>
        </section>

        {/* 13. Diritti GDPR */}
        <section>
          <h2 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            13. I Tuoi Diritti ai sensi del GDPR
          </h2>
          <p>
            Se ti trovi nello Spazio Economico Europeo, nel Regno Unito, in Svizzera o in un&apos;altra giurisdizione con normative equivalenti in materia di protezione dei dati, hai i seguenti diritti in relazione ai tuoi dati personali:
          </p>
          <ul className="mt-3 pl-5 list-disc space-y-2">
            <li>
              <strong className="text-[#404040] dark:text-[#D4D4D4]">Diritto di accesso (art. 15 GDPR)</strong> — Puoi richiedere una copia dei dati personali che deteniamo su di te, insieme a informazioni su come li trattiamo, le categorie di dati trattati e i destinatari a cui sono stati comunicati.
            </li>
            <li>
              <strong className="text-[#404040] dark:text-[#D4D4D4]">Diritto di rettifica (art. 16 GDPR)</strong> — Puoi richiedere che correggiamo senza ingiustificato ritardo i dati personali inesatti o incompleti che deteniamo su di te.
            </li>
            <li>
              <strong className="text-[#404040] dark:text-[#D4D4D4]">Diritto alla cancellazione / &lsquo;diritto all&apos;oblio&rsquo; (art. 17 GDPR)</strong> — Puoi richiedere la cancellazione dei tuoi dati personali nei seguenti casi: (a) i dati non sono più necessari rispetto alle finalità per cui sono stati raccolti; (b) revochi il consenso e non sussiste altra base giuridica per il trattamento; (c) ti opponi al trattamento e non sussistono motivi legittimi prevalenti; oppure (d) i dati sono stati trattati illecitamente. Questo diritto è soggetto agli obblighi legali di conservazione dei dati (es. documenti fiscali).
            </li>
            <li>
              <strong className="text-[#404040] dark:text-[#D4D4D4]">Diritto alla portabilità dei dati (art. 20 GDPR)</strong> — Puoi richiedere i tuoi dati personali in un formato strutturato, di uso comune e leggibile da dispositivo automatico (come JSON o CSV) e, ove tecnicamente fattibile, richiedere che li trasmettiamo direttamente a un altro titolare del trattamento.
            </li>
            <li>
              <strong className="text-[#404040] dark:text-[#D4D4D4]">Diritto di limitazione del trattamento (art. 18 GDPR)</strong> — Puoi richiedere che limitiamo il trattamento dei tuoi dati personali in determinate circostanze, ad esempio quando ne contesti l&apos;esattezza o ti sei opposto al trattamento in attesa della verifica dei motivi legittimi.
            </li>
            <li>
              <strong className="text-[#404040] dark:text-[#D4D4D4]">Diritto di opposizione (art. 21 GDPR)</strong> — Puoi opporti in qualsiasi momento al trattamento dei tuoi dati personali basato sul nostro legittimo interesse (art. 6, par. 1, lett. f) GDPR), incluso per finalità di marketing diretto. A seguito di un&apos;opposizione al marketing diretto, cesseremo immediatamente il trattamento.
            </li>
            <li>
              <strong className="text-[#404040] dark:text-[#D4D4D4]">Diritto di revoca del consenso (art. 7, par. 3, GDPR)</strong> — Laddove il trattamento si basi sul tuo consenso, puoi revocarlo in qualsiasi momento. La revoca del consenso non pregiudica la liceità del trattamento effettuato prima della revoca.
            </li>
            <li>
              <strong className="text-[#404040] dark:text-[#D4D4D4]">Diritti relativi ai processi decisionali automatizzati (art. 22 GDPR)</strong> — SammaPix non adotta decisioni basate esclusivamente su trattamenti automatizzati che producano effetti giuridici o analogamente significativi nei tuoi confronti.
            </li>
          </ul>
          <p className="mt-4">
            Per esercitare uno qualsiasi di questi diritti, contattaci all&apos;indirizzo{" "}
            <a href="mailto:luca@sammapix.com" className="text-[#6366F1] hover:underline">
              luca@sammapix.com
            </a>
            . Daremo riscontro alla tua richiesta entro 72 ore e risponderemo nel merito entro 30 giorni. Qualora le richieste siano complesse o numerose, potremmo prorogare il termine di risposta di ulteriori due mesi, nel qual caso ti informeremo entro il periodo iniziale di 30 giorni.
          </p>
          <p className="mt-3">
            Non addebiteremo alcuna tariffa per l&apos;esercizio dei tuoi diritti, salvo che le richieste siano manifestamente infondate o eccessive, nel qual caso potremmo richiedere un contributo ragionevole o rifiutarci di dare seguito alla richiesta, come consentito dall&apos;art. 12, par. 5, GDPR.
          </p>
          <p className="mt-3">
            Se ritieni che non abbiamo adeguatamente tutelato i tuoi diritti, hai il diritto di proporre reclamo all&apos;autorità di controllo competente. In Italia, l&apos;autorità di controllo è il{" "}
            <a
              href="https://www.garanteprivacy.it"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#6366F1] hover:underline"
            >
              Garante per la protezione dei dati personali
            </a>
            . I residenti nell&apos;UE possono anche contattare l&apos;autorità di controllo del loro Paese di residenza abituale.
          </p>
        </section>

        {/* 14. Minori */}
        <section>
          <h2 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            14. Privacy dei Minori
          </h2>
          <p>
            Il Servizio non è rivolto né destinato all&apos;utilizzo da parte di minori di 16 anni. Non raccogliamo consapevolmente dati personali di minori di 16 anni. Se dovessimo venire a conoscenza di aver inavvertitamente raccolto dati personali di un minore di 16 anni senza il consenso verificabile di un genitore o tutore, adotteremo tempestivamente le misure necessarie per eliminare tali dati dai nostri sistemi.
          </p>
          <p className="mt-3">
            Se sei un genitore o tutore legale e ritieni che tuo figlio di età inferiore ai 16 anni ci abbia fornito dati personali, ti preghiamo di contattarci immediatamente all&apos;indirizzo{" "}
            <a href="mailto:luca@sammapix.com" className="text-[#6366F1] hover:underline">
              luca@sammapix.com
            </a>
            {" "}e adotteremo le misure appropriate.
          </p>
        </section>

        {/* 15. Sicurezza */}
        <section>
          <h2 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            15. Sicurezza
          </h2>
          <p>
            Adottiamo misure tecniche e organizzative adeguate per proteggere i dati personali contro la distruzione accidentale o illecita, la perdita, l&apos;alterazione, la divulgazione non autorizzata o l&apos;accesso non autorizzato. Tali misure includono: cifratura HTTPS per tutti i dati in transito, cookie di sessione HTTP-only e same-site, limitazione del numero di richieste lato server sugli endpoint API, validazione e sanificazione degli input, e controlli di accesso sui sistemi che trattano dati personali.
          </p>
          <p className="mt-3">
            Nessun metodo di trasmissione su Internet o metodo di archiviazione elettronica è completamente sicuro. Pur adottando misure ragionevolmente adeguate per proteggere i tuoi dati personali, non possiamo garantire una sicurezza assoluta. Sei responsabile del mantenimento della sicurezza delle credenziali del tuo account.
          </p>
          <p className="mt-3">
            In caso di violazione dei dati personali che possa comportare un rischio per i tuoi diritti e le tue libertà, notificheremo all&apos;autorità di controllo competente entro 72 ore dalla scoperta della violazione (art. 33 GDPR) e, ove richiesto, informeremo gli utenti interessati senza ingiustificato ritardo (art. 34 GDPR).
          </p>
        </section>

        {/* 16. Modifiche */}
        <section>
          <h2 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            16. Modifiche alla Presente Informativa
          </h2>
          <p>
            Potremmo aggiornare periodicamente la presente Informativa sulla Privacy per riflettere modifiche al Servizio, alla normativa applicabile o alle nostre pratiche di trattamento dei dati. Quando apportiamo modifiche rilevanti, in particolare quelle che ampliano le categorie di dati raccolti, modificano la base giuridica del trattamento o introducono nuovi responsabili del trattamento terzi, aggiorneremo la data &ldquo;Ultimo aggiornamento&rdquo; in cima a questa pagina e, ove richiesto dalla normativa applicabile o ove la modifica incida materialmente sui tuoi diritti, informeremo gli utenti registrati via email o tramite un avviso prominente all&apos;interno del Servizio almeno 14 giorni prima che la modifica entri in vigore.
          </p>
          <p className="mt-3">
            Il continuato utilizzo del Servizio dopo la data di entrata in vigore di una versione aggiornata dell&apos;Informativa costituisce accettazione della versione rivista. Se non accetti modifiche rilevanti alla presente informativa, devi cessare di utilizzare il Servizio e puoi richiedere la cancellazione del tuo account.
          </p>
        </section>

        {/* 17. Contatti */}
        <section>
          <h2 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            17. Contatti e Richieste degli Interessati
          </h2>
          <p>
            Per domande relative alla privacy, richieste di esercizio dei diritti GDPR o qualsiasi altra questione relativa alla protezione dei dati, ti preghiamo di contattarci:
          </p>
          <ul className="mt-2 pl-5 list-disc space-y-1">
            <li>
              Email:{" "}
              <a href="mailto:luca@sammapix.com" className="text-[#6366F1] hover:underline">
                luca@sammapix.com
              </a>
            </li>
            <li>Titolare del trattamento: Luca Sammarco, Italia</li>
            <li>
              Sito web:{" "}
              <a
                href="https://sammapix.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#6366F1] hover:underline"
              >
                sammapix.com
              </a>
            </li>
          </ul>
          <p className="mt-3">
            Ti preghiamo di includere il tuo nome, l&apos;indirizzo email associato al tuo account e una descrizione chiara della tua richiesta o del tuo reclamo. Potremmo dover verificare la tua identità prima di elaborare determinate richieste, al fine di proteggere l&apos;accesso fraudolento ai tuoi dati.
          </p>
        </section>

        {/* Disclaimer */}
        <div className="border-t border-[#E5E5E5] dark:border-[#2A2A2A] pt-6 text-xs text-[#A3A3A3] dark:text-[#737373]">
          <p>
            La presente Informativa sulla Privacy è fornita a scopo informativo e riflette le nostre attuali pratiche di trattamento dei dati alla data indicata sopra. Questo documento non costituisce consulenza legale. Consulta un avvocato qualificato per una consulenza legale specifica alla tua situazione.
          </p>
        </div>

      </div>
    </div>
  );
}

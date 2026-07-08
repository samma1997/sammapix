import type { Metadata } from "next";
import Link from "next/link";
import { APP_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Termini di Servizio",
  description:
    "Termini di servizio di SammaPix. Piani Free e Pro, condizioni di pagamento, limitazioni di responsabilità per i file, utilizzo degli strumenti AI e legge applicabile (Italia / UE).",
  alternates: {
    canonical: `${APP_URL}/it/termini`,
    languages: {
      it: `${APP_URL}/it/termini`,
      en: `${APP_URL}/terms`,
      "x-default": `${APP_URL}/terms`,
    },
  },
  openGraph: {
    title: "Termini di Servizio",
    description:
      "Termini di servizio di SammaPix. Piani Free e Pro, condizioni di pagamento, limitazioni di responsabilità per i file, utilizzo degli strumenti AI e legge applicabile (Italia / UE).",
    type: "website",
    url: `${APP_URL}/it/termini`,
    locale: "it_IT",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "SammaPix" }],
  },
};

export default function TerminiItPage() {
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
          Termini di Servizio
        </h1>
        <p className="text-sm text-[#A3A3A3] dark:text-[#737373]">
          Ultimo aggiornamento: 8 luglio 2026
        </p>
      </div>

      {/* Body */}
      <div className="space-y-10 text-sm text-[#525252] dark:text-[#A3A3A3] leading-relaxed">

        {/* 1. Accettazione */}
        <section>
          <h2 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            1. Accettazione dei Termini
          </h2>
          <p>
            Accedendo o utilizzando SammaPix all&apos;indirizzo{" "}
            <a
              href="https://sammapix.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#6366F1] hover:underline"
            >
              sammapix.com
            </a>{" "}
            (il &ldquo;Servizio&rdquo;), accetti di essere vincolato dai presenti Termini di Servizio (&ldquo;Termini&rdquo;). Se non accetti integralmente i presenti Termini, non puoi accedere o utilizzare il Servizio.
          </p>
          <p className="mt-3">
            I presenti Termini costituiscono un accordo legalmente vincolante tra te (&ldquo;Utente&rdquo;, &ldquo;tu&rdquo;) e Luca Sammarco (&ldquo;SammaPix&rdquo;, &ldquo;noi&rdquo;, &ldquo;ci&rdquo;, &ldquo;nostro&rdquo;), un operatore privato residente in Italia. Creando un account o utilizzando qualsiasi funzionalità del Servizio, dichiari di avere almeno 16 anni e la capacità giuridica di concludere il presente accordo ai sensi della normativa applicabile.
          </p>
          <p className="mt-3">
            Se utilizzi il Servizio per conto di un&apos;azienda o di un&apos;organizzazione, dichiari di essere autorizzato a vincolare tale entità ai presenti Termini e i riferimenti a &ldquo;tu&rdquo; includono tale entità.
          </p>
        </section>

        {/* 2. Descrizione del servizio */}
        <section>
          <h2 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            2. Descrizione del Servizio
          </h2>
          <p>
            SammaPix è una piattaforma browser-based per l&apos;ottimizzazione delle immagini che offre una suite di strumenti per comprimere, convertire, ridimensionare, ritagliare, rinominare, filigranare e in altro modo elaborare file immagine. Il Servizio opera su un modello freemium comprendente un piano Free e un piano Pro a pagamento.
          </p>
          <p className="mt-3">
            Caratteristiche tecniche principali del Servizio:
          </p>
          <ul className="mt-2 pl-5 list-disc space-y-1">
            <li>
              <strong className="text-[#404040] dark:text-[#D4D4D4]">Elaborazione lato client.</strong> La maggior parte degli strumenti, tra cui Comprimi, Converti in WebP, Convertitore HEIC, Ridimensionamento Batch, Ritaglia, Filigrana, Filtri Fotografici, Trova Duplicati, Selezione Foto, Visualizzatore EXIF, PDF in Immagine, Rinomina in Batch, Ottimizza per Web, Pronto per il Blog e AI Organizza (ordinamento locale), elabora tutti i dati delle immagini interamente nel tuo browser web. Per questi strumenti, nessun dato delle immagini viene trasmesso ai nostri server o a terze parti in nessun momento.
            </li>
            <li>
              <strong className="text-[#404040] dark:text-[#D4D4D4]">Strumenti AI che richiedono la trasmissione di dati.</strong> Gli strumenti AI Rinomina, AI Alt Text, AI Ordina Foto, AI Organizza (assistito dal cloud) e Trascrivi inviano un&apos;anteprima a risoluzione ridotta (o, per Trascrivi, il file audio) all&apos;API Gemini di Google per l&apos;analisi. Per utilizzare questi strumenti è necessario un account registrato. Vedi la Sezione 8 per ulteriori dettagli.
            </li>
            <li>
              <strong className="text-[#404040] dark:text-[#D4D4D4]">Nessuna archiviazione lato server dei file.</strong> SammaPix non archivia sui propri server alcun file caricato dagli utenti, né per gli strumenti lato client né per gli strumenti AI. Tutta l&apos;elaborazione dei file è effimera. Una volta terminata la sessione del browser o dopo aver navigato altrove, i tuoi file non sono più accessibili tramite il Servizio. Non forniamo alcun meccanismo di backup o recupero dei file. Vedi la Sezione 6 per le limitazioni di responsabilità critiche relative ai file.
            </li>
          </ul>
          <p className="mt-3">
            Ci riserviamo il diritto di modificare, sospendere o interrompere qualsiasi parte del Servizio in qualsiasi momento, con ragionevole preavviso ove praticabile. Faremo ragionevoli sforzi per comunicare le modifiche significative agli utenti registrati.
          </p>
        </section>

        {/* 3. Responsabilità dell'account */}
        <section>
          <h2 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            3. Responsabilità dell&apos;Account
          </h2>
          <p>
            Alcune funzionalità del Servizio, inclusi tutti gli strumenti AI e le funzionalità del piano Pro, richiedono la creazione di un account. Registrandoti, accetti di:
          </p>
          <ul className="mt-2 pl-5 list-disc space-y-1">
            <li>Fornire informazioni accurate, aggiornate e complete al momento della registrazione e mantenerle aggiornate.</li>
            <li>Mantenere al sicuro le credenziali del tuo account e non condividerle con terze parti.</li>
            <li>Notificarci tempestivamente all&apos;indirizzo{" "}
              <a href="mailto:luca@sammapix.com" className="text-[#6366F1] hover:underline">
                luca@sammapix.com
              </a>{" "}
              qualora venissi a conoscenza o avessi il sospetto di accessi non autorizzati al tuo account.
            </li>
            <li>Assumerti la piena responsabilità per tutte le attività che si verificano sotto il tuo account, siano esse da te autorizzate o meno.</li>
            <li>Mantenere un solo account per persona. La creazione di più account per aggirare i limiti di utilizzo costituisce una violazione sostanziale dei presenti Termini.</li>
          </ul>
          <p className="mt-3">
            Ci riserviamo il diritto di sospendere o chiudere gli account che riteniamo ragionevolmente vengano utilizzati in violazione dei presenti Termini, della normativa applicabile o in modo dannoso per il Servizio o per altri utenti.
          </p>
        </section>

        {/* 4. Uso accettabile */}
        <section>
          <h2 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            4. Uso Accettabile
          </h2>
          <p>
            Accetti di utilizzare il Servizio esclusivamente per scopi leciti e in modo pienamente conforme ai presenti Termini e a tutte le leggi e normative applicabili. È vietato:
          </p>
          <ul className="mt-3 pl-5 list-disc space-y-1">
            <li>Elaborare, caricare o trasmettere immagini, audio o altri contenuti illeciti, dannosi, minacciosi, offensivi, diffamatori, osceni o che violino i diritti di proprietà intellettuale o la privacy di terze parti.</li>
            <li>Utilizzare il Servizio per elaborare contenuti che violino qualsiasi normativa applicabile, inclusa la legislazione sulla protezione dei minori o le leggi che vietano la distribuzione di immagini intime non consensuali.</li>
            <li>Utilizzare script automatizzati, bot, crawler, scraper o altri mezzi automatizzati per accedere o utilizzare il Servizio in modo che superi i normali schemi di utilizzo umano o che imponga un carico eccessivo sulla nostra infrastruttura.</li>
            <li>Tentare di aggirare i limiti di utilizzo, i limiti di frequenza delle richieste o le restrizioni del piano con qualsiasi mezzo tecnico, inclusa la creazione di più account o l&apos;utilizzo di servizi proxy.</li>
            <li>Decompilare, disassemblare o altrimenti tentare di estrarre il codice sorgente del Servizio o di qualsiasi suo componente.</li>
            <li>Rivendere, sublicenziare, commercializzare con marchio altrui o altrimenti cedere commercialmente l&apos;accesso al Servizio o ai suoi output senza il nostro previo consenso scritto.</li>
            <li>Utilizzare gli output degli strumenti AI del Servizio per addestrare, sviluppare o migliorare qualsiasi modello di machine learning o prodotto concorrente.</li>
            <li>Interferire con, interrompere o danneggiare l&apos;integrità o le prestazioni del Servizio, della sua infrastruttura o dei sistemi di terze parti connessi al Servizio.</li>
            <li>Rappresentare falsamente la propria identità o affiliazione con qualsiasi persona o entità in relazione all&apos;utilizzo del Servizio.</li>
          </ul>
          <p className="mt-3">
            <strong className="text-[#404040] dark:text-[#D4D4D4]">Utilizzo corretto e prevenzione degli abusi.</strong> SammaPix si riserva il diritto, a propria esclusiva discrezione, di limitare, rallentare, sospendere o restringere permanentemente l&apos;accesso al Servizio, incluso l&apos;accesso a strumenti specifici o al Servizio nel suo complesso, per qualsiasi utente che determiniamo stia abusando del Servizio. Gli abusi includono, a titolo esemplificativo: volumi eccessivi di chiamate API non coerenti con un utilizzo personale o aziendale legittimo, scraping automatizzato della piattaforma, tentativi di decompilare algoritmi proprietari o qualsiasi schema di utilizzo che imponga costi o carichi sproporzionati al Servizio. Tale misura può essere adottata senza preavviso e senza responsabilità nei tuoi confronti.
          </p>
        </section>

        {/* 5. Piano Free e Piano Pro */}
        <section>
          <h2 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            5. Piano Free e Piano Pro
          </h2>
          <p className="font-medium text-[#404040] dark:text-[#D4D4D4]">Piano Free</p>
          <p className="mt-2">
            Il piano Free è disponibile gratuitamente per tutti gli utenti. Gli utenti del piano Free possono utilizzare il Servizio nel rispetto dei limiti di utilizzo in vigore al momento dell&apos;uso, inclusi, a titolo esemplificativo, i limiti giornalieri sui crediti AI e sul numero di file in batch. Gli utenti del piano Free potrebbero visualizzare pubblicità erogata da Google AdSense. I limiti specifici applicabili al piano Free sono descritti nella{" "}
            <Link href="/prezzi" className="text-[#6366F1] hover:underline">
              pagina Prezzi
            </Link>
            {" "}e possono essere aggiornati in qualsiasi momento.
          </p>

          <p className="mt-4 font-medium text-[#404040] dark:text-[#D4D4D4]">Piano Pro</p>
          <p className="mt-2">
            Il piano Pro è un abbonamento a pagamento attualmente al prezzo di 9 USD al mese o 79 USD all&apos;anno (ove sia offerto il piano annuale). Gli abbonati al piano Pro ricevono limiti di utilizzo più elevati, la rimozione della pubblicità, download batch in ZIP e ulteriori vantaggi descritti nella{" "}
            <Link href="/prezzi" className="text-[#6366F1] hover:underline">
              pagina Prezzi
            </Link>
            . I nuovi abbonati Pro ricevono una prova gratuita di 7 giorni. Al termine del periodo di prova, il tuo metodo di pagamento verrà addebitato automaticamente, salvo cancellazione prima della scadenza della prova.
          </p>
          <p className="mt-3">
            Le funzionalità e i limiti di ciascun piano sono soggetti a modifiche. Le modifiche che ampliano i vantaggi del piano possono essere apportate immediatamente. Le modifiche che riducono i vantaggi del piano saranno comunicate con almeno 30 giorni di preavviso agli abbonati attivi.
          </p>
        </section>

        {/* 6. Limitazioni di responsabilità critiche sui file */}
        <section>
          <h2 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            6. Elaborazione dei File: Limitazioni di Responsabilità Critiche
          </h2>

          <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md p-4 space-y-3">
            <p className="font-medium text-[#404040] dark:text-[#D4D4D4]">
              6.1 Nessuna Responsabilità per Danni o Perdita di File
            </p>
            <p>
              SammaPix elabora file immagine e audio tramite API browser-based e, per gli strumenti AI, tramite API cloud di terze parti. Le operazioni di elaborazione dei file, incluse compressione, conversione di formato, ridimensionamento, ritaglio, applicazione di filigrane, applicazione di filtri e analisi AI, comportano intrinsecamente un rischio di output imprevisti, corruzione, perdita di dati o modifiche non intenzionali.
            </p>
            <p>
              <strong className="text-[#404040] dark:text-[#D4D4D4]">SammaPix non assume alcuna responsabilità per eventuali danni, corruzioni, perdite o alterazioni dei tuoi file che si verifichino durante o dopo l&apos;elaborazione tramite il Servizio</strong>, causati da bug del software, problemi di compatibilità del browser, interruzioni di rete, guasti di API di terze parti o qualsiasi altra causa. Questa esclusione si applica indipendentemente dal fatto che SammaPix fosse stata informata della possibilità di tale perdita.
            </p>
            <p>
              <strong className="text-[#404040] dark:text-[#D4D4D4]">Sei l&apos;unico responsabile del mantenimento di backup completi e aggiornati di tutti i file originali prima di utilizzare il Servizio.</strong> Raccomandiamo vivamente di non elaborare mai tramite SammaPix o qualsiasi altro strumento online l&apos;unica copia in tuo possesso di qualsiasi file.
            </p>
          </div>

          <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md p-4 space-y-3 mt-4">
            <p className="font-medium text-[#404040] dark:text-[#D4D4D4]">
              6.2 Nessuna Archiviazione dei File: Nessun Recupero Possibile
            </p>
            <p>
              SammaPix non archivia alcun file elaborato tramite il Servizio sui propri server o su qualsiasi supporto di archiviazione persistente. Tutta l&apos;elaborazione è effimera: i file esistono nella memoria del browser per la durata dell&apos;operazione di elaborazione e non vengono conservati da SammaPix in alcuna forma dopo il completamento dell&apos;elaborazione o al termine della sessione.
            </p>
            <p>
              <strong className="text-[#404040] dark:text-[#D4D4D4]">SammaPix non fornisce alcun meccanismo di backup, alcun servizio di recupero file e nessuna garanzia di accesso ai file elaborati dopo il download.</strong> Se non scarichi un file elaborato prima di navigare altrove, aggiornare la pagina o chiudere il browser, quel file è permanentemente inaccessibile tramite il Servizio e SammaPix non ha alcuna possibilità di ripristinarlo.
            </p>
            <p>
              Questa è una scelta architetturale deliberata e protettiva della privacy, non una limitazione rinunciabile. Contattare l&apos;assistenza per recuperare file persi non è possibile e tali richieste non possono essere evase.
            </p>
          </div>
        </section>

        {/* 7. Pagamenti e rimborsi */}
        <section>
          <h2 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            7. Pagamento, Prezzi e Rimborsi
          </h2>

          <p className="font-medium text-[#404040] dark:text-[#D4D4D4]">Elaborazione dei Pagamenti</p>
          <p className="mt-2">
            Gli abbonamenti Pro sono elaborati da Stripe, Inc. Sottoscrivendo l&apos;abbonamento, autorizzi Stripe ad addebitare il metodo di pagamento scelto su base ricorrente mensile o annuale fino alla cancellazione. Tutti i prezzi sono indicati in dollari statunitensi e potrebbero essere al netto delle imposte locali applicabili. Ove le imposte siano richieste dalla tua giurisdizione, verranno aggiunte all&apos;importo addebitato.
          </p>

          <p className="mt-4 font-medium text-[#404040] dark:text-[#D4D4D4]">Diritto di Modificare i Prezzi</p>
          <p className="mt-2">
            <strong className="text-[#404040] dark:text-[#D4D4D4]">SammaPix si riserva il diritto di modificare i prezzi degli abbonamenti in qualsiasi momento.</strong> Per gli abbonati attivi, qualsiasi aumento di prezzo sarà comunicato via email all&apos;indirizzo associato al tuo account almeno 30 giorni prima dell&apos;entrata in vigore del nuovo prezzo. Se non cancelli l&apos;abbonamento entro quel periodo di preavviso di 30 giorni, sarai ritenuto aver accettato il nuovo prezzo e il tuo prossimo ciclo di fatturazione verrà addebitato alla tariffa aggiornata. Le variazioni di prezzo non si applicano al periodo di fatturazione a pagamento già in corso.
          </p>
          <p className="mt-3">
            Le riduzioni di prezzo o i prezzi promozionali possono essere applicati in qualsiasi momento senza preavviso e non possono essere applicati retroattivamente ai cicli di fatturazione in corso.
          </p>

          <p className="mt-4 font-medium text-[#404040] dark:text-[#D4D4D4]">Cancellazione</p>
          <p className="mt-2">
            Puoi cancellare il tuo abbonamento Pro in qualsiasi momento dalla dashboard del tuo account o contattandoci all&apos;indirizzo{" "}
            <a href="mailto:luca@sammapix.com" className="text-[#6366F1] hover:underline">
              luca@sammapix.com
            </a>
            . A seguito della cancellazione, il tuo abbonamento rimarrà attivo e conserverai le funzionalità Pro fino alla fine del periodo di fatturazione a pagamento in corso, dopodiché il tuo account tornerà automaticamente al piano Free. Non addebitiamo commissioni di cancellazione.
          </p>

          <p className="mt-4 font-medium text-[#404040] dark:text-[#D4D4D4]">Rimborsi</p>
          <p className="mt-2">
            Offriamo una garanzia soddisfatti o rimborsati di 7 giorni per i nuovi abbonati Pro sul loro primo abbonamento. Se non sei soddisfatto entro i primi 7 giorni del tuo abbonamento a pagamento iniziale (non del periodo di prova gratuita), contattaci all&apos;indirizzo{" "}
            <a href="mailto:luca@sammapix.com" className="text-[#6366F1] hover:underline">
              luca@sammapix.com
            </a>{" "}
            per un rimborso completo. Al di fuori di tale periodo, le quote di abbonamento non sono rimborsabili, salvo quanto richiesto dalla normativa obbligatoria a tutela dei consumatori applicabile nella tua giurisdizione o a nostra esclusiva discrezione.
          </p>

          <p className="mt-4 font-medium text-[#404040] dark:text-[#D4D4D4]">Diritti dei Consumatori UE/SEE</p>
          <p className="mt-2">
            Se sei un consumatore residente nell&apos;Unione Europea o nello Spazio Economico Europeo, potresti avere ulteriori diritti di recesso legali ai sensi delle normative applicabili a tutela dei consumatori, incluso il diritto di recesso di 14 giorni dai contratti a distanza (periodo di ripensamento). Richiedendo e accedendo immediatamente alle funzionalità Pro dopo l&apos;acquisto, acconsenti espressamente all&apos;avvio dell&apos;esecuzione del contratto prima della scadenza del periodo di ripensamento e riconosci che ciò potrebbe incidere sul tuo diritto di recesso. Se eserciti il diritto di recesso entro 14 giorni, potremmo addebitarti un importo proporzionale al servizio fornito fino al momento del recesso, in conformità con l&apos;art. 14 della Direttiva 2011/83/UE.
          </p>
          <p className="mt-3">
            Nessuna disposizione dei presenti Termini esclude o limita diritti che hai come consumatore ai sensi della normativa obbligatoria a tutela dei consumatori del tuo Paese di residenza che non possono essere derogati contrattualmente.
          </p>
        </section>

        {/* 8. Strumenti AI */}
        <section>
          <h2 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            8. Strumenti AI: Limitazioni di Responsabilità e Avvertenze
          </h2>
          <p>
            I seguenti strumenti sono basati sull&apos;API Google Gemini 2.5 Flash: AI Rinomina, AI Alt Text, AI Organizza, AI Ordina Foto e Trascrivi. Quando utilizzi questi strumenti, un&apos;anteprima a risoluzione ridotta della tua immagine (o, per Trascrivi, il file audio) viene trasmessa ai server di Google per l&apos;elaborazione. È necessario un account registrato.
          </p>
          <p className="mt-3">
            <strong className="text-[#404040] dark:text-[#D4D4D4]">Gli output AI sono forniti esclusivamente &ldquo;così come sono&rdquo; e senza alcuna garanzia di alcun tipo.</strong> SammaPix non rilascia dichiarazioni né fornisce garanzie riguardo all&apos;accuratezza, completezza, pertinenza, idoneità o adeguatezza per qualsiasi scopo specifico di qualsiasi output generato dall&apos;AI, inclusi, a titolo esemplificativo:
          </p>
          <ul className="mt-2 pl-5 list-disc space-y-1">
            <li>Nomi file generati da AI Rinomina</li>
            <li>Descrizioni di accessibilità generate da AI Alt Text</li>
            <li>Etichette di categoria o ordini di ordinamento generati da AI Ordina Foto o AI Organizza</li>
            <li>Trascrizioni generate da Trascrivi</li>
          </ul>
          <p className="mt-3">
            Gli output generati dall&apos;AI possono contenere errori, allucinazioni, imprecisioni, linguaggio culturalmente inappropriato o output fattualmente errati. <strong className="text-[#404040] dark:text-[#D4D4D4]">Sei l&apos;unico responsabile della revisione, modifica e verifica di tutti i contenuti generati dall&apos;AI prima di fare affidamento su di essi o pubblicarli.</strong> SammaPix non è responsabile per perdite, danni o conseguenze derivanti dall&apos;utilizzo o dall&apos;affidamento su output generati dall&apos;AI.
          </p>
          <p className="mt-3">
            Il trattamento dei dati inviati all&apos;API Gemini da parte di Google è disciplinato dai propri termini e informative sulla privacy. Non siamo responsabili delle pratiche di trattamento dei dati di Google.
          </p>
        </section>

        {/* 9. Diritto di terminazione */}
        <section>
          <h2 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            9. Diritto di Terminazione o Sospensione degli Abbonamenti
          </h2>
          <p>
            <strong className="text-[#404040] dark:text-[#D4D4D4]">SammaPix si riserva il diritto di terminare, sospendere o limitare l&apos;account o l&apos;abbonamento di qualsiasi utente in qualsiasi momento, a propria esclusiva discrezione, con o senza causa e con o senza preavviso.</strong>
          </p>
          <p className="mt-3">
            I motivi di terminazione o sospensione possono includere, a titolo esemplificativo:
          </p>
          <ul className="mt-2 pl-5 list-disc space-y-1">
            <li>Violazione dei presenti Termini o di qualsiasi normativa applicabile.</li>
            <li>Utilizzo abusivo del Servizio, inclusi schemi coerenti con lo scraping automatizzato o il consumo eccessivo di API.</li>
            <li>Attività di pagamento fraudolente o sospette.</li>
            <li>Comportamento che pone un rischio per il Servizio, la sua infrastruttura o altri utenti.</li>
            <li>Ragioni operative, commerciali o legali a nostra discrezione, inclusa l&apos;interruzione del Servizio o di un piano specifico.</li>
          </ul>
          <p className="mt-3">
            Nel caso in cui terminiamo un abbonamento senza causa, rimborseremo la quota proporzionale delle quote di abbonamento prepagate per il periodo non utilizzato. Nel caso in cui la terminazione avvenga a causa di una violazione dei presenti Termini, non verrà emesso alcun rimborso. La terminazione non ti esime dagli obblighi maturati prima della data di terminazione.
          </p>
          <p className="mt-3">
            Puoi terminare il tuo account in qualsiasi momento dalle impostazioni del tuo account o contattandoci. A seguito della cancellazione dell&apos;account, i tuoi dati personali verranno eliminati entro 30 giorni in conformità con la nostra{" "}
            <Link href="/it/privacy" className="text-[#6366F1] hover:underline">
              Informativa sulla Privacy
            </Link>
            .
          </p>
        </section>

        {/* 10. Proprietà intellettuale */}
        <section>
          <h2 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            10. Proprietà Intellettuale
          </h2>
          <p className="font-medium text-[#404040] dark:text-[#D4D4D4]">I Tuoi Contenuti</p>
          <p className="mt-2">
            Mantieni la piena titolarità di tutte le immagini, i file audio e gli altri contenuti che elabori tramite il Servizio (&ldquo;I Tuoi Contenuti&rdquo;). I presenti Termini non attribuiscono a SammaPix alcun interesse di proprietà sui Tuoi Contenuti.
          </p>
          <p className="mt-3">
            Utilizzando gli strumenti AI, concedi a SammaPix una licenza limitata, non esclusiva, a titolo gratuito e temporanea per trasmettere i dati di anteprima o audio rilevanti ai nostri partner di elaborazione AI (Google Gemini) al solo scopo di generare l&apos;output richiesto per tuo conto. Questa licenza è strettamente limitata a quanto tecnicamente necessario per fornire il Servizio e non include alcun diritto di archiviare, visualizzare, sublicenziare o utilizzare I Tuoi Contenuti per qualsiasi altro scopo.
          </p>
          <p className="mt-4 font-medium text-[#404040] dark:text-[#D4D4D4]">Proprietà Intellettuale di SammaPix</p>
          <p className="mt-2">
            Il Servizio, inclusi il suo design, il codice, i marchi, il branding, i nomi dei prodotti, i nomi di dominio e tutti i contenuti creati da SammaPix (&ldquo;IP SammaPix&rdquo;), è di proprietà di Luca Sammarco e protetto dalle normative applicabili in materia di proprietà intellettuale, incluso il diritto d&apos;autore italiano e dell&apos;UE. Nulla nei presenti Termini trasferisce a te la titolarità dell&apos;IP SammaPix.
          </p>
          <p className="mt-3">
            Ti viene concessa una licenza limitata, non esclusiva, non trasferibile e revocabile per accedere e utilizzare il Servizio per finalità personali o aziendali interne, nel rispetto dei presenti Termini. Questa licenza non include il diritto di riprodurre, distribuire, creare opere derivate, visualizzare pubblicamente o sublicenziare alcun IP SammaPix.
          </p>
        </section>

        {/* 11. Servizi di terze parti */}
        <section>
          <h2 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            11. Servizi di Terze Parti
          </h2>
          <p>
            Il Servizio si integra con e si avvale di servizi di terze parti, tra cui:
          </p>
          <ul className="mt-2 pl-5 list-disc space-y-1">
            <li><strong className="text-[#404040] dark:text-[#D4D4D4]">Google</strong> — API Gemini (elaborazione AI), OAuth (autenticazione), Drive (importazione file opzionale), AdSense (pubblicità sul piano Free), Google Ads (tracciamento conversioni), Google Analytics 4 (analytics subordinate al consenso)</li>
            <li><strong className="text-[#404040] dark:text-[#D4D4D4]">GitHub</strong> — OAuth (autenticazione)</li>
            <li><strong className="text-[#404040] dark:text-[#D4D4D4]">Stripe, Inc.</strong> — Elaborazione pagamenti e gestione abbonamenti</li>
            <li><strong className="text-[#404040] dark:text-[#D4D4D4]">Vercel, Inc.</strong> — Hosting, infrastruttura e analytics senza cookie</li>
            <li><strong className="text-[#404040] dark:text-[#D4D4D4]">Meta Platforms, Inc.</strong> — Meta Pixel e Conversions API per l&apos;attribuzione pubblicitaria</li>
            <li><strong className="text-[#404040] dark:text-[#D4D4D4]">Resend</strong> — Invio email transazionali e di marketing</li>
            <li><strong className="text-[#404040] dark:text-[#D4D4D4]">Dropbox</strong> — Integrazione opzionale per l&apos;importazione di file</li>
          </ul>
          <p className="mt-3">
            Il tuo utilizzo di questi servizi di terze parti in connessione con SammaPix è soggetto ai rispettivi termini di servizio e informative sulla privacy. SammaPix non è responsabile per la disponibilità, l&apos;accuratezza, le pratiche sulla privacy o i termini di alcun fornitore di servizi terzi.
          </p>
          <p className="mt-3">
            I link a siti web o servizi di terze parti presenti all&apos;interno del Servizio sono forniti unicamente per tua comodità e non costituiscono un&apos;approvazione. Non abbiamo alcun controllo sui contenuti di terze parti e non accettiamo alcuna responsabilità per essi.
          </p>
        </section>

        {/* 12. Esclusione di garanzie */}
        <section>
          <h2 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            12. Esclusione di Garanzie
          </h2>
          <p>
            Il Servizio è fornito &ldquo;così come è&rdquo; e &ldquo;come disponibile&rdquo;, senza garanzie di alcun tipo, esplicite o implicite. Nella misura massima consentita dalla normativa applicabile, SammaPix esclude espressamente tutte le garanzie, incluse, a titolo esemplificativo, le garanzie implicite di commerciabilità, idoneità per uno scopo specifico, non violazione, accuratezza, completezza o disponibilità ininterrotta.
          </p>
          <p className="mt-3">
            Senza limitare quanto precede, SammaPix non garantisce che:
          </p>
          <ul className="mt-2 pl-5 list-disc space-y-1">
            <li>Il Servizio sarà continuativamente disponibile, privo di errori o esente da interruzioni, ritardi o vulnerabilità di sicurezza.</li>
            <li>I risultati ottenuti tramite il Servizio, inclusi gli output generati dall&apos;AI come nomi file, alt text, categorie e trascrizioni, saranno accurati, completi, affidabili o adeguati per qualsiasi scopo specifico.</li>
            <li>I difetti, i bug o gli errori del Servizio vengano identificati o corretti.</li>
            <li>Il Servizio sia compatibile con il tuo browser, dispositivo o sistema operativo.</li>
            <li>I file elaborati tramite il Servizio siano esenti da corruzione, perdita di dati o alterazioni non intenzionali.</li>
          </ul>
          <p className="mt-3">
            Nessuna disposizione dei presenti Termini esclude o limita garanzie o diritti che non possono essere esclusi o limitati ai sensi della normativa obbligatoria applicabile a tutela dei consumatori, inclusa la normativa italiana a tutela dei consumatori (Codice del Consumo, D.Lgs. n. 206/2005) e le direttive UE applicabili in materia di protezione dei consumatori.
          </p>
        </section>

        {/* 13. Limitazione di responsabilità */}
        <section>
          <h2 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            13. Limitazione di Responsabilità
          </h2>
          <p>
            Nella misura massima consentita dalla normativa applicabile, SammaPix (Luca Sammarco) non sarà responsabile per danni indiretti, incidentali, consequenziali, speciali, esemplari o punitivi, né per perdite di profitti, ricavi, dati, avviamento, opportunità commerciali o risparmi attesi, derivanti da o in connessione con l&apos;utilizzo del Servizio o l&apos;impossibilità di utilizzarlo, indipendentemente dal fatto che tali danni fossero prevedibili e anche qualora SammaPix fosse stata informata della possibilità di tali danni.
          </p>
          <p className="mt-3">
            Questa limitazione di responsabilità si applica specificamente e senza restrizioni a:
          </p>
          <ul className="mt-2 pl-5 list-disc space-y-1">
            <li>Perdita, danneggiamento o corruzione di file elaborati tramite il Servizio.</li>
            <li>Perdite derivanti dal mancato mantenimento di backup dei file originali.</li>
            <li>Errori, imprecisioni o output dannosi generati dagli strumenti AI.</li>
            <li>Interruzioni del servizio, disservizi o perdita di dati causati da fornitori terzi.</li>
            <li>Accesso non autorizzato al tuo account.</li>
            <li>Qualsiasi azione adottata ai sensi delle disposizioni sull&apos;utilizzo corretto e la prevenzione degli abusi dei presenti Termini.</li>
          </ul>
          <p className="mt-3">
            La responsabilità totale aggregata di SammaPix nei tuoi confronti per tutti i reclami derivanti da o relativi ai presenti Termini o al Servizio non supererà il maggiore tra: (a) le quote totali effettivamente da te pagate a SammaPix nei 12 mesi immediatamente precedenti l&apos;evento che ha dato origine al reclamo, o (b) EUR 10.
          </p>
          <p className="mt-3">
            Queste limitazioni si applicano indipendentemente dalla teoria della responsabilità (contrattuale, extracontrattuale, normativa o altra). Alcune giurisdizioni non consentono l&apos;esclusione o la limitazione di determinate responsabilità; in tali giurisdizioni, la nostra responsabilità è limitata nella misura massima consentita dalla normativa applicabile.
          </p>
        </section>

        {/* 14. Manleva */}
        <section>
          <h2 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            14. Manleva
          </h2>
          <p>
            Accetti di manlevare, difendere e tenere indenne Luca Sammarco, i suoi collaboratori e i contributori al Servizio da e contro qualsiasi e tutti i reclami, danni, perdite, responsabilità, costi e spese (incluse le ragionevoli spese legali) derivanti da o relativi a: (a) il tuo utilizzo del Servizio in violazione dei presenti Termini o della normativa applicabile; (b) I Tuoi Contenuti, incluso qualsiasi reclamo che I Tuoi Contenuti violino i diritti di terze parti; (c) la tua violazione dei diritti di terze parti; o (d) qualsiasi controversia tra te e una terza parte derivante dal tuo utilizzo del Servizio.
          </p>
        </section>

        {/* 15. Comunicazioni email */}
        <section>
          <h2 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            15. Comunicazioni via Email
          </h2>
          <p>
            Creando un account, accetti di ricevere da SammaPix email transazionali necessarie per il funzionamento del Servizio, come email di verifica dell&apos;account, link per il ripristino della password, conferme di abbonamento, ricevute di pagamento e comunicazioni rilevanti riguardanti i presenti Termini o la nostra Informativa sulla Privacy. Non è possibile disiscriversi da queste email transazionali mentre si dispone di un account attivo, in quanto sono essenziali per la gestione dell&apos;account e dell&apos;abbonamento.
          </p>
          <p className="mt-3">
            Le email di marketing e promozionali, inclusi aggiornamenti sui prodotti, annunci di nuove funzionalità e suggerimenti, verranno inviate solo nel caso in cui tu abbia acconsentito o dove consentito dalla normativa applicabile. Puoi disiscriverti dalle email di marketing in qualsiasi momento cliccando sul link di disiscrizione in qualsiasi email di questo tipo o contattandoci. La disiscrizione dalle email di marketing non influisce sulla consegna delle email transazionali.
          </p>
          <p className="mt-3">
            La consegna delle email è gestita da Resend, Inc. Consulta la nostra{" "}
            <Link href="/it/privacy" className="text-[#6366F1] hover:underline">
              Informativa sulla Privacy
            </Link>{" "}
            per i dettagli su come viene trattato il tuo indirizzo email.
          </p>
        </section>

        {/* 16. Legge applicabile */}
        <section>
          <h2 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            16. Legge Applicabile e Risoluzione delle Controversie
          </h2>
          <p>
            I presenti Termini sono disciplinati e interpretati in conformità con la legge della Repubblica Italiana, inclusi, a titolo esemplificativo, il Codice Civile italiano, il Codice del Consumo (D.Lgs. n. 206/2005) e le normative UE applicabili, senza tener conto dei principi in materia di conflitto di leggi.
          </p>
          <p className="mt-3">
            Fatte salve le disposizioni obbligatorie a tutela dei consumatori che non possono essere derogate contrattualmente, qualsiasi controversia derivante da o relativa ai presenti Termini o al Servizio sarà soggetta alla giurisdizione esclusiva dei tribunali competenti in Italia.
          </p>
          <p className="mt-3">
            Se sei un consumatore residente nell&apos;Unione Europea, puoi anche accedere alla piattaforma UE per la risoluzione delle controversie online all&apos;indirizzo{" "}
            <a
              href="https://ec.europa.eu/consumers/odr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#6366F1] hover:underline"
            >
              ec.europa.eu/consumers/odr
            </a>
            . Il nostro indirizzo email per quella piattaforma è{" "}
            <a href="mailto:luca@sammapix.com" className="text-[#6366F1] hover:underline">
              luca@sammapix.com
            </a>
            .
          </p>
          <p className="mt-3">
            Nulla nella presente sezione pregiudica i diritti obbligatori che potresti avere come consumatore ai sensi della legge del tuo Paese di residenza.
          </p>
        </section>

        {/* 17. Modifiche ai termini */}
        <section>
          <h2 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            17. Modifiche ai Presenti Termini
          </h2>
          <p>
            Potremmo aggiornare periodicamente i presenti Termini per riflettere modifiche al Servizio, alla normativa applicabile o alle nostre pratiche commerciali. Aggiorneremo la data &ldquo;Ultimo aggiornamento&rdquo; in cima a questa pagina ad ogni revisione. Per le modifiche rilevanti, incluse quelle che incidono significativamente sui tuoi diritti o obblighi, informeremo gli utenti registrati via email o tramite un avviso prominente all&apos;interno del Servizio almeno 14 giorni prima che le modifiche entrino in vigore.
          </p>
          <p className="mt-3">
            Il continuato utilizzo del Servizio dopo la data di entrata in vigore di eventuali Termini aggiornati costituisce accettazione di tali Termini aggiornati. Se non accetti i Termini aggiornati, devi cessare di utilizzare il Servizio prima della data di entrata in vigore.
          </p>
        </section>

        {/* 18. Disposizioni varie */}
        <section>
          <h2 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            18. Disposizioni Varie
          </h2>
          <ul className="pl-5 list-disc space-y-2">
            <li>
              <strong className="text-[#404040] dark:text-[#D4D4D4]">Accordo integrale.</strong> I presenti Termini, unitamente alla nostra{" "}
              <Link href="/it/privacy" className="text-[#6366F1] hover:underline">
                Informativa sulla Privacy
              </Link>
              , costituiscono l&apos;accordo integrale tra te e SammaPix in relazione al Servizio e sostituiscono tutti i precedenti e contemporanei accordi, dichiarazioni e intese.
            </li>
            <li>
              <strong className="text-[#404040] dark:text-[#D4D4D4]">Nullità parziale.</strong> Se una qualsiasi disposizione dei presenti Termini fosse ritenuta invalida, illegale o inapplicabile da un tribunale competente, tale disposizione sarà modificata nella misura minima necessaria per renderla applicabile e le disposizioni rimanenti continueranno a pieno vigore ed effetto.
            </li>
            <li>
              <strong className="text-[#404040] dark:text-[#D4D4D4]">Nessuna rinuncia.</strong> Il mancato o ritardato esercizio da parte nostra di qualsiasi diritto o disposizione dei presenti Termini non costituisce una rinuncia a tale diritto o disposizione. Qualsiasi rinuncia deve essere in forma scritta e firmata da un rappresentante autorizzato di SammaPix.
            </li>
            <li>
              <strong className="text-[#404040] dark:text-[#D4D4D4]">Cessione.</strong> Non puoi cedere, trasferire o sublicenziare i tuoi diritti o obblighi ai sensi dei presenti Termini senza il nostro previo consenso scritto. SammaPix può cedere liberamente i presenti Termini in connessione con una fusione, acquisizione, riorganizzazione o vendita di tutti o sostanzialmente tutti i suoi beni senza il tuo consenso.
            </li>
            <li>
              <strong className="text-[#404040] dark:text-[#D4D4D4]">Forza maggiore.</strong> SammaPix non sarà responsabile per mancato o ritardato adempimento causato da eventi al di fuori del nostro ragionevole controllo, inclusi catastrofi naturali, atti governativi, guasti all&apos;infrastruttura Internet o interruzioni di servizi di terze parti.
            </li>
            <li>
              <strong className="text-[#404040] dark:text-[#D4D4D4]">Sopravvivenza.</strong> Le Sezioni 6 (Limitazioni di Responsabilità Critiche sui File), 10 (Proprietà Intellettuale), 12 (Esclusione di Garanzie), 13 (Limitazione di Responsabilità), 14 (Manleva) e 16 (Legge Applicabile) sopravvivono alla terminazione o scadenza dei presenti Termini.
            </li>
            <li>
              <strong className="text-[#404040] dark:text-[#D4D4D4]">Lingua.</strong> I presenti Termini sono redatti in lingua inglese. In caso di conflitto tra la versione in lingua inglese e una traduzione, prevale la versione in lingua inglese.
            </li>
          </ul>
        </section>

        {/* 19. Contatti */}
        <section>
          <h2 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            19. Contatti
          </h2>
          <p>
            Per domande, reclami o comunicazioni legali riguardanti i presenti Termini o il Servizio:
          </p>
          <ul className="mt-2 pl-5 list-disc space-y-1">
            <li>
              Email:{" "}
              <a href="mailto:luca@sammapix.com" className="text-[#6366F1] hover:underline">
                luca@sammapix.com
              </a>
            </li>
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
            <li>Operatore: Luca Sammarco, Italia</li>
          </ul>
        </section>

        {/* Disclaimer */}
        <div className="border-t border-[#E5E5E5] dark:border-[#2A2A2A] pt-6 text-xs text-[#A3A3A3] dark:text-[#737373]">
          <p>
            Il presente documento dei Termini di Servizio è fornito a scopo informativo e riflette le nostre politiche attuali alla data indicata sopra. Questo documento non costituisce consulenza legale. Consulta un avvocato qualificato per una consulenza legale specifica alla tua situazione.
          </p>
        </div>

      </div>
    </div>
  );
}

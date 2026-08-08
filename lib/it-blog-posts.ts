// Articoli del blog italiano. Fonte unica per l'indice /it/blog e per la
// sezione "Leggi anche" in fondo a ogni articolo. Cresce una filiera alla volta.
export interface ItPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  tag: string;
}

export const IT_POSTS: ItPost[] = [
  {
    slug: "etichetta-contenuti-ai-obbligo-ue",
    title: "AI Act: devi etichettare i contenuti AI? Guida 2026",
    description:
      "Dal 2 agosto 2026 l'AI Act UE (Art. 50) chiede una disclosure visibile sui contenuti generati dall'IA. Chi deve farlo, le eccezioni, e come conformarsi gratis nel browser.",
    date: "8 agosto 2026",
    tag: "Guida",
  },
  {
    slug: "come-aggiungere-etichetta-ai-foto",
    title: "Come aggiungere l'etichetta Made with AI alle foto",
    description:
      "Aggiungi l'etichetta Made with AI alle tue immagini, gratis e nel browser, senza upload. Passo passo per conformarti all'obbligo di disclosure dell'AI Act UE.",
    date: "8 agosto 2026",
    tag: "Guida",
  },
  {
    slug: "come-cancellare-i-metadati-di-una-foto",
    title: "Come cancellare i metadati di una foto (GPS incluso)",
    description:
      "Ogni foto contiene posizione GPS, modello del telefono e ora. Ecco come rimuovere i metadati nascosti prima di condividerla, gratis e nel browser.",
    date: "11 luglio 2026",
    tag: "Guida",
  },
  {
    slug: "come-convertire-una-foto-in-pdf",
    title: "Convertire foto in PDF gratis, senza caricarle online",
    description:
      "Converti una o più foto in un unico PDF nel browser, senza registrazione e senza caricare le immagini su server esterni. Ideale per documenti personali.",
    date: "11 luglio 2026",
    tag: "Guida",
  },
  {
    slug: "come-togliere-lo-sfondo-da-una-foto",
    title: "Come togliere lo sfondo da una foto (gratis, online)",
    description:
      "Rimuovi lo sfondo da una foto nel browser, gratis e senza upload. Ottieni un PNG trasparente in pochi secondi, da iPhone, Android o computer.",
    date: "11 luglio 2026",
    tag: "Guida",
  },
  {
    slug: "come-fare-una-foto-tessera-a-casa",
    title: "Come fare una foto tessera a casa col telefono",
    description:
      "Le dimensioni giuste per carta d’identità, passaporto e patente, con sfondo bianco. Fai da te con iPhone o Android, gratis, senza fotografo.",
    date: "6 luglio 2026",
    tag: "Guida",
  },
  {
    slug: "come-convertire-webp-in-jpg",
    title: "Come convertire WebP in JPG, gratis e senza programmi",
    description:
      "L’immagine WebP non si apre? Convertila in JPG nel browser, gratis e senza upload, da Windows, Mac, iPhone o Android.",
    date: "6 luglio 2026",
    tag: "Guida",
  },
  {
    slug: "come-ridimensionare-una-foto",
    title: "Come ridimensionare una foto senza deformarla",
    description:
      "Le misure giuste per Instagram, WhatsApp, Facebook e fototessera, in pixel o in centimetri. Nel browser, gratis e senza upload.",
    date: "6 luglio 2026",
    tag: "Guida",
  },
  {
    slug: "come-convertire-heic-in-jpg",
    title: "Come convertire HEIC in JPG, gratis e senza programmi",
    description:
      "Le foto iPhone in HEIC non si aprono su Windows. Ecco come convertirle in JPG nel browser, gratis e senza upload.",
    date: "6 luglio 2026",
    tag: "Guida",
  },
  {
    slug: "come-ridurre-peso-di-una-foto",
    title: "Come ridurre il peso di una foto senza perdere qualità",
    description:
      "Perché le foto pesano tanto e come alleggerirle nel browser, gratis e senza upload. Comprimi a 1 MB, 500 KB o 100 KB per email, WhatsApp e Instagram.",
    date: "6 luglio 2026",
    tag: "Guida",
  },
];

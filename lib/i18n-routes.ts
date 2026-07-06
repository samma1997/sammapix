// Mappa delle pagine tradotte EN <-> IT. Aggiungi una riga ogni volta che
// traduci una pagina. Il selettore lingua mostra la controparte solo se esiste.
export const EN_TO_IT: Record<string, string> = {
  "/": "/it",
  "/tools/compress": "/it/tools/comprimere-immagini",
  "/compress-to": "/it/comprimi-a-dimensione",
  "/resize": "/it/ridimensionare-immagini",
  "/convert": "/it/convertire-immagini",
  "/about": "/it/chi-siamo",
  "/portfolio": "/it/portfolio",
  "/passport-photo": "/it/foto-tessera",
};

export const IT_TO_EN: Record<string, string> = Object.fromEntries(
  Object.entries(EN_TO_IT).map(([en, it]) => [it, en])
);

export function localeFromPath(path: string): "it" | "en" {
  return path.startsWith("/it") ? "it" : "en";
}

/** URL della stessa pagina nell'altra lingua, o null se non tradotta. */
export function counterpartPath(
  path: string
): { locale: "it" | "en"; href: string } | null {
  if (path.startsWith("/it")) {
    const en = IT_TO_EN[path];
    if (en) return { locale: "en", href: en };
    const mi = path.match(/^\/it\/comprimi-a\/(.+)$/);
    if (mi) return { locale: "en", href: `/compress-to/${mi[1]}` };
    return null;
  }
  const it = EN_TO_IT[path];
  if (it) return { locale: "it", href: it };
  // Pattern dinamici (pagine foglia)
  const m1 = path.match(/^\/compress-to\/(.+)$/);
  if (m1) return { locale: "it", href: `/it/comprimi-a/${m1[1]}` };
  return null;
}

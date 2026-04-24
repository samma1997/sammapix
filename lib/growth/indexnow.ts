/**
 * IndexNow client — notifica Bing/Yandex/Seznam di URL nuovi o aggiornati.
 * Protocollo ufficiale https://www.indexnow.org/documentation.
 *
 * La chiave è servita in /public/8ff2c670754c4662988fb6b3f9e11df9.txt
 * (il filename DEVE corrispondere al contenuto della chiave).
 */

export const INDEXNOW_KEY = "8ff2c670754c4662988fb6b3f9e11df9";
const HOST = "www.sammapix.com";
const KEY_LOCATION = `https://${HOST}/${INDEXNOW_KEY}.txt`;
const BATCH_LIMIT = 10000; // Limite ufficiale IndexNow per request

export interface IndexNowResult {
  submitted: number;
  status: number;
  ok: boolean;
  error?: string;
}

/**
 * Invia un batch di URL a IndexNow. Accetta path ("/tools/compress")
 * o URL completi ("https://www.sammapix.com/tools/compress").
 */
export async function submitToIndexNow(pagesOrUrls: string[]): Promise<IndexNowResult> {
  const urlList = pagesOrUrls
    .map((p) => (p.startsWith("http") ? p : `https://${HOST}${p}`))
    .slice(0, BATCH_LIMIT);

  if (urlList.length === 0) {
    return { submitted: 0, status: 0, ok: true };
  }

  try {
    const res = await fetch("https://api.indexnow.org/IndexNow", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        host: HOST,
        key: INDEXNOW_KEY,
        keyLocation: KEY_LOCATION,
        urlList,
      }),
    });

    // 200, 202 = OK (IndexNow accetta in vari modi)
    const ok = res.status === 200 || res.status === 202;
    let error: string | undefined;
    if (!ok) {
      try {
        error = await res.text();
      } catch {
        error = `HTTP ${res.status}`;
      }
    }

    return { submitted: urlList.length, status: res.status, ok, error };
  } catch (err) {
    return {
      submitted: 0,
      status: 0,
      ok: false,
      error: err instanceof Error ? err.message : String(err),
    };
  }
}

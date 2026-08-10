import ArticleAd from "@/components/ads/ArticleAd";
import SidebarAds from "@/components/ads/SidebarAds";
import TopLeaderboardAd from "@/components/ads/TopLeaderboardAd";

/**
 * Layout condiviso del cluster /image-size/*.
 * Stesso trattamento ads degli altri cluster (compress-to/crop/resize): annunci
 * laterali su desktop largo + top leaderboard + un annuncio SOTTO il contenuto,
 * SOLO per utenti anonimi con consenso. Questo cluster (con google-ads pos 10)
 * prima non aveva alcun layout ads: traffico one-shot non monetizzato.
 * L'AdUnit si auto-nasconde se lo slot non viene riempito, quindi zero rischio.
 */
export default function ImageSizeAdsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SidebarAds />
      <TopLeaderboardAd />
      {children}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-10">
        <ArticleAd />
      </div>
    </>
  );
}

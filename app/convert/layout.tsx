import ArticleAd from "@/components/ads/ArticleAd";
import SidebarAds from "@/components/ads/SidebarAds";
import TopLeaderboardAd from "@/components/ads/TopLeaderboardAd";

/**
 * Layout condiviso del cluster /convert/*.
 * Stesso trattamento ads di /tools/* (commit 17-18 lug): annunci laterali su
 * desktop + un annuncio SOTTO il contenuto, SOLO per utenti anonimi. Questi
 * cluster ad alto traffico (resize/compress-to/crop/...) prima non avevano ads:
 * traffico one-shot che non compra abbonamenti, monetizzabile con AdSense.
 * L'AdUnit si auto-nasconde se lo slot non viene riempito, quindi zero rischio.
 */
export default function ClusterAdsLayout({
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

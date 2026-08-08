import ArticleAd from "@/components/ads/ArticleAd";
import SidebarAds from "@/components/ads/SidebarAds";
import TopLeaderboardAd from "@/components/ads/TopLeaderboardAd";

/**
 * Layout condiviso di tutte le pagine /tools/*.
 * Aggiunge un annuncio SOTTO il contenuto del tool (solo utenti anonimi, con
 * invito a registrarsi). Non tocca il design del tool: l'annuncio sta in fondo,
 * dopo che l'utente ha gia' usato lo strumento. La versione loggata dei tool sta
 * su /dashboard/tools/* (path diverso), quindi non riceve annunci.
 */
export default function ToolsLayout({
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

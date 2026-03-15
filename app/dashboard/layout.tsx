import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth/options";
import { Providers } from "@/app/providers";
import { Inter } from "next/font/google";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import type { Metadata } from "next";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dashboard | SammaPix",
  description: "Your personalized SammaPix dashboard",
  robots: { index: false, follow: false },
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/dashboard");
  }

  const user = session.user as {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    plan?: string;
  };

  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.classList.add('dark');}}catch(e){}`,
          }}
        />
      </head>
      <body className="font-sans antialiased bg-white dark:bg-[#191919] text-[#171717] dark:text-[#E5E5E5] min-h-screen transition-colors duration-150">
        <Providers>
          <div className="flex h-screen overflow-hidden bg-white dark:bg-[#191919]">
            <DashboardSidebar
              userName={user.name ?? null}
              userEmail={user.email ?? null}
              userImage={user.image ?? null}
              userPlan={user.plan ?? "free"}
            />
            <main className="flex-1 overflow-y-auto">
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}

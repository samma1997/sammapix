import { Providers } from "@/app/providers";
import { Inter } from "next/font/google";
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

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

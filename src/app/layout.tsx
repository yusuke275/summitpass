import type { Metadata } from "next";
import { ClerkProvider } from '@clerk/nextjs'
import { Geist } from "next/font/google";
import { Toaster } from '@/components/ui/sonner'
import "./globals.css";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SummitPass - 登山記録・山コレクション",
  description: "あなたの登山記録を残し、山を制覇しよう。AI登山レポート・SNS・GPXルート共有搭載。",
  keywords: "登山,山,記録,百名山,ハイキング,トレッキング",
  openGraph: {
    title: "SummitPass",
    description: "あなたの登山記録を残し、山を制覇しよう",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="ja" suppressHydrationWarning>
        <body className={`${geist.className} bg-slate-50 text-slate-900`}>
          {children}
          <Toaster richColors position="top-right" />
        </body>
      </html>
    </ClerkProvider>
  );
}

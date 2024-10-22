import type { Metadata } from "next";
import type { Viewport } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import ContextProviders from "@/contextPorviders";
import { Locale } from "@/i18n";
import { unstable_setRequestLocale } from "next-intl/server";
import { GoogleTagManager } from "@next/third-parties/google";

const poppins = Poppins({
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#7334e0",
};

export const metadata: Metadata = {
  title: {
    template: "%s | diştedavim",
    default: "distedavim.com - en uygun diş kliniğini bul",
  },
  alternates: {
    canonical: "/",
    languages: {
      en: "/en",
      tr: "/tr",
    },
  },
  description:
    "Diş sağlığın sizin için önemli. Artık randevunu erteleme, hemen online randevu oluşturun!",
  metadataBase: new URL("https://www.distedavim.com"),
  openGraph: {
    images: [
      "https://distedavim-image-cdn.s3.amazonaws.com/public/distedavimlogo2.png",
    ],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "tr" }];
}

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) {
  unstable_setRequestLocale(params.lang);
  return (
    <html lang={params.lang || "tr"}>
      <GoogleTagManager gtmId="GTM-KR5LC3G" />
      <body className={`${poppins.variable}`}>
        <main className="relative">
          <ContextProviders>{children}</ContextProviders>
        </main>
      </body>
    </html>
  );
}

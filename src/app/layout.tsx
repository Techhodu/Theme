import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./providers/theme-provider";
import { cn } from "@/lib/utils";
import { Header } from "@/components/theme/Header";
import { Footer } from "@/components/theme/Footer";
import Ticker from "@/components/theme/Ticker";
import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata, ResolvingMetadata } from "next";
import Script from "next/script";
import MGIDWidget from "@/components/ads/mgid";
import Head from 'next/head'

const inter = Inter({ subsets: ["latin"] });


// const Layout = ({ children }: LayoutProps): JSX.Element => {

export const metadata: Metadata = {
  title: "Khabartaazgi: News That Matters, Stories That Inspire",
  description:
    "Khabartaazgi News is a leading source of news and information, providing in-depth coverage of the latest events and trends.",
  other: {
    custom: 'meta',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">



      <head>
      <meta name="google-adsense-account" content="ca-pub-7222273682589650"/>
        <Script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7222273682589650`}
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body

        className={cn(inter.className, {
          "debug-screens": process.env.NODE_ENV === "development",
        })}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <>
            <Header />
            <article className="mx-4 py-6 md:mx-16 lg:mx-24 lg:py-3 xl:mx-36 2xl:mx-auto 2xl:max-w-7xl">
              <Ticker />
              {/* <MGIDWidget/> */}
              {children}
            </article>
            <Footer />
          </>
        </ThemeProvider>
        <GoogleAnalytics gaId="G-FM5DX1QC52" />
        <Script id="izq-init">
          {`window._izq = window._izq || []; window._izq.push(["init"]);`}
        </Script>
        <Script
          src="https://cdn.izooto.com/scripts/0e920653f977216b1d3155b686ab721091b14063.js"
          strategy="afterInteractive"
        ></Script>


      </body>

    </html>
  );
}

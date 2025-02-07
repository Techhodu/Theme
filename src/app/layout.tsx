import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./providers/theme-provider";
import { cn } from "@/lib/utils";
import { Header } from "@/components/theme/Header";
import { Footer } from "@/components/theme/Footer";
import Ticker from "@/components/theme/Ticker";
import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata } from "next";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://khabartaazgi.com'),
  title: {
    default: "Khabartaazgi: News That Matters, Stories That Inspire",
    template: "%s | Khabartaazgi"
  },
  description: "Khabartaazgi News is a leading source of news and information, providing in-depth coverage of the latest events and trends.",
  keywords: ["news", "latest news", "breaking news", "india news"],
  authors: [{ name: "Khabartaazgi" }],
  creator: "Khabartaazgi",
  publisher: "Khabartaazgi",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  // viewport: {
  //   width: 'device-width',
  //   initialScale: 1,
  //   maximumScale: 1,
  // },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    siteName: 'Khabartaazgi',
    title: 'Khabartaazgi: News That Matters, Stories That Inspire',
    description: 'Khabartaazgi News is a leading source of news and information, providing in-depth coverage of the latest events and trends.',
    url: 'https://khabartaazgi.com',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Khabartaazgi: News That Matters, Stories That Inspire',
    description: 'Khabartaazgi News is a leading source of news and information, providing in-depth coverage of the latest events and trends.',
    creator: '@khabartaazgi',
    site: '@khabartaazgi',
  },
  verification: {
    google: 'your-google-site-verification',
    // Add other verification codes if needed
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google AdSense Script */}
        <meta name="google-adsense-account" content="ca-pub-7222273682589650" />
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7222273682589650"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body
        className={cn(
          inter.className,
          "min-h-screen bg-background antialiased",
          {
            "debug-screens": process.env.NODE_ENV === "development",
          }
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">
              <article className="mx-4 py-6 md:mx-16 lg:mx-24 lg:py-3 xl:mx-36 2xl:mx-auto 2xl:max-w-7xl">
                <Ticker />
                {children}
              </article>
            </main>
            <Footer />
          </div>
        </ThemeProvider>

        {/* Analytics and Tracking Scripts */}
        <GoogleAnalytics gaId="G-FM5DX1QC52" />
        
        {/* IZooto Push Notification Scripts */}
        <Script id="izq-init" strategy="afterInteractive">
          {`
            window._izq = window._izq || [];
            window._izq.push(["init"]);
          `}
        </Script>
        <Script
          src="https://cdn.izooto.com/scripts/0e920653f977216b1d3155b686ab721091b14063.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./providers/theme-provider";
import { cn } from "@/lib/utils";
import { Header } from "@/components/theme/Header";
import { Footer } from "@/components/theme/Footer";
import Ticker from "@/components/theme/Ticker";
import { GoogleAnalytics } from "@next/third-parties/google";
import logo from "@/assets/images/logo.png";
import type { ResolvingMetadata } from "next";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Khabartaazgi Newsis a leading source of news and information, providing in-depth coverage of the latest events and trends.",
  openGraph: {
    images: [logo.src],
  },
};
// const Layout = ({ children }: LayoutProps): JSX.Element => {
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
              {children}
            </article>
            <Footer />
          </>
        </ThemeProvider>
      </body>
      <GoogleAnalytics gaId="G-FM5DX1QC52" />
    </html>
  );
}

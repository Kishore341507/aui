
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { Poppins } from "next/font/google";


import { ThemeProvider } from "@/components/theme-provider"
import NavBar from "./components/nav-bar";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Analytics } from "@vercel/analytics/react"
import { Toaster } from "@/components/ui/toaster"
import AuthProvider from "./auth/Provider";

const inter = Inter({ subsets: ["latin"] });

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300","400","500","600","700","800","900"],
});
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
export const metadata: Metadata = {
  metadataBase: new URL('https://amongusindia.com'),
  title: "AUI - India's Most Active Discord Server | Among Us India Discord Community",
  description: "Join AUI Discord - India's most active Discord server with 50,000+ members! Among US India Discord community for gaming, tournaments, events, and fun. Best Indian gaming Discord server with 24/7 music, Valorant, Minecraft, BGMI & more.",
  authors: [{ name: "Team AUI", url: "https://amongusindia.com/aboutus" }],
  keywords: [
    "India's most active Discord server",
    "AUI discord",
    "Among US India Discord",
    "AUI discord server",
    "amongusindia",
    "AUI",
    "among us india",
    "among us indians",
    "Indian Discord server",
    "India gaming Discord",
    "most active Indian Discord",
    "biggest Indian Discord server",
    "among us india discord server",
    "among us india community",
    "Indian gaming community Discord",
    "India Discord community",
    "Valorant India Discord",
    "BGMI India Discord",
    "Minecraft India Discord",
    "Indian Discord community server"
  ],
  creator: "Kishore",
  openGraph: {
    title: "AUI - India's Most Active Discord Server | All AUI Discord",
    description: "Join All AUI Discord - India's most active Discord server with 50,000+ members! Among US India Discord community for gaming, tournaments, events, and fun. Best Indian gaming Discord server with 24/7 music, Valorant, Minecraft, BGMI & more.",
    url: "https://amongusindia.com",
    siteName: "Among Us India - AUI Discord",
    type: "website",
    images: [
      {
        url: "/aui.jpg",
        width: 256,
        height: 256,
        alt: "AUI Logo - India's Most Active Discord Server",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AUI - India's Most Active Discord Server",
    description: "Join All AUI Discord - India's most active Discord server! Among US India Discord community.",
    images: ["/aui.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
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
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-1T7W3NL77Z"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-1T7W3NL77Z');
          `}
        </Script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${poppins.className} antialiased bg-zinc-50 dark:bg-black`}
      >
        
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
        >
          
          <AuthProvider>
            <Navbar />
            {children}
          </AuthProvider>
          <Toaster />
          <Analytics />
        </ThemeProvider>
        <Footer />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "@/components/theme-provider"
import NavBar from "./components/nav-bar";
import { Analytics } from "@vercel/analytics/react"
import { Toaster } from "@/components/ui/toaster"
import AuthProvider from "./auth/Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AUI",
  description: "AUI (Among Us India) is India's most active Discord server, bringing together a vibrant and engaging gaming community. We host regular events, tournaments, and game nights, fostering a fun and competitive environment. Whether you're looking for casual or competitive gameplay, AUI is the perfect place to connect with fellow gamers and be part of an ever-growing community.",
  authors: [{ name: "Team AUI", url: "https://amongusindia.com/aboutus" }],
  keywords: ["amongusindia", 'AUI', 'AUI discord', 'among us india', 'among us indians', 'among us india discord', 'among us india server', 'among us india discord server', 'among us india discord community', 'among us india discord community server', 'among us india discord community server invite', 'among us india discord community server link', 'among us india discord community server link invite', 'among us india discord community server invite link'],
  creator: "Kishore",
  openGraph: {
    title: "AUI",
    description: "AUI (Among Us India) is India's most active Discord server, bringing together a vibrant and engaging gaming community. We host regular events, tournaments, and game nights, fostering a fun and competitive environment. Whether you're looking for casual or competitive gameplay, AUI is the perfect place to connect with fellow gamers and be part of an ever-growing community.",
    url: "https://amongusindia.com",
    images: [
      {
        url: "/aui.jpg",
        width: 256,
        height: 256,
        alt: "AUI Logo",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
        >
          <NavBar />
          <AuthProvider>
            {children}
          </AuthProvider>
          <Toaster />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}

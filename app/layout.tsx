import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "@/components/theme-provider"
import NavBar from "./components/nav-bar";
import { Analytics } from "@vercel/analytics/react"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AUI",
  description: "About AUI" ,
  authors : [ {name : "Team AUI" , url : "https://amongusindia.com/aboutus"} ],
  keywords: ["amongusindia"],
  creator : "Kamal Kisore",
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
            {children}
            <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Instagram, Youtube, Twitter } from "lucide-react"
import Link from "next/link";
import type { Metadata } from "next";
import HeroComponent from "./components/hero-component";

export const metadata: Metadata = {
  title: "AUI - India's Most Active Discord Server",
  description: "Join AUI Discord - India's most active Discord server with 50,000+ members! Among US India Discord community offering gaming, tournaments, 24/7 music, Valorant, Minecraft, BGMI tournaments. Best Indian gaming Discord server. Join now!",
  keywords: [
    "India's most active Discord server",
    "AUI discord",
    "Among US India Discord",
    "join AUI discord",
    "Indian gaming Discord",
    "India Discord community",
    "active Indian Discord",
    "AUI community",
    "among us india discord join"
  ],
  openGraph: {
    title: "Join AUI Discord - India's Most Active Discord Server",
    description: "India's most active Discord server with 50,000+ members! Join Among US India Discord for gaming, events, and more.",
  },
};

export default async function Home() {

  const videos = [
    "https://www.youtube.com/embed/73dLcr-Y5xA?si=n42oHES9myFta5LB",
    "https://www.youtube.com/embed/OYpIWKf5yxg?si=3UnEjNd8v0Ph5Qy3",
    "https://www.youtube.com/embed/s2td8G2E9IQ?si=D-mmlRjOJ-lap3Cf",
  ];

  return (
    <div>
      <main className="container mx-auto px-12 lg:px-24 py-8">
        <HeroComponent />

        {/* <section className="mb-12">
          <Link href="/membership">
            <Card className="w-full bg-white dark:bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] transition-colors hover:shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center justify-center text-2xl">
                  <Sparkles className="mr-2 h-6 w-6" /> Membership Tiers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-base">
                  Choose the tier that&apos;s right for you - Gold, Platinum, or Diamond. Unlock exclusive perks, custom roles, and special access.
                </CardDescription>
              </CardContent>
            </Card>
          </Link>
        </section> */}

        <section className="grid md:grid-cols-3 gap-6 mb-12">

          <Link href="https://www.youtube.com/@among_us_indians" target="_blank">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Youtube className="mr-2 h-5 w-5" />
                  YouTube
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Watch our latest videos, tutorials, and community highlights.
                </CardDescription>
              </CardContent>
            </Card>
          </Link>

          <Link href="https://www.instagram.com/amongusindians/" target="_blank">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Instagram className="mr-2 h-5 w-5" /> Instagram
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  See our latest posts, stories, and behind-the-scenes content.
                </CardDescription>
              </CardContent>
            </Card>
          </Link>

          <Link href="https://x.com/amongusindians" target="_blank">


            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Twitter className="mr-2 h-5 w-5" /> Twitter
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Follow us for updates, memes, and community news.
                </CardDescription>
              </CardContent>
            </Card>
          </Link>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 mt-8">
          {videos.map((url, index) => (
            <div key={index} className="w-full aspect-video">
              <iframe
                className="w-full h-full rounded-lg shadow-lg"
                src={url}
                title={`YouTube video ${index + 1}`}
                allowFullScreen
              />
            </div>
          ))}
        </div>

      </main>
      <footer className="container mx-auto p-4 text-center text-muted-foreground">
        <p>&copy; 2026 AUI Discord. All rights reserved.</p>
        <Link href="/active-servers" className="hidden">Active Servers</Link>
      </footer>
    </div>
  );
}

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Instagram, Youtube, Twitter, Heart } from "lucide-react"
import Link from "next/link";

export default async function Home() {

  // fetch current server time of nextjs server
  const currentYear = new Date().getFullYear();
  const videos = [
    "https://www.youtube.com/embed/73dLcr-Y5xA?si=n42oHES9myFta5LB",
    "https://www.youtube.com/embed/OYpIWKf5yxg?si=3UnEjNd8v0Ph5Qy3",
    "https://www.youtube.com/embed/s2td8G2E9IQ?si=D-mmlRjOJ-lap3Cf",
  ];

  return (
    <div >
      <main className="container mx-auto px-4 py-8">
        <section className="text-center mb-12">
          <h2 className="text-4xl font-extrabold mb-4">Welcome to AUI</h2>
          <p className="text-xl mb-6">A fun, chill hangout discord server for everyone!</p>
          <Button size="lg" asChild>
            <Link href="https://discord.gg/amongusindians" target="_blank">
              Join the Server
            </Link>
          </Button>

        </section>

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

        <section className="text-center">
          {/* <h3 className="text-2xl font-bold mb-4">Ready to join the fun?</h3> */}
          <Button variant="destructive" size="lg" asChild>
            <Link href="/donate">
              <Heart className="mr-2 h-5 w-5" />
              Donate Us
            </Link>
          </Button>
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
        <p>&copy; {currentYear} <Link href="https://discord.gg/amongusindia" className="text-blue-500" target="_blank">Among Us India Discord</Link>. All rights reserved.</p>
      </footer>
    </div>
  );
}

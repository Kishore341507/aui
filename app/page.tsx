import Hero from "./components/Hero";
import type { Metadata } from "next";
import TrustedBrandsMarquee from "./components/Trusted_brands";
import FeaturesSection from "./components/Features";
import ContentAISection from "./components/contentai";
import TestimonialSection from "./components/testimonials";
import FAQ from "./components/faq";

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



  return (
    <main className="min-h-screen">
      <Hero />
      <TrustedBrandsMarquee />
      <FeaturesSection />
      <ContentAISection />
      <TestimonialSection />
      <FAQ />
    </main>
 
  );
}

import type { Metadata } from "next";
import Hero from "./components/Hero";
import TrustedBrandsMarquee from "./components/Trusted_brands";
import FeaturesSection from "./components/Features";
import ContentAISection from "./components/contentai";
// import TestimonialSection from "./components/testimonials";
import FAQ from "./components/faq";

async function getMemberCount(): Promise<string | null> {
  try {
    const res = await fetch(
      "https://discord.com/api/v10/invites/amongusindians?with_counts=true",
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return null;
    const data = await res.json();
    if (!data?.approximate_member_count) return null;
    const rounded = Math.round(data.approximate_member_count / 1000) * 1000;
    return rounded.toLocaleString();
  } catch {
    return null;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const memberCount = await getMemberCount();
  const memberText = memberCount ? `${memberCount}+` : "60,000+";
  
  return {
    title: "AUI - India's Most Active Discord Server",
    description: `Join AUI Discord - India's most active Discord server with ${memberText} members! Among US India Discord community offering gaming, tournaments, 24/7 music, Valorant, Minecraft, BGMI tournaments. Best Indian gaming Discord server. Join now!`,
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
      description: `India's most active Discord server with ${memberText} members! Join Among US India Discord for gaming, events, and more.`,
      type: "website",
    },
  };
}

export default async function Home() {
  const memberCount = await getMemberCount();
  return (
    <main className="min-h-screen">
      <Hero memberCount={memberCount} />
      <TrustedBrandsMarquee memberCount={memberCount} />
      <FeaturesSection />
      <ContentAISection />
      {/* <TestimonialSection /> */}
      <FAQ />
    </main>
  );
}

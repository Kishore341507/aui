import type { Metadata } from "next";
import Link from "next/link";
import { cache } from "react";

// React cache prevents fetching data twice during metadata and page rendering
const getMemberCount = cache(async (): Promise<string | null> => {
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
});

export async function generateMetadata(): Promise<Metadata> {
  const memberCount = await getMemberCount();
  const memberText = memberCount ? `${memberCount}+` : "60,000+";

  return {
    title: "About Us - Among Us India",
    description: `Learn about AUI - India's most active Discord community with ${memberText} members`,
  };
}

export default async function AboutPage() {
  const memberCount = await getMemberCount();
  const memberText = memberCount ? `${memberCount}+` : "60,000+";

  const offers = [
    {
      title: "Active Community",
      description:
        "24/7 active voice channels and text chats with thousands of engaged members ready to play, talk, and hang out.",
    },
    {
      title: "Premium Features",
      description:
        "Exclusive membership tiers with unique perks including custom roles, private channels, music features, special permissions, and other digital benefits delivered through our Discord server after successful payment.",
    },
    {
      title: "Events & Activities",
      description:
        "Regular community events, gaming tournaments, giveaways, movie nights, and interactive activities designed for entertainment and fair play. (Events do not guarantee financial rewards).",
    },
    {
      title: "Economy System (PVC Coins)",
      description:
        "A virtual, non-monetary points system used strictly for in-server fun. PVC Coins cannot be bought, sold, traded, or exchanged for real currency.",
    },
    {
      title: "Safe Environment",
      description:
        "Strict moderation, clear rules, and a dedicated staff team to keep the community safe, respectful, and free from harassment or toxicity.",
    },
  ];

  const values = [
    { title: "Community First", desc: "Every decision prioritizes overall member experience and feedback." },
    { title: "Safety & Respect", desc: "Zero tolerance for toxicity, harassment, or discrimination." },
    { title: "Excellence & Innovation", desc: "Continuous improvements powered by modern Discord tools." },
    { title: "Inclusivity & Diversity", desc: "A welcoming space for members from all regions and backgrounds." },
  ];

  const resources = [
    { name: "Terms & Conditions", href: "/policies/terms" },
    { name: "Privacy Policy", href: "/policies/privacy" },
    { name: "Return & Refund Policy", href: "/policies/refund" },
    { name: "Cancellation Policy", href: "/policies/cancellation" },
    { name: "Shipping Policy", href: "/policies/shipping" },
    { name: "Contact Us", href: "/contact" },
  ];

  return (
    <main className="container mx-auto px-6 md:px-12 lg:px-24 py-12 max-w-6xl">
      {/* Header / Hero */}
      <section className="mb-12 border-b border-border pb-8">
        <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-primary/10 text-primary mb-3">
          India&apos;s Gaming Hub
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
          About AUI (Among Us India)
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
          Welcome to AUI – India&apos;s most active and vibrant Discord community! Founded and operated by Chirag Solanki, AUI has grown from a simple gaming server to one of the largest and most engaged digital communities in the nation.
        </p>
      </section>

      <div className="space-y-16">
        {/* Community Highlight Section */}
        <section className="grid md:grid-cols-2 gap-8 items-stretch">
          <div className="p-6 rounded-xl border border-border bg-card/50 flex flex-col justify-center space-y-3">
            <h2 className="text-2xl font-bold">Our Overview</h2>
            <p className="text-muted-foreground leading-relaxed">
              AUI is an individually owned online gaming and social community that offers free and paid digital memberships focused on Discord-based events, perks, and entertainment.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              With over <span className="font-semibold text-foreground">{memberText}</span> members and counting, we provide a safe and engaging space where gamers, content creators, and friends connect and build lasting relationships.
            </p>
          </div>

          <div className="p-6 rounded-xl border border-border bg-card/50 flex flex-col justify-center space-y-3">
            <h2 className="text-2xl font-bold">Our Mission</h2>
            <p className="text-muted-foreground leading-relaxed">
              To create the most welcoming, entertaining, and feature-rich Discord community in India where every member feels valued, heard, and connected. We strive to provide high-quality social gaming experiences while fostering genuine friendships through purely digital services.
            </p>
          </div>
        </section>

        {/* What We Offer Grid */}
        <section>
          <h2 className="text-3xl font-bold mb-6">What We Offer</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {offers.map((item, index) => (
              <div key={index} className="p-5 rounded-lg border border-border bg-card space-y-2">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Core Values */}
        <section>
          <h2 className="text-3xl font-bold mb-6">Our Core Values</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {values.map((val, idx) => (
              <div key={idx} className="p-4 rounded-lg border border-border bg-muted/30">
                <h3 className="font-semibold mb-1">{val.title}</h3>
                <p className="text-xs text-muted-foreground leading-normal">{val.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Our Journey */}
        <section className="p-6 rounded-xl border border-border bg-card">
          <h2 className="text-2xl font-semibold mb-4">Our Journey So Far</h2>
          <ul className="grid sm:grid-cols-2 gap-3 text-muted-foreground list-disc pl-5 text-sm">
            <li>Grown to {memberText} active members across India</li>
            <li>Introduced premium membership tiers with exclusive digital features</li>
            <li>Built an in-server economy with PVC Coins & mini-games</li>
            <li>Established round-the-clock 24/7 moderation and support</li>
            <li>Created a expansive ecosystem of channels, features, and events</li>
            <li>Helped form countless friendships and gaming squads</li>
          </ul>
        </section>

        {/* Premium Membership Banner */}
        <section className="p-8 rounded-xl border border-border bg-muted/40 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2 max-w-2xl">
            <h2 className="text-2xl font-bold">Premium Memberships</h2>
            <p className="text-sm text-muted-foreground">
              Take your experience to the next level with our Gold, Platinum, and Diamond tiers. Unlock custom roles, private channels, and special server perks.
            </p>
          </div>
          <Link
            href="/membership"
            className="px-5 py-2.5 rounded-md bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity whitespace-nowrap"
          >
            Explore Tiers &rarr;
          </Link>
        </section>

        {/* Team Section */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">The Team Behind AUI</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg border border-border">
              <h3 className="font-semibold">Founder & Operator</h3>
              <p className="text-sm text-muted-foreground mt-1">
                <strong className="text-foreground">Chirag Solanki</strong> – Responsible for establishing, directing, and operating the community.
              </p>
            </div>
            <div className="p-4 rounded-lg border border-border">
              <h3 className="font-semibold">Moderation & Support Team</h3>
              <p className="text-sm text-muted-foreground mt-1">
                A dedicated staff working around the clock to ensure a safe, welcoming, and enjoyable space for all members.
              </p>
            </div>
          </div>
        </section>

        {/* Resources & Contact */}
        <section className="grid md:grid-cols-2 gap-8 border-t border-border pt-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">Helpful Resources</h2>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {resources.map((res, i) => (
                <Link
                  key={i}
                  href={res.href}
                  className="text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4"
                >
                  {res.name}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Get in Touch</h2>
            <div className="space-y-1 text-sm text-muted-foreground">
              <p><strong className="text-foreground">Business Name:</strong> AUI (Among Us India)</p>
              <p><strong className="text-foreground">Operated By:</strong> Chirag Solanki</p>
              <p><strong className="text-foreground">Email:</strong> info@amongusindia.com</p>
              <p><strong className="text-foreground">Email:</strong> chiragsm258@gmail.com</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}